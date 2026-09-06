"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Star } from "lucide-react";

// Types
interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  photo: string;
  email: string;
}

interface Project {
  id: number;
  beforeImage: string;
  afterImage: string;
  clientName: string;
  rating: number;
  testimonial: string;
  title: string;
  location: string;
  completedDate: string;
}


// Sample Data
const projectsData: Project[] = [
  {
    id: 1,
    beforeImage: "/images/beforeafter/before-1.webp",
    afterImage: "/images/beforeafter/after-1.webp",
    clientName: "Filippo Mylod",
    rating: 5,
    testimonial:
      "The cleaning was great and the people who worked were so kind and nice. We felt very well taken care of. I recommend!!",
    title: "Modern Penthouse Deep Clean",
    location: "Paris",
    completedDate: "Completed: June 2024",
  },
  {
    id: 2,
    beforeImage: "/images/beforeafter/before-2.webp",
    afterImage: "/images/beforeafter/after-2.webp",
    clientName: "Filippo Mylod",
    rating: 5,
    testimonial:
      "The cleaning was great and the people who worked were so kind and nice. We felt very well taken care of. I recommend!!",
    title: "Modern Penthouse Deep Clean",
    location: "Paris",
    completedDate: "Completed: June 2024",
  }
  
];


export default function RecentProjects() {
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Auto-rotate slider for 4 projects (every 5 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const currentProject = projectsData[currentProjectIndex];

  return (
    <section className="w-full  text-white py-16 px-2 md:px-0 lg:px-0  flex flex-col items-center justify-center space-y-20 md:space-y-7 font-sans">
      {/* ================= OUR RECENT PROJECTS SECTION ================= */}
      <div className="w-full md:w-5xl lg:max-w-7xl flex flex-col items-center">
        {/* Section Heading Decor */}
        <div className="flex items-center space-x-2 mb-2">
          <div className="h-px w-16 bg-[#A98B4B]"></div>
            <span className="text-[#C9B678] text-lg">◆</span>
            <div className="h-px w-16 bg-[#A98B4B]"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 tracking-wide">
          Our Recent Projects
        </h2>

        {/* Project Card Container */}
        <div className="w-full max-w-3xl bg-[#0b1329] overflow-hidden border-10 border-[#A98B4B] rounded-xl shadow-2xl relative transition-all duration-500">
          
          {/* Before / After Images */}
          <div className="grid grid-cols-2 border-b-10 border-b-[#A98B4B] relative  overflow-hidden h-64 md:h-72">
            {/* Before Image */}
            <div className="relative h-full w-full border-r border-r-[#A98B4B] bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <Image
                src={currentProject.beforeImage}
                alt="Before"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 left-2  px-2 py-1 rounded text-left">
                <p className="text-[12px] font-bold uppercase text-white">Before</p>
                <p className="text-[10px] text-gray-300 uppercase">Previous State</p>
              </div>
            </div>

            {/* Split Divider Icon */}
            <div className="absolute inset-0  flex items-center justify-center z-10 pointer-events-none">
              <div className="bg-[#A98B4B] text-black rounded-full p-1 shadow-md">
                <div className="flex items-center space-x-0.5 text-[10px] font-bold px-1">
                  <span>‹</span>
                  <span>›</span>
                </div>
              </div>
            </div>

            {/* After Image */}
            <div className="relative h-full w-full bg-gradient-to-t from-black/60 via-transparent to-transparent">
              <Image
                src={currentProject.afterImage}
                alt="After"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2  py-1 rounded text-right">
                <p className="text-[12px] font-bold uppercase text-white">After</p>
                <p className="text-[10px] text-gray-300 uppercase">Our Result</p>
              </div>
            </div>
          </div>

          {/* Testimonial Box */}
          
          <div className="mt-4 mx-auto   px-4 py-2 text-xs">
            <div className="flex items-center w-full space-x-2 mb-2 p-1">
              <div className="w-[80px] h-[60px] lg:w-[100px] lg:h-[100px]  md:w-[100px]   md:h-[100px]  rounded-full bg-gray-600 overflow-hidden relative">
                <Image
                  src="/images/testimonials/reviewer-2.jpeg"
                  alt={currentProject.clientName}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="">
                <p className="font-semibold text-white text-sm md:text-[16px] lg:tex[16px]">{currentProject.clientName}</p>
                  <div className="flex text-yellow-400 text-[10px]">
                    {[...Array(currentProject.rating)].map((_, i) => (
                      <Star key={i} size={10} fill="currentColor" />
                    ))}
                  </div>
                <p className="text-gray-300 mt-2 lg:text-sm text-[10px] md:text-sm leading-relaxed">
                &quot;{currentProject.testimonial}&quot;
              </p>
              </div>
            </div>
            
          </div>

          {/* Project Details Footer */}
          <div className="mt-1 p-2 md:p-4 border-t border-gray-800 flex flex-wrap items-center md:justify-between text-[11px] text-gray-300">
            <div className="flex items-start flex-col gap-2 space-x-2">
              <span className="font-semibold text-white  text-[13px] md:text-[15px] lg:text-[15px]">{currentProject.title}</span>
              <span className="flex items-center text-gray-300 text-[14px]">
                <MapPin size={10} className="mr-0.5 text-red-500 " /> {currentProject.location}
              </span>
            </div>
            <div className="flex items-center text-gray-400 text-[14px] mt-1 sm:mt-0">
              <span>📅 {currentProject.completedDate}</span>
            </div>
          </div>
        </div>

        {/* View All Projects Link -> Redirects to Customer Page */}
        <Link
          href="/customer"
          className="mt-5 bg-gradient-to-b from-[#D4B382] via-[#CBB080] to-[#99794E] text-[#2D2115] font-semibold py-2 px-6 rounded-full border border-[#E3CBA2]/40 shadow-sm transition-all hover:brightness-105 active:scale-95 py-1 px-3 rounded-2xl bg-[#A98B4B] hover:bg-[#a38441]  transition-colors"
        >
          View all projects
        </Link>
      </div>

      
    </section>
  );
}
