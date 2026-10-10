import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const port = Number(process.env.PORT || 4173);
const host = process.env.HOST || '127.0.0.1';
const types = {'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.png':'image/png'};
const server = http.createServer(async (request, response) => {
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405, {'Allow':'GET, HEAD'}); response.end(); return; }
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let filename = path.resolve(root, '.' + pathname);
    if (filename !== root && !filename.startsWith(root + path.sep)) { response.writeHead(403); response.end('Forbidden'); return; }
    const details = await stat(filename);
    if (details.isDirectory()) filename = path.join(filename, 'index.html');
    const bytes = await readFile(filename);
    response.writeHead(200, {'Content-Type':types[path.extname(filename)] || 'application/octet-stream','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});
    response.end(request.method==='HEAD' ? undefined : bytes);
  } catch {
    response.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'});
    response.end('Page not found. Visit /, /era/, or /bookmarks/.');
  }
});
server.on('error', error => { console.error(`Cannot start preview: ${error.message}`); process.exitCode = 1; });
server.listen(port, host, () => console.log(`C M Nafi mockups: http://${host}:${port}\nEra: http://${host}:${port}/era/\nBookmarks: http://${host}:${port}/bookmarks/`));
