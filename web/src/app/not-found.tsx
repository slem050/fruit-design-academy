import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export default async function NotFound(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">404</p>
        <h1 className={pageTitle}>{t("errors.notFoundTitle")}</h1>
        <p className={pageLead}>{t("errors.notFoundBody")}</p>
      </header>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <Link
          href="/"
          className="inline-flex min-h-10 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600"
        >
          {t("errors.notFoundHome")}
        </Link>
        <Link
          href="/courses"
          className="inline-flex min-h-10 items-center justify-center rounded-full border border-orange-200 px-5 py-2.5 text-sm font-semibold text-orange-800 hover:bg-orange-50"
        >
          {t("errors.notFoundCourses")}
        </Link>
      </div>
    </main>
  );
}
