"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useLanguage } from "@/lib/i18n/language-context";

export interface FacilityCategory {
  key: string;
  title: string;
  description: string;
}

export interface FacilityCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  categoryKey: string;
}

export const FACILITY_CATEGORIES: FacilityCategory[] = [
  {
    key: "healthcare",
    title: "Healthcare & Specialized Facilities",
    description: "For environments requiring the highest level of cleanliness and regulatory compliance.",
  },
  {
    key: "commercial",
    title: "Commercial & Workplace",
    description: "For offices, corporate headquarters, and government properties.",
  },
  {
    key: "hospitality",
    title: "Hospitality, Retail & Food Service",
    description: "For businesses that rely on public trust and immaculate presentation.",
  },
  {
    key: "community",
    title: "Community & Public Spaces",
    description: "For facilities with high foot traffic and shared use.",
  },
];

export const FACILITY_CARDS: FacilityCard[] = [
  { id: "hospital", title: "Hospitals & Clinics General", description: "Sanitization for patient rooms, waiting areas, and high-traffic zones.", icon: "🏥", categoryKey: "healthcare" },
  { id: "dental", title: "Dental & Medical Office", description: "Disinfection of operatories, waiting areas, and clinical surfaces.", icon: "🦷", categoryKey: "healthcare" },
  { id: "labs", title: "Labs & Pharma", description: "Specialized cleaning for cleanrooms, laboratories, and pharmaceutical facilities.", icon: "🧪", categoryKey: "healthcare" },
  { id: "biohazard", title: "Biohazard Cleanup", description: "Post-incident disinfection (e.g., crime scenes, infectious disease, unattended death).", icon: "☣️", categoryKey: "healthcare" },
  { id: "office", title: "General Offices & HQ", description: "Daily, weekly, or deep disinfection of workstations, breakrooms, and common areas.", icon: "🏢", categoryKey: "commercial" },
  { id: "government", title: "Government Buildings", description: "Cleaning services for public service areas and secure government facilities.", icon: "🏛️", categoryKey: "commercial" },
  { id: "factory", title: "Factories & Warehouses", description: "Disinfection of production floors, equipment, and administrative offices.", icon: "🏭", categoryKey: "commercial" },
  { id: "post", title: "Post-Disaster Cleanup", description: "Sanitization after water, fire, or smoke damage.", icon: "🏤", categoryKey: "commercial" },
  { id: "hotel", title: "Hotels & Resorts", description: "Deep-cleaning and disinfection of guest rooms, lobbies, and amenity areas.", icon: "🏨", categoryKey: "hospitality" },
  { id: "retail", title: "Retail Stores & Malls", description: "Sanitization of fitting rooms, checkout counters, and high-touch displays.", icon: "🏢", categoryKey: "hospitality" },
  { id: "restaurant", title: "Restaurants & Cafes", description: "Kitchen deep-cleaning, dining area sanitization, and restroom disinfection.", icon: "🍽️", categoryKey: "hospitality" },
  { id: "food", title: "Food Processing Plants", description: "High-standard, scheduled disinfection for facilities handling food production.", icon: "🥫", categoryKey: "hospitality" },
  { id: "transport", title: "Transport Vehicles", description: "Disinfection of buses, trains, planes, and company vehicle fleets.", icon: "🚙", categoryKey: "community" },
  { id: "school", title: "Schools & Daycare", description: "Sanitizing classrooms, gyms, and playground equipment to protect children.", icon: "🏫", categoryKey: "community" },
  { id: "gym", title: "Gyms & Fitness Centers", description: "Disinfecting workout equipment, locker rooms, and shared showers.", icon: "🏋️", categoryKey: "community" },
  { id: "apartment", title: "Apartments & Common Areas", description: "Sanitizing lobbies, shared laundry rooms, and residential hallways.", icon: "🏢", categoryKey: "community" },
];

export interface FacilitySelectionSectionProps {
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
}

