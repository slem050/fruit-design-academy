"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  createCourseSchema,
  CreateCourseSchemaInput
} from "@/features/courses/schemas/course.schema";

export function AdminCourseForm(): ReactElement {
  const router = useRouter();
  const [apiMessage, setApiMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateCourseSchemaInput>({
    resolver: zodResolver(createCourseSchema),
    defaultValues: {
      title: "",
      slug: "",
      subtitle: "",
      description: "",
      marketingText: "",
      price: 0,
      status: "draft",
      thumbnailUrl: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
      isFeatured: false
    }
  });

  const onSubmit = async (values: CreateCourseSchemaInput): Promise<void> => {
    setApiMessage("");
    const response = await fetch("/api/admin/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { message?: string };

    if (!response.ok) {
      setApiMessage(payload.message ?? "Could not create course.");
      return;
    }

    reset();
    router.push("/admin/courses");
    router.refresh();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Title" error={errors.title?.message}>
          <input
            {...register("title")}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          />
        </Field>
        <Field label="Slug" error={errors.slug?.message}>
          <input
            {...register("slug")}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          />
        </Field>
      </div>

      <Field label="Subtitle" error={errors.subtitle?.message}>
        <input
          {...register("subtitle")}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2"
        />
      </Field>

      <Field label="Description" error={errors.description?.message}>
        <textarea
          {...register("description")}
          rows={4}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2"
        />
      </Field>

      <Field label="Marketing text" error={errors.marketingText?.message}>
        <input
          {...register("marketingText")}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Price" error={errors.price?.message}>
          <input
            type="number"
            step="1"
            {...register("price")}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          />
        </Field>
        <Field label="Status" error={errors.status?.message}>
          <select
            {...register("status")}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2"
          >
            <option value="draft">draft</option>
            <option value="published">published</option>
          </select>
        </Field>
      </div>

      <Field label="Thumbnail URL" error={errors.thumbnailUrl?.message}>
        <input
          {...register("thumbnailUrl")}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2"
        />
      </Field>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("isFeatured")} />
        Featured course
      </label>

      {apiMessage ? <p className="text-sm text-orange-700">{apiMessage}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          disabled={isSubmitting}
          className="min-h-10 w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting ? "Saving..." : "Create course"}
        </button>
        <Link
          href="/admin/courses"
          className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-center text-sm font-semibold sm:w-auto"
        >
          Back to courses
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
