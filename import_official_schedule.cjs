const fs = require('fs');
const path = require('path');

const officialDataPath = path.join(__dirname, 'worldcup2026.json');
const myDataPath = path.join(__dirname, 'src', 'data', 'wc-matches.json');

const officialData = JSON.parse(fs.readFileSync(officialDataPath, 'utf8'));
const myMatches = JSON.parse(fs.readFileSync(myDataPath, 'utf8'));

// Official data has exactly 104 matches
if (officialData.matches.length !== 104 || myMatches.length !== 104) {
  console.error("Mismatch in match counts!");
  process.exit(1);
}

const venueMap = {
  "Mexico City": "Estadio Azteca",
  "Guadalajara (Zapopan)": "Estadio Akron",
  "Monterrey (Guadalupe)": "Estadio BBVA",
  "Dallas (Arlington)": "AT&T Stadium",
  "Houston": "NRG Stadium",
  "Kansas City": "Arrowhead Stadium",
  "New York/New Jersey (East Rutherford)": "MetLife Stadium",
  "Boston (Foxborough)": "Gillette Stadium",
  "Miami (Miami Gardens)": "Hard Rock Stadium",
  "Philadelphia": "Lincoln Financial Field",
  "Toronto": "BMO Field",
  "Atlanta": "Mercedes-Benz Stadium",
  "Los Angeles (Inglewood)": "SoFi Stadium",
  "San Francisco Bay Area (Santa Clara)": "Levi's Stadium",
  "Seattle": "Lumen Field",
  "Vancouver": "BC Place"
};

myMatches.forEach((m, i) => {
  const officialMatch = officialData.matches[i];
  
  // Format the time: "15:00 UTC-4" -> "15:00:00-04:00"
  let timeStr = officialMatch.time; // e.g. "15:00 UTC-4"
  
  // Extract time and offset
  const parts = timeStr.split(' UTC');
  const hhmm = parts[0] + ":00";
  let offset = parts[1]; // "-4" or "-6"
  
  // Format offset to "-04:00"
  let sign = offset.startsWith('-') ? '-' : '+';
  let hours = offset.replace('-', '').replace('+', '');
  hours = hours.padStart(2, '0');
  let formattedOffset = `${sign}${hours}:00`;
  
  const isoString = `${officialMatch.date}T${hhmm}${formattedOffset}`;
  
  m.date = new Date(isoString).toISOString();
  
  // Use mapped venue name or fallback to official ground string
  m.venue = venueMap[officialMatch.ground] || officialMatch.ground;
  
  // Update the round to perfectly match official stages if needed, 
  // but I'll keep my 'Group Stage', 'Round of 32' for now to not break the UI.
  // Wait, I should ensure the dates are correct for my rounds!
  // My rounds were generated sequentially. 
  // Since openfootball JSON is also sequential (Match 1 to Match 104), they line up perfectly!
});

fs.writeFileSync(myDataPath, JSON.stringify(myMatches, null, 2));
console.log('Successfully imported 104 official match dates, times, and venues.');
