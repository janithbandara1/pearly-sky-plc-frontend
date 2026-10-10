"tsx"
"use client";

import React, { useEffect, useState } from "react";
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
  Check,
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

// Service data mapped dynamically with slugs, titles, icons, and frequency cards
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
      { id: "one-time", name: "freqOneTimeName", subtitle : "freqIntensiveSubtitle", 
        //priceTag: "(+40%)"
         }, 
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqDeepMaintenanceSubtitle", 
        //priceTag: "(+25%)"
         },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqThoroughUpkeepSubtitle", 
        //priceTag: "(+30%)"
         },
      { id: "monthly", name: "freqMonthlyName", subtitle:"freqDeepPeriodicCleanSubtitle", 
        //priceTag: "(+35%)"
         },
     
    ],
  },
  {
    slug: "end-of-tenancy-cleaning",
    title: "serviceLableEndOfTenancyCleaning",
    icon: <Key className="w-6 h-6 text-amber-400" />, 
    frequencies: [
      { id: "move-in", name: "freqMoveInName", 
        subtitle: "freqMoveInSubtitle", //priceTag: "(+10%)"
      },
      { id: "move-out", name: "freqMoveOutName", 
        subtitle: "freqMoveOutSubtitle", //priceTag: "(+20%)"
      },
      { id: "property-handover", name: "freqPropertyHandoverName", 
        subtitle: "freqPropertyHandoverSubtitle", //priceTag: "(+25%)"
      },
    ],
  },
  {
    slug: "post-construction-renovation-cleaning",
    title: "serviceLablePostConstructionRenovationCleaning",
    icon: <Building className="w-6 h-6 text-orange-400" />,
    frequencies: [
      { id: "construction", name: "freqConstructionName",
         subtitle: "freqConstructionSubtitle", //priceTag: "(+50%)"
      },
      { id: "renovation", name: "freqRenovationName",
         subtitle: "freqRenovationSubtitle", //priceTag: "(+40%)"
      },
      { id: "builders", name: "freqBuildersName",
         subtitle: "freqBuildersSubtitle", //priceTag: "(+45%)"
      },
      { id: "final-handover", name: "freqFinalHandoverName",
         subtitle: "freqFinalHandoverSubtitle", //priceTag: "(+60%)"
      },
    ],
  },
  {
    slug: "same-day-priority-cleaning",
    title: "serviceLableSameDayPriorityCleaning", 
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    frequencies: [
      { id: "same-day", name: "freqSameDayName", subtitle: "freqImmediateDispatchSubtitle", 
       // priceTag: "(+50%)" 
    },
      { id: "emergency", name: "freqEmergencyName", subtitle: "freqUrgentResponseSubtitle", 
       // priceTag: "(+75%)" 
    },
      { id: "priority", name: "freqPriorityName", subtitle: "freqFrontOfQueueSubtitle", 
       // priceTag: "(+30%)" 
    },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendPrioritySubtitle", 
       // priceTag: "(+40%)" 
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
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqSingleTurnSubtitle", 
        //priceTag: "(+10%)"
         },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqMultiTurnPackageSubtitle", 
        //priceTag: "(+0%)"
         },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyChecksSubtitle", 
        //priceTag: "(+5%)"
         },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyOverviewSubtitle", 
        //priceTag: "(+10%)"
         },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqPeakWeekendTurnSubtitle", 
        //priceTag: "(+25%)"
         },
      { id: "guest-turnover", name: "freqGuestTurnoverName", subtitle: "freqGuestTurnoverSubtitle", 
        //priceTag: "(+30%)"
         },
    ],
  },
  {
    slug: "commercial-office-cleaning",
    title: "serviceLableCommercialOfficeCleaning",
    icon: <Building className="w-6 h-6 text-cyan-400" />,
    frequencies: [
      { 
        id: "one-time", name: "freqOneTimeName", subtitle: "freqOfficeDeepRefreshSubtitle", //priceTag: "(+0%)"
         },
      { 
        id: "weekly", name: "freqWeeklyName", subtitle: "freqWeeklyCorporateSubtitle", //priceTag: "(-10%)"
         },
      { 
        id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklyMaintenanceSubtitle", //priceTag: "(-5%)"
         },
      { 
        id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyDeepCleanSubtitle", //priceTag: "(+0%)"
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
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqRegularUpkeepSubtitle",
        // priceTag: "(+50%)" 
    },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqMarineDetailingSubtitle", 
        //priceTag: "(+30%)" 
    },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqPortMaintenanceSubtitle", 
        //priceTag: "(+35%)" 
    },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlyDeckCareSubtitle", 
        //priceTag: "(+40%)" 
    },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqPreCruisePolishSubtitle", 
        //priceTag: "(+60%)" 
    },
      { id: "charter-turnaround", name: "freqCharterTurnaroundName", subtitle: "freqCharterTurnaroundSubtitle", 
        //priceTag: "(+75%)" 
    },
    ],
  },
  {
    slug: "healthguard-sanitization",
    title: "serviceLableHealthGuardSanitization",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    frequencies: [
      { id: "one-time", name: "freqOneTimeName", subtitle: "freqWeeklySubtitle", 
        //priceTag: "(+0%)"
         },
      { id: "weekly", name: "freqWeeklyName", subtitle: "freqOneTimeSubtitle", 
        //priceTag: "(+10%)"
         },
      { id: "bi-weekly", name: "freqBiWeeklyName", subtitle: "freqBiWeeklySubtitle", 
        //priceTag: "(+5%)"
         },
      { id: "monthly", name: "freqMonthlyName", subtitle: "freqMonthlySubtitle", 
        //priceTag: "(+0%)"
         },
      { id: "weekend", name: "freqWeekendName", subtitle: "freqWeekendSubtitle", 
        //priceTag: "(+15%)"
         },
      { id: "professional-disinfection", name: "freqProDisinfectionName", subtitle: "freqProDisinfectionSubtitle", 
        //priceTag: "(+40%)"
         },
    ],
  },
];

