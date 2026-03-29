import type { ReactElement } from "react";

import { pageShell } from "@/components/layout/page-container";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { HomeFeaturedCourses } from "@/features/home/components/home-featured-courses";
import { HomeHero } from "@/features/home/components/home-hero";
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
    <>
      <HomeHero language={language} />
      <main className="min-w-0">
        <div className={`${pageShell} flex flex-col gap-12 sm:gap-14 lg:gap-16`}>
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
        </div>
      </main>
    </>
  );
}
