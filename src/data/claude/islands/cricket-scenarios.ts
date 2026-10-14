/**
 * Scenarios for the /claude CricketFieldingTactician island.
 *
 * Match facts are taken only from Nafi's own match reports in src/content/field-notes/:
 *   seven-to-defend-swat-vs-royal-phoenix.mdx
 *   five-runs-tb-bengals-vs-mustangs.mdx
 *   four-wickets-and-a-chase-blazehawks-vs-go-leopards.mdx
 * None of the posts describes the field that was actually set, so every field here is a
 * suggestion (labelled as such in the UI), never "the actual setup".
 *
 * Geometry is in yards. Origin = middle of the pitch. -y points down the ground past the
 * bowler, +y points behind the striker. For a right-handed batter facing up the page, +x is
 * the off side and -x is the leg (on) side.
 */

export interface FieldPoint {
  x: number;
  y: number;
}

export type MatchPhase = 'powerplay' | 'after-powerplay';

export interface CricketScenario {
  id: string;
  title: string;
  matchup: string;
  /** Match date as given in the post, YYYY-MM-DD */
  date: string;
  venue?: string;
  format: string;
  phase: MatchPhase;
  phaseLabel: string;
  situation: string;
  question: string;
  facts: string[];
  result: string;
  essaySlug: string;
  /** Starting field the reader is asked to improve (9 fielders, keeper and bowler excluded) */
  startField: FieldPoint[];
  /** "Show a suggested field" target (9 fielders) */
  suggestedField: FieldPoint[];
  suggestionNote: string;
}

/* ---------- Ground geometry (yards) ---------- */
export const GROUND = {
  boundaryRadius: 68,
  /** Fielders are kept a little inside the rope */
  maxFielderRadius: 65,
  ringRadius: 30,
  /** Stumps sit 11 yards either side of the pitch centre (22-yard pitch) */
  halfPitch: 11,
  /** Popping crease is 4 ft (1.33 yd) in front of the striker's stumps */
  strikerPoppingY: 9.67,
  pitchHalfWidth: 1.67,
  striker: { x: 0.6, y: 10 } as FieldPoint,
  keeper: { x: 1, y: 25 } as FieldPoint,
  bowler: { x: -1.2, y: -13 } as FieldPoint
} as const;

/** Standard T20 fielding restriction shown by the rule engine. */
export const FIELD_RULES = {
  maxOutside: { powerplay: 2, 'after-powerplay': 5 } as Record<MatchPhase, number>,
  maxLegSideBehindSquare: 2,
  statement:
    'Rules shown: standard T20 fielding restrictions (at most 2 fielders outside the 30-yard circle in the powerplay, overs 1 to 6; at most 5 after it) and Law 28.4 (no more than 2 fielders behind square on the leg side). League playing conditions, and shortened matches, can differ.'
} as const;

/** Named positions used to describe where a fielder is standing (right-handed batter). */
export const NAMED_POSITIONS: { name: string; x: number; y: number }[] = [
  { name: 'Slip', x: 5, y: 25 },
  { name: 'Gully', x: 14, y: 21 },
  { name: 'Silly point', x: 6, y: 9 },
  { name: 'Short leg', x: -6, y: 9 },
  { name: 'Point', x: 24, y: 9 },
  { name: 'Cover', x: 22, y: -6 },
  { name: 'Extra cover', x: 16, y: -16 },
  { name: 'Mid-off', x: 9, y: -22 },
  { name: 'Mid-on', x: -9, y: -22 },
  { name: 'Midwicket', x: -22, y: -5 },
  { name: 'Square leg', x: -23, y: 8 },
  { name: 'Short fine leg', x: -12, y: 26 },
  { name: 'Short third man', x: 16, y: 32 },
  { name: 'Third man', x: 31.5, y: 54.6 },
  { name: 'Deep backward point', x: 57.1, y: 26.6 },
  { name: 'Deep point', x: 62.8, y: 5.5 },
  { name: 'Deep cover', x: 57.1, y: -26.6 },
  { name: 'Deep extra cover', x: 44.5, y: -44.5 },
  { name: 'Long-off', x: 19.5, y: -59.9 },
  { name: 'Long-on', x: -19.5, y: -59.9 },
  { name: 'Cow corner', x: -44.5, y: -44.5 },
  { name: 'Deep midwicket', x: -57.1, y: -26.6 },
  { name: 'Deep square leg', x: -62.8, y: 5.5 },
  { name: 'Deep backward square leg', x: -57.1, y: 26.6 },
  { name: 'Fine leg', x: -31.5, y: 54.6 }
];

const P = Object.fromEntries(NAMED_POSITIONS.map((p) => [p.name, { x: p.x, y: p.y }])) as Record<string, FieldPoint>;

/** A middle-overs field with four out: the reader's starting point in two scenarios. */
const middleOversField: FieldPoint[] = [
  P['Point'],
  P['Cover'],
  P['Mid-off'],
  P['Mid-on'],
  P['Square leg'],
  P['Deep cover'],
  P['Long-on'],
  P['Deep midwicket'],
  P['Fine leg']
];

