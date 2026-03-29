import Link from "next/link";
import type { ReactElement } from "react";

const links: { href: string; label: string }[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/courses", label: "Courses" },
  { href: "/admin/media", label: "Media" },
  { href: "/admin/purchases", label: "Purchases" }
];

export function AdminSubnav(): ReactElement {
  return (
    <nav className="border-b border-orange-100 bg-orange-50/60" aria-label="Admin sections">
      <ul className="mx-auto flex max-w-5xl flex-wrap gap-1 px-4 py-2 sm:gap-2 sm:px-6">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="inline-flex min-h-9 items-center rounded-full px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-white hover:text-orange-800"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
