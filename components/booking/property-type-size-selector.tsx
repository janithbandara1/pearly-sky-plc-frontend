"use client";

import { useEffect, useState, useRef } from "react";
import { YACHT_PROPERTY_TYPES } from "@/components/booking/Yatchpropertytypes";
import { useLanguage } from "@/lib/i18n/language-context";
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
    id: "villa",
    label: "Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
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

const PREMIUM_PROPERTY_SLUGS = new Set(["premium-rental-concierge-cleaning"]);
export const PREMIUM_PROPERTY_CATEGORIES: PropertyCategory[] = [
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
    id: "villa",
    label: "Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
  OTHER_PROPERTY_CATEGORY,
];


/** Post-construction sizing scheme, tracked by clean-up phase rather than property type. */
export const POST_CONSTRUCTION_PROPERTY_CATEGORIES: PropertyCategory[] = [
  {
    id: "rough-clean",
    label: "Rough Clean",
    dropdownLabel: "Rough Clean (Initial Debris & Dust Removal)",
    icon: "🧱",
    min: 20,
    max: 1000,
    step: 20,
    locked: false,
  },
  {
    id: "touch-up-clean",
    label: "Touch-Up Clean",
    dropdownLabel: "Touch-Up Clean (20 m² - 100 m² / 215 ft² - 1,076 ft²)",
    icon: "🧽",
    min: 20,
    max: 100,
    step: 5,
    locked: false,
  },
  {
    id: "final-post-build-clean",
    label: "Final Post-Build Clean",
    dropdownLabel: "Final Post-Build Clean (101 m² - 300 m² / 1,087 ft² - 3,229 ft²)",
    icon: "✨",
    min: 101,
    max: 300,
    step: 10,
    locked: false,
  },
  {
    id: "heavy-duty-construction-clean",
    label: "Heavy-Duty Deep Clean",
    dropdownLabel: "Heavy-Duty Deep Clean (301 m² - 1,000 m² / 3,240 ft² - 10,764 ft²)",
    icon: "🏗️",
    min: 301,
    max: 1000,
    step: 20,
    locked: false,
  },
  OTHER_PROPERTY_CATEGORY,
];

const POST_CONSTRUCTION_SERVICE_SLUGS = new Set([
  "post-construction-cleaning",
  "post-construction-renovation-cleaning",
]);

/** Venue-scale sizing scheme for post-event-cleaning, tracked by event type rather than property type. */
export const EVENT_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "private-parties", label: "Private Parties & Celebrations", icon: "🎈", min: 20, max: 1000, step: 25, locked: false },
  { id: "weddings", label: "Weddings & Large Receptions", icon: "💒", min: 20, max: 1000, step: 25, locked: false },
  { id: "corporate-events", label: "Corporate Events & Galas", icon: "💼", min: 20, max: 1000, step: 25, locked: false },
  { id: "concerts-festivals", label: "Concerts, Festivals & Live Venues", icon: "🎤", min: 20, max: 1000, step: 25, locked: false },
  { id: "pop-up-shops", label: "Pop-Up Shops & Retail Exhibitions", icon: "🛍️", min: 20, max: 1000, step: 25, locked: false },
  { id: "art-galleries", label: "Art Galleries & Cultural Exhibitions", icon: "🎨", min: 20, max: 1000, step: 25, locked: false },
  { id: "fashion-shows", label: "Fashion Shows & Runway Events", icon: "👗", min: 20, max: 1000, step: 25, locked: false },
  { id: "film-tv-shoots", label: "Film, TV & Commercial Shoots", icon: "📽️", min: 20, max: 1000, step: 25, locked: false },
  { id: "charity-auctions", label: "Charity Auctions & Fundraisers", icon: "🤝", min: 20, max: 1000, step: 25, locked: false },
];

const EVENT_SCHEME_SERVICE_SLUGS = new Set(["post-event-cleaning"]);

/** Commercial office cleaning uses bespoke office-size tiers instead of the generic residential scale. */
export const COMMERCIAL_OFFICE_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "micro", label: "Micro", icon: "🧳", min: 20, max: 50, step: 1, locked: false },
  { id: "compact", label: "Compact", icon: "📦", min: 51, max: 80, step: 5, locked: false },
  { id: "small", label: "Small", icon: "🏢", min: 81, max: 150, step: 5, locked: false },
  { id: "medium", label: "Medium", icon: "🏬", min: 151, max: 300, step: 10, locked: false },
  { id: "large", label: "Large", icon: "🌆", min: 301, max: 600, step: 20, locked: false },
  { id: "luxury", label: "Luxury / Enterprise", icon: "🏛️", min: 601, max: 1000, step: 20, locked: false },
  OTHER_PROPERTY_CATEGORY,
];

const COMMERCIAL_OFFICE_SERVICE_SLUGS = new Set(["commercial-office-cleaning"]);

const STEAM_CLEANING_SERVICES_SLUGS = new Set(["steam-cleaning"]);
export const STEAM_CLEANING_CATEGORIES: PropertyCategory[] = [
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
    id: "villa",
    label: "Villa",
    icon: "🏰",
    min: 250,
    max: 800,
    step: 0,
    sizes: [250, 300, 350, 400, 450, 500, 600, 700, 800],
    locked: false,
  },
];

const LUXURY_YACHT_CLEANING_SLUGS = new Set(["luxury-yacht-cleaning"]);