export function FacilitySelectionSection({ selectedIds, onToggle }: FacilitySelectionSectionProps) {
  const { translate } = useLanguage();

  const TRANSLATED_FACILITY_CATEGORIES = [
    {
      key: "healthcare",
      title: translate("facilityCategoryHealthcare"),
      description: translate("facilityCategoryHealthcareDesc"),
    },
    {
      key: "commercial",
      title: translate("facilityCategoryCommercial"),
      description: translate("facilityCategoryCommercialDesc"),
    },
    {
      key: "hospitality",
      title: translate("facilityCategoryHospitality"),
      description: translate("facilityCategoryHospitalityDesc"),
    },
    {
      key: "community",
      title: translate("facilityCategoryCommunity"),
      description: translate("facilityCategoryCommunityDesc"),
    },
  ];

  const FACILITY_TITLE_KEY_MAP: Record<string, { title: string; desc: string }> = {
    hospital:  { title: translate("facilityHospitalTitle"),   desc: translate("facilityHospitalDesc") },
    dental:    { title: translate("facilityDentalTitle"),     desc: translate("facilityDentalDesc") },
    labs:      { title: translate("facilityLabsTitle"),       desc: translate("facilityLabsDesc") },
    biohazard: { title: translate("facilityBiohazardTitle"),  desc: translate("facilityBiohazardDesc") },
    office:    { title: translate("facilityOfficeTitle"),     desc: translate("facilityOfficeDesc") },
    government:{ title: translate("facilityGovernmentTitle"),desc: translate("facilityGovernmentDesc") },
    factory:   { title: translate("facilityFactoryTitle"),    desc: translate("facilityFactoryDesc") },
    post:      { title: translate("facilityPostTitle"),       desc: translate("facilityPostDesc") },
    hotel:     { title: translate("facilityHotelTitle"),      desc: translate("facilityHotelDesc") },
    retail:    { title: translate("facilityRetailTitle"),     desc: translate("facilityRetailDesc") },
    restaurant:{ title: translate("facilityRestaurantTitle"),desc: translate("facilityRestaurantDesc") },
    food:      { title: translate("facilityFoodTitle"),       desc: translate("facilityFoodDesc") },
    transport: { title: translate("facilityTransportTitle"),  desc: translate("facilityTransportDesc") },
    school:    { title: translate("facilitySchoolTitle"),     desc: translate("facilitySchoolDesc") },
    gym:       { title: translate("facilityGymTitle"),        desc: translate("facilityGymDesc") },
    apartment: { title: translate("facilityApartmentTitle"), desc: translate("facilityApartmentDesc") },
  };

  return (
    <section className="overflow-hidden rounded-[12px] bg-[#121E2D] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[rgb(169,139,75)] sm:text-[32px]">{translate("facilitySelectTitle")}</h2>
      </div>

      <div className="flex flex-col gap-6 bg-[#121E2D] p-4 sm:p-5">
        {TRANSLATED_FACILITY_CATEGORIES.map((cat) => {
          const cards = FACILITY_CARDS.filter((c) => c.categoryKey === cat.key);
          return (
            <div key={cat.key}>
              <h3 className="text-sm font-black text-[rgb(169,139,75)]">{cat.title}</h3>
              <p className="mb-3 py-1 text-xs text-[#fff]">{cat.description}</p>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4 ">
                {cards.map((card) => {
                  const isChecked = selectedIds.has(card.id);
                  const translated = FACILITY_TITLE_KEY_MAP[card.id];
                  return (
                    <div
                      key={card.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onToggle(card.id)} 
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onToggle(card.id);
                        }
                      }}
                      aria-pressed={isChecked}
                      className={`relative flex cursor-pointer hover:outline-2 hover:outline-[rgb(169,139,75)] flex-col items-start gap-1 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${isChecked
                        ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                        : "border-[1.5px] border-[#A98B4B]"
                        }`}
                    >
                      <Checkbox
                        checked={isChecked}
                        onCheckedChange={() => onToggle(card.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-2 right-2 border-[#A98B4B] data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
                      />
                      <span className="text-xl">{card.icon}</span>
                      <p className="pr-6 text-sm font-medium text-[#121E2D]">{translated?.title ?? card.title}</p>
                      <p className="text-xs text-[#555]">{translated?.desc ?? card.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
