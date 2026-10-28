"use client";

import React, { useState } from "react";
import { UserCheck, Minus, Plus ,Clock,
Users,
FileText,
AlertCircle} from "lucide-react";
import RoomSelector from "../booking/room-components-counter";
import ServiceFrequencySelector from "../booking/common-flows-propertis-and-equipments/service-frequency";

export interface ServiceCrewParametersProps {
  value? : number;
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
  value,
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

  const noticeItems = [
    {
      id: 1,
      icon: Clock,
      content: (
        <div className="text-sm leading-snug">
          <span className={isLight ? 'text-slate-700' : 'text-slate-300'}>
            Standard completion requires{' '}
          </span>
          <span className="font-bold text-amber-400">7–10 hours</span>{' '}
          <span className={`text-xs block mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            (or 4–5 hours with a 2-person team).
          </span>
        </div>
      ),
    },
    {
      id: 2,
      icon: Users,
      content: (
        <div className="text-sm leading-snug">
          <p className="font-bold mb-1">To shorten duration:</p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Add a team member or adjust service scope.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      icon: FileText,
      content: (
        <div className="text-sm leading-snug">
          <p className="font-bold mb-1">For reduced bookings:</p>
          <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Please list priority tasks and skippable areas in the comments to guide our team.
          </p>
        </div>
      ),
    },
  ];

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
              isLight ? "text-[#002F6D]" : "text-white"
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
      
      {/**Notice */}
      <div
      className={`rounded-2xl my-2 border p-4 sm:p-5 transition-colors ${
        isLight
          ? 'bg-amber-50/50 border-[#DFB756] text-slate-800'
          : 'bg-[#0b1329] border-[#DFB756]/80 text-white'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#DFB756] text-slate-900 font-bold shrink-0">
          <AlertCircle className="w-5 h-5 fill-[#DFB756] stroke-slate-900" />
        </div>
        <h3 className="text-lg font-bold text-[#DFB756] tracking-wide">
          Deep Cleaning Notice ({130} m²)
        </h3>
      </div>

      {/* Grid Content rendered via map() */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 rounded-xl p-3 sm:p-4 gap-4 md:gap-0 ${
          isLight ? 'bg-[#fff]' : 'bg-[#0f1a3a]'
        }`}
      >
        {noticeItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <div
              key={item.id}
              className={`flex items-start gap-3 md:px-4 border-slate-700/60 pb-4 md:pb-0 
                ${index === 0 ? 'md:pl-0' : ''} 
                ${index === noticeItems.length - 1 ? 'md:pr-0 border-b-0' : 'border-b md:border-b-0 md:border-r'}
              `}
            >
              <IconComponent className="w-6 h-6 text-[#DFB756] shrink-0 mt-0.5" />
              {item.content}
            </div>
          );
        })}
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