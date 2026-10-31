'use client';

import React, { useState } from 'react';
import { 
  Server, 
  ShieldCheck, 
  CreditCard, 
  Landmark, 
  Building2, 
  MailOpen, 
  MessageSquare, 
  Star, 
  ArrowRight, 
  Plus, 
  Phone, 
  Mail as Envelope, 
  MapPin as LocationPin, 
  Check, 
  X 
} from 'lucide-react';

import { CURRENT_COUNTRY } from '@/lib/countries/config';
import ReviewModal from '@/components/customers/review-modal';
import { partnersData, Review } from '@/lib/content/webpage contents/our-customers-content';
import { getTranslatedWord } from '@/lib/content/webpage contents/home-page-data';
import { useLanguage } from '@/lib/i18n/language-context';


interface PartnersPageProps {
  country?: 'fr' | 'uk' | 'lk';
}

export default function OurCustomersView() {
  const content = partnersData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];
  const [filter, setFilter] = useState<'all' | 'cloud' | 'banking' | 'collaboration'>('all');
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState('');
  
  // Toast state
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);
  const [reviewsList, setReviewsList] = useState<Review[]>(content?.reviews);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleAddReview = (newRev: { name: string; location: string; rating: number; comment: string }) => {
    setReviewsList([
      {
        id: Date.now().toString(),
        ...newRev,
        date: 'Just now (Pending moderation)',
      },
      ...reviewsList,
    ]);
    showToast("Testimonial Submitted", "Thank you for your review. It will be published after verification.");
  };

  const getPartnerIcon = (iconName: string) => {
    switch (iconName) {
      case 'server': return <Server className="w-6 h-6" />;
      case 'shield': return <ShieldCheck className="w-6 h-6" />;
      case 'card': return <CreditCard className="w-6 h-6" />;
      case 'landmark': return <Landmark className="w-6 h-6" />;
      case 'building': return <Building2 className="w-6 h-6" />;
      case 'mail': return <MailOpen className="w-6 h-6" />;
      case 'message': return <MessageSquare className="w-6 h-6" />;
      default: return <Server className="w-6 h-6" />;
    }
  };

  const {translate} = useLanguage()
  

  return (
    <div className="bg-[#070B19] text-slate-200 font-sans min-h-screen selection:bg-[#D4AF37] selection:text-[#070B19]">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 sm:py-24 border-b border-[#D4AF37]/15">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#0E162B] border border-[#D4AF37]/30 text-[#E6C594] text-xs font-semibold uppercase tracking-widest mb-6">
            {getTranslatedWord(CURRENT_COUNTRY,content.badgeText,translate)}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
            {getTranslatedWord(CURRENT_COUNTRY,content.heroTitleRegular,translate)}<span className="bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent italic font-normal">{getTranslatedWord(CURRENT_COUNTRY,content.heroTitleHighlight,translate)}</span> & Trusted Banking
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {getTranslatedWord(CURRENT_COUNTRY,content.heroDescription,translate)}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12 pt-10 border-t border-[#D4AF37]/20">
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 p-6 backdrop-blur-md text-center">
              <span className="block font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent mb-1">{getTranslatedWord(CURRENT_COUNTRY,content.stat1Value,translate)}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {getTranslatedWord(CURRENT_COUNTRY,content.stat1Label,translate)}
              </span>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 p-6 backdrop-blur-md text-center">
              <span className="block font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent mb-1">{getTranslatedWord(CURRENT_COUNTRY,content.stat2Value,translate)}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {getTranslatedWord(CURRENT_COUNTRY,content.stat2Label,translate)}
              </span>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 p-6 backdrop-blur-md text-center">
              <span className="block font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent mb-1">{getTranslatedWord(CURRENT_COUNTRY,content.stat3Value,translate)}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {getTranslatedWord(CURRENT_COUNTRY,content.stat3Label,translate)}
              </span>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 p-6 backdrop-blur-md text-center">
              <span className="block font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#AA7C11] bg-clip-text text-transparent mb-1">{getTranslatedWord(CURRENT_COUNTRY,content.stat4Value,translate)}</span>
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                {getTranslatedWord(CURRENT_COUNTRY,content.stat4Label,translate)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="flex-grow">

        {/* PART 1: Customer Testimonials & Verified Reviews */}
        <section id="clients" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              {getTranslatedWord(CURRENT_COUNTRY,content.testimonialsHeader,translate)}
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">{getTranslatedWord(CURRENT_COUNTRY,content.testimonialsTitle,translate)}</h2>
            </div>
            <div className="mt-6 md:mt-0 flex items-center space-x-4">
              <button 
                onClick={() => setIsReviewModalOpen(true)}
                className="gold-gradient-bg text-[#070B19] px-5 py-2.5 rounded-xl font-semibold text-sm hover:opacity-95 transition shadow-lg shadow-[#D4AF37]/25 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> {getTranslatedWord(CURRENT_COUNTRY,content.shareReviewText,translate)}
              </button>
            </div>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviewsList.map((rev) => {
              return (
                <div key={rev.id} className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 p-8 backdrop-blur-md flex flex-col justify-between transition duration-300 hover:border-[#D4AF37]/50 hover:shadow-xl hover:shadow-[#D4AF37]/10">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-[#E6C594] text-sm space-x-1">
                        {[...Array(Math.floor(rev.rating))].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">{getTranslatedWord(CURRENT_COUNTRY, rev.date, translate)}</span>
                    </div>
                    <p className="text-slate-300 text-sm sm:text-base italic font-light mb-6">
                      &ldquo;{getTranslatedWord(CURRENT_COUNTRY, rev.comment, translate)}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-800">
                    <div className="w-11 h-11 rounded-full bg-[#172242] border border-[#D4AF37]/40 flex items-center justify-center font-serif font-bold text-[#E6C594]">
                      {rev.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-sm">{rev.name}</h4>
                      <p className="text-xs text-[#E6C594]/80">{getTranslatedWord(CURRENT_COUNTRY, rev.location, translate)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PART 2: Technology & Banking Partners Directory with Filters */}
        <section id="directory" className="py-20 bg-[#0E162B]/50 border-t border-b border-[#D4AF37]/15">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-[#E6C594] uppercase tracking-widest text-xs font-semibold block mb-2">{getTranslatedWord(CURRENT_COUNTRY, content.directoryCategoryHeader, translate)}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-4">{getTranslatedWord(CURRENT_COUNTRY, content.directoryTitle, translate)}</h2>
              <p className="text-slate-300 text-sm sm:text-base font-light">
                {getTranslatedWord(CURRENT_COUNTRY, content.directorySubtitle, translate)}
              </p>
            </div>

            {/* Category Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {(['all', 'cloud', 'banking', 'collaboration'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition duration-300 capitalize ${
                    filter === cat 
                      ? 'bg-[#D4AF37] text-[#070B19] shadow-md shadow-[#D4AF37]/20' 
                      : 'bg-[#172242] text-slate-300 hover:text-[#E6C594] border border-[#D4AF37]/20'
                  }`}
                >
                  {cat === 'all' ? content.filterAll : cat === 'cloud' ? content.filterCloud : cat === 'banking' ? content.filterBanking : content.filterCollab}
                </button>
              ))}
            </div>

            {/* Partner Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {content.partners
                .filter(p => filter === 'all' || p.category === filter)
                .map((partner) => (
                  <div key={partner.id} className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/75 backdrop-blur-md overflow-hidden flex flex-col justify-between transition duration-300 hover:border-[#D4AF37]/50 hover:shadow-xl">
                    <div className="p-6 sm:p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C594]">
                            {getPartnerIcon(partner.icon)}
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-lg text-white">{partner.name}</h3>
                            <p className="text-xs text-[#E6C594]">{getTranslatedWord(CURRENT_COUNTRY, partner.subtitle, translate)}</p>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold uppercase">{getTranslatedWord(CURRENT_COUNTRY, partner.badge, translate)}</span>
                      </div>
                      <p className="text-slate-300 text-sm font-light mb-6">
                        {getTranslatedWord(CURRENT_COUNTRY, partner.description, translate)}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {partner.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-lg bg-[#070B19]/60 text-slate-300 text-xs border border-slate-700">
                            {getTranslatedWord(CURRENT_COUNTRY, tag, translate)}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="px-6 sm:px-8 py-4 bg-[#070B19]/50 border-t border-[#D4AF37]/15 flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-[#E6C594] text-xs">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-bold text-white ml-1">{getTranslatedWord(CURRENT_COUNTRY, partner.rating, translate)}</span>
                        <span className="text-slate-400">{getTranslatedWord(CURRENT_COUNTRY, partner.ratingType, translate)}</span>
                      </div> 
                      <button onClick={() => { setSelectedPartner(partner.name); setIsBookingModalOpen(true); }} className="text-xs font-semibold text-[#E6C594] hover:text-white transition flex items-center space-x-1">
                        <span>Partner Info</span> <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* PART 3: Security & Technology Standards Section */}
        <section id="standards" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-[#E6C594] uppercase tracking-widest text-xs font-semibold block mb-2">{getTranslatedWord(CURRENT_COUNTRY, content.standardsBadge, translate)}</span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mb-6">{getTranslatedWord(CURRENT_COUNTRY, content.standardsTitle, translate)}</h2>
              <p className="text-slate-300 font-light leading-relaxed mb-6">
                {getTranslatedWord(CURRENT_COUNTRY, content.standardsDescription, translate)}
              </p>
              <div className="space-y-4"> 
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C594] flex-shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{getTranslatedWord(CURRENT_COUNTRY, content.charter1Title, translate)}</h4>
                    <p className="text-xs text-slate-400">{getTranslatedWord(CURRENT_COUNTRY, content.charter1Desc, translate)}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C594] flex-shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{getTranslatedWord(CURRENT_COUNTRY, content.charter2Title, translate)}</h4>
                    <p className="text-xs text-slate-400">{getTranslatedWord(CURRENT_COUNTRY, content.charter2Desc, translate)}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C594] flex-shrink-0 mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white text-sm">{getTranslatedWord(CURRENT_COUNTRY, content.charter3Title, translate)}</h4>
                    <p className="text-xs text-slate-400">{getTranslatedWord(CURRENT_COUNTRY, content.charter3Desc, translate)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#0E162B]/75 backdrop-blur-md p-8 sm:p-10 relative shadow-xl">
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#D4AF37]/20 rounded-full blur-xl pointer-events-none" />
              <span className="text-xs font-semibold text-[#E6C594] uppercase tracking-widest block mb-2">{getTranslatedWord(CURRENT_COUNTRY, content.supportBadge, translate)}</span>
              <h3 className="font-serif text-2xl font-bold text-white mb-4">{getTranslatedWord(CURRENT_COUNTRY, content.supportTitle, translate)}</h3>
              <p className="text-slate-300 text-sm font-light mb-6">
                {getTranslatedWord(CURRENT_COUNTRY, content.supportDescription, translate)}
              </p>
              <div className="space-y-4 pt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <Phone className="w-4 h-4 text-[#E6C594]" />
                  <span>{getTranslatedWord(CURRENT_COUNTRY, content.phoneLineText, translate)}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <Envelope className="w-4 h-4 text-[#E6C594]" />
                  <span>{getTranslatedWord(CURRENT_COUNTRY, content.emailText, translate)}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-slate-200">
                  <LocationPin className="w-4 h-4 text-[#E6C594]" />
                  <span>{getTranslatedWord(CURRENT_COUNTRY, content.locationsText, translate)}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Render the Separate Review Modal Component */}
      <ReviewModal 
        isOpen={isReviewModalOpen} 
        onClose={() => setIsReviewModalOpen(false)} 
        onSubmitReview={handleAddReview}
      />

      {/* Partner Booking / Inquiry Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#070B19]/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg rounded-3xl border border-[#D4AF37]/30 bg-[#0E162B]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <button 
              onClick={() => setIsBookingModalOpen(false)} 
              className="absolute top-6 right-6 text-slate-400 hover:text-[#E6C594] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#E6C594] font-semibold block mb-1">Infrastructure Connection</span>
              <h3 className="font-serif text-2xl font-bold text-white">Partner: {selectedPartner}</h3>
              <p className="text-xs text-slate-400 mt-1">Our technical infrastructure team will respond to your inquiry promptly.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setIsBookingModalOpen(false); showToast("Inquiry Sent", "Our infrastructure team will contact you shortly."); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                <input type="text" required placeholder="ex: John-Louis Dupont" className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number</label>
                  <input type="tel" required placeholder="+33 6 00 00 00 00" className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Company / Estate</label>
                  <input type="text" required placeholder="ex: Vendôme Estate" className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Details</label>
                <textarea rows={3} required placeholder="Specify your inquiry regarding cloud hosting, payment integration, or banking..." className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#070B19]/80 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#D4AF37] resize-none"></textarea>
              </div>
              <div className="pt-2">
                <button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#E6C594] via-[#D4AF37] to-[#B89728] py-3 text-sm font-bold text-[#070B19] shadow-lg shadow-[#D4AF37]/25 hover:opacity-95 transition-all">
                  Submit Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl border border-[#D4AF37]/40 bg-[#0E162B]/90 px-6 py-4 shadow-2xl backdrop-blur-xl flex items-center space-x-3 transition-all duration-300">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <h5 className="font-semibold text-white text-xs sm:text-sm">{toast.title}</h5>
            <p className="text-xs text-slate-300">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        .gold-gradient-bg {
          background: linear-gradient(135deg, #E6C594 0%, #D4AF37 50%, #B89728 100%);
        }
      `}</style>
    </div>
  );
}