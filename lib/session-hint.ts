/**
 * Lightweight, same-origin, non-sensitive cookies that let proxy.ts do an
 * optimistic "is a session plausible" redirect before a protected page even
 * renders. The real session lives in an httpOnly refresh-token cookie on the
 * backend's own (cross-origin) domain, which proxy.ts can never see — these
 * hints are set/cleared by the frontend itself alongside that real session.
 *
 * Never the security boundary: a stale/missing hint just costs an extra
 * redirect through /login. On the staff side, the dashboard layout's
 * client-side auth check still enforces the real session; on the customer
 * side, this hint plus each API call's access-token requirement is the only
 * gating — customer pages are expected to handle a missing accessToken
 * gracefully rather than assume CustomerHeader has already gated them.
 */
export const CUSTOMER_SESSION_HINT_COOKIE = "customer_session_hint";
export const STAFF_SESSION_HINT_COOKIE = "staff_session_hint";

const MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // mirrors the backend refresh-token cookie's lifetime

export function setSessionHintCookie(name: string): void {
  document.cookie = `${name}=1; path=/; max-age=${MAX_AGE_SECONDS}; samesite=lax`;
}

export function clearSessionHintCookie(name: string): void {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}

export function hasSessionHintCookie(name: string): boolean {
  return document.cookie.split("; ").some((entry) => entry.startsWith(`${name}=`));
}
