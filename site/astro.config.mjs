import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://observatoriocontenda.org',
  base: '/',
  build: {
    assets: 'assets',
  },
  vite: {
    ssr: {
      noExternal: ['leaflet'],
    },
  },
});
