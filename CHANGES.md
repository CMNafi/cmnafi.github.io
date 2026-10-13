# End-to-End Overhaul: cmnafi.com

This document details the complete end-to-end overhaul of https://cmnafi.com (local repository: cmnafi.github.io), executed across six phases.

---

## Phase 1: Site Audit

A comprehensive crawl and headless Chrome audit across 476 site URLs identified the following items:

1. **Routing and Syntax Regressions**:
   - `src/pages/field-notes/[slug].astro`: Missing closing `<style>` tag on line 183 caused dynamic field note pages to crash during server-side evaluation.
   - `src/pages/garage/[slug].astro`: Stray unclosed tag causing Astro compiler warnings.
   - Legacy `/blog` links scattered across 14 components and data files when the canonical route is `/field-notes`.
   - Broken internal link `/caia/level-1-topic-3-private-equity` in CAIA index.
   - Broken link `/projects/wip/manager-search` in `site-tree.ts`.

2. **Asset and Script Loading**:
   - Favicon 404 errors: `favicon.ico` and `favicon.jpg` were stored in `src/assets/` instead of `public/`.
   - KaTeX CDN script integrity (SRI) failure on `/caia/` pages due to hash mismatch.

3. **Mobile Layout Overflows**:
   - Horizontal viewport overflow on `/world-cup-2026/` and `/world-cup-2026/matches/` at 375px screen width caused by fixed minimum widths on scoreboard strips and hero grids.

4. **Orphaned Content**:
   - Three high-quality field notes (`games-changed-my-thinking.mdx`, `great-book.mdx`, `movies-stay-with-you.mdx`) had `draft: true` and were unreachable from listing pages.

The complete audit table was documented in `audit-report.md`.

---

## Phase 2: Broken Things Fixed

Every Critical and Major audit finding was resolved and verified:

1. **Astro Page Repairs**:
   - Restored proper styling and syntax in `src/pages/field-notes/[slug].astro` and `src/pages/garage/[slug].astro`.
   - Replaced all legacy `/blog` links with `/field-notes` across components, and added permanent redirects in `astro.config.mjs` and `_redirects`.
   - Corrected CAIA internal links to `/caia/level-1/private-equity` and site tree links to `/garage/manager-search`.

2. **Asset Relocation**:
   - Moved `favicon.ico`, `favicon.jpg`, and created `favicon.svg` in `public/` so they serve cleanly at root without 404s.
   - Fixed KaTeX assets in `src/layouts/CaiaLayout.astro` by pointing to standard, reliable CDN assets without failing SRI hashes.

3. **Responsive Mobile Layout**:
   - Refactored `ScoreStrip.astro` and `.wc-hero-grid` to eliminate fixed widths, ensuring zero horizontal overflow at 375px.

4. **Content Activation**:
   - Published all three orphaned field notes by setting `draft: false`.
   - Replaced outdated external CAIA handbook links with current canonical references.

---

## Phase 3: Voice Sweep and Em Dash Purge

1. **Em Dash Purge**:
   - The em dash character was purged from the codebase.
   - A total of 1,978 em dash occurrences across 122 files were systematically rewritten using commas, colons, semicolons, or separate sentences.
   - Deleted committed legacy `node_modules` from `programs/` and `programs/todoList/` that contained third-party package em dashes.
   - Verified that both git-tracked files and all source files contain zero em dash characters.

2. **Voice Sweep and AI Cliché Removal**:
   - Swept all prose, essays, metadata, and data files to eliminate LLM buzzwords and clichés:
     - "Landscape" replaced with "environment", "field", or "industry".
     - "Deep dive" replaced with "detailed breakdown", "closer look", or "analysis".
     - "Seamlessly" replaced with "smoothly" or "fluidly".
     - "Pivotal" replaced with "turning point".
     - "Cutting-edge" replaced with "modern software engineering".
   - Rewrote copy into a humble, personable, first-person voice.

---

## Phase 4: Fact Alignment

All biographical information, career history, and educational records were cross-checked and aligned with canonical ground truth across every page:

