"use client";

import { useRouter } from "next/navigation";
import type { ReactElement } from "react";
import { useState } from "react";

import { Language } from "@/features/i18n/types/language";

const languages: Language[] = ["he", "ar", "en"];

type LanguageSwitcherProps = {
  currentLanguage: Language;
};

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps): ReactElement {
  const router = useRouter();
  const [pending, setPending] = useState<Language | null>(null);

  const setLocale = async (language: Language): Promise<void> => {
    if (language === currentLanguage || pending !== null) {
      return;
    }

    setPending(language);
    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: language })
      });
      if (!response.ok) {
        return;
      }
      router.refresh();
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 text-sm" role="group" aria-label="Language">
      {languages.map((language) => {
        const isActive = language === currentLanguage;
        const isBusy = pending === language;
        return (
          <button
            key={language}
            type="button"
            disabled={isActive || pending !== null}
            aria-pressed={isActive}
            aria-busy={isBusy}
            onClick={() => void setLocale(language)}
            className={`inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border px-3 py-2 transition disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive ? "border-orange-500 bg-orange-100" : "border-neutral-300 hover:border-orange-300"
            }`}
          >
            {language.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
