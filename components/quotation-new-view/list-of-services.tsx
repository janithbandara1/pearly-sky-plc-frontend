"use client";

import React, { useState } from "react";
import { Sparkles, Check, Star } from "lucide-react";

export interface EcoServiceItem {
  id: number;
  name: string;
  desc: string;
}

export interface EcoServicesSelectorProps {
  /** Array of available services */
  services?: serviceDetails[];
  /** Single selected service ID */
  selectedServiceId?: number;
  /** Callback when a service is selected */
  onSelectService?: (serviceId: number) => void;
  /** Multiple selected service IDs */
  selectedServiceIds?: number[];
  /** Callback when multiple service selection changes */
  onSelectServices?: (serviceIds: number[]) => void;
  /** Theme mode */
  theme?: "dark" | "light";
  /** Optional custom outer class */
  className?: string;
}

interface serviceDetails{
    id?:number;
    label?:string; 

}

const Defualt_servies: serviceDetails[] = [
    {
        id: 1,
        label: "Regular Home Cleaning"
    },
    {
        id: 2,
        label: "Essential Touch-Up Cleaning"
    },
    {
        id: 4,
        label: "Deep Cleaning"
    },
    {
        id: 5,
        label: "End of Tenancy Cleaning"
    },
    {
        id: 6,
        label: "Post-Construction & Renovation Cleaning"
    },
    {
        id: 3,
        label: "Same-Day Priority Cleaning"
    },
    {
        id: 15,
        label: "High-Security Property Care"
    },
    {
        id: 7,
        label: "Premium Rental Concierge Cleaning"
    },
    {
        id: 19,
        label: "Laundry Service"
    },
    {
        id: 10,
        label: "Carpet & Upholstery Cleaning"
    },
    {
        id: 13,
        label: "Pool Cleaning"
    },
    {
        id: 14,
        label: "Precision Pressure Washing"
    },
    {
        id: 8,
        label: "Commercial & Office Cleaning"
    },
    {
        id: 11,
        label: "Steam Cleaning"
    },
    {
        id: 12,
        label: "Post-Event Cleaning"
    },
    {
        id: 16,
        label: "Luxury Yacht Cleaning"
    },
    {
        id: 17,
        label: "Child Care Service"
    },
    {
        id: 18,
        label: "Elder Care Service"
    },
    {
        id: 20,
        label: "Move-In / Move-Out Transport Service"
    },
    {
        id: 9,
        label: "HealthGuard-Sanitization"
    }
]




export default function EcoServicesSelector({
  services = Defualt_servies,
  selectedServiceId: selectedServiceIdProp,
  onSelectService,
  selectedServiceIds,
  onSelectServices,
  theme = "dark",
  className = "",
}: EcoServicesSelectorProps) {
  const isLight = theme === "light";

  // Single choice selection state
  const [internalSelectedId, setInternalSelectedId] = useState<number>(1);
  const activeSelectedId =
    selectedServiceIdProp !== undefined
      ? selectedServiceIdProp
      : selectedServiceIds && selectedServiceIds.length > 0
      ? selectedServiceIds[0]
      : internalSelectedId;

  const handleSelect = (id: number) => {
    setInternalSelectedId(id);
    onSelectService?.(id);
    onSelectServices?.([id]);
  };

  return (
    <section
      className={`relative w-full rounded-3xl p-5 sm:p-7 border transition-colors duration-300 font-sans ${
        isLight
          ? "bg-white border-slate-200 shadow-xl"
          : "bg-[#090e17] border-[#e5c158]/20 shadow-2xl"
      } ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center space-x-3.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] shrink-0">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h2
            className={`font-serif text-2xl font-bold tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            4. Our Eco-Luxury Services
          </h2>
          <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Select your specialized white-glove treatment
          </p>
        </div>
      </div>

      {/* Services Grid: Mobile 1 column, sm: 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services?.map((s) => {
          const isSelected = activeSelectedId === s?.id;

          return (
            <div
              key={s?.id}
              onClick={() => handleSelect(s?.id || 1)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start space-x-3.5 select-none ${
                isSelected
                  ? "bg-[#e5c158]/10 border-[#e5c158] shadow-[0_0_15px_rgba(229,193,88,0.12)]"
                  : isLight
                  ? "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
                  : "bg-[#0d1320]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#121a2b]"
              }`}
            >
              {/* Radio Check Indicator */}
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#e5c158] border-[#e5c158] text-[#05080f]"
                    : isLight
                    ? "border-slate-300 bg-white"
                    : "border-slate-700 bg-[#121a2b]"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              {/* Title & Description */}
              <div>
                <span
                  className={`text-xs font-bold block ${
                    isSelected
                      ? "text-[#e5c158]"
                      : isLight
                      ? "text-slate-900"
                      : "text-slate-200"
                  }`}
                >
                  {s?.label}
                </span>
                <span
                  className={`text-[11px] block mt-1 leading-relaxed font-light ${
                    isLight ? "text-slate-500" : "text-slate-400"
                  }`}
                >
                   {/*  {s?.desc || "Premium eco-certified cleaning service"} */}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}