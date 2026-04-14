import { getAllPosts, getPost } from '@/lib/blog'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'

export async function generateStaticParams() {
  return getAllPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) return {}
  return {
    title: post.meta.title,
    description: post.meta.description,
    keywords: [post.meta.targetKeyword],
  }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug)
  if (!post) notFound()

  // BlogPosting schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.meta.title,
    description: post.meta.description,
    datePublished: post.meta.publishDate,
    author: { '@id': 'https://www.bodiesandpilates.com/#organization' },
    publisher: { '@id': 'https://www.bodiesandpilates.com/#organization' },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <header className="mb-10">
          {post.meta.draft && (
            <span className="bg-taupe-300 text-charcoal-800 text-xs px-2 py-1 rounded">
              Draft
            </span>
          )}
          <h1 className="text-4xl font-serif text-charcoal-900 mt-4 mb-2">
            {post.meta.title}
          </h1>
          <p className="text-taupe-500 text-sm">{post.meta.publishDate}</p>
          <p className="text-charcoal-800 mt-4 text-lg">{post.meta.description}</p>
        </header>
        <div className="prose prose-stone max-w-none">
          {post.meta.draft ? (
            <p className="text-taupe-500 italic">
              This post is coming soon. Check back later!
            </p>
          ) : (
            <MDXRemote source={post.content} />
          )}
        </div>
      </article>
    </>
  )
}
