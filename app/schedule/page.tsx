import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { breadcrumbSchema } from '@/lib/breadcrumb';

export const metadata: Metadata = {
  title: {
    absolute: 'Class Schedule | North Hollywood Pilates',
  },
  description:
    'View our current class schedule and book your Pilates class in North Hollywood. Easy online booking through Mindbody.',
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
        </div>
      </div>
    </>
  );
}
