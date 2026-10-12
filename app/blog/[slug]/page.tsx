import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost, getRelatedPosts, postStatus, formatPostDate } from '@/lib/blog'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { blogHero } from '@/lib/photos'
import { BLOG_AUTHOR, SITE_URL } from '@/lib/site'
import { eyebrowClass } from '@/components/sections/section-heading'
import { BlogCta } from '@/components/sections/blog-cta'
import { PhotoSlot } from '@/components/ui/photo-slot'

// Scheduled posts go live on their publishDate without a redeploy: pages are
// regenerated at most hourly, and posts not built ahead of time render on
// first request once their date arrives.
export const revalidate = 3600

const RELATED_COLS: Record<number, string> = { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3' }

export function generateStaticParams() {
  return getAllPosts()
    .filter((p) => postStatus(p) !== 'scheduled')
    .map((p) => ({ slug: p.slug }))
}

/** Loads a post only if it is visible today (published or outline draft). */
function loadVisible(slug: string) {
  const post = getPost(slug)
  if (!post || postStatus(post.meta) === 'scheduled') return null
  return post
}

export function generateMetadata({ params }: { params: { slug: string } }) {
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

export default function BlogPostPage({ params }: { params: { slug: string } }) {
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(postingSchema) }} />
      )}
      {!meta.draft && meta.faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="mb-10">
          <Link href="/blog" className={`${eyebrowClass} hover:text-sage-500`}>
            Journal
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

        <PhotoSlot
          photo={blogHero(meta.title, meta.heroAlt)}
          aspectClassName="aspect-[16/9]"
          sizes="(max-width: 768px) 100vw, 768px"
          className="mb-12"
        />

        {meta.draft ? (
          <section aria-labelledby="outline-heading" data-placeholder="content">
            <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-taupe-700">
              Full article coming soon
            </p>
            <h2 id="outline-heading" className="mt-3 font-serif text-2xl text-charcoal-900">
              What this guide will cover
            </h2>
            <ol className="mt-6 space-y-3 font-sans text-base text-charcoal-800/85">
              {meta.outline.map((item, i) => (
                <li key={item} className="flex gap-4 border-b border-taupe-300/60 pb-3">
                  <span className="font-serif text-sage-700">{String(i + 1).padStart(2, '0')}</span>
                  {item}
                </li>
              ))}
            </ol>
          </section>
        ) : (
          <div className="prose prose-stone max-w-none prose-headings:font-serif prose-a:text-sage-700 prose-a:underline-offset-4">
            <MDXRemote source={post.content} />
          </div>
        )}

        {!meta.draft && meta.faqs.length > 0 && (
          <section aria-labelledby="post-faq-heading" className="mt-14">
            <h2 id="post-faq-heading" className="font-serif text-3xl text-charcoal-900">
              Frequently asked questions
            </h2>
            <dl className="mt-6 divide-y divide-taupe-300/60 border-y border-taupe-300/60">
              {meta.faqs.map((f) => (
                <div key={f.q} className="py-5">
                  <dt className="font-serif text-xl text-charcoal-900">{f.q}</dt>
                  <dd className="mt-2 font-sans text-base leading-[1.75] text-charcoal-800/85">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <BlogCta />

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
