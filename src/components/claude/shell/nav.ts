// Single source of truth for /claude navigation: header, footer and command menu all read this.

export interface ClaudeNavItem {
  label: string;
  href: string;
  /** Single-key shortcut (lowercase) that jumps here from anywhere on a /claude page. */
  key: string;
  /** One-line description shown in the command menu. */
  hint: string;
}

export const claudeNav: ClaudeNavItem[] = [
  { label: 'Home', href: '/claude/', key: 'h', hint: 'Front page, workbench and recent writing' },
  { label: 'Projects', href: '/claude/garage/', key: 'g', hint: 'Small tools I wanted and couldn’t find' },
  { label: 'Essays & Notes', href: '/claude/field-notes/', key: 'f', hint: 'Deep dives, book notes and match reports' },
  { label: 'Story', href: '/claude/story/', key: 's', hint: 'Dinajpur, Changshu, Iowa, Florida' },
  { label: 'Connect', href: '/claude/connect/', key: 'c', hint: 'Email and where to find me' },
];

function normalize(path: string): string {
  const clean = path.split(/[?#]/)[0] || '/';
  return clean.endsWith('/') ? clean : `${clean}/`;
}

/** Home is active only on an exact match; every other section owns its sub-paths. */
export function isActivePath(activePath: string | undefined, href: string): boolean {
  if (!activePath) return false;
  const current = normalize(activePath);
  if (href === '/claude/') return current === '/claude/';
  return current.startsWith(href);
}
