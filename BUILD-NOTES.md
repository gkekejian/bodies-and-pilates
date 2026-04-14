# BUILD NOTES — Bodies and Pilates

**Built:** April 2026  
**Stack:** Next.js 14.2 · App Router · TypeScript (strict) · Tailwind CSS v3 · shadcn/ui · framer-motion  
**Build status:** ✅ `next build` passes (36 static pages, 0 TypeScript errors, 0 lint errors)  
**GitHub:** https://github.com/gkekejian/bodies-and-pilates

---

## What's Done

### Pages (15+)
| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Complete | Hero, welcome, class previews, The Space, The Practice, testimonials, pricing CTA, Instagram section |
| `/about` | ✅ Complete | Studio story, mission, instructor preview cards, CTA |
| `/classes` | ✅ Complete | 4-class grid with links and Book Now buttons |
| `/classes/beginner` | ✅ Complete | Service schema, Mindbody booking CTA |
| `/classes/fullbody` | ✅ Complete | Service schema, Mindbody booking CTA |
| `/classes/flexibility` | ✅ Complete | Service schema, Mindbody booking CTA |
| `/classes/private` | ✅ Complete | Private ($100) + Duet ($140) CTAs, Service schema |
| `/pricing` | ✅ Complete | All plans with live Mindbody Buy Now links |
| `/schedule` | ✅ Complete | Hours table + Healcode widget loader (widget ID TODO) |
| `/instructors` | ✅ Complete | 3 instructor cards (Naira, Theresia, Hannah) |
| `/instructors/naira` | ✅ Complete | Person schema, bio (TODO full bio), CTA |
| `/faq` | ✅ Complete | All 10 FAQs, FAQPage schema, Accordion UI |
| `/contact` | ✅ Complete | Address/hours/map, contact form (RHF + Zod) |
| `/blog` | ✅ Complete | Blog index with 15 draft cards |
| `/blog/[slug]` | ✅ Complete | Dynamic MDX page with BlogPosting schema |

### Infrastructure
- ✅ **Design system** — brand palette (cream/sage/taupe/blush/charcoal) as Tailwind tokens, Playfair Display + Inter via next/font
- ✅ **Header** — sticky, backdrop-blur, mobile Sheet menu, persistent Book Now CTA
- ✅ **Footer** — address, hours, social links, nav grid
- ✅ **Mobile sticky bottom bar** — slides up after hero scroll on mobile only
- ✅ **Schema markup** — HealthClub JSON-LD (root layout), FAQPage (/faq), Service (class pages), Person (/instructors/naira), BreadcrumbList (sitewide), BlogPosting (blog posts)
- ✅ **SEO** — `metadataBase`, title template, per-page metadata, OG tags, `/sitemap.xml`, `/robots.txt`
- ✅ **Redirects** — `/bookings → /schedule`, `/faqs → /faq`, `/post/:slug → /blog/:slug` (308)
- ✅ **Analytics** — GA4 via @next/third-parties, Meta Pixel via next/script afterInteractive, CCPA opt-out banner
- ✅ **Instagram** — Behold widget component (shows placeholder until feedId configured)
- ✅ **Google Reviews API** — `/api/reviews` server route (Places API New), 24h ISR revalidation
- ✅ **Blog MDX** — 15 draft posts with full SEO frontmatter, ready to write
- ✅ **Healcode/Mindbody schedule** — dynamic loader pattern, ErrorBoundary, SSR-safe
- ✅ **Image placeholders** — all 11 required images in `/public/images/` (1×1 px PNGs to prevent 404s)
- ✅ **Contact form** — react-hook-form + Zod validation, success state (UI-only, no backend)

---

## Owner TODO List

### 1. Environment Variables (required before going live)

Create a `.env.local` file in the project root with these values:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX          # from Google Analytics 4
NEXT_PUBLIC_GOOGLE_ADS_ID=AW-XXXXXXXXX  # from Google Ads (optional)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXX # from Meta Business Manager

# Mindbody / Healcode schedule widget
NEXT_PUBLIC_HEALCODE_WIDGET_ID=XXXXX    # from brandedweb.mindbodyonline.com/manager/

# Instagram (Behold.so)
NEXT_PUBLIC_BEHOLD_FEED_ID=XXXXXXXXXXXX # from behold.so dashboard

# Google Places API (for reviews widget)
GOOGLE_PLACES_API_KEY=AIzaXXXXXXXXXXXX  # from Google Cloud Console
GOOGLE_PLACE_ID=ChIJXXXXXXXXXXXXXXXX   # Google Place ID for the studio

