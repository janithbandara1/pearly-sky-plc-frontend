"use client";

import React from "react";
import Image from "next/image";
import {
  Truck,
  Calendar,
  Clock,
  Repeat,
  Home,
  ArrowUpRight,
  ArrowDownRight,
  Box,
  Info,
  ShieldCheck,
  Check,
} from "lucide-react";
import { MOVING_SERVICES, MOVING_ADDONS, calculateTotals } from "./types";

interface BookingSummaryProps {
  selectedServiceId: string;
  moveDate: string;
  moveTime: string;
  movingType: string;
  propertyType: string;
  pickupFloor: string;
  pickupElevator: string;
  dropFloor: string;
  dropElevator: string;
  moveVolume: string;
  selectedAddons: string[];
  onChangeService: () => void;
}

export function BookingSummary({
  selectedServiceId,
  moveDate,
  moveTime,
  movingType,
  propertyType,
  pickupFloor,
  pickupElevator,
  dropFloor,
  dropElevator,
  moveVolume,
  selectedAddons,
  onChangeService,
}: BookingSummaryProps) {
  const selectedService =
    MOVING_SERVICES.find((s) => s.id === selectedServiceId) ?? MOVING_SERVICES[0];

  // Format date nicely
  let formattedDate = moveDate;
  try {
    const d = new Date(moveDate);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }
  } catch {
    // fallback to raw moveDate
  }

  const totals = calculateTotals(
    selectedServiceId,
    moveVolume,
    pickupFloor,
    pickupElevator,
    dropFloor,
    dropElevator,
    selectedAddons,
  );

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden sticky top-28">
      {/* Summary Header */}
      <div className="bg-[#0f1d35] text-white p-4 sm:p-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#c69214]/20 rounded-lg border border-[#c69214]/30 text-[#c69214]">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base">Booking Summary</h3>
            <p className="text-xs text-slate-300">Your moving service details</p>
          </div>
        </div>
      </div>

      {/* Summary Body */}
      <div className="p-5 space-y-4 text-xs">
        {/* Selected Service Card */}
        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
          <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-slate-300 shrink-0">
            <Image
              src={selectedService.image}
              alt={selectedService.title}
              fill
              className="object-cover"
              sizes="56px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 truncate text-xs">
                {selectedService.title} {selectedService.subtitle}
              </span>
              <button
                type="button"
                onClick={onChangeService}
                className="text-[#c69214] hover:underline font-semibold text-[11px] cursor-pointer ml-2 shrink-0"
              >
                Change
              </button>
            </div>
            <p className="text-slate-400 text-[10px] truncate">{selectedService.subtitle}</p>
          </div>
        </div>

        {/* Move Specifications */}
        <div className="space-y-2 border-b border-slate-100 pb-3">
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date
            </span>
            <span className="font-medium text-slate-900">{formattedDate || "Not set"}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" /> Time
            </span>
            <span className="font-medium text-slate-900">{moveTime}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <Repeat className="w-3.5 h-3.5 text-slate-400" /> Moving Type
            </span>
            <span className="font-medium text-slate-900">{movingType}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <Home className="w-3.5 h-3.5 text-slate-400" /> Property Type
            </span>
            <span className="font-medium text-slate-900">{propertyType}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" /> Pickup Floor
            </span>
            <span className="font-medium text-slate-900">
              {pickupFloor} (Elevator: {pickupElevator})
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <ArrowDownRight className="w-3.5 h-3.5 text-slate-400" /> Drop-off Floor
            </span>
            <span className="font-medium text-slate-900">
              {dropFloor} (Elevator: {dropElevator})
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span className="flex items-center gap-1.5">
              <Box className="w-3.5 h-3.5 text-slate-400" /> Estimated Volume
            </span>
            <span className="font-medium text-slate-900">{moveVolume}</span>
          </div>
        </div>

        {/* Selected Additional Services List */}
        <div className="space-y-2 border-b border-slate-100 pb-3">
          <span className="font-semibold text-slate-800 text-[11px] block uppercase tracking-wider">
            Additional Services
          </span>
          <div className="space-y-1 text-slate-600">
            {selectedAddons.length === 0 ? (
              <span className="text-slate-400 italic">None selected</span>
            ) : (
              selectedAddons.map((id) => {
                const item = MOVING_ADDONS.find((a) => a.id === id);
                if (!item) return null;
                return (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span className="font-semibold text-slate-800">
                      {item.price.toFixed(2)} €
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between text-slate-600">
            <span>Base Moving Service</span>
            <span className="font-semibold text-slate-900">
              {totals.base.toFixed(2)} €
            </span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Additional Services</span>
            <span className="font-semibold text-slate-900">
              {totals.addons.toFixed(2)} €
            </span>
          </div>
          <p className="text-[10px] text-slate-400 italic">
            (Price calculated based on volume, floors &amp; options)
          </p>

          <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
            <span className="font-bold text-slate-900 text-sm">Total Estimated Cost</span>
            <span className="font-serif text-xl font-bold text-slate-900">
              {totals.total.toFixed(2)} €
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>Final price will be confirmed after a detailed assessment. No hidden charges.</span>
        </div>

        {/* Trust Badges */}
        <div className="pt-2 border-t border-slate-100 space-y-2">
          <span className="font-semibold text-slate-800 text-[11px] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c69214]" />
            Why Choose Pearly Sky?
          </span>
          <ul className="space-y-1.5 text-[11px] text-slate-600">
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Professional &amp; experienced team</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Safe and careful handling</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Eco-friendly approach</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Flexible scheduling</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Fully insured transport</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Premium customer support</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
