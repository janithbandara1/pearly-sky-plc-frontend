"use client";

import React, { useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Home,
  Layers,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Check,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/** Custom Spray Bottle icon matching the reference image for cleaning equipment/solvents */
function SprayBottleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 2h4" />
      <path d="M12 2v3" />
      <path d="M9 5h6a2 2 0 0 1 2 2v2a3 3 0 0 1-3 3h-4a3 3 0 0 1-3-3V7a2 2 0 0 1 2-2z" />
      <path d="M8 12v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-8" />
      <circle cx="12" cy="16" r="1" fill="currentColor" />
    </svg>
  );
}

export interface ValidationModalItem {
  id?: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  status?: "Missing" | "Confirmed" | string;
  isConfirmed: boolean;
}

export interface BookingValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  /** Explicit structured list of validation items (both confirmed and missing) */
  items?: ValidationModalItem[];
  /** Backward-compatible string error array; will be automatically converted to structured items */
  errors?: string[];
  theme?: "dark" | "light" | string;
  onActionClick?: () => void;
  actionText?: string;
}

/**
 * Converts legacy string errors into structured items with appropriate icons and titles.
 */
function inferItemsFromErrors(errors: string[]): ValidationModalItem[] {
  return errors.map((err, idx) => {
    const lower = err.toLowerCase();
    let title = "Required Detail";
    let icon: LucideIcon | React.ComponentType<{ className?: string }> = AlertCircle;

    if (lower.includes("date")) {
      title = "Service Date";
      icon = Calendar;
    } else if (lower.includes("time") || lower.includes("window") || lower.includes("arrival")) {
      title = "Arrival Time Window";
      icon = Clock;
    } else if (
      lower.includes("solvent") ||
      lower.includes("equipment") ||
      lower.includes("cleaning") ||
      lower.includes("supply")
    ) {
      title = "Cleaning Solvent & Equipment";
      icon = SprayBottleIcon;
    } else if (lower.includes("first name")) {
      title = "First Name";
      icon = User;
    } else if (lower.includes("last name") || lower.includes("full name") || lower.includes("name")) {
      title = "Name";
      icon = User;
    } else if (lower.includes("email")) {
      title = "Email Address";
      icon = Mail;
    } else if (lower.includes("phone") || lower.includes("contact")) {
      title = "Phone Number";
      icon = Phone;
    } else if (lower.includes("street") || lower.includes("address")) {
      title = "Street Address";
      icon = MapPin;
    } else if (lower.includes("city")) {
      title = "City";
      icon = Building2;
    } else if (lower.includes("province") || lower.includes("state")) {
      title = "Province / State";
      icon = Building2;
    } else if (lower.includes("postal") || lower.includes("zip")) {
      title = "Postal Code";
      icon = MapPin;
    } else if (lower.includes("disinfection") || lower.includes("package") || lower.includes("sanitization")) {
      title = "Service Package";
      icon = ShieldCheck;
    } else if (lower.includes("category")) {
      title = "Service Category";
      icon = Layers;
    } else if (lower.includes("property")) {
      title = "Property Category & Type";
      icon = Home;
    }

    return {
      id: `err-${idx}`,
      icon,
      title,
      description: err,
      status: "Missing",
      isConfirmed: false,
    };
  });
}

