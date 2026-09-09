"use client";

import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

export interface GeneralSteamCard {
  title: string;
  image: string;
}

export const GENERAL_STEAM_CARDS: GeneralSteamCard[] = [
  { title: "Rooms & Areas", image: "/images/steam/rooms-and-areas.webp" },
  { title: "Kitchen & Appliances", image: "/images/steam/kitchen-and-appliances.webp" },
  { title: "Furniture & Soft Furnishings", image: "/images/steam/furniture-and-soft-furnishings.webp" },
  { title: "Surface Cleaning", image: "/images/steam/surface-cleaning.webp" },
  { title: "Speciality Cleaning", image: "/images/steam/speciality-cleaning.webp" },
];

const CARD_TITLE_KEYS: Record<string, TranslationKey> = {
  "Rooms & Areas": "steamCardRooms",
  "Kitchen & Appliances": "steamCardKitchen",
  "Furniture & Soft Furnishings": "steamCardFurniture",
  "Surface Cleaning": "steamCardSurface",
  "Speciality Cleaning": "steamCardSpeciality",
};

export interface GeneralSteamSectionProps {
  selectedTitles: Set<string>;
  onToggle: (title: string) => void;
}

export function GeneralSteamSection({ selectedTitles, onToggle }: GeneralSteamSectionProps) {
  const { translate } = useLanguage();

  return (
    <section className="overflow-hidden rounded-[12px] ">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h1 className="text-[#FFFDF4] text-2xl md:text-[2.5rem]">{translate("steamEcoLuxuryTitle")}</h1>
        <h3 className="text-[1.1rem] uppercase font-bold text-[#A98B4B] sm:text-[1.3rem]">
          {translate("steamGeneralJobTypes")}
        </h3>
      </div>

      <div className="bg-[#121E2D] p-4 sm:p-5">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
          {GENERAL_STEAM_CARDS.map((card) => {
            const isChecked = selectedTitles.has(card.title);
            const key = CARD_TITLE_KEYS[card.title];
            const translatedTitle = key ? translate(key) : card.title;

            return (
              <div
                key={card.title}
                role="button"
                tabIndex={0}
                onClick={() => onToggle(card.title)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onToggle(card.title);
                  }
                }}
                aria-pressed={isChecked}
                className="flex cursor-pointer flex-col items-center gap-1.5 text-center transition"
              >
                <div
                  className={`relative aspect-square w-full overflow-hidden rounded-[10px] ${isChecked
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                    }`}
                >
                  <Image src={card.image} alt={translatedTitle} fill className="object-cover" />
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => onToggle(card.title)}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-2 right-2 border-white bg-white/80 shadow-sm data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
                  />
                </div>
                <p className="px-0.5 text-xs font-medium text-[#ececec]">{translatedTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
