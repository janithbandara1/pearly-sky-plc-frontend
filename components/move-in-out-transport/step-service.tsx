"use client";

import React from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { MOVING_SERVICES } from "./types";

interface StepServiceProps {
  selectedServiceId: string;
  onSelectService: (serviceId: string) => void;
}

export function StepService({ selectedServiceId, onSelectService }: StepServiceProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f1d35] text-[#c69214] flex items-center justify-center font-bold text-sm">
          1
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Select Service</h2>
          <p className="text-xs text-slate-500">Choose the type of moving service you need</p>
        </div>
      </div>

      {/* Service Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {MOVING_SERVICES.map((s) => {
          const isSelected = selectedServiceId === s.id;
          return (
            <div
              key={s.id}
              onClick={() => onSelectService(s.id)}
              className={`relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 bg-white hover:shadow-md ${
                isSelected
                  ? "border-[#c69214] ring-2 ring-[#c69214]/30 shadow-md bg-amber-50/20"
                  : "border-slate-200 hover:border-slate-300"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#c69214] text-white flex items-center justify-center shadow z-10">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
              <div className="space-y-3">
                <div className="relative w-full h-24 rounded-xl overflow-hidden bg-slate-100">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{s.title}</h3>
                  <p className="text-[11px] text-slate-500">{s.subtitle}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
