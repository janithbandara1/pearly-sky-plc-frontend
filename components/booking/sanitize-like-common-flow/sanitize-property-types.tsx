"use client";

import { useEffect, useState, useRef } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
import { YACHT_PROPERTY_TYPES } from "@/components/booking/Yatchpropertytypes";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCurrency } from "@/lib/currency-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import type { SizeQuote } from "@/lib/catalog-api";

export const CATEGORY_LABEL_KEYS: Record<string, TranslationKey> = {
  "Studio": "propStudio",
  "Home": "propHome",
  "Villa": "propVilla",
  "Estate": "propEstate",
  "VIP": "propVip",
  "Apartment / Flat": "propApartment",
  "Townhouse": "propTownhouse",
  "Home / House": "propHouse",
  "Penthouse": "propPenthouse",
  "Rough Clean": "propRoughClean",
  "Touch-Up Clean": "propTouchUpClean",
  "Final Post-Build Clean": "propFinalPostBuildClean",
  "Heavy-Duty Deep Clean": "propHeavyDutyDeepClean",
  "Other": "propOther",
  "Private Parties & Celebrations": "propPrivateParties",
  "Weddings & Large Receptions": "propWeddings",
  "Corporate Events & Galas": "propCorporateEvents",
  "Concerts, Festivals & Live Venues": "propConcertsFestivals",
  "Pop-Up Shops & Retail Exhibitions": "propPopUpShops",
  "Art Galleries & Cultural Exhibitions": "propArtGalleries",
  "Fashion Shows & Runway Events": "propFashionShows",
  "Film, TV & Commercial Shoots": "propFilmTvShoots",
  "Charity Auctions & Fundraisers": "propCharityAuctions",
  "Micro": "propMicro",
  "Compact": "propCompact",
  "Small": "propSmall",
  "Medium": "propMedium",
  "Large": "propLarge",
  "Luxury / Enterprise": "propEnterprise",
  "Corporate & Legal Office": "propCorporateLegal",
  "Government / SCIF / Data...": "propGovernmentScif",
  "Healthcare & Medical...": "propHealthcareMedical",
  "Industrial & Construction": "propIndustrialConstruction",
  "VIP Estate / Executive...": "propVipEstate",
  "Event Venue &...": "propEventVenue",
  "Emergency / Biohazard...": "propEmergencyBiohazard",
  "Retail & Commercial...": "propRetailCommercial",
  "Personal / Work Device...": "propPersonalWorkDevice",
  "Corporate Network /...": "propCorporateNetwork",
  "Motorboat / Day Cruiser": "yachtMotorboat",
  "Luxury Express...": "yachtLuxuryExpress",
  "Flybridge Motor Yacht": "yachtFlybridge",
  "Superyacht": "yachtSuperyacht",
  "Megayacht": "yachtMegayacht",
  "Sailing Yacht / Catamaran": "yachtSailingCatamaran",

  //
  "Luxury Villa": "propLuxuryVilla",
    "Airbnb": "propAirbnb",

    //industrail property types
     "Micro Office":"propMicroOffice",
     "Office":"propOffice",
     "Corporate Office":"propCorporateOffice",
     "Co-working Space":"propCoWorkingSpace",
     "Hotel":"propHotel",
     "Restaurant":"propRestaurant",
     "Cafe":"propCafe",
     "Bar":"propBar",
     "Clinic":"propClinic",
     "Hospital":"propHospital",
     "Dental Clinic":"propDentalClinic",
     "Pharmacy":"propPharmacy",
     "Laboratory":"propLaboratory",
     "Beauty Salon":"propBeautySalon",
     "Spa":"propSpa",
     "Bakery":"propBakery",
     "Fast Food":"propFastFood",
     "Boutique Shop":"propBoutiqueShop",
     "Supermarket":"propSupermarket",
     "Mall":"propMall",
     "Showroom":"propShowroom",
     "Gym":"propGym",
     "Yoga Studio":"propYogaStudio",
     "School":"propSchool",
     "Nursery":"propNursery",
     "Airport":"propAirport",

};

/**
 * Some categories store a translation key (e.g. "propMicroOffice") as their
 * label. The backend renders property type as-is in emails/PDFs/admin, so
 * send it the English name instead.
 */
export function propertyTypeEnglishName(propertyType: string): string {
  const match = Object.entries(CATEGORY_LABEL_KEYS).find(([, key]) => key === propertyType);
  return match ? match[0] : propertyType;
}

