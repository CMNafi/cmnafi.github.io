const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\nafic\\Downloads\\streetcar_temp';
const destDir = path.join(__dirname, 'src', 'content', 'field-notes');

// Files to copy
const files = [
  'chart1_crossover.png',
  'chart2_ridership.png',
  'chart3_international.png',
  'chart4_revival.png'
];

files.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file}`);
});

// Process the MD file to add proper frontmatter
const mdContent = fs.readFileSync(path.join(srcDir, 'streetcar-blog.md'), 'utf8');

const newFrontmatter = `---
title: "Last Stop: How America Tore Up 50,000 Miles of Streetcar Track for $5,001"
description: "The rise, fall, and afterlife of the American streetcar — from Frank Sprague's 1888 demo in Richmond to a $5,000 fine that helped reshape a continent. With a side-by-side look at why Zurich, Munich and Melbourne kept their tracks while we paved over ours."
publishedAt: 2026-05-05
category: Infrastructure
subCategory: Transportation
tags:
  - history
  - transit
  - infrastructure
  - antitrust
  - urbanism
readingTime: "12 min read"
excerpt: "The rise, fall, and afterlife of the American streetcar — from Frank Sprague's 1888 demo in Richmond to a $5,000 fine that helped reshape a continent."
---`;

// Replace the original frontmatter (from the first --- to the second ---)
const bodyContent = mdContent.split('---').slice(2).join('---').trim();
const finalContent = `${newFrontmatter}\n\n${bodyContent}`;

fs.writeFileSync(path.join(destDir, 'the-streetcar-conspiracy.mdx'), finalContent);
console.log('Processed and copied the-streetcar-conspiracy.mdx');
