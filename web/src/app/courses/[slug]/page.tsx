import type { ReactElement } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Card } from "@/components/ui/card";
import { findCourseBySlug } from "@/features/courses/repositories/course.repository";

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

      <Link href="/courses" className="text-sm font-semibold text-orange-700 hover:underline">
        חזרה לקטלוג
      </Link>
    </main>
  );
}
