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
          ? "bg-[#F8F9FA] border-[#C7D1D9]"
          : "bg-[#0B132B]/50 backdrop-blur-md border-[#c9a858]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-start justify-between relative">
        {/* Path line spanning between step circle centers on both mobile and desktop */}
        <div className="absolute left-5 right-5 top-5 -translate-y-1/2 h-[2px] z-0 pointer-events-none">
          {/* Base gold/gray track line */}
          <div
            className={`w-full h-full transition-colors duration-300 ${
              isLight ? "bg-[#C7D1D9]" : "bg-[#c9a858]/35"
            }`}
          />
          {/* Completed/Active progress gold line */}
          <div
            className={`absolute left-0 top-0 h-full transition-all duration-500 ease-out ${
              isLight ? "bg-[#C5A059]" : "bg-[#c9a858]"
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
              circleClass = "bg-[#C5A059] text-white shadow-md shadow-[#C5A059]/25";
              labelClass = "text-[#1B2E4B]/80";
            } else if (isCurrent) {
              circleClass = "bg-[#C5A059] text-white ring-4 ring-[#C5A059]/20 shadow-md shadow-[#C5A059]/30";
              labelClass = "text-[#C5A059] font-bold";
            } else {
              circleClass = "bg-white text-[#1B2E4B]/70 border border-[#C7D1D9] group-hover:border-[#C5A059]";
              labelClass = "text-[#1B2E4B]/60";
            }
          } else {
            // Dark mode (Luxe Navy & Gold)
            if (isCompleted) {
              circleClass = "bg-[#c9a858] text-[#121e2d] shadow-lg shadow-[#c9a858]/30 font-bold";
              labelClass = "text-gray-300";
            } else if (isCurrent) {
              circleClass = "bg-[#c9a858] text-[#121e2d] ring-4 ring-[#c9a858]/25 font-bold";
              labelClass = "text-[#c9a858] font-bold";
            } else {
              circleClass = "bg-[#121e2d] text-[#c9a858]/70 border border-[#c9a858]/30 group-hover:border-[#c9a858]/60";
              labelClass = "text-gray-400";
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