import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { AdminCourseEditForm } from "@/features/courses/components/admin-course-edit-form";
import { findCourseById } from "@/features/courses/repositories/course.repository";

type EditCoursePageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditAdminCoursePage({ params }: EditCoursePageProps): Promise<ReactElement> {
  const { id } = await params;
  const course = await findCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <h1 className="text-3xl font-semibold">Edit course</h1>
      <p className="text-neutral-700">
        Changes are saved to the local data file (web/data/courses.json). Serverless hosts do not persist filesystem writes; use a real database for production.
      </p>
      <AdminCourseEditForm course={course} />
    </main>
  );
}
