# Play changes

Built a new sports section in the existing Astro site, linked from Garage, the main navigation, footer navigation, and sitemap. Existing URLs remain stable. The layout uses the site's dark surfaces, serif headings, monospaced labels, and a scoped warm gold accent.

## Pages and data

| Route | What it does | Data pipeline |
| --- | --- | --- |
| `/play/` | Five cards for the full lineup | Static Astro hub |
| `/play/fpl` | Gameweek points, rank, squad, chips, and season history | Official FPL API at build time |
| `/play/f1` | Next race countdown, calendar, standings, and timing when available | OpenF1 at build time, browser timing polls during active sessions |
| `/play/cricket` | International scoreboards and five personal club cards | ESPN numeric series discovery in the browser, club JSON at build time |
| `/play/predict` | F1 podium and cricket winner picks with a local leaderboard | Build-time fixtures and results, browser localStorage |
| `/play/rivals` | FPL comparison table, rank swings, captain contributions, and chips | Shared FPL build-time pipeline |

FPL entry **5705488** is configured in `src/data/play-config.ts`. Friends remain clearly marked placeholders in the same file. No browser code calls the FPL API.

Club data lives in `src/data/my-teams.json`: Bengal Tigers, Orlando Bengal Tigers CC, Floridians, Blaze Hawks, and SWAT. Supplied fixtures and the Orlando championship result are recorded. Unknown fixtures and results remain explicitly unannounced. All displayed club fixture times use America/New_York, including daylight saving.

## Refresh and resilience

The refresh workflow runs twice daily at 08:00 and 20:00 UTC, and can run manually. These are 4 AM and 4 PM Eastern during daylight saving, or 3 AM and 3 PM in winter. It rebuilds and deploys through GitHub Pages after this workflow is pushed. Normal deployment also restores the API snapshot cache.

Server fetches validate responses, share in-memory requests, save successful snapshots in `.cache/play`, retry selected rate-limit or service failures once, and fall back to prior snapshots. Pages show timestamps and visible stale or unavailable states instead of breaking the build. The cache is ignored by Git and persisted between workflow runs with Actions cache.

F1 timing polls every 30 seconds during active sessions and rejects old samples. OpenF1's current documentation requires a paid subscription for real-time data; historical access is public. The UI explains unavailable live access and continues to show the calendar and standings. No subscription or API key was added.

Cricket refreshes every 60 seconds while visible. It discovers ESPN numeric series IDs rather than relying on unsupported ICC slug endpoints, deduplicates fixtures, and has an unavailable-feed fallback. The API is unofficial and its coverage can change.

## Predictions

F1 scores 25, 18, and 15 points for exact first, second, and third position matches. Cricket scores 10 points for the correct winner. Picks lock at the event start. Duplicate F1 drivers are rejected. Results that are missing remain pending; club winners can be updated in the team JSON after a match.

Profiles, picks, revisions, and leaderboard entries persist only in that browser's localStorage. They are not shared across devices and are not a hosted multiplayer leaderboard.

## Verification

- Astro production build passed with 163 pages.
- Scoped Astro check for the new section passed with zero errors, warnings, or hints.
- Prediction scoring, locking, revisions, fixture times, fetch caching, malformed responses, and offline fallback tests passed.
- Browser checks covered all six pages, prediction persistence after reload, real FPL data, and a narrow viewport without horizontal page overflow.
- New source contains zero em dash characters.
- The repository-wide type check still reports pre-existing errors outside this section.

Play now follows the revised homepage's quieter editorial design: matching wordmark and navigation, a narrower reading width, generous spacing, text-led hub cards, restrained labels, and no decorative bar charts or oversized folio. Claude's homepage and footer changes are included in the publication.