export interface PropertyCategory {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  locked: boolean;
  /** Explicit, non-uniform size list. When present, overrides min/max/step for building options. */
  sizes?: number[];
  /** Fully pre-formatted dropdown text. When present, overrides the default "label/sublabel (range)" rendering. */
  dropdownLabel?: string;
}

/**
 * Residential property categories and industrial property categories for the common services
 * of 
 * steam cleaning
 * Post construction
 * sanitization
 * 
 * as the property types of the above services
 * 
 */

const SANITIZE_OTHER_PROPERTY_CATEGORY: PropertyCategory = {
  id: "other",
  label: "propOther",
  icon: "📐",
  min: 20,
  max: 500,
  step: 10,
  locked: false,
};



//sanitize categories
const SANITIZE_RESIDENTIAL_CATEGORYIES = [
  { id: "studio", label: "propStudio", icon: "🏢", min: 20, max: 40, step: 1, locked: false },
  { id: "apartment", label: "propApartment", icon: "🏬", min: 45, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: "🏘️", min: 90, max: 220, step: 5, locked: false },
  { id: "home", label: "propHome", icon: "🏡", min: 100, max: 350, step: 10, locked: false },
  {
    id: "penthouse",
    label: "propPenthouse",
    icon: "🏙️",
    min: 120,
    max: 400,
    step: 10,

    locked: false,
  },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: "🏰",
    min: 20,
    max: 150,
    step: 5,

    locked: false,
  },
  {
    id: "airbnb",
    label: "propAirbnb",
    icon: "🌟",
    min: 20,
    max: 150,
    step: 5,

    locked: false,
  },
  { ...SANITIZE_OTHER_PROPERTY_CATEGORY }

]

