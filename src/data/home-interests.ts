import { interestSections } from '@/data/interests';

export interface HomeInterestLane {
  title: string;
  description: string;
  href?: string;
}

export interface HomeInterestTimelineEntry {
  date: string;
  category: string;
  title: string;
  summary: string;
  href: string;
}

export const homeInterestLanes: HomeInterestLane[] = [
  ...interestSections.map((section) => ({
    title: section.title,
    description: section.description,
    href: `/interests#${section.id}`
  })),
  {
    title: 'Blog archive',
    description: 'Every post in one searchable place, with filters for category and tags.',
    href: '/blog'
  }
];

export const homeInterestTimeline: HomeInterestTimelineEntry[] = [
  {
    date: '2025-06-22',
    category: 'On the cricket field',
    title: 'SWAT vs Tampa Telugu Titans',
    summary: 'A match where 54 runs and 5 wickets mattered, but the team made the day special.',
    href: '/blog/one-of-those-days-swat-vs-tampa-telugu-titans'
  },
  {
    date: '2025-05-18',
    category: 'On the cricket field',
    title: 'Bengals vs TPCC',
    summary: 'A chase at Evans Park where 78 off 47 helped the Bengals win by 8 wickets.',
    href: '/blog/78-off-47-bengals-vs-tpcc'
  }
];
