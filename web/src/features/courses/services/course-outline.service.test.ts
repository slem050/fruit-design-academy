import { describe, expect, it } from "vitest";

import { buildModulesFromOutline } from "@/features/courses/services/course-outline.service";

describe("course-outline.service", () => {
  it("normalizes order and attaches course and module ids", () => {
    const courseId = "course-1";
    const modules = buildModulesFromOutline(courseId, [
      {
        id: "mod-b",
        title: "Second",
        order: 1,
        lessons: [
          { id: "les-2", title: "L2", description: "", videoUrl: "", isPreview: false, order: 1, duration: 60 },
          { id: "les-1", title: "L1", description: "", videoUrl: "", isPreview: true, order: 0, duration: 30 }
        ]
      },
      {
        id: "mod-a",
        title: "First",
        order: 0,
        lessons: []
      }
    ]);

    expect(modules.map((m) => m.id)).toEqual(["mod-a", "mod-b"]);
    expect(modules[1].lessons.map((l) => l.id)).toEqual(["les-1", "les-2"]);
    expect(modules[1].lessons.every((l) => l.moduleId === "mod-b")).toBe(true);
    expect(modules.every((m) => m.courseId === courseId)).toBe(true);
  });
});
