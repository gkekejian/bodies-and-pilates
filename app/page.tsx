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
  // Search Console, 28 days to October 28, 2026: the homepage took 49 clicks
  // from 1,089 impressions (4.5%), and "pilates north hollywood" ranks 2.7.
  // The title leads with that query and the two hooks.
  title: "Pilates in North Hollywood: Max 7 Per Class, $25 First Class",
  description:
    "Every class is capped at 7 people on Merrithew reformers. Small-group Pilates in North Hollywood, rated 4.9 on ClassPass. Your first class is $25.",
  path: "/",
});

// One frame for the whole page: a 1240px column with equal 20px/32px margins.
const wrap = "mx-auto w-full max-w-[1240px] px-5 sm:px-8";
const h2 = "font-serif text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]";
const h3 = "font-serif text-[2.25rem] font-semibold leading-[1] tracking-[-0.015em] lg:text-[2.75rem]";
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
          loop under a flat dark scrim. The poster is the first paint. On portrait
          screens the hero is capped at min(80svh, 28rem) so the 16:9 cover crop
          shows about half the frame's width instead of a third. */}
      <section
        data-hero
        className="relative isolate -mt-[var(--header-h)] flex min-h-[40rem] items-end overflow-hidden bg-theme-dark text-white sm:min-h-[46rem] lg:min-h-[max(46rem,92vh)] portrait:min-h-[min(80svh,28rem)] sm:portrait:min-h-[min(80svh,40rem)] lg:portrait:min-h-[min(80svh,46rem)]"
      >
        <HeroVideo poster={HERO_VIDEO.poster} sources={HERO_VIDEO.sources} />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-theme-dark/45" />
        <div className={`${wrap} banner-text pb-24 pt-[calc(var(--header-h)+5rem)] sm:pb-20 portrait:pb-14 portrait:pt-[calc(var(--header-h)+2rem)]`}>
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

      {/* A2. Welcome band: the owners' facts, tightened (October 29, 2026). */}
      <section aria-label="Welcome" className="bg-theme-dark text-theme-cream">
        <div className={`${wrap} py-24 sm:py-32`}>
          <p className="max-w-[58rem] font-serif text-[1.375rem] font-light leading-[1.45] sm:text-[1.75rem]">
            Bodies and Pilates is a boutique reformer studio in North Hollywood, and we keep Pilates personal. Classes
            are capped at seven people on professional Merrithew reformers and stability chairs. Your instructor knows
            your name, your goals, and when to push you.
          </p>
          <p className="mt-12 font-serif text-[1.75rem] font-semibold leading-[1.1] tracking-[-0.015em] sm:mt-16 sm:text-[2.25rem] lg:text-right">
            Small classes. Real instruction. Results you can feel.
          </p>
        </div>
      </section>

      {/* A3. Services: three columns on one cream field, as on the Focus Pilates
          reference (owner request, October 29, 2026). Each: photo, heading, one or
          two sentences, one button. Stacked on phones. */}
      <section aria-label="Services" className="bg-theme-cream text-theme-dark">
        <div className={`${wrap} grid gap-16 py-24 sm:py-32 md:grid-cols-3 md:gap-8 lg:gap-12`}>
          <article aria-labelledby="group-classes-heading" className="flex flex-col">
            <MediaPhoto
              media={MEDIA.classInSession}
              aspectClassName="aspect-[4/3]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <h2 id="group-classes-heading" className={`${h3} mt-8`}>
              Group Classes
            </h2>
            <p className={`${body} mt-4`}>
              Every group class is capped at seven people on professional Merrithew reformers, so your instructor sees every
              rep. New here?{" "}
              <Link href="/intro-offer" className={inlineLink}>
                Start with a {priceOf("first-class")} first class
              </Link>
              .
            </p>
            <div className="mt-auto pt-8">
              <CtaLink href="/schedule" variant="fill-dark">
                Book Now
              </CtaLink>
            </div>
          </article>

          <article aria-labelledby="private-training-heading" className="flex flex-col">
            <MediaPhoto
              media={MEDIA.handsOnCorrection}
              aspectClassName="aspect-[4/3]"
              imgClassName="object-[70%_50%]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <h2 id="private-training-heading" className={`${h3} mt-8`}>
              Private Training
            </h2>
            <p className={`${body} mt-4`}>
              One instructor and a plan built around your body and your goals. Fifty-five minutes for{" "}
              {priceOf("private")}; duets are {priceOf("duet")} per person.
            </p>
            <div className="mt-auto pt-8">
              <CtaLink href="/schedule" variant="fill-dark">
                Book a Private Session
              </CtaLink>
            </div>
          </article>

          {/* Studio Rental is the owners' draft awaiting sign-off: shortened only, no new claims. */}
          <article aria-labelledby="studio-rental-heading" className="flex flex-col">
            <MediaPhoto
              media={MEDIA.studioEmptyRoom}
              aspectClassName="aspect-[4/3]"
              imgClassName="object-[50%_60%]"
              sizes="(max-width: 768px) 100vw, 400px"
            />
            <h2 id="studio-rental-heading" className={`${h3} mt-8`}>
              Studio Rental
            </h2>
            <p className={`${body} mt-4`}>
              Our space, your occasion. Tell us what you are planning and we will help you shape it.
            </p>
            <p className={`${body} mt-3`}>
              Or call{" "}
              <a href={PHONE.tel} className={inlineLink}>
                {PHONE.display}
              </a>
            </p>
            <div className="mt-auto pt-8">
              <CtaLink href={`mailto:${EMAIL}?subject=${encodeURIComponent("Studio rental")}`} variant="fill-dark">
                Email us about your date
              </CtaLink>
            </div>
          </article>
        </div>
      </section>

      {/* A4. The Classes: all six in one sideways row. */}
      <section aria-labelledby="the-classes-heading" className="overflow-hidden bg-theme-cream text-theme-dark">
        <div className={`${wrap} py-24 sm:py-32 lg:py-40`}>
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 id="the-classes-heading" className={`${h2} lg:col-span-6`}>
              The Classes
            </h2>
            <p className={`${body} lg:col-span-5 lg:col-start-8`}>
              Six ways in. Group classes are 50 minutes and capped at seven people. Privates and duets are 55 minutes, built around you.
            </p>
          </div>
          <div className="mt-12">
            <ClassCarousel items={CLASS_LINEUP} photos={classPhotos} />
          </div>
        </div>
      </section>

      {/* A5. The Space: the owners' copy (October 29, 2026), verbatim, beside the
          widest view of the room. */}
      <section aria-labelledby="space-heading" className="bg-theme-white text-theme-dark">
        <div className={`${wrap} grid gap-12 py-24 sm:py-32 lg:grid-cols-12 lg:items-center lg:py-40`}>
          <MediaPhoto
            media={MEDIA.studioBrightRows}
            aspectClassName="aspect-[4/3] lg:aspect-[5/4]"
            className="-mx-5 sm:mx-0 lg:col-span-7"
            imgClassName="object-[50%_62%]"
            sizes="(max-width: 1024px) 100vw, 720px"
          />
          <div className="lg:col-span-5">
            <h2 id="space-heading" className={h2}>
              The Space
            </h2>
            <p className={`${body} mt-6`}>
              At Bodies and Pilates, we pride ourselves in providing a luxurious, tranquil environment combined with
              cutting-edge fitness. Our boutique studio is equipped with state-of-the-art equipment, while our small
              class sizes allow for personalized attention and guidance throughout your workout.
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
            We teach Pilates as a practice you come back to, with precise, progressive work. Your instructor learns your
            body, your history, and your goals, then cues and corrects you through every session. Come consistently and
            everyday movement starts to feel different.
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
