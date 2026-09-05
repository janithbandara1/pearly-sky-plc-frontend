"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  PropertyTypeSizeSelector,
  YACHT_PROPERTY_TYPES,
  type PropertyCategory,
} from "@/components/booking/Yatchpropertytypes";
import { YachtCategorySelection } from "@/components/booking/yacht-category-selection";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { EquipmentSection, type SupplySource } from "@/components/booking/equipment-section";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import { getServiceQuote, type CatalogItem, type SizeQuote } from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";

export interface YachtScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
  items?: CatalogItem[];
  hourlyRate?: string | null;
}

export function YachtScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
  items = [],
  hourlyRate = null,
}: YachtScheduleSectionProps) {
  const router = useRouter();
  const { country } = useCountry();

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

  const [gender, setGender] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.genderPreference
      ? draft.genderPreference
      : GENDER_OPTIONS[0].value;
  });

  const [language, setLanguage] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.languagePreference
      ? draft.languagePreference
      : LANGUAGE_OPTIONS[0].value;
  });

  const [requirements, setRequirements] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.specialRequirements || "" : "";
  });

  const [supplySource, setSupplySource] = useState<SupplySource>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.supplySource
      ? draft.supplySource
      : "company";
  });
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(new Set());

  const [quote, setQuote] = useState<SizeQuote | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      getServiceQuote(serviceId, propertySizeSqm, country)
        .then((q) => {
          if (!cancelled) setQuote(q);
        })
        .catch(() => {
          if (!cancelled) {
            const hours = Math.max(2, Math.ceil(propertySizeSqm / 30));
            const cleanerCount = propertySizeSqm > 150 ? 2 : 1;
            const rate = Number(hourlyRate ?? 25);
            setQuote({
              bookable: true,
              minHours: hours,
              maxHours: hours + 1,
              cleanerCount,
              extraCleanerCount: 0,
              priceMin: hours * rate * cleanerCount,
              priceMax: (hours + 1) * rate * cleanerCount,
            });
          }
        });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [serviceId, propertySizeSqm, country, hourlyRate]);

  function handleSupplySourceChange(value: SupplySource) {
    setSupplySource(value);
    if (value !== "company") setSelectedItemIds(new Set());
    if (error) setError(null);
  }

  function toggleItem(id: number) {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  const addOnsTotal = selectedItems.reduce((sum, entry) => {
    const price = entry.price !== null ? Number(entry.price) : NaN;
    return Number.isFinite(price) ? sum + price : sum;
  }, 0);

  const activeCategory =
    YACHT_PROPERTY_TYPES.find((c) => c.label === propertyType) ?? YACHT_PROPERTY_TYPES[0];

  const bookDisabledReason = !selectedCategory
    ? "Select a Yacht Job Type above to continue."
    : !date || !time
      ? "Select a date and time above to continue."
      : items.length > 0 && !supplySource
        ? "Select a Cleaning Solvents & Equipment above to continue."
        : supplySource === "company" && selectedItemIds.size === 0
          ? "Add at least one Cleaning Solvent & Equipment item above to continue."
          : undefined;

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

    if (items.length > 0 && !supplySource) {
      setError("Please select a Cleaning Solvents & Equipment above to continue.");
      return;
    }

    if (supplySource === "company" && selectedItemIds.size === 0) {
      setError("Add at least one Cleaning Solvent & Equipment item above to continue.");
      return;
    }

    const currentDraft = loadBookingDraft();

    setSubmitting(true);
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
      items: selectedItems.map((i) => ({
        name: i.name,
        price: i.price !== null ? Number(i.price) : null,
      })),
      supplySource: supplySource || "company",
      addOnsTotal,
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      propertyClassification: propertyType,
      serviceContinuityPlan: currentDraft?.serviceContinuityPlan,
      documentName: currentDraft?.documentName,
      documentData: currentDraft?.documentData,
      serviceSpecifics: currentDraft?.serviceSpecifics,
    });

    router.push(`/services/${serviceSlug}/checkout`);
  }

  return (
    <div className="w-full space-y-8">
      {/* 1. SELECT YOUR JOB TYPE */}
      <YachtCategorySelection
        selected={selectedCategory}
        onSelect={(cat) => {
          setSelectedCategory(cat);
          if (error) setError(null);
        }}
      />

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

      {/* 4. PROPERTY TYPE & SIZE */}
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

      {/* 5. SUMMARY, EQUIPMENT & BOOK NOW */}
      <EquipmentSection
        propertyType={propertyType || activeCategory.label}
        categoryIcon={activeCategory.icon}
        propertySizeSqm={propertySizeSqm}
        quote={quote}
        hourlyRate={hourlyRate}
        supplySource={supplySource}
        onSupplySourceChange={handleSupplySourceChange}
        items={items}
        selectedItemIds={selectedItemIds}
        onToggleItem={toggleItem}
        addOnsTotal={addOnsTotal}
        onBookNow={handleSchedule}
        submitting={submitting}
        bookDisabledReason={bookDisabledReason}
      />
    </div>
  );
}
