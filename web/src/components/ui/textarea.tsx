import { forwardRef, type ReactElement, type TextareaHTMLAttributes } from "react";

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className = "", invalid, ...props },
  ref
): ReactElement {
  const border = invalid
    ? "border-red-400 focus:border-red-500 focus:ring-red-200"
    : "border-neutral-300";
  return (
    <textarea
      ref={ref}
      className={`w-full rounded-xl border px-3 py-2 text-base outline-none focus:ring-2 focus:ring-orange-200 ${border} ${className}`}
      {...props}
    />
  );
});
