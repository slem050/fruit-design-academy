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
      className="mx-auto flex w-full max-w-md flex-col gap-6"
      aria-busy="true"
      aria-label="Loading"
    >
      <div className="space-y-2 text-center">
        <div className="mx-auto h-9 w-3/4 max-w-xs animate-pulse rounded-lg bg-orange-100" />
        <div className="mx-auto h-4 w-full max-w-sm animate-pulse rounded bg-orange-50" />
      </div>
      <div className="h-11 animate-pulse rounded-full bg-orange-50" />
      <div className="h-64 animate-pulse rounded-3xl bg-orange-50" />
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
