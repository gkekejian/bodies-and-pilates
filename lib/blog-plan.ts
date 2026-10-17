/**
 * Editorial plan for the 20-post blog (see the owner's blog index).
 * Slugs here must match content/blog/<slug>.mdx.
 */

/**
 * Recommended publishing order, 2 per week, question-format posts first. The
 * copy audit (2026-10-14) merged how-long-until-pilates-results into
 * how-often, folded the flexibility post into what-is, and cut the pregnancy
 * post (each 301s; see next.config.mjs).
 */
export const PUBLISHING_ORDER = [
  // Week 1
  'what-is-reformer-pilates',
  'your-first-pilates-class-minute-by-minute',
  // Week 2
  'what-to-wear-to-pilates',
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
  // Week 10
  'is-pilates-good-for-back-pain',
]

/** "Related posts" topic groups. */
export const RELATED_GROUPS: string[][] = [
  ['how-much-does-reformer-pilates-cost-north-hollywood', 'private-vs-group-pilates', 'how-often-should-you-do-pilates'],
  ['what-is-reformer-pilates', 'reformer-vs-mat-pilates', '5-most-common-reformer-mistakes-beginners'],
  ['lagree-vs-reformer-pilates', 'reformer-pilates-vs-yoga', 'pilates-vs-barre-which-should-you-try'],
  ['your-first-pilates-class-minute-by-minute', 'what-to-wear-to-pilates', 'pilates-for-beginners-north-hollywood'],
  ['is-reformer-pilates-good-for-weight-loss', 'pilates-for-men', 'is-pilates-good-for-back-pain'],
  ['7-things-to-look-for-in-a-pilates-studio', 'why-small-pilates-classes-get-better-results'],
]

/**
 * Question-format posts marked in the owner's index: they carry an end-of-post
 * FAQ block (answers quoted from the post itself) with FAQPage JSON-LD.
 */
export const QUESTION_POSTS = [
  'what-is-reformer-pilates',
  'what-to-wear-to-pilates',
  'is-pilates-good-for-back-pain',
  'how-often-should-you-do-pilates',
  'lagree-vs-reformer-pilates',
  'is-reformer-pilates-good-for-weight-loss',
]
