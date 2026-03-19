export const siteConfig = {
  title: 'C M Nafi',
  description: 'From global foundations to financial intelligence — writing, products, adventures, and work in progress.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { label: 'Home', href: '/' },
    { label: 'Brewing', href: '/brewing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Projects', href: '/projects' },
    { label: 'Adventures', href: '/adventures' },
    { label: 'Connect', href: '/connect' }
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
