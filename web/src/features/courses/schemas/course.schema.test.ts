import { describe, expect, it } from "vitest";

import { updateOutlineBodySchema } from "@/features/courses/schemas/course.schema";

describe("updateOutlineBodySchema", () => {
  it("accepts a valid outline payload", () => {
    const parsed = updateOutlineBodySchema.safeParse({
      modules: [
        {
          id: "m-1",
          title: "Basics",
          order: 0,
          lessons: [
            {
              id: "l-1",
              title: "Intro",
              description: "Hello",
              videoUrl: "",
              isPreview: true,
              order: 0,
              duration: 10
            }
          ]
        }
      ]
    });
    expect(parsed.success).toBe(true);
  });

  it("rejects empty module title", () => {
    const parsed = updateOutlineBodySchema.safeParse({
      modules: [{ id: "m-1", title: "", order: 0, lessons: [] }]
    });
    expect(parsed.success).toBe(false);
  });
});
