import type { CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";
import type { PageMeta } from "./meta-data";

type CountryPageKey = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations" | "blog";

/**
 * Languages meta-data.ts's COUNTRY_PAGE_META doesn't have hand-written copy
 * for (every SUPPORTED_LANGUAGES entry except "en", which already has full
 * per-country literal text). getCountryPageMeta falls back to this
 * generator for those, producing every country's title/description in the
 * visitor's chosen language instead of always showing English.
 *
 * France (pearlyskyglobalclean.fr) is the only market offering a language
 * choice beyond English — see COUNTRY_LANGUAGES in ./config — so in practice
 * this only ever generates copy for "fr". It stays keyed by the full
 * CountryCode (rather than hardcoded to France) so a future country that
 * gains a second language doesn't need this file's shape to change.
 *
 * Titles append the bare country name directly (matching the existing
 * en/fr convention — proper-noun labels don't need grammatical agreement in
 * any of these languages). Descriptions tag the country on with an em dash
 * instead of a language-specific preposition ("in", "en", "in den", ...).
 */
export const TRANSLATED_LANGUAGES = ["fr", "de", "es", "it"] as const;
type TranslatedLanguage = (typeof TRANSLATED_LANGUAGES)[number];

function isTranslatedLanguage(language: LanguageCode): language is TranslatedLanguage {
  return (TRANSLATED_LANGUAGES as readonly string[]).includes(language);
}

/** Bare country display name per language, used to fill a template's {country} slot. */
export const COUNTRY_DISPLAY_NAMES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: { fr: "France", gb: "Royaume-Uni", lk: "Sri Lanka" },
  de: { fr: "Frankreich", gb: "Vereinigtes Königreich", lk: "Sri Lanka" },
  es: { fr: "Francia", gb: "Reino Unido", lk: "Sri Lanka" },
  it: { fr: "Francia", gb: "Regno Unito", lk: "Sri Lanka" },
};

interface PageMetaTemplate {
  title: string;
  description: string;
}

