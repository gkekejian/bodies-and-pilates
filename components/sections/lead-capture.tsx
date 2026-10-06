import { PhotoSlot } from "@/components/ui/photo-slot";
import { LeadCaptureForm } from "@/components/sections/lead-capture-form";
import { eyebrowClass } from "@/components/sections/section-heading";
import { PHOTOS } from "@/lib/photos";

export const GUIDE_TITLE = "First-timer's guide: what to wear, where to park, which class to take.";

/** Full-width lead capture band (Home section 11, /pricing). */
export function LeadCapture({ source }: { source: string }) {
  return (
    <section aria-labelledby={`guide-heading-${source}`} className="bg-cream-100 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-7">
          <p className={`${eyebrowClass} mb-5`}>Free Guide</p>
          <h2 id={`guide-heading-${source}`} className="font-serif text-3xl leading-[1.2] text-charcoal-900 sm:text-4xl">
            {GUIDE_TITLE}
          </h2>
          <p className="mb-8 mt-6 max-w-xl font-sans text-base leading-[1.75] text-charcoal-800/85">
            Everything a first reformer class asks of you, in one short email. Leave your email and we will send it over.
          </p>
          <LeadCaptureForm source={source} layout="inline" />
        </div>
        <div className="lg:col-span-5">
          <PhotoSlot photo={PHOTOS.propsFlatLay} sizes="(max-width: 1024px) 100vw, 40vw" />
        </div>
      </div>
    </section>
  );
}
