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
  { href: '/play/fpl', number: '01', title: 'My FPL Season', short: 'FPL', description: 'The squad, the captain, and the decisions I have to live with.' },
  { href: '/play/f1', number: '02', title: 'Race Center', short: 'Formula 1', description: 'The next lights out, the season so far, and the people chasing it.' },
  { href: '/play/cricket', number: '03', title: 'Cricket Hub', short: 'Cricket', description: 'Scores around the world. The teams closer to home.' },
  { href: '/play/predict', number: '04', title: 'Prediction Games', short: 'Predictions', description: 'Make a call before the start. See how well it ages.' },
  { href: '/play/rivals', number: '05', title: 'Rivalry Board', short: 'Rivals', description: 'A small FPL table for friends and a little perspective.' }
];
