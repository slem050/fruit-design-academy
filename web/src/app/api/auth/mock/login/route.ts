import { NextResponse } from "next/server";

import { isDemoMode } from "@/config/demo-mode";
import { mockLoginBodySchema } from "@/features/auth/schemas/mock-auth.schema";
import { encodeMockSessionPayload, MOCK_SESSION_COOKIE } from "@/server/auth/mock-session.codec";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  if (!isDemoMode()) {
    return NextResponse.json(
      {
        message:
          "Mock authentication is disabled. Set DEMO_MODE=true for demos or configure a real auth provider."
      },
      { status: 403 }
    );
  }

  const body = (await request.json()) as unknown;
  const parsed = mockLoginBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const token = encodeMockSessionPayload(parsed.data);
  const response = NextResponse.json({ ok: true });
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set(MOCK_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: isProduction
  });

  return response;
}
