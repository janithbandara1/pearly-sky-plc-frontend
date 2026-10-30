"use client";

import { poppins } from "../services/[serviceSlug]/service-booking-view";
import { usePoolTheme } from "@/lib/pool-theme-context";
import { PageHero } from "@/components/page-hero";
import { HomeService } from "@/lib/catalog-api";
import QuotePropertyTypeSelector from "@/components/quotation-new-view/QuotePropertyCategory";
import { PropertySizeSelector } from "@/components/booking/common-flows-propertis-and-equipments/common-property-types";
import ServiceCrewParameters from "@/components/quotation-new-view/service-crew-hours";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { useState } from "react";
import EcoServicesSelector from "@/components/quotation-new-view/list-of-services";
import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { AddressPayload } from "@/lib/customers-api";
import CustomerContactsPreference, { ContactFormData } from "@/components/booking/booking new flow/CustomerContactsPreference";
import { CheckoutAttachment, uploadedAttachments } from "@/components/booking/checkout-attachment-upload";
import QuotationInquiryOverview from "@/components/quotation-new-view/QuotationInquiryOverview";
import BookingValidationModal from "@/components/booking/BookingValidationModal";
import { createQuotation } from "@/lib/quotation-api";
import { useRouter } from "next/navigation";
import { ApiError } from "@/lib/api";
import { useLanguage } from "@/lib/i18n/language-context";
import { AlertCircle, CheckCircle2, X } from "lucide-react";

