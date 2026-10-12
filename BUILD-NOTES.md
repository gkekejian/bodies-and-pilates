# Build Notes: Bodies and Pilates

**Stack:** Next.js 15.5 App Router, React 19, TypeScript (strict), Tailwind CSS v3, Base UI primitives
**Build:** `npm run build` passes (41 static pages, 0 type errors, 0 lint errors)
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
| Neighborhoods served (home "Areas We Serve", schema `areaServed`, llms.txt) | `lib/areas.ts` |
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
- [ ] Neighborhood routes and landmarks read right to a local (`app/about/page.tsx` and the 8 lines in `lib/areas.ts`).
- [ ] Abs and Assets: 1 to 2 sentence description, level, and who it is for (placeholder on `/classes`).
- [ ] Studio story copy in your own words (`app/about/page.tsx`).
- [ ] Optional: maximum class size, the strongest proof point (`app/page.tsx`).

### Team (`lib/team.ts`)
Active instructors and the classes they teach come from the MindBody schedule (week of Oct 12 to 18, 2026). Shown on /about: Naira Sarkian (Founder and Owner), Marlyn Ortiz, Sita Acevedo, Hannah Pink, Theresia Bunch, McKinsey Shea, Altara Michelle.
- [ ] For each instructor: 2 to 3 sentence bio (background, how they found Pilates), certifications and specialties, one-line teaching philosophy, headshot. McKinsey and Altara have nothing yet; the others have carried-over details to confirm.
- [ ] Confirm the regular schedule for McKinsey, Theresia, and Altara (one slot each that week).
- [ ] Registered in MindBody but no classes that week, so hidden: Enrika Navikaite, Ashley Aldred, Bella Massey, Deanna Garzillo. Confirm whether each is current, a sub, or inactive.
- [ ] In MindBody, assign an instructor to every class: 26 of 38 sessions that week showed none (Mon/Wed/Sat/Sun Beginner, most Full Body slots, Fri Flexibility 5:00 PM, Sun Abs and Assets 12:00 PM). Clients choose by instructor.
- [ ] "Abs and Assets" runs on the schedule but is not on the site. Send a short description, level, and who it is for.
- [ ] Public-source research (Oct 12, 2026) added only confirmed facts: Marlyn (movement coach, 20+ years, BFA in Dance, mat Pilates background) and Altara (former competitive gymnast, NCA All-American cheerleader, 7+ years of Pilates). It also widened "Teaches" from the Aug to Sep ClassPass schedules (Naira: Flexibility; Sita: Beginner; Theresia: Flexibility). Ask each instructor to approve their card.
- [ ] Held until the instructor says yes:
  - Marlyn: 9+ years as Madonna's personal trainer (from her public bio). Strong, but it names a celebrity in studio marketing, so get her approval and exact wording.
  - Altara: her reformer certification was "in progress" in a past interview. List it only once she confirms it is complete.
  - Sita (Diavolo Dance Theater credit), McKinsey (dance film credit, @mckinseyshea), Hannah (VoyageLA dancer profile, @hannah.pinky): likely the same people, not confirmed.
  - Outside studios (Marlyn: Yloh Studio City; Altara: Natural Pilates; Ashley: Pilates Platinum) and Instagram handles. Not used on the site.
- [ ] Ashley Aldred and Deanna Garzillo appear on the Aug to Sep ClassPass schedules but not Oct 12 to 18. Enrika has one ClassPass review calling her class "tough but great"; usable only as a client quote with the reviewer's permission. No record found for Bella Massey; confirm the spelling and status.
- If the section cannot be complete before launch, set `SHOW_TEAM = false`.

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
- [ ] The 20 full drafts (`blog-drafts-batch-1.md` to `-4.md`) have not reached the build yet. When they arrive they replace the outline scaffolds, one MDX file per post, using the slugs in `lib/blog-plan.ts`.
- [ ] Posts #21 (parking guide) and #22 (ClassPass vs membership) from the keyword research are scaffolded and queued as week 11. #21 needs the nearest Metro stop and walk confirmed; #22 needs ClassPass credit prices checked on the day it is written.
- [ ] Publishing start date. Posts go out 2 per week in the order in `lib/blog-plan.ts` (question-format posts first). Each post's `publishDate` is set in its frontmatter.

