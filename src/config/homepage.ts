export const homepageConfig = {
  hero: {
    eyebrow: 'Coffeehouse studio for notes, products, and fieldwork',
    title: 'Coffeehouse',
    highlight: 'Ideas brewed carefully, then served in public.',
    description:
      'A modern front door where writing, tools, and adventures move through one calm brewing ritual from raw intake to finished pour.',
    manifesto:
      'Everything here follows a shared rhythm: collect signal, refine direction, extract value, and serve it where it is easiest to explore.',
    ctas: [
      { label: 'Read the journal', href: '/blog', variant: 'primary' },
      { label: 'Browse projects', href: '/projects', variant: 'secondary' },
      { label: 'What is brewing now', href: '/now', variant: 'ghost' }
    ],
    animationStages: [
      { label: 'Bean Intake', cue: '0-20% cycle' },
      { label: 'Grind', cue: '20-45% cycle' },
      { label: 'Brew', cue: '45-75% cycle' },
      { label: 'Serve', cue: '75-100% cycle' }
    ],
    stats: [
      { label: 'Atmosphere', value: 'Editorial and warm' },
      { label: 'Output', value: 'Writing, products, adventures' },
      { label: 'Motion', value: 'Subtle and accessible' }
    ]
  },
  processChapters: [
    {
      phase: 'Collect',
      title: 'Signals gathered from the world outside the cup',
      subtitle: 'Books, matches, trips, products, and moments worth returning to',
      description:
        'The work begins with fragments that carry unusual weight: a product decision, a quiet quote, a movie image, a cricket session, a travel memory, or a lingering systems question.',
      cue: 'Intake of the raw signal'
    },
    {
      phase: 'Grind',
      title: 'Fragments are milled into sharper questions',
      subtitle: 'Patterns become structure before anything gets published',
      description:
        'Loose observations are compared, compressed, and reframed until they have enough shape to become a useful essay, experiment, product path, or public note.',
      cue: 'Compression into clarity'
    },
    {
      phase: 'Brew',
      title: 'Pressure and patience extract the real idea',
      subtitle: 'Where thought becomes interface, draft, or prototype',
      description:
        'This is the making phase: writing, prototyping, arranging, and testing until the work feels distilled rather than merely decorated.',
      cue: 'Extraction in motion'
    },
    {
      phase: 'Pour',
      title: 'The work branches into public destinations',
      subtitle: 'Blog, Projects, and Adventures each receive their own pour',
      description:
        'Once ready, the stream separates into the right vessel - an article, a product page, or a field note - without losing the atmosphere of the original process.',
      cue: 'Routing the finished batch'
    },
    {
      phase: 'Serve',
      title: 'The site becomes the final cup and service tray',
      subtitle: 'A calm archive for active work and future releases',
      description:
        'Everything lands in a coherent publishing system that can keep expanding into notes, apps, library pages, and future experiments while staying warm and readable.',
      cue: 'Ready for public use'
    }
  ],
  directoryTabs: ['All', 'Blog', 'Projects', 'Writing', 'Apps', 'Notes'],
  featuredBands: {
    latestWriting: true,
    featuredProject: true
  },
  currentBrewing: [
    'Designing AI-supported diligence and research tools with a more editorial, premium interface language.',
    'Writing about books, movies, games, cricket, work, and the product choices that quietly shape modern life.',
    'Exploring how immersive visuals and restrained motion can make personal publishing feel more cinematic without losing performance.',
    'Building a reusable homepage system that can expand into future notes, apps, adventures, and themed collections.'
  ],
  focusCanisters: [
    {
      label: 'Writing themes',
      value: 'Culture, craft, systems, and observations that keep earning another read.'
    },
    {
      label: 'Experiments',
      value: 'Interfaces, AI workflows, and product structures tested in public before they harden.'
    },
    {
      label: 'Future apps',
      value: 'Utility-first tools shaped with editorial warmth, cinematic restraint, and practical clarity.'
    }
  ],
  selectedEntryIntro:
    'A few pieces already poured into public form - presented inside the same visual story as the rest of the homepage so the transition from browsing to reading feels intentional.'
} as const;
