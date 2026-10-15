// /claude project catalog (Agent 2). The single, authoritative list for /claude/garage/.
//
// Facts come from src/content/projects/*.md(x), src/pages/caia/*, src/content/caia/*,
// src/data/wc-matches.json and public/projects/worldview/index.html. Nothing here is invented:
// if a figure is not in those files it is not on a card.
//
// Deliberately excluded: `homepage` (the site itself, self-referential) and `more-tools-brewing`
// (a holding page, not a project).

import { getCollection } from 'astro:content';
import wcMatches from '@/data/wc-matches.json';
import type { ProjectCategory, ProjectItem, ProjectLifecycle } from '@/types/claude-site';

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  'fintech-sec': 'Finance & investing',
  'cricket-sports': 'Cricket & sports',
  'knowledge-systems': 'Curiosity',
};

export const LIFECYCLE_LABELS: Record<ProjectLifecycle, string> = {
  live: 'Live',
  'active-r&d': 'Active R&D',
};

/* World Cup figures, counted from the match file rather than typed in. */
const wcMatchCount = wcMatches.length;
const wcVenueCount = new Set(wcMatches.map((m) => m.venue)).size;

export const projects: ProjectItem[] = [
  {
    id: 'form-adv-data-finder',
    title: 'Regulatory Lens',
    tagline:
      'Look up any SEC-registered investment adviser and see its registration, brochure and 13F holdings in one profile you can search or ask questions of.',
    category: 'fintech-sec',
    lifecycle: 'live',
    updatedAt: '2026-06-03',
    stack: ['Astro', 'Python', 'SQLite', 'PostgreSQL', 'FastMCP', 'FastAPI', 'QLoRA / TinyLlama'],
    problem:
      'Due diligence on an investment manager starts with public filings, and my work has always sat close to it: screening hedge funds at SkyBridge, and now software for diligence teams at Dasseti. But an adviser’s registration (Form ADV Part 1), brochure (Part 2A) and 13F holdings live in three separate SEC datasets, slow to pull together by hand and not structured for AI agents. I wanted them joined into one profile.',
    architectureSummary:
      'A Python pipeline streams the SEC bulk files into SQLite, joins all three sources on the CRD number, and exposes the result through a seven-tool FastMCP server and a TinyLlama model fine-tuned with QLoRA on the brochures.',
    pipeline: ['SEC bulk files: ADV, 2A, 13F', 'Python ingest', 'SQLite, joined on CRD', 'FastMCP tools + TinyLlama', 'Search workspace'],
    // 49,574 = distinct advisers in the local store; 6.75M = 13F holdings rows (both from the project file's data table).
    keyMetricBadge: '49,574 advisers · 6.75M 13F holdings',
    href: '/garage/form-adv-data-finder/',
    ctaLabel: 'Open Regulatory Lens',
    demoId: 'demo-form-adv',
    demoLabel: 'Try the Form ADV demo',
    featuredOnHome: true,
  },
  {
    id: 'worldview',
    title: 'Worldview',
    tagline:
      'An atlas of everyday choices. Follow your curiosity into psychology, culture, ethics, and the evidence behind what we know.',
    category: 'knowledge-systems',
    lifecycle: 'live',
    updatedAt: '2026-10-08',
    stack: ['HTML', 'CSS', 'JavaScript'],
    problem:
      'I grew up in a house where reading was the answer to boredom, and one question usually leads to the next. Everyday preferences open interesting questions, but the links between behavior, culture and evidence are hard to follow. Worldview lays them out as a map you can wander.',
    architectureSummary:
      'A single static page. Each everyday choice opens a question page with research sources, their limitations, a cultural lens and a reflection prompt, and a trail keeps your path through the atlas.',
    pipeline: ['Everyday choice', 'Question page', 'Research + limits', 'Cultural lens', 'Reflection prompt'],
    // Counted from public/projects/worldview/index.html: 4 topic groups, 23 question nodes, 14 cited sources.
    keyMetricBadge: '4 doorways · 23 linked questions · 14 research sources',
    href: '/projects/worldview/',
    ctaLabel: 'Open Worldview',
    featuredOnHome: true,
  },
  {
    id: 'captains-view',
    title: 'Captains View',
    tagline:
      'Plan a cricket field by dragging players onto the ground. It checks the fielding rules on every move and mirrors the field for a left-handed batter.',
    category: 'cricket-sports',
    lifecycle: 'live',
    updatedAt: '2026-05-22',
    stack: ['Astro', 'TypeScript', 'Vanilla CSS', 'SVG'],
    problem:
      'I play league cricket across Tampa Bay. Captains still map fields on scraps of paper or generic boards that know nothing about match format, powerplays, or mirroring the field for a left-handed batter. I wanted a board that knows the rules.',
    architectureSummary:
      'An SVG ground with pointer-event dragging. A rules check runs on every drop: one bowler, one keeper, eleven on the field, and the powerplay limit on fielders outside the 30-yard circle (measured as distance from the pitch centre).',
    pipeline: ['12-player roster', 'Drag onto SVG ground', 'Role + powerplay check', 'Mirror for left-hander'],
    keyMetricBadge: 'Powerplay limit checked on every drop',
    href: '/garage/captains-view/',
    ctaLabel: 'Open Captains View',
    demoId: 'demo-fielding',
    demoLabel: 'Try the fielding demo',
    featuredOnHome: true,
  },
  {
    id: 'caia',
    title: 'CAIA Knowledge Hub',
    tagline:
      'Plain study notes, a formula sheet and a glossary for the CAIA alternative-investments curriculum: hedge funds, private equity, private debt, real assets and portfolio allocation.',
    category: 'fintech-sec',
    lifecycle: 'live',
    updatedAt: '2026-05-04',
    stack: ['Astro', 'MDX', 'KaTeX'],
    problem:
      'SkyBridge was my first close look at hedge funds and the wider world of alternative investments. The CAIA curriculum is the formal map of that world, but the material is scattered across textbooks, PDFs and formula sheets, with no single place to read, search and revise by topic.',
    architectureSummary:
      'Topic notes are written in MDX and grouped by CAIA level, with a master formula sheet and a searchable A-Z glossary alongside.',
    pipeline: ['MDX topic notes', 'Level I + II study paths', 'Formula sheet', 'A-Z glossary'],
    keyMetricBadge: '6 Level I + 2 Level II topics', // recomputed from the caia collection in getProjectCatalog()
    href: '/caia/',
    ctaLabel: 'Open the CAIA hub',
    demoId: 'demo-caia',
    demoLabel: 'Try the allocation sandbox',
    featuredOnHome: true,
  },
  {
    id: 'style-fielding',
    title: 'Fielding Style Playbook',
    tagline:
      'Watch a cricket field move between plans as a match goes on, from the powerplay to the last overs, with notes on why each change happens.',
    category: 'cricket-sports',
    lifecycle: 'live',
    updatedAt: '2026-05-22',
    stack: ['Astro', 'JavaScript', 'Vanilla CSS', 'SVG'],
    problem:
      'The same weekend cricket, a different question. Standard plans like slip traps, mid-over rings or death-over shields are hard to explain to teammates without seeing the field move between them.',
    architectureSummary:
      'A timeline slider morphs eleven fielders between four presets on an SVG ground, with a manual panel for strike handedness, powerplay and a 41-position grid.',
    pipeline: ['4 field presets', 'Timeline slider', 'Fielders glide between plans', 'Phase notes'],
    keyMetricBadge: '4 match-phase presets · 41-position grid',
    href: '/garage/style-fielding/',
    ctaLabel: 'Open the Playbook',
    demoId: 'demo-fielding',
    demoLabel: 'Try the fielding demo',
  },
  {
    id: 'world-cup-corner',
    title: 'World Cup 2026 Corner',
    tagline:
      'A clutter-free companion to the 2026 FIFA World Cup across the USA, Canada and Mexico: match schedule, group tables, team profiles and a bracket simulator.',
    category: 'cricket-sports',
    lifecycle: 'live',
    updatedAt: '2026-05-04',
    dateKind: 'launched',
    stack: ['Astro', 'TypeScript', 'CSS', 'Vanilla JS'],
    problem:
      'The 2026 World Cup came to North America, and the big sports sites buried it under ads and generic data dumps. I wanted a clean, opinionated companion.',
    architectureSummary:
      'A static Astro section built from a match file and one Markdown profile per team, with group standings and the bracket simulator running in the browser.',
    pipeline: ['Match file + team profiles', 'Static Astro pages', 'Group tables', 'Bracket simulator'],
    keyMetricBadge: `${wcMatchCount} matches · 48 team profiles · ${wcVenueCount} venues`, // team count recomputed below
    href: '/world-cup-2026/',
    ctaLabel: 'Open World Cup Corner',
  },
  {
    id: 'play',
    title: 'Play',
    tagline: 'The games I follow, the teams I turn up for, and a few predictions to keep me honest.',
    category: 'cricket-sports',
    lifecycle: 'live',
    updatedAt: '2026-10-13',
    stack: ['Astro', 'TypeScript', 'OpenF1', 'FPL'],
    problem:
      'My FPL team, race weekends and club fixtures were scattered across different tabs. Play keeps the games I follow in one place, including my own Florida cricket teams.',
    architectureSummary:
      'Season dashboards fed by the FPL and OpenF1 data, club records for my Florida cricket teams, and prediction games whose picks stay in the visitor’s browser.',
    pipeline: ['FPL + OpenF1 data', 'Season dashboards', 'Club fixtures', 'Picks saved on your device'],
    keyMetricBadge: '5 boards: FPL, F1, cricket, predictions, rivals',
    href: '/play/',
    ctaLabel: 'Open Play',
  },
  {
    id: 'adv-screener',
    title: 'ADV Screener',
    tagline:
      'Filter investment advisers by size, client type and disclosures, then line them up side by side.',
    category: 'fintech-sec',
    lifecycle: 'active-r&d',
    updatedAt: '2026-03-21',
    stack: ['Astro', 'TypeScript', 'MDX', 'SEC data'],
    problem:
      'The teams I work with at Dasseti evaluate investment managers for a living. Adviser data is public, but reading it well still means too much clicking, too much cleanup and too little side-by-side comparison.',
    architectureSummary:
      'SEC adviser data is mapped into strict TypeScript shapes and compiled into a static Astro build, so screening is instant without a heavy single-page app. Year-over-year change tracking is next on the list.',
    pipeline: ['SEC adviser data', 'Typed models', 'Static Astro build', 'Filter + compare view'],
    keyMetricBadge: 'Side-by-side adviser comparison',
    demoId: 'demo-form-adv',
    demoLabel: 'Try the Form ADV demo',
  },
  {
    id: 'manager-search',
    title: 'Manager Search',
    tagline:
      'Type a fund manager’s name and get its filings, top 13F holdings and a summary grounded in those filings.',
    category: 'fintech-sec',
    lifecycle: 'active-r&d',
    updatedAt: '2026-03-21',
    stack: ['Next.js', 'TypeScript', 'SEC API', 'OpenAI', 'Form ADV', 'Form 13F'],
    problem:
      'A diligence question usually starts with a name. Public filings contain the answers, but it still takes too much manual stitching to turn a manager’s name into a usable snapshot.',
    architectureSummary:
      'A debounced search resolves a firm name to its CRD and CIK, pulls Form ADV context and top 13F holdings, and writes a summary grounded only in those labelled filings.',
    pipeline: ['Manager name', 'CRD + CIK resolution', 'ADV context + 13F holdings', 'Grounded summary'],
    keyMetricBadge: 'CRD + CIK entity resolution',
    demoId: 'demo-form-adv',
    demoLabel: 'Related: Form ADV demo',
  },
];

