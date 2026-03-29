import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
  className?: string;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 border-orange-500",
  secondary: "bg-white text-orange-800 hover:bg-orange-50 border-orange-200"
};

export function Button({
  children,
  href,
  variant = "primary",
  className = ""
}: ButtonProps): ReactElement {
  const classes = `inline-flex min-h-10 w-full items-center justify-center rounded-full border px-5 py-2.5 text-sm font-semibold transition sm:w-auto sm:px-6 sm:py-3 ${variantClass[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return <span className={classes}>{children}</span>;
}
