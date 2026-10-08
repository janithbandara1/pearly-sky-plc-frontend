'use client';

import React, { useState } from 'react';
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

interface Room {
  id: string;
  name: string;
  icon: React.ReactNode;
}

// Room definitions with respective icons matching image content
const INITIAL_ROOMS: Room[] = [
  { id: 'bedrooms', name: "bedrooms", icon: <Bed className="w-6 h-6 text-blue-400" /> },
  { id: 'bathrooms', name: "bathrooms", icon: <Bath className="w-6 h-6 text-blue-400" /> },
  { id: 'livingRooms', name: "living_rooms", icon: <Tv className="w-6 h-6 text-blue-400" /> },
  { id: 'kitchens', name: "kitchens", icon: <Utensils className="w-6 h-6 text-blue-400" /> },
  { id: 'verandas', name: "verandas_outdoor_spaces", icon: <Trees className="w-6 h-6 text-blue-400" /> },
  { id: 'homeOffices', name: "home_offices", icon: <Briefcase className="w-6 h-6 text-blue-400" /> },
  { id: 'laundryRooms', name: "laundry_rooms", icon: <WashingMachine className="w-6 h-6 text-blue-400" /> },
  { id: 'diningAreas', name: "dining_areas", icon: <UtensilsCrossed className="w-6 h-6 text-blue-400" /> },
];

export default function RoomSelector() {
  // State mapping room ID to its numerical count
  const [roomCounts, setRoomCounts] = useState<Record<string, number>>({});

  const handleAddClick = (id: string): void => {
    setRoomCounts((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id: string): void => {
    setRoomCounts((prev) => {
      const current = prev[id] || 0;
      if (current >= 10) return prev; // Maximum 10 limit per category
      return { ...prev, [id]: current + 1 };
    });
  };

  const handleDecrement = (id: string): void => {
    setRoomCounts((prev) => {
      const current = prev[id] || 0;
      const updated = current - 1;
      if (updated < 1) {
        // Less than 1 removes it from state so it reverts to the "Add" button
        const copy = { ...prev };
        delete copy[id];
        return copy;
      }
      return { ...prev, [id]: updated };
    });
  };

  // Calculate total selected rooms
  const totalRooms: number = Object.values(roomCounts).reduce((acc, val) => acc + val, 0);

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
                  {translate(room.name as TranslationKey)}
                </h3>
              </div>

              {/* Action Area: Toggle between "Add" Button and Counter */}
              <div className="mt-auto">
                {!isAdded ? (
                  <button
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
                        onClick={() => handleIncrement(room.id)}
                        disabled={count >= 10}
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-colors shadow-sm ${
                          count >= 10 
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