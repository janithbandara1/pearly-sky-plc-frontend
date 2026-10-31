import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

interface ServiceMeta {
  title: string;
  description: string;
}

interface CountryPhrases {
  /** Localized "in <country>" — "in France", "au Royaume-Uni", "im Vereinigten Königreich"… */
  in: string;
  /** "Pearly Sky France" / "Pearly Sky UK" / "Pearly Sky Sri Lanka" (not translated) */
  brand: string;
  /** Title-style country name — "Deep Cleaning Services France / UK / Sri Lanka". */
  country: string;
  /** Country as a sentence object — "across France", "across the UK". */
  place: string;
}

const COUNTRY_PHRASES: Record<CountryCode, Record<LanguageCode, CountryPhrases>> = {
  fr: {
    en: { in: "in France", brand: "Pearly Sky France", country: "France", place: "France" },
    fr: { in: "en France", brand: "Pearly Sky France", country: "France", place: "la France" },
  },
  gb: {
    en: { in: "in the UK", brand: "Pearly Sky UK", country: "UK", place: "the UK" },
    fr: { in: "au Royaume-Uni", brand: "Pearly Sky UK", country: "Royaume-Uni", place: "le Royaume-Uni" },
  },
  lk: {
    en: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "Sri Lanka" },
    fr: { in: "au Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "le Sri Lanka" },
  },
};

/**
 * Approved SEO <title>/<meta description> copy per service and language,
 * keyed by service slug. "{in}", "{brand}", "{country}" and "{place}" are
 * filled from COUNTRY_PHRASES for the current deployment's country, so each
 * country's site names itself. Takes precedence over the catalog API's SEO
 * fields — see generateMetadata() in app/(site)/services/[serviceSlug]/page.tsx.
 * A language with no entry here falls back to the catalog API's copy.
 */
