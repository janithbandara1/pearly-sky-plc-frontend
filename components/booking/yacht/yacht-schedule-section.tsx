"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  PropertyTypeSizeSelector,
  YACHT_PROPERTY_TYPES,
  type PropertyCategory,
} from "@/components/booking/Yatchpropertytypes";
import { YachtCategorySelection } from "@/components/booking/yacht-category-selection";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";

export interface YachtScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
}

export function YachtScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
}: YachtScheduleSectionProps) {
  const router = useRouter();

  const [propertySizeSqm, setPropertySizeSqm] = useState<number>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.propertySizeSqm
      ? draft.propertySizeSqm
      : 20;
  });

  const [propertyType, setPropertyType] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.propertyType
      ? draft.propertyType
      : YACHT_PROPERTY_TYPES[0].label;
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.category
      ? draft.category
      : null;
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

    if (!selectedCategory) {
      setError("Please select a Yacht Job Type to continue.");
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
      propertySizeSqm,
      propertyType,
      category: selectedCategory,
      date,
      time,
      packages: [],
      items: [],
      supplySource: "company",
      addOnsTotal: 0,
      genderPreference: currentDraft?.genderPreference || "none",
      languagePreference: currentDraft?.languagePreference || "English",
      propertyClassification: propertyType,
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


      {/* 2. SELECT YOUR JOB TYPE */}
      <YachtCategorySelection
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          if (error) setError(null);
        }}
      />

      {/* 3. DATE & TIME PICKER */}
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

      {/* 1. PROPERTY TYPE & SIZE */}
      <PropertyTypeSizeSelector
        value={propertySizeSqm}
        onChange={setPropertySizeSqm}
        categories={YACHT_PROPERTY_TYPES}
        onCategoryChange={(cat: PropertyCategory) => setPropertyType(cat.label)}
      />

      {/* Validation Error Message */}
      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-50 p-4 text-center text-sm font-semibold text-red-600 shadow-sm">
          {error}
        </div>
      )}


      {/* 4. BOTTOM ACTION BUTTONS */}
      <div className="flex items-center justify-center gap-4 pt-2 mb-5">
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
          Book now
        </Button>
      </div>
    </div>
  );
}
