/**
 * Public price menu. Confirmed from the live site; use exactly.
 *
 * Retired tiers ($130 for 5 classes/month, $220 for 12 classes/month) are
 * intentionally absent. Existing members keep them; this is display only.
 *
 * Booking links: every legacy clients.mindbodyonline.com link was removed.
 * TODO(owner): for each offer, paste its own MindBody deep link (from
 * MindBody Marketing Links) into `bookingUrl`, so each button goes straight to
 * its pricing option. While it is null:
 *  - packs, memberships, and privates go to the general MindBody pricing page
 *  - the intro offers ($25 first class, $105 week) go to /schedule, so they
 *    never land on the general pricing page
 */
import { MINDBODY } from "@/lib/site";

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
    bookingUrl: null,
    intro: true,
  },
  {
    id: "intro-week",
    name: "One-Week Unlimited",
    price: "$105",
    detail: "Unlimited classes for seven days. First-timers only. Your week starts on your first class.",
    cta: "Book the $105 Intro Week",
    bookingUrl: null,
    intro: true,
  },
];

export const COMMIT: Offer[] = [
  {
    id: "membership-8",
    name: "8 Classes / Month",
    price: "$170",
    unit: "/month",
    perClass: "About $21 per class at full use",
    detail: "Twice a week, the rhythm most clients see results with.",
    badge: "Most Popular",
    cta: "Start the 8-Class Membership",
    bookingUrl: null,
  },
  {
    id: "membership-unlimited",
    name: "Unlimited",
    price: "$280",
    unit: "/month",
    detail: "As many classes as you like, every month.",
    cta: "Start Unlimited",
    bookingUrl: null,
  },
];

export const FLEX: Offer[] = [
  {
    id: "single",
    name: "Single Class",
    price: "$36",
    detail: "One class, whenever it suits you.",
    cta: "Buy a Single Class",
    bookingUrl: null,
  },
  {
    id: "pack-5",
    name: "5-Class Pack",
    price: "$160",
    perClass: "$32 per class",
    detail: "A steady start without a monthly commitment.",
    cta: "Buy the 5-Pack",
    bookingUrl: null,
  },
  {
    id: "pack-10",
    name: "10-Class Pack",
    price: "$300",
    perClass: "$30 per class",
    detail: "The best per-class rate without a membership.",
    cta: "Buy the 10-Pack",
    bookingUrl: null,
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
    bookingUrl: null,
  },
  {
    id: "duet",
    name: "Duet",
    price: "$70",
    unit: "per person",
    detail: "Train alongside a friend or partner with coaching tailored to you both.",
    cta: "Book a Duet",
    bookingUrl: null,
  },
];
