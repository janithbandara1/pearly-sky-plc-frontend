"use client";

import React, { useState } from "react";
import { Building2, CheckCircle2 } from "lucide-react";
import { QUOTE_PROPERTY_CATEGORIES } from "./propertyList";

export interface PropertyCategoryItem {
  id: string;
  name: string;
  items: string[];
}

export interface PropertyTypeSelectorProps {
  categories?: PropertyCategoryItem[];
  selectedProperty?: string;
  onSelectProperty?: (propertyType: string) => void;
  theme?: "dark" | "light";
  className?: string;
}



export default function QuotePropertyTypeSelector({
  categories = QUOTE_PROPERTY_CATEGORIES,
  selectedProperty: selectedPropertyProp, 
  onSelectProperty,
  theme = "dark",
  className = "",
}: PropertyTypeSelectorProps) {
  const isLight = theme === "light";
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [internalSelectedProperty, setInternalSelectedProperty] = useState("Penthouse");

  const activeProperty = selectedPropertyProp ?? internalSelectedProperty;
  const currentCategory = categories[activeCategoryIndex] || categories[0];

  const handlePropertySelect = (item: string) => {
    setInternalSelectedProperty(item);
    onSelectProperty?.(item);
  };

  return (
    <section
      className={`relative w-full rounded-3xl p-5 sm:p-7 border transition-colors duration-300 font-sans ${
        isLight
          ? "bg-white border-slate-200 shadow-xl"
          : "bg-[#090e17] border-[#e5c158]/20 shadow-2xl"
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center space-x-3.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] shrink-0">
          <Building2 className="w-5 h-5" />
        </div>
        <div>
          <h2
            className={`font-serif text-2xl font-bold tracking-tight ${
              isLight ? "text-[#002F6D]" : "text-white"
            }`}
          >
            1. Property Type
          </h2>
          <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Select your space category from our specialized environments
          </p>
        </div>
      </div>

      {/* Category Tabs Header */}
      <div className="relative mb-6">
        

        <div
          className={`flex items-center space-x-2 overflow-x-auto pt-1 pb-2.5 mb-2 scroll-smooth [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#FFD766] hover:[&::-webkit-scrollbar-thumb]:bg-[#e5c158] ${
            isLight
              ? "[&::-webkit-scrollbar-track]:bg-slate-200/60"
              : "[&::-webkit-scrollbar-track]:bg-slate-800/60"
          }`}
          style={{
            scrollbarColor: isLight
              ? "#FFD766 rgba(226, 232, 240, 0.6)"
              : "#FFD766 rgba(30, 41, 59, 0.6)",
            scrollbarWidth: "thin",
          }}
        >
          {categories.map((cat, idx) => {
            const isActive = idx === activeCategoryIndex;
            return (
              <button
                key={cat.id || idx}
                type="button"
                onClick={() => setActiveCategoryIndex(idx)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#e5c158] text-[#05080f] font-bold shadow-md scale-105"
                    : isLight
                    ? "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
                    : "bg-[#0d1320] text-slate-400 hover:text-white hover:bg-[#121a2b]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
        {/* Decorative Divider */}
        <div
          className={`w-full h-[1px] ${
            isLight ? "bg-slate-200" : "bg-slate-800/80"
          }`}
        />
      </div>

      {/* Property Type Grid: Mobile 1 column, Tablet 2 columns, Desktop 3 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {currentCategory?.items.map((item) => {
          const isSelected = activeProperty === item;

          return (
            <button
              key={item}
              type="button"
              onClick={() => handlePropertySelect(item)}
              className={`p-3.5 rounded-2xl text-left text-xs transition-all duration-200 flex items-center space-x-2.5 cursor-pointer border ${
                isSelected
                  ? "bg-[#e5c158]/10 border-[#e5c158] text-[#e5c158] font-bold shadow-[0_0_15px_rgba(229,193,88,0.15)]"
                  : isLight
                  ? "bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-100"
                  : "bg-[#0d1320]/80 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-[#121a2b]"
              }`}
            >
              {isSelected ? (
                <CheckCircle2 className="w-4 h-4 text-[#e5c158] shrink-0" />
              ) : (
                <Building2
                  className={`w-4 h-4 shrink-0 ${
                    isLight ? "text-slate-400" : "text-slate-600"
                  }`}
                />
              )}
              <span className="truncate">{item}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}