# Editorial Systems Lab preview

The October 14, 2026 redesign brief is implemented as an isolated preview at `https://www.cmnafi.com/codex/`. The existing homepage, Play section, project applications, and essay URLs remain unchanged.

## Three-agent implementation

- Shell and core pages: independent Codex layout, paper/dark tokens, header, command palette, footer, homepage, four-chapter story, and contact page.
- Content catalog: eight projects, architecture summaries, curated flagship essays, searchable research ledger, match scorecards, and annotated bookshelf. Existing Astro content remains the source for published titles, dates, and links.
- Domain islands: adviser search and comparison, a draggable cricket field, geographic chapter map, and portfolio allocation sandbox. No heavy charting dependencies are added.

## Routes

`/codex/`, `/codex/garage/`, `/codex/field-notes/`, `/codex/story/`, and `/codex/connect/` share the new shell. Links to existing essays and full applications use their established production URLs.

## Data and modeling boundaries

SEC parent companies can contain multiple adviser entities. Eight snapshots identify their exact legal entity, CRD, filing date, Item 5.F regulatory AUM and discretionary split, and Item 5.D client types. Official SEC Form ADV PDFs were checked October 14, 2026 and are linked on each card. These are dated entity-level figures, not consolidated company AUM. Fee summaries and 13F holdings are not loaded; unknown values are not treated as zero. Snapshots are not presented as a live SEC connection.

Cricket scenarios come from the published match notes. Suggested formations are tactical examples, since the exact historical coordinates of all nine fielders were not recorded. Coverage indicators are geometric heuristics, not empirically calibrated probabilities. Field restriction assumptions are visible.

Portfolio outputs use stated educational return, volatility, correlation, and risk-free assumptions. The plotted opportunity set and portfolio statistics are calculations, not forecasts. Drawdown estimates are identified as model proxies.

The story preserves the solutions-engineer framing and existing biographical facts. The new pages have no cipher headings, artificial lap counters, expired World Cup countdowns, repeated article tickers, or stacked footers.

## Validation

The production build generates 168 pages, including the five isolated preview routes. The scoped redesign check covers 24 files with zero errors, warnings, or hints. Automated checks cover allocation normalization, covariance and Sharpe calculations, the non-dominated portfolio envelope, geographic distances, eight unique project entries and their category counts, SEC snapshot consistency, local links, single footers, and retired-copy removal.

Browser verification covers paper/dark persistence, shortcut dialog opening and closing, SEC comparison, cricket movement controls and scenario rules, project category filtering, writing stream filtering and search, map chapter selection, portfolio presets and allocation changes, email copying, and mobile overflow. The writing partition contains 66 unique published items: six flagship essays, 29 other essays, three grouped compendiums, five cricket logs, and 23 book notes.
