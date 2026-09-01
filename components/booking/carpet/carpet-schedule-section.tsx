"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CarpetItemCards } from "@/components/booking/carpet-item-cards";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import type { QuoteItem } from "@/lib/content/quote-items";

export interface CarpetScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
}

export function CarpetScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
}: CarpetScheduleSectionProps) {
  const router = useRouter();

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.quoteItems
      ? draft.quoteItems
      : [];
  });

  const [date, setDate] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.date : "";
  });

  const [time, setTime] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.time : "";
  });

  const [error, setError] = useState<string | null>(null);

  function handleSchedule() {
    setError(null);

    if (quoteItems.length === 0) {
      setError("Please add at least one carpet or upholstery item before continuing.");
      return;
    }

    if (!date || !time) {
      setError("Please select a date and time to book your appointment.");
      return;
    }

    const currentDraft = loadBookingDraft();

    saveBookingDraft({
      serviceId,
      serviceSlug,
      serviceLabel,
      propertySizeSqm: 1,
      date,
      time,
      packages: [],
      items: [],
      supplySource: "company",
      addOnsTotal: 0,
      genderPreference: currentDraft?.genderPreference || "none",
      languagePreference: currentDraft?.languagePreference || "English",
      quoteItems,
      propertyClassification: currentDraft?.propertyClassification,
      serviceContinuityPlan: currentDraft?.serviceContinuityPlan,
      documentName: currentDraft?.documentName,
      documentData: currentDraft?.documentData,
      serviceSpecifics: currentDraft?.serviceSpecifics,
      specialRequirements: currentDraft?.specialRequirements,
    });

    router.push(`/services/${serviceSlug}/form-submit`);
  }

  return (
    <div className="w-full space-y-8">
      {/* 1. CARPET & UPHOLSTERY DETAILS */}
      <CarpetItemCards items={quoteItems} onItemsChange={setQuoteItems} />

      {/* 2. DATE & TIME PICKER */}
      <DateTimeSection
        date={date}
        onDateChange={(d) => {
          setDate(d);
          if (error) setError(null);
        }}
        time={time}
        onTimeChange={(t) => {
          setTime(t);
          if (error) setError(null);
        }}
      />

      {/* Validation Error Message */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-50 p-4 text-center text-sm font-semibold text-red-600 shadow-sm">
          {error}
        </div>
      )}

      {/* 3. BOTTOM ACTION BUTTONS */}
      <div className="flex items-center mb-5 justify-center gap-4 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-12 min-w-[120px] rounded-lg border-2 border-[#A98B4B] bg-[#FFFDF4] text-base font-semibold text-[#121E2D] shadow-sm transition-all hover:bg-[#FFFDF4] hover:shadow-[0_0_10px_2px_rgba(18,30,45,0.2)] hover:text-[#A98B4B]"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSchedule}
          className="h-12 min-w-[200px] rounded-lg border-2 border-[#A98B4B] bg-[#A98B4B] text-base font-semibold text-white shadow-md transition-all hover:bg-[#A98B4B] hover:brightness-105 hover:shadow-[0_0_12px_3px_rgba(169,139,75,0.4)]"
        >
          Schedule a Cleaning
        </Button>
      </div>
    </div>
  );
}