# Site URL (already set, change only if domain differs)
NEXT_PUBLIC_SITE_URL=https://www.bodiesandpilates.com
```

### 2. Healcode Schedule Widget ID
1. Log in to https://brandedweb.mindbodyonline.com/manager/
2. Create a new "Schedules" widget
3. Copy the widget ID
4. Set `NEXT_PUBLIC_HEALCODE_WIDGET_ID` in `.env.local`

### 3. Instagram Feed (Behold.so)
1. Sign up at https://behold.so
2. Connect your @bodiesandpilates Instagram account
3. Create a feed and copy the Feed ID
4. Set `NEXT_PUBLIC_BEHOLD_FEED_ID` in `.env.local`

### 4. Google Reviews
1. Enable the **Places API (New)** in Google Cloud Console
2. Create an API key and restrict it to the Places API
3. Find your Place ID: https://developers.google.com/maps/documentation/places/web-service/place-id
4. Set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in `.env.local`
5. The reviews will auto-update every 24 hours via ISR

### 5. Replace Placeholder Images
All images in `/public/images/` are 1×1 pixel placeholders. Replace them with real photos:

| File | Size | What to photograph |
|------|------|-------------------|
| `hero.jpg` | 1920×1080 | Studio or class in action (wide, cinematic) |
| `studio.jpg` | 800×600 | Studio interior |
| `about-studio.jpg` | 1200×800 | Studio / team |
| `instructor-naira.jpg` | 400×500 | Naira portrait |
| `instructor-theresia.jpg` | 400×500 | Theresia portrait |
| `instructor-hannah.jpg` | 400×500 | Hannah portrait |
| `class-beginner.jpg` | 600×480 | Beginner class |
| `class-fullbody.jpg` | 600×480 | Full body class |
| `class-flexibility.jpg` | 600×480 | Flexibility/stretch class |
| `class-private.jpg` | 600×480 | Private session |
| `og-image.jpg` | 1200×630 | Social share image (studio + tagline) |

### 6. Write Blog Post Bodies
All 15 blog posts in `/content/blog/` have frontmatter but no body (`{/* TODO: Write post body */}`). Add content to each MDX file. When you're ready to publish, change `draft: false`.

### 7. Instructor Bios
- `/app/instructors/naira/page.tsx` — add Naira's full biography
- `/app/instructors/page.tsx` — add Theresia and Hannah bios and their own detail pages at `/app/instructors/theresia/` and `/app/instructors/hannah/`

### 8. OG Image
Add a real Open Graph image at `/public/images/og-image.jpg` (1200×630). Also update the OG metadata in `/app/layout.tsx` to point to it:
```ts
openGraph: {
  images: [{ url: '/images/og-image.jpg', width: 1200, height: 630 }],
  ...
}
```

### 9. Google Maps
The contact page has a placeholder "View on Google Maps" link. Consider adding a real Google Maps embed iframe for better UX. Requires a Maps Embed API key.

---

## How to Run Locally

```bash
# Install dependencies (first time only)
npm install

# Create env file
cp .env.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
# → Open http://localhost:3000

# Type-check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
npm run start
```

---

## How to Deploy to Vercel

1. The repo is already on GitHub: https://github.com/gkekejian/bodies-and-pilates
2. Go to https://vercel.com → New Project → Import `gkekejian/bodies-and-pilates`
3. **Framework preset:** Next.js (auto-detected)
4. **Build command:** `npm run build` (default)
5. **Output directory:** `.next` (default)
6. **Environment Variables:** Add all variables from `.env.example` in Vercel's Environment Variables settings
7. **Deploy!**

The site will be live at a `*.vercel.app` URL. Add a custom domain in Vercel's Domains settings.

### Domain Setup
- Point `www.bodiesandpilates.com` to Vercel via CNAME
- Enable "Force HTTPS" in Vercel domain settings
- Update `metadataBase` in `app/layout.tsx` if the domain changes

---

## Decisions & Notes

- **Tailwind v3** was used (not v4) because the current shadcn/ui ecosystem targets Tailwind v3. Migrating to v4 later is straightforward.
- **MDX rendering** uses `next-mdx-remote/rsc` on the blog post page for RSC-compatible streaming.
- **Analytics gating** — the CCPA banner writes a `bp_analytics_consent` cookie. The Analytics component currently loads scripts if env vars are set; a stricter implementation would gate script loading on the cookie value client-side. The current approach is suitable for opt-out (CCPA) but not opt-in (GDPR). If you serve EU customers, use an opt-in model.
- **Healcode widget** — the `healcode.js` script breaks on SPA route changes; the dynamic loader pattern in `lib/mindbody-loader.ts` ensures it only loads once per page lifecycle. The component is wrapped in an ErrorBoundary that reloads on crash.
- **`/blog/[slug]` draft check** — posts marked `draft: true` show a "Coming Soon" message instead of MDX content. Set `draft: false` and add body content to publish.
- **Images** — `next/image` is used throughout with explicit `width`/`height` where known, and `fill` with a sized parent for cards, to prevent CLS.
- **No backend** — the contact form is UI-only (shows success after 600ms timeout). Wire up a real endpoint (Resend, EmailJS, Formspree) to receive submissions.
