"use client";

import { Minus, Plus } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function formatHM(hours: number): string {
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

interface CounterFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  step?: number;
  formatValue?: (value: number) => string;
}

function CounterField({ label, value, onChange, min = 0, step = 1, formatValue }: CounterFieldProps) {
  const decimals = step < 1 ? 2 : 0;
  const round = (n: number) => Number(n.toFixed(decimals));

  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-brand-navy">{label}</p>
      <div className="flex h-8 items-center justify-between rounded-lg border border-brand-gold-dark bg-brand-cream px-1.5">
        <button
          type="button"
          onClick={() => onChange(round(Math.max(min, value - step)))}
          className="flex size-6 items-center justify-center rounded-full bg-brand-gold/40 text-brand-navy transition hover:brightness-95"
        >
          <Minus className="size-3" />
        </button>
        <span className="text-sm font-semibold text-brand-navy">{formatValue ? formatValue(value) : value}</span>
        <button
          type="button"
          onClick={() => onChange(round(value + step))}
          className="flex size-6 items-center justify-center rounded-full bg-brand-gold-dark text-white transition hover:brightness-95"
        >
          <Plus className="size-3" />
        </button>
      </div>
    </div>
  );
}

export const GENDER_OPTIONS = [
  { value: "no-preference", label: "No Preference" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

export const LANGUAGE_OPTIONS = [
  { value: "no-preference", label: "No Preference" },
  { value: "english", label: "English" },
  { value: "french", label: "French" },
  { value: "german", label: "German" },
  { value: "sinhala", label: "Sinhala" },
  { value: "other", label: "Other (specify in special requirements)" },
];

export interface QuotationPreferencesSectionProps {
  numCleaners: number;
  onNumCleanersChange: (value: number) => void;
  durationHours: number;
  onDurationHoursChange: (value: number) => void;
  gender: string;
  onGenderChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  requirements: string;
  onRequirementsChange: (value: string) => void;
}

export function QuotationPreferencesSection({
  numCleaners,
  onNumCleanersChange,
  durationHours,
  onDurationHoursChange,
  gender,
  onGenderChange,
  language,
  onLanguageChange,
  requirements,
  onRequirementsChange,
}: QuotationPreferencesSectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
      <div className="bg-brand-navy px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">Service Preferences</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-[#F8F9FA] p-4 sm:p-5 md:grid-cols-2">
        <CounterField
          label="Cleaners"
          value={numCleaners}
          onChange={onNumCleanersChange}
          min={1}
          step={1}
        />

        <CounterField
          label="Duration"
          value={durationHours}
          onChange={onDurationHoursChange}
          min={3}
          step={0.5}
          formatValue={formatHM}
        />

        <div>
          <p className="mb-2 text-sm font-semibold text-brand-navy">Gender Preference</p>
          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger className="w-full bg-brand-cream">
              <SelectValue placeholder="No preference" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-brand-navy">Language Preference</p>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full bg-brand-cream">
              <SelectValue placeholder="No preference" />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <p className="mb-2 text-sm font-semibold text-brand-navy">Special Requirements</p>
          <Textarea
            rows={4}
            value={requirements}
            onChange={(e) => onRequirementsChange(e.target.value)}
            className="bg-brand-cream"
          />
        </div>
      </div>
    </section>
  );
}
