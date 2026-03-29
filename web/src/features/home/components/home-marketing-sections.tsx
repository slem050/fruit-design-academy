import Image from "next/image";
import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { createTranslator } from "@/features/i18n/messages/translator";
import type { Language } from "@/features/i18n/types/language";

const GALLERY_IMAGES: readonly string[] = [
  "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=800&q=80",
  "https://images.unsplash.com/photo-1589829545846-df0f7f1316c4?w=800&q=80",
  "https://images.unsplash.com/photo-1568706293861-46d48b7c92d9?w=800&q=80"
];

type HomeMarketingSectionsProps = {
  language: Language;
};

export function HomeMarketingSections({ language }: HomeMarketingSectionsProps): ReactElement {
  const { t } = createTranslator(language);
  const alts = [t("home.galleryAlt1"), t("home.galleryAlt2"), t("home.galleryAlt3")];

  return (
    <>
      <Section title={t("home.galleryTitle")}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {GALLERY_IMAGES.map((src, i) => (
            <div
              key={src}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100"
            >
              <Image
                src={src}
                alt={alts[i] ?? ""}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </Section>

      <Section title={t("home.testimonialsTitle")}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-4">
            <p className="text-sm leading-relaxed text-neutral-800">
              &ldquo;{t("home.testimonial1")}&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-orange-800">
              {t("home.testimonial1Author")}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm leading-relaxed text-neutral-800">
              &ldquo;{t("home.testimonial2")}&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-orange-800">
              {t("home.testimonial2Author")}
            </p>
          </Card>
          <Card className="p-4">
            <p className="text-sm leading-relaxed text-neutral-800">
              &ldquo;{t("home.testimonial3")}&rdquo;
            </p>
            <p className="mt-3 text-xs font-semibold text-orange-800">
              {t("home.testimonial3Author")}
            </p>
          </Card>
        </div>
      </Section>

      <Card className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div className="min-w-0 space-y-2">
          <h2 className="text-xl font-semibold text-neutral-900">{t("home.ctaBandTitle")}</h2>
          <p className="text-sm text-neutral-700">{t("home.ctaBandBody")}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <Button href="/courses">{t("home.ctaBandCourses")}</Button>
          <Button href="/contact" variant="secondary">
            {t("home.ctaBandContact")}
          </Button>
        </div>
      </Card>
    </>
  );
}
