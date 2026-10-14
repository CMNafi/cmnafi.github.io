// Small formatting helpers for the /claude catalog pages (Agent 2).
// Dates are always formatted in UTC so a YYYY-MM-DD value never shifts a day.

type DateInput = string | Date;

function toDate(value: DateInput): Date {
  if (value instanceof Date) return value;
  // A bare YYYY-MM-DD string parses as UTC midnight, which is what we want.
  return new Date(value);
}

/** 'Oct 10, 2026' */
export function formatDate(value: DateInput): string {
  return toDate(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** 'Oct 2026' */
export function formatMonth(value: DateInput): string {
  return toDate(value).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

/** 'YYYY-MM-DD' (UTC) for <time datetime>. */
export function isoDay(value: DateInput): string {
  return toDate(value).toISOString().slice(0, 10);
}

/** '15 min read' -> 15. Returns 0 when no number is present. */
export function parseReadingMinutes(readingTime: string | undefined): number {
  const match = readingTime?.match(/(\d+)/);
  return match ? Number(match[1]) : 0;
}

/**
 * Splits a label into text and figure tokens so figures can be set in mono/tabular type.
 * '49,574 advisers · 6.75M holdings' -> [{figure:'49,574'}, {text:' advisers · '}, {figure:'6.75M'}, {text:' holdings'}]
 */
export function splitFigures(label: string): Array<{ text: string; isFigure: boolean }> {
  const parts: Array<{ text: string; isFigure: boolean }> = [];
  // A figure is a whole token: '49,574', '$32.8B', '~$90B', '6.75M', '56,000+'. Not the '1' in 'F1' or the '13' in '13F'.
  const re = /(?<![\w$.,~])~?\$?\d[\d,.]*(?:[KMBT](?![A-Za-z]))?\+?%?(?!\w)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(label))) {
    if (m.index > last) parts.push({ text: label.slice(last, m.index), isFigure: false });
    parts.push({ text: m[0], isFigure: true });
    last = m.index + m[0].length;
  }
  if (last < label.length) parts.push({ text: label.slice(last), isFigure: false });
  return parts;
}
