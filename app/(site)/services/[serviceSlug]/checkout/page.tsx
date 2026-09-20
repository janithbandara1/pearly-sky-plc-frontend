"use client";

import { useLanguage } from "@/lib/i18n/language-context";



import { Poppins } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { BookingDetailsCard } from "@/components/booking/booking-details-card";
import { Card, CardContent } from "@/components/ui/card";
import {
  GENDER_OPTIONS,
  LANGUAGE_OPTIONS,
  QuotationPreferencesSection,
} from "@/components/booking/quotation-preferences-section";
import { ServicePreferencesSection } from "@/components/booking/service-preferences-section";
import { GENERAL_STEAM_CARDS } from "@/components/booking/steam/general-steam-section";
import { INDUSTRIAL_STEAM_CATEGORIES } from "@/components/booking/steam/industrial-commercial-steam-section";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApiError, useAuth } from "@/lib/auth-context";
import {
  createBooking,
  createGuestBooking,
  initiateCheckout,
  initiateGuestCheckout,
} from "@/lib/booking-api";
import { BookingDraft, clearBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import {
  CatalogServiceDetail,
  SizeQuote,
  getServiceBySlug,
  getServiceQuote,
  withLocaleDefaults,
} from "@/lib/catalog-api";
import {
  AddressPayload,
  CustomerProfile,
  createMyAddress,
  getMyProfile,
} from "@/lib/customers-api";
import { useCountry } from "@/lib/countries/country-context";
import { CURRENT_COUNTRY } from "@/lib/countries/config";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { createQuotation } from "@/lib/quotation-api";
import {
  CARPET_ITEM_OPTIONS,
  POOL_ITEM_OPTIONS,
  PRESSURE_WASHING_ITEM_OPTIONS,
  formatQuoteItem,
} from "@/lib/content/quote-items";

import TermsAndConditions  from "@/components/booking/termsandConditionPops/terms-condition-pop-up";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

const emptyAddressForm: AddressPayload = {
  streetAddress: "",
  unit: "",
  city: "",
  state: "",
  country: "",
  postalCode: "",
};

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

const emptyContactForm: ContactForm = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
};

/** Single-item on purpose — this deployment only ever serves CURRENT_COUNTRY, so the "select country" field below has nothing else to offer. */
const COUNTRY_OPTIONS = [
  {
    code: CURRENT_COUNTRY.toUpperCase(),
    name: FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY],
    Flag: COUNTRY_FLAGS[CURRENT_COUNTRY],
  },
];

