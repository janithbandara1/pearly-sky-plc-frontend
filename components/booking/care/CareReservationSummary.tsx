"use client";

import { RotateCcw } from "lucide-react";
import { CareServiceConfig, CareMode, glassCard } from "./care-wizard-config";

export interface CareReservationSummaryProps {
  config: CareServiceConfig;
  careMode: CareMode;
  gender1Count: number;
  gender2Count: number;
  durationHours: number;
  caregiverCount: number;
}

export function CareReservationSummary({
  config,
  careMode,
  gender1Count,
  gender2Count,
  durationHours,
  caregiverCount,
}: CareReservationSummaryProps) {
  const totalPersonCount = gender1Count + gender2Count;

  // Price calculations 
  const hourlyRate = config.isElder ? 32 : 28;
  const hourlySubtotal = hourlyRate * durationHours;
  const totalEstimate = hourlySubtotal * caregiverCount;
  const depositToday = 30;
  const remainingBalance = Math.max(0, totalEstimate - depositToday);

  const modeTag = careMode === "home"
    ? (config.isElder ? "HOME CARE" : "HOME NANNY")
    : (config.isElder ? "CARE RESIDENCE" : "KIDS CLUB");

  const demographicsLabel = config.isElder ? "ELDER DEMOGRAPHICS" : "CHILDREN DEMOGRAPHICS";
  const demographicsValue = totalPersonCount === 0
    ? "No recipients selected yet"
    : config.isElder
      ? `${gender1Count} ${gender1Count === 1 ? "Gentleman" : "Gentlemen"}, ${gender2Count} ${gender2Count === 1 ? "Lady" : "Ladies"} (${totalPersonCount} Total)`
      : `${gender1Count} ${gender1Count === 1 ? "Boy" : "Boys"}, ${gender2Count} ${gender2Count === 1 ? "Girl" : "Girls"} (${totalPersonCount} Total)`;

  const caregiverLabel = config.isElder
    ? `Caregivers Assigned (${caregiverCount} ${caregiverCount === 1 ? "Caregiver" : "Caregivers"})`
    : `Nannies Assigned (${caregiverCount} ${caregiverCount === 1 ? "Nanny" : "Nannys"})`;

  const amenitiesLabel = config.isElder
    ? "Eco-Luxury Care Materials & Amenities"
    : "Organic Gourmet Snacks & Materials";

  return (
    <div className="rounded-3xl p-6 sm:p-7 space-y-6" style={glassCard}>
      {/* Header + Mode Tag */}
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-serif text-2xl font-bold text-[#fffdf4] tracking-tight">
          Reservation Summary
        </h3>
        <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-[#c9a858] bg-[#162232] border border-[#c9a858]/40">
          {modeTag}
        </span>
      </div>

      {/* Demographics Inset Box */}
      <div
        className="p-4 rounded-2xl"
        style={{ background: "#0a111a", border: "1px solid rgba(201,168,88,0.2)" }}
      >
        <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#c9a858]">
          {demographicsLabel}
        </div>
        <div className="text-sm sm:text-base font-bold text-[#fffdf4] mt-1">
          {demographicsValue}
        </div>
      </div>

      {/* Cost Breakdown Rows */}
      <div className="space-y-3.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">
            Hourly Rate (€{hourlyRate} x {durationHours} hrs)
          </span>
          <span className="font-bold text-[#fffdf4]">
            €{hourlySubtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">
            {caregiverLabel}
          </span>
          <span className="font-bold text-[#fffdf4]">
            x {caregiverCount}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium">
            {amenitiesLabel}
          </span>
          <span className="font-semibold text-[#c9a858]">
            Included
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#c9a858]/20" />

      {/* Total Booking Estimate */}
      <div className="flex items-baseline justify-between">
        <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
          TOTAL BOOKING ESTIMATE
        </span>
        <span className="font-serif text-3xl sm:text-4xl font-bold text-[#f5caa0]">
          €{totalEstimate.toFixed(2)}
        </span>
      </div>

      {/* Required Deposit Today + Balance Box */}
      <div
        className="p-4 rounded-2xl space-y-3"
        style={{ background: "#0a111a", border: "1px solid rgba(201,168,88,0.25)" }}
      >
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="font-bold text-[#c9a858]">Required Deposit Today</span>
          <span className="font-bold text-[#c9a858] text-base">€{depositToday.toFixed(2)}</span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-[#c9a858]" />

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-gray-300 font-medium">Remaining Balance (On Arrival)</span>
          <span className="font-bold text-[#fffdf4] text-base">€{remainingBalance.toFixed(2)}</span>
        </div>
      </div>

      {/* Refund Policy */}
      <div className="flex items-center gap-2 text-xs text-gray-400 pt-1">
        <RotateCcw className="w-3.5 h-3.5 text-[#c9a858] shrink-0" />
        <span>100% Refundable deposit up to 24h prior.</span>
      </div>
    </div>
  );
}
