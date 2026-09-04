import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { HOURS, SITE } from "@/lib/data";
import { formatHoursDisplay } from "@/lib/hours";

export function Story() {
  return (
    <section
      id="story"
      className="scroll-mt-32 px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="story-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal className="reveal-photo overflow-hidden rounded-2xl shadow-[var(--shadow-border)]">
          <img
            src="/images/grill.jpg"
            alt="Jerk chicken over charcoal with thyme and scotch bonnet peppers"
            className="aspect-16/10 w-full object-cover"
            width={1792}
            height={1008}
          />
        </Reveal>
        <Reveal stagger>
          <Eyebrow>The kitchen</Eyebrow>
          <h2
            id="story-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Real jerk. No yellow rice.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Kellz Kitchen is a Sacramento pickup counter with island fire —
            allspice, thyme, scotch bonnet, coconut milk. The jerk is sprayed
            with a house sauce while it sits on the grill. Oxtail goes four
            hours. Callaloo and saltfish is made to order because that’s how it
            should be.
          </p>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Voted best authentic Jamaican food in the city. Catering is not a
            side hustle; large orders are the point. Walk in, call in, or send
            a tray list.
          </p>
          <address className="mt-6 not-italic">
            <p className="font-medium text-fg">{SITE.addressLine}</p>
            <p className="text-muted">{SITE.city}</p>
            <a
              href={SITE.phoneHref}
              className="mt-1 inline-block font-medium text-primary"
            >
              {SITE.phone}
            </a>
          </address>
          <ul className="mt-6 divide-y divide-border border-y border-border text-sm">
            {HOURS.map((row) => (
              <li
                key={row.day}
                className="flex items-center justify-between py-2.5"
              >
                <span className="text-fg">{row.day}</span>
                <span className="tabular-nums text-muted">
                  {row.closed
                    ? "Closed"
                    : formatHoursDisplay(row.open, row.close)}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
