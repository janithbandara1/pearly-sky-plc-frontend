"use client";

import {
  AiOutlineTikTok,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { useLanguage } from "@/lib/i18n/language-context";

const SOCIAL_LINKS = [
  { href: "https://www.tiktok.com", label: "TikTok", Icon: AiOutlineTikTok },
  { href: "https://www.facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://www.instagram.com", label: "Instagram", Icon: AiFillInstagram },
  { href: "https://x.com", label: "X", Icon: RiTwitterXFill },
  { href: "https://www.youtube.com", label: "YouTube", Icon: FaYoutube },
  { href: "https://www.linkedin.com", label: "LinkedIn", Icon: FaLinkedinIn },
];

export function SiteFooter() {
  const { translate } = useLanguage();

  return (
    <footer className="border-t border-border/60 bg-brand-navy text-brand-navy-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2">
          <span className="text-lg font-semibold tracking-wide">Pearly Sky</span>
          <p className="max-w-xs text-sm text-brand-navy-foreground/70">
            {translate("footerTagline")}
          </p>
        </div>

        <div className="flex gap-3">
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

      <div className="border-t border-brand-gold/20 px-4 py-4 text-center text-xs text-brand-navy-foreground/60 sm:px-6">
        © {new Date().getFullYear()} Pearly Sky. {translate("footerRights")}
      </div>
    </footer>
  );
}
