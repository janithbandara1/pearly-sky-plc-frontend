"use client";

import Image from "next/image";
import { AiFillInstagram, AiOutlineTikTok } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Building2, ChevronRight, Leaf, Mail, MapPin, PawPrint, Phone, Recycle, ShieldCheck, Sprout } from "lucide-react";
import Link from "@/components/locale-link";
import { useLanguage } from "@/lib/i18n/language-context";
import { buildLocalePath } from "@/lib/locale";
import { getCountryContactEmail, getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import { officeLocations } from "@/lib/content/locations";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { greatVibes, playfair } from "./fonts";

const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.x, label: "X", Icon: RiTwitterXFill },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
];

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/about-us", labelKey: "navAbout" },
  { href: "/our-customers", labelKey: "navCustomers" },
  { href: "/our-locations", labelKey: "navLocations" },
  { href: "/blog", labelKey: "navBlog" },
  { href: "/careers", labelKey: "navCareers" },
  { href: "/contact-us", labelKey: "navContact" },
  { href: "/our-services", labelKey: "navServices" },
];

const ECO_BADGES = [
  { Icon: Leaf, label: "Green Compass" },
  { Icon: Recycle, label: "Eco-Friendly" },
  { Icon: Sprout, label: "Sustainable" },
  { Icon: ShieldCheck, label: "Non-Toxic" },
  { Icon: PawPrint, label: "Pet Safe" },
];

/** The global gateway's footer (IS_GLOBAL_SITE) — shows the Sri Lanka head office, the group's global office. */
export function GlobalFooter() {
  const { translate, language } = useLanguage();
  const localeHref = (href: string) => buildLocalePath(href, language);
  const office = getCountryOffice("lk");
  const hotline = office.contactNo ?? "";
  const contactEmail = getCountryContactEmail(null);

  return (
    <footer
      className={`${playfair.variable} ${greatVibes.variable} relative overflow-hidden border-t border-gold-500/20 bg-navy-900 bg-[radial-gradient(rgba(212,175,55,0.15)_1px,transparent_0)] bg-size-[24px_24px] px-4 pb-8 pt-16 font-sans text-slate-100 sm:px-8`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 md:col-span-2 lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/images/brand/logo.webp"
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-gold-500/50 bg-navy-800"
              />
              <div>
                <p className="gold-gradient-text font-display text-lg font-bold uppercase leading-tight tracking-wider">
                  Pearly Sky
                </p>
                <p className="text-[9px] uppercase tracking-widest text-slate-400">Eco-Luxury Cleaning Global</p>
              </div>
            </div>

            <div className="space-y-1 text-xs">
              <p className="font-semibold text-white">PEARLY SKY COMPANY PRIVATE LTD</p>
              <p className="text-slate-400">PEARLY SKY Eco-Luxury Cleaning Services Global Office</p>
            </div>

            <address className="space-y-2 pt-2 text-xs not-italic text-slate-400">
              {office.address && (
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-400" />
                  <span>{office.address}</span>
                </p>
              )}
              {office.companyNumber && (
                <p className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                  <span>Company No: {office.companyNumber}</span>
                </p>
              )}
              {hotline && (
                <p className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                  <a href={`tel:${hotline.replace(/\s/g, "")}`} className="min-h-0! font-medium text-white transition-colors hover:text-gold-400">
                    {hotline}
                  </a>
                </p>
              )}
              <p className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 shrink-0 text-gold-400" />
                <a href={`mailto:${contactEmail}`} className="min-h-0! transition-colors hover:text-gold-400">
                  {contactEmail}
                </a>
              </p>
            </address>

            <p className="max-w-md pt-2 text-[11px] leading-relaxed text-slate-400">
              20 professional, eco-friendly cleaning services for homes, offices, and hotels across {TOTAL_COUNTRIES} global
              destinations. We focus on quality and customer satisfaction, delivering tailored solutions to keep your
              space spotless.
            </p>

            <ul className="flex flex-wrap items-center gap-3 pt-2 text-[10px] text-slate-300">
              {ECO_BADGES.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-1.5 rounded-md border border-slate-700 bg-navy-800 px-2.5 py-1">
                  <Icon className="h-3 w-3 text-emerald-400" />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-3">
            <h2 className="border-b border-slate-800 pb-2 font-display text-sm font-bold text-white">
              {translate("footerQuickLinksTitle")}
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 text-xs text-slate-400 lg:grid-cols-1">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={localeHref(href)}
                    className="flex min-h-0! items-center gap-2 py-1 transition-colors hover:text-gold-400"
                  >
                    <ChevronRight className="h-3 w-3 text-gold-500" />
                    {translate(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-3 lg:col-span-4">
            <h2 className="border-b border-slate-800 pb-2 font-display text-sm font-bold text-white">Connect With Us</h2>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-slate-800 bg-navy-800/60 p-2 transition-all hover:border-gold-500/40 hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 text-gold-400" aria-hidden="true" />
                  {label}
                </a>
              ))}
              {hotline && (
                <a
                  href={getWhatsappUrl(hotline)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 flex items-center gap-2.5 rounded-lg border border-slate-800 bg-navy-800/60 p-2 transition-all hover:border-gold-500/40 hover:text-white"
                >
                  <FaWhatsapp className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
                  WhatsApp Concierge
                </a>
              )}
            </div>
          </div>
        </div>

        <ul className="mb-8 grid grid-cols-1 gap-2 rounded-2xl border border-slate-800 bg-navy-800/90 p-4 text-xs sm:grid-cols-2 lg:grid-cols-4">
          {officeLocations
            .filter((location) => location.contactNo)
            .map((location) => (
              <li key={location.id}>
                <a
                  href={`tel:${location.contactNo!.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-navy-700"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                  <span>
                    <span className="block font-bold text-white">{location.contactNo}</span>
                    <span className="text-[10px] text-slate-400">{location.name} Hotline</span>
                  </span>
                </a>
              </li>
            ))}
          <li>
            <a
              href={`mailto:${contactEmail}`}
              className="flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-navy-700"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <span className="min-w-0">
                <span className="block truncate font-bold text-white">{contactEmail}</span>
                <span className="text-[10px] text-slate-400">General Enquiries</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-[11px] text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Pearly Sky Company Private Ltd. {translate("footerRights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6">
            <Link href={localeHref("/terms-and-conditions")} className="transition-colors hover:text-gold-400">
              {translate("footerTermsLink")}
            </Link>
            <Link href={localeHref("/privacy-policy")} className="transition-colors hover:text-gold-400">
              {translate("footerPrivacyLink")}
            </Link>
            <Link href={localeHref("/cookie-policy")} className="transition-colors hover:text-gold-400">
              {translate("footerCookieLink")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
