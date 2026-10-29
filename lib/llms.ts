import { CLASSES, GROUP_CLASS_NAMES, classBySlug } from '@/lib/classes'
import { FAQS } from '@/lib/faqs'
import { COMMIT, FLEX, POLICY, PRIVATE, TRY, offerHref, type Offer } from '@/lib/pricing'
import { TEAM, SHOW_BIOS, bioEntries } from '@/lib/team'
import { SERVICE_AREAS } from '@/lib/areas'
import { getPublishedPosts } from '@/lib/blog'
import {
  ADDRESS,
  CLASSPASS_RATING,
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
  GRIP_SOCKS_LINE,
} from '@/lib/site'

/**
 * /llms.txt and /llms-full.txt, generated from the same data the pages use,
 * so prices, hours, and policies can never drift from the site.
 * Spec: https://llmstxt.org
 */

const url = (path: string) => `${SITE_URL}${path}`
const offerLine = (o: Offer) =>
  `- ${o.name}: ${o.price}${o.unit ? ` ${o.unit}` : ''}${o.perClass ? ` (${o.perClass.toLowerCase()})` : ''}. ${o.detail} Book: ${offerHref(o)}`

const summary = `${SITE_NAME} is an independent boutique reformer Pilates studio in North Hollywood, Los Angeles, CA. It is independent and woman-owned. Every group class is 50 minutes on a professional Merrithew reformer, with never more than 7 people, coached by an experienced instructor. A first class costs $25.`

const facts = [
  `- Address: ${ADDRESS.oneLine}`,
  `- Phone: ${PHONE.display} (call or text)`,
  `- Email: ${EMAIL}`,
  `- Hours: ${HOURS.map((h) => `${h.short} ${h.label}`).join('; ')}`,
  `- Parking: Metered street parking is available on Weddington St and Vineland Ave.`,
  `- Grip socks: ${GRIP_SOCKS_LINE}`,
  `- Cancellation: ${POLICY.cancellation}`,
  `- Memberships: ${POLICY.membership}`,
  `- Google rating: ${GOOGLE_REVIEWS.rating} (${GOOGLE_REVIEWS.count} reviews)`,
  `- ClassPass rating: ${CLASSPASS_RATING.rating} (${CLASSPASS_RATING.ratings} ratings, ${CLASSPASS_RATING.reviews} written reviews)`,
  `- Booking: Mindbody (site ID ${MINDBODY.siteId}), ${MINDBODY.classesUrl}`,
  `- Instagram: ${INSTAGRAM.url}`,
  `- ClassPass: ${CLASSPASS_URL}`,
  `- Neighborhoods served: North Hollywood, ${SERVICE_AREAS.map((a) => a.name).join(', ')}`,
].join('\n')

const pages = [
  `- [Intro offer](${url('/intro-offer')}): $25 first class or the $105 One-Week Unlimited for first-timers`,
  `- [Pricing](${url('/pricing')}): every class pack, membership, and private session price with booking links`,
  `- [Classes](${url('/classes')}): ${[...GROUP_CLASS_NAMES, classBySlug('private').name].slice(0, -1).join(', ')}, and ${classBySlug('private').name} formats`,
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
  const team = TEAM.map(
    (t) =>
      `- ${t.name}${t.role ? `, ${t.role}` : ', instructor'}. Teaches: ${t.teaches.join(', ')}.${(SHOW_BIOS ? bioEntries(t.bio) : [])
        .map((b) => ` ${b.label}: ${b.value}.`)
        .join('')}`
  ).join('\n')

  return `# ${SITE_NAME}: full reference

> ${summary}

Canonical site: ${SITE_URL}/

## Studio facts
${facts}

## Pricing (USD, as published on ${url('/pricing')})

### Intro offers (first-timers only)
${TRY.map(offerLine).join('\n')}

### Memberships (monthly)
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
- ClassPass: ${CLASSPASS_RATING.rating} from ${CLASSPASS_RATING.ratings} ratings and ${CLASSPASS_RATING.reviews} written reviews (${CLASSPASS_URL})
${posts.length ? `\n## Blog posts\n${posts.map((p) => `- [${p.title}](${url(`/blog/${p.slug}`)}): ${p.description}`).join('\n')}\n` : ''}`
}
