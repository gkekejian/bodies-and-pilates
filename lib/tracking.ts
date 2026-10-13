/**
 * Meta Pixel and Google tag configuration, plus the booking-start helpers.
 *
 * META_PIXEL_ID is the owner's "B&P Main" dataset in Meta (ID supplied by the
 * owner, 2026-10-13). The brief asks for the exact ID live on the Wix site;
 * the build sandbox could not reach the Wix site, so confirm it there (page
 * source, search "fbq('init'" or "facebook.com/tr?id=") before DNS cutover.
 *
 * Google: no ID is set until the owner confirms what the Wix site uses. Set
 * NEXT_PUBLIC_GA_ID (G-...) and/or NEXT_PUBLIC_GOOGLE_ADS_ID (AW-...) in
 * Vercel and redeploy; nothing else changes.
 *
 * Events fired by this site (see components/analytics/analytics.tsx):
 *   PageView           Meta, every page and every client-side navigation
 *   ViewContent        Meta, /intro-offer, /pricing, /classes and /classes/*
 *   InitiateCheckout   Meta, click on any MindBody booking link or a Book
 *                      button the schedule widget renders in the page
 *   begin_checkout     Google, same clicks, same handler
 * Schedule and Purchase are NOT fired here: they happen after the visitor
 * has left for MindBody, so they can only come from MindBody's own pixel
 * integration. Firing them here would double count.
 */
export const META_PIXEL_ID = "1074774813955135";
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "";

/** Pages that get a Meta ViewContent event. */
export const VIEW_CONTENT_PATHS = ["/intro-offer", "/pricing", "/classes"];
export const isViewContentPath = (path: string) =>
  VIEW_CONTENT_PATHS.some((p) => path === p || path.startsWith(`${p}/`));

/** Hosts where a click starts a MindBody booking or purchase. */
const BOOKING_HOSTS = ["clients.mindbodyonline.com", "go.mindbodyonline.com", "cart.mindbodyonline.com"];
export const isBookingUrl = (url: URL) => BOOKING_HOSTS.includes(url.hostname);

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
const UTM_STORE = "bp_utm";

/** Remembers the campaign tags a visitor arrived with, for this visit. */
export function captureUtm(search: string) {
  try {
    const params = new URLSearchParams(search);
    const found = UTM_KEYS.filter((k) => params.get(k)).map((k) => [k, params.get(k) as string]);
    if (found.length) sessionStorage.setItem(UTM_STORE, JSON.stringify(Object.fromEntries(found)));
  } catch {
    // Storage blocked: campaign tags are simply not carried.
  }
}

/** Adds the stored campaign tags to a MindBody URL (existing values win). */
export function withUtm(url: URL): URL {
  try {
    const stored = JSON.parse(sessionStorage.getItem(UTM_STORE) || "{}") as Record<string, string>;
    for (const [k, v] of Object.entries(stored)) if (!url.searchParams.has(k)) url.searchParams.set(k, v);
  } catch {
    // Nothing stored or storage blocked.
  }
  return url;
}

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;
const w = () => window as Window & { fbq?: Fbq; gtag?: Gtag };

/** Fires InitiateCheckout (Meta) and begin_checkout (Google) for one booking start. */
export function trackBookingStart(label: string, href: string) {
  const { fbq, gtag } = w();
  fbq?.("track", "InitiateCheckout", { content_name: label, content_category: "MindBody booking" });
  gtag?.("event", "begin_checkout", { items: [{ item_name: label }], link_url: href, transport_type: "beacon" });
}

export function trackPageView() {
  w().fbq?.("track", "PageView");
}

export function trackViewContent(path: string) {
  w().fbq?.("track", "ViewContent", { content_name: path });
}
