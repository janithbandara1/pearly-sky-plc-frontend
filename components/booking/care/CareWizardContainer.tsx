"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import { useLanguage } from "@/lib/i18n/language-context";

import { getCareServiceConfig, getWizardSteps, GenderPref, CareMode, glassCard } from "./care-wizard-config";
import { Step1Demographics } from "./Step1Demographics";
import { Step2Schedule } from "./Step2Schedule";
import { Step3CareProfiles, ParentProfileData } from "./Step3CareProfiles";
import { Step4LocationDetails, LocationDetailsData } from "./Step4LocationDetails";
import { Step5Payment, PaymentData } from "./Step5Payment";
import { CareReservationSummary } from "./CareReservationSummary";

export interface CareWizardContainerProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
}

export function CareWizardContainer({ serviceId, serviceSlug, serviceLabel }: CareWizardContainerProps) {
  const router = useRouter();
  const { translate } = useLanguage();
  const isElder = serviceSlug.includes("elder");
  const config = getCareServiceConfig(isElder);
  const steps = getWizardSteps(isElder);

  // Load existing draft
  const existingDraft = typeof window !== "undefined" ? loadBookingDraft() : null;
  const draft = existingDraft?.serviceSlug === serviceSlug ? existingDraft : null;

  // ── Wizard Step ──
  const [currentStep, setCurrentStep] = useState(1);

  // ── Step 1 State ──
  const [careMode, setCareMode] = useState<CareMode>("home");
  const [gender1Count, setGender1Count] = useState(3);
  const [gender2Count, setGender2Count] = useState(4);
  const [selectedAgeGroups, setSelectedAgeGroups] = useState<string[]>(config.ageGroups ? [config.ageGroups[0]] : []);
  const [selectedChips, setSelectedChips] = useState<string[]>([
    config.chipTags[0]?.label ?? "",
    config.chipTags[1]?.label ?? "",
  ]);
  const [careNotes, setCareNotes] = useState("");
  const [genderPref, setGenderPref] = useState<GenderPref>("no-preference");
  const [durationHours, setDurationHours] = useState(draft?.durationHours || 11);
  const [caregiverCount, setCaregiverCount] = useState(draft?.caregiverCount || 4);

  // ── Step 2 State ──
  const [date, setDate] = useState(draft?.date || "");
  const [time, setTime] = useState(draft?.time || "");

  // ── Step 3 State (Parent / Guardian Profile ) ──
  const [parentProfile, setParentProfile] = useState<ParentProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneCountry: "+33",
    phone: "",
  });

  // ── Step 4 State (Location & Residence Details) ──
  const [locationDetails, setLocationDetails] = useState<LocationDetailsData>({
    country: "",
    city: "",
    postalCode: "",
    province: "",
    streetAddress: "",
    unit: "",
  });

  // ── Step 5 State (Payment Section) ──
  const [paymentData, setPaymentData] = useState<PaymentData>({
    gateway: null,
    cardholderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  }); 

  const [stepError, setStepError] = useState<string | null>(null);

  const totalPersonCount = gender1Count + gender2Count;

  function handleGender1Change(delta: number) {
    setGender1Count(prev => Math.max(0, prev + delta));
  }
  function handleGender2Change(delta: number) {
    setGender2Count(prev => Math.max(0, prev + delta));
  }

  // ── Step validation ──
  function validateCurrentStep(): string | null {
    if (currentStep === 1) {
      if (totalPersonCount === 0) return "Please select at least one care recipient.";
    }
    if (currentStep === 2) {
      if (!date) return translate("careErrorSelectDate");
      if (!time) return translate("careErrorSelectTime");
    }
    if (currentStep === 3) {
      if (!parentProfile.firstName.trim()) return "Please enter first name.";
      if (!parentProfile.lastName.trim()) return "Please enter last name.";
      if (!parentProfile.email.trim()) return "Please enter email address.";
      if (!parentProfile.phone.trim()) return "Please enter phone number.";
    }
    if (currentStep === 4) {
      if (!locationDetails.city.trim()) return "Please enter city.";
      if (!locationDetails.postalCode.trim()) return "Please enter postal code.";
      if (!locationDetails.streetAddress.trim()) return "Please enter street address.";
    }
    if (currentStep === 5) {
      if (paymentData.gateway === "card") {
        if (!paymentData?.cardholderName?.trim()) return "Please enter cardholder name.";
        if (!paymentData?.cardNumber?.trim()) return "Please enter card number.";
      }
    }
    return null;
  }

  function handleNext() {
    const err = validateCurrentStep();
    if (err) { setStepError(err); return; }
    setStepError(null);
    setCurrentStep(s => Math.min(steps.length, s + 1));
  }

  function handleBack() {
    setStepError(null);
    if (currentStep === 1) { router.back(); return; }
    setCurrentStep(s => Math.max(1, s - 1));
  }

  function handleSubmit() {
    const err = validateCurrentStep();
    if (err) { setStepError(err); return; }

    saveBookingDraft({
      serviceId,
      serviceSlug,
      serviceLabel,
      propertySizeSqm: 1,
      date,
      time,
      packages: [],
      items: [],
      supplySource: "company",
      addOnsTotal: 0,
      genderPreference: genderPref,
      languagePreference: "no-preference",
      scheduleMode: careMode === "home" ? "In-home care" : "Facility-based care",
      durationMode: "hours",
      durationHours,
      personCount: Math.max(1, totalPersonCount),
      caregiverCount,
      careProfile: {
        name: `${parentProfile.firstName} ${parentProfile.lastName}`.trim(),
        specialNeeds: careNotes,
        gender: "other",
        age: "",
        behavioralNotes: `${locationDetails.streetAddress}, ${locationDetails.city}`,
      },
    });

    router.push(`/services/${serviceSlug}/checkout`);
  }

  const progressPct = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="w-full space-y-6">

      {/* ── PROGRESS BAR CARD ── */}
      <div className="p-4 sm:p-6 rounded-2xl" style={glassCard}>
        {/* Step indicators */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#c9a858] px-3 py-1 rounded-full" style={{ background: "rgba(201,168,88,0.1)", border: "1px solid rgba(201,168,88,0.3)" }}>
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm font-serif italic text-gray-300 text-right max-w-[60%] truncate">
            {steps[currentStep - 1]?.title}
          </span>
        </div>

        {/* Step dots + connector */}
        <div className="flex items-center gap-0 mb-4">
          {steps.map((step, i) => {
            const done = currentStep > step.number;
            const active = currentStep === step.number;
            return (
              <div key={step.number} className="flex items-center flex-1 last:flex-none">
                <div
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    done ? "bg-[#c9a858] text-[#0a111a]" : active ? "bg-[#c9a858]/20 border-2 border-[#c9a858] text-[#c9a858]" : "text-gray-500"
                  }`}
                  style={!done && !active ? { background: "#1c2d42", border: "1px solid rgba(201,168,88,0.2)" } : {}}
                >
                  {done ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-1" style={{ background: done ? "#c9a858" : "rgba(201,168,88,0.15)" }} />
                )}
              </div>
            );
          })}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "#0a111a", border: "1px solid rgba(201,168,88,0.1)" }}>
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progressPct}%`, background: "linear-gradient(90deg,#9d7c32,#c9a858,#e2cc8b)" }} />
        </div>
      </div>

      {/* ── TWO-COLUMN RESPONSIVE LAYOUT (DESKTOP) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ── LEFT COLUMN: STEP CONTENT & CONTROLS (7 COLS) ── */}
        <div className="lg:col-span-7 space-y-6">
          {currentStep === 1 && (
            <Step1Demographics
              config={config}
              careMode={careMode}
              onCareModeChange={setCareMode}
              gender1Count={gender1Count}
              gender2Count={gender2Count}
              onGender1Change={handleGender1Change}
              onGender2Change={handleGender2Change}
              selectedAgeGroups={selectedAgeGroups}
              onAgeGroupToggle={g => setSelectedAgeGroups(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g])}
              selectedChips={selectedChips}
              onChipToggle={l => setSelectedChips(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
              careNotes={careNotes}
              onCareNotesChange={setCareNotes}
              genderPref={genderPref}
              onGenderPrefChange={setGenderPref}
              durationHours={durationHours}
              onDurationChange={d => setDurationHours(h => Math.min(24, Math.max(1, h + d)))}
              caregiverCount={caregiverCount}
              onCaregiverChange={d => setCaregiverCount(c => Math.min(8, Math.max(1, c + d)))}
            />
          )}

          {currentStep === 2 && (
            <Step2Schedule date={date} onDateChange={setDate} time={time} onTimeChange={setTime} />
          )}

          {currentStep === 3 && (
            <Step3CareProfiles
              config={config}
              data={parentProfile}
              onChange={patch => setParentProfile(prev => ({ ...prev, ...patch }))}
            />
          )}

          {currentStep === 4 && (
            <Step4LocationDetails
              config={config}
              data={locationDetails}
              onChange={patch => setLocationDetails(prev => ({ ...prev, ...patch }))}
            />
          )}

          {currentStep === 5 && (
            <Step5Payment
              config={config}
              data={paymentData}
              onChange={patch => setPaymentData(prev => ({ ...prev, ...patch }))}
              depositAmount={30}
            />
          )}

          {/* ── ERROR NOTICE ── */}
          {stepError && (
            <div className="p-3 rounded-xl text-center text-xs font-semibold text-red-300 bg-red-950/40 border border-red-500/30">
              {stepError}
            </div>
          )}

          {/* ── NAVIGATION BUTTONS ── */}
          <div className="flex items-center justify-between pt-2 mb-5">
            {/* Back */}
            <button
              type="button"
              onClick={handleBack}
              className="h-11 px-6 min-w-[110px] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all flex items-center gap-2 hover:border-[#c9a858]"
              style={{ background: "rgba(28,45,66,0.6)", border: "1px solid rgba(201,168,88,0.3)", color: "#fffdf4" }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              {currentStep === 1 ? translate("careBackButton") : "Back"}
            </button>

            {/* Next / Submit */}
            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={handleNext}
                className="h-11 px-8 min-w-[140px] rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer transition-all flex items-center gap-2 hover:-translate-y-px"
                style={{ background: "linear-gradient(135deg,#d4b465 0%,#c9a858 50%,#aa8838 100%)", color: "#0a111a", boxShadow: "0 4px 15px rgba(201,168,88,0.3)" }}
              >
                Next Step
                <ArrowRight className="w-3.5 h-3.5" />
              </button> 
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="h-11 px-8 min-w-[210px] rounded-xl text-xs font-bold uppercase tracking-widest cursor-pointer transition-all flex items-center justify-center gap-2 hover:-translate-y-px"
                style={{ background: "linear-gradient(135deg,#d4b465 0%,#c9a858 50%,#aa8838 100%)", color: "#0a111a", boxShadow: "0 4px 15px rgba(201,168,88,0.3)" }}
              >
                <Lock className="w-3.5 h-3.5" />
                Pay €30.00 &amp; Confirm
              </button>
            )}
          </div>
        </div>

        {/* ── RIGHT COLUMN: STICKY RESERVATION SUMMARY (5 COLS - VISIBLE THROUGHOUT ALL STEPS) ── */}
        <div className="lg:col-span-5 lg:sticky lg:top-24">
          <CareReservationSummary
            config={config}
            careMode={careMode}
            gender1Count={gender1Count}
            gender2Count={gender2Count}
            durationHours={durationHours}
            caregiverCount={caregiverCount}
          />
        </div>

      </div>
    </div>
  );
}


