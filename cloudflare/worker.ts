// Portfolio on Cloudflare Workers (since 2026-11-19; before that, Next.js on Railway).
//
// Cloudflare serves every prerendered page and asset from dist/ (wrangler.jsonc:
// assets first, 404.html for misses). Only /api/* reaches this script.
//
// Secrets (set with `npx wrangler secret put <NAME>`, never in this repo):
//   RESEND_API_KEY  — Resend key. Without it the form answers 503 and the page
//                     shows the email address instead of losing the message.
// Vars (wrangler.jsonc): CONTACT_TO, CONTACT_FROM, SITE_URL.

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  RESEND_API_KEY?: string;
  CONTACT_TO?: string;
  CONTACT_FROM?: string;
}

const LIMITS = { name: 120, email: 200, message: 4000 } as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort rate limit per isolate: enough to stop a naive script.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

function reply(request: Request, status: number, ok: boolean, lang: string) {
  if (request.headers.get('accept')?.includes('application/json')) {
    return Response.json({ ok }, { status });
  }
  // No JavaScript: the browser posted the form directly. Send it back to the page.
  const base = lang === 'es' ? '/es/' : '/';
  return new Response(null, { status: 303, headers: { Location: `${base}?contact=${ok ? 'sent' : 'error'}#contact` } });
}

async function contact(request: Request, env: Env): Promise<Response> {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return reply(request, 400, false, 'en');
  }
  const field = (k: string) => String(form.get(k) ?? '').trim();
  const lang = field('lang') === 'es' ? 'es' : 'en';

  // Bots fill the hidden field: pretend success so they don't retry.
  if (field('website')) return reply(request, 200, true, lang);

  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown';
  if (rateLimited(ip)) return reply(request, 429, false, lang);

  const name = field('name').slice(0, LIMITS.name);
  const email = field('email').slice(0, LIMITS.email);
  const message = field('message').slice(0, LIMITS.message);
  if (!name || !message || !EMAIL_RE.test(email)) return reply(request, 422, false, lang);

  if (!env.RESEND_API_KEY || !env.CONTACT_TO) {
    console.error('[contact] RESEND_API_KEY or CONTACT_TO is not configured');
    return reply(request, 503, false, lang);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.CONTACT_FROM || 'Portafolio Wilfredo Melgar <portafolio@deviasv.com>',
      to: [env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio contact — ${name}`,
      text: [`From: ${name} <${email}>`, `Page language: ${lang}`, '', message].join('\n'),
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch((err) => {
    console.error('[contact] Resend request failed', err);
    return null;
  });

  if (!res?.ok) {
    if (res) console.error('[contact] Resend error', res.status, await res.text());
    return reply(request, 502, false, lang);
  }
  return reply(request, 200, true, lang);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
      try {
        return await contact(request, env);
      } catch (err) {
        console.error('[worker] /api/contact', err);
        return reply(request, 500, false, 'en');
      }
    }
    if (url.pathname.startsWith('/api/')) return new Response('Not Found', { status: 404 });
    return env.ASSETS.fetch(request);
  },
};
