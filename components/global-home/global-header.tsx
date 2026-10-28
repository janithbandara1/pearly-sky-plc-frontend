"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import Link from "@/components/locale-link";
import { useLanguage } from "@/lib/i18n/language-context";
import { buildLocalePath } from "@/lib/locale";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { cn } from "@/lib/utils";
import { greatVibes, playfair } from "./fonts";
import { GlobalLanguageSwitcher } from "./global-language-switcher";

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/our-services", labelKey: "navServices" },
  { href: "/our-locations", labelKey: "navLocations" },
  { href: "/about-us", labelKey: "navAbout" },
  { href: "/our-customers", labelKey: "navCustomers" },
  { href: "/blog", labelKey: "navBlog" },
  { href: "/careers", labelKey: "navCareers" },
  { href: "/contact-us", labelKey: "navContact" },
];

/**
 * The global gateway's header (IS_GLOBAL_SITE) — no services menu or account
 * UI, just the nav, a language dropdown and a Book Now link to the home page's
 * quote form. Built without shadcn/ui, like site-header.tsx.
 */
export function GlobalHeader() {
  const { translate, translateGlobal: t, language } = useLanguage();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const localeHref = (href: string) => buildLocalePath(href, language);
  const isActive = (href: string) => pathname === href || pathname === localeHref(href);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // The gateway takes no bookings — Book Now opens the request-quotation page.
  const bookNowHref = localeHref("/request-quotation");

  return (
    <header
      className={cn(
        playfair.variable,
        greatVibes.variable,
        "sticky top-0 z-50 border-b border-gold-500/20 bg-navy-800/90 px-4 py-3 font-sans text-slate-100 backdrop-blur-md lg:px-8",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href={localeHref("/")} className="group flex min-h-0! items-center gap-3">
          <Image
            src="/images/brand/logo.webp"
            alt=""
            width={40}
            height={40}
            priority
            className="h-10 w-10 rounded-full border border-gold-500/50 bg-navy-900 shadow-lg shadow-gold-500/10 transition-transform group-hover:scale-105"
          />
          <span className="flex flex-col">
            <span className="gold-gradient-text font-display text-lg font-bold uppercase leading-tight tracking-wider">
              Pearly Sky
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-widest text-slate-300">
              Eco-Luxury Cleaning Global
            </span>
          </span>
        </Link>

        <nav aria-label={t("common.mainNav")} className="hidden items-center gap-5 text-sm font-medium text-slate-200 xl:flex">
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={localeHref(href)}
              aria-current={isActive(href) ? "page" : undefined}
              className={cn(
                "min-h-0! border-b-2 pb-1 transition-colors",
                isActive(href) ? "border-gold-400 text-gold-400" : "border-transparent hover:text-gold-400",
              )}
            >
              {translate(labelKey)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <GlobalLanguageSwitcher />
          <Link
            href={bookNowHref}
            className="gold-gradient-bg hidden h-9 min-h-0! items-center gap-2 rounded-full px-5 text-xs font-semibold text-navy-900 shadow-md shadow-gold-500/20 transition-all hover:-translate-y-0.5 hover:brightness-110 sm:flex"
          >
            <span>{t("common.bookNow")}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="global-mobile-menu"
            aria-label={translate("navMenu")}
            className="flex h-12 w-12 items-center justify-center text-xl text-slate-200 transition-colors hover:text-gold-400 xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="global-mobile-menu"
          aria-label={t("common.mainNav")}
          className="mx-auto mt-3 flex max-w-7xl flex-col gap-1 border-t border-slate-800 px-2 pb-4 pt-3 xl:hidden"
        >
          {NAV_LINKS.map(({ href, labelKey }) => (
            <Link
              key={href}
              href={localeHref(href)}
              aria-current={isActive(href) ? "page" : undefined}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "py-1",
                isActive(href) ? "font-medium text-gold-400" : "text-slate-300 hover:text-gold-400",
              )}
            >
              {translate(labelKey)}
            </Link>
          ))}
          <div className="mt-2 flex items-center gap-3 sm:hidden">
            <Link
              href={bookNowHref}
              onClick={() => setMobileOpen(false)}
              className="gold-gradient-bg h-9 min-h-0! justify-center gap-2 rounded-full px-5 text-xs font-semibold text-navy-900"
            >
              <span>{t("common.bookNow")}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
