import { llmsTxt } from '@/lib/llms'

export const revalidate = 3600

export function GET() {
  return new Response(llmsTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
