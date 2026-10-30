"use client";

import React from "react";

interface StepDetailsProps {
  movingType: string;
  setMovingType: (val: string) => void;
  propertyType: string;
  setPropertyType: (val: string) => void;
  pickupFloor: string;
  setPickupFloor: (val: string) => void;
  pickupElevator: string;
  setPickupElevator: (val: string) => void;
  dropFloor: string;
  setDropFloor: (val: string) => void;
  dropElevator: string;
  setDropElevator: (val: string) => void;
  moveDate: string;
  setMoveDate: (val: string) => void;
  moveTime: string;
  setMoveTime: (val: string) => void;
  moveVolume: string;
  setMoveVolume: (val: string) => void;
}

export function StepDetails({
  movingType,
  setMovingType,
  propertyType,
  setPropertyType,
  pickupFloor,
  setPickupFloor,
  pickupElevator,
  setPickupElevator,
  dropFloor,
  setDropFloor,
  dropElevator,
  setDropElevator,
  moveDate,
  setMoveDate,
  moveTime,
  setMoveTime,
  moveVolume,
  setMoveVolume,
}: StepDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f1d35] text-[#c69214] flex items-center justify-center font-bold text-sm">
          2
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Moving Details</h2>
          <p className="text-xs text-slate-500">Provide details about your move requirements</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Moving Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Moving Type <span className="text-red-500">*</span>
            </label>
            <select
              value={movingType}
              onChange={(e) => setMovingType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Moving Out">Moving Out</option>
              <option value="Moving In">Moving In</option>
              <option value="Full Relocation">Full Relocation (In & Out)</option>
            </select>
          </div>

          {/* Property Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Property Type <span className="text-red-500">*</span>
            </label>
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Studio">Studio / 1 Room</option>
              <option value="Apartment (T2)">Apartment (T2)</option>
              <option value="Apartment (T3)">Apartment (T3)</option>
              <option value="Apartment (T4+)">Apartment (T4+)</option>
              <option value="Villa / House">Villa / House</option>
            </select>
          </div>

          {/* Floor Pickup */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Floor (Pickup) <span className="text-red-500">*</span>
            </label>
            <select
              value={pickupFloor}
              onChange={(e) => setPickupFloor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
              <option value="4th Floor+">4th Floor+</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Elevator Pickup */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Elevator at Pickup <span className="text-red-500">*</span>
            </label>
            <select
              value={pickupElevator}
              onChange={(e) => setPickupElevator(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Floor Drop-off */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Floor (Drop-off) <span className="text-red-500">*</span>
            </label>
            <select
              value={dropFloor}
              onChange={(e) => setDropFloor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Ground Floor">Ground Floor</option>
              <option value="1st Floor">1st Floor</option>
              <option value="2nd Floor">2nd Floor</option>
              <option value="3rd Floor">3rd Floor</option>
              <option value="4th Floor+">4th Floor+</option>
            </select>
          </div>

          {/* Elevator Drop-off */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Elevator at Drop-off <span className="text-red-500">*</span>
            </label>
            <select
              value={dropElevator}
              onChange={(e) => setDropElevator(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Date <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={moveDate}
                onChange={(e) => setMoveDate(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
              />
            </div>
          </div>

          {/* Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Preferred Time <span className="text-red-500">*</span>
            </label>
            <select
              value={moveTime}
              onChange={(e) => setMoveTime(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="08:00">08:00 AM</option>
              <option value="09:00">09:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>

          {/* Estimated Volume */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Estimated Volume <span className="text-red-500">*</span>
            </label>
            <select
              value={moveVolume}
              onChange={(e) => setMoveVolume(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            >
              <option value="Small (10–20 m³)">Small (10–20 m³)</option>
              <option value="Medium (20–40 m³)">Medium (20–40 m³)</option>
              <option value="Large (40–60 m³)">Large (40–60 m³)</option>
              <option value="Extra Large (60+ m³)">Extra Large (60+ m³)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
