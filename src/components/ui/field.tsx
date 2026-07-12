import * as React from "react";
import { cn } from "@/lib/utils";

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-ink", className)} {...props} />
  );
}

const controlBase =
  "w-full rounded border border-line bg-white px-3.5 py-2.5 text-[0.95rem] text-ink placeholder:text-steel/60 transition-colors focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/15 aria-[invalid=true]:border-red-500";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(controlBase, className)} {...props} />;
  }
);

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return <textarea ref={ref} className={cn(controlBase, "min-h-[120px] resize-y", className)} {...props} />;
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(function Select({ className, ...props }, ref) {
  return <select ref={ref} className={cn(controlBase, "appearance-none", className)} {...props} />;
});

export function FieldError({ id, children }: { id: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-600" role="alert">
      {children}
    </p>
  );
}
