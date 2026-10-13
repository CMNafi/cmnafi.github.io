export const siteConfig = {
  title: 'C M Nafi',
  description: "Solutions engineer living in Land O' Lakes, Florida. I left home at twelve and have been learning new rooms ever since. Field notes on how capital moves, small tools, and cricket.",
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'pit-wall', label: 'Home', href: '/' },
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
    { label: 'Home', href: '/' },
    { label: 'Garage', href: '/garage' },
    { label: 'Field Notes', href: '/field-notes' },
    { label: 'Story', href: '/story' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
