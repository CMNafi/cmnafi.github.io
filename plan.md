# cmnafi.com — Master Plan

> **This file is the charter.** Drop it in the repo root. Every Claude Code
> session reads it. If a future change contradicts this doc, update this doc
> first, then do the change. That is the single biggest lever for token efficiency
> — you never re-explain the vision.

---

## 0. The one-sentence vision

A paddock-quality personal site where every project is a **car in the garage still
being built**, every blog post is a **telemetry readout worth syndicating**, and
every page feels like it was designed by someone who watches the race, not just
the results.

---

## 1. What exists today (audit)

**Stack:** Astro + TypeScript + MDX, deployed at cmnafi.com.
**IA already drafted:** Home (P1/P2/P3, Sector 1/2/3), Story, Interests, Projects,
Field Notes, Connect, Brewing.
**Content state:** 6 tracked projects, 4 featured, 2 live — the rest "brewing."
Blog scaffold exists as "Field Notes."
**F1 language already seeded:** "Follow my line," sector cards, lap timer shell,
"Restart Sequence," telemetry times. Good bones. The interpretation is flat —
text says F1, the visuals do not.

**Gap:** the F1 metaphor is written, not *felt*. The projects page is a list
pretending to be a garage. There's no signature motion moment. No blog-to-social
pipeline. No design system doc. No reusable telemetry primitives.

---

## 2. Information architecture (final)

Five pages, no more. Everything else is a sub-route.

| Route | F1 metaphor | What lives here |
|---|---|---|
| `/` | **Pit Wall** — the strategist's view | Hero, current lap (what's shipping now), top 3 "sectors" as cards, latest post, signature garage peek |
| `/garage` | **The Garage** (replaces `/projects` + `/brewing`) | The **brewing animation** is the hero. Every project is a car on a lift. Click → detail page. |
| `/field-notes` | **Telemetry log** | Blog. Posts render as race-weekend reports. |
| `/story` | **Driver bio** | The human story, interests, cricket, books, sports. |
| `/connect` | **Parc fermé** | Contact, socials, feeds. |

`/interests` folds into `/story`. `/brewing` becomes `/garage`. `/projects`
redirects to `/garage`. One navigation bar, same across every page, with the
lap-time counter running live in the corner — that's the through-line.

---

## 3. Design system

### 3.1 Aesthetic direction

**Editorial F1 telemetry.** Not the cartoony broadcast graphics. Think the
printed race-weekend brief: serious typography, precise numbers, generous space,
sparing but decisive color. Carbon-fiber textures used *once* as accent, not
wallpaper.

### 3.2 Tokens (put in `src/styles/tokens.css`)

```css
:root {
  /* Palette — lock it, never add */
  --paddock-black:   #0A0B0D;   /* page base */
  --carbon:          #14161B;   /* surface 1 */
  --graphite:        #1F232B;   /* surface 2 */
  --pitlane-white:   #F4F4F1;   /* ink on dark */
  --telemetry-green: #00E676;   /* success, current lap */
  --warning-amber:   #FFB300;   /* caution, brewing */
  --racing-red:      #E10600;   /* live, attention */
  --violet-flag:     #7F5AF0;   /* personal best */

  /* Typography — two fonts, both distinctive */
  --font-display: "PP Editorial New", "GT Sectra", Georgia, serif;
  --font-mono:    "JetBrains Mono", "Berkeley Mono", ui-monospace, monospace;
  --font-body:    "Söhne", "Fraunces", Georgia, serif;

  /* Grid */
  --grid-unit: 8px;
  --radius-chip: 2px;    /* tight, technical */
  --radius-card: 4px;

  /* Motion — easing modeled on acceleration curves */
  --ease-launch:   cubic-bezier(.2, .8, .2, 1);      /* out of pitlane */
  --ease-tire:     cubic-bezier(.6, .04, .98, .335); /* braking */
  --ease-downforce: cubic-bezier(.4, 0, .2, 1);      /* neutral */
}
```

Rules that keep this from drifting:
- **No Inter. No Space Grotesk. No purple-on-white gradients.** Those are the
  tells of generic AI output.
- **Monospace everywhere numbers appear** — lap times, dates, versions, coords.
- **Racing red = live only.** Never decorative. Seeing red means something is
  currently happening.
- **Carbon-fiber texture reserved** for the single garage hero background.
  Nowhere else.

