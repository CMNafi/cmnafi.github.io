import { playConfig } from '@/data/play-config';
import { fetchSnapshot, isRecord, isRows, type Snapshot } from './fetch';
type Row = Record<string, any>;
const api = 'https://fantasy.premierleague.com/api';
const empty = (): Snapshot<Row> => ({ data: {}, updatedAt: null, stale: true, unavailable: true });
const bootstrapValid = (v: unknown): v is Row => isRecord(v) && isRows(v.events) && isRows(v.elements) && isRows(v.teams);
const bootstrap = () => fetchSnapshot(`${api}/bootstrap-static/`, bootstrapValid, { events: [], elements: [], teams: [] });
const historyValid = (v: unknown): v is Row => isRecord(v) && isRows(v.current) && isRows(v.chips);
const picksValid = (v: unknown): v is Row => isRecord(v) && isRows(v.picks) && isRecord(v.entry_history);
const entryValid = (v: unknown): v is Row => isRecord(v) && typeof v.name === 'string' && typeof v.id === 'number';

export async function getFplEntry(entryId: number | null, displayName: string) {
  if (!entryId) return { entryId, displayName, configured: false, entry: empty(), history: empty(), picks: empty(), squad: [] as Row[], gw: 0, stale: false, updatedAt: null as string | null, swing: null as number | null, worstCaptain: null as Row | null };
  const [boot, entry, history] = await Promise.all([
    bootstrap(), fetchSnapshot(`${api}/entry/${entryId}/`, entryValid, {}),
    fetchSnapshot(`${api}/entry/${entryId}/history/`, historyValid, { current: [], chips: [] })
  ]);
  const events: Row[] = boot.data.events;
  const gw = events.find(e => e.is_current)?.id ?? history.data.current.at(-1)?.event ?? 0;
  const picks = gw ? await fetchSnapshot(`${api}/entry/${entryId}/event/${gw}/picks/`, picksValid, { picks: [], entry_history: {} }) : empty();
  const live = gw ? await fetchSnapshot(`${api}/event/${gw}/live/`, (v): v is Row => isRecord(v) && isRows(v.elements), { elements: [] }) : empty();
  const squad: Row[] = (picks.data.picks ?? []).map((p: Row) => {
    const player = boot.data.elements.find((e: Row) => e.id === p.element);
    const team = boot.data.teams.find((e: Row) => e.id === player?.team);
    return { ...p, name: player?.web_name ?? `Player ${p.element}`, team: team?.short_name ?? '', points: live.data.elements?.find((e: Row) => e.id === p.element)?.stats?.total_points ?? null };
  });
  const ranks = history.data.current.filter((w: Row) => typeof w.overall_rank === 'number');
  const swings: number[] = ranks.slice(1).map((w: Row, i: number) => ranks[i].overall_rank - w.overall_rank);
  const swing = swings.length ? swings.reduce((best, n) => Math.abs(n) > Math.abs(best) ? n : best, swings[0]) : null;
  let worstCaptain: Row | null = null;
  let captainStale = false;
  // Each completed gameweek is checked; shared snapshots avoid duplicate live-data requests across friends.
  if (!boot.unavailable && !history.unavailable) {
    for (const week of history.data.current.filter((w: Row) => events.find(e => e.id === w.event)?.finished)) {
      const [pastPicks, pastLive] = await Promise.all([
        fetchSnapshot(`${api}/entry/${entryId}/event/${week.event}/picks/`, picksValid, { picks: [], entry_history: {} }),
        fetchSnapshot(`${api}/event/${week.event}/live/`, (v): v is Row => isRecord(v) && isRows(v.elements), { elements: [] })
      ]);
      captainStale ||= pastPicks.stale || pastLive.stale;
      const captain = pastPicks.data.picks.find((p: Row) => p.is_captain);
      const rawPoints = pastLive.data.elements.find((e: Row) => e.id === captain?.element)?.stats?.total_points;
      if (captain && typeof rawPoints === 'number') {
        const points = rawPoints * captain.multiplier;
        if (!worstCaptain || points < worstCaptain.points) worstCaptain = { name: boot.data.elements.find((e: Row) => e.id === captain.element)?.web_name ?? 'Captain', gw: week.event, points };
      }
    }
  }
  const snapshots = [boot, entry, history, picks, live];
  const updatedAt = snapshots.some(s => !s.updatedAt) ? entry.updatedAt : snapshots.map(s => s.updatedAt!).sort()[0];
  return { entryId, displayName, configured: true, entry, history, picks, squad, gw, stale: snapshots.some(s => s.stale) || captainStale, updatedAt, swing, worstCaptain };
}

export const getMyFpl = () => getFplEntry(playConfig.fpl.entryId, playConfig.fpl.name);
export async function getRivals() {
  const entries = [await getMyFpl()];
  for (const friend of playConfig.fpl.friends) entries.push(await getFplEntry(friend.entryId, friend.name));
  return entries.sort((a, b) => (b.entry.data.summary_overall_points ?? -1) - (a.entry.data.summary_overall_points ?? -1));
}
