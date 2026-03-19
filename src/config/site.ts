export const siteConfig = {
  title: 'C M Nafi',
  description: 'A personal website tracing a global journey into fintech through writing, projects, and public work.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'journey', label: 'Journey', href: '/story' },
    { id: 'writing', label: 'Writing', href: '/writing' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'connect', label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/cmnafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cm-nafi/' },
    { label: 'Email', href: 'mailto:nafi@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'About', href: '/about' },
    { label: 'Brewing', href: '/brewing' },
    { label: 'Connect', href: '/connect' },
    { label: 'RSS', href: '/blog' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
