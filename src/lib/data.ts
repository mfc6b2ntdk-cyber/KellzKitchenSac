export const SITE = {
  name: "Kellz Kitchen",
  fullName: "Kellz Kitchen Jamaican Cuisine",
  tagline: "Yardie heat. Sacramento plates.",
  phone: "(916) 220-4281",
  phoneHref: "tel:+19162204281",
  email: "kellzkitchenjamaicancuisine@gmail.com",
  addressLine: "5800 Madison Ave, Ste S",
  city: "Sacramento, CA 95841",
  mapsUrl:
    "https://maps.google.com/?q=5800+Madison+Ave+Ste+S+Sacramento+CA+95841",
  instagram: "https://www.instagram.com/kellzkitchenjamaicancuisine/",
  instagramHandle: "@kellzkitchenjamaicancuisine",
  doordash:
    "https://www.doordash.com/store/kellz-kitchen-jamaican-cuisine-sacramento-27761909/",
  yelp: "https://www.yelp.com/biz/kellz-kitchen-jamaican-cuisine-sacramento-3",
  hoursNote: "Pickup window · kitchen closes when the pans do",
} as const;

export const HOURS: { day: string; open: string; close: string; closed?: boolean }[] = [
  { day: "Monday", open: "", close: "", closed: true },
  { day: "Tuesday", open: "11:00", close: "20:00" },
  { day: "Wednesday", open: "11:00", close: "20:00" },
  { day: "Thursday", open: "11:00", close: "20:00" },
  { day: "Friday", open: "11:00", close: "21:00" },
  { day: "Saturday", open: "11:00", close: "21:00" },
  { day: "Sunday", open: "12:00", close: "18:00" },
];

export type MenuCategory = "plates" | "patties" | "sides" | "drinks";

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  category: MenuCategory;
  description: string;
  image: string;
  heat?: "mild" | "medium" | "scotch";
  badge?: string;
  madeToOrder?: boolean;
};

