"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PoolJobSelection } from "@/components/booking/pool-job-selection";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import type { QuoteItem } from "@/lib/content/quote-items";
import { useLanguage } from "@/lib/i18n/language-context";

export interface PoolScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
}

export function PoolScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
}: PoolScheduleSectionProps) {
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

  const [numCleaners, setNumCleaners] = useState<number>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.numCleaners ?? 1 : 1;
  });

  const [durationHours, setDurationHours] = useState<number>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.durationHours ?? 3 : 3;
  });

  const [gender, setGender] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.genderPreference || "no-preference" : "no-preference";
  });

  const [language, setLanguage] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.languagePreference || "no-preference" : "no-preference";
  });

  const [requirements, setRequirements] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.specialRequirements || "" : "";
  });

  const [error, setError] = useState<string | null>(null);

  const { translate } = useLanguage();

  function handleSchedule() {
    setError(null);

    if (quoteItems.length === 0) {
      setError(translate("poolErrorSelect"));
      return;
    }

    if (!date || !time) {
      setError(translate("scheduleErrorDateTime"));
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
      numCleaners,
      durationHours,
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      quoteItems,
      propertyClassification: currentDraft?.propertyClassification,
      serviceContinuityPlan: currentDraft?.serviceContinuityPlan,
      documentName: currentDraft?.documentName,
      documentData: currentDraft?.documentData,
      serviceSpecifics: currentDraft?.serviceSpecifics,
    });

    router.push(`/services/${serviceSlug}/checkout`);
  }

  return (
    <div className="w-full space-y-8">
      {/* 1. EXPERT POOL CLEANING SERVICES FOR */}
      <PoolJobSelection items={quoteItems} onItemsChange={setQuoteItems} />

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
        <p className="text-center text-sm font-semibold text-red-600">{error}</p>
      )}

      {/* 4. BOTTOM ACTION BUTTONS */}
      <div className="flex items-center justify-center gap-4 py-2 mb-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="inline-flex h-[42px] min-w-[120px] items-center justify-center rounded-[8px] border border-[#C5A253] bg-white px-10 py-2 text-base font-semibold text-[#0B1528] shadow-sm transition hover:bg-[#F8F9FA]"
        >
          {translate("CarpetSchedulebackButtonText")}
        </Button>
        <Button
          type="button"
          onClick={handleSchedule}
          className="inline-flex h-[42px] min-w-[200px] items-center justify-center rounded-[8px] bg-[#C5A253] px-10 py-2 text-center text-sm font-semibold uppercase tracking-wider text-[#0B1528] shadow-[0_4px_14px_rgba(197,162,83,0.35)] transition-all hover:bg-[#B39144] hover:brightness-110"
        >
          {translate("CarpetScheduleContinueButtonText")}
        </Button>
      </div>
    </div>
  );
}
