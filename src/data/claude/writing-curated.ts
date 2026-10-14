// /claude Field Notes curation layer (Agent 2).
//
// This file holds ONLY editorial decisions: which posts are flagships, the key figure each
// flagship leads with, cricket scorecard details, book authors/themes and personal notes.
// Titles, dates, excerpts and reading times always come from src/content/field-notes via
// getCollection() at build time, so a new post shows up on /claude/field-notes/ automatically
// (Finance -> essay ledger, Cricket -> match logs, Books -> shelf, Brewing -> notes).
//
// Every figure below was checked against the post it belongs to.

import { getCollection, type CollectionEntry } from 'astro:content';
import type { FinanceSubtopic, WritingItem } from '@/types/claude-site';
import { parseReadingMinutes } from './format';

type NoteEntry = CollectionEntry<'field-notes'>;
type BookTheme = NonNullable<WritingItem['bookMeta']>['theme'];

/* ------------------------------------------------------------------ */
/* Section A: flagship deep research, in display order (lead first).   */
/* ------------------------------------------------------------------ */
export const FLAGSHIPS: Array<{ slug: string; kicker: string; callout: { figure: string; label: string } }> = [
  {
    slug: 'uber-the-32-billion-hole',
    kicker: 'Venture Capital · Deep dive',
    callout: { figure: '$32.8B', label: 'accumulated deficit by the end of 2022, and $24.8B of it refilled in 42 months' },
  },
  {
    slug: 'the-open-syllabus',
    kicker: 'Systems & Learning',
    callout: { figure: '55', label: 'free YouTube channels in eight tracks, on a five-hour weekly budget' },
  },
  {
    slug: 'adv-universe',
    kicker: 'Regulatory data',
    callout: { figure: '56,107', label: 'SEC-registered advisers analyzed, from assets to disclosures' },
  },
  {
    slug: 'gamestop-bid-for-ebay',
    kicker: 'Public Equities · M&A',
    callout: { figure: '$55.5B', label: 'offered by an $11.9B company for one worth $46.2B' },
  },
  {
    slug: 'the-streetcar-conspiracy',
    kicker: 'Macro · History',
    callout: { figure: '$5,001', label: 'the 1949 penalty: $5,000 for GM, $1 for its treasurer' },
  },
  {
    slug: 'capital-lens-16',
    kicker: 'Capital Lens · Sports money',
    callout: { figure: '~$90B', label: 'of 2025 distributable revenue traced across twelve sports' },
  },
];

/* ------------------------------------------------------------------ */
/* Section B: essay ledger grouping.                                    */
/* ------------------------------------------------------------------ */

/** The March 2026 "100 Greatest" rankings collapse into one 'Historical data compendiums' row. */
export const COMPENDIUM_SLUGS = ['greatest-vc-bets', 'greatest-pe-funds', '100-greatest-vc-funds'];

/**
 * Late-March 2026 burst of shorter explainers. They stay in the ledger, every one of them,
 * but sit in their own quieter "Archive" group so the newer, longer work reads first.
 * Any non-flagship Finance post published inside this window lands there.
 */
export const ARCHIVE_WINDOW = { from: '2026-03-01', to: '2026-03-31', label: 'March 2026 explainers' };

export const SUBTOPICS: FinanceSubtopic[] = ['Venture Capital', 'Private Equity', 'Public Equities', 'Macro', 'General'];

