"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { updateCourseSchema, type UpdateCourseSchemaInput } from "@/features/courses/schemas/course.schema";
import type { Course } from "@/features/courses/types/course";

type AdminCourseEditFormProps = {
  course: Course;
};

export function AdminCourseEditForm({ course }: AdminCourseEditFormProps): ReactElement {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<UpdateCourseSchemaInput>({
    resolver: zodResolver(updateCourseSchema),
    defaultValues: {
      title: course.title,
      slug: course.slug,
      subtitle: course.subtitle,
      description: course.description,
      marketingText: course.marketingText,
      price: course.price,
      status: course.status,
      thumbnailUrl: course.thumbnailUrl,
      isFeatured: course.isFeatured
    }
  });

  const onSubmit = async (values: UpdateCourseSchemaInput): Promise<void> => {
    setApiMessage("");
    const response = await fetch(`/api/admin/courses/${course.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setApiMessage(payload.message ?? "Could not update course.");
      return;
    }

    router.push("/admin/courses");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" error={errors.title?.message}>
          <input {...register("title")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <input {...register("slug")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
        </Field>
      </div>

      <Field label="Subtitle" error={errors.subtitle?.message}>
        <input {...register("subtitle")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea {...register("description")} rows={4} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
      </Field>

      <Field label="Marketing text" error={errors.marketingText?.message}>
        <input {...register("marketingText")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Price" error={errors.price?.message}>
          <input type="number" step="1" {...register("price")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
        </Field>
        <Field label="Status" error={errors.status?.message}>
          <select {...register("status")} className="w-full rounded-xl border border-neutral-300 px-3 py-2">
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </Field>
      </div>

      <Field label="Thumbnail URL" error={errors.thumbnailUrl?.message}>
        <input {...register("thumbnailUrl")} className="w-full rounded-xl border border-neutral-300 px-3 py-2" />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isFeatured")} />
        Featured course
      </label>

      {apiMessage ? <p className="text-sm text-orange-700">{apiMessage}</p> : null}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
        >
          {isSubmitting ? "Saving..." : "Save changes"}
        </button>
        <Link href="/admin/courses" className="rounded-full border border-neutral-300 px-5 py-2 text-sm font-semibold">
          Cancel
        </Link>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  children: ReactElement;
};

function Field({ label, error, children }: FieldProps): ReactElement {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium">{label}</span>
      {children}
      {error ? <span className="text-xs text-red-600">{error}</span> : null}
    </label>
  );
}
