"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Truck, Leaf, Award, CheckCircle2 } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-r from-[#081325] via-[#0f1d35] to-slate-900 text-white relative overflow-hidden py-8 sm:py-12 border-b border-amber-500/20">
      {/* Background Visual Element */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#c69214_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Moving In & Out <span className="text-[#c69214]">Transport Service</span>
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light tracking-wide">
              Safe. Professional. Stress-Free.
            </p>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center hover:border-[#c69214]/50 transition">
                <ShieldCheck className="w-6 h-6 text-[#c69214] mb-1" />
                <span className="text-xs font-medium text-slate-200">Careful Handling</span>
              </div>
              <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center hover:border-[#c69214]/50 transition">
                <Truck className="w-6 h-6 text-[#c69214] mb-1" />
                <span className="text-xs font-medium text-slate-200">Professional Team</span>
              </div>
              <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center hover:border-[#c69214]/50 transition">
                <Leaf className="w-6 h-6 text-[#c69214] mb-1" />
                <span className="text-xs font-medium text-slate-200">Eco-Friendly Approach</span>
              </div>
              <div className="flex flex-col items-center p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 text-center hover:border-[#c69214]/50 transition">
                <Award className="w-6 h-6 text-[#c69214] mb-1" />
                <span className="text-xs font-medium text-slate-200">Premium Service</span>
              </div>
            </div>
          </div>

          {/* Hero Image Banner */}
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#c69214]/30 h-52">
              <Image
                src="/images/services/transport/transport-bg.webp"
                alt="Pearly Sky Luxury Moving Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#081325]/90 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-xs text-[#c69214] font-medium">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Fully insured premium moving fleet across Europe</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
