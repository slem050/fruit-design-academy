import type { ReactElement, ReactNode } from "react";

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps): ReactElement {
  return (
    <section className="space-y-4">
      {title ? <h2 className="text-2xl font-semibold">{title}</h2> : null}
      {children}
    </section>
  );
}
