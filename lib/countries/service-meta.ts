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
    de: { in: "in Frankreich", brand: "Pearly Sky France", country: "Frankreich", place: "Frankreich" },
    es: { in: "en Francia", brand: "Pearly Sky France", country: "Francia", place: "Francia" },
    it: { in: "in Francia", brand: "Pearly Sky France", country: "Francia", place: "la Francia" },
  },
  gb: {
    en: { in: "in the UK", brand: "Pearly Sky UK", country: "UK", place: "the UK" },
    fr: { in: "au Royaume-Uni", brand: "Pearly Sky UK", country: "Royaume-Uni", place: "le Royaume-Uni" },
    de: { in: "im Vereinigten Königreich", brand: "Pearly Sky UK", country: "UK", place: "das Vereinigte Königreich" },
    es: { in: "en el Reino Unido", brand: "Pearly Sky UK", country: "Reino Unido", place: "el Reino Unido" },
    it: { in: "nel Regno Unito", brand: "Pearly Sky UK", country: "Regno Unito", place: "il Regno Unito" },
  },
  lk: {
    en: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "Sri Lanka" },
    fr: { in: "au Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "le Sri Lanka" },
    de: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "Sri Lanka" },
    es: { in: "en Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "Sri Lanka" },
    it: { in: "in Sri Lanka", brand: "Pearly Sky Sri Lanka", country: "Sri Lanka", place: "lo Sri Lanka" },
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
    de: {
      title: "Grundreinigung {country} | Pearly Sky",
      description:
        "Gönnen Sie Ihrem Zuhause eine gründliche Auffrischung mit der Grundreinigung von Pearly Sky. Entdecken Sie detaillierte, auf Ihre Immobilie abgestimmte Reinigungsoptionen und fordern Sie ein individuelles Angebot {in} an.",
    },
    es: {
      title: "Servicios de limpieza a fondo {country} | Pearly Sky",
      description:
        "Dé a su hogar una renovación completa con los servicios de limpieza a fondo de Pearly Sky. Descubra opciones de limpieza detalladas adaptadas a su propiedad y solicite un presupuesto personalizado {in}.",
    },
    it: {
      title: "Servizi di pulizia profonda {country} | Pearly Sky",
      description:
        "Regala alla tua casa un rinnovo completo con i servizi di pulizia profonda di Pearly Sky. Scopri opzioni di pulizia dettagliate su misura per il tuo immobile e richiedi un preventivo personalizzato {in}.",
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
    de: {
      title: "Endreinigung bei Auszug {country} | Pearly Sky",
      description:
        "Bereiten Sie Ihre Immobilie mit der Endreinigung von Pearly Sky auf die Übergabe vor. Entdecken Sie maßgeschneiderte Auszugsreinigungen für Wohnungen und Häuser an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Limpieza de fin de alquiler {country} | Pearly Sky",
      description:
        "Prepare su propiedad para la entrega con la limpieza de fin de alquiler de Pearly Sky. Descubra opciones de limpieza de salida adaptadas a pisos y casas en zonas seleccionadas {in}.",
    },
    it: {
      title: "Pulizia di fine locazione {country} | Pearly Sky",
      description:
        "Prepara il tuo immobile per la riconsegna con la pulizia di fine locazione di Pearly Sky. Scopri opzioni di pulizia per il trasloco su misura per appartamenti e case in località selezionate {in}.",
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
    de: {
      title: "Baureinigung nach Bau & Renovierung {country} | Pearly Sky",
      description:
        "Machen Sie Ihre Immobilie nach Bau- oder Renovierungsarbeiten mit der Baureinigung von Pearly Sky wieder bezugsfertig. Fragen Sie nach maßgeschneiderter Reinigung für Wohn- und Gewerbeflächen an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Limpieza de fin de obra {country} | Pearly Sky",
      description:
        "Deje su propiedad lista tras obras o reformas con la limpieza de fin de obra de Pearly Sky. Consulte opciones de limpieza adaptadas para viviendas y espacios comerciales en zonas seleccionadas {in}.",
    },
    it: {
      title: "Pulizia post-cantiere {country} | Pearly Sky",
      description:
        "Prepara il tuo immobile dopo lavori edili o ristrutturazioni con la pulizia post-cantiere di Pearly Sky. Informati su pulizie su misura per abitazioni e spazi commerciali in località selezionate {in}.",
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
    de: {
      title: "Concierge-Reinigung für Premium-Mietobjekte {country} | Pearly Sky",
      description:
        "Werten Sie die Präsentation Ihres Mietobjekts mit der Premium-Concierge-Reinigung von Pearly Sky auf. Maßgeschneiderte Reinigung für Ferienwohnungen, Apartments und verwaltete Immobilien an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Limpieza concierge para alquileres premium {country} | Pearly Sky",
      description:
        "Mejore la presentación de su propiedad en alquiler con la limpieza concierge premium de Pearly Sky. Limpieza a medida para alquileres vacacionales, apartamentos y propiedades gestionadas en zonas seleccionadas {in}.",
    },
    it: {
      title: "Pulizia concierge per affitti premium {country} | Pearly Sky",
      description:
        "Valorizza la presentazione del tuo immobile in affitto con la pulizia concierge premium di Pearly Sky. Supporto su misura per case vacanza, appartamenti e immobili gestiti in località selezionate {in}.",
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
    de: {
      title: "Gewerbe- & Büroreinigung {country} | Pearly Sky",
      description:
        "Sorgen Sie für einen sauberen, einladenden Arbeitsplatz mit der Gewerbe- und Büroreinigung von Pearly Sky. Fragen Sie nach maßgeschneiderten Reinigungsplänen für Büros und Geschäftsräume an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Limpieza comercial y de oficinas {country} | Pearly Sky",
      description:
        "Mantenga un lugar de trabajo limpio y acogedor con los servicios de limpieza comercial y de oficinas de Pearly Sky. Consulte planes de limpieza a medida para oficinas y locales comerciales en zonas seleccionadas {in}.",
    },
    it: {
      title: "Pulizia di uffici e locali commerciali {country} | Pearly Sky",
      description:
        "Mantieni un ambiente di lavoro pulito e accogliente con i servizi di pulizia commerciale e di uffici di Pearly Sky. Informati su piani di pulizia su misura per uffici e locali commerciali in località selezionate {in}.",
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
    de: {
      title: "HealthGuard Sanitization {country} | Pearly Sky",
      description:
        "Entdecken Sie HealthGuard Sanitization von Pearly Sky für Wohn- und Arbeitsräume. Fragen Sie nach professioneller, hygieneorientierter Reinigung und passenden Desinfektionsoptionen {in}.",
    },
    es: {
      title: "HealthGuard Sanitization {country} | Pearly Sky",
      description:
        "Descubra HealthGuard Sanitization de Pearly Sky para hogares y lugares de trabajo. Consulte opciones de limpieza profesional centrada en la higiene y de desinfección adecuadas {in}.",
    },
    it: {
      title: "HealthGuard Sanitization {country} | Pearly Sky",
      description:
        "Scopri HealthGuard Sanitization di Pearly Sky per abitazioni e luoghi di lavoro. Informati su pulizie professionali orientate all'igiene e su soluzioni di sanificazione adeguate {in}.",
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
    de: {
      title: "Teppich- & Polsterreinigung {country} | Pearly Sky",
      description:
        "Frischen Sie Teppichböden, Teppiche und Polstermöbel mit den Reinigungsleistungen von Pearly Sky auf. Fragen Sie nach passenden Reinigungsoptionen für Ihr Zuhause oder Ihren Arbeitsplatz an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Limpieza de alfombras y tapicerías {country} | Pearly Sky",
      description:
        "Renueve moquetas, alfombras y muebles tapizados con los servicios de limpieza de Pearly Sky. Consulte opciones de limpieza adecuadas para su hogar o espacio de trabajo en zonas seleccionadas {in}.",
    },
    it: {
      title: "Pulizia di tappeti e imbottiti {country} | Pearly Sky",
      description:
        "Rinfresca moquette, tappeti e mobili imbottiti con i servizi di pulizia di Pearly Sky. Informati sulle opzioni di pulizia adatte alla tua casa o al tuo spazio di lavoro in località selezionate {in}.",
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
    de: {
      title: "Dampfreinigung {country} | Pearly Sky",
      description:
        "Entdecken Sie die Dampfreinigung von Pearly Sky für geeignete Oberflächen in Wohn- und Arbeitsräumen. Fragen Sie nach maßgeschneiderten Reinigungsoptionen an ausgewählten Standorten {in}, je nach Verfügbarkeit.",
    },
    es: {
      title: "Servicios de limpieza a vapor {country} | Pearly Sky",
      description:
        "Descubra la limpieza a vapor de Pearly Sky para superficies adecuadas en hogares y espacios de trabajo. Consulte opciones de limpieza a medida en zonas seleccionadas {in}, sujeto a disponibilidad.",
    },
    it: {
      title: "Servizi di pulizia a vapore {country} | Pearly Sky",
      description:
        "Scopri la pulizia a vapore di Pearly Sky per superfici idonee in abitazioni e spazi di lavoro. Informati su opzioni di pulizia su misura in località selezionate {in}, in base alla disponibilità.",
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
    de: {
      title: "Reinigung nach Veranstaltungen | Pearly Sky",
      description:
        "Bringen Sie Ihre Location nach einer Veranstaltung mit der Event-Reinigung von Pearly Sky wieder in Ordnung. Fragen Sie nach maßgeschneiderter Reinigung für private Feiern, Büros und gewerbliche Veranstaltungsorte an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Servicios de limpieza tras eventos | Pearly Sky",
      description:
        "Recupere su espacio después de una reunión con la limpieza tras eventos de Pearly Sky. Consulte limpiezas a medida para eventos privados, oficinas y locales comerciales en zonas seleccionadas {in}.",
    },
    it: {
      title: "Servizi di pulizia post-evento | Pearly Sky",
      description:
        "Rimetti in ordine la tua location dopo un evento con la pulizia post-evento di Pearly Sky. Informati su pulizie su misura per eventi privati, uffici e locali commerciali in località selezionate {in}.",
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
    de: {
      title: "Poolreinigung {country} | Pearly Sky",
      description:
        "Halten Sie Ihren Poolbereich sauber und einladend mit Anfragen zur Poolreinigung bei Pearly Sky. Entdecken Sie Reinigungsoptionen für Pooloberflächen und Umgebung an ausgewählten Standorten {in}, je nach Verfügbarkeit.",
    },
    es: {
      title: "Servicios de limpieza de piscinas {country} | Pearly Sky",
      description:
        "Mantenga la zona de su piscina limpia y acogedora con las solicitudes de limpieza de piscinas de Pearly Sky. Descubra opciones de limpieza para la superficie de la piscina y su entorno en zonas seleccionadas {in}, sujeto a disponibilidad.",
    },
    it: {
      title: "Servizi di pulizia piscine {country} | Pearly Sky",
      description:
        "Mantieni l'area piscina pulita e invitante con le richieste di pulizia piscine di Pearly Sky. Scopri opzioni di pulizia per le superfici della piscina e le aree circostanti in località selezionate {in}, in base alla disponibilità.",
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
    de: {
      title: "Hochdruckreinigung {country} | Pearly Sky",
      description:
        "Frischen Sie geeignete Außenflächen mit der Hochdruckreinigung von Pearly Sky auf. Fragen Sie nach der Reinigung von Terrassen, Einfahrten und harten Außenflächen an ausgewählten Standorten {in}.",
    },
    es: {
      title: "Servicios de limpieza a presión {country} | Pearly Sky",
      description:
        "Renueve las superficies exteriores adecuadas con los servicios de limpieza a presión de Pearly Sky. Consulte la limpieza de patios, entradas de vehículos y superficies duras exteriores en zonas seleccionadas {in}.",
    },
    it: {
      title: "Servizi di lavaggio ad alta pressione {country} | Pearly Sky",
      description:
        "Rinfresca le superfici esterne idonee con i servizi di lavaggio ad alta pressione di Pearly Sky. Informati sulla pulizia di patii, vialetti e superfici dure esterne in località selezionate {in}.",
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
      title: "Luxury Yacht Cleaning Services {country} | Pearly Sky",
      description:
        "Discover Pearly Sky luxury yacht cleaning enquiries for yacht interiors and suitable exterior surfaces. Request tailored cleaning support in selected coastal locations {in}, subject to availability.",
    },
    fr: {
      title: "Services de nettoyage de yachts de luxe {country} | Pearly Sky",
      description:
        "Découvrez les demandes de nettoyage de yachts de luxe Pearly Sky pour les intérieurs et les surfaces extérieures adaptées. Demandez un accompagnement sur mesure dans une sélection de zones côtières {in}, sous réserve de disponibilité.",
    },
    de: {
      title: "Luxusyacht-Reinigung {country} | Pearly Sky",
      description:
        "Entdecken Sie Anfragen zur Luxusyacht-Reinigung bei Pearly Sky für Yacht-Innenräume und geeignete Außenflächen. Fordern Sie maßgeschneiderte Reinigung an ausgewählten Küstenstandorten {in} an, je nach Verfügbarkeit.",
    },
    es: {
      title: "Servicios de limpieza de yates de lujo {country} | Pearly Sky",
      description:
        "Descubra las solicitudes de limpieza de yates de lujo de Pearly Sky para interiores y superficies exteriores adecuadas. Solicite una limpieza a medida en zonas costeras seleccionadas {in}, sujeto a disponibilidad.",
    },
    it: {
      title: "Servizi di pulizia di yacht di lusso {country} | Pearly Sky",
      description:
        "Scopri le richieste di pulizia di yacht di lusso di Pearly Sky per interni e superfici esterne idonee. Richiedi un supporto su misura in località costiere selezionate {in}, in base alla disponibilità.",
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
    de: {
      title: "Pearly Sky Kinderbetreuung {country} | Pearly Sky",
      description:
        "Entdecken Sie Anfragen zur Kinderbetreuung bei Pearly Sky {in}. Kontaktieren Sie uns, um die Bedürfnisse Ihrer Familie, die Verfügbarkeit und passende Betreuungsmodelle zu besprechen.",
    },
    es: {
      title: "Servicio de cuidado infantil Pearly Sky {country} | Pearly Sky",
      description:
        "Descubra las solicitudes de cuidado infantil de Pearly Sky {in}. Contáctenos para hablar de las necesidades de su familia, la disponibilidad del servicio y las opciones de cuidado adecuadas.",
    },
    it: {
      title: "Servizio di assistenza all'infanzia Pearly Sky {country} | Pearly Sky",
      description:
        "Scopri le richieste di assistenza all'infanzia di Pearly Sky {in}. Contattaci per parlare delle esigenze della tua famiglia, della disponibilità del servizio e delle soluzioni di assistenza più adatte.",
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
    de: {
      title: "Seniorenbetreuung {country} | Pearly Sky",
      description:
        "Entdecken Sie Anfragen zur Seniorenbetreuung bei Pearly Sky {in}. Kontaktieren Sie uns, um Unterstützungsbedarf, verfügbare Leistungen und passende Lösungen für ältere Menschen zu besprechen.",
    },
    es: {
      title: "Servicios de cuidado de mayores {country} | Pearly Sky",
      description:
        "Descubra las solicitudes de cuidado de mayores de Pearly Sky {in}. Contáctenos para hablar de las necesidades de apoyo, los servicios disponibles y las opciones adecuadas para personas mayores.",
    },
    it: {
      title: "Servizi di assistenza agli anziani {country} | Pearly Sky",
      description:
        "Scopri le richieste di assistenza agli anziani di Pearly Sky {in}. Contattaci per parlare delle esigenze di supporto, dei servizi disponibili e delle soluzioni adatte alle persone anziane.",
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
    de: {
      title: "Regelmäßige Haushaltsreinigung {country} | Pearly Sky",
      description:
        "Halten Sie Ihr Zuhause frisch und gemütlich mit der regelmäßigen Haushaltsreinigung von Pearly Sky. Entdecken Sie auf Ihren Wohnraum abgestimmte Reinigungsleistungen und fordern Sie ein individuelles Angebot {in} an.",
    },
    es: {
      title: "Limpieza regular del hogar {country} | Pearly Sky",
      description:
        "Mantenga su hogar fresco y acogedor con la limpieza regular de Pearly Sky. Descubra servicios de limpieza adaptados a su vivienda y solicite un presupuesto personalizado {in}.",
    },
    it: {
      title: "Pulizia regolare della casa {country} | Pearly Sky",
      description:
        "Mantieni la tua casa fresca e accogliente con la pulizia regolare di Pearly Sky. Scopri servizi di pulizia su misura per i tuoi spazi e richiedi un preventivo personalizzato {in}.",
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
    de: {
      title: "Schnelle Auffrischungsreinigung {country} | Pearly Sky",
      description:
        "Frischen Sie Ihr Zuhause mit der Auffrischungsreinigung von Pearly Sky auf: gezielte Pflege für alltägliche Unordnung, stark genutzte Bereiche und wichtige Oberflächen. Informieren Sie sich über Verfügbarkeit und Preise {in}.",
    },
    es: {
      title: "Limpieza de repaso esencial {country} | Pearly Sky",
      description:
        "Renueve su hogar con la limpieza de repaso esencial de Pearly Sky: atención específica al desorden cotidiano, las zonas de mucho uso y las superficies clave. Consulte disponibilidad y precios {in}.",
    },
    it: {
      title: "Pulizia di ritocco essenziale {country} | Pearly Sky",
      description:
        "Rinfresca la tua casa con la pulizia di ritocco essenziale di Pearly Sky: cura mirata per il disordine quotidiano, le zone più utilizzate e le superfici principali. Informati su disponibilità e prezzi {in}.",
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
    de: {
      title: "Reinigung am selben Tag {country} | Pearly Sky",
      description:
        "Kurzfristig eine Reinigung nötig? Kontaktieren Sie Pearly Sky für Anfragen zur priorisierten Reinigung am selben Tag für Wohn- und Arbeitsräume an ausgewählten Standorten {in}, je nach Verfügbarkeit.",
    },
    es: {
      title: "Servicios de limpieza en el día {country} | Pearly Sky",
      description:
        "¿Necesita una limpieza con poca antelación? Contacte con Pearly Sky para solicitudes de limpieza prioritaria en el mismo día para hogares y espacios de trabajo en zonas seleccionadas {in}, sujeto a disponibilidad.",
    },
    it: {
      title: "Servizi di pulizia in giornata {country} | Pearly Sky",
      description:
        "Hai bisogno di una pulizia con poco preavviso? Contatta Pearly Sky per richieste di pulizia prioritaria in giornata per abitazioni e spazi di lavoro in località selezionate {in}, in base alla disponibilità.",
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
    de: {
      title: "Wäscheservice {country} | Pearly Sky",
      description:
        "Entdecken Sie den Wäscheservice von Pearly Sky für Privathaushalte und Mietobjekte. Fragen Sie nach Waschen, Trocknen, Falten und Wäschepflege an ausgewählten Standorten {in}, je nach Verfügbarkeit.",
    },
    es: {
      title: "Servicios de lavandería {country} | Pearly Sky",
      description:
        "Descubra los servicios de lavandería de Pearly Sky para hogares y propiedades en alquiler. Consulte opciones de lavado, secado, doblado y cuidado de la ropa de cama en zonas seleccionadas {in}, sujeto a disponibilidad.",
    },
    it: {
      title: "Servizi di lavanderia {country} | Pearly Sky",
      description:
        "Scopri i servizi di lavanderia di Pearly Sky per abitazioni e immobili in affitto. Informati su lavaggio, asciugatura, piegatura e cura della biancheria in località selezionate {in}, in base alla disponibilità.",
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
    de: {
      title: "Ein- & Auszugsservice {country} | Pearly Sky",
      description:
        "Machen Sie Ihren Umzug einfacher mit Pearly Sky: Umzugshilfe, Anfragen zur Ein- und Auszugsreinigung sowie Transportoptionen. Kontaktieren Sie uns, um Ihre Anforderungen {in} zu besprechen.",
    },
    es: {
      title: "Servicios de mudanza de entrada y salida {country} | Pearly Sky",
      description:
        "Facilite su mudanza con Pearly Sky: ayuda con la mudanza, solicitudes de limpieza de entrada y salida y opciones de transporte. Contáctenos para hablar de sus necesidades {in}.",
    },
    it: {
      title: "Servizi di trasloco in entrata e in uscita {country} | Pearly Sky",
      description:
        "Rendi il trasloco più semplice con Pearly Sky: supporto al trasloco, richieste di pulizia di ingresso e uscita e opzioni di trasporto. Contattaci per parlare delle tue esigenze {in}.",
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
  return undefined;
}
