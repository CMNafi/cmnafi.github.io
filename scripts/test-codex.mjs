import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import ts from 'typescript';

async function load(relative) {
  const source = await readFile(new URL(relative, import.meta.url), 'utf8');
  const js = ts.transpileModule(source, {compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ES2022}}).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}
const {portfolio,normalize,frontier,returns,vols,correlations} = await load('../src/data/codex/islands/portfolio.ts');
for (let i=0;i<3;i++) {
  const weights = [0,0,0]; weights[i]=100;
  const result=portfolio(weights);
  assert(Math.abs(result.mean-returns[i])<1e-12);
  assert(Math.abs(result.volatility-vols[i])<1e-12);
  assert.equal(result.correlation,null);
}
for (const weights of [[60,40,0],[100,0,0],[0,0,100],[30,35,35]]) {
  for(let index=0;index<3;index++) for(const value of [0,25,50,100]) {
    const result=normalize(weights,index,value);
    assert(Math.abs(result.reduce((a,b)=>a+b,0)-100)<1e-9);
    assert(result.every(v=>v>=0&&v<=100));
    assert.equal(result[index],value);
  }
}
const mix=portfolio([50,50,0]);
assert(Math.abs(mix.volatility**2-(.25*vols[0]**2+.25*vols[1]**2+.5*vols[0]*vols[1]*correlations[0][1]))<1e-12);
assert(Math.abs(mix.sharpe-(mix.mean-.03)/mix.volatility)<1e-12);
const boundary=frontier(); assert(boundary.length>3);
for(let i=1;i<boundary.length;i++) {
  assert(boundary[i].volatility>=boundary[i-1].volatility);
  assert(boundary[i].mean>=boundary[i-1].mean);
}
const {stops,distance}=await load('../src/data/codex/islands/journey.ts');
assert.equal(stops.length,4);
assert.equal(new Set(stops.map(s=>s.id)).size,4);
assert.equal(distance(stops[0],stops[0]),0);
assert(Math.abs(distance(stops[0],stops[1])-distance(stops[1],stops[0]))<1e-8);
assert(distance(stops[0],stops[1])>2500&&distance(stops[0],stops[1])<3500);
const {projects}=await load('../src/data/codex/projects.ts');
assert.equal(projects.length,8);
assert.equal(new Set(projects.map(p=>p.id)).size,8);
assert.equal(projects.filter(p=>p.category==='fintech-sec').length,4);
assert.equal(projects.filter(p=>p.category==='cricket-sports').length,3);
assert.equal(projects.filter(p=>p.category==='knowledge-systems').length,1);
assert(projects.every(p=>p.href?.startsWith('/')&&p.architectureSummary));
const {advisers}=await load('../src/data/codex/islands/sample-advisers.ts');
assert.equal(advisers.length,8);
assert.equal(new Set(advisers.map(a=>a.crd)).size,8);
for(const adviser of advisers){
  assert(adviser.aum>0);
  assert.equal(adviser.discretionary+adviser.nonDiscretionary,adviser.aum);
  assert(adviser.source.startsWith('https://reports.adviserinfo.sec.gov/reports/ADV/'));
  assert(/^\d{4}-\d{2}-\d{2}$/.test(adviser.filingDate));
}
console.log('Codex checks passed: portfolio covariance, Sharpe ratio, allocation normalization, efficient envelope, geographic distances, and project catalog.');
for(const route of ['','garage/','field-notes/','story/','connect/']) {
  const html=await readFile(new URL(`../dist/codex/${route}index.html`,import.meta.url),'utf8');
  assert.equal((html.match(/<footer\b/g)||[]).length,1,`${route}: one footer`);
  assert(html.includes('noindex, nofollow'));
  assert(!/LapTimer|text-scramble|SCAN SPEED MACH|TELEMETRY TRANSFER|COUNTDOWN TO KICKOFF/.test(html));
  assert(!html.includes('\u2014'));
  for(const match of html.matchAll(/href="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target=match[1];
    const file=target.endsWith('/')?`${target}index.html`:target.includes('.')?target:`${target}/index.html`;
    await access(new URL(`../dist${file}`,import.meta.url));
  }
}
console.log('Codex route checks passed: five pages, canonical local links, single footers, preview indexing policy, and no retired telemetry copy.');
