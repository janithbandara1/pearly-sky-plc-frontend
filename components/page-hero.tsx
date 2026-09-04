"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { getServices, ServicePriceEntry } from "@/lib/catalog-api";
import { getCountries, type CountryMeta } from "@/lib/countries/api";
import { COUNTRY_FLAGS, FALLBACK_COUNTRY_NAMES } from "@/components/country-switcher";
import { SUPPORTED_COUNTRIES, type CountryCode } from "@/lib/countries/config";
import { useCountry } from "@/lib/countries/country-context";

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
  country: CountryCode;
  name: string;
  price: number | null;
  currency: string;
}

/** Same country-flag-icons set the navbar's CountrySwitcher/LocaleSwitcher use. */
function getFlagComponent(code: string) {
  return COUNTRY_FLAGS[code.toLowerCase() as CountryCode] ?? COUNTRY_FLAGS.fr;
}

/** A few legacy price rows use `GBR`; the site's own code for the UK is `gb`. Falls back to `fr` for anything outside the supported list. */
function normalizeCountryCode(raw: string | null | undefined): CountryCode {
  const lower = (raw ?? "fr").toLowerCase();
  const code = lower === "gbr" ? "gb" : lower;
  return (SUPPORTED_COUNTRIES as readonly string[]).includes(code) ? (code as CountryCode) : "fr";
}

