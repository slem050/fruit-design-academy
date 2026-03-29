import { z } from "zod";

export const mockLoginBodySchema = z.object({
  role: z.enum(["admin", "student"]),
  email: z.string().email().optional()
});

export type MockLoginBodyInput = z.input<typeof mockLoginBodySchema>;
