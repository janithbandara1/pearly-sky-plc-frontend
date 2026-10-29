"use client";

import React, { useState } from "react";
import { PageHero } from "@/components/hero-components/hero-with-social-links";
import { ContactSection } from "@/components/home/contact-section";
import { LocationCard } from "@/components/location-card";
import { useLanguage } from "@/lib/i18n/language-context";
import { getCountryPageContent } from "@/lib/countries/page-content";
import { locations, officeLocations } from "@/lib/content/locations";
import { Socialmedialinks } from "@/components/contactus/social-media";
import Link from "@/components/locale-link";
//import { Star, Sparkles, Send, PhoneCall, MapPin, Building2, Globe, ShieldCheck, Clock, Award, Crown } from 'lucide-react';
import { CURRENT_COUNTRY } from "@/lib/countries/config";

import { Send, Sparkles, PhoneCall, Globe, Building2, MapPin, Crown, ShieldCheck, Clock, Award, MapPinIcon, Info } from 'lucide-react';

// ==========================================
// TypeScript Interfaces & Types
// ==========================================
export type CountryCode = 'fr' | 'uk' | 'lk';

export interface RegionOption {
  id: string;
  name: string;
}

export interface ServiceTypeOption {
  id: string;
  name: string;
}

export interface HubLocation {
  title: string;
  category: string;
  address: string;
  phone: string;
  regionKey?: string;
  description?: string;
  specializations?: string[];
  image?: string;
}

export interface CountryProfile {
  code: CountryCode;
  flag: string;
  name: string;
  currency: string;
  phone: string;
  email: string;
  address: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  citiesServed: string;
  marqueeCities: string[];
  regions: RegionOption[];
  serviceTypes: ServiceTypeOption[];
  hubs: HubLocation[];
}

export type CountryDataProfilesRecord = Record<CountryCode, CountryProfile>;

