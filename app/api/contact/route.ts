import { NextResponse } from "next/server";
import { z } from "zod";
import { forwardSubmission } from "@/lib/forms";
import { guardFormRequest } from "@/lib/request-guard";

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(200).optional().default(""),
});

export async function POST(request: Request) {
  const guard = await guardFormRequest(request);
  if (!guard.ok) return guard.response;
  const parsed = schema.safeParse(guard.body);
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
