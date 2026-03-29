import { NextResponse } from "next/server";

import {
  decodeMockSessionPayload,
  getCookieValueFromRequest,
  MOCK_SESSION_COOKIE
} from "@/server/auth/mock-session.codec";

export function requireMockAdmin(request: Request): NextResponse | null {
  const raw = getCookieValueFromRequest(request, MOCK_SESSION_COOKIE);
  const session = decodeMockSessionPayload(raw);

  if (!session || session.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return null;
}
