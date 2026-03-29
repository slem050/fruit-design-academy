import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export default async function AboutPage(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2 sm:space-y-3">
        <Badge>{t("about.badge")}</Badge>
        <h1 className={pageTitle}>{t("about.title")}</h1>
        <p className={pageLead}>{t("about.lead")}</p>
      </header>

      <Section title={t("about.visionTitle")}>
        <Card>
          <p className="leading-relaxed text-neutral-700">{t("about.visionBody")}</p>
        </Card>
      </Section>
    </main>
  );
}
