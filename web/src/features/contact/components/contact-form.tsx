"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  contactInquirySchema,
  type ContactInquiryInput
} from "@/features/contact/schemas/contact.schema";

export function ContactForm(): ReactElement {
  const [serverMessage, setServerMessage] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactInquiryInput>({
    resolver: zodResolver(contactInquirySchema),
    defaultValues: {
      fullName: "",
      email: "",
      topic: "",
      message: ""
    }
  });

  const onSubmit = async (values: ContactInquiryInput): Promise<void> => {
    setServerMessage("");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as { message?: string; reference?: string; ok?: boolean };

    if (!response.ok) {
      setServerMessage(payload.message ?? "Something went wrong.");
      return;
    }

    if (payload.ok) {
      reset();
      setServerMessage(
        `ההודעה נשלחה (דמו). אסמכתא: ${payload.reference ?? "—"} — אין שליחת אימייל אמיתית בשלב זה.`
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="שם מלא" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            autoComplete="name"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-base"
          />
        </Field>
        <Field label="אימייל" error={errors.email?.message}>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-base"
          />
        </Field>
      </div>

      <Field label="נושא (אופציונלי)" error={errors.topic?.message}>
        <input {...register("topic")} className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-base" />
      </Field>

      <Field label="הודעה" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-base"
        />
      </Field>

      {serverMessage ? (
        <p className={`text-sm ${serverMessage.includes("דמו") ? "text-green-800" : "text-red-600"}`}>{serverMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-10 w-full rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 sm:w-auto sm:py-3"
      >
        {isSubmitting ? "שולח..." : "שליחה"}
      </button>
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
