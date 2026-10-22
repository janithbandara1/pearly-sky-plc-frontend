"use client";

import React from "react";
import { usePoolTheme } from "@/lib/pool-theme-context";

export interface HeaderNavigationProps {
  currentTab?: number;
  theme?: "dark" | "light";
  onTabClick?: (tabId: number) => void;
}

const TABS = [
  { id: 1, label: "PRICING ENGINE" },
  { id: 2, label: "UPGRADES" },
  { id: 3, label: "ECO PROTOCOL" },
  { id: 4, label: "QUALITY ASSURANCE" },
];

export default function HeaderNavigation({
  currentTab = 1,
  theme: themeProp,
  onTabClick,
}: HeaderNavigationProps) {
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  return (
    <nav
      className={`w-full transition-colors rounded-t-2xl shadow-xl duration-300 border-b ${
        isLight
          ? "bg-white border-slate-200"
          : "bg-[#050C1A] border-slate-800/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar scroll-smooth">
        <div className="flex items-center gap-6 sm:gap-10 md:gap-14 min-w-max">
          {TABS.map((tab) => {
            const isActive = tab.id === currentTab;

            let tabClass = "";

            if (isLight) {
              if (isActive) {
                tabClass = "text-[#B89642] font-bold border-b-2 border-[#B89642]";
              } else {
                tabClass = "text-slate-600 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-300";
              }
            } else {
              // Dark Mode Styling
              if (isActive) {
                tabClass = "text-[#B89642] font-bold border-b-2 border-[#B89642]";
              } else {
                tabClass = "text-slate-400 hover:text-slate-200 border-b-2 border-transparent hover:border-slate-700/60";
              }
            }

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabClick?.(tab.id)}
                className={`py-4 px-1 text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 select-none whitespace-nowrap cursor-pointer ${tabClass}`}
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