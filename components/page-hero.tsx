"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

interface PerHourPriceForCountry {
  country: string;
  name: string;
  price: number;
  currency: string;
  img: string;
}

const perHourPriceForCountry: PerHourPriceForCountry[] = [
  { country: "MON", name: "Monaco", price: 230.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 600'%3e%3cpath fill='%23FFF' d='M0 0h750v600H0z'/%3e%3cpath fill='%23CE1126' d='M0 0h750v300H0z'/%3e%3c/svg%3e" },
  { country: "LUX", name: "Luxembourg", price: 35.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1000 600'%3e%3cpath fill='%2300a1de' d='M0 300h1000v300H0z'/%3e%3cpath fill='%23ed2939' d='M0 0h1000v300H0z'/%3e%3cpath fill='%23fff' d='M0 200h1000v200H0z'/%3e%3c/svg%3e" },
  { country: "DKK", name: "Denmark", price: 230.00, currency: "DKK", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 600'%3e%3cpath fill='%23FFF' d='M0 0h750v600H0z'/%3e%3cpath fill='%23CE1126' d='M0 0h750v300H0z'/%3e%3c/svg%3e" },
  { country: "SWD", name: "Sweden", price: 350.00, currency: "KR", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 600'%3e%3cpath fill='%23FFF' d='M0 0h750v600H0z'/%3e%3cpath fill='%23CE1126' d='M0 0h750v300H0z'/%3e%3c/svg%3e" },
  { country: "FIN", name: "Finland", price: 32.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1800 1100'%3e%3cpath fill='%23fff' d='M0 0h1800v1100H0z'/%3e%3cpath fill='%23003580' d='M0 400h1800v300H0z'/%3e%3cpath fill='%23003580' d='M500 0h300v1100H500z'/%3e%3c/svg%3e" },
  { country: "NED", name: "Netherlands", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9 6'%3e%3cpath fill='%2321468B' d='M0 0h9v6H0z'/%3e%3cpath fill='%23FFF' d='M0 0h9v4H0z'/%3e%3cpath fill='%23AE1C28' d='M0 0h9v2H0z'/%3e%3c/svg%3e" },
  { country: "IRL", name: "Ireland", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 300'%3e%3cpath d='M0 752.362h200v300H0z' style='fill:%23169b62;fill-opacity:1;stroke:none' transform='translate(0 -752.362)'/%3e%3cpath d='M200 752.362h200v300H200z' style='fill:%23fff;fill-opacity:1;stroke:none' transform='translate(0 -752.362)'/%3e%3cpath d='M400 752.362h200v300H400z' style='fill:%23ff883e;fill-opacity:1;stroke:none' transform='translate(0 -752.362)'/%3e%3c/svg%3e" },
  { country: "GER", name: "Germany", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 3'%3e%3cpath d='M0 0h5v3H0z'/%3e%3cpath fill='%23D00' d='M0 1h5v2H0z'/%3e%3cpath fill='%23FFCE00' d='M0 2h5v1H0z'/%3e%3c/svg%3e" },
  { country: "FR", name: "France", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3e%3cpath fill='%23ED2939' d='M0 0h3v2H0z'/%3e%3cpath fill='%23fff' d='M0 0h2v2H0z'/%3e%3cpath fill='%23002395' d='M0 0h1v2H0z'/%3e%3c/svg%3e" },
  { country: "SP", name: "Spain", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 500'%3e%3cpath fill='%23c60b1e' d='M0 0h750v500H0z'/%3e%3cpath fill='%23ffc400' d='M0 125h750v250H0z'/%3e%3c/svg%3e" },
  { country: "POR", name: "Portugal", price: 25.00, currency: "₤", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 600 400'%3e%3cpath fill='red' d='M0 0h600v400H0z'/%3e%3cpath fill='%23060' d='M0 0h240v400H0z'/%3e%3c/svg%3e" },
  { country: "USA", name: "United States", price: 25.00, currency: "$", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 7410 3900'%3e%3cpath fill='%23b22234' d='M0 0h7410v3900H0z'/%3e%3cpath stroke='%23fff' stroke-width='300' d='M0 450h7410m0 600H0m0 600h7410m0 600H0m0 600h7410m0 600H0'/%3e%3cpath fill='%233c3b6e' d='M0 0h2964v2100H0z'/%3e%3cpath fill='%23fff' d='m247 90 70.5 217.1-184.7-134.2h228.4L176.5 307.1zM741 90l70.5 217.1-184.7-134.2h228.4L670.5 307.1zM1235 90l70.5 217.1-184.7-134.2h228.4L1164.5 307.1zM1729 90l70.5 217.1-184.7-134.2h228.4L1658.5 307.1zM2223 90l70.5 217.1-184.7-134.2h228.4L2152.5 307.1z'/%3e%3c/svg%3e" },
  { country: "CAN", name: "Canada", price: 45.00, currency: "$", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 9600 4800'%3e%3cpath fill='%23d52b1e' d='M0 0h2400l99 99h4602l99-99h2400v4800H7200l-99-99H2499l-99 99H0z'/%3e%3cpath fill='%23fff' d='M2400 0h4800v4800H2400zm2490 4430-45-863a95 95 0 0 1 111-98l859 151-116-320a65 65 0 0 1 20-73l941-762-212-99a65 65 0 0 1-34-79l186-572-542 115a65 65 0 0 1-73-38l-105-247-423 454a65 65 0 0 1-111-57l204-1052-327 189a65 65 0 0 1-91-27l-332-652-332 652a65 65 0 0 1-91 27l-327-189 204 1052a65 65 0 0 1-111 57l-423-454-105 247a65 65 0 0 1-73 38l-542-115 186 572a65 65 0 0 1-34 79l-212 99 941 762a65 65 0 0 1 20 73l-116 320 859-151a95 95 0 0 1 111 98l-45 863z'/%3e%3c/svg%3e" },
  { country: "AUS", name: "Australia", price: 55.00, currency: "A$", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3e%3cpath fill='%23002168' d='M0 0h1200v600H0z'/%3e%3cpath fill='%23fff' d='M0 0h600v300H0z'/%3e%3cpath fill='%23c8102e' d='M0 0h600v300H0z' opacity='.8'/%3e%3cpath fill='%23002168' d='M0 0h300v300H0z'/%3e%3cpath fill='%23fff' d='M0 135h300v30H0zM135 0h30v300h-30z'/%3e%3cpath fill='%23c8102e' d='M0 142h300v16H0zM142 0h16v300h-16z'/%3e%3cg fill='%23fff'%3e%3ccircle cx='850' cy='150' r='32'/%3e%3ccircle cx='950' cy='300' r='24'/%3e%3ccircle cx='1050' cy='450' r='24'/%3e%3ccircle cx='750' cy='450' r='24'/%3e%3ccircle cx='850' cy='330' r='20'/%3e%3c/g%3e%3c/svg%3e" },
  { country: "NZL", name: "New Zealand", price: 45.00, currency: "NZ$", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3e%3cpath fill='%23002169' d='M0 0h1200v600H0z'/%3e%3cpath fill='%23fff' d='M0 0h600v300H0z'/%3e%3cpath fill='%23c8102e' d='M0 0h600v300H0z' opacity='.8'/%3e%3cpath fill='%23002169' d='M0 0h300v300H0z'/%3e%3cpath fill='%23fff' d='M0 135h300v30H0zM135 0h30v300h-30z'/%3e%3cpath fill='%23c8102e' d='M0 142h300v16H0zM142 0h16v300h-16z'/%3e%3cg fill='%23c8102e'%3e%3ccircle cx='900' cy='170' r='35'/%3e%3ccircle cx='1030' cy='280' r='35'/%3e%3ccircle cx='930' cy='430' r='35'/%3e%3ccircle cx='780' cy='350' r='35'/%3e%3c/g%3e%3c/svg%3e" },
  { country: "ARE", name: "United Arab Emirates", price: 50.00, currency: "AED", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 300'%3e%3cpath fill='%2300732f' d='M0 0h600v100H0z'/%3e%3cpath fill='%23fff' d='M0 100h600v100H0z'/%3e%3cpath fill='%23000' d='M0 200h600v100H0z'/%3e%3cpath fill='%23ff0000' d='M0 0h150v300H0z'/%3e%3c/svg%3e" },
  { country: "QAT", name: "Qatar", price: 50.00, currency: "QR", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1400 550'%3e%3cpath fill='%238d1b3d' d='M0 0h1400v550H0z'/%3e%3cpath fill='%23fff' d='M0 0h400l100 30-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31 100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31-100 31z'/%3e%3c/svg%3e" },
  { country: "SAU", name: "Saudi Arabia", price: 50.00, currency: "SR", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 750 500'%3e%3cpath fill='%23006c35' d='M0 0h750v500H0z'/%3e%3cpath fill='%23fff' d='M150 170h450v45H150zM170 270h410v35H170z'/%3e%3cpath fill='none' stroke='%23fff' stroke-width='18' d='M180 260h390'/%3e%3cpath fill='%23fff' d='M205 330h340v20H205z'/%3e%3c/svg%3e" },
  { country: "LK", name: "Sri Lanka", price: 1500.00, currency: "LKR", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3e%3cpath fill='%23ffb700' d='M0 0h1200v600H0z'/%3e%3cpath fill='%23ff5b00' d='M50 50h165v500H50z'/%3e%3cpath fill='%23005641' d='M215 50h165v500H215z'/%3e%3cpath fill='%238d2029' d='M430 50h725v500H430z'/%3e%3cpath fill='%23ffb700' d='M800 150l25 75 80 5-62 48 20 78-63-43-67 43 21-78-63-48 80-5z'/%3e%3c/svg%3e" },
  { country: "GBR", name: "United Kingdom", price: 25.00, currency: "£", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3e%3cpath fill='%23012169' d='M0 0h60v30H0z'/%3e%3cpath stroke='%23fff' stroke-width='6' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3cpath stroke='%23c8102e' stroke-width='3' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3c/svg%3e" },
  { country: "SCO", name: "Scotland", price: 45.00, currency: "£", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3e%3cpath fill='%23005eb8' d='M0 0h60v30H0z'/%3e%3cpath stroke='%23fff' stroke-width='6' d='M0 0l60 30M60 0L0 30'/%3e%3c/svg%3e" },
  { country: "CHE", name: "Switzerland", price: 42.0, currency: "CHF", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 320'%3e%3cpath fill='%23d52b1e' d='M0 0h320v320H0z'/%3e%3cpath fill='%23fff' d='M60 130h200v60H60zM130 60h60v200h-60z'/%3e%3c/svg%3e" },
  { country: "NOR", name: "Norway", price: 193.00, currency: "kr", img: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1100 800'%3e%3cpath fill='%23ef2b2d' d='M0 0h1100v800H0z'/%3e%3cpath fill='%23fff' d='M300 0h200v800H300zM0 300h1100v200H0z'/%3e%3cpath fill='%23002868' d='M350 0h100v800H350zM0 350h1100v100H0z'/%3e%3c/svg%3e" }
];

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("DKK");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedData =
    perHourPriceForCountry.find((c) => c.country === selectedCountryCode) ||
    perHourPriceForCountry[0];

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative flex h-[40vh] min-h-[70vh] w-full items-center justify-center overflow-hidden bg-transparent text-center">
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover h-[76vh] rounded-b-[100px] border border-[rgb(169,139,75)]"
      />
      <div className="absolute inset-0 " />

      <div className="md:absolute md:left-5 left-0 z-10 mx-auto max-w-lg md:max-w-3xl py-3 px-4 md:py-5 md:px-7  bg-[rgb(18,30,45)] rounded-[20px]">
        {eyebrow && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-xl md:text-3xl font-black text-[rgb(169,139,75)] tracking-wide drop-shadow-lg sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-brand-cream/85">{subtitle}</p>}
        <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
          {/* Dynamic Price Display */}

          <p className="text-medium font-semibold text-[#A98B4B] max-[541px]:text-base max-[541px]:text-white sm:text-2xl">
            {selectedData.currency} {selectedData.price.toFixed(2)}
          </p>

          {/* Custom Dropdown Container */}
          <div className="relative  text-left flex gap-2" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded border-2 border-dashed border-[#A98B4B] bg-transparent p-1 px-2.5 text-xs font-semibold text-[rgb(169,139,75)] max-[541px]:border-white focus:outline-none"
            >
              <Image
                src={selectedData.img}
                alt={selectedData.name}
                width={20}
                height={14}
                className="h-3.5 w-5 object-cover rounded-sm"
                unoptimized
              />
              {/* <span>{selectedData.country} - {selectedData.name}</span> */}
              <span className="text-[10px] text-[rgb(169,139,75)] ml-1">▾</span>
            </button>

            {/* Dropdown Options List */}



            {isOpen && (
              <ul className="absolute right-0 bottom-full mb-2 z-50 max-h-60 w-56 overflow-y-auto rounded-md bg-[rgb(18,30,45)] border border-[rgb(169,139,75)]/40 shadow-xl focus:outline-none scrollbar-thin">
                {perHourPriceForCountry.map((item) => (
                  <li
                    key={item.country}
                    onClick={() => {
                      setSelectedCountryCode(item.country);
                      setIsOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium cursor-pointer transition-colors duration-150 ${item.country === selectedCountryCode
                      ? "bg-[rgb(169,139,75)]/20 text-[rgb(169,139,75)] font-bold"
                      : "text-white hover:bg-[rgb(28,45,65)]"
                      }`}
                  >
                    <Image
                      src={item.img}
                      alt={item.name}
                      width={20}
                      height={14}
                      className="h-3.5 w-5 object-cover rounded-sm flex-shrink-0"
                      unoptimized
                    />
                    <span className="truncate">{item.country} - {item.currency}</span>
                  </li>
                ))}
              </ul>

            )}
            <p className="m-0 font-[Poppins] leading-[1.5] text-[rgb(169,139,75)] text-base font-extrabold [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
              Hour Per Cleaner
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}