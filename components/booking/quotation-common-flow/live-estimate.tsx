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
          ? "bg-white border-[#C5A059]/40 text-[#1B2E4B]"
          : "bg-[#121e2d]/95 backdrop-blur-xl border-[#c9a858]/35 text-white"
      }`}
    >
      <div
        className={`flex items-center justify-between pb-4 border-b ${
          isLight ? "border-gray-200" : "border-white/10"
        }`}
      >
        <h3
          className={`text-lg font-bold tracking-wide font-serif ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          Live Estimate Summary
        </h3>
        <span
          className={`text-xs px-2.5 py-1 rounded-full border font-medium ${
            isLight
              ? "bg-[#C5A059]/10 text-[#C5A059] border-[#C5A059]/30"
              : "bg-[#c9a858]/15 text-[#c9a858] border-[#c9a858]/30"
          }`}
        >
          Real-time
        </span>
      </div>

      {/* Itemized Cart Breakdown */}
      <div className="py-4 space-y-3 text-sm max-h-[280px] overflow-y-auto pr-1">
        {cart.length === 0 ? (
          <p className={`text-xs text-center py-6 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            No services selected yet. Click &apos;Select&apos; on any card.
          </p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className={`font-medium ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>{item.name}</p>
                <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>{item.detail}</p>
              </div>
              <span className={`font-semibold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
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
            ? "border-gray-200 text-gray-600"
            : "border-white/10 text-gray-300"
        }`}
      >
        <span>Estimated On-Site Labor</span>
        <span className={`font-mono font-bold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
          {estimatedLaborHours}
        </span>
      </div>

      {/* Promo Code Box */}
      <div className="py-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? "text-gray-400" : "text-gray-400"}`} />
            <input
              type="text"
              value={""}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Promo Code"
              className={`w-full rounded-lg pl-9 pr-3 py-2 text-sm focus:outline-none transition-colors ${
                isLight
                  ? "bg-[#F8F9FA] border border-[#C7D1D9] text-[#1B2E4B] placeholder-gray-400 focus:border-[#C5A059]"
                  : "bg-[#0B132B] border border-white/10 text-white placeholder-gray-500 focus:border-[#c9a858]"
              }`}
            />
          </div>
          <button
            onClick={() => setDiscountApplied(true)}
            className={`px-4 py-2 font-semibold text-sm rounded-lg transition-colors ${
              isLight
                ? "bg-[#C5A059] text-white hover:bg-[#b08e4d]"
                : "bg-[#c9a858] text-[#121e2d] hover:bg-[#b59549] font-bold"
            }`}
          >
            Apply
          </button>
        </div>
      </div>

      {/* Totals Summary */}
      <div className={`space-y-2 pt-2 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
        <div className={`flex justify-between text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className={`flex justify-between text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          <span>Estimated Taxes (10% VAT)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div
          className={`flex justify-between text-base font-bold pt-2 border-t ${
            isLight
              ? "border-gray-200 text-[#1B2E4B]"
              : "border-white/10 text-white"
          }`}
        >
          <span>Total Service Amount</span>
          <span className={isLight ? "text-[#C5A059]" : "text-[#c9a858]"}>${total.toFixed(2)}</span>
        </div>
        <p className={`text-[10px] text-right ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Inclusive of chemical supplies
        </p>
      </div>
    </div>
  );
}