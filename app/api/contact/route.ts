import { NextResponse } from 'next/server'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  message: z.string().min(10).max(5000),
})

const CONTACT_TO = process.env.CONTACT_EMAIL_TO ?? 'Naira@bodiesandpilates.com'
const CONTACT_FROM =
  process.env.CONTACT_EMAIL_FROM ?? 'website@bodiesandpilates.com'

// Naive in-memory rate limit — resets on cold start, which is fine for a
// low-volume contact form; it only needs to stop bursts from one client.
const hits = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = hits.get(ip)
  if (!entry || now - entry.windowStart > WINDOW_MS) {
    hits.set(ip, { count: 1, windowStart: now })
    return false
  }
  entry.count += 1
  return entry.count > MAX_PER_WINDOW
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Contact form is not configured' },
      { status: 503 }
    )
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages. Please try again later.' },
      { status: 429 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const { name, email, message } = parsed.data

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: `Bodies and Pilates Website <${CONTACT_FROM}>`,
      to: [CONTACT_TO],
      reply_to: email,
      subject: `Website inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    }),
  })

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text())
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 502 }
    )
  }

  return NextResponse.json({ ok: true })
}
