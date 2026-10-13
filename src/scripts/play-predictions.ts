import { predictionKey, profileKey, validPrediction, scorePrediction, upsertPrediction, type Prediction, type Result } from '@/lib/play/predictions';
interface Data { race: {id:string;startsAt:string;name:string} | null; drivers: {id:string;name:string}[]; fixtures: {id:string;home:string;opponent:string;startsAt:string}[]; results: Result[] }
export function initPredictions() {
  const dataEl = document.getElementById('prediction-data');
  if (!dataEl || dataEl.dataset.initialized) return;
  dataEl.dataset.initialized = 'true';
  const data: Data = JSON.parse(dataEl.textContent ?? '{}');
  const name = document.getElementById('prediction-name') as HTMLInputElement;
  const f1Form = document.getElementById('f1-prediction-form') as HTMLFormElement;
  const cricketForm = document.getElementById('cricket-prediction-form') as HTMLFormElement;
  const fixtureSelect = document.getElementById('cricket-fixture') as HTMLSelectElement;
  const winnerSelect = document.getElementById('cricket-winner') as HTMLSelectElement;
  let saved: Prediction[] = [];
  let storageAvailable = true;
  try { const parsed = JSON.parse(localStorage.getItem(predictionKey) ?? '[]'); saved = Array.isArray(parsed) ? parsed.filter(validPrediction) : []; name.value = localStorage.getItem(profileKey) ?? ''; } catch { storageAvailable = false; }
  const message = (kind: 'f1' | 'cricket', text: string) => { const el = document.getElementById(`${kind}-pick-status`); if (el) el.textContent = text; };
  const render = () => {
    const board = document.getElementById('prediction-leaderboard')!;
    const records = document.getElementById('saved-predictions')!;
    board.replaceChildren(); records.replaceChildren();
    const players = new Map<string, {name:string;points:number;scored:number;pending:number}>();
    for (const p of saved) {
      const score = data.results.map(r => scorePrediction(p,r)).find(s => s !== null) ?? null;
      const key = p.player.toLowerCase();
      const player = players.get(key) ?? {name:p.player,points:0,scored:0,pending:0};
      if (score === null) player.pending++; else {player.points += score; player.scored++;}
      players.set(key, player);
      const card = document.createElement('article'); card.className = 'play-card';
      const label = document.createElement('span'); label.className = 'play-eyebrow'; label.textContent = `${p.player} / ${p.kind === 'f1' ? 'Formula 1' : 'Cricket'}`;
      const title = document.createElement('h3');
      const fixture = data.fixtures.find(f => f.id === p.eventId);
      title.textContent = p.kind === 'f1' ? data.race?.id === p.eventId ? data.race.name : `Race session ${p.eventId}` : fixture ? `${fixture.home} vs ${fixture.opponent}` : 'Club cricket';
      const choices = document.createElement('p'); choices.textContent = p.picks.map(id => p.kind === 'f1' ? data.drivers.find(d => d.id === id)?.name ?? `Driver ${id}` : id).join(' / ');
      const outcome = document.createElement('p'); outcome.className = 'play-stamp'; outcome.textContent = score === null ? Date.parse(p.startsAt) > Date.now() ? 'Saved. Editable until the start.' : 'Locked. Result pending.' : `${score} points. Scored after the result.`;
      card.append(label,title,choices,outcome);records.append(card);
    }
    for (const p of [...players.values()].sort((a,b) => b.points-a.points || a.name.localeCompare(b.name))) {
      const tr = document.createElement('tr');
      for (const [i,value] of [p.name,p.points,p.scored,p.pending].entries()) { const td=document.createElement('td');td.textContent=String(value);if(i)td.className='numeric';tr.append(td); }
      board.append(tr);
    }
    document.getElementById('prediction-empty')!.hidden = saved.length > 0;
  };
  const save = (kind: Prediction['kind'], eventId: string, startsAt: string, picks: string[]) => {
    try {
      const player = name.value.trim();
      if (!player) { name.focus(); throw new Error('Add a name for the leaderboard first.'); }
      if (!storageAvailable) throw new Error('Browser storage is unavailable. Enable local storage to keep a prediction.');
      // Read again before writing so another tab's picks are preserved.
      const current = JSON.parse(localStorage.getItem(predictionKey) ?? '[]');
      const old = Array.isArray(current) ? current.filter(validPrediction) : [];
      const next = upsertPrediction(old, {kind,eventId,startsAt,picks,player,savedAt:new Date().toISOString()});
      localStorage.setItem(predictionKey,JSON.stringify(next));localStorage.setItem(profileKey,player);saved=next;
      message(kind,'Saved on this device. You can revise this pick until the start.');render();
    } catch (error) { message(kind, error instanceof Error ? error.message : 'Unable to save. Browser storage may be full.'); }
  };
  const restore = () => {
    const player = name.value.trim().toLowerCase();
    const f1 = saved.find(p => p.kind==='f1' && p.eventId===data.race?.id && p.player.toLowerCase()===player);
    for(let i=1;i<=3;i++) { const select = document.getElementById(`podium-${i}`) as HTMLSelectElement;select.value=f1?.picks[i-1]??''; }
    updateWinner();
  };
  const updateWinner = () => {
    const fixture = data.fixtures.find(f => f.id===fixtureSelect.value);
    winnerSelect.replaceChildren(new Option(fixture ? 'Choose a winner' : 'Choose a match first',''));
    winnerSelect.disabled = !fixture || Date.parse(fixture.startsAt)<=Date.now();
    if(fixture) { winnerSelect.add(new Option(fixture.home,fixture.home));winnerSelect.add(new Option(fixture.opponent,fixture.opponent)); }
    const old=saved.find(p => p.kind==='cricket' && p.eventId===fixture?.id && p.player.toLowerCase()===name.value.trim().toLowerCase());
    if(old)winnerSelect.value=old.picks[0];
  };
  fixtureSelect.onchange=updateWinner;name.onchange=restore;
  f1Form.onsubmit = e => {
    e.preventDefault(); if(!data.race)return;
    const picks=[1,2,3].map(i => (document.getElementById(`podium-${i}`) as HTMLSelectElement).value);
    if(picks.some(id => !data.drivers.some(d => d.id===id))) {message('f1','Choose three drivers from the list.');return;}
    if(new Set(picks).size!==3){message('f1','Choose a different driver for each podium position.');return;}
    save('f1',data.race.id,data.race.startsAt,picks);
  };
  cricketForm.onsubmit=e=>{e.preventDefault();const f=data.fixtures.find(f => f.id===fixtureSelect.value);if(!f||![f.home,f.opponent].includes(winnerSelect.value))return;save('cricket',f.id,f.startsAt,[winnerSelect.value]);};
  if(data.race && Date.parse(data.race.startsAt)<=Date.now()){for(const el of f1Form.querySelectorAll<HTMLInputElement>('select,button'))el.disabled=true;message('f1','This race has started. Podium picks are locked.');}
  // A cached page cannot accept a pick for an expired fixture.
  for(const option of fixtureSelect.options){const f=data.fixtures.find(f=>f.id===option.value);if(f&&Date.parse(f.startsAt)<=Date.now())option.disabled=true;}
  if(!storageAvailable){message('f1','Local storage is unavailable in this browser.');message('cricket','Local storage is unavailable in this browser.');}
  render();restore();
}
