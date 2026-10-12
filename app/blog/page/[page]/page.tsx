import { notFound, redirect } from 'next/navigation'
import { pageMetadata } from '@/lib/metadata'
import { breadcrumbSchema, jsonLd } from '@/lib/schema'
import { BlogIndex, blogPageCount } from '@/components/sections/blog-index'

export const revalidate = 3600

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, blogPageCount() - 1) }, (_, i) => ({ page: String(i + 2) }))
}

export async function generateMetadata(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  return pageMetadata({
    title: `Pilates Blog, Page ${params.page} | Bodies and Pilates North Hollywood`,
    description: `More reformer Pilates guides from our North Hollywood studio, page ${params.page}. New here? See the $25 intro offer.`,
    path: `/blog/page/${params.page}`,
  })
}

export default async function BlogPaginatedPage(props: { params: Promise<{ page: string }> }) {
  const params = await props.params
  const page = Number(params.page)
  if (page === 1) redirect('/blog')
  if (!Number.isInteger(page) || page < 2 || page > blogPageCount()) notFound()
  const breadcrumb = breadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: `Page ${page}`, path: `/blog/page/${page}` },
  ])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumb) }} />
      <BlogIndex page={page} />
    </>
  )
}
