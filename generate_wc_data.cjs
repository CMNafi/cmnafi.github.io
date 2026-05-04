const fs = require('fs');
const path = require('path');

const TEAMS_DIR = path.join(__dirname, 'src', 'content', 'wc-teams');

if (!fs.existsSync(TEAMS_DIR)) {
  fs.mkdirSync(TEAMS_DIR, { recursive: true });
}

// Actual 48 teams that "qualified" as per our timeline
const teams = [
  { name: 'Mexico', code: 'MEX', group: 'A' },
  { name: 'South Africa', code: 'RSA', group: 'A' },
  { name: 'Jordan', code: 'JOR', group: 'A' },
  { name: 'Serbia', code: 'SRB', group: 'A' },

  { name: 'Canada', code: 'CAN', group: 'B' },
  { name: 'Bosnia and Herzegovina', code: 'BIH', group: 'B' },
  { name: 'Qatar', code: 'QAT', group: 'B' },
  { name: 'Switzerland', code: 'SUI', group: 'B' },

  { name: 'Argentina', code: 'ARG', group: 'C' },
  { name: 'Senegal', code: 'SEN', group: 'C' },
  { name: 'Japan', code: 'JPN', group: 'C' },
  { name: 'Sweden', code: 'SWE', group: 'C' },

  { name: 'USA', code: 'USA', group: 'D' },
  { name: 'Paraguay', code: 'PAR', group: 'D' },
  { name: 'Australia', code: 'AUS', group: 'D' },
  { name: 'Türkiye', code: 'TUR', group: 'D' },

  { name: 'France', code: 'FRA', group: 'E' },
  { name: 'Ecuador', code: 'ECU', group: 'E' },
  { name: 'Saudi Arabia', code: 'KSA', group: 'E' },
  { name: 'Côte d\'Ivoire', code: 'CIV', group: 'E' },

  { name: 'England', code: 'ENG', group: 'F' },
  { name: 'Morocco', code: 'MAR', group: 'F' },
  { name: 'Panama', code: 'PAN', group: 'F' },
  { name: 'Uzbekistan', code: 'UZB', group: 'F' },

  { name: 'Brazil', code: 'BRA', group: 'G' },
  { name: 'Egypt', code: 'EGY', group: 'G' },
  { name: 'Korea Republic', code: 'KOR', group: 'G' },
  { name: 'Norway', code: 'NOR', group: 'G' },

  { name: 'Spain', code: 'ESP', group: 'H' },
  { name: 'Uruguay', code: 'URU', group: 'H' },
  { name: 'Algeria', code: 'ALG', group: 'H' },
  { name: 'Haiti', code: 'HAI', group: 'H' },

  { name: 'Portugal', code: 'POR', group: 'I' },
  { name: 'Colombia', code: 'COL', group: 'I' },
  { name: 'Ghana', code: 'GHA', group: 'I' },
  { name: 'IR Iran', code: 'IRN', group: 'I' },

  { name: 'Germany', code: 'GER', group: 'J' },
  { name: 'DR Congo', code: 'COD', group: 'J' },
  { name: 'New Zealand', code: 'NZL', group: 'J' },
  { name: 'Curaçao', code: 'CUW', group: 'J' },

  { name: 'Belgium', code: 'BEL', group: 'K' },
  { name: 'Chile', code: 'CHI', group: 'K' },
  { name: 'Tunisia', code: 'TUN', group: 'K' },
  { name: 'Iraq', code: 'IRQ', group: 'K' },

  { name: 'Netherlands', code: 'NED', group: 'L' },
  { name: 'Croatia', code: 'CRO', group: 'L' },
  { name: 'Mali', code: 'MLI', group: 'L' },
  { name: 'Costa Rica', code: 'CRC', group: 'L' }
];

// Generate markdown files for all 48 teams
teams.forEach(t => {
  const content = `---
name: "${t.name}"
code: "${t.code}"
group: "${t.group}"
status: "qualified"
---

Squad details and tactical preview for ${t.name} will be published soon.
`;
  fs.writeFileSync(path.join(TEAMS_DIR, `${t.code.toLowerCase()}.md`), content);
});

// Generate matches
const matches = [];
let matchId = 1;
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
const venues = ['Estadio Azteca', 'MetLife Stadium', 'SoFi Stadium', 'BMO Field', 'Mercedes-Benz Stadium', 'AT&T Stadium', 'Gillette Stadium', 'NRG Stadium', 'Arrowhead Stadium', 'Hard Rock Stadium', 'Lincoln Financial Field', "Levi's Stadium", 'Lumen Field', 'BC Place', 'Estadio Akron', 'Estadio BBVA'];

let currentDate = new Date('2026-06-11T12:00:00Z'); // Start date

// Group stage
for (const group of groups) {
  const groupTeams = teams.filter(t => t.group === group);
  
  // 6 matches per group
  const pairs = [
    [0, 1], [2, 3],
    [0, 2], [3, 1],
    [3, 0], [1, 2]
  ];

  pairs.forEach(pair => {
    matches.push({
      id: matchId++,
      round: 'Group Stage',
      group: group,
      homeTeam: groupTeams[pair[0]].name,
      homeCode: groupTeams[pair[0]].code,
      awayTeam: groupTeams[pair[1]].name,
      awayCode: groupTeams[pair[1]].code,
      date: currentDate.toISOString(),
      venue: venues[matchId % venues.length]
    });
    // Add 8 hours for next match
    currentDate = new Date(currentDate.getTime() + 8 * 60 * 60 * 1000);
  });
}

// Knockouts
const knockoutRounds = [
  { name: 'Round of 32', count: 16 },
  { name: 'Round of 16', count: 8 },
  { name: 'Quarter-finals', count: 4 },
  { name: 'Semi-finals', count: 2 },
  { name: 'Third Place', count: 1 },
  { name: 'Final', count: 1 }
];

knockoutRounds.forEach(round => {
  for (let i = 0; i < round.count; i++) {
    matches.push({
      id: matchId++,
      round: round.name,
      homeTeam: 'TBD',
      homeCode: 'TBD',
      awayTeam: 'TBD',
      awayCode: 'TBD',
      date: currentDate.toISOString(),
      venue: round.name === 'Final' ? 'MetLife Stadium' : venues[matchId % venues.length]
    });
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }
});

const DATA_DIR = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

fs.writeFileSync(path.join(DATA_DIR, 'wc-matches.json'), JSON.stringify(matches, null, 2));

console.log('Successfully generated 48 teams and 104 matches.');
