# CV "CV AI Training - Software Engineer" (CV-SV)

Target: remote contracts on AI-training platforms (Mercor, Outlier) and remote
software roles — *Software Engineer / Coding Expert*, *Database Expert*,
*Bilingual Spanish STEM/Coding Expert*. Language: **English**, A4, template
**LaTeX / Silicon Valley** (`meta.template = "latex"`; "ats" = ATS-Safe is the
plain fallback).

## Where it lives

- CV-SV record: `Resume.id = 0b05f539-2482-4652-8789-c3e7b823ec7a`
  (owner: Wilfredo's account), edited at https://cv-sv-production.up.railway.app/editor
- Full JSON (JSON Resume schema, see `D:/Sistemas-Devia/cv-sv/src/types/resume.ts`):
  `private/cv-ai-training.json` — **gitignored** (contains phone; this repo is public).
  The email is a placeholder; the loader keeps the address already on the CV.
- Loader: `node private/load-cv.cjs` (dry run) / `--apply` (backs up the row to
  `private/cv-backup-*.json`, then UPDATE with an optimistic `updatedAt` check).
  Uses cv-sv's own `.env` DATABASE_URL; the `cvsv-postgres` MCP is read-only.
- Facts must match `src/data/site.ts` (portfolio). Change both together.

## Confirmed facts (Wilfredo, 2026-11-19)

- English **B2**.
- Factura Premium: "hundreds" of real documents (fewer than 1,000) — never inflate.
- Engineering degree completed: Ingeniero en Sistemas y Computación (UTEC, 2006–2011).
- Certifications: names only, no years (Oracle DB 12c Specialist, Cisco Cybersecurity, Google Gemini Certified Educator).
- Phone stays on the CV (not on the public portfolio).
- Banco Cuscatlán: **IT Training Facilitator, 2022–2026**, onboarding newly hired
  engineers (already graduates) into banking/financial app development. Not an
  engineering position.
- Outlier: **no work done** — not listed anywhere.

## Structure

1. Header: label "Senior Software Engineer · AI-Augmented Development · Databases",
   portfolio / LinkedIn / GitHub, San Salvador · Remote (UTC−6).
2. Summary: 12+ years building, 5+ years training developers, production SaaS,
   daily AI agents (Claude Code, Codex, Gemini) inside DevTracker workflow.
3. Work: DevIA (8 bullets incl. AI workflow, agent tooling, security) → Banco
   Cuscatlán → CEREN → PC & Sistemas → USAID/FUSALMO.
4. Projects (7, with URLs): Factura Premium, ContaPremium, PublicaYA, DevTracker,
   Banking REST API course, CV-SV, Portfolio.
5. Skills (8 groups, "AI-Augmented Engineering" first), education, certifications, languages.

## Professional AI use — the message to keep consistent

Agents start with context (DevTracker: state, ~500 pitfalls, decisions);
agents write, Wilfredo owns architecture/data model/domain rules and every merge;
three agents (Claude Code primary, Codex, Gemini); safe agent tooling
(read-only by default, confirmed writes, audit log); verification over trust
(types, tests, post-deploy checks); responsible use (no secrets or personal data
in prompts, human approval before publishing AI output).

## Ideas still open

- Numbers that sell: trainees per cohort, Factura Premium clients.
- Pin 2–3 clean public repos on GitHub.
- Availability (hours/week) for Mercor's profile.
