"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { DISINFECTION_LEVELS, DisinfectionLevelSection } from "@/components/booking/disinfection-level-section";
import { EventTypeSection } from "@/components/booking/event-type-section";
import { EquipmentSection, type SupplySource } from "@/components/booking/equipment-section";
import { FACILITY_CARDS, FacilitySelectionSection } from "@/components/booking/facility-selection-section";
import { JOB_CARD_CATEGORIES, JobCardSection } from "@/components/booking/job-card-section";
import { SecurityCategorySelection } from "@/components/booking/security-category-selection";
import { YachtCategorySelection } from "@/components/booking/yacht-category-selection";
import { GeneralSteamSection } from "@/components/booking/steam/general-steam-section";
import { IndustrialCommercialSteamSection } from "@/components/booking/steam/industrial-commercial-steam-section";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import {
  getPropertyCategoriesForService,
  PropertyCategory,
  PropertyTypeSizeSelector,
} from "@/components/booking/property-type-size-selector";
import { ServicePreferencesSection } from "@/components/booking/service-preferences-section";
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import { PageHero } from "@/components/page-hero";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import { ApiError } from "@/lib/auth-context";
import { saveBookingDraft } from "@/lib/booking-draft";
import {
  CatalogItem,
  CatalogServiceDetail,
  getServiceBySlug,
  getServiceQuote,
  ServiceAddOnPackage,
  SizeQuote,
} from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";
import { useCurrency } from "@/lib/currency-context";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
//import { ServicePreferencesSection } from "@/components/booking/service-preferences-section";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

/** Only healthguard-sanitization collects facility type + disinfection level. */
const SANITIZATION_SLUG = "healthguard-sanitization";

/** Only steam-cleaning collects General/Industrial & Commercial/Equipment category selections. */
const STEAM_SLUG = "steam-cleaning";

/** Only post-event-cleaning collects event type selections. */
const EVENT_SLUG = "post-event-cleaning";

/** High-Security Property Care picks one category instead of quantity-based items. */
const SECURITY_SLUG = "high-security-property-care";

/** Luxury Yacht Cleaning follows the same single-select category pattern as High-Security Property Care. */
const YACHT_SLUG = "luxury-yacht-cleaning";

//used for fallback data when the service API fails to return a service
const DEFAULT_PACKAGES: ServiceAddOnPackage[] = [
  { id: 101, name: "Deep Oven & Stove Detailing", price: "35.00", prices: [], image: null },
  { id: 102, name: "Interior Refrigerator Sanitation", price: "30.00", prices: [], image: null },
  { id: 103, name: "Interior Window & Track Cleaning", price: "40.00", prices: [], image: null },
  { id: 104, name: "Balcony & Terrace Scrubbing", price: "45.00", prices: [], image: null },
];

//used for fallback data when the service API fails to return a service
const DEFAULT_ITEMS: CatalogItem[] = [
  { id: 201, name: "BIO - SOLVENT", sku: "EQUIP-01", price: "13.00", prices: [], type: "equipment", image: null },
  { id: 202, name: "MOP (1 MOP)", sku: "EQUIP-02", price: "8.00", prices: [], type: "equipment", image: null },
  { id: 203, name: "MATERIALS (1 KIT)", sku: "EQUIP-03", price: "6.60", prices: [], type: "equipment", image: null },
  { id: 204, name: "VACUUM (1 VAC)", sku: "EQUIP-04", price: "10.00", prices: [], type: "equipment", image: null },
];

const FALLBACK_SERVICES: Record<string, CatalogServiceDetail> = {
  "regular-maintenance-cleaning": {
    id: 1,
    name: "regular-maintenance-cleaning",
    label: "Regular Maintenance Cleaning",
    price: "25.00",
    prices: [],
    status: "active",
    category: "property_care",
    description: "Routine home care for a fresh, tidy space.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: DEFAULT_PACKAGES.map((p) => ({ package: p })),
    serviceItems: DEFAULT_ITEMS.map((i) => ({ item: i })),
  },
};

