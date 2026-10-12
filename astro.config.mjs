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
    '/blog': '/field-notes',
    "/blog/seven-to-defend-swat-vs-royal-phoenix": "/field-notes/seven-to-defend-swat-vs-royal-phoenix",
    "/blog/four-wickets-and-a-chase-blazehawks-vs-go-leopards": "/field-notes/four-wickets-and-a-chase-blazehawks-vs-go-leopards",
    "/blog/78-off-47-bengals-vs-tpcc": "/field-notes/78-off-47-bengals-vs-tpcc",
    "/blog/five-runs-tb-bengals-vs-mustangs": "/field-notes/five-runs-tb-bengals-vs-mustangs",
    "/blog/one-of-those-days-swat-vs-tampa-telugu-titans": "/field-notes/one-of-those-days-swat-vs-tampa-telugu-titans",
    "/blog/blackstone-vs-blackrock": "/field-notes/blackstone-vs-blackrock",
    "/blog/cvc-capital-sports": "/field-notes/cvc-capital-sports",
    "/blog/apollo-global-management-sports": "/field-notes/apollo-global-management-sports",
    "/blog/liberty-media-sports": "/field-notes/liberty-media-sports",
    "/blog/blackstone-ipl-acquisition": "/field-notes/blackstone-ipl-acquisition",
    "/blog/canva-vs-figma": "/field-notes/canva-vs-figma",
    "/blog/blackbird-ventures": "/field-notes/blackbird-ventures",
    "/blog/figma-the-billion-dollar-bet": "/field-notes/figma-the-billion-dollar-bet",
    "/blog/dutch-bros": "/field-notes/dutch-bros",
    "/blog/dutch-bros-effect": "/field-notes/dutch-bros-effect",
    '/field-notes/category/brewing': '/garage?status=brewing',
    '/projects/field-notes': '/field-notes'
  }
});
