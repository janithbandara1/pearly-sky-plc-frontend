"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Poppins } from "next/font/google";
import { CheckSquare, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CareTermsModal } from "@/components/booking/care-terms-modal";
import { loadBookingDraft, saveBookingDraft } from "@/lib/booking-draft";
import { getServiceBySlug, CatalogServiceDetail } from "@/lib/catalog-api";
import { useCountry } from "@/lib/countries/country-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

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
  { value: "no-preference", label: "No Preference / Any" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

const SPECIAL_REQUEST_OPTIONS = [
  { value: "none", label: "None / No Specific Request" },
  { value: "first-aid-cpr", label: "First Aid & CPR Certified" },
  { value: "special-needs-certified", label: "Special Needs Certified Caregiver" },
  { value: "bilingual", label: "Bilingual Caregiver" },
  { value: "pet-friendly", label: "Pet-Friendly Caregiver" },
  { value: "driver-license", label: "Valid Driver's License Required" },
  { value: "non-smoker", label: "Non-Smoker Only" },
];

export default function CareFormSubmitPage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = use(params);
  const router = useRouter();
  const { country } = useCountry();

  const isElder = serviceSlug.includes("elder");
  const heroBadge = isElder ? "Golden Age Care" : "Little Stars Nurturing";

  const [service, setService] = useState<CatalogServiceDetail | null>(null);
  const [preferredLanguage, setPreferredLanguage] = useState("English");
  const [caregiverGender, setCaregiverGender] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [specifics, setSpecifics] = useState("");

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
    if (draft.caregiverGender) setCaregiverGender(draft.caregiverGender);
    if (draft.specialRequest) setSpecialRequest(draft.specialRequest);
    if (draft.serviceSpecifics) setSpecifics(draft.serviceSpecifics);
  }, [serviceSlug, router]);

  useEffect(() => {
    getServiceBySlug(serviceSlug, country)
      .then(setService)
      .catch(() => undefined);
  }, [serviceSlug, country]);

  const heroImage =
    service?.imageUrl ??
    (isElder
      ? "/images/services/updated-care-support-services-2-elder-care-service.webp"
      : "/images/services/updated-care-support-services-1-child-care-service.webp");

  function handleTermsToggle() {
    if (!acceptedTerms) {
      setIsTermsModalOpen(true);
    } else {
      setAcceptedTerms(false);
    }
  }

  function handleContinue() {
    setError(null);

    if (!caregiverGender) {
      setError("Please select a Care Professional Gender preference.");
      return;
    }
    if (!specialRequest) {
      setError("Please select a Special Request option.");
      return;
    }
    if (!acceptedTerms) {
      window.alert("By selecting this I accept terms and conditions is required.");
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
            alt={service?.label ?? "Care Service"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div className="absolute left-6 top-6 rounded-full bg-brand-cream/90 px-4 py-1.5 text-xs font-bold text-brand-navy shadow backdrop-blur-sm sm:text-sm">
            {heroBadge}
          </div>
        </div>
      </div>

      {/* MAIN FORM CONTAINER */}
      <div className="mx-auto mt-8 max-w-[1250px] px-4 sm:px-6">
        <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-2xl sm:p-8">
          <h2 className="mb-6 border-b border-white/10 pb-4 text-center text-lg font-bold text-white sm:text-xl md:text-2xl">
            Fill the Following Details
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Preferred Language */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-brand-cream/90">
                  Preferred Language to Contact *
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
                  Care Professional Gender *
                </Label>
                <Select value={caregiverGender} onValueChange={setCaregiverGender}>
                  <SelectTrigger className="h-11 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {GENDER_OPTIONS.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Special Request */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-brand-cream/90">
                  Special Request *
                </Label>
                <Select value={specialRequest} onValueChange={setSpecialRequest}>
                  <SelectTrigger className="h-17 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIAL_REQUEST_OPTIONS.map((req) => (
                      <SelectItem key={req.value} value={req.value}>
                        {req.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Service Requirements & Specifics */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-brand-cream/90">
                  Service Requirements & Specifics *
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
                <span>By selecting this I accept terms and conditions</span>
              </label>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-400 border border-red-500/20">
                {error}
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
                Back
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
