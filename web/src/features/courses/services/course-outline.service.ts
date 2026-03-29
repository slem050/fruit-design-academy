import type { z } from "zod";

import { moduleOutlineSchema } from "@/features/courses/schemas/course.schema";
import type { CourseModule } from "@/features/courses/types/course";

export type ModuleOutline = z.infer<typeof moduleOutlineSchema>;

export function buildModulesFromOutline(
  courseId: string,
  modules: ModuleOutline[]
): CourseModule[] {
  return [...modules]
    .sort((a, b) => a.order - b.order)
    .map((mod) => ({
      id: mod.id,
      courseId,
      title: mod.title,
      order: mod.order,
      lessons: [...mod.lessons]
        .sort((a, b) => a.order - b.order)
        .map((lesson) => ({
          id: lesson.id,
          moduleId: mod.id,
          title: lesson.title,
          description: lesson.description,
          videoUrl: lesson.videoUrl,
          isPreview: lesson.isPreview,
          order: lesson.order,
          duration: lesson.duration
        }))
    }));
}
