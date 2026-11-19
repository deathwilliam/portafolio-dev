// Single source of truth for the portfolio content (EN + ES).
// The same list feeds the CV "CV AI Training - Software Engineer" in CV-SV,
// so keep facts here accurate and verifiable.
//
// `draft: true` entries are NOT rendered: they wait for Wilfredo to confirm
// role, dates or scope before going public.

export type Lang = 'en' | 'es';
export type L = Record<Lang, string>;

export const t = (value: L, lang: Lang) => value[lang];

export const profile = {
  name: 'Wilfredo Melgar',
  role: {
    en: 'Senior Software Engineer · AI-Augmented Development',
    es: 'Ingeniero de Software Sénior · Desarrollo potenciado con IA',
  },
  headline: {
    en: 'I ship production systems — e-invoicing, accounting, SaaS — and engineer the workflow that lets AI agents build them with me, safely.',
    es: 'Construyo sistemas en producción —facturación electrónica, contabilidad, SaaS— y diseño el flujo de trabajo que permite que agentes de IA los construyan conmigo, de forma segura.',
  },
  summary: {
    en: 'Systems engineer with 12+ years building business software in Java, TypeScript, PHP and SQL, plus 4+ years teaching programming and databases (Oracle Academy). Today I run DevIA, where I design, build and operate SaaS products end to end — from data model to deployment — using AI coding agents with a memory and verification layer I built myself.',
    es: 'Ingeniero en sistemas con más de 12 años construyendo software empresarial en Java, TypeScript, PHP y SQL, y más de 4 años enseñando programación y bases de datos (Oracle Academy). Hoy dirijo DevIA, donde diseño, construyo y opero productos SaaS de principio a fin —del modelo de datos al despliegue— con agentes de IA y una capa de memoria y verificación que construí yo mismo.',
  },
  location: { en: 'San Salvador, El Salvador · Remote (UTC−6)', es: 'San Salvador, El Salvador · Remoto (UTC−6)' },
  email: 'melgar.wilfredo@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/wilfredo-melgar',
    github: 'https://github.com/deathwilliam',
    company: 'https://deviasv.com',
  },
};

export const stats: { value: string; label: L }[] = [
  { value: '12+', label: { en: 'years building software', es: 'años construyendo software' } },
  { value: '20', label: { en: 'projects run with AI agents', es: 'proyectos llevados con agentes de IA' } },
  { value: '~500', label: { en: 'documented pitfalls agents read before coding', es: 'trampas documentadas que los agentes leen antes de programar' } },
  { value: '11', label: { en: 'tax document types in production', es: 'tipos de DTE en producción' } },
];

// ---------------------------------------------------------------------------
// How I work with AI
// ---------------------------------------------------------------------------

export const aiWorkflow: { title: L; body: L; tag: string }[] = [
  {
    tag: 'context',
    title: { en: 'Agents start with context, not guesses', es: 'Los agentes empiezan con contexto, no adivinando' },
    body: {
      en: 'Before touching code, every agent loads the project state, open tasks, and the pitfalls already learned — from DevTracker, an MCP server I built. A bug fixed once is written down so no agent repeats it.',
      es: 'Antes de tocar código, cada agente carga el estado del proyecto, las tareas abiertas y las trampas ya aprendidas desde DevTracker, un servidor MCP que construí. Un bug resuelto una vez queda escrito para que ningún agente lo repita.',
    },
  },
  {
    tag: 'pair',
    title: { en: 'AI writes, I architect and review', es: 'La IA escribe; yo diseño y reviso' },
    body: {
      en: 'I work with three coding agents: Claude Code as the main pair programmer, OpenAI Codex and Google Gemini for parallel tasks and second opinions. I own the data model, the domain rules and every merge — especially fiscal and security code, where a plausible answer is not good enough.',
      es: 'Trabajo con tres agentes de programación: Claude Code como pareja principal, OpenAI Codex y Google Gemini para tareas en paralelo y segundas opiniones. El modelo de datos, las reglas del negocio y cada merge son míos, sobre todo en código fiscal y de seguridad, donde una respuesta "que parece correcta" no alcanza.',
    },
  },
  {
    tag: 'tools',
    title: { en: 'Tools that let agents operate safely', es: 'Herramientas para que los agentes operen con seguridad' },
    body: {
      en: 'I build CLIs and skills so agents can query and operate my products: read-only by default, explicit confirmation for writes, and an audit log for every cross-tenant access.',
      es: 'Construyo CLIs y skills para que los agentes consulten y operen mis productos: solo lectura por defecto, confirmación explícita para escribir y bitácora de auditoría para todo acceso entre empresas.',
    },
  },
  {
    tag: 'verify',
    title: { en: 'Verify the effect, not the green check', es: 'Verificar el efecto, no el check en verde' },
    body: {
      en: 'Type checks, Vitest and Playwright on every change; after a deploy I confirm the concrete result — the migration, the route, the column — instead of trusting a healthy status page.',
      es: 'Tipos, Vitest y Playwright en cada cambio; después de desplegar confirmo el resultado concreto —la migración, la ruta, la columna— en lugar de confiar en un estado "saludable".',
    },
  },
  {
    tag: 'product',
    title: { en: 'AI inside the products', es: 'IA dentro de los productos' },
    body: {
      en: 'Gemini rewrites and translates resumes in CV-SV; Claude adapts one brief into native copy for each social network in PublicaYA. Prompts are versioned, outputs are validated, and a human approves before anything is published.',
      es: 'Gemini reescribe y traduce currículums en CV-SV; Claude adapta un brief al texto nativo de cada red social en PublicaYA. Los prompts se versionan, las salidas se validan y una persona aprueba antes de publicar.',
    },
  },
];

