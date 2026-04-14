"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="cookie-banner"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-cream-100 border-t border-cream-200 shadow-lg"
          role="region"
          aria-label="Cookie consent"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-charcoal-800 leading-relaxed max-w-2xl">
              We use cookies to improve your experience and for analytics.
              California residents may opt out of the sale of personal
              information.{" "}
              <button
                onClick={handleDecline}
                className="underline underline-offset-2 hover:text-charcoal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800"
              >
                Do Not Sell or Share My Personal Information
              </button>
            </p>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleDecline}
                className="text-xs text-charcoal-800 underline underline-offset-2 hover:text-charcoal-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-800 whitespace-nowrap"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="text-xs bg-charcoal-800 text-cream-100 px-4 py-2 rounded hover:bg-charcoal-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-charcoal-800 whitespace-nowrap"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
