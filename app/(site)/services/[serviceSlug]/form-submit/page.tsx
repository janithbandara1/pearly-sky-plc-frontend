"use client";

import { use, useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { CheckSquare, Square, UploadCloud, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareTermsModal } from "@/components/booking/care-terms-modal";
import PaymentMarquee from "@/components/payment-method-services";
import { loadBookingDraft, saveBookingDraft } from "@/lib/booking-draft";
import { getServiceBySlug, CatalogServiceDetail } from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], adjustFontFallback: false });

const DEFAULT_LANGUAGES = [
  "English",
  "French",
  "German",
  "Spanish",
  "Italian",
  "Sinhala",
  "Arabic",
  "Mandarin",
  "Russian",
  "Other",
];

const GENDER_OPTIONS = [

  { value: "female", label: "genderFemale" },
  { value: "male", label: "genderMale" },
  { value: "no-preference", label: "genderNonBinary" },
  { value: "prefer not to disclouse", label: "genderPreferNotToDisclose" },

];

const STAFF_GENDER_OPTIONS = [

  { value: "female", label: "staffGenderFemale" },
  { value: "male", label: "staffGenderMale" },
  { value: "no-preference", label: "genderNonBinary" },
  { value: "prefer not to disclouse", label: "genderPreferNotToDisclose" },

];

/**classResidential
classCommercial
classSpatial
classOther */
const PROPERTY_CLASSIFICATION_OPTIONS = [
  "classResidential",
  "classCommercial",
  "classSpatial",
  "classOther",
];

const CONTINUITY_PLAN_OPTIONS = [
  "planOneTime",
  "planEvery6to12Months",

];

const SPECIAL_REQUEST_OPTIONS = [
  { value: "none", label: "specialReqNone" },
  { value: "first-aid-cpr", label: "specialReqFirstAid" },
  { value: "special-needs-certified", label: "specialReqSpecialNeeds" },
  { value: "bilingual", label: "specialReqBilingual" },
  { value: "pet-friendly", label: "specialReqPetFriendly" },
  { value: "driver-license", label: "specialReqDriverLicense" },
  { value: "non-smoker", label: "specialReqNonSmoker" },
];

