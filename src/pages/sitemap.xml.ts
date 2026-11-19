import type { APIRoute } from 'astro';

// Two pages, two languages: a hand-written sitemap is simpler than an integration.
export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL('https://wilfredo.deviasv.com');
  const en = new URL('/', base).href;
  const es = new URL('/es/', base).href;
  const entry = (loc: string) => `  <url>
    <loc>${loc}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="es" href="${es}"/>
  </url>`;
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entry(en)}
${entry(es)}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
