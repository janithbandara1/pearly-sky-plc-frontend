

export interface SovereignLocation {
  name: string;
  code: string;
  region: "Europe" | "Asia-Pacific" | "North America" | "Middle East";
}

export interface LegalPolicy {
  title: string;
  icon: string;
  body: React.ReactNode;
}

export type PolicyKey = "terms" | "privacy" | "cookie" | "quotation" | "booking";

export interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
  timestamp?: string;
}


// RECORDS


export const SOVEREIGN_LOCATIONS: SovereignLocation[] = [
  { name: "Austria", code: "AT", region: "Europe" },
  { name: "Belgium", code: "BE", region: "Europe" },
  { name: "Denmark", code: "DK", region: "Europe" },
  { name: "Finland", code: "FI", region: "Europe" },
  { name: "France", code: "FR", region: "Europe" },
  { name: "Germany", code: "DE", region: "Europe" },
  { name: "Iceland", code: "IS", region: "Europe" },
  { name: "Ireland", code: "IE", region: "Europe" },
  { name: "Italy", code: "IT", region: "Europe" },
  { name: "Liechtenstein", code: "LI", region: "Europe" },
  { name: "Luxembourg", code: "LU", region: "Europe" },
  { name: "Malta", code: "MT", region: "Europe" },
  { name: "Monaco", code: "MC", region: "Europe" },
  { name: "Netherlands", code: "NL", region: "Europe" },
  { name: "Norway", code: "NO", region: "Europe" },
  { name: "Sweden", code: "SE", region: "Europe" },
  { name: "Switzerland", code: "CH", region: "Europe" },
  { name: "United Kingdom", code: "GB", region: "Europe" },
  { name: "Australia", code: "AU", region: "Asia-Pacific" },
  { name: "New Zealand", code: "NZ", region: "Asia-Pacific" },
  { name: "Canada", code: "CA", region: "North America" },
  { name: "United States of America", code: "US", region: "North America" },
  { name: "Qatar", code: "QA", region: "Middle East" },
  { name: "United Arab Emirates", code: "AE", region: "Middle East" },
  { name: "Oman", code: "OM", region: "Middle East" },
  { name: "Bahrain", code: "BH", region: "Middle East" },
  { name: "Sri Lanka", code: "LK", region: "Asia-Pacific" },
];