const SANITIZE_INDUSTRIAL_CATEGORYIES = [
  {
    id: "micro-office",
    label: "propMicroOffice",
    icon: "🏢",
    min: 20,
    max: 50,
    step: 5,
    //sizes: [20, 25, 30, 35, 40, 45, 50],
    locked: false,
  },
  {
    id: "office",
    label: "propOffice",
    icon: "💼",
    min: 50,
    max: 200,
    step: 10,
    //sizes: [50, 68, 86, 104, 122, 140, 158, 176, 194],
    locked: false,
  },
  {
    id: "corporate-office",
    label: "propCorporateOffice",
    icon: "🏙️",
    min: 200,
    max: 500,
    step: 25,
    //sizes: [200, 237, 274, 311, 348, 385, 422, 459, 496],
    locked: false,
  },
  {
    id: "co-working-space",
    label: "propCoWorkingSpace",
    icon: "🧑‍💻",
    min: 100,
    max: 500,
    step: 25,
    // sizes: [100, 150, 200, 250, 300, 350, 400, 450, 500],
    locked: false,
  },
  {
    id: "hotel",
    label: "propHotel",
    icon: "🏨",
    min: 250,
    max: 500,
    step: 25,
    // sizes: [250, 281, 312, 343, 374, 405, 436, 467, 498,500],
    locked: false,
  },
  {
    id: "airbnb",
    label: "propAirbnb",
    icon: "🏠",
    min: 20,
    max: 150,
    step: 5,
    //sizes: [20, 36, 52, 68, 84, 100, 116, 132, 148,150],
    locked: false,
  },
  {
    id: "restaurant",
    label: "propRestaurant",
    icon: "🍽️",
    min: 60,
    max: 300,
    step: 10,
    //sizes: [60, 90, 120, 150, 180, 210, 240, 270, 300],
    locked: false,
  },
  {
    id: "cafe",
    label: "propCafe",
    icon: "☕",
    min: 30,
    max: 120,
    step: 5,
    //sizes: [30, 41, 52, 63, 74, 85, 96, 107, 118],
    locked: false,
  },
  {
    id: "bar",
    label: "propBar",
    icon: "🍸",
    min: 40,
    max: 200,
    step: 10,
    //sizes: [40, 60, 80, 100, 120, 140, 160, 180, 200],
    locked: false,
  },
  {
    id: "clinic",
    label: "propClinic",
    icon: "🩺",
    min: 50,
    max: 180,
    step: 10,
    //sizes: [50, 66, 82, 98, 114, 130, 146, 162, 178,180],
    locked: false,
  },
  {
    id: "hospital",
    label: "propHospital",
    icon: "🏥",
    min: 350,
    max: 500,
    step: 25,
    //sizes: [350, 368, 386, 404, 422, 440, 458, 476, 494,500],
    locked: false,
  },
  {
    id: "dental-clinic",
    label: "propDentalClinic",
    icon: "🦷",
    min: 40,
    max: 150,
    step: 5,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "pharmacy",
    label: "propPharmacy",
    icon: "💊",
    min: 30,
    max: 120,
    step: 5,
    //sizes: [30, 41, 52, 63, 74, 85, 96, 107, 118],
    locked: false,
  },
  {
    id: "laboratory",
    label: "propLaboratory",
    icon: "🔬",
    min: 50,
    max: 250,
    step: 10,
    // sizes: [50, 75, 100, 125, 150, 175, 200, 225, 250],
    locked: false,
  },
  {
    id: "beauty-salon",
    label: "propBeautySalon",
    icon: "💇",
    min: 30,
    max: 100,
    step: 5,
    //sizes: [30, 38, 46, 54, 62, 70, 78, 86, 94],
    locked: false,
  },
  {
    id: "spa",
    label: "propSpa",
    icon: "💆",
    min: 80,
    max: 300,
    step: 10,
    //sizes: [80, 107, 134, 161, 188, 215, 242, 269, 296],
    locked: false,
  },
  {
    id: "bakery",
    label: "propBakery",
    icon: "🥖",
    min: 30,
    max: 100,
    step: 5,
    //sizes: [30, 38, 46, 54, 62, 70, 78, 86, 94],
    locked: false,
  },
  {
    id: "fast-food",
    label: "propFastFood",
    icon: "🍔",
    min: 40,
    max: 150,
    step: 5,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "boutique-shop",
    label: "propBoutiqueShop",
    icon: "🛍️",
    min: 25,
    max: 150,
    step: 5,
    //sizes: [25, 40, 55, 70, 85, 100, 115, 130, 145],
    locked: false,
  },
  {
    id: "supermarket",
    label: "propSupermarket",
    icon: "🛒",
    min: 200,
    max: 500,
    step: 25,
    // sizes: [200, 237, 274, 311, 348, 385, 422, 459, 496],
    locked: false,
  },
  {
    id: "mall",
    label: "propMall",
    icon: "🏬",
    min: 400,
    max: 500,
    step: 25,
    //sizes: [400, 412, 424, 436, 448, 460, 472, 484, 496],
    locked: false,
  },
  {
    id: "showroom",
    label: "propShowroom",
    icon: "🛋️",
    min: 100,
    max: 400,
    step: 25,
    //sizes: [100, 137, 174, 211, 248, 285, 322, 359, 396],
    locked: false,
  },
  {
    id: "gym",
    label: "propGym",
    icon: "🏋️",
    min: 80,
    max: 400,
    step: 25,
    //sizes: [80, 120, 160, 200, 240, 280, 320, 360, 400],
    locked: false,
  },
  {
    id: "yoga-studio",
    label: "propYogaStudio",
    icon: "🧘",
    min: 40,
    max: 150,
    step: 5,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "school",
    label: "propSchool",
    icon: "🏫",
    min: 300,
    max: 500,
    step: 25,
    //sizes: [300, 325, 350, 375, 400, 425, 450, 475, 500],
    locked: false,
  },
  {
    id: "nursery",
    label: "propNursery",
    icon: "👶",
    min: 60,
    max: 200,
    step: 10,
    //sizes: [60, 77, 94, 111, 128, 145, 162, 179, 196],
    locked: false,
  },
  {
    id: "airport",
    label: "propAirport",
    icon: "✈️",
    min: 450,
    max: 500,
    step: 25,
    //sizes: [450, 456, 462, 468, 474, 480, 486, 492, 498],
    locked: false,
  },
  {
    id: "other",
    label: "propOther",
    icon: "📦",
    min: 20,
    max: 500,
    step: 25,
    //sizes: [20, 80, 140, 200, 260, 320, 380, 440, 500],
    locked: false,
  }
]

export function getPropertyCategoriesForServiceOfSanitize(serviceSlug?: string): PropertyCategory[] {
  return [...SANITIZE_RESIDENTIAL_CATEGORYIES, ...SANITIZE_INDUSTRIAL_CATEGORYIES];
}

