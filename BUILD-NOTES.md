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

### Booking map (live)

| CTA / location | Destination | Tab |
|---|---|---|
| Every "Book Your $25 First Class" button (header, mobile bar, CTAs, $25 card) | $25 First Class: `...classic/ws?studioid=5739427&stype=43&prodid=100010` | same |
| $105 One-Week Unlimited | `...stype=43&prodid=100014` | same |
| Single Class $36 / 5-Pack $160 / 10-Pack $300 | `...stype=43&prodid=100003` / `100004` / `100005` | same |
| 5 / 8 / 12 Classes per Month ($130 / $170 / $220), Unlimited $280 | `...stype=40&prodid=100` / `102` / `103` / `101` | same |
| Private $100 / Duet $70 per person | `...stype=43&prodid=100011` / `100016` | same |
| `/schedule` | MindBody Schedules widget `8550823b9a6`, with "Book on MindBody" and call/text as secondary lines | same |
| "Book on MindBody" (schedule page, footer) | https://go.mindbodyonline.com/book/app/classes/5739427 | same |
| "Book on ClassPass" (strip on `/pricing` and `/intro-offer`, footer) | https://classpass.com/studios/bodies-and-pilates-los-angeles | new |
| Footer "Review us on Google" | https://share.google/iiwq2gBssUKulvsol | new |
| Footer "Get the Mindbody app" | https://get.mndbdy.ly/GiC0CPO08Mb | new |
| Footer "Login \| Register" | MindBody HealCode account-link widget (site 121411 / MindBody 5739427), loaded when the footer scrolls into view | widget |

Per-price links are classic MindBody URLs (`https://clients.mindbodyonline.com/classic/ws?studioid=5739427&...`) taken from the live site's "Book Now" buttons; they are set in `lib/pricing.ts`. If the owner later provides go.mindbodyonline.com Marketing Links equivalents, swap them in there. The general pricing page (`MINDBODY.pricingUrl`) is now only a fallback. All other MindBody values live in `MINDBODY` in `lib/site.ts`. Spare HealCode registrations widgets `85150676b9a6` and `85151183b9a6` are recorded there but not used; the owner has not said which is which.

### Policies and terms
- [x] Late-cancel and no-show policy (owner-confirmed): FAQ `cancellation` and the line under memberships and packs on `/pricing`.
- [x] Membership pause and cancel terms (owner-confirmed): FAQ `pause-cancel` and the line under memberships on `/pricing`.
- [ ] Class pack expiry (placeholder on `/pricing`).

### Facts to confirm
- [ ] Geo coordinates for schema (`lib/schema.ts`).
- [ ] Difficulty level, "who it is for", and 50-minute length per class (`lib/classes.ts`).
- [ ] Neighborhood routes and landmarks read right to a local (`app/about/page.tsx`).
- [ ] Studio story copy in your own words (`app/about/page.tsx`).
- [ ] Optional: maximum class size, the strongest proof point (`app/page.tsx`).

### Team (`lib/team.ts`)
- [ ] Confirm every name, credential, and specialty is current.
- [ ] Naira: credentials, specialties, one-line philosophy, and a 2 to 3 sentence origin story (how she found Pilates, why she founded the studio).
- [ ] Hannah, Marlyn, Enrika, Sita: one-line philosophy each.
- [ ] Confirm each carried-over origin story and fill the gaps marked in `lib/team.ts` (how they found Pilates, why they teach).
- [ ] If this cannot be complete before launch, set `SHOW_TEAM = false`. Never launch it half-empty.

### Testimonials (`lib/testimonials.ts`)
- [ ] The owner's real-review testimonial block (Sasha, Penny, Jason) has not reached the build yet. Paste it in and it replaces the three placeholder-attributed quotes. Neighborhood for each is still needed. Optional portrait (slot 10).

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
- [ ] The 20 full drafts (`blog-drafts-batch-1.md` to `-4.md`) have not reached the build yet. When they arrive they replace the 11 outline scaffolds, one MDX file per post, using the slugs in `lib/blog-plan.ts`.
- [ ] Publishing start date. Posts go out 2 per week in the order in `lib/blog-plan.ts` (question-format posts first). Each post's `publishDate` is set in its frontmatter.

How the blog works (see the header comment in `lib/blog.ts` for the frontmatter fields):
- A post is **published** once `draft: false` and its `publishDate` has arrived (midnight Pacific). Published posts are indexed, listed on `/blog` newest first, and included in `sitemap.xml` with lastmod.
- A post with a future `publishDate` returns 404 and stays out of the index and sitemap until its date. Blog pages and the sitemap regenerate hourly, so posts go live on schedule without a redeploy.
- Outline scaffolds (`draft: true`) show as "Coming soon" and are noindexed.
- Every published post has: one H1, a byline crediting Naira Sarkian, BlogPosting schema with Person author, `og:type=article`, a hero image slot (labeled placeholder until photos land), the intro-offer CTA, and up to 3 related posts by topic group.
- The 8 question-format posts (`QUESTION_POSTS` in `lib/blog-plan.ts`) carry a `faqs` list in frontmatter, rendered before the CTA with FAQPage JSON-LD.
- `/blog` paginates at 12 per page (`/blog/page/2`, ...).

### Compliance, security, and AI search
- [ ] Have a lawyer review `/privacy` and `/terms` (drafted only from what the site actually does). Name the form and email providers in the privacy policy once the webhooks are connected.
- [ ] Content Security Policy: the full policy runs in report-only mode (`next.config.mjs`). Open the preview with DevTools, book through the MindBody widget and log in, then check the console for CSP reports. Add any blocked MindBody hosts and switch the header to enforcing.
- [ ] AI crawlers: `app/robots.ts` allows AI search and training crawlers by name. To stay in AI answers but opt out of training, set GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, and CCBot to disallow.
- Analytics are opt-in: GA4 and the Meta Pixel load only after Accept, Global Privacy Control counts as a decline, and "Cookie settings" in the footer reopens the choice.
- `/llms.txt` and `/llms-full.txt` are generated from the same data as the pages (`lib/llms.ts`), so they stay in sync.

### Domain
- [ ] Add both `www.bodiesandpilates.com` (primary) and `bodiesandpilates.com` to the Vercel project. The bare domain 301s to www via `next.config.mjs`.

---

## Launch checklist

- [ ] MindBody widget live with the real timetable (class names, times, instructors)
- [ ] Full pricing visible: all 11 options, exactly as on the old live pricing page
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
- **Pricing is published in full.** Owner decision: every tier from the old live pricing page, including the $130 and $220 memberships. Transparent pricing with per-option booking links is a deliberate differentiator against competitors that publish none (e.g. KV Lagree).
- **Reformer only.** Copy that mentioned mat classes is gone; every group class is described as small-group reformer Pilates. The Full Body page title changed from "Mat Pilates Classes" for the same reason.
- **Booking map.** See the table under Owner TODO list. MindBody links open in the same tab; ClassPass, Google, Instagram, and the Mindbody app link open in a new tab. Facebook is not linked.
- **FAQ uses native `<details>`.** No JavaScript, and every answer is in the HTML so it matches the FAQPage schema.
- **framer-motion removed.** Animations were delaying the hero text (LCP). The site now ships no animation library.
- **Hours.** Owner-confirmed hours only. Friday is 7am to 8pm (the old site said 7:30 to 11:30).
- **Phone.** 818-813-4446 everywhere. The owner's mobile does not appear on the site or in schema.
