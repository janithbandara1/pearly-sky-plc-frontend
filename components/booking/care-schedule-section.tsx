"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Clock, Minus, Plus, UploadCloud, X, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { saveBookingDraft, loadBookingDraft, CareProfileDraft } from "@/lib/booking-draft";

const TIME_START = "05:30";
const TIME_END = "20:30";
const TIME_STEP_MINUTES = 30;
const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function toDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let m = toMinutes(TIME_START); m <= toMinutes(TIME_END); m += TIME_STEP_MINUTES) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
}

function formatAmPm(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

const TIME_SLOTS = buildTimeSlots();

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
  const isElder = serviceSlug.includes("elder");
  const personTitle = isElder ? "Elder" : "Child";
  const personCountLabel = isElder ? "Count of Elder" : "Count of Child";

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

  // Modal open states
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

  // Profile Fields for 1 or more persons
  const [profiles, setProfiles] = useState<CareProfileDraft[]>(() => {
    const initialCount = currentDraft?.personCount || 1;
    if (currentDraft?.careProfiles && currentDraft.careProfiles.length > 0) {
      const list = currentDraft.careProfiles.map((p) => ({
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
      const list = [
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
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

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

  // Calendar logic
  const today = useMemo(() => startOfDay(new Date()), []);
  const minSelectable = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d;
  }, [today]);

  const [viewMonth, setViewMonth] = useState(
    () => new Date(minSelectable.getFullYear(), minSelectable.getMonth(), 1)
  );

  const canGoPrevMonth =
    viewMonth.getFullYear() > minSelectable.getFullYear() ||
    (viewMonth.getFullYear() === minSelectable.getFullYear() &&
      viewMonth.getMonth() > minSelectable.getMonth());

  const cells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: (Date | null)[] = Array.from({ length: firstWeekday }, () => null);
    for (let day = 1; day <= daysInMonth; day++) list.push(new Date(year, month, day));
    return list;
  }, [viewMonth]);

  function handleFileUpload(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setFormError("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }

    setFormError(null);
    const reader = new FileReader();
    reader.onload = () => {
      updateProfile(index, {
        documentName: file.name,
        documentData: typeof reader.result === "string" ? reader.result : "",
      });
    };
    reader.readAsDataURL(file);
  }

  function handleContinue() {
    setFormError(null);

    if (!date) {
      setFormError("Please select a service date.");
      setIsDateModalOpen(true);
      return;
    }
    if (!time) {
      setFormError("Please select a service start time.");
      setIsTimeModalOpen(true);
      return;
    }

    const activeProfiles = profiles.slice(0, personCount);

    for (let i = 0; i < activeProfiles.length; i++) {
      const p = activeProfiles[i];
      const prefix = personCount > 1 ? `${personTitle} ${i + 1}'s` : `${personTitle.toLowerCase()}'s`;
      const labelSuffix = personCount > 1 ? ` for ${personTitle.toLowerCase()} ${i + 1}` : "";

      if (!p.name.trim()) {
        setFormError(`Please enter ${prefix} name.`);
        return;
      }
      if (!p.specialNeeds.trim()) {
        setFormError(`Please enter special needs or medical notes${labelSuffix} (or type 'None').`);
        return;
      }
      if (!p.gender) {
        setFormError(`Please select a gender${labelSuffix}.`);
        return;
      }
      if (!p.age.trim()) {
        setFormError(`Please enter ${prefix} age.`);
        return;
      }
      if (!p.documentName) {
        setFormError(`Please upload an image or document${labelSuffix} (Max size: 5MB).`);
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
      genderPreference: "no-preference",
      languagePreference: "english",
      scheduleMode,
      durationMode,
      durationHours: effectiveHours,
      personCount,
      caregiverCount,
      careProfile: formattedProfiles[0],
      careProfiles: formattedProfiles,
    });

    router.push(`/services/${serviceSlug}/form-submit`);
  }

  return (
    <div className="w-full space-y-8">
      {/* 1. SCHEDULE YOUR SERVICE CARD */}
      <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-xl sm:p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-white sm:text-2xl">
          Schedule Your Service
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Schedule Mode */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">Schedule Mode</Label>
            <Select value={scheduleMode} onValueChange={setScheduleMode}>
              <SelectTrigger className="h-11 w-full p-2 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B]">
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="In-home care">In-home care</SelectItem>
                <SelectItem value="Facility-based care">Facility-based care</SelectItem>
                <SelectItem value="Travel & Event accompaniment">Travel & Event accompaniment</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Service Duration */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">Service Duration</Label>
            <div className="grid grid-cols-3 gap-2 bg-white p-1 rounded-md">
              {/* Hours counter button */}
              <div
                className={`flex h-11 items-center justify-between rounded-lg border px-2.5 transition ${durationMode === "hours"
                  ? "border-[#A98B4B] bg-[#A98B4B]/20 text-[#555555]"
                  : "border-white/20 bg-[#FFFDF4] text-brand-navy"
                  }`}
              >
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
                <span
                  onClick={() => setDurationMode("hours")}
                  className="cursor-pointer text-xs font-bold sm:text-sm"
                >
                  Hours - {durationHours} +
                </span>
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

              {/* Half Day */}
              <button
                type="button"
                onClick={() => setDurationMode("half_day")}
                className={`h-11 rounded-lg border text-xs font-semibold transition sm:text-sm ${durationMode === "half_day"
                  ? "border-[#A98B4B] bg-[#A98B4B] text-white shadow-md"
                  : "border-white/20 bg-[#FFFDF4] text-brand-navy hover:bg-[#FFFDF4]/90"
                  }`}
              >
                Half Day
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
                Full Day
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
            <Label className="text-sm font-medium text-brand-cream/90">Request Care Professionals</Label>
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

          {/* Select Date */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">Select Date</Label>
            <button
              type="button"
              onClick={() => setIsDateModalOpen(true)}
              className="flex h-11 w-full items-center justify-between rounded-lg bg-[#FFFDF4] px-4 text-left text-sm font-medium text-brand-navy shadow-inner hover:ring-2 hover:ring-[#A98B4B]"
            >
              <span className={date ? "font-semibold text-brand-navy" : "text-muted-foreground"}>
                {date || "Choose date"}
              </span>
              <Calendar className="size-4 text-[#A98B4B]" />
            </button>
          </div>

          {/* Select Start Time */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-brand-cream/90">Select Start Time</Label>
            <button
              type="button"
              onClick={() => setIsTimeModalOpen(true)}
              className="flex h-11 w-full items-center justify-between rounded-lg bg-[#FFFDF4] px-4 text-left text-sm font-medium text-brand-navy shadow-inner hover:ring-2 hover:ring-[#A98B4B]"
            >
              <span className={time ? "font-semibold text-brand-navy" : "text-muted-foreground"}>
                {time ? formatAmPm(time) : "Start Time"}
              </span>
              <Clock className="size-4 text-[#A98B4B]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. CHILD'S / ELDER'S PROFILE CARD */}
      <section className="overflow-hidden rounded-2xl border border-[#A98B4B]/30 bg-[#121E2D] p-6 shadow-xl sm:p-8">
        <h2 className="mb-6 text-center text-xl font-bold text-white sm:text-2xl">
          {personTitle}&rsquo;s Profile
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
                    {personTitle} Name *
                  </Label>
                  <Input
                    value={profile.name}
                    onChange={(e) => updateProfile(index, { name: e.target.value })}
                    placeholder={`Type ${personTitle} Name`}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Special Needs / Medical Notes */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    Special Needs / Medical Notes *
                  </Label>
                  <Input
                    value={profile.specialNeeds}
                    onChange={(e) => updateProfile(index, { specialNeeds: e.target.value })}
                    placeholder="Type Notes"
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">Gender *</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(val) => updateProfile(index, { gender: val })}
                  >
                    <SelectTrigger className="h-11 w-full rounded-lg border-0 bg-[#FFFDF4] text-brand-navy shadow-inner focus:ring-2 focus:ring-[#A98B4B] p-2">
                      <SelectValue placeholder="Please select option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other / Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Age */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">Age *</Label>
                  <Input
                    value={profile.age}
                    onChange={(e) => updateProfile(index, { age: e.target.value })}
                    placeholder={`Type ${personTitle} Age`}
                    className="h-11 rounded-lg border-0 bg-[#FFFDF4] text-brand-navy placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-[#A98B4B]"
                  />
                </div>

                {/* Upload Image / Document */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    Upload Image / Document *
                  </Label>
                  <input
                    type="file"
                    ref={(el) => {
                      fileInputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleFileUpload(index, e)}
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                  />
                  <div
                    onClick={() => fileInputRefs.current[index]?.click()}
                    className="flex h-11 cursor-pointer items-center justify-between rounded-lg border border-dashed border-[#A98B4B] bg-[#FFFDF4] px-4 transition hover:bg-[#FFFDF4]/90"
                  >
                    <div className="flex items-center gap-2 overflow-hidden text-brand-navy">
                      <UploadCloud className="size-5 shrink-0 text-[#A98B4B]" />
                      <span className="truncate text-xs font-medium sm:text-sm">
                        {profile.documentName || "Upload Image or Doc"}
                      </span>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      Max file size: 5MB
                    </span>
                  </div>
                  {profile.documentName && (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                      <Check className="size-3.5" />
                      <span>Uploaded: {profile.documentName}</span>
                    </div>
                  )}
                </div>

                {/* Behavioral Notes (Optional) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-brand-cream/90">
                    Behavioral Notes (Optional)
                  </Label>
                  <Input
                    value={profile.behavioralNotes || ""}
                    onChange={(e) => updateProfile(index, { behavioralNotes: e.target.value })}
                    placeholder="Type your note here"
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
        <div className="rounded-md bg-red-500/10 p-3 text-center text-sm font-medium text-red-600 border border-red-500/20">
          {formError}
        </div>
      )}

      {/* 3. BOTTOM BUTTONS */}
      <div className="flex items-center justify-center gap-4 pt-2 mb-5">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="h-11 min-w-[120px] rounded-md cursor-pointer border-brand-navy/30 bg-white text-sm font-semibold text-brand-navy shadow-sm hover:bg-slate-100"
        >
          Back
        </Button>
        <Button
          type="button"
          onClick={handleContinue}
          className="h-11 min-w-[140px] rounded-md  cursor-pointer bg-[#A98B4B] text-sm font-bold text-white shadow-md hover:bg-[#A98B4B]"
        >
          Continue
        </Button>
      </div>

      {/* POPUP MODAL: SELECT DATE */}
      {isDateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#A98B4B] bg-[#FFFDF4] shadow-2xl">
            <div className="flex items-center justify-between bg-[#121E2D] px-5 py-4 text-white">
              <h3 className="text-base font-semibold">Select Your Date</h3>
              <button
                type="button"
                onClick={() => setIsDateModalOpen(false)}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <button
                  type="button"
                  disabled={!canGoPrevMonth}
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))
                  }
                  className="rounded px-2.5 py-1 text-lg font-semibold text-[#002F6D] transition hover:text-[#A98B4B] disabled:opacity-30"
                >
                  ‹
                </button>
                <span className="text-base font-semibold text-[#002F6D]">
                  {MONTH_LABELS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))
                  }
                  className="rounded px-2.5 py-1 text-lg font-semibold text-[#002F6D] transition hover:text-[#A98B4B]"
                >
                  ›
                </button>
              </div>

              <div className="grid grid-cols-7 gap-y-2 text-center">
                {WEEKDAY_LABELS.map((w) => (
                  <span key={w} className="text-xs font-bold text-[#002F6D]">
                    {w}
                  </span>
                ))}

                {cells.map((cellDate, i) => {
                  if (!cellDate) return <span key={`blank-${i}`} />;
                  const key = toDateKey(cellDate);
                  const isPast = startOfDay(cellDate).getTime() < minSelectable.getTime();
                  const isToday = startOfDay(cellDate).getTime() === today.getTime();
                  const isSelected = key === date;
                  return (
                    <button
                      key={key}
                      type="button"
                      disabled={isPast}
                      onClick={() => {
                        setDate(key);
                        setIsDateModalOpen(false);
                      }}
                      className={`mx-auto flex size-9 items-center justify-center rounded-full text-sm font-medium transition ${isSelected
                        ? "bg-[#A98B4B] font-bold text-white shadow-md"
                        : isPast
                          ? "cursor-not-allowed text-[#999] opacity-35"
                          : isToday
                            ? "border-2 border-dashed border-[#A98B4B] text-[#002F6D]"
                            : "text-[#002F6D] hover:bg-[#D9D9D9]"
                        }`}
                    >
                      {cellDate.getDate()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* POPUP MODAL: SELECT TIME */}
      {isTimeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#A98B4B] bg-[#FFFDF4] shadow-2xl">
            <div className="flex items-center justify-between bg-[#121E2D] px-5 py-4 text-white">
              <h3 className="text-base font-semibold">Select Your Start Time</h3>
              <button
                type="button"
                onClick={() => setIsTimeModalOpen(false)}
                className="rounded p-1 text-white/80 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>
            <div className="grid max-h-80 grid-cols-2 gap-2.5 overflow-y-auto p-4">
              {TIME_SLOTS.map((slot) => {
                const isSelected = slot === time;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      setTime(slot);
                      setIsTimeModalOpen(false);
                    }}
                    className={`rounded-xl border-2 px-3 py-2.5 text-left text-sm font-semibold transition ${isSelected
                      ? "border-[#121E2D] bg-[#A98B4B] text-white shadow-md"
                      : "border-[#121E2D]/20 bg-white text-brand-navy hover:border-[#A98B4B] hover:bg-[#D9D9D9]/50"
                      }`}
                  >
                    {formatAmPm(slot)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
