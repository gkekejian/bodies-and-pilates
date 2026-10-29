import Link from "next/link";
import { CtaLink } from "@/components/ui/cta-link";
import { MediaPhoto } from "@/components/ui/media";
import { HeroVideo } from "@/components/ui/hero-video";
import { ClassCarousel } from "@/components/sections/class-carousel";
import { CLASS_CARD_PHOTO } from "@/components/sections/class-media";
import { InstagramIcon } from "@/components/layout/footer";
import { Testimonials } from "@/components/sections/testimonials";
import { pageMetadata } from "@/lib/metadata";
import { HERO_VIDEO, MEDIA, STOCK, present, type PhotoMedia } from "@/lib/media";
import { CLASS_LINEUP } from "@/lib/classes";
import { priceOf } from "@/lib/pricing";
import { EMAIL, INSTAGRAM, PHONE } from "@/lib/site";

export const metadata = pageMetadata({
  // Search Console: "pilates north hollywood" sits at position 2 to 3 with a
  // 4% to 5% click rate. The title leads with the query and the two hooks.
  title: "Pilates in North Hollywood: Max 7 Per Class, $25 First Class",
  description:
    "Small-group reformer Pilates on Vineland Ave: every class is capped at 7 people, on Merrithew reformers. Rated 4.9 on ClassPass. Start with a $25 first class.",
  path: "/",
});

// One frame for the whole page: a 1240px column with equal 20px/32px margins.
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 = "font-serif text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]";
const body = "font-sans text-[17px] leading-[1.65] sm:text-lg";
const inlineLink = "font-medium underline decoration-2 underline-offset-4 hover:decoration-1";

// The Private card shows a frame from the private-session clip on
// /classes/private; the Duet card takes that page's duet photo.
const privatePoster: PhotoMedia | null = MEDIA.privateKneelingAssist
  ? {
      kind: "photo",
      file: "private-hands-on-assist-kneeling.jpg",
      src: MEDIA.privateKneelingAssist.poster,
      alt: "Instructor's hands-on assist during a private reformer session at Bodies and Pilates in North Hollywood",
      width: MEDIA.privateKneelingAssist.width,
      height: MEDIA.privateKneelingAssist.height,
    }
  : null;
const classPhotos: Record<string, PhotoMedia | null> = {
  ...CLASS_CARD_PHOTO,
  private: privatePoster,
  duet: MEDIA.duetOnChair,
};

// Let's Be Friends: real studio photos, each linking to the account.
const friends = present([
  MEDIA.receptionWall,
  MEDIA.matchaCup,
  MEDIA.sunglassesPose,
  MEDIA.gripSocksFlatLay,
  MEDIA.entryBench,
  MEDIA.artisticPose,
]);

/**
 * Text on one side, a photograph running to the edge of the screen on the
 * other. Stacks on phones, picture first.
 */
