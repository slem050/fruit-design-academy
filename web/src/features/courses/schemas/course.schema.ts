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
  updatedAt: z.string()
});

export const coursesFileSchema = z.array(courseRecordSchema);

export type CreateCourseSchemaInput = z.input<typeof createCourseSchema>;
export type CreateCourseSchemaOutput = z.output<typeof createCourseSchema>;
export type UpdateCourseSchemaInput = z.input<typeof updateCourseSchema>;
export type UpdateCourseSchemaOutput = z.output<typeof updateCourseSchema>;
