import type { LanguageCode } from "@/lib/i18n/config";

/** A run of text, or a link — internal paths ("/privacy-policy") render as locale-aware links, anything else as a plain anchor. */
export type LegalInline = string | { text: string; href: string };

export type LegalBlock =
  | { type: "p"; content: LegalInline[] }
  | { type: "ul" | "ol"; items: string[] };

export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}

export interface LegalDocument {
  title: string;
  lastUpdated: string;
  intro: LegalInline[];
  sections: LegalSection[];
}

export type LocalizedLegalDocument = Record<LanguageCode, LegalDocument>;

export const p = (...content: LegalInline[]): LegalBlock => ({ type: "p", content });
export const ul = (...items: string[]): LegalBlock => ({ type: "ul", items });
export const ol = (...items: string[]): LegalBlock => ({ type: "ol", items });

export const SITE_LINK = { text: "www.pearlyskyglobalclean.com", href: "https://www.pearlyskyglobalclean.com" };
export const EMAIL_LINK = { text: "info@pearlyskyglobalclean.com", href: "mailto:info@pearlyskyglobalclean.com" };

const HQ_ADDRESS = "15 Rue Des Halles, 75001 Paris";
const LK_ADDRESS = "No. 188/2, Kandy Road, Pahala Imbulgoda, Imbulgoda";
const UK_ADDRESS = "60 Tottenham Court Road, Office 775, Fitzrovia, London, W1T 2EW";

/** The three office addresses every policy's "Contact Us" section lists, with country names in `language`. */
export const OFFICE_ADDRESSES: Record<LanguageCode, LegalBlock> = {
  en: ul(
    `Headquarters (France): ${HQ_ADDRESS}, France`,
    `Sri Lanka: ${LK_ADDRESS}, Sri Lanka`,
    `United Kingdom: ${UK_ADDRESS}, United Kingdom`,
  ),
  fr: ul(
    `Siège social (France) : ${HQ_ADDRESS}, France`,
    `Sri Lanka : ${LK_ADDRESS}, Sri Lanka`,
    `Royaume-Uni : ${UK_ADDRESS}, Royaume-Uni`,
  ),
  de: ul(
    `Hauptsitz (Frankreich): ${HQ_ADDRESS}, Frankreich`,
    `Sri Lanka: ${LK_ADDRESS}, Sri Lanka`,
    `Vereinigtes Königreich: ${UK_ADDRESS}, Vereinigtes Königreich`,
  ),
  es: ul(
    `Sede central (Francia): ${HQ_ADDRESS}, Francia`,
    `Sri Lanka: ${LK_ADDRESS}, Sri Lanka`,
    `Reino Unido: ${UK_ADDRESS}, Reino Unido`,
  ),
  it: ul(
    `Sede centrale (Francia): ${HQ_ADDRESS}, Francia`,
    `Sri Lanka: ${LK_ADDRESS}, Sri Lanka`,
    `Regno Unito: ${UK_ADDRESS}, Regno Unito`,
  ),
};

export const LAST_UPDATED: Record<LanguageCode, string> = {
  en: "Last updated: August 8, 2026",
  fr: "Dernière mise à jour : 8 août 2026",
  de: "Zuletzt aktualisiert: 8. August 2026",
  es: "Última actualización: 8 de agosto de 2026",
  it: "Ultimo aggiornamento: 8 agosto 2026",
};
