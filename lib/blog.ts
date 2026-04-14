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
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.mdx'))
  return files
    .map(file => {
      const slug = file.replace('.mdx', '')
      const raw = fs.readFileSync(path.join(postsDirectory, file), 'utf-8')
      const { data } = matter(raw)
      return {
        slug,
        title: data.title ?? '',
        description: data.description ?? '',
        targetKeyword: data.targetKeyword ?? '',
        publishDate: data.publishDate ?? '',
        draft: data.draft ?? true,
      }
    })
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
}

export function getPost(slug: string): { meta: BlogPost; content: string } | null {
  const filePath = path.join(postsDirectory, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    meta: {
      slug,
      title: data.title ?? '',
      description: data.description ?? '',
      targetKeyword: data.targetKeyword ?? '',
      publishDate: data.publishDate ?? '',
      draft: data.draft ?? true,
    },
    content,
  }
}
