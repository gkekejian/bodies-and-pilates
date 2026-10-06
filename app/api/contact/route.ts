import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardSubmission } from "@/lib/forms";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const { name, email, message, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true });

  // TODO(owner): set CONTACT_FORM_WEBHOOK_URL to deliver these messages
  // (e.g. to the studio inbox). See lib/forms.ts.
  const result = await forwardSubmission(process.env.CONTACT_FORM_WEBHOOK_URL, {
    type: "contact",
    name,
    email,
    message,
  });

  if (!result.ok) return NextResponse.json({ error: result.error }, { status: result.status });
  return NextResponse.json({ ok: true });
}
