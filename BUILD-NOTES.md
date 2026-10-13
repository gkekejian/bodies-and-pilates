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
| Price menu and per-offer MindBody links (single source for cards, table, Home teaser; build fails on drift from the locked menu) | `lib/pricing.ts` |
| FAQ content (also generates FAQPage schema) | `lib/faqs.ts` |
| Class formats (copy for /classes and /classes/[slug]) | `lib/classes.ts` |
| Instructor cards (four at launch) | `lib/team.ts` |
| Testimonials (verbatim, Home shows 3, About shows 6) | `lib/testimonials.ts` |
| ClassPass rating band (Home, About) | `CLASSPASS_RATING` in `lib/site.ts`, `components/sections/classpass-rating.tsx` |
| Logo files and icons | `public/images/bodies-and-pilates-logo-round.png` (sage), `-round-light.png` (cream, footer), `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png` (`scripts/make_icons.py`) |
| Photos and video (alt text, placement keys) | `lib/media.ts`, `lib/media-manifest.json`, `scripts/import_media.py`, `scripts/media-sources.json` |
| ExerciseGym JSON-LD | `lib/schema.ts` (rendered in `app/layout.tsx`) |
| Search Console baseline (old site, pre-launch) and post-launch targets | `docs/search-console-baseline-2026-10-12.md` |
| Neighborhoods served (home "Areas We Serve", schema `areaServed`, llms.txt) | `lib/areas.ts` |
| Per-page title, description, canonical, Open Graph | `lib/metadata.ts` + each page's `metadata` |
| First-timer's guide (on-page, Home and /pricing) | `components/sections/first-timer-guide.tsx` |
| Blog posts (20, MDX) and plan | `content/blog/`, `lib/blog-plan.ts`, `lib/blog.ts` |
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
- [ ] Geo coordinates for schema (`lib/schema.ts`). Not added: no geocoder was reachable from the build sandbox and coordinates are not a locked fact. Copy them from the Google Business Profile pin.
- [ ] Difficulty level, "who it is for", and 50-minute length per class (`lib/classes.ts`).
- [ ] Neighborhood routes and landmarks read right to a local (`app/about/page.tsx` and the 8 lines in `lib/areas.ts`).
- [x] Grip socks (owner-confirmed 2026-10-12): required for class; bring your own or buy a pair at the front desk. One line, `GRIP_SOCKS_LINE` in `lib/site.ts`, used in the "What should I wear?" FAQ and the /schedule first-timer strip.
- [ ] Abs and Assets: 1 to 2 sentence description, level, and who it is for (placeholder on `/classes`).
- [ ] Studio story copy in your own words (`app/about/page.tsx`).
- [ ] Optional: maximum class size, the strongest proof point (`app/page.tsx`).

### Team (`lib/team.ts`)
Owner-confirmed October 12, 2026: four instructors at launch, each with an owner-identified photo. Naira Sarkian (Founder and Owner), Sita Acevedo, Theresia Bunch, Hannah Pink. Cards show photo, name, role (Naira only), classes taught (Naira, Theresia, Hannah: Full Body; Sita: Full Body and Flexibility), and a "Book with [First Name]" link to /schedule.
- [ ] Five bullets per instructor: specialty, years teaching, certifications, teaching style, what to expect. Requested from the instructors. Each bullet renders only once it has real text in `lib/team.ts` (`bio`); nothing is shown or invented until then.
- [ ] Naira's founder story, in her own words. The founder block on /about shows her two photos, name, and title until it arrives.
- Draft details from the old site, for the instructors to confirm or replace when they send their bullets (not shown on the site):
  - Sita: certified movement instructor in Pilates and GYROTONIC; aerialist and aerial choreographer; specialties core stability, creative sequencing, prop work.
  - Theresia: BS in Kinesiology (pre-physical therapy); 15 years as a classical ballerina; challenging, creative flows grounded in movement science.
  - Hannah: certified through Integrated Movement and Wellness; professional dancer; breathwork, anatomical awareness, post-injury support alongside physical therapists.
