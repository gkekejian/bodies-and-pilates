import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Search and AI crawlers are welcome: being cited by answer engines
 * (ChatGPT, Claude, Perplexity, Gemini) is a goal for a local studio.
 * Owner decision point: to opt out of AI *training* while staying in AI
 * *search*, change GPTBot, ClaudeBot, Google-Extended, Applebot-Extended,
 * and CCBot to disallow, and keep the search/user agents allowed.
 */
const AI_AGENTS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Google and Apple AI features
  'Google-Extended',
  'Applebot-Extended',
  // Common Crawl (feeds many models)
  'CCBot',
]

export default function robots(): MetadataRoute.Robots {
  const rule = { allow: '/', disallow: ['/api/'] }
  return {
    rules: [{ userAgent: '*', ...rule }, ...AI_AGENTS.map((userAgent) => ({ userAgent, ...rule }))],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