// Lines for the terminal mock in the AI section (kept short on purpose).
export const terminal: { kind: 'cmd' | 'out' | 'ok' | 'warn'; text: string }[] = [
  { kind: 'cmd', text: 'devtracker_context factura-electronica' },
  { kind: 'out', text: 'state: MH production env (01) · 5 open tasks' },
  { kind: 'warn', text: 'trap: never round money with toFixed — use lib/invoices/math.ts' },
  { kind: 'cmd', text: 'devtracker_session start "credit note rounding"' },
  { kind: 'out', text: 'agent: claude · editing lib/invoices/math.ts' },
  { kind: 'cmd', text: 'npm run test && npx playwright test' },
  { kind: 'ok', text: '✓ unit tests · ✓ e2e invoice → credit note' },
  { kind: 'cmd', text: 'devtracker_log_advance --decision "tie-break on absolute value"' },
  { kind: 'ok', text: '✓ changelog · state · decision with rationale saved' },
];

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export type Project = {
  slug: string;
  name: string;
  kind: L;
  status: L;
  url?: string;
  image?: string; // file name in src/assets/projects/
  term?: { kind: 'cmd' | 'out' | 'ok' | 'warn'; text: string }[]; // shown instead of a screenshot
  stack: string[];
  summary: L;
  highlights: L[];
  ai?: L;
  featured?: boolean;
  draft?: boolean;
};

const live: L = { en: 'In production', es: 'En producción' };

