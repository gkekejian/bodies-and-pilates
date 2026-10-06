import dynamic from "next/dynamic";
import { CtaLink } from "@/components/ui/cta-link";
import { PageHero } from "@/components/sections/section-heading";
import { HoursList } from "@/components/sections/hours-list";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { PHONE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Class Schedule | Bodies and Pilates North Hollywood",
  description:
    "This week's reformer Pilates schedule in North Hollywood: class times and instructors. New here? Book your $25 first class online.",
  path: "/schedule",
});

const MindbodySchedule = dynamic(() => import("@/components/mindbody-schedule"), { ssr: false });

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Schedule", path: "/schedule" },
]);

// TODO(owner): create a "Schedules" widget at
// https://brandedweb.mindbodyonline.com/manager/ configured to show class
// name, start time, and instructor name, then set
// NEXT_PUBLIC_HEALCODE_WIDGET_ID in Vercel. Until it is set, this page shows
// studio hours and a call/text prompt instead of a broken embed.
const widgetId = process.env.NEXT_PUBLIC_HEALCODE_WIDGET_ID;

export default function SchedulePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <PageHero
        eyebrow="Book a Class"
        title="Class Schedule"
        intro={
          <p>
            Small-group reformer Pilates seven days a week on Vineland Ave in North Hollywood. Pick a class, reserve
            your reformer, and we will see you there.
          </p>
        }
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {widgetId ? (
            <MindbodySchedule widgetId={widgetId} />
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-sm border border-taupe-300/70 bg-cream-100 p-8">
                <h2 className="font-serif text-3xl text-charcoal-900">Call or text {PHONE.display} to book</h2>
                <p className="mt-4 font-sans text-base leading-relaxed text-charcoal-800/85">
                  Tell us the day and time that works and we will get you on a reformer.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <CtaLink href={PHONE.tel}>Call {PHONE.display}</CtaLink>
                  <CtaLink href={PHONE.sms} variant="outline">
                    Text us
                  </CtaLink>
                </div>
              </div>
              <div>
                <h2 className="mb-4 font-serif text-2xl text-charcoal-900">Studio hours</h2>
                <HoursList />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
