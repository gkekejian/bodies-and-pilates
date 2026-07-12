import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbSchema } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  title: "Neighborhoods We Serve",
  description:
    "Bodies and Pilates serves North Hollywood, Glendale, Toluca Lake, Studio City, Valley Village, Burbank, and Hollywood. Boutique reformer and mat Pilates. $25 first class.",
  alternates: { canonical: "https://www.bodiesandpilates.com/locations" },
  openGraph: {
    title: "Neighborhoods We Serve | Bodies and Pilates",
    description:
      "Bodies and Pilates serves North Hollywood, Glendale, Toluca Lake, Studio City, Valley Village, Burbank, and Hollywood. Boutique reformer and mat Pilates. $25 first class.",
    url: "https://www.bodiesandpilates.com/locations",
  },
};

const breadcrumb = breadcrumbSchema([
  { name: "Home", url: "https://www.bodiesandpilates.com/" },
  { name: "Locations", url: "https://www.bodiesandpilates.com/locations" },
]);

const areas = [
  {
    name: "Toluca Lake",
    href: "/locations/toluca-lake",
    driveTime: "~5 min",
    blurb: "A quick hop over the 134 — the closest boutique reformer studio to the village.",
  },
  {
    name: "Valley Village",
    href: "/locations/valley-village",
    driveTime: "~5 min",
    blurb: "A few minutes up Vineland — close enough to make Pilates a habit.",
  },
  {
    name: "Studio City",
    href: "/locations/studio-city",
    driveTime: "~7 min",
    blurb: "An easy drive up Vineland or Lankershim from Ventura Blvd.",
  },
  {
    name: "Burbank",
    href: "/locations/burbank",
    driveTime: "~10 min",
    blurb: "Straight down Magnolia or Olive from most of Burbank.",
  },
  {
    name: "Glendale",
    href: "/locations/glendale",
    driveTime: "~15 min",
    blurb: "One straight run west on the 134 — an easy reverse commute.",
  },
  {
    name: "Hollywood",
    href: "/locations/hollywood",
    driveTime: "~15 min",
    blurb: "Over the Cahuenga Pass — calmer than anything on the other side of the hill.",
  },
];

export default function LocationsIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      {/* Hero */}
      <section className="bg-cream-200 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sage-500 font-sans text-xs tracking-[0.22em] uppercase mb-4">
            Locations
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-900 mb-4">
            Neighborhoods We Serve
          </h1>
          <p className="font-sans text-lg text-charcoal-800/75 max-w-2xl">
            Our studio sits at 5251 Vineland Ave in the heart of North Hollywood —
            minutes from Toluca Lake, Valley Village, Studio City, Burbank,
            Glendale, and Hollywood.
          </p>
          <div className="w-12 h-px bg-sage-500 mt-6" aria-hidden="true" />
        </div>
      </section>

      {/* Area grid */}
      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {areas.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="group block h-full bg-cream-100 border border-taupe-300 rounded-2xl p-6 transition-colors hover:border-sage-500"
                >
                  <div className="flex items-baseline justify-between mb-3">
                    <h2 className="font-serif text-2xl text-charcoal-800 group-hover:text-sage-700 transition-colors">
                      {area.name}
                    </h2>
                    <span className="font-sans text-xs text-charcoal-800/60">
                      {area.driveTime}
                    </span>
                  </div>
                  <p className="font-sans text-sm text-charcoal-800/75 leading-relaxed">
                    {area.blurb}
                  </p>
                  <span className="mt-4 inline-block font-sans text-xs tracking-[0.18em] uppercase text-sage-700">
                    Directions & details →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-sage-700 text-cream-50 font-sans text-sm font-semibold px-8 py-3.5 transition-colors hover:bg-sage-500"
            >
              Book Your $25 First Class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
