# STORY.md: the narrative spine

> PLAN.md decides how the site is built. This file decides what it says.
> Any copy that describes Nafi (homepage, Story, Connect, project blurbs,
> meta descriptions, social posts) follows this file. If a fact here is wrong,
> fix it here first, then everywhere else.

---

## 1. The logline

### Homepage line (November 12, 2026)

**Still learning how things work.**

Nafi asked for a headline that is humble, has some weight, and tells a visitor
what the site is. This is it. The homepage says what is here in one sentence
(notes on how money moves, books, and cricket, plus a few small tools), then
who he is. "Learn the room. Then translate." below remains the thread of the
Story page, but it is no longer the site's headline: it describes him, and the
homepage should describe the site.

### The thread of the story

**Learn the room. Then translate.**

Nafi has been the newest person in the room since he was twelve: military
school in Rangpur, then China at sixteen without the language, then a town of
eight thousand in Iowa. Each time, the job was the same: work out how the room
actually talks, then make himself useful in it. Today that is literally his
job. As a solutions engineer at Dasseti, he sits between investment teams and
the software they run due diligence on, and translates in both directions.

Everything else on the site is the same habit pointed somewhere new:

| Habit | Where it shows up |
|---|---|
| Numbers into stories | **Field Notes**: every big number has a story behind it |
| Problems into tools | **Garage**: small tools he wanted and couldn't find |
| Matches into memory | **Cricket** write-ups of the close finishes |

## 2. Who he is (and is not)

- **Is:** a solutions engineer. The person between the client and the product.
- **Is not:** a software engineer, developer, or "coder." Never describe him as
  "engineering systems," "shipping code," or list programming languages as his
  skills. He builds the Garage tools with AI coding tools, and the honest framing
  is the strong one: *the skill is describing exactly what should exist.*
- **Based:** Land O' Lakes, Florida. Works remotely.

## 3. The arc (nine chapters)

Source of truth: `src/content/journey/*.mdx`, rendered on `/story`.

| # | Place | When | Chapter | What happens |
|---|---|---|---|---|
| 01 | Dinajpur, Bangladesh | Childhood | A house where reading was the answer to boredom | The one place he didn't have to work out |
| 02 | Rangpur, Bangladesh | Age 12 | Leaving home at twelve | Rangpur Cadet College, 66 km from home |
| 03 | Changshu, China | 2016, age 16 | A country, and a language, I didn't know | UWC, classmates from 100+ countries |
| 04 | Decorah, Iowa | Aug 2018 to May 2022 | Eight thousand people and a long winter | Luther College, B.A. Data Science; Blackstone/BlackRock mix-up |
| 05 | Rochester, Minnesota | 2021 to 2022 | My first real data work | Mayo Clinic. Cleaning the data is most of the work |
| 06 | New York | 2021 to 2022 | A first look at how investors choose | SkyBridge. A memo is an argument, not a list |
| 07 | Wilmington, Delaware | 2022 to 2023 | The firm I had mixed up | BlackRock, Data & AI. Dependable beats exciting |
| 08 | Remote | 2023 to now | The job in the middle | Dasseti, solutions engineer |
| 09 | Land O' Lakes, Florida | Now | Numbers, tools, and matches | Field Notes, Garage, cricket |

## 4. Voice

Inherits ETHOS.md (editorial, calm, precise, no exclamation points). On top:

- **Scene before summary.** Open on a concrete moment ("At twelve I left home
  for military school"), never on an abstraction ("The route widened").
- **One idea per chapter**, earned by one specific detail.
- **Self-aware, not self-important.** The Blackstone/BlackRock mix-up is a
  feature. Use it.
- **First person, plain verbs.** "I learned," "I built," "I wrote."
- **Let numbers do the work.** `66 km`. `8,000 people`. `100+ countries`.
  `$32.8 billion`. Monospace where the design allows.

### Humble and plain (November 12, 2026)

Nafi asked for the story to be humble and very simple, with no bragging. This
rule sits above everything else in this section.

- **Say what happened, not what it proves.** "I worked on risk reporting", not
  what that says about him. No sentence whose job is to make him look good.
- **No closing lesson on every chapter.** If a paragraph ends on an aphorism,
  cut the aphorism.
- **Small verbs for his part.** "Helped", "contributed", "worked on", "was an
  intern". Never "led", "drove", "presented to senior stakeholders".
- **Leave out credentials that only impress.** No GPA, no certification list,
  no "where I'm useful" pitch, no reply-time promises. Employers, degrees and
  dates appear once, in the record.
- **The scholarship is stated once**, as a plain fact in the Changshu chapter.
- **Short sentences, common words.**
- **Self-aware beats impressive.** The Blackstone/BlackRock mix-up stays.

Retired with this rule: "makes you larger" · "effort has a texture" · "the
floor everything stands on" · "senior stakeholders" · "the pattern gets a job
title" · "where the stakes were real" · "a trillion dollars is a storytelling
problem" as a heading (the line stays in section 5 as his, but not on the
Story page).

