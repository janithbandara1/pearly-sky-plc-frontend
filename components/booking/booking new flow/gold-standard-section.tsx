"use client";

import React from "react";
import { Award, Leaf, ShieldCheck } from "lucide-react";
import { usePoolTheme } from "@/lib/pool-theme-context";

interface GoldStandardProps {
  theme?: string;
}

export default function GoldStandardSection({
  theme: themeProp = "dark",
}: GoldStandardProps) {
  const { theme: poolTheme, setTheme: setPoolTheme } = usePoolTheme();
  const isLight = poolTheme === "light";

  const standards = [
    {
      id: "quality",
      icon: <Award className={`w-5 h-5 ${isLight ? "text-[#C5A059]" : "text-[#D9B75B]"}`} />,
      title: "20-Year Quality Assurance",
      description:
        "Backed by two decades of serving diplomatic residences and luxury penthouses with complete background clearance and strict NDA protocols.",
      borderStyle: isLight
        ? "border-[#E5DFD3] hover:border-[#C5A059]/60"
        : "border-[#172238] hover:border-[#D9B75B]/40",
      iconBg: isLight
        ? "bg-[#FAF7F2] border-[#E5DFD3]"
        : "bg-[#0A0F1D] border-[#D9B75B]/30",
    },
    {
      id: "eco",
      icon: <Leaf className="w-5 h-5 text-[#34D399]" />,
      title: "Eco-Certified Non-Toxic",
      description:
        "100% biodegradable botanical neutral solvents protecting child and pet wellness, high-end marble, unsealed hardwood, and brass fixtures.",
      borderStyle: isLight
        ? "border-[#E5DFD3] hover:border-[#34D399]/60"
        : "border-[#064E3B]/60 hover:border-[#34D399]/60",
      iconBg: isLight
        ? "bg-[#ECFDF5] border-[#A7F3D0]"
        : "bg-[#062C22] border-[#047857]/40",
    },
    {
      id: "liability",
      icon: <ShieldCheck className={`w-5 h-5 ${isLight ? "text-[#C5A059]" : "text-[#D9B75B]"}`} />,
      title: "€5,000,000 Liability Cover",
      description:
        "Comprehensive insurance coverage for irreplaceable art pieces, antique furnishings, custom chandeliers, and rare architectural finishes.",
      borderStyle: isLight
        ? "border-[#E5DFD3] hover:border-[#C5A059]/60"
        : "border-[#172238] hover:border-[#D9B75B]/40",
      iconBg: isLight
        ? "bg-[#FAF7F2] border-[#E5DFD3]"
        : "bg-[#0A0F1D] border-[#D9B75B]/30",
    },
  ];

  return (
    <section
      className={`w-full py-12 sm:py-16 px-4 sm:px-8 transition-colors duration-300 font-sans ${
        isLight
          ? "bg-[#FBF9F5] text-[#1B2E4B]"
          : "bg-[#030712] text-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span
            className={`text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase ${
              isLight ? "text-[#C5A059]" : "text-[#D9B75B]"
            }`}
          >
            EXCELLENCE UNMATCHED
          </span>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl font-serif mt-2 tracking-wide font-normal ${
              isLight ? "text-[#1B2E4B]" : "text-white"
            }`}
          >
            The Pearly Sky Gold Standard
          </h2>
        </div>

        {/* 3-Column Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {standards.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl border transition-all duration-300 ${
                isLight
                  ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] text-[#1B2E4B]"
                  : "bg-[#0B101C] text-slate-200"
              } ${item.borderStyle}`}
            >
              {/* Feature Icon Badge */}
              <div
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-6 shadow-sm ${item.iconBg}`}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className={`text-lg sm:text-xl font-serif font-semibold mb-3 tracking-wide ${
                  isLight ? "text-[#1B2E4B]" : "text-white"
                }`}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className={`text-xs sm:text-sm leading-relaxed font-light ${
                  isLight ? "text-slate-600" : "text-[#7082A0]"
                }`}
              >
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}