'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: { name: string; location: string; rating: number; comment: string }) => void;
}

export default function ReviewModal({ isOpen, onClose, onSubmitReview }: ReviewModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    rating: 5,
    comment: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview(formData);
    setFormData({ name: '', location: '', rating: 5, comment: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B19]/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/30 bg-[#0E162B]/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-[#E6C594] transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[#E6C594] mb-1">
            Your Experience
          </span>
          <h3 className="font-serif text-2xl font-bold text-white">Share Your Review</h3>
          <p className="text-xs text-slate-400 mt-1">
            Your feedback helps maintain the excellence of our digital and concierge platform in France.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Name / Title</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ex: Baron de Rothschild / Mrs. Leroy"
              className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Region / Location</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="ex: Paris 16th / Cannes"
                className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Overall Rating</label>
              <select
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
              >
                <option value={5}>★★★★★ (5/5 - Exceptional)</option>
                <option value={4}>★★★★☆ (4/5 - Very Satisfied)</option>
                <option value={3}>★★★☆☆ (3/5 - Satisfactory)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Your Detailed Comment</label>
            <textarea
              rows={4}
              required
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              placeholder="Describe your experience with our booking and payment platform..."
              className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#B89728] py-3 text-sm font-bold text-[#070B19] shadow-lg shadow-[#D4AF37]/25 hover:opacity-95 transition-all"
            >
              Submit Testimonial
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}