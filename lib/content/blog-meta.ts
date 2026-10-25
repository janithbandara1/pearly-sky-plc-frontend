import type { LanguageCode } from "@/lib/i18n/config";

/**
 * The topics the global blog filters by. Kept apart from blog-posts.ts so the
 * blog page (a client component) can use them without bundling every article's text.
 */
export const BLOG_CATEGORIES = [
  "Home Cleaning",
  "Eco-Friendly Living",
  "Property Care",
  "Health & Wellness",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/** "9 December 2025" → "9 décembre 2025" etc.; returns the stored string unchanged if it can't be parsed. */
export function formatBlogDate(date: string, language: LanguageCode | null): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  // en-GB keeps English as "9 December 2025", matching how dates are written in the content.
  return new Intl.DateTimeFormat(!language || language === "en" ? "en-GB" : language, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())),
  );
}
