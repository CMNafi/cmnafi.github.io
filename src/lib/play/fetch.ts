import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

export interface Snapshot<T> { data: T; updatedAt: string | null; stale: boolean; unavailable: boolean }
const memory = new Map<string, Promise<Snapshot<unknown>>>();
const cacheDir = path.join(process.cwd(), '.cache', 'play');

// Only imported by Astro frontmatter. No FPL requests reach the browser.
export function fetchSnapshot<T>(url: string, validate: (value: unknown) => value is T, fallback: T): Promise<Snapshot<T>> {
  const existing = memory.get(url);
  if (existing) return existing as Promise<Snapshot<T>>;
  const request = (async (): Promise<Snapshot<T>> => {
    const file = path.join(cacheDir, `${createHash('sha256').update(url).digest('hex')}.json`);
    try {
      const saved = JSON.parse(await readFile(file, 'utf8'));
      // Avoid repeated API traffic during local rebuilds. Scheduled builds are twelve hours apart.
      if (validate(saved.data) && typeof saved.updatedAt === 'string' && Date.now() - Date.parse(saved.updatedAt) >= 0 && Date.now() - Date.parse(saved.updatedAt) < 300_000) return { data: saved.data, updatedAt: saved.updatedAt, stale: false, unavailable: false };
    } catch { /* A first build has no recent snapshot. */ }
    try {
      const options = { signal: AbortSignal.timeout(10_000), headers: { 'User-Agent': 'cmnafi-play/1.0', Accept: 'application/json' } };
      let response = await fetch(url, options);
      if (response.status === 429 || response.status === 503) {
        const seconds = Number(response.headers.get('Retry-After'));
        await new Promise(resolve => setTimeout(resolve, Math.min(2000, seconds > 0 ? seconds * 1000 : 1200)));
        response = await fetch(url, { ...options, signal: AbortSignal.timeout(10_000) });
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data: unknown = await response.json();
      if (!validate(data)) throw new Error('Unexpected API response');
      const snapshot = { data, updatedAt: new Date().toISOString(), stale: false, unavailable: false };
      try { await mkdir(cacheDir, { recursive: true }); await writeFile(file, JSON.stringify(snapshot)); } catch { /* Cache is optional. */ }
      return snapshot;
    } catch {
      try {
        const saved = JSON.parse(await readFile(file, 'utf8'));
        if (validate(saved.data) && typeof saved.updatedAt === 'string' && Number.isFinite(Date.parse(saved.updatedAt))) return { data: saved.data, updatedAt: saved.updatedAt, stale: true, unavailable: false };
      } catch { /* A first build can have no cached data. */ }
      return { data: fallback, updatedAt: null, stale: true, unavailable: true };
    }
  })();
  memory.set(url, request as Promise<Snapshot<unknown>>);
  return request;
}

export function isRecord(value: unknown): value is Record<string, any> {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
export function isRows(value: unknown): value is Record<string, any>[] {
  return Array.isArray(value) && value.every(isRecord);
}
export const formatNumber = (value: number | null | undefined) => typeof value === 'number' ? value.toLocaleString('en-US') : 'Not available';
export const formatTime = (value: string | null) => value ? new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/New_York' }).format(new Date(value)) + ' ET' : 'No successful update yet';
