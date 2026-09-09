"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

export const SECURITY_SERVICE_CATEGORIES = [
  "Commercial & Office Security",
  "SCIF & High-Security Areas",
  "Healthcare & Medical Sanitation",
  "Post-Construction Site Safety",
  "VIP & Executive Residential",
  "Event Security & Rapid Clean",
  "Emergency Hazmat & Biohazard",
  "Post-Incident Site Restoration",
  "Digital Device Malware Clean",
  "SMB Network & Cyber Audit",
];

const SECURITY_CATEGORY_KEYS: Record<string, TranslationKey> = {
  "Commercial & Office Security": "secJobCommercialOffice",
  "SCIF & High-Security Areas": "secJobScifAreas",
  "Healthcare & Medical Sanitation": "secJobHealthcareMedical",
  "Post-Construction Site Safety": "secJobPostConstructionSafety",
  "VIP & Executive Residential": "secJobVipExecutive",
  "Event Security & Rapid Clean": "secJobEventSecurity",
  "Emergency Hazmat & Biohazard": "secJobEmergencyHazmat",
  "Post-Incident Site Restoration": "secJobPostIncidentRestoration",
  "Digital Device Malware Clean": "secJobDigitalMalware",
  "SMB Network & Cyber Audit": "secJobSmbNetworkAudit",
};

export interface SecurityCategorySelectionProps {
  selected: string | null;
  onSelect: (category: string) => void;
}

export function SecurityCategorySelection({ selected, onSelect }: SecurityCategorySelectionProps) {
  const { translate } = useLanguage();

  return (
    <section className="overflow-hidden my-3 rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#ffffff] px-3 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#121E2D] sm:text-[1.5rem]">
          {translate("securitySelectJobTitle")}
        </h2>
      </div>

      <div className="bg-[#F8F9FA] p-3 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {SECURITY_SERVICE_CATEGORIES.map((category) => {
            const isSelected = selected === category;
            const key = SECURITY_CATEGORY_KEYS[category];
            const translatedTitle = key ? translate(key) : category;

            return (
              <div
                key={category}
                className={`flex items-center justify-between gap-2.5 rounded-[10px] bg-white px-5 py-4 text-left transition ${isSelected
                  ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                  : "border-[1.5px] border-[#A98B4B]"
                  }`}
              >
                <p className="min-w-0 flex-1 truncate text-sm font-medium text-[#121E2D]">{translatedTitle}</p>
                <button
                  type="button"
                  onClick={() => onSelect(category)}
                  aria-pressed={isSelected}
                  className={`shrink-0 rounded-[6px] border-[1.5px] border-[#A98B4B] px-4.5 py-2 text-xs font-semibold cursor-pointer ${isSelected ? "bg-[#A98B4B] text-white" : "text-[#A98B4B]"
                    }`}
                >
                  {isSelected ? translate("securitySelected") : translate("securitySelect")}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
