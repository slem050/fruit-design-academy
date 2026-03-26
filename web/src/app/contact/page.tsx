import Link from "next/link";
import type { ReactElement } from "react";

export default function ContactPage(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-12">
      <header>
        <p className="text-sm text-orange-700">Contact</p>
        <h1 className="mt-2 text-3xl font-semibold">יצירת קשר</h1>
        <p className="mt-3 text-neutral-700">טופס יצירת קשר יתווסף בשלב הבא עם React Hook Form + Zod.</p>
      </header>
      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
