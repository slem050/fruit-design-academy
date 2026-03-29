import { describe, expect, it } from "vitest";

import {
  findLessonInCourse,
  getFirstLessonInCourse
} from "@/features/courses/services/course-lesson.service";
import type { Course } from "@/features/courses/types/course";

const sampleCourse: Course = {
  id: "c",
  title: "T",
  slug: "t",
  subtitle: "",
  description: "",
  marketingText: "",
  price: 0,
  status: "published",
  thumbnailUrl: "",
  isFeatured: false,
  createdAt: "",
  updatedAt: "",
  modules: [
    {
      id: "m2",
      courseId: "c",
      title: "Second",
      order: 1,
      lessons: [
        {
          id: "l-b",
          moduleId: "m2",
          title: "B",
          description: "",
          videoUrl: "",
          isPreview: false,
          order: 0,
          duration: 0
        }
      ]
    },
    {
      id: "m1",
      courseId: "c",
      title: "First",
      order: 0,
      lessons: [
        {
          id: "l-a",
          moduleId: "m1",
          title: "A",
          description: "",
          videoUrl: "",
          isPreview: true,
          order: 1,
          duration: 0
        },
        {
          id: "l-z",
          moduleId: "m1",
          title: "Z",
          description: "",
          videoUrl: "",
          isPreview: false,
          order: 0,
          duration: 0
        }
      ]
    }
  ]
};

describe("findLessonInCourse", () => {
  it("returns module and lesson when id exists", () => {
    const found = findLessonInCourse(sampleCourse, "l-a");
    expect(found?.lesson.title).toBe("A");
    expect(found?.module.id).toBe("m1");
  });

  it("returns null when missing", () => {
    expect(findLessonInCourse(sampleCourse, "nope")).toBeNull();
  });
});

describe("getFirstLessonInCourse", () => {
  it("returns lowest module order then lowest lesson order", () => {
    const first = getFirstLessonInCourse(sampleCourse);
    expect(first?.id).toBe("l-z");
  });

  it("returns null when no lessons", () => {
    const empty: Course = { ...sampleCourse, modules: [] };
    expect(getFirstLessonInCourse(empty)).toBeNull();
  });
});
