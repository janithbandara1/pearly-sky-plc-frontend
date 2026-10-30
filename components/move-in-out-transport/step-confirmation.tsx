"use client";

import React from "react";
import { CheckCircle } from "lucide-react";

interface StepConfirmationProps {
  confirmName: string;
  confirmRef: string;
  confirmPrice: string;
  confirmDate: string;
  onReset: () => void;
}

export function StepConfirmation({
  confirmName,
  confirmRef,
  confirmPrice,
  confirmDate,
  onReset,
}: StepConfirmationProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md text-center space-y-4">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle className="w-10 h-10 stroke-[2]" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 font-serif">
          Booking Request Received!
        </h2>
        <p className="text-sm text-slate-600 max-w-md mx-auto">
          Thank you{" "}
          <span className="font-semibold text-slate-800">
            {confirmName || "valued client"}
          </span>
          . Your eco-luxury transport request has been submitted successfully. A Pearly Sky coordinator will contact you shortly.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left text-xs space-y-2 max-w-lg mx-auto">
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Booking Reference:</span>
            <span className="font-mono font-bold text-[#0f1d35]">{confirmRef}</span>
          </div>
          <div className="flex justify-between border-b border-slate-200 pb-2">
            <span className="text-slate-500">Estimated Total:</span>
            <span className="font-bold text-emerald-600 text-sm">{confirmPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Scheduled Date:</span>
            <span className="font-medium text-slate-700">{confirmDate}</span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            type="button"
            onClick={onReset}
            className="px-6 py-2.5 bg-[#0f1d35] hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow transition cursor-pointer"
          >
            Book Another Service
          </button>
        </div>
      </div>
    </div>
  );
}