const HIGH_SECURITY_SERVICES_SLUGS = new Set(["high-security-property-care"]);
export const HIGH_SECURITY_PROPERTY_CATEGORIES: PropertyCategory[] = [
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

export function getPropertyCategoriesForService(serviceSlug: string): PropertyCategory[] {
  if (COMMERCIAL_OFFICE_SERVICE_SLUGS.has(serviceSlug)) return COMMERCIAL_OFFICE_PROPERTY_CATEGORIES;
  if (HIGH_SECURITY_SERVICES_SLUGS.has(serviceSlug)) return HIGH_SECURITY_PROPERTY_CATEGORIES;
  if (RESIDENTIAL_SCHEME_SERVICE_SLUGS.has(serviceSlug)) return RESIDENTIAL_PROPERTY_CATEGORIES;
  if (POST_CONSTRUCTION_SERVICE_SLUGS.has(serviceSlug)) return POST_CONSTRUCTION_PROPERTY_CATEGORIES;
  if (EVENT_SCHEME_SERVICE_SLUGS.has(serviceSlug)) return EVENT_PROPERTY_CATEGORIES;
  if (STEAM_CLEANING_SERVICES_SLUGS.has(serviceSlug)) return STEAM_CLEANING_CATEGORIES;
  if(PREMIUM_PROPERTY_SLUGS.has(serviceSlug)) return PREMIUM_PROPERTY_CATEGORIES;
  if (LUXURY_YACHT_CLEANING_SLUGS.has(serviceSlug)) return YACHT_PROPERTY_TYPES;

  return PROPERTY_CATEGORIES;
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

export interface PropertyTypeSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  categories?: PropertyCategory[];
  /** Fires with the active category whenever it changes (including on mount). */
  onCategoryChange?: (category: PropertyCategory) => void;
}

export function PropertyTypeSizeSelector({
  value,
  onChange,
  categories = PROPERTY_CATEGORIES,
  onCategoryChange,
}: PropertyTypeSizeSelectorProps) {
  const { translate } = useLanguage();
  const selectableCategories = categories.filter((c) => !c.locked);

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
      onChange(nextCat.sizes ? nextCat.sizes[0] : nextCat.min);
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

  return (
    <section className="rounded-2xl border border-[#C6A868] bg-[#FAF8F5] p-5 sm:p-6 shadow-sm w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Left Column: Property Type */}
        <div className="flex flex-col min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-3">
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
                  className={`shrink-0 w-[110px] h-[110px] sm:w-[118px] sm:h-[118px] rounded-xl border-2 flex flex-col items-center justify-center p-2.5 cursor-pointer transition-colors select-none ${isSelected
                      ? "bg-[#0B1527] border-[#B89642]"
                      : "bg-white border-[#C6A868]/60 hover:border-[#B89642]"
                    }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl mb-1.5 transition-colors ${isSelected ? "bg-white/10" : "bg-[#F1F3F5]"
                      }`}
                  >
                    <span>{cat.icon}</span>
                  </div>
                  <span
                    className={`text-xs text-center leading-tight line-clamp-2 px-1 ${isSelected ? "font-bold text-white" : "font-semibold text-[#1E293B]"
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
        </div>

        {/* Right Column: Property Size */}
        <div className="flex flex-col">
          <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-3">{translate("propSizeTitle")}</h3>

          <div className="flex items-center gap-3">
            {/* Wheel Display Container */}
            <div
              ref={wheelContainerRef}
              className="flex-1 h-[110px] sm:h-[118px] rounded-xl border-2 border-[#C6A868]/60 bg-white overflow-hidden shadow-sm flex flex-col justify-between select-none"
            >
              {/* Top Row: Previous size preview */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={prevSize === null}
                className="flex-1 flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
              >
                {prevSize !== null ? `${formatFt2(prevSize)} ft²` : "\u00A0"}
              </button>

              {/* Middle Row: Active selected size */}
              <div className="flex-[1.6] bg-[#D9E2EC] flex flex-col items-center justify-center py-1 border-y border-[#C6A868]/40 shadow-inner">
                <span className="text-xl sm:text-2xl font-bold text-[#0F172A] leading-tight">
                  {value} m²
                </span>
                <span className="text-xs font-semibold text-[#B89642] leading-none mt-0.5">
                  {formatFt2(value)} ft²
                </span>
              </div>

              {/* Bottom Row: Next size preview */}
              <button
                type="button"
                onClick={handleNext}
                disabled={nextSize === null}
                className="flex-1 flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-50 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
              >
                {nextSize !== null ? `${nextSize} m²` : "\u00A0"}
              </button>
            </div>

            {/* Right Buttons Stack */}
            <div className="flex h-[110px] sm:h-[118px] w-[52px] flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={handleNext}
                disabled={nextSize === null}
                className="flex-1 rounded-xl border-2 border-[#C6A868]/60 bg-white hover:bg-[#FAF7F2] active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Increase Property Size"
              >
                <span className="text-sm leading-none font-bold">↑</span>
                <span className="text-[9px] font-bold tracking-wider text-[#1E293B] mt-1">{translate("propSizeUp")}</span>
              </button>

              <button
                type="button"
                onClick={handlePrev}
                disabled={prevSize === null}
                className="flex-1 rounded-xl border-2 border-[#C6A868]/60 bg-white hover:bg-[#FAF7F2] active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Decrease Property Size"
              >
                <span className="text-sm leading-none font-bold">↓</span>
                <span className="text-[9px] font-bold tracking-wider text-[#1E293B] mt-1">{translate("propSizeDown")}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

