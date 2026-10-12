import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/schema'
import { BlogIndex } from '@/components/sections/blog-index'

// Regenerate hourly so scheduled posts appear on their publish date.
export const revalidate = 3600

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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <BlogIndex page={1} />
    </>
  )
}
