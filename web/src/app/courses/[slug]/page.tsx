import Link from "next/link";
import type { ReactElement } from "react";
import { notFound } from "next/navigation";

import { pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { findCourseBySlug } from "@/features/courses/repositories/course.repository";
import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import { canAccessLessonContent, lessonAccessLabel } from "@/features/courses/services/lesson-access.service";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import { getStudentMockHasFullCourseAccess } from "@/features/payments/services/mock-purchase.service";

type CourseDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const raw = await findCourseBySlug(slug);

  if (!raw) {
    notFound();
  }

  const language = await getLocaleFromHeaders();
  const { t, format } = createTranslator(language);
  const course = applyCourseLocalization(raw, language);
  const hasPurchased = await getStudentMockHasFullCourseAccess();
  const statusLabel = course.status === "draft" ? t("courses.statusDraft") : t("courses.statusPublished");

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-orange-700">{statusLabel}</p>
        <h1 className={pageTitle}>{course.title}</h1>
        <p className="text-sm text-neutral-700 sm:text-base">{course.subtitle}</p>
      </header>

      <Card>
        <p className="leading-relaxed text-neutral-700">{course.description}</p>
        <p className="mt-4 font-semibold">{format("courses.priceDisplay", { price: String(course.price) })}</p>
      </Card>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold sm:text-2xl">{t("courses.detailCurriculum")}</h2>
        <p className="text-xs text-neutral-600 sm:text-sm">{t("courses.detailCurriculumHint")}</p>

        {course.modules.length === 0 ? (
          <p className="text-sm text-neutral-600">{t("courses.detailNoModules")}</p>
        ) : (
          <div className="space-y-6">
            {course.modules.map((mod) => (
              <Card key={mod.id} className="space-y-3">
                <h3 className="text-lg font-semibold">{mod.title}</h3>
                <ul className="space-y-3">
                  {mod.lessons.map((lesson) => {
                    const canWatch = canAccessLessonContent({ isPreview: lesson.isPreview, hasPurchased });
                    const label = lessonAccessLabel({ isPreview: lesson.isPreview, hasPurchased });
                    const badgeText =
                      label === "preview"
                        ? t("courses.lessonPreview")
                        : label === "purchased"
                          ? t("courses.lessonIncluded")
                          : t("courses.lessonLocked");

                    return (
                      <li key={lesson.id} className="rounded-xl border border-orange-100 bg-orange-50/40 p-3">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
                          <p className="min-w-0 flex-1 font-medium">{lesson.title}</p>
                          <Badge>{badgeText}</Badge>
                        </div>
                        <p className="mt-1 text-sm text-neutral-700">{lesson.description}</p>
                        {lesson.duration > 0 ? (
                          <p className="mt-1 text-xs text-neutral-500">
                            {format("courses.minutesShort", { n: String(Math.round(lesson.duration / 60)) })}
                          </p>
                        ) : null}
                        {canWatch ? (
                          <Link
                            href={`/courses/${course.slug}/lesson/${lesson.id}`}
                            className="mt-2 inline-block text-sm font-semibold text-orange-700 hover:underline"
                          >
                            {t("courses.openLesson")}
                          </Link>
                        ) : null}
                        {!canWatch ? (
                          <p className="mt-2 text-sm text-orange-800">{t("courses.unlockPrompt")}</p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Link href="/courses" className="text-sm font-semibold text-orange-700 hover:underline">
        {t("courses.backCatalog")}
      </Link>
    </main>
  );
}
