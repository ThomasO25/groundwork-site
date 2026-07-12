import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Clearly-labeled placeholder frame for imagery the client must supply.
 * If `src` is provided it renders the real image instead. This keeps every
 * "missing asset" visible during review — nothing ships looking accidentally empty.
 */
export function ImagePlaceholder({
  src,
  alt,
  label,
  ratio = "aspect-[4/3]",
  className,
}: {
  src?: string;
  alt: string;
  label: string;
  ratio?: string;
  className?: string;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden rounded border border-line", ratio, className)}>
        <Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded border border-dashed border-line bg-concrete",
        ratio,
        className
      )}
      role="img"
      aria-label={`Placeholder: ${alt}`}
    >
      {/* hi-vis corner tick */}
      <span className="absolute left-3 top-3 h-3.5 w-[3px] bg-hivis" aria-hidden="true" />
      <div className="px-6 text-center">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-steel">
          Client asset
        </p>
        <p className="mt-1.5 max-w-[24ch] text-sm text-steel/90">{label}</p>
      </div>
    </div>
  );
}
