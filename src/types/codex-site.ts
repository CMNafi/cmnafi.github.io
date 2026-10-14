export type ProjectCategory = 'fintech-sec' | 'cricket-sports' | 'knowledge-systems';
export type ProjectLifecycle = 'live' | 'active-r&d';
export interface ProjectItem {
  id: string; title: string; tagline: string; category: ProjectCategory;
  lifecycle: ProjectLifecycle; updatedAt: string; stack: string[]; problem: string;
  architectureSummary: string; keyMetricBadge: string; href?: string; featuredOnHome?: boolean;
}
export type WritingStream = 'deep-research' | 'market-briefs' | 'books' | 'cricket';
export type FinanceSubtopic = 'Venture Capital' | 'Private Equity' | 'Public Equities' | 'Macro' | 'General';
export interface WritingItem {
  slug: string; title: string; summary: string; publishedAt: string; readingMinutes: number;
  stream: WritingStream; subtopic?: FinanceSubtopic; featuredTier?: 'flagship' | 'standard' | 'archive-listicle';
  cricketStats?: { matchup: string; venue?: string; highlightStat: string; outcome: string };
  bookMeta?: { author: string; personalContextNote?: string };
}
