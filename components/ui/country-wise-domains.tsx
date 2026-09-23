"use client"

import { ExternalLink, Check, Search, Globe, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export interface Country {
  id: string;
  name: string;
  domain: string;
  flagCode: string;
  isLive: boolean;
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
    gb: "/images/flags/uk.webp",
    fr: "/images/flags/france.webp",
    de: "/images/flags/denmark.webp",
    it: "/images/flags/italy.webp",
    lu: "/images/flags/luxembourg.webp",
    be: "/images/flags/belgium.webp",
    at: "/images/flags/austria.webp",
    pl: "/images/flags/poland.webp",
    fi: "/images/flags/finland.webp",
    ie: "/images/flags/ireland.webp",
    gb_scot: "/images/flags/scotland.webp",
    es: "/images/flags/spain.webp",
    no: "/images/flags/no.png",
    ch: "/images/flags/switzerland.webp",
    pt: "/images/flags/portugal.webp",
    ee: "/images/flags/ee.png",
    au: "/images/flags/australia.webp",
    nz: "/images/flags/newzealand.webp",
    ca: "/images/flags/canada.webp",
    us: "/images/flags/us.webp",
    ae: "/images/flags/ae.png",
    qa: "/images/flags/qatar.webp",
    sa: "/images/flags/soudi.png",
    bh: "/images/flags/bahrain.png",
    om: "/images/flags/oman.png",
    lk: "/images/flags/srilanka.webp",
  };

  return (
    <Image
      height={15}
      width={20} 
      src={flags[code]} 
      alt={`${code} flag`} 
      className={className} 
      priority
    />
  );
};

const REGIONAL_DATA: Region[] = [
  {
    region: "Europe Union",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    containerWidth: "lg:w-2/3",
    countries: [
      { id: "gb", isLive: true, name: "United Kingdom", domain: "pearlyskyglobalclean.co.uk", flagCode: "gb" },
      { id: "fr", isLive: true, name: "France", domain: "pearlyskyglobalclean.fr", flagCode: "fr" },
      { id: "de", isLive: false, name: "Germany", domain: "coming soon...", flagCode: "de" },
      { id: "it", isLive: false, name: "Italy", domain: "coming soon...", flagCode: "it" },
      { id: "lu", isLive: false, name: "Luxembourg", domain: "coming soon...", flagCode: "lu" },
      { id: "be", isLive: false, name: "Belgium", domain: "coming soon...", flagCode: "be" },
      { id: "at", isLive: false, name: "Austria", domain: "coming soon...", flagCode: "at" },
      { id: "pl", isLive: false, name: "Poland", domain: "coming soon...", flagCode: "pl" },
      { id: "fi", isLive: false, name: "Finland", domain: "coming soon...", flagCode: "fi" },
      { id: "ie", isLive: false, name: "Ireland", domain: "coming soon...", flagCode: "ie" },
      { id: "scot", isLive: false, name: "Scotland", domain: "coming soon...", flagCode: "gb_scot" },
      { id: "es", isLive: false, name: "Spain", domain: "coming soon...", flagCode: "es" },
      { id: "no", isLive: false, name: "Norway", domain: "coming soon...", flagCode: "no" },
      { id: "ch", isLive: false, name: "Switzerland", domain: "coming soon...", flagCode: "ch" },
      { id: "pt", isLive: false, name: "Portugal", domain: "pcoming soon...", flagCode: "pt" },
      { id: "ee", isLive: false, name: "Estonia", domain: "coming soon...", flagCode: "ee" },
    ],
  },
  {
    region: "Australia & New Zealand",
    gridCols: "grid-cols-2 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "au", isLive: false, name: "Australia", domain: "coming soon...", flagCode: "au" },
      { id: "nz", isLive: false, name: "New Zealand", domain: "coming soon...", flagCode: "nz" },
    ],
  },
  {
    region: "North America",
    gridCols: "grid-cols-1 sm:grid-cols-2",
    containerWidth: "lg:w-1/3",
    countries: [
      { id: "ca", isLive: false, name: "Canada", domain: "coming soon...", flagCode: "ca" },
      { id: "us", isLive: false, name: "United States of America", domain: "coming soon...", flagCode: "us" },
    ],
  },
  {
    region: "Middle East & Asia",
    gridCols: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
    containerWidth: "lg:w-2/3",
    countries: [
      { id: "ae", isLive: false, name: "United Arab Emirates", domain: "coming soon...", flagCode: "ae" },
      { id: "qa", isLive: false, name: "Qatar", domain: "coming soon...", flagCode: "qa" },
      { id: "sa", isLive: false, name: "Saudi Arabia", domain: "coming soon...", flagCode: "sa" },
      { id: "bh", isLive: false, name: "Bahrain", domain: "coming soon...", flagCode: "bh" },
      { id: "om", isLive: false, name: "Oman", domain: "coming soon...", flagCode: "om" },
      { id: "lk", isLive: true, name: "Sri Lanka", domain: "Pearlyskyglobalclean.lk", flagCode: "lk" },
    ],
  },
];

