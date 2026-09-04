import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Clock3, Flame, Phone } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/data";
import {
  overlayClass,
  useDirectedIndex,
  usePrefersReducedMotion,
  useSlidingPill,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const SLIDES = [
  {
    id: "jerk",
    name: "Jerk Chicken",
    eta: "12 min",
    heat: "Scotch",
    note: "Secret sauce on the grill. Char, thyme, allspice.",
    image: "/images/jerk-chicken.jpg",
    alt: "Jerk chicken with charred grill marks, rice and peas, and cabbage",
  },
  {
    id: "oxtail",
    name: "Oxtail",
    eta: "Ready",
    heat: "Mild",
    note: "Four-hour braise. Gravy thick enough to argue over.",
    image: "/images/oxtail.jpg",
    alt: "Braised Jamaican oxtail in mahogany gravy with butter beans",
  },
  {
    id: "goat",
    name: "Curry Goat",
    eta: "18 min",
    heat: "Medium",
    note: "Fresh curry, bone-in, rice and peas waiting.",
    image: "/images/curry-goat.jpg",
    alt: "Jamaican curry goat in golden sauce over rice",
  },
  {
    id: "feast",
    name: "The spread",
    eta: "Family",
    heat: "Island",
    note: "Jerk, oxtail, plantain, festival — the table you came for.",
    image: "/images/hero-feast.jpg",
    alt: "Jamaican feast of jerk chicken, oxtail, rice and peas, and plantains",
  },
] as const;

export function Hero() {
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = SLIDES.length;
  const { index, dir, leaving, arming, go } = useDirectedIndex(count);
  const active = SLIDES[index] ?? SLIDES[0];
  const { wrapRef, pill } = useSlidingPill(active.id);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(index + 1), 5200);
    return () => window.clearInterval(id);
  }, [paused, reduced, count, index, go]);

  return (
    <section
      id="top"
      className="relative overflow-hidden px-4 pt-8 pb-16 md:px-6 md:pt-14 md:pb-24"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
        <div>
          <div className="stagger-in">
            <Eyebrow>Sacramento · 5800 Madison, Ste S</Eyebrow>
          </div>
          <h1 className="stagger-in mt-5 font-display text-4xl leading-[1.04] font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-[4.25rem]">
            Yardie heat.
            <span className="mt-1 block italic text-muted">
              Sacramento plates.
            </span>
          </h1>
          <p className="stagger-in mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Voted best authentic Jamaican food in Sac. Four-hour oxtail. Jerk
            kissed on the grill. Built for pickup, large orders, and the people
            you actually feed.
          </p>
          <div className="stagger-in mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" variant="cream">
              <a href="#menu">
                See the menu
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#catering">Plan catering</a>
            </Button>
          </div>
          <div className="stagger-in mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center gap-1.5 font-medium text-fg hover:text-primary"
            >
              <Phone className="size-3.5" />
              {SITE.phone}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="size-3.5" />
              Tue–Sat from 11
            </span>
          </div>
        </div>

        <div
          className="relative stagger-in"
          style={{ animationDelay: "280ms" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative isolate overflow-hidden rounded-2xl shadow-[var(--shadow-border-hover)]">
            <div className="relative aspect-4/3 overflow-hidden md:aspect-16/10">
              {SLIDES.map((slide, i) => {
                const on = i === index;
                return (
                  <div
                    key={slide.id}
                    className={overlayClass(i, index, leaving, dir, "x", arming)}
                    aria-hidden={!on}
                  >
                    <img
                      src={slide.image}
                      alt={on ? slide.alt : ""}
                      className={cn(
                        "h-full w-full object-cover",
                        !reduced && on && "ken-in",
                      )}
                      width={1600}
                      height={1000}
                    />
                  </div>
                );
              })}
              {!reduced && leaving !== null ? (
                <>
                  <span key={`curtain-${index}`} className="hero-curtain" />
                  <span
                    key={`wipe-${index}`}
                    className={cn("hero-wipe", dir === -1 && "is-reverse")}
                  />
                </>
              ) : null}
              <div className="photo-scrim" />
              <div className="absolute right-3 bottom-4 left-3 z-[6] md:right-5 md:bottom-5 md:left-5">
                <div key={active.id} className="hero-caption min-h-14">
                  <p className="photo-type font-display text-lg font-semibold tracking-tight md:text-xl">
                    {active.name}
                  </p>
                  <p className="photo-type text-xs opacity-80">{active.note}</p>
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div className="flex gap-1.5">
                    {SLIDES.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        aria-label={`Show ${s.name}`}
                        aria-current={i === index}
                        onClick={() => go(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-[width,background-color] duration-300",
                          i === index
                            ? "photo-dot w-7"
                            : "photo-dot-idle w-1.5 hover:opacity-80",
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="photo-nav-btn size-9 rounded-full md:size-10"
                      aria-label="Previous plate"
                      onClick={() => go(index - 1)}
                    >
                      <ChevronLeft className="size-4" />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      className="photo-nav-btn size-9 rounded-full md:size-10"
                      aria-label="Next plate"
                      onClick={() => go(index + 1)}
                    >
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <span
                key={index}
                className={cn(
                  "hero-progress",
                  !reduced && "is-running",
                  paused && "is-paused",
                )}
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="mt-3">
            <div className="rounded-xl border border-border bg-surface p-1.5 shadow-[var(--shadow-border)]">
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">
                  On the grill
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] text-primary">
                  <Flame className="size-3" />
                  Live
                </span>
              </div>
              <div ref={wrapRef} className="relative grid grid-cols-2 gap-1 sm:grid-cols-4">
                <span
                  aria-hidden="true"
                  className="sliding-pill"
                  style={{
                    transform: `translate(${pill.x}px, ${pill.y}px)`,
                    width: pill.w,
                    height: pill.h,
                    opacity: pill.ready ? 1 : 0,
                  }}
                />
                {SLIDES.map((ticket, i) => (
                  <button
                    key={ticket.id}
                    type="button"
                    data-pill={i === index ? "true" : undefined}
                    onClick={() => go(i)}
                    className={cn(
                      "relative z-[1] flex min-h-11 w-full flex-col rounded-lg px-2.5 py-2.5 text-left transition-colors duration-200",
                      i === index ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span className="text-xs font-medium">{ticket.name}</span>
                    <span className="mt-0.5 text-[11px] tabular-nums opacity-80">
                      {ticket.eta}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
