"tsx"
"use client";

import React, { useState } from "react";
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
    title: "Regular Home Cleaning",
    icon: <Home className="w-6 h-6 text-blue-400" />,
    frequencies: [
      { 
        id: "one-time", name: "One-Time", subtitle: "Standard clean",// priceTag: "(+0%)" 
        },
      { 
        id: "weekly", name: "Weekly", subtitle: "Most popular save 20%",// priceTag: "(-20%)" 
        },
      { 
        id: "bi-weekly", name: "Bi-Weekly", subtitle: "Regular upkeep",// priceTag: "(-10%)" 
        },
      { 
        id: "monthly", name: "Monthly", subtitle: "Light maintenance",// priceTag: "(+0%)" 
        },
      
    ],
  },
  {
    slug: "quick-touch-up-cleaning",
    title: "Essential Touch-Up Cleaning",
    icon: <StarIcon className="w-6 h-6 text-purple-400" />,
    frequencies: [
       { 
        id: "one-time", name: "One-Time", subtitle: "Quick refresh", //priceTag: "(+0%)" 
        },
      { 
        id: "weekly", name: "Weekly", subtitle: "Regular touch-up", //priceTag: "(-15%)" 
      },
      { 
        id: "bi-weekly", name: "Bi-Weekly", subtitle: "Bi-weekly upkeep", //priceTag: "(-5%)" 
      },
      { 
        id: "monthly", name: "Monthly", subtitle: "Monthly light pass", //priceTag: "(+0%)" 
      },
      
    ],
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    icon: <CheckSquare className="w-6 h-6 text-indigo-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Intensive", 
        //priceTag: "(+40%)"
         },
      { id: "weekly", name: "Weekly", subtitle: "Deep maintenance", 
        //priceTag: "(+25%)"
         },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Thorough upkeep", 
        //priceTag: "(+30%)"
         },
      { id: "monthly", name: "Monthly", subtitle: "Deep periodic clean", 
        //priceTag: "(+35%)"
         },
     
    ],
  },
  {
    slug: "end-of-tenancy-cleaning",
    title: "End of Tenancy Cleaning",
    icon: <Key className="w-6 h-6 text-amber-400" />,
    frequencies: [
      { id: "move-in", name: "Move-In", subtitle: "Pre-occupancy clean", //priceTag: "(+10%)"
      },
      { id: "move-out", name: "Move-Out", subtitle: "Deposit back guarantee", //priceTag: "(+20%)"
      },
      { id: "property-handover", name: "Property Handover", subtitle: "Landlord standard", //priceTag: "(+25%)"
      },
    ],
  },
  {
    slug: "post-construction-renovation-cleaning",
    title: "Post-Construction & Renovation",
    icon: <Building className="w-6 h-6 text-orange-400" />,
    frequencies: [
      { id: "construction", name: "Construction", subtitle: "Heavy dust & debris", //priceTag: "(+50%)"
      },
      { id: "renovation", name: "Renovation", subtitle: "Post-remodel refresh", //priceTag: "(+40%)"
      },
      { id: "builders", name: "Builders'", subtitle: "Initial builder clean", //priceTag: "(+45%)"
      },
      { id: "final-handover", name: "Final Handover", subtitle: "Pristine sparkle", //priceTag: "(+60%)"
      },
    ],
  },
  {
    slug: "same-day-priority-cleaning",
    title: "Same-Day Priority Cleaning",
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    frequencies: [
      { id: "same-day", name: "Same-Day", subtitle: "Immediate dispatch", 
       // priceTag: "(+50%)" 
    },
      { id: "emergency", name: "Emergency", subtitle: "Urgent response", 
       // priceTag: "(+75%)" 
    },
      { id: "priority", name: "Priority", subtitle: "Front of queue", 
       // priceTag: "(+30%)" 
    },
      { id: "weekend", name: "Weekend", subtitle: "Weekend priority", 
       // priceTag: "(+40%)" 
    },
    ],
  },
  {
    slug: "high-security-property-care",
    title: "High-Security Property Care",
    icon: <Lock className="w-6 h-6 text-red-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Secure clearance", //priceTag: "(+20%)"
      },
      { id: "weekly", name: "Weekly", subtitle: "Vetted weekly care", //priceTag: "(+10%)"
      },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Scheduled secure", //priceTag: "(+15%)"
      },
      { id: "monthly", name: "Monthly", subtitle: "Monthly audit check", //priceTag: "(+20%)"
      },
      { id: "weekend", name: "Weekend", subtitle: "Weekend clearance", //priceTag: "(+30%)"
      },
      { id: "discreet", name: "Discreet", subtitle: "Unmarked operatives", //priceTag: "(+50%)"
      },
    ],
  },
  {
    slug: "premium-rental-concierge-cleaning",
    title: "Premium Rental Concierge",
    icon: <Building2 className="w-6 h-6 text-teal-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Single turn", 
        //priceTag: "(+10%)"
         },
      { id: "weekly", name: "Weekly", subtitle: "Multi-turn package", 
        //priceTag: "(+0%)"
         },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Bi-weekly checks", 
        //priceTag: "(+5%)"
         },
      { id: "monthly", name: "Monthly", subtitle: "Monthly overview", 
        //priceTag: "(+10%)"
         },
      { id: "weekend", name: "Weekend", subtitle: "Peak weekend turn", 
        //priceTag: "(+25%)"
         },
      { id: "guest-turnover", name: "Guest Turnover", subtitle: "Instant Airbnb turn", 
        //priceTag: "(+30%)"
         },
    ],
  },
  {
    slug: "commercial-office-cleaning",
    title: "Commercial & Office Cleaning",
    icon: <Building className="w-6 h-6 text-cyan-400" />,
    frequencies: [
      { 
        id: "one-time", name: "One-Time", subtitle: "Office deep refresh", //priceTag: "(+0%)"
         },
      { 
        id: "weekly", name: "Weekly", subtitle: "Weekly corporate", //priceTag: "(-10%)"
         },
      { 
        id: "bi-weekly", name: "Bi-Weekly", subtitle: "Bi-weekly maintenance", //priceTag: "(-5%)"
         },
      { 
        id: "monthly", name: "Monthly", subtitle: "Monthly deep clean", //priceTag: "(+0%)"
         },
      { 
        id: "weekend", name: "Weekend", subtitle: "After-hours weekend", //priceTag: "(+20%)"
         },
    ],
  },
  {
    slug: "steam-cleaning",
    title: "Steam Cleaning",
    icon: <Flame className="w-6 h-6 text-rose-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Intense sanitize", //priceTag: "(+25%)"
         },
      { id: "weekly", name: "Weekly", subtitle: "Regular steam care", //priceTag: "(+15%)"
         },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Bi-weekly refresh", //priceTag: "(+20%)"
         },
      { id: "monthly", name: "Monthly", subtitle: "Monthly deep steam", //priceTag: "(+25%)"
         },
      { id: "weekend", name: "Weekend", subtitle: "Weekend steaming", //priceTag: "(+35%)"
         },
    ],
  },

  {
    slug: "post-event-cleaning",
    title: "Post-Event Cleaning",
    icon: <PartyPopper className="w-6 h-6 text-pink-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Standard cleanup", //priceTag: "(+20%)"
         },
      { id: "same-day", name: "Same-Day", subtitle: "Immediate post-party", //priceTag: "(+40%)"
         },
      { id: "private-event", name: "Private Event", subtitle: "Residential gathering", //priceTag: "(+25%)"
         },
      { id: "corporate-event", name: "Corporate Event", subtitle: "Large venue sweep", //priceTag: "(+50%)"
         },
      { id: "weekend", name: "Weekend", subtitle: "Weekend event wrap", //priceTag: "(+30%)"
         },
    ],
  },
  {
    slug: "luxury-yacht-cleaning",
    title: "Luxury Yacht Cleaning",
    icon: <Ship className="w-6 h-6 text-sky-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Marine detailing",
        // priceTag: "(+50%)" 
    },
      { id: "weekly", name: "Weekly", subtitle: "Port maintenance", 
        //priceTag: "(+30%)" 
    },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Regular upkeep", 
        //priceTag: "(+35%)" 
    },
      { id: "monthly", name: "Monthly", subtitle: "Monthly deck care", 
        //priceTag: "(+40%)" 
    },
      { id: "weekend", name: "Weekend", subtitle: "Pre-cruise polish", 
        //priceTag: "(+60%)" 
    },
      { id: "charter-turnaround", name: "Charter Turnaround", subtitle: "Fast yacht turn", 
        //priceTag: "(+75%)" 
    },
    ],
  },
  {
    slug: "healthguard-sanitization",
    title: "HealthGuard Sanitization",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    frequencies: [
      { id: "one-time", name: "One-Time", subtitle: "Hospital-grade", 
        //priceTag: "(+0%)"
         },
      { id: "weekly", name: "Weekly", subtitle: "Continuous sterile", 
        //priceTag: "(+10%)"
         },
      { id: "bi-weekly", name: "Bi-Weekly", subtitle: "Bi-weekly shield", 
        //priceTag: "(+5%)"
         },
      { id: "monthly", name: "Monthly", subtitle: "Monthly protection", 
        //priceTag: "(+0%)"
         },
      { id: "weekend", name: "Weekend", subtitle: "Weekend disinfection", 
        //priceTag: "(+15%)"
         },
      { id: "professional-disinfection", name: "Professional Disinfection", subtitle: "Bio-hazard standard", 
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
  const [activeServiceSlug, setActiveServiceSlug] = useState<string>(selectedServiceSlug);
  const [selectedFrequencies, setSelectedFrequencies] = useState<Record<string, string>>({
    [selectedServiceSlug]: cleaningServices.find((s) => s.slug === selectedServiceSlug)?.frequencies[0]?.id || "",
  });

  // Find current active service object
  const currentService =
    cleaningServices.find((s) => s.slug === activeServiceSlug) || cleaningServices[0];

  const currentFrequencyId = selectedFrequencies[activeServiceSlug] || currentService.frequencies[0]?.id;

  
  const handleFrequencySelect = (freqId: string) => {
    setSelectedFrequencies((prev) => ({ ...prev, [activeServiceSlug]: freqId }));
    if (onSelectionChange) onSelectionChange(activeServiceSlug, freqId);
  };

  return (
    <div className="w-full p-6 bg-[#0B132B] text-white rounded-2xl shadow-2xl font-sans">
      <h2 className="text-xl font-semibold mb-6 tracking-wide text-slate-200">
        Choose your preferred service frequency
      </h2>

      

      {/* Dynamic Frequencies Grid matching the requested UI image style */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-500/20 rounded-lg">{currentService.icon}</div>
          <h3 className="text-lg font-bold text-slate-100">{currentService.title} Frequencies</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      {freq.name}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {freq.subtitle} <span className="text-slate-500">{freq.priceTag}</span>
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