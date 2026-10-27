"use client";

import React from "react";
import { CheckCircle2, Calendar, Clock, MapPin, FileText, X, ArrowRight } from "lucide-react";
import { CartItem, ServiceConfig } from "@/lib/booking";

interface BookingConfirmationSectionProps {
  config: ServiceConfig;
  cart: CartItem[];
  selectedDate: string;
  selectedWindow: string;
  clientTitle: string | null;
  clientName: string | null;
  clientEmail: string | null;
  clientAddress: string | null;
  estimatedLaborHours?: string;
  onBookAnother: () => void;
  theme?: "dark" | "light";
}

export default function BookingConfirmationSection({
  config,
  cart,
  selectedDate,
  selectedWindow,
  clientTitle,
  clientName,
  clientEmail,
  clientAddress,
  estimatedLaborHours = "~ 112.5 hours",
  onBookAnother,
  theme = "dark",
}: BookingConfirmationSectionProps) {
  const isDark = theme === "dark";

  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = subtotal * config.taxRate;
  const total = subtotal + tax;

  const confirmationItems = [
    {
      icon: Calendar,
      title: "Service Date",
      value: selectedDate || "Not Specified",
      status: selectedDate ? "Confirmed" : "Missing",
      isOk: !!selectedDate,
    },
    {
      icon: Clock,
      title: "Arrival Time Window",
      value: selectedWindow || "Standard Window",
      status: selectedWindow ? "Confirmed" : "Missing",
      isOk: !!selectedWindow,
    },
    {
      icon: MapPin,
      title: "Location Address",
      value: clientAddress || "No address provided",
      status: clientAddress ? "Confirmed" : "Missing",
      isOk: !!clientAddress,
    },
    {
      icon: FileText,
      title: "Estimated On-site Labor",
      value: estimatedLaborHours,
      status: "Calculated",
      isOk: true,
    },
  ];

  return (
    <div className={`w-full max-w-xl mx-auto rounded-3xl p-5 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300 ${
      isDark 
        ? "bg-[#0B132B]/95 border-[#c9a858]/40 text-white shadow-black/60" 
        : "bg-white border-[#C5A059]/40 text-[#1B2E4B] shadow-amber-500/10"
    }`}>
      
      {/* Top Branding Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#c9a858]/20">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full border border-[#c9a858] flex items-center justify-center font-serif font-bold text-sm tracking-wider ${
            isDark ? "bg-[#121e2d] text-[#c9a858]" : "bg-amber-50 text-[#C5A059]"
          }`}>
            PS
          </div>
          <div className="flex flex-col text-left">
            <span className={`text-xs font-serif font-bold tracking-[0.2em] uppercase ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`}>
              PEARLY SKY
            </span>
            <span className="text-[9px] tracking-[0.15em] text-gray-400 uppercase">
              ECO LUXURY CLEANING
            </span>
          </div>
        </div>
        <button 
          onClick={onBookAnother}
          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
            isDark ? "border-white/10 hover:bg-white/10 text-gray-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"
          }`}
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Warning / Error Header */}
      <div className={`p-4 rounded-2xl border mb-6 flex items-center gap-3.5 ${
        isDark 
          ? "bg-rose-950/30 border-rose-500/40 text-rose-400" 
          : "bg-rose-50 border-rose-300 text-rose-800"
      }`}>
        <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
          <span className="font-bold">!</span>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold uppercase tracking-wider">
            Please complete the required details before submitting:
          </span>
        </div>
      </div>

      {/* Confirmation & Missing Details Card List */}
      <div className="space-y-3 mb-6">
        {confirmationItems.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={idx}
              className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                item.isOk
                  ? isDark ? "bg-[#121e2d]/80 border-emerald-500/30" : "bg-white border-emerald-200 shadow-sm"
                  : isDark ? "bg-[#121e2d]/80 border-rose-500/30" : "bg-white border-rose-200 shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                  item.isOk ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                }`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left min-w-0">
                  <span className={`text-[11px] font-bold tracking-wide truncate ${isDark ? "text-white" : "text-slate-900"}`}>
                    {item.title}
                  </span>
                  <span className="text-[11px] text-gray-400 truncate">
                    {item.value}
                  </span>
                </div>
              </div>

              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shrink-0 border ${
                item.isOk
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400"
                  : "bg-rose-500/15 border-rose-500/40 text-rose-400"
              }`}>
                {item.status}
              </div>
            </div>
          );
        })}
      </div>

      {/* Single Action Button Matching Reference */}
      <div className="pt-2">
        <button
          onClick={onBookAnother}
          className={`w-full py-4 px-6 rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-between shadow-2xl cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
            isDark 
              ? "bg-gradient-to-r from-[#0d1b3a] via-[#122246] to-[#0d1b3a] text-white border border-[#c9a858]/60 shadow-[#c9a858]/25" 
              : "bg-gradient-to-r from-[#1B2E4B] to-[#243B5E] text-white border border-[#C5A059]/60 shadow-amber-500/25"
          }`}
        >
          <span className="mx-auto pl-6">Review Missing Details</span>
          <ArrowRight className="w-4 h-4 text-[#C5A059] shrink-0" />
        </button>
      </div>

    </div>
  );
}