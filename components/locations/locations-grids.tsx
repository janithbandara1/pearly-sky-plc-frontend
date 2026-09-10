"use client";

import Image from "next/image";
import { Globe2, Plus, Minus } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { Location } from "@/lib/content/locations";

interface LocationCardProps {
  location: Location;
  isOpen: boolean;
  onToggle: () => void;
}

export function LocationCard({ location, isOpen, onToggle }: LocationCardProps) {
  const { translate } = useLanguage();

  return (
    <div className="mb-3 overflow-hidden rounded-[10px] border-3 border-[#a98b4b] bg-[#16212E] text-white shadow-md transition-all duration-200">
      {/* Accordion Header */}
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between  px-4 py-5 text-left transition-colors hover:bg-[#1C2A3A] ${
          isOpen || !isOpen ? "bg-[#1C2A3A]" : "bg-[#16212E]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
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

        <div className="md:flex h-5 w-5 hidden items-center justify-center bg-[#0F1722] text-gray-300">
          {isOpen ? <Minus className="h-4.5 w-4.5 border border-[#a98b4b]" /> : <Plus className="h-4.5 w-4.5 border border-[#a98b4b]" />}
        </div>
      </button>

      {/* Accordion Content */}
      {isOpen || !isOpen  && (
        <div className="border-t  h-[300px] md:h-[220px] lg:h-[300px] border-[#2d3f53] bg-[#121A24] p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-800 pb-2">
            <h4 className="text-sm font-semibold tracking-wide text-white">
              {location.name || `${location.name} Office`}
            </h4>
            {location.contactNo && (
              <div className="text-xs text-gray-300">
                <span className="mr-1 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                  HOTLINE :
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

              {location.serviceCities && location.serviceCities.length > 0 && (
                <div>
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                    SERVICE CITIES :
                  </span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {location.serviceCities.map((city) => (
                      <span
                        key={city}
                        className="rounded bg-[#1E2C3D] px-2 py-0.5 text-[11px] text-gray-300"
                      >
                        {city}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}