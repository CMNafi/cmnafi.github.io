export type SiteBranchId = 'journey' | 'timeline' | 'projects' | 'connect' | 'interests';

export interface SiteTreeNode {
  label: string;
  href: string;
  description: string;
  kind?: 'primary' | 'secondary';
}

export interface SiteBranch {
  id: SiteBranchId;
  label: string;
  href: string;
  eyebrow: string;
  description: string;
  nodes: SiteTreeNode[];
}

export const siteBranches: SiteBranch[] = [
  {
    id: 'journey',
    label: 'Journey',
    href: '/story',
    eyebrow: 'Journey',
    description: 'The places, schools, cities, and jobs that made the rest of the site make sense.',
    nodes: [
      { label: 'Journey', href: '/story', description: 'The longer account of how I moved from Dinajpur to where I am now.' },
      { label: 'Life Walk Preview', href: '/walking-through-life', description: 'A more visual version of the same route through places and turning points.', kind: 'secondary' }
    ]
  },
  {
    id: 'timeline',
    label: 'Field Notes',
    href: '/field-notes',
    eyebrow: 'Field Notes',
    description: 'The running archive for how capital moves, cricket writing, and books.',
    nodes: [
      { label: 'Field Notes', href: '/field-notes', description: 'Everything gathered into one readable stream.' },
      { label: 'Interests', href: '/interests', description: 'The same archive split into topics.', kind: 'secondary' },
      { label: 'Now', href: '/now', description: 'What I am working on right now.', kind: 'secondary' }
    ]
  },
  {
    id: 'projects',
    label: 'Garage',
    href: '/garage',
    eyebrow: 'Garage',
    description: 'The tools I keep building because I have run into the friction myself.',
    nodes: [
      { label: 'Garage', href: '/garage', description: 'The main shelf for product ideas, tools, and working prototypes.' },
      { label: 'ADV Screener', href: '/garage/adv-screener', description: 'Screening Form ADV filings across investment advisers.', kind: 'secondary' },
      { label: 'Manager Search', href: '/garage/manager-search', description: 'A finance research tool built around a workflow I wanted to move faster.', kind: 'secondary' }
    ]
  },
  {
    id: 'connect',
    label: 'Connect',
    href: '/connect',
    eyebrow: 'Connect',
    description: 'The pages that explain what I am doing now, what I care about, and how to reach me.',
    nodes: [
      { label: 'Connect', href: '/connect', description: 'The easiest way to understand what kinds of conversations I want to have.' },
      { label: 'About', href: '/about', description: 'Why this site exists and what I wanted it to hold.', kind: 'secondary' },
      { label: 'Now', href: '/now', description: 'A more personal snapshot of what I am reading, building, and thinking about.', kind: 'secondary' },
      { label: 'TBD', href: '/tbd', description: 'The sections that are still rough and not fully in my voice yet.', kind: 'secondary' }
    ]
  },
  {
    id: 'interests',
    label: 'Interests',
    href: '/interests',
    eyebrow: 'Interests',
    description: 'The two public rooms that feel most like me now: books and cricket.',
    nodes: [
      { label: 'Interests', href: '/interests', description: 'The public split between my book shelf and my cricket writing.' },
      { label: 'Cricket', href: '/interests/cricket', description: 'Match stories, pressure moments, and the game as I actually remember it.' },
      { label: 'Books', href: '/interests/books', description: 'The books that stayed with me strongly enough to deserve a note.' },
      { label: 'TBD', href: '/tbd', description: 'Movies, writing, projects, and the rougher edges that are not core yet.', kind: 'secondary' },
      { label: 'Cricket Archive', href: '/adventures/cricket', description: 'The deeper cricket record with stats, teams, and longer memory.', kind: 'secondary' },
      { label: 'Adventures', href: '/adventures', description: 'The broader life archive, with cricket leading the way.', kind: 'secondary' }
    ]
  }
];

export const getSiteBranch = (id: SiteBranchId) => siteBranches.find((branch) => branch.id === id);
