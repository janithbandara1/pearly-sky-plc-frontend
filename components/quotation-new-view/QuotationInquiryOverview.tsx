"use client";

import React from "react";
import { FileEdit, Shield, Send, Loader2 ,Home, 
  Expand, 
  Users, 
  CalendarClock, 
  Star, 
  Calendar,
  MapPin} from "lucide-react";

export interface QuotationInquiryOverviewProps {
  propertyCategory?: string;
  propertyScaleSqm?: number;
  cleaners?: number;
  hours?: number;
  frequency?: string | null;
  selectedService?: string | null;
  selectedTreatmentsCount?: number;
  targetDate?: string;
  targetTime?: string;
  destination?: string;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  theme?: "dark" | "light";
  className?: string;
}

function formatFt2(m2: number): string {
  return Math.round(m2 * 10.76391041671).toLocaleString();
}

function formatFrequency(freqId?: string | null): string {
  if (!freqId) return "Not selected";
  const map: Record<string, string> = {
    "one-time": "One-Time",
    "weekly": "Weekly (-20%)",
    "bi-weekly": "Bi-Weekly (-10%)",
    "monthly": "Monthly",
    "weekend": "Weekend",
    "same-day": "Same-Day",
    "move-in": "Move-In",
    "move-out": "Move-Out",
    "private-event": "Private Event",
    "corporate-event": "Corporate Event",
    "charter-turnaround": "Charter Turnaround",
    "professional-disinfection": "Pro Disinfection",
  };
  return (
    map[freqId] ||
    freqId
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ")
  );
}

function formatSchedule(dateStr?: string, timeStr?: string): string {
  if (!dateStr && !timeStr) return "Schedule not selected";
  
  let formattedTime = "";
  if (timeStr) {
    // If it's a slot like "morning", "afternoon", "evening" or "09:00", capitalize / format nicely
    const tLower = timeStr.toLowerCase();
    if (tLower.includes("morn")) formattedTime = "Morning";
    else if (tLower.includes("after")) formattedTime = "Afternoon";
    else if (tLower.includes("even")) formattedTime = "Evening";
    else formattedTime = timeStr;
  }

  if (dateStr && formattedTime) {
    return `${dateStr} (${formattedTime})`;
  }
  return dateStr || formattedTime;
}

