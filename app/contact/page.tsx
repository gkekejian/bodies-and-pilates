import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/breadcrumb';
import ContactForm from '@/components/contact-form';

export const metadata: Metadata = {
  title: {
    absolute: 'Contact Us | Bodies and Pilates North Hollywood',
  },
  description:
    'Contact Bodies and Pilates at 5251 Vineland Ave, North Hollywood. Call (818) 653-3883 or email Naira@bodiesandpilates.com. Located near Studio City and Burbank.',
};

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://www.bodiesandpilates.com/' },
  { name: 'Contact', url: 'https://www.bodiesandpilates.com/contact' },
]);

const hours = [
  { days: 'Monday & Wednesday', hours: '7:00 am – 8:00 pm' },
  { days: 'Tuesday & Thursday', hours: '8:30 am – 8:30 pm' },
  { days: 'Friday', hours: '7:30 am – 11:30 am' },
  { days: 'Saturday & Sunday', hours: '9:00 am – 12:00 pm' },
];

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=5251+Vineland+Ave+Suite+6+North+Hollywood+CA+91601';

export default function ContactPage() {
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
              Contact Us
            </h1>
            <p className="font-sans text-lg text-charcoal-800/70 max-w-xl mx-auto">
              We&apos;d love to hear from you. Reach out with questions, or stop by the studio.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Left column: Info */}
            <div className="space-y-8">

              {/* Contact details */}
              <div className="bg-cream-50 border border-taupe-300 rounded-2xl p-6 space-y-5">
                <h2 className="font-serif text-2xl text-charcoal-800">Get in Touch</h2>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <span className="text-sage-500 mt-0.5 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.134 2 5 5.134 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div className="font-sans text-sm text-charcoal-800">
                    <p className="font-medium">Address</p>
                    <p className="text-charcoal-800/70 mt-0.5">
                      5251 Vineland Ave Suite 6<br />
                      North Hollywood, CA 91601
                    </p>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sage-700 hover:text-sage-500 underline underline-offset-2 text-xs mt-1 inline-block"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <span className="text-sage-500 mt-0.5 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 0 1 5.5 3h1.379a1 1 0 0 1 .949.684l1.237 3.71a1 1 0 0 1-.274 1.05l-1.31 1.18a11.048 11.048 0 0 0 5.895 5.895l1.18-1.31a1 1 0 0 1 1.05-.274l3.71 1.237A1 1 0 0 1 21 16.12V17.5A2.5 2.5 0 0 1 18.5 20C10.492 20 4 13.508 4 5.5a.5.5 0 0 1 0-.5 2.5 2.5 0 0 1-.5-2.5z" />
                    </svg>
                  </span>
                  <div className="font-sans text-sm text-charcoal-800">
                    <p className="font-medium">Phone</p>
                    <a
                      href="tel:+18186533883"
                      className="text-sage-700 hover:text-sage-500 mt-0.5 block"
                    >
                      (818) 653-3883
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3">
                  <span className="text-sage-500 mt-0.5 shrink-0" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                    </svg>
                  </span>
                  <div className="font-sans text-sm text-charcoal-800">
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:Naira@bodiesandpilates.com"
                      className="text-sage-700 hover:text-sage-500 mt-0.5 block break-all"
                    >
                      Naira@bodiesandpilates.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="bg-cream-50 border border-taupe-300 rounded-2xl p-6">
                <h2 className="font-serif text-2xl text-charcoal-800 mb-4">Studio Hours</h2>
                <table className="w-full text-sm font-sans">
                  <tbody>
                    {hours.map((row, i) => (
                      <tr key={row.days} className={i < hours.length - 1 ? 'border-b border-taupe-300/50' : ''}>
                        <td className="py-2.5 pr-4 text-charcoal-800 font-medium">{row.days}</td>
                        <td className="py-2.5 text-charcoal-800/70 text-right">{row.hours}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Parking */}
              <div className="bg-cream-50 border border-taupe-300 rounded-2xl p-6">
                <h2 className="font-serif text-2xl text-charcoal-800 mb-2">Parking</h2>
                <p className="font-sans text-sm text-charcoal-800/70 leading-relaxed">
                  Free street parking on Weddington St. Metered parking in front on Vineland Ave
                  and Mccormick St.
                </p>
              </div>

              {/* Embedded Google Map */}
              <div className="bg-cream-50 border border-taupe-300 rounded-2xl overflow-hidden">
                <iframe
                  title="Bodies and Pilates — 5251 Vineland Ave, North Hollywood"
                  src="https://maps.google.com/maps?q=5251%20Vineland%20Ave%20Suite%206%2C%20North%20Hollywood%2C%20CA%2091601&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="320"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="block w-full border-0"
                  allowFullScreen
                />
                <div className="px-4 py-3 border-t border-taupe-300 flex items-center justify-between gap-3 flex-wrap">
                  <p className="font-sans text-xs text-charcoal-800/60">
                    5251 Vineland Ave Suite 6, North Hollywood, CA 91601
                  </p>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-xs text-sage-700 underline underline-offset-2 hover:text-sage-500"
                  >
                    Open in Google Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Right column: Contact form */}
            <div>
              <div className="bg-cream-50 border border-taupe-300 rounded-2xl p-6 lg:p-8">
                <h2 className="font-serif text-2xl text-charcoal-800 mb-6">Send a Message</h2>
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
