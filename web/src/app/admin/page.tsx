import Link from "next/link";
import type { ReactElement } from "react";

export default function AdminPage(): ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <h1 className="text-3xl font-semibold">Admin Dashboard (Mock)</h1>
      <p className="text-neutral-700">Manage courses and demo content from this panel.</p>
      <div className="flex gap-3">
        <Link href="/admin/courses" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white">
          Manage courses
        </Link>
      </div>
    </main>
  );
}
