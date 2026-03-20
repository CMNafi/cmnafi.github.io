export type InterestWorldId = 'cricket' | 'books' | 'writing' | 'movies' | 'finance' | 'tech';

export interface InterestWorldConfig {
  id: InterestWorldId;
  title: string;
  cardTitle: string;
  href: string;
  description: string;
  deck: string;
  categories: string[];
  palette: {
    accent: string;
    border: string;
    glow: string;
    surface: string;
    text: string;
  };
}

export const interestSections: InterestWorldConfig[] = [
  {
    id: 'cricket',
    title: 'Cricket',
    cardTitle: 'On the cricket field',
    href: '/interests/cricket',
    description: 'Match stories, pressure finishes, scorelines, and the games that stay vivid long after the result.',
    deck: 'Field green, willow, leather, and a top-down view of the ground.',
    categories: ['Cricket'],
    palette: {
      accent: '#d8bf7a',
      border: 'rgba(182, 215, 143, 0.34)',
      glow: 'rgba(182, 215, 143, 0.22)',
      surface: 'linear-gradient(180deg, rgba(28, 58, 31, 0.92), rgba(14, 29, 16, 0.95))',
      text: '#edf4d8'
    }
  },
  {
    id: 'books',
    title: 'Books',
    cardTitle: 'Books',
    href: '/interests/books',
    description: 'Biographies, ideas, and the books that deepen over time instead of fading after the last page.',
    deck: 'Warm amber shelves, cream paper, and a quiet reading-room atmosphere.',
    categories: ['Books'],
    palette: {
      accent: '#e2ba74',
      border: 'rgba(226, 186, 116, 0.34)',
      glow: 'rgba(226, 186, 116, 0.18)',
      surface: 'linear-gradient(180deg, rgba(76, 48, 28, 0.9), rgba(28, 19, 13, 0.96))',
      text: '#f6e7ca'
    }
  },
  {
    id: 'writing',
    title: 'Writing & Ideas',
    cardTitle: 'Writing & ideas',
    href: '/interests/writing',
    description: 'Essays, systems, games, notes, and unfinished thoughts that eventually settle into something readable.',
    deck: 'Ink-dark purple, paper grain, and journal pages gathered into one workspace.',
    categories: ['Essays', 'Games', 'Notes', 'Product', 'Travel'],
    palette: {
      accent: '#b89cf1',
      border: 'rgba(184, 156, 241, 0.3)',
      glow: 'rgba(136, 102, 201, 0.2)',
      surface: 'linear-gradient(180deg, rgba(46, 29, 67, 0.9), rgba(18, 12, 29, 0.96))',
      text: '#f0e8fb'
    }
  },
  {
    id: 'movies',
    title: 'Movies & Shows',
    cardTitle: 'Movies & shows',
    href: '/interests/movies',
    description: 'Films, series, and the scenes that keep their voltage long after the credits roll.',
    deck: 'Near-black cinema palettes, ticket stubs, projector warmth, and frame-by-frame memory.',
    categories: ['Movies'],
    palette: {
      accent: '#ff8c69',
      border: 'rgba(255, 140, 105, 0.28)',
      glow: 'rgba(255, 140, 105, 0.16)',
      surface: 'linear-gradient(180deg, rgba(24, 17, 19, 0.96), rgba(7, 7, 9, 0.98))',
      text: '#f7e7dd'
    }
  },
  {
    id: 'finance',
    title: 'Finance',
    cardTitle: 'Finance',
    href: '/interests/finance',
    description: 'Markets, models, and the patterns that surface when you watch the numbers long enough.',
    deck: 'Dark navy surfaces, cyan-green candlesticks, and the rhythm of price action.',
    categories: ['Finance'],
    palette: {
      accent: '#4aedc4',
      border: 'rgba(74, 237, 196, 0.28)',
      glow: 'rgba(74, 237, 196, 0.16)',
      surface: 'linear-gradient(180deg, rgba(10, 18, 32, 0.96), rgba(6, 10, 20, 0.98))',
      text: '#e0f7ef'
    }
  },
  {
    id: 'tech',
    title: 'Tech',
    cardTitle: 'Tech',
    href: '/interests/tech',
    description: 'Systems, tools, and the builds that start as traces on a board before they become real.',
    deck: 'Near-black PCB surfaces, neon-green traces, and the glow of solder points.',
    categories: ['Tech'],
    palette: {
      accent: '#39ff14',
      border: 'rgba(57, 255, 20, 0.24)',
      glow: 'rgba(57, 255, 20, 0.14)',
      surface: 'linear-gradient(180deg, rgba(8, 12, 8, 0.97), rgba(4, 6, 4, 0.99))',
      text: '#d4f5d4'
    }
  }
];

export const interestSectionMap = Object.fromEntries(
  interestSections.map((section) => [section.id, section])
) as Record<InterestWorldId, InterestWorldConfig>;

export function getInterestSectionById(id: InterestWorldId) {
  return interestSectionMap[id];
}

export function getInterestSectionByCategory(category: string) {
  return interestSections.find((section) => section.categories.includes(category)) ?? interestSectionMap.writing;
}
