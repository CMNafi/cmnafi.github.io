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

/* ---------- Rule engine and heuristics (shared by server render and client script) ---------- */

const DEG = Math.PI / 180;

/** Inside the 30-yard "circle": two 30-yard semicircles around each set of stumps joined by straight lines. */
export function isOutsideRing(p: FieldPoint): boolean {
  const dy = Math.max(0, Math.abs(p.y) - GROUND.halfPitch);
  return p.x * p.x + dy * dy > GROUND.ringRadius * GROUND.ringRadius;
}

/** Law 28.4: behind the striker's popping crease on the on (leg) side. */
export function isLegSideBehindSquare(p: FieldPoint): boolean {
  return p.x < 0 && p.y > GROUND.strikerPoppingY;
}

/** Bearing from the striker in degrees: 0 = straight past the bowler, +90 = square on the off side. */
export function bearingFromStriker(p: FieldPoint): number {
  const s = GROUND.striker;
  return Math.atan2(p.x - s.x, -(p.y - s.y)) / DEG;
}

export function angleGap(a: number, b: number): number {
  const d = Math.abs(a - b) % 360;
  return d > 180 ? 360 - d : d;
}

function distanceFromStriker(p: FieldPoint): number {
  return Math.hypot(p.x - GROUND.striker.x, p.y - GROUND.striker.y);
}

/** 1 inside `full` degrees, fading linearly to 0 at `zero` degrees. */
const cover = (gap: number, full: number, zero: number) => (gap <= full ? 1 : Math.max(0, 1 - (gap - full) / (zero - full)));

const bump = (phi: number, mu: number, sd: number) => Math.exp(-0.5 * (angleGap(phi, mu) / sd) ** 2);

/**
 * Where we assume a T20 batter tries to hit boundaries: weighted toward the leg side in front of
 * square and the straight "V". An assumption for the heuristic, not measured data.
 */
export function boundaryShotWeight(phi: number): number {
  return 0.25 + 1.0 * bump(phi, -45, 35) + 0.8 * bump(phi, 0, 25) + 0.6 * bump(phi, 55, 30) + 0.35 * bump(phi, 150, 25) + 0.35 * bump(phi, -150, 25);
}

/** Singles are mostly pushed in front of square; behind square counts for less. */
export function singleShotWeight(phi: number): number {
  return Math.abs(phi) <= 110 ? 1 : 0.35;
}

export const HEURISTIC_SAMPLES = 72;
export const HEURISTIC_NOTE =
  'A simple heuristic, not a statistical model. From the striker we sweep 72 shot directions, weighted toward straight and leg-side hits (an assumption). A direction counts as guarded when a boundary rider stands within about 14° of it (fading to nothing by 32°) for boundary protection, or a ring fielder 8 to 36 yards from the bat stands within about 16° (fading by 34°) for single prevention.';

export interface FieldEvaluation {
  outside: number;
  maxOutside: number;
  outsideLegal: boolean;
  legBehind: number;
  legBehindLegal: boolean;
  legal: boolean;
  boundary: number;
  singles: number;
  /** Bearings (deg) the boundary heuristic considers open */
  openBearings: number[];
}

