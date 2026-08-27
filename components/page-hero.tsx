"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";

function AnimatedTextBadge() {
  return (
    <div className="absolute top-[250px] left-[100px] inline-flex items-center justify-center rounded-xl bg-slate-100/80 px-6 py-3 shadow-inner backdrop-blur-md">
      <p className="text-slate-800 font-semibold text-lg flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
        <span>Regular</span>
        <span className="relative flex overflow-hidden">
          <span className="animate-[textShift_4s_infinite_ease-in-out] inline-block">
            Home Cleaning
          </span>
        </span>
      </p>

      {/* Embedded CSS Keyframes for custom animation */}
      <style>{`
        @keyframes textShift {
          0%, 35% {
            content: "Home Cleaning";
            opacity: 1;
            transform: translateY(0);
          }
          45% {
            opacity: 0;
            transform: translateY(-8px);
          }
          50% {
            opacity: 0;
            transform: translateY(8px);
          }
          60%, 95% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

interface PerHourPriceForCountry {
  country: string;
  name: string;
  price: number;
  currency: string;
  img: string;
}

const COUNTRY_FLAGS: Record<string, string> = {
  FR: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3e%3cpath fill='%23ED2939' d='M0 0h3v2H0z'/%3e%3cpath fill='%23fff' d='M0 0h2v2H0z'/%3e%3cpath fill='%23002395' d='M0 0h1v2H0z'/%3e%3c/svg%3e",
  LK: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 600'%3e%3cpath fill='%23ffb700' d='M0 0h1200v600H0z'/%3e%3cpath fill='%23ff5b00' d='M50 50h165v500H50z'/%3e%3cpath fill='%23005641' d='M215 50h165v500H215z'/%3e%3cpath fill='%238d2029' d='M430 50h725v500H430z'/%3e%3cpath fill='%23ffb700' d='M800 150l25 75 80 5-62 48 20 78-63-43-67 43 21-78-63-48 80-5z'/%3e%3c/svg%3e",
  GB: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3e%3cpath fill='%23012169' d='M0 0h60v30H0z'/%3e%3cpath stroke='%23fff' stroke-width='6' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3cpath stroke='%23c8102e' stroke-width='3' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3c/svg%3e",
  GBR: "data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 30'%3e%3cpath fill='%23012169' d='M0 0h60v30H0z'/%3e%3cpath stroke='%23fff' stroke-width='6' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3cpath stroke='%23c8102e' stroke-width='3' d='M0 0l60 30M60 0L0 30M30 0v30M0 15h60'/%3e%3c/svg%3e",
};

const COUNTRY_NAMES: Record<string, string> = {
  FR: "France",
  LK: "Sri Lanka",
  GB: "United Kingdom",
  GBR: "United Kingdom",
};

const COUNTRY_CURRENCIES: Record<string, string> = {
  FR: "€",
  LK: "LKR",
  GB: "£",
  GBR: "£",
};

const DEFAULT_PER_HOUR_PRICES: PerHourPriceForCountry[] = [
  { country: "FR", name: "France", price: 25.00, currency: "€", img: COUNTRY_FLAGS.FR },
  { country: "LK", name: "Sri Lanka", price: 1500.00, currency: "LKR", img: COUNTRY_FLAGS.LK },
  { country: "GB", name: "United Kingdom", price: 25.00, currency: "£", img: COUNTRY_FLAGS.GB },
];

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  servicePrices,
  serviceId,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  servicePrices?: ServicePriceEntry[];
  serviceId?: number;
}) {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>("FR");
  const [countryPrices, setCountryPrices] = useState<PerHourPriceForCountry[]>(DEFAULT_PER_HOUR_PRICES);

  // Independent dropdown states & refs for Desktop and Mobile
  const [isDesktopOpen, setIsDesktopOpen] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function processPrices(prices: ServicePriceEntry[]) {
      if (!prices || prices.length === 0) return;
      const mapped: PerHourPriceForCountry[] = prices
        .filter((p) => p.price !== null && p.price !== undefined)
        .map((p) => {
          const rawCode = p.country ? p.country.toUpperCase() : "FR";
          const code = rawCode === "GBR" ? "GB" : rawCode;
          return {
            country: code,
            name: COUNTRY_NAMES[code] || COUNTRY_NAMES[rawCode] || code,
            price: parseFloat(p.price || "0"),
            currency: COUNTRY_CURRENCIES[code] || COUNTRY_CURRENCIES[rawCode] || "€",
            img: COUNTRY_FLAGS[code] || COUNTRY_FLAGS[rawCode] || COUNTRY_FLAGS.FR,
          };
        });

      if (mapped.length > 0) {
        setCountryPrices(mapped);
      }
    }

    if (servicePrices && servicePrices.length > 0) {
      processPrices(servicePrices);
    } else {
      getServices()
        .then((services) => {
          if (!services || services.length === 0) return;
          const targetService = serviceId
            ? services.find((s) => s.id === serviceId) || services[0]
            : services[0];
          if (targetService && targetService.prices) {
            processPrices(targetService.prices);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch service prices from backend database:", err);
        });
    }
  }, [servicePrices, serviceId]);

  const activePrices = countryPrices.length > 0 ? countryPrices : DEFAULT_PER_HOUR_PRICES;

  const selectedData =
    activePrices.find(
      (c) => c.country.toUpperCase() === selectedCountryCode.toUpperCase()
    ) || activePrices[0];

  // Close custom dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDesktopOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative flex h-auto justify-center bg-transparent text-center">
      <div className="md:min-h-[75vh] md:max-h-[80vh] h-[15vh] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="120vw"
          className="object-cover h-[25vh] md:h-[100vh] rounded-none md:rounded-b-[100px] border border-[rgb(169,139,75)]"
        />
      </div>

      <div className="absolute bottom-[10px] md:bottom-[130px] flex md:block md:left-8 left-0 z-10 mx-auto max-w-lg md:max-w-3xl py-4 px-5 md:py-5 md:px-7 bg-[rgb(18,30,45)] border-2 border-[rgb(169,139,75)] md:border-0 md:border-transparent md:rounded-[20px]">
        <Link href="/"
          className="inline-flex block md:hidden items-center gap-2">
          <Image
            src="/images/services/service-back.svg"
            alt="Logo"
            width={20}
            height={20}
          />
        </Link>
        {eyebrow && (
          <p className="mb-2 hidden text-xs font-semibold uppercase tracking-widest text-brand-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="text-[0.85rem] md:text-[2.6rem] font-black text-[rgb(169,139,75)] tracking-wide drop-shadow-lg sm:text-4xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-brand-cream/85 hidden">{subtitle}</p>}

        {/* Desktop View Price Section */}
        <div className="mt-4 md:flex hidden width-auto md:bg-transparent bg-[rgb(18,30,45)] flex-col items-center justify-start gap-2 sm:flex-row">
          <p className="text-medium md:block font-semibold text-[#A98B4B] sm:text-2xl">
            {selectedData.currency} {selectedData.price.toFixed(2)}
          </p>

          <div className="relative text-left md:flex gap-2" ref={desktopDropdownRef}>
            <button
              type="button"
              onClick={() => setIsDesktopOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded border-2 border-dashed border-[#A98B4B] bg-transparent p-1 px-2.5 text-xs font-semibold text-[rgb(169,139,75)] focus:outline-none"
            >
              <Image
                src={selectedData.img}
                alt={selectedData.name}
                width={20}
                height={14}
                className="h-3.5 w-5 object-cover rounded-sm"
                unoptimized
              />
              <span className="text-[10px] text-[rgb(169,139,75)] ml-1">▾</span>
            </button>

            {isDesktopOpen && (
              <ul className="absolute right-0 bottom-full mb-2 z-50 max-h-60 w-56 overflow-y-auto rounded-md bg-[rgb(18,30,45)] border border-[rgb(169,139,75)]/40 shadow-xl focus:outline-none scrollbar-thin">
                {activePrices.map((item) => (
                  <li
                    key={item.country}
                    onClick={() => {
                      setSelectedCountryCode(item.country);
                      setIsDesktopOpen(false);
                    }}
                    className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium cursor-pointer transition-colors duration-150 ${item.country.toUpperCase() === selectedCountryCode.toUpperCase()
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
            <p className="m-0 font-[Poppins] md:block md:pl-2 leading-[1.5] text-[rgb(169,139,75)] text-base font-extrabold [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
              Hour Per Cleaner
            </p>
          </div>
        </div>
      </div>

      {/* Mobile View Price Dropdown */}
      <div className="my-4 z-14 absolute py-4 px-2 top-23 rounded-lg w-[320px] md:hidden bg-[rgb(18,30,45)] flex items-center gap-1 flex-row">
        <p className="text-[0.65rem] w-[40%] font-semibold text-[#A98B4B] max-[541px]:text-base max-[541px]:text-white">
          {selectedData.currency} {selectedData.price.toFixed(2)}
        </p>

        <div className="relative w-[80%] text-left flex justify-around items-center gap-2" ref={mobileDropdownRef}>
          <button
            type="button"
            onClick={() => setIsMobileOpen((prev) => !prev)}
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
            <span className="text-[10px] text-[rgb(169,139,75)] ml-1">▾</span>
          </button>

          {isMobileOpen && (
            <ul className="absolute right-0 bottom-full mb-2 z-50 max-h-60 w-56 overflow-y-auto rounded-md bg-[rgb(18,30,45)] border border-[rgb(169,139,75)]/40 shadow-xl focus:outline-none scrollbar-thin">
              {activePrices.map((item) => (
                <li
                  key={item.country}
                  onClick={() => {
                    setSelectedCountryCode(item.country);
                    setIsMobileOpen(false);
                  }}
                  className={`flex items-center gap-2.5 px-3 py-2 text-xs font-medium cursor-pointer transition-colors duration-150 ${item.country.toUpperCase() === selectedCountryCode.toUpperCase()
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
          <p className="m-0 font-[Poppins] text-[0.85rem] wrap-break-word leading-[1.5] text-[rgb(233,233,233)] font-extrabold [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
            Hour Per Cleaner
          </p>
        </div>
      </div>
    </section>
  );
}