/* ------------------------------------------------------------------ */
/* Section C: cricket scorecards (checked against each match report).  */
/* ------------------------------------------------------------------ */
export const CRICKET: Record<string, NonNullable<WritingItem['cricketStats']>> = {
  'four-wickets-and-a-chase-blazehawks-vs-go-leopards': {
    matchup: 'Blazehawks vs Go Leopards',
    venue: 'Waverly Cricket Field, Tampa',
    competition: 'FT20 League',
    highlightStat: '4-33 and 44 off 24',
    outcome: 'Won by 6 wickets',
    scoreline: 'Go Leopards 149/8 (20) · Blazehawks 150/4 (16.3)',
  },
  'five-runs-tb-bengals-vs-mustangs': {
    // Published Mar 24; the post dates the match itself to Mar 21.
    matchup: 'TB Bengal Tigers vs Mustangs',
    highlightStat: '68 off 34 and a run-out',
    outcome: 'Won by 5 runs',
    matchDate: '2026-03-21',
    competition: 'League',
    scoreline: 'TB Bengal Tigers 128/7 (16) · Mustangs 123 all out',
  },
  'one-of-those-days-swat-vs-tampa-telugu-titans': {
    matchup: 'SWAT vs Tampa Telugu Titans',
    highlightStat: '5/27 and 54 off 44',
    outcome: 'Won by 8 wickets (DLS)',
    scoreline: 'Tampa Telugu Titans 136/6 (20) · SWAT 101/2 (12.5)',
  },
  '78-off-47-bengals-vs-tpcc': {
    matchup: 'Bengals vs TPCC',
    venue: 'Evans Park',
    highlightStat: '78 off 47',
    outcome: 'Won by 8 wickets',
    scoreline: 'TPCC 129/7 (16) · Bengals 133/2 (15.2)',
  },
  'seven-to-defend-swat-vs-royal-phoenix': {
    matchup: 'SWAT vs Royal Phoenix',
    highlightStat: '29 off 24, then defended 7 in the last over',
    outcome: 'Won by 3 runs',
    scoreline: 'SWAT 95/6 (16) · Royal Phoenix needed 7 off the last over',
  },
};

/* ------------------------------------------------------------------ */
/* Section D: the annotated bookshelf.                                  */
/* ------------------------------------------------------------------ */
export const SHELF_THEMES: Array<{ theme: NonNullable<BookTheme>; blurb: string }> = [
  { theme: 'Markets & Wall Street', blurb: 'How finance really behaves, from the trading floor to the plumbing.' },
  { theme: 'Founders & Systems', blurb: 'How companies get built, run and repaired.' },
  { theme: 'Meaning & Craft', blurb: 'Memoir, fiction and the slower questions.' },
];

export const BOOKS: Record<string, NonNullable<WritingItem['bookMeta']>> = {
  // Markets & Wall Street
  'flash-boys': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'liars-poker': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'going-infinite': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'what-it-takes': { author: 'Stephen A. Schwarzman', theme: 'Markets & Wall Street' },
  // Founders & Systems
  'good-to-great': {
    author: 'Jim Collins',
    theme: 'Founders & Systems',
    personalContextNote:
      'Read in the summer of 2021, while I was interning at Skybridge Associates. My mentor and the firm’s CEO suggested it.',
  },
  'shoe-dog': { author: 'Phil Knight', theme: 'Founders & Systems' },
  'the-everything-store': { author: 'Brad Stone', theme: 'Founders & Systems' },
  'zero-to-one': { author: 'Peter Thiel with Blake Masters', theme: 'Founders & Systems' },
  'steve-jobs': { author: 'Walter Isaacson', theme: 'Founders & Systems' },
  'elon-musk': { author: 'Walter Isaacson', theme: 'Founders & Systems' },
  'the-accidental-billionaires': { author: 'Ben Mezrich', theme: 'Founders & Systems' },
  'creativity-inc': { author: 'Ed Catmull', theme: 'Founders & Systems' },
  'the-ride-of-a-lifetime': { author: 'Bob Iger', theme: 'Founders & Systems' },
  'the-heart-of-business': { author: 'Hubert Joly', theme: 'Founders & Systems' },
  // Meaning & Craft
  'mans-search-for-meaning': { author: 'Viktor Frankl', theme: 'Meaning & Craft' },
  siddhartha: { author: 'Hermann Hesse', theme: 'Meaning & Craft' },
  'the-last-lecture': { author: 'Randy Pausch', theme: 'Meaning & Craft' },
  'the-subtle-art-of-not-giving-a-fck': { author: 'Mark Manson', theme: 'Meaning & Craft' },
  becoming: { author: 'Michelle Obama', theme: 'Meaning & Craft' },
  educated: { author: 'Tara Westover', theme: 'Meaning & Craft' },
  'eat-pray-love': { author: 'Elizabeth Gilbert', theme: 'Meaning & Craft' },
  'designing-your-life': { author: 'Bill Burnett and Dave Evans', theme: 'Meaning & Craft' },
  'the-spy-and-the-traitor': { author: 'Ben Macintyre', theme: 'Meaning & Craft' },
};

/* ------------------------------------------------------------------ */
/* The join.                                                            */
/* ------------------------------------------------------------------ */

export interface ShelfGroup {
  theme: string;
  blurb?: string;
  books: WritingItem[];
}

