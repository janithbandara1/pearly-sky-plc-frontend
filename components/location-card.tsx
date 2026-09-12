"use client";

import Image from "next/image";
import { Globe2, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Location } from "@/lib/content/locations";
import { COVERAGE_CITIES } from "@/lib/countries/home-content";
import { CountryCode } from "@/lib/countries/config";

interface LocationCardProps {
  location: Location;
  isOpen: boolean;
  onToggle: () => void;
}

export function LocationCard({ location, isOpen, onToggle }: LocationCardProps) {
  const { translate } = useLanguage();

  //const isSoudi = location.name.toLowerCase().includes("saudi") || location.name.toLowerCase().includes("ksa");

  const cardCountry = location.country?.toLowerCase() as CountryCode | undefined;
  const cities = (cardCountry && COVERAGE_CITIES[cardCountry]) || location.serviceCities || [];

  // Marquee configuration: 3 rows for many cities (>= 12), 2 rows for medium (>= 5), 1 row otherwise
  const rowCount = cities.length >= 12 ? 2 : cities.length >= 5 ? 2 : 1;
  const repeatCount = cities.length < 5 ? 6 : cities.length < 12 ? 4 : 2;
  const marqueeCities = Array.from({ length: repeatCount }, () => cities).flat();

  return (
    <div className={`mb-3 overflow-hidden rounded-[10px] border-3 border-[#a98b4b]  bg-[#16212E] text-white shadow-md transition-all duration-200`}>
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between  px-4 py-5 text-left transition-colors hover:bg-[#1C2A3A] ${
          isOpen ? "bg-[#1C2A3A]" : "bg-[#16212E]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            {location.flag ? (
              <Image
                src={location.flag}
                alt={location.name}
                fill
                sizes="24px"
                className="object-cover"
              />
            ) : (
              <Globe2 className="h-3.5 w-3.5 text-muted-foreground" />
            )}
          </div>
          <span className="text-sm font-medium tracking-wide text-gray-200">
            {location.name}
          </span>
        </div>

        <div className="flex h-5 w-5 items-center justify-center  bg-[#0F1722] text-gray-300">
          {isOpen ? (
            <Minus className="h-4.5 w-4.5 border border-[#a98b4b]" />
          ) : (
            <Plus className="h-4.5 w-4.5 border border-[#a98b4b]" />
          )}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="border-t border-[#2d3f53] bg-[#121A24] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-800 pb-2">
            <h4 className="text-sm font-semibold tracking-wide text-white">
              {location.name || `${location.name} Office`}
            </h4>
            {location.contactNo && (
              <div className="text-xs text-gray-300">
                <span className="mr-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  {translate("contactHotline")} :
                </span>
                <a
                  href={`tel:${location.contactNo}`}
                  className="font-medium text-white hover:underline"
                >
                  {location.contactNo}
                </a>
              </div>
            )}
          </div>

          <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="relative h-36 w-full overflow-hidden rounded border border-gray-700 bg-gray-900">
              {location.mapSrc ? (
                <iframe
                  title={`${location.name} Map`}
                  src={location.mapSrc}
                  className="h-full w-full border-0"
                  loading="lazy"
                ></iframe>
              ) : (
                <div className="flex h-full w-full items-center justify-center text-xs text-gray-500">
                  Map Unavailable
                </div>
              )}

              {location.mapSrc && (
                <a
                  href={location.mapSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute left-2 top-2 rounded bg-white/90 px-2 py-0.5 text-[10px] font-bold text-gray-900 shadow hover:bg-white"
                >
                  {translate("locationsViewMap") || "VIEW IN MAP ↗"}
                </a>
              )}
            </div>

            <div className="flex flex-col justify-between space-y-3 text-xs text-gray-300">
              {location.address && (
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    ADDRESS :
                  </span>
                  <p className="mt-0.5 leading-relaxed text-gray-200">
                    {location.address}
                  </p>
                </div>
              )}

              {location.companyNumber && (
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    COMPANY NO :
                  </span>
                  <p className="mt-0.5 text-gray-200">{location.companyNumber}</p>
                </div>
              )}

              
            </div>
            
          </div>
          {cities.length > 0 && (
            <div className="mt-4 w-full">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                SERVICE CITIES :
              </span>
              <div className="mt-1.5 overflow-hidden w-full">
                <div
                  className={`grid w-max grid-flow-col gap-1.5 motion-reduce:animate-none animate-marquee hover:[animation-play-state:paused] ${
                    rowCount === 2 ? "grid-rows-2" : rowCount === 1 ? "grid-rows-1" : "grid-rows-1"
                  }`}
                >
                  
                  {marqueeCities.map((city, idx) => (
                    <span
                      key={`${city}-${idx}`}
                      className="whitespace-nowrap rounded bg-[#1E2C3D] px-2.5 py-0.5 text-[11px] text-gray-300 border border-[#2d3f53]/40"
                    >
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}