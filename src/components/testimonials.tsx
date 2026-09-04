import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { TESTIMONIALS } from "@/lib/data";
import {
  overlayClass,
  useDirectedIndex,
  usePrefersReducedMotion,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const count = TESTIMONIALS.length;
  const { index, dir, leaving, arming, go } = useDirectedIndex(count);

  useEffect(() => {
    if (paused || reduced) return;
    const id = window.setInterval(() => go(index + 1), 5500);
    return () => window.clearInterval(id);
  }, [paused, reduced, count, index, go]);

  return (
    <section
      className="px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="love-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-3xl text-center">
        <Reveal stagger>
          <Eyebrow>From the city</Eyebrow>
          <h2
            id="love-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Plates people talk about.
          </h2>
        </Reveal>

        <div className="relative mt-10 overflow-hidden">
          <div className="relative min-h-64 md:min-h-72">
            {TESTIMONIALS.map((t, i) => {
              const on = i === index;
              return (
                <figure
                  key={t.name}
                  className={cn(
                    overlayClass(i, index, leaving, dir, "y", arming),
                    "px-1",
                  )}
                  aria-hidden={!on}
                >
                  <div className="flex justify-center gap-1" aria-hidden="true">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        className="size-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <blockquote className="mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-fg md:text-3xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-sm text-muted">
                    <span className="font-medium text-fg">{t.name}</span>
                    <span className="mx-2">·</span>
                    {t.place}
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Previous review"
            onClick={() => go(index - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <div className="flex gap-1.5" role="tablist" aria-label="Reviews">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Show review from ${t.name}`}
                aria-selected={i === index}
                onClick={() => go(i)}
                className={cn(
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted",
                )}
              />
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Next review"
            onClick={() => go(index + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
