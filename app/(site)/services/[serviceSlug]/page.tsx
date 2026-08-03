"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { DISINFECTION_LEVELS, DisinfectionLevelSection } from "@/components/booking/disinfection-level-section";
import { EquipmentSection, SupplySource } from "@/components/booking/equipment-section";
import { FACILITY_CARDS, FacilitySelectionSection } from "@/components/booking/facility-selection-section";
import { JobCardSection } from "@/components/booking/job-card-section";
import { GeneralSteamSection } from "@/components/booking/steam/general-steam-section";
import { IndustrialCommercialSteamSection } from "@/components/booking/steam/industrial-commercial-steam-section";
import { SteamEquipmentSection } from "@/components/booking/steam/steam-equipment-section";
import { EventTypeSection } from "@/components/booking/event/event-type-section";
import {
  ProductsSuppliesSection,
  selectedEventProductsFromQuantities,
} from "@/components/booking/event/products-supplies-section";
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
import { saveBookingDraft } from "@/lib/booking-draft";
import {
  CatalogServiceDetail,
  getServiceBySlug,
  getServiceQuote,
  SizeQuote,
} from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

/** Only healthguard-sanitization collects facility type + disinfection level. */
const SANITIZATION_SLUG = "healthguard-sanitization";

/** Only steam-cleaning collects General/Industrial & Commercial/Equipment category selections. */
const STEAM_SLUG = "steam-cleaning";

/** Only post-event-cleaning collects event type + products & supplies selections. */
const EVENT_SLUG = "post-event-cleaning";

