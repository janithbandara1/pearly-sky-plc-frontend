'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, ArrowRight } from 'lucide-react';
import { CURRENT_COUNTRY } from '@/lib/countries/config';
import { getTranslatedWord } from '@/lib/content/webpage contents/home-page-data';
import { useLanguage } from '@/lib/i18n/language-context';

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

const lkImgPath = "/images/hero/tikcer-images/lk/img-lk-ticker-0"
const locationsListLK: LocationItem[]=[
{
  name:"Colombo",
  bg:`${lkImgPath}01.webp`
},
{
  name:"Sigiriya",
  bg:`${lkImgPath}02.webp`
},
{
  name:"Arugam",
  bg:`${lkImgPath}03.webp`
},
{
  name:"Kandy",
  bg:`${lkImgPath}04.webp`
},
{
  name:"Ella",
  bg:`${lkImgPath}05.webp`
},
{
  name:"Jaffna",
  bg:`${lkImgPath}06.webp`
},
{
  name:"Galle",
  bg:`${lkImgPath}07.webp`
},
{
  name:"Bentota",
  bg:`${lkImgPath}08.webp`
},
{
  name:"Trincomalee",
  bg:`${lkImgPath}09.webp`
},
{
  name:"Negombo",
  bg:`${lkImgPath}010.webp`
},
{
  name:"Hikkaduwa",
  bg:`${lkImgPath}011.webp`
},
{
  name:"Polonnaruwa",
  bg:`${lkImgPath}012.webp`
},
{
  name:"Anuradhapura",
  bg:`${lkImgPath}013.webp`
},
{
  name:"Mirissa",
  bg:`${imgPath}014.webp`
},
{
  name:"Matara",
  bg:`${imgPath}015.webp`
},
{
  name:"Badulla",
  bg:`${imgPath}016.webp`
},
{
  name:"Unawatuna",
  bg:`${imgPath}017.webp`
},
]

const countryBasedLocationList:Record<string,LocationItem[]>={
    "fr":locationsList,
    "lk":locationsListLK,
    "uk":locationsList
}

const HeaderBar:Record<string,string>={
  "fr":"locationsTitle",
  "lk":"Service Locations Across Sri Lanka",
  "uk":"Service Locations Across United Kingdom"
}

export default function LocationsTicker() {

    const dataList = countryBasedLocationList[CURRENT_COUNTRY]
    const headerText = HeaderBar[CURRENT_COUNTRY]
    const {translate}=useLanguage();
  return (
    <section id="locations" className="py-8 bg-[#0b121e] overflow-hidden border-t border-b border-[#38311d]">
      
      {/* Header Bar */}
      <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between">
        <h2 className="text-xs font-bold uppercase tracking-widest text-[#d4af37] flex items-center gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
          <span>{getTranslatedWord(CURRENT_COUNTRY, headerText, translate)}</span>
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