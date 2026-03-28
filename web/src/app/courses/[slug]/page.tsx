import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { findCourseBySlug } from "@/features/courses/repositories/course.repository";
import { canAccessLessonContent, lessonAccessLabel } from "@/features/courses/services/lesson-access.service";
import { getMockPurchaseState } from "@/features/payments/services/mock-purchase.service";

type CourseDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function CourseDetailsPage({ params }: CourseDetailsPageProps): Promise<ReactElement> {
  const { slug } = await params;
  const course = await findCourseBySlug(slug);

  if (!course) {
    notFound();
  }

  const hasPurchased = getMockPurchaseState() === "mock_purchased";

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-wide text-orange-700">{course.status}</p>
        <h1 className="text-3xl font-semibold">{course.title}</h1>
        <p className="text-neutral-700">{course.subtitle}</p>
      </header>

      <Card>
        <p className="leading-relaxed text-neutral-700">{course.description}</p>
        <p className="mt-4 font-semibold">${course.price}</p>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Curriculum</h2>
        <p className="text-sm text-neutral-600">
          Preview lessons are visible to everyone. Other lessons stay locked until purchase (mock purchase is not enabled yet).
        </p>

        {course.modules.length === 0 ? (
          <p className="text-sm text-neutral-600">No modules published for this course yet.</p>
        ) : (
          <div className="space-y-6">
            {course.modules.map((mod) => (
              <Card key={mod.id} className="space-y-3">
                <h3 className="text-lg font-semibold">{mod.title}</h3>
                <ul className="space-y-3">
                  {mod.lessons.map((lesson) => {
                    const canWatch = canAccessLessonContent({ isPreview: lesson.isPreview, hasPurchased });
                    const label = lessonAccessLabel({ isPreview: lesson.isPreview, hasPurchased });

                    return (
                      <li key={lesson.id} className="rounded-xl border border-orange-100 bg-orange-50/40 p-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="font-medium">{lesson.title}</p>
                          <Badge>
                            {label === "preview" ? "Preview" : label === "purchased" ? "Included" : "Locked"}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-neutral-700">{lesson.description}</p>
                        {lesson.duration > 0 ? (
                          <p className="mt-1 text-xs text-neutral-500">{Math.round(lesson.duration / 60)} min</p>
                        ) : null}
                        {canWatch && lesson.videoUrl ? (
                          <p className="mt-2 text-xs text-neutral-500 break-all">Video: {lesson.videoUrl}</p>
                        ) : null}
                        {!canWatch ? (
                          <p className="mt-2 text-sm text-orange-800">Purchase the course to unlock this lesson.</p>
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
        חזרה לקטלוג
      </Link>
    </main>
  );
}
