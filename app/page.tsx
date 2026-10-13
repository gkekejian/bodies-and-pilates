import Link from "next/link";
import { CtaLink } from "@/components/ui/cta-link";
import { MediaItem, MediaPhoto } from "@/components/ui/media";
import { SectionHeading, eyebrowClass } from "@/components/sections/section-heading";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { ClassPassRating } from "@/components/sections/classpass-rating";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { FinalCta } from "@/components/sections/final-cta";
import { FirstTimerGuide } from "@/components/sections/first-timer-guide";
import { pageMetadata } from "@/lib/metadata";
import { MEDIA, present } from "@/lib/media";
import { CLASSES, GROUP_CLASSES } from "@/lib/classes";
import { TRY, priceOf } from "@/lib/pricing";
import { SERVICE_AREAS } from "@/lib/areas";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Reformer Pilates in North Hollywood | Bodies and Pilates",
  description:
    "Small-group reformer Pilates in North Hollywood. First class $25. Real coaching, beginner-friendly classes, transparent pricing. Call 818-813-4446.",
  path: "/",
});

// TODO(owner): if you cap class size (e.g. "never more than X reformers"),
// add the number here. It is the strongest proof point you have.
const proofPoints = [
  {
    title: "Small classes",
    body: "Every class is small enough for your instructor to see each person on the reformer, every rep.",
  },
  {
    title: "Consistent instructors",
    body: "One coaching team that knows your name and your body. Members see the same instructor each week.",
  },
  {
    title: "Real coaching on form",
    body: "Clear cues, spring adjustments, and modifications for the full 50 minutes, so every movement counts.",
  },
];

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