const APPROVED_SERVICE_META: Record<string, Partial<Record<LanguageCode, ServiceMeta>>> = {
  "deep-cleaning": {
    en: {
      title: "Deep Cleaning Services {country} | Pearly Sky",
      description:
        "Give your home a thorough refresh with Pearly Sky deep cleaning services. Explore detailed cleaning options tailored to your property and request a personalised quote {in}.",
    },
    fr: {
      title: "Services de nettoyage en profondeur {country} | Pearly Sky",
      description:
        "Offrez à votre logement un renouveau complet avec les services de nettoyage en profondeur Pearly Sky. Découvrez des options de nettoyage détaillées adaptées à votre bien et demandez un devis personnalisé {in}.",
    },
  },
  "end-of-tenancy-cleaning": {
    en: {
      title: "End of Tenancy Cleaning {country} | Pearly Sky",
      description:
        "Prepare your property for handover with Pearly Sky end of tenancy cleaning. Explore tailored move-out cleaning options for apartments and houses in selected locations across {place}.",
    },
    fr: {
      title: "Nettoyage de fin de bail {country} | Pearly Sky",
      description:
        "Préparez votre bien pour la remise des clés avec le nettoyage de fin de bail Pearly Sky. Découvrez des options de nettoyage de départ adaptées aux appartements et maisons dans une sélection de villes {in}.",
    },
  },
  "post-construction-renovation-cleaning": {
    en: {
      title: "Post-Construction Cleaning {country} | Pearly Sky",
      description:
        "Get your property ready after building work or renovation with Pearly Sky post-construction cleaning. Enquire about tailored cleaning for homes and commercial spaces across selected locations {in}.",
    },
    fr: {
      title: "Nettoyage après travaux {country} | Pearly Sky",
      description:
        "Préparez votre bien après des travaux de construction ou de rénovation avec le nettoyage après travaux Pearly Sky. Renseignez-vous sur un nettoyage adapté aux logements et locaux commerciaux dans une sélection de villes {in}.",
    },
  },
  "premium-rental-concierge-cleaning": {
    en: {
      title: "Premium Rental Concierge Cleaning {country} | Pearly Sky",
      description:
        "Elevate your rental property's presentation with Pearly Sky premium concierge cleaning. Tailored cleaning support for holiday rentals, apartments and managed properties across selected locations {in}.",
    },
    fr: {
      title: "Nettoyage conciergerie pour locations premium {country} | Pearly Sky",
      description:
        "Sublimez la présentation de votre bien locatif avec le nettoyage conciergerie premium Pearly Sky. Un accompagnement sur mesure pour locations saisonnières, appartements et biens gérés dans une sélection de villes {in}.",
    },
  },
  "commercial-office-cleaning": {
    en: {
      title: "Commercial & Office Cleaning {country} | Pearly Sky",
      description:
        "Maintain a clean, welcoming workplace with Pearly Sky commercial and office cleaning services. Enquire about tailored cleaning plans for offices and business premises across selected locations {in}.",
    },
    fr: {
      title: "Nettoyage de bureaux et locaux commerciaux {country} | Pearly Sky",
      description:
        "Maintenez un lieu de travail propre et accueillant avec les services de nettoyage commercial et de bureaux Pearly Sky. Renseignez-vous sur des plans de nettoyage adaptés aux bureaux et locaux professionnels dans une sélection de villes {in}.",
    },
  },
  "healthguard-sanitization": {
    en: {
      title: "HealthGuard Sanitization {country} | Pearly Sky",
      description:
        "Discover Pearly Sky HealthGuard Sanitization for homes and workplaces. Enquire about professional hygiene-focused cleaning and suitable sanitization options {in}.",
    },
    fr: {
      title: "HealthGuard Sanitization {country} | Pearly Sky",
      description:
        "Découvrez HealthGuard Sanitization de Pearly Sky pour logements et lieux de travail. Renseignez-vous sur un nettoyage professionnel axé sur l'hygiène et des options de désinfection adaptées {in}.",
    },
  },
  "carpet-upholstery-cleaning": {
    en: {
      title: "Carpet & Upholstery Cleaning {country} | Pearly Sky",
      description:
        "Refresh carpets, rugs and upholstered furniture with Pearly Sky cleaning services. Enquire about suitable cleaning options for your home or workspace in selected locations across {place}.",
    },
    fr: {
      title: "Nettoyage de tapis et de tissus d'ameublement {country} | Pearly Sky",
      description:
        "Ravivez moquettes, tapis et meubles rembourrés avec les services de nettoyage Pearly Sky. Renseignez-vous sur les options adaptées à votre logement ou espace de travail dans une sélection de villes {in}.",
    },
  },
  "steam-cleaning": {
    en: {
      title: "Steam Cleaning Services {country} | Pearly Sky",
      description:
        "Discover Pearly Sky steam cleaning for suitable surfaces in homes and workspaces. Enquire about tailored cleaning options in selected locations across {place}, subject to availability.",
    },
    fr: {
      title: "Services de nettoyage à la vapeur {country} | Pearly Sky",
      description:
        "Découvrez le nettoyage à la vapeur Pearly Sky pour les surfaces adaptées des logements et espaces de travail. Renseignez-vous sur des options sur mesure dans une sélection de villes {in}, sous réserve de disponibilité.",
    },
  },
  "post-event-cleaning": {
    en: {
      title: "Post-Event Cleaning Services | Pearly Sky",
      description:
        "Restore your venue after a gathering with Pearly Sky post-event cleaning. Enquire about tailored cleanup for private events, offices and commercial venues across selected locations {in}.",
    },
    fr: {
      title: "Services de nettoyage après événement | Pearly Sky",
      description:
        "Remettez votre lieu en état après une réception avec le nettoyage après événement Pearly Sky. Renseignez-vous sur un nettoyage adapté aux événements privés, bureaux et lieux commerciaux dans une sélection de villes {in}.",
    },
  },
  "pool-cleaning": {
    en: {
      title: "Swimming Pool Cleaning Services {country} | Pearly Sky",
      description:
        "Keep your pool area fresh and inviting with Pearly Sky swimming pool cleaning enquiries. Explore pool-surface and surrounding-area cleaning options in selected locations across {place}, subject to availability.",
    },
    fr: {
      title: "Services de nettoyage de piscine {country} | Pearly Sky",
      description:
        "Gardez votre espace piscine propre et accueillant grâce aux demandes de nettoyage de piscine Pearly Sky. Découvrez des options pour les surfaces du bassin et ses abords dans une sélection de villes {in}, sous réserve de disponibilité.",
    },
  },
  "precision-pressure-washing": {
    en: {
      title: "Pressure Washing Services {country} | Pearly Sky",
      description:
        "Refresh suitable outdoor surfaces with Pearly Sky pressure washing services. Enquire about cleaning patios, driveways and exterior hard surfaces in selected locations across {place}.",
    },
    fr: {
      title: "Services de nettoyage haute pression {country} | Pearly Sky",
      description:
        "Ravivez les surfaces extérieures adaptées avec les services de nettoyage haute pression Pearly Sky. Renseignez-vous sur le nettoyage des terrasses, allées et surfaces dures extérieures dans une sélection de villes {in}.",
    },
  },
  "high-security-property-care": {
    en: {
      title: "Discreet Property Care Services {in} | Pearly Sky",
      description:
        "Discreet cleaning and property-care support for private residences and controlled-access locations, with service arrangements tailored to client requirements.",
    },
    fr: {
      title: "Entretien discret de propriétés {in} | Pearly Sky",
      description:
        "Nettoyage discret et entretien de propriétés pour résidences privées et sites à accès contrôlé, avec des modalités adaptées aux exigences de chaque client.",
    },
  },
  "luxury-yacht-cleaning": {
    en: {
      title: "Luxury Yacht Cleaning Services {country} | Pearly Sky",
      description:
        "Discover Pearly Sky luxury yacht cleaning enquiries for yacht interiors and suitable exterior surfaces. Request tailored cleaning support in selected coastal locations {in}, subject to availability.",
    },
    fr: {
      title: "Services de nettoyage de yachts de luxe {country} | Pearly Sky",
      description:
        "Découvrez les demandes de nettoyage de yachts de luxe Pearly Sky pour les intérieurs et les surfaces extérieures adaptées. Demandez un accompagnement sur mesure dans une sélection de zones côtières {in}, sous réserve de disponibilité.",
    },
  },
  "child-care-service": {
    en: {
      title: "Pearly Sky Children Care Service {country} | Pearly Sky",
      description:
        "Explore Pearly Sky children care service enquiries {in}. Contact us to discuss your family's needs, service availability and suitable care arrangements.",
    },
    fr: {
      title: "Service de garde d'enfants Pearly Sky {country} | Pearly Sky",
      description:
        "Découvrez les demandes de garde d'enfants Pearly Sky {in}. Contactez-nous pour parler des besoins de votre famille, des disponibilités et des modalités de garde adaptées.",
    },
  },
  "elder-care-service": {
    en: {
      title: "Elderly Care Services {country} | Pearly Sky",
      description:
        "Explore Pearly Sky elderly care service enquiries {in}. Contact us to discuss support needs, available services and suitable arrangements for older adults.",
    },
    fr: {
      title: "Services d'aide aux personnes âgées {country} | Pearly Sky",
      description:
        "Découvrez les demandes d'aide aux personnes âgées Pearly Sky {in}. Contactez-nous pour parler des besoins d'accompagnement, des services disponibles et des modalités adaptées aux seniors.",
    },
  },
  "regular-home-cleaning": {
    en: {
      title: "Regular Home Cleaning {country} | Pearly Sky",
      description:
        "Keep your home fresh and comfortable with Pearly Sky regular home cleaning. Explore tailored cleaning services for your living space and request a personalised quote {in}.",
    },
    fr: {
      title: "Ménage régulier à domicile {country} | Pearly Sky",
      description:
        "Gardez votre intérieur frais et confortable avec le ménage régulier Pearly Sky. Découvrez des services de nettoyage adaptés à votre logement et demandez un devis personnalisé {in}.",
    },
  },
  "essential-touch-up-cleaning": {
    en: {
      title: "Essential Touch-Up Cleaning {country} | Pearly Sky",
      description:
        "Refresh your home with Pearly Sky essential touch-up cleaning. Enjoy focused care for everyday mess, high-use areas and key surfaces. Enquire about availability and pricing {in}.",
    },
    fr: {
      title: "Nettoyage de rafraîchissement essentiel {country} | Pearly Sky",
      description:
        "Redonnez de l'éclat à votre logement avec le nettoyage de rafraîchissement essentiel Pearly Sky : un soin ciblé pour le désordre du quotidien, les zones très fréquentées et les surfaces clés. Renseignez-vous sur les disponibilités et les tarifs {in}.",
    },
  },
  "same-day-priority-cleaning": {
    en: {
      title: "Same-Day Cleaning Services {country} | Pearly Sky",
      description:
        "Need cleaning at short notice? Contact Pearly Sky for same-day priority cleaning enquiries for homes and workspaces in selected locations across {place}, subject to availability.",
    },
    fr: {
      title: "Services de nettoyage le jour même {country} | Pearly Sky",
      description:
        "Besoin d'un nettoyage à la dernière minute ? Contactez Pearly Sky pour un nettoyage prioritaire le jour même pour logements et espaces de travail dans une sélection de villes {in}, sous réserve de disponibilité.",
    },
  },
  "laundry-service": {
    en: {
      title: "Laundry Services {country} | Pearly Sky",
      description:
        "Discover Pearly Sky laundry services for homes and rental properties. Enquire about washing, drying, folding and linen care options in selected locations across {place}, subject to availability.",
    },
    fr: {
      title: "Services de blanchisserie {country} | Pearly Sky",
      description:
        "Découvrez les services de blanchisserie Pearly Sky pour logements et biens locatifs. Renseignez-vous sur le lavage, le séchage, le pliage et l'entretien du linge dans une sélection de villes {in}, sous réserve de disponibilité.",
    },
  },
  "move-in-out-transport-service": {
    en: {
      title: "Moving In & Out Services {country} | Pearly Sky",
      description:
        "Make moving easier with Pearly Sky moving support, move-in and move-out cleaning enquiries, and transport options. Contact us to discuss your requirements {in}.",
    },
    fr: {
      title: "Services d'emménagement et de déménagement {country} | Pearly Sky",
      description:
        "Simplifiez votre déménagement avec Pearly Sky : aide au déménagement, nettoyage d'entrée et de sortie des lieux et options de transport. Contactez-nous pour discuter de vos besoins {in}.",
    },
  },
};

