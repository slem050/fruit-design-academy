import { getMockSessionForServer } from "@/server/auth/mock-session.server";

/**
 * Demo: an authenticated student session is treated as having full access to all course lessons.
 * Guests still rely on preview flags per lesson.
 */
export async function getStudentMockHasFullCourseAccess(): Promise<boolean> {
  const session = await getMockSessionForServer();
  return session.isAuthenticated && session.role === "student";
}
