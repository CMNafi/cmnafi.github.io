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
    eyebrow: 'Journey branch',
    description: 'Biography, movement, geography, and the long-form route that explains the work.',
    nodes: [
      { label: 'Journey', href: '/story', description: 'The main long-form route through places, institutions, and work.' },
      { label: 'Life Walk Preview', href: '/walking-through-life', description: 'An alternate cinematic version of the same personal route.', kind: 'secondary' }
    ]
  },
  {
    id: 'timeline',
    label: 'Timeline',
    href: '/blog',
    eyebrow: 'Timeline branch',
    description: 'The chronological stream where books, cricket, movies, and writing meet in one place.',
    nodes: [
      { label: 'Timeline', href: '/blog', description: 'The unified reverse-chronological feed for the whole site.' },
      { label: 'Interests Hub', href: '/interests', description: 'A world-first way into the same content through themed rooms.', kind: 'secondary' },
      { label: 'Notes', href: '/notes', description: 'A shorter-form layer for fragments, signals, and in-between ideas.', kind: 'secondary' }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    href: '/projects',
    eyebrow: 'Projects branch',
    description: 'Products, tools, apps, and the more practical systems built out of the same thinking.',
    nodes: [
      { label: 'Projects', href: '/projects', description: 'The main library of builds, public tools, and experiments.' },
      { label: 'Apps', href: '/apps', description: 'Focused app surfaces for deeper workflows and productized tools.', kind: 'secondary' },
      { label: 'Manager Search', href: '/apps/manager-search', description: 'The flagship institutional-intelligence app.', kind: 'secondary' }
    ]
  },
  {
    id: 'connect',
    label: 'Connect',
    href: '/connect',
    eyebrow: 'Connect branch',
    description: 'Public context, current direction, and the pages that help people understand how to reach out.',
    nodes: [
      { label: 'Connect', href: '/connect', description: 'The direct public-facing page for conversations and collaboration.' },
      { label: 'About', href: '/about', description: 'The short explanation of the site and the thinking behind it.', kind: 'secondary' },
      { label: 'Now', href: '/now', description: 'The current snapshot of what is active and in motion.', kind: 'secondary' },
      { label: 'Brewing', href: '/brewing', description: 'The lab layer for active builds, experiments, and work in progress.', kind: 'secondary' }
    ]
  },
  {
    id: 'interests',
    label: 'Interests',
    href: '/interests',
    eyebrow: 'Interests branch',
    description: 'Themed worlds for the parts of life and culture that deserve their own visual language.',
    nodes: [
      { label: 'Interests Hub', href: '/interests', description: 'The four-doorway hub into the site’s themed worlds.' },
      { label: 'Cricket', href: '/interests/cricket', description: 'The story-led cricket world and match writing layer.' },
      { label: 'Books', href: '/interests/books', description: 'The reading-room shelf for books and reflective notes.' },
      { label: 'Movies', href: '/interests/movies', description: 'The film room for reviews, scenes, and cinema notes.' },
      { label: 'Writing & Ideas', href: '/interests/writing', description: 'The journal-style room for essays, systems, and fragments.' },
      { label: 'Cricket Archive', href: '/adventures/cricket', description: 'The deeper cricket archive with live stats and admin tools.', kind: 'secondary' },
      { label: 'Adventures', href: '/adventures', description: 'The broader lived-experience archive around cricket and beyond.', kind: 'secondary' }
    ]
  }
];

export const getSiteBranch = (id: SiteBranchId) => siteBranches.find((branch) => branch.id === id);