### 3.3 Signature components

Build these once in `src/components/telemetry/` and reuse:

- `<LapTimer />` — the `00:00.000` counter in the nav corner.
- `<SectorBadge variant="p1" />` — the P1/P2/P3 chips.
- `<TelemetryGrid />` — the 4-col data strip (Updated · Status · Stack · Link).
- `<StatusDot state="live | brewing | parked" />` — green/amber/grey dot with
  subtle pulse on "live."
- `<Flag color="checkered | yellow | red" />` — used in post headers.

---

## 4. The Garage — signature moment

This is the one thing the whole site is remembered for. Over-invest here.

### 4.1 Concept

Aerial-angle pit garage, rendered in layered SVG, 60fps. Three lifts side by
side. Each lift holds one **in-development** project as a stylized chassis
with build progress visualized as **which parts are on/off**:

- Chassis = always there
- Engine block = data layer ready
- Aero kit = UI shipped
- Wheels = deployed to prod
- Livery = polish pass done

A project showing all five parts = ready to move to "live" row. The live
projects sit on the front apron, glowing faint green, not on the lifts.

### 4.2 Motion vocabulary

- **Idle loop**: mechanic silhouettes move between lifts (2–3 frame cycle),
  sparks from one station every ~8s, a single warm light flickers. Subtle.
- **Hover a car**: the lift raises 12px, telemetry panel slides in from the
  right with project metadata, all other cars dim to 40%.
- **Click**: camera dollies forward, fade to project detail page. Never a modal.

### 4.3 Technical

- Pure SVG + CSS animations for the base loop (keeps it 60fps on mobile).
- Framer Motion / Motion One for hover transitions.
- Total budget: **< 80KB** including SVGs. If you're over, cut an animation
  before cutting a project.
- Prefers-reduced-motion: freeze to a static illustration, keep functionality.

### 4.4 How to get there fastest

Run `/design-shotgun` from gstack. Prompt: *"F1 pit garage aerial, three lifts
with stylized project-chassis, editorial not cartoonish, carbon+amber+green
palette from tokens.css, 4–6 variants."* Pick one. Hand to `/design-html`.
Then hand the output to `/design-review` to harden.

---

## 5. Blog → social syndication

### 5.1 Content model

Every post is MDX in `src/content/field-notes/`. Frontmatter contract:

```yaml
---
title: "What 13F filings told me about Q1"
slug: "13f-q1-signals"
pubDate: 2026-04-17
status: draft | ready | published
sector: technology | finance | writing | sports | life
syndicate:
  x:        { enabled: true,  style: thread, seed: "3 things I learned reading every 13F this quarter:" }
  linkedin: { enabled: true,  style: essay,  tone: professional }
  facebook: { enabled: false }
  bluesky:  { enabled: true,  style: single }
tags: ["13F", "research", "finance"]
---
```

Post body stays clean MDX. The `syndicate` block is the contract.

### 5.2 Pipeline (low-token, low-friction)

```
write MDX  →  commit  →  GH Action  →  Haiku transforms  →  drafts/  →  you publish
```

On every push to `main` where `status: ready`, a workflow runs
`scripts/syndicate.ts`:

1. Reads the MDX frontmatter + body.
2. For each enabled platform, calls **Anthropic API with Claude Haiku** (cheap,
   fast, sufficient for this job) with a platform-specific prompt.
3. Writes drafts to `syndication/<post-slug>/<platform>.md` and opens a PR.
4. You read drafts on your phone, edit if needed, merge.
5. A second job posts them via the **Typefully API** (handles X threads,
   LinkedIn, Bluesky natively) or **Buffer API** (covers Facebook too).

Why Haiku not Sonnet: these rewrites are mechanical. Sonnet/Opus here is
money lit on fire.

### 5.3 One syndication prompt to rule them all

Store in `scripts/prompts/syndicate.ts`. Platform passed as variable.
Outline:

```
You are rewriting a blog post as a <platform> post in the author's voice.

Voice rules:
- Editorial, calm, precise. No exclamation points. No "excited to share."
- Numbers get monospace in the source; keep them exact.
- Lead with the sharpest line in the post, not the title.
- Never add claims not in the source.

Platform constraints:
  x thread:   8 tweets max, each <=280 chars, first is the hook, last is a CTA
              to the full post URL. Use line breaks, not emoji.
  linkedin:   one post, 1200 chars target, 3 short paragraphs + a closing
              question. No hashtags except the sector tag.
  facebook:   one paragraph, conversational, 400–600 chars, link at the end.
  bluesky:    single post <=300 chars, one idea, link at end.

Source post:
<FRONTMATTER + BODY>

Return ONLY the post text, no preamble.
```

