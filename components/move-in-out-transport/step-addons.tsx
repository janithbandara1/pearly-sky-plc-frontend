"use client";

import React from "react";
import { MOVING_ADDONS } from "./types";

interface StepAddonsProps {
  selectedAddons: string[];
  onToggleAddon: (addonId: string) => void;
}

export function StepAddons({ selectedAddons, onToggleAddon }: StepAddonsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f1d35] text-[#c69214] flex items-center justify-center font-bold text-sm">
          4
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Additional Services</h2>
          <p className="text-xs text-slate-500">Select any optional services you need</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOVING_ADDONS.map((a) => {
          const isChecked = selectedAddons.includes(a.id);
          return (
            <label
              key={a.id}
              onClick={() => onToggleAddon(a.id)}
              className={`flex items-start gap-3 p-4 bg-white rounded-2xl border ${
                isChecked ? "border-[#c69214] bg-amber-50/20" : "border-slate-200"
              } cursor-pointer hover:border-[#c69214]/50 transition select-none`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => {}} // handled by label onClick
                className="mt-1 w-4 h-4 rounded text-[#c69214] accent-[#c69214] focus:ring-[#c69214] cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-900">{a.name}</span>
                  <span className="text-xs font-bold text-slate-800">+{a.price.toFixed(2)} €</span>
                </div>
                {a.note && <p className="text-[10px] text-slate-400 mt-0.5">({a.note})</p>}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
