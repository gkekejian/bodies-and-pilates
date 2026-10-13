"use client";

import { useEffect, useRef, useState } from "react";
import loadMBody from "@/lib/mindbody-loader";
import { MINDBODY } from "@/lib/site";

// Custom element from healcode.js, cast to avoid JSX namespace errors.
const HealcodeWidget = "healcode-widget" as unknown as React.FC<Record<string, string>>;

/**
 * MindBody "Login | Register" account link (HealCode account-link widget).
 * healcode.js is heavy, so it loads only when the footer scrolls near view,
 * keeping it off the critical path for PageSpeed.
 */
export function MindbodyAccountLink({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          observer.disconnect();
          loadMBody(() => setReady(true));
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={ref} className={className}>
      {ready && (
        <HealcodeWidget
          data-version="0.2"
          data-link-class="loginRegister"
          data-site-id={MINDBODY.accountLinkSiteId}
          data-mb-site-id={MINDBODY.siteId}
          data-bw-identity-site="true"
          data-type="account-link"
          data-inner-html="Login | Register"
        />
      )}
    </span>
  );
}
