/**
 * Known crawler user-agents that should be able to fetch every
 * country/language version of a page directly (e.g. /fr/en/about,
 * /de/fr/about, /lk/en/about) so each gets indexed, instead of always
 * being bounced to one geo/cookie result. Extend this list as needed.
 */
const BOT_USER_AGENT_PATTERN =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|ahrefsbot|semrushbot|applebot|petalbot/i;

export function isKnownBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return BOT_USER_AGENT_PATTERN.test(userAgent);
}
