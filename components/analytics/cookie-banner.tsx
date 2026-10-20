"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_MODE, OPEN_CONSENT_EVENT, hasGlobalPrivacyControl, readConsent, writeConsent } from "@/lib/consent";

/**
 * Privacy choices panel.
 *
 * opt-out mode (launch): never shown on its own. The footer's "Your privacy
 * choices" link opens it so a visitor can turn the Meta and Google tags off
 * (or back on) for this browser.
 *
 * opt-in mode: shown on first visit, nothing loads until Accept, and Global
 * Privacy Control counts as a decline.
 */
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (CONSENT_MODE === "opt-in" && !readConsent()) {
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
      aria-label={CONSENT_MODE === "opt-out" ? "Your privacy choices" : "Cookie consent"}
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 border-t border-cream-200 bg-cream-100 shadow-lg md:bottom-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-charcoal-800">
          {CONSENT_MODE === "opt-out" ? (
            <>
              We use the Meta Pixel and Google tags to measure visits and our ads. Turn them off for this browser
              here, or send a Global Privacy Control signal and they never load.{" "}
            </>
          ) : (
            <>
              With your permission we use analytics cookies to understand how the site is used. Nothing is loaded
              until you accept, and you can change your choice anytime under Cookie settings.{" "}
            </>
          )}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-brown-700">
            Privacy policy
          </Link>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose("no")}
            className="min-h-[40px] whitespace-nowrap rounded-none border border-charcoal-800 px-4 py-2 text-xs text-charcoal-800 transition-colors hover:bg-cream-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 focus-visible:ring-offset-2"
          >
            {CONSENT_MODE === "opt-out" ? "Turn off" : "Decline"}
          </button>
          <button
            type="button"
            onClick={() => choose("yes")}
            className="min-h-[40px] whitespace-nowrap rounded-none bg-charcoal-800 px-4 py-2 text-xs text-cream-100 transition-colors hover:bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 focus-visible:ring-offset-2"
          >
            {CONSENT_MODE === "opt-out" ? "Allow" : "Accept"}
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
      {CONSENT_MODE === "opt-out" ? "Your privacy choices" : "Cookie settings"}
    </button>
  );
}