// Owner mapping: two studio photos and the logo medallion clip under the hero.
const studioStrip = present([MEDIA.studioBrightRows, MEDIA.receptionWall, MEDIA.logoMedallion]);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <section className="bg-cream-100">
        <div className={`${container} grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-12 lg:gap-14 lg:py-24`}>
          <div className={MEDIA.classPlankWide ? "lg:col-span-7" : "lg:col-span-9"}>
            <p className={`${eyebrowClass} mb-6`}>North Hollywood &middot; Est. 2024</p>
            <h1 className="font-serif text-4xl leading-[1.08] text-charcoal-900 sm:text-5xl lg:text-6xl">
              Reformer Pilates in North Hollywood
            </h1>
            <p className="mt-7 max-w-xl font-sans text-lg leading-[1.65] text-charcoal-800/85 sm:text-xl">
              Small-group reformer classes, real coaching, and a calm space to get stronger. Your first class is $25.
            </p>
            <div className="mt-9">
              <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
            </div>
            <p className="mt-6 font-sans text-sm text-charcoal-800/80">
              First time?{" "}
              <a href="#first-timers-guide" className="text-sage-700 underline underline-offset-4 hover:text-sage-500">
                What to wear, where to park, which class to take
              </a>
            </p>
          </div>
          {MEDIA.classPlankWide && (
            <div className="lg:col-span-5">
              {/* Above the fold on phones now that the hero has no form: load it eagerly. */}
              <MediaPhoto
                media={MEDIA.classPlankWide}
                eager
                aspectClassName="aspect-[4/5]"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* 1b. Studio strip */}
      {studioStrip.length > 0 && (
        <section aria-label="Inside the studio" className="bg-cream-100 pb-4 pt-2 sm:pb-8">
          <ul className={`${container} grid grid-cols-3 gap-3 sm:gap-4`}>
            {studioStrip.map((m) => (
              <li key={m.file}>
                <MediaItem media={m} aspectClassName="aspect-[3/4]" sizes="(max-width: 1024px) 33vw, 360px" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 1c. ClassPass rating */}
      <ClassPassRating className="bg-cream-100" />

      {/* 2. Intro offers */}
      <section aria-labelledby="intro-offers-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="intro-offers-heading"
            eyebrow="New Here"
            title="Two easy ways to start"
            intro={<p>Try a single class, or take a full week to find your rhythm. Both are for first-timers.</p>}
          />
          <div className={MEDIA.clientsArriving ? "grid items-start gap-8 lg:grid-cols-12" : undefined}>
            <div className={MEDIA.clientsArriving ? "lg:col-span-8" : undefined}>
              <div className="grid gap-8 md:grid-cols-2">
                {TRY.map((offer, i) => (
                  <OfferCard key={offer.id} offer={offer} highlight={i === 0} />
                ))}
              </div>
              <div className="mt-8">
                <CtaLink href="/intro-offer" variant="text">
                  What to expect at your first class
                </CtaLink>
              </div>
            </div>
            {MEDIA.clientsArriving && (
              <MediaItem
                media={MEDIA.clientsArriving}
                aspectClassName="aspect-[4/5]"
                className="mx-auto w-full max-w-xs lg:col-span-4 lg:max-w-none"
                sizes="(max-width: 1024px) 80vw, 30vw"
              />
            )}
          </div>
        </div>
      </section>

      {/* 3. Reformer Pilates explainer */}
      <section aria-labelledby="reformer-heading" className="bg-cream-200 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          {MEDIA.classKneelingLegPress && (
            <div className="lg:col-span-5">
              <MediaPhoto media={MEDIA.classKneelingLegPress} sizes="(max-width: 1024px) 100vw, 40vw" />
            </div>
          )}
          <div className="lg:col-span-7">
            <SectionHeading
              id="reformer-heading"
              eyebrow="The Method"
              title="Why reformer Pilates works here"
              intro={
                <p>
                  Reformer Pilates is strength and mobility training on a spring-loaded machine called the reformer. The
                  springs add resistance to classic Pilates movements, so you build lean strength and control with low
                  impact on your joints. Every group class at our Vineland Ave studio is taught on the reformer.
                </p>
              }
            />
            <ul className="grid gap-6 sm:grid-cols-3">
              {proofPoints.map((p, i) => (
                <li key={p.title} className="border-t border-sage-500/40 pt-5">
                  <span className="font-serif text-2xl text-sage-700">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl text-charcoal-900">{p.title}</h3>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-800/80">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Class types preview */}
      <section aria-labelledby="class-types-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading id="class-types-heading" eyebrow="Class Types" title="Find your class" />
          <ul className="grid gap-px border border-taupe-300/70 bg-taupe-300/70 sm:grid-cols-2 lg:grid-cols-4">
            {CLASSES.map((c) => (
              <li key={c.slug} className="bg-cream-50">
                <Link href={`/classes/${c.slug}`} className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-cream-100">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-sage-700">{c.duration}</span>
                  <h3 className="font-serif text-2xl text-charcoal-900">{c.name}</h3>
                  <span className="font-sans text-sm leading-relaxed text-charcoal-800/80">
                    {c.level === c.name ? "Built for first-timers" : c.level}
                  </span>
                  <span className="mt-auto pt-4 font-sans text-xs uppercase tracking-[0.2em] text-sage-700 group-hover:text-sage-500">
                    Learn more <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <CtaLink href="/classes" variant="outline">
              View all classes
            </CtaLink>
            <CtaLink href="/schedule" variant="text">
              See this week&apos;s schedule
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 5. Small-group classes */}
      <section aria-labelledby="small-group-heading" className="bg-cream-100 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="small-group-heading"
              eyebrow="The Format"
              title="Small-Group Pilates Classes"
              intro={
                <p>
                  Every group class runs on the reformer with a small group, so you get the energy of a class and the
                  attention of a session. Pick the format that fits your week.
                </p>
              }
            />
            <dl className="divide-y divide-taupe-300/60 border-y border-taupe-300/60">
              {GROUP_CLASSES.map((c) => (
                <div key={c.slug} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-serif text-xl text-charcoal-900">{c.name}</dt>
                  <dd className="font-sans text-base leading-relaxed text-charcoal-800/85">{c.oneLiner}</dd>
                </div>
              ))}
            </dl>
          </div>
          {MEDIA.classStandingWork && (
            <div className="lg:col-span-5">
              <MediaItem
                media={MEDIA.classStandingWork}
                aspectClassName="aspect-[4/5]"
                className="mx-auto max-w-sm lg:max-w-none"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          )}
        </div>
      </section>

      {/* 6. ClassPass */}
      <ClassPassStrip />

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Pricing teaser */}
      <section aria-labelledby="pricing-teaser-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="pricing-teaser-heading"
            eyebrow="Pricing"
            title="Simple, honest pricing"
            intro={<p>Start with an intro offer, then choose a membership or a class pack.</p>}
          />
          <div className="grid gap-px border border-taupe-300/70 bg-taupe-300/70 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Try", price: priceOf("first-class"), note: `First class. Or ${priceOf("intro-week")} for a week unlimited.` },
              {
                label: "Commit",
                price: `${priceOf("membership-5")}/mo`,
                note: `5, 8, or 12 classes a month, or unlimited for ${priceOf("membership-unlimited")}. 8 classes is our most popular plan.`,
              },
              { label: "Flex", price: priceOf("single"), note: `Single class. Packs of 5 for ${priceOf("pack-5")} or 10 for ${priceOf("pack-10")}.` },
              { label: "Private", price: priceOf("private"), note: `55-minute 1:1 session. Duets ${priceOf("duet")} per person.` },
            ].map((tier) => (
              <div key={tier.label} className="bg-cream-50 p-7">
                <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-sage-700">{tier.label}</p>
                <p className="mt-3 font-serif text-4xl text-charcoal-900">{tier.price}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/80">{tier.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/pricing" variant="outline">
              See full pricing
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 9. FAQ teaser */}
      <FaqTeaser />

      {/* 10. Areas we serve */}
      <section aria-labelledby="areas-heading" className="bg-cream-100 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="areas-heading"
            eyebrow="Areas We Serve"
            title="Reformer Pilates near you"
            intro={
              <p>
                Our studio is on Vineland Ave in North Hollywood. Most clients come from North Hollywood and the
                neighborhoods around it.
              </p>
            }
          />
          <ul className="grid gap-px border border-taupe-300/70 bg-taupe-300/70 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_AREAS.map((a) => (
              <li key={a.name} className="bg-cream-100 p-6">
                <h3 className="font-serif text-xl text-charcoal-900">{a.name}</h3>
                <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-800/80">{a.line}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <CtaLink href="/contact" variant="outline">
              Directions and parking
            </CtaLink>
            <CtaLink href="/about#neighborhoods" variant="text">
              Routes from nearby neighborhoods
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <FinalCta />

      {/* 12. First-timer's guide (on-page; replaces the email form at launch) */}
      <FirstTimerGuide />
    </>
  );
}
