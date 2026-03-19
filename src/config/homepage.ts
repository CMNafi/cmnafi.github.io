export const homepageConfig = {
  hero: {
    eyebrow: 'C M Nafi',
    title: 'Brewing',
    descriptor: 'Writing, projects, adventures, and work in progress.',
    intro:
      'A very clean front door. The fuller snapshot of what I am building, exploring, and publishing lives on the brewing in progress page.',
    ctas: [
      { label: 'Brewing in progress', href: '/now', variant: 'primary' },
      { label: 'Blog', href: '/blog', variant: 'ghost' }
    ]
  },
  brewingPage: {
    title: 'Brewing in progress',
    description:
      'A fuller snapshot of current work, selected signals, and the parts of the site that are still evolving.'
  },
  processChapters: [
    {
      phase: 'Observe',
      title: 'Ideas start with signal',
      subtitle: 'Books, products, matches, trips, and questions worth following',
      description:
        'The site begins with curiosity: a note, a line, a sports memory, a product problem, or a moment that keeps returning.',
      cue: 'Early signal'
    },
    {
      phase: 'Shape',
      title: 'Fragments become structure',
      subtitle: 'Thoughts are refined before they are published',
      description:
        'Signals gain form through drafting, testing, comparing, and editing until they are clear enough to share with intent.',
      cue: 'Structure before release'
    },
    {
      phase: 'Publish',
      title: 'Work enters public form',
      subtitle: 'Essays, products, and field notes become visible',
      description:
        'Writing, interfaces, records, and public notes are released in the format that best fits what they are trying to do.',
      cue: 'Public release'
    },
    {
      phase: 'Archive',
      title: 'The site stays ready to expand',
      subtitle: 'A calm home for current work and future additions',
      description:
        'Everything lands in a system designed to grow into more posts, projects, adventure logs, apps, notes, and living archives.',
      cue: 'Extensible by design'
    }
  ],
  positioning: {
    eyebrow: 'About this site',
    title: 'A personal website that holds work, curiosity, and lived experience together.',
    description:
      'This is not just a portfolio. It is where ideas turn into essays, tools, records, and archives that can keep growing without losing their shape.',
    cards: [
      {
        title: 'Writing',
        description:
          'Books, movies, games, product thinking, and essays that deserve more care than a quick timeline post.'
      },
      {
        title: 'Projects',
        description:
          'ADV Screener, 13F and data research products, AI-supported workflows, and public experiments built in the open.'
      },
      {
        title: 'Adventures',
        description:
          'Cricket records, future travel logs, and field notes that feel central to identity rather than decorative.'
      }
    ]
  },
  featuredDestinations: [
    {
      title: 'Blog',
      href: '/blog',
      eyebrow: 'Writing',
      description: 'Essays, notes, reviews, and product thinking published in public.'
    },
    {
      title: 'Projects',
      href: '/projects',
      eyebrow: 'Tools',
      description: 'Research products, data tools, and practical experiments in motion.'
    },
    {
      title: 'Adventures',
      href: '/adventures',
      eyebrow: 'Field notes',
      description: 'Cricket, travel, and story-led archives built with the same care as the work.'
    },
    {
      title: 'Now',
      href: '/now',
      eyebrow: 'Current focus',
      description: 'A living snapshot of what I am building, reading, exploring, and paying attention to.'
    }
  ],
  directoryTabs: ['All', 'Blog', 'Projects', 'Adventures', 'Apps', 'Notes'],
  featuredBands: {
    latestWriting: true,
    featuredProject: true
  },
  currentBrewingIntro:
    'This is the one place where the brewing metaphor still fits: active work, live experiments, and archives that are still taking shape.',
  currentBrewing: [
    'Designing calmer public surfaces for research products like ADV Screener and 13F Data Finder.',
    'Writing across books, movies, games, work, cricket, and the product choices that shape modern life.',
    'Expanding Adventures into a stronger home for cricket records, travel logs, and story-driven field notes.',
    'Keeping the site modular so new apps, notes, and archives can be added without redesigning the whole system.'
  ],
  featuredAdventure: {
    eyebrow: 'Featured adventure',
    title: 'Cricket archive',
    href: '/adventures/cricket',
    description:
      'A living archive for matches, milestones, teams, seasons, and the personal notes that make the record feel human.',
    meta: 'Records, timeline, highlights',
    tags: ['cricket', 'archive', 'field notes']
  },
  archive: {
    eyebrow: 'Archive system',
    title: 'A modular home that can keep expanding.',
    description:
      'Blog posts, projects, adventure entries, apps, notes, and now updates all have a clear place in the system.',
    noteTitle: 'Built to scale',
    noteCopy:
      'Adding a new post, project, field note, app, or update should stay low-friction, readable, and easy to maintain.'
  },
  selectedEntryIntro:
    'A few current signals across the site, spanning writing, tools, and field notes.'
} as const;
