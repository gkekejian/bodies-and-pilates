import { MediaItem } from "@/components/ui/media";
import { ClassMedia, PrivateShowcase } from "@/components/sections/class-media";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { CLASSES } from "@/lib/classes";
import { MEDIA } from "@/lib/media";
import { CLASSPASS_RATING_LINE, CLASSPASS_URL, FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";
import { priceOf } from "@/lib/pricing";

export const metadata = pageMetadata({
  title: "Reformer Pilates Classes in North Hollywood | Bodies and Pilates",
  description:
    "Reformer Pilates classes in North Hollywood: Beginner, Full Body, Flexibility, Abs and Assets, privates and duets. 50 minutes, 7 people max.",
  path: "/classes",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Classes", path: "/classes" },
]);

const container = "mx-auto max-w-6xl px-4 sm:px-6 lg:px-8";

export default function ClassesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero
        eyebrow="Small-Group Reformer Pilates"
        title="Reformer Pilates Classes"
        media={
          MEDIA.classMoodyBacklit && (
            <MediaItem
              media={MEDIA.classMoodyBacklit}
              priority
              aspectClassName="aspect-[4/5]"
              className="mx-auto max-w-sm lg:max-w-none"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )
        }
        intro={
          <p>
            Every group class is 50 minutes on a professional Merrithew reformer, with no more than 7 people, coached
            by an experienced instructor who watches your form from start to finish. Choose by goal and experience, or start with Beginner if the
            reformer is new to you.
          </p>
        }
      >
        <nav aria-label="Class formats" className="flex flex-wrap gap-x-6 gap-y-3">
          {CLASSES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="inline-block py-1 font-sans text-xs uppercase tracking-[0.2em] text-sage-700 underline-offset-4 hover:underline"
            >
              {c.name}
            </a>
          ))}
          <a
            href="#abs-and-assets"
            className="inline-block py-1 font-sans text-xs uppercase tracking-[0.2em] text-sage-700 underline-offset-4 hover:underline"
          >
            Abs and Assets
          </a>
        </nav>
      </PageHero>

      {/* What is reformer Pilates? */}
      <section aria-labelledby="what-is-reformer" className="bg-cream-50 py-20 sm:py-24">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="what-is-reformer"
              eyebrow="The Apparatus"
              title="What is reformer Pilates?"
              intro={
                <p>
                  The reformer is a sliding carriage on a frame, connected to a set of springs, with a footbar and
                  straps for your hands and feet. The springs add adjustable resistance to classic Pilates movements,
                  building lean strength, flexibility, and control with low impact on your joints. Your instructor
                  changes the springs to make each exercise harder or more supportive, so the same machine works for a
                  first-timer and a seasoned athlete. Ours are professional Merrithew reformers.
                </p>
              }
            />
            <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          </div>
          <ClassMedia mediaKey="what-is-reformer" className="lg:col-span-5" />
        </div>
      </section>

      <p className="bg-cream-100 px-4 pt-10 text-center font-sans text-sm sm:pt-12">
        <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="text-sage-700 underline underline-offset-4 hover:text-sage-500">
          {CLASSPASS_RATING_LINE}
        </a>
      </p>

      {CLASSES.map((c, i) => (
        <section
          key={c.slug}
          aria-label={`${c.name} class`}
          className={i % 2 === 0 ? "bg-cream-100 py-20 sm:py-24" : "bg-cream-50 py-20 sm:py-24"}
        >
          <div className={container}>
            <ClassFormatBlock format={c} reverse={i % 2 === 1} />
            {c.slug === "private" && (
              <>
                <p className="mt-10 font-serif text-2xl text-charcoal-900">
                  {priceOf("private")} for 55 minutes. Duets {priceOf("duet")} per person.
                </p>
                <PrivateShowcase includeDuet={false} />
              </>
            )}
          </div>
        </section>
      ))}

      {/* Abs and Assets: on the live schedule, no owner description yet. */}
      <section
        id="abs-and-assets"
        aria-labelledby="abs-and-assets-heading"
        className={`scroll-mt-28 ${CLASSES.length % 2 === 0 ? "bg-cream-100 py-20 sm:py-24" : "bg-cream-50 py-20 sm:py-24"}`}
      >
        <div className={`${container} grid items-center gap-10 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="abs-and-assets-heading"
              eyebrow="Also on the schedule"
              title="Abs and Assets"
              intro={<p>Abs and Assets is a 50-minute reformer class on professional Merrithew reformers, capped at 7 people.</p>}
            />
            {/* TODO(owner): add a 1 to 2 sentence description, level, and who it is for. */}
            <CtaLink href="/schedule" variant="text">
              See Abs and Assets class times
            </CtaLink>
          </div>
          <ClassMedia mediaKey="abs-and-assets" className="lg:col-span-5" />
        </div>
      </section>

      <FinalCta />
    </>
  );
}
