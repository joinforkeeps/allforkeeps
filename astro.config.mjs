import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { fileURLToPath } from 'node:url';
import { isPageVisible } from './src/config/pages.js';

export default defineConfig({
  site: import.meta.env.PUBLIC_SITE_URL || 'https://allforkeeps.com',
  base: '/',
  envPrefix: 'PUBLIC_',

  server: {
    port: 5200,
  },

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },

  markdown: {
    processor: satteri({
      features: {
        gfm: {
          footnotes: {
            backContent: '↩',
            backLabel: 'Back to reference',
            label: 'Footnotes',
          },
        },
        smartPunctuation: true,
      },
    }),
  },

  integrations: [
    mdx(),
    sitemap({
      filter: (page) => isPageVisible(new URL(page).pathname),
    }),
  ],
});
