import { type NextRequest, NextResponse } from "next/server";

import { FRUIT_LANG_COOKIE, FRUIT_LOCALE_HEADER } from "@/features/i18n/constants";
import type { Language } from "@/features/i18n/types/language";

const isLanguage = (value: string | null | undefined): value is Language =>
  value === "he" || value === "ar" || value === "en";

export function middleware(request: NextRequest): NextResponse {
  const urlLang = request.nextUrl.searchParams.get("lang");
  const cookieLang = request.cookies.get(FRUIT_LANG_COOKIE)?.value;

  let locale: Language = "he";
  if (isLanguage(urlLang)) {
    locale = urlLang;
  } else if (isLanguage(cookieLang)) {
    locale = cookieLang;
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(FRUIT_LOCALE_HEADER, locale);

  const response = NextResponse.next({
    request: { headers: requestHeaders }
  });

  if (isLanguage(urlLang)) {
    const isProduction = process.env.NODE_ENV === "production";
    response.cookies.set(FRUIT_LANG_COOKIE, urlLang, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      secure: isProduction
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
