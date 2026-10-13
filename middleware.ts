import { NextResponse, type NextRequest } from "next/server";

/**
 * URL normalization with 301s:
 *  - uppercase paths to lowercase (/Pricing to /pricing). Next's config
 *    redirects match case-insensitively, so this cannot live in
 *    next.config.mjs without looping.
 *  - trailing slashes stripped (/pricing/ to /pricing). next.config.mjs sets
 *    skipTrailingSlashRedirect so Next does not 308 first.
 */
export function middleware(request: NextRequest) {
  // Plain URL, not request.nextUrl: NextURL re-appends the original trailing
  // slash when serialized.
  const url = new URL(request.url);
  const { pathname } = url;
  let normalized = pathname.toLowerCase();
  if (normalized.length > 1 && normalized.endsWith("/")) normalized = normalized.replace(/\/+$/, "") || "/";
  if (normalized === pathname) return NextResponse.next();

  url.pathname = normalized;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Skip framework assets, API routes, and files with an extension.
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
