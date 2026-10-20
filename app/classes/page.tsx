import { MediaItem } from "@/components/ui/media";
import { ClassCards, ClassMedia, PrivateShowcase } from "@/components/sections/class-media";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero, SectionHeading } from "@/components/sections/section-heading";
import { ClassFormatBlock } from "@/components/sections/class-format";
import { FinalCta } from "@/components/sections/final-cta";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { CLASSES, GROUP_CLASSES } from "@/lib/classes";
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
        banner={MEDIA.studioBrightRows}
        tone="sage"
        media={
          MEDIA.classMoodyBacklit && (
            <MediaItem
              media={MEDIA.classMoodyBacklit}
              aspectClassName="aspect-[4/5]"
              className="mx-auto max-w-sm lg:max-w-none"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          )
        }
        intro={
          <p>
            Every group class we teach is 50 minutes on a professional Merrithew reformer, with no more than 7 people
            in the room. An experienced instructor watches your form from start to finish. Pick a class by how you
            want to feel, or start with Beginner if the reformer is new to you.
          </p>
        }
      >
        <p className="mb-6 font-sans text-sm font-medium text-sage-700">
          <a href={CLASSPASS_URL} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sage-900">
            {CLASSPASS_RATING_LINE}
          </a>
        </p>
        <nav aria-label="Class formats" className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {CLASSES.map((c) => (
            <a
              key={c.slug}
              href={`#${c.slug}`}
              className="smallcaps inline-block py-1 text-[15px] text-sage-700 underline-offset-4 hover:underline"
            >
              {c.name}
            </a>
          ))}
          <a
            href="#abs-and-assets"
            className="smallcaps inline-block py-1 text-[15px] text-sage-700 underline-offset-4 hover:underline"
          >
            Abs and Assets
          </a>
        </nav>
      </PageHero>

      <ClassCards
        headingId="the-classes"
        items={[
          ...GROUP_CLASSES.map((c) => ({ key: c.slug, name: c.name, href: `#${c.slug}` })),
          { key: "abs-and-assets", name: "Abs and Assets", href: "#abs-and-assets" },
        ]}
      />

      {/* What is reformer Pilates? */}
      <section aria-labelledby="what-is-reformer" className="bg-cream-50 py-20 sm:py-24">
        <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
          <div className="lg:col-span-7">
            <SectionHeading
              id="what-is-reformer"
              eyebrow="The Apparatus"
              title="What is reformer Pilates?"
              intro={
                <>
                  <p>
                    The reformer is a sliding carriage on a frame, with springs, a footbar, and straps for your hands
                    and feet. The springs add resistance to classic Pilates movements, and they are easy on your
                    joints.
                  </p>
                  <p className="mt-4">
                    Your instructor changes the springs to make each exercise harder or more supportive, so the same
                    machine works for you on your first day and every class after.
                  </p>
                </>
              }
            />
            <CtaLink href={introBookingHref()}>{FIRST_CLASS_CTA}</CtaLink>
          </div>
          <ClassMedia mediaKey="what-is-reformer" className="lg:col-span-5" />
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
            {c.slug === "private" && (
              <>
                <p className="mt-10 font-serif text-3xl font-light text-sage-900">
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
              intro={<p>Abs and Assets is a 50-minute reformer class on our weekly schedule.</p>}
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
