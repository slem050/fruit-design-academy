# Fruit Design Academy

A **presentation-first** course platform for fruit design: public catalog, curriculum with preview vs locked lessons, **mock admin auth**, file-backed course data for local demos, and CI (lint, tests, build).

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

On push/PR to `main` or `master`, CI runs in `web/`: `npm ci`, `npm run lint`, `npm run test`, `npm run build`.

## Deployment notes

- **Vercel**: app runs fine, but **filesystem writes** to `data/courses.json` are not a real database and may not persist across invocations. Use **Supabase** (or similar) for production data.
- Set `NODE_ENV=production` so auth cookies use `Secure` where appropriate.

## License

See repository `LICENSE` if present.
