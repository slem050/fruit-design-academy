import type { Metadata } from "next";
import {
  Noto_Sans,
  Noto_Sans_Arabic,
  Noto_Sans_Hebrew,
  Noto_Serif,
  Noto_Serif_Hebrew
} from "next/font/google";
import type { ReactElement, ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DemoModeBanner } from "@/components/layout/demo-mode-banner";
import { isDemoMode } from "@/config/demo-mode";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import type { Language } from "@/features/i18n/types/language";

import "./globals.css";

const notoSansLatin = Noto_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

const notoSerifLatin = Noto_Serif({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap"
});

const notoSansHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew", "latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

const notoSerifHebrew = Noto_Serif_Hebrew({
  subsets: ["hebrew", "latin", "latin-ext"],
  variable: "--font-display",
  display: "swap"
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic", "latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Fruit Design Academy",
  description: "Course platform for fruit design workshops and digital learning."
};

type RootLayoutProps = {
  children: ReactNode;
};

function fontVariablesForLocale(locale: Language): string {
  if (locale === "he") {
    return `${notoSansHebrew.variable} ${notoSerifHebrew.variable}`;
  }
  if (locale === "ar") {
    return notoSansArabic.variable;
  }
  return `${notoSansLatin.variable} ${notoSerifLatin.variable}`;
}

export default async function RootLayout({ children }: RootLayoutProps): Promise<ReactElement> {
  const locale = await getLocaleFromHeaders();
  const dir = locale === "en" ? "ltr" : "rtl";
  const { t } = createTranslator(locale);

  return (
    <html lang={locale} dir={dir}>
      <body className={`${fontVariablesForLocale(locale)} flex min-h-screen flex-col antialiased`}>
        <a
          href="#site-main"
          className="fixed left-4 top-0 z-[100] -translate-y-full rounded-b-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition focus:translate-y-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 focus-visible:ring-offset-2"
        >
          {t("chrome.skipToContent")}
        </a>
        <DemoModeBanner visible={isDemoMode()} />
        <SiteHeader />
        <div id="site-main" tabIndex={-1} className="min-w-0 flex-1 outline-none">
          {children}
        </div>
        <SiteFooter />
      </body>
    </html>
  );
}
