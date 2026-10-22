'use client';

import React from 'react';
import { 
  Bed, 
  Bath, 
  Tv, 
  Utensils, 
  Trees, 
  Briefcase, 
  WashingMachine, 
  UtensilsCrossed, 
  Plus, 
  Minus, 
  LayoutGrid, 
  Ship,
  BedDouble,
  Coffee,
  Armchair,
  Crown,
  Users,
  Sparkles,
  Columns2,
  Trash,
  Building,
  DoorOpen,
  LampFloorIcon,
  Mic,
  Trash2,
  Footprints,
  Grid,
  LampDesk,
  Maximize2,
  Laptop,
  ChefHat,
  Sofa,
  Sun,
  Paintbrush,
  
} from 'lucide-react';
import { useLanguage } from '@/lib/i18n/language-context';
import { TranslationKey } from '@/lib/i18n/dictionaries/en';

/**
 * Room keys double as translation keys (frontend dictionaries) and are what
 * gets stored on the booking — the backend translates the same keys for the
 * confirmation email/PDF (see ROOM_KEYS in the backend booking DTO).
 */
export const ROOM_KEYS = [
  "bedrooms",
  "bathrooms",
  "living_rooms",
  "kitchens",
  "verandas_outdoor_spaces",
  "home_offices",
  
  "dining_areas",

  "deck_cleaning",
  "cabin_cleaning",
  "bathroom_toilet_cleaning",
  "galley_cleaning",
  "dining_area_cleaning",
  "lounge_cleaning",
  "vip_suite_cleaning",
  "crew_area_cleaning",
  "floor_carpet_cleaning",
  "window_glass_cleaning",

  "hall_cleaning",
  "vip_area_cleaning",
  "toilet_cleaning",
  "entrance_cleaning",
  "catering_area_cleaning",
  "stage_cleaning",
  "seating_area_cleaning",
  "corridor_cleaning",
  "floor_cleaning",
  "waste_removal",
  "table_desk_cleaning",
  "floor_cleaning",
  "toilet_cleaning",
  "kitchen_cleaning",
  "reception_cleaning",
  "meeting_room_cleaning",
  "window_cleaning",
  "carpet_cleaning",
  "corridor_cleaning",
  "waste_removal",

"bathroom_toilet",
"kitchen_surfaces",
"floors_tiles",
"carpets_rugs",
"sofas_upholstery",
"office_floors",
"desks_workstations",
"office_chairs",
"meeting_rooms",
"commercial_kitchens",

"bedrooms",
"bathrooms",
"living_rooms",
"kitchens",
"verandas_outdoor_spaces",
"home_offices",

"dining_areas",
"hallways_staircases",
"windows_glass_area",

"cleaningBedrooms",
"bathroomsToilets",
"kitchens",
"livingRooms",
"windowsGlass",
"furnitureTables",
"doorsFrames",
"wallsCeilings",
"floorsTiles",
"stairsCommonArea",

"laundry_rooms"


] as const satisfies readonly TranslationKey[];



export type RoomKey = (typeof ROOM_KEYS)[number];
export type RoomCounts = Partial<Record<RoomKey, number>>;

export const ROOM_MAX_COUNT = 10;

/** Selected rooms as an ordered list (ROOM_KEYS order) — the shape saved to the booking draft. */
export function roomCountsToList(counts: RoomCounts): { key: RoomKey; count: number }[] {
  // ROOM_KEYS repeats some keys (shared across services) — list each room once.
  return [...new Set(ROOM_KEYS)].filter((key) => (counts[key] ?? 0) > 0).map((key) => ({ key, count: counts[key]! }));
}

interface Room {
  id: RoomKey;
  icon: React.ReactNode;
}

