import https from 'node:https';
import http from 'node:http';
import { URL } from 'node:url';

const BASE_URL = 'https://www.cmnafi.com';
const USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 QA-Audit-Bot';

// Helper to fetch with redirect tracking and timing
function requestUrl(targetUrl, method = 'GET', maxRedirects = 5) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const redirectChain = [];

    function makeRequest(currentUrl, redirectsLeft) {
      try {
        const parsed = new URL(currentUrl);
        const client = parsed.protocol === 'https:' ? https : http;

        const req = client.request(parsed, {
          method,
          headers: {
            'User-Agent': USER_AGENT,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
          },
          timeout: 8000
        }, (res) => {
          let body = '';
          const statusCode = res.statusCode || 0;

          if ([301, 302, 307, 308].includes(statusCode) && res.headers.location && redirectsLeft > 0) {
            const nextUrl = new URL(res.headers.location, currentUrl).toString();
            redirectChain.push({ from: currentUrl, to: nextUrl, status: statusCode });
            res.resume(); // discard body
            return makeRequest(nextUrl, redirectsLeft - 1);
          }

          res.on('data', chunk => {
            if (body.length < 500000) body += chunk; // cap body size
          });

          res.on('end', () => {
            const elapsed = Date.now() - startTime;
            resolve({
              url: targetUrl,
              finalUrl: currentUrl,
              status: statusCode,
              headers: res.headers,
              elapsed,
              redirectChain,
              body,
              error: null
            });
          });
        });

        req.on('timeout', () => {
          req.destroy();
          resolve({
            url: targetUrl,
            finalUrl: currentUrl,
            status: 0,
            headers: {},
            elapsed: Date.now() - startTime,
            redirectChain,
            body: '',
            error: 'Request timeout (>8s)'
          });
        });

        req.on('error', (err) => {
          resolve({
            url: targetUrl,
            finalUrl: currentUrl,
            status: 0,
            headers: {},
            elapsed: Date.now() - startTime,
            redirectChain,
            body: '',
            error: err.message
          });
        });

        req.end();
      } catch (err) {
        resolve({
          url: targetUrl,
          finalUrl: currentUrl,
          status: 0,
          headers: {},
          elapsed: Date.now() - startTime,
          redirectChain,
          body: '',
          error: err.message
        });
      }
    }

    makeRequest(targetUrl, maxRedirects);
  });
}

