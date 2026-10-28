"use client";

import { CreditCard, Wallet, FileText, CheckCircle2 } from "lucide-react";
import { CareServiceConfig, glassCard, glowingInput } from "./care-wizard-config";

export type PaymentGateway = "card" | "wallet" | "vip";

export interface PaymentData {
  gateway: PaymentGateway | null;
  cardholderName: string | null;
  cardNumber: string | null;
  expiry: string | null;
  cvc: string | null;
}

export interface Step5PaymentProps {
  config: CareServiceConfig;
  data: PaymentData;
  onChange: (patch: Partial<PaymentData>) => void;
  depositAmount?: number;
}

export function Step5Payment({
  config,
  data,
  onChange,
  depositAmount = 30,
}: Step5PaymentProps) {
  return (
    <div className="rounded-3xl p-6 sm:p-8 space-y-6" style={glassCard}>
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-4" style={{ borderColor: "rgba(201,168,88,0.2)" }}>
        <div className="w-10 h-10 rounded-xl bg-[#c9a858]/10 border border-[#c9a858]/30 text-[#c9a858] flex items-center justify-center">
          <CreditCard className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#fffdf4] tracking-tight">
            Required Deposit Payment (€{depositAmount.toFixed(2)})
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Secure your booking slot with an instant refundable confirmation deposit.
          </p>
        </div>
      </div>

      {/* Confirmation Deposit Card*/}
      <div
        className="p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{
          background: "rgba(10, 18, 28, 0.8)",
          border: "1px solid rgba(226, 184, 107, 0.5)",
          boxShadow: "0 0 15px rgba(201, 168, 88, 0.15)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#c9a858] text-[#0a111a] font-bold text-xl flex items-center justify-center shadow-lg shrink-0">
            €{depositAmount}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#c9a858]">
              BOOKING CONFIRMATION DEPOSIT
            </div>
            <div className="text-xs text-gray-300 mt-1">
              Locks in your certified private {config.isElder ? "care professional" : "nanny"} &amp; reserves schedule slot.
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right shrink-0">
          <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
            DUE TODAY
          </div>
          <div className="font-serif text-2xl sm:text-3xl font-bold text-[#fffdf4]">
            €{depositAmount.toFixed(2)}
          </div>
        </div>
      </div>

      {/* Select Instant Gateway */}
      <div className="space-y-3">
        <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
          SELECT INSTANT GATEWAY
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {([
            { id: "card" as PaymentGateway, label: "Credit / Debit", icon: <CreditCard className="w-4 h-4 text-[#c9a858]" /> },
            { id: "wallet" as PaymentGateway, label: "Apple / Google Pay", icon: <Wallet className="w-4 h-4 text-[#c9a858]" /> },
            { id: "vip" as PaymentGateway, label: "VIP Billing", icon: <FileText className="w-4 h-4 text-[#c9a858]" /> },
          ]).map(({ id, label, icon }) => {
            const isSelected = data.gateway === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => onChange({ gateway: id })}
                className={`p-4 rounded-2xl flex items-center justify-center gap-2.5 text-xs font-semibold cursor-pointer transition-all ${
                  isSelected
                    ? "border-2 border-[#c9a858] bg-[#142234] text-[#fffdf4] shadow-[0_0_15px_rgba(201,168,88,0.25)]"
                    : "border border-[#c9a858]/30 bg-[#0f1925]/60 text-gray-300 hover:border-[#c9a858] hover:text-[#fffdf4]"
                }`}
              >
                {icon}
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gateway Forms */}
      {data.gateway === "card" && (
        <div className="space-y-4 pt-2">
          {/* Cardholder Name */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              CARDHOLDER NAME
            </label>
            <input
              type="text"
              value={data?.cardholderName || ""}
              onChange={e => onChange({ cardholderName: e.target.value })}
              placeholder="Sophia Rothschild"
              className="w-full h-12 px-4 rounded-xl text-sm care-glow-input"
            />
          </div>

          {/* Card Number */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
              CARD NUMBER
            </label>
            <div className="relative">
              <input
                type="text"
                value={data?.cardNumber || ""}
                onChange={e => onChange({ cardNumber: e.target.value })}
                placeholder="•••• •••• •••• 9941"
                className="w-full h-12 px-4 pr-12 rounded-xl text-sm care-glow-input font-mono tracking-wider"
              />
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-gray-400">
                <div className="w-8 h-5 rounded bg-[#1e2c3d] border border-white/10 flex items-center justify-center text-[10px] font-bold text-[#c9a858]">
                  MC
                </div>
              </div>
            </div>
          </div>

          {/* Expiry & CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
                EXPIRY
              </label>
              <input
                type="text"
                value={data?.expiry || ""}
                onChange={e => onChange({ expiry: e.target.value })}
                placeholder="09 / 28"
                className="w-full h-12 px-4 rounded-xl text-sm care-glow-input font-mono"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider text-gray-300 font-semibold">
                CVC
              </label>
              <input
                type="password"
                maxLength={4}
                value={data?.cvc || ""}
                onChange={e => onChange({ cvc: e.target.value })}
                placeholder="•••"
                className="w-full h-12 px-4 rounded-xl text-sm care-glow-input font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {data.gateway === "wallet" && (
        <div className="p-6 rounded-2xl text-center space-y-3" style={{ background: "rgba(10,18,28,0.7)", border: "1px solid rgba(201,168,88,0.3)" }}>
          <Wallet className="w-10 h-10 text-[#c9a858] mx-auto" />
          <div className="text-sm font-bold text-[#fffdf4]">Fast Checkout with Digital Wallet</div>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Apple Pay and Google Pay will be initiated securely upon confirmation. Your €30.00 deposit remains 100% refundable up to 24h prior.
          </p>
        </div>
      )}

      {data.gateway === "vip" && (
        <div className="p-6 rounded-2xl text-center space-y-3" style={{ background: "rgba(10,18,28,0.7)", border: "1px solid rgba(201,168,88,0.3)" }}>
          <FileText className="w-10 h-10 text-[#c9a858] mx-auto" />
          <div className="text-sm font-bold text-[#fffdf4]">VIP Corporate &amp; Residence Account Billing</div>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Charges will be settled directly via your active Pearlsky VIP corporate folio or residence agreement.
          </p>
        </div>
      )}
    </div>
  );
}
