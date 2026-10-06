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
- [ ] MindBody deep link for the $25 intro pricing option specifically (from MindBody Marketing Links, not the general pricing page): `INTRO_OFFER_DEEP_LINK` in `lib/site.ts`. Until set, every "Book Your $25 First Class" button goes to `/intro-offer`.
- [ ] One MindBody deep link per pricing option (from Marketing Links): `bookingUrl` per offer in `lib/pricing.ts`. Until set, pack, membership, and private buttons go to the general MindBody pricing page; the intro offers go to `/schedule`.

### Booking map (live)

| CTA / location | Destination | Tab |
|---|---|---|
| Header + sticky mobile bar "Book Your $25 First Class" | `INTRO_OFFER_DEEP_LINK` (TODO), `/intro-offer` until set | same |
| `/schedule` | MindBody Schedules widget `8550823b9a6`, with "Book on MindBody" and call/text as secondary lines | same |
| "Book on MindBody" (schedule page, footer) | https://go.mindbodyonline.com/book/app/classes/5739427 | same |
| Pricing tier buttons (packs, memberships, privates) | https://go.mindbodyonline.com/book/app/pricing/bus_11kS9of8y3RDLJFBGg until each option has its own deep link | same |
| "Book on ClassPass" (strip on `/pricing` and `/intro-offer`, footer) | https://classpass.com/studios/bodies-and-pilates-los-angeles | new |
| Footer "Review us on Google" | https://share.google/iiwq2gBssUKulvsol | new |
| Footer "Get the Mindbody app" | https://get.mndbdy.ly/GiC0CPO08Mb | new |
| Footer "Login \| Register" | MindBody HealCode account-link widget (site 121411 / MindBody 5739427), loaded when the footer scrolls into view | widget |

All MindBody values live in `MINDBODY` in `lib/site.ts`. Spare HealCode registrations widgets `85150676b9a6` and `85151183b9a6` are recorded there but not used; the owner has not said which is which.

### Policies and terms
- [ ] Late-cancel and no-show policy text (`lib/faqs.ts`, id `cancellation`).
- [ ] Membership pause and cancel terms (`lib/faqs.ts`, id `pause-cancel`, and the placeholder on `/pricing`).
- [ ] Class pack expiry (placeholder on `/pricing`).

### Facts to confirm
- [ ] Public contact email (`EMAIL` in `lib/site.ts`, taken from the current live site).
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
- **Booking map.** See the table under Owner TODO list. MindBody links open in the same tab; ClassPass, Google, Instagram, and the Mindbody app link open in a new tab. Facebook is not linked.
- **FAQ uses native `<details>`.** No JavaScript, and every answer is in the HTML so it matches the FAQPage schema.
- **framer-motion removed.** Animations were delaying the hero text (LCP). The site now ships no animation library.
- **Hours.** Owner-confirmed hours only. Friday is 7am to 8pm (the old site said 7:30 to 11:30).
- **Phone.** 818-813-4446 everywhere. The owner's mobile does not appear on the site or in schema.
