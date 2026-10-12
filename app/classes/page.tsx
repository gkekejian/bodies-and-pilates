import { PhotoSlot } from "@/components/ui/photo-slot";
import { CtaLink } from "@/components/ui/cta-link";
import { OwnerPlaceholder } from "@/components/ui/placeholder";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { CLASSES } from "@/lib/classes";
import { PHOTOS } from "@/lib/photos";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Reformer Pilates Classes | Bodies and Pilates NoHo",
  description:
    "Reformer Pilates classes in North Hollywood: Beginner, Full Body, Flexibility, Abs and Assets, plus privates and duets. Small groups, real coaching.",
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
        intro={
          <p>
            Every group class at Bodies and Pilates is small-group reformer Pilates, coached by an instructor who
            watches your form from start to finish. Choose by goal and experience, or start with Beginner if the
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
                  first-timer and a seasoned athlete.
                </p>
              }
            />
            <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          </div>
          <div className="lg:col-span-5">
            <PhotoSlot photo={PHOTOS.strapsCloseUp} sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
        </div>
      </section>

      {CLASSES.map((c, i) => (
        <section
          key={c.slug}
          aria-label={`${c.name} class`}
          className={i % 2 === 0 ? "bg-cream-100 py-20 sm:py-24" : "bg-cream-50 py-20 sm:py-24"}
        >
          <div className={container}>
            <ClassFormatBlock format={c} reverse={i % 2 === 1} />
          </div>
        </section>
      ))}

      {/* Abs and Assets: on the live schedule, no owner description yet. */}
      <section
        aria-labelledby="abs-and-assets-heading"
        className={CLASSES.length % 2 === 0 ? "bg-cream-100 py-20 sm:py-24" : "bg-cream-50 py-20 sm:py-24"}
      >
        <div className={container}>
          <SectionHeading
            id="abs-and-assets-heading"
            eyebrow="Also on the schedule"
            title="Abs and Assets"
            intro={<p>A 50-minute small-group reformer class, now on the weekly schedule.</p>}
          />
          {/* TODO(owner): replace with a 1 to 2 sentence description, level, and who it is for. */}
          <OwnerPlaceholder label="Abs and Assets description, level, and who it is for" />
          <div className="mt-8">
            <CtaLink href="/schedule" variant="text">
              See Abs and Assets class times
            </CtaLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
