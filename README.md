# Fruit Design Academy

A **presentation-first** course platform for fruit design: public catalog, curriculum with preview vs locked lessons, **mock admin auth**, file-backed course data for local demos, and CI (lint, tests, build).

**Live demo (Vercel):** [fruit-design-academy.vercel.app](https://fruit-design-academy.vercel.app/)

Production target: **Next.js** on Vercel, **Supabase** (Postgres + Auth + Storage), **Stripe**, **Vimeo** (or signed video). The codebase is structured so repositories and route handlers can swap from file storage to a real backend without rewriting the UI.

## Repository layout

| Path | Purpose |
|------|---------|
| `web/` | Next.js App Router app (TypeScript, Tailwind, Zod, React Hook Form) |
| `web/data/courses.json` | **Local-only** course store (modules + lessons). Not durable on serverless hosts. |
| `.github/workflows/ci.yml` | GitHub Actions: install, lint, test, build |

## Cursor agent — between assigned steps

Cursor should follow **[CURSOR_STEP_GATE.md](CURSOR_STEP_GATE.md)** after each stage or chunk from the roadmap: review the diff, run `lint` / `test` / `build` in `web/`, add tests or say why not, scan for improvements, then update `docs/05-development-checklist.md` and summarize. A matching rule lives in `.cursor/rules/fruit-design-academy-step-gate.mdc`. Tracked planning docs: **`docs/05-development-checklist.md`** (stages), **`docs/07-cursor-tasks.md`** (same gate as `CURSOR_STEP_GATE.md` + **WEB-*** backlog). Other files under `docs/` stay local unless you add gitignore exceptions.

## Quick start

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (recommended for this demo)

**Why Vercel:** Native Next.js support (App Router, API routes, middleware), preview deployments on every PR, HTTPS and edge out of the box. Alternatives like Netlify or Cloudflare Pages work too but need more Next-specific tuning.

### What to do (first time)

1. Push this repository to **GitHub** (if it is not already remote).
2. Sign in at [vercel.com](https://vercel.com) with your GitHub account.
3. **Add New… → Project** → **Import** this repo.
4. Under **Configure Project**, set **Root Directory** to **`web`** (required — the app is not at the repo root).
5. Leave **Framework Preset** as Next.js; **Build Command** `npm run build` and **Output** default are fine.
6. **Environment Variables** (Production — and Preview if you want mock auth on PR previews too):
   - **`DEMO_MODE`** = `true` — keeps **mock login** and demo APIs working on the live site. Without this, production builds disable mock auth by default (see `web/src/config/demo-mode.ts`).
   - Optional: **`CONTACT_FORWARD_URL`** if you later turn off demo mode and forward contact submissions.
7. Click **Deploy**. After the first deploy, **Vercel redeploys automatically** whenever you push to the **Production Branch** (usually `main` or `master`) — no extra step. **Pull requests** get a unique **Preview** deployment URL on each push (configure under Project → Settings → Git).

**Current production:** [https://fruit-design-academy.vercel.app/](https://fruit-design-academy.vercel.app/)

`web/data/courses.json` is **not** a durable database on serverless: admin edits may not persist across cold starts. For a stable public catalog on the demo, commit seed data in git or move to a real DB in Phase 2.

### CI vs Vercel

- **GitHub Actions** (`.github/workflows/ci.yml`) runs on push/PR: `lint`, `format:check`, `test`, `build`, Playwright smoke. It is your quality gate; it does not replace Vercel’s build.
- **Vercel** builds and hosts the app when you connect the repo. Keep CI green, then merge — Vercel deploys from the same commit.

### Scripts

```bash
npm run dev          # development server
npm run build        # production build
npm run start        # run production build
npm run lint         # ESLint
npm run test         # Vitest (unit tests)
npm run test:watch   # Vitest watch mode
```

## Mock authentication (demo)

Auth is **not** real security—it proves the flow and protects admin routes in demos.

1. Use **Admin login** or **Student login** in the header (or open `/login?next=/admin` / `/login?next=/dashboard`).
2. Choose **Admin** or **Student** and optional email; submit **Sign in (mock)**.
3. Session is stored in an **httpOnly cookie** (`fruit_mock_session`).
4. **Admin**: `/admin` and all `/api/admin/*` mutations require an admin session.
5. **Student**: `/dashboard` requires a student session.
6. **Sign out**: header link to `/logout` (clears cookie).

Replace this with **Supabase Auth** and server-side role checks before any real launch.

## Data and admin

- **Public**: `/courses`, `/courses/[slug]` (curriculum, preview vs locked labels; purchase is still mock).
- **Admin**: `/admin`, `/admin/courses`, create/edit course, **course outline** (modules + lessons). Saves to `web/data/courses.json` when running locally.
- **API**: Validated with **Zod**; admin writes return **401** without an admin cookie.

## Internationalization

Homepage supports **Hebrew** and **Arabic** via `?lang=he` and `?lang=ar` (RTL layout at root).

## CI

On push/PR to `main` or `master` (and **Run workflow** manually in the Actions tab), CI runs in `web/`: `npm ci`, `lint`, `format:check`, `test`, `build`, then Playwright **Chromium** smoke tests against `next start` on port **4173**.

## Deployment notes

- **Vercel**: app runs fine, but **filesystem writes** to `data/courses.json` are not a real database and may not persist across invocations. Use **Supabase** (or similar) for production data.
- Set `NODE_ENV=production` so auth cookies use `Secure` where appropriate.

## License

See repository `LICENSE` if present.
