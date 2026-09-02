"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle2, Minus, Plus, ShieldCheck } from "lucide-react";
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
import { SecurityCategorySelection } from "@/components/booking/security-category-selection";
import { YachtCategorySelection } from "@/components/booking/yacht-category-selection";
import { GeneralSteamSection } from "@/components/booking/steam/general-steam-section";
import { IndustrialCommercialSteamSection } from "@/components/booking/steam/industrial-commercial-steam-section";
import { EventTypeSection } from "@/components/booking/event-type-section";
import { ServiceIntroduction } from "@/components/booking/service-introduction";
import { ServiceHighlights } from "@/components/booking/service-highlights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ApiError, useAuth } from "@/lib/auth-context";
import { CatalogItem, CatalogServiceDetail, getServiceBySlug } from "@/lib/catalog-api";
import { CustomerAddress, getMyProfile, listMyAddresses } from "@/lib/customers-api";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";
import { useLanguage } from "@/lib/i18n/language-context";
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
  "pool-cleaning-maintenance": { title: "Pool Details", options: POOL_ITEM_OPTIONS },
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

const SECURITY_SLUG = "high-security-property-care";
const YACHT_SLUG = "luxury-yacht-cleaning";
const STEAM_SLUG = "steam-cleaning";
const EVENT_SLUG = "post-event-cleaning";
const CATEGORY_QUOTE_TITLE = "Job type";

/** Child Care and Elder Care are quote-only too — they collect per-person profiles instead of a property size. */
const CHILD_CARE_SLUG = "childcare-services";
const ELDER_CARE_SLUG = "elder-care-services";

