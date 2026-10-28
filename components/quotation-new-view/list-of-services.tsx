"use client";

import React, { useState } from "react";
import { Sparkles, Check, Star,Sparkle,
KeyRound,

HardHat,
Zap,
ShieldCheck,
ConciergeBell,
Shirt,
Armchair,
Waves,
SprayCan,
Building2,
Wind,
PartyPopper,
Anchor,
Baby,
HeartHandshake,
Truck,
ShieldAlert, 
HomeIcon} from "lucide-react";
import Home from "@/app/(site)/page";

export interface EcoServiceItem {
  id: number;
  name: string;
  desc: string;
}

export interface EcoServicesSelectorProps {
  /** Array of available services */
  services?: serviceDetails[];
  /** Single selected service ID */
  selectedServiceId?: number;
  /** Callback when a service is selected */
  onSelectService?: (serviceId: number) => void;
  /** Multiple selected service IDs */
  selectedServiceIds?: number[];
  /** Callback when multiple service selection changes */
  onSelectServices?: (serviceIds: number[]) => void;
  /** Theme mode */
  theme?: "dark" | "light";
  /** Optional custom outer class */
  className?: string;
}

interface serviceDetails{
    id?:number;
    label?:string; 
  icon?: React.ReactNode;
}

const Defualt_servies: serviceDetails[] = [
  {
    id: 1,
    label: "Regular Home Cleaning",
    icon:<HomeIcon className="w-5 h-5" />
  },
  {
    id: 2,
    label: "Essential Touch-Up Cleaning",
    icon: <Sparkle className="w-5 h-5" />,
  },
  {
    id: 4,
    label: "Deep Cleaning",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    id: 5,
    label: "End of Tenancy Cleaning",
    icon: <KeyRound className="w-5 h-5" />,
  },
  {
    id: 6,
    label: "Post-Construction & Renovation Cleaning",
    icon: <HardHat className="w-5 h-5" />,
  },
  {
    id: 3,
    label: "Same-Day Priority Cleaning",
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 15,
    label: "High-Security Property Care",
    icon: <ShieldCheck className="w-5 h-5" />,
  },
  {
    id: 7,
    label: "Premium Rental Concierge Cleaning",
    icon: <ConciergeBell className="w-5 h-5" />,
  },
  {
    id: 19,
    label: "Laundry Service",
    icon: <Shirt className="w-5 h-5" />,
  },
  {
    id: 10,
    label: "Carpet & Upholstery Cleaning",
    icon: <Armchair className="w-5 h-5" />,
  },
  {
    id: 13,
    label: "Pool Cleaning",
    icon: <Waves className="w-5 h-5" />,
  },
  {
    id: 14,
    label: "Precision Pressure Washing",
    icon: <SprayCan className="w-5 h-5" />,
  },
  {
    id: 8,
    label: "Commercial & Office Cleaning",
    icon: <Building2 className="w-5 h-5" />,
  },
  {
    id: 11,
    label: "Steam Cleaning",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: 12,
    label: "Post-Event Cleaning",
    icon: <PartyPopper className="w-5 h-5" />,
  },
  {
    id: 16,
    label: "Luxury Yacht Cleaning",
    icon: <Anchor className="w-5 h-5" />,
  },
  {
    id: 17,
    label: "Child Care Service",
    icon: <Baby className="w-5 h-5" />,
  },
  {
    id: 18,
    label: "Elder Care Service",
    icon: <HeartHandshake className="w-5 h-5" />,
  },
  {
    id: 20,
    label: "Move-In / Move-Out Transport Service",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    id: 9,
    label: "HealthGuard-Sanitization",
    icon: <ShieldAlert className="w-5 h-5" />,
  },
];

