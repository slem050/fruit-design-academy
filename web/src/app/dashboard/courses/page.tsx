import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { listCourses } from "@/features/courses/repositories/course.repository";
import { getFirstLessonInCourse } from "@/features/courses/services/course-lesson.service";
import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export const dynamic = "force-dynamic";

export default async function DashboardCoursesPage(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);
  const courses = await listCourses();
  const published = courses.filter((course) => course.status === "published");

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <Badge>Student</Badge>
        <h1 className={pageTitle}>{t("courses.dashboardTitle")}</h1>
        <p className={pageLead}>{t("courses.dashboardLead")}</p>
      </header>

      {published.length === 0 ? (
        <Card className="p-6">
          <p className="text-sm text-neutral-700">{t("courses.dashboardEmpty")}</p>
          <Link href="/courses" className="mt-4 inline-block text-sm font-semibold text-orange-700 hover:underline">
            {t("courses.dashboardBrowse")}
          </Link>
        </Card>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {published.map((raw) => {
            const course = applyCourseLocalization(raw, language);
            const first = getFirstLessonInCourse(raw);
            const statusLabel = course.status === "draft" ? t("courses.statusDraft") : t("courses.statusPublished");
            return (
              <li key={course.id}>
                <Card className="h-full p-5">
                  <p className="text-xs uppercase tracking-wide text-orange-700">{statusLabel}</p>
                  <h2 className="mt-1 text-lg font-semibold sm:text-xl">{course.title}</h2>
                  <p className="mt-2 text-sm text-neutral-600">{course.subtitle}</p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="text-sm font-semibold text-orange-700 hover:underline"
                    >
                      {t("courses.dashboardOverview")}
                    </Link>
                    {first ? (
                      <Link
                        href={`/courses/${course.slug}/lesson/${first.id}`}
                        className="text-sm font-semibold text-orange-800 hover:underline"
                      >
                        {t("courses.dashboardResume")}
                      </Link>
                    ) : null}
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}

      <Link href="/dashboard" className="text-sm font-semibold text-orange-700 hover:underline">
        {t("courses.dashboardBack")}
      </Link>
    </main>
  );
}