function getPropertyCategory(value: number, categories: PropertyCategory[]): PropertyCategory {
  return categories.find((c) => value >= c.min && value <= c.max) ?? categories[0];
}

function buildSizeOptions(cat: PropertyCategory): number[] {
  if (cat.sizes) return cat.sizes;
  const sizes: number[] = [];
  for (let s = cat.min; s <= cat.max; s += cat.step) sizes.push(s);
  if (sizes[sizes.length - 1] !== cat.max) sizes.push(cat.max);
  return sizes;
}

function formatSizeRange(cat: PropertyCategory): string {
  if (cat.sizes) {
    const last = cat.sizes[cat.sizes.length - 1];
    return `${cat.sizes[0]} m² - ${last} m²`;
  }
  return `${cat.min} m² - ${cat.max} m²`;
}

function formatFt2(m2: number): string {
  return Math.round(m2 * 10.7639).toLocaleString();
}

function DisinfectionSprayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 2v3" />
      <path d="M7 5h6" />
      <path d="M7 8h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
      <path d="M13 5l2 3" />
      <circle cx="18" cy="4" r="0.75" fill="currentColor" />
      <circle cx="20" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

function getPartitionNames(categoryLabel?: string) {
  
  const label = (categoryLabel ?? "").toLowerCase();
  if (label.includes("studio")) {
    return { left: "studioLeft", right: "studioRight" };
  }
  if (label.includes("apartment") || label.includes("flat")) {
    return { left: "apartmentLeft", right: "apartmentRight" };
  }
  if (label.includes("office") || label.includes("corporate") || label.includes("legal")) {
    return { left: "corporateOfficeLeft", right: "corporateOfficeLeft" };
  }
  if (label.includes("government") || label.includes("medical") || label.includes("healthcare")) {
    return { left: "govermmentLeft", right: "LaboratoryRight" };
  }
  if (label.includes("industrial") || label.includes("construction")) {
    return { left: "industrialLeft", right: "industrialRight" };
  }
  if (label.includes("villa") || label.includes("estate")) {
    return { left: "villaLeft", right: "villaLeft" };
  }
  if (label.includes("penthouse")) {
    return { left: "penthouseLeft", right: "penthouseRight" };
  }
  return { left: "defaultLeft", right: "defaultright" };
}

interface SanitizeSizeVisualizationProps {
  value: number;
  activeCategory?: PropertyCategory;
  isDisinfection?: boolean;
  isDeepClean?: boolean;
  quote?: SizeQuote | null;
}