export const cricketScenarios: CricketScenario[] = [
  {
    id: 'seven-to-defend',
    title: 'Seven to defend',
    matchup: 'SWAT vs Royal Phoenix',
    date: '2024-10-01',
    format: '16 overs a side',
    phase: 'after-powerplay',
    phaseLabel: 'Final over',
    situation:
      'Royal Phoenix are 89/4 chasing 96. Seven needed from the last six balls, and Nafi has the ball.',
    question: 'Protect the boundary, or keep catchers in play?',
    facts: [
      'SWAT made 95/6 in 16 overs; Nafi scored 29 off 24.',
      'Amit Saha was still in on 44 and looked the batter most likely to take the game away.',
      'Wides in the middle of the over left Royal Phoenix needing 4 from 2.',
      'Amit Saha tried to force it and Sourabh Chandran took the catch; the last ball, full and straight, was a dot.'
    ],
    result: 'SWAT won by 3 runs',
    essaySlug: 'seven-to-defend-swat-vs-royal-phoenix',
    startField: middleOversField,
    suggestedField: [
      P['Long-off'],
      P['Long-on'],
      P['Deep midwicket'],
      P['Deep square leg'],
      P['Deep cover'],
      P['Mid-off'],
      P['Mid-on'],
      P['Point'],
      P['Short fine leg']
    ],
    suggestionNote:
      'Five on the rope in the arcs a full, straight ball tends to go, with mid-on, mid-off and point saving the single. A suggested setup, not the field SWAT used: the post does not record it.'
  },
  {
    id: 'five-runs',
    title: 'Five runs',
    matchup: 'TB Bengal Tigers vs Mustangs',
    date: '2026-03-21',
    format: '16 overs a side',
    phase: 'after-powerplay',
    phaseLabel: 'Closing overs (what-if)',
    situation:
      'Defending 128/7. Mustangs chased hard and were bowled out for 123. The post does not record the equation at the death, so this is a what-if: the closing overs, with the tail in.',
    question: 'Bring the circle up, or guard the ropes?',
    facts: [
      'TB Bengal Tigers made 128/7 in 16 overs; Nafi hit 68 off 34 with nine fours and four sixes.',
      'Birat Saha took three wickets, both openers and then Ankith Yeru, to keep the chase honest.',
      'Nafi ran out the Mustangs captain, Sai Akshith Thodupunuri.',
      'Sayem Hossain cleaned up the tail.'
    ],
    result: 'TB Bengal Tigers won by 5 runs',
    essaySlug: 'five-runs-tb-bengals-vs-mustangs',
    startField: [
      P['Long-off'],
      P['Long-on'],
      P['Deep midwicket'],
      P['Deep cover'],
      P['Deep square leg'],
      P['Mid-off'],
      P['Mid-on'],
      P['Point'],
      P['Short fine leg']
    ],
    suggestedField: [
      P['Slip'],
      P['Long-off'],
      P['Long-on'],
      P['Deep midwicket'],
      P['Deep cover'],
      P['Mid-off'],
      P['Mid-on'],
      P['Point'],
      P['Square leg']
    ],
    suggestionNote:
      'Against lower-order batters, one option is to attack: a slip for the edge, four on the rope, and a tight ring that makes every single a risk. A suggested setup, not the field the Bengal Tigers used.'
  },
  {
    id: 'four-wickets',
    title: 'Four wickets and a chase',
    matchup: 'Blazehawks vs Go Leopards',
    date: '2026-03-28',
    venue: 'Waverly Cricket Field, Tampa',
    format: 'FT20 League, 20 overs a side',
    phase: 'powerplay',
    phaseLabel: 'Powerplay, overs 1 to 6',
    situation:
      'Go Leopards won the toss and batted. Blazehawks open the bowling, and only two fielders may stand outside the circle.',
    question: 'Attack with catchers, or spread the field with only two out?',
    facts: [
      'Venky Bollineni took two wickets at the top; Jaswanth Maddela’s lbw on Sai Raman Taduri slowed the early momentum.',
      'Nafi finished with 4-33 from four overs, including Nagaraj P bowled for 70 off 50.',
      'Go Leopards made 149/8. Blazehawks chased it in 16.3 overs, with Nafi making 44 off 24.'
    ],
    result: 'Blazehawks won by six wickets',
    essaySlug: 'four-wickets-and-a-chase-blazehawks-vs-go-leopards',
    startField: middleOversField,
    suggestedField: [
      P['Slip'],
      P['Gully'],
      P['Point'],
      P['Cover'],
      P['Mid-off'],
      P['Mid-on'],
      P['Square leg'],
      P['Third man'],
      P['Fine leg']
    ],
    suggestionNote:
      'A new-ball field: two catchers behind the bat, the ring saving singles, and the two allowed boundary riders at third man and fine leg, where edges and glances run. A suggested setup; the post does not record the Blazehawks field.'
  }
];
