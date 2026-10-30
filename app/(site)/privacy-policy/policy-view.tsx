"use client"

import { CookiePreferences, POLICY_DATA, PolicyKey, SOVEREIGN_LOCATIONS } from "@/lib/content/webpage contents/privacy-policy";
import { useEffect, useState } from "react";
import {
  Crown,
  Calculator,
  CalendarCheck,
  Globe,
  Search,
  Leaf,
  FileSignature,
  UserCheck,
  Cookie,
  Sliders,
  X,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Info,
} from "lucide-react";


export default function PolicyPageContent() {
  // Region & Location Filtering State
  const [selectedRegion, setSelectedRegion] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Cookie Consent States
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [showPreferencesModal, setShowPreferencesModal] = useState<boolean>(false);
  const [cookieSettings, setCookieSettings] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    functional: false,
    marketing: false,
  });

  // Legal Modal State
  const [showLegalModal, setShowLegalModal] = useState<boolean>(false);
  const [activePolicyKey, setActivePolicyKey] = useState<PolicyKey>("terms");

  // Toast Notification State
  const [toast, setToast] = useState<{ visible: boolean; message: string }>({
    visible: false,
    message: "",
  });

  useEffect(() => {
    const consent = localStorage.getItem("pearlysky_cookie_consent_2026");
    if (!consent) {
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 800);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved: CookiePreferences = JSON.parse(consent);
        setCookieSettings((prev) => ({
          ...prev,
          analytics: !!saved.analytics,
          functional: !!saved.functional,
          marketing: !!saved.marketing,
        }));
      } catch (e) {
        console.error("Failed to parse cookie preferences", e);
      }
    }
  }, []);

  const triggerToast = (msg: string) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => {
      setToast({ visible: false, message: "" });
    }, 3000);
  };

  const handleAcceptAllCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: true,
      functional: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("pearlysky_cookie_consent_2026", JSON.stringify(updated));
    setCookieSettings(updated);
    setShowBanner(false);
    triggerToast("All cookie preferences accepted.");
  };

  const handleDeclineOptionalCookies = () => {
    const updated: CookiePreferences = {
      essential: true,
      analytics: false,
      functional: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("pearlysky_cookie_consent_2026", JSON.stringify(updated));
    setCookieSettings(updated);
    setShowBanner(false);
    setShowPreferencesModal(false);
    triggerToast("Optional cookies rejected.");
  };

  const handleSaveCustomPreferences = () => {
    const updated: CookiePreferences = {
      ...cookieSettings,
      essential: true,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem("pearlysky_cookie_consent_2026", JSON.stringify(updated));
    setShowPreferencesModal(false);
    setShowBanner(false);
    triggerToast("Custom privacy settings saved.");
  };

  const openLegalModal = (key: PolicyKey) => {
    setActivePolicyKey(key);
    setShowLegalModal(true);
  };

  // Filter locations
  const filteredLocations = SOVEREIGN_LOCATIONS.filter((loc) => {
    const matchesRegion = selectedRegion === "All" || loc.region === selectedRegion;
    const matchesQuery =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesQuery;
  });

  const activePolicyDoc = POLICY_DATA[activePolicyKey] || POLICY_DATA["terms"];

  return (
    <div className="bg-[#04070d] text-[#f8fafc] font-sans min-h-screen antialiased selection:bg-[#e5c158] selection:text-[#04070d]">
      
      {/* HERO SECTION */}
      <section className="relative py-25 overflow-hidden">
        {/* Ambient Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#e5c158]/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-96 h-96 bg-[#1a2846]/50 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#e5c158]/10 border border-[#e5c158]/30 mb-6">
            <Crown className="w-3.5 h-3.5 text-[#f5d77f]" />
            <span className="text-xs font-semibold tracking-widest text-[#f5d77f] uppercase">
              Botanical Hygiene & Estate Stewardship
            </span>
          </div>

          <h1 className="font-serif text-3xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Pure Spaces. Elevated Living.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed mb-10">
            Eco-Luxury Cleaning for Homes and Workspaces. Deploying hospital-grade organic botanical formulations and ultra-discreet estate custodians across 27 sovereign territories.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => openLegalModal("quotation")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#e5c158] via-[#f5d77f] to-[#cbb04c] text-[#04070d] font-bold text-sm tracking-wide shadow-xl shadow-[#e5c158]/20 hover:brightness-110 transition flex items-center justify-center space-x-3"
            >
              <Calculator className="w-4 h-4" />
              <span>Review Quotation Terms</span>
            </button>

            <button
              onClick={() => openLegalModal("booking")}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#141f36] border border-slate-700/80 hover:border-[#e5c158]/40 text-slate-200 font-semibold text-sm transition flex items-center justify-center space-x-3"
            >
              <CalendarCheck className="w-4 h-4 text-[#f5d77f]" />
              <span>Online Booking Policy</span>
            </button>
          </div>
        </div>
      </section>

      {/* GLOBAL FOOTPRINT (27 COUNTRIES) */}
      <section id="locations" className="py-16 bg-[#080d16]/80 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center space-x-2 text-[#f5d77f] text-xs font-semibold uppercase tracking-widest mb-2">
                <Globe className="w-4 h-4" />
                <span>Global Footprint</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                27 Sovereign Destinations
              </h2>
            </div>

            {/* SEARCH & REGION FILTERS */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3.5 top-3.5 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search country or territory..."
                  className="pl-9 pr-4 py-2.5 bg-[#04070d] border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-[#e5c158] w-full sm:w-64"
                />
              </div>

              <div className="flex space-x-1 bg-[#04070d] p-1 rounded-xl border border-slate-800">
                {["All", "Europe", "Middle East", "North America", "Asia-Pacific"].map((region) => (
                  <button
                    key={region}
                    onClick={() => setSelectedRegion(region)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition ${
                      selectedRegion === region
                        ? "bg-[#e5c158] text-[#04070d]"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* LOCATION CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {filteredLocations.length === 0 ? (
              <div className="col-span-full py-8 text-center text-slate-500 text-xs">
                No matching territories found.
              </div>
            ) : (
              filteredLocations.map((loc) => (
                <div
                  key={loc.code}
                  className="bg-[#080d16]/75 p-3.5 rounded-2xl border border-slate-800 hover:border-[#e5c158]/40 transition group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5d77f]/90">
                      {loc.code}
                    </span>
                    <span className="text-[9px] text-slate-500 font-medium">{loc.region}</span>
                  </div>
                  <span className="text-xs font-bold text-white block truncate group-hover:text-[#fbe285]">
                    {loc.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ECO STANDARDS SECTION */}
      <section id="standards" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold tracking-widest text-[#f5d77f] uppercase">
            White-Glove Protocols
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mt-2">
            The Pearly Sky Standard
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl p-8 border border-[#e5c158]/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)]">
            <div className="w-12 h-12 rounded-2xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#f5d77f] mb-6">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">100% Organic Actives</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Zero VOCs, zero artificial fragrances. Certified non-toxic solutions engineered to protect delicate marble, gold-leaf, hardwoods, and rare artwork.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl p-8 border border-[#e5c158]/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)]">
            <div className="w-12 h-12 rounded-2xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#f5d77f] mb-6">
              <FileSignature className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Binding Quotation Terms</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Clear, transparent service parameter evaluations. Physical scale verification (m²) ensures custom tailored attention for high-value estates and commercial spaces.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl p-8 border border-[#e5c158]/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.85)]">
            <div className="w-12 h-12 rounded-2xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#f5d77f] mb-6">
              <UserCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mb-3">Diplomatic Confidentiality</h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Strict non-disclosure agreements, encrypted key-drop management, and vetted estate specialists providing absolute peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* SLIDE-UP COOKIE CONSENT BANNER */}
      <div
        className={`fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 transition-all duration-500 ${
          showBanner
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl p-6 border border-[#e5c158]/30 shadow-2xl relative overflow-hidden">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#f5d77f] shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-xl font-bold text-white">Cookie & Privacy Notice</h4>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#f5d77f] bg-[#e5c158]/10 px-2 py-0.5 rounded-full border border-[#e5c158]/20">
                  2026 Sovereign Standard
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-light">
                We utilize cookies to customize your white-glove experience, optimize quote request routing across our 27 sovereign jurisdictions, and safeguard client privacy.
              </p>
              <div className="pt-3 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleAcceptAllCookies}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#e5c158] to-[#f5d77f] text-[#04070d] font-bold text-xs hover:brightness-110 shadow-md"
                >
                  Accept All
                </button>
                <button
                  onClick={handleDeclineOptionalCookies}
                  className="px-4 py-2 rounded-xl bg-[#141f36] border border-slate-700 text-slate-300 font-semibold text-xs hover:bg-[#1a2846]"
                >
                  Reject Non-Essential
                </button>
                <button
                  onClick={() => {
                    setShowBanner(false);
                    setShowPreferencesModal(true);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-[#f5d77f] hover:underline"
                >
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GRANULAR COOKIE PREFERENCES MODAL */}
      {showPreferencesModal && (
        <div className="fixed inset-0 bg-[#04070d]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#e5c158]/40 relative max-h-[90vh] flex flex-col animate-[fadeIn_0.25s_ease-out_forwards]">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center text-[#f5d77f]">
                  <Sliders className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">Global Cookie Preferences</h3>
                  <p className="text-xs text-slate-400">
                    Manage consent toggles across active 27 jurisdictions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowPreferencesModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-1 text-xs">
              {/* 1. STRICTLY NECESSARY */}
              <div className="bg-[#080d16]/75 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">1. Strictly Necessary</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Always Active
                  </span>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">
                  Essential for page routing, quote parameter caching, security verification, and region-based service allocation.
                </p>
              </div>

              {/* 2. ANALYTICS */}
              <div className="bg-[#080d16]/75 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">2. Analytics & Telemetry</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookieSettings.analytics}
                      onChange={(e) =>
                        setCookieSettings((prev) => ({ ...prev, analytics: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#141f36] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e5c158]"></div>
                  </label>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">
                  Measures aggregate booking engine load times and regional usage metrics without identifying individual clients.
                </p>
              </div>

              {/* 3. FUNCTIONAL */}
              <div className="bg-[#080d16]/75 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">3. Functional & Preferences</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookieSettings.functional}
                      onChange={(e) =>
                        setCookieSettings((prev) => ({ ...prev, functional: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#141f36] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e5c158]"></div>
                  </label>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">
                  Stores your unit preferences (m² vs ft²), selected region, and default contact choices for future sessions.
                </p>
              </div>

              {/* 4. MARKETING */}
              <div className="bg-[#080d16]/75 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-white text-sm">4. Targeted VIP Announcements</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookieSettings.marketing}
                      onChange={(e) =>
                        setCookieSettings((prev) => ({ ...prev, marketing: e.target.checked }))
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#141f36] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#e5c158]"></div>
                  </label>
                </div>
                <p className="text-slate-400 leading-relaxed font-light">
                  Delivers exclusive invitation details regarding seasonal estate care and yacht cleaning availability in your territory.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3 mt-4">
              <button
                onClick={handleDeclineOptionalCookies}
                className="px-4 py-2.5 rounded-xl bg-[#141f36] text-slate-300 font-semibold text-xs hover:bg-[#1a2846]"
              >
                Reject Optional
              </button>
              <button
                onClick={handleSaveCustomPreferences}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#e5c158] to-[#f5d77f] text-[#04070d] font-bold text-xs hover:brightness-110 shadow-lg shadow-[#e5c158]/20"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LEGAL & POLICY MODAL CONTAINER */}
      {showLegalModal && (
        <div className="fixed inset-0 bg-[#04070d]/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-[#141f36]/88 to-[#080d16]/95 backdrop-blur-[28px] rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-[#e5c158]/40 relative max-h-[88vh] flex flex-col animate-[fadeIn_0.25s_ease-out_forwards]">
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4 shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#e5c158]/10 border border-[#e5c158]/30 flex items-center justify-center">
                  {activePolicyDoc.icon}
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white">
                    {activePolicyDoc.title}
                  </h3>
                  <p className="text-xs text-[#f5d77f]">
                    Updated October 2026 • Pearly Sky Sovereign Governance
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLegalModal(false)}
                className="text-slate-400 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* MODAL QUICK SWITCH TABS */}
            <div className="flex flex-wrap gap-1.5 pb-3 border-b border-slate-800/80 mb-4 shrink-0 text-[11px]">
              {(["terms", "privacy", "cookie", "quotation", "booking"] as PolicyKey[]).map((key) => {
                const isSelected = activePolicyKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => setActivePolicyKey(key)}
                    className={`px-3 py-1.5 rounded-lg border transition font-semibold ${
                      isSelected
                        ? "border-[#e5c158] bg-[#e5c158]/20 text-[#f5d77f]"
                        : "border-slate-800 bg-[#080d16] text-slate-400 hover:text-white hover:border-slate-700"
                    }`}
                  >
                    {POLICY_DATA[key].title}
                  </button>
                );
              })}
            </div>

            {/* MODAL SCROLL CONTENT */}
            <div className="overflow-y-auto pr-2 text-xs text-slate-300 leading-relaxed font-light space-y-4">
              {activePolicyDoc.body}
            </div>

            {/* MODAL FOOTER */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between shrink-0 mt-4">
              <span className="text-[11px] text-slate-500">
                © 2026 Pearly Sky. All rights reserved.
              </span>
              <button
                onClick={() => setShowLegalModal(false)}
                className="px-5 py-2 rounded-xl bg-[#e5c158] text-[#04070d] font-bold text-xs hover:bg-[#f5d77f]"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div
        className={`fixed top-24 right-6 z-50 bg-[#141f36] border border-[#e5c158]/40 rounded-2xl px-5 py-3 shadow-2xl text-xs text-white flex items-center space-x-3 transition-all duration-300 ${
          toast.visible
            ? "translate-x-0 opacity-100 pointer-events-auto"
            : "translate-x-full opacity-0 pointer-events-none"
        }`}
      >
        <CheckCircle2 className="w-5 h-5 text-[#f5d77f]" />
        <span>{toast.message}</span>
      </div>
    </div>
  );
}