import { describe, expect, it } from "vitest";

import {
  contactInquirySchema,
  normalizeContactPayload
} from "@/features/contact/schemas/contact.schema";

describe("contactInquirySchema", () => {
  it("accepts a valid inquiry", () => {
    const result = contactInquirySchema.safeParse({
      fullName: "Maya Cohen",
      email: "maya@example.com",
      topic: "Workshop",
      message: "I would like to book a fruit design workshop."
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.topic).toBe("Workshop");
    }
  });

  it("allows empty topic string before normalization", () => {
    const result = contactInquirySchema.safeParse({
      fullName: "Maya Cohen",
      email: "maya@example.com",
      topic: "",
      message: "Hello there, this is long enough."
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.topic).toBe("");
    }
  });

  it("normalizeContactPayload drops empty topic", () => {
    const normalized = normalizeContactPayload({
      fullName: "Maya Cohen",
      email: "maya@example.com",
      topic: "   ",
      message: "Hello there, this is long enough."
    });
    expect(normalized.topic).toBeUndefined();
  });

  it("rejects short message", () => {
    const result = contactInquirySchema.safeParse({
      fullName: "Maya Cohen",
      email: "maya@example.com",
      message: "short"
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = contactInquirySchema.safeParse({
      fullName: "Maya Cohen",
      email: "not-an-email",
      message: "This message is long enough to pass."
    });
    expect(result.success).toBe(false);
  });
});
