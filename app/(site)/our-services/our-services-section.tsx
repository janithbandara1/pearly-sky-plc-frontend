"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Clock,
  Zap,
  Home,
  Building2,
  ShieldCheck,
  Wind,
  Sofa,
  PartyPopper,
  Waves,
  SprayCan,
  Baby,
  HeartHandshake,
  Shirt,
  Truck,
  Lock,
  Anchor,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import type { OurServicesContent } from "@/lib/content/our-services/types";

// Copy (every language) lives in lib/content/our-services/; only the icons are presentation-side.
const SERVICE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "regular-home-cleaning": Home,
  "quick-touch-up-cleaning": Zap,
  "same-day-priority-cleaning": Clock,
  "deep-cleaning": Sparkles,
  "end-of-tenancy-cleaning": Home,
  "post-construction-renovation-cleaning": Building2,
  "premium-rental-concierge-cleaning": Sparkles,
  "commercial-office-cleaning": Building2,
  "healthguard-sanitization": ShieldCheck,
  "carpet-upholstery-cleaning": Sofa,
  "steam-cleaning": Wind,
  "post-event-cleaning": PartyPopper,
  "pool-cleaning": Waves,
  "precision-pressure-washing": SprayCan,
  "child-care-service": Baby,
  "elder-care-service": HeartHandshake,
  "laundry-service": Shirt,
  "move-in-out-transport-service": Truck,
  "high-security-property-care": Lock,
  "luxury-yacht-cleaning": Anchor,
};

function ServiceIcon({ id }: { id: string }) {
  const Icon = SERVICE_ICONS[id] ?? Sparkles;
  return <Icon className="w-5 h-5 text-brand-gold" />;
}

// ---------- Component ----------
export default function ServicesDetailsPage({ content }: { content: OurServicesContent }) {
  const { services } = content;
  const [activeId, setActiveId] = useState(services[0].id);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveId(services[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically scroll the active pill into view in the swipable mobile bar
  useEffect(() => {
    if (!mobileNavRef.current) return;
    const activeButton = mobileNavRef.current.querySelector<HTMLButtonElement>(
      `[data-nav-id="${activeId}"]`
    );
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Drag-to-swipe handling for desktop & touch devices
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mobileNavRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - mobileNavRef.current.offsetLeft);
    setScrollLeftState(mobileNavRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !mobileNavRef.current) return;
    e.preventDefault();
    const x = e.pageX - mobileNavRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    mobileNavRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
  <div className="min-h-screen bg-[#F8F6F0] text-[#332e27] font-sans antialiased">
    <div className="lg:flex">
        {/* ========== SIDEBAR ========== */}
        <aside className="lg:w-64 xl:w-72 shrink-0 max-h-screen">
          {/* Mobile: horizontal swipable sticky bar */}
          <div className="lg:hidden fixed top-15 left-0 right-0 z-30 px-3 sm:px-6 py-2.5 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-brand-gold shadow-xs">
            {/* Left fade indicator */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F8F6F0] to-transparent z-10" />
            {/* Right fade indicator */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F8F6F0] to-transparent z-10" />

            <div
              ref={mobileNavRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide select-none touch-pan-x active:cursor-grabbing cursor-grab overscroll-x-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {services.map((service) => (
                <button
                  key={service.id}
                  data-nav-id={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    activeId === service.id
                      ? "bg-gradient-to-r bg-brand-navy text-white shadow-xs border border-brand-gold scale-[1.02]"
                      : "bg-white/80 text-stone-600 border border-stone-200/80 hover:bg-white active:scale-95"
                  }`}
                >
                  <span className={activeId === service.id ? "text-brand-gold" : "text-brand-gold"}>
                    <ServiceIcon id={service.id} />
                  </span>
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: sticky left sidebar - brought higher */}
          <div className="hidden lg:block z-5 lg:w-[20%] mb-5 fixed bottom-0 top-20 px-4 max-h-screen overflow-y-auto pr-2">
            <h2 className="text-xs font-medium text-brand-navy uppercase tracking-wider mb-3 px-1">
              {content.browseLabel}
            </h2>
            <nav className="flex flex-col gap-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition-all ${
                    activeId === service.id
                      ? "bg-gradient-to-r bg-brand-navy text-white font-medium shadow-sm border-2 border-brand-gold scale-[1.02]"
                      : "text-stone-600 hover:bg-white/20 hover:text-stone-900 border border-transparent"
                  }`}
                >
                  <span
                    className={`shrink-0 ${
                      activeId === service.id ? "text-brand-gold" : "text-brand-gold"
                    }`}
                  >
                    <ServiceIcon id={service.id} />
                  </span>
                  <span className="leading-snug">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Page Header - made more compact */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/70 text-stone-700 text-xs tracking-wider uppercase font-medium mb-3 border border-stone-300/50">
          <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
          {content.badge}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-900 font-normal">
          {content.heading}
        </h1>
        <p className="mt-3 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          {content.subheading}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-14 sm:space-y-16">
          {services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              {/* Service Header */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-navy flex items-center justify-center text-brand-gold shadow-sm">
                    <ServiceIcon id={service.id} />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium tracking-tight">
                    {service.title}
                  </h2>
                </div>

                <h3 className="text-lg sm:text-xl text-[#5C4B33] font-medium leading-snug mb-3">
                  {service.headline}
                </h3>

                <div className="space-y-3 text-stone-600 leading-relaxed text-[15px] max-w-5xl">
                  {service.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Highlights Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                    {service.highlightsTitle}
                  </h4>
                  <div className="h-px bg-stone-300/60 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-700/20 transition-all"
                    >
                      <p className="text-sm font-medium text-stone-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                        {feature.title}
                      </p>
                      <ul className="space-y-2">
                        {feature.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-stone-600 leading-snug"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-brand-gold mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
    </div>
    
  </div>
);
}