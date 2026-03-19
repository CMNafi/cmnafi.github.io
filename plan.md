# Plan: Simplify the Homepage

## Goal
Strip the homepage to a single-viewport landing: name, tagline, nav, one CTA. Move all rich content to dedicated pages.

---

## Step 1 — Gut the homepage (`src/pages/index.astro`)

**Keep only:**
- The `<BaseLayout>` wrapper (which includes nav bar)
- A minimal hero section:
  - Eyebrow: "C M Nafi" → links to `/about`
  - Tagline: *"Global foundations. Financial intelligence. Work in motion."*
  - One subtle CTA: "See what I'm building" → `/brewing`
  - Optional secondary: "Let's connect" → `/connect`

**Delete entirely:**
- Hero visual panel (map, preview dock, SVG, glow, grid — lines 56–118)
- Hero body text paragraphs and scroll cue (lines 41–53)
- Deployment Map section (`#deployment-map`, lines 121–201)
- Current Deployment / "Beyond the Data" section (`.strategy-now`, lines 203–236)
- Destinations / site section cards (`.strategy-destinations`, lines 238–255)
- All `<script>` code (lines 258–414)
- All scoped `<style>` rules for removed sections (~1000 lines)

**New CSS:** Minimal — hero centered in viewport, large type, breathing room. ~50 lines max.

---

## Step 2 — Verify content already lives on dedicated pages (no migration needed)

| Content removed from homepage | Already exists at |
|------|--------|
| Waypoint timeline (Dinajpur → Tampa) | `/story` — Phase 1–4 chapters with sticky SVG visualization |
| "From Research to Financial Intelligence" | `/story` — Phase 4 career grid (Mayo, Skybridge, BlackRock, Dasseti) |
| "Beyond the Data" interests | `/story` — Phase 5 interest cards |
| "Let's connect" CTA | `/connect` — full contact page |
| Site section cards (Blog, Projects, etc.) | Nav bar already links to all of these |

**No content migration needed.** Everything is already on its proper page.

---

## Step 3 — Add "Story" to footer links (`src/config/site.ts`)

Make the journey discoverable since it's no longer on the homepage:

```ts
footerLinks: [
  { label: 'Story', href: '/story' },
  { label: 'About', href: '/about' },
  { label: 'Brewing', href: '/brewing' },
  { label: 'Connect', href: '/connect' },
]
```

---

## Step 4 — Clean up unused imports

Remove from index.astro:
- `StrategyMapChapter` component import
- `SectionHeading` component import
- All data imports (`strategyMapChapters`, `strategyMapSignals`, `strategyMapDestinations`, `strategyNavPreviews`)
- All SVG/route constants

Keep `src/data/strategy-map.ts` and `src/components/StrategyMapChapter.astro` in the codebase — other pages may use them.

---

## Files changed

| File | Action |
|------|--------|
| `src/pages/index.astro` | Rewrite to minimal hero — delete ~1400 lines, replace with ~80 lines |
| `src/config/site.ts` | Add "Story" to footer links |

**That's it.** Two files. The homepage goes from ~1440 lines to ~80.
