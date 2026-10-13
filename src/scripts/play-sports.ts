import { playConfig } from '@/data/play-config';
type Row = Record<string, any>;
const cache = new Map<string, { until: number; data: unknown }>();
async function json(url: string, ttl = 25_000): Promise<any> {
  const saved = cache.get(url);
  if (saved && saved.until > Date.now()) return saved.data;
  const response = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Feed unavailable (${response.status})`);
  const data: unknown = await response.json();
  cache.set(url, { data, until: Date.now() + ttl });
  return data;
}
function cell(row: HTMLTableRowElement, value: string, numeric = false) {
  const td = document.createElement('td'); td.textContent = value;
  if (numeric) td.className = 'numeric'; row.append(td);
}
let stopF1: (() => void) | undefined;
let stopCricket: (() => void) | undefined;
document.addEventListener('astro:before-swap', () => { stopF1?.(); stopCricket?.(); });

export function initF1Page() {
  stopF1?.();
  const countdown = document.getElementById('race-countdown');
  const status = document.getElementById('f1-timing-status');
  if (!countdown || !status) return;
  let alive = true, busy = false, session: Row | null = null, denied = false;
  const updateClock = () => {
    const date = countdown.dataset.start;
    if (!date) { countdown.textContent = 'Calendar pending'; return; }
    const seconds = Math.floor((Date.parse(date) - Date.now()) / 1000);
    countdown.textContent = seconds <= 0 ? 'Race start reached. Check timing below.' : `${Math.floor(seconds / 86400)}d ${String(Math.floor(seconds % 86400 / 3600)).padStart(2,'0')}h ${String(Math.floor(seconds % 3600 / 60)).padStart(2,'0')}m`;
  };
  const discover = async () => {
    if (document.hidden) return;
    try {
      const data = await json(`https://api.openf1.org/v1/sessions?year=${new Date().getUTCFullYear()}`, 240_000);
      if (!Array.isArray(data)) throw new Error('Invalid sessions');
      if (!alive) return;
      const next = data.find((s: Row) => Date.parse(s.date_start) <= Date.now() && Date.parse(s.date_end) > Date.now()) ?? null;
      if (next?.session_key !== session?.session_key) denied = false;
      session = next;
      if (!session) status.textContent = 'No session is running right now. The next-race clock and season standings are above and below.';
      else if (!denied) { status.textContent = `${session.session_name} at ${session.circuit_short_name}. Checking timing access.`; await timing(); }
    } catch { if (alive) status.textContent = 'Session feed unavailable. The build-time calendar remains available; data may be stale.'; }
  };
  const timing = async () => {
    if (!session || denied || busy || document.hidden || Date.parse(session.date_end) <= Date.now()) return;
    busy = true;
    const api = `https://api.openf1.org/v1`;
    const since = new Date(Date.now() - 90_000).toISOString();
    try {
      const [positions, intervals, drivers] = await Promise.all([
        json(`${api}/position?session_key=${session.session_key}&date%3E=${encodeURIComponent(since)}`),
        session.session_type === 'Race' ? json(`${api}/intervals?session_key=${session.session_key}&date%3E=${encodeURIComponent(since)}`) : Promise.resolve([]),
        json(`${api}/drivers?session_key=${session.session_key}`, 300_000)
      ]);
      if (![positions, intervals, drivers].every(Array.isArray)) throw new Error('Invalid timing');
      if (!alive) return;
      const latest = new Map<number, Row>();
      for (const row of positions) if (Date.parse(row.date) > Date.now() - 120_000 && (!latest.has(row.driver_number) || row.date > latest.get(row.driver_number)!.date)) latest.set(row.driver_number, row);
      const body = document.getElementById('f1-timing-body');
      const wrap = document.getElementById('f1-timing-wrap');
      if (!body || !wrap) return;
      body.replaceChildren();
      for (const position of [...latest.values()].sort((a,b) => a.position - b.position)) {
        const tr = document.createElement('tr');
        const gap = intervals.filter((r: Row) => r.driver_number === position.driver_number).sort((a: Row,b: Row) => b.date.localeCompare(a.date))[0];
        cell(tr, String(position.position), true); cell(tr, drivers.find((d: Row) => d.driver_number === position.driver_number)?.full_name ?? `Driver ${position.driver_number}`);
        cell(tr, position.position === 1 ? 'Leader' : gap?.gap_to_leader != null ? String(gap.gap_to_leader) + (typeof gap.gap_to_leader === 'number' ? 's' : '') : 'Unavailable', true);
        body.append(tr);
      }
      wrap.hidden = latest.size === 0;
      status.textContent = latest.size ? `Live session positions. Updated ${new Date().toLocaleTimeString()}. Checks every 30 seconds.` : 'No fresh timing available. Live access may require an OpenF1 subscription.';
    } catch {
      if (alive) { status.textContent = 'Live timing is unavailable with public access. OpenF1 requires a subscription for real-time data. The free season snapshot remains available.'; document.getElementById('f1-timing-wrap')?.setAttribute('hidden',''); }
      denied = true;
    } finally { busy = false; }
  };
  updateClock(); void discover();
  const clock = setInterval(updateClock, 30_000);
  const discoverTimer = setInterval(() => void discover(), 300_000);
  const timer = setInterval(() => void timing(), playConfig.f1PollMs);
  stopF1 = () => { alive = false; clearInterval(clock); clearInterval(discoverTimer); clearInterval(timer); };
}

