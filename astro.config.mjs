import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://cmnafi.com',
  integrations: [mdx()],
  markdown: {
    syntaxHighlight: 'shiki'
  }
});
