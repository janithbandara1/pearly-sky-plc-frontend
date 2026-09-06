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
import { ChevronDown, ChevronUp, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";
import { getCountryContactEmail, getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { LanguageSwitcher } from "@/components/language-switcher";
import { CountrySwitcher } from "@/components/country-switcher";
import { ServicesNavList } from "@/components/services-nav-list";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { SOCIAL_URLS } from "@/lib/content/social-links";

const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.x, label: "X", Icon: RiTwitterXFill },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
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

export function SiteFooter() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();
  const [servicesOpen, setServicesOpen] = useState(false);

  const { footerTagline } = getCountryHomeContent(country, language);
  const office = getCountryOffice(country);
  const hotline = office.contactNo ?? "";
  const whatsappUrl = getWhatsappUrl(hotline);
  const contactEmail = getCountryContactEmail(country);

  return (
    <footer className="border-t border-brand-gold/30 bg-brand-navy text-brand-navy-foreground">
      <div className="flex justify-center px-4 pb-2 pt-4 sm:pt-5">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <LanguageSwitcher className="h-8 border-brand-gold/70 bg-transparent text-xs" />
          <CountrySwitcher className="h-8 border-brand-gold/70 bg-transparent text-xs" />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-start gap-8 px-4 py-8 sm:px-8 md:grid-cols-3 md:gap-10 lg:px-12">
        <div className="order-2 flex flex-col items-center text-center md:order-1 md:items-start md:text-left">
          <h3 className="text-base font-semibold text-brand-gold sm:text-lg">Quick Contact &amp; Connect</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 rounded-md bg-brand-gold px-3 py-2 text-[11px] font-semibold text-brand-navy shadow-sm transition-colors hover:bg-brand-gold/80">
              <FaWhatsapp className="h-3.5 w-3.5" /> {translate("contactWhatsapp")}
            </a>
            <a href={`tel:${hotline.replace(/\s/g, "")}`} className="flex items-center gap-1.5 rounded-md bg-brand-gold px-3 py-2 text-[11px] font-semibold text-brand-navy shadow-sm transition-colors hover:bg-brand-gold/80">
              <Phone className="h-3.5 w-3.5" /> {translate("contactHotline")}
            </a>
          </div>
          <span className="mt-4 text-xs font-medium tracking-wide text-brand-navy-foreground/90">WRITE TO US</span>
          <a href={`mailto:${contactEmail}`} className="mt-2 flex w-full max-w-[245px] items-center justify-center gap-2 rounded-md bg-brand-gold px-4 py-2 text-xs font-semibold text-brand-navy shadow-sm transition-colors hover:bg-brand-gold/80">
            <Mail className="h-3.5 w-3.5" /> MAIL
          </a>
          <span className="mt-5 text-xs font-medium tracking-wide text-brand-navy-foreground/90">CONNECT WITH US:</span>
          <SocialLinks />
        </div>

        <div className="order-1 flex flex-col items-center text-center md:order-2">
          <div className="flex h-30 w-42 items-center justify-center bg-brand-navy/40" aria-label="Logo placeholder">
            <Image src="/images/brand/logo.webp" alt="Pearly Sky logo" width={100} height={100} className="max-h-30 w-auto object-contain" />
          </div>
          <h2 className="mt-2 font-serif text-3xl lowercase tracking-wide text-brand-gold sm:text-4xl">pearly sky</h2>
          <p className="text-[11px] text-brand-gold/90">Eco-Luxury Cleaning care</p>
          <p className="mt-5 text-sm text-brand-navy-foreground/85">Pearly sky number now</p>
          <a href={`tel:${hotline.replace(/\s/g, "")}`} className="mt-1 text-sm text-brand-gold transition-colors hover:text-brand-cream">{hotline}</a>
          <a href={`mailto:${contactEmail}`} className="mt-1 text-xs text-brand-navy-foreground/80 transition-colors hover:text-brand-gold">email: {contactEmail}</a>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-brand-navy-foreground/60">{footerTagline}</p>
        </div>

        <div className="order-3 flex flex-col items-center text-center md:items-start md:text-left">
          <h3 className="text-base font-semibold text-brand-gold sm:text-lg">{translate("footerQuickLinksTitle")}</h3>
          <div className="mt-3 grid w-full grid-cols-2 gap-x-6">
            <ul className="space-y-1 text-xs text-brand-navy-foreground/85">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}><Link href={link.href} className="transition-colors hover:text-brand-gold">{translate(link.labelKey)}</Link></li>
              ))}
            </ul>
            <ul className="space-y-1 text-xs text-brand-navy-foreground/85">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}><Link href={link.href} className="transition-colors hover:text-brand-gold">{translate(link.labelKey)}</Link></li>
              ))}
              <li>
                <button type="button" onClick={() => setServicesOpen((open) => !open)} aria-expanded={servicesOpen} className="flex items-center gap-1 transition-colors hover:text-brand-gold">
                  {translate("navServices")}
                  {servicesOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
                </button>
                {servicesOpen && <div className="mt-2 rounded-md bg-popover text-popover-foreground shadow"><ServicesNavList className="w-full grid-cols-1" /></div>}
              </li>
            </ul>
          </div>
          <address className="mt-4 whitespace-pre-line text-left text-xs not-italic leading-relaxed text-brand-navy-foreground/75">
            {office.address ?? "Address available on request"}
          </address>
          <SocialLinks />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 border-t border-brand-gold/20 px-4 py-3 text-center text-[11px] text-brand-navy-foreground/70 sm:flex-row sm:justify-between sm:px-6">
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

function SocialLinks() {
  return (
    <div className="mt-3 flex flex-wrap justify-center gap-2 md:justify-start">
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex h-8 w-8 items-center justify-center rounded-full border border-brand-gold/70 bg-brand-gold/15 text-brand-navy-foreground transition-colors hover:bg-brand-gold hover:text-brand-navy">
          <Icon className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}
