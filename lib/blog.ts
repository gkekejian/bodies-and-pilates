import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { RELATED_GROUPS, PUBLISHING_ORDER } from '@/lib/blog-plan'

/**
 * Blog content lives in content/blog/<slug>.mdx with this frontmatter:
 *
 *   title:          H1 and default title tag
 *   seoTitle:       optional title tag override (use when title is over 60 chars)
 *   description:    meta description, used verbatim
 *   targetKeyword:  primary keyword
 *   publishDate:    YYYY-MM-DD. The post goes live at midnight Pacific that day.
 *   updatedDate:    optional YYYY-MM-DD, used for dateModified and sitemap lastmod
 *   draft:          true for outline-only scaffolds (noindexed, shown as "Coming soon")
 *   heroAlt:        alt text for the post's hero image slot
 *   faqs:           optional list of { q, a } rendered before the CTA, with FAQPage JSON-LD
 *   outline:        list of planned H2s, shown only while draft is true
 *
 * Visibility:
 *   published  draft false and publishDate today or earlier: indexed, listed, in the sitemap
 *   scheduled  draft false and publishDate in the future: 404 until the date
 *   draft      outline scaffold: not rendered anywhere (404) and kept out of the sitemap
 */

export interface BlogFaq {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  description: string
  targetKeyword: string
  publishDate: string
  updatedDate: string
  draft: boolean
  heroAlt: string
  faqs: BlogFaq[]
  outline: string[]
  readingMinutes: number
}

export type PostStatus = 'published' | 'scheduled' | 'draft'

const postsDirectory = path.join(process.cwd(), 'content/blog')
const WORDS_PER_MINUTE = 200

/** Adds the brand to a post's title tag when it still fits in about 60 characters. */
const withBrand = (title: string) => (title.length + 22 <= 60 ? `${title} | Bodies and Pilates` : title)

function toPost(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  const title = (data.title as string) ?? ''
  const words = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').split(/\s+/).filter(Boolean).length
  return {
    slug,
    title,
    seoTitle: (data.seoTitle as string) || withBrand(title),
    description: (data.description as string) ?? '',
    targetKeyword: (data.targetKeyword as string) ?? '',
    publishDate: (data.publishDate as string) ?? '',
    updatedDate: (data.updatedDate as string) ?? '',
    draft: (data.draft as boolean) ?? true,
    heroAlt: (data.heroAlt as string) || `${title}: reformer Pilates at Bodies and Pilates in North Hollywood`,
    faqs: Array.isArray(data.faqs) ? (data.faqs as BlogFaq[]) : [],
    outline: Array.isArray(data.outline) ? (data.outline as string[]) : [],
    readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  }
}

/** Midnight Pacific on the given YYYY-MM-DD. */
export const publishInstant = (date: string) => new Date(`${date}T00:00:00-07:00`)

export function postStatus(post: BlogPost, now = new Date()): PostStatus {
  if (post.draft) return 'draft'
  if (!post.publishDate || publishInstant(post.publishDate) > now) return 'scheduled'
  return 'published'
}

function readAll(): Array<{ post: BlogPost; content: string }> {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, file), 'utf-8'))
      return { post: toPost(slug, data, content), content }
    })
}

/** Every post file, regardless of status. */
export function getAllPosts(): BlogPost[] {
  return readAll().map((r) => r.post)
}

/** Published posts, newest first; same-day posts follow the publishing order. */
export function getPublishedPosts(now = new Date()): BlogPost[] {
  return getAllPosts()
    .filter((p) => postStatus(p, now) === 'published')
    .sort(
      (a, b) =>
        publishInstant(b.publishDate).getTime() - publishInstant(a.publishDate).getTime() ||
        order(a.slug) - order(b.slug)
    )
}

/** What the /blog index lists: published posts only, newest first. */
export function getListedPosts(now = new Date()): BlogPost[] {
  return getPublishedPosts(now)
}

/**
 * Every non-draft post must close with the $25 CTA block (copy audit
 * 2026-10-14 wording), word for word, and a post with FAQs must place its FAQ block. Checked at build time.
 */
export const POST_CTA_TEXT =
  'Ready to try it? Your first class is $25. That is 50 minutes on a professional Merrithew reformer, with no more than 7 people in the room. [Book your first class](/intro-offer).'

export function assertPostContent() {
  for (const { post, content } of readAll()) {
    if (post.draft) continue
    if (!content.includes(POST_CTA_TEXT)) throw new Error(`Blog post ${post.slug} is missing the exact $25 CTA block.`)
    if (post.faqs.length > 0 && !content.includes('<PostFaq />')) {
      throw new Error(`Blog post ${post.slug} has faqs but no <PostFaq /> block.`)
    }
    if (content.includes('\u2014')) throw new Error(`Blog post ${post.slug} contains an em dash.`)
  }
}

export function getPost(slug: string): { meta: BlogPost; content: string } | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf-8'))
  return { meta: toPost(slug, data, content), content }
}

const order = (slug: string) => {
  const i = PUBLISHING_ORDER.indexOf(slug)
  return i === -1 ? Number.MAX_SAFE_INTEGER : i
}

/** Up to 3 published related posts: topic group first, then the posts after it in publishing order. */
export function getRelatedPosts(slug: string, now = new Date()): BlogPost[] {
  const published = new Map(getPublishedPosts(now).map((p) => [p.slug, p]))
  const group = RELATED_GROUPS.find((g) => g.includes(slug)) ?? []
  // Fill from the publishing order starting after this post, so the same early
  // post is not the fallback on every page.
  const at = Math.max(0, PUBLISHING_ORDER.indexOf(slug))
  const rotated = [...PUBLISHING_ORDER.slice(at + 1), ...PUBLISHING_ORDER.slice(0, at)]
  const candidates = [...group, ...rotated].filter((s) => s !== slug)
  const picked: BlogPost[] = []
  for (const s of candidates) {
    const post = published.get(s)
    if (post && !picked.includes(post)) picked.push(post)
    if (picked.length === 3) break
  }
  return picked
}

export const formatPostDate = (date: string) =>
  publishInstant(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/Los_Angeles',
  })
