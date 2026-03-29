/**
 * Shared layout tokens (WEB-015) — consistent spacing, min-width for flex overflow, touch-friendly rhythm.
 */
export const pageMax = "mx-auto w-full max-w-5xl min-w-0";

export const pagePadX = "px-4 sm:px-6";

export const pagePadY = "py-8 sm:py-10 lg:py-12";

/** Standard `<main>` shell for public, auth, and admin pages */
export const pageShell = `${pageMax} ${pagePadX} ${pagePadY}`;

/** Header / footer horizontal alignment with `<main>` */
export const headerShell = `${pageMax} ${pagePadX}`;

export const footerShell = `${pageMax} ${pagePadX}`;

export const pageTitle = "text-2xl font-semibold leading-tight sm:text-3xl";

export const pageLead = "text-sm text-neutral-700 sm:text-base";
