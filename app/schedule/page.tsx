import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { breadcrumbSchema } from '@/lib/breadcrumb';

export const metadata: Metadata = {
  title: {
    absolute: 'Class Schedule | Bodies and Pilates North Hollywood',
  },
  description:
    "Today's and this week's Pilates class schedule in North Hollywood. Book reformer, mat, and private sessions online.",
};

const MindbodySchedule = dynamic(
  () => import('@/components/mindbody-schedule'),
  { ssr: false }
);

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://www.bodiesandpilates.com/' },
  { name: 'Schedule', url: 'https://www.bodiesandpilates.com/schedule' },
]);

// TODO_WIDGET_ID: configure at brandedweb.mindbodyonline.com/manager/
const widgetId = process.env.NEXT_PUBLIC_HEALCODE_WIDGET_ID ?? 'TODO_WIDGET_ID';
const widgetPending = !process.env.NEXT_PUBLIC_HEALCODE_WIDGET_ID;

const hours = [
  { days: 'Monday & Wednesday', hours: '7:00 am – 8:00 pm' },
  { days: 'Tuesday & Thursday', hours: '8:30 am – 8:30 pm' },
  { days: 'Friday', hours: '7:30 am – 11:30 am' },
  { days: 'Saturday & Sunday', hours: '9:00 am – 12:00 pm' },
];

export default function SchedulePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="bg-cream-100 min-h-screen">
        {/* Hero */}
        <section className="bg-cream-200 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-800 mb-4">
              Class Schedule
            </h1>
            <p className="font-sans text-lg text-charcoal-800/70 max-w-xl mx-auto">
              Browse available classes and reserve your spot directly through Mindbody.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          {/* Studio Hours */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-6">Studio Hours</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-cream-50 border border-taupe-300 rounded-xl overflow-hidden text-sm font-sans">
                <thead>
                  <tr className="bg-cream-200">
                    <th className="text-left px-6 py-3 font-semibold text-charcoal-800">
                      Day(s)
                    </th>
                    <th className="text-left px-6 py-3 font-semibold text-charcoal-800">
                      Hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hours.map((row, i) => (
                    <tr
                      key={row.days}
                      className={i % 2 === 0 ? 'bg-cream-50' : 'bg-cream-100'}
                    >
                      <td className="px-6 py-3 text-charcoal-800">{row.days}</td>
                      <td className="px-6 py-3 text-charcoal-800/80">{row.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Widget note if env var is missing */}
          {widgetPending && (
            <div className="bg-taupe-300/30 border border-taupe-300 rounded-xl px-6 py-4 font-sans text-sm text-charcoal-800">
              <strong>Note:</strong> Widget ID pending — configure at{' '}
              <a
                href="https://brandedweb.mindbodyonline.com/manager/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-sage-700 hover:text-sage-500"
              >
                brandedweb.mindbodyonline.com/manager/
              </a>
              .
            </div>
          )}

          {/* Mindbody Schedule Widget */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-6">Book a Class</h2>
            <MindbodySchedule widgetId={widgetId} />
          </section>

          {/* What to expect on your first visit */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-6">
              What to expect on your first visit
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  step: "01",
                  title: "Book",
                  body: "Choose your class and reserve your spot online.",
                },
                {
                  step: "02",
                  title: "Arrive 10 minutes early",
                  body: "Meet your instructor and get oriented.",
                },
                {
                  step: "03",
                  title: "Bring grip socks",
                  body: "We provide everything else.",
                },
              ].map(({ step, title, body }) => (
                <li
                  key={step}
                  className="bg-cream-50 border border-taupe-300 rounded-2xl p-6 flex flex-col gap-2"
                >
                  <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-sage-700">
                    {step}
                  </span>
                  <h3 className="font-serif text-lg text-charcoal-800">{title}</h3>
                  <p className="font-sans text-sm text-charcoal-800/75 leading-relaxed">
                    {body}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </div>
    </>
  );
}
