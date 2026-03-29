import { headers } from "next/headers";

import { FRUIT_LOCALE_HEADER } from "@/features/i18n/constants";
import type { Language } from "@/features/i18n/types/language";

export async function getLocaleFromHeaders(): Promise<Language> {
  const headerList = await headers();
  const value = headerList.get(FRUIT_LOCALE_HEADER);
  if (value === "ar" || value === "en") {
    return value;
  }
  return "he";
}
