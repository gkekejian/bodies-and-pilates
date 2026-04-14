"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_THRESHOLD = 400;

export function MobileBookingBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    // Check initial scroll position (e.g. after back-navigation)
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="mobile-booking-bar"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
        >
          {/* Safe-area padding for iOS home indicator */}
          <div className="bg-sage-700 px-4 pb-[env(safe-area-inset-bottom)] pt-3">
            <Link
              href="/pricing"
              className="flex w-full items-center justify-center rounded-lg bg-cream-50 py-3.5 font-sans text-sm font-semibold text-sage-700 transition-colors hover:bg-cream-100 active:bg-cream-200"
            >
              Book a Class
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
