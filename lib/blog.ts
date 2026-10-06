import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  targetKeyword: string
  publishDate: string
  draft: boolean
  outline: string[]
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

function toMeta(slug: string, data: Record<string, unknown>): BlogPost {
  return {
    slug,
    title: (data.title as string) ?? '',
    description: (data.description as string) ?? '',
    targetKeyword: (data.targetKeyword as string) ?? '',
    publishDate: (data.publishDate as string) ?? '',
    draft: (data.draft as boolean) ?? true,
    outline: Array.isArray(data.outline) ? (data.outline as string[]) : [],
  }
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8')
      return toMeta(slug, matter(raw).data)
    })
    .sort((a, b) => {
      // Published posts first (newest first), then drafts alphabetically.
      if (a.draft !== b.draft) return a.draft ? 1 : -1
      if (a.publishDate && b.publishDate) {
        return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      }
      return a.title.localeCompare(b.title)
    })
}

export function getPost(slug: string): { meta: BlogPost; content: string } | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return { meta: toMeta(slug, data), content }
}
