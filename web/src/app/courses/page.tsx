import Link from "next/link";
import type { ReactElement } from "react";

import { pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { listCourses } from "@/features/courses/repositories/course.repository";
import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export const dynamic = "force-dynamic";

export default async function CoursesPage(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t, format } = createTranslator(language);
  const rows = await listCourses();

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header>
        <Badge>{t("courses.catalogBadge")}</Badge>
        <p className="text-xs text-orange-700 sm:text-sm">{t("courses.catalogEyebrow")}</p>
        <h1 className={`${pageTitle} mt-2`}>{t("courses.catalogTitle")}</h1>
      </header>

      {rows.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-neutral-700">{t("courses.catalogEmpty")}</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {rows.map((raw) => {
            const course = applyCourseLocalization(raw, language);
            const statusLabel =
              course.status === "draft" ? t("courses.statusDraft") : t("courses.statusPublished");
            return (
              <Card key={course.id}>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wide text-orange-700">{statusLabel}</p>
                  <h2 className="text-lg font-semibold sm:text-xl">{course.title}</h2>
                  <p className="text-sm text-neutral-600">{course.subtitle}</p>
                  <p className="text-sm text-neutral-700">{course.marketingText}</p>
                  <p className="font-semibold">
                    {format("courses.priceDisplay", { price: String(course.price) })}
                  </p>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="text-sm font-semibold text-orange-700 hover:underline"
                  >
                    {t("courses.viewDetails")}
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        {t("courses.backHome")}
      </Link>
    </main>
  );
}
