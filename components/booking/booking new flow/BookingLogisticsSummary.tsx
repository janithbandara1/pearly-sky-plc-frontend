"use client";

import React, { useState } from "react";
import { Crown, Lock, CalendarDays, Sparkles, Clock, Tag, Percent, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { SupplySource } from "../common-flows-propertis-and-equipments/common-equipment-flow-section";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useCurrency } from "@/lib/currency-context";

export interface SelectedAddonItem {
  id: string | number;
  name: string;
  quantity: number;
  unitPrice?: number;
  price?: number;
  totalPrice?: number;
}

export interface BookingLogisticsSummaryProps {
  onNextStep?: () => void;
  theme?: "dark" | "light";

  // Essential props derived from booking & equipment state flow
  propertyType?: string;
  propertySizeSqm?: number;
  scheduleWindow?: string;
  frequencyDiscountLabel?: string;
  frequencyDiscountRate?: number;
  addOnsTotal?: number;
  solventsCost?: number;
  supplySource?: SupplySource;
  servicePlanName?: string;
  selectedRoomsSummary?: string;
  selectedAddons?: SelectedAddonItem[];
  currencySymbol?: string;
  baseRate?: number;
  cleanerCount?: number;
  estimatedHours?: number;
  laborTotal?: number;
  advanceDeposit?: number;
  isQuote?: boolean;
}

