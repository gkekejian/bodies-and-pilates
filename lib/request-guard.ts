import { NextResponse } from "next/server";

/**
 * Shared checks for the public form endpoints (/api/lead, /api/contact).
 * Returns a ready-to-send error response, or the parsed JSON body.
 *
 * - Same-origin only: a browser POST from another site is refused.
 * - JSON only, capped at MAX_BYTES, so a large body cannot tie up the function.
 * - Best-effort rate limit per IP. Serverless instances do not share memory,
 *   so this slows a flood from one client rather than guaranteeing a global
 *   cap. For a hard limit, put Vercel Firewall rate limiting on /api/*.
 */

const MAX_BYTES = 16 * 1024;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, number[]>();

function clientIp(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const fail = (error: string, status: number) => ({ ok: false as const, response: NextResponse.json({ error }, { status }) });

export async function guardFormRequest(
  request: Request
): Promise<{ ok: true; body: unknown } | { ok: false; response: NextResponse }> {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (origin) {
    let originHost = "";
    try {
      originHost = new URL(origin).host;
    } catch {
      return fail("forbidden", 403);
    }
    if (!host || originHost !== host) return fail("forbidden", 403);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return fail("unsupported_media_type", 415);
  }

  const declared = Number(request.headers.get("content-length") ?? "0");
  if (declared > MAX_BYTES) return fail("too_large", 413);

  if (rateLimited(clientIp(request))) return fail("rate_limited", 429);

  const text = await request.text().catch(() => "");
  if (text.length > MAX_BYTES) return fail("too_large", 413);

  try {
    return { ok: true, body: JSON.parse(text) };
  } catch {
    return fail("invalid", 400);
  }
}
