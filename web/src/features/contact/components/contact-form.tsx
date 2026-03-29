"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { ReactElement } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactInquirySchema,
  type ContactInquiryInput
} from "@/features/contact/schemas/contact.schema";
import type { MessageCatalog } from "@/features/i18n/types/message-catalog";

type ContactFormProps = {
  labels: MessageCatalog["contact"];
};

export function ContactForm({ labels }: ContactFormProps): ReactElement {
  const [serverMessage, setServerMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
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
    setSuccess(false);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });
    const payload = (await response.json()) as {
      message?: string;
      reference?: string;
      ok?: boolean;
    };

    if (!response.ok) {
      setServerMessage(payload.message ?? labels.errorGeneric);
      return;
    }

    if (payload.ok) {
      reset();
      const ref = payload.reference ?? "—";
      setServerMessage(labels.successMessage.replace("{reference}", ref));
      setSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label={labels.labelFullName} error={errors.fullName?.message}>
          <Input {...register("fullName")} autoComplete="name" invalid={!!errors.fullName} />
        </Field>
        <Field label={labels.labelEmail} error={errors.email?.message}>
          <Input
            {...register("email")}
            type="email"
            autoComplete="email"
            invalid={!!errors.email}
          />
        </Field>
      </div>

      <Field label={labels.labelTopic} error={errors.topic?.message}>
        <Input {...register("topic")} invalid={!!errors.topic} />
      </Field>

      <Field label={labels.labelMessage} error={errors.message?.message}>
        <Textarea {...register("message")} rows={5} invalid={!!errors.message} />
      </Field>

      {serverMessage ? (
        <p className={`text-sm ${success ? "text-green-800" : "text-red-600"}`}>{serverMessage}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-10 w-full rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50 sm:w-auto sm:py-3"
      >
        {isSubmitting ? labels.submitting : labels.submit}
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
