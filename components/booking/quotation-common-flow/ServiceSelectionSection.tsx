"use client";

import React, { useState, useMemo } from "react";
import { Search, Plus, Minus, Trash2, Waves } from "lucide-react";
import { CartItem, ServiceConfig } from "@/lib/booking";

interface ServiceSelectionSectionProps { 
  config: ServiceConfig;
  cart: CartItem[];
  theme?: "dark" | "light";
  onUpdateCart: (newCart: CartItem[]) => void;
  onProceedNext: () => void;
}

export default function ServiceSelectionSection({
  config,
  cart,
  theme = "dark",
  onUpdateCart,
  onProceedNext,
}: ServiceSelectionSectionProps) {
  const isLight = theme === "light";
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter catalog based on category and search term
  const filteredCatalog = useMemo(() => {
    return config?.catalog?.filter((item) => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [config.catalog, activeCategory, searchQuery]);

  const getCartQuantity = (id: string) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const totalSelectedCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);
 
  const handleQuantityChange = (item: NonNullable<ServiceConfig["catalog"]>[number], newQty: number) => {
    if (newQty <= 0) {
      onUpdateCart(cart.filter((c) => c.id !== item?.id));
    } else {
      const existingIndex = cart.findIndex((c) => c.id === item?.id);
      if (existingIndex > -1) {
        const updated = [...cart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          detail: `${newQty} ${item.unit}s × $${item.price}`,
        };
        onUpdateCart(updated);
      } else {
        onUpdateCart([
          ...cart,
          {
            id: item.id,
            name: item.title,
            detail: `${newQty} ${item.unit}s × $${item.price}`,
            quantity: newQty,
            unitPrice: item.price,
          },
        ]);
      }
    }
  };

  return (
    <div className={`space-y-6 transition-colors duration-300 
          ${isLight ? "text-[#1A2238]" : "text-white"}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Waves className={`w-5 h-5 ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`} />
            <h3
              className={`text-2xl font-bold tracking-wide font-serif ${
                isLight ? "text-[#1A2238]" : "text-white"
              }`}
            >
             {config.serviceStepDetails.step1Header}
            </h3>
          </div>
          <p className={`text-sm ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
            {config.serviceStepDetails.step1Description}
          </p>
        </div>

        {totalSelectedCount > 0 && (
          <div
            className={`text-center sm:self-auto px-2 w-[140px] py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isLight
                ? "bg-[#002F6D]/10 border-[#002F6D]/30 text-[#002F6D]"
                : "bg-[#152238] border-[#FFD766]/50 text-[#FFD766]"
            }`}
          >
            <p>{totalSelectedCount} {totalSelectedCount === 1 ? "Service" : "Services"} Selected</p>
          </div>
        )}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-col-reverse gap-4 items-center justify-between pb-2">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {config?.categories?.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  isLight
                    ? isActive
                      ? "bg-[#002F6D] text-white border-[#002F6D] shadow-sm shadow-[#002F6D]/20"
                      : "bg-white text-[#1A2238] border-[#D9DDE5] hover:bg-[#F7F5F0]"
                    : isActive
                    ? "bg-[#FFD766] text-[#002F6D] border-[#FFD766] shadow-md shadow-[#FFD766]/20 font-bold"
                    : "bg-[#152238] text-[#C3CDDC] border-[#718096]/60 hover:border-[#FFD766]/60"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-full ">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pool types, Jacuzzis, Saunas..."
            className={`w-full rounded-xl pl-9 pr-4 py-3 text-xs transition-colors duration-200 focus:outline-none ${
              isLight
                ? "bg-white border border-[#D9DDE5] text-[#1A2238] placeholder-gray-400 focus:border-[#002F6D]"
                : "bg-[#152238] border border-[#718096] text-white placeholder-gray-400 focus:border-[#FFD766]"
            }`}
          />
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCatalog?.map((item, index) => {
          const qty = getCartQuantity(item.id);
          const isSelected = qty > 0;

          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between relative ${
                isLight
                  ? isSelected
                    ? "bg-amber-50/50 border-2 border-[#D8B63F] shadow-sm"
                    : "bg-white border border-[#D9DDE5] hover:border-[#D8B63F] shadow-sm"
                  : isSelected
                  ? "bg-[#3A3423] border-2 border-[#FFD766] shadow-[0_0_12px_rgba(255,215,102,0.2)]"
                  : "bg-[#152238] border border-[#718096]/60 hover:border-[#FFD766]/50"
              }`}
            >
              <div>
                {/* Card Top Details */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        isLight
                          ? "bg-[#F7F5F0] text-[#002F6D] border-[#D9DDE5]"
                          : "bg-[#1B2A40] text-[#FFD766] border-[#FFD766]/30"
                      }`}
                    >
                      #{index + 1}
                    </span>
                    <span
                      className={`text-[10px] tracking-wider uppercase font-medium ${
                        isLight ? "text-[#687386]" : "text-[#C3CDDC]"
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${
                        isLight
                          ? "bg-[#002F6D]/10 text-[#002F6D] border-[#002F6D]/20"
                          : "bg-[#FFD766]/20 text-[#FFD766] border-[#FFD766]/40"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                <h4
                  className={`font-bold text-base mb-1 font-serif ${
                    isLight ? "text-[#1A2238]" : "text-white"
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`text-xs line-clamp-2 leading-relaxed mb-4 ${
                    isLight ? "text-[#687386]" : "text-[#C3CDDC]"
                  }`}
                >
                  {item.description}
                </p>
              </div>

              {/* Price & Interactive Counter / Select Button */}
              <div
                className={`flex items-center justify-between pt-3 border-t ${
                  isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"
                }`}
              >
                <div>
                  <span
                    className={`text-base font-extrabold ${
                      isLight ? "text-[#002F6D]" : "text-[#FFD766]"
                    }`}
                  >
                    ${item.price}
                  </span>
                  <span className={`text-xs ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                    {" "}
                    /{item.unit}
                  </span>
                </div>

                {isSelected ? (
                  <div
                    className={`flex items-center gap-2 px-2 py-1 rounded-xl border ${
                      isLight
                        ? "bg-white border-2 border-[#D8B63F]"
                        : "bg-[#1B2A40] border-2 border-[#FFD766]"
                    }`}
                  >
                    <button
                      onClick={() => handleQuantityChange(item, qty - 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                        isLight
                          ? "bg-[#F7F5F0] hover:bg-red-50 text-gray-700 hover:text-red-600"
                          : "bg-[#152238] hover:bg-red-950/40 text-gray-300 hover:text-red-400"
                      }`}
                      title="Decrease"
                    >
                      {qty === 1 ? <Trash2 className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                    </button>
                    <span
                      className={`w-6 text-center text-xs font-bold font-mono ${
                        isLight ? "text-[#1A2238]" : "text-white"
                      }`}
                    >
                      {qty}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item, qty + 1)}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors font-bold cursor-pointer ${
                        isLight
                          ? "bg-[#002F6D] text-white hover:bg-[#002F6D]/90"
                          : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90"
                      }`}
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleQuantityChange(item, 1)}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer ${
                      isLight
                        ? "bg-[#F7F5F0] hover:bg-[#002F6D] hover:text-white text-[#1A2238] border border-[#D9DDE5]"
                        : "bg-[#1B2A40] hover:bg-[#FFD766] hover:text-[#002F6D] text-[#C3CDDC] border border-[#718096]"
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Select
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Proceed Button */}
      <div className="pt-6 flex justify-end">
        <button
          onClick={onProceedNext}
          className={`px-8 py-3.5 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer ${
            isLight
              ? "bg-[#002F6D] hover:bg-[#002F6D]/90 text-white shadow-[#002F6D]/20"
              : "bg-[#FFD766] text-[#002F6D] hover:bg-[#FFD766]/90 shadow-[#FFD766]/20 font-bold"
          }`}
        >
          Proceed to Step 2
        </button>
      </div>
    </div>
  );
}