export function SanitizeSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
}: SanitizeSizeVisualizationProps) {
  const { symbol } = useCurrency();

  const {translate} = useLanguage()
  // Dynamic dimensions based on area
  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  // Cost, rate and labor come from the same size quote the booking is priced with
  const range = (min: string, max: string) => (min === max ? min : `${min} – ${max}`);
  const hasPrice = !!quote?.bookable && quote.priceMin != null && quote.priceMax != null;
  const hasHours = !!quote?.bookable && quote.minHours != null && quote.maxHours != null;
  const estimatedCost = hasPrice
    ? range(`${symbol}${quote!.priceMin!.toFixed(2)}`, `${symbol}${quote!.priceMax!.toFixed(2)}`)
    : "—";
  const serviceRate = hasPrice && value > 0
    ? `${range(`${symbol}${(quote!.priceMin! / value).toFixed(2)}`, `${symbol}${(quote!.priceMax! / value).toFixed(2)}`)}/m²`
    : "—";
  const labor = hasHours
    ? `${range(String(quote!.minHours), String(quote!.maxHours))}h (${quote!.cleanerCount ?? 1} ${translate("CrewWord")})`
    : "—";

  const partition = getPartitionNames(activeCategory?.label);

  const surfaceTitle = isDeepClean && isDisinfection
    ? "deepCleanDisinfection"
    : isDeepClean
      ? "intensiveDeepClean"
      : isDisinfection
        ? "hospitalGradeDisinfection"
        : "standardSurfaceClean";

  return (
    <div
      className="w-full rounded-2xl bg-[#0B1528] border border-blue-900/40 p-4 sm:p-6 mb-6 shadow-xl relative overflow-hidden"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(56, 189, 248, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "28px 28px",
      }}
    >
      {/* Top Header Row: Target Area Badge */}
      <div className="flex items-center justify-between">
        <div className="bg-[#132238]/90 border border-blue-500/20 rounded-xl px-3.5 py-2 inline-flex flex-col shadow-sm backdrop-blur-md">
          <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 tracking-wider uppercase">
            {translate("serviceTargetArea")}
          </span>
          <span className="text-sm sm:text-base font-bold text-[#38BDF8] mt-0.5">
            {value} m² • {formatFt2(value)} ft²
          </span>
        </div>
      </div>

      {/* Center Floorplan Diagram */}
      <div className="grid grid-cols-[auto_minmax(0,380px)] sm:grid-cols-[auto_minmax(0,440px)] justify-center items-center gap-2 sm:gap-4 my-4 sm:my-6 w-full max-w-[650px] mx-auto">
          {/* Empty cell above the depth dimension so the span aligns with the box */}
          <div />

          {/* Top Span Dimension */}
          <div className="flex flex-col items-center w-full">
            <span className="text-xs text-gray-300 font-medium mb-1 tracking-wide">
              {span} m span
            </span>
            <div className="flex items-center w-full">
              <div className="w-px h-3 bg-gray-500" />
              <div className="flex-1 h-px bg-gray-600" />
              <div className="w-px h-3 bg-gray-500" />
            </div>
          </div>

          {/* Left Depth Dimension */}
          <div className="flex items-center gap-1 shrink-0 self-stretch">
            <span className="text-xs text-gray-300 font-medium -rotate-90 origin-center whitespace-nowrap">
              {depth} m depth
            </span>
            <div className="flex flex-col items-center self-stretch justify-between">
              <div className="w-3 h-px bg-gray-500" />
              <div className="w-px flex-1 bg-gray-600" />
              <div className="w-3 h-px bg-gray-500" />
            </div>
          </div>

          {/* Blueprint Box */}
          <div className="w-full h-[120px] sm:h-[150px] rounded-2xl border-2 border-[#38BDF8] bg-[#142A4A]/80 shadow-[0_0_25px_rgba(56,189,248,0.2)] relative flex flex-col justify-between p-3 sm:p-4 backdrop-blur-sm transition-all duration-300">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#38BDF8] tracking-widest uppercase">
              {translate(surfaceTitle as TranslationKey)}
            </span>

            <div className="flex items-center justify-between h-full w-full relative mt-1">
              {/* Left Partition */}
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-100">
                  {translate(partition.left as TranslationKey)}
                </span>
              </div>

              {/* Center Dashed Divider */}
              <div className="h-full border-r-2 border-dashed border-[#38BDF8]/60 my-auto" />

              {/* Right Partition */}
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-100">
                  {translate(partition.right as TranslationKey)}
                </span>
              </div>
            </div>
          </div>
      </div>

      {/* Bottom Metrics 3 Columns */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-white/10 w-full text-center">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">{translate("EstimatedCost")}</p>
          <p className="text-base sm:text-xl font-bold text-[#38BDF8]">
            {estimatedCost}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">{translate("ServiceRate")}</p>
          <p className="text-base sm:text-xl font-bold text-white">
            {serviceRate}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">{translate("EstLabor")}</p>
          <p className="text-base sm:text-xl font-bold text-white">
            {labor}
          </p>
        </div>
      </div>
    </div>
  );
}

export interface PropertyTypeSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  categories?: PropertyCategory[];
  /** Fires with the active category whenever it changes (including on mount). */
  onCategoryChange?: (category: PropertyCategory) => void;
  disinfection?: boolean;
  onDisinfectionChange?: (selected: boolean) => void;
  deepClean?: boolean;
  onDeepCleanChange?: (selected: boolean) => void;
  /** Fires when the Residential / Industrial switch changes. */
  onServiceCategoryChange?: (category: "residential" | "industrial") => void;
  quote?: SizeQuote | null;
}


