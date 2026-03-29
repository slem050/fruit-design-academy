import type { Language } from "@/features/i18n/types/language";
import type { MessageCatalog } from "@/features/i18n/types/message-catalog";

import ar from "./ar.json";
import en from "./en.json";
import he from "./he.json";

const catalogs: Record<Language, MessageCatalog> = {
  en: en as MessageCatalog,
  he: he as MessageCatalog,
  ar: ar as MessageCatalog
};

function getNested(obj: MessageCatalog, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object" || !(p in (cur as object))) {
      return undefined;
    }
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function createTranslator(lang: Language): {
  t: (path: string) => string;
  format: (path: string, vars: Record<string, string>) => string;
} {
  const primary = catalogs[lang];
  const fallback = catalogs.en;
  const t = (path: string): string => getNested(primary, path) ?? getNested(fallback, path) ?? path;
  const format = (path: string, vars: Record<string, string>): string => {
    const template = t(path);
    return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
  };
  return { t, format };
}

export function getContactLabels(lang: Language): MessageCatalog["contact"] {
  const { t } = createTranslator(lang);
  return {
    badge: t("contact.badge"),
    eyebrow: t("contact.eyebrow"),
    title: t("contact.title"),
    lead: t("contact.lead"),
    backHome: t("contact.backHome"),
    labelFullName: t("contact.labelFullName"),
    labelEmail: t("contact.labelEmail"),
    labelTopic: t("contact.labelTopic"),
    labelMessage: t("contact.labelMessage"),
    submit: t("contact.submit"),
    submitting: t("contact.submitting"),
    successMessage: t("contact.successMessage"),
    errorGeneric: t("contact.errorGeneric")
  };
}

export function getLoginLabels(lang: Language): MessageCatalog["login"] {
  const { t } = createTranslator(lang);
  return {
    title: t("login.title"),
    lead: t("login.lead"),
    tabSignIn: t("login.tabSignIn"),
    tabSignUp: t("login.tabSignUp"),
    signupTitle: t("login.signupTitle"),
    signupLead: t("login.signupLead"),
    signupStudentCta: t("login.signupStudentCta"),
    signupHint: t("login.signupHint"),
    emailOptional: t("login.emailOptional"),
    emailPlaceholder: t("login.emailPlaceholder"),
    asStudent: t("login.asStudent"),
    asAdmin: t("login.asAdmin"),
    submitting: t("login.submitting"),
    failed: t("login.failed"),
    mockDisabled: t("login.mockDisabled"),
    backHome: t("login.backHome")
  };
}
