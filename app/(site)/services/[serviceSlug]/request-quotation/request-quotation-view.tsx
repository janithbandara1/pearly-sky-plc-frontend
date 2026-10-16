"use client";

import Link from "@/components/locale-link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Minus, Plus } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import type { SupplySource } from "@/components/booking/equipment-section";
import {
  getPropertyCategoriesForService,
  PropertyCategory,
  PropertyTypeSizeSelector,
  RESIDENTIAL_QUOTATION_MAX_SQM,
  RESIDENTIAL_QUOTATION_SIZES,
} from "@/components/booking/property-type-size-selector";
import { QuoteItemsSection } from "@/components/booking/quote-items-section";
import { CarpetItemCards } from "@/components/booking/carpet-item-cards";
import { PoolJobSelection } from "@/components/booking/pool-job-selection";
import { PressureWashingJobSelection } from "@/components/booking/pressure-washing-job-selection";
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import TermsAndConditions from "@/components/booking/termsandConditionPops/terms-condition-pop-up";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiError, useAuth } from "@/lib/auth-context";
import { CatalogItem, CatalogServiceDetail, getServiceBySlug, SizeQuote, withLocaleDefaults } from "@/lib/catalog-api";
import { calculateEquipmentItemPrice, EQUIPMENT_MAX_QTY } from "@/lib/equipment-pricing";
import { CustomerAddress, getMyProfile, listMyAddresses } from "@/lib/customers-api";
import { CURRENT_COUNTRY, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import { createQuotation } from "@/lib/quotation-api";
import {
  CheckoutAttachmentUpload,
  hasPendingAttachmentUploads,
  uploadedAttachments,
  type CheckoutAttachment,
} from "@/components/booking/checkout-attachment-upload";
import {
  CARPET_ITEM_OPTIONS,
  formatQuoteItem,
  POOL_ITEM_OPTIONS,
  PRESSURE_WASHING_ITEM_OPTIONS,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";
import { getPropertyCategoriesForServiceOfSanitize, PropertyTypeSizeSelectorCommonFlowOfServices } from "@/components/booking/common-flows-propertis-and-equipments/common-property-types";

import { applyDeepCleanToQuote, applyDeepCleanToRate } from "@/lib/deep-clean";
import { isCommonPropertyTypeFlow } from "@/lib/service-flows";
import { ServicePropertyCategoriesEnums } from "@/lib/booking-draft";
import { RoomCounts } from "@/components/booking/room-components-counter";
import { EquipmentSectionOfCommonServicesSlugs } from "@/components/booking/common-flows-propertis-and-equipments/common-equipment-flow-section";
import { DISINFECTION_LEVELS } from "@/components/booking/disinfection-level-section";
import { HeroPriceSelector } from "@/components/hero-price-selector";
import { PageHero } from "@/components/page-hero";


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
  gb: "United Kingdom",
  lk: "Sri Lanka",
};

/** Single-item on purpose — this deployment only ever serves CURRENT_COUNTRY, so the "select country" field below has nothing else to offer (see checkout page's matching country select). */
const COUNTRY_OPTIONS = [
  {
    code: CURRENT_COUNTRY.toUpperCase(),
    name: FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY],
    Flag: COUNTRY_FLAGS[CURRENT_COUNTRY],
  },
];

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
  const { language: siteLanguage, translate, registerServiceSlugs } = useLanguage();
  const { country } = useCountry();
  const { status, accessToken } = useAuth();

  const customQuote = CUSTOM_QUOTE_ITEMS[serviceSlug];
  const isPickupDeliveryService = PICKUP_DELIVERY_SLUGS.has(serviceSlug) || false;
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
  // Residential services quote up to 5000 m² (booking stops at 500 m²), with
  // wider steps past 500 m² so the wheel gets there quickly. Memoized:
  // the selector resets its category whenever it gets a new categories array.
  const isResidentialService = service?.category === "residential_cleaning";
  const sizeCategories = useMemo(() => {
    const categories = getPropertyCategoriesForService(serviceSlug);
    return isResidentialService
      ? categories.map((category) => ({
          ...category,
          max: RESIDENTIAL_QUOTATION_MAX_SQM,
          sizes: RESIDENTIAL_QUOTATION_SIZES,
        }))
      : categories;
  }, [serviceSlug, isResidentialService]);
  const [propertyType, setPropertyType] = useState("Studio");
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

  const [numCleaners, setNumCleaners] = useState(1);
  const [durationHours, setDurationHours] = useState(2);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [requirements, setRequirements] = useState("");
  const [attachments, setAttachments] = useState<CheckoutAttachment[]>([]);

  // Contact profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Location of the residence — locked to this deployment's own country (see CURRENT_COUNTRY)
  const [selectedCountry, setSelectedCountry] = useState(FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY]);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unit, setUnit] = useState("");

  // Delivery location (laundry-services / move-in-out-transport-service only) — locked to CURRENT_COUNTRY too
  const [deliveryCountry, setDeliveryCountry] = useState(FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY]);
  const [deliveryPostalCode, setDeliveryPostalCode] = useState("");
  const [deliveryCity, setDeliveryCity] = useState("");
  const [deliveryProvince, setDeliveryProvince] = useState("");
  const [deliveryStreetAddress, setDeliveryStreetAddress] = useState("");
  const [deliveryUnit, setDeliveryUnit] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  //new property type section states for quotation
   const [quote, setQuote] = useState<SizeQuote | null>(null);
   const [deepClean, setDeepClean] = useState(false);
   const [disinfection, setDisinfection] = useState(false);
   const [serviceCategory, setServiceCategory] = 
     useState<ServicePropertyCategoriesEnums[keyof ServicePropertyCategoriesEnums] | string>("residential");
  
    const [rooms, setRooms] = useState<RoomCounts>({});
    /*store service frequency*/
    const [selectServiceFrequency, setSelectServiceFrequency] = useState<string | null>(null);
    const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});
    const [disinfectionLevelId, setDisinfectionLevelId] = useState("");
     
   const isCommonPropertyTypeServices = isCommonPropertyTypeFlow(serviceSlug); 
   const appliedDeepClean = isCommonPropertyTypeServices && deepClean;
   const pricedQuote = applyDeepCleanToQuote(quote, appliedDeepClean);

   const pricedRate = applyDeepCleanToRate(service?.price ?? null, appliedDeepClean);
    const items = (service?.serviceItems ?? []).map((si) => si.item);
    const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  // Customer-supplied equipment is disclosed in full (no picking, no charge);
  // company-supplied equipment is whatever the customer has actually added.
    const displayedEquipmentItems = supplySource === "customer" ? items : selectedItems;

     const equipmentQty = (id: number) => itemQuantities[id] ?? 1;
      const equipmentLinePrice = (item: (typeof items)[number]) =>
        calculateEquipmentItemPrice(item, propertySizeSqm) * (isCommonPropertyTypeServices ? equipmentQty(item.id) : 1);
      const equipmentLineName = (item: (typeof items)[number]) =>
        isCommonPropertyTypeServices && selectedItemIds.has(item.id) && equipmentQty(item.id) > 1
          ? `${item.name} × ${equipmentQty(item.id)}`
          : item.name;

    const addOnsTotal = selectedItems.reduce((sum, entry) => sum + equipmentLinePrice(entry), 0);

    const selectedDisinfectionLevel = DISINFECTION_LEVELS.find((l) => l.id === disinfectionLevelId);
 

    function handleSupplySourceChange(value: SupplySource) {
        setSupplySource(value);
        // Added items only make sense once the company is supplying equipment —
        // drop any leftover picks so they don't silently linger in the total.
        if (value !== "company") {
          setSelectedItemIds(new Set());
          setItemQuantities({});
        }
      }

    // Steam/sanitization/post-construction flow: 1–EQUIPMENT_MAX_QTY units per item; 0 removes it
      function setItemQuantity(id: number, qty: number) {
        const clamped = Math.max(0, Math.min(EQUIPMENT_MAX_QTY, qty));
        setItemQuantities((prev) => {
          const next = { ...prev };
          if (clamped === 0) delete next[id];
          else next[id] = clamped;
          return next;
        });
        setSelectedItemIds((prev) => {
          const next = new Set(prev);
          if (clamped === 0) next.delete(id);
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
    if (!agreedToTerms) next.agreedToTerms = translate("quotationErrTerms");

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

    if (hasPendingAttachmentUploads(attachments)) {
      setSubmitError(translate("preferencesAttachmentsWait"));
      return;
    }

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
        language: siteLanguage,
        attachments: uploadedAttachments(attachments),
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


    //handle number of cleaners
    const handleNumCleanersChangeDecrement = ():void => {
      setNumCleaners((prev) => Math.max(1, prev - 1));
    }

    const handleCleanersChangeIncrement = ():void => {
      setNumCleaners((prev) => Math.min(10, prev + 1))
    }


    //handle number of cleaning hours
    const handelNumberOfCleaningHoursChangeDecrement = ():void => {
      setDurationHours((prev) => Math.max(1, prev - 1))
    }
    const handelNumberOfCleaningHoursChangeIncrement = ():void => {
      setDurationHours((prev) => Math.min(24, prev + 1))
    }

  return (
    <main className="flex-1 bg-[rgb(199,209,217)] pb-16 font-sans">
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

      <PageHero
        image={service?.imageUrl ?? currentHeroImage}
        eyebrow="Request a quotation"
        title={currentServiceLabel}
        subtitle={service?.description ?? currentServiceDescription}
        servicePrices={service?.prices}
        serviceId={service?.id} 
      />

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
        <div className="mx-auto w-full max-w-7xl rounded-2xl sm:rounded-3xl border-2 border-[#A98B4B] bg-[#070d1b] p-5 sm:p-8 md:p-10 shadow-sm">
          <h2 className="mb-6 text-center sm:text-left text-base sm:text-lg font-bold uppercase tracking-wider text-gray-300">
            {translate("quotationFormTitle")}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* 1. Date & Time */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-400">{translate("quotationStep1DateTime")}</p>
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
              <div className="space-y-2 hidden">
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
            <div className="space-y-2 hidden">
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
                  categories={sizeCategories}
                  onCategoryChange={(cat: PropertyCategory) =>
                    setPropertyType(cat.dropdownLabel ?? cat.label)
                  }
                />
              )}
            </div>
            )}

            {/* 4 & 5. Allocated professionals & Cleaner duration */}
            {!isPickupDeliveryService && (
            <div className="grid grid-cols-1 hidden gap-4 sm:grid-cols-2">
              {/* 4. Allocated professionals */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  {translate("quotationStep4AllocatedPros")}
                </Label>
                <div className="flex h-11 items-center justify-between rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] px-4 shadow-inner">
                  <button
                    type="button"
                    onClick={handleNumCleanersChangeDecrement}
                    disabled={numCleaners <= 1}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-[#A98B4B] text-white transition hover:brightness-110 disabled:opacity-40"
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="text-sm font-bold text-brand-navy">{numCleaners}</span>
                  <button
                    type="button"
                    onClick={handleCleanersChangeIncrement}
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

            

            
            

            {/**Structure of property type selector ,allows maximun 5000m and no price calculation */}
            <PropertyTypeSizeSelectorCommonFlowOfServices 
              value={propertySizeSqm}
              onChange={setPropertySizeSqm}
              serviceSlug={serviceSlug}
              categories={getPropertyCategoriesForServiceOfSanitize(serviceSlug)}
              onCategoryChange={(cat: PropertyCategory) => setPropertyType(cat.dropdownLabel ?? cat.label)}
              quote={pricedQuote}
              deepClean={deepClean}
              onDeepCleanChange={setDeepClean}
              disinfection={disinfection}
              onDisinfectionChange={setDisinfection}
              onServiceCategoryChange={setServiceCategory}
              rooms={rooms}
              onRoomsChange={setRooms}
              selectServiceFrequency={selectServiceFrequency}
              setSelectServiceFrequency={setSelectServiceFrequency}
              isQuote={true}
            />

            {!hideChemEquip && (() => {
              const categories = getPropertyCategoriesForServiceOfSanitize(serviceSlug);
              const pTypeLower = (propertyType || "").toLowerCase();
              const activeCategory =
                categories.find(
                  (c: PropertyCategory) =>
                    pTypeLower.includes(c.id.toLowerCase()) ||
                    pTypeLower.includes(c.label.toLowerCase()),
                ) ?? categories[0]
              return (
                <EquipmentSectionOfCommonServicesSlugs
                  propertyType={propertyType || activeCategory.label}
                  categoryIcon={activeCategory.icon}
                  propertySizeSqm={propertySizeSqm}
                  quote={pricedQuote}
                  hourlyRate={pricedRate}
                  supplySource={supplySource}
                  onSupplySourceChange={handleSupplySourceChange}
                  items={items} 
                  selectedItemIds={selectedItemIds}
                  itemQuantities={itemQuantities}
                  onQuantityChange={setItemQuantity}
                  addOnsTotal={addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0)}
                  
                  isQuote={true}
                  isPickupDeliveryServiceQuotation={isPickupDeliveryService}
                  onChangeSetNumCleanersIncrementQuotation={handleCleanersChangeIncrement}
                  onChangeSetNumCleanerDecrementQuotation={handleNumCleanersChangeDecrement}
                  numCleaners={numCleaners}
                  onChangeNumberOfCleaningHoursChangeDecrement={handelNumberOfCleaningHoursChangeDecrement}
                  onChangeNumberOfCleaningHoursChangeIncrement={handelNumberOfCleaningHoursChangeIncrement}
                  durationHours={durationHours}
                  gender={gender}
                  onGenderChange={setGender}
                  genderPreferenceValues={GENDER_PREFERENCE_VALUES.map((g) => ({
                    value: g.value,
                    label: translate(g.labelKey),
                  }))}
                  language={language}
                  onLanguageChange={setLanguage}
                  languageCoordinationOptions={LANGUAGE_COORDINATION_OPTIONS}
                  requirements={requirements}
                  onRequirementsChange={setRequirements}
                  attachments={attachments}
                  onAttachmentsChange={setAttachments}
                  hideChemEquip={hideChemEquip}
                  isPickupDeliveryService={isPickupDeliveryService}
                />
              );
            })()}

            {/* CONTACT PROFILE SECTION */}
            <div className="overflow-hidden rounded-2xl border border-brand-gold bg-[#0c1628] shadow-xl">
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-blue-900/40 bg-[#121E2D] px-5 py-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f305e] border border-blue-900/40">
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400/80">Step</p>
                  <h3 className="text-sm font-bold tracking-wide text-slate-100">{translate("quotationContactProfile")}</h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {/* First Name */}
                <div className="space-y-1.5 ">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {translate("quotationFirstName")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    placeholder={translate("quotationFirstNamePlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.firstName && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.firstName}</p>}
                </div>

                {/* Last Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {translate("quotationLastName")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    placeholder={translate("quotationLastNamePlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.lastName && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {translate("quotationEmail")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder={translate("quotationEmailPlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.email && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {translate("quotationPhoneNumber")} <span className="text-amber-400">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                    }}
                    placeholder={translate("quotationPhonePlaceholder")}
                    className="h-11 w-full rounded-lg border border-gray-500 bg-[#152243] px-3 text-sm text-slate-100 placeholder:text-slate-500 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/60"
                  />
                  {errors.phoneNumber && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>

            {/* LOCATION OF THE RESIDENCE / PICKUP LOCATION SECTION */}
            <div className="overflow-hidden rounded-2xl border border-brand-gold bg-[#0c1628] shadow-xl">
              {/* Section Header */}
              <div className="flex items-center gap-3 border-b border-blue-900/40 bg-[#121E2D] px-5 py-3.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f305e] border border-blue-900/40">
                  <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400/80">Step</p>
                  <h3 className="text-sm font-bold tracking-wide text-slate-100">
                    {isPickupDeliveryService ? translate("quotationPickupLocation") : translate("quotationLocationResidence")}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                {/* Country */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                    {translate("quotationSelectCountry")} <span className="text-amber-400">*</span>
                  </label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="h-11 w-full rounded-lg border border-gray-500 bg-[#152243] text-slate-100 shadow-inner focus:ring-2 focus:ring-blue-500/40 [&>svg]:text-blue-400">
                      <SelectValue placeholder={translate("quotationSelectCountry")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121E2D] border border-gray-500">
                      {COUNTRY_OPTIONS.map((c) => (
                        <SelectItem key={c.code} value={c.name} className="text-slate-100 focus:bg-[#1f305e] focus:text-white">
                          <span className="flex items-center gap-2">
                            <c.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                            {c.name}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Postal Code */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                    {translate("quotationPostalCode")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: "" }));
                    }}
                    placeholder={translate("quotationPostalCodePlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.postalCode && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.postalCode}</p>}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    {translate("quotationCity")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                    }}
                    placeholder={translate("quotationCityPlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.city && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.city}</p>}
                </div>

                {/* Province/State */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                    {translate("quotationProvinceState")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      if (errors.province) setErrors((prev) => ({ ...prev, province: "" }));
                    }}
                    placeholder={translate("quotationProvincePlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.province && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.province}</p>}
                </div>

                {/* Street Address */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {translate("quotationStreetAddress")} <span className="text-amber-400">*</span>
                  </label>
                  <Input
                    value={streetAddress}
                    onChange={(e) => {
                      setStreetAddress(e.target.value);
                      if (errors.streetAddress) setErrors((prev) => ({ ...prev, streetAddress: "" }));
                    }}
                    placeholder={translate("quotationStreetPlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                  {errors.streetAddress && <p className="text-xs text-red-400 flex items-center gap-1"><svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>{errors.streetAddress}</p>}
                </div>

                {/* Unit/Apt/Suite */}
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                    {translate("quotationUnit")}
                    <span className="ml-1 rounded-full bg-[#1f305e] px-2 py-0.5 text-[9px] font-semibold text-blue-300">Optional</span>
                  </label>
                  <Input
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder={translate("quotationUnitPlaceholder")}
                    className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                  />
                </div>
              </div>
            </div>

            {/* DELIVERY LOCATION SECTION (laundry-services / move-in-out-transport-service only) */}
            {isPickupDeliveryService && (
              <div className="overflow-hidden rounded-2xl border border-brand-gold bg-[#0c1628] shadow-xl">
                {/* Section Header */}
                <div className="flex items-center gap-3 border-b border-blue-900/40 bg-[#121E2D] px-5 py-3.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1f305e] border border-blue-900/40">
                    <svg className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-400/80">Step</p>
                    <h3 className="text-sm font-bold tracking-wide text-slate-100">
                      {translate("quotationDeliveryLocation")}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
                  {/* Delivery Country */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
                      {translate("quotationSelectCountry")} <span className="text-amber-400">*</span>
                    </label>
                    <Select value={deliveryCountry} onValueChange={setDeliveryCountry}>
                      <SelectTrigger className="h-11 w-full rounded-lg border border-gray-500 bg-[#152243] text-slate-100 shadow-inner focus:ring-2 focus:ring-blue-500/40 [&>svg]:text-blue-400">
                        <SelectValue placeholder={translate("quotationSelectCountry")} />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121E2D] border border-gray-500">
                        {COUNTRY_OPTIONS.map((c) => (
                          <SelectItem key={c.code} value={c.name} className="text-slate-100 focus:bg-[#1f305e] focus:text-white">
                            <span className="flex items-center gap-2">
                              <c.Flag className="h-3.5 w-5 shrink-0 object-cover" />
                              {c.name}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Delivery Postal Code */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                      {translate("quotationPostalCode")} <span className="text-amber-400">*</span>
                    </label>
                    <Input
                      value={deliveryPostalCode}
                      onChange={(e) => {
                        setDeliveryPostalCode(e.target.value);
                        if (errors.deliveryPostalCode) setErrors((prev) => ({ ...prev, deliveryPostalCode: "" }));
                      }}
                      placeholder={translate("quotationPostalCodePlaceholder")}
                      className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                    />
                    {errors.deliveryPostalCode && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.deliveryPostalCode}
                      </p>
                    )}
                  </div>

                  {/* Delivery City */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                      {translate("quotationCity")} <span className="text-amber-400">*</span>
                    </label>
                    <Input
                      value={deliveryCity}
                      onChange={(e) => {
                        setDeliveryCity(e.target.value);
                        if (errors.deliveryCity) setErrors((prev) => ({ ...prev, deliveryCity: "" }));
                      }}
                      placeholder={translate("quotationCityPlaceholder")}
                      className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                    />
                    {errors.deliveryCity && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.deliveryCity}
                      </p>
                    )}
                  </div>

                  {/* Delivery Province/State */}
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                      {translate("quotationProvinceState")} <span className="text-amber-400">*</span>
                    </label>
                    <Input
                      value={deliveryProvince}
                      onChange={(e) => {
                        setDeliveryProvince(e.target.value);
                        if (errors.deliveryProvince) setErrors((prev) => ({ ...prev, deliveryProvince: "" }));
                      }}
                      placeholder={translate("quotationProvincePlaceholder")}
                      className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                    />
                    {errors.deliveryProvince && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.deliveryProvince}
                      </p>
                    )}
                  </div>

                  {/* Delivery Street Address */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {translate("quotationStreetAddress")} <span className="text-amber-400">*</span>
                    </label>
                    <Input
                      value={deliveryStreetAddress}
                      onChange={(e) => {
                        setDeliveryStreetAddress(e.target.value);
                        if (errors.deliveryStreetAddress) setErrors((prev) => ({ ...prev, deliveryStreetAddress: "" }));
                      }}
                      placeholder={translate("quotationStreetPlaceholder")}
                      className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                    />
                    {errors.deliveryStreetAddress && (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        {errors.deliveryStreetAddress}
                      </p>
                    )}
                  </div>

                  {/* Delivery Unit/Apt/Suite */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                      <svg className="h-3 w-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                      {translate("quotationUnit")}
                      <span className="ml-1 rounded-full bg-[#1f305e] px-2 py-0.5 text-[9px] font-semibold text-blue-300">Optional</span>
                    </label>
                    <Input
                      value={deliveryUnit}
                      onChange={(e) => setDeliveryUnit(e.target.value)}
                      placeholder={translate("quotationUnitPlaceholder")}
                      className="h-11 rounded-lg border border-gray-500 bg-[#152243] text-slate-100 placeholder:text-slate-500 shadow-inner focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:border-blue-500/60"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TERMS AGREEMENT */}
            <div className="space-y-1.5">
              <label
                htmlFor="agreed-to-terms-quotation"
                className="flex cursor-pointer items-center gap-2 text-xs text-brand-navy select-none"
              >
                <Checkbox
                  id="agreed-to-terms-quotation"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => {
                    if (!agreedToTerms) {
                      setShowTermsModal(true);
                    } else {
                      setAgreedToTerms(checked === true);
                      if (checked === true && errors.agreedToTerms) {
                        setErrors((prev) => ({ ...prev, agreedToTerms: "" }));
                      }
                    }
                  }}
                  className="border-[#A98B4B] data-[state=checked]:bg-[#A98B4B]"
                />
                <span className="text-xs text-gray-400">
                  {translate("checkoutAgreeTo")}{" "}
                  <Link
                    href="/terms-and-conditions"
                    target="_blank"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {translate("footerTermsLink")}
                  </Link>{" "}
                  {translate("checkoutAnd")}{" "}
                  <Link
                    href="/privacy-policy"
                    target="_blank"
                    className="underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {translate("footerPrivacyLink")}
                  </Link>
                  .
                </span>
              </label>
              {errors.agreedToTerms && <p className="text-xs text-destructive">{errors.agreedToTerms}</p>}
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="rounded-lg bg-red-50 p-3 text-center text-xs font-medium text-destructive border border-red-200">
                {submitError}
              </div>
            )}

            {/* SUBMIT BUTTON Matching Image 2 */}
            <Button
              type="submit"
              disabled={submitting || !agreedToTerms}
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

      <TermsAndConditions
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setAgreedToTerms(true);
          setShowTermsModal(false);
          setErrors((prev) => ({ ...prev, agreedToTerms: "" }));
        }}
      />
    </main>
  );
}
