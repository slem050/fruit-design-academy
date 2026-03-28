import type { ReactElement, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps): ReactElement {
  return <div className={`rounded-3xl border border-orange-100 bg-white/80 p-6 shadow-sm ${className}`}>{children}</div>;
}
