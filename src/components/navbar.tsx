import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { FlagStripe } from "@/components/jamaica-bg";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { NAV_LINKS, SITE } from "@/lib/data";
import { getKitchenStatus } from "@/lib/hours";
import { useSlidingPill } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(() => getKitchenStatus());
  const { wrapRef: navRef, pill: navPill } = useSlidingPill(active);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["menu", "catering", "story", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    }
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const tick = () => setStatus(getKitchenStatus());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-bg/92 backdrop-blur-xl transition-[box-shadow,border-color] duration-200",
        scrolled ? "border-border shadow-[var(--shadow-border)]" : "border-border/60",
      )}
    >
      <FlagStripe />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[4.25rem] md:px-6">
        <Logo />

        <nav
          ref={navRef}
          className="relative hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          <span
            aria-hidden="true"
            className="sliding-pill"
            style={{
              transform: `translate(${navPill.x}px, ${navPill.y}px)`,
              width: navPill.w,
              height: navPill.h,
              opacity: navPill.ready ? 1 : 0,
            }}
          />
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              data-pill={active === link.id ? "true" : undefined}
              className={cn(
                "relative z-[1] rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200",
                active === link.id
                  ? "text-fg"
                  : "text-muted hover:text-fg",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "hidden items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium tracking-wide md:inline-flex",
              status.open
                ? "bg-primary/15 text-primary"
                : "bg-surface-2 text-muted",
            )}
          >
            <span
              className={cn(
                "size-1.5 rounded-full",
                status.open ? "live-dot bg-primary" : "bg-muted",
              )}
            />
            {status.label}
          </span>
          <ThemeToggle />
          <Button asChild size="sm">
            <a href={SITE.phoneHref}>
              <Phone />
              Call
            </a>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showClose={false}
          className="top-0 right-0 left-auto h-dvh w-[min(100%,20rem)] max-w-none translate-x-0 translate-y-0 rounded-none border-y-0 border-l border-border p-0 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
        >
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <DialogTitle className="font-sans text-sm font-medium tracking-wide uppercase">
              Menu
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="size-5" />
            </Button>
          </div>
          <nav className="flex flex-col gap-1 p-4" aria-label="Mobile">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "nav-link-in rounded-lg px-3 py-3 text-base font-medium",
                  active === link.id ? "bg-surface-2 text-fg" : "text-muted",
                )}
                style={{ animationDelay: `${80 + i * 70}ms` }}
              >
                {link.label}
              </a>
            ))}
            <Button asChild className="nav-link-in mt-4 w-full" size="lg">
              <a href={SITE.phoneHref} onClick={() => setOpen(false)}>
                <Phone />
                {SITE.phone}
              </a>
            </Button>
          </nav>
        </DialogContent>
      </Dialog>
    </header>
  );
}
