# Adventures → Cricket architecture

## Architecture summary

The cricket section is built as a reusable, data-first archive under `Adventures`, with all public records and manual story layers stored in local datasets first. Pages read from normalized cricket data modules instead of hardcoding records into individual templates, so new seasons, matches, or highlights can be added by editing JSON or by extending the planned importer. Source states are preserved per record using four statuses: `verified`, `imported`, `provisional`, and `manually added`.

## File tree

```text
src/pages/adventures.astro
src/pages/adventures/cricket/index.astro
src/pages/adventures/cricket/records.astro
src/pages/adventures/cricket/matches.astro
src/pages/adventures/cricket/teams.astro
src/pages/adventures/cricket/highlights.astro
src/pages/adventures/cricket/timeline.astro
src/components/cricket/CricketHero.astro
src/components/cricket/CareerStatCard.astro
src/components/cricket/SeasonCard.astro
src/components/cricket/TeamCard.astro
src/components/cricket/MatchFilters.astro
src/components/cricket/MatchTable.astro
src/components/cricket/HighlightCard.astro
src/components/cricket/MilestoneStrip.astro
src/components/cricket/CricketTimeline.astro
src/components/cricket/RecordTabs.astro
src/components/cricket/StatComparisonChart.astro
src/components/cricket/SourceBadge.astro
src/components/cricket/VerifiedBadge.astro
src/components/cricket/EmptyStateCard.astro
src/data/cricket/player-profile.json
src/data/cricket/career-summary.json
src/data/cricket/seasons.json
src/data/cricket/teams.json
src/data/cricket/matches.json
src/data/cricket/highlights.json
src/data/cricket/timeline.json
src/data/cricket/milestones.json
src/data/cricket/sources.json
src/data/cricket/index.ts
src/types/cricket.ts
scripts/import-cricket-data.ts
```

## Data schema notes

### `player-profile.json`
- `playerId`
- `name`
- `currentTeam`
- `teams`
- `role`
- `battingStyle`
- `bowlingStyle`
- `profileUrl`
- `externalLinks`
- `intro`

### `career-summary.json`
- `matches`
- `runs`
- `balls`
- `battingAverage`
- `strikeRate`
- `fifties`
- `hundreds`
- `fours`
- `sixes`
- `overs`
- `wickets`
- `runsConceded`
- `economy`
- `catches`
- `runOuts`
- `stumpings`
- `sourceStatus`
- `lastUpdated`

### `seasons.json`
- `seasonId`
- `year`
- `seasonLabel`
- `competition`
- `format`
- `team`
- `matches`
- `innings`
- `notOuts`
- `runs`
- `balls`
- `highScore`
- `battingAverage`
- `strikeRate`
- `wickets`
- `overs`
- `runsConceded`
- `bestBowling`
- `economy`
- `catches`
- `source`
- `sourceStatus`
- `notes`

### `teams.json`
- `teamId`
- `teamName`
- `seasons`
- `competitions`
- `current`
- `role`
- `notes`
- `aggregateStats`
- `logo`
- `links`

### `matches.json`
- `id`
- `date`
- `competition`
- `format`
- `seasonLabel`
- `team`
- `opponent`
- `venue`
- `result`
- `battingRuns`
- `balls`
- `fours`
- `sixes`
- `strikeRate`
- `bowlingOvers`
- `runsConceded`
- `wickets`
- `economy`
- `catches`
- `runOuts`
- `motm`
- `scorecardUrl`
- `source`
- `dataStatus`
- `personalNote`

### `highlights.json`
- `id`
- `title`
- `category`
- `date`
- `team`
- `summary`
- `description`
- `statLine`
- `scorecardUrl`
- `media`
- `tags`
- `sourceStatus`

### `timeline.json`
- `id`
- `date`
- `seasonLabel`
- `title`
- `type`
- `summary`
- `body`
- `relatedTeam`
- `relatedMatch`
- `relatedHighlight`
- `relatedStats`

### `milestones.json`
- `id`
- `label`
- `value`
- `detail`
- `sourceStatus`

### `sources.json`
- `id`
- `name`
- `sourceUrl`
- `sourceType`
- `lastChecked`
- `parserStatus`
- `notes`

## Import pipeline plan

`scripts/import-cricket-data.ts` is scaffolded as phase two for this archive. The script is designed to:
1. accept a player ID argument
2. fetch the known player profile URL
3. persist raw source snapshots for debugging and parser evolution
4. probe the fetched HTML without breaking the frontend when layouts change
5. update `sources.json` with the latest check metadata
6. leave room for future scorecard, season, and match normalization

The importer is intentionally partial right now: it documents the workflow, proves the data boundary, and avoids coupling the frontend to live scraping.

## Maintenance guide

- Add or revise player identity in `src/data/cricket/player-profile.json`.
- Update aggregate public totals in `src/data/cricket/career-summary.json`.
- Add season snapshots to `src/data/cricket/seasons.json`.
- Add new team chapters or aliases to `src/data/cricket/teams.json`.
- Add one row per match to `src/data/cricket/matches.json`.
- Add story-first cards to `src/data/cricket/highlights.json`.
- Add transitions or memories to `src/data/cricket/timeline.json`.
- Add new achievement markers to `src/data/cricket/milestones.json`.
- Keep source metadata fresh in `src/data/cricket/sources.json`.
- Re-run the importer later once parser coverage expands.

## Future upgrade suggestions

The current structure is already ready for:
- embedded scorecard links
- uploaded photos and videos
- an awards page
- best partnerships
- opposition breakdowns
- venue breakdowns
- milestone counters
- captaincy records
- deeper fielding records
- manual match reports
- public/private archive modes
- curated fantasy XI content
