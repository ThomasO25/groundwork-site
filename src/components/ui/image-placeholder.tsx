import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders a real image when `src` is supplied.
 *
 * When no image exists yet:
 *   - PRODUCTION → renders NOTHING (returns null). Visitors must never see
 *     internal placeholder instructions or an unfinished dashed frame.
 *   - DEVELOPMENT → renders a clearly-labeled frame so missing assets stay
 *     obvious while building.
 *
 * Callers must therefore treat this as optional content and keep their layout
 * complete without it (see Hero / About, which switch to a single-column
 * layout when no image is configured).
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  ratio = "aspect-[4/3]",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
}: {
  src?: string;
  alt: string;
  /** Dev-only hint describing the asset the owner needs to supply. */
  label: string;
  ratio?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded border border-line", ratio, className)}>
        <Image src={src} alt={alt} fill className="object-cover" sizes={sizes} priority={priority} />
      </div>
    );
  }

  // No asset supplied → show nothing publicly.
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded border border-dashed border-line bg-concrete",
        ratio,
        className
      )}
      role="img"
      aria-label={`Development placeholder: ${alt}`}
    >
      <span className="absolute left-3 top-3 h-3.5 w-[3px] bg-hivis" aria-hidden="true" />
      <div className="px-6 text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
          Dev only — asset needed
        </p>
        <p className="mt-1.5 max-w-[26ch] text-sm text-steel/90">{label}</p>
        <p className="mt-1.5 text-[11px] text-steel/70">(Hidden in production)</p>
      </div>
    </div>
  );
}
