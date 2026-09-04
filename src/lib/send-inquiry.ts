import { z } from "zod";

export const KITCHEN_EMAIL = "kellzkitchenjamaicancuisine@gmail.com";

export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Name needs at least 2 characters").max(80),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .max(120)
    .refine((v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), "Enter a valid email"),
  phone: z
    .string()
    .trim()
    .max(40)
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a 10-digit phone"),
  occasion: z.string().trim().min(1, "Pick an occasion").max(80),
  partySize: z.string().trim().max(20).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Give us a little more to go on")
    .max(2000),
  company: z.string().max(80).optional(),
});

export type InquiryValues = z.infer<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | { ok: false; error: string };

const FAIL =
  "The note didn’t reach the kitchen inbox. Call (916) 220-4281 — pickup is faster by phone.";

function parseSubmit(text: string): { success: boolean; message: string } {
  try {
    const json = JSON.parse(text) as { success?: unknown; message?: unknown };
    const success = json.success === true || json.success === "true";
    const message = typeof json.message === "string" ? json.message : "";
    return { success, message };
  } catch {
    return { success: false, message: text.slice(0, 240) };
  }
}

/** Emails the kitchen Gmail. Success is only true after the inbox accepts the send. */
export async function sendKitchenInquiry(
  data: InquiryValues,
): Promise<InquiryResult> {
  if (data.company?.trim()) {
    return { ok: false, error: FAIL };
  }

  const party = data.partySize?.trim() || "Not listed";
  const payload = {
    _subject: "Kellz Kitchen inquiry",
    _template: "table" as const,
    _captcha: "false",
    _replyto: data.email,
    name: data.name,
    email: data.email,
    phone: data.phone,
    occasion: data.occasion,
    partySize: party,
    message: data.message,
  };

  let text: string;
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${KITCHEN_EMAIL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    text = await res.text();
  } catch {
    return { ok: false, error: FAIL };
  }

  const { success, message } = parseSubmit(text);
  if (success) return { ok: true };

  if (/activ/i.test(message)) {
    return {
      ok: false,
      error:
        "The kitchen inbox still needs a one-time confirm. Call (916) 220-4281 for pickup.",
    };
  }
  if (/rate limit/i.test(message)) {
    return {
      ok: false,
      error:
        "Too many notes just now. Call (916) 220-4281 and the kitchen will take it live.",
    };
  }
  return { ok: false, error: FAIL };
}
