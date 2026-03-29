import Link from "next/link";
import type { ReactElement } from "react";
import { Suspense } from "react";

import { GuestAuthNav } from "@/components/layout/guest-auth-nav";
import { headerShell } from "@/components/layout/page-container";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import { getMockSessionForServer } from "@/server/auth/mock-session.server";

export async function SiteHeader(): Promise<ReactElement> {
  const session = await getMockSessionForServer();
  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);

  const navItems = [
    { href: "/", label: t("chrome.navHome") },
    { href: "/about", label: t("chrome.navAbout") },
    { href: "/courses", label: t("chrome.navCourses") },
    { href: "/contact", label: t("chrome.navContact") }
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-orange-100 bg-white/90 backdrop-blur-sm">
      <div
        className={`${headerShell} flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4`}
      >
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link href="/" className="shrink-0 text-sm font-semibold text-orange-700 sm:text-base">
            Fruit Design Academy
          </Link>
          <LanguageSwitcher currentLanguage={language} />
        </div>
        <nav
          aria-label={t("chrome.mainNavAria")}
          className="flex flex-wrap items-center gap-x-1 gap-y-2 text-xs sm:gap-x-2 sm:text-sm md:gap-x-3"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 text-neutral-700 hover:bg-orange-50 hover:text-orange-700 sm:min-h-10 sm:px-3"
            >
              {item.label}
            </Link>
          ))}
          {session.isAuthenticated && session.role === "admin" ? (
            <Link
              href="/admin"
              className="inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 font-semibold text-orange-800 hover:bg-orange-50 sm:min-h-10 sm:px-3"
            >
              {t("chrome.adminLink")}
            </Link>
          ) : null}
          {session.isAuthenticated && session.role === "student" ? (
            <Link
              href="/dashboard"
              className="inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 font-semibold text-orange-800 hover:bg-orange-50 sm:min-h-10 sm:px-3"
            >
              {t("chrome.dashboardLink")}
            </Link>
          ) : null}
          {session.isAuthenticated ? (
            <Link
              href="/logout"
              className="inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 text-neutral-600 hover:bg-neutral-100 sm:min-h-10 sm:px-3"
            >
              {t("chrome.signOut")}
            </Link>
          ) : (
            <Suspense fallback={null}>
              <GuestAuthNav signInLabel={t("chrome.signIn")} signUpLabel={t("chrome.signUp")} />
            </Suspense>
          )}
        </nav>
      </div>
    </header>
  );
}
