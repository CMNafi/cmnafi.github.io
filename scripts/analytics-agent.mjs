// scripts/analytics-agent.mjs
// Agent 2: Google Analytics Intelligence & A/B Winner Decision Engine
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const fieldNotesDir = path.join(rootDir, 'src', 'content', 'field-notes');
const experimentsPath = path.join(rootDir, 'src', 'data', 'ab-experiments.json');

function zScoreToPValue(z) {
  const t = 1.0 / (1.0 + 0.2316419 * z);
  const d = 0.3989422804014327 * Math.exp(-0.5 * z * z);
  const prob = d * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return Math.max(0.0001, prob * 2);
}

function runAnalytics() {
  console.log('\n======================================================');
  console.log('📊 AGENT 2: GA4 ANALYTICS & STATISTICAL DECISION AGENT');
  console.log('======================================================\n');
  console.log('Reading Google Analytics 4 Telemetry Stream [G-W7QGKS85CP]...\n');

  if (!fs.existsSync(experimentsPath)) {
    console.error(`Experiments file not found: ${experimentsPath}`);
    return;
  }

  const experiments = JSON.parse(fs.readFileSync(experimentsPath, 'utf8'));
  console.log(`Analyzing ${experiments.length} active A/B experiments.\n`);

  const summaryRows = [];
  const winnersToPromote = [];

  for (const exp of experiments) {
    const a = exp.variantA.metrics;
    const b = exp.variantB.metrics;

    const nA = Math.max(a.impressions, 1);
    const nB = Math.max(b.impressions, 1);
    const rateA = (a.engagements / nA) * 100;
    const rateB = (b.engagements / nB) * 100;

    const uplift = rateA > 0 ? ((rateB - rateA) / rateA) * 100 : 0;

    // Pooled standard error
    const pooledP = (a.engagements + b.engagements) / (nA + nB);
    const se = Math.sqrt(pooledP * (1 - pooledP) * (1 / nA + 1 / nB));
    const zScore = se > 0 ? ((b.engagements / nB) - (a.engagements / nA)) / se : 0;
    const pVal = zScoreToPValue(Math.abs(zScore));
    const confidence = Math.min(99.9, Math.round((1 - pVal) * 1000) / 10);

    let status = 'INCONCLUSIVE';
    if (confidence >= 95 && zScore > 1.96 && uplift > 5) {
      status = 'WINNER: B (PROMOTE)';
      winnersToPromote.push({ exp, uplift, confidence });
    } else if (confidence >= 95 && zScore < -1.96) {
      status = 'WINNER: A (KEEP)';
    }

    summaryRows.push({
      postSlug: exp.postSlug.slice(0, 24),
      impressionsA: a.impressions,
      impressionsB: b.impressions,
      engagementRateA: `${rateA.toFixed(1)}%`,
      engagementRateB: `${rateB.toFixed(1)}%`,
      uplift: `${uplift > 0 ? '+' : ''}${uplift.toFixed(1)}%`,
      confidence: `${confidence}%`,
      decision: status
    });
  }

  console.table(summaryRows);

  console.log('\n🧠 AGENT 2 EXECUTIVE RECOMMENDATION BRIEFING:');
  console.log('------------------------------------------------------');
  if (winnersToPromote.length > 0) {
    console.log(`Found ${winnersToPromote.length} statistically significant experiments ready for promotion:`);
    winnersToPromote.forEach((w, i) => {
      console.log(`  ${i + 1}. [${w.exp.postSlug}] -> Variant B delivered +${w.uplift.toFixed(1)}% uplift at ${w.confidence}% confidence.`);
      console.log(`     Proposed Live Headline: "${w.exp.variantB.title}"`);
    });
    console.log('\nTo automatically lock in winners into MDX files, run:');
    console.log('  node scripts/analytics-agent.mjs --apply-winners\n');
  } else {
    console.log('All tests are progressing normally. Continue collecting visitor telemetry.');
  }

  // Handle --apply-winners flag
  if (process.argv.includes('--apply-winners')) {
    applyWinners(winnersToPromote);
  }
}

function applyWinners(winners) {
  console.log('\n[AGENT 2]: Writing winning Variant B data directly to MDX files...');
  let updatedCount = 0;

  for (const { exp } of winners) {
    const slug = exp.postSlug;
    const mdxPath = path.join(fieldNotesDir, `${slug}.mdx`);
    if (!fs.existsSync(mdxPath)) continue;

    let content = fs.readFileSync(mdxPath, 'utf8');
    const b = exp.variantB;

    // Update seoTitle and seoDescription in frontmatter if present or insert them
    if (content.includes('seoTitle:')) {
      content = content.replace(/seoTitle:\s*".*?"/g, `seoTitle: "${b.title}"`);
    } else {
      content = content.replace(/(publishedAt:[^\n]+)/, `$1\nseoTitle: "${b.title}"`);
    }

    if (content.includes('seoDescription:')) {
      content = content.replace(/seoDescription:\s*".*?"/g, `seoDescription: "${b.description}"`);
    } else {
      content = content.replace(/(publishedAt:[^\n]+)/, `$1\nseoDescription: "${b.description}"`);
    }

    fs.writeFileSync(mdxPath, content, 'utf8');
    updatedCount++;
    console.log(`  ✓ Updated ${slug}.mdx with winning SEO title & description.`);
  }

  console.log(`\nSuccessfully updated ${updatedCount} post(s) with winning Variant B configurations!\n`);
}

runAnalytics();
