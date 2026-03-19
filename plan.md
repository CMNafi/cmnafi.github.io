# Homepage Improvement Plan: Clickable Links & Cleaner Design

## Overview
Make every meaningful element on the homepage a clickable link where applicable, and tighten the visual design for a sharper, more polished feel. This is an incremental improvement — no new pages, no structural rewrites.

---

## Phase 1: Make Everything Clickable

### 1.1 Hero Section — Signal Card & Preview Cards
**File:** `src/pages/index.astro`

- **Signal card** (bottom of hero visual: "The journey / From global foundations...") — Wrap in `<a href="#deployment-map">` so clicking it scrolls to the journey section.
- **Preview cards** in the hover dock — Each already has a `label`/`id` that maps to a nav section. Wrap each `strategy-hero__preview-card` in an `<a>` linking to the corresponding page (`/brewing`, `/blog`, `/projects`, `/adventures`, `/connect`, `/` for home).
- **Preview stack items** (mobile view) — Same treatment: wrap each in `<a>` linking to its page.

**Data change:** Add `href` field to `StrategyNavPreview` interface and data in `src/data/strategy-map.ts`.

### 1.2 Hero Section — "C M Nafi" Eyebrow
**File:** `src/pages/index.astro`

- The `<p class="eyebrow">C M Nafi</p>` at line 38 — wrap in `<a href="/about">` (or `/story`) to link to the about/story page.

### 1.3 Deployment Map Chapters
**File:** `src/components/StrategyMapChapter.astro`

- Each chapter card is currently a static `<article>`. The chapter titles and place names are not clickable. Add a subtle "Read more" or anchor link so clicking a chapter title smooth-scrolls or links to the `/story` page (or an anchor within it) for that life stage.
- Alternatively, since these are informational, make the **place name** a clickable element that copies the coordinates or links to a map. Simpler approach: add a small arrow/link icon next to each chapter that links to `/story#[chapter-id]` or `/walking-through-life`.

### 1.4 "Beyond the Data" Signal Items
**File:** `src/pages/index.astro` (lines 224-231)

- The signal items ("Exploring Stories", "On the Field & Track", "In the Driver's Seat", "Work in Public") are static. Add `href` to `StrategyMapSignal` and link them:
  - "Exploring Stories" → `/blog` (books/essays)
  - "On the Field & Track" → `/adventures`
  - "In the Driver's Seat" → `/projects`
  - "Work in Public" → `/brewing`

**Data change:** Add `href` field to `StrategyMapSignal` interface in `src/data/strategy-map.ts`.

### 1.5 Footer Enhancements
**File:** `src/components/Footer.astro`

- "C M Nafi" footer title — wrap in `<a href="/">`.
- Add the `footerLinks` from `siteConfig` (About, Brewing, Connect, RSS) which are defined but not currently rendered in the footer.

---

## Phase 2: Visual Cleanup — Cleaner & Sharper

### 2.1 Tighten Hero Typography & Spacing
**File:** `src/pages/index.astro` `<style>` block

- Reduce `gap` in `.strategy-hero__copy` from `1.35rem` to `1.1rem` for tighter vertical rhythm.
- Slightly increase the body text opacity from `0.74` to `0.78` for better readability.
- Make the "SCROLL TO EXPLORE" cue slightly more visible (bump opacity from `0.62` to `0.68`).

### 2.2 Sharpen Panel Borders & Cards
**File:** `src/pages/index.astro` `<style>` + `src/styles/global.css`

- Increase border opacity on `.panel` from `0.12` to `0.14` for crisper card edges.
- Add a subtle `1px` top highlight (`inset 0 1px 0 rgba(255,255,255,0.05)`) to chapter cards for more definition.
- Tighten chapter card padding from `1.45rem` to `1.3rem` for a more compact feel.

### 2.3 Destination Cards Polish
**File:** `src/pages/index.astro` `<style>` block

- Add a subtle accent-colored left border on hover for destination cards to give directional emphasis.
- Make the "Go deeper ->" arrow animate (translate-x on hover) for a more interactive feel.

### 2.4 Improve Section Heading Hierarchy
**File:** `src/components/SectionHeading.astro`

- Add bottom margin/padding so sections breathe more consistently.
- Ensure the `.section-description` has enough contrast (check opacity).

### 2.5 Button Refinements
**File:** `src/styles/global.css`

- Ensure primary buttons have a consistent hover state (slight scale + brightness shift).
- Secondary/ghost buttons should have a visible border on hover.

### 2.6 Footer Cleanup
**File:** `src/components/Footer.astro` + `src/styles/global.css`

- Add the site navigation links (from `footerLinks` config) in a clean row.
- Slightly increase footer padding for breathing room.

---

## Files to Modify (Summary)

| File | Changes |
|------|---------|
| `src/data/strategy-map.ts` | Add `href` to `StrategyNavPreview` and `StrategyMapSignal` |
| `src/pages/index.astro` | Wrap elements in links, CSS tweaks |
| `src/components/StrategyMapChapter.astro` | Add clickable link to story page |
| `src/components/SectionHeading.astro` | Minor spacing adjustment |
| `src/components/Footer.astro` | Add nav links, wrap title in link |
| `src/styles/global.css` | Button hover states, panel border tweaks |

---

## Out of Scope (for now)
- No new pages created
- No changes to blog/projects/adventures/brewing pages
- No content rewrites
- No responsive layout overhaul (only minor mobile touch-ups if needed)
