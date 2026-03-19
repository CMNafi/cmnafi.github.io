export const siteConfig = {
  title: 'C M Nafi',
  description:
    'A refined digital home base for writing, projects, experiments, and future-facing tools.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'hello@cmnafi.com',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Adventures', href: '/adventures' },
    { label: 'Now', href: '/now' },
    { label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/cmnafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com' },
    { label: 'Email', href: 'mailto:hello@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'About', href: '/about' },
    { label: 'Now', href: '/now' },
    { label: 'Connect', href: '/connect' },
    { label: 'RSS', href: '/blog' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
