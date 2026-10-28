"use client";

import { ShieldCheck, CalendarCheck, Clock3, Users, Repeat2, CheckCircle2 } from "lucide-react";
import { CareServiceConfig, CareMode, GenderPref, glassCard, glassInput } from "./care-wizard-config";
import { CareProfileDraft } from "@/lib/booking-draft";

function formatAmPm(hhmm: string): string {
  if (!hhmm) return "";
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

export interface Step4ReviewSummaryProps {
  config: CareServiceConfig;
  careMode: CareMode;
  gender1Count: number;
  gender2Count: number;
  selectedChips: string[];
  genderPref: GenderPref;
  durationHours: number;
  caregiverCount: number;
  date: string;
  time: string;
  profiles: CareProfileDraft[];
  totalPersonCount: number;
  personTitle: string;
}

export function Step4ReviewSummary({
  config, careMode,
  gender1Count, gender2Count,
  selectedChips, genderPref, durationHours, caregiverCount,
  date, time, profiles, totalPersonCount, personTitle,
}: Step4ReviewSummaryProps) {
  const modeName = careMode === "home" ? config.homeMode.title : config.centreMode.title;
  const prefLabel = genderPref === "no-preference" ? "No Preference" : genderPref === "female" ? "Female Professional" : "Male Professional";
  const totalBadge = config.isElder
    ? `${gender1Count} Male, ${gender2Count} Female (${totalPersonCount} Total)`
    : `${gender1Count} Boys, ${gender2Count} Girls (${totalPersonCount} Total)`;

  return (
    <div className="space-y-5">
      {/* SUCCESS NOTICE */}
      <div className="rounded-2xl p-5 text-center space-y-2" style={{ ...glassCard, border: "2px solid rgba(201,168,88,0.5)" }}>
        <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center" style={{ background: "rgba(201,168,88,0.15)", border: "2px solid rgba(201,168,88,0.5)" }}>
          <CheckCircle2 className="w-6 h-6 text-[#c9a858]" />
        </div>
        <h2 className="text-xl font-serif font-bold text-[#fffdf4]">Review Your Booking</h2>
        <p className="text-xs text-gray-400">Confirm all details below before submitting your care request.</p>
      </div>

      {/* BOOKING OVERVIEW */}
      <div className="rounded-2xl p-6 space-y-5" style={glassCard}>
        <h3 className="font-serif font-bold text-base text-[#fffdf4] border-b pb-3 flex items-center gap-2" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
          <span className="text-[#c9a858]">\u2728</span> Booking Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="space-y-3">
            <SummaryRow label="Care Service Mode" value={modeName} valueClass="text-[#c9a858]" />
            <SummaryRow label={config.isElder ? "Elder Demographics" : "Child Demographics"} value={totalBadge} valueClass="text-[#c9a858]" />
            <SummaryRow label="Personnel Preference" value={prefLabel} />
            <SummaryRow label="Duration per Session" value={`${durationHours} Hours`} />
            <SummaryRow label={config.caregiversLabel} value={`${caregiverCount} Professional(s)`} />
          </div>
          <div className="space-y-3">
            <SummaryRow label="Service Date" value={date || "Not selected"} icon={<CalendarCheck className="w-3.5 h-3.5 text-[#c9a858]" />} />
            <SummaryRow label="Start Time" value={time ? formatAmPm(time) : "Not selected"} icon={<Clock3 className="w-3.5 h-3.5 text-[#c9a858]" />} />
            <SummaryRow label="Recipients" value={`${totalPersonCount} ${config.isElder ? "Elder(s)" : "Child(ren)"}`} icon={<Users className="w-3.5 h-3.5 text-[#c9a858]" />} />
          </div>
        </div>

        {/* Requirements chips selected */}
        {selectedChips.length > 0 && (
          <div className="pt-3 border-t space-y-2" style={{ borderColor: "rgba(201,168,88,0.15)" }}>
            <span className="text-[11px] text-[#c9a858] font-semibold uppercase tracking-wider">Selected Requirements</span>
            <div className="flex flex-wrap gap-2">
              {selectedChips.map(chip => (
                <span key={chip} className="px-2.5 py-1 rounded-full text-[11px] font-semibold" style={{ background: "rgba(201,168,88,0.12)", border: "1px solid rgba(201,168,88,0.35)", color: "#c9a858" }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* PROFILES RECAP */}
      {totalPersonCount > 0 && profiles.slice(0, totalPersonCount).some(p => p.name) && (
        <div className="rounded-2xl p-6 space-y-4" style={glassCard}>
          <h3 className="font-serif font-bold text-base text-[#fffdf4] border-b pb-3" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
            {config.profileSectionTitle} Details
          </h3>
          <div className="space-y-4">
            {profiles.slice(0, totalPersonCount).map((p, i) => (
              p.name && (
                <div key={i} className="p-4 rounded-xl space-y-2" style={glassInput}>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#c9a858] uppercase tracking-wider">{personTitle} {totalPersonCount > 1 ? i + 1 : ""}</span>
                    {p.gender && <span className="text-[11px] text-gray-400">\u2022 {p.gender}</span>}
                    {p.age && <span className="text-[11px] text-gray-400">\u2022 Age {p.age}</span>}
                  </div>
                  {p.specialNeeds && <p className="text-[11px] text-gray-300">\u26a0\ufe0f {p.specialNeeds}</p>}
                  {p.behavioralNotes && <p className="text-[11px] text-gray-400">\uD83D\uDCCB {p.behavioralNotes}</p>}
                </div>
              )
            ))}
          </div>
        </div>
      )}

      {/* QA GUARANTEE */}
      <div className="flex items-center gap-3 rounded-2xl p-4 sm:p-5" style={{ background: "rgba(54,214,160,0.08)", border: "1px solid rgba(54,214,160,0.35)", color: "#36D6A0" }}>
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <p className="text-xs sm:text-[13px] font-medium leading-relaxed">
          All care professionals are background-checked, licensed, and arrive within a strict 15-minute window with verified credentials.
        </p>
      </div>

      {/* REFUND POLICY */}
      <div className="flex items-center gap-3 rounded-2xl p-4" style={{ background: "rgba(201,168,88,0.06)", border: "1px solid rgba(201,168,88,0.2)" }}>
        <Repeat2 className="w-4 h-4 shrink-0 text-[#c9a858]" />
        <p className="text-[11px] text-gray-400">100% refundable booking up to 24 hours prior to service start.</p>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, valueClass = "text-[#fffdf4]", icon }: { label: string; value: string; valueClass?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-400">{label}:</span>
      <span className={`font-semibold flex items-center gap-1 ${valueClass}`}>
        {icon}{value}
      </span>
    </div>
  );
}