export default function CheckoutPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { status, accessToken } = useAuth();
  const isAuthenticated = status === "authenticated";
  const { country: currentCountry } = useCountry();

  const isChildCare = serviceSlug === "child-care-service";
  const isElderCare = serviceSlug === "elder-care-service";
  const isCarpetService = serviceSlug === "carpet-upholstery-cleaning";
  const isPoolService = serviceSlug === "pool-cleaning";
  const isPressureService = serviceSlug === "precision-pressure-washing";
  const isCareService = isChildCare || isElderCare;
  const isQuoteItemsService = isCarpetService || isPoolService || isPressureService;
  // Carpet/pool/pressure-washing are open-ended quotation requests (the
  // "flow" checkout layout below). Child/elder care has a fixed hourly rate
  // and an exact, already-chosen duration + professional count, so — like
  // regular-home-cleaning — it's a real paid booking and belongs in the
  // standard checkout view instead.
  const isFlowService = isCarpetService || isPoolService || isPressureService;
  const personLabel = isElderCare ? "Elder" : "Child";

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [phonePrefix, setPhonePrefix] = useState("+33");
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddressForm);

  // Care Checkout Location & Logistics — locked to this deployment's own country (see CURRENT_COUNTRY)
  const [selectedCountry, setSelectedCountry] = useState(FALLBACK_COUNTRY_NAMES[CURRENT_COUNTRY]);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unitAptSuite, setUnitAptSuite] = useState("");
  const [howGetIn, setHowGetIn] = useState("");
  const [howHeard, setHowHeard] = useState("");

  // Preferences (flow-service checkout)
  const [numCleaners, setNumCleaners] = useState(1);
  const [durationHours, setDurationHours] = useState(3);
  const [gender, setGender] = useState("no-preference");
  const [language, setLanguage] = useState("no-preference");
  const [requirements, setRequirements] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { translate, registerServiceSlugs } = useLanguage();

  useEffect(() => {
    const stored = loadBookingDraft();
    if (!stored || stored.serviceSlug !== serviceSlug) {
      router.replace(`/services/${serviceSlug}`);
      return;
    }
    setDraft(stored);
    setDraftChecked(true);

    if (stored.howGetIn) setHowGetIn(stored.howGetIn);
    if (stored.howHeard) setHowHeard(stored.howHeard);
    if (stored.numCleaners) setNumCleaners(stored.numCleaners);
    if (stored.durationHours) setDurationHours(stored.durationHours);
    if (stored.genderPreference) setGender(stored.genderPreference);
    if (stored.languagePreference) setLanguage(stored.languagePreference);
    if (stored.specialRequirements) setRequirements(stored.specialRequirements);
  }, [serviceSlug, router]);

  useEffect(() => {
    getServiceBySlug(serviceSlug, currentCountry)
      .then(setService)
      .catch(() => {
        setService(
          withLocaleDefaults({
            id: isCareService ? (isChildCare ? 17 : 18) : 1,
            name: serviceSlug,
            label: isChildCare
              ? "Child Care Service"
              : isElderCare
                ? "Elder Care Service"
                : "Regular Home Cleaning",
            price: isCareService ? "32.00" : "30.00",
            prices: [],
            status: "active",
            category: isCareService ? "care_and_concierge" : "residential_cleaning",
            description: "Eco-luxury care service",
            imageUrl: isChildCare
              ? "/images/services/updated-care-support-services-1-child-care-service.webp"
              : isElderCare
                ? "/images/services/updated-care-support-services-2-elder-care-service.webp"
                : "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
            isBookable: true,
            isQuotable: true,
            servicePackages: [],
            serviceItems: [],
          }),
        );
      });
  }, [serviceSlug, currentCountry, isCareService, isChildCare, isElderCare]);

  // Tells the language switcher this service's locale-specific slugs, so
  // switching language lands on e.g. "nettoyage-regulier" instead of keeping
  // "regular-home-cleaning" — see registerServiceSlugs in language-context.tsx.
  useEffect(() => {
    if (!service) return;
    registerServiceSlugs({ baseSlug: service.name, locales: service.locales });
    return () => registerServiceSlugs(null);
  }, [service, registerServiceSlugs]);

  useEffect(() => {
    if (!draft) return;

    // Care doesn't have a property-size pricing table — duration and
    // professional count were already chosen on the previous page, so the
    // "quote" is computed directly instead of fetched (and is an exact
    // figure, not a range: min === max).
    if (isCareService) {
      if (!service) return;
      const hours = draft.durationHours || 2;
      const cleanerCount = draft.caregiverCount || 1;
      const rate = service.price != null ? Number(service.price) : null;
      setQuote({
        bookable: true,
        minHours: hours,
        maxHours: hours,
        cleanerCount,
        extraCleanerCount: 0,
        priceMin: rate != null ? hours * cleanerCount * rate : null,
        priceMax: rate != null ? hours * cleanerCount * rate : null,
      });
      setQuoteLoading(false);
      return;
    }

    setQuoteLoading(true);
    getServiceQuote(draft.serviceId, draft.propertySizeSqm, currentCountry)
      .then(setQuote)
      .catch(() => {
        const rate = 25;
        const hours = Math.max(2, Math.ceil(draft.propertySizeSqm / 30));
        const cleanerCount = draft.propertySizeSqm > 150 ? 2 : 1;
        setQuote({
          bookable: true,
          minHours: hours,
          maxHours: hours + 1,
          cleanerCount,
          extraCleanerCount: 0,
          priceMin: hours * rate * cleanerCount,
          priceMax: (hours + 1) * rate * cleanerCount,
        });
      })
      .finally(() => setQuoteLoading(false));
  }, [draft, service, currentCountry, isCareService]);

  const loadCustomerData = useCallback(async () => {
    if (!accessToken) return;
    const profileData = await getMyProfile(accessToken);
    setProfile(profileData);
    setContactForm({
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? "",
      email: profileData.email,
      contact: profileData.contact ?? "",
    });
  }, [accessToken]);

  useEffect(() => {
    loadCustomerData().catch(() => undefined);
  }, [loadCustomerData]);

  // Carpet/Pool/Pressure-Washing quotation request (Image 4 Flow) — child/elder
  // care is a real booking now, handled by handleConfirmStandard instead.
  async function handleRequestQuotation() {
    if (!draft) return;
    setError(null);

    if (!contactForm.firstName.trim()) {
      setError("Please enter your First Name.");
      return;
    }
    if (!contactForm.lastName.trim()) {
      setError("Please enter your Last Name.");
      return;
    }
    if (!contactForm.email.trim()) {
      setError("Please enter your Email.");
      return;
    }
    if (!contactForm.contact.trim()) {
      setError("Please enter your Phone number.");
      return;
    }
    if (!streetAddress.trim()) {
      setError("Please enter your Street Address.");
      return;
    }
    if (!city.trim()) {
      setError("Please enter your City.");
      return;
    }
    if (!postalCode.trim()) {
      setError("Please enter your Postal Code.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms and Conditions and Privacy Policy to continue.");
      return;
    }

    setSubmitting(true);
    try {
      const fullPhone = contactForm.contact.startsWith("+")
        ? contactForm.contact.trim()
        : `${phonePrefix} ${contactForm.contact.trim()}`;

      const quoteItemOptions = isCarpetService
        ? CARPET_ITEM_OPTIONS
        : isPoolService
          ? POOL_ITEM_OPTIONS
          : isPressureService
            ? PRESSURE_WASHING_ITEM_OPTIONS
            : [];

      const quoteItemLines = draft.quoteItems
        ? draft.quoteItems.map((item) => formatQuoteItem(item, quoteItemOptions))
        : undefined;

      const quoteTitle = isCarpetService
        ? "Carpet & Upholstery Details"
        : isPoolService
          ? "Pool Cleaning Details"
          : "Pressure Washing Details";

      const propertyTypeValue =
        draft.propertyClassification || draft.propertyType || "Standard";

      const quotation = await createQuotation({
        serviceId: draft.serviceId,
        date: draft.date,
        time: draft.time,
        propertyType: propertyTypeValue,
        quoteItemsTitle: quoteTitle,
        quoteItems: quoteItemLines,
        numCleaners,
        durationHours: durationHours || draft.durationHours || 4,
        genderPreference: gender,
        languagePreference: language,
        specialRequirements: [
          draft.serviceContinuityPlan ? `Continuity Plan: ${draft.serviceContinuityPlan}` : null,
          draft.specialRequest ? `Special Request: ${draft.specialRequest}` : null,
          draft.serviceSpecifics ? `Specifics: ${draft.serviceSpecifics}` : null,
          requirements.trim() ? `Requirements: ${requirements.trim()}` : null,
          draft.documentName ? `Attachment: ${draft.documentName}` : null,
        ]
          .filter(Boolean)
          .join(" | "),
        howGetIn: howGetIn.trim() || undefined,
        howHeard: howHeard.trim() || undefined,
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim(),
        email: contactForm.email.trim(),
        contact: fullPhone,
        streetAddress: streetAddress.trim(),
        unit: unitAptSuite.trim() || undefined,
        city: city.trim(),
        state: stateProvince.trim() || undefined,
        country: selectedCountry,
        postalCode: postalCode.trim(),
      });

      clearBookingDraft();
      router.push(
        `/quotation-confirmation/${quotation.id}?ref=${encodeURIComponent(
          quotation.accessToken
        )}`
      );
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : "We couldn't submit your quotation request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  async function handleConfirmStandard() {
    if (!draft) return;
    if (!agreedToTerms) {
      setError("Please agree to the Terms and Conditions and Privacy Policy to continue.");
      return;
    }
    setError(null);
    setSubmitting(true);
    const note = draft.note || undefined;

    // Child/elder care has no property-size concept — a nominal value here
    // just satisfies the backend's generic validation; the actual pricing
    // comes from durationHours/numCleaners instead (see the quote effect
    // above). The care-profile details collected on the previous page have
    // no dedicated booking field, so they fold into specialRequirements
    // alongside whatever the customer typed in Special Requirements here.
    const careProfiles = isCareService
      ? draft.careProfiles && draft.careProfiles.length > 0
        ? draft.careProfiles
        : draft.careProfile
          ? [draft.careProfile]
          : []
      : [];
    const careProfileLines = careProfiles.flatMap((p, idx, arr) => {
      const prefix = arr.length > 1 ? `${personLabel} ${idx + 1} - ` : "";
      return [
        `${prefix}Name: ${p.name}`,
        `${prefix}Special Needs: ${p.specialNeeds || "None"}`,
        `${prefix}Gender: ${p.gender || "—"}`,
        `${prefix}Age: ${p.age || "—"}`,
        ...(p.behavioralNotes ? [`${prefix}Behavioral Notes: ${p.behavioralNotes}`] : []),
        ...(p.documentName ? [`${prefix}Document: ${p.documentName}`] : []),
      ];
    });
    const specialRequirements = isCareService
      ? [...careProfileLines, requirements.trim() ? `Requirements: ${requirements.trim()}` : null]
          .filter(Boolean)
          .join(" | ") || undefined
      : requirements.trim() || undefined;

    try {
      if (isAuthenticated && accessToken) {
        const address = await createMyAddress(accessToken, addressForm);
        const booking = await createBooking(accessToken, {
          serviceId: draft.serviceId,
          propertySizeSqm: isCareService ? 20 : draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          addressId: address.id,
          note,
          country: currentCountry ?? undefined,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name, price: i.price ?? undefined })),
          supplySource: draft.supplySource || undefined,
          genderPreference: gender,
          languagePreference: language,
          specialRequirements,
          howGetIn: howGetIn.trim() || undefined,
          howHeard: howHeard.trim() || undefined,
          propertyType: isCareService ? draft.scheduleMode || "In-home care" : draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
          category: draft.category,
          durationHours: isCareService ? draft.durationHours || 2 : undefined,
          numCleaners: isCareService ? draft.caregiverCount || 1 : undefined,
          firstName: contactForm.firstName.trim(),
          lastName: contactForm.lastName.trim() || undefined,
          email: contactForm.email.trim(),
          contact: contactForm.contact.trim(),
        });
        try {
          const { redirectUrl } = await initiateCheckout(accessToken, booking.id);
          clearBookingDraft();
          window.location.assign(redirectUrl);
        } catch (checkoutErr) {
          setError(
            checkoutErr instanceof ApiError
              ? checkoutErr.message
              : `Your booking (ref ${booking.referenceNumber}) was created, but we couldn't start payment. Please contact us with this reference number.`,
          );
        }
      } else {
        const booking = await createGuestBooking({
          serviceId: draft.serviceId,
          propertySizeSqm: isCareService ? 20 : draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          pricingCountry: currentCountry ?? undefined,
          note,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name, price: i.price ?? undefined })),
          supplySource: draft.supplySource || undefined,
          genderPreference: gender,
          languagePreference: language,
          specialRequirements,
          howGetIn: howGetIn.trim() || undefined,
          howHeard: howHeard.trim() || undefined,
          propertyType: isCareService ? draft.scheduleMode || "In-home care" : draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
          category: draft.category,
          durationHours: isCareService ? draft.durationHours || 2 : undefined,
          numCleaners: isCareService ? draft.caregiverCount || 1 : undefined,
          firstName: contactForm.firstName.trim(),
          lastName: contactForm.lastName.trim() || undefined,
          email: contactForm.email.trim(),
          contact: contactForm.contact.trim(),
          streetAddress: addressForm.streetAddress.trim(),
          unit: addressForm?.unit?.trim() || undefined,
          city: addressForm.city.trim(),
          state: addressForm?.state?.trim() || undefined,
          country: addressForm?.country?.trim() || undefined,
          postalCode: addressForm?.postalCode?.trim() || undefined,
        });
        try {
          const { redirectUrl } = await initiateGuestCheckout(booking.id, booking.accessToken);
          clearBookingDraft();
          window.location.assign(redirectUrl);
        } catch (checkoutErr) {
          setError(
            checkoutErr instanceof ApiError
              ? checkoutErr.message
              : `Your booking (ref ${booking.referenceNumber}) was created, but we couldn't start payment. Please contact us with this reference number.`,
          );
        }
      }
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to place your booking.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!draftChecked || !draft || !service) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-6 text-sm text-muted-foreground">
        Loading checkout…
      </div>
    );
  }

  const summaryCareProfiles = isCareService
    ? draft.careProfiles && draft.careProfiles.length > 0
      ? draft.careProfiles
      : draft.careProfile
        ? [draft.careProfile]
        : []
    : [];

  const requestDisabledReason =
    !contactForm.firstName.trim() ||
      !contactForm.lastName.trim() ||
      !contactForm.email.trim() ||
      !contactForm.contact.trim() ||
      !streetAddress.trim() ||
      !city.trim() ||
      !postalCode.trim()
      ? "Fill in your contact details and address to continue."
      : !agreedToTerms
        ? "Agree to the Terms and Conditions and Privacy Policy to continue."
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
    <div className={`${poppins.className} min-h-screen bg-[rgb(199,209,217)] pb-16`}>
      <PageHero
        image={
          service.imageUrl ??
          "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"
        }
        eyebrow="Checkout"
        title={getServiceName()}
        subtitle={`${draft.date} at ${draft.time}`}
        servicePrices={service.prices}
        serviceId={service.id}
        hidePriceSelector={isPoolService  || isCarpetService || isPressureService}
        unitLabelKey={isChildCare || isElderCare ? "hourPerProfessional" : undefined}
      />

      {isFlowService ? (
        /* REUSABLE SERVICE FLOW 2-COLUMN CHECKOUT (MATCHING IMAGE 4) */
        <div className="mx-auto mt-8 grid w-full max-w-[1250px] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* LEFT COLUMN: PREFERENCES + SERVICE CHECKOUT DETAILS */}
          <div className="flex flex-col gap-6">
          {isQuoteItemsService && (
            <QuotationPreferencesSection
              numCleaners={numCleaners}
              onNumCleanersChange={setNumCleaners}
              professionalsLabel="Cleaners"
              durationHours={durationHours}
              onDurationHoursChange={setDurationHours}
              gender={gender}
              onGenderChange={setGender}
              language={language}
              onLanguageChange={setLanguage}
              requirements={requirements}
              onRequirementsChange={setRequirements}
            />
          )}

          <Card className="bg-brand-navy text-brand-navy-foreground">
            <CardContent className="flex flex-col gap-0 p-0">
              <div className="px-4 py-3">
                <h3 className="text-base font-bold text-brand-gold">{translate("quoteFormTitle")}</h3>
              </div>
              <div className="flex flex-col gap-6 border-t border-brand-gold/20 p-4">
              {/* 1. CONTACT PROFILE */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {translate("quotationContactProfile")}
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("quoteFormFirstName")} *</Label>
                    <Input
                      value={contactForm.firstName}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      placeholder={translate("quoteFormFirstName")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("quoteFormLastName")} *</Label>
                    <Input
                      value={contactForm.lastName}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      placeholder={translate("quoteFormLastName")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("contactEmailLabel")}</Label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder={translate("contactEmailLabel")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("contactPhoneLabel")} 
                    </Label>
                    <Input
                      type="tel"
                      value={contactForm.contact}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, contact: e.target.value }))
                      }
                      placeholder={translate("contactPhoneLabel")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* 2. ADDRESS */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {translate("summaryAddress")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Country</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
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
                    <Label className="text-xs font-medium text-brand-cream/90">{translate("quoteFormPostalCode")} *</Label>
                    <Input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder={translate("quoteFormPostalCode")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("quoteFormCity")} *</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder={translate("quoteFormCity")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("summaryProvinceState")}</Label>
                    <Input
                      value={stateProvince}
                      onChange={(e) => setStateProvince(e.target.value)}
                      placeholder={translate("summaryProvinceState")}
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("quoteFormStreetAddress")} *</Label>
                    <Input
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder={translate("quoteFormStreetAddress")} 
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-cream/90">Unit/Apt/Suite</Label>
                    <Input
                      value={unitAptSuite}
                      onChange={(e) => setUnitAptSuite(e.target.value)}
                      placeholder="Unit/Apt/Suite"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* 3. LOGISTICS & MARKETING */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  {translate("summaryLogisticsMarketing")}
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 w-full">
                    <Label className="text-xs font-medium text-brand-cream/90">
                    {translate("checkoutHowGetIn")} *</Label>
                    <Select value={howGetIn} onValueChange={setHowGetIn}>
                      <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                        <SelectValue placeholder={translate("checkoutHowGetIn")} />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="I'll be at home">I&apos;ll be at home</SelectItem>
                        <SelectItem value="The key is with doorman">The key is with doorman</SelectItem>
                        <SelectItem value="Lockbox on premises">Lockbox on premises</SelectItem>
                        <SelectItem value="Call to organize">Call to organize</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <Label className="text-xs font-medium text-brand-cream/90">
                      {translate("checkoutHowHeard")} *
                    </Label>
                    <Select value={howHeard} onValueChange={setHowHeard}>
                      <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                        <SelectValue placeholder={translate("checkoutHowHeard")} />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Google">Google</SelectItem>
                        <SelectItem value="Yelp">Yelp</SelectItem>
                        <SelectItem value="Instagram">Instagram</SelectItem>
                        <SelectItem value="Facebook">Facebook</SelectItem>
                        <SelectItem value="Friend/Referred">Friend/Referred</SelectItem>
                        <SelectItem value="Real Estate Professional">Real Estate Professional</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-400 border border-red-500/20">
                  {error}
                </div>
              )}
              </div>
            </CardContent>
          </Card>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <Card className="bg-brand-navy text-brand-navy-foreground">
            <CardContent className="flex flex-col gap-0 p-0">
              <div className="px-4 py-3">
                <h3 className="text-base font-bold text-brand-gold">{translate("quoteDetailsTitle")}</h3>
              </div>

              <div className="flex flex-col gap-4 border-t border-brand-gold/20 p-4">
                {/* SERVICE DETAILS */}
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                    {translate("checkoutServiceDetails")}
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("quoteDetailService")}</span>
                      <span className="font-normal text-white">{draft.serviceLabel}</span>
                    </div>
                  </div>
                </div>

                {/* SELECTED SERVICES (FOR QUOTE ITEMS SERVICES: CARPET, POOL, PRESSURE WASHING) */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                    {translate("checkoutSelectedServices")}
                  </p>
                  <div className="space-y-2.5">
                    {(draft.quoteItems && draft.quoteItems.length > 0 ? draft.quoteItems : []).map((item, idx) => {
                      const options = isCarpetService
                        ? CARPET_ITEM_OPTIONS
                        : isPoolService
                          ? POOL_ITEM_OPTIONS
                          : PRESSURE_WASHING_ITEM_OPTIONS;
                      const option = options.find((o) => o.value === item.optionValue);
                      const formatted = formatQuoteItem(item, options);
                      const detailText = formatted
                        ? formatted.replace(`${option?.label || item.optionValue}, `, "")
                        : `Quantity: ${item.quantity}`;
                      return (
                        <div key={item.id || idx} className="rounded-lg bg-white/5 p-3 text-xs sm:text-sm">
                          <p className="font-bold uppercase text-white">
                            {option?.label || item.optionValue}
                          </p>
                          <p className="mt-1 text-brand-cream/80 text-[11px] sm:text-xs leading-relaxed">
                            {detailText}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* PREFERENCES */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                    {translate("preferencesTitle")}
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("quoteDetailDuration")}</span>
                      <span className="font-normal text-white">{durationHours}h</span>
                    </div>
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("quoteFormCleaners")}</span>
                      <span className="font-normal text-white">{numCleaners}</span>
                    </div>
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("preferencesGender")}</span>
                      <span className="font-normal text-white">
                        {GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "No Preference"}
                      </span>
                    </div>
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("preferencesLanguage")}</span>
                      <span className="font-normal text-white">
                        {LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "No Preference"}
                      </span>
                    </div>
                    {requirements.trim() && (
                      <div className="flex flex-col gap-1 py-1 text-brand-cream/70">
                        <span className="font-medium">{translate("preferencesSpecialRequirements")}</span>
                        <span className="font-normal text-white">{requirements}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* BOOKING DETAILS */}
                <div className="border-t border-brand-gold/20 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                    {translate("checkoutBookingDetails")}
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("quoteDetailDate")}</span>
                      <span className="font-normal text-white">{draft.date}</span>
                    </div>
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">{translate("quoteDetailTime")}</span>
                      <span className="font-normal text-white">{draft.time}</span>
                    </div>
                  </div>
                </div>

                {/* TERMS AGREEMENT */}
                <label
                  htmlFor="agreed-to-terms-flow"
                  className="flex cursor-pointer items-center gap-2 text-xs text-brand-cream/70 select-none"
                >
                  <Checkbox
                    id="agreed-to-terms-flow"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => {
                      if (!agreedToTerms) {
                        setShowTermsModal(true);
                      } else {
                        setAgreedToTerms(checked === true);
                      }
                    }}
                    className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
                  />
                  <span>
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

                {/* REQUEST QUOTATION BUTTON */}
                <Button
                  type="button"
                  disabled={submitting || !!requestDisabledReason}
                  onClick={handleRequestQuotation}
                  className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90"
                >
                  {submitting ? translate("quoteFormProcessing") : translate("quoteFormSubmitBtn")}
                </Button>
                {requestDisabledReason && (
                  <p className="text-center text-xs text-brand-cream/70">{requestDisabledReason}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* STANDARD SERVICE CHECKOUT VIEW */
        <div className="mx-auto grid w-full max-w-[1150px] flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="flex flex-col gap-6">
            {error && <p className="text-sm text-destructive">{error}</p>}

            <ServicePreferencesSection
              gender={gender}
              onGenderChange={setGender}
              language={language}
              onLanguageChange={setLanguage}
              requirements={requirements}
              onRequirementsChange={setRequirements}
            />

            <Card className="bg-brand-navy text-brand-navy-foreground">
              <CardContent className="flex flex-col gap-0 p-0">
                <div className="px-4 py-3">
                  <h3 className="text-base font-bold text-brand-gold">Service Checkout Details</h3>
                </div>

                <div className="flex flex-col gap-4 border-t border-brand-gold/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    Contact Information
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-first-name" className="text-xs font-medium text-brand-cream/90">First Name *</Label>
                      <Input
                        id="contact-first-name"
                        required
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm((f) => ({ ...f, firstName: e.target.value }))
                        }
                        placeholder="First Name"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-last-name" className="text-xs font-medium text-brand-cream/90">Last Name</Label>
                      <Input
                        id="contact-last-name"
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm((f) => ({ ...f, lastName: e.target.value }))
                        }
                        placeholder="Last Name"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-email" className="text-xs font-medium text-brand-cream/90">Email *</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm((f) => ({ ...f, email: e.target.value }))
                        }
                        placeholder="Email"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="contact-phone" className="text-xs font-medium text-brand-cream/90">Phone *</Label>
                      <Input
                        id="contact-phone"
                        type="tel"
                        required
                        value={contactForm.contact}
                        onChange={(e) =>
                          setContactForm((f) => ({ ...f, contact: e.target.value }))
                        }
                        placeholder="Phone number"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-brand-gold/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    Address
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="addressCountry" className="text-xs font-medium text-brand-cream/90">Country</Label>
                      <Select
                        value={addressForm.country}
                        onValueChange={(value) => setAddressForm((f) => ({ ...f, country: value }))}
                      >
                        <SelectTrigger id="addressCountry" className="w-full bg-brand-cream text-brand-navy">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
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
                      <Label htmlFor="postalCode" className="text-xs font-medium text-brand-cream/90">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={addressForm.postalCode}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, postalCode: e.target.value }))
                        }
                        placeholder="Postal Code"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city" className="text-xs font-medium text-brand-cream/90">City *</Label>
                      <Input
                        id="city"
                        required
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, city: e.target.value }))
                        }
                        placeholder="City"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="state" className="text-xs font-medium text-brand-cream/90">Province/State</Label>
                      <Input
                        id="state"
                        value={addressForm.state}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, state: e.target.value }))
                        }
                        placeholder="Province/State"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="streetAddress" className="text-xs font-medium text-brand-cream/90">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        required
                        value={addressForm.streetAddress}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, streetAddress: e.target.value }))
                        }
                        placeholder="Street Address"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="unit" className="text-xs font-medium text-brand-cream/90">Unit/Apt/Suite</Label>
                      <Input
                        id="unit"
                        value={addressForm.unit}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, unit: e.target.value }))
                        }
                        placeholder="Unit/Apt/Suite"
                        className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-brand-gold/20 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand-gold">
                    Logistics &amp; Marketing
                  </p>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-brand-cream/90">How will we get in? *</Label>
                      <Select value={howGetIn} onValueChange={setHowGetIn}>
                        <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                          <SelectValue placeholder="How will we get in?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="I'll be at home">I&apos;ll be at home</SelectItem>
                          <SelectItem value="The key is with doorman">The key is with doorman</SelectItem>
                          <SelectItem value="Lockbox on premises">Lockbox on premises</SelectItem>
                          <SelectItem value="Call to organize">Call to organize</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-brand-cream/90">
                        {translate("checkoutHowHeard")} *
                      </Label>
                      <Select value={howHeard} onValueChange={setHowHeard}>
                        <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                          <SelectValue placeholder={translate("checkoutHowHeard")} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="Yelp">Yelp</SelectItem>
                          <SelectItem value="Instagram">Instagram</SelectItem>
                          <SelectItem value="Facebook">Facebook</SelectItem>
                          <SelectItem value="Friend/Referred">Friend/Referred</SelectItem>
                          <SelectItem value="Real Estate Professional">Real Estate Professional</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:sticky lg:top-6">
            <BookingDetailsCard
              serviceLabel={service.label}
              hourlyRate={service.price}
              quote={quote}
              quoteLoading={quoteLoading}
              date={draft.date}
              time={draft.time}
              propertyType={isCareService ? undefined : draft.propertyType}
              propertySizeSqm={draft.propertySizeSqm}
              hidePropertySize={isCareService}
              isCareService={isCareService}
              genderLabel={
                GENDER_OPTIONS.find((o) => o.value === gender)?.label ??
                "No Preference"
              }
              languageLabel={
                LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ??
                "None"
              }
              specialRequirements={requirements.trim() || undefined}
              packages={draft.packages}
              serviceLevel={draft.disinfectionLevel}
              generalSteamItems={
                draft.steamItems
                  ? GENERAL_STEAM_CARDS.filter((c) => draft.steamItems?.includes(c.title)).map((c) => c.title)
                  : []
              }
              industrialSteamItems={
                draft.steamItems
                  ? INDUSTRIAL_STEAM_CATEGORIES.flatMap((c) => c.details)
                    .filter((i) => draft.steamItems?.includes(i.label))
                    .map((i) => i.label)
                  : []
              }
              serviceCategory={draft.category}
              eventTypes={draft.eventTypes}
              careProfiles={summaryCareProfiles}
              personLabel={isCareService ? personLabel : undefined}
              items={draft.items}
              supplySource={draft.supplySource}
              addOnsTotal={draft.addOnsTotal}
              onBookNow={handleConfirmStandard}
              submitting={submitting}
              bookDisabledReason={
                !contactForm.firstName.trim() ||
                  !contactForm.email.trim() ||
                  !contactForm.contact.trim() ||
                  !addressForm.streetAddress.trim() ||
                  !addressForm.city.trim()
                  ? "Fill in your contact details and address to continue."
                  : !agreedToTerms
                    ? "Agree to the Terms and Conditions and Privacy Policy to continue."
                    : undefined
              }
              agreedToTerms={agreedToTerms}
              onAgreedToTermsChange={setAgreedToTerms}
              onOpenTermsModal={() => setShowTermsModal(true)}
            />
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      <TermsAndConditions
        open={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setAgreedToTerms(true);
          setShowTermsModal(false);
        }}
        variant={isCareService ? "care" : "cleaning"}
      />
    </div>
  );
}
