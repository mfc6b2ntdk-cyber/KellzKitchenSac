import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NAV_LINKS, SITE } from "@/lib/data";
import { sendKitchenInquiry } from "@/lib/send-inquiry";

export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function onNewsletter(e: FormEvent) {
    e.preventDefault();
    const address = email.trim().toLowerCase();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address);
    if (!ok) {
      setError("Enter a valid email");
      return;
    }
    setError("");
    setSending(true);
    try {
      const result = await sendKitchenInquiry({
        name: "Specials list",
        email: address,
        phone: SITE.phone,
        occasion: "Something else",
        partySize: "",
        message: `Add this address to the Kellz Kitchen specials list: ${address}`,
      });
      if (!result.ok) {
        setError(result.error);
        toast.error("Couldn’t add you — call the kitchen and they’ll put you on the list.");
        return;
      }
      toast.success("You’re on the specials list — emailed the kitchen.");
      setEmail("");
    } finally {
      setSending(false);
    }
  }

  return (
    <footer className="border-t border-border bg-surface-2/50 px-4 py-14 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo size="lg" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Authentic Jamaican cuisine on Madison. Jerk, oxtail, curry goat,
            catering for the whole yard.
          </p>
          <form onSubmit={onNewsletter} className="mt-6 max-w-sm" noValidate>
            <label htmlFor="newsletter" className="text-sm font-medium">
              Specials list
            </label>
            <div className="mt-2 flex gap-2">
              <Input
                id="newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                aria-invalid={Boolean(error)}
              />
              <Button type="submit" disabled={sending}>
                {sending ? "Sending" : "Join"}
              </Button>
            </div>
            {error ? <p className="mt-1.5 text-xs text-accent">{error}</p> : null}
          </form>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            Visit
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a href={l.href} className="text-fg hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">
            Out in the world
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-fg hover:text-primary"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={SITE.doordash}
                target="_blank"
                rel="noreferrer"
                className="text-fg hover:text-primary"
              >
                DoorDash
              </a>
            </li>
            <li>
              <a
                href={SITE.yelp}
                target="_blank"
                rel="noreferrer"
                className="text-fg hover:text-primary"
              >
                Yelp
              </a>
            </li>
            <li>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="text-fg hover:text-primary"
              >
                Google Maps
              </a>
            </li>
            <li>
              <a href={SITE.phoneHref} className="text-fg hover:text-primary">
                {SITE.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className="text-fg hover:text-primary">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-6xl text-xs text-muted">
        © {new Date().getFullYear()} Kellz Kitchen Jamaican Cuisine · Sacramento
      </p>
    </footer>
  );
}