/** {country} placeholder gets replaced with COUNTRY_DISPLAY_NAMES[language][country]. */
export const TRANSLATED_PAGE_META_TEMPLATES: Record<TranslatedLanguage, Record<CountryPageKey, PageMetaTemplate>> = {
  fr: {
    home: {
      title: "Services de Nettoyage Éco-Luxe Premium {country} | Pearly Sky",
      description:
        "Découvrez un service de nettoyage résidentiel et commercial éco-luxe d'élite — {country}. Entretien immobilier cinq étoiles avec des pratiques durables et hautement performantes.",
    },
    about: {
      title: "À Propos : Entretien de Propriétés Éco-Luxe {country} | Pearly Sky",
      description:
        "Découvrez l'histoire, les normes strictes et les valeurs qui animent Pearly Sky Global — {country}. Dédiés à l'entretien immobilier d'élite et au soutien lifestyle.",
    },
    customers: {
      title: "Avis et Témoignages Clients Vérifiés {country} | Pearly Sky",
      description:
        "Découvrez ce que nos clients disent de nous. Avis vérifiés de propriétaires premium, de bureaux d'entreprise et de propriétés de luxe — {country}.",
    },
    contact: {
      title: "Contactez Notre Équipe de Nettoyage Éco-Luxe {country} | Pearly Sky",
      description:
        "Contactez Pearly Sky Global — {country} pour toute demande de réservation ou devis personnalisé. Une assistance fiable et immédiate.",
    },
    careers: {
      title: "Carrières dans l'Entretien de Propriétés de Luxe {country} | Pearly Sky",
      description:
        "Construisez une carrière valorisante dans l'entretien de propriétés de luxe — {country}. Découvrez nos postes ouverts pour nettoyeurs professionnels et spécialistes premium.",
    },
    ourLocations: {
      title: "Nos Zones de Service {country} | Pearly Sky Global",
      description:
        "Des clusters de service premium — {country}. Trouvez votre portail de service Pearly Sky Global local et réservez un entretien éco-luxe d'élite.",
    },
    blog: {
      title: "Blog & Actualités Nettoyage Éco-Luxe {country} | Pearly Sky",
      description:
        "Conseils professionnels, guides d'entretien durable et insights sur l'entretien immobilier d'élite pour les espaces premium — {country}.",
    },
  },
  de: {
    home: {
      title: "Premium Eco-Luxus-Reinigungsdienste {country} | Pearly Sky",
      description:
        "Erleben Sie elitäre Eco-Luxus-Reinigung für Wohn- und Gewerbeimmobilien — {country}. Fünf-Sterne-Immobilienpflege mit nachhaltigen, leistungsstarken Methoden.",
    },
    about: {
      title: "Über Uns: Eco-Luxus-Immobilienpflege {country} | Pearly Sky",
      description:
        "Entdecken Sie die Geschichte, die strengen Standards und die Werte von Pearly Sky Global — {country}. Wir engagieren uns für erstklassige Immobilienpflege und Lifestyle-Unterstützung.",
    },
    customers: {
      title: "Verifizierte Kundenbewertungen & Erfahrungsberichte {country} | Pearly Sky",
      description:
        "Erfahren Sie, was unsere Kunden über uns sagen. Verifizierte Bewertungen von Premium-Hausbesitzern, Unternehmen und Luxusimmobilien — {country}.",
    },
    contact: {
      title: "Kontaktieren Sie Unser Eco-Luxus-Reinigungsteam {country} | Pearly Sky",
      description:
        "Kontaktieren Sie Pearly Sky Global — {country} für Buchungsanfragen oder individuelle Angebote. Zuverlässige, sofortige Unterstützung.",
    },
    careers: {
      title: "Karriere in der Luxus-Immobilienpflege {country} | Pearly Sky",
      description:
        "Starten Sie eine lohnende Karriere in der Luxus-Immobilienpflege — {country}. Entdecken Sie offene Stellen für professionelle Reinigungskräfte und Premium-Spezialisten.",
    },
    ourLocations: {
      title: "Unsere Servicestandorte {country} | Pearly Sky Global",
      description:
        "Premium-Servicecluster — {country}. Finden Sie Ihr lokales Pearly Sky Global Serviceportal und buchen Sie erstklassige Eco-Luxus-Pflege.",
    },
    blog: {
      title: "Eco-Luxus-Reinigungsblog & Einblicke {country} | Pearly Sky",
      description:
        "Professionelle Pflegeratschläge, nachhaltige Haushaltsführungs-Guides und Einblicke in die erstklassige Immobilienpflege für Premium-Räume — {country}.",
    },
  },
  es: {
    home: {
      title: "Servicios Premium de Limpieza Eco-Lujo {country} | Pearly Sky",
      description:
        "Descubra un servicio de limpieza residencial y comercial eco-lujo de primer nivel — {country}. Cuidado de propiedades cinco estrellas con prácticas sostenibles y de alto rendimiento.",
    },
    about: {
      title: "Sobre Nosotros: Cuidado de Propiedades Eco-Lujo {country} | Pearly Sky",
      description:
        "Descubra la historia, los estrictos estándares y los valores que impulsan a Pearly Sky Global — {country}. Dedicados al cuidado de propiedades de élite y al soporte de estilo de vida.",
    },
    customers: {
      title: "Opiniones y Testimonios Verificados de Clientes {country} | Pearly Sky",
      description:
        "Descubra lo que dicen nuestros clientes. Opiniones verificadas de propietarios premium, oficinas corporativas y propiedades de lujo — {country}.",
    },
    contact: {
      title: "Contacte a Nuestro Equipo de Limpieza Eco-Lujo {country} | Pearly Sky",
      description:
        "Póngase en contacto con Pearly Sky Global — {country} para consultas de reserva o cotizaciones personalizadas. Asistencia confiable e inmediata.",
    },
    careers: {
      title: "Carreras en el Cuidado de Propiedades de Lujo {country} | Pearly Sky",
      description:
        "Construya una carrera gratificante en el cuidado de propiedades de lujo — {country}. Explore vacantes para limpiadores profesionales y especialistas premium.",
    },
    ourLocations: {
      title: "Nuestras Ubicaciones de Servicio {country} | Pearly Sky Global",
      description:
        "Clústeres de servicio premium — {country}. Encuentre su portal de servicio local de Pearly Sky Global y reserve un cuidado eco-lujo de primer nivel.",
    },
    blog: {
      title: "Blog e Ideas de Limpieza Eco-Lujo {country} | Pearly Sky",
      description:
        "Consejos profesionales de cuidado, guías de limpieza sostenible e ideas sobre el mantenimiento de propiedades de élite para espacios premium — {country}.",
    },
  },
  it: {
    home: {
      title: "Servizi Premium di Pulizia Eco-Luxury {country} | Pearly Sky",
      description:
        "Scopri un servizio di pulizia residenziale e commerciale eco-luxury d'élite — {country}. Cura della proprietà a cinque stelle con pratiche sostenibili e ad alte prestazioni.",
    },
    about: {
      title: "Chi Siamo: Cura di Proprietà Eco-Luxury {country} | Pearly Sky",
      description:
        "Scopri la storia, gli standard rigorosi e i valori che guidano Pearly Sky Global — {country}. Dedicati alla cura delle proprietà d'élite e al supporto lifestyle.",
    },
    customers: {
      title: "Recensioni e Testimonianze Verificate dei Clienti {country} | Pearly Sky",
      description:
        "Scopri cosa dicono di noi i nostri clienti. Recensioni verificate di proprietari premium, uffici aziendali e proprietà di lusso — {country}.",
    },
    contact: {
      title: "Contatta il Nostro Team di Pulizia Eco-Luxury {country} | Pearly Sky",
      description:
        "Contatta Pearly Sky Global — {country} per richieste di prenotazione o preventivi personalizzati. Assistenza affidabile e immediata.",
    },
    careers: {
      title: "Carriere nella Cura di Proprietà di Lusso {country} | Pearly Sky",
      description:
        "Costruisci una carriera gratificante nella cura delle proprietà di lusso — {country}. Scopri le posizioni aperte per addetti alle pulizie professionali e specialisti premium.",
    },
    ourLocations: {
      title: "Le Nostre Sedi di Servizio {country} | Pearly Sky Global",
      description:
        "Cluster di servizio premium — {country}. Trova il tuo portale di servizio Pearly Sky Global locale e prenota una cura eco-luxury d'élite.",
    },
    blog: {
      title: "Blog e Approfondimenti sulla Pulizia Eco-Luxury {country} | Pearly Sky",
      description:
        "Consigli professionali, guide alla pulizia sostenibile e approfondimenti sulla manutenzione di proprietà d'élite per spazi premium — {country}.",
    },
  },
};

/**
 * Returns the templated title/description for a translated language, or
 * null if `language` has no template (caller should fall back to English).
 */
export function getTranslatedCountryPageMeta(
  page: CountryPageKey,
  country: CountryCode,
  language: LanguageCode,
): PageMeta | null {
  if (!isTranslatedLanguage(language)) return null;
  const name = COUNTRY_DISPLAY_NAMES[language][country];
  const template = TRANSLATED_PAGE_META_TEMPLATES[language][page];
  return {
    title: template.title.replace("{country}", name),
    description: template.description.replace("{country}", name),
  };
}
