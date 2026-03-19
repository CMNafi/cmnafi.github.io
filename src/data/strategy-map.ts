export interface StrategyMapChapter {
  id: string;
  step: string;
  place: string;
  theme: string;
  label: string;
  title: string;
  narrative: string;
  capability: string;
  signal: string;
  atlasLabel: string;
  mapX: string;
  mapY: string;
  portraitScale: number;
}

export interface StrategyMapDestination {
  title: string;
  href: string;
  description: string;
  mode: string;
}

export interface StrategyMapSignal {
  title: string;
  description: string;
}

export const strategyMapChapters: StrategyMapChapter[] = [
  {
    id: 'dinajpur',
    step: '01',
    place: 'Dinajpur, Bangladesh',
    theme: 'Foundation Strategy',
    label: 'Origin',
    title: 'Small beginnings established the first principles.',
    narrative:
      'Dinajpur is the earliest operating environment: close to home, close to routine, and close to the first habits of observation. It is the chapter that created root depth before the route ever widened.',
    capability: 'First principles, groundedness, starting conditions',
    signal: 'Smallest footprint, deepest root.',
    atlasLabel: '25.63 N / 88.64 E',
    mapX: '17%',
    mapY: '68%',
    portraitScale: 0.8
  },
  {
    id: 'rangpur',
    step: '02',
    place: 'Rangpur, Bangladesh',
    theme: 'Discipline Layer',
    label: 'Formation',
    title: 'Structure became part of the operating system.',
    narrative:
      'Rangpur brought military school, routine, distance from home, and a sharper internal standard. Discipline stopped being external pressure and turned into durable self-command.',
    capability: 'Rigor, resilience, internal sharpness',
    signal: 'Formation through rules, repetition, and endurance.',
    atlasLabel: '25.75 N / 89.25 E',
    mapX: '22%',
    mapY: '62%',
    portraitScale: 0.92
  },
  {
    id: 'changshu',
    step: '03',
    place: 'Changshu, China',
    theme: 'Global Expansion',
    label: 'Expansion Node',
    title: 'A wider map changed the frame of thought.',
    narrative:
      'Changshu marked the international jump: new institutions, new peers, new contexts, and a daily practice of adaptation. Exposure turned movement into worldview and made global context feel lived rather than abstract.',
    capability: 'Adaptation, exposure, widened worldview',
    signal: 'The route opens beyond one country.',
    atlasLabel: '31.65 N / 120.75 E',
    mapX: '56%',
    mapY: '34%',
    portraitScale: 1.02
  },
  {
    id: 'decorah',
    step: '04',
    place: 'Decorah, Iowa, USA',
    theme: 'Intellectual Compounding',
    label: 'Compounding Stage',
    title: 'Ideas started compounding into method and systems.',
    narrative:
      'Decorah is where academic life sharpened reflection into a more repeatable method. Study, writing, data, and systems thinking started reinforcing one another instead of living in separate lanes.',
    capability: 'Frameworks, synthesis, systems thinking',
    signal: 'Reflection becomes method.',
    atlasLabel: '43.30 N / 91.79 W',
    mapX: '77%',
    mapY: '27%',
    portraitScale: 1.14
  },
  {
    id: 'tampa',
    step: '05',
    place: 'Tampa, Florida',
    theme: 'Current Deployment',
    label: 'Active Deployment',
    title: 'The present phase is public, practical, and still in motion.',
    narrative:
      'Tampa is the active deployment: fintech systems, product thinking, writing, experimentation, and public work. The earlier chapters no longer sit behind the present; they now operate together inside it.',
    capability: 'Fintech, product systems, writing, public identity',
    signal: 'Building, writing, shipping, connecting.',
    atlasLabel: '27.95 N / 82.46 W',
    mapX: '84%',
    mapY: '56%',
    portraitScale: 1.28
  }
];

export const strategyMapSignals: StrategyMapSignal[] = [
  {
    title: 'Fintech systems',
    description: 'Operational products shaped by regulatory, data, and workflow complexity.'
  },
  {
    title: 'Product and AI',
    description: 'Practical interfaces for research, diligence, and intelligent automation.'
  },
  {
    title: 'Writing in public',
    description: 'Essays, reflections, and narratives that clarify the work behind the work.'
  },
  {
    title: 'Global context',
    description: 'A worldview built across institutions, countries, and different systems of thought.'
  }
];

export const strategyMapDestinations: StrategyMapDestination[] = [
  {
    title: 'Brewing',
    href: '/brewing',
    mode: 'Ideas in formation',
    description: 'The workbench for ideas, systems, and experiments that are still taking shape.'
  },
  {
    title: 'Blog',
    href: '/blog',
    mode: 'Finished writing',
    description: 'Essays, notes, and reflections that have settled into a clearer point of view.'
  },
  {
    title: 'Projects',
    href: '/projects',
    mode: 'Tools and builds',
    description: 'Products, public experiments, and data-heavy systems built for real use.'
  },
  {
    title: 'Adventures',
    href: '/adventures',
    mode: 'Field notes',
    description: 'Travel, cricket, records, and the story-driven archive beyond pure work.'
  },
  {
    title: 'Connect',
    href: '/connect',
    mode: 'Network',
    description: 'Conversations, collaboration, and the outward-facing layer of the site.'
  }
];
