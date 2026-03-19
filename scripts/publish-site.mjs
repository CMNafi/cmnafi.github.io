import { cp, mkdir, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');

const publishedEntries = [
  '404.html',
  '_astro',
  'about',
  'adventures',
  'apps',
  'blog',
  'connect',
  'index.html',
  'notes',
  'now',
  'og-default.svg',
  'projects',
  'writing',
  '.nojekyll',
  'CNAME'
];

const ensureDistExists = async () => {
  try {
    const distStats = await stat(distDir);
    if (!distStats.isDirectory()) {
      throw new Error(`Expected ${distDir} to be a directory.`);
    }
  } catch (error) {
    throw new Error('Build output was not found. Run `npm run build` before publishing.', {
      cause: error
    });
  }
};

const cleanPublishedEntries = async () => {
  await Promise.all(
    publishedEntries.map((entry) =>
      rm(path.join(repoRoot, entry), {
        force: true,
        recursive: true
      })
    )
  );
};

const copyDistToRoot = async () => {
  const entries = await readdir(distDir, { withFileTypes: true });

  await Promise.all(
    entries.map((entry) =>
      cp(path.join(distDir, entry.name), path.join(repoRoot, entry.name), {
        recursive: entry.isDirectory(),
        force: true
      })
    )
  );
};

await ensureDistExists();
await mkdir(repoRoot, { recursive: true });
await cleanPublishedEntries();
await copyDistToRoot();

console.log('Published dist/ into the repository root for GitHub Pages.');
