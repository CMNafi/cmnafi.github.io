export const siteConfig = {
  title: 'C M Nafi',
  description: 'A personal website about the places that shaped me, the books I keep nearby, and the cricket matches I still replay.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'pit-wall', label: 'Pit Wall', href: '/' },
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
    { label: 'Garage', href: '/garage' },
    { label: 'Field Notes', href: '/field-notes' },
    { label: 'Story', href: '/story' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
