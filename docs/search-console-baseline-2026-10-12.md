# Google Search Console Baseline (old Wix site, pre-rebuild)

Source: GSC Performance export provided by George, 2026-10-12.
Period: Sep 13 to Oct 10, 2026 (last 28 days), Web search, all countries.
Compare the first full 28 days after launch against this file.

## Totals

| Metric | Value |
|---|---|
| Clicks | 144 (about 5 a day) |
| Impressions | 2,030 |
| Query-attributed clicks | 98: 72 branded, 26 non-branded |
| Mobile | 113 clicks, 1,104 impressions, CTR 10.24%, position 5.97 |
| Desktop | 30 clicks, 920 impressions, CTR 3.26%, position 10.22 |
| Tablet | 1 click |
| United States | 138 of 144 clicks |

Mobile drives 78% of clicks and ranks better than desktop.

## Top queries

| Query | Clicks | Impressions | CTR | Position | Note |
|---|---|---|---|---|---|
| bodies and pilates | 60 | 101 | 59.41% | 1.72 | Branded |
| pilates north hollywood | 11 | 97 | 11.34% | 2.87 | Strongest non-branded term; home page title and H1 now target it |
| pilates classes near me | 0 | 256 | 0% | 1.01 | Local pack: people call or get directions from the Google Business Profile instead of clicking |
| pilates near me | 3 | 66 | 4.55% | 4.86 | Striking distance |
| mat pilates near me | 2 | 20 | 10% | 7.05 | The studio is reformer only; answered honestly in a FAQ, not chased |

Smaller clusters worth watching: grip socks (about 40 impressions across "pilates socks", "pilates grip socks", and similar), Burbank and Studio City neighborhood terms, and price questions ("what are the prices", "pilates near me how much does it cost").

## Pages (only 5 earned traffic)

| Old URL | Clicks | Impressions | CTR | Position | On the new site |
|---|---|---|---|---|---|
| `/?utm_source=google&utm_medium=wix_google_business_profile&...` | 80 | 1,292 | 6.19% | 5.26 | 200, canonical to the home page |
| `/` | 58 | 998 | 5.81% | 10 | 200 |
| `/faqs` | 4 | 157 | 2.55% | 3.12 | 301 to `/faq` |
| `/pricing` | 2 | 209 | 0.96% | 4.34 | 200, new title and description |
| `/bookings` | 1 | 21 | 4.76% | 5.76 | 301 to `/schedule` |

All five resolve on the rebuild (checked 2026-10-12), so no ranking page is lost at launch.

## Read for the rebuild

1. Branded search carries the old site. Non-branded discovery is the rebuild's job: the keyword tiers and the blog plan aim at it.
2. Pricing CTR (0.96% at position 4.34) is the cheapest win. The new title is "Pilates Pricing & Memberships | Bodies and Pilates NoHo" and the description lists real prices ($25 first class, $36 single, packs from $160, memberships from $130/month).
3. "Near me" visibility converts through the Google Business Profile, not the website. Review volume (27 vs competitors' 166 to 200) and profile completeness stay the top priority.
4. Protect mobile performance at launch (Lighthouse mobile 96 to 98 with placeholders); re-test once real photos land.

## Targets for the first 28 days after launch

- Non-branded clicks above 26.
- `/pricing` CTR above 3%.
- "pilates near me" average position in the top 3.
- "pilates north hollywood" holds position 3 or better.

## After launch

1. In Search Console, submit `https://www.bodiesandpilates.com/sitemap.xml`.
2. Use URL Inspection to request indexing for `/`, `/pricing`, `/intro-offer`, `/classes`, `/faq`.
3. Watch the Pages report for 404s for two weeks; add a redirect in `next.config.mjs` for any old URL that still gets traffic.
4. Update the Google Business Profile website link from the Wix UTM URL to `https://www.bodiesandpilates.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`, so profile visits show up as their own source in GA4.
5. Export the same report 28 days after launch and compare with this file.
