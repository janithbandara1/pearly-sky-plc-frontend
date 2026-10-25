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
  serviceSlug?:string;
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
  serviceSlug,
}: ConditionAddonsSectionProps) {
  const isLight = theme === "light";

  const isCarpetService = serviceSlug==="carpet-upholstery-cleaning";

  return (
    <div className={`space-y-8 transition-colors duration-300 ${isLight ? "text-[#1A2238]" : "text-white"}`}>
      <div className={`space-y-2 border-b py-3 ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/40"}`}>
        <h3
          className={`text-2xl font-bold tracking-wide mb-2 font-serif ${
            isLight ? "text-[#1A2238]" : "text-white"
          }`}
        >
          {config.serviceStepDetails.step2Header}
        </h3>
        <p className={`text-sm ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
          {config.serviceStepDetails.step2Description}
        </p>
      </div>

      {/**Carpet cleaning options Selecting */}
      {isCarpetService && config.propertyOptions?.propertyType && (
        <div className="flex justify-between max-w-full gap-4">
          
          {/**property categories */}
          <div className="flex flex-col gap-2 max-w-full">
            <label htmlFor="propertyType" className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-[#FFD766]"}`}>
             PROPERTY TYPE:
            </label>
            <select
              id="propertyType"
              className={`p-2.5 w-full rounded-lg border text-sm transition-colors focus:outline-none ${
                isLight
                  ? "bg-white border-[#D9DDE5] text-[#1A2238] focus:border-[#002F6D]"
                  : "bg-[#152238] border-[#718096] text-white focus:border-[#FFD766]"
              }`}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">-- Select --</option>
              {config.propertyOptions?.propertyType.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/**PARKING ACCESS */}
          <div className="flex flex-col gap-2 max-w-full">
            <label htmlFor="parkingAccess" className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-[#FFD766]"}`}>
             PARKING ACCESS:
            </label>
            <select
              id="parkingAccess"
              className={`p-2.5 w-full rounded-lg border text-sm transition-colors focus:outline-none ${
                isLight
                  ? "bg-white border-[#D9DDE5] text-[#1A2238] focus:border-[#002F6D]"
                  : "bg-[#152238] border-[#718096] text-white focus:border-[#FFD766]"
              }`}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">-- Select --</option>
              {config.propertyOptions?.parkingAccess.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          {/**FLOOR ACCESS */}
          <div className="flex flex-col gap-2 max-w-full">
            <label htmlFor="floorAccess" className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-[#FFD766]"}`}>
             FLOOR ACCESS:
            </label>
            <select
              id="floorAccess"
              className={`p-2.5 w-full rounded-lg border text-sm transition-colors focus:outline-none ${
                isLight
                  ? "bg-white border-[#D9DDE5] text-[#1A2238] focus:border-[#002F6D]"
                  : "bg-[#152238] border-[#718096] text-white focus:border-[#FFD766]"
              }`}
              onChange={(e) => setSelectedCondition(e.target.value)}
            >
              <option value="">-- Select --</option>
              {config.propertyOptions?.floorAccess.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
        </div>
      )}

      {/* Conditions */}
      {!isCarpetService && (<div className="space-y-4">
        <div className={`border-b pb-2 ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
          <h4
            className={`text-sm font-bold tracking-wider uppercase ${
              isLight ? "text-[#002F6D]" : "text-[#FFD766]"
            }`}
          >
            1. Current Pool Water Condition
          </h4>
          <p className={`text-xs ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
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
                      ? "bg-amber-50/50 border-2 border-[#D8B63F] shadow-sm"
                      : "bg-white border border-[#D9DDE5] hover:border-[#D8B63F] shadow-sm"
                    : isSelected
                    ? "bg-[#3A3423] border-2 border-[#FFD766] shadow-[0_0_12px_rgba(255,215,102,0.2)]"
                    : "bg-[#152238] border border-[#718096]/60 hover:border-[#FFD766]/50"
                }`}
              >
                <div className="space-y-1 pr-2">
                  <h5 className={`font-semibold text-sm ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                    {cond.title}
                  </h5>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                    {cond.desc}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-sm font-bold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
                    {cond.price === 0 ? "+$0" : `+$${cond.price}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>)}

      {/* 2. Recommended Specialty Add-on Services */}
      <div className="space-y-4 pt-4">
        <div className={`border-b pb-2 ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
          <h4
            className={`text-sm font-bold tracking-wider uppercase ${
              isLight ? "text-[#002F6D]" : "text-[#FFD766]"
            }`}
          >
            {isCarpetService ? config.serviceStepDetails.step2title1 : "2. Recommended Specialty Add-on Services"}
          </h4>
          <p className={`text-xs ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
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
                      ? "bg-amber-50/50 border-2 border-[#D8B63F] shadow-sm"
                      : "bg-white border border-[#D9DDE5] hover:border-[#D8B63F] shadow-sm"
                    : isChecked
                    ? "bg-[#3A3423] border-2 border-[#FFD766] shadow-[0_0_12px_rgba(255,215,102,0.2)]"
                    : "bg-[#152238] border border-[#718096]/60 hover:border-[#FFD766]/50"
                }`}
              >
                <div className="space-y-1 pr-4">
                  <h5 className={`font-semibold text-sm ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                    {addon.title}
                  </h5>
                  <p className={`text-xs leading-relaxed ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                    {addon.desc}
                  </p>
                </div>
                <div className="flex flex-col items-end shrink-0">
                  <span className={`text-sm font-bold mb-2 ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
                    +${addon.price}
                  </span>
                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-colors ${
                      isLight
                        ? isChecked
                          ? "bg-[#002F6D] border-[#002F6D] text-white"
                          : "border-[#D9DDE5] bg-white"
                        : isChecked
                        ? "bg-[#FFD766] border-[#FFD766] text-[#002F6D]"
                        : "border-[#718096] bg-[#152238]"
                    }`}
                  >
                    {isChecked && <CheckCircle2 className={`w-4 h-4 ${isLight ? "text-white" : "text-[#002F6D]"}`} />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isCarpetService && (
        <div className="space-y-2 pt-4">
          <label htmlFor="specialInstructions" className={`text-xs font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-[#FFD766]"}`}>
            {config.serviceStepDetails.step2title2}
          </label>
          <textarea
            id="specialInstructions"
            placeholder="Enter any specific instructions or details about the carpet cleaning needs..."
            className={`w-full p-3 rounded-lg border text-sm transition-colors focus:outline-none ${
              isLight
                ? "bg-white border-[#D9DDE5] text-[#1A2238] focus:border-[#002F6D]"
                : "bg-[#152238] border-[#718096] text-white focus:border-[#FFD766]"
            }`}
          />
        </div>
      )}

      {/* Action Buttons */}
      <div className={`flex gap-4 pt-4 border-t ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
        <button
          onClick={onPrevStep}
          className={`px-6 py-3 rounded-xl border font-semibold text-sm transition-colors cursor-pointer ${
            isLight
              ? "border-[#D9DDE5] text-[#1A2238] hover:bg-[#F7F5F0]"
              : "border-[#718096] text-[#C3CDDC] hover:bg-[#152238]"
          }`}
        >
          Back
        </button>
        <button
          onClick={onProceedNext}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer ${
            isLight
              ? "bg-[#002F6D] text-white hover:bg-[#002F6D]/90 shadow-[#002F6D]/20"
              : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90 shadow-[#FFD766]/20 font-bold"
          }`}
        >
          Proceed to Step 3
        </button>
      </div>
    </div>
  );
}