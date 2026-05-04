const fs = require('fs');
const path = require('path');

const src16 = 'C:\\Users\\nafic\\Desktop\\cmnafi.com\\website sources\\blog\\capital_lens_issue_016.html';
const src17 = 'C:\\Users\\nafic\\Desktop\\cmnafi.com\\website sources\\blog\\issue-017.html';

const dest16 = path.join(__dirname, 'src', 'pages', 'field-notes', 'capital-lens-16.html');
const dest17 = path.join(__dirname, 'src', 'pages', 'field-notes', 'capital-lens-17.html');

const backLinkHTML = `
  <div style="background-color: #0c0e13; padding: 15px 20px; font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.15em; border-bottom: 1px solid #1f2532; text-align: left; position: sticky; top: 0; z-index: 1000;">
    <a href="/field-notes" style="color: #6b7488; text-decoration: none; text-transform: uppercase; transition: color 0.2s ease;" onmouseover="this.style.color='#f4f6fb'" onmouseout="this.style.color='#6b7488'">← Secure Comms</a>
  </div>
`;

function processAndCopy(src, dest) {
  let content = fs.readFileSync(src, 'utf8');
  
  // Inject back link right after <body>
  if (content.includes('<body>')) {
    content = content.replace('<body>', `<body>\n${backLinkHTML}`);
  } else {
    // Fallback if no body tag
    content = `${backLinkHTML}\n${content}`;
  }
  
  fs.writeFileSync(dest, content);
  console.log(`Successfully processed and copied to ${dest}`);
}

processAndCopy(src16, dest16);
processAndCopy(src17, dest17);
