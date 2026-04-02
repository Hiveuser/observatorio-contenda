import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import path from 'node:path';

export default defineConfig({
  site: 'https://observatorio.contenda.pr.gov.br',
  output: 'static',
  integrations: [
    sitemap(),
  ],
  vite: {
    server: {
      fs: {
        allow: ['.', path.resolve('../vault')],
      },
    },
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js'],
      },
    },
  },
});