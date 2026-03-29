"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

type GuestAuthNavProps = {
  signInLabel: string;
  signUpLabel: string;
};

/** Hide duplicate Sign in / Sign up when already on the login page (tabs handle mode). */
export function GuestAuthNav({ signInLabel, signUpLabel }: GuestAuthNavProps): ReactElement | null {
  const pathname = usePathname();
  if (pathname === "/login") {
    return null;
  }

  const linkClass =
    "inline-flex min-h-9 items-center rounded-full px-2.5 py-1.5 text-neutral-700 hover:bg-orange-50 sm:min-h-10 sm:px-3";

  return (
    <>
      <Link href="/login" className={linkClass}>
        {signInLabel}
      </Link>
      <Link href="/login?tab=signup" className={linkClass}>
        {signUpLabel}
      </Link>
    </>
  );
}
