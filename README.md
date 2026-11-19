# Portfolio — Wilfredo Melgar

Personal portfolio, bilingual (EN default, ES under `/es/`), aimed at remote
software-engineering and AI-training contracts. Static **Astro 7** site served by
a **Cloudflare Worker**; no database.

- Production: https://wilfredo.deviasv.com
- Staging: https://wilfredo-portfolio-staging.deviasv.workers.dev

Until November 2026 this was a Next.js + Prisma + Postgres app on Railway
(blog, testimonials, admin panel). It was rebuilt from scratch; the old code
lives in git history on `main` before the `astro-cloudflare` branch.

## Where things live

| What | File |
|---|---|
| All content (profile, projects, experience, skills) | `src/data/site.ts` |
| Interface strings | `src/data/ui.ts` |
| Page markup | `src/components/Home.astro` |
| Styles / design tokens | `src/styles/global.css` |
| Contact endpoint (`POST /api/contact`) | `cloudflare/worker.ts` |
| Security + cache headers | `cloudflare/_headers` (copied into `dist/` on build) |
| Worker config | `wrangler.jsonc` |

`src/data/site.ts` is the single source of truth: the CV "CV AI Training -
Software Engineer" in CV-SV is written from the same facts. Entries with
`draft: true` are not rendered until confirmed.

Project screenshots are in `src/assets/projects/` (1440×630, taken from the
live sites); Astro converts them to WebP at build time.

## Commands

```bash
npm install
npm run dev          # http://localhost:4321
npm run check        # astro check (types)
npm run cf:staging   # build + deploy to the staging worker
npm run cf:deploy    # build + deploy to wilfredo.deviasv.com
```

Deploys need `CLOUDFLARE_API_TOKEN` (Windows user variable
`CLOUDFLARE_WORKERS_TOKEN`, account `deviasv`).

## Contact form

The Worker sends mail through Resend. The key is a secret, never in the repo:

```bash
npx wrangler secret put RESEND_API_KEY              # production
npx wrangler secret put RESEND_API_KEY --env staging
```

Without the key the endpoint answers 503 and the page shows the email address
instead, so no message is lost silently. `CONTACT_TO` / `CONTACT_FROM` are vars
in `wrangler.jsonc`.

Production is live since 2026-11-19: sender `portafolio@deviasv.com` (domain
verified in Resend), key `portafolio-wilfredo-envio-2026-11` with *sending
access* restricted to `deviasv.com`. Staging has no key on purpose (answers 503).

Test it (use a generic sender address, the destination is `CONTACT_TO`):

```bash
curl -H "Accept: application/json" -X POST -F name=Test -F email=test@example.com \
  -F message=hello https://wilfredo.deviasv.com/api/contact   # → {"ok":true}
```

## Gotchas

- Astro 7.4+ requires Node ≥ 22.23.4; this repo pins **7.3.8** (same as Su Casa)
  because the machine runs Node 22.22.
- Vite inlines small font files as `data:` URIs, so the CSP needs
  `font-src 'self' data:`.
