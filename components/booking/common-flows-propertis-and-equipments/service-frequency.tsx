"use client";

import React from "react";
import {
  Home,
  Sparkles,
  CheckSquare,
  Key,
  Building,
  Zap,
  Lock,
  Building2,
  Flame,
  PartyPopper,
  Ship,
  ShieldCheck,
  StarIcon,
} from "lucide-react";
import { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { useLanguage } from "@/lib/i18n/language-context";

// Types
export interface FrequencyOption {
  id: string;
  name: string;
  subtitle: string;
  priceTag?: string;
}

export interface ServiceOption {
  slug: string;
  title: string;
  icon: React.ReactNode;
  frequencies: FrequencyOption[];
}

// Service data kept completely intact
const cleaningServices: ServiceOption[] = [
  {
    slug: "regular-home-cleaning",
    title: "serviceLableRegularHomeCleaning",
    icon: <Home className="w-6 h-6 text-blue-400" />,
    frequencies: [
      { 
        id: "one-time", name: "freqOneTimeName", subtitle: "freqStandardCleanSubtitle",// priceTag: "(+0%)" 
      },
      { 
        id: "weekly", name: "freqWeeklyName", subtitle: "freqWeeklyPopularSubtitle",// priceTag: "(-20%)" 
      },
      { 
        id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqRegularUpkeepSubtitle",// priceTag: "(-10%)" 
      },
      { 
        id: "monthly", name: "freqMonthlyName", subtitle: "freqLightMaintenanceSubtitle",// priceTag: "(+0%)" 
      },
    ],
  },
  {
    slug: "essential-touch-up-cleaning",
    title: "serviceLableEssentialTouchUpCleaning",
    icon: <StarIcon className="w-6 h-6 text-purple-400" />,
    frequencies: [ 
      { 
        id: "one-time", name: "freqOneTimeName", subtitle: "freqQuickRefreshSubtitle", //priceTag: "(+0%)" 
      },
      { 
        id: "weekly", name: "freqWeeklyName", subtitle: "freqRegularTouchUpSubtitle", //priceTag: "(-15%)" 
      },
      { 
        id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyUpkeepSubtitle", //priceTag: "(-5%)" 
      },
      { 
        id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyLightPassSubtitle", //priceTag: "(+0%)" 
      },
    ],
  },
  {
    slug: "deep-cleaning",
    title: "serviceLableDeepCleaning",
    icon: <CheckSquare className="w-6 h-6 text-indigo-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle : "freqIntensiveSubtitle", //priceTag: "(+40%)"
      }, 
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqDeepMaintenanceSubtitle", //priceTag: "(+25%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqThoroughUpkeepSubtitle", //priceTag: "(+30%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle:"freqDeepPeriodicCleanSubtitle", //priceTag: "(+35%)"
      },
    ],
  },
  {
    slug: "end-of-tenancy-cleaning",
    title: "serviceLableEndOfTenancyCleaning",
    icon: <Key className="w-6 h-6 text-amber-400" />, 
    frequencies: [
      { id: "move-in", name: "freqMoveInName", subtitle: "freqMoveInSubtitle", //priceTag: "(+10%)"
      },
      { id: "move-out", name: "freqMoveOutName", subtitle: "freqMoveOutSubtitle", //priceTag: "(+20%)"
      },
      { id: "property-handover", name: "freqPropertyHandoverName", subtitle: "freqPropertyHandoverSubtitle", //priceTag: "(+25%)"
      },
    ],
  },
  {
    slug: "post-construction-renovation-cleaning",
    title: "serviceLablePostConstructionRenovationCleaning",
    icon: <Building className="w-6 h-6 text-orange-400" />,
    frequencies: [
      { id: "construction", name: "freqConstructionName", subtitle: "freqConstructionSubtitle", //priceTag: "(+50%)"
      },
      { id: "renovation", name: "freqRenovationName", subtitle: "freqRenovationSubtitle", //priceTag: "(+40%)"
      },
      { id: "builders", name: "freqBuildersName", subtitle: "freqBuildersSubtitle", //priceTag: "(+45%)"
      },
      { id: "final-handover", name: "freqFinalHandoverName", subtitle: "freqFinalHandoverSubtitle", //priceTag: "(+60%)"
      },
    ],
  },
  {
    slug: "same-day-priority-cleaning",
    title: "serviceLableSameDayPriorityCleaning", 
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    frequencies: [
      { id: "same-day", name: "freqSameDayName", subtitle: "freqImmediateDispatchSubtitle", // priceTag: "(+50%)" 
      },
      { id: "emergency", name: "freqEmergencyName", subtitle: "freqUrgentResponseSubtitle", // priceTag: "(+75%)" 
      },
      { id: "priority", name: "freqPriorityName", subtitle: "freqFrontOfQueueSubtitle", // priceTag: "(+30%)" 
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendPrioritySubtitle", // priceTag: "(+40%)" 
      },
    ],
  },
  {
    slug: "high-security-property-care",
    title: "serviceLableHighSecurityPropertyCare",
    icon: <Lock className="w-6 h-6 text-red-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqSecureClearanceSubtitle", //priceTag: "(+20%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqVettedWeeklyCareSubtitle", //priceTag: "(+10%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqScheduledSecureSubtitle", //priceTag: "(+15%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyAuditCheckSubtitle", //priceTag: "(+20%)"
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendClearanceSubtitle", //priceTag: "(+30%)"
      },
      { id: "discreet", name: "freqDiscreetName", subtitle: "freqDiscreetSubtitle", //priceTag: "(+50%)"
      },
    ],
  },
  {
    slug: "premium-rental-concierge-cleaning",
    title: "serviceLablePremiumRentalConciergeCleaning", 
    icon: <Building2 className="w-6 h-6 text-teal-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqSingleTurnSubtitle", //priceTag: "(+10%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqMultiTurnPackageSubtitle", //priceTag: "(+0%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyChecksSubtitle", //priceTag: "(+5%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyOverviewSubtitle", //priceTag: "(+10%)"
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqPeakWeekendTurnSubtitle", //priceTag: "(+25%)"
      },
      { id: "guest-turnover", name: "freqGuestTurnoverName", subtitle: "freqGuestTurnoverSubtitle", //priceTag: "(+30%)"
      },
    ],
  },
  {
    slug: "commercial-office-cleaning",
    title: "serviceLableCommercialOfficeCleaning",
    icon: <Building className="w-6 h-6 text-cyan-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqOfficeDeepRefreshSubtitle", //priceTag: "(+0%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqWeeklyCorporateSubtitle", //priceTag: "(-10%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyMaintenanceSubtitle", //priceTag: "(-5%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyDeepCleanSubtitle", //priceTag: "(+0%)"
      },
    ],
  },
  {
    slug: "steam-cleaning",
    title: "serviceLableSteamCleaning",
    icon: <Flame className="w-6 h-6 text-rose-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqIntenseSanitizeSubtitle", //priceTag: "(+25%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqRegularSteamCareSubtitle", //priceTag: "(+15%)" 
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyRefreshSubtitle", //priceTag: "(+20%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyDeepSteamSubtitle", //priceTag: "(+25%)"
      },
    ],
  },
  {
    slug: "post-event-cleaning",
    title: "serviceLablePostEventCleaning",
    icon: <PartyPopper className="w-6 h-6 text-pink-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqStandardCleanSubtitle", //priceTag: "(+20%)"
      },
      { id: "same-day", name: "freqSameDayName", subtitle: "freqSameDaySubtitle", //priceTag: "(+40%)"
      },
      { id: "private-event", name: "freqPrivateEventName", subtitle: "freqPrivateEventSubtitle", //priceTag: "(+25%)"
      },
      { id: "corporate-event", name: "freqCorporateEventName", subtitle: "freqCorporateEventSubtitle", //priceTag: "(+50%)"
      },
    ],
  },
  {
    slug: "luxury-yacht-cleaning",
    title: "serviceLableLuxuryYachtCleaning",
    icon: <Ship className="w-6 h-6 text-sky-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqRegularUpkeepSubtitle", // priceTag: "(+50%)" 
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqMarineDetailingSubtitle", //priceTag: "(+30%)" 
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqPortMaintenanceSubtitle", //priceTag: "(+35%)" 
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyDeckCareSubtitle", //priceTag: "(+40%)" 
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqPreCruisePolishSubtitle", //priceTag: "(+60%)" 
      },
      { id: "charter-turnaround", name: "freqCharterTurnaroundName", subtitle: "freqCharterTurnaroundSubtitle", //priceTag: "(+75%)" 
      },
    ],
  },
  {
    slug: "healthguard-sanitization",
    title: "serviceLableHealthGuardSanitization",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqWeeklySubtitle", //priceTag: "(+0%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqOneTimeSubtitle", //priceTag: "(+10%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklySubtitle", //priceTag: "(+5%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlySubtitle", //priceTag: "(+0%)"
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendSubtitle", //priceTag: "(+15%)"
      },
      { id: "professional-disinfection", name: "freqProDisinfectionName", subtitle: "freqProDisinfectionSubtitle", //priceTag: "(+40%)"
      },
    ],
  },
  {
    slug: "pool-cleaning",
    title: "serviceLablePoolCleaning",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqWeeklySubtitle", //priceTag: "(+0%)"
      },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqOneTimeSubtitle", //priceTag: "(+10%)"
      },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklySubtitle", //priceTag: "(+5%)"
      },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlySubtitle", //priceTag: "(+0%)"
      },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendSubtitle", //priceTag: "(+15%)"
      },
      { id: "professional-disinfection", name: "freqProDisinfectionName", subtitle: "freqProDisinfectionSubtitle", //priceTag: "(+40%)"
      },
    ],
  },
];

