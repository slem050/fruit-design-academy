import { z } from "zod";

export const createCourseSchema = z.object({
  title: z.string().min(3).max(120),
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must use lowercase letters, numbers, and hyphens"),
  subtitle: z.string().min(3).max(180),
  description: z.string().min(10).max(3000),
  marketingText: z.string().min(10).max(500),
  price: z.coerce.number().min(0).max(10000),
  status: z.enum(["draft", "published"]),
  thumbnailUrl: z.string().url(),
  isFeatured: z.coerce.boolean()
});

export const updateCourseSchema = createCourseSchema;

export const lessonRecordSchema = z.object({
  id: z.string().min(1),
  moduleId: z.string().optional().default(""),
  title: z.string(),
  description: z.string(),
  videoUrl: z.string(),
  isPreview: z.boolean(),
  order: z.number(),
  duration: z.number().optional().default(0)
});

export const moduleRecordSchema = z.object({
  id: z.string().min(1),
  courseId: z.string().optional().default(""),
  title: z.string(),
  order: z.number(),
  lessons: z.array(lessonRecordSchema)
});

export const courseRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string(),
  slug: z.string(),
  subtitle: z.string(),
  description: z.string(),
  marketingText: z.string(),
  price: z.number(),
  status: z.enum(["draft", "published"]),
  thumbnailUrl: z.string(),
  isFeatured: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  modules: z.array(moduleRecordSchema).optional().default([])
});

export const coursesFileSchema = z.array(courseRecordSchema);

export const lessonOutlineSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  description: z.string().max(2000).default(""),
  videoUrl: z.string().max(2000).default(""),
  isPreview: z.coerce.boolean(),
  order: z.coerce.number().int().min(0),
  duration: z.coerce.number().int().min(0).max(86400).default(0)
});

export const moduleOutlineSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200),
  order: z.coerce.number().int().min(0),
  lessons: z.array(lessonOutlineSchema)
});

export const updateOutlineBodySchema = z.object({
  modules: z.array(moduleOutlineSchema)
});

export type CreateCourseSchemaInput = z.input<typeof createCourseSchema>;
export type CreateCourseSchemaOutput = z.output<typeof createCourseSchema>;
export type UpdateCourseSchemaInput = z.input<typeof updateCourseSchema>;
export type UpdateCourseSchemaOutput = z.output<typeof updateCourseSchema>;
export type UpdateOutlineBodyInput = z.input<typeof updateOutlineBodySchema>;
