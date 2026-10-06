import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema } from '@/lib/schema'
import { PageHero } from '@/components/sections/section-heading'
import { BlogCta } from '@/components/sections/blog-cta'

export const metadata = pageMetadata({
  title: 'Pilates Blog | Bodies and Pilates North Hollywood',
  description:
    'Reformer Pilates guides from our North Hollywood studio: pricing, what to wear, back pain, and your first class. New here? See the $25 intro offer.',
  path: '/blog',
})

const breadcrumb = breadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
])

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

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
                <Link href={`/blog/${post.slug}`} className="group flex h-full flex-col gap-3 p-7 transition-colors hover:bg-cream-100">
                  <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-sage-700">
                    {post.draft ? 'Coming soon' : post.targetKeyword}
                  </span>
                  <h2 className="font-serif text-xl leading-snug text-charcoal-900 group-hover:text-sage-700">{post.title}</h2>
                  <p className="font-sans text-sm leading-relaxed text-charcoal-800/80">{post.description}</p>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mx-auto max-w-3xl">
            <BlogCta />
          </div>
        </div>
      </section>
    </>
  )
}
