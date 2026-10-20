"use client";

import React from "react";

import { Sparkles } from "lucide-react";
import { ServiceConfig } from "@/lib/booking";

interface ServiceHeroProps { 
  config: ServiceConfig;
}

export default function ServiceHero({ config }: ServiceHeroProps) {
  return (
    <div className="text-center py-6 px-4 space-y-3">
      <div className="inline-flex items-center gap-2 bg-[#1C2541]/80 px-4 py-1.5 rounded-full border border-[#C5A880]/30 text-xs text-[#C5A880] font-medium shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
        {config.heroBadge}
      </div>
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#C5A880] font-serif">
        {config.heroTitle}
      </h2>
      <p className="max-w-3xl mx-auto text-sm md:text-base text-gray-300 leading-relaxed">
        {config.heroSubtitle}
      </p>
    </div>
  );
}