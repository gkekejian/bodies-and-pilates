import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { breadcrumbSchema } from '@/lib/breadcrumb';
import { WEEKLY_SCHEDULE } from '@/lib/weekly-schedule';

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
const widgetId = process.env.NEXT_PUBLIC_HEALCODE_WIDGET_ID;
// Admin setup note — never show it to production visitors
const widgetPending = !widgetId && process.env.NODE_ENV !== 'production';

const MINDBODY_SCHEDULE_URL =
  'https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype=-7';

const hours = [
  { days: 'Monday & Wednesday', hours: '7:00 am – 8:00 pm' },
  { days: 'Tuesday & Thursday', hours: '8:30 am – 8:30 pm' },
  { days: 'Friday', hours: '7:30 am – 11:30 am' },
  { days: 'Saturday & Sunday', hours: '9:00 am – 12:00 pm' },
];

const classTypes = [
  {
    name: 'Reformer',
    href: '/classes/reformer',
    blurb: 'Spring-loaded resistance on premium reformers — all levels.',
  },
  {
    name: 'Beginner',
    href: '/classes/beginner',
    blurb: 'Slow-paced fundamentals, perfect for your first classes.',
  },
  {
    name: 'Fullbody',
    href: '/classes/fullbody',
    blurb: 'Resistance training across apparatuses — lower body, upper body, core.',
  },
  {
    name: 'Flexibility',
    href: '/classes/flexibility',
    blurb: 'Restorative active stretching to release and restore.',
  },
  {
    name: 'Private & Duet',
    href: '/classes/private',
    blurb: 'One-on-one ($100) or two-person ($140) coached sessions.',
  },
];

const DAY_ORDER = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;

const weeklySchedule = [...WEEKLY_SCHEDULE].sort(
  (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
);

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

          {/* Classes offered — server-rendered so crawlers can read it */}
          <section>
            <h2 className="font-serif text-2xl text-charcoal-800 mb-6">
              Classes on the Weekly Schedule
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {classTypes.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="group block h-full bg-cream-50 border border-taupe-300 rounded-xl p-5 transition-colors hover:border-sage-500"
                  >
                    <span className="font-serif text-lg text-charcoal-800 group-hover:text-sage-700 transition-colors">
                      {c.name}
                    </span>
                    <p className="font-sans text-sm text-charcoal-800/70 mt-1.5 leading-relaxed">
                      {c.blurb}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Weekly class times — renders once lib/weekly-schedule.ts is filled in */}
          {weeklySchedule.length > 0 && (
            <section>
              <h2 className="font-serif text-2xl text-charcoal-800 mb-6">
                Weekly Class Times
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-cream-50 border border-taupe-300 rounded-xl overflow-hidden text-sm font-sans">
                  <thead>
                    <tr className="bg-cream-200">
                      <th className="text-left px-6 py-3 font-semibold text-charcoal-800">Day</th>
                      <th className="text-left px-6 py-3 font-semibold text-charcoal-800">Time</th>
                      <th className="text-left px-6 py-3 font-semibold text-charcoal-800">Class</th>
                      <th className="text-left px-6 py-3 font-semibold text-charcoal-800">Instructor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weeklySchedule.map((c, i) => (
                      <tr
                        key={`${c.day}-${c.time}-${c.className}`}
                        className={i % 2 === 0 ? 'bg-cream-50' : 'bg-cream-100'}
                      >
                        <td className="px-6 py-3 text-charcoal-800">{c.day}</td>
                        <td className="px-6 py-3 text-charcoal-800/80">{c.time}</td>
                        <td className="px-6 py-3 text-charcoal-800/80">{c.className}</td>
                        <td className="px-6 py-3 text-charcoal-800/80">{c.instructor ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

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
            {widgetId ? (
              <MindbodySchedule widgetId={widgetId} />
            ) : (
              <div className="bg-cream-50 border border-taupe-300 rounded-xl px-6 py-10 text-center space-y-4">
                <p className="font-sans text-charcoal-800/80 max-w-md mx-auto">
                  Reserve your spot through our Mindbody booking page — it takes
                  under a minute.
                </p>
                <a
                  href={MINDBODY_SCHEDULE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-sage-700 text-cream-50 font-sans text-sm font-semibold px-8 py-3.5 transition-colors hover:bg-sage-500"
                >
                  Open Booking Page
                </a>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