function fill(text: string, phrases: CountryPhrases): string {
  return text
    .replaceAll("{in}", phrases.in)
    .replaceAll("{brand}", phrases.brand)
    .replaceAll("{country}", phrases.country)
    .replaceAll("{place}", phrases.place);
}

/**
 * Approved request-a-quote page copy. "{name}" is the localized service name
 * — lowercased mid-sentence except in German, where nouns stay capitalized.
 */
const QUOTE_META: Record<LanguageCode, ServiceMeta> = {
  en: {
    title: "Request a Quote — {Name} | Pearly Sky",
    description: "Request a free, no-obligation quote for {name} with Pearly Sky {in}.",
  },
  fr: {
    title: "Demander un Devis — {Name} | Pearly Sky",
    description: "Demandez un devis gratuit et sans engagement pour {name} avec Pearly Sky {in}.",
  },
};

export function getQuoteMeta(serviceName: string, language: LanguageCode): ServiceMeta {
  const { title, description } = QUOTE_META[language];
  const fillQuote = (text: string) =>
    fill(text, COUNTRY_PHRASES[CURRENT_COUNTRY][language])
      .replaceAll("{Name}", serviceName)
      .replaceAll("{name}", serviceName.toLowerCase());
  return { title: fillQuote(title), description: fillQuote(description) };
}

export function getServiceMeta(slug: string, language: LanguageCode): ServiceMeta | undefined {
  const approved = APPROVED_SERVICE_META[slug]?.[language];
  if (approved) {
    const phrases = COUNTRY_PHRASES[CURRENT_COUNTRY][language];
    return { title: fill(approved.title, phrases), description: fill(approved.description, phrases) };
  }
  return undefined;
}
