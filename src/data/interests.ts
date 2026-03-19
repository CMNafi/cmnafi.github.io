export interface InterestSectionConfig {
  id: string;
  title: string;
  description: string;
  categories: string[];
}

export const interestSections: InterestSectionConfig[] = [
  {
    id: 'cricket',
    title: 'On the cricket field',
    description: 'Match stories, scorelines, and the days that stay vivid long after the result.',
    categories: ['Cricket']
  },
  {
    id: 'books',
    title: 'Books',
    description: 'Biographies, ideas, and the books that keep changing shape over time.',
    categories: ['Books']
  },
  {
    id: 'movies',
    title: 'Movies',
    description: 'Scenes, atmosphere, and the films that stay long after the credits.',
    categories: ['Movies']
  },
  {
    id: 'writing',
    title: 'Writing & ideas',
    description: 'Essays, games, notes, product thinking, and the posts that do not fit in only one lane.',
    categories: ['Essays', 'Games', 'Notes', 'Product', 'Travel']
  }
];
