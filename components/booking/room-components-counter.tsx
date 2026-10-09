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
  LayoutGrid 
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
  "laundry_rooms",
  "dining_areas",
] as const satisfies readonly TranslationKey[];

export type RoomKey = (typeof ROOM_KEYS)[number];
export type RoomCounts = Partial<Record<RoomKey, number>>;

export const ROOM_MAX_COUNT = 10;

/** Selected rooms as an ordered list (ROOM_KEYS order) — the shape saved to the booking draft. */
export function roomCountsToList(counts: RoomCounts): { key: RoomKey; count: number }[] {
  return ROOM_KEYS.filter((key) => (counts[key] ?? 0) > 0).map((key) => ({ key, count: counts[key]! }));
}

interface Room {
  id: RoomKey;
  icon: React.ReactNode;
}

// Room definitions with respective icons matching image content
const INITIAL_ROOMS: Room[] = [
  { id: "bedrooms", icon: <Bed className="w-6 h-6 text-blue-400" /> },
  { id: "bathrooms", icon: <Bath className="w-6 h-6 text-blue-400" /> },
  { id: "living_rooms", icon: <Tv className="w-6 h-6 text-blue-400" /> },
  { id: "kitchens", icon: <Utensils className="w-6 h-6 text-blue-400" /> },
  { id: "verandas_outdoor_spaces", icon: <Trees className="w-6 h-6 text-blue-400" /> },
  { id: "home_offices", icon: <Briefcase className="w-6 h-6 text-blue-400" /> },
  { id: "laundry_rooms", icon: <WashingMachine className="w-6 h-6 text-blue-400" /> },
  { id: "dining_areas", icon: <UtensilsCrossed className="w-6 h-6 text-blue-400" /> },
];

export default function RoomSelector({
  value: roomCounts,
  onChange,
}: {
  /** Room key → selected count; a missing key means not added. */
  value: RoomCounts;
  onChange: (next: RoomCounts) => void;
}) {
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

  const {translate}=useLanguage();

  return (
    <div className="w-full bg-[#070d1b] my-5 p-6 md:p-10 rounded-2xl text-white font-sans shadow-2xl border border-blue-950/50">
      
      {/* Grid of Rooms */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {INITIAL_ROOMS.map((room) => {
          const count = roomCounts[room.id] || 0;
          const isAdded = count > 0;

          return (
            <div 
              key={room.id}
              className={`relative flex flex-col justify-between p-5 rounded-xl transition-all duration-300 border ${
                isAdded 
                  ? 'bg-[#101b35] border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
                  : 'bg-[#0d162d]/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Top Row: Icon & Name */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="p-2.5 rounded-lg bg-[#152243] border border-blue-900/40">
                  {room.icon}
                </div>
                <h3 className="font-semibold text-base text-slate-100 tracking-wide">
                  {translate(room.id)}
                </h3>
              </div>

              {/* Action Area: Toggle between "Add" Button and Counter */}
              <div className="mt-auto">
                {!isAdded ? (
                  <button
                    type="button"
                    onClick={() => handleAddClick(room.id)}
                    className="w-full py-3 px-4 rounded-xl font-medium text-sm transition-all duration-200 bg-[#172548] hover:bg-[#1e3061] text-blue-400 border border-blue-900/50 shadow-inner flex items-center justify-center gap-2 group"
                  >
                    <Plus className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span>{translate("equipmentAddButton")}</span>
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    {/* Counter Row */}
                    <div className="flex items-center justify-between bg-[#152243] rounded-xl p-1.5 border border-blue-900/40">
                      <button
                        type="button"
                        onClick={() => handleDecrement(room.id)}
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#1f305e] hover:bg-[#273b75] text-white transition-colors shadow-sm"
                        aria-label="Decrement"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="font-bold text-lg text-slate-100 px-4">
                        {count}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(room.id)}
                        disabled={count >= ROOM_MAX_COUNT}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                          count >= ROOM_MAX_COUNT
                            ? 'opacity-40 cursor-not-allowed bg-[#1f305e]' 
                            : 'bg-[#1f305e] hover:bg-[#273b75] text-white'
                        }`}
                        aria-label="Increment"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Status hint text */}
                    <div className="text-center">
                      <span className="text-xs text-slate-400 font-medium">
                        Selected: <span className="text-blue-400 font-semibold">{count}</span> {count === 1 ? 'room' : 'rooms'}
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
      <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm font-medium text-slate-300">
          Total Rooms Selected: <span className="text-blue-400 font-bold text-base ml-1">{totalRooms}</span> <span className="text-xs text-slate-500">(Max 10 per category)</span>
        </div>


      </div>

    </div>
  );
}