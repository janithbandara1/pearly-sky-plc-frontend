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
 * Titles append a short bare country label ({country}, e.g. "UK") — proper-
 * noun labels need no grammatical agreement, and a short label keeps titles
 * from being truncated in search results. Descriptions use a full
 * prepositional phrase ({inCountry}, e.g. "au Royaume-Uni", "im Vereinigten
 * Königreich") so the sentence reads naturally in each language.
 */
export const TRANSLATED_LANGUAGES = ["fr", "de", "es", "it"] as const;
type TranslatedLanguage = (typeof TRANSLATED_LANGUAGES)[number];

function isTranslatedLanguage(language: LanguageCode): language is TranslatedLanguage {
  return (TRANSLATED_LANGUAGES as readonly string[]).includes(language);
}

/** Short bare country label per language, used to fill a template's {country} slot (titles). */
export const COUNTRY_DISPLAY_NAMES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: { fr: "France", gb: "Royaume-Uni", lk: "Sri Lanka" },
  de: { fr: "Frankreich", gb: "UK", lk: "Sri Lanka" },
  es: { fr: "Francia", gb: "Reino Unido", lk: "Sri Lanka" },
  it: { fr: "Francia", gb: "Regno Unito", lk: "Sri Lanka" },
};

/** "in {country}" with the right preposition/article per language, used to fill a template's {inCountry} slot (descriptions). */
export const COUNTRY_IN_PHRASES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: { fr: "en France", gb: "au Royaume-Uni", lk: "au Sri Lanka" },
  de: { fr: "in Frankreich", gb: "im Vereinigten Königreich", lk: "in Sri Lanka" },
  es: { fr: "en Francia", gb: "en el Reino Unido", lk: "en Sri Lanka" },
  it: { fr: "in Francia", gb: "nel Regno Unito", lk: "in Sri Lanka" },
};

interface PageMetaTemplate {
  title: string;
  description: string;
}

