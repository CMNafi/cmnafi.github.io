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

export interface JourneyStop {
  id: string;
  step: string;
  place: string;
  region: string;
  title: string;
  organization: string;
  summary: string;
  narrative: string;
  atlasLabel: string;
  mapX: string;
  mapY: string;
}

export const strategyMapChapters: StrategyMapChapter[] = [
  {
    id: 'dinajpur',
    step: '01',
    place: 'Dinajpur, Bangladesh',
    theme: 'Global Foundations',
    label: 'Origins | Bangladesh',
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
    label: 'Age 12 | Bangladesh',
    title: 'Discipline & Independence',
    narrative:
      "My story is defined by a series of bold, independent transitions. It began at age 12, when I left home for military school in Bangladesh - a disciplined start that forged the self-reliance I've carried ever since.",
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
    label: 'Age 16 | Changshu, China',
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

export const journeyStops: JourneyStop[] = [
  {
    id: 'dinajpur',
    step: '01',
    place: 'Dinajpur, Bangladesh',
    region: 'Bangladesh',
    title: 'Origins and first bearings',
    organization: 'Foundation',
    summary: 'The story opens with roots, first principles, and the earliest sense of direction.',
    narrative:
      'Dinajpur is the beginning: the smallest frame, the deepest root, and the first sense of how place shapes discipline, memory, and ambition.',
    atlasLabel: '25.63 N / 88.64 E',
    mapX: '68%',
    mapY: '58%'
  },
  {
    id: 'rangpur',
    step: '02',
    place: 'Rangpur, Bangladesh',
    region: 'Bangladesh',
    title: 'Discipline and independence',
    organization: 'Military School',
    summary: 'Leaving home early created the discipline layer that still runs underneath everything else.',
    narrative:
      'Rangpur introduced structure, routine, and the habit of carrying responsibility independently. It was the first real test of range and resilience.',
    atlasLabel: '25.75 N / 89.25 E',
    mapX: '70%',
    mapY: '55%'
  },
  {
    id: 'changshu',
    step: '03',
    place: 'Changshu, China',
    region: 'China',
    title: 'A wider map appears',
    organization: 'United World College',
    summary: 'The route opens outward into a more global frame, with perspective shaped by many countries at once.',
    narrative:
      'Changshu widened the map. Studying in an international environment made adaptation, context switching, and global awareness part of the operating system.',
    atlasLabel: '31.65 N / 120.75 E',
    mapX: '80%',
    mapY: '46%'
  },
  {
    id: 'decorah',
    step: '04',
    place: 'Decorah, Iowa, USA',
    region: 'USA',
    title: 'Systems and intellectual compounding',
    organization: 'Luther College',
    summary: 'Study turned curiosity into method, pulling data science and computer science into the same frame.',
    narrative:
      'Decorah is where ideas began to compound into clearer systems thinking. It sharpened the bridge between logic, creativity, and real-world problem solving.',
    atlasLabel: '43.30 N / 91.79 W',
    mapX: '30%',
    mapY: '35%'
  },
  {
    id: 'rochester',
    step: '05',
    place: 'Rochester, Minnesota',
    region: 'USA',
    title: 'Research at institutional scale',
    organization: 'Mayo Clinic',
    summary: 'Medical-scale research work expanded the sense of what intelligent systems can do in practice.',
    narrative:
      'At Mayo Clinic, research moved from theory into high-stakes environments. It was an early proof that large datasets and careful modeling can carry real consequence.',
    atlasLabel: '44.01 N / 92.48 W',
    mapX: '29%',
    mapY: '31%'
  },
  {
    id: 'boston',
    step: '06',
    place: 'Boston, Massachusetts',
    region: 'USA',
    title: 'Strategy in motion',
    organization: 'SkyBridge Associates',
    summary: 'The work shifted closer to executive strategy, process design, and financial decision support.',
    narrative:
      'Boston brought a sharper view of how data, process, and narrative support decision-makers. Strategy work became more operational and more externally facing.',
    atlasLabel: '42.36 N / 71.06 W',
    mapX: '39%',
    mapY: '33%'
  },
  {
    id: 'wilmington',
    step: '07',
    place: 'Wilmington, Delaware',
    region: 'USA',
    title: 'Institutional finance systems',
    organization: 'BlackRock',
    summary: 'Financial infrastructure, data, and AI moved into the center of the story.',
    narrative:
      'Wilmington deepened the connection to institutional finance and product systems, with work closer to platform-scale data, intelligence, and operating rigor.',
    atlasLabel: '39.74 N / 75.55 W',
    mapX: '41%',
    mapY: '38%'
  },
  {
    id: 'nyc',
    step: '08',
    place: 'New York City, New York',
    region: 'USA',
    title: 'Product and market context',
    organization: 'Dasseti',
    summary: 'The route narrows into fintech products, regulatory intelligence, and work that serves real clients directly.',
    narrative:
      'New York sharpened the public-facing edge of the work. Product thinking, investor workflows, and financial intelligence started aligning more clearly into one direction.',
    atlasLabel: '40.71 N / 74.00 W',
    mapX: '42%',
    mapY: '37%'
  },
  {
    id: 'tampa',
    step: '09',
    place: 'Tampa, Florida',
    region: 'USA',
    title: 'Current base',
    organization: 'Home',
    summary: 'Today the route resolves into fintech, writing, public work, and a more integrated operating system.',
    narrative:
      'Tampa is the present-day base: the place where research, finance, product systems, and writing now move together with more clarity and intention.',
    atlasLabel: '27.95 N / 82.46 W',
    mapX: '36%',
    mapY: '54%'
  }
];
