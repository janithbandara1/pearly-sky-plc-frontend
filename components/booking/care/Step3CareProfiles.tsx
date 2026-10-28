"use client";

import { User, ChevronDown } from "lucide-react";
import { CareServiceConfig, glassCard, glowingInput } from "./care-wizard-config";

export interface ParentProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountry: string;
  phone: string;
}

export interface Step3CareProfilesProps {
  config: CareServiceConfig;
  data: ParentProfileData;
  onChange: (patch: Partial<ParentProfileData>) => void;
}

const COUNTRY_PHONE_CODES = [
  { code: "+33", label: "FR +33 (FR)" },
  { code: "+44", label: "UK +44 (UK)" },
  { code: "+49", label: "DE +49 (DE)" },
  { code: "+1", label: "US +1 (US)" },
  { code: "+41", label: "CH +41 (CH)" },
];



export function Step3CareProfiles({ config, data, onChange }: Step3CareProfilesProps) {
  const profileHeading = config.isElder ? "Primary Contact / Guardian Profile" : "Parent / Guardian Profile";

  return (
    <div className="rounded-3xl p-6 sm:p-8 space-y-6" style={glassCard}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
        <div className="w-10 h-10 rounded-xl bg-[#c9a858]/10 border border-[#c9a858]/30 text-[#c9a858] flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#fffdf4] tracking-tight">
            {profileHeading}
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Please provide primary contact information for reservation confirmation.
          </p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="space-y-5">
        {/* Row 1: First Name & Last Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              FIRST NAME *
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={e => onChange({ firstName: e.target.value })}
              placeholder="e.g. Sophia"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              LAST NAME *
            </label>
            <input
              type="text"
              value={data.lastName}
              onChange={e => onChange({ lastName: e.target.value })}
              placeholder="e.g. Rothschild"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>
        </div>

        {/* Row 2: Email Address */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
            EMAIL ADDRESS *
          </label>
          <input
            type="email"
            value={data.email}
            onChange={e => onChange({ email: e.target.value })}
            placeholder="sophia.r@luxury-parent.com"
            className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
          />
        </div>

        {/* Row 3: Phone Number with Country Code Dropdown */}
        <div className="space-y-2">
          <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
            PHONE NUMBER *
          </label>
          <div className="flex items-center gap-3">
            {/* Country code selector */}
            <div className="relative min-w-[140px] sm:min-w-[170px]">
              <select
                value={data.phoneCountry}
                onChange={e => onChange({ phoneCountry: e.target.value })}
                className="w-full h-12 px-4 pr-9 rounded-xl text-xs sm:text-sm font-semibold appearance-none cursor-pointer care-glow-input"
              >
                {COUNTRY_PHONE_CODES.map(({ code, label }) => (
                  <option key={code} value={code} className="bg-[#0c1522] text-[#fffdf4]">
                    {label}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Phone digits */}
            <input
              type="tel"
              value={data.phone}
              onChange={e => onChange({ phone: e.target.value })}
              placeholder="6 98 76 54 32"
              className="flex-1 h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

