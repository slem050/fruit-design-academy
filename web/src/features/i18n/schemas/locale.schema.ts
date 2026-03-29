import { z } from "zod";

export const localeBodySchema = z.object({
  lang: z.enum(["he", "ar", "en"])
});

export type LocaleBodyInput = z.infer<typeof localeBodySchema>;
