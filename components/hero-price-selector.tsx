"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useEffect, useRef, useState } from "react";
import type { ComponentType } from "react";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";

export interface HeroPriceOption {
  country: string;
  price: number | null;
  currency: string;
}

interface HeroPriceSelectorProps {
  activePrices: HeroPriceOption[];
  selectedCountryCode: string;
  selectedData: HeroPriceOption;
  selectedFlag: ComponentType<{ className?: string }>;
  getFlagComponent: (country: string) => ComponentType<{ className?: string }>;
  onCountryChange: (country: string) => void;
  /** "Hour Per Cleaner" by default — pass "hourPerProfessional" for Child/Elder Care. */
  unitLabelKey?: TranslationKey;
}

function PriceLabel({ selectedData, className }: { selectedData: HeroPriceOption; className: string }) {
  return (
    <p className={className}>
      {selectedData.price !== null
        ? `${selectedData.currency} ${selectedData.price.toFixed(2)}`
        : "Contact us"}
    </p>
  );
}

function CountryOptions({
  activePrices,
  selectedCountryCode,
  getFlagComponent,
  onCountryChange,
}: Pick<HeroPriceSelectorProps, "activePrices" | "selectedCountryCode" | "getFlagComponent" | "onCountryChange">) {
  return (
    <ul className="max-h-60 overflow-y-auto p-1 focus:outline-none scrollbar-thin">
      {activePrices.map((item) => {
        const ItemFlag = getFlagComponent(item.country);
        const isSelected = item.country.toUpperCase() === selectedCountryCode.toUpperCase();

        return (
          <li
            key={item.country}
            onClick={() => onCountryChange(item.country)}
            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-150 ${isSelected
              ? "bg-[rgb(169,139,75)]/20 font-bold text-[rgb(169,139,75)]"
              : "text-white hover:bg-[rgb(28,45,65)]"
              }`}
          >
            <ItemFlag className="h-3.5 w-5 flex-shrink-0 object-cover" />
            <span className="truncate">{item.country.toUpperCase()} - {item.currency}</span>
          </li>
        );
      })}
    </ul>
  );
}

function CountryPicker({
  activePrices,
  selectedCountryCode,
  selectedFlag: SelectedFlag,
  getFlagComponent,
  onCountryChange,
  placement,
}: HeroPriceSelectorProps & { placement: "desktop" | "mobile" }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className={`inline-flex items-center gap-2 rounded border-2 border-dashed border-[#A98B4B] bg-transparent p-1 px-2.5 text-xs font-semibold text-[rgb(169,139,75)] focus:outline-none ${placement === "mobile" ? "max-[541px]:border-white" : ""}`}
      >
        <SelectedFlag className="h-3.5 w-5 object-cover" />
        <span className="ml-1 text-[10px] text-[rgb(169,139,75)]">▾</span>
      </button>

      {isOpen && (
        <div className="absolute hidden md:block right-0 bottom-full z-50 mb-2 w-56 overflow-hidden rounded-l-lg border border-[rgb(169,139,75)]/40 bg-[rgb(18,30,45)] shadow-xl">
          <CountryOptions
            activePrices={activePrices}
            selectedCountryCode={selectedCountryCode}
            getFlagComponent={getFlagComponent}
            onCountryChange={(country) => {
              onCountryChange(country);
              setIsOpen(false);
            }}
          />
        </div>
      )}
      {isOpen && (
        <div className="absolute block md:hidden -right-[150px] -top-[25px] max-h-[200px] z-50 mb-2 w-35 overflow-hidden rounded-l-lg border border-[rgb(169,139,75)]/40 bg-[rgb(18,30,45)] shadow-xl">
          <CountryOptions
            activePrices={activePrices}
            selectedCountryCode={selectedCountryCode}
            getFlagComponent={getFlagComponent}
            onCountryChange={(country) => {
              onCountryChange(country);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

export function HeroPriceSelector({
  activePrices,
  selectedCountryCode,
  selectedData,
  selectedFlag,
  getFlagComponent,
  onCountryChange,
  unitLabelKey = "hourPerCleaner",
}: HeroPriceSelectorProps) {
  const {translate} =useLanguage();
  return (
    <>
      <div className="mt-4 hidden flex-col items-center justify-start gap-2 md:flex sm:flex-row">
        <PriceLabel
          selectedData={selectedData}
          className="text-medium font-semibold text-[#A98B4B] sm:text-2xl"
        />
        <div className="flex gap-2">
          <CountryPicker
            activePrices={activePrices}
            selectedCountryCode={selectedCountryCode}
            selectedData={selectedData}
            selectedFlag={selectedFlag}
            getFlagComponent={getFlagComponent}
            onCountryChange={onCountryChange}
            placement="desktop"
          />
          <p className="m-0 font-[Poppins] pl-2 text-base font-extrabold leading-[1.5] text-[rgb(169,139,75)] [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
            {translate(unitLabelKey)}
          </p>
        </div>
      </div>

      <div className="absolute top-20 z-14 my-4 flex w-[320px] flex-row items-center gap-1 rounded-lg bg-[rgb(18,30,45)] px-2 py-4 md:hidden">
        <PriceLabel
          selectedData={selectedData}
          className="w-[40%] text-[0.65rem] font-semibold text-[#A98B4B] max-[541px]:text-base max-[541px]:text-white"
        />
        <div className="flex w-[80%] items-center justify-around gap-2 text-left">
          <CountryPicker
            activePrices={activePrices}
            selectedCountryCode={selectedCountryCode}
            selectedData={selectedData}
            selectedFlag={selectedFlag}
            getFlagComponent={getFlagComponent}
            onCountryChange={onCountryChange}
            placement="mobile"
          />
          <p className="m-0 wrap-break-word font-[Poppins] text-[0.85rem] font-extrabold leading-[1.5] text-[rgb(233,233,233)] [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
            {translate(unitLabelKey)}
          </p>
        </div>
      </div>
    </>
  );
}
