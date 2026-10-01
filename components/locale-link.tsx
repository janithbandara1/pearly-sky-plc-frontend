"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { localizeHref } from "@/lib/locale";

type LocaleLinkProps = ComponentProps<typeof NextLink>;

/**
 * Drop-in replacement for next/link that writes internal links with the
 * current page's language prefix ("/about-us" -> "/fr/about-us" on a French
 * page). Without it every internal link points at an unprefixed URL that
 * proxy.ts has to 308-redirect — and since crawlers carry no language
 * cookie, that redirect lands on the default language, so Googlebot
 * following a link on a French page ended up on the English one. On pages
 * with no language in the URL (/login, /signup, /staff), links are left
 * as-is and the proxy redirect still applies.
 */
export default function Link({ href, ...props }: LocaleLinkProps) {
  const { urlLanguage } = useLanguage();
  const localizedHref = urlLanguage && typeof href === "string" ? localizeHref(href, urlLanguage) : href;
  return <NextLink href={localizedHref} {...props} />;
}