export function evaluateField(points: FieldPoint[], phase: MatchPhase): FieldEvaluation {
  const outside = points.filter(isOutsideRing).length;
  const legBehind = points.filter(isLegSideBehindSquare).length;
  const maxOutside = FIELD_RULES.maxOutside[phase];

  const riders = points
    .filter((p) => isOutsideRing(p))
    .map((p) => ({ bearing: bearingFromStriker(p), depth: Math.min(1, Math.max(0, (distanceFromStriker(p) - 30) / 25)) }));
  const ring = points
    .filter((p) => !isOutsideRing(p))
    .map((p) => ({ bearing: bearingFromStriker(p), dist: distanceFromStriker(p) }))
    .filter((r) => r.dist >= 8 && r.dist <= 36)
    .map((r) => ({ bearing: r.bearing, reach: r.dist <= 28 ? 1 : Math.max(0, 1 - (r.dist - 28) / 10) }));

  let bNum = 0;
  let bDen = 0;
  let sNum = 0;
  let sDen = 0;
  const openBearings: number[] = [];
  for (let i = 0; i < HEURISTIC_SAMPLES; i += 1) {
    const phi = -180 + (i + 0.5) * (360 / HEURISTIC_SAMPLES);
    let bc = 0;
    for (const r of riders) bc = Math.max(bc, cover(angleGap(phi, r.bearing), 14, 32) * r.depth);
    let sc = 0;
    for (const r of ring) sc = Math.max(sc, cover(angleGap(phi, r.bearing), 16, 34) * r.reach);
    const bw = boundaryShotWeight(phi);
    const sw = singleShotWeight(phi);
    bNum += bw * bc;
    bDen += bw;
    sNum += sw * sc;
    sDen += sw;
    if (bc < 0.15) openBearings.push(phi);
  }

  return {
    outside,
    maxOutside,
    outsideLegal: outside <= maxOutside,
    legBehind,
    legBehindLegal: legBehind <= FIELD_RULES.maxLegSideBehindSquare,
    legal: outside <= maxOutside && legBehind <= FIELD_RULES.maxLegSideBehindSquare,
    boundary: Math.round((100 * bNum) / bDen),
    singles: Math.round((100 * sNum) / sDen),
    openBearings
  };
}

/** Point where a shot along `bearing` from the striker meets the boundary rope. */
export function ropePoint(bearing: number): FieldPoint {
  const s = GROUND.striker;
  const dx = Math.sin(bearing * DEG);
  const dy = -Math.cos(bearing * DEG);
  const b = s.x * dx + s.y * dy;
  const c = s.x * s.x + s.y * s.y - GROUND.boundaryRadius * GROUND.boundaryRadius;
  const t = -b + Math.sqrt(b * b - c);
  return { x: s.x + t * dx, y: s.y + t * dy };
}

/** SVG path for the open stretches of rope (each sample drawn as a short arc segment). */
export function openRopePath(bearings: number[]): string {
  const half = 180 / HEURISTIC_SAMPLES;
  return bearings
    .map((phi) => {
      const a = ropePoint(phi - half);
      const m = ropePoint(phi);
      const b = ropePoint(phi + half);
      return `M${a.x.toFixed(2)} ${a.y.toFixed(2)}L${m.x.toFixed(2)} ${m.y.toFixed(2)}L${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
    })
    .join('');
}

export function nearestPositionName(p: FieldPoint): string {
  let best = NAMED_POSITIONS[0];
  let bestD = Infinity;
  for (const n of NAMED_POSITIONS) {
    const d = (n.x - p.x) ** 2 + (n.y - p.y) ** 2;
    if (d < bestD) {
      bestD = d;
      best = n;
    }
  }
  return best.name;
}

/** Keep a fielder on the ground and off the pitch strip. */
export function clampToGround(p: FieldPoint): FieldPoint {
  let { x, y } = p;
  const r = Math.hypot(x, y);
  if (r > GROUND.maxFielderRadius) {
    x = (x / r) * GROUND.maxFielderRadius;
    y = (y / r) * GROUND.maxFielderRadius;
  }
  if (Math.abs(x) < GROUND.pitchHalfWidth + 1.5 && Math.abs(y) < GROUND.halfPitch - 1) {
    x = x < 0 ? -(GROUND.pitchHalfWidth + 1.5) : GROUND.pitchHalfWidth + 1.5;
  }
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 };
}

/** 30-yard ring outline as an SVG path. */
export function ringPath(): string {
  const r = GROUND.ringRadius;
  const h = GROUND.halfPitch;
  return `M${-r} ${-h}A${r} ${r} 0 0 1 ${r} ${-h}L${r} ${h}A${r} ${r} 0 0 1 ${-r} ${h}Z`;
}
