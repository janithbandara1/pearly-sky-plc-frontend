

"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import React, { useState, useEffect } from "react";

const sliderImages = [
  {
    src: "/images/services/joinwithus/SafeYourFamily_jqabef.webp",
    alt: "Safe For Your Family",
  },
  {
    src: "/images/services/joinwithus/Suspprsctice_ywrax5.webp",
    alt: "Sustainable Practice",
  },
  {
    src: "/images/services/joinwithus/NonToxc_k1apco.webp",
    alt: "Non-Toxic",
  },
  {
    src: "/images/services/joinwithus/Sustainablepractice_w8y5pj.webp",
    alt: "Sustainable Practice Leaf",
  },
];

const JoinWithUsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const {translate} = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-none flex w-full max-w-10xl py-3 flex-col items-center justify-between gap-8 border-2 border-[#A98B4B] bg-[#121E2D] p-5 lg:flex-row lg:gap-10 lg:p-8">
      {/* Left content side */}
      <div className="w-full lg:w-[52%]">
        <h2 className="mb-4 text-lg font-bold text-[#FFFDF4] sm:text-xl lg:text-2xl">
          {translate("whyPartnerWithUsTitle")}
        </h2>
        <ul className="space-y-3 text-sm leading-relaxed text-[#FFFDF4] sm:text-base">
          <li className="flex gap-2">
            <span className="font-bold">•</span>
            <span>
              {translate("ecoCertified")}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">•</span>
            <span>
              {translate("transparentAndReliable")}
            </span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">•</span>
            <span>
              {translate("qualityAssured")}
            </span>
          </li>
        </ul>
      </div>

      {/* Right sliding image side (Horizontal Slide Animation) */}
      <div className="flex w-full justify-center origin-top scale-[0.65] max-[431px]:scale-[0.7] max-[541px]:scale-[0.8] lg:w-[35%] lg:scale-100">
        <div className="relative h-30 w-[230px] lg:w-[300px] overflow-hidden flex items-center justify-center">
          <div
            className="flex w-full transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {sliderImages.map((img, index) => (
              <div
                key={index}
                className="w-full h-full shrink-0 flex items-center justify-center"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-30 w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinWithUsSection;