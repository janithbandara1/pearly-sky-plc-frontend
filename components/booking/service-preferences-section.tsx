"use client";

import { GENDER_OPTIONS, LANGUAGE_OPTIONS } from "@/components/booking/quotation-preferences-section";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";

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
  const { translate } = useLanguage();
  return (
    <Card className="bg-brand-navy text-brand-navy-foreground">
      <CardContent className="flex flex-col gap-0 p-0">
        <div className="px-4 py-3">
          <h3 className="text-base font-bold text-brand-gold">{translate("quoteDetailPreferences")}</h3>
        </div>

        <div className="grid grid-cols-1 gap-5 border-t border-brand-gold/20 p-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-brand-cream/90">{translate("preferencesGender")}</p>
            <Select value={gender} onValueChange={onGenderChange}>
              <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
                <SelectValue placeholder="No preference" />
              </SelectTrigger>
              <SelectContent>
                {GENDER_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {translate(opt.label as TranslationKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold text-brand-cream/90">{translate("preferencesLanguage")}</p>
            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-full bg-brand-cream text-brand-navy">
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
            <p className="mb-2 text-sm font-semibold text-brand-cream/90">{translate("preferencesSpecialRequirements")}</p>
            <Textarea
              rows={4}
              value={requirements}
              onChange={(e) => onRequirementsChange(e.target.value)}
              className="bg-brand-cream text-brand-navy"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
