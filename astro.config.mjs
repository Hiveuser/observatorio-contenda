import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://Hiveuser.github.io',
  base: '/observatorio-contenda',
  integrations: [tailwind()],
  build: {
    assets: 'assets',
  },
  vite: {
    ssr: {
      noExternal: ['leaflet'],
    },
  },
});
