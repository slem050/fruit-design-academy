import { describe, expect, it } from "vitest";

import { localeBodySchema } from "@/features/i18n/schemas/locale.schema";

describe("localeBodySchema", () => {
  it("accepts he, ar, and en", () => {
    expect(localeBodySchema.safeParse({ lang: "he" }).success).toBe(true);
    expect(localeBodySchema.safeParse({ lang: "ar" }).success).toBe(true);
    expect(localeBodySchema.safeParse({ lang: "en" }).success).toBe(true);
  });

  it("rejects other values", () => {
    expect(localeBodySchema.safeParse({ lang: "fr" }).success).toBe(false);
    expect(localeBodySchema.safeParse({}).success).toBe(false);
  });
});
