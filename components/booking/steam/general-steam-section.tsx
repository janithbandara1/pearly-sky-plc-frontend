"use client";

import Image from "next/image";
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
  { title: "Tile & Grout", image: "/images/services/carpet-items/tile-grout-cleaning.jpeg" },
];

const CARD_TITLE_KEYS: Record<string, TranslationKey> = {
  "Rooms & Areas": "steamCardRooms",
  "Kitchen & Appliances": "steamCardKitchen",
  "Furniture & Soft Furnishings": "steamCardFurniture",
  "Surface Cleaning": "steamCardSurface",
  "Speciality Cleaning": "steamCardSpeciality",
  "Tile & Grout": "steamCardTileGrout",
};

/** Display-only showcase of general steam work — not selectable; job selection happens in the industrial/commercial section. */
export function GeneralSteamSection() {
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
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
          {GENERAL_STEAM_CARDS.map((card) => {
            const key = CARD_TITLE_KEYS[card.title];
            const translatedTitle = key ? translate(key) : card.title;

            return (
              <div key={card.title} className="flex flex-col items-center gap-1.5 text-center">
                <div className="relative aspect-square w-full overflow-hidden rounded-[10px] border-[1.5px] border-[#A98B4B]">
                  <Image
                    src={card.image}
                    alt={translatedTitle}
                    fill
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <p className="px-0.5 text-xs font-semibold text-[#ececec] sm:text-sm">{translatedTitle}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
