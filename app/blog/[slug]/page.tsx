import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { assertPostContent, getAllPosts, getPost, getRelatedPosts, postStatus, formatPostDate } from '@/lib/blog'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/schema'
import { BLOG_AUTHOR, SITE_URL } from '@/lib/site'
import { eyebrowClass } from '@/components/sections/section-heading'
import { PostCta, PostFaq } from '@/components/blog/post-parts'

// Scheduled posts go live on their publishDate without a redeploy: pages are
// regenerated at most hourly, and posts not built ahead of time render on
// first request once their date arrives.
export const revalidate = 3600

const RELATED_COLS: Record<number, string> = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' }

export function generateStaticParams() {
  assertPostContent()
  return getAllPosts()
    .filter((p) => postStatus(p) === 'published')
    .map((p) => ({ slug: p.slug }))
}

/** Loads a post only if it is published today. Drafts and scheduled posts 404. */
function loadVisible(slug: string) {
  const post = getPost(slug)
  if (!post || postStatus(post.meta) !== 'published') return null
  return post
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = loadVisible(params.slug)
  if (!post) return {}
  const { meta } = post
  return {
    ...pageMetadata({
      title: meta.seoTitle,
      description: meta.description,
      path: `/blog/${meta.slug}`,
      // Outline drafts stay out of search until the copy is in.
      noIndex: meta.draft,
      article: meta.draft
        ? undefined
        : {
            publishedTime: meta.publishDate,
            modifiedTime: meta.updatedDate || meta.publishDate,
            author: BLOG_AUTHOR.name,
          },
    }),
    keywords: [meta.targetKeyword],
  }
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params
  const post = loadVisible(params.slug)
  if (!post) notFound()
  const { meta } = post
  const related = meta.draft ? [] : getRelatedPosts(meta.slug)
  const url = `${SITE_URL}/blog/${meta.slug}`

  const postingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    datePublished: meta.publishDate,
    dateModified: meta.updatedDate || meta.publishDate,
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/opengraph-image`,
    author: {
      '@type': 'Person',
      name: BLOG_AUTHOR.name,
      jobTitle: 'Owner',
      worksFor: { '@id': `${SITE_URL}/#gym` },
    },
    publisher: { '@id': `${SITE_URL}/#gym` },
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: meta.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: meta.title, path: `/blog/${meta.slug}` },
  ])

  return (
    <>
      {!meta.draft && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(postingSchema) }} />
      )}
      {!meta.draft && meta.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="mb-10">
          <Link href="/blog" className={`${eyebrowClass} inline-block py-1 hover:text-sage-500`}>
            Blog
          </Link>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-charcoal-900 sm:text-5xl">{meta.title}</h1>
          <p className="mt-6 font-sans text-lg leading-[1.7] text-charcoal-800/85">{meta.description}</p>
          {!meta.draft && (
            <p className="mt-6 font-sans text-sm text-charcoal-800/70">
              By {BLOG_AUTHOR.name}, {BLOG_AUTHOR.role} &middot;{' '}
              <time dateTime={meta.publishDate}>{formatPostDate(meta.publishDate)}</time> &middot;{' '}
              {meta.readingMinutes} min read
            </p>
          )}
        </header>

        {/* TODO(owner): per-post hero photography. heroAlt in frontmatter is ready for it. */}

        <div className="prose prose-stone max-w-none prose-headings:font-serif prose-a:text-sage-700 prose-a:underline-offset-4">
          <MDXRemote
            source={post.content}
            components={{ PostCta, PostFaq: () => <PostFaq faqs={meta.faqs} /> }}
          />
        </div>

        {/* Each post carries its own closing CTA block (and FAQ block, where it
            has one) in its MDX. */}

        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-16">
            <h2 id="related-heading" className="font-serif text-2xl text-charcoal-900">
              Related posts
            </h2>
            <ul
              className={`mt-6 grid gap-px border border-taupe-300/70 bg-taupe-300/70 ${RELATED_COLS[related.length]}`}
            >
              {related.map((r) => (
                <li key={r.slug} className="bg-cream-50">
                  <Link href={`/blog/${r.slug}`} className="group block h-full p-5 hover:bg-cream-100">
                    <span className="font-serif text-lg leading-snug text-charcoal-900 group-hover:text-sage-700">
                      {r.title}
                    </span>
                    <span className="mt-2 block font-sans text-xs text-charcoal-800/70">{r.readingMinutes} min read</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </>
  )
}
