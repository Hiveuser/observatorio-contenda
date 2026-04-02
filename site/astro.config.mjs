import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://observatorio.contenda.pr.gov.br',
  output: 'static',
  integrations: [sitemap()],
  vite: {
    ssr: {
      noExternal: ['gray-matter', 'marked'],
    },
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind-ui.js'],
      },
    },
  },
});
