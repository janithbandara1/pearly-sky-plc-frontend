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
import { JobCardSection } from "@/components/booking/job-card-section";
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
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import { PageHero } from "@/components/page-hero";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import { ApiError } from "@/lib/auth-context";
import { saveBookingDraft } from "@/lib/booking-draft";
import {
  CatalogServiceDetail,
  getServiceBySlug,
  getServiceQuote,
  ServiceAddOnPackage,
  SizeQuote,
} from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";
import { useCurrency } from "@/lib/currency-context";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import { EventbookSection } from "@/components/booking/event/EventbookSection";

import { CareScheduleSection } from "@/components/booking/care-schedule-section";
import { CarpetScheduleSection } from "@/components/booking/carpet/carpet-schedule-section";
import { PoolScheduleSection } from "@/components/booking/pool/pool-schedule-section";
import { PressureWashingScheduleSection } from "@/components/booking/pressure-washing/pressure-washing-schedule-section";
import { YachtScheduleSection } from "@/components/booking/yacht/yacht-schedule-section";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

/** Only healthguard-sanitization collects facility type + disinfection level. */
const SANITIZATION_SLUG = "healthguard-sanitization";

/** Only steam-cleaning collects General/Industrial & Commercial/Equipment category selections. */
const STEAM_SLUG = "steam-cleaning";

/** Only post-event-cleaning collects event type selections. */
const EVENT_SLUG = "post-event-cleaning";

/** High-Security Property Care picks one category instead of quantity-based items. */
const SECURITY_SLUG = "high-security-property-care";

/** Luxury Yacht Cleaning follows the dedicated yacht flow. */
const YACHT_SLUG = "luxury-yacht-cleaning";

/** Care and quotation services with dedicated scheduling and profile flows. */
const CHILD_CARE_SLUG = "child-care-service";
const ELDER_CARE_SLUG = "elder-care-service";
const CARPET_UPHOLSTERY_SLUG = "carpet-upholstery-cleaning";
const POOL_CLEANING_SLUG = "pool-cleaning";
const PRESSURE_WASHING_SLUG = "precision-pressure-washing";

//used for fallback data when the service API fails to return a service
const DEFAULT_PACKAGES: ServiceAddOnPackage[] = [
  { id: 101, name: "Deep Oven & Stove Detailing", image: null, category: "deep_and_specialized_cleaning" },
  { id: 102, name: "Interior Refrigerator Sanitation", image: null, category: "deep_and_specialized_cleaning" },
  { id: 103, name: "Interior Window & Track Cleaning", image: null, category: "general_interior_maintenance" },
  { id: 104, name: "Balcony & Terrace Scrubbing", image: null, category: "outdoor_and_exterior_spaces" },
];

