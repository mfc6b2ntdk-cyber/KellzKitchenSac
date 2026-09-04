import { useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  ShoppingBag,
  Truck,
  UtensilsCrossed,
} from "lucide-react";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SERVICES, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS = {
  pickup: ShoppingBag,
  catering: UtensilsCrossed,
  delivery: Truck,
  events: CalendarDays,
} as const;

export function Services() {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = SERVICES.find((s) => s.id === openId) ?? null;

  return (
    <section className="px-4 py-16 md:px-6 md:py-24" aria-labelledby="services-heading">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl" stagger>
          <Eyebrow>How we feed you</Eyebrow>
          <h2
            id="services-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Pickup, pans, and parties.
          </h2>
          <p className="mt-3 text-muted">
            A Madison pickup window that actually moves, plus catering built for
            large orders — the thing the kitchen is known for.
          </p>
        </Reveal>

        <Reveal className="mt-10 grid gap-3 sm:grid-cols-2" stagger>
          {SERVICES.map((service) => {
            const Icon = ICONS[service.id as keyof typeof ICONS];
            return (
              <article
                key={service.id}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-200",
                  "hover:-translate-y-0.5 hover:shadow-[var(--shadow-border-hover)]",
                )}
              >
                <span className="service-wash" aria-hidden="true" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-lg bg-surface-2 text-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                      <Icon className="size-4" />
                    </span>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-muted uppercase">
                      {service.kicker}
                    </p>
                  </div>
                  <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => setOpenId(service.id)}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-fg transition-colors hover:text-primary"
                  >
                    Learn more
                    <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && setOpenId(null)}>
        <DialogContent>
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle>{active.title}</DialogTitle>
                <DialogDescription>{active.kicker}</DialogDescription>
              </DialogHeader>
              <p className="text-sm leading-relaxed text-fg/90">{active.body}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button asChild>
                  <a href={SITE.phoneHref}>Call {SITE.phone}</a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={active.id === "catering" ? "#catering" : "#contact"}
                    onClick={() => setOpenId(null)}
                  >
                    {active.id === "catering" ? "Open calculator" : "Send a note"}
                  </a>
                </Button>
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  );
}