export default function QuotationInquiryOverview({
  propertyCategory = "Townhouse",
  propertyScaleSqm = 20,
  cleaners = 3,
  hours = 4,
  frequency = null,
  selectedService = "Regular Home Cleaning",
  selectedTreatmentsCount = 1,
  targetDate = "2026-10-25",
  targetTime = "Morning",
  destination = "United Arab Emirates",
  onSubmit,
  isSubmitting = false,
  theme = "dark",
  className = "",
}: QuotationInquiryOverviewProps) {
  const isLight = theme === "light";

  const formattedScale = `${propertyScaleSqm.toLocaleString()} m² (${formatFt2(propertyScaleSqm)} ft²)`;
  const formattedScheduleStr = formatSchedule(targetDate, targetTime);
  const formattedFrequency = formatFrequency(frequency);
  const formattedStaffing = `${cleaners} ${cleaners === 1 ? "Cleaner" : "Cleaners"} • ${hours} ${
    hours === 1 ? "Hour" : "Hours"
  }`;

  return (
    <div
      className={`rounded-3xl p-6 sm:p-7 border transition-all duration-300 font-sans shadow-2xl ${
        isLight
          ? "bg-white border-[#C5A059]/30 text-slate-900"
          : "bg-[#0b1322] border-[#22314d] text-white"
      } ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
        <h3
          className={`text-sm sm:text-base font-bold tracking-widest uppercase font-sans ${
            isLight ? "text-[#B88E38]" : "text-[#DFB756]"
          }`}
        >
          INQUIRY OVERVIEW
        </h3>
        <div
          className={`flex items-center justify-center p-1.5 rounded-lg ${
            isLight ? "text-[#B88E38] bg-[#F7F2E7]" : "text-[#DFB756] bg-white/5"
          }`}
        >
          <FileEdit className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* Overview Attributes List */}
    <div className="space-y-4 text-xs sm:text-sm">
      {/* Row 1: Property Category */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <Home className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Property Category:
          </span>
        </div>
        <span className={`font-bold truncate text-right ${isLight ? "text-slate-900" : "text-white"}`}>
          {propertyCategory || "Townhouse"}
        </span>
      </div>

      {/* Row 2: Property Scale */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <Expand className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Property Scale:
          </span>
        </div>
        <span
          className={`font-bold text-right truncate ${
            isLight ? "text-[#B88E38]" : "text-[#DFB756]"
          }`}
        >
          {formattedScale}
        </span>
      </div>

      {/* Row 3: Staffing & Time */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <Users className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Staffing & Time:
          </span>
        </div>
        <span className={`font-bold truncate text-right ${isLight ? "text-slate-900" : "text-white"}`}>
          {formattedStaffing}
        </span>
      </div>

      {/* Row 4: Service Frequency */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <CalendarClock className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Service Frequency:
          </span>
        </div>
        <span
          className={`font-bold text-right truncate ${
            frequency
              ? isLight
                ? "text-[#B88E38]"
                : "text-[#DFB756]"
              : isLight
              ? "text-slate-400 font-normal"
              : "text-slate-500 font-normal"
          }`}
        >
          {formattedFrequency}
        </span>
      </div>

      {/* Row 5: Selected Service */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <Star className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Selected Service:
          </span>
        </div>
        <span
          className={`font-bold text-right truncate max-w-[50%] ${
            selectedService
              ? isLight
                ? "text-[#B88E38]"
                : "text-[#DFB756]"
              : isLight
              ? "text-slate-400 font-normal"
              : "text-slate-500 font-normal"
          }`}
          title={selectedService || "Not selected"}
        >
          {selectedService || "Not selected"}
        </span>
      </div>

      {/* Row 6: Target Schedule */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <Calendar className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Target Schedule:
          </span>
        </div>
        <span className={`font-bold truncate text-right ${isLight ? "text-slate-900" : "text-white"}`}>
          {formattedScheduleStr}
        </span>
      </div>

      {/* Row 7: Destination */}
      <div className="hidden flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${
              isLight ? "bg-[#FFF8EE] text-[#1E295D]" : "bg-[#1E293B] text-amber-400"
            }`}
          >
            <MapPin className="w-4 h-4" />
          </div>
          <span className={isLight ? "text-slate-500 font-medium truncate" : "text-[#8E9CAE] font-medium truncate"}>
            Destination:
          </span>
        </div>
        <span className={`font-bold truncate text-right ${isLight ? "text-slate-900" : "text-white"}`}>
          {destination || "United Arab Emirates"}
        </span>
      </div>
    </div>

      {/* Eco-Luxury Disclaimer / Concierge Callout */}
      <div
        className={`mt-6 p-4 rounded-2xl border flex items-start gap-3 transition-colors ${
          isLight
            ? "bg-[#FAF7F0] border-[#C5A059]/30 text-slate-700"
            : "bg-[#080e1b]/80 border-[#22314d] text-[#C4D0DE]"
        }`}
      >
        <Shield
          className={`w-4 h-4 shrink-0 mt-0.5 ${
            isLight ? "text-[#B88E38]" : "text-[#DFB756]"
          }`}
        />
        <p className="text-xs leading-relaxed font-normal">
          Custom eco-luxury quotation generated without dynamic automated fees. White-glove concierge will confirm directly.
        </p>
      </div>

      {/* Submit Button */}
      <div className="mt-6">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-[0.98] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
            isLight
              ? "bg-[#C5A059] hover:bg-[#b08e4d] text-[#002F6D] shadow-[#C5A059]/25"
              : "bg-[#DFB756] hover:bg-[#cfA342] text-black shadow-[#DFB756]/20"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-current" />
              <span>Submitting Request...</span>
            </>
          ) : (
            <>
              <span>Submit Quotation Request</span>
              <Send className="w-4 h-4 fill-current rotate-12" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
