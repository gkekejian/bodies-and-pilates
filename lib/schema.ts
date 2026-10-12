import { ADDRESS, BLOG_AUTHOR, CLASSPASS_URL, EMAIL, HOURS, INSTAGRAM, MAPS_URL, PHONE, SITE_NAME, SITE_URL } from "@/lib/site";
import { COMMIT, FLEX, PRIVATE, TRY, offerHref, type Offer } from "@/lib/pricing";

const offer = (o: Offer) => ({
  "@type": "Offer",
  name: o.name,
  description: o.detail,
  url: offerHref(o),
  ...(o.unit === "/month"
    ? {
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: o.price.replace("$", ""),
          priceCurrency: "USD",
          unitText: "MONTH",
        },
      }
    : { price: o.price.replace("$", ""), priceCurrency: "USD" }),
});

const catalog = (name: string, offers: Offer[]) => ({
  "@type": "OfferCatalog",
  name,
  itemListElement: offers.map(offer),
});

/**
 * ExerciseGym JSON-LD, rendered in the root layout <head>. ExerciseGym is a
 * LocalBusiness (and Organization), so it doubles as the Organization node.
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
  email: EMAIL,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/images/logo.svg`,
  image: `${SITE_URL}/opengraph-image`,
  description:
    "Independent boutique reformer Pilates studio in North Hollywood. Small-group reformer classes with coaching on form, plus private sessions. First class $25.",
  foundingDate: "2024",
  founder: { "@type": "Person", name: BLOG_AUTHOR.name, jobTitle: "Owner and Lead Instructor" },
  hasMap: MAPS_URL,
  priceRange: "$$",
  currenciesAccepted: "USD",
  areaServed: ["North Hollywood", "Toluca Lake", "Valley Village", "Studio City", "Burbank"].map((name) => ({
    "@type": "Place",
    name,
  })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Reformer Pilates classes and memberships",
    itemListElement: [
      catalog("Intro offers", TRY),
      catalog("Memberships", COMMIT),
      catalog("Class packs", FLEX),
      catalog("Private training", PRIVATE),
    ],
  },
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
  sameAs: [INSTAGRAM.url, CLASSPASS_URL],
};

/** WebSite node, published by the studio. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#gym` },
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
