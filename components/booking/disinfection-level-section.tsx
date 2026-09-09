"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useCurrency } from "@/lib/currency-context";
import { useLanguage } from "@/lib/i18n/language-context";

export interface DisinfectionLevel {
  id: string;
  title: string;
  description: string;
  priceAdder: number;
}

export const DISINFECTION_LEVELS: DisinfectionLevel[] = [
  {
    id: "quat",
    title: "Quaternary Ammonium (Quat) – Standard",
    description: "Cost-effective, proven, low odor.",
    priceAdder: 0,
  },
  {
    id: "peroxide",
    title: "Hydrogen Peroxide (H₂O₂) – Premium",
    description: "Fast kill time, no chemical residue.",
    priceAdder: 25,
  },
  {
    id: "hypochlorous",
    title: "Hypochlorous Acid (HOCl) – Advanced",
    description: "Non-toxic, powerful for fogging / air treatment.",
    priceAdder: 50,
  },
  {
    id: "botanical",
    title: "Botanical / Thyme-Based – Eco Friendly",
    description: "Certified green, natural ingredients.",
    priceAdder: 75,
  },
];

export interface DisinfectionLevelSectionProps {
  selectedId: string;
  onSelect: (level: DisinfectionLevel) => void;
}

export function DisinfectionLevelSection({ selectedId, onSelect }: DisinfectionLevelSectionProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();

  const levelTranslations: Record<string, { title: string; description: string }> = {
    quat: {
      title: translate("disinfectionQuatTitle"),
      description: translate("disinfectionQuatDesc"),
    },
    peroxide: {
      title: translate("disinfectionPeroxideTitle"),
      description: translate("disinfectionPeroxideDesc"),
    },
    hypochlorous: {
      title: translate("disinfectionHypochlorousTitle"),
      description: translate("disinfectionHypochlorousDesc"),
    },
    botanical: {
      title: translate("disinfectionBotanicalTitle"),
      description: translate("disinfectionBotanicalDesc"),
    },
  };

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-6 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#A98B4B] md:text-[2.5rem]">
          {translate("disinfectionLevelTitle")}
        </h2>
        <p className="text-white">{translate("disinfectionLevelSubtitle")}</p>
      </div>

      <div className="flex flex-col gap-2.5 bg-[#121E2D] md:p-8 p-5">
        {DISINFECTION_LEVELS.map((level) => {
          const isChecked = level.id === selectedId;
          const translated = levelTranslations[level.id];
          return (
            <div
              key={level.id}
              role="button"
              tabIndex={0}
              onClick={() => onSelect(level)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(level);
                }
              }}
              aria-pressed={isChecked}
              className={`flex cursor-pointer items-center gap-3 rounded-[10px] bg-white px-5 py-3 text-left transition ${
                isChecked
                  ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                  : "border-[1.5px] border-[#A98B4B]"
              }`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#121E2D]">
                  {translated?.title ?? level.title}
                </p>
                <p className="text-[0.85rem] text-[#555]">
                  {translated?.description ?? level.description}
                  {level.priceAdder > 0 && (
                    <>
                      {" "}
                      • <span className="font-bold text-[#A98B4B]">+{symbol}{level.priceAdder.toFixed(2)}</span>
                    </>
                  )}
                </p>
              </div>
              <Checkbox
                checked={isChecked}
                onCheckedChange={() => onSelect(level)}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 border-2 border-[#A98B4B] data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}

