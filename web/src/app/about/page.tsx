import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function AboutPage(): ReactElement {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <header className="space-y-3">
        <Badge>About</Badge>
        <h1 className="text-3xl font-semibold">אודות האקדמיה לעיצוב פירות</h1>
        <p className="text-neutral-700">
          הפלטפורמה נבנית כדי להציג אומנות עיצוב פירות לאירועים ולספק מסלול למידה דיגיטלי מקצועי לסטודנטים.
        </p>
      </header>

      <Section title="החזון שלנו">
        <Card>
          <p className="leading-relaxed text-neutral-700">
            להפוך את תחום עיצוב הפירות לנגיש יותר באמצעות קורסים מצולמים, תרגול מובנה ותוכן חזותי ברמה גבוהה.
          </p>
        </Card>
      </Section>
    </main>
  );
}
