"use client";

import React from "react";
import { User, Mail } from "lucide-react";

interface StepContactProps {
  custName: string;
  setCustName: (val: string) => void;
  custEmail: string;
  setCustEmail: (val: string) => void;
  custPhone: string;
  setCustPhone: (val: string) => void;
  custNotes: string;
  setCustNotes: (val: string) => void;
  error?: string | null;
}

export function StepContact({
  custName,
  setCustName,
  custEmail,
  setCustEmail,
  custPhone,
  setCustPhone,
  custNotes,
  setCustNotes,
  error,
}: StepContactProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#0f1d35] text-[#c69214] flex items-center justify-center font-bold text-sm">
          5
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-900">Contact Information & Review</h2>
          <p className="text-xs text-slate-500">Who should we contact regarding this booking?</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                placeholder="e.g. Jean Dupont"
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="email"
                value={custEmail}
                onChange={(e) => setCustEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg pl-9 p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-xs font-medium text-slate-700 shrink-0">
              <span className="w-4 h-3 bg-blue-700 inline-block relative overflow-hidden rounded-[2px]">
                <span className="absolute inset-y-0 left-1/3 w-1/3 bg-white" />
                <span className="absolute inset-y-0 right-0 w-1/3 bg-red-600" />
              </span>
              <span>+33</span>
            </div>
            <input
              type="tel"
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
              placeholder="6 12 34 56 78"
              className="flex-1 bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Special Instructions <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={3}
            value={custNotes}
            onChange={(e) => setCustNotes(e.target.value)}
            placeholder="e.g. fragile items, narrow staircase, parking instructions, specific timing preferences..."
            className="w-full bg-slate-50 border border-slate-300 text-slate-800 text-sm rounded-lg p-2.5 focus:ring-2 focus:ring-[#c69214] focus:border-[#c69214] outline-none"
          />
        </div>
      </div>
    </div>
  );
}
