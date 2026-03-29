import type { Metadata } from "next";
import type { ReactElement, ReactNode } from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { DemoModeBanner } from "@/components/layout/demo-mode-banner";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import { isDemoMode } from "@/config/demo-mode";

import "./globals.css";

export const metadata: Metadata = {
  title: "Fruit Design Academy",
  description: "Course platform for fruit design workshops and digital learning."
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps): Promise<ReactElement> {
  const locale = await getLocaleFromHeaders();
  const dir = locale === "en" ? "ltr" : "rtl";

  return (
    <html lang={locale} dir={dir}>
      <body className="flex min-h-screen flex-col">
        <DemoModeBanner visible={isDemoMode()} />
        <SiteHeader />
        <div className="min-w-0 flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