- [ ] Not on the site until the owner identifies their photos: Marlyn Ortiz, Altara Michelle, McKinsey Shea, Ashley Aldred, Deanna Garzillo, Enrika Navikaite. Their earlier research notes (Marlyn's movement-coach background and celebrity-client credit, Altara's gymnastics and cheer background) are in git history and need each instructor's approval before use. No record was found for Bella Massey.
- A former instructor appears in the photo set. She gets no profile, name mention, or solo feature anywhere on the site.
- [ ] In MindBody, assign an instructor to every class: 26 of 38 sessions in the week of Oct 12 showed none. Clients choose by instructor.
- [ ] Abs and Assets: a 1 to 2 sentence description, level, and who it is for (its block on /classes shows the class and its photos without one).
- If the section cannot be complete before launch, set `SHOW_TEAM = false`.

### Testimonials and ClassPass rating
- [x] Six owner-supplied reviews (2026-10-13), verbatim, attribution exactly as given: Sasha, Penny, Lori, Jason, Taylor "via ClassPass", plus one "Client review". Home shows Sasha, Penny, Lori. About shows all six, the client review first, right after the founder block.
- [x] ClassPass band on Home (under the studio strip) and About: "Rated 4.9 on ClassPass", "7,500+ ratings · 422 reviews", link to the ClassPass page. Verified October 12, 2026. Update `CLASSPASS_RATING` in `lib/site.ts` when the numbers move.
- No aggregateRating or Review schema is built from ClassPass data or these quotes. Visible text only (and a plain text line in llms.txt).

