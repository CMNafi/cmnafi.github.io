import { fetchSnapshot, isRows } from './fetch';
type Row = Record<string, any>;
const api = 'https://api.openf1.org/v1';
const rows = (route: string) => fetchSnapshot(`${api}/${route}`, isRows, []);
let dataPromise: ReturnType<typeof loadF1> | undefined;
async function loadF1() {
  const year = new Date().getUTCFullYear();
  const [meetings, sessions] = await Promise.all([rows(`meetings?year=${year}`), rows(`sessions?year=${year}`)]);
  const now = Date.now();
  const races = sessions.data.filter(s => s.session_name === 'Race' && s.session_type === 'Race' && Number.isFinite(Date.parse(s.date_start))).sort((a, b) => a.date_start.localeCompare(b.date_start));
  const nextRace = races.find(r => Date.parse(r.date_start) > now) ?? null;
  const finished = races.filter(r => Date.parse(r.date_end) < now);
  const latestRace = finished.at(-1);
  const activeSession = sessions.data.find(s => Date.parse(s.date_start) <= now && Date.parse(s.date_end) > now) ?? null;
  const key = latestRace?.session_key ?? activeSession?.session_key;
  const drivers = key ? await rows(`drivers?session_key=${key}`) : { data: [] as Row[], stale: true, updatedAt: null, unavailable: true };
  const [driverStandings, constructorStandings] = latestRace ? await Promise.all([rows(`championship_drivers?session_key=${latestRace.session_key}`), rows(`championship_teams?session_key=${latestRace.session_key}`)]) : [drivers, drivers];
  const results: { id: string; startsAt: string; podium: string[] }[] = [];
  let resultsStale = false;
  // Keep completed race results so saved predictions can be scored after a visitor returns.
  for (const race of [...finished].reverse()) {
    const result = await rows(`session_result?session_key=${race.session_key}`);
    resultsStale ||= result.stale;
    const podium = result.data.filter(r => [1, 2, 3].includes(r.position)).sort((a, b) => a.position - b.position).map(r => String(r.driver_number));
    if (podium.length === 3 && new Set(podium).size === 3) results.push({ id: String(race.session_key), startsAt: race.date_start, podium });
  }
  const calendar = meetings.data.filter(m => typeof m.meeting_name === 'string' && typeof m.date_start === 'string' && Number.isFinite(Date.parse(m.date_start))).sort((a, b) => a.date_start.localeCompare(b.date_start));
  const raceName = (race: Row | null) => calendar.find(m => m.meeting_key === race?.meeting_key)?.meeting_name ?? race?.circuit_short_name ?? 'Next Grand Prix';
  const snapshots = [meetings, sessions, drivers, driverStandings, constructorStandings];
  return { year, calendar, races, nextRace, nextRaceName: raceName(nextRace), activeSession, drivers: drivers.data,
    driverStandings: driverStandings.data.filter(r => typeof r.position_current === 'number').sort((a, b) => a.position_current - b.position_current),
    constructorStandings: constructorStandings.data.filter(r => typeof r.position_current === 'number').sort((a, b) => a.position_current - b.position_current),
    results, stale: snapshots.some(s => s.stale) || resultsStale, updatedAt: meetings.updatedAt, unavailable: sessions.unavailable };
}
export const getF1 = () => dataPromise ??= loadF1();
