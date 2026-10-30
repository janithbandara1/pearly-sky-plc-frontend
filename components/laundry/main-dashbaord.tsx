'use client';

import React, { useState } from 'react';
import Header from './header-part';
import FooterNav from './laundry-footer';
import BookingModal from './laundry-booking';
import TrackerView from './tracker-view';
import OrdersView from './order-view';
import HomeView from './home-view';

export default function LaundryDashboard() {
  const [activeTab, setActiveTab] = useState<'home' | 'book' | 'tracker' | 'orders'>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsModalOpen(true);
  };

  const handleBookingComplete = () => {
    setIsModalOpen(false);
    setActiveTab('tracker'); // Switch straight to live order tracker after successful checkout
  };

  return (
    <div className="min-h-screen  max-w-7xl flex items-center justify-center  font-sans antialiased text-slate-800">
      <div className="w-full max-w-7xl  bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 flex flex-col min-h-[840px] relative">
        
        {/* Header */}
        <Header 
          onNewBooking={handleOpenBooking}
          showBack={activeTab !== 'home'}
          onBack={() => setActiveTab('home')}
          title={activeTab !== 'home' ? activeTab.toUpperCase() : undefined}
        />

        {/* Content Body */}
        <main className="flex-1 overflow-y-auto px-5 py-4 bg-slate-50/50">
          {activeTab === 'home' && (
            <HomeView 
              onNavigate={(tab) => {
                if (tab === 'book') handleOpenBooking();
                else setActiveTab(tab);
              }} 
              onOpenBooking={handleOpenBooking}
            />
          )}
          {activeTab === 'tracker' && <TrackerView />}
          {activeTab === 'orders' && <OrdersView />}
        </main>

        {/* Footer Navigation */}
        <FooterNav 
          activeTab={activeTab} 
          onChangeTab={(tab) => {
            if (tab === 'book') handleOpenBooking();
            else setActiveTab(tab);
          }} 
        />

        {/* 4-Step Booking Modal Popup */}
        <BookingModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onComplete={handleBookingComplete}
        />

      </div>
    </div>
  );
}