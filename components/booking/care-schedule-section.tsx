"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateTimeSection } from "@/components/booking/date-time-section";
import { saveBookingDraft, loadBookingDraft, CareProfileDraft } from "@/lib/booking-draft";
import { useLanguage } from "@/lib/i18n/language-context";

function createEmptyProfile(): CareProfileDraft {
  return {
    name: "",
    specialNeeds: "",
    gender: "",
    age: "",
    documentName: "",
    documentData: "",
    behavioralNotes: "",
  };
}

export interface CareScheduleSectionProps {
  serviceId: number;
  serviceSlug: string;
  serviceLabel: string;
}

export function CareScheduleSection({
  serviceId,
  serviceSlug,
  serviceLabel,
}: CareScheduleSectionProps) {
  const router = useRouter();
  const { translate } = useLanguage();
  const isElder = serviceSlug.includes("elder");
  const personTitle = isElder ? translate("carePersonTitleElder") : translate("carePersonTitleChild");
  const personCountLabel = isElder ? translate("carePersonCountElder") : translate("carePersonCountChild");

  // Preload from existing draft if available
  const existingDraft = typeof window !== "undefined" ? loadBookingDraft() : null;
  const currentDraft = existingDraft?.serviceSlug === serviceSlug ? existingDraft : null;

  const [scheduleMode, setScheduleMode] = useState(
    currentDraft?.scheduleMode || "In-home care"
  );
  const [durationMode, setDurationMode] = useState<"hours" | "half_day" | "full_day">(
    currentDraft?.durationMode || "hours"
  );
  const [durationHours, setDurationHours] = useState(
    currentDraft?.durationHours || 2
  );
  const [personCount, setPersonCount] = useState(
    currentDraft?.personCount || 1
  );
  const [caregiverCount, setCaregiverCount] = useState(
    currentDraft?.caregiverCount || 1
  );

  const [date, setDate] = useState(currentDraft?.date || "");
  const [time, setTime] = useState(currentDraft?.time || "");

  // Profile Fields for 1 or more persons
  const [profiles, setProfiles] = useState<CareProfileDraft[]>(() => {
    const initialCount = currentDraft?.personCount || 1;
    if (currentDraft?.careProfiles && currentDraft.careProfiles.length > 0) {
      const list: CareProfileDraft[] = currentDraft.careProfiles.map((p) => ({
        name: p.name || "",
        specialNeeds: p.specialNeeds || "",
        gender: p.gender || "",
        age: p.age || "",
        documentName: p.documentName || "",
        documentData: p.documentData || "",
        behavioralNotes: p.behavioralNotes || "",
      }));
      while (list.length < initialCount) {
        list.push(createEmptyProfile());
      }
      return list;
    }
    if (currentDraft?.careProfile) {
      const list: CareProfileDraft[] = [
        {
          name: currentDraft.careProfile.name || "",
          specialNeeds: currentDraft.careProfile.specialNeeds || "",
          gender: currentDraft.careProfile.gender || "",
          age: currentDraft.careProfile.age || "",
          documentName: currentDraft.careProfile.documentName || "",
          documentData: currentDraft.careProfile.documentData || "",
          behavioralNotes: currentDraft.careProfile.behavioralNotes || "",
        },
      ];
      while (list.length < initialCount) {
        list.push(createEmptyProfile());
      }
      return list;
    }
    return Array.from({ length: initialCount }, () => createEmptyProfile());
  });

  const [formError, setFormError] = useState<string | null>(null);

  function handlePersonCountChange(delta: number) {
    const next = Math.max(1, Math.min(10, personCount + delta));
    setPersonCount(next);
    setProfiles((prev) => {
      if (next > prev.length) {
        const additions = Array.from({ length: next - prev.length }, () => createEmptyProfile());
        return [...prev, ...additions];
      }
      return prev;
    });
  }

  function updateProfile(index: number, patch: Partial<CareProfileDraft>) {
    setProfiles((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], ...patch };
      return copy;
    });
  }

  function handleContinue() {
    setFormError(null);

    if (!date) {
      setFormError(translate("careErrorSelectDate"));
      return;
    }
    if (!time) {
      setFormError(translate("careErrorSelectTime"));
      return;
    }

    const activeProfiles = profiles.slice(0, personCount);

    for (let i = 0; i < activeProfiles.length; i++) {
      const p = activeProfiles[i];
      const prefix = personCount > 1 ? `${personTitle} ${i + 1}` : `${personTitle}`;

      if (!p.name.trim()) {
        setFormError(`${prefix}: ${translate("careFieldName")}`);
        return;
      }
      if (!p.specialNeeds.trim()) {
        setFormError(`${prefix}: ${translate("careFieldSpecialNeeds")}`);
        return;
      }
      if (!p.gender) {
        setFormError(`${prefix}: ${translate("careFieldGender")}`);
        return;
      }
      if (!p.age.trim()) {
        setFormError(`${prefix}: ${translate("careFieldAge")}`);
        return;
      }
    }

    const effectiveHours =
      durationMode === "half_day" ? 4 : durationMode === "full_day" ? 8 : durationHours;

    const formattedProfiles = activeProfiles.map((p) => ({
      name: p.name.trim(),
      specialNeeds: p.specialNeeds.trim(),
      gender: p.gender,
      age: p.age.trim(),
      documentName: p.documentName,
      documentData: p.documentData,
      behavioralNotes: p.behavioralNotes?.trim() || "",
    }));

    // Save to draft storage
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
      // Collected fresh at checkout (ServicePreferencesSection) instead of
      // here, so they're not asked for twice.
      genderPreference: "no-preference",
      languagePreference: "no-preference",
      scheduleMode,
      durationMode,
      durationHours: effectiveHours,
      personCount,
      caregiverCount,
      careProfile: formattedProfiles[0],
      careProfiles: formattedProfiles,
    });

    router.push(`/services/${serviceSlug}/checkout`);
  }

  return (
    <div className="w-full space-y-8">
      {/* 1. SCHEDULE YOUR SERVICE CARD */}
      <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-xl sm:p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-white sm:text-2xl">
          {translate("careScheduleYourService")}
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Schedule Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">{translate("careScheduleMode")}</Label>
            <Select value={scheduleMode} onValueChange={setScheduleMode}>
              <SelectTrigger className="h-11 w-full p-2 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                <SelectValue placeholder={translate("careScheduleMode")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In-home care">{translate("careScheduleModeInHome")}</SelectItem>
                <SelectItem value="Facility-based care">{translate("careScheduleModeFacility")}</SelectItem>
                <SelectItem value="Travel & Event accompaniment">{translate("careScheduleModeTravel")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service Duration */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">{translate("careServiceDuration")}</Label>
            <div className="grid grid-cols-1 gap-2 bg-white p-1 rounded-md sm:grid-cols-3">
              {/* Hours counter */}
              <div
                role="button"
                tabIndex={0}
                onClick={() => setDurationMode("hours")}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDurationMode("hours");
                  }
                }}
                className={`flex h-11 cursor-pointer items-center justify-between rounded-lg border px-2 transition ${durationMode === "hours"
                  ? "border-[#A98B4B] bg-[#A98B4B]/20 text-[#555555]"
                  : "border-white/20 bg-[#FFFDF4] text-brand-navy"
                  }`}
              >
                <span className="text-xs font-semibold sm:text-sm">{translate("careDurationHours")}</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setDurationMode("hours");
                      setDurationHours((h) => Math.max(1, h - 1));
                    }}
                    className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white hover:brightness-110"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-4 text-center text-xs font-bold sm:text-sm">{durationHours}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setDurationMode("hours");
                      setDurationHours((h) => Math.min(12, h + 1));
                    }}
                    className="flex size-6 items-center justify-center rounded-full bg-[#A98B4B] text-white hover:brightness-110"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>

              {/* Half Day */}
              <button
                type="button"
                onClick={() => setDurationMode("half_day")}
                className={`h-11 rounded-lg border text-xs font-semibold transition sm:text-sm ${durationMode === "half_day"
                  ? "border-[#A98B4B] bg-[#A98B4B] text-white shadow-md"
                  : "border-white/20 bg-[#FFFDF4] text-brand-navy hover:bg-[#FFFDF4]/90"
                  }`}
              >
                {translate("careDurationHalfDay")}
              </button>

              {/* Full Day */}
              <button
                type="button"
                onClick={() => setDurationMode("full_day")}
                className={`h-11 rounded-lg border text-xs font-semibold transition sm:text-sm ${durationMode === "full_day"
                  ? "border-[#A98B4B] bg-[#A98B4B] text-white shadow-md"
                  : "border-white/20 bg-[#FFFDF4] text-brand-navy hover:bg-[#FFFDF4]/90"
                  }`}
              >
                {translate("careDurationFullDay")}
              </button>
            </div>
          </div>

          {/* Count of Child / Elder */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">{personCountLabel}</Label>
            <div className="flex h-11 items-center justify-between rounded-lg bg-[#FFFDF4] px-4 text-brand-navy shadow-inner">
              <span className="text-sm font-semibold">{personCount}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handlePersonCountChange(-1)}
                  className="flex size-7 items-center justify-center rounded-md bg-[#c7d1d9] text-brand-navy hover:bg-[#A98B4B] hover:text-white"
                >
                  <Minus className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handlePersonCountChange(1)}
                  className="flex size-7 items-center justify-center rounded-md bg-[#A98B4B] text-white hover:brightness-110"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Request Care Professionals */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">{translate("careRequestProfessionals")}</Label>
            <div className="flex h-11 items-center justify-between rounded-lg bg-[#FFFDF4] px-4 text-brand-navy shadow-inner">
              <span className="text-sm font-semibold">{caregiverCount}</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCaregiverCount((c) => Math.max(1, c - 1))}
                  className="flex size-7 items-center justify-center rounded-md bg-[#c7d1d9] text-brand-navy hover:bg-[#A98B4B] hover:text-white"
                >
                  <Minus className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setCaregiverCount((c) => Math.min(5, c + 1))}
                  className="flex size-7 items-center justify-center rounded-md bg-[#A98B4B] text-white hover:brightness-110"
                >
                  <Plus className="size-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. DATE & TIME PICKER */}
      <DateTimeSection
        date={date}
        onDateChange={(d) => {
          setDate(d);
          if (formError) setFormError(null);
        }}
        time={time}
        onTimeChange={(t) => {
          setTime(t);
          if (formError) setFormError(null);
        }}
      />

      {/* 3. CHILD'S / ELDER'S PROFILE CARD */}
      <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-xl sm:p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-white sm:text-2xl">
          {personTitle}&rsquo;s {translate("careProfile")}
        </h2>

        <div className="space-y-8">
          {profiles.slice(0, personCount).map((profile, index) => (
            <div
              key={index}
              className={index > 0 ? "pt-8 border-t border-[#A98B4B]/20" : ""}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Name */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {personTitle} {translate("careFieldName")}
                  </Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => updateProfile(index, { name: e.target.value })}
                    placeholder={translate("careFieldTypePersonName").replace("{title}", personTitle)}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Special Needs / Medical Notes */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {translate("careFieldSpecialNeeds")}
                  </Label>
                  <Input
                    value={profile.specialNeeds}
                    onChange={(e) => updateProfile(index, { specialNeeds: e.target.value })}
                    placeholder={translate("careFieldTypeNotes")}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">{translate("careFieldGender")}</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(val) => updateProfile(index, { gender: val })}
                  >
                    <SelectTrigger className="h-11 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B] p-2">
                      <SelectValue placeholder={translate("careFieldGenderPlaceholder")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">{translate("careFieldGenderMale")}</SelectItem>
                      <SelectItem value="Female">{translate("careFieldGenderFemale")}</SelectItem>
                      <SelectItem value="Other">{translate("careFieldGenderOther")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">{translate("careFieldAge")}</Label>
                  <Input
                    value={profile.age}
                    onChange={(e) => updateProfile(index, { age: e.target.value })}
                    placeholder={translate("careFieldTypePersonAge").replace("{title}", personTitle)}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Behavioral Notes (Optional) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    {translate("careFieldBehavioralNotes")}
                  </Label>
                  <Input
                    value={profile.behavioralNotes || ""}
                    onChange={(e) => updateProfile(index, { behavioralNotes: e.target.value })}
                    placeholder={translate("careFieldTypeNoteHere")}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Error message */}
      {formError && (
        <p className="text-center text-sm font-semibold text-red-600">{formError}</p>
      )}

      {/* 4. BOTTOM BUTTONS */}
      <div className="flex items-center justify-center gap-4 pt-2 mb-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-11 min-w-[120px] rounded-md cursor-pointer border-brand-navy/30 bg-white text-sm font-semibold text-brand-navy shadow-sm hover:bg-slate-100"
        >
          {translate("careBackButton")}
        </Button>
        <Button
          type="button"
          onClick={handleContinue}
          className="h-11 min-w-[140px] rounded-md  cursor-pointer bg-[#A98B4B] text-sm font-bold text-white shadow-md hover:bg-[#A98B4B]"
        >
          {translate("careContinueButton")}
        </Button>
      </div>
    </div>
  );
}