export  const SERVICE_ICONS: Record<string, React.ReactNode> = {

  "Regular Home Cleaning": <HomeIcon className="w-5 h-5 text-yellow-500" />,

  "Essential Touch-Up Cleaning": <Sparkle className="w-5 h-5 text-yellow-500" />,

  "Deep Cleaning": <Sparkles className="w-5 h-5 text-yellow-500" />,

  "End of Tenancy Cleaning": <KeyRound className="w-5 h-5 text-yellow-500" />,

  "Post-Construction & Renovation Cleaning": <HardHat className="w-5 h-5 text-yellow-500" />,

  "Same-Day Priority Cleaning": <Zap className="w-5 h-5 text-yellow-500" />,

  "High-Security Property Care": <ShieldCheck className="w-5 h-5 text-yellow-500" />,

  "Premium Rental Concierge Cleaning": <ConciergeBell className="w-5 h-5 text-yellow-500" />,

  "Laundry Service": <Shirt className="w-5 h-5 text-yellow-500" />,

  "Carpet & Upholstery Cleaning": <Armchair className="w-5 h-5 text-yellow-500" />,

  "Pool Cleaning": <Waves className="w-5 h-5 text-yellow-500" />,

  "Precision Pressure Washing": <SprayCan className="w-5 h-5 text-yellow-500" />,

  "Commercial & Office Cleaning": <Building2 className="w-5 h-5 text-yellow-500" />,

  "Steam Cleaning": <Wind className="w-5 h-5 text-yellow-500" />,

  "Post-Event Cleaning": <PartyPopper className="w-5 h-5 text-yellow-500" />,

  "Luxury Yacht Cleaning": <Anchor className="w-5 h-5 text-yellow-500" />,

  "Child Care Service": <Baby className="w-5 h-5 text-yellow-500" />,

  "Elder Care Service": <HeartHandshake className="w-5 h-5 text-yellow-500" />,

  "Move-In / Move-Out Transport Service": <Truck className="w-5 h-5 text-yellow-500" />,

  "HealthGuard-Sanitization": <ShieldAlert className="w-5 h-5 text-yellow-500" />,

}; 



 


export default function EcoServicesSelector({
  services = Defualt_servies,
  selectedServiceId: selectedServiceIdProp,
  onSelectService,
  selectedServiceIds,
  onSelectServices,
  theme = "dark",
  className = "",
}: EcoServicesSelectorProps) {
  const isLight = theme === "light";

  
  // Single choice selection state
  const [internalSelectedId, setInternalSelectedId] = useState<number>(1);
  const activeSelectedId =
    selectedServiceIdProp !== undefined
      ? selectedServiceIdProp
      : selectedServiceIds && selectedServiceIds.length > 0
      ? selectedServiceIds[0]
      : internalSelectedId;

  const handleSelect = (id: number) => {
    setInternalSelectedId(id);
    onSelectService?.(id);
    onSelectServices?.([id]);
  };

  const getIconForService = (service: serviceDetails) => {
    return service.icon || <Sparkles className="w-5 h-5" />;
  };

  return (
    <section
      className={`relative w-full rounded-3xl p-5 sm:p-7 border transition-colors duration-300 font-sans ${
        isLight
          ? "bg-white border-slate-200 shadow-xl"
          : "bg-[#090e17] border-[#e5c158]/20 shadow-2xl"
      } ${className}`}
    >
      {/* Section Header */}
      <div className="flex items-center space-x-3.5 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#e5c158] shrink-0">
          <Star className="w-5 h-5" />
        </div>
        <div>
          <h2
            className={`font-serif text-2xl font-bold tracking-tight ${
              isLight ? "text-[#002F6D]" : "text-white"
            }`}
          >
            4. Our Eco-Luxury Services
          </h2>
          <p className={`text-xs ${isLight ? "text-slate-500" : "text-slate-400"}`}>
            Select your specialized white-glove treatment
          </p>
        </div>
      </div>

      {/* Services Grid: Mobile 1 column, sm: 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services?.map((s) => {
          const isSelected = activeSelectedId === s?.id;

          return (
            <div
              key={s?.id}
              onClick={() => handleSelect(s?.id || 1)}
              className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex  items-start space-x-3.5 select-none ${
                isSelected
                  ? "bg-[#e5c158]/10 border-[#e5c158] shadow-[0_0_15px_rgba(229,193,88,0.12)]"
                  : isLight
                  ? "bg-slate-50/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100/80"
                  : "bg-[#0d1320]/80 border-slate-800/80 hover:border-slate-700 hover:bg-[#121a2b]"
              }`}
            >
              

              {/* Title & Description */}
              <div className="flex w-full gap-2 items-center">
                
                <div className="">
                  {SERVICE_ICONS[s?.label || ""]}
                </div>
                <div className="flex flex-col">
                    <span
                    className={`text-xs font-bold block ${
                      isSelected
                        ? "text-[#e5c158]"
                        : isLight
                        ? "text-slate-900"
                        : "text-slate-200"
                    }`}
                  >
                    {s?.label}
                  </span>
                  <span
                    className={`text-[11px] block mt-1 leading-relaxed font-light ${
                      isLight ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {/*  {s?.desc || "Premium eco-certified cleaning service"} */}
                  </span>
                </div>
                
              </div>
              {/* Radio Check Indicator */}
              <div
                className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "bg-[#e5c158] border-[#e5c158] text-[#05080f]"
                    : isLight
                    ? "border-slate-300 bg-white"
                    : "border-slate-700 bg-[#121a2b]"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}