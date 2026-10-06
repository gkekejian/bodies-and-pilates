# Build Notes: Bodies and Pilates

**Stack:** Next.js 14.2 App Router, TypeScript (strict), Tailwind CSS v3, shadcn/ui primitives
**Build:** `npm run build` passes (34 static routes, 0 type errors, 0 lint errors)
**GitHub:** https://github.com/gkekejian/bodies-and-pilates
**Vercel:** https://vercel.com/gkekejians-projects/bodies-and-pilates

---

## Where things live

| What | File |
|------|------|
| Business facts (phone, address, hours, email, Instagram, Google rating, booking link) | `lib/site.ts` |
| Price menu and per-offer MindBody links | `lib/pricing.ts` |
| FAQ content (also generates FAQPage schema) | `lib/faqs.ts` |
| Class formats (copy for /classes and /classes/[slug]) | `lib/classes.ts` |
| Instructor cards | `lib/team.ts` |
| Testimonials | `lib/testimonials.ts` |
| Photo and video slots | `lib/photos.ts` |
| ExerciseGym JSON-LD | `lib/schema.ts` (rendered in `app/layout.tsx`) |
| Per-page title, description, canonical, Open Graph | `lib/metadata.ts` + each page's `metadata` |
| Form forwarding (lead capture, contact) | `lib/forms.ts`, `app/api/lead`, `app/api/contact` |
| Redirects | `next.config.mjs` (legacy URLs, bare domain) and `middleware.ts` (lowercase, trailing slash) |

Every open item is marked in code with `TODO(owner)`. Visible placeholders carry a
`data-placeholder` attribute. To list everything still open:

```bash
grep -rn "TODO(owner)" app components lib content
```

---

## Owner TODO list

### Booking
- [ ] MindBody branded-web deep link for the $25 intro offer: `INTRO_OFFER_DEEP_LINK` in `lib/site.ts`. Until set, every "Book Your $25 First Class" button goes to `/intro-offer`.
- [ ] Deep link for each price option: `bookingUrl` per offer in `lib/pricing.ts`. Until set, those buttons go to `/schedule`.
- [ ] ClassPass studio page URL: `CLASSPASS_URL` in `lib/site.ts`. Used by the "Book on ClassPass" button in the ClassPass strip on `/pricing` and `/intro-offer`, and by the footer.
- [ ] MindBody business page URL: `MINDBODY_BUSINESS_URL` in `lib/site.ts`. Used by the footer.
- [ ] HealCode schedule widget ID, configured to show class name, time, and instructor: set `NEXT_PUBLIC_HEALCODE_WIDGET_ID` in Vercel. Until set, `/schedule` shows hours plus "Call or text 818-813-4446 to book".

### Policies and terms
- [ ] Late-cancel and no-show policy text (`lib/faqs.ts`, id `cancellation`).
- [ ] Membership pause and cancel terms (`lib/faqs.ts`, id `pause-cancel`, and the placeholder on `/pricing`).
- [ ] Class pack expiry (placeholder on `/pricing`).

### Facts to confirm
- [ ] Public contact email (`EMAIL` in `lib/site.ts`, taken from the current live site).
- [ ] Google Business Profile review URL (`GOOGLE_REVIEWS.profileUrl` in `lib/site.ts`). It also goes into schema `sameAs`.
- [ ] Geo coordinates for schema (`lib/schema.ts`).
- [ ] Difficulty level, "who it is for", and 50-minute length per class (`lib/classes.ts`).
- [ ] Neighborhood routes and landmarks read right to a local (`app/about/page.tsx`).
- [ ] Studio story copy in your own words (`app/about/page.tsx`).
- [ ] Optional: maximum class size, the strongest proof point (`app/page.tsx`).

### Team (`lib/team.ts`)
- [ ] Confirm every name, credential, and specialty is current.
- [ ] Naira: credentials, specialties, one-line philosophy.
- [ ] Hannah, Marlyn, Enrika, Sita: one-line philosophy each.
- [ ] If this cannot be complete before launch, set `SHOW_TEAM = false`. Never launch it half-empty.

### Testimonials (`lib/testimonials.ts`)
- [ ] First name and neighborhood for each quote, with the client's permission. Optional portrait (slot 10).

### Photography (`lib/photos.ts`)
All stock photography has been removed. Drop files into `public/photos/` and set `src` on each slot.

