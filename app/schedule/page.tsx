import { PageHero } from "@/components/sections/section-heading";
import { HoursList } from "@/components/sections/hours-list";
import { MindbodyScheduleWidget } from "@/components/mindbody/schedule-widget";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { MINDBODY, PHONE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Class Schedule | Bodies and Pilates North Hollywood",
  description:
    "Book reformer Pilates classes in North Hollywood: morning and evening sessions on weekdays, mornings on weekends. Book right here, no app download needed.",
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
          {/* First-timer strip, directly above the widget. */}
          <aside
            aria-label="New here?"
            className="mb-8 border-l-2 border-sage-500 bg-cream-100 px-5 py-4 font-sans text-sm leading-relaxed text-charcoal-800/85"
          >
            <p>
              <span className="font-medium text-charcoal-900">New here?</span> Arrive 10 minutes early to meet your
              instructor and get set up on the reformer.
            </p>
            <p>Grip socks are required and sold at the front desk.</p>
            <p>Wear form-fitting clothes you can move in.</p>
          </aside>

          {/* Primary path: the live MindBody timetable. */}
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.2em] text-sage-700">
            Book right here, no app download needed.
          </p>
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
