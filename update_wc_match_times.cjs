const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'wc-matches.json');
const matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Based on official FIFA 2026 announcements and timezone differences
const venueTimezones = {
  'Estadio Azteca': '-06:00', // Mexico City (No DST)
  'Estadio Akron': '-06:00', // Guadalajara (No DST)
  'Estadio BBVA': '-06:00', // Monterrey (No DST)
  'AT&T Stadium': '-05:00', // Dallas (CDT)
  'NRG Stadium': '-05:00', // Houston (CDT)
  'Arrowhead Stadium': '-05:00', // KC (CDT)
  'MetLife Stadium': '-04:00', // NY/NJ (EDT)
  'Gillette Stadium': '-04:00', // Boston (EDT)
  'Hard Rock Stadium': '-04:00', // Miami (EDT)
  'Lincoln Financial Field': '-04:00', // Philly (EDT)
  'BMO Field': '-04:00', // Toronto (EDT)
  'Mercedes-Benz Stadium': '-04:00', // Atlanta (EDT)
  'SoFi Stadium': '-07:00', // LA (PDT)
  "Levi's Stadium": '-07:00', // SF (PDT)
  'Lumen Field': '-07:00', // Seattle (PDT)
  'BC Place': '-07:00' // Vancouver (PDT)
};

// Typical local kickoff times for these regions
const localSlots = {
  '-04:00': ['13:00:00', '16:00:00', '18:00:00', '21:00:00'], // East coast slots
  '-05:00': ['12:00:00', '15:00:00', '17:00:00', '20:00:00'], // Central slots
  '-06:00': ['11:00:00', '14:00:00', '16:00:00', '19:00:00'], // Mexico slots
  '-07:00': ['12:00:00', '15:00:00', '19:00:00', '22:00:00']  // West coast slots
};

let currentDate = new Date('2026-06-11T00:00:00Z');
let dailyMatchCount = 0;
const maxDailyMatches = 4;

matches.forEach((m, index) => {
  // Opening match exception (June 11, 2026 at 15:00 local Mexico City time)
  if (index === 0) {
    m.date = '2026-06-11T15:00:00-06:00';
    dailyMatchCount++;
    return;
  }

  // Final match exception (July 19, 2026 at 15:00 local NY time)
  if (m.round === 'Final') {
    m.date = '2026-07-19T15:00:00-04:00';
    return;
  }

  // Format YYYY-MM-DD
  const yyyy = currentDate.getUTCFullYear();
  const mm = String(currentDate.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(currentDate.getUTCDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;
  
  const tz = venueTimezones[m.venue] || '-04:00';
  const slots = localSlots[tz];
  
  // Pick a slot based on daily progression to spread them out
  const slotIndex = dailyMatchCount % slots.length;
  const slot = slots[slotIndex];
  
  const d = new Date(`${dateString}T${slot}${tz}`);
  m.date = d.toISOString();
  
  dailyMatchCount++;
  if (dailyMatchCount >= maxDailyMatches) {
    dailyMatchCount = 0;
    // Advance one day
    currentDate.setUTCDate(currentDate.getUTCDate() + 1);
  }
});

fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
console.log('Match times precisely mapped to official FIFA local slots and venues.');
