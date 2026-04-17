import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { remarkAutoLink } from './src/plugins/remarkAutoLink.mjs';

export default defineConfig({
  site: 'https://www.cmnafi.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [remarkAutoLink]
  },
  redirects: {
    '/projects': '/garage',
    '/projects/field-notes': '/field-notes',
    '/brewing': '/garage'
  }
});
