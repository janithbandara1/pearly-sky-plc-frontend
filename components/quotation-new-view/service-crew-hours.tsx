"use client";

import React, { useState } from "react";
import { UserCheck, Minus, Plus } from "lucide-react";
import RoomSelector from "../booking/room-components-counter";
import ServiceFrequencySelector from "../booking/common-flows-propertis-and-equipments/service-frequency";

export interface ServiceCrewParametersProps {
  /** Current cleaner count */
  cleaners?: number;
  /** Minimum allowed cleaners */
  minCleaners?: number;
  /** Maximum allowed cleaners */
  maxCleaners?: number;
  /** Callback on cleaner count change */
  onCleanersChange?: (count: number) => void;

  /** Current service hours */
  hours?: number;
  /** Minimum allowed hours */
  minHours?: number;
  /** Maximum allowed hours */
  maxHours?: number;
  /** Callback on hours count change */
  onHoursChange?: (hours: number) => void;

  /** Selected service frequency */
  frequency?: string | null;
  /** Callback on frequency change */
  onFrequencyChange?: (frequency: string | null) => void;

  /** Quote mode flag */
  isQuote?: boolean;

  /** Theme mode */
  theme?: "dark" | "light";
  /** Custom outer container classes */
  className?: string;
}

export default function ServiceCrewParameters({
  cleaners: cleanersProp,
  minCleaners = 1,
  maxCleaners = 20,
  onCleanersChange,
  hours: hoursProp,
  minHours = 2,
  maxHours = 24,
  onHoursChange,
  frequency: frequencyProp,
  onFrequencyChange,
  isQuote = true,
  theme = "dark",
  className = "",
}: ServiceCrewParametersProps) {
  const isLight = theme === "light";

  // Internal state fallback if uncontrolled
  const [internalCleaners, setInternalCleaners] = useState(3);
  const [internalHours, setInternalHours] = useState(4);
  const [internalFrequency, setInternalFrequency] = useState<string | null>(null);

  const activeCleaners = cleanersProp ?? internalCleaners;
  const activeHours = hoursProp ?? internalHours;
  const activeFrequency = frequencyProp !== undefined ? frequencyProp : internalFrequency;

  const handleCleaners = (delta: number) => {
    const nextVal = Math.max(minCleaners, Math.min(maxCleaners, activeCleaners + delta));
    setInternalCleaners(nextVal);
    onCleanersChange?.(nextVal);
  };

  const handleHours = (delta: number) => {
    const nextVal = Math.max(minHours, Math.min(maxHours, activeHours + delta));
    setInternalHours(nextVal);
    onHoursChange?.(nextVal);
  };

  const handleFrequency = (freq: string | null) => {
    setInternalFrequency(freq);
    onFrequencyChange?.(freq);
  };

  return (
    <section
      className={`relative w-full rounded-3xl p-5 sm:p-7 border transition-colors duration-300 font-sans ${
        isLight
          ? "bg-white border-slate-200 shadow-xl"
          : "bg-[#090e17] border-[#e5c158]/20 shadow-2xl"
      } ${className}`}
    >
      {/* Header Section */}
      <div className="flex items-center space-x-3.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] shrink-0">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <h2
            className={`font-serif text-2xl font-bold tracking-tight ${
              isLight ? "text-slate-900" : "text-white"
            }`}
          >
            3. Service & Crew Parameters
          </h2>
          <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Configure requested staffing and service duration
          </p>
        </div>
      </div>

      {/* Grid: 1 Column on Mobile, 2 Columns on sm: and up */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        
        {/* Cleaners Selector Card */}
        <div
          className={`rounded-2xl p-5 border transition-colors duration-200 flex flex-col justify-between ${
            isLight
              ? "bg-slate-50/80 border-slate-200"
              : "bg-[#0d1320]/80 border-slate-800/80"
          }`}
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Request Cleaners
            </label>
            <p className={`text-xs mb-5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Dedicated eco-certified specialists
            </p>
          </div>

          <div className="flex items-center justify-between">
            {/* Decrement Button */}
            <button
              type="button"
              onClick={() => handleCleaners(-1)}
              disabled={activeCleaners <= minCleaners}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                isLight
                  ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  : "bg-[#182338] text-white hover:bg-[#1e2c45]"
              }`}
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Display Count */}
            <div className="text-center select-none">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c158] block leading-none">
                {activeCleaners}
              </span>
              <span className={`text-xs block mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Cleaners
              </span>
            </div>

            {/* Increment Button */}
            <button
              type="button"
              onClick={() => handleCleaners(1)}
              disabled={activeCleaners >= maxCleaners}
              className="w-11 h-11 rounded-xl bg-[#e5c158] hover:bg-[#f5d77f] text-[#05080f] flex items-center justify-center font-bold transition-all duration-150 cursor-pointer shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Hours Selector Card */}
        <div
          className={`rounded-2xl p-5 border transition-colors duration-200 flex flex-col justify-between ${
            isLight
              ? "bg-slate-50/80 border-slate-200"
              : "bg-[#0d1320]/80 border-slate-800/80"
          }`}
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
              Service Hours
            </label>
            <p className={`text-xs mb-5 ${isLight ? "text-slate-500" : "text-slate-400"}`}>
              Estimated session duration limit
            </p>
          </div>

          <div className="flex items-center justify-between">
            {/* Decrement Button */}
            <button
              type="button"
              onClick={() => handleHours(-1)}
              disabled={activeHours <= minHours}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${
                isLight
                  ? "bg-slate-200 text-slate-800 hover:bg-slate-300"
                  : "bg-[#182338] text-white hover:bg-[#1e2c45]"
              }`}
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Display Count */}
            <div className="text-center select-none">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#e5c158] block leading-none">
                {activeHours}
              </span>
              <span className={`text-xs block mt-1 ${isLight ? "text-slate-600" : "text-slate-400"}`}>
                Hours
              </span>
            </div>

            {/* Increment Button */}
            <button
              type="button"
              onClick={() => handleHours(1)}
              disabled={activeHours >= maxHours}
              className="w-11 h-11 rounded-xl bg-[#e5c158] hover:bg-[#f5d77f] text-[#05080f] flex items-center justify-center font-bold transition-all duration-150 cursor-pointer shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>

      </div>

      <ServiceFrequencySelector
        isQuote={isQuote}
        theme={theme}
        value={activeFrequency}
        onSelectionChange={handleFrequency}
      /> 
    </section>
  ); 
}