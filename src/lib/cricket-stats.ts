import type {
  CricketGameEntry,
  CricketSeasonAggregate,
  CricketStatsSummary,
  CricketTeamAggregate,
  MatchRecord,
  SourceStatus
} from '@/types/cricket';

export const cricketEntryFields = [
  'gameDate',
  'seasonLabel',
  'competition',
  'format',
  'team',
  'opponent',
  'venue',
  'result',
  'runs',
  'balls',
  'wickets',
  'overs',
  'runsConceded',
  'catches',
  'runOuts',
  'distanceDrivenMiles',
  'scorecardUrl',
  'storySlug',
  'personalNote'
] as const;

export type CricketEntryField = (typeof cricketEntryFields)[number];

export const emptyCricketGame = (): CricketGameEntry => ({
  id: '',
  gameDate: '',
  seasonLabel: '',
  competition: '',
  format: '',
  team: '',
  opponent: '',
  venue: '',
  result: '',
  runs: null,
  balls: null,
  wickets: null,
  overs: null,
  runsConceded: null,
  catches: 0,
  runOuts: 0,
  distanceDrivenMiles: null,
  scorecardUrl: '',
  storySlug: '',
  personalNote: '',
  sourceStatus: 'manually added',
  isArchived: false,
  createdAt: null,
  updatedAt: null
});

const round = (value: number, digits = 2) => Number(value.toFixed(digits));

