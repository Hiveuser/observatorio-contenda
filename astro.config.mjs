import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://Hiveuser.github.io',
  base: '/observatorio-contenda',
  integrations: [tailwind(), react()],
  build: {
    assets: 'assets',
  },
  vite: {
    ssr: {
      noExternal: ['leaflet'],
    },
  },
});