import playerProfile from './player-profile.json';
import careerSummary from './career-summary.json';
import seasons from './seasons.json';
import teams from './teams.json';
import matches from './matches.json';
import highlights from './highlights.json';
import timeline from './timeline.json';
import milestones from './milestones.json';
import sources from './sources.json';
import type {
  CareerSummary,
  Highlight,
  MatchRecord,
  Milestone,
  PlayerProfile,
  SeasonRecord,
  SourceRegistryItem,
  TeamRecord,
  TimelineItem
} from '@/types/cricket';

export const cricketPlayerProfile = playerProfile as PlayerProfile;
export const cricketCareerSummary = careerSummary as CareerSummary;
export const cricketSeasons = seasons as SeasonRecord[];
export const cricketTeams = teams as TeamRecord[];
export const cricketMatches = matches as MatchRecord[];
export const cricketHighlights = highlights as Highlight[];
export const cricketTimeline = timeline as TimelineItem[];
export const cricketMilestones = milestones as Milestone[];
export const cricketSources = sources as SourceRegistryItem[];

const formatMetric = (value: number | null, digits = 0, fallback = 'Open') => {
  if (value === null) return fallback;
  return digits > 0 ? value.toFixed(digits) : value.toString();
};

const bestKnownScore = cricketMatches.reduce((best, match) => Math.max(best, match.battingRuns ?? 0), 0);
const bestKnownSpellMatch = [...cricketMatches]
  .filter((match) => match.wickets !== null)
  .sort((a, b) => {
    const wicketDelta = (b.wickets ?? 0) - (a.wickets ?? 0);
    if (wicketDelta !== 0) return wicketDelta;
    return (a.runsConceded ?? Number.MAX_SAFE_INTEGER) - (b.runsConceded ?? Number.MAX_SAFE_INTEGER);
  })[0];
const bestKnownSpell = bestKnownSpellMatch?.wickets !== undefined && bestKnownSpellMatch?.wickets !== null
  ? `${bestKnownSpellMatch.wickets}/${bestKnownSpellMatch.runsConceded ?? '-'}`
  : 'Open';

export const careerSnapshotCards = [
  { label: 'Career runs', value: formatMetric(cricketCareerSummary.runs), detail: 'Confirmed headline batting total' },
  { label: 'Career wickets', value: formatMetric(cricketCareerSummary.wickets), detail: 'Confirmed headline bowling total' },
  { label: 'Best score', value: formatMetric(bestKnownScore), detail: 'Top innings in the imported archive' },
  { label: 'Best spell', value: bestKnownSpell, detail: 'Best bowling figure currently preserved' },
  { label: 'Teams', value: cricketPlayerProfile.teams.length.toString(), detail: 'Distinct team chapters kept on the page' },
  { label: 'Player ID', value: cricketPlayerProfile.playerId, detail: 'CricClubs reference' }
];

export const seasonsByYear = [...cricketSeasons].sort((a, b) => b.year - a.year);
export const matchesByDate = [...cricketMatches].sort((a, b) => b.date.localeCompare(a.date));
export const timelineByDate = [...cricketTimeline].sort((a, b) => a.date.localeCompare(b.date));

export const chartSeries = {
  runsBySeason: cricketSeasons
    .filter((season) => season.runs !== null)
    .map((season) => ({ label: season.seasonLabel, value: season.runs ?? 0, meta: season.team })),
  wicketsBySeason: cricketSeasons
    .filter((season) => season.wickets !== null)
    .map((season) => ({ label: season.seasonLabel, value: season.wickets ?? 0, meta: season.team })),
  strikeRateTrend: cricketSeasons
    .filter((season) => season.strikeRate !== null)
    .map((season) => ({ label: season.seasonLabel, value: season.strikeRate ?? 0, meta: season.format })),
  battingAverageTrend: cricketSeasons
    .filter((season) => season.battingAverage !== null)
    .map((season) => ({ label: season.seasonLabel, value: season.battingAverage ?? 0, meta: season.team }))
};

export const teamDistribution = cricketTeams.map((team) => ({
  label: team.teamName,
  value: team.aggregateStats.matches ?? 0,
  meta: team.current ? 'Current' : 'Archive'
}));
