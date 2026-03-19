export const homepageConfig = {
  hero: {
    eyebrow: 'Personal operating system for public work',
    title: 'Brewing',
    description:
      'Thoughtful builds, sharper notes, and future tools — all slowly coming to a boil. This is the front door for ideas, products, stories, and experiments still in motion.',
    ctas: [
      { label: 'View Blog', href: '/blog', variant: 'primary' },
      { label: 'View Projects', href: '/projects', variant: 'secondary' },
      { label: "What I'm working on", href: '/now', variant: 'ghost' }
    ]
  },
  directoryTabs: ['All', 'Blog', 'Projects', 'Writing', 'Apps', 'Notes'],
  featuredBands: {
    latestWriting: true,
    featuredProject: true
  },
  currentBrewing: [
    'Designing calm, useful data tools for diligence and discovery.',
    'Writing across books, movies, games, cricket, and product thinking.',
    'Exploring AI workflows that make research feel lighter and more human.',
    'Building a public system that can keep evolving without a redesign.'
  ]
} as const;