How the blog works (see the header comment in `lib/blog.ts` for the frontmatter fields):
- A post is **published** once `draft: false` and its `publishDate` has arrived (midnight Pacific). Published posts are indexed, listed on `/blog` newest first, and included in `sitemap.xml` with lastmod.
- A post with a future `publishDate` returns 404 and stays out of the index and sitemap until its date. Blog pages and the sitemap regenerate hourly, so posts go live on schedule without a redeploy.
- Outline scaffolds (`draft: true`) show as "Coming soon" and are noindexed. The keyword research asked to remove this, but these pages hold only a title and an outline: indexing them would put thin pages in Google under the studio's name. Each post becomes indexable automatically the moment it has real copy, `draft: false`, and a publish date.
- Every published post has: one H1, a byline crediting Naira Sarkian, BlogPosting schema with Person author, `og:type=article`, a hero image slot (labeled placeholder until photos land), the intro-offer CTA, and up to 3 related posts by topic group.
- The 8 question-format posts (`QUESTION_POSTS` in `lib/blog-plan.ts`) carry a `faqs` list in frontmatter, rendered before the CTA with FAQPage JSON-LD.
- `/blog` paginates at 12 per page (`/blog/page/2`, ...).

### Compliance, security, and AI search
- [ ] Have a lawyer review `/privacy` and `/terms` (drafted only from what the site actually does). Name the form and email providers in the privacy policy once the webhooks are connected.
- [ ] Content Security Policy: the full policy runs in report-only mode (`next.config.mjs`). Open the preview with DevTools, book through the MindBody widget and log in, then check the console for CSP reports. Add any blocked MindBody hosts and switch the header to enforcing.
- [ ] AI crawlers: `app/robots.ts` allows AI search and training crawlers by name. To stay in AI answers but opt out of training, set GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, and CCBot to disallow.
- Forms (`/api/lead`, `/api/contact`) accept same-origin JSON only, cap the body at 16 KB, drop honeypot submissions, and rate-limit per IP (`lib/request-guard.ts`). The rate limit is per serverless instance; for a hard cap add a Vercel Firewall rate-limit rule on `/api/*`.
- [ ] Dependencies: `npm audit --omit=dev` leaves 4 moderate advisories, all in gray-matter's YAML parser (js-yaml 3, argparse, sprintf-js). It only parses the blog's own frontmatter from this repo, never visitor input. Next.js is on the patched 15.5 line; PostCSS is pinned to a patched version through `overrides` in `package.json`.
- Analytics are opt-in: GA4 and the Meta Pixel load only after Accept, Global Privacy Control counts as a decline, and "Cookie settings" in the footer reopens the choice.
- `/llms.txt` and `/llms-full.txt` are generated from the same data as the pages (`lib/llms.ts`), so they stay in sync.

### Local SEO: owner actions (from the 2026-10-12 keyword research)

