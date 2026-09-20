"use client"

import { ExternalLink, Check, Search, Globe, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export interface Country {
  id: string;
  name: string;
  domain: string;
  flagCode: string;
}

export interface Region {
  region: string;
  gridCols: string;
  containerWidth?: string;
  countries: Country[];
}

interface CountryFlagProps {
  code: string;
  className?: string;
}

interface CountryCardProps {
  country: Country;
  isSelected: boolean;
  onSelect: () => void;
  onVisit: (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => void;
}

const CountryFlag: React.FC<CountryFlagProps> = ({ 
  code, 
  className = "w-6 h-4 rounded-sm object-cover shadow-xs stroke-black/10" 
}) => {
  const flags: Record<string, string> = {
    gb: "https://flagcdn.com/w80/gb.png",
    fr: "https://flagcdn.com/w80/fr.png",
    de: "https://flagcdn.com/w80/de.png",
    it: "https://flagcdn.com/w80/it.png",
    lu: "https://flagcdn.com/w80/lu.png",
    be: "https://flagcdn.com/w80/be.png",
    at: "https://flagcdn.com/w80/at.png",
    pl: "https://flagcdn.com/w80/pl.png",
    fi: "https://flagcdn.com/w80/fi.png",
    ie: "https://flagcdn.com/w80/ie.png",
    gb_scot: "https://flagcdn.com/w80/gb-sct.png",
    es: "https://flagcdn.com/w80/es.png",
    no: "https://flagcdn.com/w80/no.png",
    ch: "https://flagcdn.com/w80/ch.png",
    pt: "https://flagcdn.com/w80/pt.png",
    ee: "https://flagcdn.com/w80/ee.png",
    au: "https://flagcdn.com/w80/au.png",
    nz: "https://flagcdn.com/w80/nz.png",
    ca: "https://flagcdn.com/w80/ca.png",
    us: "https://flagcdn.com/w80/us.png",
    ae: "https://flagcdn.com/w80/ae.png",
    qa: "https://flagcdn.com/w80/qa.png",
    sa: "https://flagcdn.com/w80/sa.png",
    bh: "https://flagcdn.com/w80/bh.png",
    om: "https://flagcdn.com/w80/om.png",
    lk: "https://flagcdn.com/w80/lk.png",
  };

  return (
    <img 
      src={flags[code] || "https://flagcdn.com/w80/un.png"} 
      alt={`${code} flag`} 
      className={className} 
      loading="lazy" 
    />
  );
};

const REGIONAL_DATA: Region[] = [
  {
    region: "Europe",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    countries: [
      { id: "gb", name: "United Kingdom", domain: "pearlysky.co.uk", flagCode: "gb" },
      { id: "fr", name: "France", domain: "pearlysky.fr", flagCode: "fr" },
      { id: "de", name: "Germany", domain: "pearlysky.de", flagCode: "de" },
      { id: "it", name: "Italy", domain: "pearlysky.it", flagCode: "it" },
      { id: "lu", name: "Luxembourg", domain: "pearlysky.lu", flagCode: "lu" },
      { id: "be", name: "Belgium", domain: "pearlysky.be", flagCode: "be" },
      { id: "at", name: "Austria", domain: "pearlysky.at", flagCode: "at" },
      { id: "pl", name: "Poland", domain: "pearlysky.pl", flagCode: "pl" },
      { id: "fi", name: "Finland", domain: "pearlysky.fi", flagCode: "fi" },
      { id: "ie", name: "Ireland", domain: "pearlysky.ie", flagCode: "ie" },
      { id: "scot", name: "Scotland", domain: "pearlysky.scot", flagCode: "gb_scot" },
      { id: "es", name: "Spain", domain: "pearlysky.es", flagCode: "es" },
      { id: "no", name: "Norway", domain: "pearlysky.no", flagCode: "no" },
      { id: "ch", name: "Switzerland", domain: "pearlysky.ch", flagCode: "ch" },
      { id: "pt", name: "Portugal", domain: "pearlysky.pt", flagCode: "pt" },
      { id: "ee", name: "Estonia", domain: "pearlysky.ee", flagCode: "ee" },
    ],
  },
  {
    region: "Australia & New Zealand",
    gridCols: "grid-cols-1 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "au", name: "Australia", domain: "pearlysky.com.au", flagCode: "au" },
      { id: "nz", name: "New Zealand", domain: "pearlysky.co.nz", flagCode: "nz" },
    ],
  },
  {
    region: "North America",
    gridCols: "grid-cols-1 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "ca", name: "Canada", domain: "pearlysky.ca", flagCode: "ca" },
      { id: "us", name: "United States of America", domain: "pearlysky.com", flagCode: "us" },
    ],
  },
  {
    region: "Middle East & Asia",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6",
    containerWidth: "lg:w-2/3",
    countries: [
      { id: "ae", name: "United Arab Emirates", domain: "pearlysky.ae", flagCode: "ae" },
      { id: "qa", name: "Qatar", domain: "pearlysky.qa", flagCode: "qa" },
      { id: "sa", name: "Saudi Arabia", domain: "pearlysky.sa", flagCode: "sa" },
      { id: "bh", name: "Bahrain", domain: "pearlysky.bh", flagCode: "bh" },
      { id: "om", name: "Oman", domain: "pearlysky.om", flagCode: "om" },
      { id: "lk", name: "Sri Lanka", domain: "pearlysky.lk", flagCode: "lk" },
    ],
  },
];

