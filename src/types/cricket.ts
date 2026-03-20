export type SourceStatus = 'verified' | 'imported' | 'provisional' | 'manually added';

export interface ExternalLink {
  label: string;
  url: string;
}

export interface PlayerProfile {
  playerId: string;
  name: string;
  currentTeam: string;
  teams: string[];
  role: string;
  battingStyle: string;
  bowlingStyle: string;
  profileUrl: string;
  externalLinks: ExternalLink[];
  intro: string;
}

export interface CareerSummary {
  matches: number | null;
  runs: number;
  balls: number | null;
  battingAverage: number | null;
  strikeRate: number | null;
  fifties: number | null;
  hundreds: number | null;
  fours: number | null;
  sixes: number | null;
  overs: number | null;
  wickets: number;
  runsConceded: number | null;
  economy: number | null;
  catches: number | null;
  runOuts: number | null;
  stumpings: number | null;
  sourceStatus: SourceStatus;
  lastUpdated: string;
}

export interface SeasonRecord {
  seasonId: string;
  year: number;
  seasonLabel: string;
  competition: string;
  format: string;
  team: string;
  matches: number;
  innings: number | null;
  notOuts: number | null;
  runs: number | null;
  balls: number | null;
  highScore: number | null;
  battingAverage: number | null;
  strikeRate: number | null;
  wickets: number | null;
  overs: number | null;
  runsConceded: number | null;
  bestBowling: string | null;
  economy: number | null;
  catches: number | null;
  source: string;
  sourceStatus: SourceStatus;
  notes: string;
}

export interface TeamRecord {
  teamId: string;
  teamName: string;
  seasons: string[];
  competitions: string[];
  current: boolean;
  role: string;
  notes: string;
  aggregateStats: {
    matches: number | null;
    runs: number | null;
    wickets: number | null;
    battingAverage: number | null;
    strikeRate: number | null;
    economy: number | null;
  };
  logo: string | null;
  links: ExternalLink[];
}

export interface MatchRecord {
  id: string;
  date: string;
  competition: string;
  format: string;
  seasonLabel: string;
  team: string;
  opponent: string;
  venue: string;
  result: string;
  battingRuns: number | null;
  balls: number | null;
  fours: number | null;
  sixes: number | null;
  strikeRate: number | null;
  bowlingOvers: number | null;
  runsConceded: number | null;
  wickets: number | null;
  economy: number | null;
  catches: number | null;
  runOuts: number | null;
  motm: boolean;
  scorecardUrl: string | null;
  source: string;
  dataStatus: SourceStatus;
  personalNote: string;
}

export interface Highlight {
  id: string;
  title: string;
  category: string;
  date: string;
  team: string;
  summary: string;
  description: string;
  statLine: string;
  scorecardUrl: string | null;
  media: { type: string; label: string; url: string | null }[];
  tags: string[];
  sourceStatus: SourceStatus;
}

export interface TimelineItem {
  id: string;
  date: string;
  seasonLabel: string;
  title: string;
  type: 'team' | 'season' | 'milestone' | 'match' | 'personal note';
  summary: string;
  body: string;
  relatedTeam: string | null;
  relatedMatch: string | null;
  relatedHighlight: string | null;
  relatedStats: string[];
}

export interface Milestone {
  id: string;
  label: string;
  value: string;
  detail: string;
  sourceStatus: SourceStatus;
}

export interface SourceRegistryItem {
  id: string;
  name: string;
  sourceUrl: string;
  sourceType: string;
  lastChecked: string;
  parserStatus: 'ready' | 'planned' | 'manual';
  notes: string;
}

export interface CricketGameEntry {
  id: string;
  gameDate: string;
  seasonLabel: string | null;
  competition: string | null;
  format: string | null;
  team: string;
  opponent: string | null;
  venue: string | null;
  result: string | null;
  runs: number | null;
  balls: number | null;
  wickets: number | null;
  overs: number | null;
  runsConceded: number | null;
  catches: number | null;
  runOuts: number | null;
  distanceDrivenMiles: number | null;
  scorecardUrl: string | null;
  storySlug: string | null;
  personalNote: string | null;
  sourceStatus: SourceStatus;
  isArchived: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface CricketStatsSummary {
  matches: number;
  runs: number;
  balls: number;
  battingAverage: number | null;
  strikeRate: number | null;
  fifties: number;
  hundreds: number;
  wickets: number;
  overs: number;
  runsConceded: number;
  economy: number | null;
  catches: number;
  runOuts: number;
  bestScore: number | null;
  bestBowling: string | null;
  totalDriveMiles: number;
  averageDriveMiles: number | null;
  farthestDriveMiles: number | null;
}

export interface CricketSeasonAggregate {
  seasonLabel: string;
  year: number;
  competition: string;
  format: string;
  team: string;
  matches: number;
  runs: number;
  wickets: number;
  catches: number;
  driveMiles: number;
  battingAverage: number | null;
  strikeRate: number | null;
  economy: number | null;
  highScore: number | null;
  bestBowling: string | null;
}

export interface CricketTeamAggregate {
  team: string;
  matches: number;
  runs: number;
  wickets: number;
  catches: number;
  driveMiles: number;
  battingAverage: number | null;
  strikeRate: number | null;
  economy: number | null;
}
