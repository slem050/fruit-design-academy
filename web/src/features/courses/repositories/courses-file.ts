import { promises as fs } from "node:fs";
import path from "node:path";

import { coursesFileSchema } from "@/features/courses/schemas/course.schema";
import { normalizeStoredCourse } from "@/features/courses/services/course-normalize.service";
import type { Course } from "@/features/courses/types/course";

const DATA_DIR = path.join(process.cwd(), "data");
const COURSES_PATH = path.join(DATA_DIR, "courses.json");

const defaultCourses: Course[] = [
  {
    id: "c-1",
    title: "Elegant Fruit Tray Design",
    slug: "elegant-fruit-tray-design",
    subtitle: "Learn premium tray composition for events",
    description:
      "A complete starter course for designing elegant fruit trays for weddings and private events.",
    marketingText: "Start creating premium fruit trays with confidence.",
    price: 149,
    status: "published",
    thumbnailUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
    isFeatured: true,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    modules: [
      {
        id: "m-1",
        courseId: "c-1",
        title: "Foundations",
        order: 0,
        lessons: [
          {
            id: "l-1",
            moduleId: "m-1",
            title: "Welcome and tools",
            description: "Meet the instructor and learn the essential tools for fruit presentation.",
            videoUrl: "https://example.com/videos/welcome",
            isPreview: true,
            order: 0,
            duration: 420
          },
          {
            id: "l-2",
            moduleId: "m-1",
            title: "Color balance on trays",
            description: "Compose trays with balanced color and height for premium events.",
            videoUrl: "https://example.com/videos/color-balance",
            isPreview: false,
            order: 1,
            duration: 900
          }
        ]
      }
    ]
  }
];

export const readCoursesFromFile = async (): Promise<Course[]> => {
  try {
    const raw = await fs.readFile(COURSES_PATH, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    const result = coursesFileSchema.safeParse(parsed);
    if (!result.success) {
      console.error("Invalid courses.json:", result.error.flatten());
      return defaultCourses;
    }
    return result.data.map((course) => normalizeStoredCourse(course as Course));
  } catch (error: unknown) {
    const code =
      error && typeof error === "object" && "code" in error
        ? (error as NodeJS.ErrnoException).code
        : undefined;

    if (code === "ENOENT") {
      await fs.mkdir(DATA_DIR, { recursive: true });
      await writeCoursesToFile(defaultCourses);
      return defaultCourses;
    }

    console.error("Failed to read courses.json:", error);
    return defaultCourses;
  }
};

export const writeCoursesToFile = async (courses: Course[]): Promise<void> => {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const body = `${JSON.stringify(courses, null, 2)}\n`;
  await fs.writeFile(COURSES_PATH, body, "utf8");
};
