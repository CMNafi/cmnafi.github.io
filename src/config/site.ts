export const siteConfig = {
  title: 'C M Nafi',
  description: 'Technology history, engineering, finance, and essays on the people and systems shaping our world.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'pit-wall', label: 'Pit Wall', href: '/' },
    { id: 'history', label: 'Technology History', href: '/technology-history' },
    { id: 'garage', label: 'Garage', href: '/garage' },
    { id: 'field-notes', label: 'Field Notes', href: '/field-notes' },
    { id: 'story', label: 'Story', href: '/story' },
    { id: 'connect', label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/CMNafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cm-nafi/' },
    { label: 'Email', href: 'mailto:nafi@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'Pit Wall', href: '/' },
    { label: 'Technology History', href: '/technology-history' },
    { label: 'Garage', href: '/garage' },
    { label: 'Field Notes', href: '/field-notes' },
    { label: 'Story', href: '/story' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
