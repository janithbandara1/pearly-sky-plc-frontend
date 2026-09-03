"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";
import { Socialmedialinks } from "./social-media";

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
      <div className="md:min-h-[100vh] bg-[#021642] md:max-h-[100vh] h-[40vh] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="120vw"
          className="object-cover h-[25vh] md:h-[100vh] rounded-b-[100px] md:rounded-none  border border-[rgb(169,139,75)]"
        />
      </div>

      <div className="absolute top-8 left-0 flex h-full w-full flex-col items-center justify-center gap-4  text-center text-white sm:px-6">
        <Socialmedialinks />
      </div>
      

      
    </section>
  );
}