export function PageHero({
  image,
  eyebrow,
  title,
  subtitle,
  servicePrices,
  serviceId,
  hidePriceSelector,
}: {
  image: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  servicePrices?: ServicePriceEntry[];
  serviceId?: number;
  /** Hides the "€X.XX / Hour Per Cleaner" price + country picker — for services that aren't priced per hour. */
  hidePriceSelector?: boolean;
}) {
  /** The site-wide country (same one the navbar's CountrySwitcher/LocaleSwitcher drive) — picking a country here navigates the whole site, same as picking it there. */
  const { country, setCountry } = useCountry();
  const [metaByCode, setMetaByCode] = useState<Record<string, CountryMeta>>({});
  const [priceByCode, setPriceByCode] = useState<Record<string, number | null>>({});

  // Independent dropdown states & refs for Desktop and Mobile
  const [isDesktopOpen, setIsDesktopOpen] = useState<boolean>(false);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCountries()
      .then((countries) => setMetaByCode(Object.fromEntries(countries.map((c) => [c.code, c]))))
      .catch(() => setMetaByCode({}));
  }, []);

  useEffect(() => {
    function processPrices(prices: ServicePriceEntry[]) {
      if (!prices || prices.length === 0) return;
      const byCode: Record<string, number | null> = {};
      for (const p of prices) {
        const code = normalizeCountryCode(p.country);
        byCode[code] = p.price !== null && p.price !== undefined ? parseFloat(p.price) : null;
      }
      setPriceByCode(byCode);
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

  /** Every country the navbar's switcher offers, not just whichever ones happen to have a price set. */
  const activePrices: PerHourPriceForCountry[] = SUPPORTED_COUNTRIES.map((code) => ({
    country: code,
    name: metaByCode[code]?.name ?? FALLBACK_COUNTRY_NAMES[code],
    price: priceByCode[code] ?? null,
    currency: metaByCode[code]?.currency ?? "",
  }));

  const selectedCountryCode = country ?? SUPPORTED_COUNTRIES[0];
  const selectedData =
    activePrices.find((c) => c.country === selectedCountryCode) || activePrices[0];
  const SelectedFlag = getFlagComponent(selectedData.country);

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
    <section className="relative flex h-auto justify-center bg-transparent text-center mb-16 md:mb-12">
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

      <div className="absolute top-1/2 -translate-y-1/2 flex items-center gap-2.5 md:block md:left-8 left-3 z-10 mx-auto max-w-lg md:max-w-3xl py-4 px-5 md:py-5 md:px-7 bg-[rgb(18,30,45)] border-2 border-[rgb(169,139,75)] md:border-0 md:border-transparent md:rounded-[20px]">
        <Link href="/"
          className="inline-flex md:hidden shrink-0 items-center gap-2">
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
        <h1 className="min-w-0 truncate md:overflow-visible md:text-clip md:whitespace-normal text-base sm:text-3xl md:text-4xl font-bold text-[#c29b38] tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && <p className="mt-3 text-brand-cream/85 hidden">{subtitle}</p>}

        {/* Desktop View Price Section */}
        {!hidePriceSelector && (
          <div className="mt-4 md:flex hidden width-auto md:bg-transparent bg-[rgb(18,30,45)] flex-col items-center justify-start gap-2 sm:flex-row">
            <p className="text-medium md:block font-semibold text-[#A98B4B] sm:text-2xl">
              {selectedData.price !== null ? `${selectedData.currency} ${selectedData.price.toFixed(2)}` : "Contact us"}
            </p>

            <div className="relative text-left md:flex gap-2" ref={desktopDropdownRef}>
              <button
                type="button"
                onClick={() => setIsDesktopOpen((prev) => !prev)}
                className="inline-flex items-center gap-2 rounded border-2 border-dashed border-[#A98B4B] bg-transparent p-1 px-2.5 text-xs font-semibold text-[rgb(169,139,75)] focus:outline-none"
              >
                <SelectedFlag className="h-3.5 w-5 object-cover" />
                <span className="text-[10px] text-[rgb(169,139,75)] ml-1">▾</span>
              </button>

              {isDesktopOpen && (
                <div className="absolute right-0 bottom-full mb-2 z-50 w-56 overflow-hidden rounded-l-lg border border-[rgb(169,139,75)]/40 bg-[rgb(18,30,45)] shadow-xl">
                  <ul className="max-h-60 overflow-y-auto p-1 focus:outline-none scrollbar-thin">
                    {activePrices.map((item) => {
                      const ItemFlag = getFlagComponent(item.country);
                      return (
                        <li
                          key={item.country}
                          onClick={() => {
                            setCountry(item.country);
                            setIsDesktopOpen(false);
                          }}
                          className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium cursor-pointer transition-colors duration-150 ${item.country.toUpperCase() === selectedCountryCode.toUpperCase()
                            ? "bg-[rgb(169,139,75)]/20 text-[rgb(169,139,75)] font-bold"
                            : "text-white hover:bg-[rgb(28,45,65)]"
                            }`}
                        >
                          <ItemFlag className="h-3.5 w-5 object-cover flex-shrink-0" />
                          <span className="truncate">{item.country.toUpperCase()} - {item.currency}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <p className="m-0 font-[Poppins] md:block md:pl-2 leading-[1.5] text-[rgb(169,139,75)] text-base font-extrabold [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
                Hour Per Cleaner
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Mobile View Price Dropdown */}
      {!hidePriceSelector && (
        <div className="my-4 z-14 absolute py-4 px-2 top-23 rounded-lg w-[320px] md:hidden bg-[rgb(18,30,45)] flex items-center gap-1 flex-row">
          <p className="text-[0.65rem] w-[40%] font-semibold text-[#A98B4B] max-[541px]:text-base max-[541px]:text-white">
            {selectedData.price !== null ? `${selectedData.currency} ${selectedData.price.toFixed(2)}` : "Contact us"}
          </p>

          <div className="relative w-[80%] text-left flex justify-around items-center gap-2" ref={mobileDropdownRef}>
            <button
              type="button"
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="inline-flex items-center gap-2 rounded border-2 border-dashed border-[#A98B4B] bg-transparent p-1 px-2.5 text-xs font-semibold text-[rgb(169,139,75)] max-[541px]:border-white focus:outline-none"
            >
              <SelectedFlag className="h-3.5 w-5 object-cover" />
              <span className="text-[10px] text-[rgb(169,139,75)] ml-1">▾</span>
            </button>

            {isMobileOpen && (
              <div className="absolute right-0 bottom-full mb-2 z-50 w-56 overflow-hidden rounded-l-lg border border-[rgb(169,139,75)]/40 bg-[rgb(18,30,45)] shadow-xl">
                <ul className="max-h-60 overflow-y-auto p-1 focus:outline-none scrollbar-thin">
                  {activePrices.map((item) => {
                    const ItemFlag = getFlagComponent(item.country);
                    return (
                      <li
                        key={item.country}
                        onClick={() => {
                          setCountry(item.country);
                          setIsMobileOpen(false);
                        }}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium cursor-pointer transition-colors duration-150 ${item.country.toUpperCase() === selectedCountryCode.toUpperCase()
                          ? "bg-[rgb(169,139,75)]/20 text-[rgb(169,139,75)] font-bold"
                          : "text-white hover:bg-[rgb(28,45,65)]"
                          }`}
                      >
                        <ItemFlag className="h-3.5 w-5 object-cover flex-shrink-0" />
                        <span className="truncate">{item.country.toUpperCase()} - {item.currency}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <p className="m-0 font-[Poppins] text-[0.85rem] wrap-break-word leading-[1.5] text-[rgb(233,233,233)] font-extrabold [text-shadow:rgba(0,0,0,0.3)_0px_1px_4px]">
              Hour Per Cleaner
            </p>
          </div>
        </div>
      )}
    </section>
  );
}