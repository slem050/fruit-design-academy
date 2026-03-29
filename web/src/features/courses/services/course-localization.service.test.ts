import { describe, expect, it } from "vitest";

import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import type { Course } from "@/features/courses/types/course";

const baseCourse: Course = {
  id: "c",
  title: "English title",
  slug: "slug",
  subtitle: "English sub",
  description: "English desc",
  marketingText: "English mkt",
  price: 10,
  status: "published",
  thumbnailUrl: "https://example.com/x.jpg",
  isFeatured: false,
  createdAt: "",
  updatedAt: "",
  modules: [
    {
      id: "m1",
      courseId: "c",
      title: "Mod EN",
      order: 0,
      lessons: [
        {
          id: "l1",
          moduleId: "m1",
          title: "Les EN",
          description: "Les desc EN",
          videoUrl: "",
          isPreview: true,
          order: 0,
          duration: 0
        }
      ]
    }
  ],
  localization: {
    he: {
      title: "כותרת",
      modules: {
        m1: {
          title: "מודול",
          lessons: {
            l1: { title: "שיעור", description: "תיאור" }
          }
        }
      }
    }
  }
};

describe("applyCourseLocalization", () => {
  it("returns same course when locale block missing", () => {
    const out = applyCourseLocalization(baseCourse, "ar");
    expect(out.title).toBe("English title");
  });

  it("merges strings for a configured locale", () => {
    const out = applyCourseLocalization(baseCourse, "he");
    expect(out.title).toBe("כותרת");
    expect(out.subtitle).toBe("English sub");
    expect(out.modules[0]?.title).toBe("מודול");
    expect(out.modules[0]?.lessons[0]?.title).toBe("שיעור");
    expect(out.modules[0]?.lessons[0]?.description).toBe("תיאור");
  });
});