const asNumber = (value: unknown): number | null => {
  if (value === null || value === undefined || value === '') return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const asText = (value: unknown): string | null => {
  if (typeof value !== 'string') return value == null ? null : String(value);
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
};

const asStatus = (value: unknown): SourceStatus => {
  const statuses: SourceStatus[] = ['verified', 'imported', 'provisional', 'manually added'];
  return statuses.includes(value as SourceStatus) ? (value as SourceStatus) : 'manually added';
};

export const normalizeCricketGame = (row: Record<string, unknown>): CricketGameEntry => ({
  id: String(row.id ?? ''),
  gameDate: String(row.game_date ?? row.gameDate ?? ''),
  seasonLabel: asText(row.season_label ?? row.seasonLabel),
  competition: asText(row.competition),
  format: asText(row.format),
  team: String(row.team ?? ''),
  opponent: asText(row.opponent),
  venue: asText(row.venue),
  result: asText(row.result),
  runs: asNumber(row.runs),
  balls: asNumber(row.balls),
  wickets: asNumber(row.wickets),
  overs: asNumber(row.overs),
  runsConceded: asNumber(row.runs_conceded ?? row.runsConceded),
  catches: asNumber(row.catches),
  runOuts: asNumber(row.run_outs ?? row.runOuts),
  distanceDrivenMiles: asNumber(row.distance_driven_miles ?? row.distanceDrivenMiles),
  scorecardUrl: asText(row.scorecard_url ?? row.scorecardUrl),
  storySlug: asText(row.story_slug ?? row.storySlug),
  personalNote: asText(row.personal_note ?? row.personalNote),
  sourceStatus: asStatus(row.source_status ?? row.sourceStatus),
  isArchived: Boolean(row.is_archived ?? row.isArchived ?? false),
  createdAt: asText(row.created_at ?? row.createdAt),
  updatedAt: asText(row.updated_at ?? row.updatedAt)
});

export const fromLegacyMatchRecord = (match: MatchRecord): CricketGameEntry => ({
  id: match.id,
  gameDate: match.date,
  seasonLabel: match.seasonLabel,
  competition: match.competition,
  format: match.format,
  team: match.team,
  opponent: match.opponent,
  venue: match.venue,
  result: match.result,
  runs: match.battingRuns,
  balls: match.balls,
  wickets: match.wickets,
  overs: match.bowlingOvers,
  runsConceded: match.runsConceded,
  catches: match.catches,
  runOuts: match.runOuts,
  distanceDrivenMiles: null,
  scorecardUrl: match.scorecardUrl,
  storySlug: null,
  personalNote: match.personalNote,
  sourceStatus: match.dataStatus,
  isArchived: false,
  createdAt: null,
  updatedAt: null
});

export const toSupabasePayload = (game: CricketGameEntry) => ({
  game_date: game.gameDate,
  season_label: asText(game.seasonLabel),
  competition: asText(game.competition),
  format: asText(game.format),
  team: game.team.trim(),
  opponent: asText(game.opponent),
  venue: asText(game.venue),
  result: asText(game.result),
  runs: asNumber(game.runs),
  balls: asNumber(game.balls),
  wickets: asNumber(game.wickets),
  overs: asNumber(game.overs),
  runs_conceded: asNumber(game.runsConceded),
  catches: asNumber(game.catches) ?? 0,
  run_outs: asNumber(game.runOuts) ?? 0,
  distance_driven_miles: asNumber(game.distanceDrivenMiles),
  scorecard_url: asText(game.scorecardUrl),
  story_slug: asText(game.storySlug),
  personal_note: asText(game.personalNote),
  source_status: game.sourceStatus,
  is_archived: Boolean(game.isArchived)
});

const computeAverage = (numerator: number, denominator: number) => {
  if (!denominator) return null;
  return round(numerator / denominator);
};

const formatBestBowling = (wickets: number | null, runsConceded: number | null) => {
  if (wickets === null || wickets === undefined) return null;
  return `${wickets}/${runsConceded ?? '-'}`;
};

const compareBestBowling = (candidate: CricketGameEntry, current: CricketGameEntry | null) => {
  if ((candidate.wickets ?? 0) === 0) return current;
  if (!current) return candidate;
  if ((candidate.wickets ?? 0) > (current.wickets ?? 0)) return candidate;
  if ((candidate.wickets ?? 0) === (current.wickets ?? 0) && (candidate.runsConceded ?? Number.MAX_SAFE_INTEGER) < (current.runsConceded ?? Number.MAX_SAFE_INTEGER)) {
    return candidate;
  }
  return current;
};

const resolveSeasonLabel = (game: CricketGameEntry) => {
  if (game.seasonLabel && game.seasonLabel.trim().length) return game.seasonLabel.trim();
  const year = game.gameDate.slice(0, 4);
  return year || 'Unknown season';
};

const resolveYear = (game: CricketGameEntry) => {
  const year = Number.parseInt(game.gameDate.slice(0, 4), 10);
  return Number.isFinite(year) ? year : 0;
};

export const aggregateCricketGames = (allGames: CricketGameEntry[]) => {
  const games = allGames
    .filter((game) => !game.isArchived)
    .slice()
    .sort((a, b) => b.gameDate.localeCompare(a.gameDate));

  let totalRuns = 0;
  let totalBalls = 0;
  let totalWickets = 0;
  let totalOvers = 0;
  let totalRunsConceded = 0;
  let totalCatches = 0;
  let totalRunOuts = 0;
  let totalDriveMiles = 0;
  let bestScore: number | null = null;
  let farthestDriveMiles: number | null = null;
  let bestBowlingGame: CricketGameEntry | null = null;
  let fifties = 0;
  let hundreds = 0;

  const seasons = new Map<string, CricketSeasonAggregate>();
  const teams = new Map<string, CricketTeamAggregate>();

  games.forEach((game) => {
    const runs = game.runs ?? 0;
    const balls = game.balls ?? 0;
    const wickets = game.wickets ?? 0;
    const overs = game.overs ?? 0;
    const runsConceded = game.runsConceded ?? 0;
    const catches = game.catches ?? 0;
    const runOuts = game.runOuts ?? 0;
    const driveMiles = game.distanceDrivenMiles ?? 0;

    totalRuns += runs;
    totalBalls += balls;
    totalWickets += wickets;
    totalOvers += overs;
    totalRunsConceded += runsConceded;
    totalCatches += catches;
    totalRunOuts += runOuts;
    totalDriveMiles += driveMiles;

    if ((bestScore ?? -1) < runs) bestScore = runs;
    if ((farthestDriveMiles ?? -1) < driveMiles) farthestDriveMiles = driveMiles;
    if (runs >= 50) fifties += 1;
    if (runs >= 100) hundreds += 1;
    bestBowlingGame = compareBestBowling(game, bestBowlingGame);

    const seasonKey = resolveSeasonLabel(game);
    const season = seasons.get(seasonKey) ?? {
      seasonLabel: seasonKey,
      year: resolveYear(game),
      competition: game.competition ?? 'Unknown competition',
      format: game.format ?? 'Unknown format',
      team: game.team,
      matches: 0,
      runs: 0,
      wickets: 0,
      catches: 0,
      driveMiles: 0,
      battingAverage: null,
      strikeRate: null,
      economy: null,
      highScore: null,
      bestBowling: null
    };

    season.matches += 1;
    season.runs += runs;
    season.wickets += wickets;
    season.catches += catches;
    season.driveMiles += driveMiles;
    season.highScore = Math.max(season.highScore ?? 0, runs);
    season.bestBowling = formatBestBowling(
      Math.max(wickets, Number.parseInt(season.bestBowling?.split('/')[0] ?? '0', 10)),
      season.bestBowling === null || wickets > Number.parseInt(season.bestBowling.split('/')[0] ?? '0', 10)
        ? game.runsConceded
        : Number.parseInt(season.bestBowling.split('/')[1] ?? '-', 10)
    );
    season.battingAverage = computeAverage(season.runs, season.matches);
    season.strikeRate = computeAverage(season.runs * 100, games.filter((candidate) => resolveSeasonLabel(candidate) === seasonKey).reduce((sum, candidate) => sum + (candidate.balls ?? 0), 0));
    season.economy = computeAverage(
      games.filter((candidate) => resolveSeasonLabel(candidate) === seasonKey).reduce((sum, candidate) => sum + (candidate.runsConceded ?? 0), 0),
      games.filter((candidate) => resolveSeasonLabel(candidate) === seasonKey).reduce((sum, candidate) => sum + (candidate.overs ?? 0), 0)
    );
    seasons.set(seasonKey, season);

    const teamKey = game.team;
    const team = teams.get(teamKey) ?? {
      team: teamKey,
      matches: 0,
      runs: 0,
      wickets: 0,
      catches: 0,
      driveMiles: 0,
      battingAverage: null,
      strikeRate: null,
      economy: null
    };

    team.matches += 1;
    team.runs += runs;
    team.wickets += wickets;
    team.catches += catches;
    team.driveMiles += driveMiles;
    team.battingAverage = computeAverage(team.runs, team.matches);
    team.strikeRate = computeAverage(
      team.runs * 100,
      games.filter((candidate) => candidate.team === teamKey).reduce((sum, candidate) => sum + (candidate.balls ?? 0), 0)
    );
    team.economy = computeAverage(
      games.filter((candidate) => candidate.team === teamKey).reduce((sum, candidate) => sum + (candidate.runsConceded ?? 0), 0),
      games.filter((candidate) => candidate.team === teamKey).reduce((sum, candidate) => sum + (candidate.overs ?? 0), 0)
    );
    teams.set(teamKey, team);
  });

  const summary: CricketStatsSummary = {
    matches: games.length,
    runs: totalRuns,
    balls: totalBalls,
    battingAverage: computeAverage(totalRuns, games.length),
    strikeRate: computeAverage(totalRuns * 100, totalBalls),
    fifties,
    hundreds,
    wickets: totalWickets,
    overs: round(totalOvers, 1),
    runsConceded: totalRunsConceded,
    economy: computeAverage(totalRunsConceded, totalOvers),
    catches: totalCatches,
    runOuts: totalRunOuts,
    bestScore,
    bestBowling: bestBowlingGame ? formatBestBowling(bestBowlingGame.wickets, bestBowlingGame.runsConceded) : null,
    totalDriveMiles: round(totalDriveMiles, 1),
    averageDriveMiles: computeAverage(totalDriveMiles, games.length),
    farthestDriveMiles
  };

  const seasonRows = [...seasons.values()].sort((a, b) => b.year - a.year || b.seasonLabel.localeCompare(a.seasonLabel));
  const teamRows = [...teams.values()].sort((a, b) => b.matches - a.matches || a.team.localeCompare(b.team));
  const years = [...new Set(games.map((game) => game.gameDate.slice(0, 4)).filter(Boolean))];
  const competitions = [...new Set(games.map((game) => game.competition).filter(Boolean))] as string[];
  const formats = [...new Set(games.map((game) => game.format).filter(Boolean))] as string[];
  const teamsList = [...new Set(games.map((game) => game.team).filter(Boolean))];

  return {
    games,
    summary,
    seasonRows,
    teamRows,
    filters: {
      years,
      competitions,
      formats,
      teams: teamsList
    }
  };
};
