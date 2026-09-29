"use client";

import { Globe2, Network, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryHomeContent } from "@/lib/countries/home-content";

import React, { useState, useEffect } from "react";
import Image, { getImageProps } from "next/image";
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
interface Region {
  id: string;
  name: string;
  iconImage: string;
  objectPosition:string;
  linkTag:string,
}
import Link from "next/link";
import { SOCIAL_URLS } from "@/lib/content/social-links";
import {
  AiOutlineTikTok,
  AiFillInstagram,
} from "react-icons/ai";
import { FaFacebookF, FaYoutube, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

const {
  props: { srcSet: heroBgDesktopSrcSet },
} = getImageProps({ src: "/images/hero/global_hero_bg.png", alt: "", width: 1672, height: 941, sizes: "100vw" });
const { props: heroBgMobileProps } = getImageProps({
  src: "/images/hero/mobile_hero.png",
  alt: "",
  width: 768,
  height: 1376,
  sizes: "100vw",
});

const SOCIAL_LINKS = [
  { href: SOCIAL_URLS.tiktok, label: "TikTok", Icon: AiOutlineTikTok },
  { href: SOCIAL_URLS.facebook, label: "Facebook", Icon: FaFacebookF },
  { href: SOCIAL_URLS.instagram, label: "Instagram", Icon: AiFillInstagram },
  { href: SOCIAL_URLS.x, label: "X", Icon: RiTwitterXFill },
  { href: SOCIAL_URLS.youtube, label: "YouTube", Icon: FaYoutube },
  { href: SOCIAL_URLS.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
];

const social_logos=[
    "/images/email/social-facebook.png",
    "/images/email/social-instagram.png",
    "/images/email/social-linkedin.png",
    "/images/email/social-youtube.png"
]

const ALL_REGIONS: Region[] = [
  {
    id: "europe",
    name: "EUROPE UNION",
    iconImage: '/images/hero/europe.jpg',
    objectPosition:"",
    linkTag:"#europe"
  },
  {
    id: "australia",
    name: "AUSTRALIA & NEW ZEALAND",
    iconImage: '/images/hero/austrailia.jpg',
    objectPosition:"",
    linkTag:"#australia"
  },
  {
    id: "north-america",
    name: "NORTH AMERICA",
    iconImage: '/images/hero/north-america.jpg',
    objectPosition:"object-top",
    linkTag:"#north-america"
  },
  {
    id: "middle-east",
    name: "Middle East & Asia",
    iconImage: '/images/hero/middle-east.jpg',
    objectPosition:"",
    linkTag:"#middle-east"
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
    }, 5000);

    return () => clearInterval(interval);


  }, []);

  const redirectToRegions = (region: Region) => {
    const targetId = region.linkTag.replace(/^#/, "");
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const headerOffset = 90;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      history.pushState(null, "", region.linkTag);
    } else {
      location.href = region.linkTag;
    }
  };

  

  const visibleRegions = regions.slice(0, 4);

  return (
    <div className="relative min-h-screen bg-[#FBF9F1] font-serif text-[#1C2A3A] flex flex-col justify-between overflow-hidden selection:bg-[#C5A059] selection:text-white">
      {/* Background Leaf Image Overlay */}
      <div className="absolute top-0 left-0 bottom-0 md:-top-1 md:-left-25 lg:-top-1 lg:-left-25 w-full h-full pointer-events-none z-0 opacity-90">
        {/* One <picture> so the browser downloads only the image for the current viewport. */}
        <picture>
          <source media="(min-width: 768px)" srcSet={heroBgDesktopSrcSet} />
          <img
            {...heroBgMobileProps}
            alt=""
            loading="eager"
            fetchPriority="high"
            className="object-cover md:object-contain object-left-top w-full h-full"
          />
        </picture>
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
            <p className="text-2xl text-center md:text-3xl lg:text-4xl text-[#C5A059] font-light tracking-wide">
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
          <div className="flex  flex-wrap justify-center items-center gap-4">
            <Link href="/our-services" className="bg-[#0F1E36] min-h-[48px] min-w-[48px] hover:bg-[#1A2E4C] text-white text-based tracking-widest uppercase font-sans font-medium px-4 py-3 rounded-full flex items-center gap-3 transition-all shadow-md">
              <span className="w-5 h-5 rounded-full bg-[#C5A059] flex items-center justify-center text-[#0F1E36]">
                <Leaf className="w-3 h-3 fill-current" />
              </span>
              Our Services
            </Link>

            <Link href="/about-us" className="border px-4 py-3 min-h-[48px] min-w-[48px] border-[#C5A059] text-[#C5A059] hover:bg-[#C5A059]/10 text-based tracking-widest uppercase font-sans font-medium  rounded-full flex items-center gap-3 transition-all">
                About Us
                <ChevronRight className="w-4 h-4" />
            </Link>
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
                <div className="w-10 h-10 md:w-13 md:h-13 lg:w-11 lg:h-11 rounded-full bg-[#F4EFE6] border border-[#E0D7C6] flex items-center justify-center text-[#C5A059]">
                  <item.icon className="w-4 h-4 md:w-6 md:h-6 lg:w-5 lg:h-5" />
                </div>
                <span className="text-[9px] uppercase tracking-wider text-[#0F1E36] font-sans font-medium leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Region Selection Modal Overlay */}
        <div className="lg:col-span-6 flex justify-center my-2">
          <div className="w-full max-w-md lg:max-w-md md:max-w-2xl bg-[#FFFDF8] rounded-2xl shadow-2xl border border-[#EAE3D2] overflow-hidden relative">
            {/* Header / Close Button */}
            <div className="p-4 pb-1 text-center relative">
              <button
                type="button"
                aria-label="Close"
                className="absolute top-5 right-5 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="w-8 h-8 mx-auto rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] mb-3">
                <Globe className="w-5 h-5" />
              </div>

              <h2 className="text-2xl font-normal text-[#0F1E36]">Select Your Region</h2>
              <p className="text-xs text-gray-600 font-sans italic mt-1">Choose your location to continue</p>
              <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-3" />
            </div>

            {/* Region Cards Grid (4 displayed with Shuffle Effect) */}
            <div className="p-5 grid grid-cols-2 gap-4">
              {visibleRegions.map((region) => (
                <div
                  key={region.id}
                  onClick={() => redirectToRegions(region)}
                  className={`border border-[#EAE3D2] rounded-xl p-4 flex flex-col items-center justify-between h-32 lg:h-32 md:h-35 hover:border-[#C5A059] hover:shadow-md transition-all duration-500 cursor-pointer group bg-[#FAF8F3] ${
                    isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  <div className="flex-1 flex items-center justify-center  transition-transform">
                    
                    <Image fill src={region.iconImage} alt={region.name} className={`object-cover ${region.objectPosition} object-top-[5px] `}/>
                  </div>
                  <div className="w-full z-20 flex items-center justify-between pt-2 border-t border-[#EAE3D2]/40">
                    <span className="text-[10px] font-sans font-bold tracking-wider text-[#0F1E36]">
                      {region.name}
                    </span>
                    <div onClick={()=>redirectToRegions(region)} className="w-5 h-5 scroll-smooth rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059] group-hover:bg-[#C5A059] group-hover:text-white transition-colors">
                      
                      <ArrowRight className="w-2 h-2" />
                        
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
        <div className="max-w-7xl mx-auto px-6 py-4 flex  items-center justify-between gap-4 text-xs font-sans">
          {/* Brand Logo Left */}
          {/* <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
              <Leaf className="w-3 h-3 fill-current" />
            </div>
            <div>
              <p className="font-serif text-sm leading-none tracking-wider text-white">PEARLY SKY</p>
              <p className="text-[8px] tracking-widest text-[#C5A059] uppercase">Eco-Luxury Cleaning Global</p>
            </div>
          </div> */}
          <div className="flex w-full justify-center items-center">
                 <TrustBarLine />
          </div>
         
        </div>
      </footer>
    </div>
  );
}

function TrustBarLine() {
  const { translate, language } = useLanguage();
  const { trustCoverage } = getCountryHomeContent(language);

  const items = [
    {
      Icon: Leaf,
      label: translate("trustEcoCertified"),
      description: translate("trustEcoDescription"),
    },
    {
      Icon: Star,
      label: translate("trustRating"),
      description: translate("trustRatingDescription"),
    },
    {
      Icon: Network,
      label: translate("trustPartnership"),
      description: translate("trustPartnershipDescription"),
    },
  ];

  return (
    <section className="  px-3 py-3 sm:px-5 sm:py-4 lg:px-8 lg:py-5">
      <div className="mx-auto hidden w-full max-w-7xl grid-cols-2 gap-2 sm:gap-3 md:grid md:grid-cols-3 lg:gap-3">
        {items.map(({ Icon, label, description }) => (
          <div
            key={label}
            className="flex min-h-[148px]  flex-col items-center justify-start rounded-[7px] border border-brand-gold/20 bg-brand-navy px-2 py-4 text-center text-brand-navy-foreground sm:min-h-[158px] sm:px-3 sm:py-5 lg:min-h-[164px] lg:px-4"
          >
            <Icon className="mb-2 h-9 w-9 shrink-0 stroke-[1.5] text-brand-gold sm:mb-2.5 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            <h2 className="max-w-[170px] text-[14px] font-bold uppercase leading-[1.18] tracking-[0.01em] md:max-w-[250px] md:text-[16px] lg:max-w-[230px] lg:text-lg">
              {label}
            </h2>
            <p className="mt-2 max-w-[190px] text-[12px] leading-[1.35] text-brand-navy-foreground/90 sm:mt-2.5 md:max-w-[250px] lg:max-w-[280px] lg:text-[13px]">
              {description}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full md:max-w-7xl lg:max-w-7xl overflow-hidden md:hidden">
        <div className="flex w-max md:w-7xl lg:w-7xl gap-2 motion-reduce:animate-none sm:gap-3 animate-marquee hover:[animation-play-state:paused]">
          {[...items, ...items].map(({ Icon, label, description }, index) => (
            <div
              key={`${label}-${index}`}
              aria-hidden={index >= items.length}
              className="flex min-h-[148px] w-[200px] shrink-0 flex-col items-center justify-start rounded-[7px] border border-brand-gold/20 bg-brand-navy px-2 py-4 text-center text-brand-navy-foreground sm:min-h-[158px] sm:px-3 sm:py-5"
            >
              <Icon className="mb-2 h-9 w-9 shrink-0 stroke-[1.5] text-brand-gold sm:mb-2.5 sm:h-10 sm:w-10" />
              <h2 className="max-w-[170px] text-[14px] font-bold uppercase leading-[1.18] tracking-[0.01em] sm:text-[15px] md:text-[16px] lg:text-lg">
                {label}
              </h2>
              <p className="mt-2 max-w-[190px] text-[11px] leading-[1.35] text-brand-navy-foreground/90 sm:mt-2.5 lg:text-[13px]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
