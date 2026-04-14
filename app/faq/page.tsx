import type { Metadata } from 'next';
import { breadcrumbSchema } from '@/lib/breadcrumb';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: {
    absolute: 'Frequently Asked Questions',
  },
  description:
    'Get answers to common questions about Bodies and Pilates in North Hollywood: first class prep, attire, parking, cancellation policy, and more.',
};

const faqs = [
  {
    q: 'I just signed up, what do I need for my first class?',
    a: 'Welcome! Please arrive 10 minutes prior to class starting to allow ample time to get settled. A waiver signature will be required upon arrival. Every class requires the use of grip socks. If you forget, we have grip socks available for purchase at the studio.',
  },
  {
    q: 'What should I wear?',
    a: 'We recommend form fitting workout clothes that allow you to move freely. This helps instructors see and correct your form more easily. Loose clothing may hinder your exercise performance and cause potential dangers. Grip socks are required for safety and hygienic purposes.',
  },
  {
    q: 'Where can I park?',
    a: 'There is free street parking on Weddington St, as well as across the street on Vineland Ave. Metered parking is available in front of the studio on Vineland, and Mccormick St.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancellations for classes must be made with a 12 hour notice of class start time. If you cancel within 12 hours of the scheduled class, you will be considered "Late cancel" and will forfeit that class with no additional charge. Absence to class without a cancellation will result in a $35 No Show fee and you will still retain your single class credit.',
  },
  {
    q: 'If I am running late, will I still be able to join the class?',
    a: 'We ask that you try your best to be on time to prevent distractions, and to allow proper warm up time during the beginning of class. If you arrive within 5 minutes of the start time, you will be allowed to join the class. Unfortunately, anything past that will result in a "late cancel" and your class credit will be forfeited.',
  },
  {
    q: 'What if I am pregnant?',
    a: 'Congratulations! We\'d love to have you join, with that, doctors clearance is required and the instructor must be notified of your pregnancy. We highly recommend at least 1-3 private sessions or beginner classes prior to progressing. After the 3rd trimester, we recommend private sessions to focus on your goals and prepare you for delivery.',
  },
  {
    q: 'Is there an age limit for classes?',
    a: 'Clients 16-17 years old must receive instructor approval prior to joining. The parent or guardian must sign the liability waiver on behalf of the client. Any clients under 16 years of age must be accompanied by a parent or guardian during the entirety of class.',
  },
  {
    q: 'What is the difference between a class pack and an auto-renew membership?',
    a: 'Packages are a set number of classes to be used within three months. Once all classes are used up or expired, you will need to purchase more. Membership classes are to be used within the billing period, and new credits will automatically be applied during the next billing cycle. Memberships offer discounted rates on classes, and add on classes for only $25.',
  },
  {
    q: 'Do you offer refunds or transfers?',
    a: 'All sales are final. Classes are non-transferable or refundable.',
  },
  {
    q: 'Do auto-renew classes roll over?',
    a: 'Membership credits must be used within that billing cycle. Any unused credits will not rollover.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};

const breadcrumb = breadcrumbSchema([
  { name: 'Home', url: 'https://www.bodiesandpilates.com/' },
  { name: 'FAQ', url: 'https://www.bodiesandpilates.com/faq' },
]);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <div className="bg-cream-100 min-h-screen">
        {/* Hero */}
        <section className="bg-cream-200 py-14 sm:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-serif text-4xl sm:text-5xl text-charcoal-800 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="font-sans text-lg text-charcoal-800/70 max-w-xl mx-auto">
              Everything you need to know before your first class and beyond.
            </p>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <Accordion className="bg-cream-50 border border-taupe-300 rounded-2xl divide-y divide-taupe-300 overflow-hidden">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="px-6 py-5 font-sans font-semibold text-base text-charcoal-800 hover:no-underline hover:bg-cream-100 transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 font-sans text-sm text-charcoal-800/80 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
}
