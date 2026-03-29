import type { Course, CourseModule, Lesson } from "@/features/courses/types/course";
import type { Language } from "@/features/i18n/types/language";

function pickString(override: string | undefined, base: string): string {
  const trimmed = override?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : base;
}

export function applyCourseLocalization(course: Course, language: Language): Course {
  const block = course.localization?.[language];
  if (!block) {
    return course;
  }

  const modules: CourseModule[] = course.modules.map((mod) => {
    const modBlock = block.modules?.[mod.id];
    const lessons: Lesson[] = mod.lessons.map((lesson) => {
      const lessonBlock = modBlock?.lessons?.[lesson.id];
      return {
        ...lesson,
        title: pickString(lessonBlock?.title, lesson.title),
        description: pickString(lessonBlock?.description, lesson.description)
      };
    });
    return {
      ...mod,
      title: pickString(modBlock?.title, mod.title),
      lessons
    };
  });

  return {
    ...course,
    title: pickString(block.title, course.title),
    subtitle: pickString(block.subtitle, course.subtitle),
    description: pickString(block.description, course.description),
    marketingText: pickString(block.marketingText, course.marketingText),
    modules
  };
}
