import { llmsFullTxt } from '@/lib/llms'

// Hourly, so newly published blog posts appear without a redeploy.
export const revalidate = 3600

export function GET() {
  return new Response(llmsFullTxt(), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } })
}
