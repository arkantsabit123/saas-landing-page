// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [tailwind()],
  site: 'https://product.example.com',
  output: 'static',
  build: {
    inlineStylesheets: 'auto',
  },
});