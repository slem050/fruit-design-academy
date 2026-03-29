import Link from "next/link";
import type { ReactElement } from "react";

import { pageShell, pageTitle } from "@/components/layout/page-container";
import { listCourses } from "@/features/courses/repositories/course.repository";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage(): Promise<ReactElement> {
  const courses = await listCourses();

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className={pageTitle}>Admin Courses</h1>
        <Link
          href="/admin/courses/new"
          className="inline-flex min-h-10 w-full shrink-0 items-center justify-center rounded-full bg-orange-500 px-5 py-2.5 text-center text-sm font-semibold text-white sm:w-auto"
        >
          New course
        </Link>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <div className="inline-block min-w-full overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm sm:rounded-3xl">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-orange-50">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="border-t border-orange-100">
                <td className="px-4 py-3">{course.title}</td>
                <td className="px-4 py-3">{course.slug}</td>
                <td className="px-4 py-3">{course.status}</td>
                <td className="px-4 py-3">${course.price}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/courses/${course.id}/edit`} className="font-semibold text-orange-700 hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </main>
  );
}
