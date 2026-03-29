import type { ReactElement, ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps): ReactElement {
  return (
    <div
      className={`rounded-2xl border border-orange-100 bg-white/80 p-4 shadow-sm sm:rounded-3xl sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}
