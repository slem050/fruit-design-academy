"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useEffect } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import messages from "@/features/i18n/messages/en.json";

const err = messages.errors;

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps): ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <h1 className={pageTitle}>{err.boundaryTitle}</h1>
        <p className={pageLead}>{err.boundaryBody}</p>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          {err.tryAgain}
        </button>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-800 hover:bg-orange-50"
        >
          {err.boundaryHome}
        </Link>
      </div>
    </main>
  );
}
