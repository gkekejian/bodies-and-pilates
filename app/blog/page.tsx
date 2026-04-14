import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Pilates Blog | Tips, Guides & Insights',
  description:
    'Explore our Pilates blog for expert tips, guides, and insights on reformer Pilates, flexibility, back pain, pregnancy, and more.',
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.bodiesandpilates.com/',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://www.bodiesandpilates.com/blog',
    },
  ],
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="bg-cream-50 min-h-screen py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-serif text-charcoal-800 mb-4">
              Pilates Blog
            </h1>
            <p className="text-charcoal-800 max-w-2xl mx-auto font-sans">
              Expert tips, guides, and insights on reformer Pilates, flexibility,
              back pain, pregnancy, and more.
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block bg-cream-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-block bg-sage-700 text-cream-50 text-xs font-sans px-2 py-1 rounded-full">
                    {post.targetKeyword}
                  </span>
                  {post.draft && (
                    <span className="inline-block bg-charcoal-800 text-cream-50 text-xs font-sans px-2 py-1 rounded-full ml-2">
                      Coming Soon
                    </span>
                  )}
                </div>

                <h2 className="text-lg font-serif text-charcoal-800 mb-2 group-hover:text-sage-700 transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="text-charcoal-800 font-sans text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>

                {!post.draft && post.publishDate && (
                  <p className="text-charcoal-800 font-sans text-xs opacity-60">
                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
