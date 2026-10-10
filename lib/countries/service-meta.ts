import { CURRENT_COUNTRY, SUPPORTED_COUNTRIES, type CountryCode } from "./config";
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
}

const COUNTRY_PHRASES: Record<CountryCode, Record<LanguageCode, CountryPhrases>> = {
  fr: {
    en: { in: "in France", brand: "Pearly Sky France" },
    fr: { in: "en France", brand: "Pearly Sky France" },
    de: { in: "in Frankreich", brand: "Pearly Sky France" },
    es: { in: "en Francia", brand: "Pearly Sky France" },
    it: { in: "in Francia", brand: "Pearly Sky France" },
  },
  gb: {
    en: { in: "in the UK", brand: "Pearly Sky UK" },
    fr: { in: "au Royaume-Uni", brand: "Pearly Sky UK" },
    de: { in: "im Vereinigten Königreich", brand: "Pearly Sky UK" },
    es: { in: "en el Reino Unido", brand: "Pearly Sky UK" },
    it: { in: "nel Regno Unito", brand: "Pearly Sky UK" },
  },
  lk: {
    en: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka" },
    fr: { in: "au Sri Lanka", brand: "Pearly Sky Sri Lanka" },
    de: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka" },
    es: { in: "en Sri Lanka", brand: "Pearly Sky Sri Lanka" },
    it: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka" },
  },
};

/**
 * Approved SEO <title>/<meta description> copy per service and language,
 * keyed by service slug. "{in}" and "{brand}" are filled from
 * COUNTRY_PHRASES for the current deployment's country, so each country's
 * site names itself. Takes precedence over the catalog API's SEO fields —
 * see generateMetadata() in app/(site)/services/[serviceSlug]/page.tsx.
 */
