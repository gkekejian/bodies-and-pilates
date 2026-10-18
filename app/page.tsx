import Link from "next/link";
import { CtaLink } from "@/components/ui/cta-link";
import { MediaItem, MediaPhoto } from "@/components/ui/media";
import { SectionHeading } from "@/components/sections/section-heading";
import { ClassCards } from "@/components/sections/class-media";
import { InstagramIcon } from "@/components/layout/footer";
import { OfferCard } from "@/components/sections/offer-card";
import { ClassPassStrip } from "@/components/sections/classpass-strip";
import { Testimonials } from "@/components/sections/testimonials";
import { ClassPassRating } from "@/components/sections/classpass-rating";
import { FaqTeaser } from "@/components/sections/faq-teaser";
import { FinalCta } from "@/components/sections/final-cta";
import { FirstTimerGuide } from "@/components/sections/first-timer-guide";
import { pageMetadata } from "@/lib/metadata";
import { MEDIA, present, type PhotoMedia } from "@/lib/media";
import { GROUP_CLASSES } from "@/lib/classes";
import { TRY, priceOf } from "@/lib/pricing";
import { SERVICE_AREAS } from "@/lib/areas";
import { FIRST_CLASS_CTA, INSTAGRAM, introBookingHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Reformer Pilates in North Hollywood | Bodies and Pilates",
  description:
    "Reformer Pilates in North Hollywood, 7 people max on Merrithew reformers. Rated 4.9 on ClassPass. First class $25. Call 818-813-4446.",
  path: "/",
});

// Fact sheet (2026-10-14): 7-person cap, Merrithew reformers, experienced instructors.
const proofPoints = [
  {
    title: "Small classes",
    body: "Never more than 7 people in a class, so your instructor can see every person on every rep.",
  },
  {
    title: "Experienced instructors",
    body: "Experienced instructors coach your form for the full 50 minutes, with clear cues, spring changes and modifications.",
  },
  {
    title: "Merrithew reformers",
    body: "We teach every class on professional Merrithew reformers.",
  },
];

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

/** The old site's two-up row: a studio photo with the section name set on it, and a centered paragraph. */
function PhotoTitle({ media, label, className }: { media: PhotoMedia | null; label: string; className?: string }) {
  if (!media) return null;
  return (
    <div className={`relative ${className ?? ""}`}>
      <MediaPhoto media={media} aspectClassName="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]" sizes="(max-width: 1024px) 100vw, 50vw" />
      <span aria-hidden="true" className="absolute inset-0 bg-charcoal-900/25" />
      <span
        aria-hidden="true"
        className="banner-text absolute inset-0 flex items-center justify-center font-serif text-5xl text-cream-50 sm:text-6xl"
      >
        {label}
      </span>
    </div>
  );
}

// Let's Be Friends: real studio photos, each linking to Instagram.
const friends = present([
  MEDIA.receptionWall,
  MEDIA.matchaCup,
  MEDIA.sunglassesPose,
  MEDIA.gripSocksFlatLay,
  MEDIA.entryBench,
  MEDIA.artisticPose,
]);

