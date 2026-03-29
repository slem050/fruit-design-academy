/**
 * Demo mode gates mock-only APIs (cookie auth, fixture-shaped responses).
 * Set `DEMO_MODE=false` in production when real providers are wired.
 *
 * Default: enabled in development, disabled in production (unless explicitly true).
 */
export function isDemoMode(): boolean {
  const explicit = process.env.DEMO_MODE ?? process.env.NEXT_PUBLIC_DEMO_MODE;
  if (explicit === "false") {
    return false;
  }
  if (explicit === "true") {
    return true;
  }
  return process.env.NODE_ENV !== "production";
}
