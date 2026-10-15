/** Small formatting helpers shared by the /claude islands (server render and client scripts). */

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-03-30' -> 'Mar 30, 2026' (no timezone drift: parsed by hand) */
export function formatIsoDate(iso: string): string {
  const [y, m, d] = iso.split('-').map((part) => Number(part));
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** 4282224366957 -> '$4.28T', 145730683863 -> '$145.7B', 495635000 -> '$495.6M' */
export function formatUsdShort(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1e12) return `$${(value / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(value / 1e9).toFixed(abs >= 1e11 ? 1 : 2)}B`;
  if (abs >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
  if (abs >= 1e3) return `$${(value / 1e3).toFixed(0)}K`;
  return `$${value.toFixed(0)}`;
}

/** Full dollar figure with thousands separators */
export function formatUsdFull(value: number): string {
  return `$${Math.round(value).toLocaleString('en-US')}`;
}

export function formatInt(value: number): string {
  return Math.round(value).toLocaleString('en-US');
}

/** Percent with sensible precision: 0.4 -> '0.4%', 42 -> '42%', 99.97 -> '99.97%' */
export function formatPct(value: number, digits?: number): string {
  if (digits !== undefined) return `${value.toFixed(digits)}%`;
  if (value === 0 || value === 100) return `${value}%`;
  if (value > 0 && value < 0.1) return '<0.1%';
  if (value > 99.5 && value < 100) return `${value.toFixed(2)}%`;
  if (value < 1) return `${value.toFixed(1)}%`;
  return `${Math.round(value)}%`;
}

/** Ratio like '29.4×' */
export function formatMultiple(value: number): string {
  if (!Number.isFinite(value)) return '—';
  if (value >= 100) return `${Math.round(value).toLocaleString('en-US')}×`;
  if (value >= 10) return `${value.toFixed(1)}×`;
  return `${value.toFixed(2)}×`;
}
