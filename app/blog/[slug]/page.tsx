import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getAllPosts, getPost } from '@/lib/blog'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'
import { eyebrowClass } from '@/components/sections/section-heading'
import { BlogCta } from '@/components/sections/blog-cta'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    ...pageMetadata({
      title: `${post.meta.title} | Bodies and Pilates`,
      description: post.meta.description,
      path: `/blog/${post.meta.slug}`,
      // Drafts are outlines only: keep them out of search until the copy is in.
      noIndex: post.meta.draft,
    }),
    keywords: [post.meta.targetKeyword],
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()
  const { meta } = post

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.title,
    description: meta.description,
    ...(meta.publishDate ? { datePublished: meta.publishDate } : {}),
    mainEntityOfPage: `${SITE_URL}/blog/${meta.slug}`,
    author: { '@id': `${SITE_URL}/#gym` },
    publisher: { '@id': `${SITE_URL}/#gym` },
  }
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: meta.title, path: `/blog/${meta.slug}` },
  ])

  return (
    <>
      {!meta.draft && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <header className="mb-12">
          <Link href="/blog" className={`${eyebrowClass} hover:text-sage-700`}>
            Journal
          </Link>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-charcoal-900 sm:text-5xl">{meta.title}</h1>
          {meta.publishDate && !meta.draft && (
            <p className="mt-4 font-sans text-sm text-charcoal-800/70">
              {new Date(meta.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
          <p className="mt-6 font-sans text-lg leading-[1.7] text-charcoal-800/85">{meta.description}</p>
        </header>

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
          <div className="prose prose-stone max-w-none prose-headings:font-serif">
            <MDXRemote source={post.content} />
          </div>
        )}

        <BlogCta />
      </article>
    </>
  )
}
