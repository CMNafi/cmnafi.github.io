export interface FielderCoord {
  id: number;
  label: string;
  x: number;
  y: number;
  role: string;
}

export interface CricketScenario {
  id: string;
  name: string;
  date: string;
  matchPhase: 'Death Over (Overs 19-20)' | 'Middle Squeeze (Overs 7-15)' | 'Powerplay Bowling (Overs 1-6)';
  venue: string;
  context: string;
  headlineStat: string;
  outcome: string;
  maxFieldersOutsideCircle: number;
  essaySlug: string;
  tacticalNote: string;
  nafiSetup: FielderCoord[];
}

export const cricketScenarios: CricketScenario[] = [
  {
    id: 'royal-phoenix',
    name: 'SWAT vs Royal Phoenix',
    date: '2024-10-01',
    matchPhase: 'Death Over (Overs 19-20)',
    venue: 'Tampa Regional Field',
    context: 'Defending 7 runs in the 20th over. Batter is right-handed looking to clear the mid-wicket boundary.',
    headlineStat: 'Defended 7 runs in final over · 29 (24) with bat',
    outcome: 'Won by 3 runs (Target 132 defended)',
    maxFieldersOutsideCircle: 5,
    essaySlug: 'seven-to-defend-swat-vs-royal-phoenix',
    tacticalNote: 'Protected the arc between deep mid-wicket and long-on. Packed the off-side ring with cover, point, and short third to cut singles.',
    nafiSetup: [
      { id: 1, label: 'Deep Mid-Wicket', x: 285, y: 260, role: 'Boundary protection on leg side slog' },
      { id: 2, label: 'Long-On', x: 245, y: 345, role: 'Straight boundary boundary rider' },
      { id: 3, label: 'Long-Off', x: 155, y: 345, role: 'Straight lofted drive protection' },
      { id: 4, label: 'Deep Point', x: 85, y: 150, role: 'Square boundary fence rider' },
      { id: 5, label: 'Deep Square Leg', x: 315, y: 180, role: 'Pull shot boundary sweeper' },
      { id: 6, label: 'Cover (Ring)', x: 145, y: 220, role: 'Saving the single in circle' },
      { id: 7, label: 'Extra Cover (Ring)', x: 130, y: 250, role: 'Saving hard off-drive single' },
      { id: 8, label: 'Short Mid-Wicket (Ring)', x: 240, y: 225, role: 'Saving the push single' },
      { id: 9, label: 'Short Third (Ring)', x: 150, y: 130, role: 'Cutting the thick edge or late cut' }
    ]
  },
  {
    id: 'bengal-tigers',
    name: 'TB Bengal Tigers vs Mustangs',
    date: '2026-03-24',
    matchPhase: 'Death Over (Overs 19-20)',
    venue: 'Tampa Cricket Grounds',
    context: 'Defending 5 runs in the final over. Batter has high strike rate down the ground.',
    headlineStat: 'Defended 5 runs in final over',
    outcome: 'Won by 5 runs (Consecutive dot balls under yorker execution)',
    maxFieldersOutsideCircle: 5,
    essaySlug: 'five-runs-tb-bengal-tigers-vs-mustangs',
    tacticalNote: 'Wide yorker field: Bowler bowled full outside off-stump with deep cover and long-off back. Short fine leg placed for the ramp.',
    nafiSetup: [
      { id: 1, label: 'Deep Cover', x: 80, y: 230, role: 'Boundary boundary cover' },
      { id: 2, label: 'Long-Off', x: 140, y: 350, role: 'Boundary straight fence' },
      { id: 3, label: 'Long-On', x: 255, y: 345, role: 'Boundary straight fence' },
      { id: 4, label: 'Deep Mid-Wicket', x: 320, y: 250, role: 'Boundary leg fence' },
      { id: 5, label: 'Deep Backward Point', x: 95, y: 140, role: 'Square fence protection' },
      { id: 6, label: 'Point (Ring)', x: 140, y: 185, role: 'Saving single in circle' },
      { id: 7, label: 'Short Extra Cover (Ring)', x: 155, y: 240, role: 'Saving drive single' },
      { id: 8, label: 'Mid-Wicket (Ring)', x: 245, y: 220, role: 'Saving flick single' },
      { id: 9, label: 'Short Fine Leg (Ring)', x: 245, y: 130, role: 'Saving paddle sweep' }
    ]
  },
  {
    id: 'blazehawks',
    name: 'Blazehawks vs Go Leopards',
    date: '2026-03-28',
    matchPhase: 'Powerplay Bowling (Overs 1-6)',
    venue: 'Waverly Park, Tampa',
    context: 'Powerplay overs: Maximum 2 fielders allowed outside the 30-yard circle. Attacking with seam movement.',
    headlineStat: '4 Wickets & 44 (24) in the chase',
    outcome: 'Won by 4 wickets (Clean chase in 16.4 overs)',
    maxFieldersOutsideCircle: 2,
    essaySlug: 'four-wickets-and-a-chase-blazehawks-vs-go-leopards',
    tacticalNote: 'Aggressive Powerplay configuration: Two slips and a gully in place to capture outswing edges. Only deep fine leg and deep square leg on the rope.',
    nafiSetup: [
      { id: 1, label: 'First Slip', x: 180, y: 145, role: 'Close catching edge' },
      { id: 2, label: 'Second Slip', x: 165, y: 140, role: 'Close catching thick edge' },
      { id: 3, label: 'Gully', x: 145, y: 160, role: 'Catching sliced push' },
      { id: 4, label: 'Point', x: 130, y: 195, role: 'Circle stop backward point' },
      { id: 5, label: 'Cover', x: 140, y: 240, role: 'Circle stop classic cover drive' },
      { id: 6, label: 'Mid-Off', x: 170, y: 260, role: 'Circle stop on-the-drive' },
      { id: 7, label: 'Mid-On', x: 230, y: 260, role: 'Circle stop straight flick' },
      { id: 8, label: 'Deep Square Leg', x: 330, y: 200, role: 'Rope boundary protection' },
      { id: 9, label: 'Deep Fine Leg', x: 275, y: 105, role: 'Rope boundary protection' }
    ]
  }
];
