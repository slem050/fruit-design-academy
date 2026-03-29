import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { AdminCourseForm } from "@/features/courses/components/admin-course-form";

export default function NewAdminCoursePage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <h1 className={pageTitle}>Create New Course</h1>
      <p className={pageLead}>
        This form validates with Zod and writes to the mock course repository.
      </p>
      <AdminCourseForm />
    </main>
  );
}