### 5.4 Why not "auto-publish"

You will regret auto-publishing eventually. PR-gated drafts cost you 30
seconds per post and buy you your name back. Flip `auto_publish: true` in
config later if you ever want to.

---

## 6. gbrain as your content corpus

gbrain is your searchable knowledge base — the place where *drafts, research,
notes, and published posts all live together as markdown*.

### 6.1 Setup

Point gbrain at a folder inside the site repo:

```bash
bun add -g gbrain
export OPENAI_API_KEY=...
export ANTHROPIC_API_KEY=...
gbrain init --supabase
gbrain import ./src/content/          # blog + projects become searchable
gbrain sync --watch ./src/content/    # auto-reindex on save
```

### 6.2 What you gain

- Writing a new post → `gbrain query "what have I said about 13F?"` surfaces
  everything you've written on that topic. No more "did I already make this
  argument?"
- Project detail pages can pull related Field Notes automatically via a
  build-time gbrain query embedded in the Astro page.
- Drafts live in the brain as `type: draft` pages; the site only publishes
  `type: post` pages. One system, two views.

### 6.3 What it is NOT

Not the runtime DB. The site is static Astro; gbrain runs offline and at
build time only. Keeps cost at ~$25/mo Supabase + trivial OpenAI embed spend.

---

## 7. gstack — your "team"

Install once:
```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack && ./setup
```

Then add a `CLAUDE.md` to the repo pointing gstack at this plan. Example
top of file:

```md
# cmnafi.com

Read PLAN.md first. It is the charter. Never deviate without updating it.

## gstack
Use /browse for all web browsing. Skills available:
/office-hours, /plan-ceo-review, /plan-design-review, /plan-eng-review,
/design-consultation, /design-shotgun, /design-html, /design-review,
/review, /qa, /ship, /land-and-deploy, /canary, /retro, /autoplan,
/document-release, /learn, /careful, /freeze.
```

### 7.1 Which skill for which job

| Want to... | Run |
|---|---|
| Lock a new feature's scope before building | `/office-hours` then `/autoplan` |
| Explore visual directions | `/design-shotgun` |
| Turn a mockup into production code | `/design-html` |
| Harden existing UI | `/design-review` |
| Find bugs that CI missed | `/review` |
| Click through the live site and find issues | `/qa https://cmnafi.com` |
| Open a PR cleanly | `/ship` |
| Merge + deploy + verify | `/land-and-deploy` |
| Watch post-deploy for regressions | `/canary` |
| Update docs after a ship | auto-runs on `/ship`, or `/document-release` |
| Weekly reflection | `/retro` |

### 7.2 Token discipline

1. **PLAN.md is your context budget saver.** Every session starts by reading
   it — no re-explanation.
2. **Use `/autoplan` instead of chaining reviews manually.** It runs CEO →
   design → eng in one pass and only surfaces decisions.
3. **Use Haiku for boring transforms** (syndication, summaries, tag
   generation). Sonnet for building. Opus only for architecture questions.
4. **Batch.** Don't open a new session for each tweak. One session, multiple
   `/ship`s.
5. **Prefer `/learn`** — store conventions once so they're not re-derived.
   Example: `/learn "telemetry components live in src/components/telemetry/
   and always use tokens.css vars"`.

---

## 8. Repository structure

