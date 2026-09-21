// Retired: this module resolved a visitor's *country* from Cloudflare's
// cf-ipcountry header and parsed the old single-domain `/{slug}-{lang}`
// locale prefix. Under the per-country-domain architecture (see
// lib/countries/config.ts's CURRENT_COUNTRY), the country is fixed per
// deployment rather than detected per request, and paths are
// language-only — see lib/locale.ts's buildLocalePath/extractLocalePrefix,
// which replace both of this file's former exports.
//
// Left as an empty module (rather than deleted) — nothing in this repo
// imports it anymore; remove the file itself whenever convenient.
export {};
