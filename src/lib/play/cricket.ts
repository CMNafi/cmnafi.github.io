import rawTeams from '@/data/my-teams.json';
export interface CricketFixture { id: string; opponent: string; startsAt: string; competition: string; winner: string | null }
export interface MyTeam { id: string; name: string; place: string; league: string; note: string; latestResult: { date: string; text: string } | null; fixtures: CricketFixture[] }
export const myTeams = rawTeams as MyTeam[];
export const myFixtures = myTeams.flatMap(team => team.fixtures.map(fixture => ({ ...fixture, home: team.name }))).sort((a, b) => a.startsAt.localeCompare(b.startsAt));
export const nextFixture = (team: MyTeam) => team.fixtures.find(f => new Date(f.startsAt).getTime() > Date.now());
export function fixtureTime(value: string) { return new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }).format(new Date(value)) + ' ET'; }