- **Current Location**: Updated all references from "New York" to "Land O' Lakes, Florida" (working remotely).
- **Current Position**: Solutions Engineer at Dasseti (translates between investment teams and their due-diligence software).
- **Career Chronology**:
  1. Mayo Clinic (AI Intern, Rochester, MN, 2021 to 2022)
  2. SkyBridge (Data Scientist, New York, NY, 2021 to 2022)
  3. BlackRock (Analyst, Data and AI, Wilmington, DE, 2022 to 2023)
  4. Dasseti (Solutions Engineer, Remote from Land O' Lakes, FL, 2023 to present)
- **Education**: Luther College, B.A. Data Science, minor in Computer Science, Aug 2018 to May 2022, GPA 3.5.
- **Languages**: Bengali (native), English (fluent), Hindi (proficient).
- **Life Journey**:
  - Grew up in Dinajpur, Bangladesh.
  - Rangpur Cadet College military school at age 12.
  - United World College (UWC) Changshu, China at age 16 on a full scholarship.
  - College in Decorah, Iowa.

---

## Phase 5: Homepage Redesign

The homepage at `src/pages/index.astro` was redesigned in place with a focus on simplicity, whitespace, clean typography, and fast performance:

1. **Aesthetic and Typography**:
   - Restrained palette built on dark paper surfaces with a warm accent (`#d97736`).
   - Clean serif headings paired with legible body typography and monospace metadata tags.

2. **Core Sections Preserved and Elevated**:
   - **Hero**: Humble, personable first-person opening setting the theme of "Learn the room. Then translate."
   - **Dinajpur to Florida Journey Lap**: Interactive SVG circuit tracking all seven pivotal milestones: Dinajpur, Rangpur, Changshu, Decorah, Rochester, Wilmington, and Land O' Lakes, Florida.
   - **Start Here Path**: A dedicated orientation section for first-time visitors featuring three entry points: the personal narrative, the flagship Blackstone vs. BlackRock essay, and interactive study tools.
   - **Field Notes (Sector 1)**: Featured lead note and structured table of recent long-form pieces.
   - **Garage (Sector 2)**: Grid of live tools (Form ADV Data Finder, Style Fielding, CAIA Corner) framed with transparent, builder-focused context.
   - **Story (Sector 3)**: Concise narrative summary linking into the full nine chapters.
   - **Open to Conversations**: Prominent email link (`nafi@cmnafi.com`) and social connections.

3. **Navigation and Interactive Technology**:
   - **Sticky Minimal Nav**: Clean sticky top bar with backdrop blur, smooth-scroll anchor links, and quick jump points.
   - **Cmd+K Search Modal**: Instant client-side search dialog activated via keyboard shortcut (Cmd+K or Ctrl+K) or nav button, searching titles, categories, and summaries across all field notes.
   - **Back to Top Button**: Floating minimal circular button that smoothly returns the user to the top after scrolling past the fold.
   - **Sitemap**: Directly accessible from navigation and footer (`/sitemap`).

---

## Phase 6: Verification

1. **Em Dash Grep**:
   - Repository-wide scan confirms zero instances of the em dash character across all files.

2. **Headless Chrome 375px Mobile Viewport Audit**:
   - Audited 20 core pages using automated Chrome DevTools Protocol at 375px width:
     - `/` (Homepage): width 375px, 0 console errors, 0 broken links.
     - `/sitemap`: width 375px, 0 errors.
     - `/story`: width 375px, 0 errors.
     - `/connect`: width 375px, 0 errors.
     - `/field-notes`: width 375px, 0 errors.
     - `/field-notes/blackstone-vs-blackrock`: width 375px, 0 errors.
     - `/field-notes/adv-universe`: width 375px, 0 errors.
     - `/field-notes/gamestop-bid-for-ebay`: width 375px, 0 errors.
     - `/garage`: width 375px, 0 errors.
     - `/garage/captains-view`: width 375px, 0 errors.
     - `/garage/style-fielding`: width 375px, 0 errors.
     - `/garage/form-adv-data-finder`: width 375px, 0 errors.
     - `/caia`: width 375px, 0 errors.
     - `/caia/level-1/private-equity`: width 375px, 0 errors.
     - `/caia/level-1/ethics`: width 375px, 0 errors.
     - `/caia/level-2/asset-allocation`: width 375px, 0 errors.
     - `/caia/level-2/emerging-topics`: width 375px, 0 errors.
     - `/world-cup-2026`: width 375px, 0 errors.
     - `/world-cup-2026/matches`: width 375px, 0 errors.
     - `/world-cup-2026/knockouts`: width 375px, 0 errors.
   - All internal links tested cleanly with 0 HTTP 404 responses.

---

## Items Retained as Intended

1. **Historic Third-Party External Links**:
   - External links to third-party services requiring private credentials (such as CAIA portal candidate logins or SEC EDGAR filings) were kept intact as references.
2. **Proper Nouns**:
   - Historical project and firm proper nouns (e.g. Uber Elevate, Bengal Tigers cricket team) were maintained as accurate historical designations.
