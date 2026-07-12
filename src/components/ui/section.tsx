import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "paper" | "concrete" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink",
  concrete: "bg-concrete text-ink",
  ink: "bg-ink text-white",
};

/** Vertical rhythm wrapper. Alternate tones to build the page structure. */
export function Section({
  tone = "paper",
  className,
  children,
  id,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(tones[tone], "py-16 sm:py-20 lg:py-24", className)}>
      <div className="container-frame">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  dark,
  align = "left",
}: {
  label?: string;
  title: string;
  intro?: string;
  dark?: boolean;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {label ? (
        <span className={cn("spec-label", dark && "spec-label--dark", align === "center" && "justify-center")}>
          {label}
        </span>
      ) : null}
      <h2 className={cn("mt-3 text-display-md", dark ? "text-white" : "text-ink")}>{title}</h2>
      {intro ? (
        <p className={cn("mt-4 text-lg leading-relaxed", dark ? "text-white/70" : "text-steel")}>{intro}</p>
      ) : null}
    </div>
  );
}
