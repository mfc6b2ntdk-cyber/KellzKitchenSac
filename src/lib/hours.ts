import { HOURS } from "./data";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function partsInSacramento(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  });
  const map: Record<string, string> = {};
  for (const part of fmt.formatToParts(date)) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  return {
    weekday: map.weekday ?? "Monday",
    hour: Number(map.hour ?? 0),
    minute: Number(map.minute ?? 0),
  };
}

function toMinutes(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return (h ?? 0) * 60 + (m ?? 0);
}

export function getKitchenStatus(now = new Date()) {
  const { weekday, hour, minute } = partsInSacramento(now);
  const row = HOURS.find((h) => h.day === weekday) ?? HOURS[0];
  const mins = hour * 60 + minute;
  if (!row || row.closed) {
    const next = nextOpenLabel(weekday);
    return { open: false, label: "Closed Monday", detail: next };
  }
  const openMins = toMinutes(row.open);
  const closeMins = toMinutes(row.close);
  if (mins >= openMins && mins < closeMins) {
    const remaining = closeMins - mins;
    const detail =
      remaining <= 45 ? "Kitchen winds down soon" : `Open until ${formatClock(row.close)}`;
    return { open: true, label: "Kitchen is open", detail };
  }
  if (mins < openMins) {
    return {
      open: false,
      label: "Opens today",
      detail: `Fires up at ${formatClock(row.open)}`,
    };
  }
  return {
    open: false,
    label: "Closed for tonight",
    detail: nextOpenLabel(weekday),
  };
}

function formatClock(hhmm: string) {
  const [hRaw, m] = hhmm.split(":").map(Number);
  const h = hRaw ?? 0;
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return m ? `${h12}:${String(m).padStart(2, "0")} ${suffix}` : `${h12} ${suffix}`;
}

function nextOpenLabel(weekday: string) {
  const start = DAY_NAMES.indexOf(weekday as (typeof DAY_NAMES)[number]);
  for (let i = 1; i <= 7; i++) {
    const idx = (Math.max(start, 0) + i) % 7;
    const name = DAY_NAMES[idx];
    const row = HOURS.find((h) => h.day === name);
    if (row && !row.closed) {
      return `Next fire: ${name} ${formatClock(row.open)}`;
    }
  }
  return "Call the kitchen for hours";
}

export function formatHoursDisplay(open: string, close: string) {
  return `${formatClock(open)} – ${formatClock(close)}`;
}
