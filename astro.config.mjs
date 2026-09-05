// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import { contentApiPlugin } from './vite-plugins/content-api.mjs';
import { site } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  // Endereço real do site. Alimenta o sitemap e as URLs canônicas.
  // Vem de src/data/site.ts para não existir domínio escrito em dois lugares.
  site: site.url,

  vite: {
    plugins: [tailwindcss(), contentApiPlugin()],
  },

  integrations: [
    sitemap({
      // As páginas /system/* são referência interna do design system.
      // Ficam acessíveis, mas fora do sitemap para não serem indexadas.
      filter: (page) => !page.includes('/system/'),
    }),
    react(),
  ],
});
