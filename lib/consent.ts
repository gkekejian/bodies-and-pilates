/**
 * Analytics consent (opt-in). No analytics or ad pixels load until the
 * visitor clicks Accept. A Global Privacy Control signal (CPRA) counts as a
 * decline. Client-only helpers.
 */

export const CONSENT_COOKIE = "bp_analytics_consent";
export const CONSENT_EVENT = "bp:consent-change";
export const OPEN_CONSENT_EVENT = "bp:open-consent";
const MAX_AGE = 60 * 60 * 24 * 365;

export type Consent = "yes" | "no" | undefined;

export function readConsent(): Consent {
  if (typeof document === "undefined") return undefined;
  const value = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE}=`))
    ?.split("=")[1];
  return value === "yes" || value === "no" ? value : undefined;
}

export function writeConsent(value: "yes" | "no") {
  document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${MAX_AGE}; path=/; SameSite=Lax; Secure`;
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

/** Browser-level opt-out (Global Privacy Control). */
export function hasGlobalPrivacyControl(): boolean {
  return typeof navigator !== "undefined" && (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}