export default function CountryWiseDomains(): React.JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string>("au"); // Australia default selected
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelect = (id: string): void => {
    setSelectedCountry(id);
  };

  const handleVisit = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>, domain: string): void => {
    e.stopPropagation();
    window.open(`https://${domain}`, "_blank", "noopener,noreferrer");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#332e27] font-sans antialiased relative overflow-x-hidden selection:bg-amber-200">
      {/* Soft Silk Ambient Background Textures */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F3] via-[#F4F0E6] to-[#EFEBE0] opacity-80 pointer-events-none" />
       */}<div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#3c301e 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px'
        }}
      />

      {/* Decorative Eucalyptus Leaves Framing (Left Edge) */}
      {/* <div className="hidden xl:block fixed left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-64 h-[700px] pointer-events-none z-10 opacity-75 mix-blend-multiply">
        <svg viewBox="0 0 200 600" className="w-full h-full text-[#4a5843]/60 fill-current">
          <path d="M-50,0 C20,100 40,200 -20,300 C-80,400 30,500 -10,600" fill="none" stroke="#5d6c55" strokeWidth="4" />
          <path d="M10,80 C50,60 90,90 70,120 C40,130 0,110 10,80 Z" opacity="0.8" />
          <path d="M-10,180 C40,160 80,190 50,220 C20,230 -20,200 -10,180 Z" opacity="0.85" />
          <path d="M20,280 C80,250 110,290 80,330 C40,340 0,310 20,280 Z" opacity="0.9" />
          <path d="M-20,390 C30,370 70,410 40,440 C10,450 -30,420 -20,390 Z" opacity="0.8" />
          <path d="M15,490 C65,470 95,510 65,540 C35,550 -5,520 15,490 Z" opacity="0.75" />
        </svg>
      </div> */}

      {/* Decorative Eucalyptus Leaves Framing (Right Edge) */}
      {/* <div className="hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 translate-x-12 w-64 h-[700px] pointer-events-none z-10 opacity-75 mix-blend-multiply">
        <svg viewBox="0 0 200 600" className="w-full h-full text-[#4a5843]/60 fill-current transform scale-x-[-1]">
          <path d="M-50,0 C20,100 40,200 -20,300 C-80,400 30,500 -10,600" fill="none" stroke="#5d6c55" strokeWidth="4" />
          <path d="M10,80 C50,60 90,90 70,120 C40,130 0,110 10,80 Z" opacity="0.8" />
          <path d="M-10,180 C40,160 80,190 50,220 C20,230 -20,200 -10,180 Z" opacity="0.85" />
          <path d="M20,280 C80,250 110,290 80,330 C40,340 0,310 20,280 Z" opacity="0.9" />
          <path d="M-20,390 C30,370 70,410 40,440 C10,450 -30,420 -20,390 Z" opacity="0.8" />
        </svg>
      </div>  */}

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs tracking-wider uppercase font-medium mb-3 border border-stone-300/40">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            Global Network
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 font-normal">
            Select Your Regional Store
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 font-light">
            Choose your local Pearly Sky destination for tailored pricing, localized shipping, and currency options.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search country or domain..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 border border-stone-300/70 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/30 focus:border-amber-700/50 shadow-xs transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 bg-stone-100 rounded-full px-2 py-0.5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="space-y-8 sm:space-y-10">
          
          {/* EUROPE */}
          {REGIONAL_DATA.slice(0, 1).map((regionGroup) => {
            const filteredCountries = regionGroup.countries.filter(
              c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   c.domain.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredCountries.length === 0) return null;

            return (
              <div key={regionGroup.region} className="space-y-3">
                <div className="flex items-center gap-4">
                  <h2 className="text-base sm:text-lg font-serif text-stone-800 font-medium tracking-wide">
                    {regionGroup.region}
                  </h2>
                  <div className="h-px bg-stone-300/60 flex-1" />
                </div>

                <div className={`grid ${regionGroup.gridCols} gap-2.5 sm:gap-3`}>
                  {filteredCountries.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      isSelected={selectedCountry === country.id}
                      onSelect={() => handleSelect(country.id)}
                      onVisit={(e) => handleVisit(e, country.domain)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* AUSTRALIA & NEW ZEALAND */}
          {REGIONAL_DATA.slice(1, 2).map((regionGroup) => {
            const filteredCountries = regionGroup.countries.filter(
              c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   c.domain.toLowerCase().includes(searchQuery.toLowerCase())
            );

            if (searchQuery && filteredCountries.length === 0) return null;

            return (
              <div key={regionGroup.region} className="space-y-3">
                <div className="flex items-center gap-4">
                  <h2 className="text-base sm:text-lg font-serif text-stone-800 font-medium tracking-wide">
                    {regionGroup.region}
                  </h2>
                  <div className="h-px bg-stone-300/60 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 sm:gap-3">
                  {filteredCountries.map((country) => (
                    <CountryCard
                      key={country.id}
                      country={country}
                      isSelected={selectedCountry === country.id}
                      onSelect={() => handleSelect(country.id)}
                      onVisit={(e) => handleVisit(e, country.domain)}
                    />
                  ))}
                </div>
              </div>
            );
          })}

          {/* NORTH AMERICA & MIDDLE EAST/ASIA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
            
            {/* North America */}
            {REGIONAL_DATA.slice(2, 3).map((regionGroup) => {
              const filteredCountries = regionGroup.countries.filter(
                c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     c.domain.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredCountries.length === 0) return null;

              return (
                <div key={regionGroup.region} className="lg:col-span-4 space-y-3">
                  <div className="flex items-center gap-4">
                    <h2 className="text-base sm:text-lg font-serif text-stone-800 font-medium tracking-wide">
                      {regionGroup.region}
                    </h2>
                    <div className="h-px bg-stone-300/60 flex-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                    {filteredCountries.map((country) => (
                      <CountryCard
                        key={country.id}
                        country={country}
                        isSelected={selectedCountry === country.id}
                        onSelect={() => handleSelect(country.id)}
                        onVisit={(e) => handleVisit(e, country.domain)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Middle East & Asia */}
            {REGIONAL_DATA.slice(3, 4).map((regionGroup) => {
              const filteredCountries = regionGroup.countries.filter(
                c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     c.domain.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredCountries.length === 0) return null;

              return (
                <div key={regionGroup.region} className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-4">
                    <h2 className="text-base sm:text-lg font-serif text-stone-800 font-medium tracking-wide">
                      {regionGroup.region}
                    </h2>
                    <div className="h-px bg-stone-300/60 flex-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-3">
                    {filteredCountries.map((country) => (
                      <CountryCard
                        key={country.id}
                        country={country}
                        isSelected={selectedCountry === country.id}
                        onSelect={() => handleSelect(country.id)}
                        onVisit={(e) => handleVisit(e, country.domain)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}

          </div>

        </div>


      </div>
    </div>
  );
}

const CountryCard: React.FC<CountryCardProps> = ({ 
  country, 
  isSelected, 
  onSelect, 
  onVisit 
}) => {
  if (isSelected) {
    return (
      <div 
        onClick={onSelect}
        className="relative bg-gradient-to-b from-[#EBDCB9] to-[#DFCB9F] border-2 border-[#BFA46F] rounded-xl p-3.5 shadow-md transition-all cursor-pointer transform scale-[1.02] z-10 flex flex-col justify-between min-h-[110px]"
      >
        {/* Checkmark Badge */}
        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-[#3B2C1A] text-amber-200 flex items-center justify-center shadow-xs">
          <Check className="w-3 h-3 stroke-[3]" />
        </div>

        {/* Country Details Header */}
        <div className="flex items-start gap-2.5 pr-6">
          <div className="mt-0.5 shrink-0">
            <CountryFlag code={country.flagCode} className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-2xs object-cover shadow-xs border border-amber-900/10" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-[#2C2114] leading-snug truncate">
              {country.name}
            </h3>
            <p className="text-[11px] text-[#5C4B33] font-mono leading-tight truncate mt-0.5">
              {country.domain}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-3">
          <button
            onClick={onVisit}
            className="w-full bg-gradient-to-r from-[#A0804D] to-[#8A6A39] hover:from-[#8C6D3B] hover:to-[#78592A] text-amber-50 font-medium text-xs py-1.5 px-3 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
          >
            <span>Visit local website</span>
            <ChevronRight className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onSelect}
      className="group relative bg-white/80 hover:bg-white border border-stone-200/80 hover:border-amber-700/30 rounded-xl p-3 sm:p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between min-h-[58px]"
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="shrink-0">
          <CountryFlag code={country.flagCode} className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-2xs object-cover shadow-2xs border border-stone-200" />
        </div>
        <div className="min-w-0">
          <h3 className="text-xs sm:text-sm font-normal text-stone-800 leading-snug truncate group-hover:text-amber-900 transition-colors">
            {country.name}
          </h3>
          <p className="text-[11px] text-stone-400 font-mono leading-tight truncate">
            {country.domain}
          </p>
        </div>
      </div>

      <div className="shrink-0 text-stone-300 group-hover:text-amber-800/70 transition-colors pl-1">
        <ExternalLink className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};