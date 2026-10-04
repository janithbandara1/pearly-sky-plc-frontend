"use client";

import { useEffect, useState, useRef } from "react";
import { Check, Sparkles } from "lucide-react";
import { YACHT_PROPERTY_TYPES } from "@/components/booking/Yatchpropertytypes";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCurrency } from "@/lib/currency-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

const CATEGORY_LABEL_KEYS: Record<string, TranslationKey> = {
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
};

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

/** Generic scale used by services without a dedicated sizing scheme (e.g. commercial, post-construction). */
export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", sublabel: "Apt", icon: "🏢", min: 20, max: 80, step: 1, locked: false },
  { id: "home", label: "Home", icon: "🏡", min: 81, max: 400, step: 5, locked: false },
  { id: "villa", label: "Villa", icon: "🏰", min: 401, max: 1000, step: 20, locked: false },
  { id: "estate", label: "Estate", icon: "🏛️", min: 1001, max: 5000, step: 50, locked: true },
  { id: "vip", label: "VIP", sublabel: "Diamond", icon: "💎", min: 5001, max: 9999, step: 100, locked: true },
];

/**
 * Residential sizing scheme (m² / ft²) for standard-residential, deep-cleaning, end-of-tenancy,
 * last-minute, express-refresh, and steam-cleaning services.
 * Ranges intentionally overlap (e.g. a 120m² unit is both a "Home" and a "Townhouse") so the
 * active category is tracked explicitly rather than re-derived from the size on every render.
 */
export const RESIDENTIAL_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", icon: "🏢", min: 20, max: 50, step: 1, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", min: 40, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", min: 100, max: 250, step: 5, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", min: 120, max: 350, step: 10, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    min: 150,
    max: 400,
    step: 0,
    sizes: [150, 175, 200, 225, 250, 275, 300, 350, 400],
    locked: false,
  },
  {
    id: "luxury-villa",
    label: "Luxury Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "airbnb",
    label: "Airbnb",
    icon: "🌟",
    min: 250,
    max: 800,
    step: 0,
    locked: false,
  }
];

const RESIDENTIAL_SCHEME_SERVICE_SLUGS = new Set([
  "regular-home-cleaning",
  "regular-maintenance-cleaning",
  "essential-touch-up-cleaning",
  "quick-touch-up-cleaning",
  "same-day-priority-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "same-day-priority-cleaning",
  "essential-touch-up-cleaning",
  "laundry-service",
  "laundry-services",
  "laundry-linen-care",
  "move-in-out-transport-service",
  "move-in-out-transport-health",
]);


/** Catch-all type for properties that don't fit a service's named tiers. */
const OTHER_PROPERTY_CATEGORY: PropertyCategory = {
  id: "other",
  label: "Other",
  icon: "📐",
  min: 20,
  max: 1000,
  step: 10,
  locked: false,
};


const HEALTHGUARD_SANITIZE_SLUGS = new Set(["healthguard-sanitization"]);

export const HEALTHGUARD_SANITIZE_SLUGS_PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    id: "corporate-legal",
    label: "Corporate & Legal Office",
    icon: "🏢",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "government-scif-data",
    label: "Government / SCIF / Data...",
    icon: "🛡️",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "healthcare-medical",
    label: "Healthcare & Medical...",
    icon: "🏥",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "industrial-construction",
    label: "Industrial & Construction",
    icon: "🏗️",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "vip-estate-executive",
    label: "VIP Estate / Executive...",
    icon: "🏰",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "event-venue",
    label: "Event Venue &...",
    icon: "🎪",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "emergency-biohazard",
    label: "Emergency / Biohazard...",
    icon: "☣️",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "retail-commercial",
    label: "Retail & Commercial...",
    icon: "🏬",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "personal-work-device",
    label: "Personal / Work Device...",
    icon: "💻",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
  {
    id: "corporate-network",
    label: "Corporate Network /...",
    icon: "🌐",
    min: 20,
    max: 1000,
    step: 5,
    locked: false,
  },
];

