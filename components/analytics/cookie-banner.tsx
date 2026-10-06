"use client";

import { useState, useEffect } from "react";

const COOKIE_NAME = "bp_analytics_consent";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year in seconds

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? match.split("=")[1] : undefined;
}

function setCookie(name: string, value: string, maxAge: number) {
  document.cookie = `${name}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookie(COOKIE_NAME, "yes", COOKIE_MAX_AGE);
    setVisible(false);
  }

  function handleDecline() {
    setCookie(COOKIE_NAME, "no", COOKIE_MAX_AGE);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    // Sits above the mobile booking bar on small screens.
    <div
      className="fixed inset-x-0 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-50 border-t border-cream-200 bg-cream-100 shadow-lg md:bottom-0"
      role="region"
      aria-label="Cookie consent"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="max-w-2xl text-xs leading-relaxed text-charcoal-800">
          We use cookies to improve your experience and for analytics.
          California residents may opt out of the sale of personal
          information.{" "}
          <button
            onClick={handleDecline}
            className="underline underline-offset-2 transition-colors hover:text-sage-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800"
          >
            Do Not Sell or Share My Personal Information
          </button>
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={handleDecline}
            className="whitespace-nowrap text-xs text-charcoal-800 underline underline-offset-2 transition-colors hover:text-sage-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="whitespace-nowrap rounded bg-charcoal-800 px-4 py-2 text-xs text-cream-100 transition-colors hover:bg-charcoal-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 focus-visible:ring-offset-2"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
