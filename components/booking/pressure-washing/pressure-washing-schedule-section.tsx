"use client";

import { useCallback, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PressureWashingJobSelection } from "@/components/booking/pressure-washing-job-selection";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import type { QuoteItem } from "@/lib/content/quote-items";
import { useLanguage } from "@/lib/i18n/language-context";
import { CartItem, ServiceConfig } from "@/lib/booking";
import { scrollToSection, SERVICE_CONFIGS } from "@/lib/types/serviceConfigurations/service-configs";
import { usePoolTheme } from "@/lib/pool-theme-context";
import StepNavigation from "../quotation-common-flow/step-navigations";
import LiveEstimateSummary from "../quotation-common-flow/live-estimate";
import ReviewCheckoutSection from "../quotation-common-flow/ReviewCheckoutSection";
import LocationAccessSection from "../quotation-common-flow/LocationAccessSection";
import ScheduleDispatchSection from "../quotation-common-flow/ScheduleDispatchSection";
import ConditionAddonsSection from "../quotation-common-flow/ConditionAddonsSection";
import ServiceSelectionSection from "../quotation-common-flow/ServiceSelectionSection";
import BookingConfirmationSection from "../quotation-common-flow/BookingConfirmationSection";
import { AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";
import { useLocationAccessForm } from "../quotation-common-flow/useLocationAccessForm";

export interface PressureWashingScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
  themeProp: "light" | "dark" | undefined;
  onThemeChange: (theme: "dark" | "light") => void;
}

