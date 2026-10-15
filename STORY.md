# STORY.md: the narrative spine

> PLAN.md decides how the site is built. This file decides what it says.
> Any copy that describes Nafi (homepage, Story, Connect, project blurbs,
> meta descriptions, social posts) follows this file. If a fact here is wrong,
> fix it here first, then everywhere else.

---

## 1. The logline

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

| # | Place | When | Chapter | The turn |
|---|---|---|---|---|
| 01 | Dinajpur, Bangladesh | Childhood | A house where reading was the answer to boredom | The one room where he wasn't new |
| 02 | Rangpur, Bangladesh | Age 12 | Twelve, and on my own clock | Rangpur Cadet College. 66 km from home, a long way away |
| 03 | Changshu, China | 2016, age 16 | A country, and a language, I didn't know | UWC on full scholarship, 100+ nationalities |
| 04 | Decorah, Iowa | Aug 2018 to May 2022 | Eight thousand people and a long winter | Luther College, B.A. Data Science, GPA 3.5; Blackstone/BlackRock mix-up |
| 05 | Rochester, Minnesota | 2021 to 2022 | Where the stakes were real | Mayo Clinic. "Messy data is the job" |
| 06 | New York | 2021 to 2022 | Data that can move a decision | SkyBridge. "Narrative is translation" |
| 07 | Wilmington, Delaware | 2022 to 2023 | A trillion dollars is a storytelling problem | BlackRock, Data & AI |
| 08 | Remote | 2023 to now | The pattern gets a job title | Dasseti, solutions engineer |
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

Use only these. If a claim isn't here or in his own writing, don't publish it.

- **Name:** C M Nafi. Goes by Nafi. Email `nafi@cmnafi.com`.
- **Dinajpur, Bangladesh:** childhood. Household treated reading as the
  default answer to boredom.
- **Rangpur Cadet College:** left home at 12 for military school.
- **UWC Changshu, China:** 2016, age 16, full scholarship, IB Diploma.
  Didn't speak the language. Classmates from 100+ countries.
- **Luther College, Decorah, Iowa:** town of ~8,000. B.A. Data Science,
  Computer Science minor, 2022. Junior year: applied to "Blackstone," the
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
