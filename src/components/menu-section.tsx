import { Flame } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { CATEGORIES, MENU, type MenuCategory, type MenuItem } from "@/lib/data";
import { useDeferredSwap, useSlidingPill } from "@/lib/motion";
import { formatUsd, cn } from "@/lib/utils";
import { useMemo, useState } from "react";

const HEAT: Record<NonNullable<MenuItem["heat"]>, string> = {
  mild: "Mild",
  medium: "Medium",
  scotch: "Scotch",
};

export function MenuSection() {
  const [filter, setFilter] = useState<"all" | MenuCategory>("all");
  const { shown: shownFilter, visible } = useDeferredSwap(filter, 180);
  const { wrapRef, pill } = useSlidingPill(filter);

  const items = useMemo(
    () =>
      shownFilter === "all"
        ? MENU
        : MENU.filter((item) => item.category === shownFilter),
    [shownFilter],
  );

  return (
    <section
      id="menu"
      className="scroll-mt-32 px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="menu-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-xl" stagger>
            <Eyebrow>The board</Eyebrow>
            <h2
              id="menu-heading"
              className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
            >
              Plates, patties, pans.
            </h2>
            <p className="mt-3 text-muted">
              Filter the fire. Prices are for pickup at Madison — catering trays
              live in the calculator below.
            </p>
          </Reveal>
        </div>

        <div
          ref={wrapRef}
          className="relative mt-8 flex w-full overflow-visible rounded-xl bg-surface-2 p-1"
          role="tablist"
          aria-label="Menu categories"
        >
          <span
            aria-hidden="true"
            className="menu-tab-pill"
            style={{
              transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
              width: pill.w,
              height: pill.h,
              opacity: pill.ready ? 1 : 0,
            }}
          />
          {CATEGORIES.map((cat) => {
            const selected = filter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selected}
                data-pill={selected ? "true" : undefined}
                onClick={() => setFilter(cat.id)}
                className={cn(
                  "relative z-[1] min-h-11 min-w-0 flex-1 touch-manipulation whitespace-nowrap rounded-lg px-1.5 text-[11px] font-semibold tracking-wide transition-colors duration-200 sm:px-3 sm:text-sm",
                  selected ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-border px-6 py-16 text-center">
            <p className="font-display text-2xl">Nothing on the fire.</p>
            <p className="mt-2 text-sm text-muted">
              That filter is empty. Try another category — plates always hit.
            </p>
            <button
              type="button"
              onClick={() => setFilter("all")}
              className="mt-4 text-sm font-medium text-primary"
            >
              Show the full board
            </button>
          </div>
        ) : (
          <div
            className={cn(
              "swap-layer mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
              visible ? "is-in" : "is-out",
            )}
          >
            {items.map((item, i) => (
              <article
                key={`${shownFilter}-${item.id}`}
                className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]"
                style={{ animationDelay: `${Math.min(i, 8) * 45}ms` }}
              >
                <div className="relative aspect-4/3 overflow-hidden bg-surface-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    width={800}
                    height={600}
                  />
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.badge ? (
                      <span className="photo-chip rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
                        {item.badge}
                      </span>
                    ) : null}
                    {item.madeToOrder ? (
                      <span className="photo-chip rounded-full px-2.5 py-1 text-[11px] font-medium backdrop-blur-md">
                        Made to order
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold tracking-tight">
                      {item.name}
                    </h3>
                    <p className="font-medium tabular-nums text-fg">
                      {item.price % 1 === 0
                        ? formatUsd(item.price)
                        : `$${item.price.toFixed(2)}`}
                    </p>
                  </div>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>
                  {item.heat ? (
                    <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-accent uppercase">
                      <Flame className="size-3" />
                      {HEAT[item.heat]}
                    </p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
