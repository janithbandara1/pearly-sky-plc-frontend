"use client";

import React from "react";
import { Crown, Lock, CalendarDays } from "lucide-react";
import { SupplySource } from "../common-flows-propertis-and-equipments/common-equipment-flow-section";
import { useLanguage } from "@/lib/i18n/language-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";

export interface SelectedAddonItem {
  id: string | number;
  name: string;
  quantity: number;
  price?: number;
}

interface BookingLogisticsSummaryProps {
  onNextStep?: () => void;
  theme?: "dark" | "light";

  // Essential props derived from booking & equipment state flow
  propertyType?: string;
  propertySizeSqm?: number;
  scheduleWindow?: string;
  frequencyDiscountLabel?: string;
  addOnsTotal?: number;
  supplySource?: SupplySource;
  servicePlanName?: string;
  selectedRoomsSummary?: string;
  selectedAddons?: SelectedAddonItem[];
}

export default function BookingLogisticsSummary({
  onNextStep,
  theme = "dark",
  propertyType = "Studio",
  propertySizeSqm = 225,
  scheduleWindow = "Oct 22, 2026 @ 09:00 AM",
  frequencyDiscountLabel = "One-Time (0% Off)",
  addOnsTotal = 0,
  supplySource = "company",
  servicePlanName = "Regular Home Cleaning",
  selectedRoomsSummary = "2 Bed, 2 Bath, 1 Living",
  selectedAddons = [],
}: BookingLogisticsSummaryProps) {
  const { translate } = useLanguage();
  const isLight = theme === "light";

  // Dynamic calculations based on state
  const solventsText = supplySource === "company" ? "By Company (€39.20)" : "By Client (€0.00)";
  const propertyScaleText = `${translate(propertyType as TranslationKey)} (${propertySizeSqm} m²)`;
  
  const estimatedTotal = 232.00 + addOnsTotal + (supplySource === "company" ? 39.20 : 0);

  const logisticsItems = [
    { title: "Service Plan:", value: servicePlanName, highlight: true },
    { title: "Property Scale:", value: propertyScaleText, highlight: false },
    { title: "Selected Rooms:", value: selectedRoomsSummary, highlight: false },
    { title: "Schedule Window:", value: scheduleWindow, highlight: true },
    { title: "Frequency Discount:", value: frequencyDiscountLabel, customColor: "text-emerald-400" },
    { title: "Solvents & Equipment:", value: solventsText, highlight: true },
  ];

  return (
    <div
      className={`rounded-2xl p-6 shadow-2xl border transition-all duration-300 ${
        isLight
          ? "bg-white border-[#C5A059]/40 text-[#1B2E4B]"
          : "bg-[#121e2d]/95 backdrop-blur-xl border-[#c9a858]/35 text-white"
      }`}
    >
      {/* Header Section */}
      <div
        className={`flex items-start justify-between pb-4 border-b ${
          isLight ? "border-gray-200" : "border-white/10"
        }`}
      >
        <div>
          <span
            className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${
              isLight ? "text-[#C5A059]" : "text-[#c9a858]"
            }`}
          >
            EXECUTIVE SUMMARY
          </span>
          <h3
            className={`text-xl font-serif font-bold tracking-wide ${
              isLight ? "text-[#1B2E4B]" : "text-white"
            }`}
          >
            Booking Logistics
          </h3>
        </div>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${
            isLight
              ? "border-[#C5A059]/40 bg-amber-50 text-[#C5A059]"
              : "border-[#c9a858]/40 bg-[#1c2a40] text-[#c9a858]"
          }`}
        >
          <Crown className="h-5 w-5" />
        </div>
      </div>

      {/* Categorized Logistics Content */}
      <div className="py-4 space-y-3.5 text-sm">
        {logisticsItems.map((item, index) => (
          <div key={index} className="flex flex-col space-y-0.5">
            <span
              className={`text-xs font-medium tracking-wide ${
                isLight ? "text-gray-500" : "text-gray-400"
              }`}
            >
              {item.title}
            </span>
            <span
              className={`text-sm font-semibold tracking-wide ${
                item.customColor
                  ? item.customColor
                  : item.highlight
                  ? isLight
                    ? "text-[#C5A059]"
                    : "text-[#c9a858]"
                  : isLight
                  ? "text-[#1B2E4B]"
                  : "text-white"
              }`}
            >
              {translate(item.value as TranslationKey)}
            </span>
          </div>
        ))}

        {/* Dynamic Upgrades / Add-ons Breakdown Section */}
        <div className="flex flex-col space-y-1 pt-1">
          <div className="flex justify-between items-center">
            <span
              className={`text-xs font-medium tracking-wide ${
                isLight ? "text-gray-500" : "text-gray-400"
              }`}
            >
              Upgrades Selected:
            </span>
            <span className={`text-xs font-semibold ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
              €{addOnsTotal.toFixed(2)}
            </span>
          </div>

          {selectedAddons && selectedAddons.length > 0 ? (
            <div className={`mt-1.5 pl-3 border-l-2 space-y-1 ${isLight ? "border-[#C5A059]/40" : "border-[#c9a858]/40"}`}>
              {selectedAddons.map((addon) => (
                <div key={addon.id} className="flex justify-between items-center text-xs">
                  <span className={`${isLight ? "text-gray-700" : "text-gray-300"}`}>
                    • {translate(addon.name as TranslationKey)} <span className="text-[11px] opacity-70">(Qty: {addon.quantity})</span>
                  </span>
                  {addon.price !== undefined && (
                    <span className={`font-mono ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                      €{(addon.price * addon.quantity).toFixed(2)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <span className={`text-xs italic ${isLight ? "text-gray-400" : "text-gray-500"}`}>
              No upgrades selected
            </span>
          )}
        </div>
      </div>

      {/* Financial Estimates Breakdown */}
      <div className={`py-4 space-y-2 border-t text-xs ${isLight ? "border-gray-200 text-gray-600" : "border-white/10 text-gray-300"}`}>
        <div className="flex justify-between items-center">
          <span>Base Rate:</span>
          <span className="font-mono">€29.00 / hr per staff</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Est. Staff & Labor:</span>
          <span className="font-mono">2 Staff × 4.0h = €232.00</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Frequency Savings:</span>
          <span className="font-mono text-emerald-400">-€0.00</span>
        </div>
      </div>

      {/* Estimated Total Block */}
      <div className={`pt-3 pb-4 border-t flex flex-col space-y-1 ${isLight ? "border-gray-200" : "border-white/10"}`}>
        <div className="flex justify-between items-baseline">
          <span className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-gray-700" : "text-gray-300"}`}>
            ESTIMATED TOTAL
          </span>
          <span className={`text-2xl font-serif font-bold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
            €{estimatedTotal.toFixed(2)}
          </span>
        </div>
        <p className={`text-[11px] ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Includes all taxes & insurance
        </p>
      </div>

      {/* Advance Deposit Box */}
      <div
        className={`my-3 p-3.5 rounded-xl border flex items-center justify-between ${
          isLight
            ? "bg-amber-50/60 border-[#C5A059]/40 text-[#1B2E4B]"
            : "bg-[#0b132b] border-[#c9a858]/40 text-white"
        }`}
      >
        <div className="flex flex-col">
          <span className={`text-xs font-bold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
            Advance Deposit Required
          </span>
          <span className={`text-[11px] ${isLight ? "text-gray-600" : "text-gray-400"}`}>
            Locks staff schedule instantly
          </span>
        </div>
        <span className={`font-serif font-bold text-base ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
          €29.00
        </span>
      </div>

      {/* Action Button */}
      <div className="pt-2">
        <button
          onClick={onNextStep}
          className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
            isLight
              ? "bg-[#C5A059] text-white hover:bg-[#b08e4d] shadow-[#C5A059]/25"
              : "bg-gradient-to-r from-[#d4b261] to-[#b08e4d] text-[#121e2d] hover:brightness-110 shadow-[#c9a858]/20"
          }`}
        >
          <CalendarDays className="w-4 h-4 stroke-[2.5]" />
          BOOK APPOINTMENT NOW
        </button>
      </div>

      {/* Security Footer Notice */}
      <div className="flex items-center justify-center gap-1.5 pt-4 text-[11px] text-gray-400">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>256–Bit SSL Encrypted & Confidential</span>
      </div>
    </div>
  );
}