"use client";

import { ServiceConfig } from "@/lib/booking";
import React, { useState } from "react";

interface LocationAccessSectionProps {
  titlePrefix: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  config: ServiceConfig;
  onProceedNext: () => void;
  onPrevStep: () => void;
  setTitlePrefix: (data: string) => void;
  setPhone: (data: string) => void;
  setFullName: (data: string) => void;
  setEmail: (data: string) => void;
  setAddress: (data: string) => void;
  theme?: "dark" | "light";
}

export default function LocationAccessSection({
  titlePrefix,
  fullName,
  email,
  phone,
  address,
  config,
  onProceedNext,
  onPrevStep,
  setTitlePrefix,
  setFullName,
  setEmail,
  setPhone,
  setAddress,
  theme = "dark",
}: LocationAccessSectionProps) {
  const isLight = theme === "light";
  const [gateCode, setGateCode] = useState<string | number>("");
  const [waterSource, setWaterSource] = useState<string | number>("Outdoor Hose Spigot Ready");
  const [entryNotes, setEntryNotes] = useState<string | number>("");

  const inputClass = isLight
    ? "w-full bg-white border border-[#C7D1D9] rounded-xl px-4 py-3 text-sm text-[#1B2E4B] placeholder-gray-400 focus:outline-none focus:border-[#C5A059] transition-colors"
    : "w-full bg-[#0B132B]/60 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#c9a858] transition-colors";

  const labelClass = isLight
    ? "text-[10px] font-semibold tracking-wider text-gray-500 uppercase block mb-1.5"
    : "text-[10px] font-semibold tracking-wider text-gray-400 uppercase block mb-1.5";

  const goldLabelClass = isLight
    ? "text-[10px] font-semibold tracking-wider text-[#C5A059] uppercase block mb-1.5 font-bold"
    : "text-[10px] font-semibold tracking-wider text-[#c9a858] uppercase block mb-1.5";

  return (
    <div className={`space-y-6 transition-colors duration-300 ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
      <div>
        <h3
          className={`text-2xl font-bold tracking-wide mb-1 font-serif ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          Property & Pool Access Details
        </h3>
        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          Enter service address and entry credentials for our technician team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Title Prefix */}
        <div>
          <label className={labelClass}>Title</label>
          <select
            value={titlePrefix || ""}
            onChange={(e) => setTitlePrefix(e.target.value)}
            className={inputClass}
          >
            <option value="Mr.">Mr.</option>
            <option value="Mrs.">Mrs.</option>
            <option value="Dr.">Dr.</option>
            <option value="Estate Manager">Estate Manager</option>
          </select>
        </div>

        {/* Full Name */}
        <div className="md:col-span-2">
          <label className={labelClass}>Full Name *</label>
          <input
            type="text"
            value={fullName || ""}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="e.g. Alexander Vance"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email */}
        <div>
          <label className={labelClass}>Email *</label>
          <input
            type="email"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@domain.com"
            className={inputClass}
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone *</label>
          <input
            type="tel"
            value={phone || ""}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="(555) 123-4567"
            className={inputClass}
          />
        </div>
      </div>

      {/* Property Address */}
      <div>
        <label className={labelClass}>Property Address *</label>
        <input
          type="text"
          value={address || ""}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 742 Ocean Drive, Palm Beach, FL 33480"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gate Code */}
        <div>
          <label className={goldLabelClass}>Side Gate Code / Access</label>
          <input
            type="text"
            value={gateCode || ""}
            onChange={(e) => setGateCode(e.target.value)}
            placeholder="e.g. #4821 or Key under mat"
            className={inputClass}
          />
        </div>

        {/* Water Source Access */}
        <div>
          <label className={goldLabelClass}>Water Source Access</label>
          <select
            value={waterSource}
            onChange={(e) => setWaterSource(e.target.value)}
            className={inputClass}
          >
            <option value="Outdoor Hose Spigot Ready">Outdoor Hose Spigot Ready</option>
            <option value="Technician Needs Own Hose Extension">Technician Needs Own Hose Extension</option>
            <option value="Well Water System">Well Water System</option>
          </select>
        </div>
      </div>

      {/* Technician Entry Notes */}
      <div>
        <label className={goldLabelClass}>Technician Entry Notes</label>
        <textarea
          rows={3}
          value={entryNotes}
          onChange={(e) => setEntryNotes(e.target.value)}
          placeholder="e.g. Friendly Golden Retriever in yard, beware of loose pavers near infinity pump..."
          className={`${inputClass} p-4`}
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
          Proceed to Step 5
        </button>
      </div>
    </div>
  );
}