# Owner Guide — Bodies and Pilates Website

For Naira. Two pages, plain language.

---

## What this site does

`bodiesandpilates.com` is the studio's marketing site. It tells people who you are, where you are, what you teach, and how to book — and it's optimized so people in North Hollywood, Toluca Lake, Studio City, Burbank, and the Hollywood side of the hill find you when they search for Pilates.

The site has online booking embedded directly from Mindbody, so when someone clicks Book Now, they go straight to your real Mindbody schedule. You don't manage the schedule on the website — you manage it in Mindbody. The website just shows it.

## The $25 first class offer

The $25 first class is the **only public offer on the site.** That's the entry point. Everything else — 3-class packs, 5-class packs, monthly memberships — is below the fold or after the first class.

The deeper offers (the $99 first-month-unlimited in particular) are sent automatically by **Mindbody trigger emails** after a new client takes their first class. The website doesn't show $99 anywhere — that offer lives only in the post-first-class email. That's intentional: it gives new clients a real reason to convert from one class to a month.

For the Mindbody setup of those trigger emails, see **[MINDBODY-SETUP.md](./MINDBODY-SETUP.md)**.

## What you need to do (almost nothing)

- **Reply to Google reviews when they come in.** Five minutes, once a week is plenty.
- **Tell George if anything looks broken.** Screenshot the page, send it over.
- **That's it.** The site doesn't need updates to keep working.

## What runs itself

- **Booking is embedded from Mindbody.** Anything you change in Mindbody — the schedule, prices, instructors, holidays — shows up automatically on the website. You don't need to update the site.
- **Reviews on the homepage pull live from Google.** When someone leaves a new Google review, it'll appear on the site within 24 hours.
- **The homepage social-share image (the card people see when the link is posted to Instagram/Facebook/iMessage) is generated dynamically by a Next.js edge route.** It's not a static file you have to swap out. If we change the studio name or address, the image updates with it. No maintenance needed.
- **SEO updates happen automatically as Google re-crawls the site.** New pages and metadata get picked up over the next 1–6 weeks after we ship.

## If something breaks

- The whole site is on **Vercel**. If the page looks weird or broken, it's usually a temporary glitch — wait an hour and check again.
- For real issues, contact George.
- Don't try to "fix" the site by editing things in Mindbody — Mindbody manages the bookings, not the website.

## Once a quarter (5 minutes)

A small habit that keeps the site healthy:

- **Open Google Search Console** ([search.google.com/search-console](https://search.google.com/search-console)). Look at the clicks chart. Trending up? Good. Trending down? Tell George.
- **Open Google Analytics 4.** Look at the **`begin_checkout`** event count. Trending up means more trial bookings.
- **Open Google Business Profile.** Reply to any unanswered reviews.
- **Open Mindbody.** Confirm the trigger emails are still active (Marketing → Automated Emails).

That's the whole quarterly check. No more than 5 minutes.
