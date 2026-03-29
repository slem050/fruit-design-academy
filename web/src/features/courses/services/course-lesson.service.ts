import type { Course, CourseModule, Lesson } from "@/features/courses/types/course";

export type LocatedLesson = {
  module: CourseModule;
  lesson: Lesson;
};

export function findLessonInCourse(course: Course, lessonId: string): LocatedLesson | null {
  for (const courseModule of course.modules) {
    const lesson = courseModule.lessons.find((item) => item.id === lessonId);
    if (lesson) {
      return { module: courseModule, lesson };
    }
  }
  return null;
}

export function getFirstLessonInCourse(course: Course): Lesson | null {
  const modules = [...course.modules].sort((a, b) => a.order - b.order);
  for (const courseModule of modules) {
    const lessons = [...courseModule.lessons].sort((a, b) => a.order - b.order);
    if (lessons[0]) {
      return lessons[0];
    }
  }
  return null;
}
