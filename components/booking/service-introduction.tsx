"use client";

import Image from "next/image";

export interface ServiceIntroductionProps {
  headline: string;
  body: string[];
  mainImage?: string;
  bgImage?: string;
}
 
export function ServiceIntroduction({
  headline,
  body,
  mainImage = "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
  bgImage = "/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp",
}: ServiceIntroductionProps) {
  return (
    <section className="w-full p-0 my-6 sm:my-8 md:my-10 lg:my-12">
      <div className="relative flex flex-col lg:flex-row items-stretch justify-between gap-6 sm:gap-8 md:gap-10 lg:gap-12">

        {/* Overlapping Double-Frame Images Section */}
        <div className="relative w-full lg:w-[48%] flex items-center justify-start h-[260px] xs:h-[300px] sm:h-[350px] md:h-[380px] lg:h-[400px]">

          {/* Background Decorative Arch Frame (Bottom-Left) */}
          <div
            className="absolute rounded-lg md:rounded-tl-[50px] md:rounded-br-[50px] bottom-0 left-0 z-0 w-[78%] sm:w-[74%] lg:w-[76%] h-[80%] sm:h-[82%] lg:h-[85%] overflow-hidden shadow-sm border-2 border-[#A98B4B]"

          >
            <Image
              src={bgImage}
              alt="Decorative Background"
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 38vw"
              className="object-cover opacity-60"
            />
          </div>

          {/* Foreground Main Image Frame (Top-Right Overlap) */}
          <div className="absolute top-0 right-0 z-10 w-[82%] sm:w-[78%] lg:w-[80%] h-[68%] md:h-[22%] lg:h-[82%] shadow-xl overflow-hidden rounded-[20px] sm:rounded-[24px] border-2 border-[#A98B4B]">
            <Image
              src={mainImage}
              alt={headline}
              fill
              priority
              sizes="(max-width: 640px) 82vw, (max-width: 1024px) 55vw, 40vw"
              className="object-cover"
            />
          </div>

        </div>

        {/* Content Card Container */}
        <div className="relative w-full lg:w-[50%] flex flex-col justify-center shadow-sm rounded-2xl md:rounded-[24px] bg-[#F8F9FA] border-2 border-[#A98B4B] p-5 sm:p-8 md:p-10 space-y-3 sm:space-y-4">
          <h2 className="text-left text-2xl md:text-xl lg:text-3xl font-bold leading-snug sm:leading-snug md:leading-tight tracking-tight text-[#A98B4B]">
            {headline}
          </h2>

          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            {body.map((paragraph, index) => (
              <p
                key={index}
                className="text-xs sm:text-sm md:text-base leading-relaxed text-[#7A7A7A] text-left font-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}