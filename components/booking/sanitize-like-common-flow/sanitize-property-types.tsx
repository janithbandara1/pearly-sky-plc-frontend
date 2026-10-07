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
  "Micro Office": "propMicroOffice",
  "Office": "propOffice",
  "Corporate Office": "propCorporateOffice",
  "Co-working Space": "propCoWorkingSpace",
  "Hotel": "propHotel",
  "Restaurant": "propRestaurant",
  "Cafe": "propCafe",
  "Bar": "propBar",
  "Clinic": "propClinic",
  "Hospital": "propHospital",
  "Dental Clinic": "propDentalClinic",
  "Pharmacy": "propPharmacy",
  "Laboratory": "propLaboratory",
  "Beauty Salon": "propBeautySalon",
  "Spa": "propSpa",
  "Bakery": "propBakery",
  "Fast Food": "propFastFood",
  "Boutique Shop": "propBoutiqueShop",
  "Supermarket": "propSupermarket",
  "Mall": "propMall",
  "Showroom": "propShowroom",
  "Gym": "propGym",
  "Yoga Studio": "propYogaStudio",
  "School": "propSchool",
  "Nursery": "propNursery",
  "Airport": "propAirport",

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
  step: 1,
  locked: false,
};


 
//sanitize categories
const SANITIZE_RESIDENTIAL_CATEGORYIES: PropertyCategory[] = [
  { id: "studio", label: "propStudio", icon: "🏢", 
    min: 20, max: 500, step: 1, locked: false }, 
  { id: "apartment", label: "propApartment", icon: "🏬", 
    min: 20, max: 500, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: "🏘️", 
    min: 20, max: 500, step: 1, locked: false },
  { id: "home", label: "propHome", icon: "🏡", 
    min: 20, max: 500, step: 1, locked: false },
  {
    id: "penthouse",
    label: "propPenthouse",
    icon: "🏙️",
    min: 20,
    max: 500,
    step: 1,

    locked: false,
  },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: "🏰",
    min: 20,
    max: 500,
    step: 1,

    locked: false,
  },
  {
    id: "airbnb",
    label: "propAirbnb",
    icon: "🌟",
    min: 20,
    max: 500,
    step: 1,

    locked: false,
  },
  { ...SANITIZE_OTHER_PROPERTY_CATEGORY }

]

