import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * GROUNDWORK LOGO
 * =============================================================================
 * The monogram is the real raster mark, exported from the official artwork
 * (/public/brand/groundwork-mark-*.png — transparent, tight-cropped, no halos).
 *
 * "GROUNDWORK" and "WEB STUDIO" are rendered as ACCESSIBLE HTML TEXT rather than
 * baked into an image. That keeps the wordmark crisp at any size and zoom level,
 * selectable, translatable, and readable by screen readers — and it means the
 * lockup is never a blurry bitmap on a retina display.
 *
 * Variants
 *   full      → monogram + GROUNDWORK + WEB STUDIO   (footer, About, big surfaces)
 *   wordmark  → monogram + GROUNDWORK                (header — default)
 *   mark      → monogram only                        (tight spaces, mobile bar)
 *
 * `tone="dark"` means "this sits ON a dark background", so it uses the lighter
 * sand mark and cream text. `tone="light"` is the default (on cream/white).
 */
type Variant = "full" | "wordmark" | "mark";
type Tone = "light" | "dark";
type Size = "sm" | "md" | "lg";

const markPx: Record<Size, number> = { sm: 26, md: 32, lg: 44 };
const wordClass: Record<Size, string> = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};
const subClass: Record<Size, string> = {
  sm: "text-[9px] tracking-[0.28em]",
  md: "text-[10px] tracking-[0.3em]",
  lg: "text-xs tracking-[0.32em]",
};

export function GroundworkLogo({
  variant = "wordmark",
  tone = "light",
  size = "md",
  className,
}: {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  const px = markPx[size];
  const src = tone === "dark" ? "/brand/groundwork-mark-dark.png" : "/brand/groundwork-mark-light.png";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={src}
        alt="" /* decorative: the name is real text beside it */
        aria-hidden="true"
        width={px}
        height={px}
        className="shrink-0"
        priority
      />
      {variant !== "mark" ? (
        <span className="flex flex-col justify-center leading-none">
          <span
            className={cn(
              "font-display font-extrabold tracking-tight",
              wordClass[size],
              tone === "dark" ? "text-paper" : "text-ink"
            )}
          >
            GROUNDWORK
          </span>
          {variant === "full" ? (
            <span
              className={cn(
                "mt-1 font-semibold",
                subClass[size],
                tone === "dark" ? "text-sand" : "text-gold-deep"
              )}
            >
              WEB STUDIO
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}

/**
 * The logo as a link home. Used in the header and footer.
 * Carries the accessible name so the mark + wordmark read as one control.
 */
export function GroundworkLogoLink({
  variant = "wordmark",
  tone = "light",
  size = "md",
  className,
}: {
  variant?: Variant;
  tone?: Tone;
  size?: Size;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label="Groundwork Web Studio — home"
      className={cn(
        "inline-flex items-center rounded transition-opacity hover:opacity-80",
        className
      )}
    >
      <GroundworkLogo variant={variant} tone={tone} size={size} />
    </Link>
  );
}
