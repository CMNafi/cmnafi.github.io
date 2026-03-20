export const siteConfig = {
  title: 'C M Nafi',
  description: 'A personal website organized as four interest worlds, a running timeline, and the work that connects them.',
  author: 'C M Nafi',
  siteUrl: 'https://cmnafi.com',
  email: 'nafi@cmnafi.com',
  nav: [
    { id: 'story', label: 'My Story', href: '/story' },
    { id: 'interests', label: 'Interests', href: '/interests' },
    { id: 'projects', label: 'Projects', href: '/projects' },
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
    { label: 'Brewing', href: '/brewing' },
    { label: 'Interests', href: '/interests' },
    { label: 'Connect', href: '/connect' }
  ]
} as const;

export type SiteConfig = typeof siteConfig;
