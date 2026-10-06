# Bodies and Pilates

Marketing website for **Bodies and Pilates**, a boutique reformer Pilates studio at 5251 Vineland Ave, Suite 6, North Hollywood, CA 91601.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + shadcn/ui primitives |
| Forms | react-hook-form + zod, posted to `/api/*` routes |
| Blog | MDX via next-mdx-remote |
| Analytics | GA4 (@next/third-parties), Meta Pixel |
| Booking | MindBody branded web (HealCode) widget and deep links |
| Hosting | Vercel |

## Local development

```bash
npm install
cp .env.example .env.local   # fill in what you have
npm run dev                  # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint
npx tsc --noEmit # type-check
```

Every push to `master` auto-deploys on Vercel. Set env vars from `.env.example` in the [Vercel dashboard](https://vercel.com/gkekejians-projects/bodies-and-pilates).

## Project structure

```
app/
  page.tsx              Home
  intro-offer/          Paid-traffic landing page ($25 first class, $105 week)
  classes/              Classes index + [slug] detail pages
  pricing/              Try / Commit / Flex / Private
  schedule/             HealCode widget, or hours + call/text fallback
  about/                Story, Meet the Team, Neighborhoods we serve
  faq/                  FAQ + FAQPage schema
  contact/              Contact details, form, map
  blog/                 Blog index + [slug] MDX posts
  api/lead, api/contact Form endpoints (forward to owner webhooks)
  opengraph-image.tsx   Generated share image
  not-found.tsx         Branded 404
lib/                    Site facts, pricing, FAQs, classes, team, photos, schema, metadata
components/
  layout/               Header, Footer, MobileBookingBar
  sections/             Page sections (offers, ClassPass strip, testimonials, lead capture, ...)
  ui/                   CTA links, photo/video slots, labeled placeholders, shadcn primitives
content/blog/           10 scaffolded posts (outline only, drafts)
middleware.ts           Lowercase + trailing-slash 301s
```

## SEO

- `ExerciseGym` JSON-LD in the root layout, `FAQPage` on `/faq`, `Service` on class pages, `BreadcrumbList` on every page, `BlogPosting` on published posts
- Unique title, description, canonical, and Open Graph tags per page (`lib/metadata.ts`)
- `/sitemap.xml` and `/robots.txt` generated
- 301 redirects for legacy and consolidated URLs (see BUILD-NOTES)

## Owner setup and launch checklist

See **[BUILD-NOTES.md](./BUILD-NOTES.md)** for the owner TODO list, photo slots, and the launch checklist.

## License

Private. All rights reserved. Bodies and Pilates.
