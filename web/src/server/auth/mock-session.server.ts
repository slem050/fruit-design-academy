import { cookies } from "next/headers";

import type { MockUserRole } from "@/features/auth/types/mock-user";
import { decodeMockSessionPayload, MOCK_SESSION_COOKIE } from "@/server/auth/mock-session.codec";

export type ServerMockSession = {
  isAuthenticated: boolean;
  role: MockUserRole;
  email?: string;
};

export async function getMockSessionForServer(): Promise<ServerMockSession> {
  const jar = await cookies();
  const raw = jar.get(MOCK_SESSION_COOKIE)?.value;
  const payload = decodeMockSessionPayload(raw);

  if (!payload) {
    return { isAuthenticated: false, role: "visitor" };
  }

  return {
    isAuthenticated: true,
    role: payload.role,
    email: payload.email
  };
}
