"use client";

import React from "react";
import { CheckCircle2, Download, RefreshCcw, Calendar, Clock, MapPin, FileText } from "lucide-react";
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
  // Calculate total invoice amount dynamically based on cart items
  const subtotal = cart.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);
  const tax = subtotal * config.taxRate;
  const total = subtotal + tax;

  // Generate a dynamic booking reference ID (or receive it as a prop)
  const bookingRef = "AQUA-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className={`space-y-8 text-center py-6 ${isDark ? "text-white" : "text-[#1B2E4B]"}`}>
      {/* Success Badge */}
      <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase shadow-md ${
        isDark 
          ? "bg-[#c9a858]/15 border-[#c9a858]/30 text-[#c9a858]" 
          : "bg-[#F5F5DC] border-[#C5A059]/40 text-[#1B2E4B]"
      }`}>
        <CheckCircle2 className={`w-4 h-4 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
        {config.type === "pool" ? "Pool Cleaning Confirmed" : "Service Confirmed"}
      </div>

      <div className="space-y-2">
        <h3 className={`text-3xl md:text-4xl font-extrabold tracking-wide font-serif ${
          isDark ? "text-[#c9a858]" : "text-[#1B2E4B]"
        }`}>
          Thank You, {clientTitle} {clientName}
        </h3>
        <p className={`text-sm md:text-base max-w-xl mx-auto leading-relaxed ${
          isDark ? "text-gray-300" : "text-[#1B2E4B]/80"
        }`}>
          Your service dispatch is officially scheduled. A confirmation email has been dispatched to{" "}
          <span className={`font-medium underline ${isDark ? "text-white" : "text-[#1B2E4B] font-semibold"}`}>
            {clientEmail}
          </span>.
        </p>
      </div>

      {/* Confirmation Details Card */}
      <div className={`max-w-2xl mx-auto rounded-2xl p-6 md:p-8 backdrop-blur-xl text-left space-y-5 shadow-2xl border ${
        isDark 
          ? "bg-[#121e2d]/90 border-[#c9a858]/30 text-white" 
          : "bg-white border-[#C7D1D9] text-[#1B2E4B]"
      }`}>
        <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b gap-2 ${
          isDark ? "border-white/10" : "border-[#C7D1D9]/60"
        }`}>
          <span className={`text-xs uppercase tracking-widest font-bold ${
            isDark ? "text-[#c9a858]" : "text-[#C5A059]"
          }`}>
            Booking Reference
          </span>
          <span className={`font-mono text-sm px-3 py-1 rounded-lg border font-bold ${
            isDark 
              ? "bg-[#0B132B] text-white border-[#c9a858]/30" 
              : "bg-[#F5F5DC] text-[#1B2E4B] border-[#C7D1D9]"
          }`}>
            {bookingRef}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3">
            <Calendar className={`w-4 h-4 shrink-0 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
            <div>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-[#1B2E4B]/60"}`}>
                Scheduled Date
              </span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[#1B2E4B]"}`}>
                {selectedDate || "Not Specified"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Clock className={`w-4 h-4 shrink-0 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
            <div>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-[#1B2E4B]/60"}`}>
                Arrival Window
              </span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[#1B2E4B]"}`}>
                {selectedWindow || "Standard Window"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className={`w-4 h-4 shrink-0 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
            <div>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-[#1B2E4B]/60"}`}>
                Location
              </span>
              <span className={`font-semibold truncate max-w-[220px] block ${isDark ? "text-white" : "text-[#1B2E4B]"}`} title={clientAddress || ""}>
                {clientAddress || "No address provided"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FileText className={`w-4 h-4 shrink-0 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
            <div>
              <span className={`text-[10px] uppercase tracking-wider block ${isDark ? "text-gray-400" : "text-[#1B2E4B]/60"}`}>
                Estimated On-site
              </span>
              <span className={`font-semibold ${isDark ? "text-white" : "text-[#1B2E4B]"}`}>
                {estimatedLaborHours}
              </span>
            </div>
          </div>
        </div>

        <div className={`pt-4 border-t flex justify-between items-center ${
          isDark ? "border-white/10" : "border-[#C7D1D9]/60"
        }`}>
          <span className={`text-sm font-medium ${isDark ? "text-gray-300" : "text-[#1B2E4B]/70"}`}>
            Final Invoice Total
          </span>
          <span className={`text-xl font-extrabold ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`}>
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
        <button
          onClick={() => window.print()}
          className={`px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
            isDark 
              ? "bg-[#c9a858] text-[#121e2d] hover:bg-[#b89547] shadow-[#c9a858]/20" 
              : "bg-[#C5A059] text-white hover:bg-[#b08d45] shadow-[#C5A059]/20"
          }`}
        >
          <Download className="w-4 h-4" />
          Print / Download Receipt
        </button>
        <button
          onClick={onBookAnother}
          className={`px-6 py-3.5 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border ${
            isDark 
              ? "border-white/20 text-white hover:bg-white/5" 
              : "border-[#C7D1D9] text-[#1B2E4B] hover:bg-[#F5F5DC]/50"
          }`}
        >
          <RefreshCcw className={`w-4 h-4 ${isDark ? "text-[#c9a858]" : "text-[#C5A059]"}`} />
          Book Another Service
        </button>
      </div>
    </div>
  );
}