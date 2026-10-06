import { PageHero } from "@/components/sections/section-heading";
import { HoursList } from "@/components/sections/hours-list";
import { MindbodyScheduleWidget } from "@/components/mindbody/schedule-widget";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { MINDBODY, PHONE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Class Schedule | Bodies and Pilates North Hollywood",
  description:
    "This week's reformer Pilates schedule in North Hollywood: class times and instructors. New here? Book your $25 first class online.",
  path: "/schedule",
});

const breadcrumb = breadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Schedule", path: "/schedule" },
]);

const link = "text-sage-700 underline underline-offset-4 hover:text-sage-500";

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
          {/* Primary path: the live MindBody timetable. */}
          <MindbodyScheduleWidget widgetId={MINDBODY.scheduleWidgetId} />

          {/* Secondary: direct MindBody link, phone, hours. */}
          <div className="mt-12 grid gap-10 border-t border-taupe-300/70 pt-10 lg:grid-cols-2">
            <div className="space-y-3 font-sans text-base text-charcoal-800/85">
              <p>
                <a href={MINDBODY.classesUrl} className={link}>
                  Book on MindBody
                </a>
              </p>
              <p>
                Call or text{" "}
                <a href={PHONE.tel} className={link}>
                  {PHONE.display}
                </a>{" "}
                to book.
              </p>
            </div>
            <div>
              <h2 className="mb-4 font-serif text-2xl text-charcoal-900">Studio hours</h2>
              <HoursList />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
