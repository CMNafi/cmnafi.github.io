const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'data', 'wc-matches.json');
const matches = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const slots = [
  '13:00:00', // 1:00 PM EDT
  '16:00:00', // 4:00 PM EDT
  '19:00:00', // 7:00 PM EDT
  '22:00:00'  // 10:00 PM EDT
];

let currentDate = new Date('2026-06-11T00:00:00-04:00'); 
let slotIndex = 0;

matches.forEach((m, i) => {
  // If it's the final (last match), make it at 3:00 PM EDT on July 19
  if (m.round === 'Final') {
    m.date = new Date('2026-07-19T15:00:00-04:00').toISOString();
    return;
  }

  // Format YYYY-MM-DD
  const yyyy = currentDate.getFullYear();
  const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
  const dd = String(currentDate.getDate()).padStart(2, '0');
  const dateString = `${yyyy}-${mm}-${dd}`;
  
  const slot = slots[slotIndex];
  const d = new Date(`${dateString}T${slot}-04:00`);
  m.date = d.toISOString();
  
  slotIndex++;
  if (slotIndex >= 4) {
    slotIndex = 0;
    // Add 1 day
    currentDate = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
  }
});

fs.writeFileSync(filePath, JSON.stringify(matches, null, 2));
console.log('Match times updated to realistic EDT slots.');
