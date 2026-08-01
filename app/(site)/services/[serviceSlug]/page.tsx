"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { EquipmentSection, SupplySource } from "@/components/booking/equipment-section";
import { JobCardSection } from "@/components/booking/job-card-section";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import {
  getPropertyCategoriesForService,
  PropertyCategory,
  PropertyTypeSizeSelector,
} from "@/components/booking/property-type-size-selector";
import { OrderSummaryCard } from "@/components/booking/order-summary-card";
import { ServicePreferencesSection } from "@/components/booking/service-preferences-section";
import { PageHero } from "@/components/page-hero";
import { ApiError } from "@/lib/auth-context";
import { BookingFrequency } from "@/lib/booking-api";
import { saveBookingDraft } from "@/lib/booking-draft";
import {
  CatalogServiceDetail,
  getServiceBySlug,
  getServiceQuote,
  SizeQuote,
} from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function BookServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { country } = useCountry();

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);

  const [supplySource, setSupplySource] = useState<SupplySource>("");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(new Set());

  const [propertySizeSqm, setPropertySizeSqm] = useState(20);
  const [propertyType, setPropertyType] = useState("");
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);

  const [selectedPackageIds, setSelectedPackageIds] = useState<Set<number>>(new Set());
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const frequency: BookingFrequency = "one-time";
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [requirements, setRequirements] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then(setService)
      .catch((err) => setServiceError(err instanceof ApiError ? err.message : "Service not found."));
  }, [serviceSlug, country]);

  useEffect(() => {
    if (!service) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      setQuoteLoading(true);
      getServiceQuote(service.id, propertySizeSqm, country)
        .then((q) => {
          if (!cancelled) setQuote(q);
        })
        .catch(() => {
          if (!cancelled) setQuote({ bookable: false });
        })
        .finally(() => {
          if (!cancelled) setQuoteLoading(false);
        });
    }, 150);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [service, propertySizeSqm, country]);

  function togglePackage(id: number) {
    setSelectedPackageIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleItem(id: number) {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedPackages = (service?.servicePackages ?? [])
    .map((sp) => sp.package)
    .filter((pkg) => selectedPackageIds.has(pkg.id));
  const items = (service?.serviceItems ?? []).map((si) => si.item);
  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));

  const addOnsTotal = [...selectedPackages, ...selectedItems].reduce((sum, entry) => {
    const price = entry.price !== null ? Number(entry.price) : NaN;
    return Number.isFinite(price) ? sum + price : sum;
  }, 0);

  function handleBookNow() {
    if (!service) return;
    if (!supplySource) {
      setError("Please select a cleaning solvents & equipments option.");
      return;
    }
    if (!date || !time) {
      setError("Please select a date and time above.");
      return;
    }
    setError(null);
    setSubmitting(true);
    saveBookingDraft({
      serviceId: service.id,
      serviceSlug,
      serviceLabel: service.label,
      propertySizeSqm,
      date,
      time,
      frequency,
      packages: selectedPackages.map((p) => ({
        name: p.name,
        price: p.price !== null ? Number(p.price) : null,
      })),
      items: selectedItems.map((i) => ({ name: i.name })),
      supplySource,
      addOnsTotal,
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      propertyType: propertyType || undefined,
    });
    router.push(`/services/${serviceSlug}/checkout`);
  }

  if (serviceError) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-destructive">{serviceError}</div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const bookDisabledReason = !supplySource
    ? "Select a cleaning solvents & equipments option above to continue."
    : !date || !time
      ? "Select a date and time above to continue."
      : undefined;

  return (
    <div className={poppins.className}>
      <PageHero
        image={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"}
        eyebrow="Book a service"
        title={service.label}
        subtitle={service.description ?? undefined}
      />

      <div className="mx-auto flex w-full max-w-[1150px] flex-1 flex-col gap-6 p-4 sm:p-6">
        <div className="flex justify-start">
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border-[1.5px] border-[#A98B4B] bg-secondary px-4 text-sm font-medium text-secondary-foreground transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>
        </div>

        <JobCardSection
          packages={(service.servicePackages ?? []).map((sp) => sp.package)}
          selectedIds={selectedPackageIds}
          onToggle={togglePackage}
        />

        <EquipmentSection
          items={items}
          supplySource={supplySource}
          onSupplySourceChange={setSupplySource}
          selectedItemIds={selectedItemIds}
          onToggleItem={toggleItem}
        />

        <DateTimeSection date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />

        <ServicePreferencesSection
          gender={gender}
          onGenderChange={setGender}
          language={language}
          onLanguageChange={setLanguage}
          requirements={requirements}
          onRequirementsChange={setRequirements}
        />

        <PropertyTypeSizeSelector
          value={propertySizeSqm}
          onChange={setPropertySizeSqm}
          categories={getPropertyCategoriesForService(serviceSlug)}
          onCategoryChange={(cat: PropertyCategory) => setPropertyType(cat.dropdownLabel ?? cat.label)}
        />

        <OrderSummaryCard
          serviceLabel={service.label}
          frequency={frequency}
          hourlyRate={service.price}
          quote={quote}
          quoteLoading={quoteLoading}
          date={date}
          time={time}
          propertySizeSqm={propertySizeSqm}
          packages={selectedPackages.map((p) => ({
            name: p.name,
            price: p.price !== null ? Number(p.price) : null,
          }))}
          items={selectedItems.map((i) => ({ name: i.name }))}
          supplySource={supplySource}
          addOnsTotal={addOnsTotal}
          onBookNow={handleBookNow}
          submitting={submitting}
          bookDisabledReason={bookDisabledReason}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
