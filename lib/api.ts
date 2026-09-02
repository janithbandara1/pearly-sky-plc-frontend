const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/** Builds an absolute API URL — for links the browser navigates to directly (e.g. a PDF download), not for apiFetch calls. */
export function apiUrl(path: string): string {
  return `${API_URL}${path}`;
}

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

interface ApiFetchOptions extends Omit<RequestInit, "body"> {
  accessToken?: string;
  /** Current country (see lib/countries), forwarded as `x-country` so the backend can serve country-specific data. */
  country?: string | null;
  body?: unknown;
  /** Internal — set on the retried request so a second 401 doesn't loop forever. */
  _retried?: boolean;
  
}

type UnauthorizedHandler = () => Promise<string | null>;

let unauthorizedHandler: UnauthorizedHandler | null = null;
let refreshInFlight: Promise<string | null> | null = null;

/**
 * Registered by AuthProvider so a 401 on an authenticated request can silently
 * mint a fresh access token (via the httpOnly refresh-token cookie) instead of
 * leaving the page stuck — access tokens are short-lived and can expire while
 * the user is still browsing a prior page, well before the request that hits
 * checkout/etc. Concurrent 401s share a single in-flight refresh.
 */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

function refreshAccessToken(): Promise<string | null> {
  if (!unauthorizedHandler) return Promise.resolve(null);
  if (!refreshInFlight) {
    refreshInFlight = unauthorizedHandler()
      .catch(() => null)
      .finally(() => {
        refreshInFlight = null;
      });
  }
  return refreshInFlight;
}

/**
 * Thin fetch wrapper for the NestJS API. Always sends credentials so the
 * httpOnly refresh-token cookie (scoped to the backend's own origin) is
 * included on cross-origin requests from the Next.js frontend.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { accessToken, country, headers, body, _retried, ...rest } = options;

  const res = await fetch(`${API_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(country ? { "x-country": country } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json() : null;

  if (!res.ok) {
    if (res.status === 401 && accessToken && !_retried) {
      const freshToken = await refreshAccessToken();
      if (freshToken) {
        return apiFetch<T>(path, { ...options, accessToken: freshToken, _retried: true });
      }
    }
    throw new ApiError(res.status, data?.message ?? res.statusText);
  }

  return data as T;
}
