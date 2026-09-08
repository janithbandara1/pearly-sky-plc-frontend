"use client";

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
} from "@/lib/catalog-api";
import {
  AddressPayload,
  CustomerProfile,
  createMyAddress,
  getMyProfile,
} from "@/lib/customers-api";
import { useCountry } from "@/lib/countries/country-context";
import { SUPPORTED_COUNTRIES } from "@/lib/countries/config";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { createQuotation } from "@/lib/quotation-api";
import {
  CARPET_ITEM_OPTIONS,
  POOL_ITEM_OPTIONS,
  PRESSURE_WASHING_ITEM_OPTIONS,
  formatQuoteItem,
} from "@/lib/content/quote-items";

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

/** Same country list (and country-flag-icons flags) as the navbar's CountrySwitcher/LocaleSwitcher. */
const COUNTRY_OPTIONS = SUPPORTED_COUNTRIES.map((code) => ({
  code: code.toUpperCase(),
  name: FALLBACK_COUNTRY_NAMES[code],
  Flag: COUNTRY_FLAGS[code],
}));

function calculateEndFormatted(startTime: string, hours: number): string {
  if (!startTime) return "—";
  const [hStr, mStr] = startTime.split(":");
  const h = Number(hStr) || 0;
  const m = Number(mStr) || 0;
  const totalMinutes = h * 60 + m + Math.round(hours * 60);
  const endH = Math.floor(totalMinutes / 60) % 24;
  const endM = totalMinutes % 60;
  const endStr = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
  return `${startTime} - ${endStr}`;
}

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
  const isFlowService =
    isCareService ||
    isCarpetService ||
    isPoolService ||
    isPressureService;
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

  // Care Checkout Location & Logistics
  const [selectedCountry, setSelectedCountry] = useState("France");
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
        setService({
          id: isCareService ? (isChildCare ? 17 : 18) : 1,
          name: serviceSlug,
          label: isChildCare
            ? "Child Care Service"
            : isElderCare
              ? "Elder Care Service"
              : "Regular Home Cleaning",
          price: "30.00",
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
        });
      });
  }, [serviceSlug, currentCountry, isCareService, isChildCare, isElderCare]);

  useEffect(() => {
    if (!draft || isCareService) return;
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
  }, [draft, currentCountry, isCareService]);

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

  // Handle Care Service Quotation Request (Image 4 Flow)
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

      const quoteItemsFormatted = isQuoteItemsService && draft.quoteItems
        ? draft.quoteItems.map((item) => formatQuoteItem(item, quoteItemOptions))
        : undefined;

      const careProfiles =
        draft.careProfiles && draft.careProfiles.length > 0
          ? draft.careProfiles
          : draft.careProfile
            ? [draft.careProfile]
            : [];

      const careQuoteItemLines =
        careProfiles.length > 0
          ? careProfiles.flatMap((p, idx, arr) => {
            const prefix = arr.length > 1 ? `${personLabel} ${idx + 1} - ` : "";
            return [
              `${prefix}Name: ${p.name}`,
              `${prefix}Special Needs: ${p.specialNeeds || "None"}`,
              `${prefix}Gender: ${p.gender || "—"}`,
              `${prefix}Age: ${p.age || "—"}`,
              ...(p.behavioralNotes
                ? [`${prefix}Behavioral Notes: ${p.behavioralNotes}`]
                : []),
              ...(p.documentName ? [`${prefix}Document: ${p.documentName}`] : []),
            ];
          })
          : undefined;

      const quoteItemLines = isQuoteItemsService
        ? quoteItemsFormatted
        : careQuoteItemLines;

      const quoteTitle = isCarpetService
        ? "Carpet & Upholstery Details"
        : isPoolService
          ? "Pool Cleaning Details"
          : isPressureService
            ? "Pressure Washing Details"
            : `${personLabel} Details`;

      const propertyTypeValue =
        draft.propertyClassification ||
        draft.propertyType ||
        (isCareService ? draft.scheduleMode : "Standard") ||
        "Standard";

      const quotation = await createQuotation({
        serviceId: draft.serviceId,
        date: draft.date,
        time: draft.time,
        propertyType: propertyTypeValue,
        quoteItemsTitle: quoteTitle,
        quoteItems: quoteItemLines,
        numCleaners: isCareService ? draft.caregiverCount || 1 : numCleaners,
        durationHours: durationHours || draft.durationHours || 4,
        genderPreference: isCareService ? draft.caregiverGender || draft.genderPreference : gender,
        languagePreference: isCareService ? draft.languagePreference : language,
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
    try {
      if (isAuthenticated && accessToken) {
        const address = await createMyAddress(accessToken, addressForm);
        const booking = await createBooking(accessToken, {
          serviceId: draft.serviceId,
          propertySizeSqm: draft.propertySizeSqm,
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
          specialRequirements: requirements.trim() || undefined,
          howGetIn: howGetIn.trim() || undefined,
          howHeard: howHeard.trim() || undefined,
          propertyType: draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
          category: draft.category,
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
          propertySizeSqm: draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          pricingCountry: currentCountry ?? undefined,
          note,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name, price: i.price ?? undefined })),
          supplySource: draft.supplySource || undefined,
          genderPreference: gender,
          languagePreference: language,
          specialRequirements: requirements.trim() || undefined,
          howGetIn: howGetIn.trim() || undefined,
          howHeard: howHeard.trim() || undefined,
          propertyType: draft.propertyType,
          facilities: draft.facilities,
          disinfectionLevel: draft.disinfectionLevel
            ? { name: draft.disinfectionLevel.name, price: draft.disinfectionLevel.price ?? undefined }
            : undefined,
          steamItems: draft.steamItems,
          eventTypes: draft.eventTypes,
          category: draft.category,
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

  const durationText =
    draft.durationMode === "half_day"
      ? "Half Day"
      : draft.durationMode === "full_day"
        ? "Full Day"
        : `${draft.durationHours || 2} Hours`;

  const durationHoursValue =
    draft.durationMode === "half_day"
      ? 4
      : draft.durationMode === "full_day"
        ? 8
        : draft.durationHours || 2;

  const startEndTimeFormatted = calculateEndFormatted(draft.time, durationHoursValue);

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

  return (
    <div className={`${poppins.className} min-h-screen bg-[rgb(199,209,217)] pb-16`}>
      <PageHero
        image={
          service.imageUrl ??
          "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp"
        }
        eyebrow="Checkout"
        title={service.label}
        subtitle={`${draft.date} at ${draft.time}`}
        servicePrices={service.prices}
        serviceId={service.id}
        hidePriceSelector={isPoolService || isCareService || isCarpetService || isPressureService}
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
                <h3 className="text-base font-bold text-brand-gold">Service Checkout Details</h3>
              </div>

              <div className="flex flex-col gap-6 border-t border-brand-gold/20 p-4">
              {/* 1. CONTACT PROFILE */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Contact Profile
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">First Name *</Label>
                    <Input
                      value={contactForm.firstName}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, firstName: e.target.value }))
                      }
                      placeholder="First Name"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Last Name *</Label>
                    <Input
                      value={contactForm.lastName}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, lastName: e.target.value }))
                      }
                      placeholder="Last Name"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Email *</Label>
                    <Input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="Email"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Phone number *</Label>
                    <Input
                      type="tel"
                      value={contactForm.contact}
                      onChange={(e) =>
                        setContactForm((prev) => ({ ...prev, contact: e.target.value }))
                      }
                      placeholder="Phone number"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* 2. ADDRESS */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-brand-gold">
                  Address
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
                    <Label className="text-xs font-medium text-brand-cream/90">Postal Code *</Label>
                    <Input
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                      placeholder="Postal Code"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">City *</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Province/State</Label>
                    <Input
                      value={stateProvince}
                      onChange={(e) => setStateProvince(e.target.value)}
                      placeholder="Province/State"
                      className="bg-brand-cream text-brand-navy placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-cream/90">Street Address *</Label>
                    <Input
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street Address"
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
                  Logistics & Marketing
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 w-full">
                    <Label className="text-xs font-medium text-brand-cream/90">How will we get in? *</Label>
                    <Select value={howGetIn} onValueChange={setHowGetIn}>
                      <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                        <SelectValue placeholder="How will we get in?" />
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
                      How did you hear about us? *
                    </Label>
                    <Select value={howHeard} onValueChange={setHowHeard} >
                      <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                        <SelectValue placeholder="How did you hear about us?" />
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
                <h3 className="text-base font-bold text-brand-gold">Quotation Details</h3>
              </div>

              <div className="flex flex-col gap-4 border-t border-brand-gold/20 p-4">
                {/* SERVICE DETAILS */}
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                    Service Details
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                      <span className="font-medium">Service</span>
                      <span className="font-normal text-white">{draft.serviceLabel}</span>
                    </div>
                    {isCareService && (
                      <>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Schedule Mode</span>
                          <span className="font-normal text-white">{draft.scheduleMode || "In-home care"}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Service Duration</span>
                          <span className="font-normal text-white">{durationText}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Count of {personLabel}</span>
                          <span className="font-normal text-white">{draft.personCount || 1}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Request Care Professionals</span>
                          <span className="font-normal text-white">{draft.caregiverCount || 1}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Select Date</span>
                          <span className="font-normal text-white">{draft.date}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Select Start &amp; End Time</span>
                          <span className="font-normal text-white">{startEndTimeFormatted}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* SELECTED SERVICES (FOR QUOTE ITEMS SERVICES: CARPET, POOL, PRESSURE WASHING) */}
                {isQuoteItemsService ? (
                  <>
                    <div className="border-t border-brand-gold/20 pt-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                        Selected Services
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
                        Preferences
                      </p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Duration</span>
                          <span className="font-normal text-white">{durationHours}h</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Cleaners</span>
                          <span className="font-normal text-white">{numCleaners}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Gender Preference</span>
                          <span className="font-normal text-white">
                            {GENDER_OPTIONS.find((o) => o.value === gender)?.label ?? "No Preference"}
                          </span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Language Preference</span>
                          <span className="font-normal text-white">
                            {LANGUAGE_OPTIONS.find((o) => o.value === language)?.label ?? "No Preference"}
                          </span>
                        </div>
                        {requirements.trim() && (
                          <div className="flex flex-col gap-1 py-1 text-brand-cream/70">
                            <span className="font-medium">Special Requirements</span>
                            <span className="font-normal text-white">{requirements}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* BOOKING DETAILS */}
                    <div className="border-t border-brand-gold/20 pt-4">
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                        Booking Details
                      </p>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Date</span>
                          <span className="font-normal text-white">{draft.date}</span>
                        </div>
                        <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                          <span className="font-medium">Time</span>
                          <span className="font-normal text-white">{draft.time}</span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                  {/* CHILD'S / ELDER'S PROFILE */}
                  <div className="border-t border-brand-gold/20 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                      {personLabel.toUpperCase()}&rsquo;S PROFILE
                      {draft.careProfiles && draft.careProfiles.length > 1 ? "S" : ""}
                    </p>
                    <div className="space-y-2.5">
                      {(draft.careProfiles && draft.careProfiles.length > 0
                        ? draft.careProfiles
                        : draft.careProfile
                          ? [draft.careProfile]
                          : []
                      ).map((p, idx, arr) => (
                        <div key={idx} className="rounded-lg bg-white/5 p-3 text-xs sm:text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <p className="font-bold text-white">
                              {p.name || `Profile ${idx + 1}`}
                            </p>
                            {arr.length > 1 && (
                              <span className="rounded bg-brand-gold/20 px-2 py-0.5 text-[10px] font-semibold text-brand-gold">
                                {personLabel} {idx + 1}
                              </span>
                            )}
                          </div>
                          <p className="mt-1 text-brand-cream/80 text-[11px] sm:text-xs leading-relaxed">
                            Special Needs: {p.specialNeeds || "None"}, Gender: {p.gender || "—"}, Age: {p.age || "—"}
                          </p>
                          {p.documentName && (
                            <p className="mt-1 truncate text-[11px] text-emerald-400">
                              Attachment: {p.documentName}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PREFERENCES */}
                  <div className="border-t border-brand-gold/20 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gold/80">
                      Preferences
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                        <span className="font-medium">Gender Preference</span>
                        <span className="font-normal text-white">
                          {GENDER_OPTIONS.find((o) => o.value === draft.genderPreference)?.label ?? "No Preference"}
                        </span>
                      </div>
                      <div className="flex justify-between gap-2 py-1 text-brand-cream/70">
                        <span className="font-medium">Language Preference</span>
                        <span className="font-normal text-white">
                          {LANGUAGE_OPTIONS.find((o) => o.value === draft.languagePreference)?.label ?? "No Preference"}
                        </span>
                      </div>
                      {draft.specialRequirements && (
                        <div className="flex flex-col gap-1 py-1 text-brand-cream/70">
                          <span className="font-medium">Special Requirements</span>
                          <span className="font-normal text-white">{draft.specialRequirements}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  </>
                )}

                {/* TERMS AGREEMENT */}
                <label
                  htmlFor="agreed-to-terms"
                  className="flex cursor-pointer items-center gap-2 text-xs text-brand-cream/70"
                >
                  <Checkbox
                    id="agreed-to-terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                    className="border-brand-gold data-checked:border-brand-gold data-checked:bg-brand-gold"
                  />
                  <span>
                    I agree to the{" "}
                    <Link href="/terms-and-conditions" target="_blank" className="underline">
                      Terms and Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy-policy" target="_blank" className="underline">
                      Privacy Policy
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
                  {submitting ? "SUBMITTING REQUEST…" : "REQUEST QUOTATION"}
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
                        How did you hear about us? *
                      </Label>
                      <Select value={howHeard} onValueChange={setHowHeard}>
                        <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                          <SelectValue placeholder="How did you hear about us?" />
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
              propertyType={draft.propertyType}
              propertySizeSqm={draft.propertySizeSqm}
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
            />
          </div>
        </div>
      )}
    </div>
  );
}
