"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export interface IndustrialSteamDetail {
  label: string;
  text: string;
}

export interface IndustrialSteamCategory {
  title: string;
  details: IndustrialSteamDetail[];
}

export const INDUSTRIAL_STEAM_CATEGORIES: IndustrialSteamCategory[] = [
  {
    title: "Manufacturing & Industrial Facilities",
    details: [
      { label: "Heavy equipment & machinery:", text: "Degreasing engines, presses, CNC machines, and conveyors." },
      { label: "Factory floors:", text: "Removal of grease, oil, and industrial residue from concrete and epoxy floors." },
      { label: "Production line & conveyor belts:", text: "Food-safe steam sanitation." },
      { label: "Ventilation hoods & ducts:", text: "Clear grease buildup in industrial kitchens & workshops." },
      { label: "Warehouse pallets & equipment:", text: "Sanitize pallets, forklifts, and storage racks." },
    ],
  },
  {
    title: "Food & Beverage Industry",
    details: [
      { label: "Food processing equipment:", text: "Clean mixers, slicers, fillers, and packaging machines." },
      { label: "Cooking kitchens:", text: "Degrease deep fryers, grills, ovens, hoods, and exhaust systems." },
      { label: "Bakeries & breweries:", text: "Sanitize fermentation tanks, kegs, barrels, and bottling lines." },
      { label: "Dairy & meat processing:", text: "Remove biological film and fats safely." },
      { label: "Cold storage areas:", text: "Defrost and clean freezer floors, doors, and wall surfaces." },
    ],
  },
  {
    title: "Automotive & Transportation",
    details: [
      { label: "Auto shops & garages:", text: "Degrease shop floors, lifts, and engine bays." },
      { label: "Fleet vehicles:", text: "Deep clean truck cabins, trailers, buses, and vans." },
      { label: "Public transport:", text: "Steam clean seats, handrails, interiors, and high-touch areas." },
      { label: "Engines & compartments:", text: "Clean engines, undercarriage, and mechanical parts." },
    ],
  },
  {
    title: "Healthcare & Institutional",
    details: [
      { label: "Medical Equipment:", text: "Sanitize non-electronic surfaces of beds, carts, and mobile units." },
      { label: "Laboratory Surfaces:", text: "Clean benches, sinks, and equipment stands." },
      { label: "Hospital Kitchens & Laundry Rooms:", text: "High-temp sanitization for infection control." },
      { label: "Schools & Universities:", text: "Clean cafeterias, locker rooms, showers, and science labs." },
      { label: "Gyms & Locker Rooms:", text: "Sanitize equipment, mats, showers, and tile grout." },
    ],
  },
  {
    title: "Hospitality & Retail",
    details: [
      { label: "Hotel & Resort Kitchens:", text: "Commercial kitchen degreasing." },
      { label: "Public Restrooms:", text: "Deep clean and sanitize tiles, grout, fixtures." },
      { label: "Restaurant Dining Areas:", text: "Clean upholstery, carpets, and high chairs." },
      { label: "Retail Store Floors & Entryways:", text: "Remove grime from tile, concrete, and storefronts." },
      { label: "Shopping Mall Common Areas:", text: "Clean food court seating, play areas, and benches." },
    ],
  },
  {
    title: "Agriculture & Farming",
    details: [
      { label: "Dairy & Livestock Facilities:", text: "Sanitize milking parlors, stalls, trailers, and equipment." },
      { label: "Poultry Coops & Hatcheries:", text: "Thorough cleaning of cages, floors, and incubators." },
      { label: "Greenhouses & Nurseries:", text: "Clean growing tables, pots, tools, and floors." },
      { label: "Tractor & Farm Equipment:", text: "Degrease engines and undercarriages." },
    ],
  },
  {
    title: "Waste & Recycling Facilities",
    details: [
      { label: "Waste Carts & Dumpsters:", text: "Deodorize and sanitize to control pests and odors." },
      { label: "Recycling Sorting Equipment:", text: "Remove sticky, organic waste buildup." },
    ],
  },
  {
    title: "Facility Management (General)",
    details: [
      { label: "HVAC Systems:", text: "Clean coils, condensate pans, and accessible ducts." },
      { label: "Grease Traps & Drains:", text: "Clear initial grease blockages and clean surrounding areas." },
      { label: "Parking Garages:", text: "Remove oil stains from concrete." },
      { label: "Building Exteriors:", text: "Clean sidewalks, awnings, and entryways." },
      { label: "Emergency Restoration:", text: "Pre-clean for smoke, soot, or minor mold on hard surfaces." },
    ],
  },
  {
    title: "Other Specialized Applications",
    details: [
      { label: "Event & Catering Equipment:", text: "Clean mobile kitchens, food warmers, and serving equipment." },
      { label: "Fire & Flood Restoration:", text: "Initial sanitization and residue removal." },
      { label: "Post-Construction Clean-Up:", text: "Remove drywall dust, adhesive, and primer splatters." },
    ],
  },
];

export interface IndustrialCommercialSteamSectionProps {
  selectedTitles: Set<string>;
  onToggle: (title: string) => void;
}

export function IndustrialCommercialSteamSection({
  selectedTitles,
  onToggle,
}: IndustrialCommercialSteamSectionProps) {
  const [openTitle, setOpenTitle] = useState<string | null>(null);
  const openCategory = INDUSTRIAL_STEAM_CATEGORIES.find((c) => c.title === openTitle) ?? null;

  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">
          Industrial & Commercial Steam Cleaning Job Types
        </h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIAL_STEAM_CATEGORIES.map((category) => {
            const isChecked = selectedTitles.has(category.title);
            return (
              <div
                key={category.title}
                className={`flex items-center justify-between gap-2.5 rounded-[10px] bg-white px-3 py-2.5 text-left transition ${
                  isChecked
                    ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]"
                    : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenTitle(category.title)}
                  className="min-w-0 flex-1 text-left"
                >
                  <p className="truncate text-sm font-medium text-[#121E2D]">{category.title}</p>
                  <p className="text-xs text-[#555]">View details</p>
                </button>
                <button
                  type="button"
                  onClick={() => onToggle(category.title)}
                  aria-pressed={isChecked}
                  className={`shrink-0 rounded-[6px] border-[1.5px] border-[#A98B4B] px-2.5 py-1 text-xs font-semibold ${
                    isChecked ? "bg-[#A98B4B] text-white" : "text-[#A98B4B]"
                  }`}
                >
                  {isChecked ? "Added" : "Add"}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={openCategory !== null} onOpenChange={(open) => !open && setOpenTitle(null)}>
        <DialogContent className="sm:max-w-md">
          {openCategory && (
            <>
              <DialogHeader>
                <DialogTitle className="text-center text-[#A98B4B]">{openCategory.title}</DialogTitle>
              </DialogHeader>
              <ul className="list-disc space-y-2 pl-5 text-sm text-[#121E2D]">
                {openCategory.details.map((detail) => (
                  <li key={detail.label}>
                    <strong>{detail.label}</strong> {detail.text}
                  </li>
                ))}
              </ul>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
