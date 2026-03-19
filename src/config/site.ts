export const siteConfig = {
  title: 'C M Nafi',
  description: 'A personal website organized as four interest worlds, a running timeline, and the work that connects them.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'journey', label: 'Journey', href: '/story' },
    { id: 'timeline', label: 'Timeline', href: '/blog' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'connect', label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/cmnafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cm-nafi/' },
    { label: 'Email', href: 'mailto:nafi@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'Journey', href: '/story' },
    { label: 'Timeline', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Connect', href: '/connect' },
    { label: 'Interests', href: '/interests' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
