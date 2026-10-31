import Image from "next/image";
import { ArrowRight, Building, Building2, MapPin, Phone } from "lucide-react";
import { officeLocations } from "@/lib/content/locations";
import type { CountryCode } from "@/lib/countries/config";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator, type GlobalTranslator } from "@/lib/i18n/global/server";
import { localizedCountryName } from "@/lib/i18n/global/country-names";
import type { LanguageCode } from "@/lib/i18n/config";
import { CountryFlagIcon } from "./country-flags";

/** Office photo per country, from the design. */
export const OFFICE_IMAGES: Record<CountryCode, string> = {
  fr: "/images/global-home/location-fr.webp",
  gb: "/images/global-home/location-gb.webp",
  lk: "/images/global-home/contact-lk.webp",
};

/** The nine featured service cities each office card lists (the country sites carry the full coverage lists). */
const FEATURED_CITIES: Record<CountryCode, string[]> = {
  fr: ["Paris", "Nice", "Antibes", "Cannes", "Monaco", "Normandy", "Deauville", "Dieppe", "Saint-Tropez"],
  gb: ["London", "Windsor", "Richmond upon Thames", "Oxford", "Cambridge", "Bath", "Brighton and Hove", "Edinburgh", "Manchester"],
  lk: ["Colombo", "Kandy", "Galle", "Negombo", "Anuradhapura", "Badulla", "Sigiriya", "Nuwara Eliya", "Ella"],
};

/** One card per real country office — France is the head office. */
export async function ContactOffices() {
  const language = await getRequestLanguage();
  const t = getGlobalTranslator(language);

  return (
    <section className="bg-navy-900 px-4 py-14 sm:px-8">
      <h2 className="sr-only">{t("offices.title")}</h2>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 lg:grid-cols-3">
        {officeLocations.map((office) => (
          <OfficeCard key={office.id} office={office} t={t} language={language} />
        ))}
      </div>
    </section>
  );
}

function OfficeCard({
  office,
  t,
  language,
}: {
  office: (typeof officeLocations)[number];
  t: GlobalTranslator;
  language: LanguageCode | null;
}) {
  const cities = office.country ? FEATURED_CITIES[office.country] : office.serviceCities;
  const image = office.country ? OFFICE_IMAGES[office.country] : null;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address ?? office.name)}`;
  const name = localizedCountryName({ name: office.name, flagCode: office.country ?? "" }, language);

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-800 bg-navy-800 shadow-xl transition-all hover:border-gold-500/40">
      <div>
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-navy-700 p-4">
          <div className="flex items-center gap-3">
            {office.country && <CountryFlagIcon code={office.country} className="h-6 w-8 shrink-0 rounded shadow-sm" />}
            <div>
              <h3 className="font-display text-base font-bold leading-snug text-white">{name}</h3>
              <p className="text-[11px] text-slate-400">
                {office.country === "fr" ? t("offices.head") : t("offices.office")}
              </p>
            </div>
          </div>
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient-bg flex min-h-0! shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-[11px] font-semibold text-navy-900 transition-all hover:brightness-110"
          >
            <span>{t("offices.viewMap")}</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>

        {image && (
          <div className="relative h-36 overflow-hidden">
            <Image src={image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-navy-800 via-transparent to-transparent" />
          </div>
        )}

        <dl className="space-y-4 p-5">
          {office.contactNo && (
            <InfoRow Icon={Phone} label={t("offices.hotline")}>
              <a
                href={`tel:${office.contactNo.replace(/\s/g, "")}`}
                className="min-h-0! text-sm font-bold text-white transition-colors hover:text-gold-400"
              >
                {office.contactNo}
              </a>
            </InfoRow>
          )}
          {office.address && (
            <InfoRow Icon={MapPin} label={t("offices.address")}>
              <span className="text-xs text-slate-300">{office.address}</span>
            </InfoRow>
          )}
          {office.companyNumber && (
            <InfoRow Icon={Building} label={t("offices.companyNo")}>
              <span className="text-xs text-slate-300">{office.companyNumber}</span>
            </InfoRow>
          )}
        </dl>
      </div>

      <div className="mt-2 border-t border-slate-800/80 p-5 pt-3">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="h-3.5 w-3.5 text-gold-400" />
            <h4 className="font-display text-xs font-bold text-white">{t("offices.serviceCities")}</h4>
          </div>
        </div>
        <ul className="grid grid-cols-2 gap-x-1 gap-y-1.5 text-[11px] text-slate-300 sm:grid-cols-3">
          {cities.map((city) => (
            <li key={city} className="flex items-center gap-1">
              <MapPin className="h-2.5 w-2.5 shrink-0 text-gold-500" />
              <span className="truncate">{city}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function InfoRow({ Icon, label, children }: { Icon: typeof Phone; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-500/20 text-gold-400">
        <Icon className="h-3.5 w-3.5" />
      </div>
      <div>
        <dt className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</dt>
        <dd>{children}</dd>
      </div>
    </div>
  );
}
