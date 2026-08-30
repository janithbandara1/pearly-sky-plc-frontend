"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CareTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  agreed: boolean;
  setAgreed: (val: boolean) => void;
}

interface AccordionItem {
  id: number;
  title: string;
  content: React.ReactNode;
}

export function CareTermsModal({
  isOpen,
  onClose,
  onAccept,
  agreed,
  setAgreed,
}: CareTermsModalProps) {
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true,
  });

  if (!isOpen) return null;

  function toggleSection(id: number) {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const sections: AccordionItem[] = [
    {
      id: 1,
      title: "1. Booking Confirmation & Service Scope",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">1.1 Service Basis:</strong> The final service price and duration are based strictly on the property details and service options selected at the time of booking.
          </p>
          <p>
            <strong className="text-brand-navy">1.2 On-Site Adjustments:</strong> If the property size or condition significantly deviates from the booking details, the Cleaner must obtain client approval for any required additional hours or costs before proceeding.
          </p>
          <p>
            <strong className="text-brand-navy">1.3 Client Access:</strong> You must ensure access (keys, codes, etc.) is available to the Cleaner at the scheduled time. Failure to provide access will result in a Lock-Out Fee (see Section 3.3).
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: "2. Payment Terms",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">2.1 Payment Authorization:</strong> Payment authorization is verified at checkout. Final quotation charges are billed according to confirmed service hours and any requested add-ons.
          </p>
          <p>
            <strong className="text-brand-navy">2.2 Invoicing:</strong> Official digital receipts and itemized invoices are delivered automatically to your registered email address.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: "3. Cancellation and Lock-Out Policy",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">3.1 Notice Window:</strong> Free cancellation is available up to 24 hours before your scheduled appointment start time.
          </p>
          <p>
            <strong className="text-brand-navy">3.2 Late Cancellations:</strong> Cancellations made with less than 24 hours notice or failure to provide premises entry at arrival may incur standard lock-out fees.
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: "4. Continuous Working Hours",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">4.1 Rest Intervals:</strong> For extended or full-day bookings, care professionals take scheduled short rest breaks in adherence with labor standards and safety guidelines.
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: "5. Service Guarantee and Liability",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">5.1 Certified Professionals:</strong> All caregivers and service staff undergo thorough vetting, reference verification, and strict background checks.
          </p>
          <p>
            <strong className="text-brand-navy">5.2 Quality Commitment:</strong> Pearly Sky maintains comprehensive insurance coverage and dedicated customer support for complete peace of mind.
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: "6. Supplies, Equipment, and Pets",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">6.1 Care Essentials:</strong> Any required specific child or elder medication, dietary supplements, or specialized supplies must be pre-arranged and clearly labeled.
          </p>
          <p>
            <strong className="text-brand-navy">6.2 Pets & Environment:</strong> Please inform the team of any pets, allergies, or special safety gates in the household.
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: "7. Key Handling and Service Verification",
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">7.1 Key Protocols:</strong> Lockbox codes and keys are managed securely under strict protocol and never transferred to unauthorized parties.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#A98B4B] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#121E2D] px-6 py-4 text-white">
          <h2 className="text-base font-bold sm:text-lg">
            Concise Online Booking Terms & Conditions
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Scrollable Accordion List */}
        <div className="flex-1 space-y-3 overflow-y-auto p-4 sm:p-6">
          {sections.map((sec) => {
            const isExpanded = !!openSections[sec.id];
            return (
              <div
                key={sec.id}
                className="overflow-hidden rounded-xl border border-slate-200 bg-[#FFFDF4]/40"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className="flex w-full items-center justify-between bg-slate-50 px-4 py-3 text-left text-xs font-semibold text-brand-navy transition hover:bg-slate-100 sm:text-sm"
                >
                  <span>{sec.title}</span>
                  {isExpanded ? (
                    <ChevronUp className="size-4 shrink-0 text-[#A98B4B]" />
                  ) : (
                    <ChevronDown className="size-4 shrink-0 text-[#A98B4B]" />
                  )}
                </button>
                {isExpanded && (
                  <div className="border-t border-slate-200 bg-white p-4">
                    {sec.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row">
          <label className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-brand-navy sm:text-sm">
            <button
              type="button"
              onClick={() => setAgreed(!agreed)}
              className="text-[#A98B4B]"
            >
              {agreed ? (
                <CheckSquare className="size-5 text-[#A98B4B]" />
              ) : (
                <Square className="size-5 text-slate-400" />
              )}
            </button>
            <span>By selecting this I accept terms and conditions</span>
          </label>

          <Button
            type="button"
            onClick={() => {
              if (!agreed) setAgreed(true);
              onAccept();
            }}
            className="h-10 min-w-[130px] rounded-lg bg-[#A98B4B] text-sm font-bold text-white shadow hover:brightness-110"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