```
cmnafi.com/
├── PLAN.md                        ← this file (the charter)
├── CLAUDE.md                      ← points at PLAN.md + gstack setup
├── DESIGN.md                      ← §3 extracted for design skills
├── ETHOS.md                       ← voice, values, what you won't publish
├── README.md
├── astro.config.mjs
├── src/
│   ├── content/
│   │   ├── config.ts              ← Zod schemas for collections
│   │   ├── field-notes/           ← blog MDX
│   │   └── projects/              ← project MDX
│   ├── components/
│   │   ├── telemetry/             ← LapTimer, SectorBadge, TelemetryGrid, StatusDot, Flag
│   │   ├── garage/                ← GarageScene, Lift, Chassis, ProjectPanel
│   │   └── layout/
│   ├── pages/
│   │   ├── index.astro            ← pit wall
│   │   ├── garage/
│   │   │   ├── index.astro        ← the animation
│   │   │   └── [slug].astro       ← project detail
│   │   ├── field-notes/
│   │   │   ├── index.astro
│   │   │   └── [slug].astro
│   │   ├── story.astro
│   │   └── connect.astro
│   ├── styles/
│   │   └── tokens.css
│   └── lib/
│       ├── gbrain.ts              ← build-time queries
│       └── syndicate/
├── scripts/
│   ├── syndicate.ts               ← MDX → platform drafts via Haiku
│   ├── publish.ts                 ← drafts → Typefully/Buffer
│   └── prompts/
├── syndication/                   ← git-tracked platform drafts (PR-reviewed)
└── .github/workflows/
    ├── build.yml
    ├── syndicate.yml              ← on push to main, generates drafts
    └── publish.yml                ← on PR merge to main/syndication/**, posts
```

---

## 9. Execution plan — the first four sprints

Each sprint is one or two sessions. Shortest path to a site you're proud of.

### Sprint 0 — Lock the charter (today, 1 hour)
- Drop `PLAN.md`, `CLAUDE.md`, `DESIGN.md`, `ETHOS.md` into repo.
- Install gstack globally.
- Install gbrain, point at `src/content/`.
- Commit. Ship to main. This is the foundation.

### Sprint 1 — Design system & tokens (1 session)
- Create `src/styles/tokens.css` from §3.2.
- Build the five `<telemetry/>` primitives.
- Replace all loose colors and fonts in existing pages with tokens.
- `/design-review` on current homepage to catch drift.

### Sprint 2 — The garage animation (2–3 sessions, the big one)
- `/design-shotgun` → pick variant → `/design-html`.
- Wire up project content collection to the chassis build-state.
- Add reduced-motion fallback.
- `/qa` the animation on mobile, low-end, slow 3G.
- Budget check: < 80KB, 60fps.

### Sprint 3 — Blog + syndication (1 session)
- Content collection + one example Field Note migrated.
- `scripts/syndicate.ts` with Haiku calls, PR generation.
- Connect Typefully (or Buffer). Store API key in GH secrets.
- Dry-run on one post; verify X/LinkedIn/Bluesky drafts look clean.

### Sprint 4 — Pit Wall (homepage) (1 session)
- Redesign `/` around the tokens and components.
- Hero: current lap (what's shipping this week), garage peek, latest Field
  Note, one "sector" call to action.
- `/design-review` → `/qa` → `/ship` → `/land-and-deploy` → `/canary`.

### Ongoing — weekly
- Friday: `/retro` across all work this week.
- One Field Note shipped per week, minimum.
- Move one project from brewing → live per month.

---

## 10. Non-goals

Write these down so you stop debating them.

- No CMS. MDX + gbrain is the CMS.
- No newsletter platform in v1. Field Notes RSS is enough; Substack later if
  you want one.
- No comments. Replies happen on X/LinkedIn, syndicated back as links.
- No dark/light toggle. The site is dark. Paddock-black is the identity.
- No analytics dashboard in-app. Plausible or Fathom, embedded, done.
- No e-commerce, no gated content, no "consulting" CTA until you have
  something specific to sell.
- No AI chat widget. The tools are in `/garage`, the writing is in
  `/field-notes`. That's the product.

---

## 11. Success metrics (what "good" looks like in 90 days)

- **Garage animation** hits 60fps on a 2020-era phone and people share it
  unprompted.
- **1 Field Note/week** for 12 weeks straight, all auto-syndicated, zero
  manual copy-paste.
- **Time from "I have an idea" to "it's live"** < 4 hours of actual work for
  a standard post, < 1 week for a new tool moved to `/garage`.
- **One project** moves from `brewing` → `live` every month.
- **Token spend** on the whole operation (Claude + OpenAI + Supabase) <
  $50/mo, sustainably.

---

## 12. When to update this file

- You change the IA.
- You add or remove a signature component.
- You change the syndication pipeline.
- You break a non-goal.

Anything else: just ship it. Don't touch the charter for tweaks.

---

*Last updated: 2026-04-17. Version 1.0.*
