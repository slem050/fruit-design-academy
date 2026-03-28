import Link from "next/link";
import type { ReactElement } from "react";

const navItems = [
  { href: "/", label: "בית" },
  { href: "/about", label: "אודות" },
  { href: "/courses", label: "קורסים" },
  { href: "/contact", label: "צור קשר" }
];

export function SiteHeader(): ReactElement {
  return (
    <header className="border-b border-orange-100 bg-white/80">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-orange-700">
          Fruit Design Academy
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-3 py-1 text-neutral-700 hover:bg-orange-50 hover:text-orange-700">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