export default function CountryWiseDomains(): React.JSX.Element {
  const [selectedCountry, setSelectedCountry] = useState<string>("au");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSelect = (id: string): void => {
    if (selectedCountry === id) {
      setSelectedCountry("");
    } else {
      setSelectedCountry(id);
    }
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
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#3c301e 0.75px, transparent 0.75px)`,
          backgroundSize: '16px 16px'
        }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header Title Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/60 text-stone-700 text-xs tracking-wider uppercase font-medium mb-3 border border-stone-300/40">
            <Globe className="w-3.5 h-3.5 text-amber-700" />
            Global Network
          </div>
          <h1 id="ausieurope" className="text-2xl sm:text-4xl font-serif tracking-tight text-stone-900 font-normal">
            Select Your Regional Store
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 font-light">
            Choose your local Pearly Sky destination for tailored pricing, localized shipping, and currency options.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-md mx-auto" >
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
          
          {/* EUROPE + AUSTRALIA & NEW ZEALAND (side by side on lg+) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
            
            {/* Europe Union */}
            {REGIONAL_DATA.slice(0, 1).map((regionGroup) => {
              const filteredCountries = regionGroup.countries.filter(
                c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     c.domain.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredCountries.length === 0) return null;

              return (
                <div key={regionGroup.region} id="europe" className="lg:col-span-9 space-y-3 scroll-mt-24 sm:scroll-mt-28">
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
                        isSelected={selectedCountry === country.id || selectedCountry !== country.id }
                        onSelect={() => handleSelect(country.id)}
                        onVisit={(e) => handleVisit(e, country.domain)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          

            {/* Australia & New Zealand */}
            {REGIONAL_DATA.slice(1, 2).map((regionGroup) => {
              const filteredCountries = regionGroup.countries.filter(
                c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     c.domain.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredCountries.length === 0) return null;

              return (
                <div key={regionGroup.region} id="australia" className="lg:col-span-3 space-y-3 scroll-mt-24 sm:scroll-mt-28">
                  <div className="flex items-center gap-4">
                    <h2 className="text-base sm:text-lg font-serif text-stone-800 font-medium tracking-wide">
                      {regionGroup.region}
                    </h2>
                    <div className="h-px bg-stone-300/60 flex-1" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5 sm:gap-3">
                    {filteredCountries.map((country) => (
                      <CountryCard
                        key={country.id}
                        country={country}
                        isSelected={selectedCountry === country.id || selectedCountry !== country.id }
                        onSelect={() => handleSelect(country.id)}
                        onVisit={(e) => handleVisit(e, country.domain)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* NORTH AMERICA & MIDDLE EAST/ASIA */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10" >
            
            {/* North America */}
            {REGIONAL_DATA.slice(2, 3).map((regionGroup) => {
              const filteredCountries = regionGroup.countries.filter(
                c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     c.domain.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (searchQuery && filteredCountries.length === 0) return null;

              return (
                <div key={regionGroup.region} id="north-america" className="lg:col-span-4 space-y-3 scroll-mt-24 sm:scroll-mt-28">
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
                <div key={regionGroup.region} id="middle-east" className="lg:col-span-8 space-y-3 scroll-mt-24 sm:scroll-mt-28">
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
                        isSelected={selectedCountry === country.id || selectedCountry !== country.id}
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
  
  if (!country.isLive) {
    return (
      <div
        onClick={onSelect}
        
        className="group  relative bg-white/80 hover:bg-white border border-stone-200/80 hover:border-amber-700/30 rounded-xl p-3 sm:p-3.5 shadow-2xs hover:shadow-sm transition-all cursor-pointer flex items-center justify-between min-h-[58px]"
      >
        <div className="absolute -top-0.5 -left-0.5 flex items-center gap-1.5">
          <span className="relative flex size-3">
            <span className={`absolute inline-flex h-full w-full ${country.isLive ? 'animate-ping' : 'animate-none'} rounded-full ${country.isLive ? 'bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
            <span className={`relative inline-flex size-3 rounded-full ${country.isLive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="shrink-0">
            <CountryFlag code={country.flagCode} className="w-5 h-3.5 sm:w-6 sm:h-4 rounded-2xs object-cover shadow-2xs border border-stone-200" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-normal text-stone-800 leading-snug truncate group-hover:text-amber-900 transition-colors">
              {country.name}
            </h3>
            <p className={`text-[11px] text-stone-400 font-mono leading-tight truncate  ${!country.isLive ? 'text-stone-400 animate-pulse' : 'text-stone-400'}`}>
              {country.domain}
            </p>
          </div>
        </div>

        <div className="shrink-0 text-stone-300 group-hover:text-amber-800/70 transition-colors pl-1">
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  if (isSelected) {
    return (
      <div 
        onClick={onSelect}
        className="relative bg-gradient-to-b from-[#EBDCB9] to-[#DFCB9F] border-2 border-[#BFA46F] rounded-xl p-3.5 shadow-md transition-all cursor-pointer transform scale-[1.02] z-10 flex flex-col justify-between min-h-[110px]"
      >
        {/* Checkmark Badge */}
        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full   flex items-center justify-center shadow-xs">
          
          <span className="relative flex size-3">
            <span className={`absolute inline-flex h-full w-full ${country.isLive ? 'animate-ping' : 'animate-none'} rounded-full ${country.isLive ? 'bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
            <span className={`relative inline-flex size-3 rounded-full ${country.isLive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
          </span>
        
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
            className={`w-full ${country.isLive ? 'bg-gradient-to-r from-[#A0804D] to-[#8A6A39] hover:from-[#8C6D3B] hover:to-[#78592A]' : 'opacity-99 cursor-not-allowed bg-gradient-to-r from-[#A0804D] to-[#8A6A39]'}  text-amber-50 font-medium text-xs py-1.5 px-3 rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]`}
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
      <div className="absolute -top-0.5 -left-0.5 flex items-center gap-1.5">
        <span className="relative flex size-3">
          <span className={`absolute inline-flex h-full w-full ${country.isLive ? 'animate-ping' : 'animate-none'} rounded-full ${country.isLive ? 'bg-green-400' : 'bg-gray-400'} opacity-75`}></span>
          <span className={`relative inline-flex size-3 rounded-full ${country.isLive ? 'bg-green-500' : 'bg-gray-500'}`}></span>
        </span>
      </div>
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