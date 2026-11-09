import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://arkantsabit123.github.io',
  base: '/saas-landing-page',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});