function BleedSplit({
  side,
  media,
  imgClassName,
  className,
  children,
}: {
  side: "left" | "right";
  media: PhotoMedia | null;
  imgClassName?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`relative lg:min-h-[44rem] ${className ?? ""}`}>
      <MediaPhoto
        media={media}
        aspectClassName="aspect-[4/3] lg:aspect-auto"
        className={`lg:absolute lg:inset-y-0 lg:w-1/2 ${side === "left" ? "lg:left-0" : "lg:right-0"}`}
        imgClassName={imgClassName}
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      <div className={`${wrap} flex py-20 sm:py-24 lg:min-h-[44rem] lg:items-center lg:py-28 ${side === "left" ? "lg:justify-end" : ""}`}>
        <div className="lg:w-[calc(50%-4rem)]">{children}</div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* A1. Hero: the owners' studio footage, complete and uncut, as a muted
          loop under a flat dark scrim. The poster is the first paint. */}
      <section
        data-hero
        className="relative isolate -mt-[var(--header-h)] flex min-h-[40rem] items-end overflow-hidden bg-theme-dark text-white sm:min-h-[46rem] lg:min-h-[max(46rem,92vh)]"
      >
        <HeroVideo poster={HERO_VIDEO.poster} wide={HERO_VIDEO.wide} narrow={HERO_VIDEO.narrow} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-theme-dark/45" />
        <div className={`${wrap} banner-text pb-24 pt-[calc(var(--header-h)+5rem)] sm:pb-20`}>
          <p className="max-w-[12ch] font-serif text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.025em] sm:max-w-none sm:text-7xl lg:text-[6.5rem]">
            Real Pilates for every body.
          </p>
          <h1 className="mt-6 font-sans text-lg font-medium sm:text-xl">Reformer Pilates in North Hollywood</h1>
          <div className="mt-9 flex flex-wrap gap-3">
            <CtaLink href="/schedule" variant="fill-cream">
              Book a Session
            </CtaLink>
            <CtaLink href="/pricing" variant="fill-dark">
              View Pricing
            </CtaLink>
          </div>
        </div>
      </section>

      {/* A2. Welcome band, owner copy verbatim. */}
      <section aria-label="Welcome" className="bg-theme-dark text-theme-cream">
        <div className={`${wrap} py-24 sm:py-32`}>
          <p className="max-w-[58rem] font-serif text-[1.375rem] font-light leading-[1.45] sm:text-[1.75rem]">
            Bodies and Pilates is North Hollywood&apos;s boutique reformer studio, built on a simple idea: Pilates works
            best when it is personal. Classes are capped at seven people, every session runs on professional Merrithew
            reformers and stability chairs, and our instructors know your name, your goals, and when to push you.
          </p>
          <p className="mt-12 font-serif text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:mt-16 sm:text-[2.25rem] lg:text-right">
            Small classes. Real instruction. Results you can feel.
          </p>
        </div>
      </section>

      {/* A3.1 Group Classes: the class in session, then the claim and the $25 way in. */}
      <section aria-labelledby="group-classes-heading" className="bg-theme-cream text-theme-dark">
        <div className={`${wrap} grid gap-10 py-24 sm:py-32 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-40`}>
          <MediaPhoto
            media={MEDIA.classInSession}
            aspectClassName="aspect-[3/2]"
            className="lg:col-span-7"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
          <div className="lg:col-span-5">
            <h2 id="group-classes-heading" className={h2}>
              Group Classes
            </h2>
            <p className={`${body} mt-6`}>
              Small by design. Every group class is capped at seven people and runs on professional Merrithew reformers
              and stability chairs, so your instructor sees every rep and your form never slips by. Classes are 50
              minutes, open to all levels, and built to progress with you. New here?{" "}
              <Link href="/intro-offer" className={inlineLink}>
                Start with a {priceOf("first-class")} first class
              </Link>
              .
            </p>
            <CtaLink href="/classes" variant="fill-dark" className="mt-9">
              See the Classes
            </CtaLink>
          </div>
        </div>
      </section>

      {/* A3.2 Private Training: a whole field of dark brown, the instructor's hands at work. */}
      <section aria-labelledby="private-training-heading" className="bg-theme-dark text-theme-cream">
        <div className={`${wrap} grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:py-40`}>
          <div className="lg:col-span-6">
            <h2 id="private-training-heading" className={h2}>
              Private Training
            </h2>
            <p className={`${body} mt-6`}>
              One client, one instructor, one plan. Private sessions are built entirely around your body and your goals,
              whether that is strength, flexibility, returning from time away, or preparing for a role or a performance.
              Fifty-five minutes of undivided attention, on your schedule. {priceOf("private")} per session; duets{" "}
              {priceOf("duet")} per person.
            </p>
            <CtaLink href="/pricing#private-heading" variant="fill-cream" className="mt-9">
              See Private Training
            </CtaLink>
          </div>
          <MediaPhoto
            media={MEDIA.handsOnCorrection}
            aspectClassName="aspect-[4/5]"
            className="lg:col-span-5 lg:col-start-8"
            imgClassName="object-[70%_50%]"
            sizes="(max-width: 1024px) 100vw, 480px"
          />
        </div>
      </section>

      {/* A3.3 Studio Rental (owner-approval draft): the room, edge to edge, and an email to start. */}
      <section aria-labelledby="studio-rental-heading" className="bg-theme-sand text-theme-dark">
        <BleedSplit side="left" media={MEDIA.studioBrightRows} imgClassName="object-[50%_62%]">
          <h2 id="studio-rental-heading" className={h2}>
            Studio Rental
          </h2>
          <p className={`${body} mt-6`}>
            Our space, your occasion. The studio is available for private rental: a light-filled room on Vineland Avenue
            with seven Merrithew reformers, wood floors, and room to gather. Tell us what you are planning and we will
            help you shape it.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <CtaLink href={`mailto:${EMAIL}?subject=${encodeURIComponent("Studio rental")}`} variant="fill-dark">
              Email us about your date
            </CtaLink>
            <p className={body}>
              Or call{" "}
              <a href={PHONE.tel} className={inlineLink}>
                {PHONE.display}
              </a>
            </p>
          </div>
        </BleedSplit>
      </section>

      {/* A4. The Classes: all six in one sideways row. */}
      <section aria-labelledby="the-classes-heading" className="overflow-hidden bg-theme-cream text-theme-dark">
        <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="the-classes-heading" className={`${h2} lg:col-span-6`}>
              The Classes
            </h2>
            <p className={`${body} lg:col-span-5 lg:col-start-8`}>
              Six ways in. Every class is 50 minutes, capped at seven people, and led start to finish.
            </p>
          </div>
          <div className="mt-12">
            <ClassCarousel items={CLASS_LINEUP} photos={classPhotos} />
          </div>
        </div>
      </section>

      {/* A5. The Space: the room, its chairs and its reformers. */}
      <section aria-labelledby="space-heading" className="bg-theme-white text-theme-dark">
        <div className={`${wrap} grid gap-12 pb-24 pt-16 sm:py-32 lg:grid-cols-12 lg:items-center lg:py-40`}>
          <div className="grid grid-cols-2 gap-4 lg:col-span-7">
            <MediaPhoto media={MEDIA.studioLogoWallChair} aspectClassName="aspect-[3/4]" className="mt-8 lg:mt-16" sizes="(max-width: 1024px) 50vw, 350px" />
            <MediaPhoto media={MEDIA.studioEmptyRoom} aspectClassName="aspect-[3/4]" sizes="(max-width: 1024px) 50vw, 350px" />
          </div>
          <div className="lg:col-span-5">
            <h2 id="space-heading" className={h2}>
              The Space
            </h2>
            <p className={`${body} mt-6`}>
              Step off Vineland Avenue and the noise drops away. Our studio is one light-filled room: seven professional
              Merrithew V2 Max reformers, stability chairs, and everything within reach of your instructor. Nothing about
              the room is an accident; it is set up so a class of seven feels calm, focused, and personal.
            </p>
          </div>
        </div>
      </section>

      {/* A5. The Practice: on the tan field, the instructor cueing and correcting. */}
      <section aria-labelledby="practice-heading" className="bg-theme-tan text-theme-ink">
        <BleedSplit side="right" media={MEDIA.cueingWithMic} imgClassName="object-[45%_50%]">
          <h2 id="practice-heading" className={`${h2} text-theme-dark`}>
            The Practice
          </h2>
          <p className={`${body} mt-6`}>
            Pilates was built as a practice, not a workout of the month. We teach it that way: precise, progressive, and
            personal. Your instructor learns your body, your history, and your goals, then cues and corrects you through
            every session so the work keeps working. Show up consistently, and everyday movement starts to feel
            different.
          </p>
        </BleedSplit>
      </section>

      {/* The Reviews, as they stand: the reviews photo and the slideshow. */}
      <Testimonials photo={STOCK.yogaStandingPose} />

      {/* Let's Be Friends: a darkened photo band, the handle, a row of photos edge to edge. */}
      <section aria-labelledby="friends-heading" className="relative isolate overflow-hidden bg-theme-dark pb-16 pt-14 text-white sm:pb-20 sm:pt-16">
        {MEDIA.studioLogoWall && (
          <>
            <MediaPhoto
              media={MEDIA.studioLogoWall}
              sizes="100vw"
              aspectClassName=""
              className="absolute inset-0 -z-20 h-full w-full"
            />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-theme-dark/80" />
          </>
        )}
        <div className="banner-text px-4 text-center">
          <h2 id="friends-heading" className="font-serif text-5xl font-semibold tracking-[-0.015em] sm:text-6xl lg:text-[4.25rem]">
            Let&apos;s Be Friends
          </h2>
          <a
            href={INSTAGRAM.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex flex-col items-center gap-2 py-1 font-serif text-2xl font-light text-white/90 underline-offset-4 hover:underline"
          >
            <InstagramIcon className="size-8 text-theme-sand" />
            {INSTAGRAM.handle}
          </a>
        </div>
        {friends.length > 0 && (
          <ul className="mt-8 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 lg:grid-cols-6">
            {friends.map((m) => (
              <li key={m.file}>
                <a
                  href={INSTAGRAM.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${m.alt}. See more on Instagram`}
                  className="block transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <MediaPhoto media={m} aspectClassName="aspect-square" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
