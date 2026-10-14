import { getCollection, type CollectionEntry } from 'astro:content';
import type { WritingItem } from '../../types/codex-site';
export const flagshipSlugs = ['uber-the-32-billion-hole','the-open-syllabus','adv-universe','gamestop-bid-for-ebay','the-streetcar-conspiracy','capital-lens-16'];
export const compendiumSlugs = ['100-greatest-vc-funds','greatest-pe-funds','greatest-vc-bets'];
const cricket: Record<string, NonNullable<WritingItem['cricketStats']>> = {
  'four-wickets-and-a-chase-blazehawks-vs-go-leopards': {matchup:'Blazehawks vs Go Leopards',venue:'Waverly',highlightStat:'4 wickets & 44 off 24',outcome:'Won by 6 wickets'},
  'five-runs-tb-bengals-vs-mustangs': {matchup:'TB Bengal Tigers vs Mustangs',highlightStat:'Last-over defense',outcome:'Won by 5 runs'},
  'one-of-those-days-swat-vs-tampa-telugu-titans': {matchup:'SWAT vs Tampa Telugu Titans',highlightStat:'54 runs & 5 wickets',outcome:'Won by 8 wickets (D/L)'},
  '78-off-47-bengals-vs-tpcc': {matchup:'Bengals vs TPCC',venue:'Evans Park',highlightStat:'78 off 47',outcome:'Won by 8 wickets'},
  'seven-to-defend-swat-vs-royal-phoenix': {matchup:'SWAT vs Royal Phoenix',highlightStat:'29 off 24 · Defended 7',outcome:'Won by 3 runs'},
};
const authors: Record<string,string> = {
  'going-infinite':'Michael Lewis','liars-poker':'Michael Lewis','elon-musk':'Walter Isaacson',
  'the-heart-of-business':'Hubert Joly','designing-your-life':'Bill Burnett & Dave Evans','the-spy-and-the-traitor':'Ben Macintyre',
  'the-accidental-billionaires':'Ben Mezrich','the-ride-of-a-lifetime':'Robert Iger','what-it-takes':'Stephen A. Schwarzman',
  'steve-jobs':'Walter Isaacson','becoming':'Michelle Obama','the-everything-store':'Brad Stone','creativity-inc':'Ed Catmull & Amy Wallace',
  'good-to-great':'Jim Collins','educated':'Tara Westover','eat-pray-love':'Elizabeth Gilbert','shoe-dog':'Phil Knight',
  'zero-to-one':'Peter Thiel & Blake Masters','flash-boys':'Michael Lewis','the-subtle-art-of-not-giving-a-fck':'Mark Manson',
  'the-last-lecture':'Randy Pausch & Jeffrey Zaslow','siddhartha':'Hermann Hesse','mans-search-for-meaning':'Viktor E. Frankl',
};
export function bookTheme(item: WritingItem): string {
  if (['going-infinite','liars-poker','flash-boys','what-it-takes','the-accidental-billionaires'].includes(item.slug)) return 'Markets & Wall Street';
  if (['elon-musk','the-heart-of-business','the-ride-of-a-lifetime','steve-jobs','the-everything-store','creativity-inc','good-to-great','shoe-dog','zero-to-one'].includes(item.slug)) return 'Founders & Systems';
  return 'Meaning & Craft';
}
export async function getWritingItems(): Promise<WritingItem[]> {
  const entries: CollectionEntry<'field-notes'>[] = await getCollection('field-notes', (entry: CollectionEntry<'field-notes'>) => !entry.data.draft);
  const unique = new Map<string,WritingItem>();
  for (const entry of entries) {
    const {data,slug} = entry;
    const flagship = flagshipSlugs.includes(slug);
    const stream = data.category === 'Cricket' ? 'cricket' : data.category === 'Books' && !flagship ? 'books' : flagship ? 'deep-research' : 'market-briefs';
    unique.set(slug, {
      slug, title:data.title.replace(/\u2014/g, ': '), summary:data.excerpt.replace(/\u2014/g, ', '),
      publishedAt:data.publishedAt.toISOString().slice(0,10), readingMinutes:Number.parseInt(data.readingTime,10) || 5,
      stream, subtopic:data.subCategory ?? 'General', featuredTier:flagship ? 'flagship' : compendiumSlugs.includes(slug) ? 'archive-listicle' : 'standard',
      cricketStats:cricket[slug], bookMeta:stream === 'books' ? {author:authors[slug] ?? '', personalContextNote:slug === 'good-to-great' ? 'Recommended by my mentor and the CEO during my summer 2021 internship at SkyBridge Associates.' : undefined} : undefined,
    });
  }
  return [...unique.values()].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt));
}
