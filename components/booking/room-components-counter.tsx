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
  { id: "bedrooms", icon: <Bed className="w-4 h-4 text-gold-400" /> },
  { id: "bathrooms", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "living_rooms", icon: <Tv className="w-4 h-4 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
  { id: "verandas_outdoor_spaces", icon: <Trees className="w-4 h-4 text-gold-400" /> },
  { id: "home_offices", icon: <Briefcase className="w-4 h-4 text-gold-400" /> },
  { id: "laundry_rooms", icon: <WashingMachine className="w-4 h-4 text-gold-400" /> },
  { id: "dining_areas", icon: <UtensilsCrossed className="w-4 h-4 text-gold-400" /> },
];

const YATCH_ROOMS: Room[] = [
 { id: "deck_cleaning", icon: <Ship className="w-4 h-4 text-gold-400" /> },
  { id: "cabin_cleaning",  icon: <BedDouble className="w-4 h-4 text-gold-400" /> },
  { id: "bathroom_toilet_cleaning", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "galley_cleaning", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
  { id: "dining_area_cleaning", icon: <Coffee className="w-4 h-4 text-gold-400" /> },
  { id: "lounge_cleaning", icon: <Armchair className="w-4 h-4 text-gold-400" /> },
  { id: "vip_suite_cleaning", icon: <Crown className="w-4 h-4 text-gold-400" /> },
  { id: "crew_area_cleaning", icon: <Users className="w-4 h-4 text-gold-400" /> },
  { id: "floor_carpet_cleaning", icon: <Sparkles className="w-4 h-4 text-gold-400" /> },
  { id: "window_glass_cleaning", icon: <Columns2 className="w-4 h-4 text-gold-400" /> },
]

const POST_EVENT_ROOMS: Room[] = [
    { id: "hall_cleaning", icon: <Building className="w-4 h-4 text-gold-400" /> },
    { id: "vip_area_cleaning", icon: <Crown className="w-4 h-4 text-gold-400" /> },
    { id: "toilet_cleaning", icon: <Bath className="w-4 h-4 text-gold-400" /> },
    { id: "entrance_cleaning", icon: <DoorOpen className="w-4 h-4 text-gold-400" /> },
    { id: "catering_area_cleaning", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
    { id: "stage_cleaning", icon: <Mic className="w-4 h-4 text-gold-400" /> },
    { id: "seating_area_cleaning", icon: <Armchair className="w-4 h-4 text-gold-400" /> },
    { id: "corridor_cleaning", icon: <DoorOpen className="w-4 h-4 text-gold-400" /> },
    { id: "floor_cleaning", icon: <LampFloorIcon className="w-4 h-4 text-gold-400" /> },
    { id: "waste_removal", icon: <Trash className="w-4 h-4 text-gold-400" /> }
]

const COMMERCIAL_CLEANING_ROOMS :Room[]=[
  { id: "table_desk_cleaning", icon: <LampDesk className="w-4 h-4 text-gold-400" /> },
  { id: "floor_cleaning", icon: <Sparkles className="w-4 h-4 text-gold-400" /> },
  { id: "toilet_cleaning", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "kitchen_cleaning", icon: <Utensils className="w-4 h-4 text-[#F3C649]" /> },
  { id: "reception_cleaning", icon: <DoorOpen className="w-4 h-4 text-gold-400" /> },
  { id: "meeting_room_cleaning", icon: <Users className="w-4 h-4 text-gold-400" /> },
  { id: "window_cleaning", icon: <Maximize2 className="w-4 h-4 text-gold-400" /> },
  { id: "carpet_cleaning", icon: <Grid className="w-4 h-4 text-gold-400" /> },
  { id: "corridor_cleaning", icon: <Footprints className="w-4 h-4 text-gold-400" /> },
  { id: "waste_removal", icon: <Trash2 className="w-4 h-4 text-gold-400" /> },
]

const STEAM_CLEANING_ROOMS: Room[] = [
  { id: "bathroom_toilet", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "kitchen_surfaces", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
  { id: "floors_tiles", icon: <Grid className="w-4 h-4 text-gold-400" /> },
  { id: "carpets_rugs", icon: <Sparkles className="w-4 h-4 text-gold-400" /> },
  { id: "sofas_upholstery", icon: <Armchair className="w-4 h-4 text-gold-400" /> },
  { id: "office_floors", icon: <Building className="w-4 h-4 text-gold-400" /> },
  { id: "desks_workstations", icon: <Laptop className="w-4 h-4 text-gold-400" /> },
  { id: "office_chairs", icon: <Armchair className="w-4 h-4 text-gold-400" /> },
  { id: "meeting_rooms", icon: <Users className="w-4 h-4 text-gold-400" /> },
  { id: "commercial_kitchens", icon: <ChefHat className="w-4 h-4 text-gold-400" /> },
]

const HEALTHGUARD_ROOMS: Room[] = [
  { id: "bedrooms", icon: <BedDouble className="w-4 h-4 text-gold-400" /> },
  { id: "bathrooms", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "living_rooms", icon: <Sofa className="w-4 h-4 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
  { id: "verandas_outdoor_spaces", icon: <Sun className="w-4 h-4 text-gold-400" /> },
  { id: "home_offices", icon: <Briefcase className="w-4 h-4 text-gold-400" /> },
  { id: "laundry_rooms", icon: <WashingMachine className="w-4 h-4 text-gold-400" /> },
  { id: "dining_areas", icon: <UtensilsCrossed className="w-4 h-4 text-gold-400" /> },
  { id: "hallways_staircases", icon: <Footprints className="w-4 h-4 text-gold-400" /> },
  { id: "windows_glass_area", icon: <Maximize2 className="w-4 h-4 text-gold-400" /> },
   
]

const HIGH_SECURITY_AND_POST_CONSTRUCT_ROOMS: Room[] = [
  { id: "cleaningBedrooms", icon: <BedDouble className="w-4 h-4 text-gold-400" /> },
  { id: "bathroomsToilets", icon: <Bath className="w-4 h-4 text-gold-400" /> },
  { id: "kitchens", icon: <Utensils className="w-4 h-4 text-gold-400" /> },
  { id: "livingRooms", icon: <Sofa className="w-4 h-4 text-gold-400" /> },
  { id: "windowsGlass", icon: <Maximize2 className="w-4 h-4 text-gold-400" /> },
  { id: "furnitureTables", icon: <Armchair className="w-4 h-4 text-gold-400" /> },
  { id: "doorsFrames", icon: <DoorOpen className="w-4 h-4 text-gold-400" /> },
  { id: "wallsCeilings", icon: <Paintbrush className="w-4 h-4 text-gold-400" /> },
  { id: "floorsTiles", icon: <Grid className="w-4 h-4 text-gold-400" /> },
  { id: "stairsCommonArea", icon: <Footprints className="w-4 h-4 text-gold-400" /> },
]

export default function RoomSelector({
  value: roomCounts,
  onChange,
  serviceSlug,
  theme: themeProp = "dark",
  isQuote=false,
}: {
  /** Room key → selected count; a missing key means not added. */
  value: RoomCounts;
  onChange: (next: RoomCounts) => void;
  serviceSlug: string;
  theme?: string;
  isQuote?: boolean;
}) {
  const isLight = themeProp === "light";

  const renderIcon = (icon: React.ReactNode) => {
    if (React.isValidElement(icon)) {
      return React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
        className: `w-4 h-4 ${isLight ? "text-[#D8B63F]" : "text-[#FFD766]"}`,
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
      className={`w-full my-5 p-4 md:p-5 rounded-2xl font-sans transition-all duration-300 ${
        isLight ? "text-[#1A2238]" : "text-white"
      }`}
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
                    ? "bg-white border-2 border-[#D8B63F] shadow-[0_4px_16px_rgba(216,182,63,0.2)] ring-1 ring-[#D8B63F]/30"
                    : "bg-[#1B2A40] border-2 border-[#FFD766] shadow-[0_0_15px_rgba(255,215,102,0.15)] ring-1 ring-[#FFD766]/30"
                  : isLight
                  ? "bg-[#F7F5F0] border border-[#D9DDE5] hover:border-[#D8B63F] hover:bg-white hover:shadow-xs"
                  : "bg-[#152238] border border-[#718096]/30 hover:border-[#FFD766]/50 hover:bg-[#1B2A40]"
              }`}
            >
              {/* Top Row: Icon & Name */}
              <div className="flex items-center gap-3.5 px-[2px]">
                <div
                  className={`md:p-2.5 p-1.5 rounded-lg border transition-colors ${
                    isLight
                      ? isAdded
                        ? "bg-[#F7F5F0] border-[#D8B63F]/50 shadow-xs"
                        : "bg-white border-[#D9DDE5]"
                      : isAdded
                        ? "bg-[#111C2E] border-[#FFD766]/50 shadow-[0_0_8px_rgba(255,215,102,0.2)]"
                        : "bg-[#111C2E] border-[#718096]/30"
                  }`}
                >
                  {renderIcon(room.icon)}
                </div>
                <h3
                  className={`font-semibold md:text-base text-[12px] tracking-wide ${
                    isLight ? "text-[#1A2238]" : "text-white"
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
                      className={`w-full py-1 px-2.5 rounded-[10px] font-medium text-sm transition-all duration-200 shadow-xs flex items-center justify-center gap-2 group cursor-pointer ${
                        isLight
                          ? "bg-white hover:bg-[#002F6D] text-[#002F6D] hover:text-white border border-[#D9DDE5] hover:border-[#002F6D]"
                          : "bg-[#1B2A40] hover:bg-[#FFD766] text-[#FFD766] hover:text-[#002F6D] border border-[#FFD766]/40"
                      }`}
                    >
                    <Plus className="md:w-3 w-3 h-3 md:h-3 transition-transform group-hover:scale-110" />
                    <span className="md:text-[13px] text-[11px] font-semibold">{translate("equipmentAddButton")}</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    {/* Counter Row */}
                    <div
                      className={`flex items-center justify-between rounded-xl p-1.5 border ${
                        isLight
                          ? "bg-[#F7F5F0] border-[#D9DDE5]"
                          : "bg-[#111C2E] border-[#718096]/40"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleDecrement(room.id)}
                        className={`w-5 md:w-6 h-5 md:h-6 flex items-center justify-center rounded-lg transition-colors shadow-xs cursor-pointer ${
                          isLight
                            ? "bg-white hover:bg-[#D9DDE5] text-[#1A2238] border border-[#D9DDE5]"
                            : "bg-[#1B2A40] hover:bg-[#152238] text-[#FFD766] border border-[#718096]/40"
                        }`}
                        aria-label="Decrement"
                      >
                        <Minus className="md:w-3 w-2 h-3 md:h-3" />
                      </button>

                      <span
                        className={`font-bold md:text-[14px] text-[13px] px-2 ${
                          isLight ? "text-[#1A2238]" : "text-[#FFD766]"
                        }`}
                      >
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(room.id)}
                        disabled={count >= ROOM_MAX_COUNT}
                        className={`w-5 md:w-6 h-5 md:h-6 flex items-center justify-center rounded-lg transition-colors shadow-xs cursor-pointer ${
                          count >= ROOM_MAX_COUNT
                            ? isLight
                              ? "opacity-35 cursor-not-allowed bg-gray-200 text-gray-400"
                              : "opacity-40 cursor-not-allowed bg-[#152238] text-gray-500"
                            : isLight
                            ? "bg-white hover:bg-[#D9DDE5] text-[#1A2238] border border-[#D9DDE5]"
                            : "bg-[#1B2A40] hover:bg-[#152238] text-[#FFD766] border border-[#718096]/40"
                        }`}
                        aria-label="Increment"
                      >
                        <Plus className="md:w-3 w-3 h-3 md:h-3" />
                      </button>
                    </div>

                    {/* Status hint text */}
                    <div className="text-center">
                      <span
                        className={`md:text-xs text-[11px] font-medium ${
                          isLight ? "text-[#687386]" : "text-[#C3CDDC]"
                        }`}
                      >
                        {translate("pressureSelectedBtn")}:{" "}
                        <span className={`font-semibold ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
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
          isLight ? "border-[#D9DDE5]" : "border-[#718096]/30"
        }`}
      >
        <div className={`text-sm font-medium ${isLight ? "text-[#1A2238]" : "text-[#C3CDDC]"}`}>
          <p>
            {translate("TotalselectedRooms")}:{" "}
            <span className={`font-bold text-base ml-1 ${isLight ? "text-[#002F6D]" : "text-[#FFD766]"}`}>
              {totalRooms}
            </span>
          </p> 
          <span className={`text-xs ${isLight ? "text-[#687386]" : "text-[#718096]"}`}>
            {translate("maxOfCategory")}
          </span>
        </div>
      </div>
    </div>
  );
}