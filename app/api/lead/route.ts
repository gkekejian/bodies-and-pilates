import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardSubmission } from "@/lib/forms";

const schema = z.object({
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional().default(""),
  source: z.string().trim().max(60).optional().default("unknown"),
  // Honeypot: real visitors never see or fill this field.
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { email, phone, source, website } = parsed.data;
  // Bots that fill the honeypot get a 200 and nothing is forwarded.
  if (website) return NextResponse.json({ ok: true });

  // TODO(owner): set LEAD_CAPTURE_WEBHOOK_URL to connect this form to
  // MindBody or your email platform. See lib/forms.ts.
  const result = await forwardSubmission(process.env.LEAD_CAPTURE_WEBHOOK_URL, {
    type: "first-timers-guide",
    email,
    phone,
    source,
  });

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
