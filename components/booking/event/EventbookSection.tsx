"use client";

import Link from "next/link";
import { User, Briefcase, KeyRound, ArrowRight } from "lucide-react";
import type { CatalogItem, SizeQuote } from "@/lib/catalog-api";
import { calculateEquipmentItemPrice } from "@/lib/equipment-pricing";
import { useCurrency } from "@/lib/currency-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { Slider } from "radix-ui";

export type SupplySource = "" | "customer" | "company";

/** Reused across booking views and checkout summaries. */
export const SUPPLY_SOURCE_OPTIONS = [
    { value: "customer" as const, label: "BY CLIENT" },
    { value: "company" as const, label: "BY COMPANY" },
];

function formatHM(hours: number): string {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

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
    addOnsTotal?: number;
    onBookNow?: () => void;
    submitting?: boolean;
    bookDisabledReason?: string;
}

export function EventbookSection({
    propertyType = "Studio",
    categoryIcon = "🏢",
    propertySizeSqm,
    quote,
    hourlyRate,
    supplySource,
    onSupplySourceChange,
    items = [],
    selectedItemIds = new Set(),
    onToggleItem,
    addOnsTotal = 0,
    onBookNow,
    submitting = false,
    bookDisabledReason,
}: EquipmentSectionProps) {
    const { translate } = useLanguage();
    const { symbol } = useCurrency();
    const money = (n: number | null | undefined) => {
        const val = n != null && !Number.isNaN(Number(n)) ? Number(n) : 0;
        return `${symbol}${val.toFixed(2)}`;
    };

    const isCompany = supplySource === "company";
    const isClient = supplySource === "customer";

    const hasDuration = quote?.bookable && quote.minHours !== undefined && quote.maxHours !== undefined;
    const durationText = hasDuration
        ? `${formatHM(quote!.minHours as number)} – ${formatHM(quote!.maxHours as number)}`
        : "2h 30m – 5h";

    const cleanersCount = quote?.cleanerCount ?? 1;

    const hasPrice = hasDuration && quote?.priceMin != null && quote?.priceMax != null;
    const cleaningPriceRange = hasPrice
        ? `${money(quote!.priceMin)} – ${money(quote!.priceMax)}`
        : `${symbol}62.50 – ${symbol}125.00`;

    const totalMin = hasPrice ? (quote!.priceMin as number) + addOnsTotal : 62.5;
    const totalMax = hasPrice ? (quote!.priceMax as number) + addOnsTotal : 125.0;
    const estimatedPriceRange = `${money(totalMin)} – ${money(totalMax)}`;

    return (
        <div className="flex flex-col gap-4 pb-[40px]">
            {/* Unified Dark Card Container matching Image 1 */}
            <section className="overflow-hidden rounded-[12px] border border-[#1E2D45] bg-[#0B1528] p-4 text-[#FFFDF4] shadow-2xl sm:p-6">

                {/* Header Row: SELECTED SERVICES & Category Pill */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#1E2D45]">
                    <h2 className="text-xs font-bold uppercase tracking-wider text-[#FFFDF4] sm:text-sm">
                        {translate("equipSelectedServices")}
                    </h2>
                    <div className="flex items-center gap-1.5 rounded-md bg-[#16243A] px-2.5 py-1 text-xs font-bold text-[#C5A253]">
                        <span>{categoryIcon}</span>
                        <span>{propertyType}</span>
                    </div>
                </div>

                {/* Row 1: PROPERTY SCALE */}
                <div className="flex items-center justify-between py-3 border-b border-[#1E2D45]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8A99AD] sm:text-xs">
                        {translate("equipPropertyScale")}
                    </span>
                    <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                        {propertySizeSqm} m²
                    </span>
                </div>

                {/* Row 2: TOTAL SERVICE DURATION */}
                <div className="flex items-center justify-between py-3 border-b border-[#1E2D45]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8A99AD] sm:text-xs">
                        {translate("equipTotalServiceDuration")}
                    </span>
                    <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                        {durationText}
                    </span>
                </div>

                {/* Row 3: ALLOCATED PROFESSIONALS */}
                <div className="flex items-center justify-between py-3 border-b border-[#1E2D45]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8A99AD] sm:text-xs">
                        {translate("equipAllocatedProfessionals")}
                    </span>
                    <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                        {cleanersCount}
                    </span>
                </div>

                {/* Row 4: CLEANER DURATION (ON-SITE) */}
                <div className="flex items-center justify-between py-3 border-b border-[#1E2D45]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8A99AD] sm:text-xs">
                        {translate("equipCleanerDuration")}
                    </span>
                    <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                        {durationText}
                    </span>
                </div>

                {/* Row 5: CLEANING DURATION PRICE RANGE */}
                <div className="flex items-center justify-between py-3 border-b border-[#1E2D45]">
                    <span className="text-xs font-bold uppercase tracking-wide text-[#8A99AD] sm:text-xs">
                        {translate("equipPriceRange")}
                    </span>
                    <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                        {cleaningPriceRange}
                    </span>
                </div>

                {/* Sub-Header: CLEANING CHEMICALS AND EQUIPMENTS */}
                <h3 className="mt-5 mb-3 text-xs font-bold uppercase tracking-wider text-[#FFFDF4] sm:text-sm">
                    {translate("equipChemicalsAndEquipments")}
                </h3>

                {/* Toggle Header Tabs (BY CLIENT vs BY COMPANY) */}
                <div className="mb-4 grid grid-cols-2 gap-3">
                    <button
                        type="button"
                        onClick={() => onSupplySourceChange("customer")}
                        className={`flex items-center justify-center gap-2 rounded-[8px] py-3 text-xs font-bold uppercase transition-all sm:text-sm ${isClient
                            ? "border-2 border-[#C5A253] bg-[#C5A253] text-[#0B1528] shadow-[0_0_12px_rgba(197,162,83,0.4)]"
                            : "border border-[#A98B4B] bg-transparent text-[#FFFDF4] hover:bg-[#C5A253]/10"
                            }`}
                    >
                        <User className="h-4 w-4 shrink-0" />
                        {translate("equipByClient")}
                    </button>

                    <button
                        type="button"
                        onClick={() => onSupplySourceChange("company")}
                        className={`flex items-center justify-center gap-2 rounded-[8px] py-3 text-xs font-bold uppercase transition-all sm:text-sm ${isCompany
                            ? "border-2 border-[#C5A253] bg-[#C5A253] text-[#0B1528] shadow-[0_0_12px_rgba(197,162,83,0.4)]"
                            : "border border-[#A98B4B] bg-transparent text-[#FFFDF4] hover:bg-[#C5A253]/10"
                            }`}
                    >
                        <Briefcase className="h-4 w-4 shrink-0" />
                        {translate("equipByCompany")}
                    </button>
                </div>

                {/* Item List (Displayed when BY COMPANY is selected) */}
                {isCompany && items.length > 0 && (
                    <div className="flex flex-col">
                        {items.map((item) => {
                            const isSelected = selectedItemIds.has(item.id);
                            const price = calculateEquipmentItemPrice(item, propertySizeSqm);
                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between border-t border-[#1E2D45] py-3.5 px-1 sm:px-2"
                                >
                                    <span className="text-xs font-bold uppercase tracking-wide text-[#FFFDF4]">
                                        {item.name}
                                    </span>
                                    <div className="flex items-center gap-3 sm:gap-4">
                                        <span className="text-xs font-bold text-[#FFFDF4] sm:text-sm">
                                            {money(price)}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => onToggleItem?.(item.id)}
                                            aria-pressed={isSelected}
                                            className={`rounded-[6px] px-4 py-1.5 text-xs font-bold transition-all ${isSelected
                                                    ? "border border-[#C5A253] bg-[#C5A253] text-[#0B1528]"
                                                    : "border border-[#C5A253] bg-transparent text-[#C5A253] hover:bg-[#C5A253] hover:text-[#0B1528]"
                                                }`}
                                        >
                                            {isSelected ? translate("quoteDetailAdded") : translate("quoteDetailAdd")}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Highlighted Box: ESTIMATED PRICE RANGE */}
                <div className="mt-5 flex items-center justify-between rounded-[8px] border border-[#2D3F59] bg-[#0E1A2E] px-4 py-3.5 sm:px-5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A253] sm:text-sm">
                        {translate("equipEstimatedPriceRange")}
                    </span>
                    <span className="text-sm font-extrabold text-[#FFFDF4] sm:text-base">
                        {estimatedPriceRange}
                    </span>
                </div>

                {/* Action Button: BOOK NOW */}
                {onBookNow && (
                    <button
                        type="button"
                        onClick={onBookNow}
                        disabled={submitting || !!bookDisabledReason}
                        className="mt-3.5 w-full rounded-[8px] bg-[#C5A253] py-3.5 text-center text-sm font-extrabold uppercase tracking-wider text-[#0B1528] shadow-[0_4px_14px_rgba(197,162,83,0.35)] transition-all hover:bg-[#B39144] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {submitting ? translate("equipBooking") : translate("equipBookNow")}
                    </button>
                )}

                {bookDisabledReason && (
                    <p className="mt-2 text-center text-xs text-[#94A3B8]">{bookDisabledReason}</p>
                )}

                {/* Quality Guarantee and Disclaimer */}
                <div className="mt-5 flex flex-col gap-1.5 border-t border-[#1E2D45]/60 pt-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-[#C5A253]">
                        <KeyRound className="h-4 w-4 shrink-0 text-[#C5A253]" />
                        <span>{translate("equipQualityGuarantee")}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-[#94A3B8] sm:text-xs">
                        {translate("equipGuaranteeDesc1")}
                    </p>
                    <p className="text-[11px] leading-relaxed text-[#94A3B8] sm:text-xs">
                        {translate("equipGuaranteeDesc2")}
                    </p>
                </div>
            </section>

            {/* Below-Card Navigation Bar */}
            <div className="flex items-center py-4 justify-between md:justify-center gap-1">
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-[8px] border border-[#C5A253] bg-white px-10 py-2 text-md font-semibold text-[#0B1528] shadow-sm transition hover:bg-[#F8F9FA]"
                >
                    {translate("commonBack")}
                </Link>
                <span className="inline-flex px-10 py-2 text-md items-center gap-1 font-bold text-[#C5A253]">
                    {translate("equipServiceInfo")} <ArrowRight className="h-3.5 w-3.5" />
                </span>
            </div>

        </div>
    );
}