export const MENU: MenuItem[] = [
  {
    id: "jerk-chicken",
    name: "Jerk Chicken",
    price: 28,
    category: "plates",
    heat: "scotch",
    badge: "Voted #1",
    image: "/images/jerk-chicken.jpg",
    description:
      "Slow-cooked on the grill, spicy, juicy, full of flavor. The chef’s secret sauce is shaken in a bottle and sprayed while it hits the fire. You will know real jerk after this plate.",
  },
  {
    id: "oxtail",
    name: "Oxtail",
    price: 38,
    category: "plates",
    heat: "mild",
    badge: "Best seller",
    image: "/images/oxtail.jpg",
    description:
      "Marinated, then slow-cooked about four hours with authentic herbs, vegetables, and spice. Tender enough to slip off the bone, gravy thick enough to argue over.",
  },
  {
    id: "brown-stew",
    name: "Brown Stew Chicken",
    price: 26,
    category: "plates",
    heat: "medium",
    image: "/images/brown-stew.jpg",
    description:
      "Caramelized mahogany stew with onions and peppers. Served with rice and peas, cabbage, or double rice — the Sac weeknight regular.",
  },
  {
    id: "curry-goat",
    name: "Curry Goat",
    price: 32,
    category: "plates",
    heat: "medium",
    image: "/images/curry-goat.jpg",
    description:
      "Built fresh with curry, allspice, and thyme. Fall-off-the-bone goat, island gravy, rice and peas or festival on the side.",
  },
  {
    id: "rasta-pasta",
    name: "Rasta Pasta",
    price: 26,
    category: "plates",
    heat: "medium",
    image: "/images/rasta-pasta.jpg",
    description:
      "Creamy pasta, jerk chicken, and the red-gold-green pepper mix. A Sacramento favorite for people who ‘don’t usually do Jamaican.’",
  },
  {
    id: "callaloo",
    name: "Callaloo & Saltfish",
    price: 28,
    category: "plates",
    heat: "mild",
    madeToOrder: true,
    image: "/images/callaloo.jpg",
    description:
      "Made to order — about 30 minutes. Pre-boiled saltfish folded into callaloo, herbs, and garden vegetables. Jamaica’s morning plate, served all day.",
  },
  {
    id: "combo",
    name: "Two-Meat Combo",
    price: 36,
    category: "plates",
    heat: "medium",
    image: "/images/hero-feast.jpg",
    description:
      "Pick two proteins. Comes with rice and peas and cabbage. Mention your meats in the notes — kitchen will build the plate.",
  },
  {
    id: "beef-patty",
    name: "Spicy Beef Patty",
    price: 5,
    category: "patties",
    heat: "scotch",
    image: "/images/beef-patty.jpg",
    description:
      "Flaky turmeric crust, seasoned beef, the proper island fold. Mild is on the board too if you want the heat turned down.",
  },
  {
    id: "mild-patty",
    name: "Mild Beef Patty",
    price: 5,
    category: "patties",
    heat: "mild",
    image: "/images/beef-patty.jpg",
    description:
      "Same golden pastry, gentler spice. The lunch-run staple from Madison.",
  },
  {
    id: "chicken-patty",
    name: "Chicken Patty",
    price: 5.5,
    category: "patties",
    heat: "medium",
    image: "/images/beef-patty.jpg",
    description:
      "Curried chicken tucked in a flaky shell. Mild or spicy — say which when you order.",
  },
  {
    id: "rice-peas",
    name: "Rice & Peas",
    price: 6,
    category: "sides",
    image: "/images/jerk-chicken.jpg",
    description:
      "Boiled fresh with coconut milk, kidney beans, thyme, and scallion. Not an afterthought — the plate’s backbone.",
  },
  {
    id: "mac",
    name: "Baked Mac N Cheez",
    price: 8,
    category: "sides",
    image: "/images/mac.jpg",
    description:
      "Heavy cream, cheese roux, baked until the top catches. The side people pretend they will share.",
  },
  {
    id: "plantain",
    name: "Fried Plantain",
    price: 5,
    category: "sides",
    image: "/images/plantains.jpg",
    description: "Three pieces of ripe plantain, fried sweet and caramelized.",
  },
  {
    id: "cabbage",
    name: "Steamed Cabbage",
    price: 6,
    category: "sides",
    image: "/images/callaloo.jpg",
    description:
      "Fresh vegetables, herbs, and spice. Seasoned just right — the thing regulars mention by name.",
  },
  {
    id: "festival",
    name: "Festival",
    price: 4,
    category: "sides",
    image: "/images/plantains.jpg",
    description: "Sweet fried dumpling with a golden glaze. Built to chase gravy.",
  },
  {
    id: "ting",
    name: "Imported Ting",
    price: 3.5,
    category: "drinks",
    image: "/images/drinks.jpg",
    description: "Grapefruit soda with the proper fizz. The bottle that belongs next to jerk.",
  },
  {
    id: "ginger-beer",
    name: "Ginger Beer",
    price: 3.5,
    category: "drinks",
    image: "/images/drinks.jpg",
    description: "Cold, non-alcoholic, with a real ginger bite.",
  },
  {
    id: "cream-soda",
    name: "Jamaican Cream Soda",
    price: 3.5,
    category: "drinks",
    image: "/images/drinks.jpg",
    description: "Imported cream soda — sweet, nostalgic, ice-cold.",
  },
  {
    id: "pineapple-soda",
    name: "Pineapple Soda",
    price: 3.5,
    category: "drinks",
    image: "/images/drinks.jpg",
    description: "Island pineapple soda, fizzy and cold.",
  },
];

export const CATEGORIES: { id: "all" | MenuCategory; label: string }[] = [
  { id: "all", label: "All" },
  { id: "plates", label: "Plates" },
  { id: "patties", label: "Patties" },
  { id: "sides", label: "Sides" },
  { id: "drinks", label: "Drinks" },
];

