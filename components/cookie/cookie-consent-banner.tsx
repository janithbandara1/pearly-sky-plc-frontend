"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { CookiePolicyContent } from "@/components/legal/cookie-policy-content";
import { TermsAndConditionsContent } from "@/components/legal/terms-and-conditions-content";
import {
  COOKIE_CONSENT_EVENT,
  getStoredCookieConsent,
  setStoredCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

type PolicyType = "cookie" | "terms" | null;

// The server can't know the visitor's localStorage choice, so it renders
// nothing (hidden) by default on both server and initial client paint.
// Only after mounting do we check localStorage and reveal the banner if
// there's truly no stored decision — this avoids a flash of the banner
// briefly appearing then disappearing for returning visitors.
type ConsentState = CookieConsentValue | "pending" | null;

const policyButtonClass =
  "px-3 py-2 rounded-md text-sm font-bold underline bg-[#121E2D] text-[#FFFDF4] transition-colors hover:bg-[#1a2b45]";
const policyButtonMobileClass =
  "md:hidden px-2 py-1.5 rounded-md text-xs text-center font-bold underline bg-[#121E2D] text-[#FFFDF4] transition-colors hover:bg-[#1a2b45]";

export function CookieConsentBanner() {
  const { translate, language } = useLanguage();
  const [consent, setConsent] = useState<ConsentState>("pending");
  const [showPolicy, setShowPolicy] = useState<PolicyType>(null);

  useEffect(() => {
    setConsent(getStoredCookieConsent());
    const handleUpdate = () => setConsent(getStoredCookieConsent());
    window.addEventListener(COOKIE_CONSENT_EVENT, handleUpdate);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleUpdate);
  }, []);

  if (consent !== null) return null;

  const decide = (value: CookieConsentValue) => {
    setStoredCookieConsent(value);
  };

  return (
    <>
      {showPolicy && (
        <div
          className="fixed inset-0 z-5100 flex items-center justify-center bg-black/30 p-3"
          onClick={() => setShowPolicy(null)}
        >
          <div
            className="relative max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-[#FFFBF4] shadow-2xl pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex items-center justify-between border-b p-4 bg-[#FFFBF4]">
              <h2 className="text-lg font-bold text-[#002F6D] sm:text-xl">
                {showPolicy === "cookie" ? translate("footerCookieLink") : translate("footerTermsLink")}
              </h2>
              <button onClick={() => setShowPolicy(null)} className="text-[#002F6D]" aria-label="Close">
                <X size={22} />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto p-4 text-[#002F6D]">
              <div className="flex flex-col gap-8">
                {showPolicy === "cookie" ? <CookiePolicyContent language={language} /> : <TermsAndConditionsContent language={language} />}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="fixed inset-x-4  bottom-4 z-5050 md:inset-x-6 md:bottom-10">
        <div className="mx-auto py-6 border-2 border-brand-gold/90 flex flex-col gap-2 rounded-xl bg-[#FFFBF4] p-4 text-[#002F6D] shadow-lg md:flex-row md:items-center md:justify-between md:gap-4">
          <div className="min-w-0">
            <div className="text-lg font-semibold">{translate("cookieBannerTitle")}</div>
            <div className=" text-sm opacity-90">{translate("cookieBannerDescription")}</div>
          </div>

          <div className="hidden shrink-0 items-center gap-3 md:flex">
            <button onClick={() => setShowPolicy("cookie")} className={policyButtonClass}>
              {translate("footerCookieLink")}
            </button>
            <button onClick={() => setShowPolicy("terms")} className={policyButtonClass}>
              {translate("footerTermsLink")}
            </button>
          </div>

          <div className="flex shrink-0 items-center justify-center gap-2 md:justify-start md:gap-3">
            <button onClick={() => setShowPolicy("cookie")} className={policyButtonMobileClass}>
              {translate("footerCookieLink")}
            </button>
            <button onClick={() => setShowPolicy("terms")} className={policyButtonMobileClass}>
              {translate("footerTermsLink")}
            </button>
            <button
              type="button"
              onClick={() => decide("denied")}
              className="rounded-md bg-[#121E2D] px-3 py-1.5 text-xs font-bold text-[#FFFDF4] transition-colors hover:bg-[#1a2b45] md:py-2 md:text-sm"
            >
              {translate("cookieBannerReject")}
            </button>
            <button
              type="button"
              onClick={() => decide("accepted")}
              className="rounded-md bg-[#121E2D] px-3 py-1.5 text-xs font-bold text-[#FFFDF4] transition-colors hover:bg-[#1a2b45] md:py-2 md:text-sm"
            >
              {translate("cookieBannerAccept")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