export default function FormSubmitPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);

  const{translate}=useLanguage()

  const router = useRouter();
  const { country } = useCountry();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isElder = serviceSlug.includes("elder");
  const isCare = serviceSlug === "child-care-service" || serviceSlug === "elder-care-service";
  const isFormService = !isCare;
  const isCarpet = serviceSlug === "carpet-upholstery-cleaning";
  const isPool = serviceSlug === "pool-cleaning";
  const isPressure = serviceSlug === "precision-pressure-washing";
  const isYacht = serviceSlug === "luxury-yacht-cleaning";
  const heroBadge =
    isCarpet
      ? "Fiber Revive Service"
      : isPool
        ? "Aqua Sparkle Pool Service"
        : isPressure
          ? "High Pressure Power Wash"
          : isYacht
            ? "Luxury Marine Detailing"
            : isElder
              ? "Golden Age Care"
              : "Little Stars Nurturing";

  const [service, setService] = useState<CatalogServiceDetail | null>(null);

  // Common & Carpet Form States
  const [propertyClassification, setPropertyClassification] = useState("");
  const [serviceContinuityPlan, setServiceContinuityPlan] = useState("");
  const [staffGender, setStaffGender] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [documentName, setDocumentName] = useState("");
  const [documentData, setDocumentData] = useState<string | undefined>(undefined);
  const [specifics, setSpecifics] = useState("");

  // Care-specific States
  const [caregiverGender, setCaregiverGender] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const draft = loadBookingDraft();
    if (!draft || draft.serviceSlug !== serviceSlug) {
      router.replace(`/services/${serviceSlug}`);
      return;
    }

    if (draft.languagePreference) {
      const match = DEFAULT_LANGUAGES.find(
        (l) => l.toLowerCase() === draft.languagePreference.toLowerCase()
      );
      if (match) setPreferredLanguage(match);
    }
    if (draft.genderPreference) {
      setStaffGender(draft.genderPreference);
      setCaregiverGender(draft.genderPreference);
    }
    if (draft.propertyClassification) setPropertyClassification(draft.propertyClassification);
    if (draft.serviceContinuityPlan) setServiceContinuityPlan(draft.serviceContinuityPlan);
    if (draft.documentName) setDocumentName(draft.documentName);
    if (draft.documentData) setDocumentData(draft.documentData);
    if (draft.specialRequest) setSpecialRequest(draft.specialRequest);
    if (draft.serviceSpecifics) setSpecifics(draft.serviceSpecifics);
    else if (draft.specialRequirements) setSpecifics(draft.specialRequirements);
  }, [serviceSlug, router]);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then(setService)
      .catch(() => undefined);
  }, [serviceSlug, country]);

  const heroImage =
    service?.imageUrl ??
    (isCarpet
      ? "/images/services/updated-home-property-cleaning-services-10-carpet-upholstery-cleaning.webp"
      : isPool
        ? "/images/services/updated-home-property-cleaning-services-13-pool-cleaning.webp"
        : isPressure
          ? "/images/services/updated-home-property-cleaning-services-14-precision-pressure-washing.webp"
          : isYacht
            ? "/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp"
            : isElder
              ? "/images/services/updated-care-support-services-2-elder-care-service.webp"
              : "/images/services/updated-care-support-services-1-child-care-service.webp");

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit.");
      return;
    }

    setDocumentName(file.name);
    const reader = new FileReader();
    reader.onload = (e) => {
      setDocumentData(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    if (error) setError(null);
  }

  function handleTermsToggle() {
    if (!acceptedTerms) {
      setIsTermsModalOpen(true);
    } else {
      setAcceptedTerms(false);
    }
  }

  function handleContinue() {
    setError(null);

    if (isFormService) {
      if (!propertyClassification) {
        setError("formSubmitErrorClassification");
        return;
      }
      if (!serviceContinuityPlan) {
        setError("formSubmitErrorContinuity");
        return;
      }
      if (!staffGender) {
        setError("formSubmitErrorStaffGender");
        return;
      }
      if (!preferredLanguage) {
        setError("formSubmitErrorLanguage");
        return;
      }
      
      if (!acceptedTerms) {
        window.alert(translate("formSubmitErrorTermsRequired"));
        setIsTermsModalOpen(true);
        return;
      }

      const currentDraft = loadBookingDraft();
      if (currentDraft) {
        saveBookingDraft({
          ...currentDraft,
          propertyClassification,
          propertyType: propertyClassification,
          serviceContinuityPlan,
          genderPreference: staffGender,
          languagePreference: preferredLanguage,
          documentName,
          documentData,
          serviceSpecifics: specifics.trim(),
          specialRequirements: specifics.trim() || undefined,
        });
      }

      router.push(`/services/${serviceSlug}/checkout`);
      return;
    }

    // Care flow validation
    if (!caregiverGender) {
      setError("formSubmitErrorCareGender");
      return;
    }
    if (!specialRequest) {
      setError("formSubmitErrorSpecialRequest");
      return;
    }
    if (!acceptedTerms) {
       window.alert(translate("formSubmitErrorTermsRequired"));
      setIsTermsModalOpen(true);
      return;
    }

    const currentDraft = loadBookingDraft();
    if (currentDraft) {
      saveBookingDraft({
        ...currentDraft,
        languagePreference: preferredLanguage,
        genderPreference: caregiverGender,
        caregiverGender,
        specialRequest,
        serviceSpecifics: specifics.trim(),
        specialRequirements: specifics.trim() || undefined,
      });
    }

    router.push(`/services/${serviceSlug}/checkout`);
  }

  return (
    <div className={`${poppins.className} min-h-screen bg-[rgb(199,209,217)] pb-16`}>
      {/* HERO BANNER */}
      <div className="relative mx-auto max-w-[1250px] px-4 pt-6 sm:px-6">
        <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80 md:h-96">
          <Image
            src={heroImage}
            alt={service?.label ?? "Service"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Overlay Box matching Live Website */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 max-w-lg rounded-2xl bg-[#121E2D]/85 p-5 sm:p-7 backdrop-blur-sm border border-white/10 shadow-2xl">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FFFDF4] tracking-tight">
              {service?.label ?? "Service"}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#A98B4B] font-medium">
              {service?.description ?? "Professional Restoration for Your Home & Interiors"}
            </p>
          </div>

          <div className="absolute right-6 bottom-6 flex items-center justify-center">
            <div className="h-12 w-12 rounded-full border-2 border-[#A98B4B] bg-[#FFFDF4]/90 p-1 shadow-lg flex items-center justify-center">
              <span className="text-[9px] font-bold text-[#A98B4B] text-center leading-tight">PEARLY SKY</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN FORM CONTAINER */}
      <div className="mx-auto mt-8 max-w-[1250px] px-4 sm:px-6">
        {isFormService ? (
          /* SERVICE DETAILS FORM */
          <section className="overflow-hidden rounded-2xl border-2 border-[#A98B4B] bg-[#FFFDF4] shadow-2xl">
            <div className="bg-[#121E2D] py-4 px-6 text-center">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">
                {translate("formSubmitFillDetails")}
              </h2>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* 1. Property Classification */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    {translate("formSubmitPropertyClassification")} <span className="text-[#A98B4B]">*</span>
                  </Label>
                  <Select value={propertyClassification} onValueChange={setPropertyClassification}>
                    <SelectTrigger className="h-12 w-full rounded-xl border border-[#A98B4B] bg-white text-[#121E2D] shadow-sm focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {PROPERTY_CLASSIFICATION_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {translate(opt as TranslationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 2. Service Continuity Plan */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    Service Continuity Plan <span className="text-[#A98B4B]">*</span>
                  </Label>
                  <Select value={serviceContinuityPlan} onValueChange={setServiceContinuityPlan}>
                    <SelectTrigger className="h-12 w-full rounded-xl border border-[#A98B4B] bg-white text-[#121E2D] shadow-sm focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {CONTINUITY_PLAN_OPTIONS.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                          {translate(opt as TranslationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 3. Staff Gender Preference */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    {translate("formSubmitStaffGender")} <span className="text-[#A98B4B]">*</span>
                  </Label>
                  <Select value={staffGender} onValueChange={setStaffGender}>
                    <SelectTrigger className="h-12 w-full rounded-xl border border-[#A98B4B] bg-white text-[#121E2D] shadow-sm focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {STAFF_GENDER_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {translate(opt.label as TranslationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 4. Linguistic Coordination */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    {translate("formSubmitLinguisticCoordination")} <span className="text-[#A98B4B]">*</span>
                  </Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="h-12 w-full rounded-xl border border-[#A98B4B] bg-white text-[#121E2D] shadow-sm focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="English" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-[#A98B4B]/30">
                      {DEFAULT_LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* 5. Upload Images or Documents */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    {translate("formSubmitUploadDocs")} <span className="text-[#A98B4B]">*</span>
                  </Label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx"
                  />
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex h-16 w-full cursor-pointer items-center justify-between rounded-xl border border-[#A98B4B] bg-white px-4 shadow-sm transition hover:bg-slate-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#A98B4B]/10 text-[#A98B4B]">
                        <UploadCloud className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        {documentName ? (
                          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                            <CheckCircle className="h-4 w-4 shrink-0" />
                            <span className="truncate max-w-[180px] sm:max-w-[240px]">{documentName}</span>
                          </div>
                        ) : (
                          <>
                            <p className="text-xs font-semibold text-[#121E2D]">
                              {translate("formSubmitUploadClickDrag")}
                            </p>
                            <p className="text-[10px] text-gray-400">Maximum file size: 5MB</p>
                          </>
                        )}
                      </div>
                    </div>
                    {documentName && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setDocumentName("");
                          setDocumentData(undefined);
                        }}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 6. Service Requirements & Specifics */}
                <div className="space-y-2">
                  <Label className="text-xs sm:text-sm font-bold text-[#121E2D]">
                    {translate("formSubmitServiceRequirements")}
                  </Label>
                  <Input
                    value={specifics}
                    onChange={(e) => setSpecifics(e.target.value)}
                    placeholder="Enter service requirements"
                    className="h-16 w-full rounded-xl border border-[#A98B4B] bg-white text-xs sm:text-sm text-[#121E2D] placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="pt-2">
                <label
                  onClick={handleTermsToggle}
                  className="flex cursor-pointer items-center gap-2.5 text-xs sm:text-sm font-bold text-[#121E2D] hover:text-[#A98B4B]"
                >
                  <button
                    type="button"
                    onClick={handleTermsToggle}
                    className="text-[#A98B4B]"
                  >
                    {acceptedTerms ? (
                      <CheckSquare className="size-5 text-[#A98B4B]" />
                    ) : (
                      <Square className="size-5 text-gray-400" />
                    )}
                  </button>
                  <span>{translate("formSubmitAcceptTerms")}</span>
                </label>
              </div>

              {error && (
                <div className="rounded-xl bg-red-50 p-3.5 text-sm font-semibold text-red-600 border border-red-200">
                  {translate(error  as TranslationKey)}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/services/${serviceSlug}`)}
                  className="h-11 min-w-[120px] rounded-full border-2 border-[#121E2D] bg-white text-sm font-bold text-[#121E2D] hover:bg-gray-50 transition"
                >
                  {translate("commonBack")}
                </Button>
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="h-11 min-w-[180px] rounded-full border-2 border-[#A98B4B] bg-[#A98B4B] text-sm font-bold text-white shadow-md transition hover:brightness-105 hover:bg-[#A98B4B]"
                >
                  Client & Payment &rarr;
                </Button>
              </div>
            </div>
          </section>
        ) : (
          /* STANDARD CARE SERVICES FORM */
          <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-2xl sm:p-8">
            <h2 className="mb-6 border-b border-white/10 pb-4 text-center text-lg font-bold text-white sm:text-xl md:text-2xl">
              {translate("formSubmitFillDetails")}
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Preferred Language */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {translate("formSubmitPreferredLanguageContact")}
                  </Label>
                  <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                    <SelectTrigger className="h-11 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {DEFAULT_LANGUAGES.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Care Professional Gender */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {translate("formSubmitCareGender")}
                  </Label>
                  <Select value={caregiverGender} onValueChange={setCaregiverGender}>
                    <SelectTrigger className="h-11 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {GENDER_OPTIONS.map((g) => (
                        <SelectItem key={g.value} value={g.value}>
                          {translate(g.label as TranslationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Special Request */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                   {translate("formSubmitSpecialRequest")}
                  </Label>
                  <Select value={specialRequest} onValueChange={setSpecialRequest}>
                    <SelectTrigger className="h-17 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIAL_REQUEST_OPTIONS.map((req) => (
                        <SelectItem key={req.value} value={req.value}>
                          {translate(req.label as TranslationKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Service Requirements & Specifics */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {translate("formSubmitServiceRequirements")}
                  </Label>
                  <Input
                    value={specifics}
                    onChange={(e) => setSpecifics(e.target.value)}
                    placeholder="Enter any special instructions or requirements here"
                    className="h-8 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="pt-2">
                <label
                  onClick={handleTermsToggle}
                  className="flex cursor-pointer items-center gap-2.5 text-xs font-semibold text-brand-cream hover:text-white sm:text-sm"
                >
                  <button
                    type="button"
                    onClick={handleTermsToggle}
                    className="text-[#A98B4B]"
                  >
                    {acceptedTerms ? (
                      <CheckSquare className="size-5 text-[#A98B4B]" />
                    ) : (
                      <Square className="size-5 text-brand-cream/60" />
                    )}
                  </button>
                  <span>{translate("formSubmitAcceptTerms")}</span>
                </label>
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-400 border border-red-500/20">
                  {translate(error as TranslationKey)}
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push(`/services/${serviceSlug}`)}
                  className="h-10 min-w-[100px] rounded-lg border-white/20 bg-transparent text-sm font-semibold text-white hover:bg-white/10"
                >
                  {translate("commonBack")}
                </Button>
                <Button
                  type="button"
                  onClick={handleContinue}
                  className="h-10 min-w-[160px] rounded-lg bg-[#A98B4B] text-sm font-bold text-white shadow transition hover:brightness-110"
                >
                  Client & Payment &rarr;
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* SUPPORT PAYMENT METHOD SECTION */}
      <div className="mx-auto mt-12 max-w-[1250px] px-4 text-center sm:px-6">
        <h3 className="mb-4 text-base sm:text-lg font-bold text-[#121E2D]">
          {translate("formSubmitSupportPaymentMethod")}
        </h3>
        <PaymentMarquee />
      </div>

      {/* TERMS AND CONDITIONS POPUP MODAL */}
      <CareTermsModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
        onAccept={() => {
          setAcceptedTerms(true);
          setIsTermsModalOpen(false);
        }}
        agreed={acceptedTerms}
        setAgreed={setAcceptedTerms}
      />
    </div>
  );
}
