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
import { buildLocalePath, extractLocalePrefix } from "@/lib/locale";

const CUSTOMER_PROTECTED_PREFIXES = ["/bookings", "/quotations", "/profile", "/addresses"];

// The global gateway (IS_GLOBAL_SITE) has no backend behind it at all — no
// catalog, no bookings, no accounts — so anything that would need one
// (services/*, login/signup, bookings/quotations/profile, staff) is
// blocked. The rest of the marketing site (nav pages + legal pages) is
// content-only (static data, no API calls — see app/(site)/blog/[slug] and
// app/(site)/careers/[jobId]) and stays reachable. Checked against the
// *unprefixed* path; "/blog" and "/careers" are prefixes so their
// [slug]/[jobId] detail pages are included too.
const GLOBAL_SITE_ALLOWED_EXACT_PATHS = [
  "/",
  "/about-us",
  "/our-customers",
  "/our-locations",
  "/contact-us",
  "/our-services",
  "/privacy-policy",
  "/terms-and-conditions",
  "/cookie-policy",
];
const GLOBAL_SITE_ALLOWED_PREFIXES = ["/blog", "/careers"];

function isGlobalSiteAllowedPath(pathname: string): boolean {
  if (GLOBAL_SITE_ALLOWED_EXACT_PATHS.includes(pathname)) return true;
  return GLOBAL_SITE_ALLOWED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

// Pages with no LanguageProvider above them (see their layouts) — never
// candidates for the unprefixed -> /{language} redirect below.
function isLocaleExcluded(pathname: string): boolean {
  return pathname === "/login" || pathname === "/signup" || pathname.startsWith("/staff");
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = extractLocalePrefix(pathname);
  if (locale === "invalid") {
    return new NextResponse(null, { status: 404 });
  }

  const effectivePath = locale ? locale.rest : pathname;

  if (IS_GLOBAL_SITE && !isGlobalSiteAllowedPath(effectivePath)) {
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
