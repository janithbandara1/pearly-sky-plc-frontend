'use client';

import React from 'react';
import { PlusCircle, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onNewBooking: () => void;
  showBack?: boolean;
  onBack?: () => void;
  title?: string;
}

export default function Header({ onNewBooking, showBack, onBack, title }: HeaderProps) {
  return (
    <header className="px-5 pt-5 pb-3 flex items-center justify-between bg-white border-b border-slate-100">
      <div className="flex items-center space-x-2">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        ) : (
          <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 font-bold">
            ✨
          </div>
        )}
        <div>
          <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent leading-none">
            {title || 'BubbleFresh'}
          </h1>
          <span className="text-[10px] font-medium text-slate-400 italic">Eco Laundry</span>
        </div>
      </div>
      
      {!showBack && (
        <button 
          onClick={onNewBooking}
          className="flex items-center space-x-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 px-3 py-1.5 rounded-full text-xs font-semibold transition"
        >
          <PlusCircle className="w-3.5 h-3.5 text-cyan-600" />
          <span>New Booking</span>
        </button>
      )}
    </header>
  );
}