import Link from "next/link";
import type { ReactElement } from "react";

export default function CoursesPage(): ReactElement {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-12">
      <header>
        <p className="text-sm text-orange-700">Courses</p>
        <h1 className="mt-2 text-3xl font-semibold">קטלוג קורסים (בקרוב)</h1>
        <p className="mt-3 text-neutral-700">
          כאן יוצג קטלוג הקורסים עם נתוני דמו. בינתיים זה מקום שמור לעיצוב ולמבנה הניווט.
        </p>
      </header>
      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
