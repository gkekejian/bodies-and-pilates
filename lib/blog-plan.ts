/**
 * Editorial plan for the 20-post blog (see the owner's blog index).
 * Slugs here must match content/blog/<slug>.mdx.
 */

/** Recommended publishing order, 2 per week. Question-format posts first. */
export const PUBLISHING_ORDER = [
  // Week 1
  'what-is-reformer-pilates',
  'your-first-pilates-class-minute-by-minute',
  // Week 2
  'what-to-wear-to-pilates',
  'do-you-need-to-be-flexible-to-start-pilates',
  // Week 3
  'reformer-vs-mat-pilates',
  '5-most-common-reformer-mistakes-beginners',
  // Week 4
  'pilates-for-beginners-north-hollywood',
  'how-often-should-you-do-pilates',
  // Week 5
  'how-much-does-reformer-pilates-cost-north-hollywood',
  'private-vs-group-pilates',
  // Week 6
  '7-things-to-look-for-in-a-pilates-studio',
  'why-small-pilates-classes-get-better-results',
  // Week 7
  'lagree-vs-reformer-pilates',
  'reformer-pilates-vs-yoga',
  // Week 8
  'pilates-vs-barre-which-should-you-try',
  'is-reformer-pilates-good-for-weight-loss',
  // Week 9
  'pilates-for-men',
  'how-long-until-pilates-results',
  // Week 10
  'is-pilates-good-for-back-pain',
  'can-i-do-pilates-while-pregnant',
  // Week 11 (added from the 2026-10-12 keyword research)
  'where-to-park-for-pilates-north-hollywood',
  'classpass-vs-pilates-membership-north-hollywood',
]

/** "Related posts" topic groups. */
export const RELATED_GROUPS: string[][] = [
  ['how-much-does-reformer-pilates-cost-north-hollywood', 'classpass-vs-pilates-membership-north-hollywood', 'private-vs-group-pilates', 'how-often-should-you-do-pilates'],
  ['what-is-reformer-pilates', 'reformer-vs-mat-pilates', '5-most-common-reformer-mistakes-beginners'],
  ['lagree-vs-reformer-pilates', 'reformer-pilates-vs-yoga', 'pilates-vs-barre-which-should-you-try'],
  ['your-first-pilates-class-minute-by-minute', 'what-to-wear-to-pilates', 'pilates-for-beginners-north-hollywood', 'where-to-park-for-pilates-north-hollywood'],
  ['is-pilates-good-for-back-pain', 'can-i-do-pilates-while-pregnant', 'do-you-need-to-be-flexible-to-start-pilates'],
  ['is-reformer-pilates-good-for-weight-loss', 'how-long-until-pilates-results', 'pilates-for-men'],
  ['7-things-to-look-for-in-a-pilates-studio', 'why-small-pilates-classes-get-better-results'],
]

/** Posts that carry an end-of-post FAQ section with FAQPage JSON-LD. */
export const QUESTION_POSTS = [
  'what-is-reformer-pilates',
  'what-to-wear-to-pilates',
  'is-pilates-good-for-back-pain',
  'how-often-should-you-do-pilates',
  'lagree-vs-reformer-pilates',
  'is-reformer-pilates-good-for-weight-loss',
  'do-you-need-to-be-flexible-to-start-pilates',
  'can-i-do-pilates-while-pregnant',
]
