"use client";

import { useState } from "react";
import { MapPin, Crosshair, ChevronDown, Check } from "lucide-react";
import { CareServiceConfig, glassCard, glowingInput } from "./care-wizard-config";

export interface LocationDetailsData {
  country: string;
  city: string;
  postalCode: string;
  province: string;
  streetAddress: string;
  unit: string;
}

export interface Step4LocationDetailsProps {
  config: CareServiceConfig;
  data: LocationDetailsData;
  onChange: (patch: Partial<LocationDetailsData>) => void;
}

const COUNTRIES = [
  "France",
  "United Kingdom",
  "Germany",
  "United States",
  "Switzerland",
  "Monaco",
];

export function Step4LocationDetails({
  config,
  data,
  onChange,
}: Step4LocationDetailsProps) {
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsSuccess, setGpsSuccess] = useState(false);

  function handleAutoFillGPS() {
    setGpsLoading(true);
    setTimeout(() => {
      onChange({
        country: "France",
        city: "Paris",
        postalCode: "75008",
        province: "Île-de-France",
        streetAddress: "18 Avenue Montaigne",
        unit: "Penthouse 5",
      });
      setGpsLoading(false);
      setGpsSuccess(true);
      setTimeout(() => setGpsSuccess(false), 3000);
    }, 600);
  }

  return (
    <div className="rounded-3xl p-6 sm:p-8 space-y-6" style={glassCard}>
      {/* Header with Auto-Fill GPS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#c9a858]/10 border border-[#c9a858]/30 text-[#c9a858] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#fffdf4] tracking-tight">
              Location &amp; Residence Details
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Specify the private residence, hotel suite, or venue for the appointment.
            </p>
          </div>
        </div>

        {/* Auto-Fill GPS button */}
        <button
          type="button"
          onClick={handleAutoFillGPS}
          disabled={gpsLoading}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-[#c9a858] border border-[#c9a858]/40 bg-[#162232] hover:bg-[#c9a858]/20 transition-all cursor-pointer shadow-sm"
        >
          {gpsSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">GPS Applied</span>
            </>
          ) : (
            <>
              <Crosshair className={`w-3.5 h-3.5 text-[#c9a858] ${gpsLoading ? "animate-spin" : ""}`} />
              <span>{gpsLoading ? "Locating..." : "Auto-Fill GPS"}</span>
            </>
          )}
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Row 1: Country & City */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              SELECT COUNTRY *
            </label>
            <div className="relative">
              <select
                value={data.country}
                onChange={e => onChange({ country: e.target.value })}
                className="w-full h-12 px-4 pr-9 rounded-xl text-sm font-semibold appearance-none cursor-pointer care-glow-input"
              >
                {COUNTRIES.map(c => (
                  <option key={c} value={c} className="bg-[#0c1522] text-[#fffdf4]">
                    {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              CITY *
            </label>
            <input
              type="text"
              value={data.city}
              onChange={e => onChange({ city: e.target.value })}
              placeholder="Paris"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>
        </div>

        {/* Row 2: Postal Code & Province / State */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              POSTAL CODE *
            </label>
            <input
              type="text"
              value={data.postalCode}
              onChange={e => onChange({ postalCode: e.target.value })}
              placeholder="75008"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              PROVINCE / STATE *
            </label>
            <input
              type="text"
              value={data.province}
              onChange={e => onChange({ province: e.target.value })}
              placeholder="Île-de-France"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>
        </div>

        {/* Row 3: Street Address */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
            STREET ADDRESS *
          </label>
          <input
            type="text"
            value={data.streetAddress}
            onChange={e => onChange({ streetAddress: e.target.value })}
            placeholder="18 Avenue Montaigne"
            className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
          />
        </div>

        {/* Row 4: Unit / Apt / Residence Suite */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
            UNIT / APT / RESIDENCE SUITE (OPTIONAL)
          </label>
          <input
            type="text"
            value={data.unit}
            onChange={e => onChange({ unit: e.target.value })}
            placeholder="Penthouse 5"
            className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
          />
        </div>
      </div>
    </div>
  );
}
