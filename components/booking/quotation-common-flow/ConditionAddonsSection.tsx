"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { ServiceConfig } from "@/lib/booking";

interface ConditionAddonsSectionProps {
  config: ServiceConfig;
  selectedCondition: string;
  setSelectedCondition: (id: string) => void;
  activeAddons: string[];
  toggleAddon: (id: string) => void;
  onProceedNext: () => void;
  onPrevStep: () => void;
  theme?: "dark" | "light";
}

export default function ConditionAddonsSection({
  config,
  selectedCondition,
  setSelectedCondition,
  activeAddons,
  toggleAddon,
  onProceedNext,
  onPrevStep,
  theme = "dark",
}: ConditionAddonsSectionProps) {
  const isLight = theme === "light";

  return (
    <div className={`space-y-8 transition-colors duration-300 ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
      <div>
        <h3
          className={`text-2xl font-bold tracking-wide mb-2 font-serif ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          {config.serviceStepDetails.step2Header}
        </h3>
        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          {config.serviceStepDetails.step2Description}
        </p>
      </div>

      {/* 1. Current Pool Water Condition */}
      <div className="space-y-4">
        <div className={`border-b pb-2 ${isLight ? "border-gray-200" : "border-white/10"}`}>
          <h4
            className={`text-sm font-bold tracking-wider uppercase ${
              isLight ? "text-[#1B2E4B]" : "text-[#c9a858]"
            }`}
          >
            1. Current Pool Water Condition
          </h4>
          <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            {config.conditionsLabel || "Select your current water state"}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {config.conditions?.map((cond) => {
            const isSelected = selectedCondition === cond.id;
            return (
              <div
                key={cond.id}
                onClick={() => setSelectedCondition(cond.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  isLight
                    ? isSelected
                      ? "bg-[#F5F5DC] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30"
                      : "bg-white border-[#C7D1D9] hover:border-[#C5A059]/40 shadow-sm"
                    : isSelected
                    ? "bg-[#16253b] border-[#c9a858] shadow-lg shadow-[#c9a858]/10 ring-1 ring-[#c9a858]/30"
                    : "bg-[#0e1826]/80 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="space-y-1 pr-2">
                  <h5 className={`font-semibold text-sm ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
                    {cond.title}
                  </h5>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {cond.desc}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-sm font-bold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
                    {cond.price === 0 ? "+$0" : `+$${cond.price}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Recommended Specialty Add-on Services */}
      <div className="space-y-4 pt-4">
        <div className={`border-b pb-2 ${isLight ? "border-gray-200" : "border-white/10"}`}>
          <h4
            className={`text-sm font-bold tracking-wider uppercase ${
              isLight ? "text-[#1B2E4B]" : "text-[#c9a858]"
            }`}
          >
            2. Recommended Specialty Add-on Services
          </h4>
          <p className={`text-xs ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            {config.addonsLabel || "Enhance your pool care package"}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {config.addons?.map((addon) => {
            const isChecked = activeAddons.includes(addon.id);
            return (
              <div
                key={addon.id}
                onClick={() => toggleAddon(addon.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                  isLight
                    ? isChecked
                      ? "bg-[#F5F5DC] border-[#C5A059] shadow-md ring-1 ring-[#C5A059]/30"
                      : "bg-white border-[#C7D1D9] hover:border-[#C5A059]/40 shadow-sm"
                    : isChecked
                    ? "bg-[#16253b] border-[#c9a858] shadow-lg shadow-[#c9a858]/10 ring-1 ring-[#c9a858]/30"
                    : "bg-[#0e1826]/80 border-white/10 hover:border-white/20"
                }`}
              >
                <div className="space-y-1 pr-4">
                  <h5 className={`font-semibold text-sm ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
                    {addon.title}
                  </h5>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-gray-600" : "text-gray-400"}`}>
                    {addon.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className={`text-sm font-bold mb-2 ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
                    +${addon.price}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                      isLight
                        ? isChecked
                          ? "bg-[#C5A059] border-[#C5A059] text-white"
                          : "border-[#C7D1D9]"
                        : isChecked
                        ? "bg-[#c9a858] border-[#c9a858] text-[#121e2d]"
                        : "border-white/20"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className={`w-4 h-4 ${isLight ? "text-white" : "text-[#121e2d]"}`} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-4 pt-4 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
        <button
          onClick={onPrevStep}
          className={`px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
            isLight
              ? "border-[#C7D1D9] text-[#1B2E4B] hover:bg-gray-100"
              : "border-white/20 text-white hover:bg-white/5"
          }`}
        >
          Back
        </button>
        <button
          onClick={onProceedNext}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
            isLight
              ? "bg-[#C5A059] text-white hover:bg-[#b08e4d] shadow-[#C5A059]/20"
              : "bg-gradient-to-r from-[#c9a858] to-[#e4cc8c] text-[#121e2d] shadow-[#c9a858]/20 hover:brightness-105"
          }`}
        >
          Proceed to Step 3
        </button>
      </div>
    </div>
  );
}