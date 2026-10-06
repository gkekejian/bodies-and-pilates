/**
 * Single source of truth for business facts (NAP, hours, links, booking).
 * Every page, the footer, and the JSON-LD schema read from here.
 *
 * Owner-confirmed values only. Anything unconfirmed is marked TODO and is
 * either null (component renders a labeled placeholder or a safe fallback)
 * or flagged for confirmation.
 */

export const SITE_URL = "https://www.bodiesandpilates.com";
export const SITE_NAME = "Bodies and Pilates";

// Canonical business line. The owner's personal mobile must never appear
// anywhere on the site, in the footer, or in schema.
export const PHONE = {
  display: "818-813-4446",
  tel: "tel:+18188134446",
  sms: "sms:+18188134446",
  schema: "+1-818-813-4446",
} as const;

// Confirmed from the live site footer.
export const EMAIL = "Naira@bodiesandpilates.com";

export const ADDRESS = {
  street: "5251 Vineland Ave, Suite 6",
  city: "North Hollywood",
  region: "CA",
  zip: "91601",
  country: "US",
  oneLine: "5251 Vineland Ave, Suite 6, North Hollywood, CA 91601",
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `Bodies and Pilates, ${ADDRESS.oneLine}`
)}`;

export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(
  ADDRESS.oneLine
)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

export interface DayHours {
  day: string;
  short: string;
  opens: string; // 24h, for schema
  closes: string;
  label: string; // human readable
}

// Owner-confirmed hours. Do not copy hours from the old Wix site.
export const HOURS: DayHours[] = [
  { day: "Monday", short: "Mon", opens: "07:00", closes: "20:00", label: "7am to 8pm" },
  { day: "Tuesday", short: "Tue", opens: "08:30", closes: "20:30", label: "8:30am to 8:30pm" },
  { day: "Wednesday", short: "Wed", opens: "07:00", closes: "20:00", label: "7am to 8pm" },
  { day: "Thursday", short: "Thu", opens: "08:30", closes: "20:30", label: "8:30am to 8:30pm" },
  { day: "Friday", short: "Fri", opens: "07:00", closes: "20:00", label: "7am to 8pm" },
  { day: "Saturday", short: "Sat", opens: "09:00", closes: "12:00", label: "9am to 12pm" },
  { day: "Sunday", short: "Sun", opens: "09:00", closes: "12:00", label: "9am to 12pm" },
];

export const INSTAGRAM = {
  handle: "@bodiesandpilates",
  url: "https://www.instagram.com/bodiesandpilates",
} as const;

export const GOOGLE_REVIEWS = {
  rating: "5.0",
  count: 14,
  // Owner-supplied Google review link.
  profileUrl: "https://share.google/iiwq2gBssUKulvsol" as string | null,
};

export const googleReviewsHref = () => GOOGLE_REVIEWS.profileUrl ?? MAPS_URL;

export const CLASSPASS_URL = "https://classpass.com/studios/bodies-and-pilates-los-angeles";

/**
 * MindBody (site ID 5739427). Owner-supplied links and widgets.
 * Same-tab links: classes and pricing. New tab: the app smart link.
 */
export const MINDBODY = {
  siteId: "5739427",
  /** "Book a class" destination: the MindBody class booking page. */
  classesUrl: "https://go.mindbodyonline.com/book/app/classes/5739427",
  /** General pricing page. Interim target for pack, membership, and private buttons. */
  pricingUrl: "https://go.mindbodyonline.com/book/app/pricing/bus_11kS9of8y3RDLJFBGg",
  /** "Get the Mindbody app" smart link. */
  appUrl: "https://get.mndbdy.ly/GiC0CPO08Mb",
  /** Branded-web Schedules widget embedded on /schedule. */
  scheduleWidgetId: "8550823b9a6",
  /**
   * Spare HealCode registrations widgets supplied by the owner, unlabeled and
   * not used yet. Ask the owner which is which before wiring either one.
   */
  spareRegistrationWidgetIds: ["85150676b9a6", "85151183b9a6"],
  /** HealCode account-link widget ("Login | Register"), used in the footer. */
  accountLinkSiteId: "121411",
} as const;

export const FIRST_CLASS_CTA = "Book Your $25 First Class";

// MindBody deep link for the $25 First Class pricing option (from the live
// site). Used by every "Book Your $25 First Class" button, header and mobile
// bar included. Same link as the first-class offer in lib/pricing.ts.
export const INTRO_OFFER_DEEP_LINK: string | null =
  "https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=43&prodid=100010";

export const introBookingHref = () => INTRO_OFFER_DEEP_LINK ?? "/intro-offer";

export const isExternal = (href: string) => /^(https?:|tel:|sms:|mailto:)/.test(href);
