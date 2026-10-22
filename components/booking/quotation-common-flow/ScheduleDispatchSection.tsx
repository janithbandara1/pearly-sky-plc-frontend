"use client";

import React from "react";
import { Calendar as CalendarIcon, Clock, ShieldCheck } from "lucide-react";
import { ServiceConfig } from "@/lib/booking";
import { DateTimeSection } from "../date-time-section";

interface ScheduleDispatchSectionProps {
  config: ServiceConfig;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedWindow: string;
  setSelectedWindow: (window: string) => void;
  onProceedNext: () => void;
  onPrevStep: () => void;
  theme?: "dark" | "light";
}

export default function ScheduleDispatchSection({
  config,
  selectedDate,
  setSelectedDate,
  selectedWindow,
  setSelectedWindow,
  onProceedNext,
  onPrevStep,
  theme = "dark",
}: ScheduleDispatchSectionProps) {
  const isLight = theme === "light";

  return (
    <div className={`space-y-8 transition-colors duration-300 ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
      <div>
        <h3
          className={`text-2xl font-bold tracking-wide mb-2 font-serif ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          Appointment & Dispatch Window
        </h3>
        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          Choose your preferred arrival date and master technician dispatch window.
        </p>
      </div>

      <div
      >
        <DateTimeSection
          date={selectedDate}
          onDateChange={(d) => {
            setSelectedDate(d);
          }}
          time={selectedWindow}
          onTimeChange={(t) => {
            setSelectedWindow(t);
          }}
          theme={theme}
        />
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-4 pt-4 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
        <button
          onClick={onPrevStep}
          className={`px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
            isLight
              ? "border-[#C7D1D9] text-[#1B2E4B] hover:bg-gray-100"
              : "border-white/20 text-white hover:bg-white/5"
          }`}
        >
          Back
        </button>
        <button
          onClick={onProceedNext}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
            isLight
              ? "bg-[#C5A059] text-white hover:bg-[#b08e4d] shadow-[#C5A059]/20"
              : "bg-gradient-to-r from-[#c9a858] to-[#e4cc8c] text-[#121e2d] shadow-[#c9a858]/20 hover:brightness-105"
          }`}
        >
          Proceed to Step 4
        </button>
      </div>
    </div>
  );
}