### Retired words and phrases

These made the old copy feel generated. Do not use them to describe Nafi:

> operating system · compounding · integration · the route · frame ·
> center of gravity · intersection of · leverage · passionate · journey (as a
> noun for his life) · driver biography · parc fermé · secure comms ·
> telemetry report · deployment · "crafted with" · "engineering systems"

The F1 vocabulary stays **light**: Sector labels, the Garage, the lap timer, the
one-lap map. It is explained once (he follows F1 closely) and never used to
describe a person or a job.

## 5. Canonical facts

### Professional architecture brief, October 15, 2026

The user explicitly requested a professional systems timeline that includes the languages, tools, concepts, and credentials supplied in that brief. Within that component, these can be described as the stack behind career work and independent projects, supplementing the earlier restriction on listing programming skills. Keep the solutions-engineer title. Do not imply that independent Garage projects, later essays, or proposed infrastructure were delivered for an employer. Node connections represent conceptual dependencies, not employer systems or measured production flows. Project status comes from the project catalog; adviser counts describe the published research universe, not a live tally. The credential list was supplied by the user, rather than independently verified from LinkedIn.

### Professional architecture brief, October 15, 2026

The user explicitly requested a professional systems timeline that includes the languages, tools, concepts, and credentials supplied in that brief. Within that component, these can be described as the stack behind career work and independent projects, supplementing the earlier restriction on listing programming skills. Keep the solutions-engineer title. Do not imply that independent Garage projects, later essays, or proposed infrastructure were delivered for an employer. Node connections represent conceptual dependencies, not employer systems or measured production flows. Project status comes from the project catalog; adviser counts describe the published research universe, not a live tally. The credential list was supplied by the user, rather than independently verified from LinkedIn.

Use only these. If a claim isn't here or in his own writing, don't publish it.

- **Name:** C M Nafi. Goes by Nafi. Email `nafi@cmnafi.com`.
- **Dinajpur, Bangladesh:** childhood. Household treated reading as the
  default answer to boredom.
- **Rangpur Cadet College:** left home at 12 for military school.
- **UWC Changshu, China:** 2016, age 16, full scholarship, IB Diploma.
  Didn't speak the language. Classmates from 100+ countries.
- **Luther College, Decorah, Iowa:** town of ~8,000. B.A. Data Science,
  Computer Science minor, 2022. (GPA is not published on the site.) Junior year: applied to "Blackstone," the
  interview invitation said BlackRock (see Field Note
  `blackstone-vs-blackrock`).
- **Mayo Clinic, Rochester, MN:** AI Intern, 2021 to 2022. Clinical data
  pipelines and reporting for research teams; turned clinicians' ambiguous
  questions into measurable outputs.
- **SkyBridge:** Data Scientist, 2021 to 2022. Manager selection: screens
  across 200+ hedge fund profiles, exposure dashboards, investment memos.
- **BlackRock, Wilmington, DE:** Analyst, Data & AI, 2022 to 2023. Risk
  reporting, fund performance metrics, capital-flow dashboards, Aladdin.
  His line: "a trillion dollars is a spreadsheet problem, a risk problem, and a
  storytelling problem all at once."
- **Dasseti:** Solutions Engineer, 2023 to present, remote. Due diligence
  software for investors.
- **Based:** Land O' Lakes, Florida, works remotely.
- **Languages:** Bengali (native), English (fluent), Hindi (proficient).
- **Cricket:** all-rounder, right-arm fast. Florida leagues (TB Bengal Tigers,
  SWAT, St Pete Shields). Match reports in Field Notes.
- **Also:** follows Formula 1 closely; reads about a book a month, mostly
  non-fiction; runs CAIA Corner, a study hub for alternative investments.

## 6. Open questions (confirm with Nafi)

- SkyBridge: the site said both **Boston** and **New York**, and both
  "SkyBridge Associates" and a fund-of-funds description (SkyBridge Capital).
  The current copy avoids naming the city on the homepage.
- BlackRock: the site said both **Wilmington** and **NYC**. Current copy uses
  Wilmington.
- Field Note `blackstone-vs-blackrock` says "I got the job" in the intro and
  "I did not get the job" in Part I. The story copy avoids stating the outcome
  of that first interview.
