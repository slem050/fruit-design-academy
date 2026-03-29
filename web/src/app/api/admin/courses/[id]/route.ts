import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { updateCourseSchema } from "@/features/courses/schemas/course.schema";
import { findCourseById, updateCourse } from "@/features/courses/repositories/course.repository";
import { requireMockAdmin } from "@/server/auth/require-mock-admin";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, context: RouteContext): Promise<NextResponse> {
  const unauthorized = requireMockAdmin(request);
  if (unauthorized) {
    return unauthorized;
  }

  const { id } = await context.params;
  const existing = await findCourseById(id);

  if (!existing) {
    return NextResponse.json({ message: "Course not found." }, { status: 404 });
  }

  const body = (await request.json()) as unknown;
  const parsed = updateCourseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Validation failed",
        errors: parsed.error.flatten()
      },
      { status: 400 }
    );
  }

  try {
    const course = await updateCourse(id, parsed.data);
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    revalidatePath(`/courses/${existing.slug}`);
    revalidatePath(`/courses/${course.slug}`);
    revalidatePath(`/admin/courses/${id}/edit`);
    return NextResponse.json({ course });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ message }, { status: 409 });
  }
}
