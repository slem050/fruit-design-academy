import { Language } from "@/features/i18n/types/language";

type HomeDictionary = {
  siteTitle: string;
  headline: string;
  intro: string;
  cta: string;
};

const homeDictionaries: Record<Language, HomeDictionary> = {
  he: {
    siteTitle: "Fruit Design Academy",
    headline: "אומנות עיצוב פירות לאירועים וקורסים דיגיטליים",
    intro: "פלטפורמה מקצועית להצגת קורסי עיצוב פירות, סדנאות ותוכן ויזואלי מרשים.",
    cta: "לצפייה בקורסים"
  },
  ar: {
    siteTitle: "Fruit Design Academy",
    headline: "فن تصميم الفواكه للفعاليات والدورات الرقمية",
    intro: "منصة احترافية لعرض دورات تصميم الفواكه وورش العمل والمحتوى البصري.",
    cta: "تصفح الدورات"
  }
};

export const getHomeDictionary = (language: Language): HomeDictionary => {
  return homeDictionaries[language];
};
