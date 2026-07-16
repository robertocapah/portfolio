import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Update this once a custom domain is attached; it only affects sitemap/canonical URLs.
const SITE = 'https://roberto-portfolio.vercel.app';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
