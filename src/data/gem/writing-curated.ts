import { getCollection, type CollectionEntry } from 'astro:content';
import type { WritingItem, FinanceSubtopic } from '../../types/gem-site';

export const flagshipSlugs = [
  'uber-the-32-billion-hole',
  'the-open-syllabus',
  'adv-universe',
  'gamestop-bid-for-ebay',
  'the-streetcar-conspiracy',
  'capital-lens-16'
];

export const compendiumSlugs = [
  '100-greatest-vc-funds',
  'greatest-pe-funds',
  'greatest-vc-bets'
];

const cricketMetaMap: Record<string, NonNullable<WritingItem['cricketStats']>> = {
  'four-wickets-and-a-chase-blazehawks-vs-go-leopards': {
    matchup: 'Blazehawks vs Go Leopards',
    venue: 'Waverly Park, Tampa',
    highlightStat: '4 wkts & 44 (24)',
    outcome: 'Won by 4 wickets (Clean chase in 16.4 overs)'
  },
  'five-runs-tb-bengals-vs-mustangs': {
    matchup: 'TB Bengal Tigers vs Mustangs',
    venue: 'Tampa Regional',
    highlightStat: '5-run defense',
    outcome: 'Won by 5 runs (Death over yorker defense)'
  },
  'one-of-those-days-swat-vs-tampa-telugu-titans': {
    matchup: 'SWAT vs Tampa Telugu Titans',
    venue: 'Tampa Cricket Grounds',
    highlightStat: '54 runs & 5 wkts',
    outcome: 'Won by 8 wickets (All-round performance)'
  },
  '78-off-47-bengals-vs-tpcc': {
    matchup: 'Bengals vs TPCC',
    venue: 'Evans Park, Tampa',
    highlightStat: '78 off 47 balls',
    outcome: 'Won by 8 wickets (Chasing 165)'
  },
  'seven-to-defend-swat-vs-royal-phoenix': {
    matchup: 'SWAT vs Royal Phoenix',
    venue: 'Tampa Regional Field',
    highlightStat: '29 (24) & defended 7',
    outcome: 'Won by 3 runs (Target 132 defended)'
  }
};

const bookAuthorMap: Record<string, { author: string; theme: 'Markets & Wall Street' | 'Founders & Systems' | 'Meaning & Craft'; note?: string }> = {
  'going-infinite': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'liars-poker': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'flash-boys': { author: 'Michael Lewis', theme: 'Markets & Wall Street' },
  'what-it-takes': { author: 'Stephen A. Schwarzman', theme: 'Markets & Wall Street' },
  'the-accidental-billionaires': { author: 'Ben Mezrich', theme: 'Markets & Wall Street' },
  'elon-musk': { author: 'Walter Isaacson', theme: 'Founders & Systems' },
  'the-heart-of-business': { author: 'Hubert Joly', theme: 'Founders & Systems' },
  'the-ride-of-a-lifetime': { author: 'Robert Iger', theme: 'Founders & Systems' },
  'steve-jobs': { author: 'Walter Isaacson', theme: 'Founders & Systems' },
  'the-everything-store': { author: 'Brad Stone', theme: 'Founders & Systems' },
  'creativity-inc': { author: 'Ed Catmull & Amy Wallace', theme: 'Founders & Systems' },
  'good-to-great': {
    author: 'Jim Collins',
    theme: 'Founders & Systems',
    note: 'Recommended by my mentor and the CEO during my summer 2021 internship at SkyBridge Associates.'
  },
  'shoe-dog': { author: 'Phil Knight', theme: 'Founders & Systems' },
  'zero-to-one': { author: 'Peter Thiel & Blake Masters', theme: 'Founders & Systems' },
  'designing-your-life': { author: 'Bill Burnett & Dave Evans', theme: 'Meaning & Craft' },
  'the-spy-and-the-traitor': { author: 'Ben Macintyre', theme: 'Meaning & Craft' },
  'becoming': { author: 'Michelle Obama', theme: 'Meaning & Craft' },
  'educated': { author: 'Tara Westover', theme: 'Meaning & Craft' },
  'eat-pray-love': { author: 'Elizabeth Gilbert', theme: 'Meaning & Craft' },
  'the-subtle-art-of-not-giving-a-fck': { author: 'Mark Manson', theme: 'Meaning & Craft' },
  'the-last-lecture': { author: 'Randy Pausch & Jeffrey Zaslow', theme: 'Meaning & Craft' },
  'siddhartha': { author: 'Hermann Hesse', theme: 'Meaning & Craft' },
  'mans-search-for-meaning': { author: 'Viktor E. Frankl', theme: 'Meaning & Craft' }
};

export async function getCuratedWriting(): Promise<WritingItem[]> {
  const entries: CollectionEntry<'field-notes'>[] = await getCollection(
    'field-notes',
    (entry: CollectionEntry<'field-notes'>) => !entry.data.draft
  );

  const itemMap = new Map<string, WritingItem>();

  for (const entry of entries) {
    const { data, slug } = entry;
    const isFlagship = flagshipSlugs.includes(slug);
    const isCompendium = compendiumSlugs.includes(slug);

    let stream: WritingItem['stream'] = 'market-briefs';
    if (data.category === 'Cricket' || cricketMetaMap[slug]) {
      stream = 'cricket';
    } else if (data.category === 'Books' || bookAuthorMap[slug]) {
      stream = 'books';
    } else if (isFlagship) {
      stream = 'deep-research';
    }

    const bookInfo = bookAuthorMap[slug];

    itemMap.set(slug, {
      slug,
      title: data.title.replace(/\u2014/g, ': ').trim(),
      summary: data.excerpt.replace(/\u2014/g, ', ').trim(),
      publishedAt: data.publishedAt.toISOString().slice(0, 10),
      readingMinutes: Number.parseInt(data.readingTime || '10', 10) || 8,
      stream,
      subtopic: (data.subCategory as FinanceSubtopic) || 'General',
      featuredTier: isFlagship ? 'flagship' : isCompendium ? 'archive-listicle' : 'standard',
      cricketStats: cricketMetaMap[slug],
      bookMeta: bookInfo
        ? {
            author: bookInfo.author,
            personalContextNote: bookInfo.note,
            category: bookInfo.theme
          }
        : undefined
    });
  }

  return [...itemMap.values()].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}