export const POLICY_DATA: Record<PolicyKey, LegalPolicy> = {
  terms: {
    title: "Terms and Conditions",
    icon: "fa-file-contract",
    body: (
      <>
        <p className="font-bold text-white text-sm">1. Sovereign Agreement Scope</p>
        <p>
          These 2026 Terms and Conditions govern white-glove property hygiene, estate restoration, and luxury workspace care provided by Pearly Sky across all 27 active jurisdictions.
        </p>

        <p className="font-bold text-white text-sm mt-4">2. High-Value Property Care & Art Preservation</p>
        <p>
          Pearly Sky specialists operate under strict conservation guidelines. Clients must identify items of extraordinary valuation (e.g., fine art, delicate silk wall coverings, antique gilding) prior to service deployment.
        </p>

        <p className="font-bold text-white text-sm mt-4">3. Non-Disclosure & Diplomatic Privacy</p>
        <p>
          All personnel are bound by strict Non-Disclosure Agreements (NDAs). Photography, video recording, or disclosure of client floorplans, security configurations, or personal identity is strictly prohibited.
        </p>
      </>
    ),
  },
  privacy: {
    title: "Privacy Policy",
    icon: "fa-shield-halved",
    body: (
      <>
        <p className="font-bold text-white text-sm">1. Global Data Directives (2026 Framework)</p>
        <p>
          Pearly Sky operates in full compliance with the European Union GDPR, United Kingdom Data Protection Act, Swiss FADP, CCPA/CPRA, and GCC Sovereign Data Laws across our 27 covered countries.
        </p>

        <p className="font-bold text-white text-sm mt-4">2. Zero Commercial Data Monetization</p>
        <p>
          We do not sell, rent, or trade client telemetry or estate details to third-party marketing networks. Personal information is processed solely for logistics, security clearance, and service delivery.
        </p>

        <p className="font-bold text-white text-sm mt-4">3. Sovereign Data Erasure Rights</p>
        <p>
          Clients maintain the right to inspect, extract, or request total deletion of their digital profile and booking archive at any time via our Privacy Officer.
        </p>
      </>
    ),
  },
  cookie: {
    title: "Cookie Policy",
    icon: "fa-cookie-bite",
    body: (
      <>
        <p className="font-bold text-white text-sm">1. Digital Telemetry & Session Management</p>
        <p>
          This policy details how Pearly Sky utilizes cookies and browser local storage to maintain quote configuration parameters, manage session security, and optimize load speed across our 27 service hubs.
        </p>

        <p className="font-bold text-white text-sm mt-4">2. Categorized Cookie Usage</p>
        <p>
          Users maintain full granular control over Performance, Personalization, and Marketing cookies via our persistent Cookie Preferences console.
        </p>
      </>
    ),
  },
  quotation: {
    title: "Quotation Policy",
    icon: "fa-calculator",
    body: (
      <>
        <div className="p-3.5 rounded-2xl bg-gold-500/10 border border-gold-500/30 mb-3 text-gold-300 font-medium flex items-center">
          <i className="fa-solid fa-circle-info mr-2"></i>
          <span>Pearly Sky Quotation Parameters for Homes & Workspaces (2026 Revision)</span>
        </div>

        <p className="font-bold text-white text-sm mt-3">1. Non-Financial Estimate Scope & Custom Inquiries</p>
        <p>
          All digital quote submissions generated on our platform represent customized non-financial service specifications. These requests capture client estate scale (20 m² to 500,000 m²), requested cleaner headcount (1-20), service duration, and specific eco-luxury parameters.
        </p>

        <p className="font-bold text-white text-sm mt-4">2. Quote Validity Period</p>
        <p>
          Official written proposals issued by a Pearly Sky Concierge following site parameters evaluation remain valid for <strong>30 calendar days</strong> from issuance. Seasonal adjustments or specific specialist availability may apply after 30 days.
        </p>

        <p className="font-bold text-white text-sm mt-4">3. Physical Area (m² / ft²) Verification</p>
        <p>
          Initial client estimates are calculated based on reported property scale. A Pearly Sky Lead Custodian will perform an initial architectural walkthrough during the first appointment to verify structural scale and material finishing conditions.
        </p>

        <p className="font-bold text-white text-sm mt-4">4. Specialized Add-ons & Estate Assessment Terms</p>
        <p>
          Heavy restoration services (e.g., rare marble crystallization, chandelier disassembly, aircraft interior sanitization) require pre-assessment of structural water/power access and specific surface safety guidelines before work commences.
        </p>
      </>
    ),
  },
  booking: {
    title: "Online Booking Policy",
    icon: "fa-calendar-check",
    body: (
      <>
        <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 mb-3 text-emerald-300 font-medium flex items-center">
          <i className="fa-solid fa-shield-check mr-2"></i>
          <span>White-Glove Booking & Access Directives (2026 Sovereign Edition)</span>
        </div>

        <p className="font-bold text-white text-sm mt-3">1. Reservation Confirmation & Service Allocation</p>
        <p>
          Online booking requests are reviewed within 2 hours by a dedicated Regional Concierge. Final appointment confirmation is issued via encrypted email or official WhatsApp notification once specialist crews are assigned.
        </p>

        <p className="font-bold text-white text-sm mt-4">2. Deposit & Cancellation Framework</p>
        <p>
          To preserve staff availability for high-value estates, bookings may be rescheduled or cancelled without penalty up to <strong>24 hours prior</strong> to the scheduled start time. Cancellations within 24 hours are subject to a standard re-routing fee.
        </p>

        <p className="font-bold text-white text-sm mt-4">3. Security Access & Key Management Protocol</p>
        <p>
          Pearly Sky supports smart lock passcodes, diplomatic security concierge handoffs, and key-drop vaults. All physical access devices are tagged with randomized high-security encryption codes and stored in fireproof safes when not in transport.
        </p>

        <p className="font-bold text-white text-sm mt-4">4. Cleaner Safety & VIP Confidentiality Standard</p>
        <p>
          Service teams must be provided a safe working environment free of hazardous uncontained construction debris or aggressive animals. All staff operate under strict non-disclosure obligations to protect family privacy and estate anonymity.
        </p>
      </>
    ),
  },
};