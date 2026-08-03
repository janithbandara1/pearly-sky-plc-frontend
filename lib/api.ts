const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3011";

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
}

/**
 * Thin fetch wrapper for the NestJS API. Always sends credentials so the
 * httpOnly refresh-token cookie (scoped to the backend's own origin) is
 * included on cross-origin requests from the Next.js frontend.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { accessToken, country, headers, body, ...rest } = options;

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
    throw new ApiError(res.status, data?.message ?? res.statusText);
  }

  return data as T;
}
