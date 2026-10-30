import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CUSTOMER_SESSION_HINT_COOKIE, STAFF_SESSION_HINT_COOKIE } from "@/lib/session-hint";
import { CURRENT_COUNTRY_LANGUAGES, IS_GLOBAL_SITE, isLanguageSupportedHere } from "@/lib/countries/config";
import {
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_HEADER_NAME,
  type LanguageCode,
} from "@/lib/i18n/config";
import { detectLanguageFromHeaders } from "@/lib/i18n/geo";
import { buildLocalePath, extractLocalePrefix, isLocaleExcluded } from "@/lib/locale";

const CUSTOMER_PROTECTED_PREFIXES = ["/bookings", "/quotations", "/profile", "/addresses"];

// The global gateway (IS_GLOBAL_SITE) only takes quotation requests — no
// bookings, no pricing, no customer accounts — so anything that would need
// one (services/*, login/signup, bookings/quotations/profile) is blocked.
// The marketing site (nav pages + legal pages) stays reachable, as do the
// request-quotation page its Book Now buttons open plus its confirmation
// page, and /staff, where the team manages the gateway's quotations (see
// lib/staff-sections.ts). Checked against the *unprefixed* path; the
// prefixes below include their detail pages too.
const GLOBAL_SITE_ALLOWED_EXACT_PATHS = [
  "/",
  "/about-us",
  "/our-locations",
  "/contact-us",
  "/our-services",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
  "/request-quotation",
];
const GLOBAL_SITE_ALLOWED_PREFIXES = ["/blog", "/careers", "/staff", "/quotation-confirmation"];

// The reverse: pages that exist only on the global gateway. The country
// sites list their services in the header's services menu instead.
const GLOBAL_SITE_ONLY_PATHS = ["/our-services"];

function isGlobalSiteAllowedPath(pathname: string): boolean {
  if (GLOBAL_SITE_ALLOWED_EXACT_PATHS.includes(pathname)) return true;
  return GLOBAL_SITE_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

// Optimistic-only: a present hint cookie doesn't guarantee a valid session, and a
// missing one just costs an extra redirect through /login. The authoritative check
// stays client-side (staff dashboard layout for staff; customer routes rely on this
// plus each API call's access-token requirement), since the real session lives in
// an httpOnly cookie on the backend's cross-origin domain that this proxy can never
// read. See lib/session-hint.ts. Runs against the *unprefixed* path so it applies
// the same way whether or not the request carries a /{language} prefix.
function resolveAuthRedirect(pathname: string, request: NextRequest): NextResponse | null {
  if (pathname.startsWith("/staff")) {
    if (pathname === "/staff/login") return null;
    if (!request.cookies.get(STAFF_SESSION_HINT_COOKIE)) {
      return NextResponse.redirect(new URL("/staff/login", request.url));
    }
    return null;
  }

  if (CUSTOMER_PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    if (!request.cookies.get(CUSTOMER_SESSION_HINT_COOKIE)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return null;
}

// Clamped to whatever this deployment actually offers (CURRENT_COUNTRY_LANGUAGES
// — just "en" on the global gateway) — sniffing the browser's language only
// matters for France (the one country with a choice); everyone else always
// resolves to English.
function resolveLanguage(request: NextRequest): LanguageCode {
  const cookieValue = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  if (isLanguageSupportedHere(cookieValue)) return cookieValue.toLowerCase() as LanguageCode;

  const detected = detectLanguageFromHeaders(request.headers);
  return isLanguageSupportedHere(detected) ? detected : CURRENT_COUNTRY_LANGUAGES[0];
}

function localeCookieOptions(maxAge: number) {
  return { path: "/", maxAge, sameSite: "lax" as const };
}

// Each deployment's canonical origin is the bare apex (NEXT_PUBLIC_SITE_URL,
// backend FRONTEND_URL). Served as-is on "www.", the page's browser-side API
// calls are cross-origin to a host the backend's CORS list doesn't include,
// so pricing/auth/checkout all fail — and the session-hint cookies and
// language cookie live on a different host too. Permanently redirect instead
// so there's only ever one origin. Host comes from the headers (Nginx passes
// the public one through) rather than request.nextUrl, which reflects the
// internal upstream address behind the proxy.
function resolveWwwRedirect(request: NextRequest): NextResponse | null {
  const host = (request.headers.get("x-forwarded-host") ?? request.headers.get("host"))?.split(",")[0].trim();
  if (!host?.toLowerCase().startsWith("www.")) return null;
  const { pathname, search } = request.nextUrl;
  return NextResponse.redirect(`https://${host.slice(4)}${pathname}${search}`, 308);
}

export function proxy(request: NextRequest) {
  const wwwRedirect = resolveWwwRedirect(request);
  if (wwwRedirect) return wwwRedirect;

  const { pathname } = request.nextUrl;

  const locale = extractLocalePrefix(pathname);
  if (locale === "invalid") {
    return new NextResponse(null, { status: 404 });
  }

  const effectivePath = locale ? locale.rest : pathname;

  if (
    IS_GLOBAL_SITE
      ? !isGlobalSiteAllowedPath(effectivePath)
      : GLOBAL_SITE_ONLY_PATHS.includes(effectivePath)
  ) {
    const target = request.nextUrl.clone();
    target.pathname = buildLocalePath("/", locale?.language ?? resolveLanguage(request));
    return NextResponse.redirect(target, 308);
  }

  const authRedirect = resolveAuthRedirect(effectivePath, request);
  if (authRedirect) return authRedirect;

  // Already /{language}/...: rewrite to the real (unprefixed) route and
  // expose the resolved language to server components via a header,
  // pinning it in a cookie so subsequent unprefixed navigation (internal
  // links are all unprefixed) redirects back into this same language.
  if (locale) {
    const url = request.nextUrl.clone();
    url.pathname = locale.rest;
    const response = NextResponse.rewrite(url);
    response.headers.set(LANGUAGE_HEADER_NAME, locale.language);
    response.cookies.set(LANGUAGE_COOKIE_NAME, locale.language, localeCookieOptions(LANGUAGE_COOKIE_MAX_AGE));
    return response;
  }

  if (isLocaleExcluded(pathname)) {
    return NextResponse.next();
  }

  // No prefix: there is no unprefixed site to serve, so redirect into the
  // resolved /{language} URL — pin cookie if available, otherwise
  // Accept-Language, otherwise this deployment's default language.
  // Permanent (308) so search engines consolidate ranking signals onto the
  // language URL instead of keeping the bare root indexed as its own page.
  const language = resolveLanguage(request);
  const target = request.nextUrl.clone();
  target.pathname = buildLocalePath(pathname, language);
  return NextResponse.redirect(target, 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};
