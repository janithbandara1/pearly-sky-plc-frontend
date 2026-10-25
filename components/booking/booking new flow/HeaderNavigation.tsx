"use client";

import React, { useEffect, useState } from "react";
import { usePoolTheme } from "@/lib/pool-theme-context";

export interface HeaderNavigationProps {
  currentTab?: number;
  theme?: "dark" | "light";
  onTabClick?: (tabId: number) => void;
  link?:string;
}

const TABS = [
  { id: 1, label: "PRICING ENGINE", link: "#pricing-engine" },
  { id: 2, label: "UPGRADES", link: "#upgrades" },
  { id: 3, label: "ECO PROTOCOL", link: "#eco-protocol" },
  { id: 4, label: "QUALITY ASSURANCE", link: "#quality-assurance" },
];

export default function HeaderNavigation({
  currentTab = 1,
  theme: themeProp,
  onTabClick,
}: HeaderNavigationProps) {

  const[tabNumber,setTabNumber] =  useState(currentTab);
  
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";



  const handleTabClick = (  tab: { link: string; id: number }) => {
    const cleanId = tab.link.replace('#', '');
    document.getElementById(cleanId)?.scrollIntoView({ behavior: "smooth", block: "start" });
   // window.location.href = tab.link
     setTabNumber(tab.id)
  }

  useEffect(() => {
    // 1. Map through TABS to find all corresponding DOM elements
    const elements = TABS.map((tab) => {
      const cleanId = tab.link.replace('#', '');
      return document.getElementById(cleanId);
    }).filter(Boolean);

    if (elements.length === 0) return;

    // 2. Setup IntersectionObserver to update active tab on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const matchingTab = TABS.find((tab) => tab.link === `#${entry.target.id}`);
            if (matchingTab) {
              setTabNumber(matchingTab.id);
            }
          }
        });
      },
      {
        rootMargin: "-20% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    // Observe each section element
    elements.forEach((el) => el && observer.observe(el));

    // Cleanup observer on unmount
    return () => {
      elements.forEach((el) => el && observer.unobserve(el));
    };
  }, [setTabNumber]);

  return (
    <nav
      id="section-service"
      className={`w-full sticky z-20 top-[10%] left-0 right-0 transition-colors rounded-t-[15px] shadow-sm duration-300 border-b ${
        isLight
          ? "bg-white border-[#D9DDE5]"
          : "bg-[#1B2A40] border-[#718096]/50"
      }`}
    > 
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14 min-w-max">
          {TABS.map((tab) => {
            const isActive = tab.id === tabNumber;

            let tabClass = "";

            if (isLight) {
              if (isActive) {
                tabClass = "text-[#D8B63F] font-bold border-b-2 border-[#D8B63F]";
              } else {
                tabClass = "text-[#687386] hover:text-[#1A2238] border-b-2 border-transparent hover:border-[#D9DDE5]";
              }
            } else {
              // Dark Mode Styling
              if (isActive) {
                tabClass = "text-[#FFD766] font-bold border-b-2 border-[#FFD766]";
              } else {
                tabClass = "text-[#C3CDDC] hover:text-white border-b-2 border-transparent hover:border-[#718096]/60";
              }
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabClick(tab)}
                className={`py-4 px-1 text-[10px] md:text-sm tracking-wider uppercase transition-all duration-200 select-none whitespace-nowrap cursor-pointer ${tabClass}`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}