export default function RequestDetailedQuotationPage({
  services,
}: {
  services: HomeService[];
}) {
  const router = useRouter();
  const { language: siteLanguage } = useLanguage();
  const { theme: poolTheme } = usePoolTheme();

  // 1. Property Type
  const [selectedProperty, setSelectedProperty] = useState("Townhouse");

  // 2. Property Size (default 20m², allows up to 500,000m² in quote mode)
  const [propertySizeSqm, setPropertySizeSqm] = useState(20);

  // 3. Crew Staffing & Duration & Frequency (no default frequency)
  const [cleaners, setCleaners] = useState(3);
  const [hours, setHours] = useState(4);
  const [frequency, setFrequency] = useState<string | null>(null);

  // 4. Selected Eco-Luxury Service (single selection)
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);

  // 5. Schedule
  const [date, setDate] = useState("2026-10-25");
  const [time, setTime] = useState("Morning");

  // 6. Preferences
  const [gender, setGender] = useState(GENDER_OPTIONS[0].value);
  const [language, setLanguage] = useState(LANGUAGE_OPTIONS[0].value);
  const [requirements, setRequirements] = useState("");
  const [attachments, setAttachments] = useState<CheckoutAttachment[]>([]);

  // 7. Contact Details
  const [contactForm, setContactForm] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
  });

  // 8. Address
  const [addressForm, setAddressForm] = useState<AddressPayload>({
    streetAddress: "",
    unit: "",
    city: "",
    state: "",
    country: "United Arab Emirates",
    postalCode: "",
  });

  const [howGetIn, setHowGetIn] = useState<string>("someone_home");
  const [howHeard, setHowHeard] = useState<string>("Google");

  // Submission & Validation States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmitQuotation = async () => {
    setValidationErrors([]);
    setSubmitError(null);

    const errors: string[] = [];

    // Validation checks
    if (!selectedProperty) {
      errors.push("Please select a property category.");
    }

    if (!selectedServiceId) {
      errors.push("Please select an eco-luxury service treatment.");
    }

    if (!date) {
      errors.push("Please select a target schedule date.");
    }

    if (!time) {
      errors.push("Please select a target schedule time window.");
    }

    if (!contactForm.firstName.trim()) {
      errors.push("Please enter your first name in the contact details form.");
    }

    if (!contactForm.email.trim()) {
      errors.push("Please enter your email address in the contact details form.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())) {
      errors.push("Please provide a valid email address (e.g. name@domain.com).");
    }

    if (!contactForm.contact.trim()) {
      errors.push("Please provide your contact phone number.");
    }

    if (!addressForm.streetAddress.trim()) {
      errors.push("Please enter your street address.");
    }

    if (!addressForm.city.trim()) {
      errors.push("Please enter your city.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsErrorModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Find selected service name
      const selectedServiceObj = services.find((s) => s.id === selectedServiceId) ?? services[0];
      const selectedServiceName = selectedServiceObj?.label ?? "Regular Home Cleaning";

      const quotation = await createQuotation({
        serviceId: selectedServiceId ?? 1,
        date: date || undefined,
        time: time || undefined,
        propertyType: selectedProperty,
        propertySizeSqm: propertySizeSqm,
        frequency: frequency || undefined,
        quoteItemsTitle: "Selected Treatment",
        quoteItems: selectedServiceName ? [selectedServiceName] : undefined,
        numCleaners: cleaners,
        durationHours: hours,
        genderPreference: gender || undefined,
        languagePreference: language || undefined,
        language: siteLanguage,
        attachments: uploadedAttachments(attachments),
        specialRequirements: requirements.trim() || undefined,
        howGetIn: howGetIn || undefined,
        howHeard: howHeard || undefined,
        firstName: contactForm.firstName.trim(),
        lastName: contactForm.lastName.trim() || undefined,
        email: contactForm.email.trim(),
        contact: contactForm.contact.trim(),
        streetAddress: addressForm?.streetAddress?.trim() || "",
        unit: addressForm?.unit?.trim() || undefined,
        city: addressForm?.city?.trim() || "",
        state: addressForm?.state?.trim() || undefined,
        country: addressForm?.country || "United Arab Emirates",
        postalCode: addressForm?.postalCode?.trim() || undefined,
        pricingCountry: addressForm?.country || "United Arab Emirates",
      }); 
 
      setShowSuccessToast(true);
 
      setTimeout(() => {
        router.push(
          `/quotation-confirmation/${quotation.id}?ref=${encodeURIComponent(quotation.accessToken)}`
        );
      }, 1500);
      
    } catch (err) {
      const msg =
        err instanceof ApiError
          ? err.message
          : "Failed to submit quotation request. Please verify your connection and try again.";
      setSubmitError(msg);
      setValidationErrors([msg]);
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLight = poolTheme === "light";

  return (
    <div
      className={`${poppins.className} transition-colors duration-300 min-h-screen ${
        isLight ? "bg-[#ededee] text-[#1B2E4B]" : "bg-[#070b14] text-white"
      }`}
    >
      
      <PageHero
        image={"/images/services/updated-images/request-quotation-hero-image.webp"}
        eyebrow="Book a service"
        theme={poolTheme}
        hidePriceSelector={true}
        serviceSlug={"request-a-detailed-quotation"}
        isQuote={true}
      />

      {/* Floating Success Toast */}
      {/* {showSuccessToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-[#0f1b2f] border-2 border-[#DFB756] text-white shadow-2xl shadow-[#DFB756]/20 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-6 h-6 text-[#DFB756] shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#DFB756]">Quotation Request Submitted!</span>
            <span className="text-xs text-gray-300">Redirecting to confirmation concierge...</span>
          </div>
        </div>
      )} */}

      <div className="mx-auto flex w-full max-w-[1250px] flex-col gap-6 px-4 sm:px-6 md:px-2 pt-4 pb-16">
        {/* Validation Errors Alert Box */}
        {/* {(validationErrors.length > 0 || submitError) && (
          <div
            id="quotation-validation-errors"
            className="w-full p-5 rounded-2xl border-2 border-red-500/40 bg-red-950/20 text-red-200 shadow-xl transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-sm text-red-300 mb-1">
                    Please complete the required details before submitting:
                  </h4>
                  {validationErrors.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-red-200/90">
                      {validationErrors.map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  )}
                  {submitError && (
                    <p className="text-xs text-red-300 mt-2 font-semibold">{submitError}</p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setValidationErrors([]);
                  setSubmitError(null);
                }}
                className="text-red-400 hover:text-red-200 cursor-pointer p-1"
                aria-label="Dismiss error alert"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )} */}

        <div className="flex flex-col gap-6 lg:flex-row w-full items-start mb-4">
          {/* Main Configuration Flow Column */}
          <div className="lg:w-[65%] xl:w-[68%] flex flex-col gap-6 w-full">
            {/* Step 1: Property Category */}
            <div id="quote-property-section">
              <QuotePropertyTypeSelector
                selectedProperty={selectedProperty}
                onSelectProperty={setSelectedProperty}
                theme={poolTheme}
              />
            </div>

            {/* Step 2: Property Size Selector (allows up to 500,000m² when isQuote is true) */}
            <div id="quote-size-section">
              <PropertySizeSelector
                value={propertySizeSqm}
                onChange={setPropertySizeSqm}
                isQuote={true}
                theme={poolTheme}
              />
            </div>

            {/* Step 3: Service Crew Parameters */}
            <div id="quote-crew-section">
              <ServiceCrewParameters
                value={propertySizeSqm}
                cleaners={cleaners}
                onCleanersChange={setCleaners}
                hours={hours}
                onHoursChange={setHours}
                frequency={frequency}
                onFrequencyChange={setFrequency}
                isQuote={true}
                theme={poolTheme}
              />
            </div>

            {/* Step 4: Eco-Luxury Services Treatments List */}
            <div id="quote-services-section">
              <EcoServicesSelector
                services={services}
                selectedServiceId={selectedServiceId}
                onSelectService={setSelectedServiceId}
                theme={poolTheme}
              />
            </div>

            {/* Step 5: Schedule Selection */}
            <div id="quote-datetime-section">
              <DateTimeSection
                date={date}
                onDateChange={setDate}
                time={time}
                onTimeChange={setTime}
                isQuote={true}
              />
            </div>

            {/* Step 6: Contact details and Preferences form */}
            <div id="quotation-contact-section">
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
                isQuote={true}
              />
            </div>
          </div>

          {/* Sticky Inquiry Overview Sidebar Column matching user reference image */}
          <div className="sticky top-15 lg:w-[35%] xl:w-[32%] w-full">
            <QuotationInquiryOverview
              propertyCategory={selectedProperty}
              propertyScaleSqm={propertySizeSqm}
              cleaners={cleaners}
              hours={hours}
              frequency={frequency}
              selectedService={services.find((s) => s.id === selectedServiceId)?.label || "Regular Home Cleaning"}
              targetDate={date}
              targetTime={time}
              destination={addressForm.country || "United Arab Emirates"}
              onSubmit={handleSubmitQuotation}
              isSubmitting={isSubmitting}
              theme={poolTheme}
            />
          </div>
        </div>
      </div>

      {/* Interactive Quotation Validation Modal */}
      <BookingValidationModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        errors={validationErrors}
        theme={poolTheme}
        title="Please complete the required details before submitting:"
        actionText="Review Missing Details"
        onActionClick={() => {
          setIsErrorModalOpen(false);
          let targetId = "quotation-contact-section";
          if (validationErrors.some((e) => e.toLowerCase().includes("property"))) {
            targetId = "quote-property-section";
          } else if (
            validationErrors.some(
              (e) => e.toLowerCase().includes("service") || e.toLowerCase().includes("treatment")
            )
          ) {
            targetId = "quote-services-section";
          } else if (
            validationErrors.some(
              (e) =>
                e.toLowerCase().includes("date") ||
                e.toLowerCase().includes("schedule") ||
                e.toLowerCase().includes("time")
            )
          ) {
            targetId = "quote-datetime-section";
          }
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }}
      />
    </div>
  );
}