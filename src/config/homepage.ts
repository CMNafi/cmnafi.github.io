export const homepageConfig = {
  hero: {
    eyebrow: 'C M Nafi',
    title: 'Now',
    descriptor: 'The parts of my life and work that are most active right now.',
    intro:
      'This site makes more sense once you see the whole mix: the books I keep returning to, the cricket memories I refuse to lose, the tools I am building for finance work, and the notes that connect them.',
    ctas: [
      { label: 'What I am up to now', href: '/now', variant: 'primary' },
      { label: 'Read the timeline', href: '/blog', variant: 'ghost' }
    ]
  },
  brewingPage: {
    title: 'Work in progress',
    description:
      'The projects, tools, and half-finished ideas I am actively pushing forward, without pretending they are more polished than they are.'
  },
  processChapters: [
    {
      phase: 'Notice',
      title: 'Most things start because they stay in my head',
      subtitle: 'A book, a match, a clumsy workflow, a line I want to keep',
      description:
        'I usually begin with irritation or attachment. Something feels memorable, awkward, useful, or unfinished enough that I keep returning to it.',
      cue: 'The thing that sticks'
    },
    {
      phase: 'Write',
      title: 'I try to understand it in words first',
      subtitle: 'Notes, drafts, screenshots, and rough structure',
      description:
        'Before I build or publish anything, I usually write around it. That is how I find out whether I care about it or just liked the idea of caring about it.',
      cue: 'Thinking on paper'
    },
    {
      phase: 'Build',
      title: 'Some notes want to become tools',
      subtitle: 'Especially when the same friction shows up more than once',
      description:
        'The product side of the site comes from repeated annoyance: research steps that take too long, filing workflows that feel clumsy, or interfaces that ask for too much patience.',
      cue: 'From note to build'
    },
    {
      phase: 'Keep',
      title: 'Then I give it a place to live',
      subtitle: 'So it does not disappear after one good week',
      description:
        'This site is partly an archive for the things I want to keep visible: writing, projects, cricket, films, and the parts of my life that explain each other.',
      cue: 'Worth keeping'
    }
  ],
  positioning: {
    eyebrow: 'Why this site exists',
    title: 'I wanted one place where my taste, memory, and work could sit next to each other without pretending to be separate lives.',
    description:
      'Most personal sites flatten people into resumes or vague personal brands. I wanted this one to feel closer to how my mind actually works.',
    cards: [
      {
        title: 'Writing',
        description:
          'Books, films, games, and personal notes live here because they shape how I think just as much as any professional milestone does.'
      },
      {
        title: 'Projects',
        description:
          'The tools come from real finance and diligence frustrations I have run into and could not stop trying to improve.'
      },
      {
        title: 'Adventures',
        description:
          'Cricket is not decorative on this site. It is one of the clearest ways to understand my memory, discipline, and joy.'
      }
    ]
  },
  featuredDestinations: [
    {
      title: 'Timeline',
      href: '/blog',
      eyebrow: 'Writing',
      description: 'Everything I have published in one running stream, from book notes to cricket stories to the occasional personal essay.'
    },
    {
      title: 'Projects',
      href: '/projects',
      eyebrow: 'Work',
      description: 'The tools I am building because finance workflows still make simple things harder than they should be.'
    },
    {
      title: 'Adventures',
      href: '/adventures',
      eyebrow: 'Life',
      description: 'Cricket first, then whatever else in life earns a place here by staying vivid.'
    },
    {
      title: 'Now',
      href: '/now',
      eyebrow: 'Personal snapshot',
      description: 'A plainspoken look at what I am building, reading, thinking about, and who I want to meet.'
    }
  ],
  directoryTabs: ['All', 'Blog', 'Projects', 'Adventures', 'Apps', 'Notes'],
  featuredBands: {
    latestWriting: true,
    featuredProject: true
  },
  currentBrewingIntro:
    'This page holds the work side of my attention: active products, ideas I am still shaping, and the projects that are not finished enough to pretend otherwise.',
  currentBrewing: [
    'Turning ADV Screener and 13F Data Finder into tools I would have wanted while doing real finance research.',
    'Cleaning up how I describe my projects so they sound like my own frustrations and not startup wallpaper.',
    'Growing the cricket archive into something that keeps both the score and the feeling of the day.',
    'Keeping the site flexible enough to hold new writing, tools, and side paths without losing its center.'
  ],
  featuredAdventure: {
    eyebrow: 'Featured adventure',
    title: 'Cricket archive',
    href: '/adventures/cricket',
    description:
      'A record of teams, matches, milestones, and the small details that make a scorecard feel like an actual memory.',
    meta: 'Matches, records, stories',
    tags: ['cricket', 'archive', 'memory']
  },
  archive: {
    eyebrow: 'How the site is arranged',
    title: 'Everything has a room, but it still belongs to the same life.',
    description:
      'The writing, projects, cricket archive, apps, notes, and now page are separate on purpose, but they should still feel like they were made by one person.',
    noteTitle: 'Built to stay readable',
    noteCopy:
      'When I add a new post, project, or archive page, it should fit naturally instead of making the whole site feel noisier.'
  },
  selectedEntryIntro:
    'A few current entries that show the mix: one piece of writing, one piece of work, and one part of life I keep returning to.'
} as const;
