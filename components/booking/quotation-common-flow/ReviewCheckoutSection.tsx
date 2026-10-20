"use client";

import React, { useState } from "react";
import { CheckCircle2, ShieldCheck, CreditCard, Wallet, Building2 } from "lucide-react";
import { CartItem, ServiceConfig } from "@/lib/booking";

interface ReviewCheckoutSectionProps {
  config: ServiceConfig;
  clientName: string | null;
  cart: CartItem[];
  selectedDate: string;
  selectedWindow: string;
  onPrevStep: () => void;
  onConfirmReservation: () => void;
  theme?: "dark" | "light";
}

export default function ReviewCheckoutSection({
  config,
  cart,
  selectedDate,
  selectedWindow,
  onPrevStep,
  onConfirmReservation,
  clientName,
  theme = "dark",
}: ReviewCheckoutSectionProps) {
  const isLight = theme === "light";
  const [paymentOption, setPaymentOption] = useState("completion");

  return (
    <div className={`space-y-6 transition-colors duration-300 ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>
      <div>
        <h3
          className={`text-2xl font-bold tracking-wide mb-1 font-serif ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          Review & Express Checkout
        </h3>
        <p className={`text-sm ${isLight ? "text-gray-600" : "text-gray-300"}`}>
          Finalize payment option and secure your service reservation.
        </p>
      </div>

      {/* 1. Booked Services Summary */}
      <div className="space-y-3">
        <h4 className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Booked {config.type === "pool" ? "Pool/Spa" : "Service"} Items
        </h4>
        <div
          className={`border rounded-xl p-4 space-y-2 ${
            isLight
              ? "bg-[#F8F9FA] border-[#C7D1D9]"
              : "bg-[#0B132B]/60 border-white/10"
          }`}
        >
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className={isLight ? "text-[#1B2E4B]" : "text-gray-300"}>
                • {item.name} <span className={`text-xs ${isLight ? "text-gray-500" : "text-gray-500"}`}>({item.detail})</span>
              </span>
              <span className={`font-semibold ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>
                ${(item.quantity * item.unitPrice).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Client & Location Brief */}
      <div className="space-y-3">
        <h4 className={`text-xs font-semibold tracking-wider uppercase ${isLight ? "text-gray-500" : "text-gray-400"}`}>
          Client & Location Brief
        </h4>
        <div
          className={`border rounded-xl p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs ${
            isLight
              ? "bg-[#F8F9FA] border-[#C7D1D9]"
              : "bg-[#0B132B]/60 border-white/10"
          }`}
        >
          <div>
            <span className={`block mb-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Client</span>
            <span className={`font-medium ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>{clientName || "Client"}</span>
          </div>
          <div>
            <span className={`block mb-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Date</span>
            <span className={`font-medium ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>{selectedDate}</span>
          </div>
          <div>
            <span className={`block mb-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Time Window</span>
            <span className={`font-medium ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>{selectedWindow}</span>
          </div>
          <div>
            <span className={`block mb-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Status</span>
            <span className={`font-medium ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`}>Ready to Dispatch</span>
          </div>
        </div>
      </div>

      {/* 3. Choose Payment Option */}
      <div className="space-y-3">
        <h4
          className={`text-xs font-semibold tracking-wider uppercase ${
            isLight ? "text-[#C5A059]" : "text-[#c9a858]"
          }`}
        >
          Choose Payment Option
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Option 1 */}
          <div
            onClick={() => setPaymentOption("completion")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              isLight
                ? paymentOption === "completion"
                  ? "bg-[#F5F5DC] border-[#C5A059] shadow-sm ring-1 ring-[#C5A059]/30"
                  : "bg-white border-[#C7D1D9] hover:border-[#C5A059]/40"
                : paymentOption === "completion"
                ? "bg-[#16253b] border-[#c9a858] shadow-md shadow-[#c9a858]/10"
                : "bg-[#0e1826]/80 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="mt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isLight
                    ? paymentOption === "completion" ? "border-[#C5A059]" : "border-gray-400"
                    : paymentOption === "completion" ? "border-[#c9a858]" : "border-white/30"
                }`}
              >
                {paymentOption === "completion" && (
                  <div className={`w-2 h-2 rounded-full ${isLight ? "bg-[#C5A059]" : "bg-[#c9a858]"}`} />
                )}
              </div>
            </div>
            <div>
              <p className={`font-semibold text-xs ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>Pay on Completion</p>
              <p className={`text-[10px] mt-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Inspect & pay on site</p>
            </div>
          </div>

          {/* Option 2 */}
          <div
            onClick={() => setPaymentOption("apple")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              isLight
                ? paymentOption === "apple"
                  ? "bg-[#F5F5DC] border-[#C5A059] shadow-sm ring-1 ring-[#C5A059]/30"
                  : "bg-white border-[#C7D1D9] hover:border-[#C5A059]/40"
                : paymentOption === "apple"
                ? "bg-[#16253b] border-[#c9a858] shadow-md shadow-[#c9a858]/10"
                : "bg-[#0e1826]/80 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="mt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isLight
                    ? paymentOption === "apple" ? "border-[#C5A059]" : "border-gray-400"
                    : paymentOption === "apple" ? "border-[#c9a858]" : "border-white/30"
                }`}
              >
                {paymentOption === "apple" && (
                  <div className={`w-2 h-2 rounded-full ${isLight ? "bg-[#C5A059]" : "bg-[#c9a858]"}`} />
                )}
              </div>
            </div>
            <div>
              <p className={`font-semibold text-xs ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>Apple Pay / Wallet</p>
              <p className={`text-[10px] mt-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Instant express pay</p>
            </div>
          </div>

          {/* Option 3 */}
          <div
            onClick={() => setPaymentOption("corporate")}
            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
              isLight
                ? paymentOption === "corporate"
                  ? "bg-[#F5F5DC] border-[#C5A059] shadow-sm ring-1 ring-[#C5A059]/30"
                  : "bg-white border-[#C7D1D9] hover:border-[#C5A059]/40"
                : paymentOption === "corporate"
                ? "bg-[#16253b] border-[#c9a858] shadow-md shadow-[#c9a858]/10"
                : "bg-[#0e1826]/80 border-white/10 hover:border-white/20"
            }`}
          >
            <div className="mt-0.5">
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  isLight
                    ? paymentOption === "corporate" ? "border-[#C5A059]" : "border-gray-400"
                    : paymentOption === "corporate" ? "border-[#c9a858]" : "border-white/30"
                }`}
              >
                {paymentOption === "corporate" && (
                  <div className={`w-2 h-2 rounded-full ${isLight ? "bg-[#C5A059]" : "bg-[#c9a858]"}`} />
                )}
              </div>
            </div>
            <div>
              <p className={`font-semibold text-xs ${isLight ? "text-[#1B2E4B]" : "text-white"}`}>Corporate Invoice</p>
              <p className={`text-[10px] mt-0.5 ${isLight ? "text-gray-500" : "text-gray-400"}`}>Approved accounts</p>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Notice */}
      <div
        className={`flex items-start gap-2.5 border rounded-xl p-3 text-xs ${
          isLight
            ? "bg-[#F5F5DC]/80 border-[#C5A059]/30 text-[#1B2E4B]"
            : "bg-[#121e2d]/60 border-[#c9a858]/20 text-gray-300"
        }`}
      >
        <ShieldCheck className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? "text-[#C5A059]" : "text-[#c9a858]"}`} />
        <p>
          Guaranteed 100% water balance test reading prior to payment completion. Chemical warranty included for 14 days post-service.
        </p>
      </div>

      {/* Action Buttons */}
      <div className={`flex gap-4 pt-4 border-t ${isLight ? "border-gray-200" : "border-white/10"}`}>
        <button
          onClick={onPrevStep}
          className={`px-6 py-3 rounded-xl border font-medium text-sm transition-colors ${
            isLight
              ? "border-[#C7D1D9] text-[#1B2E4B] hover:bg-gray-100"
              : "border-white/20 text-white hover:bg-white/5"
          }`}
        >
          Back
        </button>
        <button
          onClick={onConfirmReservation}
          className={`flex-1 py-3 px-6 rounded-xl font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
            isLight
              ? "bg-[#C5A059] text-white hover:bg-[#b08e4d] shadow-[#C5A059]/20"
              : "bg-gradient-to-r from-[#c9a858] to-[#e4cc8c] text-[#121e2d] shadow-[#c9a858]/20 hover:brightness-105"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          CONFIRM {config.type === "pool" ? "POOL" : "SERVICE"} RESERVATION
        </button>
      </div>
    </div>
  );
}