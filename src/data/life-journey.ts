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
        subtitle: 'Military school — discipline and independence',
        location: 'Rangpur, Bangladesh',
        period: 'Age 12',
        description:
          "Left home at age 12 for military school — a disciplined start that forged the self-reliance carried ever since. Distance from home, repetition, discipline, and self-command shaped a harder but more independent character.",
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
        subtitle: 'Data Science major, Computer Science minor',
        location: 'Decorah, Iowa, USA',
        period: 'College years',
        description:
          'Fully leaned into the intersection of logic and creativity. Graduated with a major in Data Science and a minor in Computer Science, focusing senior research on the power of high-density data to solve real-world problems.',
        highlights: ['Data Science', 'Computer Science', 'Senior research'],
        href: 'https://www.luther.edu/',
        tags: ['Data Science', 'CS', 'Research']
      }
    ]
  },
  {
    id: 'work',
    label: 'Work',
    icon: 'briefcase',
    items: [
      {
        id: 'research',
        title: 'Research & Data Products',
        subtitle: 'Building tools from data',
        location: 'Remote & On-site',
        period: 'Post-college',
        description:
          'Channeled academic training into real-world research workflows — building tools, automations, and data products that bridge the gap between raw information and actionable intelligence.',
        highlights: ['Data pipelines', 'Automation', 'Research tooling'],
        href: '/projects',
        tags: ['Research', 'Data']
      },
      {
        id: 'fintech',
        title: 'Financial Intelligence',
        subtitle: 'Institutional finance and strategy',
        location: 'Tampa, Florida',
        period: 'Present',
        description:
          'The current chapter brings together research, strategy, institutional finance, and product work into a clearer public-facing direction. Data is only as valuable as the narrative it helps uncover.',
        highlights: ['Fintech', 'Strategy', 'Product systems'],
        href: '/brewing',
        tags: ['Finance', 'Product']
      },
      {
        id: 'public-work',
        title: 'Writing & Public Work',
        subtitle: 'Building in public',
        location: 'Tampa, Florida',
        period: 'Ongoing',
        description:
          'Writing, products, adventures, and public-facing tools now sit in the same frame as the work itself. Building with a calmer, more confident sense of direction.',
        highlights: ['Blog & essays', 'Open-source tools', 'Public presence'],
        href: '/blog',
        tags: ['Writing', 'Open Source']
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