export default function BookServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { country } = useCountry();
  const isSanitization = serviceSlug === SANITIZATION_SLUG;
  const isSteam = serviceSlug === STEAM_SLUG;
  const isEvent = serviceSlug === EVENT_SLUG;

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
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [requirements, setRequirements] = useState("");

  const [selectedFacilityIds, setSelectedFacilityIds] = useState<Set<string>>(new Set());
  const [disinfectionLevelId, setDisinfectionLevelId] = useState("");

  const [selectedGeneralSteam, setSelectedGeneralSteam] = useState<Set<string>>(new Set());
  const [selectedIndustrialSteam, setSelectedIndustrialSteam] = useState<Set<string>>(new Set());
  const [selectedSteamEquipment, setSelectedSteamEquipment] = useState<Set<string>>(new Set());

  const [selectedEventTypes, setSelectedEventTypes] = useState<Set<string>>(new Set());
  const [eventProductQuantities, setEventProductQuantities] = useState<Record<string, number>>({});

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

  function handleSupplySourceChange(value: SupplySource) {
    setSupplySource(value);
    // Added items only make sense once the company is supplying equipment —
    // drop any leftover picks so they don't silently linger in the total.
    if (value !== "company") setSelectedItemIds(new Set());
  }

  function toggleItem(id: number) {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleFacility(id: string) {
    setSelectedFacilityIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSetEntry(setter: Dispatch<SetStateAction<Set<string>>>, value: string) {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  const selectedPackages = (service?.servicePackages ?? [])
    .map((sp) => sp.package)
    .filter((pkg) => selectedPackageIds.has(pkg.id));
  const items = (service?.serviceItems ?? []).map((si) => si.item);
  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  // Customer-supplied equipment is disclosed in full (no picking, no charge);
  // company-supplied equipment is whatever the customer has actually added.
  const displayedEquipmentItems = supplySource === "customer" ? items : selectedItems;

  const selectedDisinfectionLevel = DISINFECTION_LEVELS.find((l) => l.id === disinfectionLevelId);

  const selectedEventProducts = selectedEventProductsFromQuantities(eventProductQuantities);
  const eventProductsTotal = selectedEventProducts.reduce((sum, p) => sum + p.price, 0);

  const addOnsTotal = [...selectedPackages, ...selectedItems].reduce((sum, entry) => {
    const price = entry.price !== null ? Number(entry.price) : NaN;
    return Number.isFinite(price) ? sum + price : sum;
  }, 0);

  function handleBookNow() {
    if (!service) return;
    if (!isSanitization && !isSteam && !isEvent && !supplySource) {
      setError("Please select a cleaning solvents & equipments option.");
      return;
    }
    if (isSanitization && selectedFacilityIds.size === 0) {
      setError("Please select at least one facility to continue.");
      return;
    }
    if (isSanitization && !disinfectionLevelId) {
      setError("Please select a desired service level to continue.");
      return;
    }
    if (!date || !time) {
      setError("Please select a date and time above.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const facilityNames = Array.from(selectedFacilityIds)
      .map((id) => FACILITY_CARDS.find((c) => c.id === id)?.title)
      .filter((name): name is string => Boolean(name));
    saveBookingDraft({
      serviceId: service.id,
      serviceSlug,
      serviceLabel: service.label,
      propertySizeSqm,
      date,
      time,
      packages: selectedPackages.map((p) => ({
        name: p.name,
        price: p.price !== null ? Number(p.price) : null,
      })),
      items: isEvent
        ? selectedEventProducts.map((p) => ({ name: p.name }))
        : displayedEquipmentItems.map((i) => ({ name: i.name })),
      supplySource,
      addOnsTotal:
        addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0) + (isEvent ? eventProductsTotal : 0),
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      propertyType: propertyType || undefined,
      facilities: isSanitization ? facilityNames : undefined,
      disinfectionLevel: selectedDisinfectionLevel
        ? { name: selectedDisinfectionLevel.title, price: selectedDisinfectionLevel.priceAdder }
        : undefined,
      steamItems: isSteam
        ? [...selectedGeneralSteam, ...selectedIndustrialSteam, ...selectedSteamEquipment]
        : undefined,
      eventTypes: isEvent ? [...selectedEventTypes] : undefined,
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

  const bookDisabledReason = !isSanitization && !isSteam && !isEvent && !supplySource
    ? "Select a cleaning solvents & equipments option above to continue."
    : isSanitization && selectedFacilityIds.size === 0
      ? "Select at least one facility above to continue."
      : isSanitization && !disinfectionLevelId
        ? "Select a desired service level above to continue."
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

        {isSanitization && (
          <FacilitySelectionSection selectedIds={selectedFacilityIds} onToggle={toggleFacility} />
        )}

        {isSanitization && (
          <DisinfectionLevelSection selectedId={disinfectionLevelId} onSelect={(level) => setDisinfectionLevelId(level.id)} />
        )}

        {isSteam && (
          <GeneralSteamSection
            selectedTitles={selectedGeneralSteam}
            onToggle={(title) => toggleSetEntry(setSelectedGeneralSteam, title)}
          />
        )}

        {isSteam && (
          <IndustrialCommercialSteamSection
            selectedTitles={selectedIndustrialSteam}
            onToggle={(title) => toggleSetEntry(setSelectedIndustrialSteam, title)}
          />
        )}

        {isSteam && (
          <SteamEquipmentSection
            selectedNames={selectedSteamEquipment}
            onToggle={(name) => toggleSetEntry(setSelectedSteamEquipment, name)}
          />
        )}

        {isEvent && (
          <EventTypeSection
            selectedLabels={selectedEventTypes}
            onToggle={(label) => toggleSetEntry(setSelectedEventTypes, label)}
          />
        )}

        {isEvent && (
          <ProductsSuppliesSection
            quantities={eventProductQuantities}
            onQuantitiesChange={setEventProductQuantities}
          />
        )}

        {!isSanitization && !isSteam && !isEvent && (
          <JobCardSection
            packages={(service.servicePackages ?? []).map((sp) => sp.package)}
            selectedIds={selectedPackageIds}
            onToggle={togglePackage}
          />
        )}

        {!isSanitization && !isSteam && !isEvent && (
          <EquipmentSection supplySource={supplySource} onSupplySourceChange={handleSupplySourceChange} />
        )}

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
          hourlyRate={service.price}
          quote={quote}
          quoteLoading={quoteLoading}
          date={date}
          time={time}
          propertySizeSqm={propertySizeSqm}
          packages={[
            ...selectedPackages.map((p) => ({
              name: p.name,
              price: p.price !== null ? Number(p.price) : null,
            })),
            ...(selectedDisinfectionLevel
              ? [{ name: selectedDisinfectionLevel.title, price: selectedDisinfectionLevel.priceAdder || null }]
              : []),
          ]}
          items={
            isEvent
              ? selectedEventProducts.map((p) => ({ name: p.name }))
              : displayedEquipmentItems.map((i) => ({ name: i.name }))
          }
          supplySource={supplySource}
          equipmentOptions={!isEvent && supplySource === "company" ? items : undefined}
          selectedEquipmentIds={selectedItemIds}
          onToggleEquipment={toggleItem}
          addOnsTotal={
            addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0) + (isEvent ? eventProductsTotal : 0)
          }
          onBookNow={handleBookNow}
          submitting={submitting}
          bookDisabledReason={bookDisabledReason}
        />

        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
