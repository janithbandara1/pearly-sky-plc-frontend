"use client";

import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface ServicePreferencesSectionProps {
  gender: string;
  onGenderChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  requirements: string;
  onRequirementsChange: (value: string) => void;
}

export function ServicePreferencesSection({
  gender,
  onGenderChange,
  language,
  onLanguageChange,
  requirements,
  onRequirementsChange,
}: ServicePreferencesSectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Preferences</h2>
      </div>

      <div className="grid grid-cols-1 gap-5 bg-[#F8F9FA] p-4 sm:grid-cols-2 sm:p-5">
        <div>
          <p className="mb-2 text-sm font-semibold text-[#121E2D]">Gender Preference</p>
          <Select value={gender} onValueChange={onGenderChange}>
            <SelectTrigger className="w-full bg-white">
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
          <p className="mb-2 text-sm font-semibold text-[#121E2D]">Language Preference</p>
          <Select value={language} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-full bg-white">
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

        <div className="sm:col-span-2">
          <p className="mb-2 text-sm font-semibold text-[#121E2D]">Special Requirements</p>
          <Textarea
            rows={4}
            value={requirements}
            onChange={(e) => onRequirementsChange(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>
    </section>
  );
}
