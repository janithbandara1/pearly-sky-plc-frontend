"use client";

import React from "react";
import { MapPin, Info } from "lucide-react";

interface StepLocationsProps {
  pickupAddress: string;
  setPickupAddress: (val: string) => void;
  dropAddress: string;
  setDropAddress: (val: string) => void;
  error?: string | null;
}

export function StepLocations({
  pickupAddress,
  setPickupAddress,
  dropAddress,
  setDropAddress,
  error,
}: StepLocationsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f1d35] text-[#c69214] flex items-center justify-center font-bold text-sm">
          3
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Locations</h2>
          <p className="text-xs text-slate-500">Enter pickup and drop-off addresses</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Pickup Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              placeholder="e.g. 15 Avenue des Champs-Élysées, 75008 Paris"
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Street address, city, postal code</p>
        </div>

        <div className="pt-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Drop-off Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
            <input
              type="text"
              value={dropAddress}
              onChange={(e) => setDropAddress(e.target.value)}
              placeholder="e.g. 42 Rue de la République, 69002 Lyon"
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Street address, city, postal code</p>
        </div>

        {/* Distance indicator note */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-start gap-3 text-xs text-blue-800 mt-2">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <span>Our system automatically optimizes route scheduling for eco-friendly reduced carbon transport.</span>
        </div>
      </div>
    </div>
  );
}
