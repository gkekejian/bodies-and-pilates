import Link from 'next/link'
import { formatPostDate, getListedPosts } from '@/lib/blog'
import { PageHero } from '@/components/sections/section-heading'
import { BlogCta } from '@/components/sections/blog-cta'

export const BLOG_PAGE_SIZE = 12

export const blogPageCount = () => Math.max(1, Math.ceil(getListedPosts().length / BLOG_PAGE_SIZE))

/** /blog (page 1) and /blog/page/<n>. Published posts newest first, then outline drafts. */
export function BlogIndex({ page }: { page: number }) {
  const all = getListedPosts()
  const pages = Math.max(1, Math.ceil(all.length / BLOG_PAGE_SIZE))
  const posts = all.slice((page - 1) * BLOG_PAGE_SIZE, page * BLOG_PAGE_SIZE)
  const href = (n: number) => (n === 1 ? '/blog' : `/blog/page/${n}`)

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Pilates Blog"
        intro={<p>Practical guides to reformer Pilates from our studio in North Hollywood.</p>}
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-px border border-taupe-300/70 bg-taupe-300/70 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="bg-cream-50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-cream-100"
                >
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-sage-700">
                    {post.draft ? (
                      'Coming soon'
                    ) : (
                      <>
                        <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time> &middot;{' '}
                        {post.readingMinutes} min read
                      </>
                    )}
                  </span>
                  <h2 className="font-serif text-xl leading-snug text-charcoal-900 group-hover:text-sage-700">
                    {post.title}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-charcoal-800/80">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>

          {pages > 1 && (
            <nav aria-label="Blog pages" className="mt-10 flex flex-wrap items-center justify-center gap-2 font-sans text-sm">
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={href(n)}
                  aria-current={n === page ? 'page' : undefined}
                  className={
                    n === page
                      ? 'flex h-10 w-10 items-center justify-center rounded-full bg-sage-700 text-cream-50'
                      : 'flex h-10 w-10 items-center justify-center rounded-full border border-taupe-300 text-charcoal-800 hover:border-sage-700'
                  }
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}

          <div className="mx-auto max-w-3xl">
            <BlogCta />
          </div>
        </div>
      </section>
    </>
  )
}
