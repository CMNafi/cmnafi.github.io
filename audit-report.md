# Site Audit Report

This report documents the full crawl and audit across cmnafi.com and the local Astro repository. It covers broken links, status code errors, redirect chains, broken images, console errors, slow pages, mobile layout at 375px viewport, and orphaned content.

## Audit Summary Table

| URL | Issue | Severity | Planned fix |
| :--- | :--- | :--- | :--- |
| `https://www.cmnafi.com/field-notes/[slug].astro` | Vite build failure: syntax error due to missing `<style>` tag around line 183 | Critical | Restore opening `<style>` tag in `src/pages/field-notes/[slug].astro` |
| `https://www.cmnafi.com/caia/level-1-topic-3-private-equity` | 404 Not Found: dead internal link in `src/pages/caia/index.astro` | Critical | Change href to `/caia/level-1/private-equity` |
| `https://www.cmnafi.com/blog` | 404 Not Found: legacy blog route still referenced across 14 components and data files | Critical | Update all references to `/field-notes`, and register redirect from `/blog` to `/field-notes` in `astro.config.mjs` |
| `https://www.cmnafi.com/caia/` (and child pages `/level-1/`, `/formulas/`) | JS Console Errors: KaTeX CDN Subresource Integrity (SRI) hashes do not match computed sha384 digests, blocking CSS and math rendering | Critical | Update script and style tags in `src/layouts/CaiaLayout.astro` with valid SRI hashes or use standard clean CDN includes |
| `https://www.cmnafi.com/favicon.ico` | 404 Not Found: browser console error because `favicon.ico` sits in repo root rather than `public/` directory | Major | Move `favicon.ico` and `favicon.jpg` into `public/` so Astro serves them at the website root |
| `https://www.cmnafi.com/world-cup-2026/` | Mobile layout horizontal overflow at 375px width (document width 421px vs 375px viewport) due to desktop grid columns | Major | Add responsive mobile styles to collapse hero grid into single column below 768px in `src/pages/world-cup-2026/index.astro` |
| `https://www.cmnafi.com/world-cup-2026/matches/` | Mobile layout horizontal overflow at 375px width (document width 428px vs 375px viewport) from unconstrained match score strip containers | Major | Apply responsive container constraints and flex wrapping on narrow mobile screens |
| `https://cmnafi.com/projects/wip/manager-search` | 404 Not Found: broken link inside `src/data/site-tree.ts` pointing to discontinued path | Major | Update target to `/garage/manager-search` |
| `https://www.cmnafi.com/garage/[slug].astro` | Malformed HTML markup: extraneous closing `</div>` on line 48 causes DOM misalignment | Major | Remove mismatched closing tag in `src/pages/garage/[slug].astro` |
| `https://www.cmnafi.com/world-cup-2026/` (favicon.svg) | 404 Not Found: `<link rel="icon">` references non-existent `/favicon.svg` | Minor | Point icon reference in `src/layouts/WorldCupLayout.astro` to `/favicon.ico` |
| `https://www.cmnafi.com/projects/worldview/${s.url}` (and related `${...}`) | 404 Not Found: HTML crawler picked up literal JavaScript template literals in `public/projects/worldview/index.html` | Minor | Ensure client-side script template literals do not expose unhydrated anchor tags to crawlers |
| `https://www.cmnafi.com/field-notes/games-changed-my-thinking` | Orphaned page: marked `draft: true`, omitted from note indexes | Minor | Update frontmatter `draft: false` and ensure index visibility |
| `https://www.cmnafi.com/field-notes/great-book` | Orphaned page: marked `draft: true`, omitted from note indexes | Minor | Update frontmatter `draft: false` and ensure index visibility |
| `https://www.cmnafi.com/field-notes/movies-stay-with-you` | Orphaned page: marked `draft: true`, omitted from note indexes | Minor | Update frontmatter `draft: false` and ensure index visibility |
| `https://caia.org/programs/the-caia-charter/candidate-handbook` | 404 Not Found: external link in `src/content/caia/level-1/index.mdx` and `level-2/index.mdx` | Minor | Update link to active CAIA charter destination `https://caia.org/programs/the-caia-charter` |
| `https://www.adventuresincre.com/direct-capitalization-method/` | 404 Not Found: outdated external link in `src/content/caia/level-1/real-assets.mdx` | Minor | Replace with current direct capitalization guide link |
| `https://finematics.com/automated-market-makers-explained/` | 404 Not Found: broken external reference in `src/content/caia/level-2/emerging-topics.mdx` | Minor | Replace with accessible automated market makers reference |
| `https://www.sec.gov/files/interval-funds-investor-bulletin.pdf` | 404 Not Found: broken SEC PDF link in `src/content/caia/level-2/emerging-topics.mdx` | Minor | Update to current SEC investor bulletin for interval funds |
| `https://cmnafi.com/*` | Redirect chain: apex requests 301-redirect to `www.cmnafi.com` | Minor | Standardize all internal links to canonical host `https://www.cmnafi.com` |
| `https://cmnafi.com/field-notes/human-capital-education` | Response time exceeds 3s threshold (3814ms uncached) | Minor | Preload primary font assets and streamline rendering pipeline |
| `https://cmnafi.com/field-notes/designing-your-life` | Response time exceeds 3s threshold (3999ms uncached) | Minor | Preload fonts and optimize reading progress script |

## Methodology and Findings

### 1. Link Crawl and Status Codes
A crawl of sitemap-0.xml and all internal references covered 476 page targets. The crawl uncovered three primary broken internal routes: `/blog` (legacy route still used in 14 files), `/caia/level-1-topic-3-private-equity` (should be `/caia/level-1/private-equity`), and `/projects/wip/manager-search` (should be `/garage/manager-search`).

### 2. Assets and Images
All local and remote images loaded cleanly (0 broken images). However, `/favicon.ico` returned a 404 because the favicon assets resided in the project root rather than within `public/`. In addition, `WorldCupLayout.astro` attempted to load a non-existent `/favicon.svg`.

### 3. Console Errors and Subresource Integrity
Headless Chrome execution detected severe SRI validation errors on all CAIA pages. The sha384 hashes in `src/layouts/CaiaLayout.astro` did not match the assets served by jsDelivr, causing browsers to block KaTeX styling and script execution completely.

### 4. Viewport Responsiveness (375px Mobile Viewport)
Automated testing in Chrome at 375px width revealed horizontal document overflow on `/world-cup-2026/` (width 421px) and `/world-cup-2026/matches/` (width 428px). The root causes were an inline two-column grid on the homepage hero and inflexible padding inside the match score strips.

### 5. Content Collections and Orphaned Pages
Review of content collections identified three field notes drafted earlier (`games-changed-my-thinking.mdx`, `great-book.mdx`, and `movies-stay-with-you.mdx`) that had `draft: true` flags, leaving them orphaned and absent from both the Field Notes directory and sitemap.
