import { z } from "zod";

export const MOCK_SESSION_COOKIE = "fruit_mock_session";

const payloadSchema = z.object({
  role: z.enum(["admin", "student"]),
  email: z.string().email().optional()
});

export type MockSessionPayload = z.infer<typeof payloadSchema>;

export function encodeMockSessionPayload(payload: MockSessionPayload): string {
  const body = JSON.stringify(payload);
  return Buffer.from(body, "utf8").toString("base64url");
}

export function decodeMockSessionPayload(encoded: string | undefined): MockSessionPayload | null {
  if (!encoded) {
    return null;
  }
  try {
    const json = Buffer.from(encoded, "base64url").toString("utf8");
    const data = JSON.parse(json) as unknown;
    const parsed = payloadSchema.safeParse(data);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function getCookieValueFromRequest(request: Request, name: string): string | undefined {
  const header = request.headers.get("cookie");
  if (!header) {
    return undefined;
  }
  const segments = header.split(";").map((part) => part.trim());
  for (const segment of segments) {
    if (segment.startsWith(`${name}=`)) {
      return segment.slice(name.length + 1);
    }
  }
  return undefined;
}
