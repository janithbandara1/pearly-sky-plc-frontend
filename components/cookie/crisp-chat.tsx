"use client";

import { useEffect } from "react";
import { COOKIE_CONSENT_EVENT, getStoredCookieConsent } from "@/lib/cookie-consent";

const CRISP_WEBSITE_ID =
  process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID ?? "ec5009e7-1a5d-46fc-977b-609ff4224b80";

declare global {
  interface Window {
    $crisp?: unknown[];
    CRISP_WEBSITE_ID?: string;
  }
}

let crispLoaded = false;

function loadCrisp() {
  if (crispLoaded) return;
  crispLoaded = true;

  window.$crisp = window.$crisp || [];
  window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

  const script = document.createElement("script");
  script.src = "https://client.crisp.chat/l.js";
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Loads the Crisp live-chat widget once the visitor has made a cookie
 * choice. Live chat isn't a tracking script, so it loads on both accept
 * and reject — matching the cookie banner's behavior.
 */
export function CrispChat() {
  useEffect(() => {
    if (getStoredCookieConsent()) loadCrisp();

    window.addEventListener(COOKIE_CONSENT_EVENT, loadCrisp);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, loadCrisp);
  }, []);

  return null;
}
