'use client';

import React from 'react';
import { FileText, Download, CheckCircle, ChevronRight, RotateCcw } from 'lucide-react';

export default function OrdersView() {
  const pastOrders = [
    {
      id: 'ORD-97520',
      date: 'Oct 22, 2026',
      service: 'Wash, Dry & Iron',
      weight: '5.2 kg',
      amount: '$23.50',
      status: 'Delivered',
    },
    {
      id: 'ORD-96112',
      date: 'Oct 14, 2026',
      service: 'Dry Clean (Suits & Coats)',
      weight: '3 items',
      amount: '$34.00',
      status: 'Delivered',
    },
    {
      id: 'ORD-95004',
      date: 'Oct 05, 2026',
      service: 'Wash & Fold',
      weight: '7.0 kg',
      amount: '$28.00',
      status: 'Delivered',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Past Invoices & Orders</h3>
        <span className="text-[10px] text-slate-400 font-medium">Showing last 30 days</span>
      </div>

      <div className="space-y-3">
        {pastOrders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3 hover:border-cyan-200 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{order.id}</h4>
                  <p className="text-[10px] text-slate-400">{order.date}</p>
                </div>
              </div>
              <span className="inline-flex items-center text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <CheckCircle className="w-3 h-3 mr-1" />
                {order.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
              <div>
                <p className="font-semibold text-slate-800">{order.service}</p>
                <p className="text-[10px] text-slate-400">Weight/Volume: {order.weight}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-900">{order.amount}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <button className="text-[11px] font-semibold text-cyan-600 hover:text-cyan-700 flex items-center">
                <Download className="w-3 h-3 mr-1" /> Download Receipt
              </button>
              <button className="text-[11px] font-semibold text-slate-600 hover:text-slate-800 flex items-center bg-slate-50 hover:bg-slate-100 px-2.5 py-1 rounded-lg transition">
                <RotateCcw className="w-3 h-3 mr-1" /> Reorder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}