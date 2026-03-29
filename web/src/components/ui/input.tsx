import { forwardRef, type InputHTMLAttributes, type ReactElement } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className = "", invalid, ...props },
  ref
): ReactElement {
  const border = invalid
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : "border-neutral-300";
  return (
    <input
      ref={ref}
      className={`w-full rounded-xl border px-3 py-2 text-base outline-none focus:ring-2 focus:ring-orange-200 ${border} ${className}`}
      {...props}
    />
  );
});
