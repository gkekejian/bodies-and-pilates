# Bodies and Pilates

Marketing website for **Bodies and Pilates** — a boutique Pilates studio at 5251 Vineland Ave Suite 6, North Hollywood, CA 91601.

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Animation | framer-motion |
| Forms | react-hook-form + zod |
| Blog | MDX via next-mdx-remote |
| Analytics | GA4 (@next/third-parties), Meta Pixel |
| Booking | Mindbody / Healcode widgets |
| Instagram | Behold.so widget |
| Hosting | Vercel (recommended) |

## Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy and fill in environment variables
cp .env.example .env.local
# Edit .env.local with your API keys and widget IDs

# 3. Start the dev server
npm run dev
# → http://localhost:3000
```

## Build & Deploy

```bash
npm run build    # production build
npm run start    # preview production build locally
npm run lint     # ESLint
```

Deploy via [Vercel](https://vercel.com) — import this repo, set env vars from `.env.example`, and deploy.

## Project Structure

```
app/                    # Next.js App Router pages
  page.tsx              # Homepage
  about/                # About page
  classes/              # Classes index + detail pages (beginner, fullbody, flexibility, private)
  pricing/              # Pricing (all Mindbody plans with live Buy Now links)
  schedule/             # Schedule (Healcode widget, SSR-safe)
  instructors/          # Instructor listing + Naira detail page
  faq/                  # FAQ (Accordion UI, FAQPage schema)
  contact/              # Contact page + RHF/Zod form
  blog/                 # Blog index + [slug] dynamic MDX page
  api/reviews/          # Google Places API reviews route (24h ISR)
  sitemap.ts            # Dynamic XML sitemap
  robots.ts             # robots.txt

components/
  layout/               # Header, Footer, MobileBookingBar
  sections/             # HeroSection, ClassCard, InstagramSection, etc.
  analytics/            # GA4 + Meta Pixel loader, CCPA cookie banner
  ui/                   # shadcn/ui components
  contact-form.tsx      # react-hook-form + Zod contact form
  mindbody-schedule.tsx # Healcode widget with ErrorBoundary
  instagram-feed.tsx    # Behold.so Instagram feed

content/blog/           # 15 draft MDX blog posts (front-matter only — ready to write)
lib/                    # Blog utilities, breadcrumb schema helper, Mindbody loader
public/images/          # Placeholder images (replace with real photos — see README there)
types/                  # TypeScript ambient declarations
```

## Schema / SEO

- `HealthClub` JSON-LD in root layout
- `FAQPage` on `/faq`
- `Service` on each class detail page
- `Person` on `/instructors/naira`
- `BreadcrumbList` on every page
- `BlogPosting` on each blog post
- `/sitemap.xml` and `/robots.txt` auto-generated
- 308 redirects: `/bookings → /schedule`, `/faqs → /faq`, `/post/:slug → /blog/:slug`

## Owner Setup Checklist

See **[BUILD-NOTES.md](./BUILD-NOTES.md)** for the complete owner checklist — env vars, widget IDs, real images, blog content, instructor bios, and deployment instructions.

## License

Private — all rights reserved. Bodies and Pilates © 2026.
