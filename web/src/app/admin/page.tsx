import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";

export default function AdminPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <h1 className={pageTitle}>Admin Dashboard (Mock)</h1>
      <p className={pageLead}>
        Use the navigation above for courses, media placeholders, and mock purchases. This overview
        stays for quick context.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/admin/courses"
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Manage courses
        </Link>
        <Link
          href="/admin/media"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-800 hover:bg-orange-50"
        >
          Media (mock)
        </Link>
        <Link
          href="/admin/purchases"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-800 hover:bg-orange-50"
        >
          Purchases (mock)
        </Link>
      </div>
    </main>
  );
}
