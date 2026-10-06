/**
 * Server-side form forwarding. Each form posts to its own API route, which
 * validates the input and forwards it to an owner-configured destination.
 *
 * TODO(owner): connect each form to a real destination by setting the env var
 * on Vercel (Project > Settings > Environment Variables). Any service that
 * accepts a JSON POST works: a Zapier/Make webhook that adds the lead to
 * MindBody or your email platform, Formspree, etc.
 *   LEAD_CAPTURE_WEBHOOK_URL  first-timer's guide sign-ups
 *   CONTACT_FORM_WEBHOOK_URL  contact page messages
 *
 * Until a destination is set, the route returns 503 and the form tells the
 * visitor it could not send, with the phone number. Nothing is faked.
 */

export type ForwardResult =
  | { ok: true }
  | { ok: false; status: 502 | 503; error: "not_configured" | "upstream_failed" };

export async function forwardSubmission(
  webhookUrl: string | undefined,
  payload: Record<string, unknown>
): Promise<ForwardResult> {
  if (!webhookUrl) return { ok: false, status: 503, error: "not_configured" };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString() }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error(`Form webhook responded ${res.status}`);
      return { ok: false, status: 502, error: "upstream_failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Form webhook failed:", err);
    return { ok: false, status: 502, error: "upstream_failed" };
  }
}
