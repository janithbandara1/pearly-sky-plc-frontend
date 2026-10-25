"use client";

import Image from "next/image";
import { AiFillInstagram, AiOutlineTikTok } from "react-icons/ai";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { ChevronRight, Leaf, Mail, PawPrint, Phone, ShieldCheck, Sprout } from "lucide-react";
import Link from "@/components/locale-link";
import { useLanguage } from "@/lib/i18n/language-context";
import { buildLocalePath } from "@/lib/locale";
import { getCountryContactEmail, getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import { officeLocations } from "@/lib/content/locations";
import { TOTAL_COUNTRIES } from "@/lib/content/global-countries";
import { localizedCountryName } from "@/lib/i18n/global/country-names";
import type { GlobalKey } from "@/lib/i18n/global/en";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { greatVibes, playfair } from "./fonts";

const NAV_LINKS: { href: string; labelKey: TranslationKey }[] = [
  { href: "/", labelKey: "navHome" },
  { href: "/our-services", labelKey: "navServices" },
  { href: "/our-locations", labelKey: "navLocations" },
  { href: "/about-us", labelKey: "navAbout" },
  { href: "/blog", labelKey: "navBlog" },
  { href: "/careers", labelKey: "navCareers" },
  { href: "/contact-us", labelKey: "navContact" },
];

const ECO_BADGES: { Icon: typeof Leaf; labelKey: GlobalKey }[] = [
  { Icon: Leaf, labelKey: "footer.ecoFriendly" },
  { Icon: Sprout, labelKey: "footer.sustainable" },
  { Icon: ShieldCheck, labelKey: "footer.nonToxic" },
  { Icon: PawPrint, labelKey: "footer.petSafe" },
];

// Each network's brand colour (TikTok's black is swapped for white to stay visible on navy).
const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF, color: "text-[#1877F2]" },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram, color: "text-[#E1306C]" },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube, color: "text-[#FF0000]" },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn, color: "text-[#2E86DE]" },
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok, color: "text-white" },
];

/** The global gateway's footer (IS_GLOBAL_SITE). */
export function GlobalFooter() {
  const { translate, translateGlobal: t, language } = useLanguage();
  const localeHref = (href: string) => buildLocalePath(href, language);
  const contactEmail = getCountryContactEmail(null);
  // WhatsApp goes to the Sri Lanka head office, the group's global office.
  const whatsappUrl = getWhatsappUrl(getCountryOffice("lk").contactNo ?? "");

  return (
    <footer
      className={`${playfair.variable} ${greatVibes.variable} relative overflow-hidden border-t border-gold-500/20 bg-navy-900 bg-[radial-gradient(rgba(212,175,55,0.18)_1.2px,transparent_1.2px)] bg-size-[20px_20px] px-4 pb-8 pt-16 font-sans text-slate-100 sm:px-8`}
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-12">
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

            <p className="max-w-md text-xs leading-relaxed text-slate-300">
              {t("footer.description", { count: TOTAL_COUNTRIES })}
            </p>

            <ul className="flex flex-wrap items-center gap-3 pt-2 text-[10px] uppercase text-slate-300">
              {ECO_BADGES.map(({ Icon, labelKey }) => (
                <li key={labelKey} className="flex items-center gap-1.5 rounded-full border border-slate-800 bg-navy-800 px-3 py-1.5">
                  <Icon className="h-3 w-3 text-emerald-400" />
                  {t(labelKey)}
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={translate("footerQuickLinksTitle")} className="space-y-3 lg:col-span-4">
            <h2 className="border-b border-slate-800 pb-2 font-display text-sm font-bold text-white">
              {translate("footerQuickLinksTitle")}
            </h2>
            <ul className="space-y-1 text-xs text-slate-400">
              {NAV_LINKS.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link href={localeHref(href)} className="flex min-h-0! items-center gap-1.5 py-1 transition-colors hover:text-gold-400">
                    <ChevronRight className="h-3 w-3 text-gold-500" />
                    {translate(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-3 lg:col-span-3">
            <h2 className="border-b border-slate-800 pb-2 font-display text-sm font-bold text-white">
              {t("footer.connectWithUs")}
            </h2>
            <ul className="space-y-1 text-xs text-slate-400">
              {SOCIAL_LINKS.map(({ href, label, Icon, color }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-0! items-center gap-2 py-1 transition-colors hover:text-white"
                  >
                    <Icon className={`h-3.5 w-4 ${color}`} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-0! items-center gap-2 py-1 transition-colors hover:text-white"
                >
                  <FaWhatsapp className="h-3.5 w-4 text-[#25D366]" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <ul className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-800 bg-navy-800/90 p-4 text-xs md:grid-cols-4">
          {officeLocations
            .filter((location) => location.contactNo)
            .map((location) => (
              <li key={location.id}>
                <a
                  href={`tel:${location.contactNo!.replace(/\s/g, "")}`}
                  className="flex min-h-0! items-center gap-3 rounded-xl p-2 transition-colors hover:bg-navy-700"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-400" />
                  <span>
                    <span className="block font-bold text-white">{location.contactNo}</span>
                    <span className="text-[10px] text-slate-400">
                      {t("footer.hotline", {
                        country: localizedCountryName({ name: location.name, flagCode: location.country ?? "" }, language),
                      })}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          <li>
            <a
              href={`mailto:${contactEmail}`}
              className="flex min-h-0! items-center gap-3 rounded-xl p-2 transition-colors hover:bg-navy-700"
            >
              <Mail className="h-4 w-4 shrink-0 text-gold-400" />
              <span className="min-w-0">
                <span className="block truncate font-bold text-white">{contactEmail}</span>
                <span className="text-[10px] text-slate-400">{t("footer.generalEnquiries")}</span>
              </span>
            </a>
          </li>
        </ul>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-[11px] text-slate-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Pearly Sky Company Private Ltd. {translate("footerRights")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5">
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