export default function BookingLogisticsSummary({
  onNextStep,
  theme = "dark",
  propertyType = "Studio",
  propertySizeSqm = 225,
  scheduleWindow = "Not selected yet",
  frequencyDiscountLabel = "One-Time (0% Off)",
  frequencyDiscountRate = 0,
  addOnsTotal = 0,
  solventsCost,
  supplySource = "company",
  servicePlanName = "Regular Home Cleaning",
  selectedRoomsSummary = "None selected",
  selectedAddons = [],
  currencySymbol: customCurrencySymbol,
  baseRate,
  cleanerCount,
  estimatedHours,
  laborTotal,
  advanceDeposit,
  isQuote = false,
}: BookingLogisticsSummaryProps) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();
  const currencySymbol = customCurrencySymbol || symbol || "€";
  const isLight = theme === "light";

  const [isBreakdownOpen, setIsBreakdownOpen] = useState(true);

  // Dynamic calculations based on state
  const rate = baseRate ?? 29.0;
  const cleaners = cleanerCount ?? (propertySizeSqm > 150 ? 2 : 1);
  const hours = estimatedHours ?? Math.max(2, Math.ceil(propertySizeSqm / 30));
  const labor = laborTotal ?? cleaners * hours * rate;
  const discountRate = frequencyDiscountRate ?? 0;
  const frequencySavings = labor * discountRate;
  
  // Real solvents & equipment pricing
  const equipmentSolventsCost =
    solventsCost !== undefined
      ? solventsCost
      : supplySource === "company"
      ? addOnsTotal
      : 0;

  const estimatedTotal = Math.max(0, labor - frequencySavings + equipmentSolventsCost);
  const deposit = advanceDeposit ?? Math.min(rate, estimatedTotal > 0 ? estimatedTotal : rate);

  const solventsText =
    supplySource === "company"
      ? `By Company (${currencySymbol}${equipmentSolventsCost.toFixed(2)})`
      : `By Client (${currencySymbol}0.00)`;

  const propertyScaleText = `${translate(propertyType as TranslationKey) || propertyType} (${propertySizeSqm} m²)`;

  const logisticsItems = [
    { title: "Service Plan:", value: servicePlanName, highlight: true },
    { title: "Property Scale:", value: propertyScaleText, highlight: false },
    { title: "Selected Rooms:", value: selectedRoomsSummary, highlight: false },
    { title: "Schedule Window:", value: scheduleWindow, highlight: true },
    { title: "Frequency Discount:", value: frequencyDiscountLabel.split("(")[0], customColor: "text-emerald-400 font-semibold" },
    { title: "Solvents & Equipment:", value: solventsText, highlight: true },
  ];

  return (
    <div
      className={`rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden ${
        isLight
          ? "bg-white border-[#C5A059] text-[#1A2238]"
          : "bg-[#1B2A40]/80 backdrop-blur-2xl border-[#C5A059] text-white"
      }`}
    >
      {/* Header Section */}
      <div className={`flex items-start justify-between pb-4 border-b ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className={`w-3.5 h-3.5 ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`} />
            <span className={`text-[10px] font-bold tracking-widest uppercase ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
              EXECUTIVE SUMMARY
            </span>
          </div>
          <h3 className={`text-xl font-serif font-bold tracking-wide ${isLight ? "text-[#1A2238]" : "text-white"}`}>
            {isQuote ? "Inquiry Overview" : "Booking Logistics"}
          </h3>
        </div>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform hover:scale-105 ${
          isLight
            ? "border-[#D9DDE5] bg-[#F7F5F0] text-[#002F6D]"
            : "border-[#718096]/40 bg-[#111C2E] text-[#FFD766]"
        }`}>
          <Crown className="h-5 w-5" />
        </div>
      </div>

      {/* Categorized Logistics Content */}
      <div className="py-4 space-y-3 text-sm">
        {logisticsItems.map((item, index) => (
          <div 
            key={index} 
            className={`flex flex-col space-y-0.5 p-2 rounded-xl transition-colors duration-200 ${
              isLight ? "hover:bg-[#F7F5F0]" : "hover:bg-[#152238]/60"
            }`}
          >
            <span className={`text-[11px] font-medium tracking-wide uppercase ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
              {item.title}
            </span>
            <span className={`text-sm font-semibold tracking-wide ${
              item.customColor
                ? item.customColor
                : item.highlight
                ? isLight
                  ? "text-[#002F6D] font-bold"
                  : "text-[#FFD766] font-bold"
                : isLight
                ? "text-[#1A2238]"
                : "text-white"
            }`}>
              {translate(item.value as TranslationKey) || item.value}
            </span>
          </div>
        ))}

        {/* Dynamic Upgrades / Add-ons Breakdown Section */}
        {!isQuote && (
          <div className={`flex flex-col space-y-2 pt-3 mt-2 border-t ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
            <div className="flex justify-between items-center px-2">
              <span className={`text-xs font-semibold tracking-wide ${isLight ? "text-[#1A2238]" : "text-[#C3CDDC]"}`}>
                Add-on Items Selected ({selectedAddons.length})
              </span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-md border ${
                isLight ? "bg-[#F7F5F0] text-[#002F6D] border-[#D9DDE5]" : "bg-[#111C2E] text-[#FFD766] border-[#718096]/40"
              }`}>
                {currencySymbol}{equipmentSolventsCost.toFixed(2)}
              </span>
            </div>

            {selectedAddons && selectedAddons.length > 0 ? (
              <div className={`mt-1 ml-1 pl-3 border-l-2 space-y-2.5 ${isLight ? "border-[#002F6D]/40" : "border-[#FFD766]/40"}`}>
                {selectedAddons.map((addon) => {
                  const uPrice = addon.unitPrice ?? addon.price ?? 0;
                  const lineTotal = addon.totalPrice ?? uPrice * addon.quantity;
                  const displayName = translate(addon.name as TranslationKey) || addon.name;
                  return (
                    <div key={addon.id} className="flex justify-between items-start text-xs gap-2 p-1.5 rounded-lg transition-colors hover:bg-white/5">
                      <div className="flex flex-col">
                        <span className={`font-semibold ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                          • {displayName}
                        </span>
                        <span className={`text-[11px] ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                          Qty: <strong className={isLight ? "text-[#1A2238]" : "text-white"}>{addon.quantity}</strong> × {currencySymbol}{uPrice.toFixed(2)}
                        </span>
                      </div>
                      <span className={`font-mono font-bold shrink-0 ${isLight ? "text-[#002F6D]" : "text-[#36D6A0]"}`}>
                        {currencySymbol}{lineTotal.toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className={`text-xs italic px-2 py-1 ${isLight ? "text-[#687386]" : "text-[#718096]"}`}>
                {supplySource === "customer" ? "Client providing own equipment" : "No add-on items selected"}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Financial Estimates Breakdown Card */}
      <div className={`p-3.5 rounded-xl border transition-all ${
        isLight ? "bg-[#F7F5F0] border-[#D9DDE5] text-[#1A2238]" : "bg-[#152238] border-[#718096]/30 text-[#C3CDDC]"
      }`}>
        <button 
          onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
          className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider mb-2 cursor-pointer focus:outline-none"
        >
          <span className={isLight ? "text-[#002F6D]" : "text-[#FFD766]"}>Financial Breakdown</span>
          {isBreakdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {isBreakdownOpen && (
          <div className={`space-y-2 text-xs pt-2 border-t ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"} animate-fadeIn`}>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><Tag className="w-3 h-3 opacity-70" /> Base Rate:</span>
              <span className="font-mono">{currencySymbol}{rate.toFixed(2)} / hr per staff</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 opacity-70" /> Est. Staff & Labor:</span>
              <span className="font-mono">{cleaners} Staff × {hours.toFixed(1)}h = {currencySymbol}{labor.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5"><Percent className="w-3 h-3 opacity-70" /> Frequency Savings:</span>
              <span className={`font-mono ${frequencySavings > 0 ? (isLight ? "text-emerald-700 font-semibold" : "text-[#36D6A0] font-semibold") : ""}`}>
                -{currencySymbol}{frequencySavings.toFixed(2)}
              </span>
            </div>
            {equipmentSolventsCost > 0 && (
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3 opacity-70" /> Solvents & Equipment:</span>
                <span className={`font-mono font-semibold ${isLight ? "text-emerald-700" : "text-[#36D6A0]"}`}>+{currencySymbol}{equipmentSolventsCost.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Estimated Total Block */}
      <div className={`pt-4 pb-3 mt-3 border-t flex flex-col space-y-1 ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
        <div className="flex justify-between items-baseline">
          <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-[#C3CDDC]"}`}>
            ESTIMATED TOTAL
          </span>
          <span className={`text-2xl font-serif font-bold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
            {currencySymbol}{estimatedTotal.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Includes all taxes & insurance</span>
        </div>
      </div>

      {/* Advance Deposit Box */}
      {!isQuote && (
        <div className={`my-3 p-3.5 rounded-xl border flex items-center justify-between ${
          isLight
            ? "bg-[#F7F5F0] border-[#D9DDE5] text-[#1A2238]"
            : "bg-[#111C2E] border-[#718096]/40 text-white"
        }`}>
          <div className="flex flex-col">
            <span className={`text-xs font-bold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
              Advance Deposit Required
            </span>
            <span className={`text-[11px] ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
              Locks staff schedule instantly
            </span>
          </div>
          <span className={`font-serif font-bold text-base px-2.5 py-1 rounded-lg border ${
            isLight
              ? "bg-white text-[#002F6D] border-[#D9DDE5] shadow-xs"
              : "bg-[#1B2A40] text-[#FFD766] border-[#FFD766]/30"
          }`}>
            {currencySymbol}{deposit.toFixed(2)}
          </span>
        </div>
      )}

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={onNextStep}
          className={`group w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
            isLight
              ? "bg-[#002F6D] text-white hover:bg-[#002F6D]/90"
              : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90 font-bold"
          }`}
        >
          <CalendarDays className="w-4 h-4 stroke-[2.5] transition-transform group-hover:rotate-12" />
          <span>{isQuote ? "Submit Quotation Request" : "BOOK APPOINTMENT NOW"}</span>
        </button>
      </div>

      {/* Security Footer Notice */}
      <div className={`flex items-center justify-center gap-1.5 pt-4 text-[11px] ${isLight ? "text-[#687386]" : "text-[#718096]"}`}>
        <Lock className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span>256–Bit SSL Encrypted & Confidential</span>
      </div>
    </div>
  );
}