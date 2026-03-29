import { NextResponse } from "next/server";

import { FRUIT_LANG_COOKIE } from "@/features/i18n/constants";
import { localeBodySchema } from "@/features/i18n/schemas/locale.schema";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as unknown;
  const parsed = localeBodySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  const response = NextResponse.json({ ok: true });
  const isProduction = process.env.NODE_ENV === "production";

  response.cookies.set(FRUIT_LANG_COOKIE, parsed.data.lang, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    secure: isProduction
  });

  return response;
}
