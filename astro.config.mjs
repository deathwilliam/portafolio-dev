// @ts-check
import { defineConfig } from 'astro/config';

// Static site served by Cloudflare Workers (wrangler.jsonc). Astro only builds
// dist/; the contact form endpoint lives in cloudflare/worker.ts.
// English is the default locale (no prefix); Spanish lives under /es/.
export default defineConfig({
  site: process.env.SITE_URL || 'https://wilfredo.deviasv.com',
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
});
