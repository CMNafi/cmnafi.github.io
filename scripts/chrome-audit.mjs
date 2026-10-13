import { spawn } from 'node:child_process';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const TEMP_PROFILE = path.join(os.tmpdir(), 'chrome_qa_' + Date.now());

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function httpGetJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function httpPutJson(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'PUT' }, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function runChromeAudit() {
  console.log('--- STARTING HEADLESS CHROME INSTANCE ---');
  fs.mkdirSync(TEMP_PROFILE, { recursive: true });

  const chromeProc = spawn(CHROME_PATH, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--remote-allow-origins=*',
    `--user-data-dir=${TEMP_PROFILE}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ], { stdio: 'ignore' });

  // Wait for port 9222 to become available
  let versionData = null;
  for (let attempt = 0; attempt < 20; attempt++) {
    await sleep(500);
    try {
      versionData = await httpGetJson('http://127.0.0.1:9222/json/version');
      if (versionData) break;
    } catch (e) {}
  }

  if (!versionData) {
    console.error('Failed to connect to Chrome on port 9222.');
    chromeProc.kill();
    return;
  }

  console.log('Connected to Chrome:', versionData.Browser);

  const targets = [
    'https://www.cmnafi.com/',
    'https://www.cmnafi.com/field-notes/',
    'https://www.cmnafi.com/field-notes/openai-cap-table/',
    'https://www.cmnafi.com/field-notes/blackstone-vs-blackrock/',
    'https://www.cmnafi.com/field-notes/the-streetcar-conspiracy/',
    'https://www.cmnafi.com/garage/',
    'https://www.cmnafi.com/garage/adv-screener/',
    'https://www.cmnafi.com/garage/manager-search/',
    'https://www.cmnafi.com/garage/worldview/',
    'https://www.cmnafi.com/caia/',
    'https://www.cmnafi.com/caia/level-1/',
    'https://www.cmnafi.com/caia/formulas/',
    'https://www.cmnafi.com/world-cup-2026/',
    'https://www.cmnafi.com/world-cup-2026/matches/',
    'https://www.cmnafi.com/story/',
    'https://www.cmnafi.com/connect/',
    'https://www.cmnafi.com/brewing/'
  ];

  const auditResults = [];

  for (const pageUrl of targets) {
    console.log(`\nAuditing in Chrome (375px mobile): ${pageUrl}`);
    const tabInfo = await httpPutJson('http://127.0.0.1:9222/json/new?' + encodeURIComponent(pageUrl));
    const wsUrl = tabInfo.webSocketDebuggerUrl;

    const pageResult = await auditPageWs(wsUrl, pageUrl);
    auditResults.push(pageResult);

    // Close tab
    try {
      await httpGetJson(`http://127.0.0.1:9222/json/close/${tabInfo.id}`);
    } catch (e) {}
  }

  chromeProc.kill();
  try { fs.rmSync(TEMP_PROFILE, { recursive: true, force: true }); } catch (e) {}

  fs.writeFileSync('scripts/chrome-audit-results.json', JSON.stringify(auditResults, null, 2));
  console.log('\n--- CHROME AUDIT COMPLETE. Results saved to scripts/chrome-audit-results.json ---');
}

function auditPageWs(wsUrl, pageUrl) {
  return new Promise((resolve) => {
    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const pending = new Map();

    function send(method, params = {}) {
      const id = msgId++;
      return new Promise((res) => {
        pending.set(id, res);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const consoleMessages = [];
    const failedRequests = [];
    let loadTimeMs = 0;
    const startNav = Date.now();

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.id && pending.has(data.id)) {
        const cb = pending.get(data.id);
        pending.delete(data.id);
        cb(data.result);
      } else if (data.method) {
        if (data.method === 'Runtime.consoleAPICalled') {
          const type = data.params.type;
          const text = data.params.args.map(a => a.value || a.description || '').join(' ');
          if (type === 'error' || type === 'warning') {
            consoleMessages.push({ type, text });
          }
        } else if (data.method === 'Runtime.exceptionThrown') {
          const text = data.params.exceptionDetails.text + ': ' + (data.params.exceptionDetails.exception?.description || '');
          consoleMessages.push({ type: 'uncaught-exception', text });
        } else if (data.method === 'Log.entryAdded') {
          if (data.params.entry.level === 'error') {
            consoleMessages.push({ type: 'log-error', text: data.params.entry.text });
          }
        } else if (data.method === 'Network.loadingFailed') {
          failedRequests.push({
            url: data.params.requestId,
            errorText: data.params.errorText,
            type: data.params.type
          });
        }
      }
    };

    ws.onopen = async () => {
      try {
        await send('Page.enable');
        await send('Runtime.enable');
        await send('Log.enable');
        await send('Network.enable');

        // Set mobile viewport 375px
        await send('Emulation.setDeviceMetricsOverride', {
          width: 375,
          height: 812,
          deviceScaleFactor: 2,
          mobile: true
        });

        await send('Page.navigate', { url: pageUrl });

        // Wait for page to settle (up to 4.5 seconds)
        await sleep(4000);
        loadTimeMs = Date.now() - startNav;

        // Evaluate layout overflow at 375px
        const evalResult = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const docWidth = document.documentElement.scrollWidth;
              const winWidth = window.innerWidth;
              const hasOverflow = docWidth > winWidth + 1;
              const overflowingElements = [];

              if (hasOverflow) {
                document.querySelectorAll('*').forEach(el => {
                  const rect = el.getBoundingClientRect();
                  if (rect.right > winWidth + 2) {
                    const selector = el.id ? '#' + el.id : (el.className ? '.' + String(el.className).trim().split(/\\s+/).slice(0, 2).join('.') : el.tagName.toLowerCase());
                    overflowingElements.push({
                      tag: el.tagName,
                      selector,
                      right: Math.round(rect.right),
                      width: Math.round(rect.width)
                    });
                  }
                });
              }

              return {
                docWidth,
                winWidth,
                hasOverflow,
                overflowingElements: overflowingElements.slice(0, 8)
              };
            })()
          `,
          returnByValue: true
        });

        const layoutCheck = evalResult?.result?.value || { docWidth: 375, winWidth: 375, hasOverflow: false, overflowingElements: [] };

        ws.close();
        resolve({
          url: pageUrl,
          loadTimeMs,
          consoleMessages,
          failedRequests,
          layoutCheck
        });
      } catch (err) {
        ws.close();
        resolve({
          url: pageUrl,
          loadTimeMs: Date.now() - startNav,
          consoleMessages,
          failedRequests,
          layoutCheck: { error: err.message }
        });
      }
    };

    ws.onerror = (err) => {
      resolve({
        url: pageUrl,
        error: 'WebSocket error: ' + err.message
      });
    };
  });
}

runChromeAudit().catch(console.error);
