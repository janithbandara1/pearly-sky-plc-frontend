"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X, CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/language-context";

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
  const { translate } = useLanguage();
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
      title: translate("careTermsSec1Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec1_1Title")}</strong> {translate("careTermsSec1_1Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec1_2Title")}</strong> {translate("careTermsSec1_2Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec1_3Title")}</strong> {translate("careTermsSec1_3Text")}
          </p>
        </div>
      ),
    },
    {
      id: 2,
      title: translate("careTermsSec2Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec2_1Title")}</strong> {translate("careTermsSec2_1Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec2_2Title")}</strong> {translate("careTermsSec2_2Text")}
          </p>
        </div>
      ),
    },
    {
      id: 3,
      title: translate("careTermsSec3Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec3_1Title")}</strong> {translate("careTermsSec3_1Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec3_2Title")}</strong> {translate("careTermsSec3_2Text")}
          </p>
        </div>
      ),
    },
    {
      id: 4,
      title: translate("careTermsSec4Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec4_1Title")}</strong> {translate("careTermsSec4_1Text")}
          </p>
        </div>
      ),
    },
    {
      id: 5,
      title: translate("careTermsSec5Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec5_1Title")}</strong> {translate("careTermsSec5_1Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec5_2Title")}</strong> {translate("careTermsSec5_2Text")}
          </p>
        </div>
      ),
    },
    {
      id: 6,
      title: translate("careTermsSec6Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec6_1Title")}</strong> {translate("careTermsSec6_1Text")}
          </p>
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec6_2Title")}</strong> {translate("careTermsSec6_2Text")}
          </p>
        </div>
      ),
    },
    {
      id: 7,
      title: translate("careTermsSec7Title"),
      content: (
        <div className="space-y-2 text-xs leading-relaxed text-slate-700 sm:text-sm">
          <p>
            <strong className="text-brand-navy">{translate("careTermsSec7_1Title")}</strong> {translate("careTermsSec7_1Text")}
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
            {translate("careTermsTitle")}
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
            <span>{translate("careTermsAcceptCheck")}</span>
          </label>

          <Button
            type="button"
            onClick={() => {
              if (!agreed) setAgreed(true);
              onAccept();
            }}
            className="h-10 min-w-[130px] rounded-lg bg-[#A98B4B] text-sm font-bold text-white shadow hover:brightness-110"
          >
            {translate("careTermsAcceptButton")}
          </Button>
        </div>
      </div>
    </div>
  );
}

