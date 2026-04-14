# Complete rebuild blueprint for Bodies and Pilates on Next.js 14

Bodies and Pilates at 5251 Vineland Ave, North Hollywood, CA 91601 currently runs a 4-page Wix site with Mindbody integration (Studio ID: 5739427). The new Next.js 14 site deployed on Vercel can dramatically outperform the current site and every local competitor by expanding from 4 pages to 15+, launching a blog (only 2 of 8+ competitors have one), fixing critical UX gaps, and implementing proper local SEO.

## 1. Current website content

Business: Bodies and Pilates, 5251 Vineland Ave Suite 6, North Hollywood CA 91601. Phone (818) 653-3883. Email Naira@bodiesandpilates.com. IG @bodiesandpilates. Facebook facebook.com/people/Bodies-and-Pilates/61567392958788/. ClassPass classpass.com/studios/bodies-and-pilates-los-angeles. Mindbody Studio ID 5739427. Owner Naira Sarkian @nairasarkian. Tagline "Empower Your Essence" (currently misspelled "Essense").

Hours: Mon 7a-8p, Tue 8:30a-8:30p, Wed 7a-8p, Thu 8:30a-8:30p, Fri 7:30a-11:30a, Sat 9a-12p, Sun 9a-12p.

Homepage hero: "Empower Your Essence" with "BOOK A SESSION" CTA.

Welcome: "Welcome to our curated studio, where we offer boutique Pilates classes in a warm and inviting setting. Join us on the journey to sculpt, balance, and grow together."

The Space: "At Bodies and Pilates, we pride ourselves in providing a luxurious, tranquil environment combined with cutting-edge fitness. Our boutique studio is equipped with state-of-the-art equipment, while our small class sizes allow for personalized attention and guidance throughout your workout."

The Practice: "Pilates is a versatile exercise system that strengthens muscles, improves flexibility, and enhances overall body alignment. We combine the best of low-impact movements with high-intensity focus to isolate and fatigue each muscle group for maximum effectiveness. Our aim is not just for physical strength but also for a harmonious balance between mind and body, leaving you rejuvenated and strong. Some benefits include: increased core strength, better posture, reduced stress, and improved coordination and balance."

Classes:
- Beginner: "Our beginner class is curated with the fundamental pilates exercises. A more slow paced, full body workout that focuses on the basics. Great for those new to the Pilates practice, individuals who may have restrictions, or those who wish to deepen their existing practice."
- Flexibility: "Feeling tight? Our flexibility class offers a restorative experience designed to improve flexibility, prevent injury, and alleviate stress. Allow your body to rest and restore as you flow through active stretches."
- Fullbody: "Our classic full body class combining resistance training on different apparatuses and props! Designed to provide a full body workout targeting lower body, upper body, and core."

