import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

async function loadTs(relative) {
  const source = await readFile(new URL(relative, import.meta.url), 'utf8');
  const js = ts.transpileModule(source, {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ES2022 }
  }).outputText;
  return import(`data:text/javascript;base64,${Buffer.from(js).toString('base64')}`);
}

console.log('Testing Gem Island Data & Models...');

// 1. Portfolio Math
const { calculatePortfolio, normalizeSliders, computeEfficientFrontier, assetClasses, riskFreeRate } = await loadTs('../src/data/gem/islands/portfolio.ts');

assert.equal(assetClasses.length, 3);
assert.equal(riskFreeRate, 0.04);

// Test individual asset return & vol match
for (let i = 0; i < 3; i++) {
  const weights = [0, 0, 0];
  weights[i] = 100;
  const res = calculatePortfolio(weights);
  assert(Math.abs(res.expectedReturn - assetClasses[i].expectedReturn) < 1e-9, `Return mismatch for asset ${i}`);
  assert(Math.abs(res.volatility - assetClasses[i].annualizedVol) < 1e-9, `Vol mismatch for asset ${i}`);
}

// Test normalization
for (const initial of [[50, 30, 20], [60, 40, 0], [100, 0, 0], [25, 45, 30]]) {
  for (let idx = 0; idx < 3; idx++) {
    for (const target of [0, 20, 50, 80, 100]) {
      const normalized = normalizeSliders(initial, idx, target);
      const sum = normalized.reduce((a, b) => a + b, 0);
      assert(Math.abs(sum - 100) <= 1, `Normalization sum must be 100, got ${sum}`);
      assert.equal(normalized[idx], target);
      assert(normalized.every((v) => v >= 0 && v <= 100));
    }
  }
}

// Test Efficient Frontier
const frontier = computeEfficientFrontier();
assert(frontier.length > 5, 'Frontier should produce multiple Pareto efficient points');
for (let i = 1; i < frontier.length; i++) {
  assert(frontier[i].volatility >= frontier[i - 1].volatility, 'Frontier volatility must be non-decreasing');
  assert(frontier[i].expectedReturn >= frontier[i - 1].expectedReturn, 'Frontier return must be non-decreasing');
}
console.log('✓ Portfolio math & efficient frontier verified');

// 2. Journey Stops & Distances
const { journeyStops, calculateGreatCircleDistance } = await loadTs('../src/data/gem/islands/journey.ts');
assert.equal(journeyStops.length, 4);
assert.equal(new Set(journeyStops.map((s) => s.id)).size, 4);
assert.equal(calculateGreatCircleDistance(25, 88, 25, 88).km, 0);

const d1 = calculateGreatCircleDistance(
  journeyStops[0].coordinates.lat,
  journeyStops[0].coordinates.lng,
  journeyStops[1].coordinates.lat,
  journeyStops[1].coordinates.lng
);
assert(d1.km > 3000 && d1.km < 3500, `Dinajpur to Changshu distance reasonable (~3,193 km), got ${d1.km}`);
console.log('✓ Journey stops & great-circle projection verified');

// 3. Sample SEC Advisers
const { sampleAdvisers } = await loadTs('../src/data/gem/islands/sample-advisers.ts');
assert.equal(sampleAdvisers.length, 8);
assert(sampleAdvisers.every((a) => a.regulatoryAum > 0), 'All 8 advisers must have non-zero Regulatory AUM');
assert(sampleAdvisers.every((a) => a.discretionaryPct > 0), 'All 8 advisers must have discretionary split');
assert(sampleAdvisers.every((a) => a.clientTypes.length > 0), 'All 8 advisers must have client types');
assert(sampleAdvisers.every((a) => a.crd && a.secNumber), 'All 8 advisers must have CRD and SEC numbers');
console.log('✓ SEC Form ADV dataset (8 notable advisers) verified');

// 4. Cricket Scenarios
const { cricketScenarios } = await loadTs('../src/data/gem/islands/cricket-scenarios.ts');
assert.equal(cricketScenarios.length, 3);
assert(cricketScenarios.every((s) => s.nafiSetup.length === 9), 'All scenarios must have 9 fielders');
console.log('✓ Cricket scenarios & 9-fielder formations verified');

// 5. Projects Catalog
const { projects } = await loadTs('../src/data/gem/projects.ts');
assert.equal(projects.length, 8);
assert.equal(projects.filter((p) => p.category === 'fintech-sec').length, 4);
assert.equal(projects.filter((p) => p.category === 'cricket-sports').length, 3);
assert.equal(projects.filter((p) => p.category === 'knowledge-systems').length, 1);
assert(projects.every((p) => p.architectureSummary && p.keyMetricBadge), 'All projects have real architecture summaries and metric badges');
console.log('✓ Projects catalog (all 8 projects) verified');

console.log('\nAll Gem Island & Data checks PASSED cleanly!');
