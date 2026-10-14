// Date helpers for the shell-owned /claude pages. Always UTC, so a YYYY-MM-DD frontmatter
// date never shifts by a day in the reader's (or the build machine's) timezone.

const shortDate = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});

/** 'Oct 10, 2026' */
export function formatDate(date: Date): string {
  return shortDate.format(date);
}

/** 'YYYY-MM-DD' for <time datetime>. */
export function isoDay(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** '20 min read' -> '20 min' (keeps the source wording if it has no number). */
export function shortReadingTime(readingTime: string): string {
  const match = readingTime.match(/(\d+)\s*min/i);
  return match ? `${match[1]} min` : readingTime;
}
