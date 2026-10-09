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

/**
 * Booking sizes, shared by every booking flow: 5 m² steps up to 100, 10 m² up
 * to 200, then 25 m² up to 500 — 38 stops, so the wheel reaches 500 quickly.
 */
export const BOOKING_SIZES: number[] = [
  ...Array.from({ length: (100 - 20) / 5 + 1 }, (_, i) => 20 + i * 5),
  ...Array.from({ length: (200 - 100) / 10 }, (_, i) => 110 + i * 10),
  ...Array.from({ length: (500 - 200) / 25 }, (_, i) => 225 + i * 25),
];

const BOOKING_SIZE_RANGE = { min: 20, max: 500, step: 0, sizes: BOOKING_SIZES };

/** Generic scale used by services without a dedicated sizing scheme (e.g. commercial, post-construction). */
export const PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", sublabel: "Apt", icon: "🏢", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "home", label: "Home", icon: "🏡", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "villa", label: "Villa", icon: "🏰", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "estate", label: "Estate", icon: "🏛️", ...BOOKING_SIZE_RANGE, locked: true },
  { id: "vip", label: "VIP", sublabel: "Diamond", icon: "💎", ...BOOKING_SIZE_RANGE, locked: true },
];

/**
 * Residential sizing scheme (m² / ft²) for standard-residential, deep-cleaning, end-of-tenancy,
 * last-minute, express-refresh, and steam-cleaning services.
 * Every property type, in every scheme here, spans 20–500 m² using BOOKING_SIZES (the same range as the shared
 * sanitize/steam/post-construction flow), so the active category is tracked explicitly
 * rather than re-derived from the size on every render.
 */
export const RESIDENTIAL_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", icon: "🏢", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", ...BOOKING_SIZE_RANGE, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "villa",
    label: "Villa",
    icon: "🏰",
    ...BOOKING_SIZE_RANGE,
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
  ...BOOKING_SIZE_RANGE,
  locked: false,
};

const PREMIUM_PROPERTY_SLUGS = new Set(["premium-rental-concierge-cleaning"]);
export const PREMIUM_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", icon: "🏢", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", ...BOOKING_SIZE_RANGE, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "villa",
    label: "Villa",
    icon: "🏰",
    ...BOOKING_SIZE_RANGE,
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
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "touch-up-clean",
    label: "Touch-Up Clean",
    dropdownLabel: "Touch-Up Clean",
    icon: "🧽",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "final-post-build-clean",
    label: "Final Post-Build Clean",
    dropdownLabel: "Final Post-Build Clean",
    icon: "✨",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "heavy-duty-construction-clean",
    label: "Heavy-Duty Deep Clean",
    dropdownLabel: "Heavy-Duty Deep Clean",
    icon: "🏗️",
    ...BOOKING_SIZE_RANGE,
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
  { id: "private-parties", label: "Private Parties & Celebrations", icon: "🎈", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "weddings", label: "Weddings & Large Receptions", icon: "💒", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "corporate-events", label: "Corporate Events & Galas", icon: "💼", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "concerts-festivals", label: "Concerts, Festivals & Live Venues", icon: "🎤", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "pop-up-shops", label: "Pop-Up Shops & Retail Exhibitions", icon: "🛍️", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "art-galleries", label: "Art Galleries & Cultural Exhibitions", icon: "🎨", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "fashion-shows", label: "Fashion Shows & Runway Events", icon: "👗", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "film-tv-shoots", label: "Film, TV & Commercial Shoots", icon: "📽️", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "charity-auctions", label: "Charity Auctions & Fundraisers", icon: "🤝", ...BOOKING_SIZE_RANGE, locked: false },
];

const EVENT_SCHEME_SERVICE_SLUGS = new Set(["post-event-cleaning"]);

/** Commercial office cleaning uses bespoke office-size tiers instead of the generic residential scale. */
export const COMMERCIAL_OFFICE_PROPERTY_CATEGORIES: PropertyCategory[] = [
  { id: "micro", label: "Micro", icon: "🧳", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "compact", label: "Compact", icon: "📦", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "small", label: "Small", icon: "🏢", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "medium", label: "Medium", icon: "🏬", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "large", label: "Large", icon: "🌆", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "luxury", label: "Luxury / Enterprise", icon: "🏛️", ...BOOKING_SIZE_RANGE, locked: false },
  OTHER_PROPERTY_CATEGORY,
];

const COMMERCIAL_OFFICE_SERVICE_SLUGS = new Set(["commercial-office-cleaning"]);

const STEAM_CLEANING_SERVICES_SLUGS = new Set(["steam-cleaning"]);
export const STEAM_CLEANING_CATEGORIES: PropertyCategory[] = [
  { id: "studio", label: "Studio", icon: "🏢", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "apartment", label: "Apartment / Flat", icon: "🏬", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "townhouse", label: "Townhouse", icon: "🏘️", ...BOOKING_SIZE_RANGE, locked: false },
  { id: "home", label: "Home / House", icon: "🏡", ...BOOKING_SIZE_RANGE, locked: false },
  {
    id: "penthouse",
    label: "Penthouse",
    icon: "🏙️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "villa",
    label: "Villa",
    icon: "🏰",
    ...BOOKING_SIZE_RANGE,
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
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "government-scif-data",
    label: "Government / SCIF / Data...",
    icon: "🛡️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "healthcare-medical",
    label: "Healthcare & Medical...",
    icon: "🏥",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "industrial-construction",
    label: "Industrial & Construction",
    icon: "🏗️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "vip-estate-executive",
    label: "VIP Estate / Executive...",
    icon: "🏰",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "event-venue",
    label: "Event Venue &...",
    icon: "🎪",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "emergency-biohazard",
    label: "Emergency / Biohazard...",
    icon: "☣️",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "retail-commercial",
    label: "Retail & Commercial...",
    icon: "🏬",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "personal-work-device",
    label: "Personal / Work Device...",
    icon: "💻",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
  {
    id: "corporate-network",
    label: "Corporate Network /...",
    icon: "🌐",
    ...BOOKING_SIZE_RANGE,
    locked: false,
  },
];

/** Largest property size the request-quotation form offers for residential cleaning services (booking stops at 500 m²). */
export const RESIDENTIAL_QUOTATION_MAX_SQM = 5000;

/**
 * Residential quotation sizes: 5 m² steps up to 500, then 50 m² up to 1000,
 * then 100 m² up to 5000 — 147 stops, so the wheel reaches 5000 quickly.
 */
export const RESIDENTIAL_QUOTATION_SIZES: number[] = [
  ...Array.from({ length: (500 - 20) / 5 + 1 }, (_, i) => 20 + i * 5),
  ...Array.from({ length: (1000 - 500) / 50 }, (_, i) => 550 + i * 50),
  ...Array.from({ length: (RESIDENTIAL_QUOTATION_MAX_SQM - 1000) / 100 }, (_, i) => 1100 + i * 100),
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

