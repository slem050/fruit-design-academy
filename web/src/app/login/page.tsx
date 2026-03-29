import type { ReactElement } from "react";
import { Suspense } from "react";

import { pageShell } from "@/components/layout/page-container";
import { MockAuthEntry } from "@/features/auth/components/mock-auth-entry";
import { getLoginLabels } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

type LoginPageProps = {
  searchParams: Promise<{ next?: string; tab?: string }>;
};

function sanitizeNextPath(next: string | undefined): string {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }
  return next;
}

function LoginAuthSkeleton(): ReactElement {
  return (
    <div
      className="mx-auto flex w-full max-w-3xl flex-col gap-6 lg:flex-row lg:gap-8"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="flex flex-col gap-3 lg:w-52">
        <div className="h-24 animate-pulse rounded-2xl bg-orange-100/90" />
        <div className="h-24 animate-pulse rounded-2xl bg-rose-100/90" />
      </div>
      <div className="min-h-64 flex-1 animate-pulse rounded-3xl bg-orange-50/80" />
    </div>
  );
}

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<ReactElement> {
  const resolved = await searchParams;
  const nextPath = sanitizeNextPath(resolved.next);
  const language = await getLocaleFromHeaders();
  const loginLabels = getLoginLabels(language);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <Suspense fallback={<LoginAuthSkeleton />}>
        <MockAuthEntry nextPath={nextPath} labels={loginLabels} />
      </Suspense>
    </main>
  );
}