/** {country} is replaced with COUNTRY_DISPLAY_NAMES, {inCountry} with COUNTRY_IN_PHRASES. */
export const TRANSLATED_PAGE_META_TEMPLATES: Record<TranslatedLanguage, Record<CountryPageKey, PageMetaTemplate>> = {
  fr: {
    home: {
      title: "Pearly Sky | Services de nettoyage premium {country}",
      description:
        "Un nettoyage professionnel et attentionné pour les logements et les espaces de travail dans une sélection de villes {inCountry}.",
    },
    about: {
      title: "À propos de Pearly Sky | Nettoyage professionnel {country}",
      description:
        "Découvrez l'approche de Pearly Sky en matière de nettoyage professionnel résidentiel, commercial et spécialisé dans une sélection de villes {inCountry}.",
    },
    customers: {
      title: "Nos clients | Services de nettoyage Pearly Sky {country}",
      description:
        "Découvrez comment Pearly Sky accompagne propriétaires, familles, gestionnaires de biens et entreprises avec des services de nettoyage professionnels adaptés à leurs espaces dans une sélection de villes {inCountry}.",
    },
    contact: {
      title: "Contacter Pearly Sky | Services de nettoyage professionnels {country}",
      description:
        "Contactez Pearly Sky pour des services professionnels de nettoyage de logements, de bureaux et spécialisés dans une sélection de villes {inCountry}. Demandez un devis personnalisé ou renseignez-vous sur nos services.",
    },
    careers: {
      title: "Carrières chez Pearly Sky | Emplois dans le nettoyage {inCountry}",
      description:
        "Découvrez les opportunités de carrière chez Pearly Sky : postes dans le nettoyage et les services professionnels, et comment manifester votre intérêt pour rejoindre notre équipe {inCountry}.",
    },
    ourLocations: {
      title: "Nos implantations | Services de nettoyage Pearly Sky",
      description:
        "Découvrez les implantations de Pearly Sky et un nettoyage professionnel et écoresponsable pour les logements et les espaces de travail dans nos zones d'intervention.",
    },
    blog: {
      title: "Blog & Actualités Nettoyage Éco-Luxe {country} | Pearly Sky",
      description:
        "Conseils professionnels, guides d'entretien durable et insights sur l'entretien immobilier d'élite pour les espaces premium {inCountry}.",
    },
  },
  de: {
    home: {
      title: "Pearly Sky | Premium-Reinigungsservice {country}",
      description:
        "Durchdachte, professionelle Reinigung für Wohnungen, Häuser und Arbeitsräume an ausgewählten Standorten {inCountry}.",
    },
    about: {
      title: "Über Pearly Sky | Professionelle Reinigung {country}",
      description:
        "Erfahren Sie mehr über den Ansatz von Pearly Sky für professionelle Wohn-, Gewerbe- und Spezialreinigung an ausgewählten Standorten {inCountry}.",
    },
    customers: {
      title: "Unsere Kunden | Pearly Sky Reinigungsservice {country}",
      description:
        "Erfahren Sie, wie Pearly Sky Hausbesitzer, Familien, Immobilieneigentümer und Unternehmen an ausgewählten Standorten {inCountry} mit professionellen, auf ihre Räume abgestimmten Reinigungsleistungen unterstützt.",
    },
    contact: {
      title: "Pearly Sky kontaktieren | Professionelle Reinigung {country}",
      description:
        "Kontaktieren Sie Pearly Sky für professionelle Haus-, Büro- und Spezialreinigung an ausgewählten Standorten {inCountry}. Fordern Sie ein individuelles Angebot an oder informieren Sie sich über unsere Leistungen.",
    },
    careers: {
      title: "Karriere bei Pearly Sky | Reinigungsjobs {inCountry}",
      description:
        "Entdecken Sie Karrieremöglichkeiten bei Pearly Sky: mögliche Stellen in der Reinigung und im professionellen Service – und wie Sie Ihr Interesse bekunden, unserem Team {inCountry} beizutreten.",
    },
    ourLocations: {
      title: "Unsere Standorte | Pearly Sky Reinigungsservice",
      description:
        "Entdecken Sie die Standorte von Pearly Sky und professionelle, umweltbewusste Reinigung für Wohn- und Arbeitsräume in unseren Einsatzgebieten.",
    },
    blog: {
      title: "Eco-Luxus-Reinigungsblog & Einblicke {country} | Pearly Sky",
      description:
        "Professionelle Pflegeratschläge, nachhaltige Haushaltsführungs-Guides und Einblicke in die erstklassige Immobilienpflege für Premium-Räume {inCountry}.",
    },
  },
  es: {
    home: {
      title: "Pearly Sky | Servicios de limpieza premium {country}",
      description:
        "Limpieza profesional y cuidadosa para hogares y espacios de trabajo en zonas seleccionadas {inCountry}.",
    },
    about: {
      title: "Sobre Pearly Sky | Limpieza profesional {country}",
      description:
        "Descubra el enfoque de Pearly Sky en la limpieza profesional residencial, comercial y especializada en zonas seleccionadas {inCountry}.",
    },
    customers: {
      title: "Nuestros clientes | Servicios de limpieza Pearly Sky {country}",
      description:
        "Descubra cómo Pearly Sky atiende a propietarios, familias, gestores de inmuebles y empresas con servicios de limpieza profesionales adaptados a sus espacios en zonas seleccionadas {inCountry}.",
    },
    contact: {
      title: "Contactar con Pearly Sky | Limpieza profesional {country}",
      description:
        "Contacte con Pearly Sky para servicios profesionales de limpieza de hogares, oficinas y limpieza especializada en zonas seleccionadas {inCountry}. Solicite un presupuesto personalizado o infórmese sobre nuestros servicios.",
    },
    careers: {
      title: "Empleo en Pearly Sky | Trabajos de limpieza {inCountry}",
      description:
        "Descubra oportunidades profesionales en Pearly Sky: posibles puestos de limpieza y servicios profesionales, y cómo expresar su interés en unirse a nuestro equipo {inCountry}.",
    },
    ourLocations: {
      title: "Nuestras ubicaciones | Servicios de limpieza Pearly Sky",
      description:
        "Explore las ubicaciones de Pearly Sky y descubra una limpieza profesional y respetuosa con el medio ambiente para hogares y espacios de trabajo en nuestras zonas de servicio.",
    },
    blog: {
      title: "Blog e Ideas de Limpieza Eco-Lujo {country} | Pearly Sky",
      description:
        "Consejos profesionales de cuidado, guías de limpieza sostenible e ideas sobre el mantenimiento de propiedades de élite para espacios premium {inCountry}.",
    },
  },
  it: {
    home: {
      title: "Pearly Sky | Servizi di pulizia premium {country}",
      description:
        "Pulizie professionali e accurate per abitazioni e spazi di lavoro in località selezionate {inCountry}.",
    },
    about: {
      title: "Chi è Pearly Sky | Pulizie professionali {country}",
      description:
        "Scopri l'approccio di Pearly Sky alle pulizie professionali residenziali, commerciali e specialistiche in località selezionate {inCountry}.",
    },
    customers: {
      title: "I nostri clienti | Servizi di pulizia Pearly Sky {country}",
      description:
        "Scopri come Pearly Sky supporta proprietari di casa, famiglie, proprietari di immobili e aziende con servizi di pulizia professionali su misura per i loro spazi in località selezionate {inCountry}.",
    },
    contact: {
      title: "Contatta Pearly Sky | Servizi di pulizia professionali {country}",
      description:
        "Contatta Pearly Sky per servizi professionali di pulizia di abitazioni, uffici e pulizie specialistiche in località selezionate {inCountry}. Richiedi un preventivo personalizzato o informazioni sui nostri servizi.",
    },
    careers: {
      title: "Lavora con Pearly Sky | Lavoro nelle pulizie {inCountry}",
      description:
        "Scopri le opportunità di carriera con Pearly Sky: possibili ruoli nelle pulizie e nei servizi professionali, e come manifestare il tuo interesse a entrare nel nostro team {inCountry}.",
    },
    ourLocations: {
      title: "Le nostre sedi | Servizi di pulizia Pearly Sky",
      description:
        "Esplora le sedi di Pearly Sky e scopri pulizie professionali ed ecosostenibili per abitazioni e spazi di lavoro nelle nostre aree di servizio.",
    },
    blog: {
      title: "Blog e Approfondimenti sulla Pulizia Eco-Luxury {country} | Pearly Sky",
      description:
        "Consigli professionali, guide alla pulizia sostenibile e approfondimenti sulla manutenzione di proprietà d'élite per spazi premium {inCountry}.",
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
  const template = TRANSLATED_PAGE_META_TEMPLATES[language][page];
  const fill = (text: string) =>
    text
      .replaceAll("{country}", COUNTRY_DISPLAY_NAMES[language][country])
      .replaceAll("{inCountry}", COUNTRY_IN_PHRASES[language][country]);
  return { title: fill(template.title), description: fill(template.description) };
}
