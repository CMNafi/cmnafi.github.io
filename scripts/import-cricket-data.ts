import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

type SourceStatus = 'verified' | 'imported' | 'provisional' | 'manually added';

interface ImportContext {
  playerId: string;
  outDir: string;
  checkedAt: string;
}

interface RegistryEntry {
  id: string;
  name: string;
  sourceUrl: string;
  sourceType: string;
  lastChecked: string;
  parserStatus: 'ready' | 'planned' | 'manual';
  notes: string;
}

const repoRoot = path.resolve(new URL('.', import.meta.url).pathname, '..');
const cricketDataDir = path.join(repoRoot, 'src', 'data', 'cricket');

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, 'utf8');
  return JSON.parse(raw) as T;
}

async function writeJson(filePath: string, value: unknown) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

function getPlayerProfileUrl(playerId: string) {
  return `https://cricclubs.com/TCL/viewPlayer.do?playerId=${playerId}&clubId=1091`;
}

async function fetchHtml(url: string) {
  const response = await fetch(url, {
    headers: {
      'user-agent': 'cmnafi-cricket-archive-importer/1.0'
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

function parseProfileHtml(html: string) {
  const text = html.replace(/\s+/g, ' ').trim();
  const includesPlayer = text.includes('Nafi C M');

  return {
    profileDetected: includesPlayer,
    extractedAt: new Date().toISOString(),
    notes: includesPlayer
      ? 'Basic player marker found in raw HTML. Extend parser to capture richer fields and linked scorecards.'
      : 'Profile marker not found. Layout may have changed; inspect raw source.'
  };
}

async function updateSourcesRegistry(ctx: ImportContext) {
  const sourcesFile = path.join(cricketDataDir, 'sources.json');
  const registry = await readJson<RegistryEntry[]>(sourcesFile);

  const updated = registry.map((entry) =>
    entry.id === 'cricclubs-player-profile'
      ? {
          ...entry,
          sourceUrl: getPlayerProfileUrl(ctx.playerId),
          lastChecked: ctx.checkedAt,
          parserStatus: 'ready' as const,
          notes: 'Importer fetched the live player profile URL successfully. Extend parsing coverage for scorecards and records.'
        }
      : entry
  );

  await writeJson(sourcesFile, updated);
}

async function writeRawSnapshot(ctx: ImportContext, html: string) {
  const rawDir = path.join(ctx.outDir, 'raw');
  await mkdir(rawDir, { recursive: true });
  const outputFile = path.join(rawDir, `player-${ctx.playerId}-${ctx.checkedAt}.html`);
  await writeFile(outputFile, html, 'utf8');
  return outputFile;
}

async function main() {
  const playerId = process.argv[2] ?? '4593171';
  const checkedAt = new Date().toISOString().slice(0, 10);
  const outDir = path.join(repoRoot, '.cache', 'cricket-import');
  const ctx: ImportContext = { playerId, outDir, checkedAt };

  const profileUrl = getPlayerProfileUrl(playerId);
  const html = await fetchHtml(profileUrl);
  const rawFile = await writeRawSnapshot(ctx, html);
  const profileProbe = parseProfileHtml(html);

  await updateSourcesRegistry(ctx);

  console.log(
    JSON.stringify(
      {
        playerId,
        profileUrl,
        rawFile,
        profileProbe,
        nextSteps: [
          'Parse linked league and scorecard pages into normalized JSON datasets.',
          'Merge imported records using sourceStatus and confidence rules.',
          'Preserve manual notes and provisional placeholders when partial imports occur.'
        ]
      },
      null,
      2
    )
  );
}

main().catch((error) => {
  console.error('[import-cricket-data] failed');
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