export function initCricketPage() {
  stopCricket?.();
  const status = document.getElementById('cricket-status');
  const root = document.getElementById('cricket-scores');
  const stamp = document.getElementById('cricket-updated');
  if (!status || !root || !stamp) return;
  let alive = true, busy = false;
  const refresh = async () => {
    if (busy || document.hidden) return;
    busy = true;
    let leagueIds = playConfig.cricketSeriesIds;
    let headerEvents: Row[] = [];
    try {
      const header = await json('https://site.web.api.espn.com/apis/personalized/v2/scoreboard/header?sport=cricket&region=us&tz=America%2FNew_York', 240_000);
      if (!Array.isArray(header?.sports)) throw new Error('Invalid series discovery');
      const leagues: Row[] = header.sports.flatMap((sport: Row) => Array.isArray(sport.leagues) ? sport.leagues : []);
      if (!leagueIds.length) leagueIds = [...new Set(leagues.filter(l => Array.isArray(l.events) && l.events.length).map(l => String(l.id)).filter(id => /^\d+$/.test(id)))].slice(0,8);
      headerEvents = leagues.flatMap(l => Array.isArray(l.events) ? l.events : []).filter(e => e.id && Array.isArray(e.competitors)).map(e => ({ ...e,
        status: { type: { state: e.status, detail: e.summary ?? e.fullStatus ?? e.description } },
        competitions: [{ competitors: e.competitors.map((c: Row) => ({ ...c, team: {displayName:c.displayName ?? c.name} })) }]
      }));
    } catch { /* Explicit series IDs still work if discovery is unavailable. */ }
    const responses = await Promise.allSettled(leagueIds.map(league => json(`https://site.web.api.espn.com/apis/site/v2/sports/cricket/${league}/scoreboard`, 50_000)));
    if (!alive) { busy = false; return; }
    const feeds = responses.filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && Array.isArray(r.value?.events));
    const combined = [...headerEvents, ...feeds.flatMap(r => r.value.events)];
    const events = [...new Map(combined.filter((e: Row) => e.id && Array.isArray(e.competitions)).map((e: Row) => [e.id, e])).values()] as Row[];
    events.sort((a,b) => Number(b.status?.type?.state === 'in') - Number(a.status?.type?.state === 'in') || String(a.date).localeCompare(String(b.date)));
    if (!feeds.length && !headerEvents.length) { status.textContent = root.childElementCount ? 'The score feed is unavailable. Scores below may be stale.' : 'The score feed is unavailable right now. My own teams and fixtures are below.'; busy = false; return; }
    root.replaceChildren();
    for (const event of events.slice(0, 12)) {
      const card = document.createElement('article'); card.className = 'play-card';
      const label = document.createElement('span'); label.className = 'play-eyebrow'; label.textContent = event.status?.type?.state === 'in' ? 'Live' : event.status?.type?.state === 'post' ? 'Completed' : 'Upcoming';
      const title = document.createElement('h3'); title.textContent = event.shortName ?? event.name ?? 'Cricket match';
      card.append(label, title);
      for (const competitor of event.competitions[0]?.competitors ?? []) {
        const row = document.createElement('div'); row.className = 'play-score-row';
        const name = document.createElement('span'); name.textContent = competitor.team?.displayName ?? competitor.team?.name ?? 'Team';
        const score = document.createElement('span'); score.className = 'play-score'; score.textContent = typeof competitor.score === 'object' ? competitor.score?.displayValue ?? 'Pending' : competitor.score ?? 'Pending';
        row.append(name, score); card.append(row);
      }
      const detail = document.createElement('p'); detail.textContent = event.status?.type?.detail ?? event.status?.type?.description ?? 'Score updates pending'; card.append(detail);
      root.append(card);
    }
    const live = events.filter(e => e.status?.type?.state === 'in').length;
    status.textContent = live ? `${live} live ${live === 1 ? 'match' : 'matches'}. ${feeds.length < responses.length ? 'Some series are using the summary feed.' : 'Scores check every minute while you are here.'}` : events.length ? 'Nothing live right now. Recent results and upcoming matches are shown below.' : 'No matches listed right now. Club fixtures are below.';
    stamp.textContent = `Last checked: ${new Date().toLocaleTimeString()}`;
    busy = false;
  };
  void refresh(); const timer = setInterval(() => void refresh(), playConfig.cricketPollMs);
  stopCricket = () => { alive = false; clearInterval(timer); };
}
