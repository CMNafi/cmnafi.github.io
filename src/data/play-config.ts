// Friend entry IDs are placeholders until I add my mini-league.
export const playConfig = {
  fpl: { entryId: 5705488 as number | null, name: 'Nafi', friends: [{ name: 'Friend to add', entryId: null as number | null }] },
  timeZone: 'America/New_York',
  // Leave empty to discover active numeric series IDs from ESPN.
  cricketSeriesIds: [] as string[],
  refreshHours: [8, 20],
  f1PollMs: 30_000,
  cricketPollMs: 60_000
};

export const playLinks = [
  { href: '/play/fpl', number: '01', title: 'My FPL Season', short: 'FPL', description: 'See my Fantasy Premier League squad, captain, points, and season history. A weekly record of the football decisions I have to live with.' },
  { href: '/play/f1', number: '02', title: 'Race Center', short: 'Formula 1', description: 'Check the next Formula 1 race, the season calendar, and driver and constructor standings. This is where I follow the sport behind the Garage name.' },
  { href: '/play/cricket', number: '03', title: 'Cricket Hub', short: 'Cricket', description: 'Check international scores and explore my Florida club teams and match records. The on-field counterpart to the cricket stories in Field Notes.' },
  { href: '/play/predict', number: '04', title: 'Prediction Games', short: 'Predictions', description: 'Pick a race podium or match winner before the start, then revisit your call. Your predictions stay on this device.' },
  { href: '/play/rivals', number: '05', title: 'Rivalry Board', short: 'Rivals', description: 'Compare my FPL season with friends once their team IDs are added. For now, the friend entries are clearly marked placeholders.' }
];