| Slot | Shot |
|------|------|
| 1 | Wide hero of the reformer room in daylight, no people |
| 2 | Real class in motion, instructor cueing |
| 3 | Instructor headshots, same backdrop |
| 4 | Close-up of hands and feet on reformer straps and footbar |
| 5 | Entrance and signage from the Vineland Ave sidewalk |
| 6 | Parking on Weddington St and metered spots |
| 7 | Props flat-lay: grip socks, bands, rings, balls |
| 8 | Warm post-class lifestyle shot |
| 9 | Vertical 15 to 30s clips, one per class format (`CLIPS`, files in `public/video/`) |
| 10 | Testimonial portraits |

- [ ] Share image: replace the generated card with a real 1200x630 photo (see `lib/og.tsx`).

### Forms
- [ ] `LEAD_CAPTURE_WEBHOOK_URL`: where first-timer's guide sign-ups go (MindBody or email platform). Write the guide email itself there.
- [ ] `CONTACT_FORM_WEBHOOK_URL`: where contact messages go.
Until set, both forms return an honest "could not send" message with the phone number. Nothing is faked.

### Blog (`content/blog/`)
- [ ] Ten scaffolded posts, each with a title, description, and outline. Write the copy under the frontmatter, set `draft: false` and a `publishDate`. Drafts are noindexed and kept out of the sitemap.

### Domain
- [ ] Add both `www.bodiesandpilates.com` (primary) and `bodiesandpilates.com` to the Vercel project. The bare domain 301s to www via `next.config.mjs`.

---

## Launch checklist

- [ ] MindBody widget live with the real timetable (class names, times, instructors)
- [ ] Full pricing visible, retired $130 and $220 tiers absent
- [ ] No stock photos anywhere (all slots filled, or explicitly deferred by the owner)
- [ ] Team section complete, or hidden with `SHOW_TEAM = false`
- [ ] All `TODO(owner)` items resolved or explicitly deferred by the owner
- [ ] Meta descriptions unique per page
- [ ] OG tags render in a link debugger (Facebook Sharing Debugger, LinkedIn Post Inspector)
- [ ] Schema validates (https://validator.schema.org and Google Rich Results Test on `/` and `/faq`)
- [ ] Branded 404 renders (`/any-missing-page`)
- [ ] PageSpeed 90+ mobile on Home, Pricing, Classes (re-test after real photos land)
- [ ] Tap-to-call and text links work on a real phone
- [ ] Both forms submit to a real destination
- [ ] No em dashes in copy
- [ ] No invented facts
- [ ] QA on real iOS and Android devices

### Last measured (local production build, Lighthouse 12 mobile, placeholders in place)

| Page | Performance | Accessibility | Best practices | SEO | CLS |
|------|-------------|---------------|----------------|-----|-----|
| Home | 97 | 100 | 100 | 100 | 0 |
| Pricing | 98 | 100 | 100 | 100 | 0 |
| Classes | 97 | 100 | 100 | 100 | 0 |

Real device QA has not been done yet.

---

## Redirects

| From | To |
|------|----|
| bodiesandpilates.com/* | www.bodiesandpilates.com/* |
| /bookings, /book-online | /schedule |
| /faqs | /faq |
| /post/:slug | /blog/:slug |
| /plans-pricing, /pricing-plans/*, /category/all-products | /pricing |
| Uppercase paths (e.g. /Pricing) | lowercase |
| Trailing slash (e.g. /pricing/) | no trailing slash |
| /classes/reformer | /classes |
| /instructors, /instructors/* | /about#team |
| /locations, /locations/* | /about#neighborhoods |

All are 301.

---

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
npx tsc --noEmit             # type-check
npm run lint
npm run build && npm run start
```

---

## Decisions

- **Doorway pages removed.** The four `/locations/*` pages are consolidated into one "Neighborhoods we serve" section on `/about`, per the brief. `/instructors` merged into the About team section.
- **Reformer only.** Copy that mentioned mat classes is gone; every group class is described as small-group reformer Pilates. The Full Body page title changed from "Mat Pilates Classes" for the same reason.
- **Booking map.** "Book Your $25 First Class" (header, mobile bar) goes to the MindBody intro-offer deep link; `/schedule` uses the MindBody widget; each pricing tier button uses its own MindBody deep link. The ClassPass strip on `/pricing` and `/intro-offer` adds a "Book on ClassPass" button. The footer links to Instagram, Google reviews, ClassPass, and MindBody, all in a new tab. Facebook is not linked.
- **FAQ uses native `<details>`.** No JavaScript, and every answer is in the HTML so it matches the FAQPage schema.
- **framer-motion removed.** Animations were delaying the hero text (LCP). The site now ships no animation library.
- **Hours.** Owner-confirmed hours only. Friday is 7am to 8pm (the old site said 7:30 to 11:30).
- **Phone.** 818-813-4446 everywhere. The owner's mobile does not appear on the site or in schema.
