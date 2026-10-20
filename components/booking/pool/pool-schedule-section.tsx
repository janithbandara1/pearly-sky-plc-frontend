"use client";

import { useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { AlertCircle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft } from "@/lib/booking-draft";
import type { QuoteItem } from "@/lib/content/quote-items";
import { useLanguage } from "@/lib/i18n/language-context";
import { SERVICE_CONFIGS } from "@/lib/types/serviceConfigurations/service-configs";
import StepNavigation from "../quotation-common-flow/step-navigations";
import LiveEstimateSummary from "../quotation-common-flow/live-estimate";
import { CartItem, ServiceConfig } from "@/lib/booking";
import ServiceSelectionSection from "../quotation-common-flow/ServiceSelectionSection";
import ScheduleDispatchSection from "../quotation-common-flow/ScheduleDispatchSection";
import LocationAccessSection from "../quotation-common-flow/LocationAccessSection";
import ReviewCheckoutSection from "../quotation-common-flow/ReviewCheckoutSection";
import ConditionAddonsSection from "../quotation-common-flow/ConditionAddonsSection";
import BookingConfirmationSection from "../quotation-common-flow/BookingConfirmationSection";
import { usePoolTheme } from "@/lib/pool-theme-context";

export interface PoolScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
  theme?: "dark" | "light";
  onThemeChange?: (theme: "dark" | "light") => void;
}



export function PoolScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
  theme: themeProp,
  onThemeChange,
}: PoolScheduleSectionProps) {
  const router = useRouter();
  const { translate } = useLanguage();
  const params = useParams();
  const serviceKey = (params?.service as string) || "pool";
  const config = SERVICE_CONFIGS[serviceKey] || SERVICE_CONFIGS.pool;

  const { theme: contextTheme, setTheme: setContextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  // Step state - Start at Step 1 (Service Selection)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Cart state - Default matching screenshot (In-Ground Pools $125)
  const [cart, setCart] = useState<CartItem[]>([]);

  // Step 2 State
  const [selectedCondition, setSelectedCondition] = useState<string>("");
  const [activeAddons, setActiveAddons] = useState<string[]>([""]);

  // Step 3 State
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedWindow, setSelectedWindow] = useState<string>("");

  // Step 4 State (Client & Location Details)
  const [clientTitle, setClientTitle] = useState<string | null >("");
  const [clientName, setClientName] = useState<string | null >("");
  const [clientEmail, setClientEmail] = useState<string | null >("");
  const [clientAddress, setClientAddress] = useState<string | null >("");
  const [clientPhone, setClientPhone] = useState<string | null >("");

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
        detail: "Water Condition Surcharge",
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
  }, [cart, selectedCondition, activeAddons]);

  // Comprehensive Step Validation Function
  const validateStep = (stepNumber: number): { valid: boolean; message?: string } => {
    if (stepNumber === 1) {
      if (!cart || cart.length === 0) {
        return {
          valid: false,
          message: "Please select at least one swimming pool or spa service before proceeding to the next step.",
        };
      }
    } else if (stepNumber === 2) {
      if (!selectedCondition || !selectedCondition.trim()) {
        return {
          valid: false,
          message: "Please choose your pool water clarity condition so we can allocate proper chemistry.",
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
      if (!clientName || clientName.trim().length < 2) {
        return {
          valid: false,
          message: "Please provide your full legal name or property manager name.",
        };
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!clientEmail || !emailRegex.test(clientEmail.trim())) {
        return {
          valid: false,
          message: "Please provide a valid email address for receiving your booking confirmation and dispatch alerts.",
        };
      }
      const cleanedPhone = clientPhone?.replace(/\D/g, "") || "";
      if (!clientPhone || cleanedPhone?.length < 7) {
        return {
          valid: false,
          message: "Please enter a valid phone number with area code for arrival notifications.",
        };
      }
      if (!clientAddress || clientAddress.trim().length < 5) {
        return {
          valid: false,
          message: "Please enter a complete property street address where pool service will take place.",
        };
      }
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
    window.location.href="#section-pool-schedule";
  };

  const handlePrevStep = () => {
    setValidationError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
  };

  return (
    <div
      id="section-pool-schedule"
      className={`w-full transition-colors rounded-2xl mb-3 duration-300 ${
        isLight ? "bg-[#F8F9FA] text-[#1B2E4B]" : "bg-[#101b3d] text-white"
      }`}
    >
      {/* 1. Step Navigation Header */}
      {!isConfirmed && (
        <StepNavigation
          currentStep={currentStep}
          theme={activeTheme}
          onStepClick={handleStepClick}
        />
      )}

      

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
                    titlePrefix={clientTitle}
                    setTitlePrefix={setClientTitle}
                    fullName={clientName}
                    setFullName={(n) => {
                      setClientName(n);
                      if (validationError) setValidationError(null);
                    }}
                    email={clientEmail}
                    setEmail={(e) => {
                      setClientEmail(e);
                      if (validationError) setValidationError(null);
                    }}
                    address={clientAddress}
                    setAddress={(a) => {
                      setClientAddress(a);
                      if (validationError) setValidationError(null);
                    }}
                    phone={clientPhone}
                    setPhone={(p) => {
                      setClientPhone(p);
                      if (validationError) setValidationError(null);
                    }}
                    theme={activeTheme}
                    onProceedNext={handleNextStep}
                    onPrevStep={handlePrevStep}
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
      
    </div>
  );
}
