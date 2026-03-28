import Link from "next/link";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Section } from "@/components/ui/section";
import { getHomeDictionary } from "@/features/i18n/services/dictionaries";
import { Language } from "@/features/i18n/types/language";
import { getMockPurchaseState } from "@/features/payments/services/mock-purchase.service";
import { getMockSession } from "@/features/auth/services/mock-auth.service";

type HomePageProps = {
  searchParams: Promise<{ lang?: string }>;
};

const parseLanguage = (value: string | undefined): Language => {
  if (value === "ar") {
    return "ar";
  }

  return "he";
};

export default async function HomePage({ searchParams }: HomePageProps): Promise<ReactElement> {
  const resolvedSearchParams = await searchParams;
  const language = parseLanguage(resolvedSearchParams.lang);
  const dictionary = getHomeDictionary(language);
  const session = getMockSession();
  const purchaseState = getMockPurchaseState();

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Badge>Demo</Badge>
          <p className="text-sm uppercase tracking-wide text-orange-700">{dictionary.siteTitle}</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight md:text-4xl">{dictionary.headline}</h1>
        </div>
        <LanguageSwitcher currentLanguage={language} />
      </header>

      <Card className="p-8">
        <p className="text-lg leading-relaxed">{dictionary.intro}</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button href="/courses">{dictionary.cta}</Button>
          <Button href="/contact" variant="secondary">
            {language === "he" ? "יצירת קשר" : "تواصل معنا"}
          </Button>
        </div>
      </Card>

      <Section title={language === "he" ? "מצב דמו" : "وضع العرض"}>
        <div className="grid gap-4 rounded-3xl border border-dashed border-orange-200 bg-orange-50/40 p-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold">{language === "he" ? "מצב הדגמה" : "حالة العرض التوضيحي"}</h2>
          <p className="mt-2 text-sm text-neutral-700">
            {language === "he"
              ? "האימות והרכישה מוצגים כהדמיה בלבד לצורך מצגת ללקוחות."
              : "يتم عرض تسجيل الدخول والشراء كمحاكاة فقط لعرض تجربة المنتج."}
          </p>
        </div>
        <Card className="rounded-2xl p-4 text-sm">
          <p>
            <span className="font-semibold">{language === "he" ? "אימות:" : "تسجيل الدخول:"}</span>{" "}
            {session.isAuthenticated
              ? language === "he"
                ? "מחובר"
                : "مسجل الدخول"
              : language === "he"
                ? "לא מחובר"
                : "غير مسجل"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">{language === "he" ? "רכישה:" : "الشراء:"}</span>{" "}
            {purchaseState === "mock_purchased"
              ? language === "he"
                ? "נרכש (הדמיה)"
                : "تم الشراء (محاكاة)"
              : language === "he"
                ? "לא נרכש"
                : "غير مشترى"}
          </p>
        </Card>
        </div>
      </Section>

      <Link href="/about" className="text-sm font-semibold text-orange-700 hover:underline">
        {language === "he" ? "קראו עוד על האקדמיה" : "اقرأ المزيد عن الأكاديمية"}
      </Link>
    </main>
  );
}