export function PressureWashingScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
  themeProp,
  onThemeChange
}: PressureWashingScheduleSectionProps) {
  const router = useRouter();

  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug && draft.quoteItems
      ? draft.quoteItems
      : [];
  });

  const [date, setDate] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.date : "";
  });

  const [time, setTime] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.time : "";
  });

  const [numCleaners, setNumCleaners] = useState<number>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.numCleaners ?? 1 : 1;
  });

  const [durationHours, setDurationHours] = useState<number>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.durationHours ?? 3 : 3;
  });

  const [gender, setGender] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.genderPreference || "no-preference" : "no-preference";
  });

  const [language, setLanguage] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.languagePreference || "no-preference" : "no-preference";
  });

  const [requirements, setRequirements] = useState<string>(() => {
    const draft = loadBookingDraft();
    return draft && draft.serviceSlug === serviceSlug ? draft.specialRequirements || "" : "";
  });

  const [error, setError] = useState<string | null>(null);

 

  function handleSchedule() {
    setError(null);

    if (quoteItems.length === 0) {
      setError(translate("pressureErrorSelect"));
      return;
    }

    if (!date || !time) {
      setError(translate("scheduleErrorDateTime"));
      return;
    }

    const currentDraft = loadBookingDraft();

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
      numCleaners,
      durationHours,
      genderPreference: gender,
      languagePreference: language,
      specialRequirements: requirements.trim() || undefined,
      quoteItems,
      propertyClassification: currentDraft?.propertyClassification,
      serviceContinuityPlan: currentDraft?.serviceContinuityPlan,
      documentName: currentDraft?.documentName,
      documentData: currentDraft?.documentData,
      serviceSpecifics: currentDraft?.serviceSpecifics,
    });

    router.push(`/services/${serviceSlug}/checkout`);
  }

  //
  const { translate } = useLanguage();
  const params = useParams();
  const serviceKey = (params?.service as string) || (serviceSlug as string) || "precision-pressure-washing";
  const config =
    SERVICE_CONFIGS[serviceKey] ||
    SERVICE_CONFIGS[serviceSlug] ||
    SERVICE_CONFIGS["precision-pressure-washing"] ||
    SERVICE_CONFIGS.pressure;

  const { theme: contextTheme, setTheme: setContextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  // Step state - Start at Step 1 (Service Selection)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  // Step 2 State
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [activeAddons, setActiveAddons] = useState<string[]>([]);

  // Step 3 State
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedWindow, setSelectedWindow] = useState<string>("");

  // Step 4 State (Client & Location Details) — managed by hook
  const clearValidation = useCallback(() => {
    if (validationError) setValidationError(null);
  }, [validationError]);

  const {
    bindings: locationBindings,
    formData: locationFormData,
    validateContactFields,
    reset: resetLocationForm,
  } = useLocationAccessForm(clearValidation);

  // Destructure bindings for the LocationAccessSection JSX (kept as-is per requirement)
  const {
    titlePrefix: clientTitle,
    setTitlePrefix: setClientTitle,
    fullName: clientName,
    setFullName: setClientName, 
    email: clientEmail,
    setEmail: setClientEmail,
    phone: clientPhone,
    setPhone: setClientPhone,
    address: clientAddress,
    setAddress: setClientAddress,
  } = locationBindings;

  // Handler to toggle add-on items
  const toggleAddon = (id: string) => {
    setActiveAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Dynamically compute the complete cart items in real-time
  const cartItems: CartItem[] = useMemo(() => {
    const items: CartItem[] = [...cart];

    // Find and add the selected condition if it has an extra cost
    const conditionObj = config?.conditions?.find((c) => c.id === selectedCondition);
    if (conditionObj && conditionObj.price > 0) {
      items.push({
        id: conditionObj.id,
        name: conditionObj.title,
        detail: config?.conditionsLabel || "Intensity Profile",
        quantity: 1,
        unitPrice: conditionObj.price,
      });
    }

    // Map through all active add-ons and push them to the cart
    activeAddons.forEach((addonId) => {
      const addonObj = config?.addons?.find((a) => a.id === addonId);
      if (addonObj) {
        items.push({
          id: addonObj.id,
          name: addonObj.title,
          detail: "Add-on service",
          quantity: 1,
          unitPrice: addonObj.price,
        });
      }
    });

    return items;
  }, [cart, selectedCondition, activeAddons, config]);

  // Comprehensive Step Validation Function
  const validateStep = (stepNumber: number): { valid: boolean; message?: string } => {
    if (stepNumber === 1) {
      if (!cart || cart.length === 0) {
        return {
          valid: false,
          message: "Please select at least one pressure washing service before proceeding to the next step.",
        };
      }
    } else if (stepNumber === 2) {
      if (!selectedCondition || !selectedCondition.trim()) {
        return {
          valid: false,
          message: "Please choose your wash intensity and surface profile.",
        };
      }
    } else if (stepNumber === 3) {
      if (!selectedDate || !selectedDate.trim()) {
        return {
          valid: false,
          message: "Please choose a scheduled service dispatch date.",
        };
      }
      if (!selectedWindow || !selectedWindow.trim()) {
        return {
          valid: false,
          message: "Please pick a preferred technician arrival window.",
        };
      }
    } else if (stepNumber === 4) {
      return validateContactFields();
    }
    return { valid: true };
  };

  

  const handleNextStep = () => {
    const result = validateStep(currentStep);
    if (!result.valid) {
      setValidationError(result.message || "Please complete all required fields before proceeding.");
      return;
    }
    setValidationError(null);
    setCurrentStep((prev) => Math.min(prev + 1, 5));

    //scrollToSection()
    
    window.location.href="#section-pressure-schedule";
  };

  const handlePrevStep = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    //scrollToSection()
    window.location.href="#section-pressure-schedule";
  };

  const handleStepClick = (targetStep: number) => {
    if (targetStep === currentStep) return;
    if (targetStep < currentStep) {
      setValidationError(null);
      setCurrentStep(targetStep);
      return;
    }
    // Forward transition requires valid intermediate steps
    for (let s = currentStep; s < targetStep; s++) {
      const result = validateStep(s);
      if (!result.valid) {
        setValidationError(result.message || `Please complete Step ${s} before skipping ahead.`);
        setCurrentStep(s);
        return;
      }
    }
    setValidationError(null);
    setCurrentStep(targetStep);
  };

  const handleConfirmReservation = () => {
    for (let s = 1; s <= 4; s++) {
      const result = validateStep(s);
      if (!result.valid) {
        setValidationError(result.message || `Please complete Step ${s} before confirming reservation.`);
        setCurrentStep(s);
        return;
      }
    }
    setValidationError(null);
    setIsConfirmed(true);
  };

  const handleResetBooking = () => {
    setIsConfirmed(false);
    setCurrentStep(1);
    setValidationError(null);
    resetLocationForm();
  };


  return (
    <div id="section-pressure-schedule"
      className={`w-full transition-colors rounded-2xl mb-3 duration-300 ${
        isLight ? "bg-[#F8F9FA] text-[#1B2E4B]" : "bg-[#121E2D]/90  text-white"
      }`}>
            {/* 1. Step Navigation Header */}
            {!isConfirmed && (
              <StepNavigation
                currentStep={currentStep}
                theme={activeTheme}
                onStepClick={handleStepClick}
              />
            )}
      {/* 1. SELECT YOUR JOB */}
      {/* <PressureWashingJobSelection items={quoteItems} onItemsChange={setQuoteItems} /> */}

      {/* 2. DATE & TIME PICKER */}
      {/* <DateTimeSection
        date={date}
        onDateChange={(d) => {
          setDate(d);
          if (error) setError(null);
        }}
        time={time}
        onTimeChange={(t) => {
          setTime(t);
          if (error) setError(null);
        }}
      /> */}

    {/* 2. Main Step Section + Live Estimate Column */}
          <div className="flex-1 max-w-7xl w-full  p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className={isConfirmed ? "lg:col-span-3" : "lg:col-span-2"}>
              <div
                className={`rounded-2xl p-6 md:p-8 backdrop-blur-sm border shadow-xl transition-all duration-300 ${
                  isLight
                    ? "bg-white border-[#C7D1D9]"
                    : "bg-[#121e2d]/70 border-[#c9a858]/25"
                }`}
              >
                {isConfirmed ? (
                  <BookingConfirmationSection
                    config={config}
                    cart={cartItems}
                    selectedDate={selectedDate}
                    selectedWindow={selectedWindow}
                    clientTitle={clientTitle}
                    clientName={clientName}
                    clientEmail={clientEmail}
                    clientAddress={clientAddress}
                    theme={activeTheme}
                    onBookAnother={handleResetBooking}
                  />
                ) : (
                  <>
                    {currentStep === 1 && (
                      <ServiceSelectionSection
                        config={config}
                        cart={cart}
                        theme={activeTheme}
                        onUpdateCart={(newCart) => {
                          setCart(newCart);
                          if (validationError && newCart.length > 0) {
                            setValidationError(null);
                          }
                        }}
                        onProceedNext={handleNextStep}
                      />
                    )}
    
                    {currentStep === 2 && (
                      <ConditionAddonsSection
                        config={config}
                        selectedCondition={selectedCondition}
                        setSelectedCondition={(cond) => {
                          setSelectedCondition(cond);
                          if (validationError) setValidationError(null);
                        }}
                        activeAddons={activeAddons}
                        toggleAddon={toggleAddon}
                        theme={activeTheme}
                        onProceedNext={handleNextStep}
                        onPrevStep={handlePrevStep}
                      />
                    )}
    
                    {currentStep === 3 && (
                      <ScheduleDispatchSection
                        config={config}
                        selectedDate={selectedDate}
                        setSelectedDate={(d) => {
                          setSelectedDate(d);
                          if (validationError) setValidationError(null);
                        }}
                        selectedWindow={selectedWindow}
                        setSelectedWindow={(w) => {
                          setSelectedWindow(w);
                          if (validationError) setValidationError(null);
                        }}
                        theme={activeTheme}
                        onProceedNext={handleNextStep}
                        onPrevStep={handlePrevStep}
                      />
                    )}
    
                    {currentStep === 4 && (
                      <LocationAccessSection
                          config={config}
                          {...locationBindings}
                          theme={activeTheme}
                          onProceedNext={handleNextStep}
                          onPrevStep={handlePrevStep}
                          serviceSlug={serviceSlug}
                                          
                      />
                    )}
    
                    {currentStep === 5 && (
                      <ReviewCheckoutSection
                        config={config}
                        cart={cartItems}
                        selectedDate={selectedDate}
                        selectedWindow={selectedWindow}
                        clientName={clientName}
                        theme={activeTheme}
                        onPrevStep={handlePrevStep}
                        onConfirmReservation={handleConfirmReservation}
                      />
                    )}
                  </>
                )}
              </div>
            </div>
    
            {/* 3. Live Estimate Summary */}
            {!isConfirmed && (
              <div>
                <LiveEstimateSummary
                  config={config}
                  cart={cartItems}
                  activeAddons={activeAddons}
                  selectedCondition={selectedCondition}
                  currentStep={currentStep}
                  theme={activeTheme}
                  onNextStep={handleNextStep}
                  onPrevStep={handlePrevStep}
                />
              </div>
            )}
          </div>

          {/* Validation Alert Banner */}
      {validationError && (
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-4">
          <div
            className={`p-4 rounded-xl flex items-center gap-3 border shadow-md animate-in fade-in slide-in-from-top-2 ${
              isLight
                ? "bg-red-50 border-red-200 text-red-700"
                : "bg-red-950/70 border-red-500/50 text-red-200"
            }`}
          >
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span className="text-sm font-semibold">{validationError}</span>
          </div>
        </div>
      )}

      {/* 4. Bottom Navigation Buttons */}
      {!isConfirmed && (
        <div className="hidden items-center justify-center gap-4 py-4 pb-12">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (currentStep > 1) {
                handlePrevStep();
              } else {
                router.back();
              }
            }}
            className={`inline-flex h-[44px] min-w-[130px] items-center justify-center gap-2 rounded-xl border text-sm font-semibold shadow-sm transition-all ${
              isLight
                ? "border-[#C5A059] bg-white text-[#1B2E4B] hover:bg-[#F5F5DC]"
                : "border-[#c9a858]/60 bg-[#121e2d] text-white hover:bg-[#121e2d]/80"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            {currentStep > 1 ? "Previous Step" : translate("CarpetSchedulebackButtonText")}
          </Button>

          <Button
            type="button"
            onClick={() => {
              if (currentStep < 5) {
                handleNextStep();
              } else {
                handleConfirmReservation();
              }
            }}
            className={`inline-flex h-[44px] min-w-[210px] items-center justify-center gap-2 rounded-xl px-8 text-center text-xs font-bold uppercase tracking-wider shadow-lg transition-all ${
              isLight
                ? "bg-[#C5A059] text-white hover:bg-[#b08d45] shadow-[#C5A059]/25"
                : "bg-[#c9a858] text-[#121e2d] hover:bg-[#b89547] shadow-[#c9a858]/30 font-extrabold"
            }`}
          >
            {currentStep === 5 ? "Confirm & Finalize" : "Continue to Next Step"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* 4. BOTTOM ACTION BUTTONS */}
      {/* <div className="flex items-center justify-center gap-4 py-2 mb-8">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="inline-flex h-[42px] min-w-[120px] items-center justify-center rounded-[8px] border border-[#C5A253] bg-white px-10 py-2 text-base font-semibold text-[#0B1528] shadow-sm transition hover:bg-[#F8F9FA]"
        >
          {translate("CarpetSchedulebackButtonText")}
        </Button>
        <Button
          type="button"
          onClick={handleSchedule}
          className="inline-flex h-[42px] min-w-[200px] items-center justify-center rounded-[8px] bg-[#C5A253] px-10 py-2 text-center text-sm font-semibold uppercase tracking-wider text-[#0B1528] shadow-[0_4px_14px_rgba(197,162,83,0.35)] transition-all hover:bg-[#B39144] hover:brightness-110"
        >
          {translate("CarpetScheduleContinueButtonText")}
        </Button>
      </div> */}

        


    </div>
  );
}
