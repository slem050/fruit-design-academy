import Link from "next/link";
import type { ReactElement } from "react";

import { Language } from "@/features/i18n/types/language";

const languages: Language[] = ["he", "ar"];

type LanguageSwitcherProps = {
  currentLanguage: Language;
};

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps): ReactElement {
  return (
    <div className="flex items-center gap-2 text-sm">
      {languages.map((language) => {
        const isActive = language === currentLanguage;
        return (
          <Link
            key={language}
            href={`/?lang=${language}`}
            className={`rounded-full border px-3 py-1 transition ${
              isActive ? "border-orange-500 bg-orange-100" : "border-neutral-300"
            }`}
          >
            {language.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
