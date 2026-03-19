export const siteConfig = {
  title: 'C M Nafi',
  description: 'From global foundations to financial intelligence — writing, products, adventures, and work in progress.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'home', label: 'Home', href: '/' },
    { id: 'brewing', label: 'Brewing', href: '/brewing' },
    { id: 'blog', label: 'Blog', href: '/blog' },
    { id: 'projects', label: 'Projects', href: '/projects' },
    { id: 'adventures', label: 'Adventures', href: '/adventures' },
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
