# Migration, SEO & AI-Search Audit — Bodies and Pilates

**Audited:** July 2026 · branch `master` @ `af9c541`
**Scope:** Wix → Vercel migration readiness, local search (Map Pack), and AI/generative search (GEO/AEO)

---

## 1. Executive Summary

The migration is further along than the strategy documents assume: a complete Next.js 14
site already exists in this repo and deploys to Vercel (`bodies-and-pilates.vercel.app`).
Architecture is not the bottleneck. **The launch blockers are content and configuration**,
and one strategic hole:

> **Glendale — the stated #1 target market — appears zero times in the entire codebase.**
> There is no `/locations/glendale` page, Glendale is not in the `areaServed` schema, and
> no FAQ or copy mentions it. Location pages exist for Toluca Lake, Studio City, Burbank,
> and Hollywood, but the market the business wants to win is the one market not targeted.

Second-order blockers: all 15 blog posts are empty drafts (the GEO content engine is at
0%), every image in `/public/images/` is a 1×1-pixel placeholder (including the OG image
that AI engines and social cards render), all environment variables are unset (schedule
widget, analytics, reviews), and the contact form silently discards submissions.

The stack recommendations in the external strategy report (Next.js 16, Turso, Drizzle,
headless MINDBODY API) should mostly **not** be followed right now — see §3.

---

## 2. What's Already Right

- ✅ Next.js 14 App Router, TypeScript strict, static generation for all marketing pages
  — fast by default on Vercel's edge CDN.
- ✅ Solid metadata layer: `metadataBase`, per-page titles/descriptions, canonicals on
  class/location pages, OG tags.
- ✅ JSON-LD already deployed: `HealthClub`+`LocalBusiness` graph in the root layout,
  `FAQPage` (12 questions with real policies — excellent AEO raw material), `Service` on
  class pages, `BreadcrumbList` sitewide, `Person` for Naira, `BlogPosting` on posts.
- ✅ Dynamic `sitemap.ts` and `robots.ts` (blocks `/api/`, allows everything else — AI
  crawlers like GPTBot/ClaudeBot/PerplexityBot are *not* blocked, which is correct).
- ✅ Wix legacy redirects for `/post/:slug`, `/bookings`, `/faqs`, `/category/all-products`.
- ✅ MDX blog pipeline with SEO frontmatter, draft gating, and RSC rendering.
- ✅ `next/image` with explicit dimensions (CLS-safe), font loading via `next/font`.
- ✅ The internal `research-report.md` correctly notes that **Google disallows self-serving
  `aggregateRating` on LocalBusiness** — the external strategy doc's advice to embed a 4.9
  aggregateRating from ClassPass would risk a manual action / rich-result ineligibility.
  Keep following the internal report on this point, not the external one.

---

## 3. External Strategy Doc vs. Reality — Where to Deviate

| Strategy doc says | Recommendation |
|---|---|
| Next.js 16 + Turso + Drizzle | **Skip for now.** The site has no data to store — blog is MDX in-repo, booking/payments live in MINDBODY, reviews come from Places API. Adding a database adds cost and failure modes with zero user-facing benefit today. Revisit if you build custom lead-nurture or client accounts. |
| Headless MINDBODY Public API booking widget | **Defer to v2.** The Public API requires a paid developer account, per-site activation, and OAuth staff credentials. The Healcode widget gets booking live this week. The real fix needed *now* is that the schedule page renders nothing server-side (see §5.3). Build the headless widget after launch traffic justifies it. |
| `ExerciseGym` schema type | Current `HealthClub` is equally specific and arguably better-matched (schema.org: HealthClub ⊂ HealthAndBeautyBusiness + SportsActivityLocation). No change needed; optionally add `ExerciseGym` to the type array. |
| Embed `aggregateRating` (4.9, ClassPass) | **Do not.** Violates Google's review-snippet guidelines (self-serving reviews on LocalBusiness). Instead render Google reviews visibly on-page via the existing `/api/reviews` route. |
| Partial Prerendering, Fluid Compute, `attachDatabasePool` | Not applicable to a static marketing site with two API routes. Noise — ignore. |
| WAF / rate limiting (Arcjet) | Overkill at this scale. Vercel's built-in DDoS mitigation suffices. Add basic rate limiting only to the future contact-form endpoint. |

Where the strategy doc is right and the site falls short: **Glendale targeting, blog
content velocity, service×location page depth, FAQ-style declarative copy, and offer
schema** — all covered below.

---

## 4. Critical Findings (P0 — fix before cutover)

### 4.1 Zero Glendale presence
`grep -ri glendale` returns nothing. Required:
- `/locations/glendale` page using the existing `LocationPage` component (drive times:
  downtown Glendale ~12 min via SR-134, Americana at Brand, Kenneth Village, Adams Hill).