Pricing (Mindbody URL pattern: https://clients.mindbodyonline.com/classic/ws?studioid=5739427&stype={stype}&prodid={prodid}):
Intro Offers (stype=43): First Class $25 prodid=100010; 1 Week Unlimited $105 prodid=100014.
Class Packs (stype=43): Single $36 prodid=100003; 5 Pack $160 prodid=100004; 10 Pack $300 prodid=100005.
Auto-Renew Memberships (stype=40): 5 Classes $130/mo prodid=100; 8 Classes $170/mo prodid=102; 12 Classes $220/mo prodid=103; Unlimited $280/mo prodid=101.
Specialty (stype=43): Duet $140 prodid=100016; 55-min Private $100 prodid=100011.

Testimonials:
1. "Naira is a 10 out of 10. She is a genuine instructor. She is friendly and really cares about everyone in the class. She has a lovely presence. I felt like I got my moneys worth. I was very impressed and I look forward to taking another class there."
2. "Naira is very charming and kind but works us to a sweat, while being accommodating to our particular circumstances. I really enjoy her sessions."
3. "I LOVE her classes! She has the best energy, it's calm and yet the sessions are very challenging."

FAQs:
Q: I just signed up, what do I need for my first class? A: Welcome! Please arrive 10 minutes prior to class starting to allow ample time to get settled. A waiver signature will be required upon arrival. Every class requires the use of grip socks. If you forget, we have grip socks available for purchase at the studio.
Q: What should I wear? A: We recommend form fitting workout clothes that allow you to move freely. This helps instructors see and correct your form more easily. Loose clothing may hinder your exercise performance and cause potential dangers. Grip socks are required for safety and hygienic purposes.
Q: Where can I park? A: There is free street parking on Weddington St, as well as across the street on Vineland Ave. Metered parking is available in front of the studio on Vineland, and Mccormick St.
Q: What is your cancellation policy? A: Cancellations for classes must be made with a 12 hour notice of class start time. If you cancel within 12 hours of the scheduled class, you will be considered "Late cancel" and will forfeit that class with no additional charge. Absence to class without a cancellation will result in a $35 No Show fee and you will still retain your single class credit.
Q: If I am running late, will I still be able to join the class? A: We ask that you try your best to be on time to prevent distractions, and to allow proper warm up time during the beginning of class. If you arrive within 5 minutes of the start time, you will be allowed to join the class. Unfortunately, anything past that will result in a "late cancel" and your class credit will be forfeited.
Q: What if I am pregnant? A: Congratulations! We'd love to have you join, with that, doctors clearance is required and the instructor must be notified of your pregnancy. We highly recommend at least 1-3 private sessions or beginner classes prior to progressing. After the 3rd trimester, we recommend private sessions to focus on your goals and prepare you for delivery.
Q: Is there an age limit for classes? A: Clients 16-17 years old must receive instructor approval prior to joining. The parent or guardian must sign the liability waiver on behalf of the client. Any clients under 16 years of age must be accompanied by a parent or guardian during the entirety of class.
Q: What is the difference between a class pack and an auto-renew membership? A: Packages are a set number of classes to be used within three months. Once all classes are used up or expired, you will need to purchase more. Membership classes are to be used within the billing period, and new credits will automatically be applied during the next billing cycle. Memberships offer discounted rates on classes, and add on classes for only $25.
Q: Do you offer refunds or transfers? A: All sales are final. Classes are non-transferable or refundable.
Q: Do auto-renew classes roll over? A: Membership credits must be used within that billing cycle. Any unused credits will not rollover.

Instructors: Naira Sarkian (owner, lead, Naira@bodiesandpilates.com, IG @nairasarkian), Theresia (Wednesdays, IG @sleepyt707), Hannah.

## 2. Mindbody integration

Use Branded Web Tools (Healcode) widgets. JS: https://widgets.mindbodyonline.com/javascripts/healcode.js. Must use dynamic script loader pattern (healcode.js breaks on SPA route changes):

```ts
// lib/mindbody-loader.ts
const loadMBody = (callback?: () => void) => {
  const existingScript = document.getElementById('mindBody');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = 'https://widgets.mindbodyonline.com/javascripts/healcode.js';
    script.id = 'mindBody';
    script.async = true;
    document.body.appendChild(script);
    script.onload = () => { if (callback) callback(); };
  }
  if (existingScript && callback) callback();
};
export default loadMBody;
```

```tsx
// components/MindbodySchedule.tsx (client)
'use client';
import { useEffect, useState } from 'react';
import loadMBody from '@/lib/mindbody-loader';
export default function MindbodySchedule({ widgetId }: { widgetId: string }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { loadMBody(() => setLoaded(true)); }, []);
  return loaded ? (
    <healcode-widget data-type="schedules" data-widget-partner="object"
      data-widget-id={widgetId} data-widget-version="0" />
  ) : null;
}
```

Wrap in ErrorBoundary that reloads on route-change errors. Widget ID is configured at https://brandedweb.mindbodyonline.com/manager/ — leave as env var / TODO.

## 3. SEO and schema

HealthClub JSON-LD for root layout:
```json
{"@context":"https://schema.org","@graph":[{"@type":"HealthClub","@id":"https://www.bodiesandpilates.com/#organization","name":"Bodies and Pilates","alternateName":"Bodies & Pilates","description":"Located in North Hollywood, Bodies and Pilates provides high quality, personalized Pilates classes with state-of-the-art equipment.","url":"https://www.bodiesandpilates.com/","telephone":"+1-818-653-3883","email":"Naira@bodiesandpilates.com","address":{"@type":"PostalAddress","streetAddress":"5251 Vineland Ave, Ste 6","addressLocality":"North Hollywood","addressRegion":"CA","postalCode":"91601","addressCountry":"US"},"geo":{"@type":"GeoCoordinates","latitude":"34.1689","longitude":"-118.3687"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":"Monday","opens":"07:00","closes":"20:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Tuesday","opens":"08:30","closes":"20:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Wednesday","opens":"07:00","closes":"20:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Thursday","opens":"08:30","closes":"20:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Friday","opens":"07:30","closes":"11:30"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Saturday","opens":"09:00","closes":"12:00"},{"@type":"OpeningHoursSpecification","dayOfWeek":"Sunday","opens":"09:00","closes":"12:00"}],"priceRange":"$$","sameAs":["https://www.instagram.com/bodiesandpilates/","https://www.facebook.com/people/Bodies-and-Pilates/61567392958788/","https://classpass.com/studios/bodies-and-pilates-los-angeles"],"areaServed":[{"@type":"City","name":"North Hollywood"},{"@type":"City","name":"Studio City"},{"@type":"City","name":"Burbank"},{"@type":"City","name":"Valley Village"},{"@type":"City","name":"Toluca Lake"}]},{"@type":"WebSite","@id":"https://www.bodiesandpilates.com/#website","url":"https://www.bodiesandpilates.com/","name":"Bodies and Pilates","publisher":{"@id":"https://www.bodiesandpilates.com/#organization"}}]}
```

Do NOT include aggregateRating on HealthClub (Google disallows). Use Service schema on individual class pages for review eligibility.

Metadata:
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://www.bodiesandpilates.com'),
  title: { template: '%s | Bodies and Pilates', default: 'Pilates Studio in North Hollywood | Bodies and Pilates' },
  description: 'Boutique Pilates studio in North Hollywood offering reformer & mat classes, private sessions, and beginner-friendly group classes. Book your $25 first class.',
  openGraph: { type: 'website', locale: 'en_US', siteName: 'Bodies and Pilates' },
  robots: { index: true, follow: true },
};
```

## 4. Design system

Palette (Tailwind v4 tokens):
cream-50 #FDFCFA, cream-100 #FAF7F2, cream-200 #F5F0EB, sage-300 #B8C9A3, sage-500 #7D8A6D, sage-700 #5A6B4A, taupe-300 #D4C5B5, taupe-500 #A3927E, blush-500 #D4A69A, charcoal-800 #2C2C2C, charcoal-900 #1A1A1A.

Fonts: Playfair Display (headings), Inter (body), both via next/font/google.

Nav items: Classes, Schedule, Pricing, About, Contact + persistent Book Now. Mobile: Book Now outside hamburger, sticky bottom CTA after hero scroll.

Animations (Motion):
- Hero: initial {opacity:0,y:20} animate {opacity:1,y:0} duration 0.6
- Sections: whileInView with viewport once:true
- Cards: whileHover {scale:1.02,y:-4} spring

shadcn components to use: Card, Button, Accordion, Tabs, Carousel, Badge, Dialog/Sheet, Calendar, NavigationMenu, Skeleton.

## 5. Site structure

/, /about, /classes, /classes/beginner, /classes/fullbody, /classes/flexibility, /classes/private, /pricing, /schedule, /instructors, /instructors/naira, /faq, /contact, /blog, /blog/[slug].

next.config.js redirects: /bookings → /schedule, /faqs → /faq, /post/:slug → /blog/:slug (all permanent: true, which is 308).

## 6. Blog scaffolding (create draft MDX files with front-matter only)

1. What to Expect at Your First Pilates Class (first-pilates-class)
2. Reformer vs Mat Pilates: Which Is Right for You? (reformer-vs-mat-pilates)
3. 10 Benefits of Pilates Backed by Science (benefits-of-pilates)
4. Pilates for Back Pain: Exercises That Actually Help (pilates-for-back-pain)
5. Pilates vs Yoga: What's the Difference? (pilates-vs-yoga)
6. Can Pilates Help You Lose Weight? (pilates-weight-loss)
7. Pilates During Pregnancy: Safety Guide (pilates-pregnancy)
8. How Much Do Pilates Classes Cost? 2026 Guide (pilates-class-cost)
9. Best Pilates Studios in North Hollywood (best-pilates-north-hollywood)
10. Complete Guide to Reformer Pilates for Beginners (reformer-for-beginners)
11. Pilates for Runners: Cross-Training Guide (pilates-for-runners)
12. Pilates Equipment Guide (pilates-equipment)
13. How Often Should You Do Pilates? (how-often-pilates)
14. Pilates for Posture: Fix Desk Job Damage (pilates-for-posture)
15. Pilates for Seniors (pilates-for-seniors)

## 7. Core Web Vitals targets

LCP ≤2.5s (next/image priority on hero, SSG/ISR, inline critical CSS). INP ≤200ms (RSC, next/dynamic code-split, defer third-party). CLS ≤0.1 (image dimensions, next/font, reserve space for dynamic).

## 8. Instagram and reviews

Instagram: Behold.so via @behold/widget (client component, feedId as env var / TODO).
Google Reviews: server route at app/api/reviews/route.ts using Places API (New), field mask displayName,rating,userRatingCount,reviews, revalidate 86400.

## 9. Analytics

GA4 via @next/third-parties GoogleAnalytics component (G-XXX). Google Ads same component (AW-XXX). Meta Pixel via next/script afterInteractive. CCPA banner (opt-out model, GPC honor, "Do Not Sell" link) gates GA4 + Pixel. Behold loads freely (no cookies).