interface ServiceFrequencySelectorProps {
  selectedServiceSlug?: string;
  onSelectionChange?: (serviceSlug: string, frequencyId: string) => void;
}

export default function ServiceFrequencySelector({
  selectedServiceSlug = "regular-home-cleaning",
  onSelectionChange,
}: ServiceFrequencySelectorProps) {
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | "">(selectedServiceSlug);
  const [selectedFrequencies, setSelectedFrequencies] = useState<Record<string, string>>({
    [selectedServiceSlug]: cleaningServices.find((s) => s.slug === selectedServiceSlug)?.frequencies[0]?.id || "",
  });

 

  // Find current active service object
  const currentService =
    cleaningServices.find((s) => s.slug === activeServiceSlug) || cleaningServices[0];

  const currentFrequencyId = selectedFrequencies[activeServiceSlug] || "";

  // Toggle selection logic: unselect if already active
  const handleFrequencySelect = (freqId: string) => {
    const nextFreqId = currentFrequencyId === freqId ? "" : freqId;
    setSelectedFrequencies((prev) => ({ ...prev, [activeServiceSlug]: nextFreqId }));
    if (onSelectionChange) onSelectionChange(activeServiceSlug, nextFreqId);
  };

  const {translate}=useLanguage();

  return (
    <div className="w-full p-6 bg-[#0B132B] text-white rounded-2xl shadow-2xl font-sans">
      <h2 className="text-xl font-semibold mb-6 tracking-wide text-slate-200">
        Choose your preferred service frequency
      </h2>

      

      {/* Dynamic Frequencies Grid matching the requested UI image style */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">{currentService.icon}</div>
          <h3 className="text-lg font-bold text-slate-100">{translate(currentService.title as TranslationKey)} Frequencies</h3>
        </div>

        <div className={`grid grid-cols-1 ${currentService.frequencies.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-4`}>
          {currentService.frequencies.map((freq) => {
            const isSelected = currentFrequencyId === freq.id;
            return (
              <div
                key={freq.id}
                onClick={() => handleFrequencySelect(freq.id)}
                className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? "bg-[#1E293B] border-blue-500 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500"
                    : "bg-[#111936] border-slate-800 hover:border-slate-700 hover:bg-[#162042]"
                }`}
              >
                {/* Left side: Icon simulation matching UI layout style */}
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isSelected ? "bg-blue-600 text-white" : "bg-[#1C2541] text-slate-400"
                    }`}
                  >
                    {currentService.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white tracking-wide">
                      {translate(freq.name as TranslationKey)}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {translate(freq.subtitle as TranslationKey)} <span className="text-slate-500">{translate(freq.priceTag as TranslationKey)}</span>
                    </p>
                  </div>
                </div>

                {/* Right side checkbox indicator matching image look */}
                <div
                  className={`w-6 h-6 rounded-md border flex items-center justify-center transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "border-slate-700 bg-transparent"
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}