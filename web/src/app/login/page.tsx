import type { ReactElement } from "react";

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

export default async function LoginPage({ searchParams }: LoginPageProps): Promise<ReactElement> {
  const resolved = await searchParams;
  const nextPath = sanitizeNextPath(resolved.next);
  const initialTab = resolved.tab === "signup" ? "signup" : "signin";
  const language = await getLocaleFromHeaders();
  const loginLabels = getLoginLabels(language);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <MockAuthEntry nextPath={nextPath} initialTab={initialTab} labels={loginLabels} />
    </main>
  );
}