export function ServiceBookingView({ serviceSlug }: { serviceSlug: string }) {
  const router = useRouter();
  const { country } = useCountry();
  const { symbol } = useCurrency();
  const isSanitization = serviceSlug === SANITIZATION_SLUG;
  const isSteam = serviceSlug === STEAM_SLUG;
  const isEvent = serviceSlug === EVENT_SLUG;
  const isSecurityCategory = serviceSlug === SECURITY_SLUG;
  const isYachtCategory = serviceSlug === YACHT_SLUG;
  const isCategoryQuote = isSecurityCategory || isYachtCategory;
  const serviceContent = SERVICE_CONTENT[serviceSlug];

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);

  const [supplySource, setSupplySource] = useState<SupplySource>("company");
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
  const [selectedEventTypes, setSelectedEventTypes] = useState<Set<string>>(new Set());

  /** Shared by High-Security Property Care and Luxury Yacht Cleaning's single-select category pickers. */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then((data) => {
        if (!data.isBookable) {
          setServiceError(`Book now for "${data.label}" isn't available yet.`);
          return;
        }
        const enhanced: CatalogServiceDetail = {
          ...data,
          servicePackages:
            data.servicePackages && data.servicePackages.length > 0
              ? data.servicePackages
              : DEFAULT_PACKAGES.map((p) => ({ package: p })),
          serviceItems:
            data.serviceItems && data.serviceItems.length > 0
              ? data.serviceItems
              : DEFAULT_ITEMS.map((i) => ({ item: i })),
        };
        setService(enhanced);
      })
      .catch((err) => {
        const fallback = FALLBACK_SERVICES[serviceSlug] ?? FALLBACK_SERVICES["regular-maintenance-cleaning"];
        if (fallback) {
          setService(fallback);
          setServiceError(null);
        } else {
          setServiceError(err instanceof ApiError ? err.message : "Service not found.");
        }
      });
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
          if (!cancelled) {
            const hours = Math.max(2, Math.ceil(propertySizeSqm / 30));
            const cleanerCount = propertySizeSqm > 150 ? 2 : 1;
            const rate = Number(service.price ?? 25);
            const priceMin = hours * rate * cleanerCount;
            setQuote({
              bookable: true,
              minHours: hours,
              maxHours: hours + 1,
              cleanerCount,
              extraCleanerCount: 0,
              priceMin,
              priceMax: (hours + 1) * rate * cleanerCount,
            });
          }
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
      if (next.has(id)) {
        next.delete(id);
      } else {
        const itemCat = JOB_CARD_CATEGORIES.find((c) => c.items.some((i) => i.id === id));
        if (itemCat) {
          const countInCat = itemCat.items.filter((i) => prev.has(i.id)).length;
          if (countInCat >= 2) return prev;
        }
        next.add(id);
      }
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

  const selectedPackages = JOB_CARD_CATEGORIES.flatMap((c) => c.items)
    .filter((item) => selectedPackageIds.has(item.id))
    .map((item) => ({ id: item.id, name: item.name, price: "35.00", prices: [], image: null }));
  const items = (service?.serviceItems ?? []).map((si) => si.item);
  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  // Customer-supplied equipment is disclosed in full (no picking, no charge);
  // company-supplied equipment is whatever the customer has actually added.
  const displayedEquipmentItems = supplySource === "customer" ? items : selectedItems;

  const facilityNames = Array.from(selectedFacilityIds)
    .map((id) => FACILITY_CARDS.find((c) => c.id === id)?.title)
    .filter((name): name is string => Boolean(name));

  const selectedDisinfectionLevel = DISINFECTION_LEVELS.find((l) => l.id === disinfectionLevelId);

  const addOnsTotal = [...selectedPackages, ...selectedItems].reduce((sum, entry) => {
    const price = entry.price !== null ? Number(entry.price) : NaN;
    return Number.isFinite(price) ? sum + price : sum;
  }, 0);

  function handleBookNow() {
    if (!service) return;
    if (isSanitization && selectedFacilityIds.size === 0) {
      setError("Please select at least one facility to continue.");
      return;
    }
    if (isSanitization && !disinfectionLevelId) {
      setError("Please select a package to continue.");
      return;
    }
    if (isSteam && selectedGeneralSteam.size === 0 && selectedIndustrialSteam.size === 0) {
      setError("Please select at least one steam cleaning job type to continue.");
      return;
    }
    if (isEvent && selectedEventTypes.size === 0) {
      setError("Please select at least one event type to continue.");
      return;
    }
    if (isCategoryQuote && !selectedCategory) {
      setError(
        isYachtCategory
          ? "Please select a yacht service category to continue."
          : "Please select a security service category to continue.",
      );
      return;
    }
    if (!date || !time) {
      setError("Please select a date and time above.");
      return;
    }
    if (!propertyType) {
      setError("Please select a property type above to continue.");
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
    setError(null);
    setSubmitting(true);
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
      items: displayedEquipmentItems.map((i) => ({
        name: i.name,
        price: i.price !== null ? Number(i.price) : null,
        image: i.image,
      })),
      supplySource,
      addOnsTotal: addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0),
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      propertyType: propertyType || undefined,
      facilities: isSanitization ? facilityNames : undefined,
      disinfectionLevel: selectedDisinfectionLevel
        ? { name: selectedDisinfectionLevel.title, price: selectedDisinfectionLevel.priceAdder }
        : undefined,
      steamItems: isSteam ? [...selectedGeneralSteam, ...selectedIndustrialSteam] : undefined,
      eventTypes: isEvent ? [...selectedEventTypes] : undefined,
      category: isCategoryQuote ? selectedCategory ?? undefined : undefined,
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

  const genderLabel = GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "No Preference";
  const languageLabel = LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "None";

  const bookDisabledReason = isSanitization && selectedFacilityIds.size === 0
    ? "Select at least one facility above to continue."
    : isSanitization && !disinfectionLevelId
      ? "Select a package above to continue."
      : isSteam && selectedGeneralSteam.size === 0 && selectedIndustrialSteam.size === 0
        ? "Select at least one steam cleaning job type above to continue."
        : isEvent && selectedEventTypes.size === 0
          ? "Select at least one event type above to continue."
          : isCategoryQuote && !selectedCategory
            ? "Select a job type above to continue."
            : !date || !time
              ? "Select a date and time above to continue."
              : !propertyType
                ? "Select a property type above to continue."
                : items.length > 0 && !supplySource
                  ? "Select a Cleaning Solvents & Equipment above to continue."
                  : supplySource === "company" && selectedItemIds.size === 0
                    ? "Add at least one Cleaning Solvent & Equipment item above to continue."
                    : undefined;

  return (
    <div className={`${poppins.className}  bg-[rgb(199,209,217)]`}>
      <PageHero
        image={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"}
        eyebrow="Book a service"
        title={service.label}
        subtitle={service.description ?? undefined}
      />

      <div className="mx-auto flex w-full  max-w-[1250px]  flex-col gap-6 px-6 md:px-2">
        {/* <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1 self-start text-sm text-brand-gold-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link> */}

        {serviceContent?.introduction && <ServiceIntroduction {...serviceContent.introduction} bgImage={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"} />}

        {serviceContent?.highlights?.map((group, index) => (
          <ServiceHighlights key={index} title={group.title} cards={group.cards}  />
        ))}

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

        {isSecurityCategory && (
          <SecurityCategorySelection selected={selectedCategory} onSelect={setSelectedCategory} />
        )}

        {isYachtCategory && (
          <YachtCategorySelection selected={selectedCategory} onSelect={setSelectedCategory} />
        )}

        {isEvent && (
          <EventTypeSection
            selectedTitles={selectedEventTypes}
            onToggle={(title) => toggleSetEntry(setSelectedEventTypes, title)}
          />
        )}

        {!isSanitization && !isSteam && !isEvent && !isCategoryQuote && (
          <JobCardSection
            packages={(service.servicePackages ?? []).map((sp) => sp.package)}
            selectedIds={selectedPackageIds}
            onToggle={togglePackage}
          />
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

        {(() => {
          const categories = getPropertyCategoriesForService(serviceSlug);
          const pTypeLower = (propertyType || "").toLowerCase();
          const activeCategory =
            categories.find(
              (c: PropertyCategory) =>
                pTypeLower.includes(c.id.toLowerCase()) ||
                pTypeLower.includes(c.label.toLowerCase()),
            ) ?? categories[0];

          return (
            <EquipmentSection
              propertyType={propertyType || activeCategory.label}
              categoryIcon={activeCategory.icon}
              propertySizeSqm={propertySizeSqm}
              quote={quote}
              hourlyRate={service.price}
              supplySource={supplySource}
              onSupplySourceChange={handleSupplySourceChange}
              items={items}
              selectedItemIds={selectedItemIds}
              onToggleItem={toggleItem}
              addOnsTotal={addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0)}
              onBookNow={handleBookNow}
              submitting={submitting}
              bookDisabledReason={bookDisabledReason}
            />
          );
        })()}
          
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    </div>
  );
}
