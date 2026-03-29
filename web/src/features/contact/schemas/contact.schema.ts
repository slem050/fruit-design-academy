import { z } from "zod";

/** Shared validation for form (RHF) and API. Empty `topic` is normalized server-side. */
export const contactInquirySchema = z.object({
  fullName: z.string().min(2, "Name is too short").max(120),
  email: z.string().email("Invalid email address"),
  topic: z.string().max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000)
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export type NormalizedContactInquiry = Omit<ContactInquiryInput, "topic"> & {
  topic?: string;
};

export function normalizeContactPayload(data: ContactInquiryInput): NormalizedContactInquiry {
  const trimmed = data.topic.trim();
  return {
    fullName: data.fullName,
    email: data.email,
    message: data.message,
    ...(trimmed === "" ? {} : { topic: trimmed })
  };
}
