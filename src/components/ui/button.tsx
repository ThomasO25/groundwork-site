import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-medium tracking-tight transition-colors focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  // The one bold move: hi-vis amber with dark text (high contrast, industrial).
  primary: "bg-hivis text-ink hover:bg-hivis-deep",
  dark: "bg-ink text-white hover:bg-graphite",
  outline: "border border-ink/25 bg-transparent text-ink hover:border-ink hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.05]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.95rem]",
  lg: "h-13 px-7 text-base",
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
}: CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const classes = cn(base, variants[variant], sizes[size], className);
  // External / tel / mailto links use a plain anchor; internal use next/link.
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
