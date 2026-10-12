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
 *   draft      outline scaffold: listed as "Coming soon", noindexed, kept out of the sitemap
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

function toPost(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  const title = (data.title as string) ?? ''
  const words = content.replace(/\{\/\*[\s\S]*?\*\/\}/g, '').split(/\s+/).filter(Boolean).length
  return {
    slug,
    title,
    seoTitle: (data.seoTitle as string) || title,
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

/** Published posts, newest first. */
export function getPublishedPosts(now = new Date()): BlogPost[] {
  return getAllPosts()
    .filter((p) => postStatus(p, now) === 'published')
    .sort((a, b) => publishInstant(b.publishDate).getTime() - publishInstant(a.publishDate).getTime())
}

/** What the /blog index lists: published posts newest first, then outline drafts. */
export function getListedPosts(now = new Date()): BlogPost[] {
  const drafts = getAllPosts()
    .filter((p) => p.draft)
    .sort((a, b) => order(a.slug) - order(b.slug))
  return [...getPublishedPosts(now), ...drafts]
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

/** Up to 3 published related posts: topic group first, then by publishing order. */
export function getRelatedPosts(slug: string, now = new Date()): BlogPost[] {
  const published = new Map(getPublishedPosts(now).map((p) => [p.slug, p]))
  const group = RELATED_GROUPS.find((g) => g.includes(slug)) ?? []
  const candidates = [...group, ...PUBLISHING_ORDER].filter((s) => s !== slug)
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
