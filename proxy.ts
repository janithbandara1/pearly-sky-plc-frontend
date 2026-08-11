import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CUSTOMER_SESSION_HINT_COOKIE, STAFF_SESSION_HINT_COOKIE } from "@/lib/session-hint";
import {
  COUNTRY_COOKIE_MAX_AGE,
  COUNTRY_COOKIE_NAME,
  COUNTRY_HEADER_NAME,
  isSupportedCountry,
  type CountryCode,
} from "@/lib/countries/config";
import { detectCountryFromHeaders, extractCountryPrefix } from "@/lib/countries/geo";
import {
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_HEADER_NAME,
  isSupportedLanguage,
  type LanguageCode,
} from "@/lib/i18n/config";
import { detectLanguageFromHeaders, extractLanguagePrefix } from "@/lib/i18n/geo";
import { buildLocalePath } from "@/lib/locale";

const CUSTOMER_PROTECTED_PREFIXES = ["/bookings", "/quotations", "/profile", "/addresses"];

// Pages with no CountryProvider/LanguageProvider above them (see their layouts) —
// never candidates for the unprefixed -> /{country}/{language} redirect below.
function isLocaleExcluded(pathname: string): boolean {
  return pathname === "/login" || pathname === "/signup" || pathname.startsWith("/staff");
}

// Optimistic-only: a present hint cookie doesn't guarantee a valid session, and a
// missing one just costs an extra redirect through /login. The authoritative check
// stays client-side (staff dashboard layout for staff; customer routes rely on this
// plus each API call's access-token requirement), since the real session lives in
// an httpOnly cookie on the backend's cross-origin domain that this proxy can never
// read. See lib/session-hint.ts. Runs against the *unprefixed* path so it applies
// the same way whether or not the request carries a /{country}/{language} prefix.
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

type LocaleMatch = { country: CountryCode; language: LanguageCode; rest: string };

// A supported country prefix followed by anything other than a supported language
// prefix (e.g. bare "/fr") is treated as an invalid URL, not auto-completed.
function resolveLocalePrefix(pathname: string): LocaleMatch | "invalid" | null {
  const countryMatch = extractCountryPrefix(pathname);
  if (!countryMatch) return null;

  const languageMatch = extractLanguagePrefix(countryMatch.rest);
  if (!languageMatch) return "invalid";

  return { country: countryMatch.country, language: languageMatch.language, rest: languageMatch.rest };
}

const DEFAULT_COUNTRY: CountryCode = "fr";

// Always resolves — there is no unprefixed "global" site, every request ends up
// under some /{country}/{language}, falling back to DEFAULT_COUNTRY when neither
// the pin cookie nor Cloudflare's geo header identify a supported country.
function resolveCountry(request: NextRequest): CountryCode {
  const cookieValue = request.cookies.get(COUNTRY_COOKIE_NAME)?.value;
  if (isSupportedCountry(cookieValue)) return cookieValue.toLowerCase() as CountryCode;
  return detectCountryFromHeaders(request.headers) ?? DEFAULT_COUNTRY;
}

function resolveLanguage(request: NextRequest): LanguageCode {
  const cookieValue = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  if (isSupportedLanguage(cookieValue)) return cookieValue.toLowerCase() as LanguageCode;
  return detectLanguageFromHeaders(request.headers);
}

function localeCookieOptions(maxAge: number) {
  return { path: "/", maxAge, sameSite: "lax" as const };
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const locale = resolveLocalePrefix(pathname);
  if (locale === "invalid") {
    return new NextResponse(null, { status: 404 });
  }

  const effectivePath = locale ? locale.rest : pathname;

  const authRedirect = resolveAuthRedirect(effectivePath, request);
  if (authRedirect) return authRedirect;

  // Already /{country}/{language}/...: rewrite to the real (unprefixed) route and
  // expose the resolved locale to server components via headers, pinning it in
  // cookies so subsequent unprefixed navigation (internal links are all unprefixed)
  // redirects back into this same locale instead of losing it.
  if (locale) {
    const url = request.nextUrl.clone();
    url.pathname = locale.rest;
    const response = NextResponse.rewrite(url);
    response.headers.set(COUNTRY_HEADER_NAME, locale.country);
    response.headers.set(LANGUAGE_HEADER_NAME, locale.language);
    response.cookies.set(COUNTRY_COOKIE_NAME, locale.country, localeCookieOptions(COUNTRY_COOKIE_MAX_AGE));
    response.cookies.set(LANGUAGE_COOKIE_NAME, locale.language, localeCookieOptions(LANGUAGE_COOKIE_MAX_AGE));
    return response;
  }

  if (isLocaleExcluded(pathname)) {
    return NextResponse.next();
  }

  // No prefix: there is no unprefixed site to serve, so redirect into the resolved
  // /{country}/{language} URL — pin cookie or Cloudflare's geo header if available,
  // otherwise DEFAULT_COUNTRY/"en".
  const country = resolveCountry(request);
  const language = resolveLanguage(request);
  const target = request.nextUrl.clone();
  target.pathname = buildLocalePath(pathname, country, language);
  return NextResponse.redirect(target);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)"],
};
