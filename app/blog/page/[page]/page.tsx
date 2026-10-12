import { notFound, redirect } from 'next/navigation'
import { pageMetadata } from '@/lib/metadata'
import { BlogIndex, blogPageCount } from '@/components/sections/blog-index'

export const revalidate = 3600

export function generateStaticParams() {
  return Array.from({ length: Math.max(0, blogPageCount() - 1) }, (_, i) => ({ page: String(i + 2) }))
}

export function generateMetadata({ params }: { params: { page: string } }) {
  return pageMetadata({
    title: `Pilates Blog, Page ${params.page} | Bodies and Pilates North Hollywood`,
    description: `More reformer Pilates guides from our North Hollywood studio, page ${params.page}. New here? See the $25 intro offer.`,
    path: `/blog/page/${params.page}`,
  })
}

export default function BlogPaginatedPage({ params }: { params: { page: string } }) {
  const page = Number(params.page)
  if (page === 1) redirect('/blog')
  if (!Number.isInteger(page) || page < 2 || page > blogPageCount()) notFound()
  return <BlogIndex page={page} />
}
