'use client';

import React from 'react';
import { Home, PlusCircle, Truck, FileText } from 'lucide-react';

interface FooterNavProps {
  activeTab: string;
  onChangeTab: (tab: 'home' | 'book' | 'tracker' | 'orders') => void;
}

export default function FooterNav({ activeTab, onChangeTab }: FooterNavProps) {
  return (
    <nav className="border-t border-slate-100 bg-white px-6 py-2 flex items-center justify-between relative">
      <button 
        onClick={() => onChangeTab('home')}
        className={`flex flex-col items-center space-y-0.5 transition ${activeTab === 'home' ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px] font-medium">Home</span>
      </button>

      {/* Floating Action Button for Booking */}
      <button 
        onClick={() => onChangeTab('book')}
        className="flex flex-col items-center space-y-0.5 -mt-5"
      >
        <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center shadow-lg shadow-cyan-600/30 hover:bg-cyan-700 transition">
          <PlusCircle className="w-6 h-6" />
        </div>
        <span className="text-[10px] font-semibold text-cyan-600">Book</span>
      </button>

      <button 
        onClick={() => onChangeTab('tracker')}
        className={`flex flex-col items-center space-y-0.5 relative transition ${activeTab === 'tracker' ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <span className="absolute -top-1 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
        <Truck className="w-5 h-5" />
        <span className="text-[10px] font-medium">Tracker</span>
      </button>

      <button 
        onClick={() => onChangeTab('orders')}
        className={`flex flex-col items-center space-y-0.5 transition ${activeTab === 'orders' ? 'text-cyan-600' : 'text-slate-400 hover:text-slate-600'}`}
      >
        <FileText className="w-5 h-5" />
        <span className="text-[10px] font-medium">Orders</span>
      </button>
    </nav>
  );
}