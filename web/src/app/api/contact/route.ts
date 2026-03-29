import { NextResponse } from "next/server";

import { isDemoMode } from "@/config/demo-mode";
import { readDemoApiFixtures } from "@/features/demo/read-demo-api-fixtures";
import { contactInquirySchema, normalizeContactPayload } from "@/features/contact/schemas/contact.schema";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = contactInquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const normalized = normalizeContactPayload(parsed.data);
  const forwardUrl = process.env.CONTACT_FORWARD_URL?.trim();

  if (isDemoMode()) {
    const fixtures = await readDemoApiFixtures();
    const extra = fixtures?.contact?.successExtra ?? {};

    return NextResponse.json({
      ok: true,
      reference: `mock-${Date.now()}`,
      received: {
        fullName: normalized.fullName,
        email: normalized.email,
        topic: normalized.topic,
        messageLength: normalized.message.length
      },
      ...extra
    });
  }

  if (forwardUrl) {
    const upstream = await fetch(forwardUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized)
    });
    const text = await upstream.text();
    return new NextResponse(text, {
      status: upstream.status,
      headers: { "Content-Type": upstream.headers.get("content-type") ?? "application/json" }
    });
  }

  return NextResponse.json(
    {
      message:
        "Contact endpoint not configured. Enable demo mode (DEMO_MODE) or set CONTACT_FORWARD_URL to a live intake URL."
    },
    { status: 501 }
  );
}
