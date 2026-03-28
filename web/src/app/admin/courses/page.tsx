import Link from "next/link";
import type { ReactElement } from "react";

import { listCourses } from "@/features/courses/repositories/course.repository";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage(): Promise<ReactElement> {
  const courses = await listCourses();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-6 py-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Admin Courses</h1>
        <Link href="/admin/courses/new" className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white">
          New course
        </Link>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-orange-100 bg-white shadow-sm">
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
    </main>
  );
}
