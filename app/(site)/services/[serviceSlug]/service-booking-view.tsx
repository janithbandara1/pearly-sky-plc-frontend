"use client";

import Link from "@/components/locale-link";
import { isCommonFlowOfNewBookingSectionView, isCommonPropertyTypeFlow, isCommonPropertyTypeWithRoomComponents, isDedicatedFlowService } from "@/lib/service-flows";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, type Dispatch, type SetStateAction } from "react";
import { ArrowLeft, Calendar, Clock, User, Mail, Phone, MapPin, Building2, Home } from "lucide-react";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { DISINFECTION_LEVELS, DisinfectionLevelSection } from "@/components/booking/disinfection-level-section";
import { EquipmentSection, type SupplySource } from "@/components/booking/equipment-section";
import { FACILITY_CARDS, FacilitySelectionSection } from "@/components/booking/facility-selection-section";
import { JobCardSection } from "@/components/booking/job-card-section";
import { SecurityCategorySelection } from "@/components/booking/security-category-selection";
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
import { usePoolTheme } from "@/lib/pool-theme-context";
import { SERVICE_CONTENT } from "@/lib/content/service-details";
import { ApiError, useAuth } from "@/lib/auth-context";
import { AddressPayload, getMyProfile } from "@/lib/customers-api";
import CustomerContactsPreference, { type ContactFormData } from "@/components/booking/booking new flow/CustomerContactsPreference";
import type { CheckoutAttachment } from "@/components/booking/checkout-attachment-upload";
import { saveBookingDraft, ServicePropertyCategoriesEnums } from "@/lib/booking-draft";
import { calculateEquipmentItemPrice, EQUIPMENT_MAX_QTY } from "@/lib/equipment-pricing";
import { applyDeepCleanToQuote, applyDeepCleanToRate } from "@/lib/deep-clean";
import {
  CatalogServiceDetail,
  getServiceBySlug,
  getServiceQuote,
  ServiceAddOnPackage,
  ServiceLocaleSlug,
  SizeQuote,
  withLocaleDefaults,
} from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCurrency } from "@/lib/currency-context";
import JoinWithUsSection from "@/components/booking/join-with-us-section";
import { EventbookSection } from "@/components/booking/event/EventbookSection";

import { CareScheduleSection } from "@/components/booking/care-schedule-section";
import { CarpetScheduleSection } from "@/components/booking/carpet/carpet-schedule-section";
import { PoolScheduleSection } from "@/components/booking/pool/pool-schedule-section";
import { PressureWashingScheduleSection } from "@/components/booking/pressure-washing/pressure-washing-schedule-section";
import { YachtScheduleSection } from "@/components/booking/yacht/yacht-schedule-section";
import { getPropertyCategoriesForServiceOfSanitize, PropertyTypeSizeSelectorCommonFlowOfServices }
  from "@/components/booking/common-flows-propertis-and-equipments/common-property-types";
import { roomCountsToList, type RoomCounts } from "@/components/booking/room-components-counter";
import { EquipmentSectionOfCommonServicesSlugs, FALLBACK_EQUIPMENT_ITEMS } from "@/components/booking/common-flows-propertis-and-equipments/common-equipment-flow-section";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import HeaderNavigation from "@/components/booking/booking new flow/HeaderNavigation";
import LiveEstimateSummary from "@/components/booking/quotation-common-flow/live-estimate";
import BookingLogisticsSummary, { type SelectedAddonItem } from "@/components/booking/booking new flow/BookingLogisticsSummary";
import Equipments from "@/components/booking/booking new flow/equipments";
import LocationAccessSection from "@/components/booking/quotation-common-flow/LocationAccessSection";
import ServiceFrequencySelector from "@/components/booking/common-flows-propertis-and-equipments/service-frequency";
import BookingValidationModal, { type ValidationModalItem } from "@/components/booking/BookingValidationModal";
import LaundryDashboard from "@/components/laundry/main-dashbaord";

export const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], adjustFontFallback: false });

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
  { id: 101, name: "AddOnsDefaultCatagoryDeep", image: null, category: "deep_and_specialized_cleaning" },
  { id: 102, name: "AddOnsDefaultCatagoryInteriorRefrigerator", image: null, category: "deep_and_specialized_cleaning" },
  { id: 103, name: "AddOnsDefaultCatagoryInteriorWindow", image: null, category: "general_interior_maintenance" },
  { id: 104, name: "AddOnsDefaultCatagoryBalcony", image: null, category: "outdoor_and_exterior_spaces" },
];

