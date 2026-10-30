"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { HeroBanner } from "./hero-banner";
import { StepIndicator } from "./step-indicator";
import { StepService } from "./step-service";
import { StepDetails } from "./step-details";
import { StepLocations } from "./step-locations";
import { StepAddons } from "./step-addons";
import { StepContact } from "./step-contact";
import { StepConfirmation } from "./step-confirmation";
import { BookingSummary } from "./booking-summary";
import { MOVING_SERVICES, MOVING_ADDONS, calculateTotals } from "./types";
import { createQuotation } from "@/lib/quotation-api";
import type { CatalogServiceDetail } from "@/lib/catalog-api";

interface MovingTransportDashboardProps {
  service?: CatalogServiceDetail | null;
  serviceSlug?: string;
}

export function MovingTransportDashboard({
  service,
}: MovingTransportDashboardProps) {
  // Application State matching the HTML file
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [selectedServiceId, setSelectedServiceId] = useState("home-moving");
  const [movingType, setMovingType] = useState("Moving Out");
  const [propertyType, setPropertyType] = useState("Apartment (T3)");
  const [pickupFloor, setPickupFloor] = useState("2nd Floor");
  const [pickupElevator, setPickupElevator] = useState("Yes");
  const [dropFloor, setDropFloor] = useState("Ground Floor");
  const [dropElevator, setDropElevator] = useState("No");
  const [moveDate, setMoveDate] = useState("2026-10-25");
  const [moveTime, setMoveTime] = useState("09:00");
  const [moveVolume, setMoveVolume] = useState("Medium (20–40 m³)");

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [selectedAddons, setSelectedAddons] = useState<string[]>([
    "packing",
    "disassembly",
  ]);

  const [custName, setCustName] = useState("");
  const [custEmail, setCustEmail] = useState("");
  const [custPhone, setCustPhone] = useState("");
  const [custNotes, setCustNotes] = useState("");

  const [step3Error, setStep3Error] = useState<string | null>(null);
  const [step5Error, setStep5Error] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirmation screen display state
  const [confirmedName, setConfirmedName] = useState("");
  const [confirmedRef, setConfirmedRef] = useState("#PS-89241");
  const [confirmedPrice, setConfirmedPrice] = useState("490.00 €");
  const [confirmedDate, setConfirmedDate] = useState("25 Oct 2026");

  // Step Navigation
  const goToStep = (stepNumber: number) => {
    if (stepNumber < 1 || stepNumber > totalSteps + 1) return;
    setCurrentStep(stepNumber);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleToggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId],
    );
  };

  const handleNextStep = async () => {
    // Step 3 validation: Pickup and Drop-off addresses required
    if (currentStep === 3) {
      if (!pickupAddress.trim() || !dropAddress.trim()) {
        setStep3Error("Please enter both pickup and drop-off addresses before continuing.");
        return;
      }
      setStep3Error(null);
    }

    // Step 5 validation and submission
    if (currentStep === 5) {
      if (!custName.trim() || !custEmail.trim() || !custPhone.trim()) {
        setStep5Error("Please fill in your contact information (Name, Email, and Phone number).");
        return;
      }
      setStep5Error(null);

      const totals = calculateTotals(
        selectedServiceId,
        moveVolume,
        pickupFloor,
        pickupElevator,
        dropFloor,
        dropElevator,
        selectedAddons,
      );

      let formattedDate = moveDate;
      try {
        const d = new Date(moveDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        }
      } catch {
        // keep moveDate
      }

      setConfirmedName(custName.trim());
      setConfirmedPrice(`${totals.total.toFixed(2)} €`);
      setConfirmedDate(formattedDate);

      let refNumber = `#PS-${Math.floor(10000 + Math.random() * 90000)}`;

      // Attempt backend quotation submission if service is available
      if (service?.id) {
        setIsSubmitting(true);
        try {
          const selectedServiceObj = MOVING_SERVICES.find((s) => s.id === selectedServiceId);
          const addonNames = selectedAddons
            .map((id) => MOVING_ADDONS.find((a) => a.id === id)?.name)
            .filter(Boolean) as string[];

          const nameParts = custName.trim().split(" ");
          const firstName = nameParts[0] || custName.trim();
          const lastName = nameParts.slice(1).join(" ") || undefined;

          const specNotes = [
            `Service Type: ${selectedServiceObj?.title || selectedServiceId}`,
            `Move Type: ${movingType}`,
            `Property: ${propertyType}`,
            `Pickup: ${pickupAddress.trim()} (Floor: ${pickupFloor}, Elevator: ${pickupElevator})`,
            `Drop-off: ${dropAddress.trim()} (Floor: ${dropFloor}, Elevator: ${dropElevator})`,
            `Volume: ${moveVolume}`,
            `Preferred Date/Time: ${moveDate} at ${moveTime}`,
            addonNames.length > 0 ? `Additional Services: ${addonNames.join(", ")}` : "",
            custNotes.trim() ? `Instructions: ${custNotes.trim()}` : "",
          ]
            .filter(Boolean)
            .join(" | ");

          const quote = await createQuotation({
            serviceId: service.id,
            date: moveDate || undefined,
            time: moveTime || undefined,
            propertyType: propertyType || undefined,
            quoteItemsTitle: "Selected Add-on Services",
            quoteItems: addonNames.length > 0 ? addonNames : undefined,
            firstName,
            lastName,
            email: custEmail.trim(),
            contact: custPhone.trim(),
            streetAddress: pickupAddress.trim(),
            city: "Paris",
            country: "France",
            deliveryStreetAddress: dropAddress.trim(),
            deliveryCity: "Lyon",
            deliveryCountry: "France",
            specialRequirements: specNotes,
          });

          if (quote?.id) {
            refNumber = `#PS-${quote.id}`;
          }
        } catch (err) {
          console.warn("Could not save to quotation API, continuing with local confirmation", err);
        } finally {
          setIsSubmitting(false);
        }
      }

      setConfirmedRef(refNumber);
      goToStep(6);
      return;
    }

    goToStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleResetBooking = () => {
    setSelectedServiceId("home-moving");
    setSelectedAddons(["packing", "disassembly"]);
    setMovingType("Moving Out");
    setPropertyType("Apartment (T3)");
    setPickupFloor("2nd Floor");
    setPickupElevator("Yes");
    setDropFloor("Ground Floor");
    setDropElevator("No");
    setMoveDate("2026-10-25");
    setMoveTime("09:00");
    setMoveVolume("Medium (20–40 m³)");
    setPickupAddress("");
    setDropAddress("");
    setCustName("");
    setCustEmail("");
    setCustPhone("");
    setCustNotes("");
    setStep3Error(null);
    setStep5Error(null);
    goToStep(1);
  };

  // Next button label logic
  let nextBtnText = "Continue to Moving Details";
  if (currentStep === 2) nextBtnText = "Continue to Locations";
  else if (currentStep === 3) nextBtnText = "Continue to Additional Services";
  else if (currentStep === 4) nextBtnText = "Continue to Review & Contact";
  else if (currentStep === 5) nextBtnText = isSubmitting ? "Submitting..." : "Complete Booking Request";

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 antialiased font-sans min-h-screen">
      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Top Stepper Indicator */}
      {currentStep <= 5 && (
        <StepIndicator currentStep={currentStep} onStepClick={goToStep} />
      )}

      {/* 3. Main Booking Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* STEP CONTENT (LEFT COLUMN - 7 COLS) */}
          <div className="lg:col-span-7 space-y-8">
            {currentStep === 1 && (
              <StepService
                selectedServiceId={selectedServiceId}
                onSelectService={(id) => setSelectedServiceId(id)}
              />
            )}

            {currentStep === 2 && (
              <StepDetails
                movingType={movingType}
                setMovingType={setMovingType}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                pickupFloor={pickupFloor}
                setPickupFloor={setPickupFloor}
                pickupElevator={pickupElevator}
                setPickupElevator={setPickupElevator}
                dropFloor={dropFloor}
                setDropFloor={setDropFloor}
                dropElevator={dropElevator}
                setDropElevator={setDropElevator}
                moveDate={moveDate}
                setMoveDate={setMoveDate}
                moveTime={moveTime}
                setMoveTime={setMoveTime}
                moveVolume={moveVolume}
                setMoveVolume={setMoveVolume}
              />
            )}

            {currentStep === 3 && (
              <StepLocations
                pickupAddress={pickupAddress}
                setPickupAddress={setPickupAddress}
                dropAddress={dropAddress}
                setDropAddress={setDropAddress}
                error={step3Error}
              />
            )}

            {currentStep === 4 && (
              <StepAddons
                selectedAddons={selectedAddons}
                onToggleAddon={handleToggleAddon}
              />
            )}

            {currentStep === 5 && (
              <StepContact
                custName={custName}
                setCustName={setCustName}
                custEmail={custEmail}
                setCustEmail={setCustEmail}
                custPhone={custPhone}
                setCustPhone={setCustPhone}
                custNotes={custNotes}
                setCustNotes={setCustNotes}
                error={step5Error}
              />
            )}

            {currentStep === 6 && (
              <StepConfirmation
                confirmName={confirmedName}
                confirmRef={confirmedRef}
                confirmPrice={confirmedPrice}
                confirmDate={confirmedDate}
                onReset={handleResetBooking}
              />
            )}

            {/* NAVIGATION BUTTONS (BOTTOM) */}
            {currentStep <= 5 && (
              <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                  className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl font-medium text-sm transition shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-amber-600 via-[#c69214] to-yellow-600 hover:opacity-95 text-white font-semibold rounded-xl text-sm transition shadow-md cursor-pointer disabled:opacity-50"
                >
                  <span>{nextBtnText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* SIDEBAR BOOKING SUMMARY (RIGHT COLUMN - 5 COLS) */}
          <div className="lg:col-span-5">
            <BookingSummary
              selectedServiceId={selectedServiceId}
              moveDate={moveDate}
              moveTime={moveTime}
              movingType={movingType}
              propertyType={propertyType}
              pickupFloor={pickupFloor}
              pickupElevator={pickupElevator}
              dropFloor={dropFloor}
              dropElevator={dropElevator}
              moveVolume={moveVolume}
              selectedAddons={selectedAddons}
              onChangeService={() => goToStep(1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovingTransportDashboard;
