import type { ReactElement } from "react";

import { footerShell } from "@/components/layout/page-container";
import { createTranslator } from "@/features/i18n/messages/translator";
import { getLocaleFromHeaders } from "@/features/i18n/services/locale.server";

export async function SiteFooter(): Promise<ReactElement> {
  const language = await getLocaleFromHeaders();
  const { t } = createTranslator(language);

  return (
    <footer className="border-t border-orange-100 bg-white/80">
      <div className={`${footerShell} py-6 text-xs text-neutral-600 sm:py-8 sm:text-sm`}>
        <p>{t("chrome.footerTagline")}</p>
      </div>
    </footer>
  );
}
