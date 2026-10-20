import { PageHero } from "@/components/sections/section-heading";
import { HoursList } from "@/components/sections/hours-list";
import { MindbodyScheduleWidget } from "@/components/mindbody/schedule-widget";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { MINDBODY, PHONE, GRIP_SOCKS_LINE } from "@/lib/site";
import { MEDIA } from "@/lib/media";

export const metadata = pageMetadata({
  title: "Reformer Pilates Schedule, North Hollywood | Bodies and Pilates",
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <PageHero display="Book Your Session" title="Class Schedule" banner={MEDIA.classKneelingLegPress} focus="object-[50%_55%]" />

      {/* booking-1-top.png: the timetable on a rounded off-white card that starts
          right under the banner, on the footer-sage band. */}
      <section className="bg-wix-footer px-2 pb-16 pt-1 sm:px-4 sm:pb-20">
        <div className="mx-auto max-w-[1174px] rounded-2xl bg-wix-offwhite px-4 py-8 sm:px-8 sm:py-10">

          {/* First-timer strip, directly above the widget. */}
          <aside
            aria-label="New here?"
            className="mb-8 border-l-2 border-wix-sage bg-wix-pricing px-5 py-4 font-sans text-sm leading-relaxed text-charcoal-800/85"
          >
            <p>
              <span className="font-medium text-charcoal-900">New here?</span> Arrive at least 10 minutes early to meet your
              instructor and get set up on the reformer.
            </p>
            <p>{GRIP_SOCKS_LINE}</p>
            <p>Wear form-fitting clothes you can move in.</p>
          </aside>

          {/* Primary path: the live Mindbody timetable. */}
          <MindbodyScheduleWidget widgetId={MINDBODY.scheduleWidgetId} />
        </div>
      </section>

      {/* Secondary: direct Mindbody link, phone, hours. */}
      <section className="bg-cream-50 py-14 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="space-y-3 font-sans text-base text-charcoal-800/85">
            <p>
              <a href={MINDBODY.classesUrl} className={link}>
                Book on Mindbody
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
            <h2 className="mb-4 font-serif text-3xl text-sage-900">Studio hours</h2>
            <HoursList />
          </div>
        </div>
      </section>
    </>
  );
}