//sanitize categories
const RESIDENTIAL_CATEGORYIES = [
  { id: "studio", label: "Studio", icon: "🏢", min: 20, max: 50, step: 1, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", min: 40, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", min: 100, max: 250, step: 5, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", min: 120, max: 350, step: 10, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    min: 150,
    max: 400,
    step: 0,
    sizes: [150, 175, 200, 225, 250, 275, 300, 350, 400],
    locked: false,
  },
  {
    id: "luxury-villa",
    label: "Luxury Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "airbnb",
    label: "Airbnb",
    icon: "🌟",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  { ...OTHER_PROPERTY_CATEGORY }

]

const INDUSTRIAL_CATEGORYIES = [
  {
    id: "corporate-legal",
    label: "Corporate & Legal Office",
    icon: "🏢",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "government-scif-data",
    label: "Government / SCIF / Data...",
    icon: "🛡️",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "healthcare-medical",
    label: "Healthcare & Medical...",
    icon: "🏥",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "industrial-construction",
    label: "Industrial & Construction",
    icon: "🏗️",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "vip-estate-executive",
    label: "VIP Estate / Executive...",
    icon: "🏰",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "event-venue",
    label: "Event Venue &...",
    icon: "🎪",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "emergency-biohazard",
    label: "Emergency / Biohazard...",
    icon: "☣️",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "retail-commercial",
    label: "Retail & Commercial...",
    icon: "🏬",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "personal-work-device",
    label: "Personal / Work Device...",
    icon: "💻",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  {
    id: "corporate-network",
    label: "Corporate Network /...",
    icon: "🌐",
    min: 20,
    max: 1000,
    step: 5,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
]

export function getPropertyCategoriesForServiceOfSanitize(serviceSlug: string): PropertyCategory[] {

  return HEALTHGUARD_SANITIZE_SLUGS_PROPERTY_CATEGORIES;

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
    return { left: "Living & Sleeping Area", right: "Kitchenette & Bath" };
  }
  if (label.includes("apartment") || label.includes("flat")) {
    return { left: "Bedrooms & Suites", right: "Living & Dinette" };
  }
  if (label.includes("office") || label.includes("corporate") || label.includes("legal")) {
    return { left: "Executive & Workstations", right: "Conference & Facilities" };
  }
  if (label.includes("government") || label.includes("medical") || label.includes("healthcare")) {
    return { left: "Sterile Zone & Labs", right: "Reception & Common Areas" };
  }
  if (label.includes("industrial") || label.includes("construction")) {
    return { left: "Production & Heavy Bays", right: "Control & Utility Spaces" };
  }
  if (label.includes("villa") || label.includes("estate")) {
    return { left: "Master Wings & Suites", right: "Grand Salon & Dining" };
  }
  if (label.includes("penthouse")) {
    return { left: "Sky Suite & Terraces", right: "Open Living & Kitchen" };
  }
  return { left: "Upper Levels", right: "Lower Living & Dinette" };
}

interface SanitizeSizeVisualizationProps {
  value: number;
  activeCategory?: PropertyCategory;
  isDisinfection?: boolean;
  isDeepClean?: boolean;
}

export function SanitizeSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
}: SanitizeSizeVisualizationProps) {
  const { symbol } = useCurrency();

  // Dynamic dimensions based on area
  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  // Dynamic cost, rate, and labor calculations
  const rate = 4.9;
  const multiplier = isDeepClean ? 1.4 : 1.0;
  const disinfectionExtra = isDisinfection ? 25 : 0;
  const estimatedCost = Math.round(value * rate * multiplier + 50 + disinfectionExtra);
  const laborHours = Number(Math.max(1.5, value * 0.12 * (isDeepClean ? 1.3 : 1.0) + 1.8).toFixed(1));
  const crewCount = value > 250 ? 4 : value > 100 ? 3 : 2;

  const partition = getPartitionNames(activeCategory?.label);

  const surfaceTitle = isDeepClean && isDisinfection
    ? "DEEP CLEAN & HOSPITAL-GRADE DISINFECTION"
    : isDeepClean
      ? "INTENSIVE DEEP CLEAN"
      : isDisinfection
        ? "HOSPITAL-GRADE DISINFECTION"
        : "STANDARD SURFACE CLEAN";

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
            SERVICE TARGET AREA
          </span>
          <span className="text-sm sm:text-base font-bold text-[#38BDF8] mt-0.5">
            {value} m² • {formatFt2(value)} ft²
          </span>
        </div>
      </div>

      {/* Center Floorplan Diagram */}
      <div className="flex flex-col items-center justify-center my-4 sm:my-6 w-full max-w-[650px] mx-auto">
        {/* Top Span Dimension */}
        <div className="flex flex-col items-center w-full max-w-[380px] sm:max-w-[440px] mb-2">
          <span className="text-xs text-gray-300 font-medium mb-1 tracking-wide">
            {span} m span
          </span>
          <div className="flex items-center w-full">
            <div className="w-px h-3 bg-gray-500" />
            <div className="flex-1 h-px bg-gray-600" />
            <div className="w-px h-3 bg-gray-500" />
          </div>
        </div>

        {/* Floorplan Body with Left Depth Dimension */}
        <div className="flex items-center justify-center w-full gap-2 sm:gap-4">
          {/* Left Depth Dimension */}
          <div className="flex items-center gap-1 shrink-0">
            <span className="text-xs text-gray-300 font-medium -rotate-90 origin-center whitespace-nowrap">
              {depth} m depth
            </span>
            <div className="flex flex-col items-center h-28 sm:h-36 justify-between">
              <div className="w-3 h-px bg-gray-500" />
              <div className="w-px flex-1 bg-gray-600" />
              <div className="w-3 h-px bg-gray-500" />
            </div>
          </div>

          {/* Blueprint Box */}
          <div className="w-full max-w-[380px] sm:max-w-[440px] h-[120px] sm:h-[150px] rounded-2xl border-2 border-[#38BDF8] bg-[#142A4A]/80 shadow-[0_0_25px_rgba(56,189,248,0.2)] relative flex flex-col justify-between p-3 sm:p-4 backdrop-blur-sm transition-all duration-300">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#38BDF8] tracking-widest uppercase">
              {surfaceTitle}
            </span>

            <div className="flex items-center justify-between h-full w-full relative mt-1">
              {/* Left Partition */}
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-100">
                  {partition.left}
                </span>
              </div>

              {/* Center Dashed Divider */}
              <div className="h-full border-r-2 border-dashed border-[#38BDF8]/60 my-auto" />

              {/* Right Partition */}
              <div className="flex-1 flex items-center justify-center text-center px-2">
                <span className="text-xs sm:text-sm font-semibold text-slate-100">
                  {partition.right}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metrics 3 Columns */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-4 border-t border-white/10 w-full text-center">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Estimated Cost</p>
          <p className="text-lg sm:text-2xl font-bold text-[#38BDF8]">
            {"$"} {estimatedCost}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Service Rate</p>
          <p className="text-lg sm:text-2xl font-bold text-white">
            {"$"}{rate}/m²
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Est. Labor</p>
          <p className="text-lg sm:text-2xl font-bold text-white">
            {laborHours}h ({crewCount} crew)
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
}

