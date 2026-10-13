export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  period: string;
  description: string;
  highlights: string[];
  href?: string;
  tags?: string[];
}

export interface TimelineSegment {
  id: string;
  label: string;
  icon: string;
  items: TimelineItem[];
}

export const journeySegments: TimelineSegment[] = [
  {
    id: 'education',
    label: 'Education',
    icon: 'graduation',
    items: [
      {
        id: 'dinajpur',
        title: 'Early Foundation',
        subtitle: 'Where memory begins',
        location: 'Dinajpur, Bangladesh',
        period: 'Childhood',
        description:
          'Dinajpur is where the story begins: family, routine, and the quiet scale of a first world. It gave everything after it a baseline of rootedness.',
        highlights: ['First bearings', 'Family roots', 'Early formation'],
        tags: ['Origins', 'Foundation']
      },
      {
        id: 'rangpur',
        title: 'Rangpur Cadet College',
        subtitle: 'Military school: discipline and independence',
        location: 'Rangpur, Bangladesh',
        period: 'Age 12',
        description:
          "Left home at age 12 for military school: a disciplined start that forged the self-reliance carried ever since. Distance from home, repetition, discipline, and self-command shaped a harder but more independent character.",
        highlights: ['Self-reliance', 'Discipline', 'Leadership training'],
        tags: ['Military', 'Discipline']
      },
      {
        id: 'changshu',
        title: 'United World College',
        subtitle: 'International Baccalaureate programme',
        location: 'Changshu, China',
        period: 'Age 16',
        description:
          'Moved to China to attend UWC, immersed in an IB programme alongside students from 100+ nations. Learned to navigate complex global perspectives and saw firsthand how interconnected the world truly is.',
        highlights: ['100+ nationalities', 'IB Diploma', 'Global perspective'],
        href: 'https://www.uwcchina.org/',
        tags: ['International', 'IB']
      },
      {
        id: 'decorah',
        title: 'Luther College',
        subtitle: 'B.A. Data Science, Computer Science minor',
        location: 'Decorah, Iowa, USA',
        period: 'Aug 2018 to May 2022',
        description:
          'Graduated with a B.A. in Data Science (GPA 3.5) and a minor in Computer Science. Focused on statistical learning, data pipelines, and decision-ready analysis.',
        highlights: ['B.A. Data Science', 'GPA 3.5', 'Decorah, Iowa'],
        href: 'https://www.luther.edu/',
        tags: ['Data Science', 'Statistics', 'Research']
      }
    ]
  },
  {
    id: 'work',
    label: 'Work',
    icon: 'briefcase',
    items: [
      {
        id: 'dasseti',
        title: 'Solutions Engineer',
        subtitle: 'Dasseti',
        location: "Land O' Lakes, Florida (Remote)",
        period: '2023 to Present',
        description:
          'Solutions Engineer translating between investment teams and their due-diligence software. Previously worked at BlackRock (Wilmington, DE), SkyBridge (New York, NY), and Mayo Clinic (Rochester, MN).',
        highlights: ['Dasseti', 'Due Diligence Software', 'Solutions Engineering'],
        href: '/story',
        tags: ['Fintech', 'Due Diligence', 'Solutions Engineering']
      },
      {
        id: 'writing',
        title: 'Field Notes & Research',
        subtitle: 'Long-form capital research',
        location: "Land O' Lakes, Florida",
        period: 'Ongoing',
        description:
          'Writing, research, and analysis on how capital moves: Form ADV universes, corporate venture, and institutional market structure.',
        highlights: ['Field notes & essays', 'Open-source tools', 'Public presence'],
        href: '/field-notes',
        tags: ['Writing', 'Research']
      }
    ]
  }
];

// Keep legacy exports for backwards compatibility if needed elsewhere
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

export const lifeJourneyDestinations: LifeJourneyDestination[] = [
  {
    title: 'Brewing',
    href: '/brewing',
    description: 'Ideas in motion, active experiments, and the work that is still becoming.'
  },
  {
    title: 'Field Notes',
    href: '/field-notes',
    description: 'Finished writing, reflections, and essays that have settled into form.'
  },
  {
    title: 'Garage',
    href: '/garage',
    description: 'Tools, software projects, and prototypes built to solve real problems.'
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
