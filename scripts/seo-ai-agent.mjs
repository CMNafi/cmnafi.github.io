// scripts/seo-ai-agent.mjs
// Agent 1: Autonomous SEO & AI Content Optimization Agent
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const fieldNotesDir = path.join(rootDir, 'src', 'content', 'field-notes');
const experimentsPath = path.join(rootDir, 'src', 'data', 'ab-experiments.json');

// Simple frontmatter parser
function parseMdx(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { frontmatter: {}, body: content };
  const yaml = match[1];
  const body = content.slice(match[0].length);
  const frontmatter = {};

  yaml.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      let val = line.slice(colonIdx + 1).trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      frontmatter[key] = val;
    }
  });

  return { frontmatter, body };
}

function runAudit() {
  console.log('\n======================================================');
  console.log('🤖 AGENT 1: SEO & AI CONTENT OPTIMIZATION AGENT');
  console.log('======================================================\n');
  console.log(`Scanning content in: ${fieldNotesDir}\n`);

  if (!fs.existsSync(fieldNotesDir)) {
    console.error(`Directory not found: ${fieldNotesDir}`);
    return;
  }

  const files = fs.readdirSync(fieldNotesDir).filter(f => f.endsWith('.mdx') || f.endsWith('.md'));
  console.log(`Discovered ${files.length} field note articles.\n`);

  const results = [];

  for (const file of files) {
    const fullPath = path.join(fieldNotesDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { frontmatter, body } = parseMdx(raw);
    const slug = file.replace(/\.(mdx|md)$/, '');

    const title = frontmatter.title || slug;
    const desc = frontmatter.description || '';
    const hasSeoTitle = Boolean(frontmatter.seoTitle);
    const hasSeoDesc = Boolean(frontmatter.seoDescription);
    const hasAiBlock = raw.includes('Executive Takeaway') || raw.includes('Key Insights') || raw.includes('TL;DR');

    let seoScore = 40;
    if (title.length >= 40 && title.length <= 70) seoScore += 15;
    else if (title.length > 20) seoScore += 8;
    if (desc.length >= 120 && desc.length <= 165) seoScore += 20;
    if (hasSeoTitle) seoScore += 10;
    if (hasSeoDesc) seoScore += 10;

    let aiScore = 35;
    if (hasAiBlock) aiScore += 35;
    if (raw.includes('## ') || raw.includes('<h3>')) aiScore += 15;
    if (raw.toLowerCase().includes('billion') || raw.toLowerCase().includes('percent') || raw.toLowerCase().includes('sec')) aiScore += 15;

    seoScore = Math.min(100, seoScore);
    aiScore = Math.min(100, aiScore);
    const overall = Math.round(seoScore * 0.45 + aiScore * 0.55);

    results.push({
      slug,
      title: title.slice(0, 42),
      seoScore,
      aiScore,
      overall,
      hasAiBlock
    });
  }

  // Print top 15 results
  console.table(results.slice(0, 15));

  const avgSeo = Math.round(results.reduce((acc, r) => acc + r.seoScore, 0) / results.length);
  const avgAi = Math.round(results.reduce((acc, r) => acc + r.aiScore, 0) / results.length);
  const avgOverall = Math.round(results.reduce((acc, r) => acc + r.overall, 0) / results.length);

  console.log(`\nSITE-WIDE SUMMARY:`);
  console.log(`Average SEO Score:          ${avgSeo}/100`);
  console.log(`Average AI Citability (AIO): ${avgAi}/100`);
  console.log(`Overall Health Score:       ${avgOverall}/100`);
  console.log(`Active Experiments:         Check src/data/ab-experiments.json`);
  console.log('\n[AGENT 1]: Audit finished. Use --sync to update active A/B experiments.\n');
}

runAudit();