export function frequencyNameKey(frequencyId: string): TranslationKey | undefined {
  for (const service of cleaningServices) {
    const match = service.frequencies.find((f) => f.id === frequencyId);
    if (match) return match.name as TranslationKey;
  }
  return undefined;
}

interface ServiceFrequencySelectorProps {
  selectedServiceSlug?: string;
  value?: string | null;
  onSelectionChange?: (frequencyId: string | null) => void;
}

export default function ServiceFrequencySelector({
  selectedServiceSlug = "regular-home-cleaning",
  value = null,
  onSelectionChange,
}: ServiceFrequencySelectorProps) {
  const currentService =
    cleaningServices.find((s) => s.slug === selectedServiceSlug) || cleaningServices[0];

  const currentFrequencyId = value ?? "";

  const handleFrequencySelect = (freqId: string) => {
    onSelectionChange?.(currentFrequencyId === freqId ? null : freqId);
  };

  const { translate } = useLanguage();

  return (
    <div className="w-full bg-[#030712] border border-[#111927] rounded-2xl sm:rounded-3xl p-4 sm:p-8 md:p-10 font-serif text-slate-100 shadow-2xl">
      {/* Step Indicator Header */}
      <div className="mb-4 sm:mb-6">
        <span className="text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] text-[#D9B75B] uppercase">
          Step 2 of 6
        </span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-serif text-white mt-1 font-normal tracking-wide leading-tight">
          Service Frequency & Privilege Savings
        </h2>
      </div>

      <div className="border-t border-[#111927] pt-5 sm:pt-8">
        {/* Responsive Grid: 1 col on mobile, 2 cols on small tablet, 4 cols on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
          {currentService.frequencies.map((freq) => {
            const isSelected = currentFrequencyId === freq.id;

            return (
              <div
                key={freq.id}
                onClick={() => handleFrequencySelect(freq.id)}
                className={`relative flex flex-col justify-between p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer text-left min-h-[170px] sm:min-h-[220px] ${
                  isSelected
                    ? "bg-[#131713] border-2 border-[#E5C365] shadow-[0_0_20px_rgba(229,195,101,0.18)]"
                    : "bg-[#0B101C] border border-[#172238] hover:border-slate-700 hover:bg-[#0f1626]"
                }`}
              >
                {/* Top Badge Slot */}
                <div className="min-h-[24px] sm:min-h-[28px] mb-2 sm:mb-4">
                  <span
                    className={`inline-block px-2.5 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-[11px] font-sans font-semibold tracking-wider rounded-md ${
                      isSelected
                        ? "bg-[#E5C365] text-[#0A0D08]"
                        : "bg-[#182338] text-[#8091B0]"
                    }`}
                  >
                    {translate(freq.name as TranslationKey)}
                  </span>
                </div>

                {/* Main Card Content */}
                <div className="flex-1 flex flex-col justify-center my-1 sm:my-2">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-normal text-white mb-1 tracking-wide">
                    {translate(freq.name as TranslationKey)}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans text-[#7082A0] font-light leading-relaxed">
                    {translate(freq.subtitle as TranslationKey)}
                  </p>
                </div>

                {/* Bottom Status Tag */}
                <div className="pt-2 sm:pt-4 hidden">
                  <p
                    className={`text-xs sm:text-sm font-sans font-medium ${
                      isSelected ? "text-[#E5C365]" : "text-[#586A8A]"
                    }`}
                  >
                    {translate(freq.subtitle as TranslationKey)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}