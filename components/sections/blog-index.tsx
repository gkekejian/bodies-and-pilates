import Link from 'next/link'
import { formatPostDate, getListedPosts } from '@/lib/blog'
import { PageHero } from '@/components/sections/section-heading'
import { BlogCta } from '@/components/sections/blog-cta'
import { MediaPhoto } from '@/components/ui/media'
import { MEDIA } from '@/lib/media'

export const BLOG_PAGE_SIZE = 12

export const blogPageCount = () => Math.max(1, Math.ceil(getListedPosts().length / BLOG_PAGE_SIZE))

/** /blog (page 1) and /blog/page/<n>. Published posts, newest first. */
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
        banner={MEDIA.entryBench}
        tone="dark"
        intro={<p>Practical guides to reformer Pilates from our studio in North Hollywood.</p>}
        media={
          MEDIA.artisticPose && (
            <MediaPhoto
              media={MEDIA.artisticPose}
              eager
              aspectClassName="aspect-[4/5]"
              className="mx-auto max-w-xs lg:max-w-sm"
              sizes="(max-width: 1024px) 80vw, 384px"
            />
          )
        }
      />

      <section className="bg-cream-50 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <ul className="grid gap-px border border-brown-700/25 bg-brown-700/25 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug} className="bg-cream-50">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-cream-100"
                >
                  <span className="smallcaps text-sm text-brown-700">
                    <time dateTime={post.publishDate}>{formatPostDate(post.publishDate)}</time> &middot;{' '}
                    {post.readingMinutes} min read
                  </span>
                  <h2 className="font-serif text-2xl leading-snug text-brown-900 group-hover:text-brown-700">
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
                      ? 'flex h-10 w-10 items-center justify-center bg-brown-700 text-cream-50'
                      : 'flex h-10 w-10 items-center justify-center border border-brown-700/40 text-charcoal-800 hover:border-brown-700'
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
