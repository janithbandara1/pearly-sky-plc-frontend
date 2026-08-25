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
    <section className="w-full p-0 my-14  md:mb-2 md:mt-5 ">
      <div className="relative  w-[100%] flex flex-col lg:flex-row items-center gap-6 md:gap-3">

        {/* Overlapping Double-Frame Images Section */}
        <div className="relative w-full md:w-[50%]   flex items-center justify-start h-[260px] xs:h-[300px] sm:h-[350px] md:h-[380px] ">

          {/* Background Decorative Arch Frame (Bottom-Left) */}
          <div
            className="absolute w-[85%] mt-10 md:w-[75%] rounded-lg md:rounded-tl-[50px] md:rounded-br-[50px] bottom-0 left-0 z-0  md:h-[75%] h-[95%] lg:h-[85%] overflow-hidden shadow-sm border-2 border-[#A98B4B]"

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
          <div className="absolute top-0 right-0 md:right-10 md:top-9 z-10 w-[80%] md:w-[80%]  h-[85%] md:h-[52%]  shadow-xl overflow-hidden md:rounded-[10px] rounded-[24px] border-3 border-[#A98B4B]">
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
        <div className="relative w-full mb-3 md:mb-28 md:w-[100%]  flex flex-col justify-center align-top gap-4 shadow-sm rounded-xl bg-[#F8F9FA] border-2 border-[#A98B4B] py-3 px-2 md:py-3 md:px-2 ">
          <h2 className="text-left text-2xl pt-8 pb-3 px-3 md:text-2xl font-bold leading-snug sm:leading-snug md:leading-tight tracking-tight text-[#A98B4B]">
            {headline}
          </h2>

          <div className="space-y-2 sm:space-y-3 md:space-y-4 w-full px-3">
            {body.map((paragraph, index) => (
              <p
                key={index}
                className="text-xs  sm:text-sm md:text-base leading-relaxed text-[#7A7A7A] text-justify font-normal"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <p className="font-semibold hidden text-base sm:text-lg text-[rgb(169,139,75)]">Set Your Recurring Schedule</p>
            </div>
        </div>

      </div>
    </section>
  );
}