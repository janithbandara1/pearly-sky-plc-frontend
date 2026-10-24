"use client";

import React, { useEffect } from "react";
import { AlertCircle, X } from "lucide-react";

export interface BookingValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  errors: string[];
  theme?: "dark" | "light" | string;
  onActionClick?: () => void;
  actionText?: string;
}

export default function BookingValidationModal({
  isOpen,
  onClose,
  title = "Please complete the required details before submitting:",
  errors,
  theme = "dark",
  onActionClick,
  actionText = "Review Missing Details",
}: BookingValidationModalProps) {
  const isLight = theme === "light";

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

  if (!isOpen || errors.length === 0) return null;

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-lg rounded-2xl sm:rounded-3xl border shadow-2xl p-5 sm:p-7 overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col animate-in zoom-in-95 ${
          isLight
            ? "bg-[#FFF5F5] border-red-300 text-red-950 shadow-[0_15px_50px_rgba(220,38,38,0.18)]"
            : "bg-[#140b0e]/95 backdrop-blur-xl border-red-500/40 text-red-100 shadow-[0_15px_50px_rgba(239,68,68,0.25)]"
        }`}
      >
        {/* Top Header Row with Exclamation Icon and Close Button */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-red-500/20">
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`p-1 rounded-full shrink-0 mt-0.5 ${
                isLight ? "text-red-600 bg-red-100" : "text-red-400 bg-red-500/10"
              }`}
            >
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3
              className={`font-bold text-sm sm:text-base leading-snug ${
                isLight ? "text-red-900" : "text-red-200"
              }`}
            >
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isLight
                ? "text-red-700 hover:bg-red-200/60"
                : "text-red-400 hover:text-white hover:bg-red-500/20"
            }`}
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Error Item List */}
        <div className="overflow-y-auto my-4 pr-1">
          <ul className="space-y-2.5 text-xs sm:text-sm pl-1">
            {errors.map((err, i) => (
              <li
                key={i}
                className={`flex items-start gap-2.5 leading-relaxed ${
                  isLight ? "text-red-800" : "text-red-200/90"
                }`}
              >
                <span
                  className={`font-bold shrink-0 mt-0.5 select-none ${
                    isLight ? "text-red-600" : "text-red-400"
                  }`}
                >
                  •
                </span>
                <span>{err}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Footer */}
        <div className="pt-3 border-t border-red-500/20 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={handleAction}
            className={`w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              isLight
                ? "bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
                : "bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/25"
            }`}
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
