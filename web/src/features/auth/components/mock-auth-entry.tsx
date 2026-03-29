"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import type { ReactElement } from "react";
import { useCallback, useState } from "react";

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

  const inputClass =
    "w-full rounded-xl border border-neutral-300/90 bg-white px-3 py-2.5 text-neutral-900 shadow-sm";

  const tabListLabel =
    tab === "signin"
      ? `${labels.tabSignIn}, ${labels.tabSignUp}`
      : `${labels.tabSignUp}, ${labels.tabSignIn}`;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <h1 className="sr-only">{tabListLabel}</h1>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-8">
        <div
          className="flex flex-col gap-3 lg:w-52 xl:w-60 lg:shrink-0"
          role="tablist"
          aria-label={labels.title}
        >
          <button
            type="button"
            role="tab"
            aria-selected={tab === "signin"}
            id="tab-signin"
            aria-controls="panel-auth"
            onClick={() => selectTab("signin")}
            className={`rounded-2xl border-2 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 ${
              tab === "signin"
                ? "border-orange-400 bg-gradient-to-br from-orange-100 to-amber-100 shadow-lg ring-2 ring-orange-300/60"
                : "border-orange-200/70 bg-gradient-to-br from-orange-50/90 to-amber-50/60 opacity-90 hover:border-orange-300 hover:opacity-100"
            }`}
          >
            <span className="block text-base font-semibold text-orange-950">
              {labels.tabSignIn}
            </span>
            <span className="mt-1 block text-xs leading-snug text-orange-900/70 line-clamp-2">
              {labels.lead}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={tab === "signup"}
            id="tab-signup"
            aria-controls="panel-auth"
            onClick={() => selectTab("signup")}
            className={`rounded-2xl border-2 p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 ${
              tab === "signup"
                ? "border-rose-400 bg-gradient-to-br from-rose-100 to-fuchsia-100 shadow-lg ring-2 ring-rose-300/60"
                : "border-rose-200/70 bg-gradient-to-br from-rose-50/90 to-fuchsia-50/50 opacity-90 hover:border-rose-300 hover:opacity-100"
            }`}
          >
            <span className="block text-base font-semibold text-rose-950">{labels.tabSignUp}</span>
            <span className="mt-1 block text-xs leading-snug text-rose-900/75 line-clamp-2">
              {labels.signupLead}
            </span>
          </button>
        </div>

        <div
          id="panel-auth"
          role="tabpanel"
          aria-labelledby={tab === "signin" ? "tab-signin" : "tab-signup"}
          className={`min-w-0 flex-1 rounded-3xl border-2 p-6 shadow-md sm:p-8 lg:min-h-[20rem] ${
            tab === "signin"
              ? "border-orange-200/90 bg-gradient-to-br from-white via-orange-50/40 to-amber-50/30"
              : "border-rose-200/90 bg-gradient-to-br from-white via-rose-50/40 to-fuchsia-50/30"
          }`}
        >
          {tab === "signin" ? (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-orange-200/50 pb-4">
                <h2 className="text-xl font-semibold text-orange-950">{labels.title}</h2>
                <p className="text-sm leading-relaxed text-orange-900/75">{labels.lead}</p>
              </div>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-orange-950">{labels.emailOptional}</span>
                <input
                  name="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={labels.emailPlaceholder}
                  autoComplete="email"
                  className={inputClass}
                />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => void signIn("student")}
                  className="rounded-full bg-orange-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 disabled:opacity-50"
                >
                  {isSubmitting ? labels.submitting : labels.asStudent}
                </button>
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => void signIn("admin")}
                  className="rounded-full border-2 border-orange-500 bg-white py-3 text-sm font-semibold text-orange-900 hover:bg-orange-50 disabled:opacity-50"
                >
                  {isSubmitting ? labels.submitting : labels.asAdmin}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-1 border-b border-rose-200/50 pb-4">
                <h2 className="text-xl font-semibold text-rose-950">{labels.signupTitle}</h2>
                <p className="text-sm leading-relaxed text-rose-900/80">{labels.signupLead}</p>
              </div>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium text-rose-950">{labels.emailOptional}</span>
                <input
                  name="email-signup"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder={labels.emailPlaceholder}
                  autoComplete="email"
                  className={inputClass}
                />
              </label>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => void signIn("student")}
                className="w-full rounded-full bg-rose-600 py-3 text-sm font-semibold text-white shadow-sm hover:bg-rose-700 disabled:opacity-50"
              >
                {isSubmitting ? labels.submitting : labels.signupStudentCta}
              </button>

              <p className="text-center text-sm text-rose-900/75">{labels.signupHint}</p>
            </div>
          )}

          {message ? (
            <p className="mt-6 text-center text-sm font-medium text-red-600">{message}</p>
          ) : null}
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-neutral-600">
        <Link href="/" className="font-semibold text-orange-700 hover:underline">
          {labels.backHome}
        </Link>
      </p>
    </div>
  );
}