- Add `{ "@type": "City", "name": "Glendale" }` to `areaServed` in `app/layout.tsx:95`.
- Add a Glendale question to the FAQ (the existing "near Toluca Lake, Studio City, or
  Burbank?" question at `app/faq/page.tsx:68` is the template).
- At least one blog post targeting "pilates near Glendale" intent.
- Longer term: Valley Village and Valley Glen pages (closer than Hollywood, currently missing).

### 4.2 Blog is an empty shell
All 15 posts in `content/blog/` are `draft: true` with `{/* TODO: Write post body */}`.
The blog index shows 15 "Coming Soon" cards; the sitemap correctly excludes drafts, so
the site currently offers AI engines **zero** long-form content to cite. The frontmatter
targeting (reformer vs mat, back pain, pregnancy, cost, seniors, runners) is exactly the
question-shaped content LLMs retrieve — writing these bodies is the single highest-ROI
GEO action available. Publish in batches; prioritize:
1. `pilates-class-cost.mdx` (price queries are the most-asked local intent)
2. `reformer-vs-mat-pilates.mdx`
3. `best-pilates-north-hollywood.mdx`
4. A new `pilates-near-glendale` post
5. `reformer-for-beginners.mdx`

### 4.3 Placeholder images shipped to production
Every file in `/public/images/` is 70 bytes (1×1 px), **including `og-image.jpg`** — the
image rendered in every social share, iMessage preview, and AI answer card. Live pages
currently hotlink Pexels stock via `lib/images.ts` (dependency on a third-party CDN, and
stock photos undercut the "boutique studio" brand and E-E-A-T). The root-layout schema's
`image` property (`app/layout.tsx:64`) points at the 1×1 placeholder. Replace with real
studio photography per the shot list in `BUILD-NOTES.md` §5; the OG image is the minimum
bar for launch.

### 4.4 All environment variables unset
Consequences visible to the public today:
- `/schedule` renders a "**Note: Widget ID pending — configure at brandedweb…**" admin
  message to visitors (`app/schedule/page.tsx:87-100`) and no bookable schedule.
- `/api/reviews` returns 503 (no Places key) → no review content anywhere on-site.
- No GA4/Pixel → flying blind on the migration's before/after traffic.
Set every var in `.env.example` in Vercel project settings before DNS cutover. Also:
gate the "widget pending" note behind `NODE_ENV !== 'production'` so a missing var can
never print admin instructions to customers.

### 4.5 Contact form silently loses leads
`components/contact-form.tsx` shows success after a 600 ms timeout with no backend. A
prospective client who "contacts" the studio vanishes. Wire Resend/Formspree or, at
minimum, replace the form with `mailto:` + phone links until a backend exists.

### 4.6 Price contradiction: $35 vs $36 single class
The Mindbody source of truth (per `research-report.md`) is **$36**. The site says both:
- $36: `app/classes/beginner/page.tsx:36`, `flexibility/page.tsx:36`, `fullbody/page.tsx:36` (Service schema)
- $35: `app/faq/page.tsx:61` ("single classes start at $35"), `app/pricing/page.tsx:10`
  (meta description), `app/classes/reformer/page.tsx:36` (Service schema)

Factual inconsistency is uniquely damaging for GEO — LLMs cross-check structured data
against page copy and drop low-confidence facts. Pick the true price and align every
surface (schema, FAQ, meta descriptions, pricing page).

---

## 5. High-Impact SEO / GEO Work (P1 — first two weeks after launch)

### 5.1 Google Business Profile is the real Map Pack lever
Nothing in this repo outranks a competitor in the local pack by itself. Coordinate the
cutover with GBP hygiene: primary category "Pilates studio," website URL updated the day
DNS flips, NAP byte-identical to the site footer and schema (`5251 Vineland Ave Suite 6,
North Hollywood, CA 91601`, `(818) 653-3883`), photos uploaded, weekly posts, and a
review-request flow (post-class SMS/email link). Add the GBP short link and Yelp profile
to the `sameAs` array in `app/layout.tsx:90-94`.

### 5.2 Complete the Wix redirect map before DNS cutover
Only 4 legacy patterns are covered in `next.config.mjs`. Before cutover:
1. Pull the live Wix sitemap (`bodiesandpilates.com/sitemap.xml`) and GSC's indexed-pages
   list.
2. Map **every** indexed URL to its new home (Wix commonly generates `/general-clean`,
   `/book-online`, `/service-page/...`, `/copy-of-...` slugs).
3. 301 anything unmapped to the nearest hub page, not the homepage.
This is the difference between keeping and torching the existing ranking equity.

### 5.3 Make the schedule crawlable
`MindbodySchedule` is loaded with `ssr: false` — crawlers and AI agents see an empty div.
The class *schedule* is the highest-intent content on the site. Cheap fix now: add a
server-rendered weekly schedule table (class name, day, time, instructor — even if
maintained by hand in a constants file) above the widget, marked up with `Schedule`
structured data. The headless MINDBODY API version (strategy doc Prompt 1/2) replaces
this in v2.

### 5.4 Schema upgrades
- Add `makesOffer` to the LocalBusiness node: $25 intro, $36 single, 5/10 packs,
  $130–$280 memberships, $100 private, $140 duet (all data already in `research-report.md`).
- Add `hasMap` (Google Maps URL) and tighten `geo` to 5-decimal coordinates.
- Instructor pages for Theresia and Hannah with `Person` schema (currently only Naira,
  and her bio is a TODO) — instructor E-E-A-T is a GEO differentiator vs. Curv'd/Dynasix.
- Location pages carry only breadcrumb schema — add a `Service` node with
  `areaServed` matching the page's city.

### 5.5 AI-crawler affordances
- Add `/llms.txt` (business facts, address, hours, pricing, page directory) — cheap and
  increasingly consumed by answer engines.
- Add a one-paragraph "key facts" block (address · hours · $25 intro · phone) near the
  top of the homepage in plain HTML — the declarative summary LLMs quote.
- `sitemap.ts` sets `lastModified: new Date()` for every URL on every build, which
  destroys freshness signals. Use real content dates (git or frontmatter).

### 5.6 Fix the `/locations` breadcrumb dead-end
`app/locations/burbank/page.tsx:20` points the "Locations" crumb at the Burbank page
itself (same on siblings). Either create a `/locations` index page (also good for
internal linking) or drop the intermediate crumb.

---

## 6. Technical Debt & Security (P2)

| Issue | Location | Fix |
|---|---|---|
| Dependency major-version mismatch: `next` 14.2.35 with `@next/mdx` ^16 and `@next/third-parties` ^16 | `package.json` | Pin both to `^14.2` (or upgrade Next). Version skew here causes subtle build/runtime breakage. |
| `shadcn` CLI shipped as a runtime dependency | `package.json:31` | Move to devDependencies or remove. |
| Package named `myapp` | `package.json:2` | Rename `bodies-and-pilates`. |
| No security headers | `next.config.mjs` | Add `headers()`: HSTS, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`. |
| Overly broad image remote patterns (`**.googleapis.com`, `**.google.com`) | `next.config.mjs:8-9` | Narrow to the specific hosts used. |
| `tmp-scaffold/` committed to the repo | repo root | Delete. |
| `/api/reviews` proxies the raw Places payload | `app/api/reviews/route.ts:27` | Return only `rating`, `userRatingCount`, and trimmed review fields; keeps payload small and avoids leaking future fieldmask additions. |
| Analytics loads regardless of consent cookie | `components/analytics/*` | Acceptable for CCPA opt-out (CA-only audience); gate on the cookie if you ever serve EU users. Already noted in BUILD-NOTES. |

---

## 7. Cutover Runbook (Wix → Vercel, same domain)

1. **T-7 days:** Finish P0 items. Set all Vercel env vars. Export Wix sitemap + GSC index
   list; complete redirect map (§5.2). Lower DNS TTL to 300s.
2. **T-1 day:** Verify `www.bodiesandpilates.com` + apex are added in Vercel domains.
   Run `next build` clean. Crawl the Vercel preview with Screaming Frog (or `wget -r`) —
   zero 404s, one `<h1>` per page, canonicals resolve.
3. **Cutover:** Point CNAME (www) / A-ALIAS (apex) to Vercel. Force HTTPS. Confirm
   redirect map with `curl -I` spot checks against the old Wix URLs.
4. **T+0:** GSC — submit `sitemap.xml`, Request Indexing on the top 10 pages. Update GBP
   website URL. Watch Vercel analytics + GSC coverage.
5. **T+1–30 days:** Keep the Wix subscription (don't let old URLs die at the registrar
   level) until GSC shows the new pages indexed and impressions recovered. Then cancel.
6. **No Change-of-Address needed** — same domain, so GSC CoA does not apply.

---

## 8. Prioritized Roadmap

| # | Item | Impact | Effort |
|---|---|---|---|
| 1 | Glendale location page + areaServed + FAQ entry | Local/GEO — the stated goal | 2 h |
| 2 | Fix $35/$36 inconsistency everywhere | GEO trust | 30 min |
| 3 | Real OG image + hero/studio photos | CTR, brand, AI answer cards | shoot + 1 h |
| 4 | Set all env vars; hide "widget pending" note in prod | Bookings live | 1 h |
| 5 | Contact form backend (Resend) | Stop losing leads | 2 h |
| 6 | Full Wix redirect map | Preserve rankings at cutover | 3 h |
| 7 | Write + publish first 5 blog posts | GEO content engine | ongoing |
| 8 | Server-rendered schedule table + Schedule schema | High-intent crawlability | 3 h |
| 9 | makesOffer + hasMap + instructor Person pages | Entity completeness | 3 h |
| 10 | llms.txt + homepage key-facts block | AI-crawler affordance | 1 h |
| 11 | GBP hygiene + review velocity program | Map Pack — biggest local lever | ongoing |
| 12 | Security headers, dep-version fixes, repo cleanup | Hardening | 2 h |
| 13 | (v2) Headless MINDBODY API booking widget, WCAG-audited | Conversion + AEO | 2–3 wk |
