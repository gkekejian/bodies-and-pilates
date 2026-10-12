"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import { CONSENT_EVENT, hasGlobalPrivacyControl, readConsent } from "@/lib/consent";

/**
 * GA4 and Meta Pixel, loaded only after explicit opt-in (cookie banner
 * "Accept") and never when the browser sends Global Privacy Control.
 * Nothing is requested from Google or Meta before consent.
 */
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pixelId = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const update = () => setAllowed(readConsent() === "yes" && !hasGlobalPrivacyControl());
    update();
    window.addEventListener(CONSENT_EVENT, update);
    return () => window.removeEventListener(CONSENT_EVENT, update);
  }, []);

  // Withdrawing consent stops new loads; reload so already-running tags stop too.
  useEffect(() => {
    const onChange = (e: Event) => {
      if ((e as CustomEvent).detail === "no" && (window as Window & { gtag?: unknown; fbq?: unknown }).gtag) {
        window.location.reload();
      }
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!allowed) return null;

  return (
    <>
      {gaId && <GoogleAnalytics gaId={gaId} />}

      {pixelId && (
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');
            `,
          }}
        />
      )}
    </>
  );
}
