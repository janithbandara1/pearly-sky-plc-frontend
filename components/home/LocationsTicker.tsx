'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { CURRENT_COUNTRY } from '@/lib/countries/config';

interface LocationItem {
  name: string;
  bg: string;
}
 
const imgPath = "/images/hero/tikcer-images/" 

const locationsList: LocationItem[] = [
  { 
    name: "Paris", 
    bg: `${imgPath}img1.webp` },
  { 
    name: "Nice", 
    bg: `${imgPath}img2.webp` },
  { 
    name: "Saint-Tropez", 
    bg: `${imgPath}img3.webp` },
  { 
    name: "Antibes", 
    bg: `${imgPath}img4.webp` },
  { 
    name: "Cannes", 
    bg: `${imgPath}img5.webp` },
  { 
    name: "Monaco", 
    bg: `${imgPath}img6.webp` },
  { 
    name: "Normandy", 
    bg: `${imgPath}img7.webp` },
  { 
    name: "Deauville", 
    bg: `${imgPath}img8.webp` },
  { 
    name: "Dieppe", 
    bg: `${imgPath}img1.webp` },
  { 
    name: "La Rochelle", 
    bg: `${imgPath}img2.webp` },
  { 
    name: "Nantes", 
    bg: `${imgPath}img3.webp` },
  { 
    name: "Bordeaux", 
    bg: `${imgPath}img4.webp` },
  { 
    name: "Toulouse", 
    bg: `${imgPath}img5.webp` },
  { 
    name: "Toulon", 
    bg: `${imgPath}img6.webp` },
  { 
    name: "Montpellier", 
    bg: `${imgPath}img7.webp` },
  { 
    name: "Strasbourg", 
    bg: `${imgPath}img8.webp` },
  { 
    name: "Arcachon", 
    bg: `${imgPath}img2.webp` },
  { 
    name: "Annecy", 
    bg: `${imgPath}img1.webp` },
  { 
    name: "Biarritz", 
    bg: `${imgPath}img3.webp` },
  { 
    name: "Courchevel", 
    bg: `${imgPath}img4.webp` },
  { 
    name: "Megève", 
    bg: `${imgPath}img5.webp` },
  { 
    name: "Aix-en-Provence", 
    bg: `${imgPath}img6.webp` },
  { 
    name: "Mougins", 
    bg: `${imgPath}img7.webp` }
];


const locationsListLK: LocationItem[]=[
{
  name:"Colombo",
  bg:`${imgPath}img1.webp`
},
{
  name:"Sigiriya",
  bg:`${imgPath}img2.webp`
},
{
  name:"Arugam",
  bg:`${imgPath}img3.webp`
},
{
  name:"Kandy",
  bg:`${imgPath}img4.webp`
},
{
  name:"Ella",
  bg:`${imgPath}img5.webp`
},
{
  name:"Jaffna",
  bg:`${imgPath}img7.webp`
},
{
  name:"Galle",
  bg:`${imgPath}img1.webp`
},
{
  name:"Bentota",
  bg:`${imgPath}img2.webp`
},
{
  name:"Trincomalee",
  bg:`${imgPath}img1.webp`
},
{
  name:"Negombo",
  bg:`${imgPath}img2.webp`
},
{
  name:"Hikkaduwa",
  bg:`${imgPath}img3.webp`
},
{
  name:"Polonnaruwa",
  bg:`${imgPath}img4.webp`
},
{
  name:"Anuradhapura",
  bg:`${imgPath}img5.webp`
},
{
  name:"Mirissa",
  bg:`${imgPath}img6.webp`
},
{
  name:"Matara",
  bg:`${imgPath}img7.webp`
},
{
  name:"Badulla",
  bg:`${imgPath}img1.webp`
},
{
  name:"Unawatuna",
  bg:`${imgPath}img2.webp`
},
]

const countryBasedLocationList:Record<string,LocationItem[]>={
    "fr":locationsList,
    "lk":locationsListLK,
    "uk":locationsList
}

export default function LocationsTicker() {

    const dataList = countryBasedLocationList[CURRENT_COUNTRY]

  return (
    <section id="locations" className="py-8 bg-[#0b121e] overflow-hidden border-t border-b border-[#38311d]">
      
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>Service Locations Across France & Monaco</span>
        </h2>
        <span className="text-[11px] text-[#8e9eb5]">23 Key Luxury Destinations</span>
      </div>

      {/* Marquee Wrapper Container */}
      <div className="relative w-full flex overflow-x-hidden group select-none">
        <div className="flex w-max gap-3 animate-marquee-left whitespace-nowrap py-1 group-hover:[animation-play-state:paused]">
          
          {/* Double array map for endless seamless loop */}
          {[...dataList, ...dataList].map((loc, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2.5 bg-[#0e1726]/80 border border-[#1e293b] rounded-full px-3.5 py-1.5 hover:border-[#eab308] transition-colors shadow-md cursor-pointer shrink-0"
            >
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-[#d4af37] shrink-0">
                <Image
                  src={loc.bg}
                  alt={loc.name}
                  fill
                  sizes="24px"
                  className="object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-white tracking-wide">
                {loc.name}
              </span>
              <ArrowRight className="w-3 h-3 text-[#d4af37] shrink-0" />
            </div>
          ))}

        </div>
      </div>

      {/* Continuous Leftward Scrolling Animation */}
      <style jsx>{`
        @keyframes marqueeLeft {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
      `}</style>
    </section>
  );
}