const FALLBACK_SERVICES: Record<string, CatalogServiceDetail> = {
  "child-care-service": withLocaleDefaults({
    id: 17,
    name: "child-care-service",
    label: "Child Care Service",
    price: "30.00",
    prices: [],
    status: "active",
    category: "care_and_concierge",
    description: "Trusted support for families.",
    imageUrl: "/images/services/updated-images/Child-Care-Service.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "elder-care-service": withLocaleDefaults({
    id: 18,
    name: "elder-care-service",
    label: "Elder Care Service",
    price: "30.00",
    prices: [],
    status: "active",
    category: "care_and_concierge",
    description: "Respectful support for elderly clients.",
    imageUrl: "/images/services/updated-images/Elder Care Service.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "carpet-upholstery-cleaning": withLocaleDefaults({
    id: 5,
    name: "carpet-upholstery-cleaning",
    label: "Carpet & Upholstery Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "Professional Restoration for Your Home & Interiors",
    imageUrl: "/images/services/updated-images/Carpet & Upholstery Cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "pool-cleaning": withLocaleDefaults({
    id: 9,
    name: "pool-cleaning",
    label: "Pool Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "Expert pool cleaning and water sanitation services.",
    imageUrl: "/images/services/updated-images/Pool Cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "precision-pressure-washing": withLocaleDefaults({
    id: 10,
    name: "precision-pressure-washing",
    label: "Precision Pressure Washing",
    price: "0.00",
    prices: [],
    status: "active",
    category: "premium_add_ons",
    description: "High-pressure exterior surface restoration.",
    imageUrl: "/images/services/updated-images/Precision Pressure Washing.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "luxury-yacht-cleaning": withLocaleDefaults({
    id: 16,
    name: "luxury-yacht-cleaning",
    label: "Luxury Yacht Cleaning",
    price: "0.00",
    prices: [],
    status: "active",
    category: "commercial_and_specialized_cleaning",
    description: "Premium marine detailing and yacht interior care.",
    imageUrl: "/images/services/updated-images/Luxury Yacht Cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: [],
    serviceItems: [],
  }),
  "regular-maintenance-cleaning": withLocaleDefaults({
    id: 1,
    name: "regular-maintenance-cleaning",
    label: "Regular Home Cleaning",
    price: "25.00",
    prices: [],
    status: "active",
    category: "residential_cleaning",
    description: "Routine home care for a fresh, tidy space.",
    imageUrl: "/images/services/updated-images/Regular Home Cleaning.webp",
    isBookable: true,
    isQuotable: true,
    servicePackages: DEFAULT_PACKAGES.map((p) => ({ package: p })),
    serviceItems: [],
  }),
};

/**
 * Turns a fetched service into the view's `service`/`serviceError` state —
 * shared by the server-provided `initialService` and the client-side fetch
 * fallback, so both paths gate bookability and fill in default packages the
 * same way.
 */
export function resolveServiceState(
  data: CatalogServiceDetail,
  isFlowService: boolean,
): { service: CatalogServiceDetail | null; error: string | null } {
  if (!data.isBookable && !isFlowService) {
    return { service: null, error: `Book now for "${data.label}" isn't available yet.` };
  }
  return {
    service: {
      ...data,
      servicePackages:
        data.servicePackages && data.servicePackages.length > 0
          ? data.servicePackages
          : DEFAULT_PACKAGES.map((p) => ({ package: p })),
      serviceItems: data.serviceItems ?? [],
    },
    error: null,
  };
}

