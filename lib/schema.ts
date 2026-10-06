import { ADDRESS, HOURS, INSTAGRAM, PHONE, SITE_NAME, SITE_URL } from "@/lib/site";

/**
 * ExerciseGym JSON-LD, rendered in the root layout <head>.
 */
export const exerciseGymSchema = {
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": `${SITE_URL}/#gym`,
  name: SITE_NAME,
  address: {
    "@type": "PostalAddress",
    streetAddress: ADDRESS.street,
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.zip,
    addressCountry: ADDRESS.country,
  },
  telephone: PHONE.schema,
  url: `${SITE_URL}/`,
  priceRange: "$$",
  // TODO(owner): add geo coordinates once confirmed from the Google Business
  // Profile pin, e.g. geo: { "@type": "GeoCoordinates", latitude: 0, longitude: 0 }.
  //
  // Opening hours come from the owner-confirmed hours in lib/site.ts.
  // TODO(owner): re-check these match the Google Business Profile exactly.
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.day,
    opens: h.opens,
    closes: h.closes,
  })),
  sameAs: [INSTAGRAM.url],
};

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}