export function PropertyTypeSizeSelectorSanitize({
  value,
  onChange,
  categories = PROPERTY_CATEGORIES,
  onCategoryChange,
  disinfection: controlledDisinfection,
  onDisinfectionChange,
  deepClean: controlledDeepClean,
  onDeepCleanChange,
}: PropertyTypeSizeSelectorProps) {
  const [internalDisinfection, setInternalDisinfection] = useState(false);
  const [internalDeepClean, setInternalDeepClean] = useState(false);

  const isDisinfection = controlledDisinfection !== undefined ? controlledDisinfection : internalDisinfection;
  const isDeepClean = controlledDeepClean !== undefined ? controlledDeepClean : internalDeepClean;

  const handleToggleDisinfection = () => {
    const nextVal = !isDisinfection;
    if (controlledDisinfection === undefined) {
      setInternalDisinfection(nextVal);
    }
    onDisinfectionChange?.(nextVal);
  };

  const handleToggleDeepClean = () => {
    const nextVal = !isDeepClean;
    if (controlledDeepClean === undefined) {
      setInternalDeepClean(nextVal);
    }
    onDeepCleanChange?.(nextVal);
  };

  //handle Service Catagory button active
  const [isActiveCategorySwitch, setIsActiveCategorySwitch] = useState<string>("residential")

  const { translate } = useLanguage();

  //set sanitizing categories
  //industial and residential categories

  const selectableCategories =
    isActiveCategorySwitch === "residential" ? RESIDENTIAL_CATEGORYIES : INDUSTRIAL_CATEGORYIES

  // Tracked explicitly (not re-derived from `value` every render) because some schemes have
  // overlapping category ranges — re-deriving would silently snap back to a different category.
  const [activeCategoryId, setActiveCategoryId] = useState(() => getPropertyCategory(value, categories).id);
  const [categoriesForActiveId, setCategoriesForActiveId] = useState(categories);

  if (categories !== categoriesForActiveId) {
    setCategoriesForActiveId(categories);
    setActiveCategoryId(getPropertyCategory(value, categories).id);
  }

  const activeCategory = categories.find((c) => c.id === activeCategoryId) ?? categories[0];
  const sizeOptions = buildSizeOptions(activeCategory);

  useEffect(() => {
    onCategoryChange?.(activeCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  function handleCardClick(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      onChange(nextCat?.sizes ? nextCat?.sizes[0] : nextCat.min);
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
      onChange(sizeOptions[currentIndex + 1]);
    }
  }

  function handlePrev() {
    if (currentIndex > 0) {
      onChange(sizeOptions[currentIndex - 1]);
    }
  }

  function handleSelect() {
    if (currentIndex > 0) {
      onChange(sizeOptions[currentIndex]);
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
    console.log(categoryName);

    setIsActiveCategorySwitch(categoryName)
  }

  useEffect(() => {
    handleCategorySwitch(isActiveCategorySwitch)
  }, [isActiveCategorySwitch])

  const sizesValues = [
    40, 60, 80, 100, 130, 150, 200, 300, 450, 600, 800
  ]

  return (
    <section className="rounded-2xl border border-[#C6A868] bg-brand-navy p-5 sm:p-6 shadow-sm w-full">
      {/* Dynamic Size & Area Floorplan Visualization Component */}
      <SanitizeSizeVisualization
        value={value}
        activeCategory={activeCategory}
        isDisinfection={isDisinfection}
        isDeepClean={isDeepClean}
      />

      <div className="w-full">
        <h2 className="text-base sm:text-lg font-bold text-gray-300 mb-3">Service Catagory</h2>
        <div className="w-full p-1 flex justify-between items-center mb-6 bg-white/5 backdrop-blur-md] rounded-[15px]">
          <button
            className={`md:w-[49%]  
            w-[45%] py-4 px-3 
            ${isActiveCategorySwitch === "residential" ? "bg-blue-500 border-[#C6A868]/60" : "bg-transparent"} cursor-pointer text-[13px] md:text-[15px] text-white 
            font-bold rounded-[10px]`}
            onClick={() => handleCategorySwitch("residential")}
          >
            <span className="text-white">🏠</span>  Residential
          </button>
          <button
            className={`md:w-[49%]  
            w-[45%] py-4 px-3 
            ${isActiveCategorySwitch === "industrial" ? "bg-blue-500 border-[#C6A868]/60" : "bg-transparent"} cursor-pointer text-[13px] md:text-[15px]  text-white 
            font-bold rounded-[10px]`}
            onClick={() => handleCategorySwitch("industrial")}
          >
            <span className="text-white">🏭</span>  Industrial
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Property Type */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-300 mb-3">
            {translate("propTypeTitle")}</h3>

          <div
            className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden -mx-1 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", scrollSnapType: "x proximity" }}
          >
            {selectableCategories.map((cat) => {
              const checkPropCat = isActiveCategorySwitch === "residential" ? RESIDENTIAL_CATEGORYIES : INDUSTRIAL_CATEGORYIES
              const activeCategory = checkPropCat.find((c) => c.id === activeCategoryId) ?? checkPropCat[0];
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
                    {CATEGORY_LABEL_KEYS[cat.label] ? translate(CATEGORY_LABEL_KEYS[cat.label]) : cat.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[11px] text-[#94A3B8] text-center mt-1.5 font-medium tracking-wide select-none">
            {translate("propTypeSwipe")}
          </p>

          {/* Disinfection & Deep Clean Selectable Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 w-full">
            {/* Disinfection Card */}
            <button
              type="button"
              onClick={handleToggleDisinfection}
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${isDisinfection
                  ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <DisinfectionSprayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-gray-300" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                    Disinfection
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                    Hospital-grade
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
              className={`flex items-center justify-between p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer select-none text-left ${isDeepClean
                  ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                  : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-blue-400" />
                <div className="flex flex-col min-w-0">
                  <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                    Deep Clean
                  </span>
                  <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                    Intensive (+40%)
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
        <div className="flex flex-col w-full">
          <h3 className="text-base sm:text-lg font-bold text-white mb-3">{translate("propSizeTitle")}</h3>

          <div className="flex  flex-col md:flex-row items-center  gap-3">
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
              <div className=" flex-[1.6] bg-gray-700 text-white flex flex-col md:items-center px-4 items-start justify-center py-2 border-y border-[#C6A868]/40 shadow-inner">
                <span className="text-xl sm:text-2xl font-bold  leading-tight">
                  {value} m²
                </span>
                <span className=" text-xs font-semibold text-[#B89642] leading-none mt-0.5">
                  {formatFt2(value)} ft²
                </span>
                <select
                  value={value}
                  onChange={(e) => onChange(Number(e.target.value))}
                  className="absolute md:hidden p-1 block right-15 border border-gray-600 focus:border-gray-500 rounded-[10px] bg-gray-800 text-white"
                >
                  {sizeOptions.map((Val, i) => (
                    <option key={i} value={Val} className="bg-gray-700 text-white">
                      {Val} m²
                    </option>
                  ))}
                </select>
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
            <div className="md:flex hidden  h-[110px] sm:h-[118px] w-[52px] flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleNext}
                disabled={nextSize === null}
                className="flex-1 rounded-xl border-2 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase Property Size"
              >
                <span className="text-sm leading-none font-bold">↑</span>
                <span className="text-[9px] font-bold tracking-wider  mt-1">{translate("propSizeUp")}</span>
              </button>

              <button
                type="button"
                onClick={handlePrev}
                disabled={prevSize === null}
                className="flex-1 rounded-xl border-2 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
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
      </div>
    </section>
  );
}

