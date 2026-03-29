import { NextResponse } from "next/server";

import { MOCK_SESSION_COOKIE } from "@/server/auth/mock-session.codec";

export const runtime = "nodejs";

export async function GET(request: Request): Promise<NextResponse> {
  const url = new URL("/", request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set(MOCK_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
  return response;
}
