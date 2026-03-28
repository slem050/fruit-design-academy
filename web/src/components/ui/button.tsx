import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: ButtonVariant;
};

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-orange-500 text-white hover:bg-orange-600 border-orange-500",
  secondary: "bg-white text-orange-800 hover:bg-orange-50 border-orange-200"
};

export function Button({ children, href, variant = "primary" }: ButtonProps): ReactElement {
  const className = `inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition ${variantClass[variant]}`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return <span className={className}>{children}</span>;
}