const SANITIZE_INDUSTRIAL_CATEGORYIES: PropertyCategory[] = [
  {
    id: "micro-office",
    label: "propMicroOffice",
    icon: "🏢",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [20, 25, 30, 35, 40, 45, 50],
    locked: false,
  },
  {
    id: "office",
    label: "propOffice",
    icon: "💼",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [50, 68, 86, 104, 122, 140, 158, 176, 194],
    locked: false,
  },
  {
    id: "corporate-office",
    label: "propCorporateOffice",
    icon: "🏙️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [200, 237, 274, 311, 348, 385, 422, 459, 496],
    locked: false,
  },
  {
    id: "co-working-space",
    label: "propCoWorkingSpace",
    icon: "🧑‍💻",
    min: 20,
    max: 500,
    step: 1,
    // sizes: [100, 150, 200, 250, 300, 350, 400, 450, 500],
    locked: false,
  },
  {
    id: "hotel",
    label: "propHotel",
    icon: "🏨",
    min: 20,
    max: 500,
    step: 1,
    // sizes: [250, 281, 312, 343, 374, 405, 436, 467, 498,500],
    locked: false,
  },
  {
    id: "airbnb",
    label: "propAirbnb",
    icon: "🏠",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [20, 36, 52, 68, 84, 100, 116, 132, 148,150],
    locked: false,
  },
  {
    id: "restaurant",
    label: "propRestaurant",
    icon: "🍽️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [60, 90, 120, 150, 180, 210, 240, 270, 300],
    locked: false,
  },
  {
    id: "cafe",
    label: "propCafe",
    icon: "☕",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [30, 41, 52, 63, 74, 85, 96, 107, 118],
    locked: false,
  },
  {
    id: "bar",
    label: "propBar",
    icon: "🍸",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [40, 60, 80, 100, 120, 140, 160, 180, 200],
    locked: false,
  },
  {
    id: "clinic",
    label: "propClinic",
    icon: "🩺",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [50, 66, 82, 98, 114, 130, 146, 162, 178,180],
    locked: false,
  },
  {
    id: "hospital",
    label: "propHospital",
    icon: "🏥",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [350, 368, 386, 404, 422, 440, 458, 476, 494,500],
    locked: false,
  },
  {
    id: "dental-clinic",
    label: "propDentalClinic",
    icon: "🦷",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "pharmacy",
    label: "propPharmacy",
    icon: "💊",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [30, 41, 52, 63, 74, 85, 96, 107, 118],
    locked: false,
  },
  {
    id: "laboratory",
    label: "propLaboratory",
    icon: "🔬",
    min: 20,
    max: 500,
    step: 1,
    // sizes: [50, 75, 100, 125, 150, 175, 200, 225, 250],
    locked: false,
  },
  {
    id: "beauty-salon",
    label: "propBeautySalon",
    icon: "💇",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [30, 38, 46, 54, 62, 70, 78, 86, 94],
    locked: false,
  },
  {
    id: "spa",
    label: "propSpa",
    icon: "💆",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [80, 107, 134, 161, 188, 215, 242, 269, 296],
    locked: false,
  },
  {
    id: "bakery",
    label: "propBakery",
    icon: "🥖",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [30, 38, 46, 54, 62, 70, 78, 86, 94],
    locked: false,
  },
  {
    id: "fast-food",
    label: "propFastFood",
    icon: "🍔",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "boutique-shop",
    label: "propBoutiqueShop",
    icon: "🛍️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [25, 40, 55, 70, 85, 100, 115, 130, 145],
    locked: false,
  },
  {
    id: "supermarket",
    label: "propSupermarket",
    icon: "🛒",
    min: 20,
    max: 500,
    step: 1,
    // sizes: [200, 237, 274, 311, 348, 385, 422, 459, 496],
    locked: false,
  },
  {
    id: "mall",
    label: "propMall",
    icon: "🏬",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [400, 412, 424, 436, 448, 460, 472, 484, 496],
    locked: false,
  },
  {
    id: "showroom",
    label: "propShowroom",
    icon: "🛋️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [100, 137, 174, 211, 248, 285, 322, 359, 396],
    locked: false,
  },
  {
    id: "gym",
    label: "propGym",
    icon: "🏋️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [80, 120, 160, 200, 240, 280, 320, 360, 400],
    locked: false,
  },
  {
    id: "yoga-studio",
    label: "propYogaStudio",
    icon: "🧘",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [40, 53, 66, 79, 92, 105, 118, 131, 144],
    locked: false,
  },
  {
    id: "school",
    label: "propSchool",
    icon: "🏫",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [300, 325, 350, 375, 400, 425, 450, 475, 500],
    locked: false,
  },
  {
    id: "nursery",
    label: "propNursery",
    icon: "👶",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [60, 77, 94, 111, 128, 145, 162, 179, 196],
    locked: false,
  },
  {
    id: "airport",
    label: "propAirport",
    icon: "✈️",
    min: 20,
    max: 500,
    step: 1,
    //sizes: [450, 456, 462, 468, 474, 480, 486, 492, 498],
    locked: false,
  },
  {
    id: "other",
    label: "propOther",
    icon: "📦",
    min: 20,
    max: 500,
    step: 1,
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

const RESIDENTIAL_PRIMARY_LADDER_IDS = [
  "studio",
  "apartment",
  "townhouse",
  "home",
  "penthouse",
  "luxury-villa",
];

const INDUSTRIAL_PRIMARY_LADDER_IDS = [
  "micro-office",
  "boutique-shop",
  "cafe",
  "bar",
  "office",
  "restaurant",
  "spa",
  "co-working-space",
  "corporate-office",
  "hotel",
  "school",
  "hospital",
  "mall",
  "airport",
];

function findAppropriateCategory(
  val: number,
  currentCatId: string | null,
  categories: PropertyCategory[],
  direction?: "up" | "down"
): PropertyCategory | null {
  const isIndustrial = categories.some((c) => c.id === "micro-office");
  const ladderIds = isIndustrial
    ? INDUSTRIAL_PRIMARY_LADDER_IDS
    : RESIDENTIAL_PRIMARY_LADDER_IDS;

  const ladderCats = ladderIds
    .map((id) => categories.find((c) => c.id === id))
    .filter((c): c is PropertyCategory => !!c);

  const currentCat = currentCatId ? categories.find((c) => c.id === currentCatId) ?? null : null;
  const isCurrentInLadder = currentCat ? ladderCats.some((c) => c.id === currentCat.id) : false;

  // Keep whatever card the user picked while the size is still inside its
  // range. Every category now spans the same 20–500 m², so without this the
  // ladder below would always jump to its last (largest) category and the
  // user's pick would be overwritten. The ladder only matters for a size
  // outside the current category's range.
  if (currentCat && val >= currentCat.min && val <= currentCat.max) {
    return currentCat;
  }

  if (direction === "up") {
    if (currentCat && isCurrentInLadder) {
      // Find the highest-min ladder category whose min is reached and covers val
      let candidate: PropertyCategory | null = null;
      for (const cat of ladderCats) {
        if (cat.min > currentCat.min && val >= cat.min && val <= cat.max) {
          if (!candidate || cat.min > candidate.min) {
            candidate = cat;
          }
        }
      }
      if (candidate) {
        return candidate;
      }
      // If still within current ladder category bounds, keep it
      if (val >= currentCat.min && val <= currentCat.max) {
        return currentCat;
      }
    }

    // If current was specialized and exceeded max, or current is null:
    for (let i = ladderCats.length - 1; i >= 0; i--) {
      const cat = ladderCats[i];
      if (val >= cat.min && val <= cat.max) {
        return cat;
      }
    }
    return null;
  }

  if (direction === "down") {
    if (currentCat && isCurrentInLadder) {
      // If val drops below current category min:
      if (val < currentCat.min) {
        for (let i = ladderCats.length - 1; i >= 0; i--) {
          const cat = ladderCats[i];
          if (cat.min < currentCat.min && val >= cat.min && val <= cat.max) {
            return cat;
          }
        }
        return null;
      }
      // If still within current category bounds, keep it
      if (val >= currentCat.min && val <= currentCat.max) {
        return currentCat;
      }
    }

    // If current was specialized and dropped below min, or stepping down:
    for (let i = ladderCats.length - 1; i >= 0; i--) {
      const cat = ladderCats[i];
      if (val >= cat.min && val <= cat.max) {
        return cat;
      }
    }
    return null;
  }

  // Neutral direction (direct selection, slider, useEffect sync)
  for (let i = ladderCats.length - 1; i >= 0; i--) {
    const cat = ladderCats[i];
    if (val >= cat.min && val <= cat.max) {
      return cat;
    }
  }

  return null;
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

/** Size dropdown step (m²) — the size wheel still moves in 1 m² steps. */
const DROPDOWN_SIZE_STEP = 10;

/*
 * Both floorplans draw their outer wall at x 50–900, y 50–680. The viewBox
 * starts at -50 so there's room above/left of the wall for the dimension
 * lines, which sit the same distance (75 units) from the wall on both sides.
 */
const BLUEPRINT_VIEWBOX = "-50 -50 1000 800";
const WALL = { left: 50, right: 900, top: 50, bottom: 680 };
const DIM_OFFSET = 75;
const DIM_TICK = 10;
const DIM_STROKE = "rgba(6, 182, 212, 0.7)";
const DIM_TEXT = "#67e8f9";
const DIM_BG = "#091122";

/** Span (top) and depth (left) dimension lines, spanning exactly the outer wall. */
function BlueprintDimensions({ span, depth }: { span: number; depth: number }) {
  const y = WALL.top - DIM_OFFSET;
  const x = WALL.left - DIM_OFFSET;
  const midX = (WALL.left + WALL.right) / 2;
  const midY = (WALL.top + WALL.bottom) / 2;
  // A thick stroke in the canvas colour, painted under the text, masks the
  // line behind each label.
  const labelProps = {
    fill: DIM_TEXT,
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "monospace",
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    stroke: DIM_BG,
    strokeWidth: 14,
    paintOrder: "stroke",
  };

  return (
    <g>
      <g stroke={DIM_STROKE} strokeWidth="2.5">
        {/* Span: left wall → right wall */}
        <line x1={WALL.left} y1={y} x2={WALL.right} y2={y} />
        <line x1={WALL.left} y1={y - DIM_TICK} x2={WALL.left} y2={y + DIM_TICK} />
        <line x1={WALL.right} y1={y - DIM_TICK} x2={WALL.right} y2={y + DIM_TICK} />
        {/* Depth: top wall → bottom wall */}
        <line x1={x} y1={WALL.top} x2={x} y2={WALL.bottom} />
        <line x1={x - DIM_TICK} y1={WALL.top} x2={x + DIM_TICK} y2={WALL.top} />
        <line x1={x - DIM_TICK} y1={WALL.bottom} x2={x + DIM_TICK} y2={WALL.bottom} />
      </g>
      <text x={midX} y={y} {...labelProps}>
        {span} m SPAN WIDTH
      </text>
      <text x={x} y={midY} transform={`rotate(-90 ${x} ${midY})`} {...labelProps}>
        {depth} m DEPTH
      </text>
    </g>
  );
}

interface SanitizeSizeVisualizationProps {
  value: number;
  activeCategory?: PropertyCategory | null;
  isDisinfection?: boolean;
  isDeepClean?: boolean;
  quote?: SizeQuote | null;
  serviceCategory?: "residential" | "industrial";
}

interface SurfaceBottomMatrix {
  costOFEstimation: string;
  serviceTargetArea: string;
}

export let surfaceMatrixes: SurfaceBottomMatrix = {
  costOFEstimation: "",
  serviceTargetArea: "",
};

export function SanitizeSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
  serviceCategory = "residential",
}: SanitizeSizeVisualizationProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();

  // Dynamic dimensions based on area
  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  // Dynamic residential room areas (m²) summing to total value
  const masterBedArea = (value * 0.20).toFixed(1);
  const northBedArea = (value * 0.12).toFixed(1);
  const eastBedArea = (value * 0.13).toFixed(1);
  const livingArea = (value * 0.25).toFixed(1);
  const diningArea = (value * 0.12).toFixed(1);
  const kitchenArea = (value * 0.13).toFixed(1);
  const bathArea = (value * 0.05).toFixed(1);

  // Dynamic industrial / retail showroom zone areas (m²)
  const showroomArea = (value * 0.30).toFixed(1);
  const displayArea = (value * 0.22).toFixed(1);
  const storageArea = (value * 0.18).toFixed(1);
  const checkoutArea = (value * 0.12).toFixed(1);
  const loungeArea = (value * 0.10).toFixed(1);
  const backOfficeArea = (value * 0.08).toFixed(1);

  // Cost, rate and labor calculations
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

  surfaceMatrixes.costOFEstimation = estimatedCost;
  surfaceMatrixes.serviceTargetArea = value + " m² • " + formatFt2(value) + " ft²";

  const surfaceTitle = isDeepClean && isDisinfection
    ? "deepCleanDisinfection"
    : isDeepClean
      ? "intensiveDeepClean"
      : isDisinfection
        ? "hospitalGradeDisinfection"
        : "standardSurfaceClean";

  const isResidential = serviceCategory === "residential";

  return (
    <div
      className="w-full rounded-t-2xl rounded-r-2xl rounded-b-none rounded-l-2xl bg-[#070D1B] border border-cyan-500/40 p-3 sm:p-5 shadow-2xl relative overflow-hidden select-none"
      style={{
        backgroundImage:`
          linear-gradient(to right, rgba(0, 180, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 180, 255, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      {/* Blueprint Header */}
      <div className="w-full flex items-center justify-between border-b border-cyan-900/50 pb-2.5 mb-3 gap-2 flex-wrap">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff] shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-widest text-cyan-200 uppercase truncate">
               {activeCategory ? (CATEGORY_LABEL_KEYS[activeCategory.label] ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey) : translate(activeCategory.label as TranslationKey)) : (isResidential ? "RESIDENTIAL" : "INDUSTRIAL")} BLUEPRINT
            </h4>
            <p className="text-[9px] sm:text-[10px] text-cyan-400/80 tracking-wider truncate">
              {value} m² • {formatFt2(value)} ft² | GRID: {span}m × {depth}m
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/40 rounded-md text-cyan-300 font-semibold tracking-wide">
            {translate(surfaceTitle as TranslationKey)}
          </span>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 bg-blue-900/40 border border-blue-500/30 rounded-md text-blue-200 font-mono">
            CAD SCALE 1:50
          </span>
        </div>
      </div>

      {/* Blueprint Canvas Frame */}
      <div className="relative w-full bg-[#091122]/90 border border-cyan-500/50 rounded-xl shadow-[0_0_25px_rgba(0,180,255,0.15)] p-2 sm:p-4 overflow-hidden">
        {/* Diagram Area — the span/depth dimension lines are drawn inside the SVG
            (see BlueprintDimensions) so they always match the outer wall exactly */}
        <div className="flex items-center w-full">
          <div className="flex-1 min-w-0 max-h-[250px] sm:max-h-[270px] md:max-h-[420px] flex items-center justify-center">
            {isResidential ? (
              /* Residential SVG Floorplan */
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[220px] sm:max-h-[260px] md:max-h-[420px] drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] object-contain"
              >
                <BlueprintDimensions span={span} depth={depth} />

                {/* Outer Boundary Walls */}
                <rect
                  x="50"
                  y="50"
                  width="850"
                  height="630"
                  rx="12"
                  fill="none"
                  stroke="#00e1ff"
                  strokeWidth="5"
                />

                {/* Interior Partition Walls */}
                <g stroke="#00b4ff" strokeWidth="3.5" fill="none">
                  {/* Master Bedroom Partition (Top Left) */}
                  <line x1="50" y1="310" x2="360" y2="310" />
                  <line x1="360" y1="50" x2="360" y2="310" />

                  {/* North Bedrooms Partition (Top Center & Right) */}
                  <line x1="360" y1="310" x2="620" y2="310" />
                  <line x1="620" y1="50" x2="620" y2="310" />

                  {/* Bathroom & Utility Partition (Middle Right) */}
                  <line x1="730" y1="310" x2="900" y2="310" />
                  <line x1="730" y1="310" x2="730" y2="460" />
                  <line x1="620" y1="460" x2="900" y2="460" />

                  {/* Kitchen Divider (Bottom Right) */}
                  <line x1="620" y1="590" x2="900" y2="590" />
                  <line x1="620" y1="460" x2="620" y2="590" />

                  {/* Living & Dining Area Dividers */}
                  <line x1="360" y1="410" x2="520" y2="410" />
                  <line x1="360" y1="410" x2="360" y2="680" />
                  <line x1="520" y1="480" x2="520" y2="680" />

                  {/* Front Entry */}
                  <path d="M 420 680 L 420 730 L 530 730 L 530 680" />
                </g>

                {/* Room Background Compartment Tints */}
                <g fill="rgba(0, 180, 255, 0.08)">
                  <rect x="54" y="54" width="304" height="254" />
                  <rect x="364" y="54" width="254" height="254" />
                  <rect x="624" y="54" width="274" height="254" />
                  <rect x="54" y="314" width="304" height="362" />
                  <rect x="364" y="414" width="154" height="262" />
                  <rect x="624" y="464" width="274" height="212" />
                  <rect x="734" y="314" width="164" height="144" />
                </g>

                {/* Architectural Furniture & Fixtures */}
                <g stroke="#00d2ff" strokeWidth="1.8" fill="none">
                  {/* Master Bedroom Furniture */}
                  <rect x="80" y="80" width="110" height="130" rx="6" strokeDasharray="4 2" />
                  <rect x="75" y="240" width="180" height="35" rx="4" />
                  <circle cx="310" cy="80" r="12" strokeWidth="1.5" />

                  {/* North Bedroom Furniture */}
                  <rect x="390" y="85" width="100" height="120" rx="6" />
                  <rect x="520" y="70" width="35" height="40" rx="4" />

                  {/* East Bedroom Furniture */}
                  <rect x="660" y="85" width="110" height="120" rx="6" />
                  <rect x="800" y="220" width="80" height="45" rx="4" />

                  {/* Living Room Sectional */}
                  <path d="M 80 500 L 80 620 L 280 620 L 280 560 L 130 560 L 130 500 Z" />
                  <rect x="150" y="580" width="50" height="30" rx="4" />
                  <rect x="150" y="350" width="120" height="20" rx="3" />

                  {/* Dining Room Table & Chairs */}
                  <rect x="400" y="500" width="80" height="120" rx="6" />
                  <rect x="380" y="515" width="15" height="25" rx="2" />
                  <rect x="380" y="575" width="15" height="25" rx="2" />
                  <rect x="485" y="515" width="15" height="25" rx="2" />
                  <rect x="485" y="575" width="15" height="25" rx="2" />

                  {/* Kitchen Counters & Island */}
                  <path d="M 640 480 L 870 480 L 870 650 L 640 650" strokeDasharray="6 3" />
                  <rect x="700" y="530" width="90" height="60" rx="4" />

                  {/* Bathroom Fixtures */}
                  <ellipse cx="780" cy="365" rx="15" ry="10" strokeWidth="1.5" />
                  <rect x="830" y="355" width="25" height="35" rx="4" strokeWidth="1.5" />
                </g>

                {/* Door Swing Arcs */}
                <g stroke="#00e1ff" strokeWidth="1.8" fill="none" opacity="0.85">
                  <path d="M 360 260 A 40 40 0 0 1 320 220" />
                  <line x1="360" y1="260" x2="360" y2="220" />
                  <path d="M 520 310 A 40 40 0 0 1 480 270" />
                  <path d="M 680 310 A 40 40 0 0 0 720 270" />
                  <path d="M 730 380 A 35 35 0 0 1 765 345" />
                  <path d="M 450 680 A 30 30 0 0 1 480 650" />
                </g>

                {/* Dynamic Room Typography & Measurements */}
                <g fontFamily="monospace">
                  <text x="200" y="170" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">
                    MASTER BEDROOM
                  </text>
                  <text x="200" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {masterBedArea} m²
                  </text>

                  <text x="490" y="170" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">
                    NORTH BEDROOM
                  </text>
                  <text x="490" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {northBedArea} m²
                  </text>

                  <text x="760" y="170" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">
                    EAST BEDROOM
                  </text>
                  <text x="760" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {eastBedArea} m²
                  </text>

                  <text x="200" y="430" fill="#e0f2fe" fontSize="17" fontWeight="bold" textAnchor="middle">
                    LIVING & LOUNGE
                  </text>
                  <text x="200" y="455" fill="#38bdf8" fontSize="14" fontWeight="600" textAnchor="middle">
                    {livingArea} m²
                  </text>

                  <text x="440" y="465" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">
                    DINING SPACE
                  </text>
                  <text x="440" y="488" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {diningArea} m²
                  </text>

                  <text x="760" y="515" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">
                    KITCHEN & ISLAND
                  </text>
                  <text x="760" y="540" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {kitchenArea} m²
                  </text>

                  <text x="815" y="410" fill="#e0f2fe" fontSize="14" fontWeight="bold" textAnchor="middle">
                    BATH & WC
                  </text>
                  <text x="815" y="432" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">
                    {bathArea} m²
                  </text>
                </g>

                {/* Compass */}
                <g transform="translate(100, 630)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#00d2ff" />
                  <text x="0" y="30" fill="#00d2ff" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    N // CAD-04
                  </text>
                </g>
              </svg>
            ) : (
              /* Industrial / Retail Showroom SVG Floorplan */
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[250px] sm:max-h-[270px] md:max-h-[420px] drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] object-contain"
              >
                <BlueprintDimensions span={span} depth={depth} />

                {/* Outer Boundary Walls */}
                <rect
                  x="50"
                  y="50"
                  width="850"
                  height="630"
                  rx="12"
                  fill="none"
                  stroke="#00e1ff"
                  strokeWidth="5"
                />

                {/* Interior Partition Walls */}
                <g stroke="#00b4ff" strokeWidth="3.5" fill="none">
                  {/* Left Stock / Display Partition */}
                  <line x1="50" y1="530" x2="350" y2="530" />
                  <line x1="350" y1="50" x2="350" y2="530" />

                  {/* Right Counter / Checkout Partition */}
                  <line x1="570" y1="530" x2="900" y2="530" />
                  <line x1="570" y1="530" x2="570" y2="680" />

                  {/* Central Island Display Boundaries */}
                  <rect x="420" y="230" width="210" height="270" rx="4" strokeWidth="2.5" />
                </g>

                {/* Room Background Compartment Tints */}
                <g fill="rgba(0, 180, 255, 0.08)">
                  <rect x="54" y="54" width="292" height="472" />
                  <rect x="354" y="54" width="222" height="172" />
                  <rect x="578" y="54" width="318" height="472" />
                  <rect x="54" y="534" width="292" height="142" />
                  <rect x="574" y="534" width="322" height="142" />
                  <rect x="424" y="234" width="202" height="262" fill="rgba(0, 220, 255, 0.12)" />
                </g>

                {/* Shelving & Showroom Fixtures */}
                <g stroke="#00d2ff" strokeWidth="1.8" fill="none">
                  <line x1="80" y1="120" x2="260" y2="120" strokeWidth="3.5" />
                  <line x1="80" y1="180" x2="260" y2="180" strokeWidth="3.5" />
                  <line x1="80" y1="240" x2="260" y2="240" strokeWidth="3.5" />
                  <line x1="80" y1="300" x2="260" y2="300" strokeWidth="3.5" />

                  <rect x="90" y="360" width="180" height="70" rx="4" />
                  <rect x="120" y="380" width="40" height="30" rx="2" />

                  <line x1="450" y1="260" x2="590" y2="260" strokeWidth="2.5" />
                  <line x1="450" y1="300" x2="590" y2="300" strokeWidth="2" />
                  <rect x="470" y="330" width="60" height="40" rx="2" />
                  <rect x="540" y="330" width="50" height="40" rx="2" />
                  <line x1="450" y1="420" x2="590" y2="420" strokeWidth="2.5" />

                  <rect x="500" y="90" width="260" height="40" rx="4" />
                  <rect x="370" y="90" width="40" height="30" rx="2" />

                  <line x1="720" y1="260" x2="720" y2="420" strokeWidth="3.5" />
                  <rect x="780" y="260" width="50" height="140" rx="4" />

                  <rect x="90" y="580" width="140" height="60" rx="6" />
                  <path d="M 610 570 L 860 570 L 860 650 L 610 650" strokeWidth="2.5" strokeDasharray="6 3" />
                  <rect x="650" y="590" width="80" height="40" rx="4" />
                </g>

                {/* Entrance & Doorways */}
                <g stroke="#00e1ff" strokeWidth="1.8" fill="none" opacity="0.85">
                  <path d="M 350 630 A 30 30 0 0 1 380 600" />
                  <path d="M 570 630 A 30 30 0 0 0 540 600" />
                  <path d="M 200 530 A 30 30 0 0 1 230 500" />
                </g>

                {/* Dynamic Zone Typography & Measurements */}
                <g fontFamily="monospace">
                  <text x="200" y="225" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">
                    STORAGE & INVENTORY
                  </text>
                  <text x="200" y="248" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {storageArea} m²
                  </text>

                  <text x="465" y="145" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">
                    BACK OFFICE
                  </text>
                  <text x="465" y="165" fill="#38bdf8" fontSize="11" fontWeight="600" textAnchor="middle">
                    {backOfficeArea} m²
                  </text>

                  <text x="730" y="225" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">
                    DISPLAY & MERCHANDISE
                  </text>
                  <text x="730" y="248" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">
                    {displayArea} m²
                  </text>

                  <text x="525" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
                    CENTRAL SHOWROOM FLOOR
                  </text>
                  <text x="525" y="380" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">
                    MAIN FLOOR
                  </text>
                  <text x="525" y="405" fill="#38bdf8" fontSize="14" fontWeight="600" textAnchor="middle">
                    {showroomArea} m²
                  </text>

                  <text x="160" y="565" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">
                    CONSULTATION LOUNGE
                  </text>
                  <text x="160" y="588" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">
                    {loungeArea} m²
                  </text>

                  <text x="735" y="555" fill="#e0f2fe" fontSize="14" fontWeight="bold" textAnchor="middle">
                    CHECKOUT & SERVICE
                  </text>
                  <text x="735" y="578" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">
                    {checkoutArea} m²
                  </text>
                </g>

                {/* Compass */}
                <g transform="translate(100, 600)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#00d2ff" />
                  <text x="0" y="30" fill="#00d2ff" fontSize="10" textAnchor="middle" fontFamily="monospace">
                    N // RETAIL-01
                  </text>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Metrics 3 Columns */}
      <div className="grid grid-cols-3 gap-2 sm:gap-6 pt-3.5 mt-3 border-t border-cyan-900/40 w-full text-center">
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("EstimatedCost")}</p>
          <p className="text-[12px] sm:text-lg font-bold text-[#38BDF8] ">
            {estimatedCost}
          </p>
        </div>
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("ServiceRate")}</p>
          <p className="text-[12px] sm:text-lg font-bold text-white ">
            {serviceRate}
          </p>
        </div>
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("EstLabor")}</p>
          <p className="text-[12px] sm:text-lg font-bold text-white ">
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

  // Disinfection and Deep Clean toggle independently — either, both or neither
  const handleToggleDisinfection = () => setDisinfection(!isDisinfection);
  const handleToggleDeepClean = () => setDeepClean(!isDeepClean);

  //handle Service Catagory button active
  const [isActiveCategorySwitch, setIsActiveCategorySwitch] = useState<string>("residential");

  const { translate } = useLanguage();

  //set sanitizing categories
  //industrial and residential categories
  const selectableCategories =
    isActiveCategorySwitch === "residential" ? SANITIZE_RESIDENTIAL_CATEGORYIES : SANITIZE_INDUSTRIAL_CATEGORYIES;

  // Tracked explicitly (not re-derived from `value` every render)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(() => selectableCategories[0].id);

  const activeCategory = selectableCategories.find((c) => c.id === activeCategoryId) ?? null;
  const sizeOptions = activeCategory ? buildSizeOptions(activeCategory) : [value];
  // The dropdown jumps in 10 m² steps (plus the range ends); the wheel keeps
  // 1 m² steps. The current size is always listed so the select can show it.
  const dropdownOptions = Array.from(
    new Set([
      ...sizeOptions.filter(
        (s, i) => s % DROPDOWN_SIZE_STEP === 0 || i === 0 || i === sizeOptions.length - 1,
      ),
      value,
    ]),
  ).sort((a, b) => a - b);

  useEffect(() => {
    if (activeCategory) {
      onCategoryChange?.(activeCategory);
    }
  }, [activeCategory, onCategoryChange]);

  // Sync active category when value changes externally or crosses category boundaries
  useEffect(() => {
    const nextCat = findAppropriateCategory(value, activeCategoryId, selectableCategories);
    const nextId = nextCat ? nextCat.id : null;
    if (nextId !== activeCategoryId) {
      setActiveCategoryId(nextId);
    }
  }, [value, selectableCategories, activeCategoryId]);

  function handleCardClick(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      const initialSize = nextCat?.sizes ? nextCat.sizes[0] : nextCat.min;
      onChange(initialSize);
    }
  }

  const MIN_SIZE = 20;
  const MAX_SIZE = 500;

  const prevSize = value > MIN_SIZE ? value - 1 : null;
  const nextSize = value < MAX_SIZE ? value + 1 : null;

  //handle sizes next and prev (steps 1 by 1 up to 500)
  function handleNext() {
    if (value < MAX_SIZE) {
      const nextVal = value + 1;
      const nextCat = findAppropriateCategory(nextVal, activeCategoryId, selectableCategories, "up");
      const nextId = nextCat ? nextCat.id : null;
      if (nextId !== activeCategoryId) {
        setActiveCategoryId(nextId);
      }
      onChange(nextVal);
    }
  }

  function handlePrev() {
    if (value > MIN_SIZE) {
      const prevVal = value - 1;
      const prevCat = findAppropriateCategory(prevVal, activeCategoryId, selectableCategories, "down");
      const prevId = prevCat ? prevCat.id : null;
      if (prevId !== activeCategoryId) {
        setActiveCategoryId(prevId);
      }
      onChange(prevVal);
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
    <section className="w-full flex flex-col justify-center items-center ">
        {/* Dynamic Size & Area Floorplan Visualization Component */}
      <SanitizeSizeVisualization
        value={value}
        activeCategory={activeCategory ?? undefined}
        isDisinfection={isDisinfection}
        isDeepClean={isDeepClean}
        quote={quote}
        serviceCategory={isActiveCategorySwitch as "residential" | "industrial"}
      />
      <div className="rounded-b-2xl py-4   border border-[#C6A868] bg-brand-navy pb-5 sm:pb-6 px-5 sm:px-6 shadow-sm w-full">
        

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
        <div className="grid grid-cols-1 gap-6 items-start h-full">
          {/* Left Column: Property Type */}
          <div className="flex flex-col min-w-0 ">
            <h3 className="text-base sm:text-lg font-bold text-gray-300 mb-3">
              {translate("propTypeTitle")}</h3>

            <div
              className="flex flex-nowrap  gap-3 overflow-x-auto overflow-y-hidden -mx-1  px-1 lg:-ml-5 lg:pl-25  [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", scrollSnapType: "x proximity" }} 
            >
              {/**display categories */} 
              {selectableCategories.map((cat) => {
                const isSelected = activeCategory ? cat.id === activeCategory.id : false;
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
                      {CATEGORY_LABEL_KEYS[cat.label] ? translate(CATEGORY_LABEL_KEYS[cat.label] as TranslationKey) : translate(cat.label as TranslationKey)}
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
          <div className="grid grid-cols-2 gap-3  items-center mt-4 h-full w-full">
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
                      
                      onChange(selectedVal);
                    }}
                    className="appearance-none py-2 pl-2 pr-9 block border border-gray-600 focus:border-gray-500 rounded-[10px] bg-gray-800 text-white cursor-pointer"
                  >
                    {dropdownOptions.map((Val) => (
                      <option key={Val} value={Val} className="bg-gray-700 text-white">
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
          <EstimatioMatrixBottom 
          activeCategory={activeCategory || null}
            />
        </div>
      </div>
    </section>
  );
}


export function EstimatioMatrixBottom({
  activeCategory
}:{
  activeCategory:PropertyCategory | null
}){


  const { translate } = useLanguage();
  
  return(
      <div className="grid grid-cols-2 items-center py-4 align-items-center bg-[#132238]/90 border border-blue-500/20 rounded-xl gap-2 sm:gap-6 pt-2 mt-4 border-t  w-full text-center">
        <div className="">
          <p className="text-xs text-gray-400 font-medium mb-1">{translate("EstimatedCost")}</p>
          <p className="text-base sm:text-xl font-bold text-[#38BDF8]">
            {surfaceMatrixes.costOFEstimation}
          </p>
        </div>

        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">{translate("serviceTargetArea")}</p>
           {activeCategory && 
           <p className="text-sm text-gray-200 font-medium mb-1">
            {translate(activeCategory?.label as TranslationKey)}</p>}
          <p className="text-base sm:text-xl font-bold text-white">
            {surfaceMatrixes.serviceTargetArea}
          </p>
         
        </div>
      </div>)
}
