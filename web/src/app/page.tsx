import Link from "next/link";
import type { ReactElement } from "react";

import { pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { HomeFeaturedCourses } from "@/features/home/components/home-featured-courses";
import { HomeMarketingSections } from "@/features/home/components/home-marketing-sections";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";
import { getStudentMockHasFullCourseAccess } from "@/features/payments/services/mock-purchase.service";
import { getMockSessionForServer } from "@/server/auth/mock-session.server";

export default async function HomePage(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t, format } = createTranslator(language);
  const session = await getMockSessionForServer();
  const hasMockCourseAccess = await getStudentMockHasFullCourseAccess();

  return (
    <main className={`${pageShell} flex flex-col gap-8 sm:gap-10 lg:gap-12`}>
      <header className="flex flex-col gap-4 sm:gap-6">
        <div className="min-w-0">
          <Badge>{t("home.badgeDemo")}</Badge>
          <p className="text-xs uppercase tracking-wide text-orange-700 sm:text-sm">
            {t("home.siteTitle")}
          </p>
          <h1 className={`${pageTitle} mt-2 md:text-4xl`}>{t("home.headline")}</h1>
        </div>
      </header>

      <Card className="p-4 sm:p-6 lg:p-8">
        <p className="text-base leading-relaxed sm:text-lg">{t("home.intro")}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          <Button href="/courses">{t("home.ctaCourses")}</Button>
          <Button href="/contact" variant="secondary">
            {t("home.ctaContact")}
          </Button>
        </div>
      </Card>

      <HomeFeaturedCourses language={language} />

      <HomeMarketingSections language={language} />

      <Section title={t("home.demoSectionTitle")}>
        <div className="grid gap-4 rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-4 sm:rounded-3xl sm:p-6 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold">{t("home.demoCardTitle")}</h2>
            <p className="mt-2 text-sm text-neutral-700">{t("home.demoCardBody")}</p>
          </div>
          <Card className="rounded-2xl p-4 text-sm">
            <p>
              <span className="font-semibold">{t("home.authLabel")}</span>{" "}
              {session.isAuthenticated
                ? format("home.signedIn", { role: session.role })
                : t("home.notSignedIn")}
            </p>
            <p className="mt-2">
              <span className="font-semibold">{t("home.purchaseLabel")}</span>{" "}
              {hasMockCourseAccess ? t("home.purchasedMock") : t("home.notPurchased")}
            </p>
          </Card>
        </div>
      </Section>

      <Link href="/about" className="text-sm font-semibold text-orange-700 hover:underline">
        {t("home.readMoreAcademy")}
      </Link>
    </main>
  );
}
