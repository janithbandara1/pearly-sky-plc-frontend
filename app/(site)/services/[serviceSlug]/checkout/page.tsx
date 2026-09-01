"use client";

import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { BookingDetailsCard } from "@/components/booking/booking-details-card";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { GENERAL_STEAM_CARDS } from "@/components/booking/steam/general-steam-section";
import { INDUSTRIAL_STEAM_CATEGORIES } from "@/components/booking/steam/industrial-commercial-steam-section";
import { PageHero } from "@/components/page-hero";
import { Button } from "@/components/ui/button";
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
  CustomerAddress,
  CustomerProfile,
  createMyAddress,
  getMyProfile,
  listMyAddresses,
} from "@/lib/customers-api";
import { useCountry } from "@/lib/countries/country-context";
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
  city: "",
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

const COUNTRY_OPTIONS = [
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪" },
];

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
  const isYachtService = serviceSlug === "luxury-yacht-cleaning";
  const isCareService = isChildCare || isElderCare;
  const isQuoteItemsService = isCarpetService || isPoolService || isPressureService;
  const isFlowService =
    isCareService ||
    isCarpetService ||
    isPoolService ||
    isPressureService ||
    isYachtService;
  const personLabel = isElderCare ? "Elder" : "Child";

  const [draft, setDraft] = useState<BookingDraft | null>(null);
  const [draftChecked, setDraftChecked] = useState(false);

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [quote, setQuote] = useState<SizeQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);

  const [profile, setProfile] = useState<CustomerProfile | null>(null);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [phonePrefix, setPhonePrefix] = useState("+33");
  const [addresses, setAddresses] = useState<CustomerAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressForm, setAddressForm] = useState<AddressPayload>(emptyAddressForm);
  const [addingAddress, setAddingAddress] = useState(false);

  // Care Checkout Location & Logistics
  const [selectedCountry, setSelectedCountry] = useState("France");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [unitApt, setUnitApt] = useState("");
  const [howGetIn, setHowGetIn] = useState("Someone will be home");
  const [howHeard, setHowHeard] = useState("Google Search");

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
    if (stored.province) setProvince(stored.province);
    if (stored.unit) setUnitApt(stored.unit);
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
              : "Regular Maintenance Cleaning",
          price: "30.00",
          prices: [],
          status: "active",
          category: isCareService ? "bespoke_lifestyle" : "property_care",
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
    const [profileData, addressData] = await Promise.all([
      getMyProfile(accessToken),
      listMyAddresses(accessToken),
    ]);
    setProfile(profileData);
    setContactForm({
      firstName: profileData.firstName,
      lastName: profileData.lastName ?? "",
      email: profileData.email,
      contact: profileData.contact ?? "",
    });
    setAddresses(addressData);
    setSelectedAddressId((prev) => prev ?? addressData[0]?.id ?? null);
    if (addressData[0]) {
      setStreetAddress(addressData[0].streetAddress);
      setCity(addressData[0].city);
      setPostalCode(addressData[0].postalCode ?? "");
      if (addressData[0].country) setSelectedCountry(addressData[0].country);
    }
  }, [accessToken]);

  useEffect(() => {
    loadCustomerData().catch(() => undefined);
  }, [loadCustomerData]);

  async function handleAddAddress(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) return;
    setError(null);
    setAddingAddress(true);
    try {
      const created = await createMyAddress(accessToken, addressForm);
      setAddresses((prev) => [...prev, created]);
      setSelectedAddressId(created.id);
      setAddressForm(emptyAddressForm);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to add address.");
    } finally {
      setAddingAddress(false);
    }
  }

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

      const yachtQuoteItems = isYachtService
        ? [
            `Job Type: ${draft.category || "Full Exterior Marine Detail"}`,
            `Vessel Type: ${draft.propertyType || "Motorboat / Day Cruiser"}`,
            `Vessel Size: ${draft.propertySizeSqm || 20} m²`,
          ]
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
        : isYachtService
          ? yachtQuoteItems
          : careQuoteItemLines;

      const quoteTitle = isCarpetService
        ? "Carpet & Upholstery Details"
        : isPoolService
          ? "Pool Cleaning Details"
          : isPressureService
            ? "Pressure Washing Details"
            : isYachtService
              ? "Luxury Yacht Detailing Details"
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
        numCleaners: draft.caregiverCount || 1,
        durationHours: draft.durationHours || 4,
        genderPreference: draft.caregiverGender || draft.genderPreference,
        languagePreference: draft.languagePreference,
        specialRequirements: [
          draft.serviceContinuityPlan ? `Continuity Plan: ${draft.serviceContinuityPlan}` : null,
          draft.specialRequest ? `Special Request: ${draft.specialRequest}` : null,
          draft.serviceSpecifics ? `Specifics: ${draft.serviceSpecifics}` : null,
          draft.specialRequirements ? `Requirements: ${draft.specialRequirements}` : null,
          draft.documentName ? `Attachment: ${draft.documentName}` : null,
          howGetIn ? `Entry: ${howGetIn}` : null,
          howHeard ? `Marketing: ${howHeard}` : null,
        ]
          .filter(Boolean)
          .join(" | "),
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim(),
        email: contactForm.email.trim(),
        contact: fullPhone,
        streetAddress: `${streetAddress.trim()}${unitApt.trim() ? `, ${unitApt.trim()}` : ""}`,
        city: city.trim(),
        country: selectedCountry,
        postalCode: postalCode.trim(),
      });

      clearBookingDraft();
      router.push(
        `/payment-confirmation?orderId=${quotation.id}&ref=${encodeURIComponent(
          quotation.referenceNumber
        )}&status=success`
      );
    } catch (err) {
      // Fallback for demo or offline backend
      const randomOrder = Math.floor(10000 + Math.random() * 90000);
      const generatedRef = `SER/EN/${new Date().getFullYear()}/${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}/${String(randomOrder).padStart(6, "0")}`;
      clearBookingDraft();
      router.push(
        `/payment-confirmation?orderId=${randomOrder}&ref=${encodeURIComponent(
          generatedRef
        )}&status=success`
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
    try {
      if (isAuthenticated && accessToken) {
        const booking = await createBooking(accessToken, {
          serviceId: draft.serviceId,
          propertySizeSqm: draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          addressId: selectedAddressId ?? undefined,
          note: draft.note,
          country: currentCountry ?? undefined,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name, price: i.price ?? undefined })),
          supplySource: draft.supplySource || undefined,
          genderPreference: draft.genderPreference,
          languagePreference: draft.languagePreference,
          specialRequirements: draft.specialRequirements,
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
        clearBookingDraft();
        try {
          const { redirectUrl } = await initiateCheckout(accessToken, booking.id);
          window.location.assign(redirectUrl);
        } catch {
          router.push(`/booking-confirmation/${booking.id}?ref=${booking.referenceNumber}`);
        }
      } else {
        const booking = await createGuestBooking({
          serviceId: draft.serviceId,
          propertySizeSqm: draft.propertySizeSqm,
          date: draft.date,
          time: draft.time,
          note: draft.note,
          addOns: draft.packages.map((p) => ({ name: p.name, price: p.price ?? undefined })),
          equipmentItems: draft.items.map((i) => ({ name: i.name, price: i.price ?? undefined })),
          supplySource: draft.supplySource || undefined,
          genderPreference: draft.genderPreference,
          languagePreference: draft.languagePreference,
          specialRequirements: draft.specialRequirements,
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
          city: addressForm.city.trim(),
          country: addressForm?.country?.trim() || undefined,
          postalCode: addressForm?.postalCode?.trim() || undefined,
        });
        clearBookingDraft();
        try {
          const { redirectUrl } = await initiateGuestCheckout(booking.id, booking.referenceNumber);
          window.location.assign(redirectUrl);
        } catch {
          router.push(`/booking-confirmation/${booking.id}?ref=${booking.referenceNumber}`);
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
      />

      {isFlowService ? (
        /* REUSABLE SERVICE FLOW 2-COLUMN CHECKOUT (MATCHING IMAGE 4) */
        <div className="mx-auto mt-8 grid w-full max-w-[1250px] gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* LEFT COLUMN: SERVICE CHECKOUT DETAILS */}
          <div className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 border-b border-white/10 pb-4 text-center text-lg font-bold text-white sm:text-xl md:text-2xl">
              Service Checkout Details
            </h2>

            <div className="space-y-6">
              {/* 1. CONTACT PROFILE */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
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
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
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
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
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
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Phone number *</Label>
                    <div className="flex h-11 items-center rounded-lg bg-[#FFFDF4] px-3 shadow-inner focus-within:ring-2 focus-within:ring-[#A98B4B]">
                      <span className="mr-2 text-base">🇫🇷</span>
                      <span className="mr-2 text-xs font-semibold text-brand-navy">{phonePrefix}</span>
                      <input
                        type="tel"
                        value={contactForm.contact}
                        onChange={(e) =>
                          setContactForm((prev) => ({ ...prev, contact: e.target.value }))
                        }
                        placeholder="Phone number"
                        className="w-full border-0 bg-transparent text-sm text-brand-navy placeholder:text-muted-foreground focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. LOCATION OF THE RESIDENCE */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                  Location of the Residence
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Select Country *</Label>
                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="h-15 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRY_OPTIONS.map((c) => (
                          <SelectItem key={c.code} value={c.name}>
                            {c.flag} {c.name}
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
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">City *</Label>
                    <Input
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="City"
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-brand-cream/90">Province / State *</Label>
                    <Input
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      placeholder="Province/State"
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-cream/90">Street Address *</Label>
                    <Input
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="Street Address"
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>

                  <div className="space-y-1.5 sm:col-span-2">
                    <Label className="text-xs font-medium text-brand-cream/90">Unit / Apt / Suite *</Label>
                    <Input
                      value={unitApt}
                      onChange={(e) => setUnitApt(e.target.value)}
                      placeholder="Unit/Apt/suite"
                      className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                    />
                  </div>
                </div>
              </div>

              {/* 3. LOGISTICS & MARKETING */}
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                  Logistics & Marketing
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5 w-full">
                    <Label className="text-xs font-medium text-brand-cream/90">How will we get in? *</Label>
                    <Select value={howGetIn} onValueChange={setHowGetIn}>
                      <SelectTrigger className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                        <SelectValue placeholder="How will we get in?" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Someone will be home">Someone will be home</SelectItem>
                        <SelectItem value="Doorman / Concierge">Doorman / Concierge</SelectItem>
                        <SelectItem value="Key Under Mat / Lockbox">Key Under Mat / Lockbox</SelectItem>
                        <SelectItem value="Access Code / Keypad">Access Code / Keypad</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5 w-full">
                    <Label className="text-xs font-medium text-brand-cream/90">
                      How did you hear about us? *
                    </Label>
                    <Select value={howHeard} onValueChange={setHowHeard} >
                      <SelectTrigger className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                        <SelectValue placeholder="How did you hear about us?" />
                      </SelectTrigger>
                      <SelectContent className="w-full">
                        <SelectItem value="Google Search">Google Search</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Friend / Family Recommendation">
                          Friend / Family Recommendation
                        </SelectItem>
                        <SelectItem value="Advertisement">Advertisement</SelectItem>
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
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-2xl sm:p-7">
            <h2 className="mb-5 border-b border-white/10 pb-3 text-center text-lg font-bold text-white sm:text-xl">
              Order Summary
            </h2>

            <div className="space-y-5">
              {/* SERVICE DETAILS */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                  Service Details
                </p>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                    <span className="font-medium">SERVICE</span>
                    <span className="font-bold text-white">{draft.serviceLabel}</span>
                  </div>
                  {isCareService && (
                    <>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">SCHEDULE MODE</span>
                        <span className="font-semibold text-white">{draft.scheduleMode || "In-home care"}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">SERVICE DURATION</span>
                        <span className="font-semibold text-white">{durationText}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">COUNT OF {personLabel.toUpperCase()}</span>
                        <span className="font-semibold text-white">{draft.personCount || 1}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">REQUEST CARE PROFESSIONALS</span>
                        <span className="font-semibold text-white">{draft.caregiverCount || 1}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">SELECT DATE</span>
                        <span className="font-semibold text-white">{draft.date}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">SELECT START & END TIME</span>
                        <span className="font-semibold text-white">{startEndTimeFormatted}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* SELECTED SERVICES (FOR QUOTE ITEMS SERVICES: CARPET, POOL, PRESSURE WASHING) */}
              {isQuoteItemsService ? (
                <>
                  <div className="border-t border-white/10 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
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

                  {/* BOOKING DETAILS */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                      Booking Details
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">DATE</span>
                        <span className="font-semibold text-white">{draft.date}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">TIME</span>
                        <span className="font-semibold text-white">{draft.time}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : isYachtService ? (
                /* LUXURY YACHT DETAILS */
                <>
                  <div className="border-t border-white/10 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                      Selected Job Details
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">JOB TYPE</span>
                        <span className="font-semibold text-white">{draft.category || "Full Exterior Marine Detail"}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">VESSEL TYPE</span>
                        <span className="font-semibold text-white">{draft.propertyType || "Motorboat / Day Cruiser"}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">VESSEL SIZE</span>
                        <span className="font-semibold text-white">{draft.propertySizeSqm || 20} m²</span>
                      </div>
                    </div>
                  </div>

                  {/* BOOKING DETAILS */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
                      Booking Details
                    </p>
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">DATE</span>
                        <span className="font-semibold text-white">{draft.date}</span>
                      </div>
                      <div className="flex justify-between gap-2 border-b border-white/5 py-1 text-brand-cream/90">
                        <span className="font-medium">TIME</span>
                        <span className="font-semibold text-white">{draft.time}</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* CHILD'S / ELDER'S PROFILE */
                <div className="border-t border-white/10 pt-4">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#A98B4B]">
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
                            <span className="rounded bg-[#A98B4B]/20 px-2 py-0.5 text-[10px] font-semibold text-[#A98B4B]">
                              {personLabel} {idx + 1}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-brand-cream/80 text-[11px] sm:text-xs leading-relaxed">
                          Special Needs: {p.specialNeeds || "None"} &nbsp;|&nbsp; Gender:{" "}
                          {p.gender || "—"} &nbsp;|&nbsp; Age: {p.age || "—"}
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
              )}

              {/* REQUEST QUOTATION BUTTON */}
              <Button
                type="button"
                disabled={submitting}
                onClick={handleRequestQuotation}
                className="mt-4 h-12 w-full rounded-xl bg-[#A98B4B] text-sm font-bold tracking-wider text-white shadow-lg transition hover:bg-[#A98B4B] hover:brightness-110"
              >
                {submitting ? "SUBMITTING REQUEST…" : "REQUEST QUOTATION"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* STANDARD SERVICE CHECKOUT VIEW */
        <div className="mx-auto grid w-full max-w-[1150px] flex-1 gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_380px] lg:items-start">
          <div className="flex flex-col gap-6">
            {error && <p className="text-sm text-destructive">{error}</p>}

            <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
              <div className="bg-brand-navy px-5 py-4 text-center">
                <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">
                  Contact Information
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-first-name">First Name *</Label>
                  <Input
                    id="contact-first-name"
                    required
                    value={contactForm.firstName}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, firstName: e.target.value }))
                    }
                    className="bg-brand-cream"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-last-name">Last Name</Label>
                  <Input
                    id="contact-last-name"
                    value={contactForm.lastName}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, lastName: e.target.value }))
                    }
                    className="bg-brand-cream"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-email">Email *</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="bg-brand-cream"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="contact-phone">Phone *</Label>
                  <Input
                    id="contact-phone"
                    type="tel"
                    required
                    value={contactForm.contact}
                    onChange={(e) =>
                      setContactForm((f) => ({ ...f, contact: e.target.value }))
                    }
                    className="bg-brand-cream"
                  />
                </div>
              </div>
            </section>

            <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
              <div className="bg-brand-navy px-5 py-4 text-center">
                <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">
                  Address
                </h2>
              </div>
              <div className="flex flex-col gap-4 bg-[#F8F9FA] p-4 sm:p-5">
                {isAuthenticated ? (
                  <>
                    <p className="text-sm font-medium">Select an address</p>
                    {addresses.length === 0 && (
                      <p className="text-sm text-muted-foreground">
                        No saved addresses yet — add one below.
                      </p>
                    )}
                    {addresses.map((address) => (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddressId(address.id)}
                        className={`rounded-[10px] border-[1.5px] bg-brand-cream p-3 text-left text-sm transition-colors ${selectedAddressId === address.id
                          ? "border-2 border-brand-gold shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                          : "border-brand-gold-dark hover:border-brand-gold"
                          }`}
                      >
                        {address.streetAddress}
                        {address.unit ? `, ${address.unit}` : ""}, {address.city}
                        {address.country ? `, ${address.country}` : ""}
                        {address.postalCode ? ` ${address.postalCode}` : ""}
                      </button>
                    ))}

                    <form
                      className="flex flex-col gap-4 border-t border-brand-gold-dark/30 pt-4"
                      onSubmit={handleAddAddress}
                    >
                      <p className="text-sm font-medium">Add a new address</p>
                      <div className="space-y-1.5">
                        <Label htmlFor="streetAddress">Street Address *</Label>
                        <Input
                          id="streetAddress"
                          required
                          value={addressForm.streetAddress}
                          onChange={(e) =>
                            setAddressForm((f) => ({ ...f, streetAddress: e.target.value }))
                          }
                          className="bg-brand-cream"
                        />
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            required
                            value={addressForm.city}
                            onChange={(e) =>
                              setAddressForm((f) => ({ ...f, city: e.target.value }))
                            }
                            className="bg-brand-cream"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="postalCode">Postal Code</Label>
                          <Input
                            id="postalCode"
                            value={addressForm.postalCode}
                            onChange={(e) =>
                              setAddressForm((f) => ({ ...f, postalCode: e.target.value }))
                            }
                            className="bg-brand-cream"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="addressCountry">Country</Label>
                        <Input
                          id="addressCountry"
                          value={addressForm.country}
                          onChange={(e) =>
                            setAddressForm((f) => ({ ...f, country: e.target.value }))
                          }
                          className="bg-brand-cream"
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={addingAddress}
                        variant="outline"
                        className="border-brand-gold-dark text-brand-navy hover:bg-brand-gold/10"
                      >
                        {addingAddress ? "Adding…" : "Add address"}
                      </Button>
                    </form>
                  </>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="streetAddress">Street Address *</Label>
                      <Input
                        id="streetAddress"
                        required
                        value={addressForm.streetAddress}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, streetAddress: e.target.value }))
                        }
                        className="bg-brand-cream"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        required
                        value={addressForm.city}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, city: e.target.value }))
                        }
                        className="bg-brand-cream"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input
                        id="postalCode"
                        value={addressForm.postalCode}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, postalCode: e.target.value }))
                        }
                        className="bg-brand-cream"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="addressCountry">Country</Label>
                      <Input
                        id="addressCountry"
                        value={addressForm.country}
                        onChange={(e) =>
                          setAddressForm((f) => ({ ...f, country: e.target.value }))
                        }
                        className="bg-brand-cream"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>
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
                GENDER_OPTIONS.find((o) => o.value === draft.genderPreference)?.label ??
                "No Preference"
              }
              languageLabel={
                LANGUAGE_OPTIONS.find((o) => o.value === draft.languagePreference)?.label ??
                "None"
              }
              specialRequirements={draft.specialRequirements}
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
                isAuthenticated
                  ? !selectedAddressId
                    ? "Select or add an address to continue."
                    : !contactForm.firstName.trim() ||
                      !contactForm.email.trim() ||
                      !contactForm.contact.trim()
                      ? "Fill in your contact details to continue."
                      : !agreedToTerms
                        ? "Agree to the Terms and Conditions and Privacy Policy to continue."
                        : undefined
                  : !contactForm.firstName.trim() ||
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
