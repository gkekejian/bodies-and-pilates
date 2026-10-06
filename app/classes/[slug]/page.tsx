import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { OfferCard } from "@/components/sections/offer-card";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { CLASSES, type ClassSlug } from "@/lib/classes";
import { PRIVATE } from "@/lib/pricing";
import { SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ slug: c.slug }));
}

const find = (slug: string) => CLASSES.find((c) => c.slug === (slug as ClassSlug));

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = find(params.slug);
  if (!c) return {};
  return pageMetadata({
    title: `${c.pageTitle} | Bodies and Pilates`,
    description: c.metaDescription,
    path: `/classes/${c.slug}`,
  });
}

export default function ClassDetailPage({ params }: { params: { slug: string } }) {
  const c = find(params.slug);
  if (!c) notFound();

  const isPrivate = c.slug === "private";
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Classes", path: "/classes" },
    { name: c.name, path: `/classes/${c.slug}` },
  ]);
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isPrivate ? "Private Reformer Pilates Session" : `${c.name} Reformer Pilates Class`,
    serviceType: "Reformer Pilates",
    description: c.description,
    provider: { "@id": `${SITE_URL}/#gym` },
    areaServed: { "@type": "City", name: "North Hollywood" },
    offers: {
      "@type": "Offer",
      price: isPrivate ? "100" : "36",
      priceCurrency: "USD",
      url: `${SITE_URL}/pricing`,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <PageHero
        eyebrow={isPrivate ? "Private Reformer Pilates" : "Small-Group Reformer Pilates"}
        title={c.pageTitle}
        intro={<p>{c.oneLiner}</p>}
      >
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-sans text-sm text-charcoal-800/70">
            <li>
              <Link href="/classes" className="hover:text-sage-700">
                Classes
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-charcoal-800">
              {c.name}
            </li>
          </ol>
        </nav>
      </PageHero>

      <section className="bg-cream-50 py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ClassFormatBlock format={c} headingLevel="h2" detailLink={false} />
        </div>
      </section>

      {isPrivate && (
        <section aria-labelledby="private-pricing" className="bg-cream-200 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading id="private-pricing" eyebrow="Pricing" title="Private session pricing" />
            <div className="grid gap-8 md:grid-cols-2">
              {PRIVATE.map((offer) => (
                <OfferCard key={offer.id} offer={offer} highlight={false} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
