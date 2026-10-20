import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { OfferCard } from "@/components/sections/offer-card";
import { CLASS_CARD_PHOTO } from "@/components/sections/class-media";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { CLASSES, type ClassSlug } from "@/lib/classes";
import { PRIVATE, priceOf } from "@/lib/pricing";
import { CLASSPASS_RATING_LINE, CLASSPASS_URL, SITE_URL } from "@/lib/site";

/**
 * One matched ClassPass review per group class (copy audit, 2026-10-14).
 * Excerpts are verbatim sentences from the reviews in lib/testimonials.ts.
 */
const CLASS_REVIEW: Partial<Record<ClassSlug, { quote: string; attribution: string }>> = {
  beginner: { quote: "The instructor was so kind and came around helping to fix form.", attribution: "Sasha, via ClassPass" },
  fullbody: { quote: "This class is very challenging but the teacher is great.", attribution: "Lori, via ClassPass" },
  flexibility: {
    quote: "I have never felt more worked in a flexibility class, and I loved it.",
    attribution: "Penny, via ClassPass",
  },
};

const PRIVATE_INTRO =
  "A 55-minute one-on-one session on a professional Merrithew reformer with an experienced instructor. $100, or $70 per person as a duet.";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLASSES.map((c) => ({ slug: c.slug }));
}

const find = (slug: string) => CLASSES.find((c) => c.slug === (slug as ClassSlug));

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const c = find(params.slug);
  if (!c) return {};
  return pageMetadata({
    title: c.seoTitle ?? `${c.pageTitle} | Bodies and Pilates`,
    description: c.metaDescription,
    path: `/classes/${c.slug}`,
  });
}

export default async function ClassDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const c = find(params.slug);
  if (!c) notFound();

  const isPrivate = c.slug === "private";
  const review = CLASS_REVIEW[c.slug];
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />

      <PageHero
        eyebrow={isPrivate ? "Private Reformer Pilates" : "Small-Group Reformer Pilates"}
        title={c.pageTitle}
        banner={CLASS_CARD_PHOTO[c.slug]}
        tone="sage"
        intro={
          isPrivate ? (
            <p>{PRIVATE_INTRO}</p>
          ) : (
            <>
              <p>{c.oneLiner}</p>
              <p className="smallcaps mt-4 text-[15px] text-sage-700">
                50 minutes &middot; 7 people max &middot; Merrithew reformers &middot; First class $25
              </p>
            </>
          )
        }
      >
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-sans text-sm text-charcoal-800/75">
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

      {review && (
        <section aria-labelledby="class-proof-heading" className="bg-cream-100 py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 id="class-proof-heading" className="sr-only">
              What clients say about {c.name}
            </h2>
            <figure>
              <blockquote className="font-accent text-xl italic leading-[1.65] text-charcoal-800 sm:text-2xl">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="smallcaps mt-6 text-[15px] text-sage-700">
                {review.attribution}
              </figcaption>
            </figure>
            <p className="mt-6 font-sans text-sm">
              <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="text-sage-700 underline underline-offset-4 hover:text-sage-900">
                {CLASSPASS_RATING_LINE}
              </a>
            </p>
            <p className="mx-auto mt-8 max-w-xl font-sans text-base leading-[1.75] text-charcoal-800/85">
              Your first class is {priceOf("first-class")}, or try a full week for {priceOf("intro-week")}. After that,
              memberships start at {priceOf("membership-5")} a month and pause anytime.
            </p>
          </div>
        </section>
      )}

      {isPrivate && (
        <section aria-labelledby="private-pricing" className="bg-cream-100 py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <SectionHeading id="private-pricing" eyebrow="Pricing" title="Private session pricing" />
            <div className="grid max-w-[42rem] gap-6 sm:grid-cols-2">
              {PRIVATE.map((offer) => (
                <OfferCard key={offer.id} offer={offer} accent={offer.id === "duet" ? "tan" : "sage"} tint="blush" showDetail />
              ))}
            </div>
            <p className="mt-8 font-sans text-sm">
              <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="text-sage-700 underline underline-offset-4 hover:text-sage-900">
                {CLASSPASS_RATING_LINE}
              </a>
            </p>
            <p className="mt-3 font-sans text-base text-charcoal-800/85">
              Prefer a group? Classes are capped at 7, and your first group class is {priceOf("first-class")}.
            </p>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
