import type { ReactElement } from "react";

export function SiteFooter(): ReactElement {
  return (
    <footer className="border-t border-orange-100 bg-white/80">
      <div className="mx-auto w-full max-w-5xl px-6 py-6 text-sm text-neutral-600">
        <p>Fruit Design Academy - Demo Platform</p>
      </div>
    </footer>
  );
}
