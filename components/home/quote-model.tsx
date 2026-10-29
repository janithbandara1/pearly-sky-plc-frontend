'use client';

import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName?: string;
}

export default function QuoteModal({ isOpen, onClose, serviceName }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    propertyDetails: serviceName ? `Interested in: ${serviceName}` : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request or handle submission logic here
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ fullName: '', email: '', propertyDetails: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur / dark tint */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-lg rounded-2xl border border-[#d4af37]/30 bg-[#0b121e] p-6 text-white shadow-2xl z-10 md:p-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#162032] text-gray-400 hover:text-white hover:bg-[#1e293b] transition-colors"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center flex flex-col items-center gap-4">
            <CheckCircle2 className="h-14 w-14 text-[#d4af37]" />
            <h3 className="font-serif text-2xl font-bold text-white">Request Received</h3>
            <p className="text-sm text-gray-300 max-w-sm">
              Thank you, <span className="text-[#d4af37] font-semibold">{formData.fullName}</span>. Our team will review your requirements and get back to you shortly.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-4 rounded-lg bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c9a858] px-6 py-2.5 text-xs font-bold text-[#0b121e] uppercase tracking-wider hover:brightness-110 transition-all"
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 pr-6">
              <h3 className="font-serif text-2xl  text-[#d4af37]">
                Request Custom Quote
              </h3>
              <p className="mt-1 text-xs text-gray-300">
                Fill in your requirements for a personalized luxury cleaning quote.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="rounded-xl border border-[#2a374a] bg-[#121c2c] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="rounded-xl border border-[#2a374a] bg-[#121c2c] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-colors"
                />
              </div>

              {/* Property Details */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Property Type / Details
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. 3-bedroom luxury apartment in Paris..."
                  value={formData.propertyDetails}
                  onChange={(e) => setFormData({ ...formData, propertyDetails: e.target.value })}
                  className="rounded-xl border border-[#2a374a] bg-[#121c2c] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#d4af37] focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#c9a858] py-3.5 text-xs font-bold text-[#0b121e] uppercase tracking-wider shadow-md hover:brightness-110 transition-all disabled:opacity-50"
              >
                <span>{loading ? 'Submitting...' : 'Send Quote Request'}</span>
                {!loading && <Send className="h-3.5 w-3.5" />}
              </button>

            </form>
          </>
        )}

      </div>
    </div>
  );
}