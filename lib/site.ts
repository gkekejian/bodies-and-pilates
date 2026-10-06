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

// TODO(owner): confirm this is the contact email you want public. Taken from
// the current live site.
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
  // TODO(owner): paste the direct Google Business Profile review URL here
  // (Google Business Profile > Ask for reviews > copy link). Until then the
  // footer links to a Maps search for the studio, which shows the reviews.
  profileUrl: null as string | null,
};

export const googleReviewsHref = () => GOOGLE_REVIEWS.profileUrl ?? MAPS_URL;

export const FIRST_CLASS_CTA = "Book Your $25 First Class";

// TODO(owner): paste the MindBody branded-web deep link for the $25 intro
// offer here. Until it exists, every "Book Your $25 First Class" button
// (header, mobile bar, CTAs) links to the /intro-offer landing page.
export const INTRO_OFFER_DEEP_LINK: string | null = null;

export const introBookingHref = () => INTRO_OFFER_DEEP_LINK ?? "/intro-offer";

export const isExternal = (href: string) => /^(https?:|tel:|sms:|mailto:)/.test(href);
