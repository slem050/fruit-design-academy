"use client";

import type { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactElement } from "react";
import { useState } from "react";

import { moduleOutlineSchema } from "@/features/courses/schemas/course.schema";
import type { CourseModule } from "@/features/courses/types/course";

type ModuleFormState = z.infer<typeof moduleOutlineSchema>;

type AdminCourseOutlineFormProps = {
  courseId: string;
  initialModules: CourseModule[];
};

function toOutlineState(modules: CourseModule[]): ModuleFormState[] {
  return modules.map((mod) => ({
    id: mod.id,
    title: mod.title,
    order: mod.order,
    lessons: mod.lessons.map((lesson) => ({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      videoUrl: lesson.videoUrl,
      isPreview: lesson.isPreview,
      order: lesson.order,
      duration: lesson.duration
    }))
  }));
}

export function AdminCourseOutlineForm({
  courseId,
  initialModules
}: AdminCourseOutlineFormProps): ReactElement {
  const router = useRouter();
  const [modules, setModules] = useState<ModuleFormState[]>(() => toOutlineState(initialModules));
  const [message, setMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const addModule = (): void => {
    const nextOrder = modules.length;
    setModules((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "New module",
        order: nextOrder,
        lessons: []
      }
    ]);
  };

  const removeModule = (moduleId: string): void => {
    setModules((prev) =>
      prev.filter((mod) => mod.id !== moduleId).map((mod, index) => ({ ...mod, order: index }))
    );
  };

  const updateModuleField = (moduleId: string, field: "title" | "order", value: string): void => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) {
          return mod;
        }
        if (field === "order") {
          return { ...mod, order: Number.parseInt(value, 10) || 0 };
        }
        return { ...mod, title: value };
      })
    );
  };

  const addLesson = (moduleId: string): void => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) {
          return mod;
        }
        const nextOrder = mod.lessons.length;
        return {
          ...mod,
          lessons: [
            ...mod.lessons,
            {
              id: crypto.randomUUID(),
              title: "New lesson",
              description: "",
              videoUrl: "",
              isPreview: false,
              order: nextOrder,
              duration: 0
            }
          ]
        };
      })
    );
  };

  const removeLesson = (moduleId: string, lessonId: string): void => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) {
          return mod;
        }
        return {
          ...mod,
          lessons: mod.lessons
            .filter((l) => l.id !== lessonId)
            .map((l, index) => ({ ...l, order: index }))
        };
      })
    );
  };

  const updateLessonField = (
    moduleId: string,
    lessonId: string,
    field: "title" | "description" | "videoUrl" | "order" | "duration" | "isPreview",
    value: string | boolean
  ): void => {
    setModules((prev) =>
      prev.map((mod) => {
        if (mod.id !== moduleId) {
          return mod;
        }
        return {
          ...mod,
          lessons: mod.lessons.map((lesson) => {
            if (lesson.id !== lessonId) {
              return lesson;
            }
            if (field === "isPreview") {
              return { ...lesson, isPreview: Boolean(value) };
            }
            if (field === "order") {
              return { ...lesson, order: Number.parseInt(String(value), 10) || 0 };
            }
            if (field === "duration") {
              return { ...lesson, duration: Number.parseInt(String(value), 10) || 0 };
            }
            if (field === "title" || field === "description" || field === "videoUrl") {
              return { ...lesson, [field]: String(value) };
            }
            return lesson;
          })
        };
      })
    );
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setMessage("");
    setIsSaving(true);
    const response = await fetch(`/api/admin/courses/${courseId}/outline`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modules })
    });
    const payload = (await response.json()) as { message?: string };
    setIsSaving(false);

    if (!response.ok) {
      setMessage(payload.message ?? "Could not save outline.");
      return;
    }

    setMessage("Outline saved.");
    router.refresh();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-3xl border border-orange-100 bg-white p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">Course outline</h2>
          <p className="text-sm text-neutral-600">
            Modules and lessons (preview vs locked is mock until purchases exist).
          </p>
        </div>
        <button
          type="button"
          onClick={addModule}
          className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-orange-800 hover:bg-orange-50"
        >
          Add module
        </button>
      </div>

      {modules.length === 0 ? (
        <p className="text-sm text-neutral-600">No modules yet. Add a module to start.</p>
      ) : null}

      <div className="space-y-6">
        {modules.map((mod) => (
          <div key={mod.id} className="rounded-2xl border border-dashed border-orange-200 p-4">
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex-1 min-w-[200px] space-y-1">
                <span className="text-sm font-medium">Module title</span>
                <input
                  value={mod.title}
                  onChange={(e) => updateModuleField(mod.id, "title", e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </label>
              <label className="w-24 space-y-1">
                <span className="text-sm font-medium">Order</span>
                <input
                  type="number"
                  value={mod.order}
                  onChange={(e) => updateModuleField(mod.id, "order", e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-3 py-2"
                />
              </label>
              <button
                type="button"
                onClick={() => removeModule(mod.id)}
                className="rounded-full border border-red-200 px-3 py-2 text-sm text-red-700 hover:bg-red-50"
              >
                Remove module
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Lessons</p>
                <button
                  type="button"
                  onClick={() => addLesson(mod.id)}
                  className="text-sm font-semibold text-orange-700 hover:underline"
                >
                  Add lesson
                </button>
              </div>

              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="rounded-xl border border-neutral-200 bg-orange-50/40 p-3 space-y-2"
                >
                  <div className="flex flex-wrap gap-2">
                    <input
                      value={lesson.title}
                      onChange={(e) =>
                        updateLessonField(mod.id, lesson.id, "title", e.target.value)
                      }
                      className="min-w-[200px] flex-1 rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                      placeholder="Lesson title"
                    />
                    <input
                      type="number"
                      value={lesson.order}
                      onChange={(e) =>
                        updateLessonField(mod.id, lesson.id, "order", e.target.value)
                      }
                      className="w-20 rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                      title="Order"
                    />
                    <input
                      type="number"
                      value={lesson.duration}
                      onChange={(e) =>
                        updateLessonField(mod.id, lesson.id, "duration", e.target.value)
                      }
                      className="w-24 rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                      title="Duration (sec)"
                    />
                    <label className="flex items-center gap-1 text-sm">
                      <input
                        type="checkbox"
                        checked={lesson.isPreview}
                        onChange={(e) =>
                          updateLessonField(mod.id, lesson.id, "isPreview", e.target.checked)
                        }
                      />
                      Preview
                    </label>
                    <button
                      type="button"
                      onClick={() => removeLesson(mod.id, lesson.id)}
                      className="text-sm text-red-700 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <textarea
                    value={lesson.description}
                    onChange={(e) =>
                      updateLessonField(mod.id, lesson.id, "description", e.target.value)
                    }
                    rows={2}
                    className="w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                    placeholder="Description"
                  />
                  <input
                    value={lesson.videoUrl}
                    onChange={(e) =>
                      updateLessonField(mod.id, lesson.id, "videoUrl", e.target.value)
                    }
                    className="w-full rounded-lg border border-neutral-300 px-2 py-1 text-sm"
                    placeholder="Video URL (optional for demo)"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {message ? <p className="text-sm text-orange-700">{message}</p> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          disabled={isSaving}
          className="min-h-10 w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 sm:w-auto"
        >
          {isSaving ? "Saving..." : "Save outline"}
        </button>
        <Link
          href="/admin/courses"
          className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-neutral-300 px-5 py-2.5 text-center text-sm font-semibold sm:w-auto"
        >
          Back to list
        </Link>
      </div>
    </form>
  );
}
