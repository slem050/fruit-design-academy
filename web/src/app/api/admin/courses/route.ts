import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { createCourseSchema } from "@/features/courses/schemas/course.schema";
import { createCourse } from "@/features/courses/repositories/course.repository";
import { requireMockAdmin } from "@/server/auth/require-mock-admin";

export const runtime = "nodejs";

export async function POST(request: Request): Promise<NextResponse> {
  const unauthorized = requireMockAdmin(request);
  if (unauthorized) {
    return unauthorized;
  }

  const body = (await request.json()) as unknown;
  const parsed = createCourseSchema.safeParse(body);

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
    const course = await createCourse(parsed.data);
    revalidatePath("/courses");
    revalidatePath("/admin/courses");
    revalidatePath(`/courses/${course.slug}`);
    return NextResponse.json({ course }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ message }, { status: 409 });
  }
}
