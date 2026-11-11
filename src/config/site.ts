export const siteConfig = {
  title: 'C M Nafi',
  description: "Still learning how things work. Notes on how money moves, books and cricket, and a few small tools, by C M Nafi, a solutions engineer in Land O' Lakes, Florida.",
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'story', label: 'Story', href: '/story' },
    { id: 'field-notes', label: 'Field Notes', href: '/field-notes' },
    { id: 'garage', label: 'Garage', href: '/garage' },
    { id: 'play', label: 'Play', href: '/play' },
    { id: 'connect', label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/CMNafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cm-nafi/' },
    { label: 'Email', href: 'mailto:nafi@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'Home', href: '/' },
    { label: 'Garage', href: '/garage' },
    { label: 'Play', href: '/play' },
    { label: 'Field Notes', href: '/field-notes' },
    { label: 'Story', href: '/story' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
