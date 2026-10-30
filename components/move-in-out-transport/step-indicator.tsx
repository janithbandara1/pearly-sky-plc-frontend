"use client";

import React from "react";
import { Check } from "lucide-react";
import { STEP_NAMES } from "./types";

interface StepIndicatorProps {
  currentStep: number;
  onStepClick: (stepNumber: number) => void;
}

export function StepIndicator({ currentStep, onStepClick }: StepIndicatorProps) {
  // If on final confirmation screen (step 6), hide step clicks or keep inactive
  return (
    <div className="bg-[#081325] border-b border-slate-800 py-3 sm:py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Stepper */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Progress">
          {STEP_NAMES.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => onStepClick(step.number)}
                className="flex items-center gap-2 group focus:outline-none cursor-pointer"
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition ${
                    isActive
                      ? "bg-[#c69214] text-slate-950 shadow-md ring-2 ring-amber-400/40"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400 group-hover:bg-slate-700"
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
                </div>
                <span
                  className={`text-xs font-medium ${
                    isActive
                      ? "text-[#c69214] font-semibold border-b border-[#c69214] pb-0.5"
                      : "text-slate-300 group-hover:text-white"
                  }`}
                >
                  {step.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Mobile Stepper Bar */}
        <div className="lg:hidden w-full flex items-center justify-between overflow-x-auto gap-2 text-xs py-1">
          {STEP_NAMES.map((step) => {
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <button
                key={step.number}
                type="button"
                onClick={() => onStepClick(step.number)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg shrink-0 transition ${
                  isActive
                    ? "bg-slate-800 border border-[#c69214] text-[#c69214]"
                    : isCompleted
                    ? "text-emerald-400 bg-slate-900"
                    : "text-slate-400"
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive
                      ? "bg-[#c69214] text-slate-900"
                      : isCompleted
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {isCompleted ? <Check className="w-3 h-3 stroke-[3]" /> : step.number}
                </span>
                <span className="text-xs font-medium">{step.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
