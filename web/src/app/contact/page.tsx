import Link from "next/link";
import type { ReactElement } from "react";

import { pageLead, pageShell, pageTitle } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/features/contact/components/contact-form";

export default function ContactPage(): ReactElement {
  return (
    <main className={`${pageShell} flex flex-col gap-6 sm:gap-8`}>
      <header>
        <Badge>Contact</Badge>
        <p className="text-xs text-orange-700 sm:text-sm">Contact</p>
        <h1 className={`${pageTitle} mt-2`}>יצירת קשר</h1>
        <p className={`${pageLead} mt-2`}>
          שלחו הודעה — הטופס מאומת בצד הלקוח ובשרת (Zod). אין שליחת אימייל אמיתית בשלב הדמו.
        </p>
      </header>

      <Card className="p-6">
        <ContactForm />
      </Card>

      <Link href="/" className="text-sm font-semibold text-orange-700 hover:underline">
        חזרה לדף הבית
      </Link>
    </main>
  );
}
