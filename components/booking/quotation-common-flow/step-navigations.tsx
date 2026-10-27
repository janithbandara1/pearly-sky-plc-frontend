"use client";

import React from "react";
import { Check } from "lucide-react";

interface StepNavigationProps {
  currentStep?: number;
  theme?: "dark" | "light";
  onStepClick?: (step: number) => void;
}

const STEPS = [
  { id: 1, label: "Service Selection" },
  { id: 2, label: "Condition & Add-ons" },
  { id: 3, label: "Schedule & Dispatch" },
  { id: 4, label: "Location & Access" },
  { id: 5, label: "Review & Checkout" },
];

export default function StepNavigation({
  currentStep = 1,
  theme = "dark",
  onStepClick,
}: StepNavigationProps) {
  const isLight = theme === "light";

  const progressPercentage =
    ((Math.min(Math.max(currentStep, 1), STEPS.length) - 1) / (STEPS.length - 1)) * 100;

  return (
    <div
      className={`w-full overflow-hidden rounded-t-2xl py-5 md:py-6 px-4 md:px-12 transition-colors duration-300 border-b ${
        isLight
          ? "bg-white border-[#D9DDE5]"
          : "bg-[#1B2A40] border-[#718096]/40"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-start justify-between relative">
        {/* Path line spanning between step circle centers on both mobile and desktop */}
        <div className="absolute left-5 right-5 top-5 -translate-y-1/2 h-[2px] z-0 pointer-events-none">
          {/* Base gold/gray track line */}
          <div
            className={`w-full h-full transition-colors duration-300 ${
              isLight ? "bg-[#D9DDE5]" : "bg-[#718096]/40"
            }`}
          />
          {/* Completed/Active progress gold line */}
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${
              isLight ? "bg-[#002F6D]" : "bg-[#FFD766]"
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        {STEPS.map((step) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          let circleClass = "";
          let labelClass = "";

          if (isLight) {
            if (isCompleted) {
              circleClass = "bg-[#002F6D] text-white shadow-md shadow-[#002F6D]/20";
              labelClass = "text-[#1A2238]/80";
            } else if (isCurrent) {
              circleClass = "bg-[#002F6D] text-white ring-4 ring-[#002F6D]/20 shadow-md shadow-[#002F6D]/25";
              labelClass = "text-[#002F6D] font-bold";
            } else {
              circleClass = "bg-white text-[#687386] border border-[#D9DDE5] group-hover:border-[#002F6D]";
              labelClass = "text-[#687386]";
            }
          } else {
            // Dark mode (Luxe Navy & Gold)
            if (isCompleted) {
              circleClass = "bg-[#FFD766] text-[#002F6D] shadow-lg shadow-[#FFD766]/20 font-bold";
              labelClass = "text-[#C3CDDC]";
            } else if (isCurrent) {
              circleClass = "bg-[#FFD766] text-[#002F6D] ring-4 ring-[#FFD766]/25 font-bold";
              labelClass = "text-[#FFD766] font-bold";
            } else {
              circleClass = "bg-[#152238] text-[#C3CDDC] border border-[#718096] group-hover:border-[#FFD766]/60";
              labelClass = "text-[#C3CDDC]/70";
            }
          }

          return (
            <div
              key={step.id}
              onClick={() => onStepClick?.(step.id)}
              className={`relative z-10 flex flex-col items-center group ${
                onStepClick ? "cursor-pointer" : ""
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${circleClass}`}
              >
                {isCompleted ? <Check className="w-5 h-5 stroke-[2.5]" /> : step.id}
              </div>
              <span
                className={`mt-2 text-xs font-medium tracking-wider uppercase hidden md:block transition-colors duration-200 ${labelClass}`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}