export const projects: Project[] = [
  {
    slug: 'factura-premium',
    name: 'Factura Premium',
    kind: { en: 'SaaS · Fintech / Tax', es: 'SaaS · Fintech / Fiscal' },
    status: live,
    url: 'https://facturapremium.com',
    image: 'facturapremium.png',
    featured: true,
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Playwright', 'Vitest', 'Sentry'],
    summary: {
      en: 'Electronic invoicing (DTE) for El Salvador, integrated with the Ministry of Finance in its production environment.',
      es: 'Facturación electrónica (DTE) para El Salvador, integrada con el Ministerio de Hacienda en su ambiente de producción.',
    },
    highlights: [
      { en: '11 official DTE types with JSON schema validation, digital signature and PDF.', es: '11 tipos de DTE oficiales con validación de esquema JSON, firma digital y PDF.' },
      { en: 'Single, centralized rounding for every fiscal amount; tax books and returns (F-07, F-14).', es: 'Un solo redondeo centralizado para todo monto fiscal; libros de IVA y declaraciones (F-07, F-14).' },
      { en: 'Public REST API consumed by ContaPremium and third-party integrators; card payments (Wompi).', es: 'API REST pública que consumen ContaPremium e integradores externos; cobro con tarjeta (Wompi).' },
    ],
    ai: {
      en: 'Built with AI agents guided by ~130 documented pitfalls; an admin CLI lets agents diagnose rejected documents without writing to production data.',
      es: 'Construido con agentes de IA guiados por ~130 trampas documentadas; una CLI de administración permite a los agentes diagnosticar documentos rechazados sin escribir en los datos de producción.',
    },
  },
  {
    slug: 'contapremium',
    name: 'ContaPremium',
    kind: { en: 'SaaS · Accounting', es: 'SaaS · Contabilidad' },
    status: live,
    url: 'https://contapremium-production.up.railway.app',
    image: 'contapremium.png',
    featured: true,
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vitest'],
    summary: {
      en: 'Multi-company accounting for Salvadoran accountants: one login, many companies, full ledger to financial statements.',
      es: 'Contabilidad multiempresa para contadores salvadoreños: un solo acceso, muchas empresas, del libro diario a los estados financieros.',
    },
    highlights: [
      { en: '30 modules: journal, ledger, balance sheet, VAT books, withholdings, payroll, fixed assets, budget.', es: '30 módulos: diario, mayor, balance, libros de IVA, retenciones, planillas, activo fijo, presupuesto.' },
      { en: 'Imports invoices from Factura Premium’s API; both share the same fiscal rounding rules.', es: 'Importa facturas desde la API de Factura Premium; ambos comparten las mismas reglas de redondeo fiscal.' },
      { en: 'Strict multi-tenant isolation with an audit trail for every cross-tenant access.', es: 'Aislamiento multiempresa estricto con bitácora de auditoría para todo acceso cruzado.' },
    ],
    ai: {
      en: 'A 43-command CLI lets AI agents read and — with explicit confirmation — post journal entries, so accounting questions get answered from real data.',
      es: 'Una CLI de 43 comandos permite a agentes de IA consultar y —con confirmación explícita— registrar asientos, para responder preguntas contables con datos reales.',
    },
  },
  {
    slug: 'publicaya',
    name: 'PublicaYA',
    kind: { en: 'SaaS · AI social publishing', es: 'SaaS · Publicación con IA' },
    status: live,
    url: 'https://web-production-4bddb.up.railway.app',
    image: 'publicaya.png',
    featured: true,
    stack: ['Next.js 15', 'TypeScript', 'Prisma', 'PostgreSQL', 'Anthropic API', 'Worker queue'],
    summary: {
      en: 'One creative plus a brief becomes native copy for each social network, scheduled and published from one place.',
      es: 'Un creativo más un brief se convierte en el texto nativo de cada red social, programado y publicado desde un solo lugar.',
    },
    highlights: [
      { en: 'Direct integrations with Meta (Facebook, Instagram), TikTok, LinkedIn and YouTube APIs — no aggregator.', es: 'Integración directa con las APIs de Meta (Facebook, Instagram), TikTok, LinkedIn y YouTube, sin agregadores.' },
      { en: 'Background worker for scheduled publishing, retries and per-network validation.', es: 'Worker en segundo plano para publicación programada, reintentos y validación por red.' },
    ],
    ai: {
      en: 'Claude writes the copy per network in local Spanish; a person approves before anything goes out.',
      es: 'Claude redacta el texto de cada red en español salvadoreño; una persona aprueba antes de publicar.',
    },
  },
  {
    slug: 'devtracker',
    name: 'DevTracker',
    kind: { en: 'Developer tool · AI agents', es: 'Herramienta · Agentes de IA' },
    status: { en: 'Daily use', es: 'Uso diario' },
    featured: true,
    term: [
      { kind: 'cmd', text: 'devt dashboard' },
      { kind: 'out', text: '20 projects · 392 advances / 60d' },
      { kind: 'warn', text: '⚠ 3 overdue milestones' },
      { kind: 'ok', text: '✓ agents: claude · codex · gemini' },
    ],
    stack: ['Node.js 20', 'MCP Server', 'CLI', 'GitHub API'],
    summary: {
      en: 'Persistent memory for AI coding agents: an MCP server and CLI that track state, pitfalls, decisions and sessions across all my projects.',
      es: 'Memoria persistente para agentes de IA: un servidor MCP y una CLI que llevan estado, trampas, decisiones y sesiones de todos mis proyectos.',
    },
    highlights: [
      { en: 'Agents load context before coding and log advances, decisions (with rationale) and pitfalls when done.', es: 'Los agentes cargan contexto antes de programar y registran avances, decisiones (con su razón) y trampas al terminar.' },
      { en: 'Detects interrupted sessions, files open in pull requests, and logic shared between projects.', es: 'Detecta sesiones interrumpidas, archivos abiertos en pull requests y lógica compartida entre proyectos.' },
    ],
    ai: {
      en: 'Works with Claude Code, Codex and Gemini — the shared layer that makes multi-agent work consistent.',
      es: 'Funciona con Claude Code, Codex y Gemini: la capa común que hace consistente el trabajo con varios agentes.',
    },
  },
  {
    slug: 'banking-api-course',
    name: 'Banking REST API · Digital Trainee Program',
    kind: { en: 'Training · Backend Java', es: 'Formación · Backend Java' },
    status: { en: '3rd cohort · 2026', es: '3.ª cohorte · 2026' },
    featured: true,
    term: [
      { kind: 'cmd', text: 'POST /api/v1/transferencias' },
      { kind: 'out', text: 'Authorization: Bearer <jwt> · rol CAJERO' },
      { kind: 'ok', text: '201 Created · bitácora + historial de estado' },
      { kind: 'cmd', text: './mvnw test' },
      { kind: 'ok', text: '✓ JUnit · Mockito · Testcontainers (PostgreSQL 17)' },
    ],
    stack: ['Java 21', 'Spring Boot 4', 'Spring Security + JWT', 'PostgreSQL 17', 'Flyway', 'OpenAPI', 'Testcontainers', 'Docker'],
    summary: {
      en: '43-session backend course I designed and facilitate for Banco Cuscatlán’s Digital Trainee Program. Each trainee engineer builds a production-style banking REST API.',
      es: 'Curso de backend de 43 sesiones que diseñé y facilito para el Programa Digital Trainee de Banco Cuscatlán. Cada ingeniero pasante construye una API REST bancaria con estándares de producción.',
    },
    highlights: [
      { en: 'Reference API built live in class: customers, accounts, movements and transfers with transactional integrity.', es: 'API de referencia construida en vivo en clase: clientes, cuentas, movimientos y transferencias con integridad transaccional.' },
      { en: 'Capstone: each trainee picks a financial domain (credit cards, remittances, SME microcredit, savings…) and delivers a 12–15-table model in 4 reviewed stages.', es: 'Proyecto final: cada pasante elige un tema financiero (tarjetas, remesas, microcréditos PYME, ahorro…) y entrega un modelo de 12 a 15 tablas en 4 etapas revisadas.' },
      { en: 'Security with roles and JWT, audit log and status history, Flyway migrations, Swagger docs, unit and integration tests.', es: 'Seguridad con roles y JWT, bitácora y historial de estados, migraciones con Flyway, documentación Swagger, pruebas unitarias y de integración.' },
      { en: 'Every stage reviewed in each trainee’s repository with written feedback; final demos presented to the bank.', es: 'Cada etapa se revisa en el repositorio de cada pasante con devolución escrita; las demos finales se presentan ante el banco.' },
    ],
    ai: {
      en: 'Course material, minute-by-minute session scripts and code reviews are prepared with AI agents and tracked in DevTracker; every Java example is executed before it reaches class.',
      es: 'El material, los guiones minuto a minuto y las revisiones de código se preparan con agentes de IA y se registran en DevTracker; cada ejemplo de Java se ejecuta antes de llegar a clase.',
    },
  },
  {
    slug: 'cv-sv',
    name: 'CV-SV',
    kind: { en: 'SaaS · AI resumes', es: 'SaaS · Currículums con IA' },
    status: live,
    url: 'https://cv-sv-production.up.railway.app',
    image: 'cv-sv.png',
    stack: ['Next.js 16', 'TypeScript', 'Prisma', 'PostgreSQL', 'Google Gemini', 'Cloudinary'],
    summary: {
      en: 'Resume and portfolio builder powered by Gemini: ATS-friendly templates, AI rewriting and translation, PDF and Word export.',
      es: 'Generador de currículums y portafolios con Gemini: plantillas compatibles con ATS, reescritura y traducción con IA, exportación a PDF y Word.',
    },
    highlights: [
      { en: 'Imports existing Word resumes and structures them automatically.', es: 'Importa currículums existentes en Word y los estructura automáticamente.' },
      { en: 'Online payments (Wompi), B2B module for organizations and custom domains for portfolios.', es: 'Pagos en línea (Wompi), módulo B2B para organizaciones y dominios propios para portafolios.' },
    ],
  },
  {
    slug: 'calendario-mineducyt',
    name: 'Academic Calendar · MINEDUCYT',
    kind: { en: 'Government · PWA', es: 'Gobierno · PWA' },
    status: live,
    image: 'calendario-mined.png',
    stack: ['Laravel', 'PHP', 'Vue', 'Tailwind CSS', 'Playwright'],
    summary: {
      en: 'Official school calendar platform built for El Salvador’s Ministry of Education.',
      es: 'Plataforma oficial del calendario escolar, construida para el Ministerio de Educación de El Salvador.',
    },
    highlights: [
      { en: 'Installable PWA with PDF export, cascading geographic filters, roles and audit log.', es: 'PWA instalable con exportación a PDF, filtros geográficos en cascada, roles y auditoría.' },
    ],
  },
  {
    slug: 'devia',
    name: 'DevIA Academy',
    kind: { en: 'EdTech · Web + mobile', es: 'EdTech · Web + móvil' },
    status: live,
    url: 'https://deviasv.com',
    image: 'devia.png',
    stack: ['Next.js 15', 'NestJS', 'Expo', 'Prisma', 'Bull / Redis'],
    summary: {
      en: 'My company’s learning platform: courses (Java, Oracle SQL, Excel), progress tracking and a mobile app with Google sign-in.',
      es: 'La plataforma de aprendizaje de mi empresa: cursos (Java, Oracle SQL, Excel), seguimiento de progreso y app móvil con acceso por Google.',
    },
    highlights: [
      { en: 'Monorepo with web, API and mobile; CI and pre-commit checks on every change.', es: 'Monorepo con web, API y app móvil; CI y validaciones antes de cada commit.' },
    ],
  },
  {
    slug: 'su-casa',
    name: 'Su Casa',
    kind: { en: 'Client website · Cloudflare', es: 'Sitio de cliente · Cloudflare' },
    status: live,
    url: 'https://sucasa.page',
    image: 'su-casa.png',
    stack: ['Astro', 'Cloudflare Workers', 'D1', 'KV', 'Browser Rendering'],
    summary: {
      en: 'Website and quoting tool for a carpentry and renovation business in Ontario, Canada.',
      es: 'Sitio web y herramienta de cotizaciones para un negocio de ebanistería y renovaciones en Ontario, Canadá.',
    },
    highlights: [
      { en: 'Quotes generated as PDF on the edge, moderated reviews, and an owner panel with visit analytics.', es: 'Cotizaciones en PDF generadas en el edge, reseñas moderadas y panel del dueño con analítica de visitas.' },
    ],
  },
  {
    slug: 'huellitas',
    name: 'Huellitas Care',
    kind: { en: 'Website + internal app', es: 'Sitio + app interna' },
    status: live,
    url: 'https://huellitas.casa',
    image: 'huellitas.png',
    stack: ['Astro', 'TypeScript', 'PostgreSQL', 'Docker'],
    summary: {
      en: 'Pet-care brand site plus a vet-style records app: bookings, visit reports sent by WhatsApp, pet history and PDF billing.',
      es: 'Sitio de cuidado de mascotas y una app tipo veterinaria: reservas, reportes de visita por WhatsApp, expediente por mascota y cobros en PDF.',
    },
    highlights: [
      { en: 'Bilingual site with share previews, and a separate records app with its own database.', es: 'Sitio bilingüe con vistas previas para compartir y una app de expedientes con su propia base de datos.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Experience
// ---------------------------------------------------------------------------

export type Job = {
  company: string;
  role: L;
  period: L;
  points: L[];
  draft?: boolean;
};

export const experience: Job[] = [
  {
    company: 'DevIA (Sistemas Devia)',
    role: { en: 'Founder & Lead Software Engineer', es: 'Fundador e Ingeniero de Software Líder' },
    period: { en: '2023 — Present', es: '2023 — Actualidad' },
    points: [
      { en: 'Design, build and operate SaaS products end to end: Factura Premium, ContaPremium, PublicaYA, CV-SV.', es: 'Diseño, construyo y opero productos SaaS de principio a fin: Factura Premium, ContaPremium, PublicaYA, CV-SV.' },
      { en: 'Delivered the official Academic Calendar platform for the Ministry of Education (MINEDUCYT).', es: 'Entregué la plataforma oficial del Calendario Académico para el Ministerio de Educación (MINEDUCYT).' },
      { en: 'Built DevTracker, the MCP memory layer that coordinates AI coding agents across 20 projects.', es: 'Construí DevTracker, la capa de memoria MCP que coordina agentes de IA en 20 proyectos.' },
      { en: 'Application security: JWT, MFA/TOTP, OWASP ASVS and NIST SP 800-63B practices.', es: 'Seguridad de aplicaciones: JWT, MFA/TOTP y prácticas OWASP ASVS y NIST SP 800-63B.' },
    ],
  },
  {
    company: 'Outlier',
    role: { en: 'AI Training Contributor (freelance)', es: 'Colaborador de entrenamiento de IA (freelance)' },
    period: { en: '2026', es: '2026' },
    points: [{ en: 'Pending: describe task types (coding, evaluation, writing).', es: 'Pendiente: describir tipo de tareas.' }],
    draft: true,
  },
  {
    company: 'Banco Cuscatlán · Tribu Digital',
    role: { en: 'IT Training Facilitator — Backend Java (Digital Trainee Program)', es: 'Facilitador de Capacitación TI — Backend Java (Programa Digital Trainee)' },
    period: { en: '2024 — 2026 · 3 cohorts', es: '2024 — 2026 · 3 cohortes' },
    points: [
      { en: 'Design and facilitate the 43-session Backend Java & Spring Boot course that trains the bank’s trainee engineers.', es: 'Diseño y facilito el curso de Backend Java y Spring Boot de 43 sesiones que forma a los ingenieros pasantes del banco.' },
      { en: 'Mentor each trainee through a banking REST API capstone: Java 21, Spring Boot 4, PostgreSQL, Spring Security + JWT, Flyway, OpenAPI and Testcontainers.', es: 'Acompaño a cada pasante en su proyecto final de API REST bancaria: Java 21, Spring Boot 4, PostgreSQL, Spring Security + JWT, Flyway, OpenAPI y Testcontainers.' },
      { en: 'Redesigned the contractual syllabus toward Java and Spring Boot, keeping traceability to the original annex for HR audits; course delivered on DevIA Academy.', es: 'Rediseñé el temario contractual hacia Java y Spring Boot, manteniendo trazabilidad con el anexo original para auditoría de Talento Humano; el curso se imparte en DevIA Academy.' },
      { en: 'Review every stage in each trainee’s repository with written feedback and prepare final evaluation reports for HR.', es: 'Reviso cada etapa en el repositorio de cada pasante con devolución escrita y preparo el informe final de evaluación para Talento Humano.' },
    ],
  },
  {
    company: 'Centro de Formación Profesional CEREN',
    role: { en: 'IT Instructor — Oracle Academy', es: 'Instructor de TI — Oracle Academy' },
    period: { en: '2021 — 2025', es: '2021 — 2025' },
    points: [
      { en: 'Taught official Oracle Academy courses: Java Fundamentals, Database Design, SQL and PL/SQL, preparing students for Oracle certification.', es: 'Impartí cursos oficiales de Oracle Academy: Fundamentos de Java, Diseño de Bases de Datos, SQL y PL/SQL, preparando a estudiantes para certificarse.' },
      { en: 'Trained IT staff in backend programming, cybersecurity and cloud fundamentals.', es: 'Capacité a personal de TI en programación backend, ciberseguridad y fundamentos de nube.' },
    ],
  },
  {
    company: 'PC & Sistemas',
    role: { en: 'Full-Stack Developer & Consultant', es: 'Desarrollador Full-Stack y Consultor' },
    period: { en: '2014 — 2020', es: '2014 — 2020' },
    points: [
      { en: 'Built custom business applications in Java, Python, .NET and PHP, from requirements to deployment, under Scrum.', es: 'Desarrollé aplicaciones empresariales a la medida en Java, Python, .NET y PHP, de los requerimientos al despliegue, con Scrum.' },
      { en: 'Modeled and tuned high-volume relational databases (Oracle, MySQL, SQL Server).', es: 'Modelé y optimicé bases de datos relacionales de alto volumen (Oracle, MySQL, SQL Server).' },
      { en: 'Maintained and integrated legacy RPG platforms for corporate clients.', es: 'Mantuve e integré plataformas legadas en RPG para clientes corporativos.' },
    ],
  },
  {
    company: 'USAID · FUSALMO · FOMILENIO II',
    role: { en: 'Technology Consulting & Innovation Specialist', es: 'Especialista en Consultoría e Innovación Tecnológica' },
    period: { en: '2014 — 2019', es: '2014 — 2019' },
    points: [
      { en: 'Led the national rollout of educational robotics (LEGO Education, Arduino) with the Ministry of Education.', es: 'Lideré la implementación nacional de robótica educativa (LEGO Education, Arduino) con el Ministerio de Educación.' },
      { en: 'Built web platforms and Android apps; trained principals and teachers on virtual classrooms (Moodle).', es: 'Desarrollé plataformas web y apps Android; capacité a directores y docentes en aulas virtuales (Moodle).' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Skills, education, certifications
// ---------------------------------------------------------------------------

export const skills: { group: L; items: string[] }[] = [
  { group: { en: 'Languages', es: 'Lenguajes' }, items: ['TypeScript', 'JavaScript', 'Java', 'SQL', 'PL/SQL', 'PHP', 'Python', 'C#'] },
  { group: { en: 'Backend', es: 'Backend' }, items: ['Spring Boot', 'Node.js', 'NestJS', 'Next.js', 'Laravel', '.NET Core', 'REST', 'GraphQL'] },
  { group: { en: 'Databases', es: 'Bases de datos' }, items: ['PostgreSQL', 'Oracle 12c/19c', 'MySQL', 'SQL Server', 'Prisma', 'Cloudflare D1', 'Query tuning', 'Data modeling'] },
  { group: { en: 'Frontend', es: 'Frontend' }, items: ['React', 'Next.js', 'Astro', 'Vue', 'Tailwind CSS', 'Expo'] },
  { group: { en: 'AI engineering', es: 'Ingeniería con IA' }, items: ['Claude Code', 'OpenAI Codex', 'Google Gemini', 'MCP servers', 'Anthropic API', 'Gemini API', 'Prompt design', 'Agent tooling', 'LLM output evaluation'] },
  { group: { en: 'Cloud & quality', es: 'Nube y calidad' }, items: ['Cloudflare Workers', 'Railway', 'Docker', 'GitHub Actions', 'Vitest', 'Playwright', 'Sentry'] },
  { group: { en: 'Security', es: 'Seguridad' }, items: ['JWT', 'MFA / TOTP', 'OWASP ASVS', 'NIST SP 800-63B', 'Argon2 / PBKDF2'] },
];

export const education: { title: L; place: string; period: string }[] = [
  { title: { en: 'Systems Engineering', es: 'Ingeniería en Sistemas y Computación' }, place: 'Universidad Tecnológica de El Salvador', period: '2006 — 2011' },
  { title: { en: 'Technician in Computer Systems Engineering', es: 'Técnico en Ingeniería de Sistemas Informáticos' }, place: 'ITCA-FEPADE', period: '2010 — 2011' },
];

export const certifications: { title: L; issuer: string }[] = [
  { title: { en: 'Oracle Database 12c Certified Specialist', es: 'Especialista Certificado en Oracle Database 12c' }, issuer: 'Oracle' },
  { title: { en: 'Cybersecurity Specialist', es: 'Especialista en Ciberseguridad' }, issuer: 'Cisco' },
  { title: { en: 'Gemini Certified Educator', es: 'Educador Certificado en Gemini' }, issuer: 'Google' },
];

export const languages: { name: L; level: L }[] = [
  { name: { en: 'Spanish', es: 'Español' }, level: { en: 'Native', es: 'Nativo' } },
  { name: { en: 'English', es: 'Inglés' }, level: { en: 'Professional working (technical)', es: 'Profesional (técnico)' } },
];
