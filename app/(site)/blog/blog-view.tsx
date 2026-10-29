"use client";

import Image from "next/image";
import Link from "@/components/locale-link";
import { PageHero } from "@/components/page-hero";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n/language-context";
import { formatBlogDate, getBlogPosts } from "@/lib/content/blog-posts";
import { ArrowLeft } from "lucide-react";

import { 
  Search, 
  Phone, 
  Mail, 
  Globe, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  ArrowRight, 
  X, 
  Crown, 
  Gem, 
  MapPin, 
  CalendarCheck, 
  Calculator, 
  CheckCircle2, 
  ChevronRight,
  Menu
} from 'lucide-react';
import React,{ useMemo, useState } from "react";
import { countryBlogData, 
  CountryCode, 
  CountryBlogProfile, 
  Article } from "@/lib/content/webpage contents/countryBlogData";
import { CURRENT_COUNTRY } from "@/lib/countries/config";

export function BlogView() {
  const { translate, language } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('fr');
  const country: CountryBlogProfile = countryBlogData[CURRENT_COUNTRY as 'fr' | 'uk' | 'lk'];

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Modal states
  const [activeArticleModal, setActiveArticleModal] = useState<Article | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    scale: 'villa',
    notes: ''
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filter articles based on category and search query
  const filteredArticles = useMemo(() => {
    return country.articles.filter((art) => {
      const matchesCategory = activeCategory === 'All' || art.category === activeCategory;
      const matchesSearch = 
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.region.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [country, activeCategory, searchQuery]);

  return (
    <div className="bg-[#050b18] text-slate-100 font-sans antialiased min-h-screen flex flex-col justify-between selection:bg-[#d4af37] selection:text-[#050b18]">
      

      <main className="flex-grow">
        
        {/* HERO SECTION */}
        <section id="home" className="relative py-20 lg:py-5 overflow-hidden bg-gradient-to-b from-[#0a1128] via-[#050b18] to-[#050b18] border-b border-[#d4af37]/10">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a1128]/80 border border-[#d4af37]/30 text-[#d4af37] text-xs tracking-widest uppercase mb-6 font-semibold shadow-sm backdrop-blur-md">
              <Crown className="w-3.5 h-3.5 text-[#d4af37]" /> {country.tagline}
            </div>
            
            <h1 className="font-serif text-5xl md:text-6xl lg:text-6xl font-normal tracking-tight text-slate-100 max-w-4xl mx-auto leading-tight">
              {country.heroTitle} <br />
              <span className="italic font-serif bg-gradient-to-r from-[#fff1b0] via-[#d4af37] to-[#997400] bg-clip-text text-transparent">{country.heroHighlight}</span>
            </h1>

            <p className="mt-6 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
              {country.heroDescription}
            </p>

            {/* SEARCH & CATEGORY FILTER BAR */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="relative bg-[#0a1128]/80 rounded-2xl p-2 shadow-2xl mb-8 flex items-center border border-[#d4af37]/30 backdrop-blur-md">
                <Search className="w-5 h-5 text-[#d4af37] ml-4 mr-3 shrink-0" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${country.name} journal articles, regions, keywords...`} 
                  className="w-full bg-transparent text-slate-100 placeholder-slate-400 text-sm focus:outline-none py-2 pr-4 font-sans"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-[#d4af37] text-sm px-3">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                {country.categories.map((cat) => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-300 border ${
                      activeCategory === cat 
                        ? 'border-[#d4af37] bg-[#d4af37] text-[#050b18] font-semibold shadow-md' 
                        : 'border-[#d4af37]/20 bg-[#0a1128]/60 text-slate-300 hover:border-[#d4af37]/60 hover:text-[#d4af37]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED ARTICLE SPOTLIGHT */}
        <section className="py-12 bg-[#050b18] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#040814] rounded-2xl border border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-2xl">
              
              {/* Left Spotlight Image Column */}
              <div className="lg:col-span-7 relative min-h-[340px] sm:min-h-[420px] bg-slate-900 overflow-hidden">
                <img 
                  src={country.spotlightArticle.image} 
                  alt={country.spotlightArticle.title} 
                  className="w-full h-full object-cover"
                />
                {/* Crown Badge */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 bg-[#0a1128]/80 backdrop-blur-md border border-[#c9a858]/30 px-3 py-1 rounded-full text-[#c9a858]">
                  <Crown className="w-3 h-3" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">FEATURED SPOTLIGHT</span>
                </div>
              </div>

              {/* Right Spotlight Content Column */}
              <div className="lg:col-span-5 bg-[#050b18] p-8 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800/80">
                <div>
                  {/* Metadata Bar */}
                  <div className="flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[#c9a858] uppercase mb-4">
                    <span>{country.spotlightArticle.category}</span>
                    <span>•</span>
                    <span>{country.spotlightArticle.region}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-400 font-normal lowercase flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c9a858]" /> {country.spotlightArticle.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl text-slate-100 font-bold leading-tight mb-5">
                    {country.spotlightArticle.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light mb-8">
                    {country.spotlightArticle.excerpt}
                  </p>
                </div>

                {/* Author Footer & Action Button */}
                <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={country.spotlightArticle.author.avatar} 
                      alt={country.spotlightArticle.author.name} 
                      className="w-9 h-9 rounded-full object-cover border border-[#c9a858]/40" 
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{country.spotlightArticle.author.name}</div>
                      <div className="text-[10px] text-slate-400">{country.spotlightArticle.author.role}</div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveArticleModal(country.spotlightArticle)}
                    className="text-xs font-bold text-[#c9a858] tracking-wider uppercase hover:text-[#e6c251] transition-colors flex items-center gap-1.5"
                  >
                    <span>READ ARTICLE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ARTICLES GRID */}
        <section id="journal" className="py-16 bg-[#030712] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-[#d4af37] font-bold">Curated Journal Entries</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-slate-100 font-normal mt-2">Latest Insights & Guidelines ({country.name})</h2>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm max-w-md mt-3 md:mt-0 font-light">
                Tailored specifically for private estate managers, homeowners, hoteliers, and captains seeking zero-chemical pristine standards.
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((art) => (
                <article 
                  key={art.id}
                  className="bg-[#0a1128]/65 backdrop-blur-md border border-[#d4af37]/20 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 hover:border-[#d4af37]/40 hover:shadow-2xl group"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden bg-[#0a1128]">
                      <img src={art.image} alt={art.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute top-3 left-3 bg-[#030712]/80 backdrop-blur-md border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {art.category}
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[11px] text-slate-400 mb-3">
                          <span><Calendar className="w-3 h-3 text-[#d4af37] inline mr-1" /> {art.date}</span>
                          <span><Clock className="w-3 h-3 text-[#d4af37] inline mr-1" /> {art.readTime}</span>
                        </div>
                        <h3 
                          onClick={() => setActiveArticleModal(art)}
                          className="font-serif text-xl text-slate-100 font-medium mb-3 leading-snug hover:text-[#d4af37] transition-colors cursor-pointer line-clamp-2"
                        >
                          {art.title}
                        </h3>
                        <p className="text-slate-300 text-xs leading-relaxed font-light line-clamp-3 mb-4">
                          {art.excerpt}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-4 border-t border-[#d4af37]/10 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <img src={art.author.avatar} alt={art.author.name} className="w-7 h-7 rounded-full border border-[#d4af37]/40 object-cover" />
                      <span className="text-[11px] text-slate-300">{art.author.name}</span>
                    </div>
                    <button 
                      onClick={() => setActiveArticleModal(art)}
                      className="text-xs text-[#d4af37] font-semibold hover:underline flex items-center gap-1"
                    >
                      Read Post <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-16 bg-[#0a1128]/50 rounded-2xl border border-[#d4af37]/20">
                <Search className="w-12 h-12 text-[#d4af37]/40 mx-auto mb-3" />
                <h3 className="font-serif text-xl text-slate-200">No matching journal articles found</h3>
                <p className="text-slate-400 text-xs mt-1">Try refining your search keyword or switching category filters.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} 
                  className="mt-4 px-4 py-2 border border-[#d4af37]/40 text-[#d4af37] text-xs rounded-full hover:bg-[#d4af37]/10 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CONTINUOUS INFINITE MARQUEE TICKER */}
        <div className="bg-[#030712] border-y border-[#d4af37]/20 py-4 overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712] to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#030712] to-transparent z-10 pointer-events-none"></div>

          <div className="flex whitespace-nowrap animate-marquee">
            <div className="flex items-center space-x-8 text-xs font-serif uppercase tracking-[0.25em] text-[#d4af37]/80 px-4">
              {country.marqueeLocations.map((loc, idx) => (
                <React.Fragment key={idx}>
                  <span>{loc}</span> <span className="text-[#d4af37]/30">•</span>
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center space-x-8 text-xs font-serif uppercase tracking-[0.25em] text-[#d4af37]/80 px-4">
              {country.marqueeLocations.map((loc, idx) => (
                <React.Fragment key={`dup-${idx}`}>
                  <span>{loc}</span> <span className="text-[#d4af37]/30">•</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

      </main>

      

      {/* READ ARTICLE MODAL */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030712]/85 backdrop-blur-md transition-opacity duration-300">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl border border-[#d4af37]/40 p-6 sm:p-10 shadow-2xl bg-[#0a1128] text-slate-100">
            
            {/* Close Modal Button */}
            <button 
              onClick={() => setActiveArticleModal(null)} 
              aria-label="Close modal"
              className="absolute top-5 right-5 text-slate-400 hover:text-[#d4af37] text-2xl focus:outline-none z-20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Selected Article Viewer */}
            <div id="modalArticleContent">
              
              {/* Category & Region Header */}
              {/* <span className="text-[#d4af37] text-xs font-semibold uppercase tracking-wider block">
                {activeArticleModal.category} • {activeArticleModal.region}
              </span> */}

              {/* Selected Article Title */}
              {/* <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3 leading-snug">
                {activeArticleModal.title}
              </h2> */}

              {/* Selected Article Author & Metadata */}
              {/* <div className="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20 flex-wrap">
                <div className="flex items-center gap-2">
                  <img 
                    src={activeArticleModal.author.avatar} 
                    alt={activeArticleModal.author.name} 
                    className="w-6 h-6 rounded-full border border-[#d4af37]/40 object-cover"
                  />
                  <span className="text-slate-200 font-medium">By {activeArticleModal.author.name}</span>
                </div>
                <span>•</span>
                <span><Calendar className="w-3.5 h-3.5 text-[#d4af37] inline mr-1" />{activeArticleModal.date}</span>
                <span>•</span>
                <span><Clock className="w-3.5 h-3.5 text-[#d4af37] inline mr-1" />{activeArticleModal.readTime}</span>
              </div> */}

              {/* Selected Article Main Image */}
              {/* <img 
                src={activeArticleModal.image} 
                alt={activeArticleModal.title} 
                className="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20 shadow-lg"
              /> */}

              {/* Selected Article Content Body */}
              {activeArticleModal.fullContent ? (
                <div 
                  className="space-y-4 text-slate-300 text-sm leading-relaxed font-light"
                  dangerouslySetInnerHTML={{ __html: activeArticleModal.fullContent }} 
                />
              ) : (
                <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                  <p className="text-base font-normal text-slate-200">{activeArticleModal.excerpt}</p>
                  <p>
                    Maintaining property standards in {activeArticleModal.region} requires specialized non-corrosive protocols, zero-VOC formulations, and precision organic cleaning agents designed specifically for high-end luxury interiors and materials.
                  </p>
                </div>
              )}

            </div>

            {/* Modal Footer Concierge CTA */}
            <div className="mt-8 hidden pt-6 border-t border-[#d4af37]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-xs text-slate-400 font-light">
                Need tailored care for your property in {country.name}?
              </span>
              <button 
                onClick={() => { setActiveArticleModal(null); setIsBookingOpen(true); }} 
                className="bg-gradient-to-r from-[#e6c251] via-[#d4af37] to-[#997400] text-[#050b18] font-bold px-6 py-2.5 rounded-xl text-xs uppercase tracking-wider hover:shadow-lg hover:shadow-[#d4af37]/20 transition-all flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Service For Your Estate</span>
              </button>
            </div>

          </div>
        </div>
      )}

      

      

    </div>
  );
}
