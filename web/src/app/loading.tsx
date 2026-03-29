import type { ReactElement } from "react";

import { pageShell } from "@/components/layout/page-container";

export default function Loading(): ReactElement {
  return (
    <main className={`${pageShell} animate-pulse`} aria-busy="true" aria-label="Loading">
      <div className="h-8 w-40 rounded-lg bg-orange-100 sm:h-10 sm:w-56" />
      <div className="mt-8 h-36 rounded-2xl bg-neutral-100 sm:h-40" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="h-48 rounded-2xl bg-neutral-100" />
        <div className="h-48 rounded-2xl bg-neutral-100" />
      </div>
    </main>
  );
}
