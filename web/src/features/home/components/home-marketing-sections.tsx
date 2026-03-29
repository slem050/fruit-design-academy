import type { ReactElement, ReactNode } from "react";

import { pageMax, pagePadX } from "@/components/layout/page-container";
import { RemoteFillImage } from "@/components/ui/remote-fill-image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { HOME_GALLERY_IMAGES } from "@/features/home/constants/home-media";
import { createTranslator } from "@/features/i18n/messages/translator";
import type { Language } from "@/features/i18n/types/language";

type HomeMarketingSectionsProps = {
  language: Language;
};

function SectionShell({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
}): ReactElement {
  return <div className={`${pageMax} ${pagePadX} ${className}`.trim()}>{children}</div>;
}

export function HomeMarketingSections({ language }: HomeMarketingSectionsProps): ReactElement {
  const { t } = createTranslator(language);
  const alts = [t("home.galleryAlt1"), t("home.galleryAlt2"), t("home.galleryAlt3")];

  const pillars = [
    { title: t("home.pillar1Title"), body: t("home.pillar1Body") },
    { title: t("home.pillar2Title"), body: t("home.pillar2Body") },
    { title: t("home.pillar3Title"), body: t("home.pillar3Body") }
  ];

  const learn = [
    { title: t("home.learn1Title"), body: t("home.learn1Body") },
    { title: t("home.learn2Title"), body: t("home.learn2Body") },
    { title: t("home.learn3Title"), body: t("home.learn3Body") }
  ];

  const who = [
    { n: "1", title: t("home.who1Title"), body: t("home.who1Body") },
    { n: "2", title: t("home.who2Title"), body: t("home.who2Body") },
    { n: "3", title: t("home.who3Title"), body: t("home.who3Body") },
    { n: "4", title: t("home.who4Title"), body: t("home.who4Body") }
  ];

  const outcomes = [t("home.outcome1"), t("home.outcome2"), t("home.outcome3"), t("home.outcome4")];

  const faqs = [
    { q: t("home.faq1Q"), a: t("home.faq1A") },
    { q: t("home.faq2Q"), a: t("home.faq2A") },
    { q: t("home.faq3Q"), a: t("home.faq3A") }
  ];

  return (
    <>
      <section className="border-b border-orange-100/60 bg-white/50 py-14 sm:py-16">
        <SectionShell>
          <h2 className="font-display text-center text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {t("home.pillarsTitle")}
          </h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {pillars.map((p) => (
              <Card
                key={p.title}
                className="border-orange-100/80 bg-gradient-to-b from-white to-orange-50/30 p-6 text-center shadow-sm"
              >
                <span className="text-2xl text-orange-500" aria-hidden>
                  ●
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold text-neutral-900">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{p.body}</p>
              </Card>
            ))}
          </div>
        </SectionShell>
      </section>

      <section className="py-14 sm:py-16">
        <SectionShell>
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
            <div className="space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-700">
                {t("home.storyKicker")}
              </p>
              <h2 className="font-display text-2xl font-semibold leading-tight text-neutral-900 sm:text-3xl">
                {t("home.storyTitle")}
              </h2>
              <p className="text-base font-medium text-orange-900/85">{t("home.storyLead")}</p>
              <p className="text-sm leading-relaxed text-neutral-700 sm:text-base">
                {t("home.storyBody")}
              </p>
            </div>
            <Card className="border-orange-100 bg-orange-50/40 p-8 shadow-inner">
              <p className="font-display text-xl font-semibold italic leading-snug text-neutral-800">
                &ldquo;{t("home.testimonial1")}&rdquo;
              </p>
              <p className="mt-4 text-sm font-semibold text-orange-800">
                {t("home.testimonial1Author")}
              </p>
            </Card>
          </div>
        </SectionShell>
      </section>

      <section className="border-y border-orange-100/70 bg-gradient-to-b from-amber-50/40 to-transparent py-14 sm:py-16">
        <SectionShell>
          <h2 className="font-display text-center text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {t("home.learnTitle")}
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {learn.map((item, i) => (
              <div
                key={item.title}
                className="relative rounded-2xl border border-orange-100 bg-white p-6 shadow-sm"
              >
                <span
                  className="font-display text-4xl font-semibold tabular-nums text-orange-200"
                  aria-hidden
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
              </div>
            ))}
          </div>
        </SectionShell>
      </section>

      <section className="py-14 sm:py-16">
        <SectionShell>
          <h2 className="font-display text-center text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {t("home.whoTitle")}
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {who.map((w) => (
              <Card key={w.n} className="flex gap-4 border-orange-100/90 p-5 sm:p-6">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white"
                  aria-hidden
                >
                  {w.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-neutral-900">{w.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">{w.body}</p>
                </div>
              </Card>
            ))}
          </div>
        </SectionShell>
      </section>

      <section className="py-4 sm:py-6">
        <SectionShell>
          <Section title={t("home.galleryTitle")}>
            <p className="-mt-2 mb-6 max-w-2xl text-sm text-neutral-600 sm:text-base">
              {t("home.gallerySubtitle")}
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {HOME_GALLERY_IMAGES.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 shadow-md ring-1 ring-orange-100/60 transition hover:ring-orange-300/80"
                >
                  <RemoteFillImage
                    src={src}
                    alt={alts[i] ?? ""}
                    className="transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              ))}
            </div>
          </Section>
        </SectionShell>
      </section>

      <section className="py-12 sm:py-14">
        <SectionShell>
          <div className="rounded-3xl border border-orange-200/80 bg-gradient-to-br from-orange-500 to-amber-600 px-6 py-10 text-white shadow-lg sm:px-10 sm:py-12">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {t("home.outcomesTitle")}
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {outcomes.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed sm:text-base">
                  <span className="mt-0.5 shrink-0 text-lg" aria-hidden>
                    ✓
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionShell>
      </section>

      <section className="border-t border-orange-100/60 bg-white/60 py-14 sm:py-16">
        <SectionShell>
          <p className="text-center text-xs font-bold uppercase tracking-widest text-orange-700">
            {t("home.testimonialsKicker")}
          </p>
          <h2 className="mt-2 text-center font-display text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {t("home.testimonialsTitle")}
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <Card className="border-orange-100/80 bg-[#fffdfb] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-neutral-800">
                &ldquo;{t("home.testimonial1")}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-orange-800">
                {t("home.testimonial1Author")}
              </p>
            </Card>
            <Card className="border-orange-100/80 bg-[#fffdfb] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-neutral-800">
                &ldquo;{t("home.testimonial2")}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-orange-800">
                {t("home.testimonial2Author")}
              </p>
            </Card>
            <Card className="border-orange-100/80 bg-[#fffdfb] p-5 sm:p-6">
              <p className="text-sm leading-relaxed text-neutral-800">
                &ldquo;{t("home.testimonial3")}&rdquo;
              </p>
              <p className="mt-4 text-xs font-semibold text-orange-800">
                {t("home.testimonial3Author")}
              </p>
            </Card>
          </div>
        </SectionShell>
      </section>

      <section className="py-12 sm:py-14">
        <SectionShell>
          <h2 className="font-display text-center text-2xl font-semibold text-neutral-900 sm:text-3xl">
            {t("home.faqTitle")}
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {faqs.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl border border-orange-100 bg-white px-4 py-1 shadow-sm open:shadow-md open:ring-1 open:ring-orange-100"
              >
                <summary className="cursor-pointer list-none py-4 font-semibold text-neutral-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-2">
                    {item.q}
                    <span className="text-orange-500 transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </span>
                </summary>
                <p className="border-t border-orange-50 pb-4 pt-2 text-sm leading-relaxed text-neutral-600">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </SectionShell>
      </section>

      <SectionShell className="pb-14 sm:pb-16">
        <Card className="flex flex-col gap-6 border-orange-200/90 bg-gradient-to-br from-white to-orange-50/50 p-8 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="min-w-0 space-y-2">
            <h2 className="font-display text-xl font-semibold text-neutral-900 sm:text-2xl">
              {t("home.ctaBandTitle")}
            </h2>
            <p className="text-sm text-neutral-700 sm:text-base">{t("home.ctaBandBody")}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href="/courses">{t("home.ctaBandCourses")}</Button>
            <Button href="/contact" variant="secondary">
              {t("home.ctaBandContact")}
            </Button>
          </div>
        </Card>
      </SectionShell>
    </>
  );
}
