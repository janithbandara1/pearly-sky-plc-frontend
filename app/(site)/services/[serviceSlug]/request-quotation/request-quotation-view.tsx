"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import type { SupplySource } from "@/components/booking/equipment-section";
import {
  getPropertyCategoriesForService,
  PropertyCategory,
  PropertyTypeSizeSelector,
} from "@/components/booking/property-type-size-selector";
import { QuoteItemsSection } from "@/components/booking/quote-items-section";
import { CarpetItemCards } from "@/components/booking/carpet-item-cards";
import { PoolJobSelection } from "@/components/booking/pool-job-selection";
import { PressureWashingJobSelection } from "@/components/booking/pressure-washing-job-selection";
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiError, useAuth } from "@/lib/auth-context";
import { CatalogItem, CatalogServiceDetail, getServiceBySlug, withLocaleDefaults } from "@/lib/catalog-api";
import { calculateEquipmentItemPrice } from "@/lib/equipment-pricing";
import { CustomerAddress, getMyProfile, listMyAddresses } from "@/lib/customers-api";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import { createQuotation } from "@/lib/quotation-api";
import {
  CARPET_ITEM_OPTIONS,
  formatQuoteItem,
  POOL_ITEM_OPTIONS,
  PRESSURE_WASHING_ITEM_OPTIONS,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";

const CUSTOM_QUOTE_ITEMS: Record<
  string,
  { title: string; itemLabel?: string; options: QuoteItemOption[] }
> = {
  "pool-cleaning": { title: "Pool Details", options: POOL_ITEM_OPTIONS },
  "precision-pressure-washing": {
    title: "Job Details",
    itemLabel: "Job Type",
    options: PRESSURE_WASHING_ITEM_OPTIONS,
  },
  "carpet-upholstery-cleaning": {
    title: "Carpet & Upholstery Details",
    options: CARPET_ITEM_OPTIONS,
  },
};


/** Child Care and Elder Care are quote-only too — they collect per-person profiles instead of a property size. */
const CHILD_CARE_SLUG = "child-care-service";
const ELDER_CARE_SLUG = "elder-care-service";

/**
 * Laundry Services and Move-In / Move-Out Transport Service skip property scale,
 * allocated professionals, and cleaner duration, and collect a pickup + delivery
 * address instead of a single residence address.
 */
const PICKUP_DELIVERY_SLUGS = new Set([
  "laundry-service",
  "laundry-services",
  "laundry-linen-care",
  "move-in-out-transport-service",
  "move-in-out-transport-health",
]);

/** These have no required item — hide the section entirely rather than showing "Not specified" when nothing's been added. */
const HIDE_QUOTE_ITEMS_IF_EMPTY_SLUGS = new Set([
  "carpet-upholstery-cleaning",
  "pool-cleaning",
  "precision-pressure-washing",
]);

/** Move-In/Out Transport is logistics, not cleaning — no cleaning chemicals/equipment to choose. */
const HIDE_CHEM_EQUIP_SLUGS = new Set([
  "move-in-out-transport-service",
  "move-in-out-transport-health",
]);

const COUNTRY_NAMES: Record<CountryCode, string> = {
  fr: "France",
  de: "Germany",
  lu: "Luxembourg",
  nl: "Netherlands",
  fi: "Finland",
  se: "Sweden",
  it: "Italy",
  pl: "Poland",
  be: "Belgium",
  at: "Austria",
  dk: "Denmark",
  es: "Spain",
  pt: "Portugal",
  ro: "Romania",
  gb: "United Kingdom",
  us: "United States",
  ca: "Canada",
  au: "Australia",
  nz: "New Zealand",
  qa: "Qatar",
  sa: "Saudi Arabia",
  ae: "United Arab Emirates",
  om: "Oman",
  bh: "Bahrain",
  lk: "Sri Lanka",
};

/** Same country list (and country-flag-icons flags) as the navbar's CountrySwitcher/LocaleSwitcher and the checkout page's country select. */
const COUNTRY_OPTIONS = SUPPORTED_COUNTRIES.map((code) => ({
  code: code.toUpperCase(),
  name: FALLBACK_COUNTRY_NAMES[code],
  Flag: COUNTRY_FLAGS[code],
}));

// Gender preference values — labels are translated at render time via translate()
const GENDER_PREFERENCE_VALUES = [
  { value: "none", labelKey: "quotationGenderNone" as const },
  { value: "female", labelKey: "quotationGenderFemale" as const },
  { value: "male", labelKey: "quotationGenderMale" as const },
];

const LANGUAGE_COORDINATION_OPTIONS = [
  "English",
  "French",
  "Spanish",
  "German",
  "Italian",
  "Arabic",
  "Mandarin",
  "Russian",
  "Sinhala",
];

const FALLBACK_SERVICES: Record<string, Partial<CatalogServiceDetail>> = {
  "regular-home-cleaning": {
    id: 1,
    name: "regular-home-cleaning",
    label: "Regular Home Cleaning",
    description: "Routine home care for a fresh, tidy space.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
  },
  "regular-maintenance-cleaning": {
    id: 1,
    name: "regular-maintenance-cleaning",
    label: "Regular Home Cleaning",
    description: "Routine home care for a fresh, tidy space.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
  },
  "essential-touch-up-cleaning": {
    id: 2,
    name: "essential-touch-up-cleaning",
    label: "Essential Touch-Up Cleaning",
    description: "A quick clean to restore a polished look.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp",
  },
  "quick-touch-up-cleaning": {
    id: 2,
    name: "quick-touch-up-cleaning",
    label: "Essential Touch-Up Cleaning",
    description: "A quick clean to restore a polished look.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp",
  },
  "same-day-priority-cleaning": {
    id: 3,
    name: "same-day-priority-cleaning",
    label: "Same-Day Priority Cleaning",
    description: "Fast, reliable cleaning on short notice.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-3-last-minute-cleaning.webp",
  },
  "deep-cleaning": {
    id: 4,
    name: "deep-cleaning",
    label: "Deep Cleaning",
    description: "A detailed top-to-bottom clean for a spotless finish.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-4-deep-cleaning.webp",
  },
  "end-of-tenancy-cleaning": {
    id: 5,
    name: "end-of-tenancy-cleaning",
    label: "End of Tenancy Cleaning",
    description: "Ideal for move-ins, move-outs, and final inspections.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-5-move-in-out-cleaning.webp",
  },
  "post-construction-renovation-cleaning": {
    id: 6,
    name: "post-construction-renovation-cleaning",
    label: "Post-Construction & Renovation Cleaning",
    description: "Removes dust and debris after works.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-6-post-construction-renovation-cleaning.webp",
  },
  "premium-rental-concierge-cleaning": {
    id: 7,
    name: "premium-rental-concierge-cleaning",
    label: "Premium Rental Concierge Cleaning",
    description: "High-end cleaning for luxury rentals.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-7-airbnb-short-term-rental-cleaning.webp",
  },
  "commercial-office-cleaning": {
    id: 8,
    name: "commercial-office-cleaning",
    label: "Commercial & Office Cleaning",
    description: "Professional cleaning for business spaces.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-8-commercial-office-cleaning.webp",
  },
  "steam-cleaning": {
    id: 11,
    name: "steam-cleaning",
    label: "Steam Cleaning",
    description: "A hygienic steam-based deep clean.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-11-steam-cleaning.webp",
  },
  "post-event-cleaning": {
    id: 12,
    name: "post-event-cleaning",
    label: "Post-Event Cleaning",
    description: "Cleanup after events and celebrations.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-12-post-event-cleaning.webp",
  },
  "luxury-yacht-cleaning": {
    id: 16,
    name: "luxury-yacht-cleaning",
    label: "Luxury Yacht Cleaning",
    description: "Premium cleaning for yachts and marine interiors.",
    imageUrl: "/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp",
  },
};

const SERVICE_TRANSLATION_KEYS: Record<
  string,
  { label: TranslationKey; description: TranslationKey }
> = {
  "regular-home-cleaning": {
    label: "serviceRegularHomeCleaning",
    description: "serviceRegularHomeCleaningDescription",
  },
  "regular-maintenance-cleaning": {
    label: "serviceRegularHomeCleaning",
    description: "serviceRegularHomeCleaningDescription",
  },
  "quick-touch-up-cleaning": {
    label: "serviceEssentialTouchUpCleaning",
    description: "serviceEssentialTouchUpCleaningDescription",
  },
  "essential-touch-up-cleaning": {
    label: "serviceEssentialTouchUpCleaning",
    description: "serviceEssentialTouchUpCleaningDescription",
  },
  "same-day-priority-cleaning": {
    label: "serviceSameDayPriorityCleaning",
    description: "serviceSameDayPriorityCleaningDescription",
  },
  "deep-cleaning": {
    label: "serviceDeepCleaning",
    description: "serviceDeepCleaningDescription",
  },
  "end-of-tenancy-cleaning": {
    label: "serviceEndOfTenancyCleaning",
    description: "serviceEndOfTenancyCleaningDescription",
  },
  "post-construction-renovation-cleaning": {
    label: "servicePostConstructionRenovationCleaning",
    description: "servicePostConstructionRenovationCleaningDescription",
  },
  "post-construction-cleaning": {
    label: "servicePostConstructionRenovationCleaning",
    description: "servicePostConstructionRenovationCleaningDescription",
  },
  "premium-rental-concierge-cleaning": {
    label: "servicePremiumRentalConciergeCleaning",
    description: "servicePremiumRentalConciergeCleaningDescription",
  },
  "commercial-office-cleaning": {
    label: "serviceCommercialOfficeCleaning",
    description: "serviceCommercialOfficeCleaningDescription",
  },
  "healthguard-sanitization": {
    label: "serviceHealthguardSanitization",
    description: "serviceHealthguardSanitizationDescription",
  },
  "guard-sanitization-services": {
    label: "serviceHealthguardSanitization",
    description: "serviceHealthguardSanitizationDescription",
  },
  "carpet-upholstery-cleaning": {
    label: "serviceCarpetUpholsteryCleaning",
    description: "serviceCarpetUpholsteryCleaningDescription",
  },
  "steam-cleaning": {
    label: "serviceSteamCleaning",
    description: "serviceSteamCleaningDescription",
  },
  "post-event-cleaning": {
    label: "servicePostEventCleaning",
    description: "servicePostEventCleaningDescription",
  },
  "pool-cleaning": {
    label: "servicePoolCleaning",
    description: "servicePoolCleaningDescription",
  },
  "pool-cleaning-maintenance": {
    label: "servicePoolCleaning",
    description: "servicePoolCleaningDescription",
  },
  "precision-pressure-washing": {
    label: "servicePrecisionPressureWashing",
    description: "servicePrecisionPressureWashingDescription",
  },
  "child-care-service": {
    label: "serviceChildCareService",
    description: "serviceChildCareServiceDescription",
  },
  "childcare-services": {
    label: "serviceChildCareService",
    description: "serviceChildCareServiceDescription",
  },
  "elder-care-service": {
    label: "serviceElderCareService",
    description: "serviceElderCareServiceDescription",
  },
  "elder-care-services": {
    label: "serviceElderCareService",
    description: "serviceElderCareServiceDescription",
  },
  "laundry-service": {
    label: "serviceLaundryService",
    description: "serviceLaundryServiceDescription",
  },
  "laundry-services": {
    label: "serviceLaundryService",
    description: "serviceLaundryServiceDescription",
  },
  "laundry-linen-care": {
    label: "serviceLaundryService",
    description: "serviceLaundryServiceDescription",
  },
  "move-in-out-transport-service": {
    label: "serviceMoveInOutTransportService",
    description: "serviceMoveInOutTransportServiceDescription",
  },
  "move-in-out-transport-health": {
    label: "serviceMoveInOutTransportService",
    description: "serviceMoveInOutTransportServiceDescription",
  },
  "high-security-property-care": {
    label: "serviceHighSecurityPropertyCare",
    description: "serviceHighSecurityPropertyCareDescription",
  },
  "luxury-yacht-cleaning": {
    label: "serviceLuxuryYachtCleaning",
    description: "serviceLuxuryYachtCleaningDescription",
  },
};

export function RequestQuotationView({ serviceSlug }: { serviceSlug: string }) {
  const router = useRouter();
  const { translate, registerServiceSlugs } = useLanguage();
  const { country } = useCountry();
  const { status, accessToken } = useAuth();

  const customQuote = CUSTOM_QUOTE_ITEMS[serviceSlug];
  const isPickupDeliveryService = PICKUP_DELIVERY_SLUGS.has(serviceSlug);
  const hideChemEquip = HIDE_CHEM_EQUIP_SLUGS.has(serviceSlug);

  const serviceContent =
    SERVICE_CONTENT[serviceSlug] ??
    SERVICE_CONTENT["regular-home-cleaning"];

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [serviceError, setServiceError] = useState<string | null>(null);

  // Form states
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [supplySource, setSupplySource] = useState<SupplySource>("customer");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(new Set());

  const [propertySizeSqm, setPropertySizeSqm] = useState(20);
  const [propertyType, setPropertyType] = useState("Studio");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const [numCleaners, setNumCleaners] = useState(1);
  const [durationHours, setDurationHours] = useState(2);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [requirements, setRequirements] = useState("");

  // Contact profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Location of the residence
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unit, setUnit] = useState("");

  // Delivery location (laundry-services / move-in-out-transport-service only)
  const [deliveryCountry, setDeliveryCountry] = useState("France");
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryProvince, setDeliveryProvince] = useState("");
  const [deliveryStreetAddress, setDeliveryStreetAddress] = useState("");
  const [deliveryUnit, setDeliveryUnit] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then((data) => {
        setService(data);
      })
      .catch(() => {
        // Use fallback service data for seamless rendering
        const fallback = FALLBACK_SERVICES[serviceSlug];
        if (fallback) {
          setService(
            withLocaleDefaults({
              id: fallback.id ?? 1,
              name: fallback.name ?? serviceSlug,
              label: fallback.label ?? "Service",
              description: fallback.description ?? null,
              imageUrl: fallback.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
              price: null,
              prices: [],
              status: "active",
              category: "residential_cleaning",
              isBookable: true,
              isQuotable: true,
              servicePackages: [],
              serviceItems: [],
            }),
          );
        } else {
          setServiceError("Service not found.");
        }
      });
  }, [serviceSlug, country]);

  // Tells the language switcher this service's locale-specific slugs, so
  // switching language lands on e.g. "nettoyage-regulier" instead of keeping
  // "regular-home-cleaning" — see registerServiceSlugs in language-context.tsx.
  useEffect(() => {
    if (!service) return;
    registerServiceSlugs({ baseSlug: service.name, locales: service.locales });
    return () => registerServiceSlugs(null);
  }, [service, registerServiceSlugs]);

  // Prefill contact & address for authenticated customers
  useEffect(() => {
    if (status !== "authenticated" || !accessToken) return;
    Promise.all([getMyProfile(accessToken), listMyAddresses(accessToken)])
      .then(([profileData, addressList]) => {
        if (profileData) {
          setFirstName(profileData.firstName || "");
          setLastName(profileData.lastName || "");
          setEmail(profileData.email || "");
          if (profileData.contact) setPhoneNumber(profileData.contact);
        }
        if (addressList && addressList[0]) {
          const primary = addressList[0];
          setStreetAddress(primary.streetAddress || "");
          setUnit(primary.unit || "");
          setCity(primary.city || "");
          setProvince(primary.state || "");
          setPostalCode(primary.postalCode || "");
          if (primary.country) setSelectedCountry(primary.country);
        }
      })
      .catch(() => undefined);
  }, [status, accessToken]);

  function toggleEquipmentItem(id: number) {
    setSelectedItemIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!date) next.date = translate("quotationErrDate");
    if (!time) next.time = translate("quotationErrTime");
    if (!firstName.trim()) next.firstName = translate("quotationErrFirstName");
    if (!lastName.trim()) next.lastName = translate("quotationErrLastName");
    if (!email.trim()) next.email = translate("quotationErrEmail");
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = translate("quotationErrEmailInvalid");
    if (!phoneNumber.trim()) next.phoneNumber = translate("quotationErrPhone");
    if (!selectedCountry.trim()) next.selectedCountry = translate("quotationErrCountry");
    if (!postalCode.trim()) next.postalCode = translate("quotationErrPostal");
    if (!city.trim()) next.city = translate("quotationErrCity");
    if (!province.trim()) next.province = translate("quotationErrProvince");
    if (!streetAddress.trim()) next.streetAddress = translate("quotationErrStreet");

    if (isPickupDeliveryService) {
      if (!deliveryCountry.trim()) next.deliveryCountry = translate("quotationErrCountry");
      if (!deliveryPostalCode.trim()) next.deliveryPostalCode = translate("quotationErrPostal");
      if (!deliveryCity.trim()) next.deliveryCity = translate("quotationErrCity");
      if (!deliveryProvince.trim()) next.deliveryProvince = translate("quotationErrProvince");
      if (!deliveryStreetAddress.trim()) next.deliveryStreetAddress = translate("quotationErrStreet");
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstError = Object.values(errors)[0] || translate("quotationErrFillRequired");
      setSubmitError(firstError);
      return;
    }

    if (!service) return;

    const items = (service.serviceItems ?? []).map((si) => si.item);
    const selectedItems =
      supplySource === "customer"
        ? items
        : supplySource === "company"
          ? items.filter((item) => selectedItemIds.has(item.id))
          : [];

    const quoteItemLines = customQuote
      ? quoteItems.map((item) => formatQuoteItem(item, customQuote.options))
      : undefined;

    setSubmitting(true);
    try {
      const quotation = await createQuotation({
        serviceId: service.id,
        date: date || undefined,
        time: time || undefined,
        propertyType: customQuote || isPickupDeliveryService ? undefined : propertyType || undefined,
        propertySizeSqm: customQuote || isPickupDeliveryService ? undefined : propertySizeSqm,
        quoteItemsTitle: customQuote?.title,
        quoteItems: quoteItemLines,
        supplySource: supplySource || undefined,
        equipmentItems: selectedItems.length
          ? selectedItems.map((i) => ({
            name: i.name,
            price: calculateEquipmentItemPrice(
              i,
              customQuote || isPickupDeliveryService ? undefined : propertySizeSqm,
            ),
          }))
          : undefined,
        numCleaners: isPickupDeliveryService ? undefined : numCleaners,
        durationHours: isPickupDeliveryService ? undefined : durationHours,
        genderPreference: gender || undefined,
        languagePreference: language || undefined,
        specialRequirements: requirements.trim() || undefined,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim(),
        contact: phoneNumber.trim(),
        streetAddress: streetAddress.trim(),
        unit: unit.trim() || undefined,
        city: city.trim(),
        state: province.trim() || undefined,
        country: selectedCountry,
        postalCode: postalCode.trim() || undefined,
        deliveryStreetAddress: isPickupDeliveryService ? deliveryStreetAddress.trim() : undefined,
        deliveryUnit: isPickupDeliveryService ? deliveryUnit.trim() || undefined : undefined,
        deliveryCity: isPickupDeliveryService ? deliveryCity.trim() : undefined,
        deliveryState: isPickupDeliveryService ? deliveryProvince.trim() || undefined : undefined,
        deliveryCountry: isPickupDeliveryService ? deliveryCountry : undefined,
        deliveryPostalCode: isPickupDeliveryService ? deliveryPostalCode.trim() || undefined : undefined,
      });

      setShowSuccessToast(true);

      setTimeout(() => {
        router.push(`/quotation-confirmation/${quotation.id}?ref=${encodeURIComponent(quotation.accessToken)}`);
      }, 1500);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : translate("quotationErrSubmitFailed"));
    } finally {
      setSubmitting(false);
    }
  }

  if (serviceError && !service) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-destructive font-medium">
        {translate("quotationErrServiceNotFound")}
      </div>
    );
  }

  const currentHeroImage =
    service?.imageUrl ??
    FALLBACK_SERVICES[serviceSlug]?.imageUrl ??
    "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp";

  const currentServiceLabelKey = SERVICE_TRANSLATION_KEYS[serviceSlug];
  const currentServiceLabel = currentServiceLabelKey
    ? translate(currentServiceLabelKey.label)
    : service?.label ??
    FALLBACK_SERVICES[serviceSlug]?.label ??
    "Regular Home Cleaning";

  const currentServiceDescription = currentServiceLabelKey
    ? translate(currentServiceLabelKey.description)
    : service?.description ??
    FALLBACK_SERVICES[serviceSlug]?.description ??
    "Regular Basic Cleaning";

  return (
    <main className="flex-1 bg-[#f5fafa] pb-16 font-sans">
      {/* Floating Success Toast Matching Image 3 */}
      {showSuccessToast && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2.5 rounded-lg bg-[#2E7D32] px-6 py-3.5 text-white shadow-2xl">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-white" />
            <span className="text-sm font-semibold tracking-wide">
              {translate("quotationSuccessToast")}
            </span>
          </div>
        </div>
      )}

      {/* Hero Banner Section Matching Image 2 */}
      <div className="mx-auto w-full max-w-11xl ">
        <div className="relative h-[15vh] md:min-h-[75vh] md:max-h-[80vh] w-full overflow-hidden sm:rounded-b-4xl">
          <Image
            src={currentHeroImage}
            alt={currentServiceLabel}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover border border-[rgb(169,139,75)]"
          />
          <div className="absolute inset-0 hidden bg-black/25 backdrop-blur-[0.5px] md:block" />

          {/* Mobile Compact Back + Title Bar (matches the service pages' mobile hero) */}
          <div className="absolute top-1/2 left-3 z-10 flex -translate-y-1/2 items-center gap-2.5 border-2 border-[rgb(169,139,75)] bg-[rgb(18,30,45)] px-5 py-4 md:hidden">
            <Link href="/" className="inline-flex shrink-0 items-center gap-2">
              <Image src="/images/services/service-back.svg" alt="Back" width={20} height={20} />
            </Link>
            <h1 className="min-w-0 truncate text-base font-bold tracking-tight text-[#c29b38]">
              {currentServiceLabel}
            </h1>
          </div>

          {/* Badge in Hero (desktop) */}
          <div className="absolute inset-0 hidden flex-col items-start justify-center p-4 text-left sm:p-8 md:flex">
            <div className="inline-block rounded-xl sm:rounded-2xl bg-[#121E2D]/95 px-6 py-2.5 sm:px-10 sm:py-3.5 shadow-2xl backdrop-blur-md">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-wide text-brand-gold">
                {currentServiceLabel}
              </h1>
            </div>
            <div className="mt-3 hidden  rounded-xl border border-white/20 bg-black/40 px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white/90 shadow-md backdrop-blur-md">
              <p>{currentServiceDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Introduction & Highlights Sections Matching Image 2 */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
        {serviceContent?.introduction && (
          <ServiceIntroduction
            headline={serviceContent.introduction.headline}
            body={
              Array.isArray(serviceContent.introduction.body)
                ? serviceContent.introduction.body
                : [serviceContent.introduction.body]
            }
            bgImage={currentHeroImage}
          />
        )}

        {serviceContent?.highlights?.map((group, index) => (
          <ServiceHighlights
            key={index}
            title={group.title}
            cards={group.cards}
          />
        ))}

        {/* MAIN SERVICE REQUEST DETAILS FORM BOX */}
        <div className="mx-auto w-full max-w-7xl rounded-2xl sm:rounded-3xl border-2 border-[#A98B4B] bg-[#FFFDF4] p-5 sm:p-8 md:p-10 shadow-sm">
          <h2 className="mb-6 text-center sm:text-left text-base sm:text-lg font-bold uppercase tracking-wider text-[#121E2D]">
            {translate("quotationFormTitle")}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* 1. Date & Time */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brand-navy">{translate("quotationStep1DateTime")}</p>
              <DateTimeSection
                date={date}
                onDateChange={(newDate) => {
                  setDate(newDate);
                  if (errors.date) setErrors((prev) => ({ ...prev, date: "" }));
                }}
                time={time}
                onTimeChange={(newTime) => {
                  setTime(newTime);
                  if (errors.time) setErrors((prev) => ({ ...prev, time: "" }));
                }}
              />
              {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
              {errors.time && <p className="text-xs text-destructive">{errors.time}</p>}
            </div>

            {/* 2. Chemical and Equipment */}
            {!hideChemEquip && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-brand-navy">
                  {translate("quotationStep2ChemEquip")}
                </Label>
                <Select
                  value={supplySource}
                  onValueChange={(val) => setSupplySource(val as SupplySource)}
                >
                  <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder={translate("quotationChemEquipPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A98B4B]/30">
                    <SelectItem value="customer">{translate("quotationChemCustomer")}</SelectItem>
                    <SelectItem value="company">{translate("quotationChemCompany")}</SelectItem>
                  </SelectContent>
                </Select>

                {/* Equipment Items Toggle when Request the Company is selected */}
                {supplySource === "company" && service?.serviceItems && service.serviceItems.length > 0 && (
                  <div className="mt-3 rounded-xl border border-[#A98B4B]/30 bg-white p-4 space-y-2.5">
                    <p className="text-xs font-semibold text-[#121E2D]">{translate("quotationSelectEquipMaterials")}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.serviceItems.map(({ item }) => {
                        const isChecked = selectedItemIds.has(item.id);
                        return (
                          <label
                            key={item.id}
                            className="flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-gray-200 p-2.5 hover:bg-gray-50 text-xs text-[#121E2D]"
                          >
                            <span className="font-medium">{item.name}</span>
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => toggleEquipmentItem(item.id)}
                              className="border-[#A98B4B] data-[state=checked]:bg-[#A98B4B]"
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Property Scale / Service Specific Details */}
            {!isPickupDeliveryService && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brand-navy">{translate("quotationStep3PropertyScale")}</p>
              {serviceSlug === "carpet-upholstery-cleaning" ? (
                <CarpetItemCards items={quoteItems} onItemsChange={setQuoteItems} />
              ) : serviceSlug === "pool-cleaning" ? (
                <PoolJobSelection items={quoteItems} onItemsChange={setQuoteItems} />
              ) : serviceSlug === "precision-pressure-washing" ? (
                <PressureWashingJobSelection items={quoteItems} onItemsChange={setQuoteItems} />
              ) : customQuote ? (
                <QuoteItemsSection
                  title={customQuote.title}
                  itemLabel={customQuote.itemLabel}
                  itemOptions={customQuote.options}
                  items={quoteItems}
                  onItemsChange={setQuoteItems}
                />
              ) : (
                <PropertyTypeSizeSelector
                  value={propertySizeSqm}
                  onChange={setPropertySizeSqm}
                  categories={getPropertyCategoriesForService(serviceSlug)}
                  onCategoryChange={(cat: PropertyCategory) =>
                    setPropertyType(cat.dropdownLabel ?? cat.label)
                  }
                />
              )}
            </div>
            )}

            {/* 4 & 5. Allocated professionals & Cleaner duration */}
            {!isPickupDeliveryService && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 4. Allocated professionals */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  {translate("quotationStep4AllocatedPros")}
                </Label>
                <div className="flex h-11 items-center justify-between rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] px-4 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setNumCleaners((prev) => Math.max(1, prev - 1))}
                    disabled={numCleaners <= 1}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-110 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-bold text-brand-navy">{numCleaners}</span>
                  <button
                    type="button"
                    onClick={() => setNumCleaners((prev) => Math.min(10, prev + 1))}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-110"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* 5. Cleaner duration */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  {translate("quotationStep5CleanerDuration")}
                </Label>
                <div className="flex h-11 items-center justify-between rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] px-4 shadow-inner">
                  <button
                    type="button"
                    onClick={() => setDurationHours((prev) => Math.max(1, prev - 1))}
                    disabled={durationHours <= 1}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-110 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-bold text-brand-navy">{durationHours}h</span>
                  <button
                    type="button"
                    onClick={() => setDurationHours((prev) => Math.min(12, prev + 1))}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-110"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
            )}

            {/* Staff Gender Preference & Linguistic Coordination */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Staff Gender Preference */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  {hideChemEquip ? "2." : isPickupDeliveryService ? "3." : "6."} {translate("quotationStepGenderPref")}
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder={translate("quotationSelectOption")} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A98B4B]/30">
                    {GENDER_PREFERENCE_VALUES.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {translate(g.labelKey)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Linguistic Coordination */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  {hideChemEquip ? "3." : isPickupDeliveryService ? "4." : "7."} {translate("quotationStepLinguistic")}
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder={translate("quotationSelectOption")} />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A98B4B]/30">
                    {LANGUAGE_COORDINATION_OPTIONS.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Service Requirements & Specifics */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-navy">
                {hideChemEquip ? "4." : isPickupDeliveryService ? "5." : "8."} {translate("quotationStepRequirements")}
              </Label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder={translate("quotationRequirementsPlaceholder")}
                className="h-24 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] p-3 text-xs sm:text-sm text-brand-navy shadow-inner placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
              />
            </div>

            {/* CONTACT PROFILE SECTION */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121E2D]">
                {translate("quotationContactProfile")}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationFirstName")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    placeholder={translate("quotationFirstNamePlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationLastName")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    placeholder={translate("quotationLastNamePlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationEmail")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder={translate("quotationEmailPlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationPhoneNumber")} <span className="text-red-500">*</span>
                  </Label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                    }}
                    placeholder={translate("quotationPhonePlaceholder")}
                    className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] px-3 text-xs sm:text-sm text-brand-navy placeholder:text-muted-foreground shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>

            {/* LOCATION OF THE RESIDENCE / PICKUP LOCATION SECTION */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121E2D]">
                {isPickupDeliveryService ? translate("quotationPickupLocation") : translate("quotationLocationResidence")}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationSelectCountry")} <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder={translate("quotationSelectCountry")} />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {COUNTRY_OPTIONS.map((c) => (
                        <SelectItem key={c.code} value={c.name}>
                          <span className="flex items-center gap-2">
                            <c.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                            {c.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationPostalCode")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: "" }));
                    }}
                    placeholder={translate("quotationPostalCodePlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationCity")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                    }}
                    placeholder={translate("quotationCityPlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationProvinceState")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      if (errors.province) setErrors((prev) => ({ ...prev, province: "" }));
                    }}
                    placeholder={translate("quotationProvincePlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.province && <p className="text-xs text-destructive">{errors.province}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    {translate("quotationStreetAddress")} <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                      if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: "" }));
                    }}
                    placeholder={translate("quotationStreetPlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.streetAddress && <p className="text-xs text-destructive">{errors.streetAddress}</p>}
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <Label className="text-xs font-medium text-brand-navy/90">{translate("quotationUnit")}</Label>
                  <Input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder={translate("quotationUnitPlaceholder")}
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>
              </div>
            </div>

            {/* DELIVERY LOCATION SECTION (laundry-services / move-in-out-transport-service only) */}
            {isPickupDeliveryService && (
              <div className="space-y-4 pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#121E2D]">
                  {translate("quotationDeliveryLocation")}
                </h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-navy/90">
                      {translate("quotationSelectCountry")} <span className="text-red-500">*</span>
                    </Label>
                    <Select value={deliveryCountry} onValueChange={setDeliveryCountry}>
                      <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                        <SelectValue placeholder={translate("quotationSelectCountry")} />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#A98B4B]/30">
                        {COUNTRY_OPTIONS.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            <span className="flex items-center gap-2">
                              <c.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                              {c.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-navy/90">
                      {translate("quotationPostalCode")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={deliveryPostalCode}
                      onChange={(e) => {
                        setDeliveryPostalCode(e.target.value);
                        if (errors.deliveryPostalCode) setErrors((prev) => ({ ...prev, deliveryPostalCode: "" }));
                      }}
                      placeholder={translate("quotationPostalCodePlaceholder")}
                      className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                    {errors.deliveryPostalCode && <p className="text-xs text-destructive">{errors.deliveryPostalCode}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-navy/90">
                      {translate("quotationCity")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={deliveryCity}
                      onChange={(e) => {
                        setDeliveryCity(e.target.value);
                        if (errors.deliveryCity) setErrors((prev) => ({ ...prev, deliveryCity: "" }));
                      }}
                      placeholder={translate("quotationCityPlaceholder")}
                      className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                    {errors.deliveryCity && <p className="text-xs text-destructive">{errors.deliveryCity}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-navy/90">
                      {translate("quotationProvinceState")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={deliveryProvince}
                      onChange={(e) => {
                        setDeliveryProvince(e.target.value);
                        if (errors.deliveryProvince) setErrors((prev) => ({ ...prev, deliveryProvince: "" }));
                      }}
                      placeholder={translate("quotationProvincePlaceholder")}
                      className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                    {errors.deliveryProvince && <p className="text-xs text-destructive">{errors.deliveryProvince}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-navy/90">
                      {translate("quotationStreetAddress")} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      value={deliveryStreetAddress}
                      onChange={(e) => {
                        setDeliveryStreetAddress(e.target.value);
                        if (errors.deliveryStreetAddress) setErrors((prev) => ({ ...prev, deliveryStreetAddress: "" }));
                      }}
                      placeholder={translate("quotationStreetPlaceholder")}
                      className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                    {errors.deliveryStreetAddress && <p className="text-xs text-destructive">{errors.deliveryStreetAddress}</p>}
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-navy/90">{translate("quotationUnit")}</Label>
                    <Input
                      value={deliveryUnit}
                      onChange={(e) => setDeliveryUnit(e.target.value)}
                      placeholder={translate("quotationUnitPlaceholder")}
                      className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-medium text-destructive border border-red-200">
                {submitError}
              </div>
            )}

            {/* SUBMIT BUTTON Matching Image 2 */}
            <Button
              type="submit"
              disabled={submitting}
              className="mt-2 h-12 sm:h-14 w-full rounded-xl bg-[#A98B4B] text-xs sm:text-sm font-bold tracking-widest text-white shadow-lg transition hover:bg-[#8F7034] hover:brightness-110 uppercase"
            >
              {submitting ? translate("quotationSubmitting") : translate("quotationSubmit")}
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[8px] border border-[#C5A253] bg-white px-10 py-2 text-md font-semibold text-[#0B1528] shadow-sm transition hover:bg-[#F8F9FA]"
          >
            {translate("quotationBack")}
          </Link>
        </div>
      </div>
    </main>
  );
}
