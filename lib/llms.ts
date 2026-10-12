import { CLASSES } from '@/lib/classes'
import { FAQS } from '@/lib/faqs'
import { COMMIT, FLEX, POLICY, PRIVATE, TRY, offerHref, type Offer } from '@/lib/pricing'
import { TEAM } from '@/lib/team'
import { getPublishedPosts } from '@/lib/blog'
import {
  ADDRESS,
  CLASSPASS_URL,
  EMAIL,
  GOOGLE_REVIEWS,
  HOURS,
  INSTAGRAM,
  MINDBODY,
  PHONE,
  SITE_NAME,
  SITE_URL,
  googleReviewsHref,
} from '@/lib/site'

/**
 * /llms.txt and /llms-full.txt, generated from the same data the pages use,
 * so prices, hours, and policies can never drift from the site.
 * Spec: https://llmstxt.org
 */

const url = (path: string) => `${SITE_URL}${path}`
const offerLine = (o: Offer) =>
  `- ${o.name}: ${o.price}${o.unit ? ` ${o.unit}` : ''}${o.perClass ? ` (${o.perClass.toLowerCase()})` : ''}. ${o.detail} Book: ${offerHref(o)}`

const summary = `${SITE_NAME} is an independent boutique reformer Pilates studio in North Hollywood, Los Angeles, CA, open since 2024. Every group class is small-group reformer Pilates with coaching on form. A first class costs $25.`

const facts = [
  `- Address: ${ADDRESS.oneLine}`,
  `- Phone: ${PHONE.display} (call or text)`,
  `- Email: ${EMAIL}`,
  `- Hours: ${HOURS.map((h) => `${h.short} ${h.label}`).join('; ')}`,
  `- Parking: street parking on Weddington St and metered spots in front of the studio on Vineland Ave`,
  `- Google rating: ${GOOGLE_REVIEWS.rating} (${GOOGLE_REVIEWS.count} reviews)`,
  `- Booking: MindBody (site ID ${MINDBODY.siteId}), ${MINDBODY.classesUrl}`,
  `- Instagram: ${INSTAGRAM.url}`,
  `- ClassPass: ${CLASSPASS_URL}`,
  `- Neighborhoods served: North Hollywood, Toluca Lake (about 5 min), Valley Village (about 8 min), Studio City (about 10 min), Burbank (about 10 min)`,
].join('\n')

const pages = [
  `- [Intro offer](${url('/intro-offer')}): $25 first class or $105 one-week unlimited for first-timers`,
  `- [Pricing](${url('/pricing')}): every class pack, membership, and private session price with booking links`,
  `- [Classes](${url('/classes')}): Beginner, Full Body, Flexibility, and Private formats`,
  `- [Schedule](${url('/schedule')}): live class timetable`,
  `- [FAQ](${url('/faq')}): pricing, what to wear, parking, policies, Lagree vs Pilates`,
  `- [About](${url('/about')}): studio story, instructors, neighborhoods served`,
  `- [Contact](${url('/contact')}): phone, text, email, map`,
  `- [Blog](${url('/blog')}): reformer Pilates guides`,
].join('\n')

export function llmsTxt() {
  return `# ${SITE_NAME}

> ${summary}

## Key facts
${facts}

## Pages
${pages}

## Optional
- [Full details for AI assistants](${url('/llms-full.txt')}): complete pricing, policies, classes, FAQ, and team
`
}

export function llmsFullTxt() {
  const posts = getPublishedPosts()
  const team = TEAM.filter((t) => t.credentials || t.origin)
    .map((t) => `- ${t.name}, ${t.role}.${t.credentials ? ` ${t.credentials}` : ''}${t.specialties ? ` Specialties: ${t.specialties}.` : ''}`)
    .join('\n')

  return `# ${SITE_NAME}: full reference

> ${summary}

Canonical site: ${SITE_URL}/

## Studio facts
${facts}

## Pricing (USD, as published on ${url('/pricing')})

### Intro offers (first-timers only)
${TRY.map(offerLine).join('\n')}

### Memberships (monthly auto-renew)
${COMMIT.map(offerLine).join('\n')}

### Class packs
${FLEX.map(offerLine).join('\n')}

### Private training
${PRIVATE.map(offerLine).join('\n')}

### Policies
- Cancellation: ${POLICY.cancellation}
- Memberships: ${POLICY.membership}

## Classes
${CLASSES.map(
  (c) => `### ${c.name} (${c.level}, ${c.duration})
${c.description}
Who it is for: ${c.forWho}
More: ${url(`/classes/${c.slug}`)}`
).join('\n\n')}

## Frequently asked questions
${FAQS.filter((f) => f.answer)
  .map((f) => `### ${f.question}\n${f.answer}`)
  .join('\n\n')}

## Team
${team}

## Reviews
- Google: ${GOOGLE_REVIEWS.rating} stars from ${GOOGLE_REVIEWS.count} reviews (${googleReviewsHref()})
${posts.length ? `\n## Blog posts\n${posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`).join('\n')}\n` : ''}`
}
