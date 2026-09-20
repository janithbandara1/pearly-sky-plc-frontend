"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Leaf,
  Diamond,
  Globe,
  ShieldCheck,
  ChevronRight,
  X,
  Users,
  ArrowRight,
} from "lucide-react";
import Facebook from "/images/email/social-facebook.png";
import Instagram from "/images/email/social-instagram.png";
import Linkedin from "/images/email/social-linkedin.png";
import Youtube from "/images/email/social-youtube.png";
interface Region {
  id: string;
  name: string;
  iconSvg: React.ReactNode;
}

const social_logos=[
    "/images/email/social-facebook.png",
    "/images/email/social-instagram.png",
    "/images/email/social-linkedin.png",
    "/images/email/social-youtube.png"
]

const ALL_REGIONS: Region[] = [
  {
    id: "europe",
    name: "EUROPE",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 10h6M9 14h6M9 18h6" />
      </svg>
    ),
  },
  {
    id: "australia",
    name: "AUSTRALIA",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 20c4-4 8 0 12-4s8 0 8-4M4 14c3-2 6 0 9-2" />
      </svg>
    ),
  },
  {
    id: "north-america",
    name: "NORTH AMERICA",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2L4 22h16L12 2Z" />
      </svg>
    ),
  },
  {
    id: "middle-east",
    name: "MIDDLE EAST",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" />
      </svg>
    ),
  },
  {
    id: "south-asia",
    name: "SOUTH ASIA",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
      </svg>
    ),
  },
  {
    id: "asia-pacific",
    name: "ASIA PACIFIC",
    iconSvg: (
      <svg className="w-10 h-10 text-[#C5A059]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="9" />
        <path d="M3.6 9h16.8M3.6 15h16.8" />
      </svg>
    ),
  },
];

