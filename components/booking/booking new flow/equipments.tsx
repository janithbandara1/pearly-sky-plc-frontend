"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import { SupplySource } from "../equipment-section";
import { FlaskConical, Paintbrush, Scroll, Wind, Package } from "lucide-react";
import { CatalogItem } from "@/lib/catalog-api";
import {
  FALLBACK_EQUIPMENT_ITEMS,
  ITEM_DETAILS_MAP,
  ItemDetailMeta,
} from "../common-flows-propertis-and-equipments/common-equipment-flow-section";
import {
  calculateEquipmentItemPrice,
  EQUIPMENT_ITEM_SKU,
  EQUIPMENT_MAX_QTY,
} from "@/lib/equipment-pricing";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useCurrency } from "@/lib/currency-context";

interface EquipmentsProps {
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
  items?: CatalogItem[];
  itemQuantities?: Record<number, number>;
  selectedItemIds?: Set<number>;
  onQuantityChange?: (id: number, qty: number) => void;
  propertySizeSqm: number;
  theme?: string;
}

export default function Equipments({
  supplySource,
  onSupplySourceChange,
  items = [],
  itemQuantities = {},
  selectedItemIds = new Set(),
  onQuantityChange,
  propertySizeSqm,
  theme: themeProp = "dark",
}: EquipmentsProps) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();
  const isLight = themeProp === "light";

  const money = (n: number | null | undefined) => {
    const val = n != null && !Number.isNaN(Number(n)) ? Number(n) : 0;
    return `${symbol}${val.toFixed(2)}`;
  };

  const isCompany = supplySource === "company";
  const isClient = supplySource === "customer";

  // Display items fallback if empty
  const displayedItems = items.length > 0 ? items : FALLBACK_EQUIPMENT_ITEMS;

  const quantityOf = (id: number) =>
    itemQuantities[id] ?? (selectedItemIds.has(id) ? 1 : 0);

  const handleAdd = (id: number) => onQuantityChange?.(id, 1);

  const handleIncrement = (id: number) =>
    onQuantityChange?.(id, Math.min(EQUIPMENT_MAX_QTY, quantityOf(id) + 1));

  const handleDecrement = (id: number) =>
    onQuantityChange?.(id, Math.max(0, quantityOf(id) - 1));

  const getItemMeta = (item: CatalogItem): ItemDetailMeta => {
    if (item.sku && ITEM_DETAILS_MAP[item.sku]) {
      return ITEM_DETAILS_MAP[item.sku];
    }
    const nameLower = item.name.toLowerCase();
    if (nameLower.includes("bio") || nameLower.includes("solvent")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.BIO_SOLVENT];
    }
    if (nameLower.includes("mop")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.MOP];
    }
    if (nameLower.includes("material") || nameLower.includes("kit")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.MATERIAL_KIT];
    }
    if (nameLower.includes("vacuum") || nameLower.includes("vac")) {
      return ITEM_DETAILS_MAP[EQUIPMENT_ITEM_SKU.VACUUM];
    }
    return {
      displayName: item.name,
      subtitle: "Professional Grade",
      description: "Standard industrial sanitizing and cleaning equipment.",
      defaultPrice: item.price ? Number(item.price) : 10.0,
    };
  };

  const getItemIcon = (skuOrName: string) => {
    const s = skuOrName.toLowerCase();
    const iconColor = isLight ? "text-[#059669]" : "text-[#34D399]";
    if (s.includes("bio") || s.includes("solvent"))
      return <FlaskConical className={`w-5 h-5 ${iconColor}`} />;
    if (s.includes("mop"))
      return <Paintbrush className={`w-5 h-5 ${iconColor}`} />;
    if (s.includes("material") || s.includes("kit") || s.includes("cotton"))
      return <Scroll className={`w-5 h-5 ${iconColor}`} />;
    if (s.includes("vacuum") || s.includes("vac"))
      return <Wind className={`w-5 h-5 ${iconColor}`} />;
    return <Package className={`w-5 h-5 ${iconColor}`} />;
  };

  return (
    <div
      id="eco-protocol"
      className={`w-full rounded-2xl sm:rounded-3xl p-4 md:p-5 font-sans shadow-2xl border transition-all duration-300 ${
        isLight
          ? "bg-white border-[#D9DDE5] text-[#1A2238]"
          : "bg-[#1B2A40]/80 backdrop-blur-xl border-[#718096]/30 text-white"
      }`}
    >
      {/* Top Header & Toggle Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <span
            className={`text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
              isLight ? "text-[#002F6D]" : "text-[#FFD766]"
            }`}
          >
            STEP 5 OF 6
          </span>
          <h2
            className={`text-xl md:text-2xl font-serif mt-1 tracking-wide font-normal ${
              isLight ? "text-[#1A2238]" : "text-white"
            }`}
          >
            Eco-Solvents & Equipment Protocol
          </h2>
        </div>

        {/* Toggle Pills: BY CLIENT vs BY COMPANY */}
        <div
          className={`inline-flex items-center p-1 rounded-xl sm:rounded-2xl shrink-0 w-full sm:w-auto justify-center border transition-colors ${
            isLight
              ? "bg-[#F7F5F0] border-[#D9DDE5]"
              : "bg-[#111C2E] border-[#718096]/40"
          }`}
        >
          <button
            type="button"
            onClick={() => onSupplySourceChange("customer")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isClient
                ? isLight
                  ? "bg-[#002F6D] text-white shadow-xs font-bold"
                  : "bg-[#FFD766] text-[#002F6D] font-bold shadow-xs"
                : isLight
                ? "text-[#687386] hover:text-[#1A2238]"
                : "text-[#C3CDDC] hover:text-white"
            }`}
          >
            {translate("equipByClient")}
          </button>
          <button
            type="button"
            onClick={() => onSupplySourceChange("company")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isCompany
                ? isLight
                  ? "bg-[#002F6D] text-white shadow-xs font-bold"
                  : "bg-[#FFD766] text-[#002F6D] font-bold shadow-xs"
                : isLight
                ? "text-[#687386] hover:text-[#1A2238]"
                : "text-[#C3CDDC] hover:text-white"
            }`}
          >
            {translate("equipByCompany")}
          </button>
        </div>
      </div>

      <div className={`border-t pt-4 sm:pt-6 ${isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"}`}>
        <p
          className={`text-xs sm:text-sm font-sans mb-6 sm:mb-8 leading-relaxed max-w-4xl ${
            isLight ? "text-[#687386]" : "text-[#C3CDDC]"
          }`}
        >
          When provided by Pearly Sky, all supplies are hospital-grade, non-toxic, allergen-free
          botanical concentrates brought in sealed, sanitized canisters.
        </p>

        {/* BY CLIENT STATE DISPLAY */}
        {isClient && (
          <div
            className={`w-full rounded-2xl p-6 sm:p-14 flex flex-col items-center justify-center text-center border transition-all ${
              isLight
                ? "bg-[#F7F5F0] border-[#D9DDE5]"
                : "bg-[#152238] border-[#718096]/30"
            }`}
          >
            <div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 sm:mb-4 border ${
                isLight
                  ? "bg-white border-[#D9DDE5] text-[#002F6D]"
                  : "bg-[#111C2E] border-[#718096]/40 text-[#FFD766]"
              }`}
            >
              <Package className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <p
              className={`text-xs sm:text-base font-sans max-w-md leading-relaxed font-light ${
                isLight ? "text-[#1A2238]" : "text-[#C3CDDC]"
              }`}
            >
              You have chosen to provide your own solvents & equipment. Staff will use non-abrasive tools provided on-site.
            </p>
          </div>
        )}

        {/* BY COMPANY EQUIPMENT GRID */}
        {isCompany && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
            {displayedItems.map((item) => {
              const meta = getItemMeta(item);
              const qty = quantityOf(item.id);

              const unitPrice =
                item.price != null
                  ? calculateEquipmentItemPrice(item, propertySizeSqm)
                  : meta.defaultPrice;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-row items-center justify-between p-3 border rounded-xl sm:rounded-2xl transition-all duration-200 gap-3 ${
                    qty > 0
                      ? isLight
                        ? "bg-[#F7F5F0] border-2 border-[#D8B63F] shadow-[0_4px_16px_rgba(216,182,63,0.2)] ring-1 ring-[#D8B63F]/30"
                        : "bg-[#1B2A40] border-2 border-[#FFD766] shadow-[0_0_15px_rgba(255,215,102,0.15)] ring-1 ring-[#FFD766]/30"
                      : isLight
                      ? "bg-white border border-[#D9DDE5] hover:border-[#D8B63F] hover:bg-[#F7F5F0]"
                      : "bg-[#152238] border border-[#718096]/30 hover:border-[#FFD766]/50 hover:bg-[#1B2A40]"
                  }`}
                >
                  {/* Left Side: Icon & Details */}
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${
                        isLight
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-emerald-950/40 border-emerald-500/30 text-emerald-400"
                      }`}
                    >
                      {getItemIcon(item.sku || meta.displayName)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4
                        className={`text-xs md:text-base font-bold tracking-wide leading-snug ${
                          isLight ? "text-[#1A2238]" : "text-white"
                        }`}
                      >
                        {translate(meta.displayName as TranslationKey)}
                      </h4>
                      <span className={`font-normal md:text-[13px] ml-1 ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                        ({translate(meta.subtitle as TranslationKey)})
                      </span>
                      
                      {/* Price Section */}
                      <p
                        className={`text-xs sm:text-sm font-sans font-semibold mt-0.5 sm:mt-1 ${
                          isLight ? "text-[#002F6D]" : "text-[#FFD766]"
                        }`}
                      >
                        {money(unitPrice * Math.max(qty, 1))}{" "}
                        <span
                          className={`text-[10px] sm:text-xs font-normal uppercase ml-1 ${
                            isLight ? "text-[#687386]" : "text-[#C3CDDC]"
                          }`}
                        >
                          {qty > 1 ? `(${money(unitPrice)} × ${qty})` : translate("PERUNIT")}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Right Side: ADD button when qty === 0, Stepper when qty > 0 */}
                  <div className="shrink-0">
                    {qty === 0 ? (
                      <button
                        type="button"
                        onClick={() => handleAdd(item.id)}
                        className={`font-bold text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl uppercase tracking-wider shadow-xs transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
                          isLight
                            ? "bg-[#002F6D] hover:bg-[#002F6D]/90 text-white shadow-xs font-bold"
                            : "bg-[#FFD766] hover:bg-[#FFD766]/90 text-[#002F6D] font-bold shadow-xs"
                        }`}
                      >
                        {translate("equipmentAddButton")}
                      </button>
                    ) : (
                      <div
                        className={`flex items-center gap-2 sm:gap-3 rounded-lg sm:rounded-xl p-1 border transition-colors ${
                          isLight
                            ? "bg-[#F7F5F0] border-[#D9DDE5]"
                            : "bg-[#111C2E] border-[#718096]/40"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg font-bold text-sm sm:text-base transition-all cursor-pointer ${
                            isLight
                              ? "text-[#1A2238] hover:bg-white"
                              : "text-[#C3CDDC] hover:text-white hover:bg-[#1B2A40]"
                          }`}
                        >
                          -
                        </button>
                        <span
                          className={`w-4 sm:w-5 text-center text-xs sm:text-sm font-bold select-none ${
                            isLight ? "text-[#1A2238]" : "text-white"
                          }`}
                        >
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          disabled={qty >= EQUIPMENT_MAX_QTY}
                          className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg font-bold text-sm sm:text-base transition-all cursor-pointer ${
                            isLight
                              ? "text-[#1A2238] hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent"
                              : "text-[#C3CDDC] hover:text-white hover:bg-[#1B2A40] disabled:opacity-30 disabled:hover:bg-transparent"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}