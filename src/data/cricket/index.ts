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

export const careerSnapshotCards = [
  { label: 'Matches', value: cricketCareerSummary.matches.toString(), detail: 'TCL record' },
  { label: 'Runs', value: cricketCareerSummary.runs.toString(), detail: 'Across current public archive' },
  { label: 'Wickets', value: cricketCareerSummary.wickets.toString(), detail: 'Bowling record to date' },
  { label: 'Strike rate', value: cricketCareerSummary.strikeRate.toFixed(2), detail: 'Career batting tempo' },
  { label: 'Batting average', value: cricketCareerSummary.battingAverage.toFixed(2), detail: 'Current TCL average' },
  { label: 'Economy', value: cricketCareerSummary.economy.toFixed(2), detail: 'Current TCL bowling economy' }
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
