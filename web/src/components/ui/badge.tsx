import type { ReactElement, ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
};

export function Badge({ children }: BadgeProps): ReactElement {
  return (
    <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
      {children}
    </span>
  );
}
