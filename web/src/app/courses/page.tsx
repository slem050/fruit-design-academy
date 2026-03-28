import Link from "next/link";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { listCourses } from "@/features/courses/repositories/course.repository";

export const dynamic = "force-dynamic";

export default async function CoursesPage(): Promise<ReactElement> {
  const courses = await listCourses();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <header>
        <Badge>Courses</Badge>
        <p className="text-sm text-orange-700">Courses</p>
        <h1 className="mt-2 text-3xl font-semibold">קטלוג קורסים (בקרוב)</h1>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <Card key={course.id}>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-wide text-orange-700">{course.status}</p>
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-neutral-600">{course.subtitle}</p>
              <p className="text-sm text-neutral-700">{course.marketingText}</p>
              <p className="font-semibold">${course.price}</p>
              <Link href={`/courses/${course.slug}`} className="text-sm font-semibold text-orange-700 hover:underline">
                לצפייה בפרטי הקורס
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
