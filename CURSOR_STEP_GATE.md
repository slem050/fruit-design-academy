# Cursor agent — gate before the next assigned step

Use this **every time** you finish work on a **stage or sub-task** from `docs/05-development-checklist.md` (and the epics we agreed). Do **not** start the next checklist item until this gate is complete.

## When this applies

- After completing any **Stage 2–7** item (or a coherent chunk of work under that stage).
- After any change that touches **auth, payments, course data, or admin APIs**.
- Before telling the user the step is “done” or moving on to the **next** step they assigned.

## 1. Review the changes you made

Briefly re-read the diff and behavior.

- **Matches the assigned step?** No extra scope unless the user asked for it.
- **Layers:** UI vs `services` vs `repositories` / route handlers — no business logic stuck in the wrong place; no `any` on exported contracts.
- **Validation:** Forms and API bodies validated with Zod where input enters the system.
- **Security:** Protected routes and `/api/admin/*` mutations still enforce **server-side** checks (mock or real).
- **UX:** Sensible empty / error handling for what you touched; RTL/i18n if that surface is bilingual.
- **Data:** `web/data/courses.json` or types — shape still valid; migrations or defaults if old files exist.

Summarize in your **reply to the user**: what changed, any risks, and anything you did **not** do on purpose.

## 2. Run checks (required)

From `web/`:

```bash
npm run lint
npm run test
npm run build
```

Fix all failures before proceeding. This matches CI.

## 3. Tests — add or justify skip

- Add **unit tests** (`*.test.ts`) when you change **rules, schemas, codecs, or repository behavior**.
- For **schema changes**, include at least one **invalid** payload case where it matters.
- If a step truly needs **no** new tests, state **one line why** in your summary to the user.

## 4. Improvements pass (code and tests)

Spend a short pass on **quality**, not large refactors.

**Code:** duplication, unclear errors, weak types, missing `revalidatePath` / dynamic where data is file-backed, accessibility gaps.

**Tests:** weak assertions, missing edge cases (empty list, 401, conflict).

Either fix small items now or list **follow-ups** explicitly for the user.

## 5. Only then advance the roadmap

- Update **`docs/05-development-checklist.md`** checkboxes for completed items (local file; keep it accurate).
- In your message to the user: **gate complete** (lint / test / build), **review summary**, **tests added or skipped (why)**, **follow-ups**.

This document is the **canonical** instruction for Cursor on this repo. Humans can read it too, but it is written for **agent workflow** on **our assigned steps**, not for external contributors.

**Duplicate (local / optional in git):** the same gate text plus **WEB-*** task IDs lives in **`docs/07-cursor-tasks.md`**. If the two differ, **this file wins**.
