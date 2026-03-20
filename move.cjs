const fs = require('fs');
const path = require('path');
const base = 'c:/Users/nafic/Desktop/cmnafi.com/cmnafi.github.io/src/pages';
const moves = [
  ['adventures', 'story/adventures'],
  ['apps.astro', 'projects/apps.astro'],
  ['apps', 'projects/apps'],
  ['brewing.astro', 'projects/brewing.astro'],
  ['notes.astro', 'story/notes.astro'],
  ['now.astro', 'story/now.astro'],
  ['walking-through-life.astro', 'story/walking-through-life.astro']
];
moves.forEach(([src, dest]) => {
  try {
    fs.renameSync(path.join(base, src), path.join(base, dest));
    console.log(`Moved ${src} to ${dest}`);
  } catch (e) {
    console.log(`Failed ${src}: ${e.message}`);
  }
});