async function runAudit() {
  console.log('--- STEP 1: PARSING SITEMAP ---');
  const sitemapRes = await requestUrl('https://www.cmnafi.com/sitemap-0.xml');
  const sitemapUrls = [];
  const locMatches = [...sitemapRes.body.matchAll(/<loc>([^<]+)<\/loc>/gi)];
  for (const m of locMatches) {
    sitemapUrls.push(m[1].trim());
  }
  console.log(`Found ${sitemapUrls.length} URLs in sitemap-0.xml.`);

  console.log('\n--- STEP 2: CRAWLING PAGES & AUDITING ASSETS ---');
  const pagesToVisit = new Set(sitemapUrls);
  pagesToVisit.add('https://www.cmnafi.com/');
  pagesToVisit.add('https://www.cmnafi.com/admin/');

  const visitedPages = new Set();
  const pageResults = [];
  const discoveredInternalLinks = new Set();
  const linkedFrom = new Map(); // target -> [source1, source2]
  const allImages = new Map(); // imgUrl -> { pages: [], alt: '' }
  const allExternalLinks = new Map(); // extUrl -> [pages]

  const queue = Array.from(pagesToVisit);

  // Process in batches
  const BATCH_SIZE = 6;
  for (let i = 0; i < queue.length; i += BATCH_SIZE) {
    const batch = queue.slice(i, i + BATCH_SIZE);
    console.log(`Crawling pages ${i + 1} to ${Math.min(i + BATCH_SIZE, queue.length)} of ${queue.length}...`);

    const results = await Promise.all(batch.map(url => requestUrl(url)));

    for (const res of results) {
      visitedPages.add(res.url);
      pageResults.push(res);

      if (res.status === 200 && res.body) {
        // Extract links
        const aMatches = [...res.body.matchAll(/<a[^>]*href=["']([^"']*)["'][^>]*>/gi)];
        for (const m of aMatches) {
          const rawHref = m[1].trim();
          if (!rawHref || rawHref.startsWith('#') || rawHref.startsWith('mailto:') || rawHref.startsWith('javascript:')) continue;

          try {
            const resolved = new URL(rawHref, res.url);
            if (resolved.hostname === 'www.cmnafi.com' || resolved.hostname === 'cmnafi.com') {
              const cleanUrl = resolved.origin + resolved.pathname;
              discoveredInternalLinks.add(cleanUrl);
              if (!linkedFrom.has(cleanUrl)) linkedFrom.set(cleanUrl, []);
              linkedFrom.get(cleanUrl).push(res.url);

              if (!visitedPages.has(cleanUrl) && !queue.includes(cleanUrl)) {
                queue.push(cleanUrl);
              }
            } else if (resolved.protocol.startsWith('http')) {
              if (!allExternalLinks.has(resolved.href)) allExternalLinks.set(resolved.href, []);
              allExternalLinks.get(resolved.href).push(res.url);
            }
          } catch (e) {}
        }

        // Extract images
        const imgMatches = [...res.body.matchAll(/<img([^>]*)>/gi)];
        for (const m of imgMatches) {
          const imgAttrs = m[1];
          const srcMatch = imgAttrs.match(/src=["']([^"']*)["']/i);
          const altMatch = imgAttrs.match(/alt=["']([^"']*)["']/i);

          if (srcMatch) {
            const src = srcMatch[1].trim();
            if (src && !src.startsWith('data:')) {
              try {
                const resolvedImg = new URL(src, res.url).toString();
                const altText = altMatch ? altMatch[1].trim() : null;
                if (!allImages.has(resolvedImg)) {
                  allImages.set(resolvedImg, { pages: [], altMissingPages: [] });
                }
                const entry = allImages.get(resolvedImg);
                entry.pages.push(res.url);
                if (altText === null || altText === '') {
                  entry.altMissingPages.push(res.url);
                }
              } catch (e) {}
            }
          }
        }
      }
    }
  }

  console.log(`\nCrawl complete. Checked ${pageResults.length} pages total.`);
  console.log(`Total unique images discovered: ${allImages.size}`);
  console.log(`Total unique external links discovered: ${allExternalLinks.size}`);

  console.log('\n--- STEP 3: TESTING IMAGE ASSETS ---');
  const imageResults = [];
  const imgList = Array.from(allImages.keys());
  for (let i = 0; i < imgList.length; i += 10) {
    const batch = imgList.slice(i, i + 10);
    const resList = await Promise.all(batch.map(imgUrl => requestUrl(imgUrl, 'GET')));
    for (const r of resList) {
      const meta = allImages.get(r.url);
      imageResults.push({
        url: r.url,
        status: r.status,
        error: r.error,
        pages: meta.pages,
        altMissingPages: meta.altMissingPages
      });
    }
  }

  console.log('\n--- STEP 4: TESTING EXTERNAL LINKS ---');
  const extResults = [];
  const extList = Array.from(allExternalLinks.keys()).slice(0, 50); // check first 50 external links
  for (let i = 0; i < extList.length; i += 8) {
    const batch = extList.slice(i, i + 8);
    const resList = await Promise.all(batch.map(extUrl => requestUrl(extUrl, 'GET')));
    for (const r of resList) {
      extResults.push({
        url: r.url,
        status: r.status,
        error: r.error,
        pages: allExternalLinks.get(r.url)
      });
    }
  }

  // Save audit data for analysis
  const auditData = {
    pageResults: pageResults.map(p => ({
      url: p.url,
      finalUrl: p.finalUrl,
      status: p.status,
      elapsed: p.elapsed,
      redirectChain: p.redirectChain,
      error: p.error
    })),
    sitemapUrls,
    discoveredInternalLinks: Array.from(discoveredInternalLinks),
    imageResults,
    extResults
  };

  import('node:fs').then(fs => {
    fs.writeFileSync('scripts/audit-raw-data.json', JSON.stringify(auditData, null, 2));
    console.log('\nSaved audit raw data to scripts/audit-raw-data.json.');
  });
}

runAudit().catch(console.error);
