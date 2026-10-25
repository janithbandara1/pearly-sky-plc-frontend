"use client";

import React, { useState, useMemo } from "react";
import { Tag } from "lucide-react";
import { CartItem, ServiceConfig } from "@/lib/booking";

interface LiveEstimateSummaryProps {
  config: ServiceConfig;
  cart: CartItem[];
  activeAddons: string[];
  selectedCondition: string;
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  theme?: "dark" | "light";
}

export default function LiveEstimateSummary({
  config,
  cart,
  activeAddons,
  selectedCondition,
  currentStep,
  onNextStep,
  onPrevStep,
  theme = "dark",
}: LiveEstimateSummaryProps) {
  const isLight = theme === "light";
  const [promo, setPromo] = useState(config.promoCodeDefault);
  const [discountApplied, setDiscountApplied] = useState(true);

  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = subtotal * config.taxRate;
  const total = subtotal + tax;

  // Realistic labor estimate (~1.8 Hours for 1 pool service matching screenshot)
  const estimatedLaborHours = useMemo(() => {
    if (cart.length === 0) return "~ 0 Hours";
    const baseHours = cart.reduce((sum, item) => sum + item.quantity * 1.5, 0);
    const addonHours = activeAddons.length * 0.3;
    const conditionHours = selectedCondition === "heavy-algae" ? 0.4 : 0;
    const computed = (baseHours + addonHours + conditionHours).toFixed(1);
    return `~${computed} Hours`;
  }, [cart, activeAddons, selectedCondition]);

  return (
    <div
      className={`rounded-2xl p-6 shadow-2xl sticky top-20 border transition-all duration-300 ${
        isLight
          ? "bg-white border-[#D9DDE5] text-[#1A2238]"
          : "bg-[#1B2A40] border-[#718096]/50 text-white"
      }`}
    >
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"
        }`}
      >
        <h3
          className={`text-lg font-bold tracking-wide font-serif ${
            isLight ? "text-[#002F6D]" : "text-[#FFD766]"
          }`}
        >
          Live Estimate Summary
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
            isLight
              ? "bg-[#002F6D]/10 text-[#002F6D] border-[#002F6D]/20"
              : "bg-[#FFD766]/15 text-[#FFD766] border-[#FFD766]/30"
          }`}
        >
          Real-time
        </span>
      </div>

      {/* Itemized Cart Breakdown */}
      <div className="py-4 space-y-3 text-sm max-h-[280px] overflow-y-auto pr-1">
        {cart.length === 0 ? (
          <p className={`text-xs text-center py-6 ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
            No services selected yet. Click &apos;Select&apos; on any card.
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className={`font-medium ${isLight ? "text-[#1A2238]" : "text-white"}`}>{item.name}</p>
                <p className={`text-xs ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>{item.detail}</p>
              </div>
              <span className={`font-semibold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* Labor Estimate */}
      <div
        className={`py-3 border-t border-b flex justify-between items-center text-xs ${
          isLight
            ? "border-[#D9DDE5] text-[#687386]"
            : "border-[#718096]/30 text-[#C3CDDC]"
        }`}
      >
        <span>Estimated On-Site Labor</span>
        <span className={`font-mono font-bold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
          {estimatedLaborHours}
        </span>
      </div>

      {/* Promo Code Box */}
      <div className="py-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`} />
            <input
              type="text"
              value={""}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo Code"
              className={`w-full rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none transition-colors ${
                isLight
                  ? "bg-[#FFFFFF] border border-[#D9DDE5] text-[#1A2238] placeholder-gray-400 focus:border-[#002F6D]"
                  : "bg-[#152238] border border-[#718096] text-white placeholder-gray-500 focus:border-[#FFD766]"
              }`}
            />
          </div>
          <button
            onClick={() => setDiscountApplied(true)}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-colors cursor-pointer ${
              isLight
                ? "bg-[#002F6D] text-white hover:bg-[#002F6D]/90"
                : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90 font-bold"
            }`}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Totals Summary */}
      <div className={`space-y-2 pt-2 border-t ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
        <div className={`flex justify-between text-sm ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={`flex justify-between text-sm ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
          <span>Estimated Taxes (10% VAT)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div
          className={`flex justify-between text-base font-bold pt-2 border-t ${
            isLight
              ? "border-[#D9DDE5] text-[#1A2238]"
              : "border-[#718096]/30 text-white"
          }`}
        >
          <span>Total Service Amount</span>
          <span className={isLight ? "text-[#002F6D]" : "text-[#FFD766]"}>${total.toFixed(2)}</span>
        </div>
        <p className={`text-[10px] text-right ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
          Inclusive of chemical supplies
        </p>
      </div>
    </div>
  );
}