export function PropertyTypeSizeSelectorSanitizeCommonFlow({
  value,
  onChange,
  categories = [...SANITIZE_RESIDENTIAL_CATEGORYIES, ...SANITIZE_INDUSTRIAL_CATEGORYIES],
  onCategoryChange,
  disinfection: controlledDisinfection,
  onDisinfectionChange,
  deepClean: controlledDeepClean,
  onDeepCleanChange,
  onServiceCategoryChange,
  quote,
}: PropertyTypeSizeSelectorProps) {
  const [internalDisinfection, setInternalDisinfection] = useState(false);
  const [internalDeepClean, setInternalDeepClean] = useState(false);

  const isDisinfection = controlledDisinfection !== undefined ? controlledDisinfection : internalDisinfection;
  const isDeepClean = controlledDeepClean !== undefined ? controlledDeepClean : internalDeepClean;

  const setDisinfection = (val: boolean) => {
    if (controlledDisinfection === undefined) {
      setInternalDisinfection(val);
    }
    onDisinfectionChange?.(val);
  };

  const setDeepClean = (val: boolean) => {
    if (controlledDeepClean === undefined) {
      setInternalDeepClean(val);
    }
    onDeepCleanChange?.(val);
  };

  // Disinfection and Deep Clean are mutually exclusive: selecting one clears the other
  const handleToggleDisinfection = () => {
    const nextVal = !isDisinfection;
    setDisinfection(nextVal);
    if (nextVal && isDeepClean) setDeepClean(false);
  };

  const handleToggleDeepClean = () => {
    const nextVal = !isDeepClean;
    setDeepClean(nextVal);
    if (nextVal && isDisinfection) setDisinfection(false);
  };

  //handle Service Catagory button active
  const [isActiveCategorySwitch, setIsActiveCategorySwitch] = useState<string>("residential");

  const { translate } = useLanguage();

  //set sanitizing categories
  //industrial and residential categories
  const selectableCategories =
    isActiveCategorySwitch === "residential" ? SANITIZE_RESIDENTIAL_CATEGORYIES : SANITIZE_INDUSTRIAL_CATEGORYIES;

  // Tracked explicitly (not re-derived from `value` every render)
  const [activeCategoryId, setActiveCategoryId] = useState(() => selectableCategories[0].id);

  const activeCategory = selectableCategories.find((c) => c.id === activeCategoryId) ?? selectableCategories[0];
  const sizeOptions = buildSizeOptions(activeCategory);

  useEffect(() => {
    onCategoryChange?.(activeCategory);
  }, [activeCategory, onCategoryChange]);

  // Ensure value stays strictly within activeCategory bounds [min, max]
  useEffect(() => {
    if (value > activeCategory.max) {
      onChange(activeCategory.max);
    } else if (value < activeCategory.min) {
      onChange(activeCategory.min);
    }
  }, [activeCategory, value, onChange]);

  function handleCardClick(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      const initialSize = nextCat?.sizes ? nextCat.sizes[0] : nextCat.min;
      onChange(initialSize);
    }
  }

  // Calculate current size index & surrounding options for the wheel
  const currentIndex = Math.max(
    0,
    sizeOptions.indexOf(value) !== -1 ? sizeOptions.indexOf(value) : 0
  );
  const prevSize = currentIndex > 0 ? sizeOptions[currentIndex - 1] : null;
  const nextSize = currentIndex < sizeOptions.length - 1 ? sizeOptions[currentIndex + 1] : null;

  function handleNext() {
    if (currentIndex < sizeOptions.length - 1) {
      const nextVal = sizeOptions[currentIndex + 1];
      if (nextVal <= activeCategory.max) {
        onChange(nextVal);
      }
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      const prevVal = sizeOptions[currentIndex - 1];
      if (prevVal >= activeCategory.min) {
        onChange(prevVal);
      }
    }
  }

  // Scrolling over the size wheel changes the size instead of scrolling the page. React
  // attaches onWheel as a passive listener, so preventDefault must happen on a native,
  // non-passive listener instead.
  const wheelContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  //dynamically changes category of sanitize
  const handleCategorySwitch = (categoryName: string): void => {
    setIsActiveCategorySwitch(categoryName);
    onServiceCategoryChange?.(categoryName === "industrial" ? "industrial" : "residential");
    const nextCategories =
      categoryName === "residential" ? SANITIZE_RESIDENTIAL_CATEGORYIES : SANITIZE_INDUSTRIAL_CATEGORYIES;
    const firstCat = nextCategories[0];
    setActiveCategoryId(firstCat.id);
    const initialSize = firstCat.sizes ? firstCat.sizes[0] : firstCat.min;
    onChange(initialSize);
  };

  return (
    <section className="rounded-2xl border border-[#C6A868] bg-brand-navy p-5 sm:p-6 shadow-sm w-full">
      {/* Dynamic Size & Area Floorplan Visualization Component */}
      <SanitizeSizeVisualization
        value={value}
        activeCategory={activeCategory}
        isDisinfection={isDisinfection}
        isDeepClean={isDeepClean}
        quote={quote}
      />

      <div className="w-full">
        <h2 className="text-base sm:text-lg font-bold text-gray-300 mb-3">{translate("propServiceCatagory")}</h2>
        <div className="w-full p-1 flex justify-between items-center mb-6 bg-white/5 backdrop-blur-md] rounded-[27px]">
          <button
            className={`md:w-[49.5%]  
            w-[45%] py-4 px-3 rounded-4xl
            ${isActiveCategorySwitch === "residential" ? "bg-blue-500 border-[#C6A868]/60" : "bg-transparent"} cursor-pointer text-[13px] md:text-[15px] text-white 
            font-bold `}
            onClick={() => handleCategorySwitch("residential")}
          >
            <span className="text-white">🏠</span>  {translate("propCatResidential")}
          </button>
          <button
            className={`md:w-[49.5%]  
            w-[45%] py-4 px-3  rounded-4xl
            ${isActiveCategorySwitch === "industrial" ? "bg-blue-500 border-[#C6A868]/60" : "bg-transparent"} cursor-pointer text-[13px] md:text-[15px]  text-white 
            font-bold `}
            onClick={() => handleCategorySwitch("industrial")}
          >
            <span className="text-white">🏭</span>  {translate("propCatIndustrial")}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start h-full">
        {/* Left Column: Property Type */}
        <div className="flex flex-col min-w-0 ">
          <h3 className="text-base sm:text-lg font-bold text-gray-300 mb-3">
            {translate("propTypeTitle")}</h3>

          <div
            className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden -mx-1 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", scrollSnapType: "x proximity" }}
          >
            {selectableCategories.map((cat) => {
              const isSelected = cat.id === activeCategory.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCardClick(cat.id)}
                  style={{ scrollSnapAlign: "start" }}
                  className={`shrink-0 w-[110px] h-[110px] sm:w-[118px] shadow-lg sm:h-[118px] rounded-xl border-2 flex flex-col items-center justify-center p-2.5 cursor-pointer transition-colors select-none 
                    ${isSelected
                      ? "bg-blue-600 border-[#B89642]"
                      : "bg-brand-navy/50 border-[#C6A868]/60 hover:border-[#B89642]"
                    }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl mb-1.5 transition-colors ${isSelected ? "bg-white/10" : "bg-[#F1F3F5]"
                      }`}
                  >
                    <span>{cat.icon}</span>
                  </div>
                  <span
                    className={`text-xs text-center leading-tight line-clamp-2 px-1 ${isSelected ? "font-bold text-white" : "font-semibold text-white"
                      }`}
                  >
                    {CATEGORY_LABEL_KEYS[cat.label] ? translate(CATEGORY_LABEL_KEYS[cat.label] as TranslationKey) : translate(cat.label as TranslationKey )}
                  </span> 
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-[#94A3B8] text-center mt-1.5 font-medium tracking-wide select-none">
            {translate("propTypeSwipe")}
          </p>


        </div>


        {/* Disinfection & Deep Clean Selectable Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3  items-center mt-4 h-full w-full">
          {/* Disinfection Card */}
          <button
            type="button"
            onClick={handleToggleDisinfection}
            className={`flex items-center justify-between p-4.5 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${isDisinfection
              ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
              : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
              }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <DisinfectionSprayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-gray-300" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                  {translate("DisinfectionName")}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                  {translate("HospitalGradeName")} (+0%)
                </span>
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDisinfection
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-white/20 bg-white/5"
                }`}
            >
              {isDisinfection && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </button>

          {/* Deep Clean Card */}
          <button
            type="button"
            onClick={handleToggleDeepClean}
            className={`flex items-center justify-between  p-4.5 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${isDeepClean
              ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
              : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
              }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-blue-400" />
              <div className="flex flex-col min-w-0">
                <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                  {translate("deepCleanName")}
                </span>
                <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                  {translate("deepCleanNameIntensive")} (+40%)
                </span> 
              </div>
            </div>
            <div
              className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDeepClean
                ? "border-blue-500 bg-blue-500 text-white"
                : "border-white/20 bg-white/5"
                }`}
            >
              {isDeepClean && <Check className="w-3.5 h-3.5 stroke-[3]" />}
            </div>
          </button>
        </div>
      </div>
      {/* Right Column: Property Size */}
      <div className="flex flex-col w-full mt-8">
        <h3 className="text-base sm:text-lg font-bold text-white mb-3">{translate("propSizeTitle")}</h3>

        <div className="flex   flex-col md:flex-row items-center w-full  gap-3">
          {/* Wheel Display Container */}
          <div
            ref={wheelContainerRef}
            className="flex-1 h-[110px] sm:h-[118px] w-full rounded-xl border-2 border-[#C6A868]/60 bg-gray-800 overflow-hidden shadow-sm flex flex-col justify-between select-none"
          >
            {/* Top Row: Previous size preview */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={prevSize === null}
              className="flex-1 hidden md:flex  items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
            >
              {prevSize !== null ? `${formatFt2(prevSize)} ft²` : "\u00A0"}
            </button>

            {/* Middle Row: Active selected size */}
            <div className=" relative flex-[1.6] bg-gray-700 text-white flex flex-col md:items-center px-4 items-start justify-center py-2 border-y border-[#C6A868]/40 shadow-inner">
              <span className="text-xl sm:text-2xl font-bold  leading-tight">
                {value} m²
              </span>
              <span className=" text-xs font-semibold text-[#B89642] leading-none mt-0.5">
                {formatFt2(value)} ft²
              </span>
              <div className="absolute right-4">
              <select
                value={value}
                onChange={(e) => {
                  const selectedVal = Number(e.target.value);
                  const clampedVal = Math.min(Math.max(selectedVal, activeCategory.min), activeCategory.max);
                  onChange(clampedVal);
                }}
                className="appearance-none py-2 pl-2 pr-9 block border border-gray-600 focus:border-gray-500 rounded-[10px] bg-gray-800 text-white cursor-pointer"
              >
                {sizeOptions
                  .filter((val) => val <= activeCategory.max && val >= activeCategory.min)
                  .map((Val, i) => (
                    <option key={i} value={Val} className="bg-gray-700 text-white">
                      {Val} m²
                    </option>
                  ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
              </div>
            </div>



            {/* Bottom Row: Next size preview */}
            <button
              type="button"
              onClick={handleNext}
              disabled={nextSize === null}
              className="flex-1 hidden md:flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-500 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
            >
              {nextSize !== null ? `${nextSize} m²` : "\u00A0"}
            </button>
          </div>

          {/* Right Buttons Stack */}
          {/**desktop view */}
          <div className="md:flex hidden w-[30%] h-[110px] sm:h-[118px]  flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleNext}
              disabled={nextSize === null}
              className="flex-1 w-[100%] rounded-xl border-2 hover:bg-blue-600 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase Property Size"
            >
              <span className="text-sm leading-none font-bold">↑</span>
              <span className="text-[9px] font-bold tracking-wider  mt-1">{translate("propSizeUp")}</span>
            </button>

            <button
              type="button"
              onClick={handlePrev}
              disabled={prevSize === null}
              className="flex-1 rounded-xl w-[100%] hover:bg-blue-600 border-2 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease Property Size"
            >
              <span className="text-sm leading-none font-bold">↓</span>
              <span className="text-[9px] font-bold tracking-wider  mt-1">{translate("propSizeDown")}</span>
            </button>
          </div>

          {/**mobile view */}
          <div className="flex md:hidden w-full  h-[110px] sm:h-[118px] w-[52px] flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={handleNext}
              disabled={nextSize === null}
              className="flex-1 rounded-xl bg-gray-800  text-white border-2 border-[#C6A868]/60  hover:bg-blue-600 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Increase Property Size"
            >
              <span className="text-sm leading-none font-bold">↑</span>
              <span className="text-[9px] font-bold tracking-wider  mt-1">{translate("propSizeUp")}</span>
            </button>

            <button
              type="button"
              onClick={handlePrev}
              disabled={prevSize === null}
              className="flex-1 rounded-xl border-2  bg-gray-800 text-white border-[#C6A868]/60  hover:bg-blue-600 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center  cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              aria-label="Decrease Property Size"
            >
              <span className="text-sm leading-none font-bold">↓</span>
              <span className="text-[9px] font-bold tracking-wider  mt-1">{translate("propSizeDown")}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

