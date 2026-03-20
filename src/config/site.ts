export const siteConfig = {
  title: 'C M Nafi',
  description: 'A personal website about the places that shaped me, the books I keep nearby, and the cricket matches I still replay.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'story', label: 'My Story', href: '/story' },
    { id: 'books', label: 'Books', href: '/interests/books' },
    { id: 'cricket', label: 'Cricket', href: '/interests/cricket' },
    { id: 'connect', label: 'Connect', href: '/connect' }
  ],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/cmnafi' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/cm-nafi/' },
    { label: 'Email', href: 'mailto:nafi@cmnafi.com' }
  ],
  footerLinks: [
    { label: 'Story', href: '/story' },
    { label: 'About', href: '/about' },
    { label: 'Books', href: '/interests/books' },
    { label: 'Cricket', href: '/interests/cricket' },
    { label: 'Field Notes', href: '/projects/field-notes' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