const FALLBACK_SERVICES: Record<string, CatalogServiceDetail> = {
  "child-care-service": {
    id: 17,
    name: "child-care-service",
    label: "Child Care Service",
    price: "30.00",
    prices: [],
    status: "active",
    category: "care_and_concierge",
    description: "Trusted support for families.",
    imageUrl: "/images/services/updated-care-support-services-1-child-care-service.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "elder-care-service": {
    id: 18,
    name: "elder-care-service",
    label: "Elder Care Service",
    price: "30.00",
    prices: [],
    status: "active",
    category: "care_and_concierge",
    description: "Respectful support for elderly clients.",
    imageUrl: "/images/services/updated-care-support-services-2-elder-care-service.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "carpet-upholstery-cleaning": {
    id: 5,
    name: "carpet-upholstery-cleaning",
    label: "Carpet & Upholstery Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "Professional Restoration for Your Home & Interiors",
    imageUrl: "/images/services/updated-home-property-cleaning-services-5-carpet-upholstery-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "pool-cleaning": {
    id: 9,
    name: "pool-cleaning",
    label: "Pool Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "Expert pool cleaning and water sanitation services.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-9-swimming-pool-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "precision-pressure-washing": {
    id: 10,
    name: "precision-pressure-washing",
    label: "Precision Pressure Washing",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "High-pressure exterior surface restoration.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-10-high-pressure-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "luxury-yacht-cleaning": {
    id: 16,
    name: "luxury-yacht-cleaning",
    label: "Luxury Yacht Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "commercial_and_specialized_cleaning",
    description: "Premium marine detailing and yacht interior care.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  },
  "regular-maintenance-cleaning": {
    id: 1,
    name: "regular-maintenance-cleaning",
    label: "Regular Home Cleaning",
    price: "25.00",
    prices: [],
    status: "active",
    category: "residential_cleaning",
    description: "Routine home care for a fresh, tidy space.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: DEFAULT_PACKAGES.map((p) => ({ package: p })),
    serviceItems: [],
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
  const isCategoryQuote = isSecurityCategory;
  const isChildCare = serviceSlug === CHILD_CARE_SLUG;
  const isElderCare = serviceSlug === ELDER_CARE_SLUG;
  const isCarpetService = serviceSlug === CARPET_UPHOLSTERY_SLUG;
  const isPoolCleaning = serviceSlug === POOL_CLEANING_SLUG;
  const isPressureWashing = serviceSlug === PRESSURE_WASHING_SLUG;
  const isYachtService = serviceSlug === YACHT_SLUG;
  const isCareService = isChildCare || isElderCare;
  const isFlowService =
    isCareService ||
    isCarpetService ||
    isPoolCleaning ||
    isPressureWashing ||
    isYachtService; 
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
        if (!data.isBookable && !isFlowService) {
          setServiceError(`Book now for "${data.label}" isn't available yet.`);
          return;
        }
        const enhanced: CatalogServiceDetail = {
          ...data,
          servicePackages:
            data.servicePackages && data.servicePackages.length > 0
              ? data.servicePackages
              : DEFAULT_PACKAGES.map((p) => ({ package: p })),
          serviceItems: data.serviceItems ?? [],
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
  }, [serviceSlug, country, isFlowService]);

  useEffect(() => {
    if (!service || isFlowService) return;
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
        const allPackages = (service?.servicePackages ?? []).map((sp) => sp.package);
        const clicked = allPackages.find((pkg) => pkg.id === id);
        if (clicked) {
          const countInCat = allPackages.filter(
            (pkg) => pkg.category === clicked.category && prev.has(pkg.id),
          ).length;
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

  const allPackages = (service?.servicePackages ?? []).map((sp) => sp.package);
  const selectedPackages = allPackages.filter((pkg) => selectedPackageIds.has(pkg.id));
  const items = (service?.serviceItems ?? []).map((si) => si.item);
  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  // Customer-supplied equipment is disclosed in full (no picking, no charge);
  // company-supplied equipment is whatever the customer has actually added.
  const displayedEquipmentItems = supplySource === "customer" ? items : selectedItems;

  const facilityNames = Array.from(selectedFacilityIds)
    .map((id) => FACILITY_CARDS.find((c) => c.id === id)?.title)
    .filter((name): name is string => Boolean(name));

  const selectedDisinfectionLevel = DISINFECTION_LEVELS.find((l) => l.id === disinfectionLevelId);

  const addOnsTotal = selectedItems.reduce((sum, entry) => {
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
        price: null,
      })),
      items: displayedEquipmentItems.map((i) => ({
        name: i.name,
        price: i.price !== null ? Number(i.price) : null,
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

  const getServiceName=()=>{
    if(serviceSlug==="regular-home-cleaning") return "serviceRegularHomeCleaning"
    if(serviceSlug==="healthguard-sanitization") return "serviceHealthguardSanitization"
    if(serviceSlug==="carpet-upholstery-cleaning") return "serviceCarpetUpholsteryCleaning"
    if(serviceSlug==="steam-cleaning") return "serviceSteamCleaning"
    if(serviceSlug==="post-event-cleaning") return "servicePostEventCleaning"
    if(serviceSlug==="high-security-property-care") return "serviceHighSecurityPropertyCare"
    if(serviceSlug==="luxury-yacht-cleaning") return "serviceLuxuryYachtCleaning"
    if(serviceSlug==="child-care-service") return "serviceChildCareService"
    if(serviceSlug==="elder-care-service") return "serviceElderCareService"
    if(serviceSlug==="pool-cleaning") return "servicePoolCleaning"
    if(serviceSlug==="precision-pressure-washing") return "servicePrecisionPressureWashing"
    if(serviceSlug==="commercial-office-cleaning") return "serviceCommercialCleaningServices"
    if(
      serviceSlug === "move-in-out-transport-service" ||
      serviceSlug === "move-in-out-transport-health"
    ) return "serviceMoveInOutTransportService"
    if(serviceSlug==="quick-touch-up-cleaning") return "serviceEssentialTouchUpCleaning"
    if(serviceSlug==="deep-cleaning") return "serviceDeepCleaning"
    if(serviceSlug==="end-of-tenancy-cleaning") return "serviceEndOfTenancyCleaning"
    if(serviceSlug==="post-construction-renovation-cleaning") return "servicePostConstructionCleaning"
    if(serviceSlug==="premium-rental-concierge-cleaning") return "servicePremiumRentalConciergeCleaning"
    if(
      serviceSlug === "laundry-service" ||
      serviceSlug === "laundry-services" ||
      serviceSlug === "laundry-linen-care"
    ) return "serviceLaundryService"
    if(serviceSlug==="same-day-priority-cleaning") return "serviceSameDayPriorityCleaning"
    return service.label
  } 

  return (
    <div className={`${poppins.className}  bg-[rgb(199,209,217)]`}>
      <PageHero
        image={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"}
        eyebrow="Book a service"
        title={getServiceName()}
        subtitle={service.description ?? undefined}
        servicePrices={service.prices}
        serviceId={service.id}
        hidePriceSelector={isPoolCleaning || isCareService || isCarpetService || isPressureWashing}
      />

      <div className="mx-auto flex w-full  max-w-[1250px]  flex-col gap-6 px-6 md:px-2">
        {/* <Link
          href="/"
          className="mb-2 inline-flex items-center gap-1 self-start text-sm text-brand-gold-dark hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link> */}

        {(!isFlowService || isPoolCleaning || isCareService) && serviceContent?.introduction && (
          <ServiceIntroduction
            {...serviceContent.introduction}
            body={
              Array.isArray(serviceContent.introduction.body)
                ? serviceContent.introduction.body
                : [serviceContent.introduction.body]
            }
            bgImage={
              service.imageUrl ??
              "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"
            }
          />
        )}

        {serviceContent?.highlights?.map((group, index) => (
          <ServiceHighlights key={index} cards={group.cards} />
        ))}

        {isCarpetService ? (
          <CarpetScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
          />
        ) : isPoolCleaning ? (
          <PoolScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
          />
        ) : isPressureWashing ? (
          <PressureWashingScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
          />
        ) : isYachtService ? (
          <YachtScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
            items={items}
            hourlyRate={service.price}
          />
        ) : isCareService ? (
          <CareScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
          />
        ) : (
          <>
            {isSanitization && (
              <FacilitySelectionSection selectedIds={selectedFacilityIds} onToggle={toggleFacility} />
            )}

            {isSanitization && (
              <DisinfectionLevelSection selectedId={disinfectionLevelId} onSelect={(level) => setDisinfectionLevelId(level.id)} />
            )}

            {isSteam && (
              <div className="w-full bg-[#121E2D] rounded-[12px]">
                <GeneralSteamSection
                  selectedTitles={selectedGeneralSteam}
                  onToggle={(title) => toggleSetEntry(setSelectedGeneralSteam, title)}
                />
                <IndustrialCommercialSteamSection
                  selectedTitles={selectedIndustrialSteam}
                  onToggle={(title) => toggleSetEntry(setSelectedIndustrialSteam, title)}
                />
              </div>
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
                packages={allPackages}
                selectedIds={selectedPackageIds}
                onToggle={togglePackage}
              />
            )}

            <DateTimeSection date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />

            <PropertyTypeSizeSelector
              value={propertySizeSqm}
              onChange={setPropertySizeSqm}
              categories={getPropertyCategoriesForService(serviceSlug)}
              onCategoryChange={(cat: PropertyCategory) => setPropertyType(cat.dropdownLabel ?? cat.label)}
            />
            

            {isEvent ? ((() => {
              const categories = getPropertyCategoriesForService(serviceSlug);
              const pTypeLower = (propertyType || "").toLowerCase();
              const activeCategory =
                categories.find(
                  (c: PropertyCategory) =>
                    pTypeLower.includes(c.id.toLowerCase()) ||
                    pTypeLower.includes(c.label.toLowerCase()),
                ) ?? categories[0];

              return (
                <EventbookSection
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
            })()) :
              (() => {
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
          </>
        )}
      </div>
    </div>
  );
}
