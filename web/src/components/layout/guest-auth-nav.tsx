"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

type GuestAuthNavProps = {
  /** Single entry to `/login` — sign up is available there as a tab. */
  label: string;
};

/** Hidden on `/login` so the page tabs are the only auth switcher. */
export function GuestAuthNav({ label }: GuestAuthNavProps): ReactElement | null {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  const linkClass =
    "inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 text-neutral-700 hover:bg-orange-50 sm:min-h-10 sm:px-3";

  return (
    <Link href="/login" className={linkClass}>
      {label}
    </Link>
  );
}
