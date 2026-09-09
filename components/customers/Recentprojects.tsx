"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n/language-context";

// Image dataset containing before/after pairs
const sampleImages = [
  { id: 1, before: "/images/beforeafter/before-2.webp", after: "/images/beforeafter/after-2.webp" },
  { id: 2, before: "/images/beforeafter/before-1.webp", after: "/images/beforeafter/after-1.webp" },
  { id: 3, before: "/images/beforeafter/before-4.jpg", after: "/images/beforeafter/after-4.jpg" },
  { id: 4, before: "/images/beforeafter/before-5.jpg", after: "/images/beforeafter/after-5.jpg" },
  { id: 5, before: "/images/beforeafter/before-6.jpg", after: "/images/beforeafter/after-6.jpg" },
  { id: 6, before: "/images/beforeafter/before-7.jpg", after: "/images/beforeafter/after-7.jpg" },
  { id: 7, before: "/images/beforeafter/before-8.jpg", after: "/images/beforeafter/after-8.jpg" },
  { id: 8, before: "/images/beforeafter/before-9.jpg", after: "/images/beforeafter/after-9.jpg" },
];

// Helper function to shuffle an array (Fisher-Yates)
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function RandomImageGrid() {
  const [displayedImages, setDisplayedImages] = useState(sampleImages.slice(0, 4));
  const {translate} = useLanguage();
  useEffect(() => {
    // Automatically shuffle every 4 seconds
    const interval = setInterval(() => {
      setDisplayedImages((prev) => shuffleArray([...prev]));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mx-auto  py-10 px-4 ">
      
      <div className="bg-white py-2">
        <h1 className="text-center font-bold text-3xl text-black tracking-wide ">
          {translate("recentProjectTitle")}
        </h1>
      </div>
      <div className="w-full bg-white py-10 px-4 flex justify-center">
        {/* 2x2 Grid Container (4 Grids total) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl w-full">
                {displayedImages.slice(0, 4).map((item) => (
                <div
                    key={item.id}
                    className="grid grid-cols-2 gap-1 border border-[#c5a880]/40 rounded-lg p-1 overflow-hidden shadow-xl transition-all duration-700 ease-in-out"
                >
                    {/* Left Image: BEFORE */}
                    <div className="relative h-64 md:h-100 w-full overflow-hidden rounded-l">
                    <Image
                        src={item.before}
                        alt="Before"
                        fill
                        className="object-cover transition-opacity duration-500"
                    />
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">
                        {translate("projectBefore")}
                    </span>
                    </div>

                    {/* Right Image: AFTER */}
                    <div className="relative h-64 md:h-100 w-full overflow-hidden rounded-r">
                    <Image
                        src={item.after}
                        alt="After"
                        fill
                        className="object-cover transition-opacity duration-500"
                    />
                    <span className="absolute bottom-2 right-2 text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 px-2 py-0.5 rounded">
                        {translate("projectAfter")}
                    </span>
                    </div>
                </div>
                ))}
            </div>
      </div>
      
    </section>
  );
}