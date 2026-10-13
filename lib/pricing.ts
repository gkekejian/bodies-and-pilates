/**
 * Public price menu. Owner decision: every tier exactly as on the live site's
 * pricing page, including the $130 (5/month) and $220 (12/month) memberships.
 *
 * Booking links: each offer has its own MindBody deep link, extracted from
 * the live site's "Book Now" buttons (classic MindBody URLs, same tab). If the
 * owner later provides go.mindbodyonline.com Marketing Links equivalents,
 * swap them in here.
 */
import { INTRO_OFFER_DEEP_LINK, MINDBODY } from "@/lib/site";

const mb = (stype: 40 | 43, prodid: number) =>
  `https://clients.mindbodyonline.com/classic/ws?studioid=${MINDBODY.siteId}&stype=${stype}&prodid=${prodid}`;

export interface Offer {
  id: string;
  name: string;
  price: string;
  unit?: string;
  detail: string;
  perClass?: string;
  badge?: string;
  cta: string;
  bookingUrl: string | null;
  /** First-timer intro offer. Never falls back to the general pricing page. */
  intro?: boolean;
}

export const offerHref = (offer: Offer) =>
  offer.bookingUrl ?? (offer.intro ? "/schedule" : MINDBODY.pricingUrl);

export const TRY: Offer[] = [
  {
    id: "first-class",
    name: "First Class",
    price: "$25",
    detail: "One small-group reformer class to meet the studio, the reformer, and your instructor.",
    cta: "Book Your $25 First Class",
    bookingUrl: INTRO_OFFER_DEEP_LINK,
    intro: true,
  },
  {
    id: "intro-week",
    name: "One-Week Unlimited",
    price: "$105",
    detail: "Unlimited classes for seven days. First-timers only. Your week starts on your first class.",
    cta: "Book the $105 Intro Week",
    bookingUrl: mb(43, 100014),
    intro: true,
  },
];

export const COMMIT: Offer[] = [
  {
    id: "membership-5",
    name: "5 Classes / Month",
    price: "$130",
    unit: "/month",
    perClass: "$26 per class",
    detail: "A steady weekly habit with a little flexibility.",
    cta: "Start the 5-Class Membership",
    bookingUrl: mb(40, 100),
  },
  {
    id: "membership-8",
    name: "8 Classes / Month",
    price: "$170",
    unit: "/month",
    perClass: "About $21 per class",
    detail: "Twice a week, the rhythm most clients see results with.",
    badge: "Most Popular",
    cta: "Start the 8-Class Membership",
    bookingUrl: mb(40, 102),
  },
  {
    id: "membership-12",
    name: "12 Classes / Month",
    price: "$220",
    unit: "/month",
    perClass: "About $18 per class",
    detail: "Three classes a week for faster progress.",
    cta: "Start the 12-Class Membership",
    bookingUrl: mb(40, 103),
  },
  {
    id: "membership-unlimited",
    name: "Unlimited",
    price: "$280",
    unit: "/month",
    perClass: "About $10 per class",
    detail: "As many classes as you like, every month.",
    cta: "Start Unlimited",
    bookingUrl: mb(40, 101),
  },
];

export const FLEX: Offer[] = [
  {
    id: "single",
    name: "Single Class",
    price: "$36",
    detail: "One class, whenever it suits you.",
    cta: "Buy a Single Class",
    bookingUrl: mb(43, 100003),
  },
  {
    id: "pack-5",
    name: "5-Class Pack",
    price: "$160",
    perClass: "$32 per class",
    detail: "A steady start without a monthly commitment.",
    cta: "Buy the 5-Pack",
    bookingUrl: mb(43, 100004),
  },
  {
    id: "pack-10",
    name: "10-Class Pack",
    price: "$300",
    perClass: "$30 per class",
    detail: "The best per-class rate without a membership.",
    cta: "Buy the 10-Pack",
    bookingUrl: mb(43, 100005),
  },
];

export const PRIVATE: Offer[] = [
  {
    id: "private",
    name: "Private 1:1",
    price: "$100",
    unit: "per 55-min session",
    detail: "Your instructor, your reformer, your goals. Ideal for beginners, injuries, or prenatal with clearance.",
    cta: "Book a Private Session",
    bookingUrl: mb(43, 100011),
  },
  {
    id: "duet",
    name: "Duet",
    price: "$70",
    unit: "per person",
    detail: "Train alongside a friend or partner with coaching tailored to you both.",
    cta: "Book a Duet",
    bookingUrl: mb(43, 100016),
  },
];

/** Owner-confirmed policy lines shown on /pricing (FAQ carries the longer versions). */
export const POLICY = {
  cancellation: "Cancel 12+ hours ahead: no charge. Late cancel: credit forfeited. No-show: $15.",
  membership: "Pause anytime. Cancel with 7 days' notice. No fees.",
} as const;

/**
 * Every price surface (cards, the /pricing table, the Home teaser) reads from
 * the arrays above. The table walks these groups in order.
 */
export const PRICE_GROUPS: { type: string; offers: Offer[] }[] = [
  { type: "Intro (first-timers)", offers: TRY },
  { type: "Membership", offers: COMMIT },
  { type: "Class pack", offers: FLEX },
  { type: "Private training", offers: PRIVATE },
];

const ALL_OFFERS = PRICE_GROUPS.flatMap((g) => g.offers);

/** Price string for an offer id, e.g. priceOf("pack-5") === "$160". */
export const priceOf = (id: string) => {
  const offer = ALL_OFFERS.find((o) => o.id === id);
  if (!offer) throw new Error(`Unknown offer id: ${id}`);
  return offer.price;
};

/**
 * The owner's locked menu (October 12, 2026). The build fails if the arrays
 * above drift from it: a changed price, an extra or missing offer (private
 * packs are not sold), or "/month" on anything other than a membership.
 * To change a price, the owner confirms it and both places are updated.
 */
const LOCKED_MENU: Record<string, string> = {
  "first-class": "$25",
  "intro-week": "$105",
  single: "$36",
  "pack-5": "$160",
  "pack-10": "$300",
  "membership-5": "$130",
  "membership-8": "$170",
  "membership-12": "$220",
  "membership-unlimited": "$280",
  duet: "$70",
  private: "$100",
};

function assertLockedMenu() {
  const ids = ALL_OFFERS.map((o) => o.id);
  const expected = Object.keys(LOCKED_MENU);
  const extra = ids.filter((id) => !(id in LOCKED_MENU));
  const missing = expected.filter((id) => !ids.includes(id));
  if (extra.length || missing.length) {
    throw new Error(`Pricing drift. Not on the menu: [${extra.join(", ")}]. Missing: [${missing.join(", ")}].`);
  }
  for (const o of ALL_OFFERS) {
    if (o.price !== LOCKED_MENU[o.id]) throw new Error(`Pricing drift: ${o.id} is ${o.price}, menu says ${LOCKED_MENU[o.id]}.`);
    const isMembership = COMMIT.includes(o);
    if (isMembership !== (o.unit === "/month")) {
      throw new Error(`"/month" belongs on the four memberships only (check ${o.id}).`);
    }
  }
  if (COMMIT.filter((o) => o.badge).map((o) => o.id).join() !== "membership-8") {
    throw new Error("Most Popular badge belongs on the 8-class membership only.");
  }
}

assertLockedMenu();
