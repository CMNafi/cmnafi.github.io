export interface LifeJourneyChapter {
  id: string;
  step: string;
  era: string;
  location: string;
  region: string;
  theme: string;
  title: string;
  narrative: string;
  atlasLabel: string;
  note: string;
  scale: number;
  mapX: string;
  mapY: string;
}

export interface LifeJourneyDestination {
  title: string;
  href: string;
  description: string;
}

export const lifeJourneyChapters: LifeJourneyChapter[] = [
  {
    id: 'dinajpur',
    step: '01',
    era: 'Early childhood',
    location: 'Dinajpur',
    region: 'Bangladesh',
    theme: 'Foundation',
    title: 'The first world was close, local, and formative.',
    narrative:
      'Dinajpur is where memory begins: family, routine, and the quiet scale of a first world. It is the chapter that gave everything after it a baseline of rootedness.',
    atlasLabel: '25.63 N / 88.64 E',
    note: 'Origins, intimacy, first bearings.',
    scale: 0.78,
    mapX: '13%',
    mapY: '64%'
  },
  {
    id: 'rangpur',
    step: '02',
    era: 'Adolescence',
    location: 'Rangpur',
    region: 'Bangladesh',
    theme: 'Discipline',
    title: 'Structure arrived early and changed the rhythm of growth.',
    narrative:
      'Rangpur carries the military-school chapter: distance from home, repetition, discipline, and self-command. It was a harder shape, but it built the independence that later moves would demand.',
    atlasLabel: '25.74 N / 89.25 E',
    note: 'Formation, order, endurance.',
    scale: 0.88,
    mapX: '18%',
    mapY: '60%'
  },
  {
    id: 'changshu',
    step: '03',
    era: 'Age 16 and outward',
    location: 'Changshu',
    region: 'China',
    theme: 'Expansion',
    title: 'The horizon widened into a global education.',
    narrative:
      'Changshu was the international turn: a life among students from across the world, where borders became more real and more porous at the same time. Curiosity stopped being abstract and became daily practice.',
    atlasLabel: '31.65 N / 120.75 E',
    note: 'Exposure, widening, movement outward.',
    scale: 1,
    mapX: '55%',
    mapY: '40%'
  },
  {
    id: 'decorah',
    step: '04',
    era: 'College years',
    location: 'Decorah',
    region: 'Iowa',
    theme: 'Study',
    title: 'Reflection and rigor found a home in the American Midwest.',
    narrative:
      'Decorah is where study became a sharper instrument: data, systems, writing, and the patience to think with structure. It added intellectual depth to a life already shaped by movement.',
    atlasLabel: '43.30 N / 91.79 W',
    note: 'Institution, reflection, sharpening.',
    scale: 1.12,
    mapX: '73%',
    mapY: '34%'
  },
  {
    id: 'tampa',
    step: '05',
    era: 'Present day',
    location: 'Tampa',
    region: 'Florida',
    theme: 'Building',
    title: 'The present chapter is public, practical, and still in motion.',
    narrative:
      'Tampa is where the earlier worlds start to converge into a clearer identity: writing, products, adventures, and work that faces outward. It feels less like arrival than a confident continuation.',
    atlasLabel: '27.95 N / 82.46 W',
    note: 'Now, creating, connecting.',
    scale: 1.24,
    mapX: '82%',
    mapY: '58%'
  }
];

export const lifeJourneyDestinations: LifeJourneyDestination[] = [
  {
    title: 'Brewing',
    href: '/brewing',
    description: 'Ideas in motion, active experiments, and the work that is still becoming.'
  },
  {
    title: 'Blog',
    href: '/blog',
    description: 'Finished writing, reflections, and essays that have settled into form.'
  },
  {
    title: 'Projects',
    href: '/projects',
    description: 'Tools, research products, and public builds shaped by systems thinking.'
  },
  {
    title: 'Adventures',
    href: '/adventures',
    description: 'Travel, cricket, memory, records, and the more human side of the archive.'
  },
  {
    title: 'Connect',
    href: '/connect',
    description: 'Relationships, conversation, and the places where the path becomes shared.'
  }
];
