"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

import { pageLead, pageTitle } from "@/components/layout/page-container";
import type { MessageCatalog } from "@/features/i18n/types/message-catalog";

type AuthTab = "signin" | "signup";

type MockAuthEntryProps = {
  nextPath: string;
  labels: MessageCatalog["login"];
};

function buildLoginPath(nextPath: string, tab: AuthTab): string {
  const params = new URLSearchParams();
  if (nextPath && nextPath !== "/") {
    params.set("next", nextPath);
  }
  if (tab === "signup") {
    params.set("tab", "signup");
  }
  const query = params.toString();
  return query ? `/login?${query}` : "/login";
}

export function MockAuthEntry({ nextPath, labels }: MockAuthEntryProps): ReactElement {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab: AuthTab = searchParams.get("tab") === "signup" ? "signup" : "signin";
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const selectTab = useCallback(
    (next: AuthTab): void => {
      setMessage("");
      router.replace(buildLoginPath(nextPath, next), { scroll: false });
    },
    [nextPath, router]
  );

  const signIn = async (role: "admin" | "student"): Promise<void> => {
    setMessage("");
    setIsSubmitting(true);

    const response = await fetch("/api/auth/mock/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role,
        email: email.trim().length > 0 ? email.trim() : undefined
      })
    });

    setIsSubmitting(false);

    if (response.status === 403) {
      setMessage(labels.mockDisabled);
      return;
    }

    if (!response.ok) {
      setMessage(labels.failed);
      return;
    }

    if (role === "admin") {
      const target = nextPath.startsWith("/admin") ? nextPath : "/admin";
      window.location.assign(target);
      return;
    }

    const target = nextPath.startsWith("/dashboard") ? nextPath : "/dashboard";
    window.location.assign(target);
  };

  const heading = tab === "signup" ? labels.signupTitle : labels.title;
  const sub = tab === "signup" ? labels.signupLead : labels.lead;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6">
      <header className="space-y-2 text-center">
        <h1 className={pageTitle}>{heading}</h1>
        <p className={`${pageLead} mx-auto max-w-prose`}>{sub}</p>
      </header>

      <div
        className="flex rounded-full border border-orange-100 bg-orange-50/50 p-1"
        role="tablist"
        aria-label="Account"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "signin"}
          id="tab-signin"
          aria-controls="panel-signin"
          onClick={() => selectTab("signin")}
          className={`min-h-10 flex-1 rounded-full px-3 text-sm font-semibold transition ${
            tab === "signin"
              ? "bg-white text-orange-800 shadow-sm"
              : "text-neutral-600 hover:text-orange-800"
          }`}
        >
          {labels.tabSignIn}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "signup"}
          id="tab-signup"
          aria-controls="panel-signup"
          onClick={() => selectTab("signup")}
          className={`min-h-10 flex-1 rounded-full px-3 text-sm font-semibold transition ${
            tab === "signup"
              ? "bg-white text-orange-800 shadow-sm"
              : "text-neutral-600 hover:text-orange-800"
          }`}
        >
          {labels.tabSignUp}
        </button>
      </div>

      <div className="rounded-3xl border border-orange-100 bg-white p-8 shadow-sm">
        {tab === "signin" ? (
          <div id="panel-signin" role="tabpanel" aria-labelledby="tab-signin" className="space-y-6">
            <label className="block space-y-1">
              <span className="text-sm font-medium">{labels.emailOptional}</span>
              <input
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={labels.emailPlaceholder}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => void signIn("student")}
                className="rounded-full bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
              >
                {isSubmitting ? labels.submitting : labels.asStudent}
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => void signIn("admin")}
                className="rounded-full border border-orange-400 py-3 text-sm font-semibold text-orange-800 hover:bg-orange-50 disabled:opacity-50"
              >
                {isSubmitting ? labels.submitting : labels.asAdmin}
              </button>
            </div>
          </div>
        ) : (
          <div id="panel-signup" role="tabpanel" aria-labelledby="tab-signup" className="space-y-6">
            <label className="block space-y-1">
              <span className="text-sm font-medium">{labels.emailOptional}</span>
              <input
                name="email-signup"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={labels.emailPlaceholder}
                className="w-full rounded-xl border border-neutral-300 px-3 py-2"
              />
            </label>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => void signIn("student")}
              className="w-full rounded-full bg-orange-500 py-3 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? labels.submitting : labels.signupStudentCta}
            </button>

            <p className="text-center text-sm text-neutral-600">{labels.signupHint}</p>
          </div>
        )}

        {message ? <p className="mt-4 text-center text-sm text-red-600">{message}</p> : null}
      </div>

      <p className="text-center text-sm text-neutral-600">
        <Link href="/" className="text-orange-700 hover:underline">
          {labels.backHome}
        </Link>
      </p>
    </div>
  );
}
