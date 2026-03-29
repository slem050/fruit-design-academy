import Link from "next/link";
import type { ReactElement } from "react";
import { notFound, redirect } from "next/navigation";

import { pageShell, pageTitle } from "@/components/layout/page-container";
import { LessonVideoEmbed } from "@/features/courses/components/lesson-video-embed";
import { findCourseBySlug } from "@/features/courses/repositories/course.repository";
import { findLessonInCourse } from "@/features/courses/services/course-lesson.service";
import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import { canAccessLessonContent } from "@/features/courses/services/lesson-access.service";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import { getStudentMockHasFullCourseAccess } from "@/features/payments/services/mock-purchase.service";

type LessonPageProps = {
  params: Promise<{ slug: string; lessonId: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseLessonPage({ params }: LessonPageProps): Promise<ReactElement> {
  const { slug, lessonId } = await params;
  const raw = await findCourseBySlug(slug);

  if (!raw) {
    notFound();
  }

  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);
  const course = applyCourseLocalization(raw, language);

  const located = findLessonInCourse(course, lessonId);
  if (!located) {
    notFound();
  }

  const hasPurchased = await getStudentMockHasFullCourseAccess();
  const canWatch = canAccessLessonContent({ isPreview: located.lesson.isPreview, hasPurchased });

  if (!canWatch) {
    redirect(`/courses/${course.slug}`);
  }

  const { lesson, module } = located;

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <nav className="text-xs text-neutral-600 sm:text-sm">
        <Link href="/courses" className="font-medium text-orange-700 hover:underline">
          {t("courses.lessonBreadcrumbCourses")}
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <Link
          href={`/courses/${course.slug}`}
          className="font-medium text-orange-700 hover:underline"
        >
          {course.title}
        </Link>
        <span className="mx-2 text-neutral-400">/</span>
        <span className="text-neutral-800">{lesson.title}</span>
      </nav>

      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-orange-700">{module.title}</p>
        <h1 className={pageTitle}>{lesson.title}</h1>
        {lesson.description ? (
          <p className="text-sm text-neutral-700 sm:text-base">{lesson.description}</p>
        ) : null}
      </header>

      {lesson.videoUrl ? (
        <LessonVideoEmbed videoUrl={lesson.videoUrl} />
      ) : (
        <p className="text-sm text-neutral-600">{t("courses.lessonNoVideo")}</p>
      )}
    </main>
  );
}
