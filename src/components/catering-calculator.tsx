import { useMemo, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ADD_ONS, PACKAGES } from "@/lib/data";
import { useAnimatedNumber, useSlidingPill } from "@/lib/motion";
import { useQuote } from "@/lib/quote-store";
import { cn, formatUsd } from "@/lib/utils";

type PkgId = (typeof PACKAGES)[number]["id"];
type AddonId = (typeof ADD_ONS)[number]["id"];

export function CateringCalculator() {
  const [guests, setGuests] = useState(40);
  const [pkg, setPkg] = useState<PkgId>("island");
  const [pkgTouched, setPkgTouched] = useState(false);
  const [addons, setAddons] = useState<AddonId[]>(["chafer"]);
  const setQuote = useQuote((s) => s.setQuote);
  const { wrapRef, pill } = useSlidingPill(pkg);

  const selectedPkg = PACKAGES.find((p) => p.id === pkg) ?? PACKAGES[1];

  const breakdown = useMemo(() => {
    const base = selectedPkg.perGuest * guests;
    const extra = ADD_ONS.reduce((sum, item) => {
      if (!addons.includes(item.id)) return sum;
      if ("perGuest" in item) return sum + item.perGuest * guests;
      return sum + item.flat;
    }, 0);
    return { base, extra, total: base + extra };
  }, [addons, guests, selectedPkg]);

  const shownTotal = useAnimatedNumber(breakdown.total);
  const shownBase = useAnimatedNumber(breakdown.base);
  const shownExtra = useAnimatedNumber(breakdown.extra);

  function toggleAddon(id: AddonId) {
    setAddons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  function requestQuote() {
    const extraLabels = ADD_ONS.filter((a) => addons.includes(a.id))
      .map((a) => a.label)
      .join(", ");
    const summary = `${guests} guests · ${selectedPkg.name}${
      extraLabels ? ` · ${extraLabels}` : ""
    } · ${formatUsd(breakdown.total)} estimate`;
    setQuote({
      guests,
      packageName: selectedPkg.name,
      total: breakdown.total,
      summary,
    });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section
      id="catering"
      className="scroll-mt-32 px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="catering-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl" stagger>
          <Eyebrow>Large orders</Eyebrow>
          <h2
            id="catering-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Catering calculator.
          </h2>
          <p className="mt-3 text-muted">
            Drag the headcount. Pick a spread. Watch the estimate move. The
            kitchen confirms proteins and timing — this is the honest floor.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-border)] md:p-7">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted">Guests</p>
                <p className="font-display text-4xl font-semibold tabular-nums">
                  {guests}
                </p>
              </div>
              <p className="text-xs text-muted">15 – 200</p>
            </div>
            <Slider
              className="mt-6"
              min={15}
              max={200}
              step={1}
              value={[guests]}
              onValueChange={(v) => setGuests(v[0] ?? 40)}
              aria-label="Number of guests"
            />

            <p className="mt-8 text-sm font-medium text-muted">Spread</p>
            <div ref={wrapRef} className="relative mt-3 grid gap-2">
              <span
                aria-hidden="true"
                className="sliding-pill rounded-xl bg-primary/10"
                style={{
                  transform: `translate(${pill.x}px, ${pill.y}px)`,
                  width: pill.w,
                  height: pill.h,
                  opacity: pill.ready ? 1 : 0,
                }}
              />
              {PACKAGES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  data-pill={pkg === item.id ? "true" : undefined}
                  onClick={() => {
                    setPkgTouched(true);
                    setPkg(item.id);
                  }}
                  className={cn(
                    "relative z-[1] flex items-start justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-[color,background-color,border-color,transform] duration-200",
                    pkg === item.id
                      ? "border-primary bg-transparent"
                      : "border-border hover:bg-surface-2",
                  )}
                >
                  <span>
                    <span className="block font-medium text-fg">{item.name}</span>
                    <span className="mt-0.5 block text-sm text-muted">
                      {item.blurb}
                    </span>
                  </span>
                  <span className="shrink-0 font-medium tabular-nums text-fg">
                    {formatUsd(item.perGuest)}
                    <span className="text-xs font-normal text-muted"> / guest</span>
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-8 text-sm font-medium text-muted">Add-ons</p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {ADD_ONS.map((item) => {
                const on = addons.includes(item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => toggleAddon(item.id)}
                    className={cn(
                      "flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left text-sm transition-colors duration-150",
                      on
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-surface-2",
                    )}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={cn(
                          "grid size-5 place-items-center rounded-sm border transition-[background-color,border-color] duration-200",
                          on
                            ? "border-primary bg-primary text-primary-fg"
                            : "border-border",
                        )}
                      >
                        <Check
                          className={cn(
                            "size-3 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                            on
                              ? "scale-100 opacity-100 blur-none"
                              : "scale-[0.25] opacity-0 blur-[4px]",
                          )}
                        />
                      </span>
                      {item.label}
                    </span>
                    <span className="tabular-nums text-muted">
                      {"perGuest" in item
                        ? `${formatUsd(item.perGuest)}/g`
                        : formatUsd(item.flat)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="relative overflow-hidden rounded-2xl border border-border bg-fg p-6 text-bg shadow-[var(--shadow-border)] md:p-7">
            {pkgTouched ? (
              <span key={pkg} className="estimate-flash" aria-hidden="true" />
            ) : null}
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase opacity-70">
              Estimate
            </p>
            <p className="mt-2 font-display text-5xl font-semibold tracking-tight tabular-nums">
              {formatUsd(shownTotal)}
            </p>
            <p className="mt-2 text-sm opacity-70">
              Before tax · kitchen confirms the final
            </p>
            <dl className="mt-8 space-y-3 border-t border-bg/15 pt-5 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="relative h-5 flex-1 overflow-hidden opacity-70">
                  {PACKAGES.map((item) => (
                    <span
                      key={item.id}
                      className={cn(
                        "crossfade-copy absolute inset-0",
                        pkg === item.id ? "is-on" : "is-off",
                      )}
                    >
                      {item.name} × {guests}
                    </span>
                  ))}
                </dt>
                <dd className="tabular-nums">{formatUsd(shownBase)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="opacity-70">Add-ons</dt>
                <dd className="tabular-nums">{formatUsd(shownExtra)}</dd>
              </div>
              <div className="flex justify-between gap-4 font-medium">
                <dt>Tonight’s floor</dt>
                <dd className="tabular-nums">{formatUsd(shownTotal)}</dd>
              </div>
            </dl>
            <Button
              type="button"
              variant="default"
              size="lg"
              className="mt-8 w-full"
              onClick={requestQuote}
            >
              Request this quote
              <ArrowRight />
            </Button>
            <p className="mt-3 text-xs leading-relaxed opacity-60">
              Drops the numbers into the contact form. Call for same-week trays
              over 80 guests.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
