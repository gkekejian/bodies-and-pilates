"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { CONSENT_EVENT, trackingAllowed } from "@/lib/consent";
import {
  GA_ID,
  GOOGLE_ADS_ID,
  META_PIXEL_ID,
  captureUtm,
  isBookingUrl,
  isViewContentPath,
  trackBookingStart,
  trackPageView,
  trackViewContent,
  withUtm,
} from "@/lib/tracking";

type Win = Window & { fbq?: ((...a: unknown[]) => void) & Record<string, unknown>; _fbq?: unknown; dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

/** Meta's standard base code, run once, without the inline PageView (fired per route below). */
function ensurePixel() {
  const win = window as Win;
  if (win.fbq) return;
  /* eslint-disable */
  // prettier-ignore
  (function(f: any,b: Document,e: string,v: string){let n: any,t: HTMLScriptElement,s: Element;if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e) as HTMLScriptElement;t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode!.insertBefore(t,s)})(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
  /* eslint-enable */
  win.fbq!("init", META_PIXEL_ID);
}

/** Google tag (gtag.js) for whichever IDs are configured. */
function ensureGtag() {
  const win = window as Win;
  const first = GA_ID || GOOGLE_ADS_ID;
  if (!first || win.gtag) return;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer!.push(arguments);
  };
  win.gtag("js", new Date());
  if (GA_ID) win.gtag("config", GA_ID);
  if (GOOGLE_ADS_ID) win.gtag("config", GOOGLE_ADS_ID);
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${first}`;
  document.head.appendChild(s);
}

/**
 * Site-wide tracking. Tags load unless the visitor opted out or sends Global
 * Privacy Control (lib/consent.ts). Campaign tags (utm_*) are carried onto
 * Mindbody booking links for every visitor; they are not personal data.
 */
export default function Analytics() {
  const pathname = usePathname();
  const [allowed, setAllowed] = useState(false);
  const allowedRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const next = trackingAllowed();
      // Turning tracking off stops new loads; reload so running tags stop too.
      if (allowedRef.current && !next) window.location.reload();
      allowedRef.current = next;
      setAllowed(next);
    };
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  // PageView on every page, including client-side navigations; ViewContent on
  // the offer, pricing, and class pages. GA4 records its own page views.
  useEffect(() => {
    captureUtm(window.location.search);
    if (!allowed) return;
    ensurePixel();
    ensureGtag();
    trackPageView();
    if (isViewContentPath(pathname)) trackViewContent(pathname);
  }, [allowed, pathname]);

  // One handler for every booking start: direct Mindbody product links and
  // any Book button the schedule widget renders into the page.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target?.closest) return;
      const control = target.closest("a[href], button");
      if (!control) return;
      const label = (control.textContent || "").replace(/\s+/g, " ").trim();

      if (control instanceof HTMLAnchorElement) {
        let url: URL;
        try {
          url = new URL(control.href, window.location.href);
        } catch {
          return;
        }
        if (!isBookingUrl(url)) return;
        const href = withUtm(url).toString();
        if (href !== control.href) control.href = href;
        if (!allowedRef.current) return;
        trackBookingStart(label || "Mindbody booking", href);
        // Same-tab left click: give the beacons a moment before leaving.
        const plain = e.type === "click" && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;
        if (plain && control.target !== "_blank" && !e.defaultPrevented) {
          e.preventDefault();
          window.setTimeout(() => window.location.assign(href), 200);
        }
        return;
      }

      // Schedule widget buttons rendered in the page (not inside an iframe).
      if (allowedRef.current && control.closest(".mindbody-widget") && /\b(book|sign up|reserve)\b/i.test(label)) {
        trackBookingStart(`Schedule widget: ${label}`, window.location.href);
      }
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  return null;
}
