
"use client";

import Link from "@/components/locale-link";
import {
  Leaf,
  Sprout,
  ShieldCheck,
  PawPrint,
  Phone,
  Mail,
  ChevronRight,
} from "lucide-react";
import {
  AiFillInstagram,
  AiOutlineTikTok,
} from "react-icons/ai";
import {
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCountry } from "@/lib/countries/country-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";
import { getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { buildLocalePath } from "@/lib/locale";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const QUICK_LINKS: {
  href: string;
  labelKey: TranslationKey;
}[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/services", labelKey: "navServices" },
  { href: "/our-locations", labelKey: "navLocations" },
  { href: "/about-us", labelKey: "navAbout" },
  { href: "/blog", labelKey: "navBlog" },
  { href: "/careers", labelKey: "navCareers" },
  { href: "/contact-us", labelKey: "navContact" },
];

const SERVICES = [
  "Home Cleaning",
  "Deep Cleaning",
  "Office Cleaning",
  "Property Care",
  "Yacht Cleaning",
  "Sanitization",
  "View All Services",
];

const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
];

const GOLD = "#D4AF37";
const NAVY = "#060d15";

const CONTACTS = [
  {
    phone: "+33743708780",
    display: "+33 743 708 780",
    label: "France Hotline",
  },
  {
    phone: "+447349369400",
    display: "+44 7349 369400",
    label: "UK Hotline",
  },
  {
    phone: "+94332218900",
    display: "+94 332 218 900",
    label: "Sri Lanka Hotline",
  },
];

export function SiteFooter() {
  const { translate, language } = useLanguage();
  const { country } = useCountry();

  const office = getCountryOffice(country);
  const { footerTagline } = getCountryHomeContent(language);
  const whatsappUrl = getWhatsappUrl(office.contactNo ?? "");

  const localeHref = (href: string) => buildLocalePath(href, language);

  return (
    <footer
      className="relative z-30 overflow-hidden border-t border-[#D4AF37]/20 bg-[#060d15] text-slate-100"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(212,175,55,0.17) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-6 pt-10 sm:px-8 sm:pt-12 lg:px-10 lg:pt-14">
        {/* Main footer columns */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand and company description */}
          <div className="space-y-4 lg:col-span-5 lg:pr-8">
            <Link
              href={localeHref("/")}
              className="group inline-flex items-center gap-3"
              aria-label="Pearly Sky Home"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D4AF37]/60 bg-[#0B1A28] text-[#D4AF37] shadow-sm transition-transform group-hover:scale-105">
                <Leaf className="h-5 w-5 fill-[#D4AF37]" />
              </div>

              <div>
                <span className="block font-serif text-lg font-bold uppercase leading-tight tracking-wide text-[#f6d87e]">
                  PEARLY SKY
                </span>
                <span className="block text-[9px] font-medium uppercase tracking-[0.13em] text-slate-300">
                  Eco-Luxury Cleaning Global
                </span>
              </div>
            </Link>

            <p className="max-w-md text-xs leading-relaxed text-slate-300 sm:text-[13px]">
              {footerTagline ||
                "Professional cleaning services for homes, offices, hotels and specialised facilities across 27 global destinations."}
            </p>

            {/* Sustainability badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0B1A28] px-3 py-2 text-[10px] font-medium text-slate-200">
                <Leaf className="h-3 w-3 text-emerald-400" />
                ECO FRIENDLY
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0B1A28] px-3 py-2 text-[10px] font-medium text-slate-200">
                <Sprout className="h-3 w-3 text-emerald-400" />
                SUSTAINABLE
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0B1A28] px-3 py-2 text-[10px] font-medium text-slate-200">
                <ShieldCheck className="h-3 w-3 text-emerald-400" />
                NON-TOXIC
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-[#0B1A28] px-3 py-2 text-[10px] font-medium text-slate-200">
                <PawPrint className="h-3 w-3 text-emerald-400" />
                PET SAFE
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-3">
            <h3 className="mb-3 border-b border-slate-800 pb-2 font-serif text-sm font-bold text-white">
              Quick Links
            </h3>

            <ul className="space-y-1.5 text-xs text-slate-400">
              {QUICK_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={localeHref(href)}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#f6d87e]"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-[#D4AF37] transition-transform group-hover:translate-x-0.5" />
                    <span>{translate(labelKey)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 border-b border-slate-800 pb-2 font-serif text-sm font-bold text-white">
              Our Services
            </h3>

            <ul className="space-y-1.5 text-xs text-slate-400">
              {SERVICES.map((service) => (
                <li key={service}>
                  <Link
                    href={localeHref("/services")}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-[#f6d87e]"
                  >
                    <ChevronRight className="h-3 w-3 shrink-0 text-[#D4AF37] transition-transform group-hover:translate-x-0.5" />
                    <span>{service}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="lg:col-span-2">
            <h3 className="mb-3 border-b border-slate-800 pb-2 font-serif text-sm font-bold text-white">
              Connect With Us
            </h3>

            <div className="space-y-2 text-xs text-slate-400">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#f6d87e] transition-colors group-hover:text-[#D4AF37]" />
                  <span>{label}</span>
                </a>
              ))}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 transition-colors hover:text-white"
              >
                <FaWhatsapp className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Global contact bar */}
        <div className="mt-10 grid grid-cols-1 gap-2 rounded-2xl border border-slate-800 bg-[#0B1A28]/95 p-3 sm:grid-cols-2 sm:p-4 lg:mt-12 lg:grid-cols-4">
          {CONTACTS.map((contact) => (
            <a
              key={contact.phone}
              href={`tel:${contact.phone}`}
              className="group flex min-w-0 items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#13263B]"
            >
              <Phone className="h-[18px] w-[18px] shrink-0 fill-[#f6d87e] text-[#f6d87e] transition-transform group-hover:scale-110" />

              <span className="min-w-0">
                <span className="block text-xs font-bold text-white">
                  {contact.display}
                </span>
                <span className="mt-0.5 block text-[10px] text-slate-400">
                  {contact.label}
                </span>
              </span>
            </a>
          ))}

          <a
            href="mailto:info@pearlyskyglobalclean.com"
            className="group flex min-w-0 items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-[#13263B]"
          >
            <Mail className="h-[18px] w-[18px] shrink-0 text-[#f6d87e] transition-transform group-hover:scale-110" />

            <span className="min-w-0">
              <span className="block break-words text-xs font-bold text-white">
                info@pearlyskyglobalclean.com
              </span>
              <span className="mt-0.5 block text-[10px] text-slate-400">
                General Enquiries
              </span>
            </span>
          </a>
        </div>

        {/* Copyright and legal links */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-center text-[11px] text-slate-500 sm:flex-row sm:text-left">
          <p>
            © {new Date().getFullYear()} Pearly Sky Company Private Ltd.{" "}
            {translate("footerRights")}
          </p>

          <nav
            aria-label="Legal links"
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1"
          >
            <Link
              href={localeHref("/terms-and-conditions")}
              className="transition-colors hover:text-[#f6d87e]"
            >
              {translate("footerTermsLink")}
            </Link>

            <Link
              href={localeHref("/privacy-policy")}
              className="transition-colors hover:text-[#f6d87e]"
            >
              {translate("footerPrivacyLink")}
            </Link>

            <Link
              href={localeHref("/cookie-policy")}
              className="transition-colors hover:text-[#f6d87e]"
            >
              {translate("footerCookieLink")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