/** These have no required item — hide the section entirely rather than showing "Not specified" when nothing's been added. */
const HIDE_QUOTE_ITEMS_IF_EMPTY_SLUGS = new Set([
  "carpet-upholstery-cleaning",
  "pool-cleaning-maintenance",
  "precision-pressure-washing",
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

const COUNTRY_OPTIONS = [
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
];

const GENDER_PREFERENCES = [
  { value: "none", label: "No Preference / Any" },
  { value: "female", label: "Female Staff" },
  { value: "male", label: "Male Staff" },
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

export function RequestQuotationView({ serviceSlug }: { serviceSlug: string }) {
  const router = useRouter();
  const { translate } = useLanguage();
  const { country } = useCountry();
  const { status, accessToken } = useAuth();

  const customQuote = CUSTOM_QUOTE_ITEMS[serviceSlug];
  const isSecurityCategory = serviceSlug === SECURITY_SLUG;
  const isYachtCategory = serviceSlug === YACHT_SLUG;
  const isSteam = serviceSlug === STEAM_SLUG;
  const isEvent = serviceSlug === EVENT_SLUG;
  const isCategoryQuote = isSecurityCategory || isYachtCategory;
  const categoryQuoteTitle = isCategoryQuote ? CATEGORY_QUOTE_TITLE : undefined;

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [selectedGeneralSteam, setSelectedGeneralSteam] = useState<Set<string>>(new Set());
  const [selectedIndustrialSteam, setSelectedIndustrialSteam] = useState<Set<string>>(new Set());
  const [selectedEventTypes, setSelectedEventTypes] = useState<Set<string>>(new Set());

  const [numCleaners, setNumCleaners] = useState(1);
  const [durationHours, setDurationHours] = useState(3);
  const [gender, setGender] = useState("");
  const [language, setLanguage] = useState("");
  const [requirements, setRequirements] = useState("");

  // Contact profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("+33");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Location of the residence
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");

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
          setService({
            id: fallback.id ?? 1,
            name: fallback.name ?? serviceSlug,
            label: fallback.label ?? "Service",
            description: fallback.description ?? null,
            imageUrl: fallback.imageUrl ?? "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
            price: null,
            prices: [],
            status: "active",
            category: "property_care",
            isBookable: true,
            isQuotable: true,
            servicePackages: [],
            serviceItems: [],
          });
        } else {
          setServiceError("Service not found.");
        }
      });
  }, [serviceSlug, country]);

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
          setCity(primary.city || "");
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

  function toggleSetEntry(setter: React.Dispatch<React.SetStateAction<Set<string>>>, value: string) {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!date) next.date = "Please select a date.";
    if (!time) next.time = "Please select a time period.";
    if (!firstName.trim()) next.firstName = "First name is required.";
    if (!lastName.trim()) next.lastName = "Last name is required.";
    if (!email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email.trim())) next.email = "Please enter a valid email address.";
    if (!phoneNumber.trim()) next.phoneNumber = "Phone number is required.";
    if (!selectedCountry.trim()) next.selectedCountry = "Country is required.";
    if (!postalCode.trim()) next.postalCode = "Postal code is required.";
    if (!city.trim()) next.city = "City is required.";
    if (!province.trim()) next.province = "Province / State is required.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstError = Object.values(errors)[0] || "Please fill in all required fields marked with *";
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

    const steamItemList = [
      ...Array.from(selectedGeneralSteam),
      ...Array.from(selectedIndustrialSteam),
    ];
    const eventTypeList = Array.from(selectedEventTypes);

    const quoteItemLines = customQuote
      ? quoteItems.map((item) => formatQuoteItem(item, customQuote.options))
      : isCategoryQuote && selectedCategory
        ? [selectedCategory]
        : isSteam && steamItemList.length > 0
          ? steamItemList
          : isEvent && eventTypeList.length > 0
            ? eventTypeList
            : undefined;

    setSubmitting(true);
    try {
      const quotation = await createQuotation({
        serviceId: service.id,
        date: date || undefined,
        time: time || undefined,
        propertyType: customQuote || isCategoryQuote ? undefined : propertyType || undefined,
        propertySizeSqm: customQuote || isCategoryQuote ? undefined : propertySizeSqm,
        quoteItemsTitle: customQuote?.title ?? (isCategoryQuote ? categoryQuoteTitle : undefined),
        quoteItems: quoteItemLines,
        supplySource: supplySource || undefined,
        equipmentItems: selectedItems.length
          ? selectedItems.map((i) => ({
            name: i.name,
            price: i.price !== null ? Number(i.price) : undefined,
          }))
          : undefined,
        numCleaners,
        durationHours,
        genderPreference: gender || undefined,
        languagePreference: language || undefined,
        specialRequirements: requirements.trim() || undefined,
        firstName: firstName.trim(),
        lastName: lastName.trim() || undefined,
        email: email.trim(),
        contact: `${phonePrefix} ${phoneNumber.trim()}`,
        streetAddress: province.trim() ? `${province.trim()}, ${city.trim()}` : city.trim(),
        city: city.trim(),
        country: selectedCountry,
        postalCode: postalCode.trim() || undefined,
      });

      setShowSuccessToast(true);

      setTimeout(() => {
        router.push(`/quotation-confirmation/${quotation.id}?ref=${quotation.referenceNumber}`);
      }, 1500);
    } catch (err) {
      setSubmitError(err instanceof ApiError ? err.message : "Failed to send your quotation request.");
    } finally {
      setSubmitting(false);
    }
  }

  if (serviceError && !service) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-sm text-destructive font-medium">
        {serviceError}
      </div>
    );
  }

  const currentHeroImage =
    service?.imageUrl ??
    FALLBACK_SERVICES[serviceSlug]?.imageUrl ??
    "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp";

  const currentServiceLabel =
    service?.label ??
    FALLBACK_SERVICES[serviceSlug]?.label ??
    "Regular Home Cleaning";

  const currentServiceDescription =
    service?.description ??
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
              Form submitted successfully!
            </span>
          </div>
        </div>
      )}

      {/* Hero Banner Section Matching Image 2 */}
      <div className="mx-auto w-full max-w-11xl ">
        <div className="relative h-[200px] xs:h-[260px] sm:h-[320px] md:h-[380px] w-full overflow-hidden  sm:rounded-b-4xl shadow-md border border-[#A98B4B]">
          <Image
            src={currentHeroImage}
            alt={currentServiceLabel}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />

          {/* Centered Badges in Hero */}
          <div className="absolute left-0 top-20 flex flex-col items-center justify-center p-4 text-center">
            <div className="inline-block rounded-xl sm:rounded-2xl border-2 border-[#A98B4B] bg-[#121E2D]/95 px-6 py-2.5 sm:px-10 sm:py-3.5 shadow-2xl backdrop-blur-md">
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
            body={serviceContent.introduction.body}
            bgImage={currentHeroImage}
          />
        )}

        {serviceContent?.highlights?.map((group, index) => (
          <ServiceHighlights
            key={index}
            title={group.title ?? "Standard Package Checklist"}
            cards={group.cards}
          />
        ))}

        {/* MAIN SERVICE REQUEST DETAILS FORM BOX */}
        <div className="mx-auto w-full max-w-7xl rounded-2xl sm:rounded-3xl border-2 border-[#A98B4B] bg-[#FFFDF4] p-5 sm:p-8 md:p-10 shadow-sm">
          <h2 className="mb-6 text-center sm:text-left text-base sm:text-lg font-bold uppercase tracking-wider text-[#121E2D]">
            Service Request Details
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            {/* 1. Date & Time */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brand-navy">1. Date & Time</p>
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
            <div className="space-y-2">
              <Label className="text-xs font-semibold text-brand-navy">
                2. Chemical and Equipment
              </Label>
              <Select
                value={supplySource}
                onValueChange={(val) => setSupplySource(val as SupplySource)}
              >
                <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                  <SelectValue placeholder="Provided by the Customer" />
                </SelectTrigger>
                <SelectContent className="bg-white border-[#A98B4B]/30">
                  <SelectItem value="customer">Provided by the Customer</SelectItem>
                  <SelectItem value="company">Request the Company</SelectItem>
                </SelectContent>
              </Select>

              {/* Equipment Items Toggle when Request the Company is selected */}
              {supplySource === "company" && service?.serviceItems && service.serviceItems.length > 0 && (
                <div className="mt-3 rounded-xl border border-[#A98B4B]/30 bg-white p-4 space-y-2.5">
                  <p className="text-xs font-semibold text-[#121E2D]">Select Equipment & Materials</p>
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

            {/* 3. Property Scale / Service Specific Details */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-brand-navy">3. Property Scale</p>
              {serviceSlug === "carpet-upholstery-cleaning" ? (
                <CarpetItemCards items={quoteItems} onItemsChange={setQuoteItems} />
              ) : serviceSlug === "pool-cleaning" ? (
                <PoolJobSelection items={quoteItems} onItemsChange={setQuoteItems} />
              ) : serviceSlug === "precision-pressure-washing" ? (
                <PressureWashingJobSelection items={quoteItems} onItemsChange={setQuoteItems} />
              ) : isSecurityCategory ? (
                <SecurityCategorySelection selected={selectedCategory} onSelect={setSelectedCategory} />
              ) : isYachtCategory ? (
                <YachtCategorySelection selected={selectedCategory} onSelect={setSelectedCategory} />
              ) : isSteam ? (
                <div className="space-y-4">
                  <GeneralSteamSection
                    selectedTitles={selectedGeneralSteam}
                    onToggle={(title) => toggleSetEntry(setSelectedGeneralSteam, title)}
                  />
                  <IndustrialCommercialSteamSection
                    selectedTitles={selectedIndustrialSteam}
                    onToggle={(title) => toggleSetEntry(setSelectedIndustrialSteam, title)}
                  />
                </div>
              ) : isEvent ? (
                <EventTypeSection
                  selectedTitles={selectedEventTypes}
                  onToggle={(title) => toggleSetEntry(setSelectedEventTypes, title)}
                />
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

            {/* 4 & 5. Allocated professionals & Cleaner duration */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 4. Allocated professionals */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  4. Allocated professionals
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
                  5. Cleaner duration
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

            {/* 6 & 7. Staff Gender Preference & Linguistic Coordination */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 6. Staff Gender Preference */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  6. Staff Gender Preference
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-[#A98B4B]/30">
                    {GENDER_PREFERENCES.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 7. Linguistic Coordination */}
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-brand-navy">
                  7. Linguistic Coordination
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder="Select an option" />
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

            {/* 8. Service Requirements & Specifics */}
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-brand-navy">
                8. Service Requirements & Specifics
              </Label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Describe the services you need, preferred schedule, location, and any specific requirements..."
                className="h-24 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] p-3 text-xs sm:text-sm text-brand-navy shadow-inner placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
              />
            </div>

            {/* CONTACT PROFILE SECTION */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121E2D]">
                Contact Profile
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    First Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    placeholder="First Name"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.firstName && <p className="text-xs text-destructive">{errors.firstName}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Last Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    placeholder="Last Name"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.lastName && <p className="text-xs text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                    }}
                    placeholder="Email address"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Phone number <span className="text-red-500">*</span>
                  </Label>
                  <div className="flex h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] shadow-inner focus-within:ring-2 focus-within:ring-[#A98B4B] overflow-hidden">
                    <Select value={phonePrefix} onValueChange={setPhonePrefix}>
                      <SelectTrigger className="h-full w-[100px] shrink-0 border-0 bg-transparent text-xs text-brand-navy focus:ring-0">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-[#A98B4B]/30">
                        {COUNTRY_OPTIONS.map((c) => (
                          <SelectItem key={c.code} value={c.dialCode}>
                            {c.flag} {c.dialCode}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
                        if (errors.phoneNumber) setErrors((prev) => ({ ...prev, phoneNumber: "" }));
                      }}
                      placeholder="Phone number"
                      className="h-full flex-1 border-0 bg-transparent px-3 text-xs sm:text-sm text-brand-navy placeholder:text-muted-foreground focus:outline-none"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-xs text-destructive">{errors.phoneNumber}</p>}
                </div>
              </div>
            </div>

            {/* LOCATION OF THE RESIDENCE SECTION */}
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#121E2D]">
                Location of the Residence
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Select Country <span className="text-red-500">*</span>
                  </Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger className="h-11 w-full rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {COUNTRY_OPTIONS.map((c) => (
                        <SelectItem key={c.code} value={c.name}>
                          {c.flag} {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Postal Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={postalCode}
                    onChange={(e) => {
                      setPostalCode(e.target.value);
                      if (errors.postalCode) setErrors((prev) => ({ ...prev, postalCode: "" }));
                    }}
                    placeholder="Postal Code"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.postalCode && <p className="text-xs text-destructive">{errors.postalCode}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    City <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                      if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
                    }}
                    placeholder="City"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.city && <p className="text-xs text-destructive">{errors.city}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-brand-navy/90">
                    Province/ State <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    value={province}
                    onChange={(e) => {
                      setProvince(e.target.value);
                      if (errors.province) setErrors((prev) => ({ ...prev, province: "" }));
                    }}
                    placeholder="Province / State"
                    className="h-11 rounded-lg border border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground shadow-inner focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                  {errors.province && <p className="text-xs text-destructive">{errors.province}</p>}
                </div>
              </div>
            </div>

            {/* Turnstile / Security Badge Mockup Matching Image 2 */}
            <div className="mt-2 flex items-center justify-center">
              <div className="flex items-center gap-2 rounded border border-gray-300 bg-white px-3 py-1.5 text-[11px] text-gray-500 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-[#A98B4B]" />
                <span>Protected by Cloudflare Turnstile</span>
              </div>
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
              disabled={submitting}
              className="mt-2 h-12 sm:h-14 w-full rounded-xl bg-[#A98B4B] text-xs sm:text-sm font-bold tracking-widest text-white shadow-lg transition hover:bg-[#8F7034] hover:brightness-110 uppercase"
            >
              {submitting ? "SUBMITTING REQUEST…" : "SUBMIT DETAILED QUOTATION REQUEST"}
            </Button>
          </form>
        </div>

        {/* Back Link */}
        <div className="mt-4 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A98B4B] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
