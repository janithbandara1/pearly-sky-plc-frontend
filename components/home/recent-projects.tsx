"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Calendar, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Types
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

interface TeamMember {
  id: number;
  title: string;
  icon: string;
  email: string;
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

const teamData: TeamMember[] = [
  {
    id: 1,
    title: "Customer Service",
    icon: "/images/team/customer-service-304.webp",
    email: "info@pearlyskyglobalclean.com",
  },
  {
    id: 2,
    title: "Marketing Team",
    icon: "/images/team/marketing-team-304.webp",
    email: "marketing@pearlyskyglobalclean.com",
  },
  {
    id: 3,
    title: "Human Resources",
    icon: "/images/team/human-resources-304.webp",
    email: "hr@pearlyskyglobalclean.com",
  },
  {
    id: 4,
    title: "Finance Department",
    icon: "/images/team/finance-department-304.webp",
    email: "finance@pearlyskyglobalclean.com",
  },
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
    <section className="w-full text-white py-16 px-4 min-h-screen flex flex-col items-center justify-center space-y-20 font-sans">
      {/* ================= OUR RECENT PROJECTS SECTION ================= */}
      <div className="w-full md:w-5xl flex flex-col items-center">
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
        <div className="w-full max-w-3xl bg-[#0b1329] overflow-hidden border border-[#A98B4B] rounded-xl shadow-2xl relative transition-all duration-500">
          
          {/* Before / After Images */}
          <div className="grid grid-cols-2  relative  overflow-hidden h-64 md:h-72">
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
          
          <div className="mt-4 mx-1 bg-[#0a1022] border border-gray-800 rounded-lg p-4 text-xs">
            <div className="flex items-center space-x-2 mb-2 p-1">
              <div className="w-6 h-6 rounded-full bg-gray-600 overflow-hidden relative">
                <Image
                  src="/images/avatar-placeholder.jpg"
                  alt={currentProject.clientName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="">
                <p className="font-semibold text-white text-sm">{currentProject.clientName}</p>
                <div className="flex text-yellow-400 text-[10px]">
                  {[...Array(currentProject.rating)].map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-300  text-sm leading-relaxed">
              &quot;{currentProject.testimonial}&quot;
            </p>
          </div>

          {/* Project Details Footer */}
          <div className="mt-4 p-2 md:p-4 border-t border-gray-800 flex flex-wrap items-center md:justify-between text-[11px] text-gray-300">
            <div className="flex items-start flex-col gap-2 space-x-2">
              <span className="font-semibold text-white  text-[14px]">{currentProject.title}</span>
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
          className="mt-6 text-[14px] text-white hover:text-[#A98B4B]  transition-colors"
        >
          View all projects
        </Link>
      </div>

      {/* ================= OUR VISIONARY TEAM SECTION ================= */}
      <div className="w-full max-w-6xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 tracking-wide">
          Our Visionary Team
        </h2>

        {/* Desktop View (Grid) / Mobile View (Marquee) */}
        <div className="w-full overflow-hidden">
          {/* Mobile View: Continuous Marquee */}
          <div className="block md:hidden w-full overflow-x-auto no-scrollbar">
            <div className="flex w-max space-x-8 animate-marquee hover:[animation-play-state:paused] py-4">
              {[...teamData, ...teamData].map((member, idx) => (
                <TeamCard key={`${member.id}-${idx}`} member={member} />
              ))}
            </div>
          </div>

          {/* Desktop View: 4 Columns Grid */}
          <div className="hidden md:grid md:grid-cols-4 gap-8 w-full justify-items-center">
            {teamData.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component for Team Member Card with Hover Tooltip Mail Link
function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="mt-3 flex flex-col items-center group relative cursor-pointer ">
      {/* Outer Circle Ring */}
      <div className="md:w-40 w-27 md:h-40 h-27 rounded-full border-[4px] border-[#D9C07E] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {/* Inner Dark Circle */}
        <div className="w-full h-full overflow-hidden rounded-full  flex flex-col items-center justify-center text-center">
          <div className="w-full h-full overflow-hidden relative rounded-full">
            <Image
              src={member.icon}
              alt={member.title}
              fill
              className="object-cover "
            />
          </div>
        </div>
      </div>

      {/* Name below Circle */}
      <h3 className="mt-3 text-lg font-semibold text-white tracking-wide">
        {member.title}
      </h3>

      {/* Mail Button Circle */}
      <a
        href={`mailto:${member.email}`}
        className="mt-2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
        title={`Send email to ${member.email}`}
      >
        <Mail size={20} className="text-[#c5a880]" />
      </a>

      {/* Email Hover Tooltip (Appears on Hover & opens in mail client) */}
      <div className="absolute -bottom-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto z-20">
        <a
          href={`mailto:${member.email}`}
          className="bg-white text-black text-[11px] font-medium px-3 py-1 rounded-full shadow-lg whitespace-nowrap border border-gray-200 hover:bg-gray-50 flex items-center space-x-1"
        >
          <span>{member.email}</span>
        </a>
      </div>
    </div>
  );
}