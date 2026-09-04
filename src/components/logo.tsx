import { cn } from "@/lib/utils";

export function Logo({
  className,
  size = "sm",
}: {
  className?: string;
  size?: "sm" | "lg";
}) {
  const px = size === "lg" ? 112 : 48;
  return (
    <a
      href="#top"
      className={cn("group flex min-w-0 items-center gap-2.5 no-underline", className)}
      aria-label="Kellz Kitchen home"
    >
      <img
        src="/images/kellz-logo.png"
        alt="Kellz Kitchen — Voted #1 Jamaican Cuisine"
        width={px}
        height={px}
        className={cn(
          "shrink-0 rounded-full bg-transparent shadow-[0_1px_2px_rgba(22,18,15,0.18)]",
          size === "lg"
            ? "size-[5.5rem] md:size-[7rem]"
            : "size-12",
        )}
      />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            "font-display font-semibold tracking-tight text-fg",
            size === "lg" ? "text-2xl md:text-3xl" : "text-[15px] sm:text-lg",
          )}
        >
          Kellz Kitchen
        </span>
        <span
          className={cn(
            "font-medium tracking-[0.16em] text-muted uppercase",
            size === "lg" ? "mt-1 text-[11px]" : "mt-0.5 text-[9px] sm:text-[10px]",
          )}
        >
          Jamaican Cuisine
        </span>
      </span>
    </a>
  );
}