export default function BookingValidationModal({
  isOpen,
  onClose,
  title = "Please complete the required details before submitting:",
  items,
  errors = [],
  theme = "dark",
  onActionClick,
  actionText = "Review Missing Details",
}: BookingValidationModalProps) {
  const isLight = theme === "light";

  // Build the items list: prefer explicit `items`, fallback to inferred from `errors`
  const displayItems: ValidationModalItem[] = React.useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    if (errors && errors.length > 0) {
      return inferItemsFromErrors(errors);
    }
    return [];
  }, [items, errors]);

  // Handle ESC key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || displayItems.length === 0) return null;

  const handleAction = () => {
    if (onActionClick) {
      onActionClick();
    } else {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md sm:max-w-lg rounded-[28px] sm:rounded-[34px] border shadow-2xl p-5 sm:p-6 overflow-hidden transition-all duration-300 max-h-[92vh] flex flex-col animate-in zoom-in-95 ${
          isLight
            ? "bg-[#FAF7F2]/98 border-[#C5A059]/70 text-[#1B2E4B] shadow-[0_20px_60px_rgba(197,160,89,0.25)]"
            : "bg-[#08101D]/98 backdrop-blur-2xl border-[#FFD766]/60 text-white shadow-[0_0_60px_rgba(0,0,0,0.9),0_0_25px_rgba(255,215,102,0.18)]"
        }`}
      >
        {/* Top center sparkle ✦ */}
        <div
          aria-hidden="true"
          className="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[#FFD766] text-xs pointer-events-none select-none drop-shadow-[0_0_6px_rgba(255,215,102,0.9)]"
        >
          ✦
        </div>

        {/* Bottom center sparkle ✦ */}
        <div
          aria-hidden="true"
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[#FFD766] text-xs pointer-events-none select-none drop-shadow-[0_0_6px_rgba(255,215,102,0.9)]"
        >
          ✦
        </div>

        {/* Top Branding Header */}
        <div
          className={`flex items-center justify-between pb-4 mb-4 border-b ${
            isLight ? "border-[#C5A059]/25" : "border-[#FFD766]/20"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-11 h-11 rounded-full border flex items-center justify-center font-serif font-bold text-sm tracking-wider shrink-0 transition-transform ${
                isLight
                  ? "bg-[#FFF9EE] border-[#C5A059] text-[#C5A059] shadow-sm"
                  : "bg-[#0C182C] border-[#FFD766]/80 text-[#FFD766] shadow-[0_0_12px_rgba(255,215,102,0.25)]"
              }`}
            >
              PS
            </div>
            <div className="flex flex-col text-left">
              <span
                className={`text-sm sm:text-base font-serif font-bold tracking-[0.22em] uppercase leading-tight ${
                  isLight ? "text-[#1B2E4B]" : "text-[#F8FAFC]"
                }`}
              >
                PEARLY SKY
              </span>
              <span
                className={`text-[9px] sm:text-[10px] tracking-[0.2em] uppercase font-medium mt-0.5 ${
                  isLight ? "text-[#C5A059]" : "text-[#FFD766]/90"
                }`}
              >
                ECO LUXURY CLEANING
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              isLight
                ? "border-slate-300 text-slate-600 hover:bg-slate-100"
                : "border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
            }`}
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Warning / Error Header */}
        <div className="flex items-center gap-3.5 mb-3.5 px-0.5">
          <div
            className={`w-11 h-11 rounded-full border-2 flex items-center justify-center font-serif font-bold text-xl shrink-0 ${
              isLight
                ? "border-red-400 bg-red-100 text-red-600 shadow-sm"
                : "border-[#F87171]/70 bg-gradient-to-br from-[#EF4444]/20 to-[#991B1B]/30 text-[#F87171] shadow-[0_0_16px_rgba(239,68,68,0.35)]"
            }`}
          >
            !
          </div>
          <div className="flex flex-col text-left min-w-0">
            <h3
              className={`font-serif text-sm sm:text-base font-semibold leading-snug ${
                isLight ? "text-red-900" : "text-[#FCA5A5]"
              }`}
            >
              {title}
            </h3>
          </div>
        </div>

        {/* Scrollable Validation Checklist Cards */}
        <div className="overflow-y-auto space-y-2.5 my-2 pr-1 max-h-[50vh] sm:max-h-[54vh] scrollbar-thin">
          {displayItems.map((item, idx) => {
            const IconComp = item.icon || (item.isConfirmed ? Check : AlertCircle);
            const isConfirmed = item.isConfirmed;

            return (
              <div
                key={item.id || idx}
                className={`flex items-center justify-between p-3 sm:p-3.5 rounded-2xl border transition-all duration-200 ${
                  isConfirmed
                    ? isLight
                      ? "bg-emerald-50/70 border-emerald-300 shadow-xs"
                      : "bg-[#071F18]/80 border-emerald-500/40 shadow-[0_2px_10px_rgba(16,185,129,0.06)]"
                    : isLight
                      ? "bg-rose-50/70 border-rose-300 shadow-xs"
                      : "bg-[#1D0C12]/85 border-rose-500/40 shadow-[0_2px_10px_rgba(244,63,94,0.08)]"
                }`}
              >
                {/* Left Section: Status Dot/Check + Icon + Details */}
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  {/* Status Indicator Dot/Check */}
                  {isConfirmed ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.9)] shrink-0 ml-1 mr-0.5" />
                  )}

                  {/* Icon Box */}
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center border shrink-0 transition-colors ${
                      isConfirmed
                        ? isLight
                          ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                          : "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                        : isLight
                          ? "bg-rose-100 border-rose-300 text-rose-700"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-400"
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col text-left min-w-0">
                    <span
                      className={`text-xs sm:text-sm font-semibold tracking-wide truncate ${
                        isLight ? "text-slate-900" : "text-white"
                      }`}
                    >
                      {item.title}
                    </span>
                    <span
                      className={`text-[11px] sm:text-xs leading-tight line-clamp-2 ${
                        isConfirmed
                          ? isLight
                            ? "text-emerald-700"
                            : "text-emerald-300/80"
                          : isLight
                            ? "text-rose-700"
                            : "text-rose-200/80"
                      }`}
                    >
                      {item.description}
                    </span>
                  </div>
                </div>

                {/* Right Status Badge */}
                <div
                  className={`px-3 py-1 rounded-full text-[11px] font-medium tracking-wide shrink-0 border uppercase transition-colors ${
                    isConfirmed
                      ? isLight
                        ? "bg-emerald-100/90 border-emerald-400 text-emerald-800"
                        : "bg-emerald-500/15 border-emerald-500/60 text-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.2)]"
                      : isLight
                        ? "bg-rose-100/90 border-rose-400 text-rose-800"
                        : "bg-rose-500/15 border-rose-500/60 text-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.2)]"
                  }`}
                >
                  {item.status || (isConfirmed ? "Confirmed" : "Missing")}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Footer Button */}
        <div className="mt-3.5 pt-2">
          <button
            type="button"
            onClick={handleAction}
            className={`w-full py-3.5 px-6 rounded-full font-serif font-medium text-xs sm:text-sm tracking-wider uppercase transition-all flex items-center justify-between shadow-xl cursor-pointer hover:scale-[1.01] active:scale-[0.99] ${
              isLight
                ? "bg-gradient-to-r from-[#002F6D] via-[#0C3E8A] to-[#002F6D] text-white border border-[#C5A059]/80 shadow-[0_6px_20px_rgba(0,47,109,0.3)]"
                : "bg-gradient-to-r from-[#041B3B] via-[#0B2C63] to-[#041B3B] text-white border border-[#FFD766]/70 shadow-[0_6px_25px_rgba(11,44,99,0.5)]"
            }`}
          >
            <span className="flex-1 text-center pl-6">{actionText}</span>
            <ArrowRight className="w-4 h-4 text-[#FFD766] shrink-0 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

