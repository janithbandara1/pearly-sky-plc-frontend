"use client";

import Image from "next/image";
import { Globe2, Laptop, Leaf, Phone, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";

const ICON_COLORS: Record<string, string> = {
  bilingual: "text-sky-500",
  eco: "text-emerald-600",
  booking: "text-sky-600",
  support: "text-sky-600",
};

function HighlightsPanel({
  highlights,
}: {
  highlights: { key: string; Icon: LucideIcon; label: string; desc: string }[];
}) {
  return (
    <div className="flex flex-col gap-2 sm:gap-3">
      {highlights.map(({ key, Icon, label, desc }) => (
        <div
          key={key}
          className="flex items-start gap-3 rounded-lg bg-muted/60 px-3 py-2 sm:bg-transparent sm:px-0 sm:py-1"
        >
          <Icon className={`mt-0.5 h-5 w-5 stroke-[#c8a089] shrink-0 ${ICON_COLORS[key]}`} />
          <p className="text-sm sm:text-base">
            <span className="font-bold text-brand-navy">{label}:</span>{" "}
            <span className="text-muted-foreground">{desc}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export function AboutSection() {
  const { translate, language } = useLanguage();
  const { aboutBilingualLabel, aboutBilingualDesc } = getCountryHomeContent(language);

  const highlights = [
    {
      key: "bilingual",
      Icon: Globe2,
      label: aboutBilingualLabel,
      desc: aboutBilingualDesc,
    },
    {
      key: "eco",
      Icon: Leaf,
      label: translate("aboutEcoLabel"),
      desc: translate("aboutEcoDesc"),
    },
    {
      key: "booking",
      Icon: Laptop,
      label: translate("aboutBookingLabel"),
      desc: translate("aboutBookingDesc"),
    },
    {
      key: "support",
      Icon: Phone,
      label: translate("aboutSupportLabel"),
      desc: translate("aboutSupportDesc"),
    },
  ];

  const servicesList = [
    {id: "LuxuryResidential",name:translate("ServiceLuxuryResidential")},
    {id: "Commercial",name:translate("ServiceCommercial")},
    {id: "LuxuryProperty",name:translate("ServiceLuxuryProperty")},
    {id: "Hospitality",name:translate("ServiceHospitality")},
    {id: "Sports",name:translate("ServiceSports")},
    {id: "Public",name:translate("ServicePublic")}
  ] 

  return (
    <section className="bg-background mx-0 py-12">
      
      <div className=" ">
        <p className="text-[#224b36] font-bold text-2xl lg:text-3xl md:text-3xl mb-4 text-center">
         
          {translate("aboutOurServices")}
        </p>
        <div className="px-4 sm:px-6 mx-auto w-full max-w-5xl grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
        {servicesList.map((service) => (
          <div key={service.id} className="bg-brand-navy  border-2 border-brand-gold rounded-xl px-4 py-3 text-[#fff] text-sm font-semibold text-center shadow-sm hover:shadow-md transition-shadow">
            {service.name}
          </div>
        ))}
      </div>
      <div className="px-4 bg-brand-navy py-5 mb-6">
          <p className="text-white text-sm md:text-base leading-relaxed text-justify md:text-left">
            {translate("aboutOurServicesContent")}
          </p>
        </div>

        <div className="px-4 mx-auto sm:px-6  w-full max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-brand-gold-dark">
            {/* Desktop: image fills the card behind the overlaid highlights panel */}
              <div className="relative hidden sm:block sm:aspect-[21/9]">
                <Image
                  src="/images/about/welcome.webp"
                  alt="Pearly Sky team at work"
                  fill
                  sizes="(min-width: 640px) 1024px, 0px"
                  className="object-cover object-right"
                />
                <div className="pointer-events-none absolute inset-0 w-3/5 bg-gradient-to-r from-white via-white/85 to-transparent" />
                <div className="absolute inset-y-0 left-0 flex w-1/2 flex-col justify-center px-10">
                  <HighlightsPanel highlights={highlights} />
                </div>
              </div>

            {/* Mobile: highlights card on top, full-width image below */}
            <div className="sm:hidden">
              <div className="bg-white px-4 py-6">
                <HighlightsPanel highlights={highlights} />
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/about/welcome.webp"
                  alt="Pearly Sky team at work"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
       
      </div>
    </section>
  );
}
