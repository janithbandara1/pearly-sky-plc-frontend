"use client";

import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { CheckoutAttachmentUpload, type CheckoutAttachment } from "@/components/booking/checkout-attachment-upload";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";

export interface ServicePreferencesSectionProps {
  theme?: "dark" | "light";
  gender: string;
  onGenderChange: (value: string) => void;
  language: string;
  onLanguageChange: (value: string) => void;
  requirements: string;
  onRequirementsChange: (value: string) => void;
  /** File upload is shown only when these are passed (checkout). */
  attachments?: CheckoutAttachment[];
  onAttachmentsChange?: (update: (prev: CheckoutAttachment[]) => CheckoutAttachment[]) => void;
}

export function ServicePreferencesSection({
  theme = "dark",
  gender,
  onGenderChange,
  language,
  onLanguageChange,
  requirements,
  onRequirementsChange,
  attachments,
  onAttachmentsChange,
}: ServicePreferencesSectionProps) {
  const { translate } = useLanguage();
  const isLight = theme === "light";

  const containerClasses = isLight
    ? "bg-white border-[#C5A059]/40 text-[#1B2E4B]"
    : "bg-[#121e2d]/95 backdrop-blur-xl border-white/10 text-white";

  const dividerClasses = isLight ? "border-gray-200" : "border-white/10";
  const stepLabelClasses = isLight ? "text-[#A88238]" : "text-[#DFB96C]";
  const titleClasses = isLight ? "text-[#1B2E4B]" : "text-white";
  const labelClasses = isLight
    ? "text-[11px] font-semibold tracking-wider text-[#1B2E4B]/80 uppercase mb-2 block"
    : "text-[11px] font-semibold tracking-wider text-slate-300 uppercase mb-2 block";

  const selectTriggerClasses = isLight
    ? "w-full bg-[#FBF9F4] border border-[#C5A059]/35 hover:border-[#C5A059]/70 focus:border-[#A88238] focus:ring-1 focus:ring-[#A88238] text-[#1B2E4B] rounded-lg px-4 py-3 h-auto text-sm outline-none transition-colors"
    : "w-full bg-[#0B1524] border border-white/15 hover:border-white/25 focus:border-[#DFB96C] focus:ring-1 focus:ring-[#DFB96C] text-white rounded-lg px-4 py-3 h-auto text-sm outline-none transition-colors";

  const selectContentClasses = isLight
    ? "bg-white border border-[#C5A059]/30 text-[#1B2E4B]"
    : "bg-[#0B1524] border border-white/15 text-white";

  const textareaClasses = isLight
    ? "w-full bg-[#FBF9F4] border border-[#C5A059]/35 hover:border-[#C5A059]/70 focus:border-[#A88238] focus:ring-1 focus:ring-[#A88238] text-[#1B2E4B] placeholder:text-slate-400 rounded-lg p-3.5 text-sm outline-none transition-colors resize-y min-h-[90px]"
    : "w-full bg-[#0B1524] border border-white/15 hover:border-white/25 focus:border-[#DFB96C] focus:ring-1 focus:ring-[#DFB96C] text-white placeholder:text-slate-500 rounded-lg p-3.5 text-sm outline-none transition-colors resize-y min-h-[90px]";

  return (
    <div className={`rounded-2xl p-6 sm:p-8 shadow-2xl border transition-all duration-300 ${containerClasses}`}>
      {/* Top Header */}
      <div className={`pb-6 border-b ${dividerClasses}`}>
        <span className={`text-[11px] font-bold tracking-[0.2em] uppercase block mb-2 ${stepLabelClasses}`}>
          STEP 6 OF 6
        </span>
        <h2 className={`font-serif text-2xl sm:text-3xl font-medium tracking-tight ${titleClasses}`}>
          Preferences, Layout Upload & Client Information
        </h2>
      </div>

      <div className="pt-6 space-y-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClasses}>
              STAFF GENDER PREFERENCE
            </label>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent className={selectContentClasses}>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className={isLight ? "focus:bg-[#F5F0E6] focus:text-[#1B2E4B]" : "focus:bg-[#16253b] focus:text-white"}>
                    {translate(opt.label as TranslationKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className={labelClasses}>
              STAFF LANGUAGE PREFERENCE
            </label>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className={selectTriggerClasses}>
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent className={selectContentClasses}>
                {LANGUAGE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value} className={isLight ? "focus:bg-[#F5F0E6] focus:text-[#1B2E4B]" : "focus:bg-[#16253b] focus:text-white"}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="sm:col-span-2">
            <label className={labelClasses}>
              SPECIAL REQUIREMENTS / SECURITY / PET PROTOCOLS
            </label>
            <Textarea
              rows={3}
              value={requirements}
              onChange={(e) => onRequirementsChange(e.target.value)}
              placeholder="e.g. Alarm code #4092, gate access instructions, friendly Golden Retriever in laundry room..."
              className={textareaClasses}
            />
          </div>

          {attachments && onAttachmentsChange && (
            <div className="sm:col-span-2">
              <label className={labelClasses}>
                LAYOUT BLUEPRINT / SITE PHOTOS UPLOAD (MAX 5 FILES, 5MB EACH)
              </label>
              <CheckoutAttachmentUpload attachments={attachments} onAttachmentsChange={onAttachmentsChange} tone={isLight ? "light" : "dark"} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
