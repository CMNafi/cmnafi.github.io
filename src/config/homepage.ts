export const homepageConfig = {
  hero: {
    eyebrow: 'A personal studio for ideas under gentle pressure',
    title: 'Still Brewing',
    highlight: 'ideas with warmth and weight',
    description:
      'Projects, essays, notes, experiments, and future apps move through the same ritual here: gather the signal, refine the thought, brew the work, then serve something useful.',
    manifesto:
      'This is a calm motion story for work in progress — a place where books, movies, cricket, product thinking, and quiet software experiments become public over time.',
    ctas: [
      { label: 'Enter the journal', href: '/blog', variant: 'primary' },
      { label: 'Browse projects', href: '/projects', variant: 'secondary' },
      { label: 'See what is brewing now', href: '/now', variant: 'ghost' }
    ],
    stats: [
      { label: 'Mode', value: 'Slow creative ritual' },
      { label: 'Output', value: 'Writing, tools, experiments' },
      { label: 'Signal', value: 'Books, work, games, cricket, life' }
    ]
  },
  processChapters: [
    {
      phase: 'Collect',
      title: 'Bean collection',
      subtitle: 'Gathering what matters',
      description:
        'Ideas begin as fragments: books worth underlining, films that linger, product patterns, travel notes, work lessons, and the odd match that refuses to leave the mind.',
      cue: 'Collecting signals'
    },
    {
      phase: 'Grind',
      title: 'Grinding the rough edges',
      subtitle: 'Turning input into clarity',
      description:
        'Loose inputs are broken down, compared, and sharpened into stronger questions, cleaner structures, and more useful next steps.',
      cue: 'Refining the noise'
    },
    {
      phase: 'Brew',
      title: 'Deep work in extraction',
      subtitle: 'Where thinking turns tangible',
      description:
        'Writing, prototyping, and synthesis happen here — slowly enough to stay thoughtful, steadily enough to ship.',
      cue: 'The work is in motion'
    },
    {
      phase: 'Pour',
      title: 'Poured into public form',
      subtitle: 'Serving what is ready',
      description:
        'Posts, projects, and field notes arrive as structured outputs: readable, navigable, and ready to meet the world.',
      cue: 'Served when ready'
    },
    {
      phase: 'Serve',
      title: 'The final cup',
      subtitle: 'A place for what is brewing',
      description:
        'The site itself is the vessel: a warm index of finished work, active experiments, and the themes shaping what comes next.',
      cue: 'Ideas, refined and ready'
    }
  ],
  directoryTabs: ['All', 'Blog', 'Projects', 'Writing', 'Apps', 'Notes'],
  featuredBands: {
    latestWriting: true,
    featuredProject: true
  },
  currentBrewing: [
    'Designing gentle research tools and diligence workflows that feel editorial instead of mechanical.',
    'Writing about books, movies, games, cricket, and the product decisions that quietly shape modern life.',
    'Building future-facing apps with a warm interface language: calm, precise, and useful under pressure.',
    'Creating a personal publishing system that can expand into notes, a library, adventures, and public experiments without losing coherence.'
  ],
  focusCanisters: [
    {
      label: 'Writing themes',
      value: 'Culture, craft, systems, and the observations that survive a second look.'
    },
    {
      label: 'Experiments',
      value: 'Small interfaces, AI workflows, and product ideas being tested in public.'
    },
    {
      label: 'Future apps',
      value: 'Utility-first tools that feel considered, warm, and materially clear.'
    }
  ],
  selectedEntryIntro:
    'A few things already poured into public form — one recent note, one featured build, and one clear view into the next layer of the studio.'
} as const;
