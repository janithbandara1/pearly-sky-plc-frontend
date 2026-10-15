"use client";

import Link from "@/components/locale-link";
import { User, Briefcase, KeyRound, ArrowRight, Folder, Ruler, Clock, Users, CalendarClock, Check, UserCircle, Languages } from "lucide-react";
import type { CatalogItem, SizeQuote } from "@/lib/catalog-api";
import { calculateEquipmentItemPrice, EQUIPMENT_ITEM_SKU, EQUIPMENT_MAX_QTY } from "@/lib/equipment-pricing";
import { useCurrency } from "@/lib/currency-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { CATEGORY_LABEL_KEYS } from "./common-property-types";
import { Minus, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type SupplySource = "" | "customer" | "company";

/** Reused across booking views and checkout summaries. */
export const SUPPLY_SOURCE_OPTIONS = [
  { value: "customer" as const, label: "BY CLIENT" },
  { value: "company" as const, label: "BY COMPANY" },
];

function formatHM(hours: number): string {
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60);
  const m = total % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

interface ItemDetailMeta {
  displayName: string;
  subtitle: string;
  description: string;
  defaultPrice: number;
}

const ITEM_DETAILS_MAP: Record<string, ItemDetailMeta> = {
  [EQUIPMENT_ITEM_SKU.BIO_SOLVENT]: {
    displayName: "BIODisplayName",
    subtitle: "BIOSubtitle",
    description: "BIODescription",
    defaultPrice: 14.0,
  },
  [EQUIPMENT_ITEM_SKU.MOP]: { 
    displayName: "MOPDisplayName",
    subtitle: "MOPSubtitle",
    description: "MOPDescription",
    defaultPrice: 8.0,
  },
  [EQUIPMENT_ITEM_SKU.MATERIAL_KIT]: {
    displayName: "MATERIALSDisplayName",
    subtitle: "MATERIALSSubtitle",
    description: "MATERIALSDescription",
    defaultPrice: 7.2,
  },
  [EQUIPMENT_ITEM_SKU.VACUUM]: {
    displayName: "VACUUMDisplayName",
    subtitle: "VACUUMSubtitle",
    description: "VACUUMDescription",
    defaultPrice: 10.0,
  },
};

const FALLBACK_EQUIPMENT_ITEMS: CatalogItem[] = [
  {
    id: 1,
    name: "BIO - SOLVENT",
    sku: EQUIPMENT_ITEM_SKU.BIO_SOLVENT,
    price: "14.00",
    prices: [],
    type: "equipment",
  },
  {
    id: 2,
    name: "MOP (1 MOP)",
    sku: EQUIPMENT_ITEM_SKU.MOP,
    price: "8.00",
    prices: [],
    type: "equipment",
  },
  {
    id: 3,
    name: "MATERIALS (1 KIT)",
    sku: EQUIPMENT_ITEM_SKU.MATERIAL_KIT,
    price: "7.20",
    prices: [],
    type: "equipment",
  },
  {
    id: 4,
    name: "VACUUM (1 VAC)",
    sku: EQUIPMENT_ITEM_SKU.VACUUM,
    price: "10.00",
    prices: [],
    type: "equipment",
  },
];

export interface EquipmentSectionProps {
  propertyType?: string;
  categoryIcon?: string;
  propertySizeSqm: number;
  quote: SizeQuote | null;
  hourlyRate: string | null;
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  items?: CatalogItem[];
  selectedItemIds?: Set<number>;
  onToggleItem?: (id: number) => void;
  /** Units added per item id (1–EQUIPMENT_MAX_QTY); a missing id means not added. */
  itemQuantities?: Record<number, number>;
  /** Sets an item's quantity; 0 removes it. */
  onQuantityChange?: (id: number, qty: number) => void;
  addOnsTotal?: number;
  onBookNow?: () => void;
  submitting?: boolean;
  bookDisabledReason?: string;

  isQuote:boolean;
  isPickupDeliveryServiceQuotation?: boolean;
  onChangeSetNumCleanersIncrementQuotation?: ()=>void;
  onChangeSetNumCleanerDecrementQuotation?: ()=>void;
  numCleaners?: number;

  onChangeNumberOfCleaningHoursChangeDecrement?: ()=>void;
  onChangeNumberOfCleaningHoursChangeIncrement?: ()=>void;
  durationHours?: number;

  /** Gender preference select */
  gender?: string;
  onGenderChange?: (value: string) => void;
  genderPreferenceValues?: { value: string; label: string }[];

  /** Linguistic coordination select */
  language?: string;
  onLanguageChange?: (value: string) => void;
  languageCoordinationOptions?: string[];
}

export function EquipmentSectionOfCommonServicesSlugs({
  propertyType = "Studio",
  categoryIcon = "🏢",
  propertySizeSqm,
  quote,
  hourlyRate,
  supplySource,
  onSupplySourceChange,
  items = [],
  selectedItemIds = new Set(),
  itemQuantities = {},
  onQuantityChange,
  addOnsTotal = 0,
  onBookNow,
  submitting = false,
  bookDisabledReason,

  isQuote,
  isPickupDeliveryServiceQuotation,
  onChangeSetNumCleanersIncrementQuotation,
  onChangeSetNumCleanerDecrementQuotation,
  numCleaners = 1,
  onChangeNumberOfCleaningHoursChangeDecrement,
  onChangeNumberOfCleaningHoursChangeIncrement,
  durationHours = 2,
  gender = "",
  onGenderChange,
  genderPreferenceValues = [],
  language = "",
  onLanguageChange,
  languageCoordinationOptions = [],
}: EquipmentSectionProps) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();

  const money = (n: number | null | undefined) => {
    const val = n != null && !Number.isNaN(Number(n)) ? Number(n) : 0;
    return `${symbol}${val.toFixed(2)}`;
  };

  const isCompany = supplySource === "company";
  const isClient = supplySource === "customer";

  // Display items fallback if empty
  const displayedItems = items.length > 0 ? items : FALLBACK_EQUIPMENT_ITEMS;

  // Quantities (1–EQUIPMENT_MAX_QTY per item) live on the booking page so the
  // totals, checkout and the booking itself all use the same numbers.
  const quantityOf = (id: number) => itemQuantities[id] ?? (selectedItemIds.has(id) ? 1 : 0);
  const handleAdd = (id: number) => onQuantityChange?.(id, 1);
  const handleIncrement = (id: number) =>
    onQuantityChange?.(id, Math.min(EQUIPMENT_MAX_QTY, quantityOf(id) + 1));
  // Going below 1 removes the item
  const handleDecrement = (id: number) => onQuantityChange?.(id, quantityOf(id) - 1);

  const getItemMeta = (item: CatalogItem): ItemDetailMeta => {
    if (item.sku && ITEM_DETAILS_MAP[item.sku]) {
      return ITEM_DETAILS_MAP[item.sku];
    }
    const nameLower = item.name.toLowerCase();
    if (nameLower.includes("bio") || nameLower.includes("solvent")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.BIO_SOLVENT];
    }
    if (nameLower.includes("mop")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.MOP];
    }
    if (nameLower.includes("material") || nameLower.includes("kit")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.MATERIAL_KIT];
    }
    if (nameLower.includes("vacuum") || nameLower.includes("vac")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.VACUUM];
    }
    return {
      displayName: item.name,
      subtitle: "Professional Grade",
      description: "Standard industrial sanitizing and cleaning equipment.",
      defaultPrice: item.price ? Number(item.price) : 10.0,
    };
  };

  const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
  const durationText = hasDuration
    ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}`
    : "2h 30m – 5h";

  const cleanersCount = quote?.cleanerCount ?? 1;
  // On-site window is each cleaner's share of the job, not the total duration.
  const onSiteText = hasDuration
    ? `${formatHM((quote!.minHours as number) / cleanersCount)} – ${formatHM((quote!.maxHours as number) / cleanersCount)}`
    : durationText;

  // addOnsTotal from the booking page already includes the selected equipment
  // (and the disinfection level) — the same figure checkout and the backend use.
  const totalAddOns = addOnsTotal;

  const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
  const cleaningPriceRange = hasPrice
    ? `${money(quote!.priceMin)} – ${money(quote!.priceMax)}`
    : `${symbol}62.50 – ${symbol}125.00`;

  const totalMin = hasPrice ? (quote!.priceMin as number) + totalAddOns : 62.5 + totalAddOns;
  const totalMax = hasPrice ? (quote!.priceMax as number) + totalAddOns : 125.0 + totalAddOns;
  const estimatedPriceRange = `${money(totalMin)} – ${money(totalMax)}`;

  return (
    <div className="flex flex-col gap-6 pb-[40px] w-full ">


      {/* Booking Overview & Summary Card */}
      <section className="overflow-hidden rounded-[20px]  bg-[#0B1528] border border-brand-gold   text-[#1D2128] shadow-sm  mt-2">

        {/* Top Header: Atelier Title & Residence Pill */}
        <div className="flex  px-5 sm:px-7 py-5 flex-col bg-[#05122b] gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col py-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gray-400">
              {translate("PRIVATECLIENTATELIERPEARLYSKY")}
            </span>
            <h1 className="font-serif text-3xl sm:text-[38px] font-normal leading-[1.15] tracking-[-0.01em] text-white my-1">
              {translate("curated_engagement_default")}
            </h1>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#7A7468]">
              {translate("SANCTUARYMAINTENANCEBESPOKEPROTOCOL")}
            </span>
          </div>

          <div className="inline-flex self-start sm:self-center items-center gap-2 rounded-full border border-brand-gold bg-blue-950 px-4 py-2 text-xs font-bold tracking-wider text-[#33373E] shadow-xs">
            <Folder className="h-3.5 w-3.5 text-brand-gold fill-[#B89358]/20" />
            <span className="text-[11px] font-bold tracking-[0.14em] uppercase text-gray-300">
              {translate((CATEGORY_LABEL_KEYS[propertyType || "Studio"] ?? propertyType) as TranslationKey)}
            </span>
          </div>
        </div>

        {/* Thin Divider Line */}
        <div className="border-b  border-brand-gold " />

 
        {/* Selected Services & Folio Row */}
        {!isQuote && (<div className="flex items-center px-5 sm:px-7  py-3 justify-between">
          <h2 className="text-[10.5px] font-bold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
            {translate("equipSelectedServices")} &bull; SPECIFICATIONS
          </h2>
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-gray-400 sm:text-[11px]">
            FOLIO {propertySizeSqm}M-LUXE
          </span>
        </div>)}


        {/**Quotation view draft  */}
        <div className="w-full flex justify-center items-center py-3 bg-brand-navy">
          {isQuote && !isPickupDeliveryServiceQuotation && (
            <div className="max-w-full grid md:grid-cols-1 grid-cols-1 justify-items-center items-center gap-4">
              {/**Number of cleaners */}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-1">
                <div 
                  className={`relative flex  flex-row justify-between gap-[5px] items-center  md:p-3 p-2.5  rounded-xl transition-all duration-300 border `}
                    
                >
                  {/* Top Row: Icon & Name */}
                  <div className="flex items-center gap-3.5 px-[2px]">
                    <div className="md:p-2.5 p-1.5 rounded-lg bg-[#152243] border border-blue-900/40">
                      <Users className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold md:text-base text-[12px] text-slate-100 tracking-wide">
                      {translate("quotationStep4AllocatedPros")?.split(".")[1]}
                    </h3>
                  </div>

                  {/* Action Area: Toggle between "Add" Button and Counter */}
                  <div className="">
                      <div className="flex flex-col gap-2">
                        {/* Counter Row */}
                        <div className="flex items-center justify-between bg-[#152243] rounded-xl p-1.5 border border-blue-900/40">
                          <button
                            type="button"
                            onClick={onChangeSetNumCleanerDecrementQuotation}
                            disabled={(numCleaners ?? 1) <= 1}
                            className={`w-5 md:w-10 h-5 md:h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                              (numCleaners ?? 1) <= 1
                                ? 'opacity-60 cursor-not-allowed bg-[#1f2e5c] text-gray-400'
                                : 'bg-[#1f305e] hover:bg-[#273b75] text-white'
                            }`}
                            aria-label="Decrement"
                          >
                            <Minus className="md:w-4 w-3 md:h-4 h-3" />
                          </button>
    
                          <span className="font-bold md:text-lg text-[13px] text-slate-100 px-4">
                            {numCleaners}
                          </span>

                          <button
                            type="button"
                            onClick={onChangeSetNumCleanersIncrementQuotation}
                            disabled={(numCleaners ?? 1) >= 10} 
                            className={`w-5 md:w-10 h-5 md:h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                              (numCleaners ?? 1) >= 10 
                                ? 'opacity-60 cursor-not-allowed bg-[#1f2e5c] text-gray-400' 
                                : 'bg-[#1f305e] hover:bg-[#273b75] text-white'
                            }`}
                            aria-label="Increment"
                          >
                            <Plus className="md:w-4 w-3 md:h-4 h-3" />
                          </button>
                        </div>

                        
                      </div>
                    
                  </div>
                </div>

                {/**Cleaning duration */}
                <div 
                  className={`relative flex  flex-row justify-between gap-[5px] items-center  md:p-3 p-2.5  rounded-xl transition-all duration-300 border `}
                    
                >
                  {/* Top Row: Icon & Name */}
                  <div className="flex items-center gap-3.5 px-[2px]">
                    <div className="md:p-2.5 p-1.5 rounded-lg bg-[#152243] border border-blue-900/40">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <h3 className="font-semibold md:text-base text-[12px] text-slate-100 tracking-wide">
                      {translate("quotationStep5CleanerDuration")?.split(".")[1]}
                    </h3>
                  </div>

                  
                  <div className="">
                      <div className="flex flex-col gap-2">
                        {/* Counter Row */}
                        <div className="flex items-center justify-between bg-[#152243] rounded-xl p-1.5 border border-blue-900/40">
                          <button
                            type="button"
                            onClick={onChangeNumberOfCleaningHoursChangeDecrement}
                            disabled={(durationHours ?? 1) <= 1}
                            className={`w-5 md:w-10 h-5 md:h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                              (durationHours ?? 1) <= 1
                                ? 'opacity-60 cursor-not-allowed bg-[#1f2e5c] text-gray-400'
                                : 'bg-[#1f305e] hover:bg-[#273b75] text-white'
                            }`}
                            aria-label="Decrement"
                          >
                            <Minus className="md:w-4 w-3 md:h-4 h-3" />
                          </button>
    
                          <span className="font-bold md:text-lg text-[13px] text-slate-100 px-4">
                            {durationHours}
                          </span>

                          <button
                            type="button"
                            onClick={onChangeNumberOfCleaningHoursChangeIncrement}
                            disabled={(durationHours ?? 1) >= 10} 
                            className={`w-5 md:w-10 h-5 md:h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                              (durationHours ?? 1) >= 10 
                                ? 'opacity-60 cursor-not-allowed bg-[#1f2e5c] text-gray-400' 
                                : 'bg-[#1f305e] hover:bg-[#273b75] text-white'
                            }`}
                            aria-label="Increment"
                          >
                            <Plus className="md:w-4 w-3 md:h-4 h-3" />
                          </button>
                        </div>

                        
                      </div>
                    
                  </div>
                </div>
              </div>
              {/**linguistic coordinators, staff gender preferences */}
              <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-1">
                {/* Staff Gender Preference */}
                <div className="flex flex-row items-center gap-3 rounded-xl border  bg-[#0e1a2e] p-2.5 md:p-3">
                  <div className="shrink-0 md:p-2.5 p-1.5 rounded-lg bg-[#152243] border border-blue-900/40">
                    <UserCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      {translate("quotationStepGenderPref")}
                    </span>
                    <Select value={gender} onValueChange={onGenderChange}>
                      <SelectTrigger className="h-8 w-full rounded-lg border border-blue-900/40 bg-[#152243] hover:text-white text-slate-100 text-[12px] font-semibold shadow-inner focus:ring-1 focus:ring-blue-500/50 [&>svg]:text-blue-400">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121E2D] border text-white border-blue-900/40 ">
                        {genderPreferenceValues.map((g) => (
                          <SelectItem
                            key={g.value}
                            value={g.value}
                            className="text-slate-100 focus:bg-[#dfdfdf] focus:text-white"
                          >
                            {g.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Linguistic Coordination */}
                <div className="flex flex-row items-center gap-3 rounded-xl border  bg-[#0e1a2e] p-2.5 md:p-3">
                  <div className="shrink-0 md:p-2.5 p-1.5 rounded-lg bg-[#152243] border border-blue-900/40">
                    <Languages className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      {translate("quotationStepLinguistic")}
                    </span>
                    <Select value={language} onValueChange={onLanguageChange}>
                      <SelectTrigger className="h-8 w-full rounded-lg border border-blue-900/40 bg-[#152243] hover:text-white text-slate-100 text-[12px] font-semibold shadow-inner focus:ring-1 focus:ring-blue-500/50 [&>svg]:text-blue-400">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121E2D] border text-white border-blue-900/40 ">
                        {languageCoordinationOptions.map((lang) => (
                          <SelectItem
                            key={lang}
                            value={lang}
                            className="text-slate-100 focus:bg-[#dfdfdf] focus:text-white"
                          >
                            {lang}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
            </div>
          )}
        </div>

        {/* 4-Column Specifications Grid */}
        {!isQuote && (
          <>
          <div className="grid grid-cols-2 gap-y-4 gap-x-6 px-5  py-3 sm:px-7 sm:grid-cols-4 mt-4 mb-6">
          {/* Item 1: PROPERTY SCALE */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">
              <Ruler aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
              {translate("equipPropertyScale")}
            </span>
            <span className="font-serif text-[17px] md:text-[26px] font-normal text-white text-shadow
             leading-tight mt-1">
              {propertySizeSqm} m²
            </span>
          </div>

          {/* Item 2: TOTAL DURATION */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">
              <Clock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
              {translate("totalDuration")}
            </span>
            <span className="font-serif text-[17px] md:text-[26px] font-normal text-white text-shadow leading-tight mt-1">
              {hasDuration ? `${quote!.minHours} – ${quote!.maxHours}h` : "2.5 – 5h"}
            </span>
          </div>

          {/* Item 3: ALLOCATED STAFF */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">
              <Users aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
              {translate("allocatedStaff")}
            </span>
            <div className="flex items-baseline mt-1">
              <span className="font-serif text-[17px] md:text-[26px] font-normal text-white text-shadow leading-tight">
                {cleanersCount}
              </span>
              <span className="ml-1.5 text-xs sm:text-[13px] font-bold uppercase tracking-wider
               text-white text-shadow">
                {translate("seniorname")}
              </span>
            </div>
          </div>

          {/* Item 4: ON-SITE WINDOW */}
          <div className="flex flex-col">
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">
              <CalendarClock aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand-gold" />
              {translate("onSiteWindow")}
            </span>
            <span className="font-serif text-[22px] sm:text-[26px] font-normal text-white text-shadow leading-tight mt-1">
              {onSiteText}
            </span>
          </div>
        </div>

        {/* On-site estimate explainer */}
        <div className="px-5 sm:px-7 -mt-2 mb-4">
          <p className="text-[12px] sm:text-[13px] font-semibold text-white">
            {translate(cleanersCount === 1 ? "onSiteEstimateOne" : "onSiteEstimateMany")
              .replace("{duration}", onSiteText)
              .replace("{count}", String(cleanersCount))}
          </p>
          <p className="mt-1 text-[11px] sm:text-[12px] leading-relaxed text-gray-400">
            {translate("onSiteEstimateNote")}
          </p>
        </div>
      

        {/* Highlighted Price Card */}
        <div className="px-5 sm:px-7 mb-3 py-3 w-full flex justify-center items-center">
          <div className="rounded-[16px] w-[95%] md:w-full border border-brand-gold bg-blue-950 px-5 py-4 sm:px-6 sm:py-5 flex flex-row sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex flex-col ">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-white">
                {translate("CLEANINGDURATION")}
              </span>
              <p className="text-[12px] text-gray-400 font-normal mt-0.5">
                {translate("BaselineAppointment")}
              </p>
            </div>
            <div className="flex flex-row gap-1 md:items-start items-center sm:items-end justify-center shrink-0">
              <span className="font-serif text-[13px] md:text-[25px] font-normal text-white leading-tight tracking-tight">
                {money(hasPrice ? quote!.priceMin : 67.5)}
              </span>
              <span className="text-[13px] my-[2px] text-gray-400 font-normal mt-0.5">
                -
              </span>
              <span className="font-serif text-[13px] md:text-[25px] font-normal text-white leading-tight tracking-tight">
                {money(hasPrice ? quote!.priceMax : 135.0)}
              </span>
            </div>
           
          </div>
          
        </div>

        </>
      )}

        {/* Top Toggle Switch: BY CLIENT vs BY COMPANY */}
        <div className="w- mt-2 bg-[#08163dbd] p-5 sm:p-7 shadow-lg shadow-gray-700 py-3 border-t border-gray-600">

          <div className="flex flex-col justify-center w-full  ">
            {/**cleaning chemical and equiment */}
            <div className="w-full flex flex-row mt-1 mb-8 pb-7 border-brand-gold border-b  justify-between items-center">
              <div className="flex flex-col gap-1">
                <h1 className="text-[14px] md:text-[17px] text-brand-gold uppercase tracking-widest font-bold">
                  {translate("CleaningChemicalEquipments")}
                </h1>
                <p className="text-gray-300 text-[12px] md:text-[13px]">
                  {translate("curated_engagement_default")}</p>
              </div>
              <p className="text-gray-400 text-[12px] md:text-[13px]">{translate("BespokeAdditions")}</p>
            </div>
            <div className="inline-flex w-[100%] p-2 items-center justify-center rounded-full bg-[#E5E0D8]/10 p-1 border border-[#D5CFC4]/50 shadow-inner">
              <button
                type="button"
                onClick={() => onSupplySourceChange("customer")}
                className={`inline-flex w-[60%] items-center  gap-1.5 rounded-full px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${isClient
                    ? "bg-[#C5A253] text-white shadow-md"
                    : "bg-transparent text-white hover:text-gray-400"
                  }`}
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                {translate("equipByClient")}
              </button>
              <button
                type="button"
                onClick={() => onSupplySourceChange("company")}
                className={`inline-flex w-[60%] items-center gap-1.5 rounded-full px-5 py-4 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${isCompany
                    ? "bg-[#C5A253] text-white shadow-md"
                    : "bg-transparent text-white hover:text-gray-400"
                  }`}
              >
                <Briefcase className="w-3.5 h-3.5 shrink-0" />
                {translate("equipByCompany")}
              </button>
            </div>
          </div>

          {/* Equipment Items List (Displayed when BY COMPANY is selected) */}
          {/* Equipment Items List (Displayed when BY COMPANY is selected) */}
          {isCompany && (
            <div className="flex flex-col gap-3.5 w-full  p-2 mt-4 rounded-2xl">
              {displayedItems.map((item) => {
                const meta = getItemMeta(item);
                const qty = quantityOf(item.id);
                const isSelected = qty > 0;
                // Per-unit price scales with the selected property size, as in the other services
                const unitPrice = item.price != null ? calculateEquipmentItemPrice(item, propertySizeSqm) : meta.defaultPrice;

                return (
                  <div
                    key={item.id}
                    className={`rounded-[18px] bg-brand-navy/60 border  hover:border hover:border-brand-gold p-4 sm:p-5 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 ${isSelected
                        ? "bg-brand-navy border-[1.5px] border-[#C5A253] shadow-[0_2px_12px_rgba(197,162,83,0.18)]"
                        : "bg-brand-navy border-gray-500 hover:border hover:border-brand-gold shadow-sm"
                      }`}
                  >
                    {/* Left Content */}
                    <div className="flex flex-col min-w-0 flex-1 pr-2 ">
                      <div className="flex flex-wrap items-center gap-1.5 leading-tight">
                        <span className="font-extrabold text-white text-sm sm:text-[15px] tracking-wide uppercase">
                          {translate(meta.displayName as TranslationKey)}
                        </span>
                        <span className="text-[#9e9e9e]">•</span>
                        <span className="text-xs text-gray-300 italic font-medium">
                          {translate(meta.subtitle as TranslationKey)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed mt-1 line-clamp-2">
                        {translate(meta.description as TranslationKey)}
                      </p>
                    </div>

                    {/* Right Price & Stepper / ADD Button */}
                    <div className="flex items-center  justify-between sm:justify-end gap-4 sm:gap-6 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7E2D8]/60">
                      <div className="flex flex-col items-start sm:items-end">
                        {/* Line total (unit price × units added); the unit price until one is added */}
                        <span className="font-bold text-white text-sm sm:text-base leading-tight">
                          {money(unitPrice * Math.max(qty, 1))}
                        </span>
                        <span className="text-[9px] font-extrabold tracking-widest text-gray-300 uppercase mt-0.5">
                          {qty > 1 ? `${money(unitPrice)} × ${qty}` : translate("PERUNIT")}
                        </span>
                      </div>

                      {/* Action Control: ADD button vs Stepper */}
                      {qty === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleAdd(item.id)}
                          className="bg-[#C5A253] hover:bg-[#B8943F] active:scale-95 text-white font-extrabold text-xs px-6 py-2.5 rounded-full uppercase tracking-wider shadow-sm transition-all cursor-pointer min-w-[80px]"
                        >
                          {translate("equipmentAddButton")}
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#EBE6DD] rounded-full p-0.5 border border-[#D8D2C6] shadow-inner">
                          <button
                            type="button"
                            onClick={() => handleDecrement(item.id)}
                            aria-label="Decrease quantity"
                            className="w-7 h-7 flex items-center justify-center text-sm font-bold text-[#1E293B] hover:bg-black/5 active:scale-90 rounded-full transition-all cursor-pointer"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-extrabold text-sm text-[#1E293B] select-none">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleIncrement(item.id)}
                            disabled={qty >= EQUIPMENT_MAX_QTY}
                            aria-label="Increase quantity"
                            className="w-7 h-7 flex items-center justify-center text-sm font-bold bg-[#C5A253] text-white hover:bg-[#B8943F] disabled:opacity-50 disabled:cursor-not-allowed active:scale-90 rounded-full transition-all cursor-pointer shadow-sm"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {/* Highlighted Box: ESTIMATED PRICE RANGE — not shown on quotation requests */}
          {!isQuote && (
            <div className="mt-7 mb-2 flex border-brand-gold bg-blue-950  items-center justify-between gap-2 rounded-[8px] border px-4 py-4.5 sm:px-5">
              <div className="">
                <h2 className="text-xs font-bold uppercase tracking-wider text-[#C5A253] sm:text-sm">
                  {translate("equipEstimatedPriceRange")}
                </h2>
                <p className="text-[12px] text-gray-300 font-normal mt-0.5">
                  {translate("eliteMaterialDescription")}
                </p>
              </div>

              <span className="font-serif text-[22px] sm:text-[26px] font-normal text-white leading-tight mt-1 sm:text-base">
                {estimatedPriceRange}
              </span>
            </div>
          )}
          {/* Action Button: BOOK NOW */}
          {onBookNow && (
            <button
              type="button"
              onClick={onBookNow}
              disabled={submitting || !!bookDisabledReason}
              className="mt-3.5 w-full rounded-[10px] bg-[#C5A253] py-3.5 text-center text-sm font-extrabold uppercase tracking-wider text-[#0B1528] shadow-[0_4px_14px_rgba(197,162,83,0.35)] transition-all hover:bg-[#B39144] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
            >
              {submitting ? translate("equipBooking") : translate("equipBookNow")}
            </button>
          )}

          {bookDisabledReason && (
            <p className="mt-2 text-center text-xs text-[#94A3B8]">{bookDisabledReason}</p>
          )}

          {/* Quality Guarantee and Disclaimer */}
          <div className="mt-5 flex flex-col gap-1.5 border-t border-[#DDD5C7]/80 pt-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#A6803E]">
              <KeyRound className="h-4 w-4 shrink-0 text-[#A6803E]" />
              <span>{translate("equipQualityGuarantee")}</span>
            </div>
            <p className="text-[11px] leading-relaxed md:text-left text-center text-gray-400 sm:text-xs">
              {translate("equipGuaranteeDesc1")}
            </p>
            <p className="text-[11px] leading-relaxed md:text-left text-center text-gray-400 sm:text-xs">
              {translate("equipGuaranteeDesc2")}
            </p>
          </div>

        </div>
      </section>

      {/* Below-Card Navigation Bar */}
      {!isQuote && (<div className="flex items-center py-2 justify-between md:justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-[8px] border border-[#C5A253] bg-white px-8 py-2.5 text-sm font-semibold text-[#0B1528] shadow-sm transition hover:bg-[#F8F9FA]"
        >
          {translate("commonBack")}
        </Link>
        <span className="inline-flex items-center gap-1 text-sm font-bold text-[#C5A253]">
          {translate("equipServiceInfo")} <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>)}
    </div>
  );
}


const checkableBoxesPlaceHolder=()=>{
  
 
  <div 
    className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
       "bg-[#111936] border-gray-500 hover:border-gray-700 hover:bg-[#162042]"
    }`}
    >
      {/* Left side: Icon simulation matching UI layout style */}
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors
           "bg-[#1C2541] text-slate-400"
          `}
        >
          🎞
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white tracking-wide">
            placeholder
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            subtitle  
          </p>
        </div>
      
      {/* Right side checkbox indicator matching image look */}
      <div
        className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all  "border-slate-700 bg-transparent"
        }`}
      >
         <Check className="w-4 h-4 stroke-[3]" />
      </div>
    </div>
  </div>
}