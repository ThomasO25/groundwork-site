import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * One button system, used everywhere. No pills, no glow, no gradients, and no
 * bespoke button styles invented per section.
 *
 *   primary  → charcoal on light backgrounds (the main CTA)
 *   accent   → warm sand on dark backgrounds (the main CTA inside ink sections)
 *   outline  → quiet secondary
 *   ghost    → tertiary / text button
 */
type Variant = "primary" | "accent" | "outline" | "outline-dark" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-semibold tracking-tight " +
  "transition-[background-color,border-color,color,transform] duration-150 " +
  "hover:-translate-y-px active:translate-y-0 " +
  "focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-graphite",
  accent: "bg-sand text-ink hover:bg-gold",
  outline: "border border-line bg-transparent text-ink hover:border-gold hover:bg-concrete",
  "outline-dark": "border border-line-dark bg-transparent text-paper hover:border-sand hover:bg-white/5",
  ghost: "bg-transparent text-ink underline-offset-4 hover:text-gold-deep hover:underline",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-6 text-base",
};

type CommonProps = { variant?: Variant; size?: Size; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  children,
  ...props
}: CommonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  const isInternal = href.startsWith("/") && !href.startsWith("//");
  if (isInternal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
