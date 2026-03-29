import { notFound } from "next/navigation";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { AdminCourseEditForm } from "@/features/courses/components/admin-course-edit-form";
import { AdminCourseOutlineForm } from "@/features/courses/components/admin-course-outline-form";
import { findCourseById } from "@/features/courses/repositories/course.repository";

type EditCoursePageProps = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function EditAdminCoursePage({
  params
}: EditCoursePageProps): Promise<ReactElement> {
  const { id } = await params;
  const course = await findCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <main className={`${pageShell} flex flex-col gap-8 sm:gap-10`}>
      <h1 className={pageTitle}>Edit course</h1>
      <p className={pageLead}>
        Changes are saved to the local data file (web/data/courses.json). Serverless hosts do not
        persist filesystem writes; use a real database for production.
      </p>
      <AdminCourseEditForm course={course} />
      <AdminCourseOutlineForm courseId={course.id} initialModules={course.modules} />
    </main>
  );
}
