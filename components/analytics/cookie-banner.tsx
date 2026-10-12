"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { OPEN_CONSENT_EVENT, hasGlobalPrivacyControl, readConsent, writeConsent } from "@/lib/consent";

/**
 * Opt-in consent banner. Analytics stay off until Accept. Shown on first
 * visit unless the browser sends Global Privacy Control (treated as a
 * decline). Reopened from the footer's "Cookie settings" link.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!readConsent()) {
      if (hasGlobalPrivacyControl()) writeConsent("no");
      else setVisible(true);
    }
    const open = () => setVisible(true);
    window.addEventListener(OPEN_CONSENT_EVENT, open);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, open);
  }, []);

  function choose(value: "yes" | "no") {
    writeConsent(value);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    // Sits above the mobile booking bar on small screens. Non-modal, so it
    // never traps focus or steals keyboard input.
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 border-t border-cream-200 bg-cream-100 shadow-lg md:bottom-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-charcoal-800">
          With your permission we use analytics cookies to understand how the site is used. Nothing is loaded
          until you accept, and you can change your choice anytime under Cookie settings.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-sage-700">
            Privacy policy
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("no")}
            className="min-h-[40px] whitespace-nowrap rounded border border-charcoal-800 px-4 py-2 text-xs text-charcoal-800 transition-colors hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 focus-visible:ring-offset-2"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("yes")}
            className="min-h-[40px] whitespace-nowrap rounded bg-charcoal-800 px-4 py-2 text-xs text-cream-100 transition-colors hover:bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 focus-visible:ring-offset-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent(OPEN_CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  );
}
