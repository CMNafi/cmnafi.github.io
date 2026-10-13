import https from 'node:https';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (QA Audit Bot)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- AUDITING TECH STACK: https://www.cmnafi.com/ ---');
  const home = await fetchUrl('https://www.cmnafi.com/');
  console.log('Status:', home.status);
  console.log('Headers:', JSON.stringify(home.headers, null, 2));

  // Meta tags
  const generatorMatch = home.body.match(/<meta[^>]*name=["']generator["'][^>]*content=["']([^"']*)["']/i);
  console.log('Generator:', generatorMatch ? generatorMatch[1] : 'Not specified in meta');

  // Astro markers
  const astroMatches = home.body.match(/data-astro-[a-z0-9_-]+/gi) || [];
  console.log('Astro attributes count:', astroMatches.length);

  const scripts = [...home.body.matchAll(/<script[^>]*src=["']([^"']*)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Scripts:', scripts);

  const styles = [...home.body.matchAll(/<link[^>]*href=["']([^"']*\.css[^"']*)["'][^>]*>/gi)].map(m => m[1]);
  console.log('Stylesheets:', styles);

  const fonts = [...home.body.matchAll(/fonts\.(googleapis|gstatic)\.com[^\s"']*/gi)].map(m => m[0]);
  console.log('Fonts:', [...new Set(fonts)]);

  // Robots
  const robots = await fetchUrl('https://cmnafi.com/robots.txt');
  console.log('Robots.txt status:', robots.status);
  console.log('Robots.txt content:\n', robots.body.trim());

  // Sitemap
  const sitemapIndex = await fetchUrl('https://www.cmnafi.com/sitemap-index.xml');
  console.log('Sitemap Index status:', sitemapIndex.status);
  console.log('Sitemap Index content:\n', sitemapIndex.body.trim());
}

run().catch(console.error);