export const SERVICES = [
  {
    id: "pickup",
    title: "Madison pickup",
    kicker: "Ste S · 5800 Madison",
    summary: "Call it in, pull up, plates are hot. The original Kellz move.",
    body: "Pickup lives at 5800 Madison Avenue, Suite S in Sacramento. Call (916) 220-4281, name your plates, and give the kitchen a beat — jerk comes off the grill, oxtail is already in the pot. Made-to-order items like callaloo & saltfish and fried chicken need about 30 extra minutes. Street parking along the plaza; look for Suite S.",
  },
  {
    id: "catering",
    title: "Catering",
    kicker: "Trays · chafers · office",
    summary: "The kitchen is built for large orders. Birthdays, offices, church.",
    body: "Kellz specializes in large orders. Trays of jerk, oxtail, curry goat, rice and peas, cabbage, and mac travel well and land hot. Drop-off in the greater Sacramento area, or full setups with chafing dishes. Use the catering calculator for a live estimate, then send the quote through the form — the kitchen confirms protein counts and timing.",
  },
  {
    id: "delivery",
    title: "Delivery",
    kicker: "DoorDash · Sacramento",
    summary: "Can’t make Madison? The same plates ride across town.",
    body: "Order through DoorDash for delivery across Sacramento. Online windows typically run 11:00 a.m. to about 7:40 p.m. while the kitchen is open. For large catering drops we still prefer a direct call so the pans are packed as one run, not a stack of single tickets.",
  },
  {
    id: "events",
    title: "Private tables",
    kicker: "Yard parties · Sundays",
    summary: "A whole spread for the people you actually like.",
    body: "Family reunions, baby showers, rugby after-parties, Sunday dinners that turned into 40 people. Tell us headcount, heat preference (mild / medium / scotch), and whether you want Ting on ice. We’ll map proteins, sides, and a pickup or drop-off window that does not leave you holding empty chafers.",
  },
];

export const PACKAGES = [
  {
    id: "yardie",
    name: "Yardie Spread",
    perGuest: 22,
    blurb: "Jerk chicken, rice & peas, cabbage, plantain.",
  },
  {
    id: "island",
    name: "Island Feast",
    perGuest: 32,
    blurb: "Jerk plus oxtail or curry goat, mac, festival, rice, cabbage.",
  },
  {
    id: "royal",
    name: "Royal Table",
    perGuest: 44,
    blurb: "Oxtail, jerk, and goat. Full sides, drink station, a sweet.",
  },
] as const;

export const ADD_ONS = [
  { id: "drinks", label: "Ting & soda station", perGuest: 4 },
  { id: "protein", label: "Extra protein tray", flat: 180 },
  { id: "chafer", label: "Chafing dishes & setup", flat: 85 },
  { id: "attendant", label: "Service attendant (3 hr)", flat: 140 },
] as const;

export const TESTIMONIALS = [
  {
    name: "Marcus Reid",
    place: "Arden-Arcade",
    rating: 5,
    quote:
      "Best Jamaican food in Sac. The jerk and stew chicken slap, oxtail is tender, cabbage seasoned just right. Don’t sleep.",
  },
  {
    name: "Alicia Chen",
    place: "Midtown office",
    rating: 5,
    quote:
      "Ordered Island Feast for twelve. Trays showed on time, gravy still glossy, nobody went back to the sad salad bar. Already booked the next Friday.",
  },
  {
    name: "Devon Blake",
    place: "South Sac",
    rating: 5,
    quote:
      "First time eating Jamaican. They walked me through heat levels like I was family. Medium jerk, extra plantain, Ting. I’m ruined for anywhere else.",
  },
  {
    name: "Patrice Williams",
    place: "Citrus Heights",
    rating: 5,
    quote:
      "The four-hour oxtail is the real thing. Butter beans, gravy, rice and peas done in coconut milk — not the yellow rice some spots try to hide behind.",
  },
  {
    name: "Luis Ortega",
    place: "Natomas",
    rating: 5,
    quote:
      "Patty and Ting is my Tuesday. Spicy beef, flaky crust, no greasy bag. Call ahead and it’s waiting when you pull in.",
  },
  {
    name: "Keisha Morgan",
    place: "Elk Grove",
    rating: 5,
    quote:
      "Rasta pasta converted my husband, who ‘doesn’t do spice.’ Scotch-level jerk is still on the board for me. Kitchen does both without watering either down.",
  },
] as const;

export const NAV_LINKS = [
  { href: "#menu", label: "Menu", id: "menu" },
  { href: "#catering", label: "Catering", id: "catering" },
  { href: "#story", label: "Kitchen", id: "story" },
  { href: "#contact", label: "Contact", id: "contact" },
] as const;