Reviews (the biggest lever: the studio is #4 in the NoHo local pack at 4.7 from 27 reviews; the leaders have 166 to 200):
- [ ] Goal: 100+ Google reviews. Ask in person after class when a client is happy.
- [ ] Put a QR code at the front desk linking to https://share.google/iiwq2gBssUKulvsol (any free QR generator works; print it at least 2 inches wide).
- [ ] Reply to every review within a few days. Thank positive reviewers by name; answer critical ones calmly and factually.
- Never buy reviews and never review-gate (asking happy clients is fine; filtering who gets the link is not).
- Update `GOOGLE_REVIEWS` in `lib/site.ts` as the count grows; the footer, the home testimonials section, and llms.txt read it.

Citations (keep NAP identical everywhere: Bodies and Pilates, 5251 Vineland Ave, Suite 6, North Hollywood, CA 91601, 818-813-4446):
- [ ] Tier 1: Google Business Profile, Yelp, Facebook, Apple Business Connect.
- [ ] Tier 2 (fitness): Vagaro, WellnessLiving, FitReserve. ClassPass and Mindbody are done; keep the ClassPass profile current.
- [ ] Tier 3: Bing Places, Foursquare, Yellow Pages, BBB, MapQuest, Nextdoor, Thumbtack.
- [ ] Tier 4 (LA): Discover LA, Time Out LA, LA Weekly, the local chamber of commerce.

Google Business Profile:
- [ ] Primary category Pilates Studio; secondary Gym and Fitness Center.
- [ ] Services: Group reformer classes, Private sessions, Duet sessions, Beginner classes.
- [ ] Photos of the real studio, reformers, instructors, and classes in session. Weekly at first.
- [ ] Weekly Google Posts: class highlights, the intro offer, instructor intros.
- [ ] Seed Q&A with real questions (parking, grip socks, first-timer info) and answer them.
- [ ] Turn on Reserve with Google in the Mindbody account so the profile shows a "Schedule" button.
- [ ] Keep the real business name. Do not append keywords to the GBP name; it risks a suspension.

### Domain
- [ ] Add both `www.bodiesandpilates.com` (primary) and `bodiesandpilates.com` to the Vercel project. The bare domain 301s to www via `next.config.mjs`.

---

## Launch checklist

- [x] MindBody widget live with the real timetable (class names, times, instructors). Verified on the preview 2026-10-12, along with the footer Login | Register modal.
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

### Last measured (2026-10-12, local production build, Lighthouse 12 mobile, placeholders in place)

| Page | Performance | Accessibility | Best practices | SEO | CLS |
|------|-------------|---------------|----------------|-----|-----|
| Home | 96 | 100 | 100 | 100 | 0 |
| Pricing | 96 | 100 | 100 | 100 | 0 |
| Classes | 97 | 100 | 100 | 100 | 0 |
| Contact | 96 | 100 | 100 | 100 | 0 |

axe-core (WCAG 2.1 AA plus best practices) reports 0 violations on all 18 routes at 375px and 1280px.

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

- **On-page SEO (2026-10-12 keyword research).** Titles, H1s, and meta descriptions follow the research doc, with three deliberate changes: `/classes` uses "Reformer Pilates Classes | Bodies and Pilates NoHo" (the doc's version is 61 characters, over its own 60 limit); the `/schedule` description says "mornings on weekends" instead of "sessions daily" because weekend hours are 9am to 12pm; the `/faq` description drops "class size" because the FAQ does not answer it yet. Areas We Serve lines give direction and main roads only, no drive times.
- **Doorway pages removed.** The four `/locations/*` pages are consolidated into one "Neighborhoods we serve" section on `/about`, per the brief. `/instructors` merged into the About team section.
- **Pricing is published in full.** Owner decision: every tier from the old live pricing page, including the $130 and $220 memberships. Transparent pricing with per-option booking links is a deliberate differentiator against competitors that publish none (e.g. KV Lagree).
- **Reformer only.** Copy that mentioned mat classes is gone; every group class is described as small-group reformer Pilates. The Full Body page title changed from "Mat Pilates Classes" for the same reason.
- **Booking map.** See the table under Owner TODO list. MindBody links open in the same tab; ClassPass, Google, Instagram, and the Mindbody app link open in a new tab. Facebook is not linked.
- **FAQ uses native `<details>`.** No JavaScript, and every answer is in the HTML so it matches the FAQPage schema.
- **Next.js 14.2 to 15.5 (2026-10-12 audit).** 14.2.35 is the last 14.x release and carries unpatched advisories, including remote code execution in the image optimizer. Dynamic route `params` are now awaited. Unused packages removed: the shadcn CLI, Embla carousel, Behold (Instagram), and the MDX loader (blog posts render through next-mdx-remote). The unused Google Places `/api/reviews` route was deleted.
- **framer-motion removed.** Animations were delaying the hero text (LCP). The site now ships no animation library.
- **Hours.** Owner-confirmed hours only. Friday is 7am to 8pm (the old site said 7:30 to 11:30).
- **Phone.** 818-813-4446 everywhere. The owner's mobile does not appear on the site or in schema.