// Room definitions with respective icons matching image content
const INITIAL_ROOMS: Room[] = [
  { id: "bedrooms", icon: <Bed className="w-6 h-6 text-gold-400" /> },
  { id: "bathrooms", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "living_rooms", icon: <Tv className="w-6 h-6 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "verandas_outdoor_spaces", icon: <Trees className="w-6 h-6 text-gold-400" /> },
  { id: "home_offices", icon: <Briefcase className="w-6 h-6 text-gold-400" /> },
  { id: "laundry_rooms", icon: <WashingMachine className="w-6 h-6 text-gold-400" /> },
  { id: "dining_areas", icon: <UtensilsCrossed className="w-6 h-6 text-gold-400" /> },
];

const YATCH_ROOMS: Room[] = [
 { id: "deck_cleaning", icon: <Ship className="w-6 h-6 text-gold-400" /> },
  { id: "cabin_cleaning",  icon: <BedDouble className="w-6 h-6 text-gold-400" /> },
  { id: "bathroom_toilet_cleaning", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "galley_cleaning", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "dining_area_cleaning", icon: <Coffee className="w-6 h-6 text-gold-400" /> },
  { id: "lounge_cleaning", icon: <Armchair className="w-6 h-6 text-gold-400" /> },
  { id: "vip_suite_cleaning", icon: <Crown className="w-6 h-6 text-gold-400" /> },
  { id: "crew_area_cleaning", icon: <Users className="w-6 h-6 text-gold-400" /> },
  { id: "floor_carpet_cleaning", icon: <Sparkles className="w-6 h-6 text-gold-400" /> },
  { id: "window_glass_cleaning", icon: <Columns2 className="w-6 h-6 text-gold-400" /> },
]

const POST_EVENT_ROOMS: Room[] = [
    { id: "hall_cleaning", icon: <Building className="w-6 h-6 text-gold-400" /> },
    { id: "vip_area_cleaning", icon: <Crown className="w-6 h-6 text-gold-400" /> },
    { id: "toilet_cleaning", icon: <Bath className="w-6 h-6 text-gold-400" /> },
    { id: "entrance_cleaning", icon: <DoorOpen className="w-6 h-6 text-gold-400" /> },
    { id: "catering_area_cleaning", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
    { id: "stage_cleaning", icon: <Mic className="w-6 h-6 text-gold-400" /> },
    { id: "seating_area_cleaning", icon: <Armchair className="w-6 h-6 text-gold-400" /> },
    { id: "corridor_cleaning", icon: <DoorOpen className="w-6 h-6 text-gold-400" /> },
    { id: "floor_cleaning", icon: <LampFloorIcon className="w-6 h-6 text-gold-400" /> },
    { id: "waste_removal", icon: <Trash className="w-6 h-6 text-gold-400" /> }
]

const COMMERCIAL_CLEANING_ROOMS :Room[]=[
  { id: "table_desk_cleaning", icon: <LampDesk className="w-6 h-6 text-gold-400" /> },
  { id: "floor_cleaning", icon: <Sparkles className="w-6 h-6 text-gold-400" /> },
  { id: "toilet_cleaning", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "kitchen_cleaning", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "reception_cleaning", icon: <DoorOpen className="w-6 h-6 text-gold-400" /> },
  { id: "meeting_room_cleaning", icon: <Users className="w-6 h-6 text-gold-400" /> },
  { id: "window_cleaning", icon: <Maximize2 className="w-6 h-6 text-gold-400" /> },
  { id: "carpet_cleaning", icon: <Grid className="w-6 h-6 text-gold-400" /> },
  { id: "corridor_cleaning", icon: <Footprints className="w-6 h-6 text-gold-400" /> },
  { id: "waste_removal", icon: <Trash2 className="w-6 h-6 text-gold-400" /> },
]

const STEAM_CLEANING_ROOMS: Room[] = [
  { id: "bathroom_toilet", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "kitchen_surfaces", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "floors_tiles", icon: <Grid className="w-6 h-6 text-gold-400" /> },
  { id: "carpets_rugs", icon: <Sparkles className="w-6 h-6 text-gold-400" /> },
  { id: "sofas_upholstery", icon: <Armchair className="w-6 h-6 text-gold-400" /> },
  { id: "office_floors", icon: <Building className="w-6 h-6 text-gold-400" /> },
  { id: "desks_workstations", icon: <Laptop className="w-6 h-6 text-gold-400" /> },
  { id: "office_chairs", icon: <Armchair className="w-6 h-6 text-gold-400" /> },
  { id: "meeting_rooms", icon: <Users className="w-6 h-6 text-gold-400" /> },
  { id: "commercial_kitchens", icon: <ChefHat className="w-6 h-6 text-gold-400" /> },
]

const HEALTHGUARD_ROOMS: Room[] = [
  { id: "bedrooms", icon: <BedDouble className="w-6 h-6 text-gold-400" /> },
  { id: "bathrooms", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "living_rooms", icon: <Sofa className="w-6 h-6 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "verandas_outdoor_spaces", icon: <Sun className="w-6 h-6 text-gold-400" /> },
  { id: "home_offices", icon: <Briefcase className="w-6 h-6 text-gold-400" /> },
  { id: "laundry_rooms", icon: <WashingMachine className="w-6 h-6 text-gold-400" /> },
  { id: "dining_areas", icon: <UtensilsCrossed className="w-6 h-6 text-gold-400" /> },
  { id: "hallways_staircases", icon: <Footprints className="w-6 h-6 text-gold-400" /> },
  { id: "windows_glass_area", icon: <Maximize2 className="w-6 h-6 text-gold-400" /> },
   
]

const HIGH_SECURITY_AND_POST_CONSTRUCT_ROOMS: Room[] = [
  { id: "cleaningBedrooms", icon: <BedDouble className="w-6 h-6 text-gold-400" /> },
  { id: "bathroomsToilets", icon: <Bath className="w-6 h-6 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-6 h-6 text-gold-400" /> },
  { id: "livingRooms", icon: <Sofa className="w-6 h-6 text-gold-400" /> },
  { id: "windowsGlass", icon: <Maximize2 className="w-6 h-6 text-gold-400" /> },
  { id: "furnitureTables", icon: <Armchair className="w-6 h-6 text-gold-400" /> },
  { id: "doorsFrames", icon: <DoorOpen className="w-6 h-6 text-gold-400" /> },
  { id: "wallsCeilings", icon: <Paintbrush className="w-6 h-6 text-gold-400" /> },
  { id: "floorsTiles", icon: <Grid className="w-6 h-6 text-gold-400" /> },
  { id: "stairsCommonArea", icon: <Footprints className="w-6 h-6 text-gold-400" /> },
]
export default function RoomSelector({
  value: roomCounts,
  onChange,
  serviceSlug,
  theme: themeProp = "dark",
}: {
  /** Room key → selected count; a missing key means not added. */
  value: RoomCounts;
  onChange: (next: RoomCounts) => void;
  serviceSlug: string;
  theme?: string;
}) {
  const isLight = themeProp === "light";

  const renderIcon = (icon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: `w-6 h-6 ${isLight ? "text-[#A88238]" : "text-gold-400"}`,
      });
    }
    return icon;
  };

  const setCount = (id: RoomKey, count: number): void => {
    const next = { ...roomCounts };
    // Less than 1 removes it so it reverts to the "Add" button
    if (count < 1) delete next[id];
    else next[id] = Math.min(ROOM_MAX_COUNT, count);
    onChange(next);
  };

  const handleAddClick = (id: RoomKey): void => setCount(id, 1);
  const handleIncrement = (id: RoomKey): void => setCount(id, (roomCounts[id] || 0) + 1);
  const handleDecrement = (id: RoomKey): void => setCount(id, (roomCounts[id] || 0) - 1);

  // Calculate total selected rooms
  const totalRooms: number = Object.values(roomCounts).reduce((acc, val) => acc + (val ?? 0), 0);

  const { translate } = useLanguage();

  // display corresponded rooms according to service
  function getCorrectRooms(): Room[] {
    if (serviceSlug === "luxury-yacht-cleaning") {
      return YATCH_ROOMS; 
    }
    if (serviceSlug === "healthguard-sanitization") {
      return HEALTHGUARD_ROOMS;
    }
    if (serviceSlug === "post-event-cleaning") {
      return POST_EVENT_ROOMS;
    }
    if (serviceSlug === "high-security-property-care" || serviceSlug === "post-construction-renovation-cleaning") {
      return HIGH_SECURITY_AND_POST_CONSTRUCT_ROOMS;
    }
    if (serviceSlug === "commercial-office-cleaning") {
      return COMMERCIAL_CLEANING_ROOMS;
    }
    if (serviceSlug === "steam-cleaning") {
      return STEAM_CLEANING_ROOMS;
    }
    return INITIAL_ROOMS; 
  }

  const ROOMS = getCorrectRooms();
  
  // excluded rooms components
  const EXCLUDE_SLUG_LIST = new Set(["premium-rental-concierge-cleaning"]);

  return (
    <div
      className={`w-full my-5 p-4 md:p-5 rounded-2xl font-sans transition-all duration-300 
        `}
    >
      {/* Grid of Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3">
        {ROOMS.map((room) => {
          const count = roomCounts[room.id] || 0;
          const isAdded = count > 0;

          return (
            <div 
              key={room.id}
              className={`relative flex flex-row justify-between gap-[5px] items-center p-2.5 rounded-xl transition-all duration-300 border ${
                isAdded 
                  ? isLight
                    ? "bg-[#FFFDF7] border-2 border-[#C5A059] shadow-[0_4px_16px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25"
                    : "bg-[rgba(13,20,36,0.7)] backdrop-blur-xl border-[#C5A059] shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  : isLight
                  ? "bg-[#FBF9F4] border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#F5F0E4]"
                  : "bg-[#0d162d]/80bg-[rgba(13,20,36,0.7)] backdrop-blur-xl border-gray-800 hover:border-gray-700"
              }`}
            >
              {/* Top Row: Icon & Name */}
              <div className="flex items-center gap-3.5 px-[2px]">
                <div
                  className={`md:p-2.5 p-1.5 rounded-lg border transition-colors ${
                    isLight
                      ? isAdded
                        ? "bg-[#F6EEDC] border-[#C5A059]/50"
                        : "bg-[#EDE7DA] border-[#C5A059]/30"
                      : "bg-[#152243] border-blue-900/40"
                  }`}
                >
                  {renderIcon(room.icon)}
                </div>
                <h3
                  className={`font-semibold md:text-base text-[12px] tracking-wide ${
                    isLight ? "text-[#1B2E4B]" : "text-slate-100"
                  }`}
                >
                  {translate(room.id)}
                </h3>
              </div>

              {/* Action Area: Toggle between "Add" Button and Counter */}
              <div className="">
                {!isAdded ? (
                  <button
                      type="button"
                      onClick={() => handleAddClick(room.id)}
                      className={`w-full py-1 px-3 rounded-[10px] font-medium text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 group cursor-pointer ${
                        isLight
                          ? "bg-[#F5F0E4] hover:bg-[#EDE5D4] text-[#A88238] border border-[#C5A059]/40"
                          : "bg-[#172548] hover:bg-[#1e3061] text-gold-400 border border-blue-900/50 shadow-inner"
                      }`}
                    >
                    <Plus className="md:w-3 w-3 h-3 md:h-3 transition-transform group-hover:scale-110" />
                    <span className="md:text-base text-[11px]">{translate("equipmentAddButton")}</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    {/* Counter Row */}
                    <div
                      className={`flex items-center justify-between rounded-xl p-1.5 border ${
                        isLight
                          ? "bg-[#F6EEDC] border-[#C5A059]/35"
                          : "bg-[#152243] border-blue-900/40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrement(room.id)}
                        className={`w-5 md:w-8 h-5 md:h-8 flex items-center justify-center rounded-lg transition-colors shadow-sm cursor-pointer ${
                          isLight
                            ? "bg-[#EDE7DA] hover:bg-[#dfd7c5] text-[#1B2E4B]"
                            : "bg-[#1f305e] hover:bg-[#273b75] text-white"
                        }`}
                        aria-label="Decrement"
                      >
                        <Minus className="md:w-4 w-3 md:h-4 h-3" />
                      </button>

                      <span
                        className={`font-bold md:text-[14px] text-[13px] px-2 ${
                          isLight ? "text-[#1B2E4B]" : "text-slate-100"
                        }`}
                      >
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(room.id)}
                        disabled={count >= ROOM_MAX_COUNT}
                        className={`w-5 md:w-8 h-5 md:h-8 flex items-center justify-center rounded-lg transition-colors shadow-sm cursor-pointer ${
                          count >= ROOM_MAX_COUNT
                            ? isLight
                              ? "opacity-35 cursor-not-allowed bg-[#EDE7DA] text-gray-400"
                              : "opacity-40 cursor-not-allowed bg-[#1f305e]"
                            : isLight
                            ? "bg-[#EDE7DA] hover:bg-[#dfd7c5] text-[#1B2E4B]"
                            : "bg-[#1f305e] hover:bg-[#273b75] text-white"
                        }`}
                        aria-label="Increment"
                      >
                        <Plus className="md:w-4 w-3 md:h-4 h-3" />
                      </button>
                    </div>

                    {/* Status hint text */}
                    <div className="text-center">
                      <span
                        className={`md:text-xs text-[11px] font-medium ${
                          isLight ? "text-gray-500" : "text-slate-400"
                        }`}
                      >
                        {translate("pressureSelectedBtn")}:{" "}
                        <span className={`font-semibold ${isLight ? "text-[#A88238]" : "text-gold-400"}`}>
                          {count}
                        </span>{" "}
                        {count === 1 ? " room" : " rooms"}
                      </span>
                    </div> 
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Summary Bar */}
      <div
        className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isLight ? "border-gray-200" : "border-slate-800/80"
        }`}
      >
        <div className={`text-sm font-medium ${isLight ? "text-[#1B2E4B]" : "text-slate-300"}`}>
          <p>
            {translate("TotalselectedRooms")}:{" "}
            <span className={`font-bold text-base ml-1 ${isLight ? "text-[#A88238]" : "text-gold-400"}`}>
              {totalRooms}
            </span>
          </p> 
          <span className={`text-xs ${isLight ? "text-gray-400" : "text-slate-500"}`}>
            {translate("maxOfCategory")}
          </span>
        </div>
      </div>
    </div>
  );
}