export function ServiceBookingView({
  serviceSlug,
  locales,
  initialService,
}: {
  serviceSlug: string;
  /**
   * This service's locale-specific slugs, resolved server-side (see
   * `page.tsx`) and passed straight in — registered below without waiting
   * on the client-side `getServiceBySlug` fetch further down, which over a
   * real network (prod) can take long enough for a visitor to hit the
   * language switcher before that fetch resolves, landing them on a
   * mismatched locale+slug URL (e.g. "/en/services/nettoyage-regulier").
   */
  locales: ServiceLocaleSlug[];
  /**
   * The service as already fetched server-side in `page.tsx`, so the full
   * page (hero, introduction, booking form) is in the initial HTML rather
   * than a "Loading…" placeholder that only fills in after a client-side
   * fetch — crawlers index what the server sends. Null if that server fetch
   * failed, in which case the client-side fetch below takes over.
   */
  initialService: CatalogServiceDetail | null;
}) {
  const router = useRouter();
  const { country } = useCountry();
  const { registerServiceSlugs, translate } = useLanguage();
  const { symbol } = useCurrency();
  const { theme: poolTheme, setTheme: setPoolTheme } = usePoolTheme();
  const isSanitization = serviceSlug === SANITIZATION_SLUG;
  const isSteam = serviceSlug === STEAM_SLUG;
  const isEvent = serviceSlug === EVENT_SLUG;
  const isCommonPropertyTypeServices = isCommonPropertyTypeFlow(serviceSlug);
  const isCommonBookingSectionView = isCommonFlowOfNewBookingSectionView(serviceSlug);
  const isSecurityCategory = serviceSlug === SECURITY_SLUG;
  const isCategoryQuote = isSecurityCategory;
  const isChildCare = serviceSlug === CHILD_CARE_SLUG;
  const isElderCare = serviceSlug === ELDER_CARE_SLUG;
  const isCarpetService = serviceSlug === CARPET_UPHOLSTERY_SLUG;
  
  const isPressureWashing = serviceSlug === PRESSURE_WASHING_SLUG;
  const isYachtService = serviceSlug === YACHT_SLUG && isDedicatedFlowService(serviceSlug);
  const isPoolCleaning = serviceSlug === POOL_CLEANING_SLUG;
  const isLaundry = serviceSlug === "laundry-service/request-quotation";
  const isCareService = isChildCare || isElderCare;
  const isFlowService = isDedicatedFlowService(serviceSlug);
  const serviceContent = SERVICE_CONTENT[serviceSlug];


  const [initialState] = useState(() =>
    initialService ? resolveServiceState(initialService, isFlowService) : null,
  );
  const [service, setService] = useState<CatalogServiceDetail | null>(initialState?.service ?? null);
  const [serviceError, setServiceError] = useState<string | null>(initialState?.error ?? null);

  const [supplySource, setSupplySource] = useState<SupplySource>("company");
  const [selectedItemIds, setSelectedItemIds] = useState<Set<number>>(new Set());
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>({});

  const [propertySizeSqm, setPropertySizeSqm] = useState(20);
  const [propertyType, setPropertyType] = useState("");
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [deepClean, setDeepClean] = useState(false); 
  const [disinfection, setDisinfection] = useState(false);
  const [serviceCategory, setServiceCategory] = 
  useState<ServicePropertyCategoriesEnums[keyof ServicePropertyCategoriesEnums] | string>("residential");
  const [rooms, setRooms] = useState<RoomCounts>({});

  const [selectedPackageIds, setSelectedPackageIds] = useState<Set<number>>(new Set());
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [requirements, setRequirements] = useState("");

  const [selectedFacilityIds, setSelectedFacilityIds] = useState<Set<string>>(new Set());
  const [disinfectionLevelId, setDisinfectionLevelId] = useState("");

  const [attachments, setAttachments] = useState<CheckoutAttachment[]>([]);
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    streetAddress: "",
    unit: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [howGetIn, setHowGetIn] = useState<string>("someone_home");
  const [howHeard, setHowHeard] = useState<string>("Google");

  const { accessToken } = useAuth();
  useEffect(() => {
    if (!accessToken) return;
    getMyProfile(accessToken)
      .then((profileData) => {
        setContactForm((prev) => ({
          firstName: profileData.firstName || prev.firstName,
          lastName: profileData.lastName ?? prev.lastName,
          email: profileData.email || prev.email,
          contact: profileData.contact ?? prev.contact,
        }));
      })
      .catch(() => undefined);
  }, [accessToken]);


  /** Shared by High-Security Property Care and Luxury Yacht Cleaning's single-select category pickers. */
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);


  /**store service frequency*/
  const [selectServiceFrequency, setSelectServiceFrequency] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationItems, setValidationItems] = useState<ValidationModalItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Already resolved server-side — only fetch client-side if that failed.
    if (initialState) return;
    getServiceBySlug(serviceSlug, country)
      .then((data) => {
        const next = resolveServiceState(data, isFlowService);
        if (next.error) {
          setServiceError(next.error);
          return;
        }
        setService(next.service);
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
  }, [initialState, serviceSlug, country, isFlowService]);

  // Tells the language switcher this service's locale-specific slugs, so
  // switching language lands on e.g. "nettoyage-regulier" instead of keeping
  // "regular-home-cleaning" — see registerServiceSlugs in language-context.tsx.
  // Uses the `locales` prop (resolved server-side in page.tsx) rather than
  // the client-fetched `service` state below, so it's registered on mount
  // instead of after that fetch's network round-trip resolves — otherwise a
  // visitor who switches language before that fetch completes lands on a
  // mismatched locale+slug URL.
  useEffect(() => {
    registerServiceSlugs({ baseSlug: serviceSlug, locales });
    return () => registerServiceSlugs(null);
  }, [serviceSlug, locales, registerServiceSlugs]);

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

  function toggleFacility(id: string) {
    setSelectedFacilityIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const allPackages = (service?.servicePackages ?? []).map((sp) => sp.package);
  const selectedPackages = allPackages.filter((pkg) => selectedPackageIds.has(pkg.id));
  const rawItems = (service?.serviceItems ?? []).map((si) => si.item);
  const items = rawItems.length > 0 ? rawItems : FALLBACK_EQUIPMENT_ITEMS;
  const selectedItems = items.filter((item) => selectedItemIds.has(item.id));
  // Customer-supplied equipment is disclosed in full (no picking, no charge);
  // company-supplied equipment is whatever the customer has actually added.
  const displayedEquipmentItems = supplySource === "customer" ? items : selectedItems;

  const facilityNames = Array.from(selectedFacilityIds)
    .map((id) => FACILITY_CARDS.find((c) => c.id === id)?.title)
    .filter((name): name is string => Boolean(name));

  const selectedDisinfectionLevel = DISINFECTION_LEVELS.find((l) => l.id === disinfectionLevelId);

  // Equipment is priced off the property size everywhere; steam/sanitization/
  // post-construction also let the customer pick a quantity of each item.
  const equipmentQty = (id: number) => itemQuantities[id] ?? 1;
  const equipmentUnitPrice = (item: (typeof items)[number]) =>
    calculateEquipmentItemPrice(item, propertySizeSqm);
  const equipmentLinePrice = (item: (typeof items)[number]) =>
    equipmentUnitPrice(item) * (isCommonPropertyTypeServices ? equipmentQty(item.id) : 1);
  const equipmentLineName = (item: (typeof items)[number]) =>
    isCommonPropertyTypeServices && selectedItemIds.has(item.id) && equipmentQty(item.id) > 1
      ? `${item.name} × ${equipmentQty(item.id)}`
      : item.name;

  const addOnsTotal = selectedItems.reduce((sum, entry) => sum + equipmentLinePrice(entry), 0);

  const selectedAddonsList: SelectedAddonItem[] = useMemo(() => {
    if (supplySource !== "company") return [];
    return selectedItems.map((item) => {
      const qty = isCommonPropertyTypeServices ? equipmentQty(item.id) : 1;
      const unitPrice = equipmentUnitPrice(item);
      const totalPrice = unitPrice * qty;
      return {
        id: item.id,
        name: item.name,
        quantity: qty,
        unitPrice,
        totalPrice,
      };
    });
  }, [supplySource, selectedItems, itemQuantities, propertySizeSqm, isCommonPropertyTypeServices]);

  const selectedRoomsSummary = useMemo(() => {
    if (!isCommonPropertyTypeWithRoomComponents(serviceSlug)) return "Standard Layout";
    const roomList = roomCountsToList(rooms);
    if (roomList.length === 0) return "None selected";
    return roomList
      .map((r) => `${r.count} ${translate(r.key as TranslationKey) || r.key}`)
      .join(", ");
  }, [serviceSlug, rooms, translate]);

  const scheduleWindow = useMemo(() => {
    if (!date && !time) return "Not selected yet";
    if (!date) return `@ ${time}`;
    try {
      const [y, m, d] = date.split("-").map(Number);
      const dateObj = new Date(y, m - 1, d);
      const dateFormatted = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return time ? `${dateFormatted} @ ${time}` : dateFormatted;
    } catch {
      return time ? `${date} @ ${time}` : date;
    }
  }, [date, time]);

  const frequencyDiscountRate = selectServiceFrequency === "weekly" ? 0.20 : selectServiceFrequency === "bi-weekly" ? 0.10 : 0.00;
  const frequencyDiscountLabel = useMemo(() => {
    switch (selectServiceFrequency) {
      case "weekly":
        return "Weekly (20% Off)";
      case "bi-weekly":
        return "Bi-Weekly (10% Off)";
      case "monthly":
        return "Monthly (0% Off)";
      case "one-time":
      default:
        return "One-Time (0% Off)";
    }
  }, [selectServiceFrequency]);

  // Deep Clean (+40%) is only offered on the common property-type flow
  const appliedDeepClean = isCommonPropertyTypeServices && deepClean;
  const pricedQuote = applyDeepCleanToQuote(quote, appliedDeepClean);
  const pricedRate = applyDeepCleanToRate(service?.price ?? null, appliedDeepClean);

  function handleBookNow() {
    if (!service) return;
    const errors: string[] = [];
    const valItems: ValidationModalItem[] = [];

    // 1. Service Date
    if (!date) {
      errors.push("Please select your preferred service date.");
    }
    valItems.push({
      icon: Calendar,
      title: "Service Date",
      description: date ? "Your preferred service date has been selected." : "Please select your preferred service date.",
      isConfirmed: !!date,
      status: date ? "Confirmed" : "Missing",
    });

    // 2. Arrival Time Window
    if (!time) {
      errors.push("Please select your convenient arrival time window.");
    }
    valItems.push({
      icon: Clock,
      title: "Arrival Time Window",
      description: time ? "Your arrival time window has been selected." : "Please select your convenient arrival time window.",
      isConfirmed: !!time,
      status: time ? "Confirmed" : "Missing",
    });

    // 3. Cleaning Solvent & Equipment
    if (items.length > 0) {
      const isSupplyConfirmed = supplySource === "company" ? selectedItemIds.size > 0 : !!supplySource;
      let supplyDesc = "Cleaning solvent & equipment preference selected.";
      if (!supplySource) {
        supplyDesc = "Please select who provides Cleaning Solvents & Equipment.";
        errors.push(supplyDesc);
      } else if (supplySource === "company" && selectedItemIds.size === 0) {
        supplyDesc = "Add at least one Cleaning Solvent & Equipment item above to continue.";
        errors.push(supplyDesc);
      }
      valItems.push({
        title: "Cleaning Solvent & Equipment",
        description: supplyDesc,
        isConfirmed: isSupplyConfirmed,
        status: isSupplyConfirmed ? "Confirmed" : "Missing",
      });
    }

    // 4. First Name
    const isFirstNameOk = !!contactForm.firstName.trim();
    if (!isFirstNameOk) {
      errors.push("Please enter your first name in the contact details form.");
    }
    valItems.push({
      icon: User,
      title: "First Name",
      description: isFirstNameOk ? "Your first name has been entered." : "Please enter your first name in the contact details form.",
      isConfirmed: isFirstNameOk,
      status: isFirstNameOk ? "Confirmed" : "Missing",
    });

    // 5. Email Address
    const isEmailValid = !!contactForm.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim());
    if (!contactForm.email.trim()) {
      errors.push("Please enter your email address in the contact details form.");
    } else if (!isEmailValid) {
      errors.push("Please provide a valid email address (e.g. name@domain.com).");
    }
    valItems.push({
      icon: Mail,
      title: "Email Address",
      description: isEmailValid
        ? "Your email address has been entered."
        : !contactForm.email.trim()
        ? "Please enter your email address."
        : "Please provide a valid email address (e.g. name@domain.com).",
      isConfirmed: isEmailValid,
      status: isEmailValid ? "Confirmed" : "Missing",
    });

    // 6. Phone Number
    const isPhoneOk = !!contactForm.contact.trim();
    if (!isPhoneOk) {
      errors.push("Please provide your contact phone number.");
    }
    valItems.push({
      icon: Phone,
      title: "Phone Number",
      description: isPhoneOk ? "Your contact phone number has been entered." : "Please provide your contact phone number.",
      isConfirmed: isPhoneOk,
      status: isPhoneOk ? "Confirmed" : "Missing",
    });

    // 7. Street Address
    const isStreetOk = !!addressForm.streetAddress.trim();
    if (!isStreetOk) {
      errors.push("Please enter your street address.");
    }
    valItems.push({
      icon: MapPin,
      title: "Street Address",
      description: isStreetOk ? "Your street address has been entered." : "Please enter your street address.",
      isConfirmed: isStreetOk,
      status: isStreetOk ? "Confirmed" : "Missing",
    });

    // 8. City
    const isCityOk = !!addressForm.city.trim();
    if (!isCityOk) {
      errors.push("Please enter your city.");
    }
    valItems.push({
      icon: Building2,
      title: "City",
      description: isCityOk ? "Your city has been entered." : "Please enter your city.",
      isConfirmed: isCityOk,
      status: isCityOk ? "Confirmed" : "Missing",
    });

    // 9. Additional conditional checks
    if (!propertyType) {
      errors.push("Please select your property category or type above.");
      valItems.unshift({
        icon: Home,
        title: "Property Type",
        description: "Please select your property category or type above.",
        isConfirmed: false,
        status: "Missing",
      });
    }
    if (isSanitization && !disinfectionLevelId) {
      errors.push("Please select a disinfection package to continue.");
    }
    if (isCategoryQuote && !selectedCategory) {
      errors.push("Please select a security service category to continue.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setValidationItems(valItems);
      setIsErrorModalOpen(true);
      setError(errors[0]);
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
        name: equipmentLineName(i),
        price: equipmentLinePrice(i),
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
      deepClean: appliedDeepClean || undefined,
      disinfection: (isCommonPropertyTypeServices && disinfection) || undefined,
      serviceCategory: isCommonPropertyTypeServices ? (serviceCategory ?? undefined) : undefined,
      rooms: isCommonPropertyTypeWithRoomComponents(serviceSlug) && roomCountsToList(rooms).length > 0
        ? roomCountsToList(rooms)
        : undefined,
      frequency: selectServiceFrequency ?? undefined,
      category: isCategoryQuote ? selectedCategory ?? undefined : undefined,
      howGetIn,
      howHeard,
      firstName: contactForm.firstName.trim() || undefined,
      lastName: contactForm.lastName.trim() || undefined,
      email: contactForm.email.trim() || undefined,
      contact: contactForm.contact.trim() || undefined,
      streetAddress: addressForm.streetAddress.trim() || undefined,
      unit: addressForm.unit?.trim() || undefined,
      city: addressForm.city.trim() || undefined,
      state: addressForm.state?.trim() || undefined,
      postalCode: addressForm.postalCode?.trim() || undefined,
      country: addressForm.country || undefined,
    });
    router.push(`/services/${serviceSlug}/checkout`);
  }

  if (serviceError) {
    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center p-6 text-sm text-destructive">
        {serviceError}
      </div>
    );
  }

  if (!service) {
    // A fixed min-height here (roughly the real booking form's footprint)
    // keeps JoinWithUsSection/RelatedServices below the fold while this
    // fetches — without it, this collapses to a one-line "Loading…", so
    // that marketing content briefly renders at the very top of the page
    // and it looks like the page opened already scrolled down to it.
    return (
      <div className="flex min-h-[70vh] flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  const genderLabel = translate((GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "summaryNoPreference") as TranslationKey);
  const languageLabel = LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "None";

  const bookDisabledReason = isSanitization && !disinfectionLevelId
    ? translate("bookingSelectPackage")
    : isCategoryQuote && !selectedCategory
      ? translate("bookingSelectJobType")
      : !date || !time
        ? translate("bookingSelectDateTime")
        : !propertyType
          ? translate("bookingSelectPropertyType")
          : items.length > 0 && !supplySource
            ? translate("bookingSelectSupplies")
            : supplySource === "company" && selectedItemIds.size === 0
              ? translate("bookingAddSupplyItem")
              : undefined;

  const getServiceName = () => {
    if (serviceSlug === "regular-home-cleaning") return "serviceRegularHomeCleaning"
    if (serviceSlug === "healthguard-sanitization") return "serviceHealthguardSanitization"
    if (serviceSlug === "carpet-upholstery-cleaning") return "serviceCarpetUpholsteryCleaning"
    if (serviceSlug === "steam-cleaning") return "serviceSteamCleaning"
    if (serviceSlug === "post-event-cleaning") return "servicePostEventCleaning"
    if (serviceSlug === "high-security-property-care") return "serviceHighSecurityPropertyCare"
    if (serviceSlug === "luxury-yacht-cleaning") return "serviceLuxuryYachtCleaning"
    if (serviceSlug === "child-care-service") return "serviceChildCareService"
    if (serviceSlug === "elder-care-service") return "serviceElderCareService"
    if (serviceSlug === "pool-cleaning") return "servicePoolCleaning"
    if (serviceSlug === "precision-pressure-washing") return "servicePrecisionPressureWashing"
    if (serviceSlug === "commercial-office-cleaning") return "serviceCommercialCleaningServices"
    if (
      serviceSlug === "move-in-out-transport-service" ||
      serviceSlug === "move-in-out-transport-health"
    ) return "serviceMoveInOutTransportService"
    if (serviceSlug === "essential-touch-up-cleaning") return "serviceEssentialTouchUpCleaning"
    if (serviceSlug === "deep-cleaning") return "serviceDeepCleaning"
    if (serviceSlug === "end-of-tenancy-cleaning") return "serviceEndOfTenancyCleaning"
    if (serviceSlug === "post-construction-renovation-cleaning") return "servicePostConstructionCleaning"
    if (serviceSlug === "premium-rental-concierge-cleaning") return "servicePremiumRentalConciergeCleaning"
    if (
      serviceSlug === "laundry-service" ||
      serviceSlug === "laundry-services" ||
      serviceSlug === "laundry-linen-care"
    ) return "serviceLaundryService"
    if (serviceSlug === "same-day-priority-cleaning") return "serviceSameDayPriorityCleaning"
    return service.label
  }

  // services which have service frequency options
  const frequencyServiceSlugsSet = new Set([
    "regular-home-cleaning",
    "essential-touch-up-cleaning",
    "deep-cleaning",
    "end-of-tenancy-cleaning",
    "post-construction-renovation-cleaning",
    "same-day-priority-cleaning",
    "high-security-property-care",
    "premium-rental-concierge-cleaning",
    "commercial-office-cleaning",
    "steam-cleaning",
    "post-event-cleaning",
    "luxury-yacht-cleaning",
    "healthguard-sanitization",
    "pool-cleaning",
  ]);
  const isFrequencyService = frequencyServiceSlugsSet.has(serviceSlug);

  return (
    <div
      className={`${poppins.className} transition-colors duration-300 ${
        poolTheme === "dark"
          ? "bg-[#111C2E] text-white"
          : "bg-[#F7F5F0] text-[#1A2238]"
      }`}
    >
      <PageHero
        image={service.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"}
        eyebrow="Book a service"
        title={getServiceName()}
        subtitle={service.description ?? undefined}
        servicePrices={service.prices}
        serviceId={service.id}
        theme={isPoolCleaning || isPressureWashing ? poolTheme : undefined}
        hidePriceSelector={isPoolCleaning || isCarpetService || isPressureWashing}
        unitLabelKey={isChildCare || isElderCare ? "hourPerProfessional" : undefined}
        serviceSlug={serviceSlug}
      />

      <div className="mx-auto flex w-full max-w-[1250px] flex-col gap-6 px-6 md:px-2">
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
          <ServiceHighlights 
            key={index} 
            cards={group.cards} 
            theme={poolTheme}
            onThemeChange={setPoolTheme} 
          />
        ))}

        {isCarpetService ? (
          <CarpetScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
            theme={poolTheme}
            onThemeChange={setPoolTheme}
          />
        ) : isPoolCleaning ? (
          <PoolScheduleSection 
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
            theme={poolTheme}
            onThemeChange={setPoolTheme}
          />
        ) : isPressureWashing ? (
          <PressureWashingScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
            themeProp={poolTheme}
            onThemeChange={setPoolTheme}
          />
        ) : isYachtService ? (
          <YachtScheduleSection
            serviceId={service.id}
            serviceSlug={serviceSlug}
            serviceLabel={service.label}
            items={items}
            hourlyRate={service.price}
          />
        ) : isLaundry ? (
          <LaundryDashboard
            
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
              <DisinfectionLevelSection selectedId={disinfectionLevelId} onSelect={(level) => setDisinfectionLevelId(level?.id ?? "")} />
            )}

            {isSteam && (
              <div className="w-full bg-[#121E2D] rounded-[12px]">
                <GeneralSteamSection />
                <IndustrialCommercialSteamSection />
              </div>
            )}


            {isCommonPropertyTypeServices && (
              <HeaderNavigation />
            )}

            {/* Reorganized flex container matching the top-level side-by-side layout */}
            <div className="flex flex-col gap-4 md:flex-row w-full items-start mb-4">
              <div className="md:w-[80%] flex flex-col gap-4 w-full">
                {isCommonPropertyTypeServices ? (
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
                    isQuote={false}
                    theme={poolTheme}
                  />
                ) : (
                  <PropertyTypeSizeSelector
                    value={propertySizeSqm}
                    onChange={setPropertySizeSqm}
                    categories={getPropertyCategoriesForService(serviceSlug)}
                    onCategoryChange={(cat: PropertyCategory) => setPropertyType(cat.dropdownLabel ?? cat.label)}
                  />
                )}

                {/* Services frequencies */}
                <div className="flex flex-col w-full mt-8">
                          
                    { isFrequencyService && (
                      <ServiceFrequencySelector 
                        selectedServiceSlug={serviceSlug}
                        value={selectServiceFrequency}
                        onSelectionChange={setSelectServiceFrequency}
                        theme={poolTheme}
                      />
                    )}
                </div>

                {!isSanitization && serviceSlug !== YACHT_SLUG && !isSteam && !isEvent && !isCategoryQuote && (
                  
                    <JobCardSection
                      packages={allPackages}
                      selectedIds={selectedPackageIds}
                      onToggle={togglePackage}
                      theme={poolTheme}
                    />
                  
                )}

                <DateTimeSection date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />

                <Equipments
                  supplySource={supplySource}
                  onSupplySourceChange={handleSupplySourceChange}
                  items={items}
                  itemQuantities={itemQuantities}
                  selectedItemIds={selectedItemIds}
                  onQuantityChange={setItemQuantity}
                  propertySizeSqm={propertySizeSqm}
                  theme={poolTheme}
                />

                {/**Contact details form */}
                <div id="customer-contacts-preference-section" className="w-full">
                  <CustomerContactsPreference
                    theme={poolTheme}
                    gender={gender}
                    onGenderChange={setGender}
                    language={language}
                    onLanguageChange={setLanguage}
                    requirements={requirements}
                    onRequirementsChange={setRequirements}
                    attachments={attachments}
                    onAttachmentsChange={setAttachments}
                    contactForm={contactForm}
                    onContactFormChange={setContactForm}
                    addressForm={addressForm}
                    onAddressFormChange={setAddressForm}
                    howGetIn={howGetIn}
                    onHowGetInChange={setHowGetIn}
                    howHeard={howHeard}
                    onHowHeardChange={setHowHeard}
                  />
                </div>
                {/** */}
              </div>
              
              {/**Right section of Live Estimation generation */}
              <div className="sticky top-35 md:w-[50%] w-full">
                
                {isCommonBookingSectionView && (() => {
                  const categories = getPropertyCategoriesForService(serviceSlug);
                  const pTypeLower = (propertyType || "").toLowerCase();
                  const activeCategory =
                    categories.find(
                      (c: PropertyCategory) =>
                        pTypeLower.includes(c.id.toLowerCase()) ||
                        pTypeLower.includes(c.label.toLowerCase()),
                    ) ?? categories[0];
      
                  return (
                    <BookingLogisticsSummary
                      theme={poolTheme}
                      servicePlanName={service?.label ?? "Regular Home Cleaning"}
                      propertyType={propertyType || (activeCategory ? (activeCategory.dropdownLabel ?? activeCategory.label) : "Studio")}
                      propertySizeSqm={propertySizeSqm}
                      selectedRoomsSummary={selectedRoomsSummary}
                      scheduleWindow={scheduleWindow}
                      frequencyDiscountLabel={frequencyDiscountLabel}
                      frequencyDiscountRate={frequencyDiscountRate}
                      addOnsTotal={addOnsTotal + (selectedDisinfectionLevel?.priceAdder ?? 0)}
                      selectedAddons={selectedAddonsList}
                      supplySource={supplySource}
                      baseRate={Number(pricedRate ?? service?.price ?? 29)}
                      cleanerCount={pricedQuote?.cleanerCount ?? (propertySizeSqm > 150 ? 2 : 1)}
                      estimatedHours={pricedQuote?.minHours ?? Math.max(2, Math.ceil(propertySizeSqm / 30))}
                      laborTotal={pricedQuote?.priceMin ?? ((pricedQuote?.cleanerCount ?? (propertySizeSqm > 150 ? 2 : 1)) * (pricedQuote?.minHours ?? Math.max(2, Math.ceil(propertySizeSqm / 30))) * Number(pricedRate ?? service?.price ?? 29))}
                      currencySymbol={symbol || "€"}
                      onNextStep={handleBookNow}
                    />
                  );
                })()}
              </div>     
            </div>

            {error && <p className="text-sm text-destructive text-center pt-4 pb-8">{error}</p>}
          </>
        )}
      </div>

      {/* Interactive Booking Validation Modal */}
      <BookingValidationModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        items={validationItems}
        errors={validationErrors}
        theme={poolTheme}
        onActionClick={() => {
          setIsErrorModalOpen(false);
          const target = document.getElementById("customer-contacts-preference-section") || document.getElementById("pricing-engine");
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
      />
    </div>
  );
}