// ==========================================
// Country Data Profiles Record
// ==========================================
const countryDataProfiles: CountryDataProfilesRecord = {
  fr: {
    code: 'fr',
    flag: '🇫🇷',
    name: 'France',
    currency: 'EUR (€)',
    phone: '+33 7 43 70 87 80',
    email: 'france@pearlyskyglobalclean.com',
    address: '15 Rue Des Halles, 75001 Paris, France',
    heroTitle: 'Contact Us & Regional Hubs in',
    heroHighlight: 'France',
    heroDescription: 'Bespoke Eco-Luxury Cleaning Services Across Paris, the French Riviera, Normandy, and Exclusive Alpine Resorts. Uncompromising excellence, non-toxic formulations, and white-glove confidentiality.',
    citiesServed: '23+',
    marqueeCities: ['Paris', 'Nice', 'Saint-Tropez', 'Antibes', 'Cannes', 'Monaco', 'Normandy', 'Deauville', 'Bordeaux', 'Courchevel', 'Megève', 'Biarritz'],
    regions: [
      { id: 'paris', name: 'Paris & Île-de-France' },
      { id: 'riviera', name: 'French Riviera & Nice' },
      { id: 'cannes', name: 'Cannes & Mougins' },
      { id: 'monaco', name: 'Monaco & Menton' },
      { id: 'courchevel', name: 'Courchevel & Alpine Resorts' },
      { id: 'bordeaux', name: 'Bordeaux & Wine Estates' },
    ],
    serviceTypes: [
      { id: 'haussmann', name: 'Haussmannian Residence Cleaning' },
      { id: 'yacht', name: 'Luxury Yacht & Superyacht Detailing' },
      { id: 'chalet', name: 'Alpine Chalet & Resort Maintenance' },
      { id: 'estate', name: 'Château & Vineyard Estate Care' },
    ],
    hubs: [
      {
        title: 'Paris & Suburbs',
        category: 'Île-de-France',
        address: '15 Rue Des Halles, 75001 Paris',
        phone: '+33 7 43 70 87 80',
        regionKey: 'ile-de-france',
        description: 'Specialized in Haussmannian apartments, historic private mansions (Hôtels Particuliers), and luxury boutiques along Avenue Montaigne.',
        specializations: ['Haussmannian Care', 'Marble & Parquet'],
        image: '/images/hero/tikcer-images/img1.webp',
      },
      {
        title: 'Cannes, Nice & Monaco',
        category: 'French Riviera',
        address: 'Promenade des Anglais, 06000 Nice',
        phone: '+33 7 43 70 87 80',
        regionKey: 'riviera',
        description: 'Complete eco-cleaning solutions for coastal villas, superyachts docked at Port Vauban or Port Hercules, and luxury seaside estates.',
        specializations: ['Superyacht Detailing', 'Seaside Villas'],
        image: '/images/hero/tikcer-images/img2.webp',
      },
      {
        title: 'Courchevel & Megève',
        category: 'French Alps',
        address: 'Rue du Rocher, 73120 Courchevel',
        phone: '+33 7 43 70 87 80',
        regionKey: 'alps',
        description: 'Premium eco-care for ski-in ski-out chalets, timber restoration, eco-friendly fireplace residue removal, and pre-season turnarounds.',
        specializations: ['Alpine Chalets', 'Timber & Stone Care'],
        image: '/images/hero/tikcer-images/img3.webp',
      },
      {
        title: 'Bordeaux & Biarritz',
        category: 'Atlantic & West',
        address: 'Place de la Bourse, 33000 Bordeaux',
        phone: '+33 7 43 70 87 80',
        regionKey: 'atlantic',
        description: 'Eco-sanitization tailored for grand wine châteaux in Saint-Émilion, oceanfront Biarritz villas, and historical estates across Normandy & Deauville.',
        specializations: ['Vineyard Châteaux', 'Coastal Retreats'],
        image: '/images/hero/tikcer-images/img4.webp',
      },
      {
        title: 'Strasbourg & Toulouse',
        category: 'East & South',
        address: 'Place Kléber, 67000 Strasbourg',
        phone: '+33 7 43 70 87 80',
        regionKey: 'east-south',
        description: 'Eco-luxury sanitization for diplomatic residences in Alsace, technology headquarters in Toulouse, and historic townhouses in Montpellier.',
        specializations: ['Diplomatic Quarters', 'Executive Offices'],
        image: '/images/hero/tikcer-images/img5.webp',
      },
      {
        title: 'Saint-Tropez & Mougins',
        category: 'French Riviera',
        address: 'Place des Lices, 83990 Saint-Tropez',
        phone: '+33 7 43 70 87 80',
        regionKey: 'riviera',
        description: 'Discrete, high-security eco-cleaning for private compounds, celebrity retreats, and seasonal estate turnovers with non-toxic guarantee.',
        specializations: ['Private Compounds', 'Non-Toxic Care'],
        image: '/images/hero/tikcer-images/img6.webp',
      },
    ],
  },
  uk: {
    code: 'uk',
    flag: '🇬🇧',
    name: 'United Kingdom',
    currency: 'GBP (£)',
    phone: '+44 20 7946 0912',
    email: 'uk@pearlyskyglobalclean.com',
    address: 'Berkeley Square, Mayfair, London W1J 6BD',
    heroTitle: 'Contact Us & Regional Hubs in the',
    heroHighlight: 'United Kingdom',
    heroDescription: 'Premier Eco-Luxury Cleaning & Estate Management across Mayfair, Knightsbridge, Surrey Country Estates, and Scottish Highlands. Uncompromising discretion and botanical green formulations.',
    citiesServed: '18+',
    marqueeCities: ['London', 'Mayfair', 'Knightsbridge', 'Kensington', 'Cotswolds', 'Edinburgh', 'Manchester', 'Surrey', 'Ascot', 'Cambridge', 'Oxford', 'Cheshire'],
    regions: [
      { id: 'london-central', name: 'Central London (Mayfair & Belgravia)' },
      { id: 'surrey-estate', name: 'Surrey & Berkshire Country Estates' },
      { id: 'cotswolds', name: 'The Cotswolds Luxury Retreats' },
      { id: 'edinburgh', name: 'Edinburgh & Scottish Highlands' },
    ],
    serviceTypes: [
      { id: 'townhouse', name: 'Georgian & Victorian Townhouse Care' },
      { id: 'country-estate', name: 'English Country Estate Maintenance' },
      { id: 'penthouse', name: 'Luxury Penthouse White-Glove Clean' },
    ],
    hubs: [
      {
        title: 'Mayfair & Belgravia Flagship',
        category: 'Central London',
        address: 'Berkeley Square, London W1J 6BD',
        phone: '+44 20 7946 0912',
        regionKey: 'london-central',
        description: 'White-glove housekeeping and discreet care for historic Georgian townhouses and modern luxury penthouses in Central London.',
        specializations: ['Period Architecture', 'Art & Antique Care'],
        image: '/images/hero/tikcer-images/uk-img-1.webp',
      },
      { 
        title: 'Surrey & Ascot Estates',
        category: 'Home Counties',
        address: 'High Street, Weybridge, Surrey',
        phone: '+44 1932 550123',
        regionKey: 'surrey-estate',
        description: 'Comprehensive estate sanitization, pool house maintenance, and ecological upkeep for secluded country properties.',
        specializations: ['Country Estates', 'Pool & Spa Care'],
        image: '/images/hero/tikcer-images/uk-img-2.webp',
      },
    ],
  },
  lk: {
    code: 'lk',
    flag: '🇱🇰',
    name: 'Sri Lanka',
    currency: 'LKR (Rs.)',
    phone: '+94 11 234 5678',
    email: 'srilanka@pearlyskyglobalclean.com',
    address: 'Cinnamon Gardens, Colombo 00700, Sri Lanka',
    heroTitle: 'Contact Us & Regional Hubs in',
    heroHighlight: 'Sri Lanka',
    heroDescription: 'Bespoke Eco-Luxury Cleaning & Villa Management across Colombo CBD, Galle Fort, Kandy Hill Country, and Coastal Resorts. Immaculate tropical maintenance with non-toxic care.',
    citiesServed: '12+',
    marqueeCities: ['Colombo', 'Kandy', 'Galle Fort', 'Bentota', 'Nuwara Eliya', 'Negombo', 'Mirissa', 'Sigiriya', 'Trincomalee', 'Mount Lavinia'],
    regions: [
      { id: 'colombo-7', name: 'Colombo 07 (Cinnamon Gardens & CBD)' },
      { id: 'galle-fort', name: 'Galle Fort & Southern Coastal Villas' },
      { id: 'kandy-hills', name: 'Kandy & Central Hill Country Estates' },
    ],
    serviceTypes: [
      { id: 'villa', name: 'Luxury Beach Villa & Pool Sanitization' },
      { id: 'colonial', name: 'Colonial Bungalow & Timber Care' },
      { id: 'commercial-pos', name: 'Boutique & Retail POS Showroom Clean' },
    ],
    hubs: [
      {
        title: 'Colombo CBD & Cinnamon Gardens',
        category: 'Western Province',
        address: 'Cinnamon Gardens, Colombo 00700',
        phone: '+94 11 234 5678',
        regionKey: 'colombo-7',
        description: 'Specialized corporate headquarters care, luxury apartments, and boutique retail point-of-sale showroom sanitization.',
        specializations: ['Corporate Towers', 'Boutique Showrooms'],
        image: '/images/hero/tikcer-images/lk-img-1.webp',
      },
      {
        title: 'Galle Fort Coastal Sanctuary',
        category: 'Southern Province',
        address: 'Church Street, Galle Fort, Galle',
        phone: '+94 91 223 4455',
        regionKey: 'galle-fort',
        description: 'Heritage Dutch-colonial building preservation, antique wood maintenance, and luxury beachfront villa turnover.',
        specializations: ['Heritage Preservation', 'Beachfront Villas'],
        image: '/images/hero/tikcer-images/lk-img-1.webp',
      },
    ],
  },
};

