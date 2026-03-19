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

export interface StrategyNavPreview {
  id: string;
  label: string;
  title: string;
  description: string;
  note: string;
}

export const strategyMapChapters: StrategyMapChapter[] = [
  {
    id: 'dinajpur',
    step: '01',
    place: 'Dinajpur, Bangladesh',
    theme: 'Global Foundations',
    label: 'Origins · Bangladesh',
    title: 'The first world laid the foundation for everything that followed.',
    narrative:
      'Dinajpur is where the story begins: the first bearings, the first routines, and the earliest sense of rootedness. Before the route widened across institutions and continents, it started here.',
    capability: 'First principles, groundedness, early formation',
    signal: 'A rooted beginning before the route widened.',
    atlasLabel: '25.63 N / 88.64 E',
    mapX: '17%',
    mapY: '68%',
    portraitScale: 0.8
  },
  {
    id: 'rangpur',
    step: '02',
    place: 'Rangpur, Bangladesh',
    theme: 'Discipline & Independence',
    label: 'Age 12 · Bangladesh',
    title: 'Discipline & Independence',
    narrative:
      "My story is defined by a series of bold, independent transitions. It began at age 12, when I left home for military school in Bangladesh — a disciplined start that forged the self-reliance I've carried ever since.",
    capability: 'Rigor, resilience, internal sharpness',
    signal: 'A disciplined start that forged self-reliance.',
    atlasLabel: '25.75 N / 89.25 E',
    mapX: '22%',
    mapY: '62%',
    portraitScale: 0.92
  },
  {
    id: 'changshu',
    step: '03',
    place: 'Changshu, China',
    theme: 'Global Interconnectedness',
    label: 'Age 16 · Changshu, China',
    title: 'Global Interconnectedness',
    narrative:
      'That foundation allowed me to leap into a global life at 16, moving to Changshu, China, to attend United World College. Immersed in an International Baccalaureate program alongside students from 100+ nations, I learned to navigate complex global perspectives and saw firsthand how interconnected our world truly is.',
    capability: 'Adaptation, exposure, widened worldview',
    signal: 'A global life shaped by 100+ perspectives.',
    atlasLabel: '31.65 N / 120.75 E',
    mapX: '56%',
    mapY: '34%',
    portraitScale: 1.02
  },
  {
    id: 'decorah',
    step: '04',
    place: 'Decorah, Iowa, USA',
    theme: 'Data Science & CS Logic',
    label: 'Iowa, USA',
    title: 'Data Science & CS Logic',
    narrative:
      'This curiosity brought me to the United States and Luther College, where I fully leaned into the intersection of logic and creativity. I graduated with a major in Data Science and a minor in Computer Science, focusing my senior research on the power of high-density data to solve real-world problems.',
    capability: 'Frameworks, synthesis, systems thinking',
    signal: 'Logic and creativity moved into the same frame.',
    atlasLabel: '43.30 N / 91.79 W',
    mapX: '77%',
    mapY: '27%',
    portraitScale: 1.14
  },
  {
    id: 'tampa',
    step: '05',
    place: 'Tampa, Florida',
    theme: 'From Research to Financial Intelligence',
    label: 'Current',
    title: 'From Research to Financial Intelligence',
    narrative:
      'I believe that data is only as valuable as the narrative it helps uncover. The current chapter brings together research, strategy, institutional finance, and product work into a clearer public-facing direction.',
    capability: 'Fintech, product systems, writing, public identity',
    signal: 'Bridging complex data and actionable intelligence.',
    atlasLabel: '27.95 N / 82.46 W',
    mapX: '84%',
    mapY: '56%',
    portraitScale: 1.28
  }
];

export const strategyMapSignals: StrategyMapSignal[] = [
  {
    title: 'Exploring Stories',
    description: 'An avid reader of biographies, fascinated by the lives that have shaped our history.'
  },
  {
    title: 'On the Field & Track',
    description: 'Cricket, FC Barcelona, and Formula 1 remain the clearest reset outside of work.'
  },
  {
    title: "In the Driver's Seat",
    description: 'A deep fascination with finance markets and cutting-edge technology continues to shape what I pay attention to.'
  },
  {
    title: 'Work in Public',
    description: 'Writing, products, and public-facing tools now sit in the same frame as the work itself.'
  }
];

export const strategyNavPreviews: StrategyNavPreview[] = [
  {
    id: 'home',
    label: 'Home',
    title: 'Global foundations, financial intelligence, work in motion.',
    description:
      'A living strategy map tracing the route from Bangladesh to Tampa and the capabilities formed along the way.',
    note: 'Identity, movement, and the current thesis behind the site.'
  },
  {
    id: 'brewing',
    label: 'Brewing',
    title: 'Ideas still in motion.',
    description:
      'Experiments, prompts, systems, and rough edges being refined before they become finished work.',
    note: 'Early-stage thinking, active notes, and what is currently taking shape.'
  },
  {
    id: 'blog',
    label: 'Blog',
    title: 'Books, films, music, essays, and reflections.',
    description:
      'Writing that turns reading, watching, listening, and lived experience into a clearer point of view.',
    note: 'Finished pieces, quieter reflections, and the longer-form archive.'
  },
  {
    id: 'projects',
    label: 'Projects',
    title: 'Tools, apps, builds, and financial data products.',
    description:
      'Public experiments and working systems shaped around due diligence, research workflows, and usable intelligence.',
    note: 'Products, automations, and data-heavy builds meant for real operators.'
  },
  {
    id: 'adventures',
    label: 'Adventures',
    title: 'Travel, cricket, field notes, records, and journeys.',
    description:
      'The story-driven archive beyond work, where movement, sport, and place leave a different kind of record.',
    note: 'Trips, match memories, field notes, and the personal ledger outside the desk.'
  },
  {
    id: 'connect',
    label: 'Connect',
    title: 'Conversations, collaboration, and public presence.',
    description:
      'The outward-facing layer of the site, from direct contact to the places where work and ideas stay in touch with people.',
    note: 'Email, social presence, and ways to reach out for thoughtful collaboration.'
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