export default function GlobalHeroSection() {
  const [regions, setRegions] = useState<Region[]>(ALL_REGIONS);
  const [isAnimating, setIsAnimating] = useState(false);

  // Shuffle regions every 5 seconds (rotating hidden 2 into the 4 displayed slots)
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setRegions((prev) => {
          const next = [...prev];
          const first = next.shift();
          if (first) next.push(first);
          return next;
        });
        setIsAnimating(false);
      }, 400);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const visibleRegions = regions.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#FBF9F1] font-serif text-[#1C2A3A] flex flex-col justify-between overflow-hidden selection:bg-[#C5A059] selection:text-white">
      {/* Background Leaf Image Overlay */}
      <div className="absolute top-0 left-0 bottom-0 md:-top-1 md:-left-25 lg:-top-1 lg:-left-25 w-full h-full pointer-events-none z-0 opacity-90">
        <Image
          src="/images/hero/global_hero_bg.png"
          alt="Eco Leaf Decorative"
          width={600}
          height={700}
          className="hidden md:block lg:object-contain object-left-top objec w-full h-full"
          priority
        />
        <Image
          src="/images/hero/mobile_hero.png"
          alt="Eco Leaf Decorative"
          width={600}
          height={700}
          className="md:hidden block lg:object-contain object-left-top  w-full h-full"
          priority
        />
      </div>

      {/* Main Content Body */}
      <main className="relative z-10 max-w-7xl mx-auto px-12 py-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-0 items-center my-auto">
        {/* Left Column: Brand Hero */}
        <div className="lg:col-span-6 space-y-8 justify-items-center  pl-4 lg:pl-8">
          <div className="space-y-2">
            {/* Crest Emblem */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-[1px] w-18 bg-[#C5A059]" />
              <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="h-[1px] w-18 bg-[#C5A059]" />
            </div>

            <h1 className="text-5xl lg:text-6xl text-center font-normal tracking-tight text-[#0F1E36]">
              Pearly Sky
            </h1>
            <p className="text-3xl lg:text-4xl text-[#C5A059] font-light tracking-wide">
              Eco-Luxury Cleaning
            </p>
            <div className="flex justify-center items-center">
                 <div className="h-[1px] w-[70%] bg-[#C5A059]" />
            </div>
          </div>

          <div className="space-y-4 max-w-lg">
            <p className="text-xs uppercase tracking-[0.25em] text-center text-[#0F1E36] font-semibold">
              Cleaner Spaces. Pure Conscience. Global Impact.
            </p>
            <p className="text-xs max-w-md sm:text-sm text-[#4d4e4e] leading-relaxed text-center font-sans font-light">
              Pearly Sky Eco-Luxury Cleaning Global delivers exceptional cleaning experiences with a commitment to sustainability, elegance, and global well-being.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#0F1E36] hover:bg-[#1A2E4C] text-white text-xs tracking-widest uppercase font-sans font-medium px-6 py-3.5 rounded-full flex items-center gap-3 transition-all shadow-md">
              <span className="w-5 h-5 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F1E36]">
                <Leaf className="w-3 h-3 fill-current" />
              </span>
              Our Services
            </button>

            <button className="border border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-xs tracking-widest uppercase font-sans font-medium px-6 py-3.5 rounded-full flex items-center gap-3 transition-all">
              Our Promise
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-4 gap-4 pt-0 py-1  max-w-lg">
            {[
              { icon: Leaf, label: "ECO FRIENDLY SOLUTIONS" },
              { icon: Diamond, label: "LUXURY EXPERIENCE" },
              { icon: Globe, label: "GLOBAL STANDARDS" },
              { icon: ShieldCheck, label: "TRUSTED PROFESSIONALS" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-[#F4EFE6] border border-[#E0D7C6] flex items-center justify-center text-[#C5A059]">
                  <item.icon className="w-4 h-4" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#0F1E36] font-sans font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Region Selection Modal Overlay */}
        <div className="lg:col-span-6 flex justify-center md:my-0 my-2">
          <div className="w-full max-w-md bg-[#FFFDF8] rounded-2xl shadow-2xl border border-[#EAE3D2] overflow-hidden relative">
            {/* Header / Close Button */}
            <div className="p-4 pb-1 text-center relative">
              <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors">
                <X className="w-5 h-5" />
              </button>

              <div className="w-8 h-8 mx-auto rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-3">
                <Globe className="w-5 h-5" />
              </div>

              <h2 className="text-2xl font-normal text-[#0F1E36]">Select Your Region</h2>
              <p className="text-xs text-gray-400 font-sans italic mt-1">Choose your location to continue</p>
              <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-3" />
            </div>

            {/* Region Cards Grid (4 displayed with Shuffle Effect) */}
            <div className="p-5 grid grid-cols-2 gap-4">
              {visibleRegions.map((region) => (
                <div
                  key={region.id}
                  className={`border border-[#EAE3D2] rounded-xl p-4 flex flex-col items-center justify-between h-32 hover:border-[#C5A059] hover:shadow-md transition-all duration-500 cursor-pointer group bg-[#FAF8F3] ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {region.iconSvg}
                  </div>
                  <div className="w-full flex items-center justify-between pt-2 border-t border-[#EAE3D2]/40">
                    <span className="text-[10px] font-sans font-bold tracking-wider text-[#0F1E36]">
                      {region.name}
                    </span>
                    <div className="w-5 h-5 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal Bottom Banner */}
            <div className="bg-[#0F1E36] px-6 py-4 flex items-center justify-center gap-3 text-white text-xs font-sans tracking-widest uppercase">
              <span className="w-5 h-5 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F1E36]">
                <Leaf className="w-3 h-3 fill-current" />
              </span>
              <span>CLEAN SPACES. ELEVATED LIVING. A BETTER PLANET.</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Navigation Bar */}
      <footer className="relative z-10 bg-[#0F1E36] text-white border-t border-[#1C2A3A]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
          {/* Brand Logo Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Image src="/images/brand/logo.webp" alt="Logo" width={30} height={30}/>
            </div>
            <div>
              <p className="font-serif text-sm leading-none tracking-wider text-white">PEARLY SKY</p>
              <p className="text-[8px] tracking-widest text-[#C5A059] uppercase">Eco-Luxury Cleaning Global</p>
            </div>
          </div>

          {/* Middle Value Props */}
          <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-wider text-gray-300">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-[#C5A059]" />
              <span>Sustainable Practices</span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-700 pl-8">
              <Users className="w-4 h-4 text-[#C5A059]" />
              <span>Community Focused</span>
            </div>
            <div className="flex items-center gap-2 border-l border-gray-700 pl-8">
              <Globe className="w-4 h-4 text-[#C5A059]" />
              <span>Global Presence</span>
            </div>
          </div>

          {/* Social Links Right */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-widest text-gray-400 mr-2">Follow Us</span>
            {social_logos.map((Icon, idx) => (
              <Image key={idx} alt="social" src={Icon}  width={30} height={30} className="hover:opacity-75 " />
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}