export default function HomePage() {
  return (
    <>
      {/* 1. Hero: the old site's full-bleed photo with "Empower Your Essense". */}
      <section className="relative isolate overflow-hidden bg-sage-900 text-cream-50">
        {MEDIA.studioBrightRows && (
          <>
            {/* Above the fold on every screen: load it eagerly. */}
            <MediaPhoto
              media={MEDIA.studioBrightRows}
              eager
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-sage-900/60" />
          </>
        )}
        <div className="banner-text mx-auto flex min-h-[34rem] max-w-5xl flex-col items-center justify-center px-4 py-24 text-center sm:min-h-[40rem] sm:px-6 lg:px-8">
          <h1 className="smallcaps text-base text-cream-100 sm:text-lg">Reformer Pilates in North Hollywood</h1>
          {/* TODO(owner): "Essense" is the old site's own spelling. Confirm keep, or correct to "Essence". */}
          <p className="mt-6 font-serif text-6xl font-normal leading-[1.02] tracking-[-0.01em] sm:text-7xl lg:text-8xl">
            Empower Your Essense
          </p>
          <p className="mt-7 max-w-xl font-sans text-base leading-[1.7] text-cream-50 sm:text-lg">
            Reformer Pilates with never more than 7 people per class, on professional Merrithew reformers. An
            independent, woman-owned studio on Vineland Ave. Your first class is $25.
          </p>
          <div className="mt-9">
            <CtaLink href={introBookingHref()} variant="ghost-light">
              {FIRST_CLASS_CTA}
            </CtaLink>
          </div>
          <p className="mt-6 font-sans text-sm text-cream-100">
            First time?{" "}
            <a href="#first-timers-guide" className="underline underline-offset-4 hover:text-cream-50">
              What to wear, where to park, which class to take
            </a>
          </p>
        </div>
      </section>

      {/* 2. Welcome */}
      <section aria-label="Welcome" className="bg-olive-800 py-16 text-cream-50 sm:py-20">
        <p className="mx-auto max-w-3xl px-4 text-center font-serif text-2xl font-light leading-[1.45] sm:px-6 sm:text-3xl">
          Welcome to our studio. We teach small-group reformer Pilates in North Hollywood, in a room that stays calm
          and a class that stays small. Come move with us, and get stronger together.
        </p>
      </section>

      {/* 2b. ClassPass rating */}
      <ClassPassRating className="bg-cream-50" />

      {/* 3. Intro offers */}
      <section aria-labelledby="intro-offers-heading" className="bg-cream-50 pb-20 pt-4 sm:pb-28">
        <div className={`${container} text-center`}>
          <SectionHeading
            id="intro-offers-heading"
            eyebrow="New Here"
            title="Intro Offers"
            align="center"
            intro={<p>Try one class, take a full week to find your rhythm, or do the class first and the week after it. Both are for first-timers.</p>}
          />
          <div className="mx-auto grid max-w-[42rem] gap-6 text-left sm:grid-cols-2">
            {TRY.map((offer) => (
              <OfferCard key={offer.id} offer={offer} accent="mauve" />
            ))}
          </div>
          <div className="mt-10">
            <CtaLink href="/intro-offer" variant="text">
              What to expect at your first class
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 4. The Space */}
      <section aria-labelledby="space-heading" className="bg-taupe-300 py-16 sm:py-24">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <PhotoTitle media={MEDIA.studioLogoWall} label="The Space" />
          <div className="mx-auto max-w-md text-center">
            <h2 id="space-heading" className="smallcaps text-lg text-charcoal-900">
              The Space
            </h2>
            <p className="mt-6 font-accent text-lg leading-[1.8] text-charcoal-900">
              Our studio is on Vineland Ave in North Hollywood. It is bright and quiet, with rows of Merrithew
              reformers and plenty of room to move.
            </p>
            <p className="mt-5 font-accent text-lg leading-[1.8] text-charcoal-900">
              We keep every class to 7 people or fewer. That way your instructor knows your name, sees how you move,
              and can help you on every rep.
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Practice (reformer explainer) */}
      <section aria-labelledby="reformer-heading" className="bg-taupe-300 pb-16 sm:pb-24">
        <div className={`${container} grid items-center gap-10 lg:grid-cols-2 lg:gap-16`}>
          <div className="mx-auto max-w-md text-center lg:order-1">
            <h2 id="reformer-heading" className="smallcaps text-lg text-charcoal-900">
              The Practice
            </h2>
            <p className="mt-6 font-accent text-lg leading-[1.8] text-charcoal-900">
              Reformer Pilates is strength and mobility training on a machine called the reformer. Springs add
              resistance to classic Pilates movements, so you build strength and control while going easy on your
              joints.
            </p>
            <p className="mt-5 font-accent text-lg leading-[1.8] text-charcoal-900">
              Every group class at our studio is taught on the reformer.
            </p>
          </div>
          <PhotoTitle media={MEDIA.standingSplit} label="The Practice" className="lg:order-2" />
        </div>
        <ul className={`${container} mt-14 grid gap-8 sm:grid-cols-3`}>
          {proofPoints.map((p) => (
            <li key={p.title} className="border-t border-charcoal-900/30 pt-5 text-center">
              <h3 className="font-serif text-2xl text-charcoal-900">{p.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-charcoal-900">{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 6. The Classes */}
      <ClassCards
        headingId="class-types-heading"
        items={[
          { key: "beginner", name: "Beginner", href: "/classes/beginner" },
          { key: "flexibility", name: "Flexibility", href: "/classes/flexibility" },
          { key: "fullbody", name: "Full Body", href: "/classes/fullbody" },
          { key: "abs-and-assets", name: "Abs and Assets", href: "/classes#abs-and-assets" },
        ]}
      />

      {/* 7. Small-group classes */}
      <section aria-labelledby="small-group-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="small-group-heading"
              eyebrow="The Format"
              title="Classes of 7 or Fewer"
              intro={
                <p>
                  Every group class runs on a Merrithew reformer with no more than 7 people. You get the energy of a
                  class and the attention of a private session. Pick the one that fits your week.
                </p>
              }
            />
            <dl className="divide-y divide-sage-700/25 border-y border-sage-700/25">
              {GROUP_CLASSES.map((c) => (
                <div key={c.slug} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="font-serif text-2xl text-sage-900">
                    <Link href={`/classes/${c.slug}`} className="hover:text-sage-700">
                      {c.name}
                    </Link>
                  </dt>
                  <dd className="font-sans text-base leading-relaxed text-charcoal-800/85">{c.oneLiner}</dd>
                </div>
              ))}
              <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="font-serif text-2xl text-sage-900">
                  <Link href="/classes#abs-and-assets" className="hover:text-sage-700">
                    Abs and Assets
                  </Link>
                </dt>
                <dd className="font-sans text-base leading-relaxed text-charcoal-800/85">
                  A 50-minute reformer class on professional Merrithew reformers, capped at 7 people.
                </dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <CtaLink href="/classes" variant="outline">
                View all classes
              </CtaLink>
              <CtaLink href="/schedule" variant="text">
                See this week&apos;s schedule
              </CtaLink>
            </div>
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

      {/* 8. ClassPass */}
      <ClassPassStrip />

      {/* 9. The Reviews */}
      <Testimonials />

      {/* 10. Pricing teaser */}
      <section aria-labelledby="pricing-teaser-heading" className="bg-cream-50 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="pricing-teaser-heading"
            eyebrow="Pricing"
            title="Simple, honest pricing"
            align="center"
            intro={<p>Start with an intro offer. After that, choose a membership or a class pack.</p>}
          />
          <div className="grid gap-px border border-sage-700/25 bg-sage-700/25 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Try", price: priceOf("first-class"), note: `First class. Or ${priceOf("intro-week")} for the One-Week Unlimited.` },
              {
                label: "Commit",
                price: `${priceOf("membership-5")}/mo`,
                note: `5, 8, or 12 classes a month, or unlimited for ${priceOf("membership-unlimited")}. 8 classes is our most popular plan. Pause anytime. Cancel with 7 days' notice. No fees.`,
              },
              { label: "Flex", price: priceOf("single"), note: `Single class. Packs of 5 for ${priceOf("pack-5")} or 10 for ${priceOf("pack-10")}.` },
              { label: "Private", price: priceOf("private"), note: `55-minute 1:1 session. Duets ${priceOf("duet")} per person.` },
            ].map((tier) => (
              <div key={tier.label} className="bg-cream-50 p-7 text-center">
                <p className="smallcaps text-[15px] text-sage-700">{tier.label}</p>
                <p className="mt-3 font-poppins text-5xl font-extralight text-sage-900">{tier.price}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-charcoal-800/80">{tier.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <CtaLink href="/pricing" variant="outline">
              See full pricing
            </CtaLink>
          </div>
        </div>
      </section>

      {/* 11. FAQ teaser */}
      <FaqTeaser />

      {/* 12. Let's Be Friends */}
      <section aria-labelledby="friends-heading" className="relative isolate overflow-hidden bg-sage-900 py-16 text-cream-50 sm:py-24">
        <div className={`${container} text-center`}>
          <h2 id="friends-heading" className="font-serif text-5xl font-normal sm:text-6xl">
            Let&apos;s Be Friends
          </h2>
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 py-1 font-accent text-lg text-cream-50 underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-5" />
            {INSTAGRAM.handle}
          </a>
          {friends.length > 0 && (
            <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
              {friends.map((m) => (
                <li key={m.file}>
                  <a
                    href={INSTAGRAM.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${m.alt}. See more on Instagram`}
                    className="block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream-50"
                  >
                    <MediaPhoto media={m} aspectClassName="aspect-square" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* 13. Areas we serve */}
      <section aria-labelledby="areas-heading" className="bg-cream-100 py-20 sm:py-28">
        <div className={container}>
          <SectionHeading
            id="areas-heading"
            eyebrow="Areas We Serve"
            title="Reformer Pilates near you"
            intro={
              <p>
                Our studio is on Vineland Ave in North Hollywood. Most of our clients come from North Hollywood and the
                neighborhoods around it.
              </p>
            }
          />
          <ul className="grid gap-px border border-sage-700/25 bg-sage-700/25 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICE_AREAS.map((a) => (
              <li key={a.name} className="bg-cream-100 p-6">
                <h3 className="font-serif text-2xl text-sage-900">{a.name}</h3>
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

      {/* 14. Final CTA */}
      <FinalCta />

      {/* 15. First-timer's guide (on-page; replaces the email form at launch) */}
      <FirstTimerGuide />
    </>
  );
}
