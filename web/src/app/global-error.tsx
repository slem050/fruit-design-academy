"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import { useEffect } from "react";

import messages from "@/features/i18n/messages/en.json";

const err = messages.errors;

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: GlobalErrorProps): ReactElement {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="m-0 min-h-screen bg-[#fffaf5] p-6 text-[#2f2a24]">
        <h1 className="text-2xl font-semibold">{err.boundaryTitle}</h1>
        <p className="mt-2 max-w-prose text-sm text-neutral-700">{err.boundaryBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white"
          >
            {err.tryAgain}
          </button>
          <Link
            href="/"
            className="rounded-full border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-800"
          >
            {err.boundaryHome}
          </Link>
        </div>
      </body>
    </html>
  );
}
