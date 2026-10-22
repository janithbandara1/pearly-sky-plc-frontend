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
}

export default function Equipments({
  supplySource,
  onSupplySourceChange,
  items = [],
  itemQuantities = {},
  selectedItemIds = new Set(),
  onQuantityChange,
  propertySizeSqm,
}: EquipmentsProps) {
  const { translate } = useLanguage();
  const { symbol } = useCurrency();

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
    if (s.includes("bio") || s.includes("solvent"))
      return <FlaskConical className="w-5 h-5 text-[#34D399]" />;
    if (s.includes("mop"))
      return <Paintbrush className="w-5 h-5 text-[#34D399]" />;
    if (s.includes("material") || s.includes("kit") || s.includes("cotton"))
      return <Scroll className="w-5 h-5 text-[#34D399]" />;
    if (s.includes("vacuum") || s.includes("vac"))
      return <Wind className="w-5 h-5 text-[#34D399]" />;
    return <Package className="w-5 h-5 text-[#34D399]" />;
  };

  return (
    <div className="w-full bg-[#030712] border border-[#111927] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 font-sans text-slate-100 shadow-2xl">
      {/* Top Header & Toggle Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5 sm:mb-6">
        <div>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#34D399] uppercase">
            STEP 5 OF 6
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mt-1 tracking-wide font-normal">
            Eco-Solvents & Equipment Protocol
          </h2>
        </div>

        {/* Toggle Pills: BY CLIENT vs BY COMPANY */}
        <div className="inline-flex items-center p-1 bg-[#0A0F1D] border border-[#172238] rounded-xl sm:rounded-2xl shrink-0 w-full sm:w-auto justify-center">
          <button
            type="button"
            onClick={() => onSupplySourceChange("customer")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isClient
                ? "bg-[#E5C365] text-[#0A0D08] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {translate("equipByClient")}
          </button>
          <button
            type="button"
            onClick={() => onSupplySourceChange("company")}
            className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              isCompany
                ? "bg-[#E5C365] text-[#0A0D08] shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            {translate("equipByCompany")}
          </button>
        </div>
      </div>

      <div className="border-t border-[#111927] pt-4 sm:pt-6">
        <p className="text-xs sm:text-sm font-sans text-[#7082A0] mb-6 sm:mb-8 leading-relaxed max-w-4xl">
          {translate("curated_engagement_default")}
        </p>

        {/* BY CLIENT STATE DISPLAY */}
        {isClient && (
          <div className="w-full bg-[#0B101C] border border-[#172238] rounded-2xl p-6 sm:p-14 flex flex-col items-center justify-center text-center">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#1A253B]/50 flex items-center justify-center mb-3 sm:mb-4">
              <Package className="w-5 h-5 sm:w-6 sm:h-6 text-[#E5C365]" />
            </div>
            <p className="text-xs sm:text-base font-sans text-slate-300 max-w-md leading-relaxed font-light">
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
                  className={`relative flex flex-row items-center justify-between p-4 sm:p-6 bg-[#0B101C] border rounded-xl sm:rounded-2xl transition-all duration-200 gap-3 ${
                    qty > 0
                      ? "border-[#E5C365] bg-[#111827]/40 shadow-[0_0_15px_rgba(229,195,101,0.08)]"
                      : "border-[#172238] hover:border-slate-700"
                  }`}
                >
                  {/* Left Side: Icon & Details */}
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#081F1A] border border-[#113C32] flex items-center justify-center shrink-0 mt-0.5">
                      {getItemIcon(item.sku || meta.displayName)}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <h4 className="text-xs sm:text-base font-bold text-white tracking-wide leading-snug">
                        {translate(meta.displayName as TranslationKey)}
                        <span className="text-slate-400 font-normal ml-1">
                          ({translate(meta.subtitle as TranslationKey)})
                        </span>
                      </h4>
                      
                      {/* Price Section Styled in Gold (#E5C365) */}
                      <p className="text-xs sm:text-sm font-sans font-semibold text-[#E5C365] mt-0.5 sm:mt-1">
                        {money(unitPrice * Math.max(qty, 1))}{" "}
                        <span className="text-[10px] sm:text-xs text-[#E5C365]/80 font-normal uppercase ml-1">
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
                        className="bg-[#E5C365] hover:bg-[#d6b357] active:scale-95 text-[#0A0D08] font-bold text-[11px] sm:text-xs px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl uppercase tracking-wider shadow-sm transition-all cursor-pointer whitespace-nowrap"
                      >
                        {translate("equipmentAddButton")}
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 bg-[#0A0F1D] border border-[#E5C365]/50 rounded-lg sm:rounded-xl p-1">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id)}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg text-slate-300 hover:text-white hover:bg-[#182338] transition-all cursor-pointer font-bold text-sm sm:text-base"
                        >
                          -
                        </button>
                        <span className="w-4 sm:w-5 text-center text-xs sm:text-sm font-bold text-white select-none">
                          {qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id)}
                          disabled={qty >= EQUIPMENT_MAX_QTY}
                          className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-md sm:rounded-lg text-slate-300 hover:text-white hover:bg-[#182338] disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer font-bold text-sm sm:text-base"
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