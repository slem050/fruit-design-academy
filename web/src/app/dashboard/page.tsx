import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { getMockSessionForServer } from "@/server/auth/mock-session.server";

export default async function DashboardPage(): Promise<ReactElement> {
  const session = await getMockSessionForServer();

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <h1 className={pageTitle}>Student dashboard</h1>
      <p className={pageLead}>
        Signed in as {session.email ?? "student"} (mock). Your demo includes access to all published courses; open the
        lesson player from the catalog or from My courses.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link href="/dashboard/courses" className="text-sm font-semibold text-orange-800 hover:underline">
          My courses
        </Link>
        <Link href="/courses" className="text-sm font-semibold text-orange-700 hover:underline">
          Browse catalog
        </Link>
      </div>
    </main>
  );
}
