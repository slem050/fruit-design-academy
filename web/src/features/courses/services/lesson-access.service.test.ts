import { describe, expect, it } from "vitest";

import { canAccessLessonContent, lessonAccessLabel } from "@/features/courses/services/lesson-access.service";

describe("lesson-access.service", () => {
  it("allows preview lessons without purchase", () => {
    expect(canAccessLessonContent({ isPreview: true, hasPurchased: false })).toBe(true);
  });

  it("denies non-preview lessons without purchase", () => {
    expect(canAccessLessonContent({ isPreview: false, hasPurchased: false })).toBe(false);
  });

  it("allows full catalog after purchase", () => {
    expect(canAccessLessonContent({ isPreview: false, hasPurchased: true })).toBe(true);
  });

  it("labels access states", () => {
    expect(lessonAccessLabel({ isPreview: true, hasPurchased: false })).toBe("preview");
    expect(lessonAccessLabel({ isPreview: false, hasPurchased: false })).toBe("locked");
    expect(lessonAccessLabel({ isPreview: false, hasPurchased: true })).toBe("purchased");
  });
});
