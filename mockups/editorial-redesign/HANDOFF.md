# Continue in desktop Codex

The user requested a redesign of cmnafi.com, a hub at cmnafi.com/era for companies, ideas and businesses, and a Bookmarks page featuring open-source projects. They then requested: **"Send it to my codex on computer, then run it there, move caia portal and world cup from the front page."**

## First action

Run the completed mockup locally:

```sh
cd mockups/editorial-redesign
npm start
```

If this folder was downloaded separately, run `npm start` from the extracted folder instead. Open http://127.0.0.1:4173, http://127.0.0.1:4173/era/, and http://127.0.0.1:4173/bookmarks/ on the user's computer. Start a separate port if 4173 is already occupied. No installation is needed for the mockup.

## Existing repository

The public site source is https://github.com/CMNafi/cmnafi.github.io (Astro 5.5.2 + MDX, default branch `master`). The handoff branch is `codex/cmnafi-editorial-era-bookmarks-20261010`. Preserve existing articles, projects, portal routes, and their content. Read `CLAUDE.md`, `plan.md` (lowercase filename), `DESIGN.md`, and `ETHOS.md` before integration. The branch's charter note permits an isolated visual mockup; production tokens and telemetry primitives remain unchanged.

To work without disturbing an existing checkout, fetch the handoff branch and create a separate worktree, choosing an unused directory:

```sh
git fetch origin codex/cmnafi-editorial-era-bookmarks-20261010
git worktree add ../cmnafi-editorial-mockups origin/codex/cmnafi-editorial-era-bookmarks-20261010
cd ../cmnafi-editorial-mockups/mockups/editorial-redesign
npm start
```

The real source homepage is `src/pages/index.astro`. Shared navigation is in `src/config/site.ts`. Root `index.html` is generated output. For Astro integration preview, run `npm install` and `npm run dev -- --host 127.0.0.1` from the repository root; validate with `npm run check` and `npm run build`. Do not use `npm run publish:site` for a local preview: it copies generated output into the repository root. Pushes to `work`, `main`, or `master` trigger public deployment; the separate `codex/...` branch avoids those deployment triggers.

## Scope and decisions already implemented

- Redesigned journal landing page with real C M Nafi essays and existing contact links.
- Era contains Regulatory Lens, Worldview, **CAIA Corner**, **World Cup 2026**, Captains View, Fielding Style Playbook, ADV Screener, Manager Search, The personal homepage, and More tools brewing.
- **CAIA Corner and World Cup have no promotional sections or links on the redesigned front page.** They are found in Era. Preserve their original `/caia/` and `/world-cup-2026/` destinations.
- Projects and ideas are grounded in the current blog's public Garage. No owned businesses were supplied; the Companies category is reserved without inventing business claims. Dasseti, BlackRock, Mayo Clinic, and Skybridge are employers, not the user's companies.
- Bookmarks includes Supabase, DuckDB, Ollama, OpenBB, Actual Budget, Cal.diy, Immich, PostHog, Appwrite, Grafana, Metabase, and Node-RED.
- OpenBB's current repository is `openbq-org/OpenBB`. Cal.diy is the MIT-licensed community edition from the Cal.com ecosystem. n8n was excluded because it is source-available rather than strictly open source.
- Bookmarks search, filtering, saved shelf, view controls and theme toggle work; persistence is browser-local.

## Integration after mockup review

Port the approved visual system into the repository's existing Astro structure. Create proper `/era/` and `/bookmarks/` pages and shared navigation/footer. Keep existing essay URLs and portal pages. Move CAIA and World Cup promotional content out of the actual source homepage into Era. Update route metadata and sitemap as supported by the current repo. Make article/project content server-rendered through Astro, and retain small browser scripts for Bookmarks filters and saving. Do not copy a generated root `index.html` over the source blindly.

The prototype is not a deployed update of cmnafi.com. Do not claim desktop execution until the local server has actually started on the user's computer. Public merge/deployment is outside this mockup handoff.

## Verification completed here

JavaScript syntax and DOM behavior checks passed for all routes, removal of portal links/text from the journal, their presence in Era, bookmark search/category filters, save persistence, My shelf, view preference, theme preference, and local illustration paths. The sandbox could not bind a preview server or launch Chromium because sockets were denied (`EPERM`). Desktop visual/mobile QA is still required; no screenshots were captured here.
