import type { ReactElement } from "react";

import { AdminCourseForm } from "@/features/courses/components/admin-course-form";

export default function NewAdminCoursePage(): ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <h1 className="text-3xl font-semibold">Create New Course</h1>
      <p className="text-neutral-700">This form validates with Zod and writes to the mock course repository.</p>
      <AdminCourseForm />
    </main>
  );
}
