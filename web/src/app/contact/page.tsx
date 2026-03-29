import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/features/contact/components/contact-form";
import { getContactLabels } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export default async function ContactPage(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const labels = getContactLabels(language);

  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header>
        <Badge>{labels.badge}</Badge>
        <p className="text-xs text-orange-700 sm:text-sm">{labels.eyebrow}</p>
        <h1 className={`${pageTitle} mt-2`}>{labels.title}</h1>
        <p className={`${pageLead} mt-2`}>{labels.lead}</p>
      </header>

      <Card className="p-6">
        <ContactForm labels={labels} />
      </Card>

      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        {labels.backHome}
      </Link>
    </main>
  );
}
