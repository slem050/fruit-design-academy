import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";

export default function AdminPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <h1 className={pageTitle}>Admin Dashboard (Mock)</h1>
      <p className={pageLead}>Manage courses and demo content from this panel.</p>
      <div>
        <Link
          href="/admin/courses"
          className="inline-flex min-h-10 w-full items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white sm:w-auto"
        >
          Manage courses
        </Link>
      </div>
    </main>
  );
}
