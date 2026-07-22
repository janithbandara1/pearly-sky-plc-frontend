import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  COUNTRY_COOKIE_MAX_AGE,
  COUNTRY_COOKIE_NAME,
  COUNTRY_HEADER_NAME,
  isSupportedCountry,
  type CountryCode,
} from "@/lib/countries/config";
import { detectCountryFromHeaders, extractCountryPrefix } from "@/lib/countries/geo";
import { isKnownBot } from "@/lib/countries/bots";
import {
  LANGUAGE_COOKIE_MAX_AGE,
  LANGUAGE_COOKIE_NAME,
  LANGUAGE_HEADER_NAME,
  isSupportedLanguage,
  type LanguageCode,
} from "@/lib/i18n/config";
import { detectLanguageFromHeaders, extractLanguagePrefix } from "@/lib/i18n/geo";
import { buildLocalePath } from "@/lib/locale";

/** Cookie language if valid, else Accept-Language — language always resolves to something. */
function resolveLanguage(request: NextRequest): { language: LanguageCode; fromCookie: boolean } {
  const cookieLanguage = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value;
  if (isSupportedLanguage(cookieLanguage)) {
    return { language: cookieLanguage, fromCookie: true };
  }
  return { language: detectLanguageFromHeaders(request.headers), fromCookie: false };
}

function redirectWithLocale(request: NextRequest, pathname: string, country: CountryCode) {
  const { language, fromCookie } = resolveLanguage(request);

  const url = request.nextUrl.clone();
  url.pathname = buildLocalePath(pathname, country, language);

  const response = NextResponse.redirect(url, 307);
  if (!fromCookie) {
    response.cookies.set(LANGUAGE_COOKIE_NAME, language, {
      maxAge: LANGUAGE_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }
  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Crawlers get every country/language version of a URL verbatim (no
  // redirect, no rewrite short-circuit) so each can be indexed independently.
  if (isKnownBot(request.headers.get("user-agent"))) {
    return NextResponse.next();
  }

  const countryPrefixed = extractCountryPrefix(pathname);

  if (countryPrefixed) {
    const languagePrefixed = extractLanguagePrefix(countryPrefixed.rest);

    if (languagePrefixed) {
      // Already on a fully-prefixed /country/language URL (link, switcher,
      // or bot). Serve it via an internal rewrite — no matter what the
      // cookies currently say. Visiting a prefixed path is never overridden
      // here, and the cookies are left untouched (only geo/Accept-Language
      // detection below and the switchers write them).
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(COUNTRY_HEADER_NAME, countryPrefixed.country);
      requestHeaders.set(LANGUAGE_HEADER_NAME, languagePrefixed.language);

      const url = request.nextUrl.clone();
      url.pathname = languagePrefixed.rest;

      return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
    }

    // Country prefix present but no language segment yet — insert one
    // (cookie, else Accept-Language) and redirect.
    return redirectWithLocale(request, countryPrefixed.rest, countryPrefixed.country);
  }

  // --- Unprefixed path: cookie-vs-geo precedence for country ---
  //
  // The cookie ALWAYS wins over geo when both are available:
  //   1. If a valid country cookie exists, redirect using it (plus a
  //      resolved language) and stop — geo detection is not even
  //      consulted. This is what makes the geo-redirect a one-time event
  //      per visitor: once they've been routed once (or picked a country
  //      via the switcher), every later visit is driven by the cookie,
  //      even if they travel and their IP's country changes.
  //   2. Only when there is NO cookie do we fall back to geo detection
  //      (Cloudflare's `cf-ipcountry` header). A successful geo redirect
  //      also SETS the cookie, so step 1 takes over on the very next
  //      request — this is the "first-time visitor" path.
  //   3. If neither the cookie nor geo detection resolve to a supported
  //      country, do nothing: stay on the global/default site (with no
  //      language segment either, since there's no country to pair it
  //      with). We only ever redirect on a confident match, never on a
  //      guess.
  const cookieCountry = request.cookies.get(COUNTRY_COOKIE_NAME)?.value;

  if (isSupportedCountry(cookieCountry)) {
    return redirectWithLocale(request, pathname, cookieCountry);
  }

  const detected = detectCountryFromHeaders(request.headers);

  if (detected) {
    const response = redirectWithLocale(request, pathname, detected);
    response.cookies.set(COUNTRY_COOKIE_NAME, detected, {
      maxAge: COUNTRY_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip API routes, admin/auth (internal, not geo-targeted), Next
    // internals, and any path with a file extension (static assets,
    // sitemap.xml, robots.txt, favicon.ico, etc).
    "/((?!api|admin|login|signup|_next/static|_next/image|.*\\..*).*)",
  ],
};
