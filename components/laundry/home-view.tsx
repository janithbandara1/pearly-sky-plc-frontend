'use client';

import React, { useState } from 'react';
import { 
  Sparkles, 
  Shirt, 
  Truck, 
  Tag, 
  BookOpen, 
  ChevronRight, 
  Clock,
  Award,
  ShoppingBag
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: 'home' | 'book' | 'tracker' | 'orders') => void;
  onOpenBooking: () => void;
}

export default function HomeView({ onNavigate, onOpenBooking }: HomeViewProps) {
  const [promoApplied, setPromoApplied] = useState(false);

  return (
    <div className="space-y-5">
      
      {/* 1. Member Banner Card (100% Visually Matched) */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-5 rounded-3xl text-white shadow-lg relative overflow-hidden">
        
        {/* Top Row: Member Tier Badge & Button */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center space-x-1.5 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>Member Tier: Gold Care</span>
          </div>

          <button 
            onClick={onOpenBooking}
            className="bg-white hover:bg-slate-50 text-slate-900 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition flex items-center space-x-1"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-600" />
            <span>Book Wash Now</span>
          </button>
        </div>
        
        {/* Main Banner Heading & Subtext */}
        <h2 className="text-2xl font-extrabold tracking-tight text-white mb-1">
          Welcome back, Sarah! 👋
        </h2>
        <p className="text-xs text-blue-100 font-normal leading-relaxed max-w-[280px]">
          Your clothes deserve gentle care. Next scheduled pickup slot is open for today evening.
        </p>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/20 my-4" />

        {/* 2. Quick Metrics Grid (Integrated inside the banner box as shown in visual) */}
        <div className="grid grid-cols-4 gap-2 text-center">
          
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-200 font-medium">
              <ShoppingBag className="w-3 h-3" />
              <span>Active</span>
            </div>
            <span className="text-base font-extrabold text-white mt-0.5 block">1</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-200 font-medium">
              <Award className="w-3 h-3" />
              <span>Points</span>
            </div>
            <span className="text-sm font-extrabold text-white mt-0.5 block">340 <span className="text-[9px] font-normal text-blue-200">pts</span></span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-200 font-medium">
              <Clock className="w-3 h-3" />
              <span>Next Slot</span>
            </div>
            <span className="text-xs font-bold text-white mt-1 block">Today 5 PM</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/10">
            <div className="flex items-center justify-center space-x-1 text-[10px] text-blue-200 font-medium">
              <span className="text-emerald-300 font-bold">%</span>
              <span>Saved</span>
            </div>
            <span className="text-sm font-extrabold text-white mt-0.5 block">$24.50</span>
          </div>

        </div>

      </div>

      

      {/* Core Feature Action Cards Grid */}
      <div className="grid grid-cols-2 gap-3">
        <button 
          onClick={onOpenBooking} 
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Shirt className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Book New Wash</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Wash, dry, fold & iron</p>
          </div>
        </button>

        <button 
          onClick={() => onNavigate('tracker')} 
          className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition text-left flex flex-col justify-between group relative"
        >
          <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-emerald-100 animate-pulse" />
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Track Active Order</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Driver ETA & live status</p>
          </div>
        </button>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-left flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Tag className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">View Pricing</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Transparent per kg/item</p>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm text-left flex flex-col justify-between">
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-slate-800">Wash Care Guide</h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Fabric tips & stain guide</p>
          </div>
        </div>
      </div>

      {/* Promo Discount Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-4 rounded-2xl text-white shadow-md flex items-center justify-between">
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-amber-300">Get $5 OFF Your Next Dry Clean</p>
          <p className="text-[10px] text-slate-300">
            Use promo code <span className="font-mono bg-white/10 px-1 py-0.5 rounded text-amber-200">FRESH10</span> at checkout.
          </p>
        </div>
        <button 
          onClick={() => setPromoApplied(!promoApplied)}
          className={`text-[11px] font-bold px-3 py-1.5 rounded-xl transition ${
            promoApplied ? 'bg-emerald-500 text-white' : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
          }`}
        >
          {promoApplied ? 'Applied ✓' : 'Apply Now'}
        </button>
      </div>

    </div>
  );
}