// ==========================================
// DateTimeSection Component
// ==========================================
interface DateTimeSectionProps {
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
}


const DateTimeSection: React.FC<DateTimeSectionProps> = ({
  date,
  onDateChange,
  time,
  onTimeChange,}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
        Preferred Date *
      </label>
      <input
        type="date"
        required
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#050B18]/80 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
      />
    </div>
    <div>
      <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-1.5">
        Preferred Time *
      </label>
      <input
        type="time"
        required
        value={time}
        onChange={(e) => onTimeChange(e.target.value)}
        className="w-full rounded-xl border border-[#D4AF37]/20 bg-[#050B18]/80 px-4 py-3 text-sm text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
      />
    </div>
  </div>
);

export function ContactUsView() {
  
  const [selectedCountry, setSelectedCountry] = useState<'fr' | 'uk' | 'lk'>('fr');

  const country = countryDataProfiles[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk' || "fr"];

  

  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: country.regions[0].id,
    serviceType: country.serviceTypes[0].id,
    message: '',
    consent: false,
  });

  const [submitted, setSubmitted] = useState<boolean>(false);

  // Handle jurisdiction change safely
  const handleCountryChange = (newCountryKey: CountryCode) => {
    setSelectedCountry(newCountryKey);
    const newProfile = countryDataProfiles[newCountryKey];
    setActiveFilter('all');
    setFormData((prev) => ({
      ...prev,
      region: newProfile.regions[0].id,
      serviceType: newProfile.serviceTypes[0].id,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      country: country.name,
      ...formData,
      date,
      time,
    };

    console.log('Dynamic Inquiry Payload:', payload);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);

    setFormData({
      name: '',
      email: '',
      phone: '',
      region: country.regions[0].id,
      serviceType: country.serviceTypes[0].id,
      message: '',
      consent: false,
    });
    setDate('');
    setTime('');
  };

  // Filtered hubs for the locations directory
  const filteredHubs = activeFilter === 'all'
    ? country.hubs
    : country.hubs.filter(h => h.regionKey === activeFilter);

  return (
    <div className="w-full bg-[#050B18] text-slate-200 font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37] selection:text-[#050B18]">

      {/* HERO SECTION */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#1A2954]/40 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E6C594] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6">
            <Crown className="w-3.5 h-3.5 text-[#D4AF37]" /> {country.name} Operations & Flagship Hubs
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
            {country.heroTitle} <span className="bg-gradient-to-r from-[#FFF0BD] via-[#D4AF37] to-[#997819] bg-clip-text text-transparent">{country.heroHighlight}</span>
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto font-light leading-relaxed mb-10">
            {country.heroDescription}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 border-t border-[#D4AF37]/15">
            <div className="p-3">
              <p className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C594]">100%</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Eco-Certified Products</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C594]">{country.citiesServed}</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Key Cities Served</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C594]">24/7</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">VIP Concierge Care</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl lg:text-3xl font-bold text-[#E6C594]">&lt;2 Hrs</p>
              <p className="text-xs text-slate-400 uppercase tracking-wider">Emergency Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: CONTACT INFO & INTERACTIVE FORM */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Side: Hub Cards & Direct Hotline */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">Direct Contact & Regional Hubs</h2>
                <p className="text-slate-400 text-sm">Reach out directly to our specialized regional teams in {country.name} for tailored proposals.</p>
              </div>

              {country.hubs.slice(0, 3).map((hub, idx) => (
                <div key={idx} className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/55 backdrop-blur-md p-6 transition-all hover:border-[#D4AF37]/40 hover:-translate-y-1 shadow-xl group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-bl-full pointer-events-none" />
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center text-[#E6C594] shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#E6C594] uppercase tracking-wider">{hub.category}</span>
                      <h3 className="font-serif text-xl font-bold text-white mt-0.5">{hub.title}</h3>
                      <p className="text-slate-300 text-sm mt-2 flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37] mt-1 shrink-0" />
                        <span>{hub.address}</span>
                      </p>
                      <p className="text-slate-300 text-sm mt-1 flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <a href={`tel:${hub.phone}`} className="hover:text-[#E6C594] transition-colors font-medium">{hub.phone}</a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* VIP Support Box */}
              <div className="bg-gradient-to-r from-[#0A1128] to-[#101B3B] border border-[#D4AF37]/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
                <div>
                  <span className="inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">24/7 Dedicated Line</span>
                  <h4 className="font-serif font-bold text-white text-base">VIP Customer Care ({country.name})</h4>
                  <p className="text-slate-400 text-xs">Instant consultation with our private estate dispatchers.</p>
                </div>
                <a href={`tel:${country.phone}`} className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition-all shadow-md">
                  <PhoneCall className="w-4 h-4" />
                  <span>Direct Hotline</span>
                </a>
              </div>
            </div>

            {/* Right Side: Interactive Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[#D4AF37]/30 bg-[#0E162B]/75 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#D4AF37]/10 rounded-full blur-2xl pointer-events-none" />

                <div className="mb-8">
                  <span className="text-[#E6C594] text-xs font-bold uppercase tracking-widest">{country.flag} Priority Dispatch</span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">Send an Exclusive Inquiry</h2>
                  <p className="text-slate-300 text-sm mt-1">Complete this form to receive a tailored eco-cleaning proposal in {country.currency} within 2 hours.</p>
                </div>

                {submitted ? (
                  <div className="py-12 text-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center text-xl font-bold">
                      ✓
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white">{country.name} Request Submitted</h3>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto">
                      Thank you! Our private concierge team in {country.name} will reach out to you shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alistair Sterling"
                          className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Phone / Mobile *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder={country.phone}
                          className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Selected {country.name} Region *</label>
                        <select
                          required
                          value={formData.region}
                          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                          className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        >
                          {country.regions.map((reg) => (
                            <option key={reg.id} value={reg.id}>{reg.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Eco-Service Type</label>
                        <select
                          value={formData.serviceType}
                          onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                          className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4AF37] transition-colors"
                        >
                          {country.serviceTypes.map((srv) => (
                            <option key={srv.id} value={srv.id}>{srv.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <DateTimeSection
                          date={date}
                          onDateChange={setDate}
                          time={time}
                          onTimeChange={setTime}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 uppercase tracking-wider mb-2">Specific Requirements or Message</label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={`Detail any specific eco-product requirements or property dimensions in ${country.name}...`}
                        className="w-full bg-[#050B18]/80 border border-[#D4AF37]/20 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="consent" required className="rounded bg-[#050B18] border-[#D4AF37]/30 text-[#D4AF37] focus:ring-[#D4AF37]" />
                      <label htmlFor="consent" className="text-xs text-slate-400">I consent to Pearly Sky processing my data for VIP service coordination in {country.name}.</label>
                    </div>

                    <button type="submit" className="w-full bg-gradient-to-r from-[#E5C158] via-[#D4AF37] to-[#B89320] text-[#050B18] font-bold py-4 rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 text-sm tracking-wide uppercase">
                      <Send className="w-4 h-4 text-[#050B18]" />
                      <span>Submit {country.name} Priority Request</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: INFINITE MARQUEE TICKER */}
      <div className="py-6 bg-[#0A1128]/90 border-y border-[#D4AF37]/20 overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050B18] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050B18] to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap animate-marquee">
          <div className="flex items-center gap-8 text-sm font-semibold tracking-wider text-slate-300 uppercase shrink-0">
            {country.marqueeCities.map((city, idx) => (
              <React.Fragment key={idx}>
                <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {city}</span>
                <span className="text-[#D4AF37]/30">•</span>
              </React.Fragment>
            ))}
          </div>
          <div className="flex items-center gap-8 text-sm font-semibold tracking-wider text-slate-300 uppercase shrink-0 ml-8">
            {country.marqueeCities.map((city, idx) => (
              <React.Fragment key={`dup-${idx}`}>
                <span className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> {city}</span>
                <span className="text-[#D4AF37]/30">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 3: INTERACTIVE LOCATIONS DIRECTORY & GRID */}
      <section id="locations" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[#E6C594] text-xs font-bold uppercase tracking-widest">Regional Network</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">{country.name} Locations Directory</h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">Filter our luxury eco-cleaning hubs across {country.name} to discover specialized services and direct regional contacts.</p>
          </div>

          {/* Filtering Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                activeFilter === 'all'
                  ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050B18] shadow-lg'
                  : 'border-[#D4AF37]/30 bg-[#0A1128] text-slate-300 hover:border-[#D4AF37] hover:text-[#E6C594]'
              }`}
            >
              All {country.name}
            </button>
            {country.regions.map((reg) => (
              <button
                key={reg.id}
                onClick={() => setActiveFilter(reg.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all border ${
                  activeFilter === reg.id
                    ? 'border-[#D4AF37] bg-[#D4AF37] text-[#050B18] shadow-lg'
                    : 'border-[#D4AF37]/30 bg-[#0A1128] text-slate-300 hover:border-[#D4AF37] hover:text-[#E6C594]'
                }`}
              >
                {reg.name}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div id="locationGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredHubs.map((hub, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#D4AF37]/20 bg-[#101B3B]/55 backdrop-blur-md overflow-hidden flex flex-col transition-all duration-400 hover:-translate-y-1.5 hover:border-[#D4AF37]/40 hover:shadow-2xl"
              >
                <div className="h-48 relative overflow-hidden bg-[#0A1128]">
                  <img
                    src={hub.image || "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"}
                    alt={hub.title}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-[#050B18]/40 to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-[#050B18]/80 border border-[#D4AF37]/40 text-[#E6C594] text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full backdrop-blur-md">
                    {hub.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-white">{hub.title}</h3>
                    <p className="text-slate-300 text-xs mt-3 leading-relaxed">
                      {hub.description || `Providing bespoke eco-cleaning and hospitality services across ${country.name}.`}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#D4AF37]/10 space-y-2">
                      <p className="text-xs text-slate-300 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span>{hub.address}</span>
                      </p>
                      <p className="text-xs text-slate-300 flex items-center gap-2">
                        <PhoneCall className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <a href={`tel:${hub.phone}`} className="hover:text-[#E6C594] transition-colors">{hub.phone}</a>
                      </p>
                    </div>
                  </div>
                  {hub.specializations && (
                    <div className="mt-6 pt-4 border-t border-[#D4AF37]/10">
                      <span className="block text-[10px] uppercase font-bold text-slate-400 mb-2">Primary Specializations:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {hub.specializations.map((spec, sIdx) => (
                          <span key={sIdx} className="bg-[#1A2954]/80 text-slate-300 text-[11px] px-2.5 py-1 rounded-md border border-[#D4AF37]/20">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: INTERACTIVE MAP VISUALIZER */}
      <section className="py-16 bg-[#0A1128]/50 border-y border-[#D4AF37]/15 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4">
              <span className="text-[#E6C594] text-xs font-bold uppercase tracking-widest">{country.name} Coverage</span>
              <h2 className="font-serif text-3xl font-bold text-white mt-1">Interactive Hub Visualizer</h2>
              <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                Inspect localized dispatch speed, supervisor contacts, and active team units across our regional network in {country.name}.
              </p>
              
              <div className="mt-6 rounded-2xl border border-[#D4AF37]/30 bg-[#101B3B]/55 p-5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#E6C594] font-bold">
                    <MapPinIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold text-white">{country.name} Central Desk</h4>
                    <p className="text-xs text-[#E6C594]">Primary Operations Dispatch</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  Serving premier metropolitan districts, luxury coastal villas, and high-altitude resorts with 24/7 priority support.
                </p>
                <div className="mt-4 pt-3 border-t border-[#D4AF37]/10 flex justify-between items-center text-xs text-slate-400">
                  <span>Status: <strong className="text-emerald-400">Active Duty</strong></span>
                  <span>Response: <strong className="text-[#E6C594]">&lt; 1 Hour</strong></span>
                </div>
              </div>
            </div>
            {/**Map */}
            <div className="lg:col-span-8">
              <div className="relative w-full h-[450px] rounded-3xl border border-[#D4AF37]/30 bg-[#050B18]/90 shadow-2xl overflow-hidden flex items-center justify-center backdrop-blur-md">
                
                {/* Grid Background */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />

                {/* Globe Silhouette Vector */}
                <div className="absolute inset-0 flex items-center justify-center opacity-15 pointer-events-none">
                  <Globe className="w-[320px] h-[320px] text-[#D4AF37]" />
                </div>

                {/* Dynamic Interactive Location Pins */}
                {country.code === 'fr' && (
                  <>
                    {/* 1. Paris Pin */}
                    <button className="absolute top-[32%] left-[48%] group focus:outline-none z-10">
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D4AF37] text-[#050B18] text-xs font-bold items-center justify-center shadow-lg">P</span>
                      </span>
                      <span className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#050B18] border border-[#D4AF37]/40 text-[#E6C594] text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Paris HQ
                      </span>
                    </button>

                    {/* 2. Riviera & Monaco Pin */}
                    <button className="absolute top-[75%] left-[76%] group focus:outline-none z-10">
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D4AF37] text-[#050B18] text-xs font-bold items-center justify-center shadow-lg">R</span>
                      </span>
                      <span className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#050B18] border border-[#D4AF37]/40 text-[#E6C594] text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Riviera &amp; Monaco
                      </span>
                    </button>

                    {/* 3. Alpine Resorts Pin */}
                    <button className="absolute top-[62%] left-[70%] group focus:outline-none z-10">
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D4AF37] text-[#050B18] text-xs font-bold items-center justify-center shadow-lg">A</span>
                      </span>
                      <span className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#050B18] border border-[#D4AF37]/40 text-[#E6C594] text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Alpine Resorts
                      </span>
                    </button>

                    {/* 4. Bordeaux Pin */}
                    <button className="absolute top-[65%] left-[32%] group focus:outline-none z-10">
                      <span className="relative flex h-6 w-6">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-6 w-6 bg-[#D4AF37] text-[#050B18] text-xs font-bold items-center justify-center shadow-lg">B</span>
                      </span>
                      <span className="absolute top-7 left-1/2 -translate-x-1/2 bg-[#050B18] border border-[#D4AF37]/40 text-[#E6C594] text-[10px] font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                        Bordeaux
                      </span>
                    </button>

                    {/* 5. Deauville Pin */}
                    <button className="absolute top-[25%] left-[36%] group focus:outline-none z-10">
                      <span className="relative flex h-5 w-5">
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-[#101B3B] border border-[#D4AF37] text-[#E6C594] text-[10px] font-bold items-center justify-center">N</span>
                      </span>
                      <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#050B18] border border-[#D4AF37]/40 text-slate-300 text-[9px] font-medium px-1.5 py-0.5 rounded whitespace-nowrap">
                        Deauville
                      </span>
                    </button>
                  </>
                )}

                {/* Fallback Pin Display for other selected jurisdictions (UK / LK) */}
                {country.code !== 'fr' && (
                  <div className="relative z-10 text-center p-8 space-y-3">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#E6C594] text-sm font-semibold">
                      <Sparkles className="w-4 h-4 text-[#D4AF37]" /> {country.flag} Active Network Node: {country.name}
                    </span>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      All regional teams across {country.name} are fully deployed and active.
                    </p>
                  </div>
                )}

                {/* Bottom Legend Badge */}
                <div className="absolute bottom-4 left-4 z-20 bg-[#050B18]/90 border border-[#D4AF37]/20 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 backdrop-blur-md flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Interactive {country.name} Map — Live Regional Nodes</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECO-CERTIFICATIONS BADGES BANNER */}
      <section className="py-12 border-b border-[#D4AF37]/15 bg-[#050B18]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#E6C594] mb-8">Certified Eco-Luxury Excellence across {country.name}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/55 p-5 backdrop-blur-md">
              <Award className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">Green Compass Certified</h4>
              <p className="text-slate-400 text-xs mt-1">100% biodegradable formulations</p>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/55 p-5 backdrop-blur-md">
              <Sparkles className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">Pet & Family Safe</h4>
              <p className="text-slate-400 text-xs mt-1">Zero harsh chemical residues</p>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/55 p-5 backdrop-blur-md">
              <ShieldCheck className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">Strict Confidentiality</h4>
              <p className="text-slate-400 text-xs mt-1">Vetted white-glove specialists</p>
            </div>
            <div className="rounded-2xl border border-[#D4AF37]/20 bg-[#0E162B]/55 p-5 backdrop-blur-md">
              <Clock className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <h4 className="font-bold text-white text-sm">Sustainable Operations</h4>
              <p className="text-slate-400 text-xs mt-1">Zero water waste technologies</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );

}

/* <LocationCard
              key={loc.id}
              location={loc}
              isOpen={openLocationId === loc.id}
              onToggle={() => handleToggle(loc.id)}
            /> */