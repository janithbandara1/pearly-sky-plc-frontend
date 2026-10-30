'use client';

import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Phone 
} from 'lucide-react';

export default function TrackerView() {
  const steps = [
    { title: 'Order Confirmed', time: '10:30 AM, Today', completed: true },
    { title: 'Picked Up', time: '11:45 AM, Today', completed: true },
    { title: 'Washing & Drying', time: 'In Progress (Started 1:15 PM)', current: true, statusText: 'PROCESSING' },
    { title: 'Quality Check', time: 'Expected 4:00 PM', completed: false },
    { title: 'Out for Delivery', time: 'Expected 5:30 PM', completed: false },
    { title: 'Delivered', time: 'Expected 6:30 PM', completed: false },
  ];

  return (
    <div className="space-y-3.5">
      
      {/* Top Banner & Status Header */}
      <div className="px-0.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-slate-900">Live Order Tracker</h2>
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
            Live Tracker
          </span>
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5">
          Real-time status updates from pickup to doorstep delivery.
        </p>
      </div>

      {/* Active Order Card with Total Price */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-1.5">
            <h3 className="text-xs font-bold text-slate-900">Order #ORD-98241</h3>
            <span className="bg-cyan-50 text-cyan-700 text-[9px] font-semibold px-2 py-0.5 rounded-full">
              Wash & Fold + Express
            </span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Placed Today at 10:15 AM • Estimated Return: Today, 6:30 PM
          </p>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-400 block font-medium">Total Price</span>
          <span className="text-xs font-extrabold text-slate-900">$32.75</span>
        </div>
      </div>

      {/* Service Progress Milestone Timeline */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Service Progress</h4>
        
        <div className="space-y-3 pl-2 border-l-2 border-slate-100 ml-2">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-4 flex items-start justify-between">
              
              {/* Timeline Indicator Dot */}
              <div className={`absolute -left-[25px] top-0.5 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center bg-white ${
                step.completed ? 'border-emerald-500 text-emerald-500' :
                step.current ? 'border-cyan-500 bg-cyan-500 text-white animate-pulse' : 'border-slate-300 text-transparent'
              }`}>
                {step.completed && <CheckCircle2 className="w-2.5 h-2.5" />}
                {step.current && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>

              <div>
                <div className="flex items-center space-x-1.5">
                  <p className={`text-xs font-bold ${step.completed || step.current ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.title}
                  </p>
                  {step.statusText && (
                    <span className="text-[8px] bg-cyan-100 text-cyan-800 font-extrabold px-1.5 py-0.2 rounded">
                      {step.statusText}
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">{step.time}</p>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Assigned Logistics Partner Card */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2.5">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Assigned Logistics Partner</h4>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              MV
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <p className="text-xs font-bold text-slate-900">Marcus Vance</p>
                <span className="text-[9px] bg-amber-100 text-amber-800 font-bold px-1 py-0.2 rounded">★ 4.9</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">White Eco-Van (Plate #9XY-21)</p>
            </div>
          </div>
          
          <button className="bg-cyan-600 hover:bg-cyan-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-xl shadow-sm flex items-center space-x-1 transition">
            <Phone className="w-3 h-3" />
            <span>Call Driver</span>
          </button>
        </div>

        <div className="bg-cyan-50/60 p-2.5 rounded-xl border border-cyan-100/60 text-[10px] text-cyan-900 flex items-center justify-between">
          <span className="font-semibold">ETA: 5:30 PM (25 mins away)</span>
          <Clock className="w-3.5 h-3.5 text-cyan-600" />
        </div>
      </div>

      {/* Pickup & Delivery Address Card */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
        <div className="flex items-center space-x-1.5 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5 text-cyan-600" />
          <span>Pickup & Delivery Address</span>
        </div>
        <p className="text-xs font-semibold text-slate-800 pl-5">
          742 Evergreen Terrace, Apt 4B
        </p>

        <div className="pt-2 border-t border-slate-100 mt-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1">
            Special Driver Instructions
          </span>
          <p className="text-[10px] italic text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
            "Leave bag with front desk concierge if not answered."
          </p>
        </div>
      </div>

    </div>
  );
}