### Photography and video (`lib/media.ts`)
The owner selected 47 files (46 selects plus Naira's third photo) on October 12, 2026. Real studio photography only: no stock, no AI imagery, no placeholders. A slot whose file is not imported renders nothing.

- [x] **Files imported (2026-10-13)** from the owner's four zips: all 47 found, 38 published, 9 held, none missing. Photos 8.8 MB, clips 11 MB in total (about 0.8 MB each), posters and share image under 1 MB. To re-import or add files later, put them in `pilates-media-library/` (git-ignored, any subfolders, final or Drive names) and run `python3 scripts/import_media.py`. It:
  - photos: EXIF orientation applied, all metadata stripped (no GPS), longest side 2048 px, progressive JPEG to `public/media/photos/`
  - video: H.264, no audio, longest side 1280 px, about 1 Mbps, first 15 seconds, fast start, to `public/media/video/`, plus a cover frame from about a third of the way in, in `public/media/posters/`
  - share image: 1200x630 crop of `group-class-plank-wide.jpg` to `public/media/og/share.jpg`, now the default Open Graph and Twitter image
  - writes `lib/media-manifest.json` and prints any missing file
- Placement (owner mapping; class names translated to the studio's real classes):

| Page | Slot | File |
|---|---|---|
| Home | Hero (eager, high priority) | group-class-plank-wide.jpg |
| Home | Studio strip under the hero | studio-wide-bright-reformer-rows.jpg, reception-good-day-wall.jpg, logo-medallion-close-up.mp4 (poster studio-wide-logo-wall.jpg) |
| Home | First-timer: "Two easy ways to start" | clients-arriving-studio-entrance.mp4 |
| Home | First-timer: free guide band | flat-lay-grip-socks-and-essentials.jpg |
| Home | "Why reformer Pilates works here" | group-class-kneeling-leg-press.jpg (unplaced group shot, clients only) |
| Home | "Small-Group Pilates Classes" | group-class-standing-work-video.mp4 (unplaced group clip, clients only) |
| Classes | Page hero clip | group-class-moody-backlit.mp4 (poster group-class-plank-row.jpg) |
| Classes | Beginner ("Reformer Foundations") | first-person-legs-in-straps.mp4, reformer-springs-close-up.mp4 |
| Classes | Full Body ("Signature Flow") | group-class-plank-row.jpg |
| Classes | Flexibility ("Stretch and Restore") | mermaid-stretch-on-reformer.jpg, partner-side-stretch-window-light.mp4 |
| Classes | Abs and Assets | supine-bridge-with-band.jpg, reformer-box-abs-close-up.mp4 |
| Classes | "What is reformer Pilates?" ("Athletic Reformer" has no matching class) | standing-split-reformer-logo-wall.jpg, group-class-lunge-in-sync.mp4 |
| Classes, Pricing | Private and duet | private-coaching-with-ring-landscape.mp4 (poster studio-wide-logo-wall.jpg), private-hands-on-assist-kneeling.mp4, private-assisting-client-on-chair.mp4, private-hands-on-shoulder-assist.mp4, duet-two-clients-on-chair.jpg |
| Intro offer | Hero (desktop) | group-class-kneeling-leg-press.jpg |
| About | Founder block | instructor-portrait-with-ball-taupe-set.jpg (main), instructor-portrait-standing-on-chair.jpg (secondary) |
| About | Team cards | Naira: naira-sarkian-standing-chair-back.jpg (so her main photo is not repeated); Sita: instructor-headshot-black-tee.jpg; Theresia: instructor-headshot-black-cami.jpg; Hannah: instructor-headshot-one-shoulder-top.jpg |
| About | Studio gallery | studio-wide-empty-room.jpg, studio-wide-logo-wall.jpg, studio-tour-logo-wall-video.mp4, studio-wide-reformers-and-boxes.jpg, studio-logo-wall-chair-interior.jpg, entry-bench-patent-drawings.jpg |
| About | Community (Instagram) | branded-matcha-cup-logo.jpg, social-sunglasses-pose-on-reformer.jpg |
| Blog | Index header | artistic-black-and-white-reformer-pose.jpg |

- Not published by the import script (`HOLD` in `scripts/import_media.py`): the six hold-list portraits, plus three unplaced shots that show unidentified instructors rather than clients (instructors-group-photo-three.jpg, instructor-leading-class-wide.mp4, side-lying-leg-work-photo.jpg). Remove a name from `HOLD` once the owner confirms who is in it.
- Video behavior: the poster is a responsive next/image; the clip itself loads only within 300px of the viewport, plays only while 40% visible, pauses when scrolled away, never autoplays with reduced motion, and has a pause/play button. Second clips in a group and the supporting private clips play on tap. At most one clip plays when any page loads.
- Contact page parking photos and per-post blog hero photos have no files in the selects, so those spots show text only.
- Lighthouse 12 mobile, 2026-10-13 final pass (several runs each; this sandbox varies by about ±5): Home 89 to 97 (median 92), Classes 93 to 97 (median 94), About 93 to 95, Pricing 97, Intro offer 96, Contact 98, Schedule 98, FAQ 96, Blog 97, blog posts 96; accessibility and SEO 100 everywhere; CLS 0 everywhere. With the guide form gone, the home hero photo sits above the fold on phones and loads eagerly; it is now the home page's LCP element.

### Forms (launch fallback applied 2026-10-13)
No webhook URL was supplied, and a form that submits nowhere must not ship, so:
- The first-timer's guide email form (Home hero, Home band, /pricing) is gone. Its key points (which class, what to wear, where to park, when to arrive) now sit on the page with the $25 first-class button (`components/sections/first-timer-guide.tsx`). Every line is an owner-confirmed fact already on the site.
- The /contact message form is gone. The page has Call, Text, and Email buttons (818-813-4446, Naira@bodiesandpilates.com).
- `/api/lead`, `/api/contact`, the form components, and the zod / react-hook-form packages were removed. Privacy and Terms now say the site has no forms.
- [ ] Form webhooks: when a destination exists (Zapier/Make into MindBody or an email platform), restore the forms from git history (commit before this pass) and set `LEAD_CAPTURE_WEBHOOK_URL` / `CONTACT_FORM_WEBHOOK_URL`.

### Blog (`content/blog/`)
- [x] All 20 posts integrated (2026-10-13) from the owner's combined file: slugs, titles, and meta descriptions as written; H2 structure and the closing $25 CTA block word for word (the build fails if a post's CTA text drifts). Each post has 2 to 4 internal links on existing phrases, related posts, and Naira Sarkian as author. All 20 are published and in the sitemap; Blog is in the main nav.
- Dates: no start date was supplied, so all 20 carry the launch date (2026-10-12, Pacific) and list in the index's publishing order. To drip them instead, give each a future `publishDate` 2 per week in that order; a future-dated post 404s and stays out of the sitemap until its date.
- Slugs: four drafts used a different slug from the index (`what-is-reformer-pilates-beginners-guide`, `what-to-look-for-in-a-pilates-studio`, `what-happens-in-your-first-pilates-class`, `how-long-until-you-see-results-from-pilates`). The index slugs are live; the draft slugs 301 to them.
- The two gap posts (parking and transit guide, ClassPass vs membership cost) are not in the file and were not created; their outline scaffolds were deleted.
- Edits made to the drafts so they state nothing outside the locked facts (everything else is verbatim):
  - Cost guide: added the $220 12-class membership to the membership list (the draft listed only $130, $170, $280).
  - What to wear: removed the jumpboard/cardio mention, "studio cubbies", "we have water available", "in multiple sizes", and "Water is available".
  - First class minute by minute: the tour line no longer lists cubbies, water, and restroom; removed "Wipe down your reformer (we will show you how)".
  - Beginners in North Hollywood: "a gentle Full Body class" became "a Full Body class" (Full Body is moderate to challenging).
  - 7 things to look for: removed the "eight to twelve people" class-size number.
  - How often: "from watching hundreds of clients" became "from watching our clients".
  - Results timeline: removed "We teach clients in their twenties through their seventies."
- [ ] Kept as written, owner to confirm: the cost guide's "$35 to $50" North Hollywood market range; the pregnancy post (it is guidance with doctor clearance, not a prenatal class or offer, and it mentions "prenatal clients" only as a question to ask any studio); illustrative class-size arithmetic in the small-classes post ("a class of six", "six reformers") that does not describe this studio; anecdotal lines such as "a large share of clients mention their back".

How the blog works (see the header comment in `lib/blog.ts` for the frontmatter fields):
- A post is **published** once `draft: false` and its `publishDate` has arrived (midnight Pacific). Published posts are indexed, listed on `/blog` newest first, and included in `sitemap.xml` with lastmod.
- A post with a future `publishDate` returns 404 and stays out of the index and sitemap until its date. Blog pages and the sitemap regenerate hourly, so posts go live on schedule without a redeploy.
- A `draft: true` post is not rendered anywhere (404, not listed, not in the sitemap). No "Coming soon" pages exist.
- Every published post has: one H1, a byline crediting Naira Sarkian, BlogPosting schema with Person author, `og:type=article`, the owner's $25 CTA block (in the MDX, `<PostCta>`), and up to 3 related posts by topic group.
- The 8 question-format posts marked in the plan (`QUESTION_POSTS` in `lib/blog-plan.ts`) carry a `faqs` list in frontmatter whose answers are quoted from the post itself, rendered as a visible FAQ block (`<PostFaq />`) before the CTA with FAQPage JSON-LD.
- `/blog` paginates at 12 per page (`/blog/page/2`, ...).

### Compliance, security, and AI search
- [ ] Have a lawyer review `/privacy` and `/terms` (drafted only from what the site actually does). Name the form and email providers in the privacy policy once the webhooks are connected.
- [ ] Content Security Policy: the full policy runs in report-only mode (`next.config.mjs`). Open the preview with DevTools, book through the MindBody widget and log in, then check the console for CSP reports. Add any blocked MindBody hosts and switch the header to enforcing.
- [ ] AI crawlers: `app/robots.ts` allows AI search and training crawlers by name. To stay in AI answers but opt out of training, set GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, and CCBot to disallow.
- No form endpoints at launch (see Forms). If they come back, restore `lib/request-guard.ts` with them: same-origin JSON only, 16 KB cap, honeypot, per-IP rate limit.
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
- [ ] After launch: follow `docs/search-console-baseline-2026-10-12.md` (submit the sitemap, request indexing, update the Google Business Profile website link, compare 28 days against the baseline)

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
- **Logo (2026-10-13).** The owner's official round logo files are used exactly as supplied: sage artwork (`bodies-and-pilates-logo-round.png`) in the header and mobile menu, cream artwork (`-round-light.png`) on the charcoal footer. Rendered at a fixed height with width auto, so the circle is never stretched or cropped, and with no "Bodies and Pilates" wordmark beside it. The favicon (16 to 64 px), `icon.png` (512), and `apple-icon.png` (180) are the same file scaled uniformly onto a cream tile by `scripts/make_icons.py`; rerun it if the logo file changes. The old SVG recreation and the generated "B&P" apple icon are deleted. The supplied files are transparent PNGs; neither has a solid background square.
- **Pricing guard.** `lib/pricing.ts` checks itself at build time against the owner's locked menu ($25, $105, $36, $160, $300, $130/$170/$220/$280 per month, duet $70 per person, private $100 per 55 minutes). A changed price, an extra offer (private packs are not sold), "/month" on a non-membership, or a second Most Popular badge fails the build.
- **Final locked-facts pass (2026-10-13).** Removed every prenatal mention from the private-session copy (pricing card, class page, FAQ, schema offer text, llms-full); removed all drive times from /about and the "nearby" FAQ (routes and parking stay); removed the Unlimited "about $10 per class" line, which assumed a class count nobody supplied. Grip socks and both policies now also appear in llms.txt key facts.
- **Phone.** 818-813-4446 everywhere. The owner's mobile does not appear on the site or in schema.