export interface CuratedWriting {
  flagships: WritingItem[];
  ledger: {
    /** Newer Finance essays, newest first. */
    recent: WritingItem[];
    /** The "100 Greatest" rankings, shown as one collapsible row. */
    compendiums: WritingItem[];
    /** The late-March 2026 explainers, newest first. */
    archive: WritingItem[];
    archiveLabel: string;
  };
  cricket: WritingItem[];
  shelf: ShelfGroup[];
  notes: WritingItem[];
  counts: {
    all: number;
    essays: number;
    ledger: number;
    cricket: number;
    shelf: number;
    notes: number;
  };
}

const byNewest = (a: WritingItem, b: WritingItem) => b.publishedAt.localeCompare(a.publishedAt);

function toItem(entry: NoteEntry, extra: Partial<WritingItem> & Pick<WritingItem, 'stream'>): WritingItem {
  const d = entry.data;
  return {
    slug: entry.slug,
    title: d.title,
    summary: d.excerpt || d.description,
    publishedAt: d.publishedAt.toISOString().slice(0, 10),
    readingMinutes: parseReadingMinutes(d.readingTime),
    subtopic: d.subCategory,
    href: `/field-notes/${entry.slug}`,
    featuredTier: 'standard',
    ...extra,
  };
}

export async function getCuratedWriting(): Promise<CuratedWriting> {
  const entries = (await getCollection('field-notes')).filter((e) => !e.data.draft);
  const bySlug = new Map(entries.map((e) => [e.slug, e]));
  const placed = new Set<string>();

  // A. Flagships (curation order).
  const flagships: WritingItem[] = [];
  for (const f of FLAGSHIPS) {
    const entry = bySlug.get(f.slug);
    if (!entry) continue;
    placed.add(entry.slug);
    flagships.push(
      toItem(entry, { stream: 'deep-research', featuredTier: 'flagship', kicker: f.kicker, callout: f.callout }),
    );
  }

  const recent: WritingItem[] = [];
  const compendiums: WritingItem[] = [];
  const archive: WritingItem[] = [];
  const cricket: WritingItem[] = [];
  const books: WritingItem[] = [];
  const notes: WritingItem[] = [];

  for (const entry of entries) {
    if (placed.has(entry.slug)) continue;
    placed.add(entry.slug);
    const { category } = entry.data;

    if (category === 'Cricket') {
      cricket.push(toItem(entry, { stream: 'cricket', cricketStats: CRICKET[entry.slug] }));
    } else if (category === 'Books') {
      books.push(toItem(entry, { stream: 'books', bookMeta: BOOKS[entry.slug] }));
    } else if (category === 'Brewing') {
      notes.push(toItem(entry, { stream: 'notes' }));
    } else {
      // Finance (and anything uncategorised) goes to the essay ledger.
      const item = toItem(entry, { stream: 'market-briefs', subtopic: entry.data.subCategory ?? 'General' });
      if (COMPENDIUM_SLUGS.includes(entry.slug)) {
        compendiums.push({ ...item, ledgerGroup: 'compendium' });
      } else if (item.publishedAt >= ARCHIVE_WINDOW.from && item.publishedAt <= ARCHIVE_WINDOW.to) {
        archive.push({ ...item, featuredTier: 'archive-listicle' });
      } else {
        recent.push(item);
      }
    }
  }

  recent.sort(byNewest);
  archive.sort(byNewest);
  compendiums.sort(byNewest);
  cricket.sort(byNewest);
  notes.sort(byNewest);

  // D. Shelf, grouped by theme; anything new without a theme lands in a trailing group.
  const shelf: ShelfGroup[] = SHELF_THEMES.map(({ theme, blurb }) => ({
    theme,
    blurb,
    books: books.filter((b) => b.bookMeta?.theme === theme).sort((a, b) => a.title.localeCompare(b.title)),
  }));
  const unthemed = books.filter((b) => !b.bookMeta?.theme).sort(byNewest);
  if (unthemed.length) shelf.push({ theme: 'New on the shelf', books: unthemed });

  const ledgerCount = recent.length + compendiums.length + archive.length;
  return {
    flagships,
    ledger: { recent, compendiums, archive, archiveLabel: ARCHIVE_WINDOW.label },
    cricket,
    shelf: shelf.filter((g) => g.books.length),
    notes,
    counts: {
      all: entries.length,
      essays: flagships.length + ledgerCount,
      ledger: ledgerCount,
      cricket: cricket.length,
      shelf: books.length,
      notes: notes.length,
    },
  };
}
