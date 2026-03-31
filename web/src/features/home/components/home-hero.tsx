import Link from "next/link";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RemoteFillImage } from "@/components/ui/remote-fill-image";
import { HOME_HERO_CARD_IMAGE } from "@/features/home/constants/home-media";
import { HomeAmbientFruitBackground } from "@/features/home/components/home-ambient-fruit-background";
import { createTranslator } from "@/features/i18n/messages/translator";
import type { Language } from "@/features/i18n/types/language";

type HomeHeroProps = {
  language: Language;
};

export function HomeHero({ language }: HomeHeroProps): ReactElement {
  const { t } = createTranslator(language);

  return (
    <section
      className="relative overflow-hidden border-b border-orange-100/80 bg-gradient-to-br from-amber-50 via-[#fff5eb] to-rose-50/90"
      aria-labelledby="home-hero-heading"
    >
      <HomeAmbientFruitBackground />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-rose-200/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-100/50 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-center lg:gap-12 lg:py-20">
        <div className="min-w-0 flex-1 space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>{t("home.badgeDemo")}</Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-800/80 sm:text-sm">
              {t("home.siteTitle")}
            </span>
          </div>
          <h1
            id="home-hero-heading"
            className="font-display text-3xl font-semibold leading-[1.15] tracking-tight text-neutral-900 sm:text-4xl md:text-5xl"
          >
            {t("home.headline")}
          </h1>
          <p className="font-display text-lg text-orange-900/90 sm:text-xl">
            {t("home.heroSubhead")}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-neutral-700 sm:text-lg">
            {t("home.intro")}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/courses">{t("home.ctaCourses")}</Button>
            <Button href="/contact" variant="secondary">
              {t("home.ctaContact")}
            </Button>
          </div>
          <p className="text-sm text-neutral-600">
            <Link
              href="/about"
              className="font-semibold text-orange-800 underline-offset-4 hover:underline"
            >
              {t("home.readMoreAcademy")}
            </Link>
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-md shrink-0 lg:mx-0 lg:max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-orange-200/80 bg-orange-100 shadow-[0_24px_60px_-12px_rgba(180,83,9,0.3)] ring-1 ring-orange-100/90">
            <RemoteFillImage src={HOME_HERO_CARD_IMAGE} alt="" />
            <div
              className="absolute inset-0 bg-gradient-to-t from-neutral-950/92 via-neutral-900/45 to-amber-900/25"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(251,191,36,0.25),transparent_55%)]"
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
              <p className="font-display text-lg font-semibold leading-snug text-white drop-shadow-sm sm:text-xl">
                {t("home.storyKicker")}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/95 drop-shadow-sm">
                {t("home.storyLead")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
