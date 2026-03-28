import type { Course, CourseModule, Lesson } from "@/features/courses/types/course";

export function normalizeStoredCourse(course: Course): Course {
  const modules: CourseModule[] = [...(course.modules ?? [])]
    .sort((a, b) => a.order - b.order)
    .map((mod) => ({
      ...mod,
      courseId: course.id,
      lessons: [...mod.lessons]
        .sort((a, b) => a.order - b.order)
        .map(
          (les): Lesson => ({
            ...les,
            moduleId: mod.id,
            duration: les.duration ?? 0
          })
        )
    }));

  return { ...course, modules };
}
