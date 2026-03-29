# Fruit Design Academy — Web App

Next.js (App Router) frontend and API routes for the Fruit Design Academy platform.

**Production:** [fruit-design-academy.vercel.app](https://fruit-design-academy.vercel.app/)

## Commands

```bash
npm install
npm run dev
npm run lint
npm run format:check
npm run test
npm run build
```

After installing dependencies, download Playwright’s browser once:

```bash
npx playwright install chromium
```

End-to-end smoke tests use a production server on port **4173** (see `playwright.config.ts`):

```bash
npm run build
npm run test:e2e
```

## Cursor — before the next assigned step

See repo root [CURSOR_STEP_GATE.md](../CURSOR_STEP_GATE.md) (lint, test, build, review, tests, improvements).

## Key paths

- `src/app/` — routes (public, `/admin`, `/login`, `/dashboard`, API)
- `src/features/` — domain modules (`courses`, `auth` schemas/components)
- `src/server/auth/` — mock session cookie codec, admin guard for APIs
- `data/courses.json` — local course database (seed + admin edits). Optional `localization.he|ar|en` mirrors the default English fields and module/lesson copy by id; public pages merge the active locale over the base record.

## Demo mode and real APIs

- **`DEMO_MODE`** / **`NEXT_PUBLIC_DEMO_MODE`**: when demo mode is on (default in local dev; off in production unless you set `DEMO_MODE=true`), `POST /api/auth/mock/login` is allowed and `POST /api/contact` returns a mock payload merged with optional fields from `data/demo-api-fixtures.json`.
- Set **`DEMO_MODE=false`** in production when you replace mocks with real auth and intake.
- **`CONTACT_FORWARD_URL`**: when demo mode is **off**, a successful validation can be forwarded to this HTTPS endpoint as JSON instead of returning `501`.

Copy **`web/.env.example`** to **`.env.local`** and adjust.

## Mock auth cookie

`POST /api/auth/mock/login` sets `fruit_mock_session`. Admin APIs use `requireMockAdmin`. The root README describes the full product and deployment notes.

## Deploy (Vercel)

In the Vercel project settings, set **Root Directory** to **`web`**. Add **`DEMO_MODE=true`** for production/preview so mock login works (see **Demo mode** above). Full checklist: repo root **`README.md`** → _Deploy to Vercel_.

## Translations (extensible)

UI strings live in **`src/features/i18n/messages/{he,ar,en}.json`** (`chrome`, `home`, `login`, `courses`, `about`, `contact`). Use **`createTranslator(locale)`** from `src/features/i18n/messages/translator.ts`. Missing keys fall back to English. Add a locale by adding `xx.json`, extending the `Language` type, and updating middleware / `locale` API / language switcher.