const APPROVED_SERVICE_META: Record<string, Record<LanguageCode, ServiceMeta>> = {
  "deep-cleaning": {
    en: {
      title: "Deep Cleaning Services {in} | Pearly Sky",
      description:
        "Detailed deep cleaning for homes, apartments and premium properties {in}, including kitchens, bathrooms, living areas and high-touch surfaces.",
    },
    fr: {
      title: "Services de nettoyage en profondeur {in} | Pearly Sky",
      description:
        "Nettoyage en profondeur minutieux pour maisons, appartements et propriétés haut de gamme {in}, y compris cuisines, salles de bain, pièces de vie et surfaces fréquemment touchées.",
    },
    de: {
      title: "Grundreinigung {in} | Pearly Sky",
      description:
        "Gründliche Grundreinigung für Häuser, Wohnungen und hochwertige Immobilien {in}, einschließlich Küchen, Bädern, Wohnbereichen und häufig berührter Oberflächen.",
    },
    es: {
      title: "Servicios de limpieza profunda {in} | Pearly Sky",
      description:
        "Limpieza profunda y detallada para viviendas, apartamentos y propiedades premium {in}, incluidas cocinas, baños, zonas de estar y superficies de contacto frecuente.",
    },
    it: {
      title: "Servizi di pulizia profonda {in} | Pearly Sky",
      description:
        "Pulizia profonda e accurata per case, appartamenti e proprietà di pregio {in}, incluse cucine, bagni, zone giorno e superfici toccate di frequente.",
    },
  },
  "end-of-tenancy-cleaning": {
    en: {
      title: "End-of-Tenancy Cleaning {in} | Pearly Sky",
      description:
        "Thorough end-of-tenancy cleaning for move-ins, move-outs and property handovers {in}. Designed to help leave your property clean and ready for inspection.",
    },
    fr: {
      title: "Nettoyage de fin de bail {in} | Pearly Sky",
      description:
        "Nettoyage complet de fin de bail pour emménagements, déménagements et remises de clés {in}. Conçu pour vous aider à rendre un logement propre et prêt pour l'état des lieux.",
    },
    de: {
      title: "Endreinigung bei Mietende {in} | Pearly Sky",
      description:
        "Gründliche Endreinigung für Ein- und Auszüge sowie Objektübergaben {in}. Damit Ihre Immobilie sauber und bereit für die Abnahme ist.",
    },
    es: {
      title: "Limpieza de fin de alquiler {in} | Pearly Sky",
      description:
        "Limpieza a fondo de fin de alquiler para entradas, salidas y entregas de inmuebles {in}. Pensada para ayudarle a dejar la propiedad limpia y lista para la inspección.",
    },
    it: {
      title: "Pulizia di fine locazione {in} | Pearly Sky",
      description:
        "Pulizia accurata di fine locazione per ingressi, traslochi e consegne di immobili {in}. Pensata per aiutarvi a lasciare l'immobile pulito e pronto per l'ispezione.",
    },
  },
  "post-construction-renovation-cleaning": {
    en: {
      title: "Post-Construction & Renovation Cleaning | {brand}",
      description:
        "Professional post-construction and renovation cleaning to remove dust, debris and marks before move-in, handover or reopening.",
    },
    fr: {
      title: "Nettoyage post-travaux & rénovation | {brand}",
      description:
        "Nettoyage professionnel après travaux et rénovation pour éliminer poussière, débris et traces avant un emménagement, une remise de clés ou une réouverture.",
    },
    de: {
      title: "Reinigung nach Bau & Renovierung | {brand}",
      description:
        "Professionelle Reinigung nach Bau- und Renovierungsarbeiten, die Staub, Schutt und Spuren vor Einzug, Übergabe oder Wiedereröffnung entfernt.",
    },
    es: {
      title: "Limpieza post-obra y reforma | {brand}",
      description:
        "Limpieza profesional tras obras y reformas para eliminar polvo, escombros y marcas antes de la mudanza, la entrega o la reapertura.",
    },
    it: {
      title: "Pulizia post-cantiere e ristrutturazione | {brand}",
      description:
        "Pulizia professionale dopo lavori edili e ristrutturazioni per rimuovere polvere, detriti e segni prima del trasloco, della consegna o della riapertura.",
    },
  },
  "premium-rental-concierge-cleaning": {
    en: {
      title: "Premium Rental Turnover Cleaning {in} | Pearly Sky",
      description:
        "Premium cleaning and turnover support for short-term and luxury rental properties, with optional linen and guest-ready preparation services.",
    },
    fr: {
      title: "Ménage de rotation pour locations premium {in} | Pearly Sky",
      description:
        "Ménage haut de gamme et gestion des rotations pour locations courte durée et de luxe, avec services optionnels de linge et de préparation pour l'accueil des voyageurs.",
    },
    de: {
      title: "Wechselreinigung für Premium-Mietobjekte {in} | Pearly Sky",
      description:
        "Hochwertige Reinigung und Wechselservice für Kurzzeit- und Luxusvermietungen, mit optionalem Wäscheservice und Vorbereitung für die Ankunft der Gäste.",
    },
    es: {
      title: "Limpieza de rotación para alquileres premium {in} | Pearly Sky",
      description:
        "Limpieza premium y gestión de rotaciones para alquileres de corta estancia y de lujo, con servicios opcionales de ropa de cama y preparación para huéspedes.",
    },
    it: {
      title: "Pulizia di cambio ospiti per affitti premium {in} | Pearly Sky",
      description:
        "Pulizia premium e gestione del cambio ospiti per affitti brevi e di lusso, con servizi opzionali di biancheria e preparazione per l'arrivo degli ospiti.",
    },
  },
  "commercial-office-cleaning": {
    en: {
      title: "Commercial & Office Cleaning {in} | Pearly Sky",
      description:
        "Professional commercial and office cleaning for workplaces, shared spaces and business premises {in}, tailored to your schedule and requirements.",
    },
    fr: {
      title: "Nettoyage de bureaux et locaux commerciaux {in} | Pearly Sky",
      description:
        "Nettoyage professionnel de bureaux et locaux commerciaux pour lieux de travail, espaces partagés et locaux professionnels {in}, adapté à vos horaires et à vos besoins.",
    },
    de: {
      title: "Gewerbe- & Büroreinigung {in} | Pearly Sky",
      description:
        "Professionelle Gewerbe- und Büroreinigung für Arbeitsplätze, Gemeinschaftsflächen und Geschäftsräume {in}, abgestimmt auf Ihren Zeitplan und Ihre Anforderungen.",
    },
    es: {
      title: "Limpieza comercial y de oficinas {in} | Pearly Sky",
      description:
        "Limpieza profesional comercial y de oficinas para lugares de trabajo, espacios compartidos y locales de empresa {in}, adaptada a sus horarios y necesidades.",
    },
    it: {
      title: "Pulizia commerciale e di uffici {in} | Pearly Sky",
      description:
        "Pulizia professionale commerciale e di uffici per luoghi di lavoro, spazi condivisi e locali aziendali {in}, su misura per i vostri orari e le vostre esigenze.",
    },
  },
  "healthguard-sanitization": {
    en: {
      title: "HealthGuard Surface Disinfection Service | {brand}",
      description:
        "Targeted cleaning and surface disinfection for frequently touched areas in homes, offices and shared spaces. Service availability depends on location and requirements.",
    },
    fr: {
      title: "Service de désinfection des surfaces HealthGuard | {brand}",
      description:
        "Nettoyage ciblé et désinfection des surfaces fréquemment touchées dans les logements, bureaux et espaces partagés. Disponibilité selon le lieu et les besoins.",
    },
    de: {
      title: "HealthGuard Oberflächendesinfektion | {brand}",
      description:
        "Gezielte Reinigung und Desinfektion häufig berührter Oberflächen in Wohnungen, Büros und Gemeinschaftsräumen. Verfügbarkeit abhängig von Standort und Anforderungen.",
    },
    es: {
      title: "Servicio de desinfección de superficies HealthGuard | {brand}",
      description:
        "Limpieza específica y desinfección de superficies de contacto frecuente en viviendas, oficinas y espacios compartidos. Disponibilidad según la ubicación y las necesidades.",
    },
    it: {
      title: "Servizio di disinfezione delle superfici HealthGuard | {brand}",
      description:
        "Pulizia mirata e disinfezione delle superfici toccate di frequente in case, uffici e spazi condivisi. Disponibilità in base alla località e alle esigenze.",
    },
  },
  "carpet-upholstery-cleaning": {
    en: {
      title: "Carpet & Upholstery Cleaning {in} | Pearly Sky",
      description:
        "Professional deep cleaning for carpets, rugs, sofas and upholstery to refresh fabrics and help remove everyday marks and embedded dirt.",
    },
    fr: {
      title: "Nettoyage de tapis et canapés {in} | Pearly Sky",
      description:
        "Nettoyage professionnel en profondeur des moquettes, tapis, canapés et tissus d'ameublement pour raviver les textiles et aider à éliminer les taches du quotidien et la saleté incrustée.",
    },
    de: {
      title: "Teppich- & Polsterreinigung {in} | Pearly Sky",
      description:
        "Professionelle Tiefenreinigung für Teppiche, Läufer, Sofas und Polster, die Stoffe auffrischt und hilft, alltägliche Flecken und tief sitzenden Schmutz zu entfernen.",
    },
    es: {
      title: "Limpieza de alfombras y tapicerías {in} | Pearly Sky",
      description:
        "Limpieza profunda profesional de moquetas, alfombras, sofás y tapicerías para renovar los tejidos y ayudar a eliminar manchas cotidianas y suciedad incrustada.",
    },
    it: {
      title: "Pulizia di tappeti e imbottiti {in} | Pearly Sky",
      description:
        "Pulizia profonda professionale di moquette, tappeti, divani e imbottiti per rinfrescare i tessuti e aiutare a rimuovere macchie quotidiane e sporco incrostato.",
    },
  },
  "steam-cleaning": {
    en: {
      title: "Steam Cleaning Services {in} | Pearly Sky",
      description:
        "High-temperature steam cleaning for tiles, hard floors and suitable surfaces. A practical option for deep cleaning with reduced use of cleaning products.",
    },
    fr: {
      title: "Services de nettoyage à la vapeur {in} | Pearly Sky",
      description:
        "Nettoyage vapeur haute température pour carrelages, sols durs et surfaces adaptées. Une solution pratique pour un nettoyage en profondeur avec moins de produits d'entretien.",
    },
    de: {
      title: "Dampfreinigung {in} | Pearly Sky",
      description:
        "Heißdampfreinigung für Fliesen, Hartböden und geeignete Oberflächen. Eine praktische Lösung für die Tiefenreinigung mit weniger Reinigungsmitteln.",
    },
    es: {
      title: "Servicios de limpieza a vapor {in} | Pearly Sky",
      description:
        "Limpieza a vapor de alta temperatura para azulejos, suelos duros y superficies adecuadas. Una opción práctica para una limpieza profunda con menos productos de limpieza.",
    },
    it: {
      title: "Servizi di pulizia a vapore {in} | Pearly Sky",
      description:
        "Pulizia a vapore ad alta temperatura per piastrelle, pavimenti duri e superfici idonee. Una soluzione pratica per una pulizia profonda con un uso ridotto di detergenti.",
    },
  },
  "post-event-cleaning": {
    en: {
      title: "Post-Event Cleaning Services {in} | Pearly Sky",
      description:
        "Flexible post-event cleaning for private events, celebrations and business occasions, including waste removal and venue reset support.",
    },
    fr: {
      title: "Nettoyage après événement {in} | Pearly Sky",
      description:
        "Nettoyage flexible après vos événements privés, célébrations et rendez-vous professionnels, incluant l'évacuation des déchets et la remise en état des lieux.",
    },
    de: {
      title: "Reinigung nach Veranstaltungen {in} | Pearly Sky",
      description:
        "Flexible Reinigung nach privaten Veranstaltungen, Feiern und Geschäftsanlässen, inklusive Abfallentsorgung und Unterstützung bei der Wiederherrichtung des Veranstaltungsorts.",
    },
    es: {
      title: "Servicios de limpieza post-evento {in} | Pearly Sky",
      description:
        "Limpieza flexible tras eventos privados, celebraciones y actos de empresa, incluida la retirada de residuos y la puesta a punto del espacio.",
    },
    it: {
      title: "Servizi di pulizia post-evento {in} | Pearly Sky",
      description:
        "Pulizia flessibile dopo eventi privati, celebrazioni e occasioni aziendali, incluso lo smaltimento dei rifiuti e il ripristino della location.",
    },
  },
  "pool-cleaning": {
    en: {
      title: "Swimming Pool Cleaning & Maintenance | {brand}",
      description:
        "Cleaning and maintenance support for private swimming pools, including surface cleaning, debris removal and routine care based on your requirements.",
    },
    fr: {
      title: "Nettoyage et entretien de piscine | {brand}",
      description:
        "Nettoyage et entretien des piscines privées, incluant le nettoyage des surfaces, le retrait des débris et l'entretien régulier selon vos besoins.",
    },
    de: {
      title: "Poolreinigung & -wartung | {brand}",
      description:
        "Reinigung und Pflege privater Schwimmbecken, einschließlich Oberflächenreinigung, Entfernung von Schmutz und regelmäßiger Wartung nach Ihren Anforderungen.",
    },
    es: {
      title: "Limpieza y mantenimiento de piscinas | {brand}",
      description:
        "Limpieza y mantenimiento de piscinas privadas, incluida la limpieza de superficies, la retirada de residuos y el cuidado periódico según sus necesidades.",
    },
    it: {
      title: "Pulizia e manutenzione piscine | {brand}",
      description:
        "Pulizia e manutenzione di piscine private, inclusa la pulizia delle superfici, la rimozione dei detriti e la cura periodica in base alle vostre esigenze.",
    },
  },
  "precision-pressure-washing": {
    en: {
      title: "Pressure Washing Services {in} | Pearly Sky",
      description:
        "Professional exterior pressure washing for suitable terraces, driveways, façades and outdoor surfaces, assessed according to material and condition.",
    },
    fr: {
      title: "Nettoyage haute pression {in} | Pearly Sky",
      description:
        "Nettoyage extérieur professionnel haute pression pour terrasses, allées, façades et surfaces extérieures adaptées, évalué selon le matériau et son état.",
    },
    de: {
      title: "Hochdruckreinigung {in} | Pearly Sky",
      description:
        "Professionelle Hochdruckreinigung im Außenbereich für geeignete Terrassen, Einfahrten, Fassaden und Außenflächen, abgestimmt auf Material und Zustand.",
    },
    es: {
      title: "Servicios de limpieza a presión {in} | Pearly Sky",
      description:
        "Limpieza exterior profesional a presión para terrazas, entradas, fachadas y superficies exteriores adecuadas, evaluada según el material y su estado.",
    },
    it: {
      title: "Servizi di idropulizia {in} | Pearly Sky",
      description:
        "Idropulizia professionale per esterni su terrazze, vialetti, facciate e superfici esterne idonee, valutata in base al materiale e alle condizioni.",
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
    de: {
      title: "Diskrete Objektpflege {in} | Pearly Sky",
      description:
        "Diskrete Reinigung und Objektpflege für Privatresidenzen und zugangsbeschränkte Standorte, mit individuell auf Kundenanforderungen abgestimmten Leistungen.",
    },
    es: {
      title: "Servicios discretos de cuidado de propiedades {in} | Pearly Sky",
      description:
        "Limpieza discreta y cuidado de propiedades para residencias privadas y lugares de acceso controlado, con condiciones de servicio adaptadas a cada cliente.",
    },
    it: {
      title: "Servizi discreti di cura della proprietà {in} | Pearly Sky",
      description:
        "Pulizia discreta e cura della proprietà per residenze private e luoghi ad accesso controllato, con modalità di servizio su misura per le esigenze del cliente.",
    },
  },
  "luxury-yacht-cleaning": {
    en: {
      title: "Luxury Yacht Cleaning & Marine Care | {brand}",
      description:
        "Premium cleaning and detailing support for yachts and marine interiors, including suitable interior surfaces, fabrics and exterior areas by arrangement.",
    },
    fr: {
      title: "Nettoyage de yachts de luxe & entretien nautique | {brand}",
      description:
        "Nettoyage et detailing haut de gamme pour yachts et intérieurs nautiques, incluant surfaces intérieures adaptées, textiles et zones extérieures sur demande.",
    },
    de: {
      title: "Luxusyacht-Reinigung & Bootspflege | {brand}",
      description:
        "Hochwertige Reinigung und Detailing für Yachten und maritime Innenräume, einschließlich geeigneter Innenflächen, Textilien und Außenbereiche nach Vereinbarung.",
    },
    es: {
      title: "Limpieza de yates de lujo y cuidado náutico | {brand}",
      description:
        "Limpieza y detailing premium para yates e interiores náuticos, incluidas superficies interiores adecuadas, tejidos y zonas exteriores bajo acuerdo.",
    },
    it: {
      title: "Pulizia di yacht di lusso e cura nautica | {brand}",
      description:
        "Pulizia e detailing premium per yacht e interni nautici, incluse superfici interne idonee, tessuti e aree esterne su accordo.",
    },
  },
  "child-care-service": {
    en: {
      title: "Childcare Support Services {in} | Pearly Sky",
      description:
        "Trusted childcare support for families {in}, with service arrangements tailored to each household’s needs and local availability.",
    },
    fr: {
      title: "Services de garde d'enfants {in} | Pearly Sky",
      description:
        "Une aide à la garde d'enfants de confiance pour les familles {in}, avec des modalités adaptées aux besoins de chaque foyer et aux disponibilités locales.",
    },
    de: {
      title: "Kinderbetreuung {in} | Pearly Sky",
      description:
        "Vertrauensvolle Kinderbetreuung für Familien {in}, mit Leistungen, die auf die Bedürfnisse jedes Haushalts und die Verfügbarkeit vor Ort abgestimmt sind.",
    },
    es: {
      title: "Servicios de apoyo al cuidado infantil {in} | Pearly Sky",
      description:
        "Apoyo de confianza en el cuidado infantil para familias {in}, con condiciones de servicio adaptadas a las necesidades de cada hogar y a la disponibilidad local.",
    },
    it: {
      title: "Servizi di assistenza all'infanzia {in} | Pearly Sky",
      description:
        "Assistenza all'infanzia affidabile per le famiglie {in}, con modalità di servizio su misura per le esigenze di ogni nucleo familiare e la disponibilità locale.",
    },
  },
  "elder-care-service": {
    en: {
      title: "Senior Support & Home Assistance {in} | Pearly Sky",
      description:
        "Respectful home-support and companionship services for seniors, tailored to daily routines, household needs and local availability.",
    },
    fr: {
      title: "Aide et accompagnement à domicile des seniors {in} | Pearly Sky",
      description:
        "Services respectueux d'aide à domicile et de compagnie pour les seniors, adaptés aux habitudes quotidiennes, aux besoins du foyer et aux disponibilités locales.",
    },
    de: {
      title: "Seniorenbetreuung & Haushaltshilfe {in} | Pearly Sky",
      description:
        "Respektvolle Unterstützung im Haushalt und Gesellschaft für Senioren, abgestimmt auf den Tagesablauf, die Bedürfnisse des Haushalts und die Verfügbarkeit vor Ort.",
    },
    es: {
      title: "Apoyo a mayores y asistencia en el hogar {in} | Pearly Sky",
      description:
        "Servicios respetuosos de ayuda en el hogar y compañía para personas mayores, adaptados a sus rutinas diarias, a las necesidades del hogar y a la disponibilidad local.",
    },
    it: {
      title: "Assistenza agli anziani e supporto domestico {in} | Pearly Sky",
      description:
        "Servizi rispettosi di supporto domestico e compagnia per anziani, su misura per le abitudini quotidiane, le esigenze della casa e la disponibilità locale.",
    },
  },
};

/** Short country label for a title suffix ("Same-Day Priority Cleaning – France"). */
const COUNTRY_TITLE_SUFFIX: Record<CountryCode, string> = {
  fr: "France",
  gb: "UK",
  lk: "Sri Lanka",
};

/** Prose country label for a description sentence ("...across the United Kingdom."). */
const COUNTRY_PROSE: Record<CountryCode, string> = {
  fr: "France",
  gb: "the United Kingdom",
  lk: "Sri Lanka",
};

/**
 * Builds a distinct title/description per country from one base pair, so the
 * site's 3 hreflang country-alternates per service page aren't byte-identical
 * — search engines fold identical-content alternates into a single indexed
 * page, defeating the purpose of having per-country URLs at all.
 */
function metaByCountryFrom(title: string, description: string): Record<CountryCode, ServiceMeta> {
  const result = {} as Record<CountryCode, ServiceMeta>;
  for (const country of SUPPORTED_COUNTRIES) {
    result[country] = {
      title: `${title} – ${COUNTRY_TITLE_SUFFIX[country]}`,
      description: `${description} Serving clients across ${COUNTRY_PROSE[country]}.`,
    };
  }
  return result;
}

/**
 * English-only copy for services without approved copy yet. Their other
 * languages come from the catalog API's per-language SEO fields.
 */
const ENGLISH_SERVICE_META: Record<string, Record<CountryCode, ServiceMeta>> = {
  "regular-home-cleaning": metaByCountryFrom(
    "Regular Home Cleaning | Pearly Sky Eco-Luxury Care",
    "Recurring, detail-driven upkeep that keeps every room fresh, tidy, and welcoming between visits.",
  ),
  "essential-touch-up-cleaning": metaByCountryFrom(
    "Essential Touch-Up Cleaning | Fast Refresh Service",
    "A focused, efficient refresh for high-traffic areas — ideal for a quick reset before guests or the next appointment.",
  ),
  "same-day-priority-cleaning": metaByCountryFrom(
    "Same-Day Priority Cleaning | Rapid-Dispatch Service",
    "Urgent, fully-staffed cleaning dispatched the same day for last-minute arrivals, inspections, or unexpected guests.",
  ),
  "laundry-service": metaByCountryFrom(
    "Laundry & Linen Care | Wash, Press & Fold Service",
    "Premium garment and linen care — washing, pressing, and folding handled with hotel-grade attention to fabric and finish.",
  ),
  "move-in-out-transport-service": metaByCountryFrom(
    "Move-In & Move-Out Transport Health | Pearly Sky Concierge",
    "Coordinated transport and handling support for relocations, paired with sanitized, health-conscious packing and moving practices.",
  ),
};

function fill(text: string, phrases: CountryPhrases): string {
  return text.replaceAll("{in}", phrases.in).replaceAll("{brand}", phrases.brand);
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
  de: {
    title: "Angebot Anfordern — {Name} | Pearly Sky",
    description: "Fordern Sie ein kostenloses und unverbindliches Angebot für {Name} bei Pearly Sky {in} an.",
  },
  es: {
    title: "Solicitar un Presupuesto — {Name} | Pearly Sky",
    description: "Solicite un presupuesto gratuito y sin compromiso para {name} con Pearly Sky {in}.",
  },
  it: {
    title: "Richiedi un Preventivo — {Name} | Pearly Sky",
    description: "Richiedi un preventivo gratuito e senza impegno per {name} con Pearly Sky {in}.",
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
  return language === "en" ? ENGLISH_SERVICE_META[slug]?.[CURRENT_COUNTRY] : undefined;
}
