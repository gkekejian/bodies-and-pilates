import { PhotoSlot } from "@/components/ui/photo-slot";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { CLASSES } from "@/lib/classes";
import { PHOTOS } from "@/lib/photos";
import { FIRST_CLASS_CTA, introBookingHref } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Pilates Classes in North Hollywood | Bodies and Pilates",
  description:
    "Small-group reformer Pilates classes in North Hollywood: Beginner, Full Body, Flexibility, and Private. See who each is for, then book your $25 first class.",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <PageHero
        eyebrow="Small-Group Reformer Pilates"
        title="Pilates Classes in North Hollywood"
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
              className="font-sans text-xs uppercase tracking-[0.2em] text-sage-700 underline-offset-4 hover:underline"
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

      <FinalCta />
    </>
  );
}
