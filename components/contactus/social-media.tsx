import { Button } from "../ui/button";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import { Mail, Phone } from "lucide-react";
import { FaWhatsapp, FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";
import { AiOutlineTikTok, AiFillInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryOffice, getWhatsappUrl } from "@/lib/countries/office";
import { useCountry } from "@/lib/countries/country-context";

const CONTACT_EMAIL = "info@pearlyskyglobalclean.com";

// Updated order: TikTok -> Facebook -> Instagram -> YouTube -> X -> LinkedIn
const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.x, label: "X", Icon: RiTwitterXFill },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
];

export function Socialmedialinks() {
  const { translate } = useLanguage();
  const { country } = useCountry();

  const office = getCountryOffice(country);
  const hotline = office.contactNo ?? "";
  const whatsappUrl = getWhatsappUrl(hotline);

  return (
    <div className="md:hidden flex flex-col items-center justify-center gap-6 bg-transparent p-6 text-center text-brand-navy-foreground sm:p-8">
      <div>
        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group flex h-11 w-11 items-center justify-center rounded-full bg-[#a3874c] text-[#1e293b] shadow-sm transition-all duration-200 ease-in-out hover:scale-105 hover:bg-[#d9bc77] hover:text-white hover:shadow-md"
            >
              <Icon className="h-5 w-5 fill-current transition-colors duration-200" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}