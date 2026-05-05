const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\nafic\\Desktop\\cmnafi.com\\website sources\\blog\\gamestop ebay';
const destDir = path.join(__dirname, 'src', 'content', 'field-notes');

// Files to copy
const files = [
  'chart1_revenue.png',
  'chart2_marketcaps.png',
  'chart3_dealstructure.png',
  'chart4_transformation.png'
];

files.forEach(file => {
  const src = path.join(srcDir, file);
  const dest = path.join(destDir, file);
  fs.copyFileSync(src, dest);
  console.log(`Copied ${file}`);
});

// Process the MD file to add proper frontmatter
const mdContent = fs.readFileSync(path.join(srcDir, 'gamestop-ebay-blog.md'), 'utf8');

const newFrontmatter = `---
title: "The Smaller Company: Inside GameStop's $55.5 Billion Bid for eBay"
description: "How a 41-year-old mall retailer with a $9 billion cash pile and a meme stock following decided to take over a 30-year-old auction house worth four times as much. Full histories of both companies, the May 2026 offer letter, and the math nobody can quite agree on."
publishedAt: 2026-05-05
category: Finance
subCategory: Public Equities
tags:
  - finance
  - retail
  - ecommerce
  - M&A
  - GameStop
  - eBay
readingTime: "15 min read"
excerpt: "How a 41-year-old mall retailer with a $9 billion cash pile decided to take over a 30-year-old auction house worth four times as much."
---`;

// Replace the original frontmatter (from the first --- to the second ---)
const bodyContent = mdContent.split('---').slice(2).join('---').trim();
const finalContent = `${newFrontmatter}\n\n${bodyContent}`;

fs.writeFileSync(path.join(destDir, 'gamestop-bid-for-ebay.mdx'), finalContent);
console.log('Processed and copied gamestop-bid-for-ebay.mdx');
