"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AiOutlineTikTok,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { ChevronDown, ChevronUp, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CountrySwitcher } from "@/components/country-switcher";
import { ServicesNavList } from "@/components/services-nav-list";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com", label: "TikTok", Icon: AiOutlineTikTok },
  { href: "https://www.facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com", label: "Instagram", Icon: AiFillInstagram },
  { href: "https://x.com", label: "X", Icon: RiTwitterXFill },
  { href: "https://www.youtube.com", label: "YouTube", Icon: FaYoutube },
  { href: "https://www.linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

const NAV_LINKS: { href: string; labelKey: TranslationKey; external?: boolean }[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/about-us", labelKey: "navAbout" },
  { href: "/our-customers", labelKey: "navCustomers" },
  { href: "/our-locations", labelKey: "navLocations" },
  { href: "/blog", labelKey: "navBlog" },
  { href: "/careers", labelKey: "navCareers" },
  { href: "/contact-us", labelKey: "navContact" },
];

const HOTLINE = "+33 743 708 780";
const WHATSAPP_URL = "https://wa.me/33743708780";

export function SiteFooter() {
  const { translate } = useLanguage();
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <footer className="border-t border-border/60 bg-brand-navy text-brand-navy-foreground">
      <div className="flex justify-center border-b border-brand-gold/20 px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-3">
          <LanguageSwitcher />
          <CountrySwitcher />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
          <Image
            src="/images/brand/logo.webp"
            alt="Pearly Sky"
            width={120}
            height={120}
            className="rounded-full bg-brand-navy"
          />
          <p className="max-w-xs text-sm text-brand-navy-foreground/70">
            {translate("footerTagline")}
          </p>
        </div>

        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-sm font-bold tracking-widest text-brand-gold">
            {translate("footerQuickLinksTitle")}
          </h3>
          <ul className="space-y-2 text-sm text-brand-navy-foreground/70">
            <li>
              <Link href="/" className="transition-colors hover:text-brand-gold">
                {translate("navHome")}
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => setServicesOpen((open) => !open)}
                aria-expanded={servicesOpen}
                className="flex w-full items-center justify-center gap-1 text-center transition-colors hover:text-brand-gold md:justify-between md:text-left"
              >
                {translate("navServices")}
                {servicesOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>
              {servicesOpen && (
                <div className="mt-2 overflow-hidden rounded-lg bg-popover text-popover-foreground shadow">
                  <ServicesNavList className="w-full grid-cols-1" />
                </div>
              )}
            </li>
            {NAV_LINKS.slice(1).map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-brand-gold">
                  {translate(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left">
          <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded border border-white/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <FaWhatsapp className="h-3.5 w-3.5" />
              {translate("contactWhatsapp")}
            </a>
            <a
              href={`tel:${HOTLINE.replace(/\s/g, "")}`}
              className="flex items-center gap-2 rounded border border-white/40 px-3 py-1.5 text-xs font-semibold transition-colors hover:border-brand-gold hover:text-brand-gold"
            >
              <Phone className="h-3.5 w-3.5" />
              {translate("contactHotline")}
            </a>
          </div>
        </div>

        <div className="flex justify-center gap-2 lg:justify-start">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-gold/50 text-brand-navy-foreground transition-colors hover:bg-brand-gold hover:text-brand-navy"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-brand-gold/20 px-4 py-4 text-center text-xs text-brand-navy-foreground/60 sm:flex-row sm:justify-between sm:px-6">
        <p>
          © {new Date().getFullYear()} Pearly Sky. {translate("footerRights")}
        </p>
        <div className="flex items-center gap-4">
          <Link href="/terms-and-conditions" className="transition-colors hover:text-brand-gold">
            {translate("footerTermsLink")}
          </Link>
          <Link href="/privacy-policy" className="transition-colors hover:text-brand-gold">
            {translate("footerPrivacyLink")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
