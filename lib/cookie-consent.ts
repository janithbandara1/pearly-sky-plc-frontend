/** Shared by the cookie banner and the Crisp chat loader — kept framework-agnostic (no React) so both client components can import it without pulling each other in. */

export const COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";
export const COOKIE_CONSENT_EVENT = "cookie-consent-updated";

export type CookieConsentValue = "accepted" | "denied";

export function getStoredCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
  return raw === "accepted" || raw === "denied" ? raw : null;
}

export function setStoredCookieConsent(value: CookieConsentValue) {
  window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, value);
  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
}
