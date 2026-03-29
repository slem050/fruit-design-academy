import Link from "next/link";
import type { ReactElement } from "react";

import { Card } from "@/components/ui/card";
import { RemoteFillImage } from "@/components/ui/remote-fill-image";
import { Section } from "@/components/ui/section";
import { listCourses } from "@/features/courses/repositories/course.repository";
import { applyCourseLocalization } from "@/features/courses/services/course-localization.service";
import { createTranslator } from "@/features/i18n/messages/translator";
import type { Language } from "@/features/i18n/types/language";

type HomeFeaturedCoursesProps = {
  language: Language;
};

export async function HomeFeaturedCourses({
  language
}: HomeFeaturedCoursesProps): Promise<ReactElement> {
  const { t, format } = createTranslator(language);
  const all = await listCourses();
  const featured = all.filter((c) => c.isFeatured && c.status === "published");

  if (featured.length === 0) {
    return (
      <Section title={t("home.featuredTitle")}>
        <p className="text-sm text-neutral-600">{t("home.featuredEmpty")}</p>
      </Section>
    );
  }

  return (
    <Section title={t("home.featuredTitle")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((raw) => {
          const course = applyCourseLocalization(raw, language);
          return (
            <Card key={course.id} className="overflow-hidden p-0">
              <div className="relative aspect-[16/10] w-full bg-neutral-100">
                <RemoteFillImage src={course.thumbnailUrl} alt={course.title} />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-semibold leading-snug">{course.title}</h3>
                <p className="text-sm text-neutral-600">{course.subtitle}</p>
                <p className="text-sm font-semibold">
                  {format("courses.priceDisplay", { price: String(course.price) })}
                </p>
                <Link
                  href={`/courses/${course.slug}`}
                  className="inline-block text-sm font-semibold text-orange-700 hover:underline"
                >
                  {t("courses.viewDetails")}
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
