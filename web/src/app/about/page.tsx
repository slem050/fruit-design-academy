import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";

export default function AboutPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header className="space-y-2 sm:space-y-3">
        <Badge>About</Badge>
        <h1 className={pageTitle}>אודות האקדמיה לעיצוב פירות</h1>
        <p className={pageLead}>
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
