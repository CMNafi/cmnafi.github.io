// Shared TypeScript contract for the /claude redesign (all three agents import from here).

export type ProjectCategory = 'fintech-sec' | 'cricket-sports' | 'knowledge-systems';
export type ProjectLifecycle = 'live' | 'active-r&d';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  lifecycle: ProjectLifecycle;
  updatedAt: string;
  stack: string[];
  problem: string;
  architectureSummary: string;
  /** Pipeline pill stages, e.g. ['Raw SEC bulk ZIP', 'SQLite store', 'FastMCP server', 'Astro UI'] */
  pipeline: string[];
  keyMetricBadge: string; // a real metric, never a fake status
  href?: string;
  featuredOnHome?: boolean;
  /* ---- Added by Agent 2 (catalog). All optional; nothing above changes. ---- */
  /** What `updatedAt` means: the source file's updatedAt, or its startedAt when no update is recorded. Default 'updated'. */
  dateKind?: 'updated' | 'launched';
  /** Label for the launch button, e.g. 'Open Worldview'. */
  ctaLabel?: string;
  /** Id of the on-page interactive demo on /claude/garage/ (e.g. 'demo-form-adv'). */
  demoId?: string;
  /** Short label for the demo link, e.g. 'Try the Form ADV demo'. */
  demoLabel?: string;
}

/** 'notes' (added by Agent 2) holds the short taste notes filed under the source 'Brewing' category. */
export type WritingStream = 'deep-research' | 'market-briefs' | 'books' | 'cricket' | 'notes';
export type FinanceSubtopic = 'Venture Capital' | 'Private Equity' | 'Public Equities' | 'Macro' | 'General';

export interface WritingItem {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // YYYY-MM-DD
  readingMinutes: number;
  stream: WritingStream;
  subtopic?: FinanceSubtopic;
  featuredTier?: 'flagship' | 'standard' | 'archive-listicle';
  cricketStats?: {
    matchup: string;
    venue?: string;
    highlightStat: string;
    outcome: string;
    /* Added by Agent 2 */
    /** Match day (YYYY-MM-DD) when it differs from publishedAt. */
    matchDate?: string;
    competition?: string;
    /** Scoreline as reported in the post, e.g. 'TPCC 129/7 (16) · Bengals 133/2 (15.2)'. */
    scoreline?: string;
  };
  bookMeta?: {
    author: string;
    theme?: 'Markets & Wall Street' | 'Founders & Systems' | 'Meaning & Craft';
    personalContextNote?: string;
  };
  /* ---- Added by Agent 2 (curation layer). All optional. ---- */
  /** Canonical live URL, e.g. '/field-notes/<slug>'. */
  href?: string;
  /** Short editorial label above a flagship title, e.g. 'Systems & Learning'. */
  kicker?: string;
  /** Key figure drawn from the post itself, e.g. { figure: '$32.8B', label: 'accumulated deficit by 2022' }. */
  callout?: { figure: string; label: string };
  /** Ledger grouping: 'compendium' rows collapse into one 'Historical data compendiums' row. */
  ledgerGroup?: 'compendium';
}

/* ---- Island contracts (Agent 3 implements, Agents 1 and 2 mount) ---- */

export interface IslandProps {
  /** Smaller footprint for bento cards / previews */
  compact?: boolean;
}

export type JourneyStopId = 'dinajpur' | 'changshu' | 'iowa' | 'florida';

/**
 * JourneyAtlasMap <-> Story page wiring:
 * - Story chapter sections use id={`chapter-${JourneyStopId}`}.
 * - Selecting a stop on the map scrolls to that section (if present) and dispatches
 *   `document.dispatchEvent(new CustomEvent('journey:select', { detail: { id } }))`.
 * - The page can ask the map to highlight a stop with
 *   `document.dispatchEvent(new CustomEvent('journey:focus', { detail: { id } }))`.
 */
export interface JourneyEventDetail {
  id: JourneyStopId;
}
