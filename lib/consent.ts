/**
 * Tracking consent. Client-only helpers.
 *
 * CONSENT_MODE "opt-out" (launch setting, 2026-10-13): the owner's brief
 * says not to add a consent banner unless the old Wix site had one. Tags load
 * on every page unless the visitor has turned them off under "Your privacy
 * choices" in the footer, or the browser sends Global Privacy Control
 * (honored as an opt-out of sale/sharing under the CPRA).
 *
 * CONSENT_MODE "opt-in": the earlier behavior. A banner asks first and
 * nothing loads until Accept. Switch back to this if the Wix site turns out
 * to have had a cookie banner.
 */
export const CONSENT_MODE: "opt-in" | "opt-out" = "opt-out";

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

/** Whether analytics and ad tags may run for this visitor right now. */
export function trackingAllowed(): boolean {
  if (hasGlobalPrivacyControl()) return false;
  const consent = readConsent();
  return CONSENT_MODE === "opt-out" ? consent !== "no" : consent === "yes";
}