/**
 * The catalog with build-time figures refreshed from the content collections, so the
 * CAIA topic count, its last-updated date and the World Cup team count never drift.
 */
export async function getProjectCatalog(): Promise<ProjectItem[]> {
  const [caiaEntries, wcTeams] = await Promise.all([
    getCollection('caia').catch(() => []),
    getCollection('wc-teams').catch(() => []),
  ]);

  return projects.map((project) => {
    if (project.id === 'caia' && caiaEntries.length) {
      const topics = caiaEntries.filter((e) => e.data.topicNumber > 0);
      const level1 = topics.filter((e) => e.data.level === 'I').length;
      const level2 = topics.filter((e) => e.data.level === 'II').length;
      const latest = caiaEntries
        .map((e) => (e.data.updatedAt ?? e.data.publishedAt).toISOString().slice(0, 10))
        .sort()
        .at(-1);
      return {
        ...project,
        keyMetricBadge: `${level1} Level I + ${level2} Level II topics`,
        updatedAt: latest ?? project.updatedAt,
      };
    }
    if (project.id === 'world-cup-corner' && wcTeams.length) {
      return {
        ...project,
        keyMetricBadge: `${wcMatchCount} matches · ${wcTeams.length} team profiles · ${wcVenueCount} venues`,
      };
    }
    return project;
  });
}
