import { useEffect, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle, Phone } from "lucide-react";
import { toast } from "sonner";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/data";
import { useQuote } from "@/lib/quote-store";
import {
  inquirySchema,
  sendKitchenInquiry,
  type InquiryValues,
} from "@/lib/send-inquiry";
import { cn } from "@/lib/utils";

const OCCASIONS = [
  "Pickup order",
  "Office catering",
  "Birthday / family",
  "Church or community",
  "Private event",
  "Something else",
];

export function ContactForm() {
  const quote = useQuote((s) => s.quote);
  const [successOpen, setSuccessOpen] = useState(false);
  const [sendError, setSendError] = useState("");

  const form = useForm<InquiryValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      occasion: "",
      partySize: "",
      message: "",
      company: "",
    },
  });

  useEffect(() => {
    if (!quote) return;
    form.setValue("occasion", "Office catering", { shouldValidate: false });
    form.setValue("partySize", String(quote.guests), { shouldValidate: false });
    form.setValue(
      "message",
      `Please confirm this catering estimate:\n${quote.summary}`,
      { shouldValidate: false },
    );
  }, [quote, form]);

  async function onSubmit(values: InquiryValues) {
    setSendError("");
    try {
      const result = await sendKitchenInquiry(values);
      if (!result.ok) {
        setSendError(result.error);
        toast.error(result.error);
        return;
      }
      toast.success("Emailed the kitchen.");
      setSuccessOpen(true);
      form.reset({
        name: "",
        email: "",
        phone: "",
        occasion: "",
        partySize: "",
        message: "",
        company: "",
      });
    } catch {
      setSendError(
        "The note didn’t reach the kitchen inbox. Call (916) 220-4281 — pickup is faster by phone.",
      );
      toast.error(
        "The note didn’t reach the kitchen inbox. Call (916) 220-4281 — pickup is faster by phone.",
      );
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  return (
    <section
      id="contact"
      className="scroll-mt-32 px-4 py-16 md:px-6 md:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal stagger>
          <Eyebrow>The window</Eyebrow>
          <h2
            id="contact-heading"
            className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl"
          >
            Call it in. Or write it down.
          </h2>
          <p className="mt-3 text-muted">
            Pickup is the phone. Catering and large orders — send the form and
            it emails {SITE.email}.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="cream" className="w-full sm:w-auto">
              <a href={SITE.phoneHref}>
                <Phone />
                Call {SITE.phone}
              </a>
            </Button>
            <p className="mt-2 text-xs text-muted">Main pickup path · kitchen line</p>
          </div>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <a href={`mailto:${SITE.email}`} className="font-medium text-fg">
                {SITE.email}
              </a>
              <span className="mt-0.5 block text-muted">Kitchen inbox</span>
            </p>
            <p>
              <a href={SITE.mapsUrl} className="font-medium text-fg">
                {SITE.addressLine}
              </a>
              <span className="mt-0.5 block text-muted">{SITE.city}</span>
            </p>
            <p>
              <a
                href={SITE.instagram}
                className="font-medium text-fg"
                target="_blank"
                rel="noreferrer"
              >
                {SITE.instagramHandle}
              </a>
              <span className="mt-0.5 block text-muted">Daily specials</span>
            </p>
          </div>
        </Reveal>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-border)] md:p-7"
        >
          {quote ? (
            <p className="quote-banner mb-5 rounded-lg bg-primary/10 px-3 py-2 text-sm text-fg">
              Quote loaded: {quote.summary}
            </p>
          ) : null}
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" htmlFor="contact-name" error={errors.name?.message}>
              <Input
                id="contact-name"
                autoComplete="name"
                aria-invalid={Boolean(errors.name)}
                {...register("name")}
              />
            </Field>
            <Field label="Email" htmlFor="contact-email" error={errors.email?.message}>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                {...register("email")}
              />
            </Field>
            <Field label="Phone" htmlFor="contact-phone" error={errors.phone?.message}>
              <Input
                id="contact-phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                aria-invalid={Boolean(errors.phone)}
                {...register("phone")}
              />
            </Field>
            <Field label="Occasion" htmlFor="contact-occasion" error={errors.occasion?.message}>
              <select
                id="contact-occasion"
                className="flex h-11 w-full rounded-md border border-border bg-surface px-3 text-sm text-fg focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
                aria-invalid={Boolean(errors.occasion)}
                {...register("occasion")}
              >
                <option value="">Select one</option>
                {OCCASIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
            <Field
              label="Party size"
              htmlFor="contact-party"
              error={errors.partySize?.message}
              className="sm:col-span-2"
            >
              <Input
                id="contact-party"
                inputMode="numeric"
                placeholder="Optional"
                {...register("partySize")}
              />
            </Field>
            <Field
              label="Message"
              htmlFor="contact-message"
              error={errors.message?.message}
              className="sm:col-span-2"
            >
              <Textarea
                id="contact-message"
                rows={5}
                aria-invalid={Boolean(errors.message)}
                placeholder="Proteins, heat level, date, pickup or drop-off"
                {...register("message")}
              />
            </Field>
          </div>
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="contact-company">Company</label>
            <input
              id="contact-company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="animate-spin" />
                  Sending to the kitchen
                </>
              ) : (
                "Send to the kitchen"
              )}
            </Button>
            <Button asChild size="lg" variant="cream" className="w-full sm:w-auto">
              <a href={SITE.phoneHref}>
                <Phone />
                Call instead
              </a>
            </Button>
          </div>
          {sendError ? (
            <p className="field-error mt-3 text-sm text-accent" role="alert">
              {sendError}
            </p>
          ) : (
            <p className="mt-3 text-xs text-muted">
              Emails {SITE.email}. Same-day pickup — call {SITE.phone}.
            </p>
          )}
        </form>
      </div>

      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Emailed the kitchen.</DialogTitle>
            <DialogDescription>
              Name, email, phone, occasion, party size, and message went to{" "}
              {SITE.email}. For pickup, call — that’s the fastest path.
            </DialogDescription>
          </DialogHeader>
          <Button asChild size="lg">
            <a href={SITE.phoneHref}>
              <Phone />
              Call {SITE.phone}
            </a>
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function Field({
  label,
  error,
  className,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  htmlFor?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor}>{label}</Label>
      {children}
      {error ? <p className="field-error text-xs text-accent">{error}</p> : null}
    </div>
  );
}
