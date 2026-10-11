import { CURRENT_COUNTRY, type CountryCode } from "./config";
import type { LanguageCode } from "@/lib/i18n/config";

/** Rotating coverage-strip marquee, per country. */
export const COVERAGE_CITIES: Record<CountryCode, string[]> = {
  fr: [
    "Paris",
  "Nice",
  "Saint-Tropez",
  "Antibes",
  "Cannes",
  "Lyon",
  "Bordeaux",
  "Toulouse",
  "Toulon",
  "Montpellier",
  "Strasbourg",
  "Normandy",
  "Deauville",
  "Dieppe",
  "La Rochelle",
  "Neuilly-sur-Seine",
  "Annecy",
  "Aix-en-Provence",
  "Nantes",
  "Biarritz",
  "Monaco Border / Menton",
  "Cassis",
  "Saint-Jean-Cap-Ferrat",
  "Versailles"
  ],
  
  gb: [
    "London",
  "Birmingham",
  "Glasgow",
  "Leeds",
  "Sheffield",
  "Edinburgh",
  "Bristol",
  "Liverpool",
  "Belfast",
  "Manchester",
  "Cardiff",
  "Leicester",
  "Coventry",
  "Nottingham",
  "Newcastle upon Tyne",
  "Kingston upon Hull",
  "Stoke-on-Trent",
  "Southampton",
  "Derby",
  "Portsmouth",
  "Brighton and Hove",
  "Plymouth",
  "Reading",
  "Aberdeen"
  ],
  lk: [
    "Colombo",
  "Kandy",
  "Galle",
  "Negombo",
  "Anuradhapura",
  "Badulla",
  "Sigiriya",
  "Ella",
  "Nuwara Eliya",
  "Kurunegala"
  ],
};

interface CountryHomeCopy {
  heroSubtitle: string;
  heroAvailability: string;
  trustCoverage: string;
  coverageTitle: string;
  coverageSubtitle: string;
  footerTagline: string;
  aboutBilingualLabel: string;
  aboutBilingualDesc: string;
  welcomeContent: string;
}

/**
 * Home page copy, keyed by [country][language]. Every country has
 * hand-written copy for all of SUPPORTED_LANGUAGES; any language missing
 * here falls back to "en".
 */
const COUNTRY_HOME_CONTENT: Record<CountryCode, Partial<Record<LanguageCode, CountryHomeCopy>>> = {
  fr: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in France",
      heroAvailability: "Serving selected locations across France. Availability depends on your location and service requirements.",
      trustCoverage: "France / 24 Cities",
      coverageTitle: "Service Excellence Throughout France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, and more across France.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across France. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Bilingual French & English Teams",
      aboutBilingualDesc: "Seamless communication for a diverse clientele.",
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across France. We specialize in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated teams of English and French-speaking professionals are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in Paris, Nice, Cannes, and Monaco.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail en France",
      heroAvailability: "Nous intervenons dans une sélection de villes en France. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "France / 24 Villes",
      coverageTitle: "Excellence de Service Partout en France",
      coverageSubtitle: "Paris, Nice, Cannes, Monaco, Lyon, Bordeaux, et plus encore à travers la France.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout en France. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes Bilingues Français & Anglais",
      aboutBilingualDesc: "Communication fluide pour une clientèle diverse.",
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout en France. Nous sommes spécialisés dans la fourniture de solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes dédiées de professionnels anglophones et francophones s'engagent à ce que vos espaces soient non seulement impeccables, mais aussi à préserver un environnement sain et durable. Découvrez le summum de la propreté avec nos services haut de gamme et personnalisés, conçus pour répondre à vos besoins spécifiques à Paris, Nice, Cannes et Monaco.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume in Frankreich",
      heroAvailability: "Wir sind an ausgewählten Standorten in ganz Frankreich tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "Frankreich / 24 Städte",
      coverageTitle: "Erstklassiger Service in ganz Frankreich",
      coverageSubtitle: "Paris, Nizza, Cannes, Monaco, Lyon, Bordeaux und viele weitere Orte in ganz Frankreich.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels in ganz Frankreich. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Zweisprachige Teams (Französisch & Englisch)",
      aboutBilingualDesc: "Reibungslose Kommunikation für eine vielfältige Kundschaft.",
      welcomeContent:
        "Willkommen bei Pearly Sky, Ihrem erstklassigen Partner für Öko-Luxus-Reinigungsdienstleistungen in Frankreich. Wir sind spezialisiert auf sorgfältige, umweltbewusste Reinigungslösungen für Haus und Büro, die den anspruchsvollsten Kunden gerecht werden. Unsere engagierten Teams englisch- und französischsprachiger Fachkräfte sorgen dafür, dass Ihre Räume nicht nur makellos sauber sind, sondern auch ein gesundes, nachhaltiges Umfeld bieten. Erleben Sie den Gipfel der Sauberkeit mit unseren premium, maßgeschneiderten Dienstleistungen, die für Ihre einzigartigen Anforderungen in Paris, Nizza, Cannes und Monaco konzipiert sind.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en Francia",
      heroAvailability: "Atendemos determinadas zonas de Francia. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Francia / 24 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Toda Francia",
      coverageSubtitle: "París, Niza, Cannes, Mónaco, Lyon, Burdeos y muchas más en toda Francia.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en toda Francia. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos Bilingües en Francés e Inglés",
      aboutBilingualDesc: "Comunicación fluida para una clientela diversa.",
      welcomeContent:
        "Bienvenido a Pearly Sky, tu socio principal de servicios de limpieza eco-lujo en Francia. Nos especializamos en proporcionar soluciones de limpieza meticulosas y conscientes del medio ambiente para hogares y oficinas, destinadas a los clientes más exigentes. Nuestros equipos dedicados de profesionales de habla inglesa y francesa están comprometidos a garantizar que tus espacios no solo estén impecables, sino que también mantengan un entorno saludable y sostenible. Experimenta la cúspide de la limpieza con nuestros servicios premium y personalizados, diseñados para tus requisitos únicos en París, Niza, Cannes y Mónaco.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro in Francia",
      heroAvailability: "Operiamo in località selezionate in tutta la Francia. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Francia / 24 Città",
      coverageTitle: "Eccellenza del Servizio in Tutta la Francia",
      coverageSubtitle: "Parigi, Nizza, Cannes, Monaco, Lione, Bordeaux e molte altre in tutta la Francia.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutta la Francia. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Bilingui Francese e Inglese",
      aboutBilingualDesc: "Comunicazione fluida per una clientela diversificata.",
      welcomeContent:
        "Benvenuti in Pearly Sky, il vostro partner d'eccellenza per i servizi di pulizia eco-luxury in Francia. Ci specializziamo in soluzioni di pulizia meticolose e rispettose dell'ambiente per case e uffici, pensate per i clienti più esigenti. I nostri team dedicati di professionisti di lingua inglese e francese si impegnano a garantire che i vostri spazi siano non solo immacolati, ma anche sani e sostenibili. Sperimentate il massimo della pulizia con i nostri servizi premium, personalizzati in base alle vostre esigenze uniche a Parigi, Nizza, Cannes e Monaco.",
    },
  },
  gb: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in the United Kingdom",
      heroAvailability: "Serving selected locations across the United Kingdom. Availability depends on your location and service requirements.",
      trustCoverage: "United Kingdom / 24 Cities",
      coverageTitle: "Service Excellence Throughout the United Kingdom",
      coverageSubtitle: "London, Birmingham, Glasgow, Leeds, and more across the UK.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across the United Kingdom. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "English-Speaking Concierge Teams",
      aboutBilingualDesc: "Clear, professional communication for every client across the UK.",
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across the United Kingdom. We specialise in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated English-speaking teams are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in London, Birmingham, Glasgow, Leeds and beyond.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail au Royaume-Uni",
      heroAvailability: "Nous intervenons dans une sélection de villes au Royaume-Uni. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "Royaume-Uni / 24 Villes",
      coverageTitle: "Excellence de Service Partout au Royaume-Uni",
      coverageSubtitle: "Londres, Birmingham, Glasgow, Leeds, et plus encore à travers le Royaume-Uni.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout au Royaume-Uni. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes de Conciergerie Anglophones",
      aboutBilingualDesc: "Une communication claire et professionnelle pour chaque client au Royaume-Uni.",
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout au Royaume-Uni. Nous sommes spécialisés dans des solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes anglophones dédiées veillent à ce que vos espaces soient non seulement impeccables, mais aussi sains et durables. Découvrez l'excellence de la propreté avec nos services premium sur mesure, conçus pour vos besoins à Londres, Birmingham, Glasgow, Leeds et au-delà.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume im Vereinigten Königreich",
      heroAvailability: "Wir sind an ausgewählten Standorten im gesamten Vereinigten Königreich tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "UK / 24 Städte",
      coverageTitle: "Erstklassiger Service im ganzen Vereinigten Königreich",
      coverageSubtitle: "London, Birmingham, Glasgow, Leeds und viele weitere Orte im ganzen Vereinigten Königreich.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels im gesamten Vereinigten Königreich. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Englischsprachige Concierge-Teams",
      aboutBilingualDesc: "Klare, professionelle Kommunikation für jeden Kunden im Vereinigten Königreich.",
      welcomeContent:
        "Willkommen bei Pearly Sky, Ihrem erstklassigen Partner für Öko-Luxus-Reinigungsdienstleistungen im gesamten Vereinigten Königreich. Wir sind spezialisiert auf sorgfältige, umweltbewusste Reinigungslösungen für Haus und Büro, die den anspruchsvollsten Kunden gerecht werden. Unsere engagierten englischsprachigen Teams sorgen dafür, dass Ihre Räume nicht nur makellos sauber, sondern auch gesund und nachhaltig sind. Erleben Sie Sauberkeit auf höchstem Niveau mit unseren maßgeschneiderten Premium-Leistungen für Ihre individuellen Anforderungen in London, Birmingham, Glasgow, Leeds und darüber hinaus.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en el Reino Unido",
      heroAvailability: "Atendemos determinadas zonas del Reino Unido. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Reino Unido / 24 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Todo el Reino Unido",
      coverageSubtitle: "Londres, Birmingham, Glasgow, Leeds y muchas más en todo el Reino Unido.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en todo el Reino Unido. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos de Conserjería de Habla Inglesa",
      aboutBilingualDesc: "Comunicación clara y profesional para cada cliente en el Reino Unido.",
      welcomeContent:
        "Bienvenido a Pearly Sky, tu socio principal de servicios de limpieza eco-lujo en todo el Reino Unido. Nos especializamos en soluciones de limpieza meticulosas y respetuosas con el medio ambiente para hogares y oficinas, pensadas para los clientes más exigentes. Nuestros equipos de habla inglesa se comprometen a que tus espacios no solo queden impecables, sino que mantengan un entorno saludable y sostenible. Descubre la máxima limpieza con nuestros servicios premium a medida, diseñados para tus necesidades en Londres, Birmingham, Glasgow, Leeds y más allá.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro nel Regno Unito",
      heroAvailability: "Operiamo in località selezionate in tutto il Regno Unito. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Regno Unito / 24 Città",
      coverageTitle: "Eccellenza del Servizio in Tutto il Regno Unito",
      coverageSubtitle: "Londra, Birmingham, Glasgow, Leeds e molte altre in tutto il Regno Unito.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutto il Regno Unito. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Concierge di Lingua Inglese",
      aboutBilingualDesc: "Comunicazione chiara e professionale per ogni cliente nel Regno Unito.",
      welcomeContent:
        "Benvenuti in Pearly Sky, il vostro partner d'eccellenza per i servizi di pulizia eco-luxury in tutto il Regno Unito. Ci specializziamo in soluzioni di pulizia meticolose e rispettose dell'ambiente per case e uffici, pensate per i clienti più esigenti. I nostri team dedicati di lingua inglese si impegnano a garantire che i vostri spazi siano non solo impeccabili, ma anche sani e sostenibili. Scoprite il massimo della pulizia con i nostri servizi premium su misura, pensati per le vostre esigenze a Londra, Birmingham, Glasgow, Leeds e oltre.",
    },
  },
  lk: {
    en: {
      heroSubtitle: "Pearly Sky — Eco-Luxury Cleaning for Homes and Workspaces in Sri Lanka",
      heroAvailability: "Serving selected locations across Sri Lanka. Availability depends on your location and service requirements.",
      trustCoverage: "Sri Lanka / 10 Cities",
      coverageTitle: "Service Excellence Throughout Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo, and more across Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offers professional, eco-friendly cleaning services for homes, offices, and hotels across Sri Lanka. We focus on quality and customer satisfaction, delivering tailored solutions to keep your space spotless.",
      aboutBilingualLabel: "Multilingual Local Teams",
      aboutBilingualDesc: "Friendly, English-speaking teams who know Sri Lanka inside and out.",
      welcomeContent:
        "Welcome to Pearly Sky, your premier partner for eco-luxury cleaning services across Sri Lanka. We specialise in providing meticulous, environmentally conscious home and office cleaning solutions that cater to the most discerning clients. Our dedicated multilingual local teams are committed to ensuring your spaces are not only spotless but also maintain a healthy, sustainable environment. Experience the pinnacle of cleanliness with our premium, tailored services designed for your unique requirements in Colombo, Kandy, Galle, Negombo and beyond.",
    },
    fr: {
      heroSubtitle: "Pearly Sky — Nettoyage éco-luxe pour maisons et espaces de travail au Sri Lanka",
      heroAvailability: "Nous intervenons dans une sélection de villes au Sri Lanka. La disponibilité dépend de votre localisation et de vos besoins.",
      trustCoverage: "Sri Lanka / 10 Villes",
      coverageTitle: "Excellence de Service Partout au Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo, et plus encore à travers le Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning propose des services de nettoyage professionnels et écologiques pour les maisons, les bureaux et les hôtels partout au Sri Lanka. Nous privilégions la qualité et la satisfaction client, en fournissant des solutions sur mesure pour un résultat impeccable.",
      aboutBilingualLabel: "Équipes Locales Multilingues",
      aboutBilingualDesc: "Des équipes anglophones chaleureuses qui connaissent le Sri Lanka sur le bout des doigts.",
      welcomeContent:
        "Bienvenue chez Pearly Sky, votre partenaire privilégié pour des services de nettoyage éco-luxe partout au Sri Lanka. Nous sommes spécialisés dans des solutions de nettoyage méticuleuses et respectueuses de l'environnement pour les maisons et les bureaux, répondant aux attentes des clients les plus exigeants. Nos équipes locales multilingues dédiées veillent à ce que vos espaces soient non seulement impeccables, mais aussi sains et durables. Découvrez l'excellence de la propreté avec nos services premium sur mesure, conçus pour vos besoins à Colombo, Kandy, Galle, Negombo et au-delà.",
    },
    de: {
      heroSubtitle: "Pearly Sky — Eco-Luxus-Reinigung für Wohnungen und Arbeitsräume in Sri Lanka",
      heroAvailability: "Wir sind an ausgewählten Standorten in ganz Sri Lanka tätig. Die Verfügbarkeit hängt von Ihrem Standort und Ihren Anforderungen ab.",
      trustCoverage: "Sri Lanka / 10 Städte",
      coverageTitle: "Erstklassiger Service in ganz Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo und viele weitere Orte in ganz Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning bietet professionelle, umweltfreundliche Reinigungsdienste für Privathaushalte, Büros und Hotels in ganz Sri Lanka. Wir legen Wert auf Qualität und Kundenzufriedenheit und liefern maßgeschneiderte Lösungen für makellose Räume.",
      aboutBilingualLabel: "Mehrsprachige lokale Teams",
      aboutBilingualDesc: "Freundliche, englischsprachige Teams, die Sri Lanka in- und auswendig kennen.",
      welcomeContent:
        "Willkommen bei Pearly Sky, Ihrem erstklassigen Partner für Öko-Luxus-Reinigungsdienstleistungen in ganz Sri Lanka. Wir sind spezialisiert auf sorgfältige, umweltbewusste Reinigungslösungen für Haus und Büro, die den anspruchsvollsten Kunden gerecht werden. Unsere engagierten mehrsprachigen lokalen Teams sorgen dafür, dass Ihre Räume nicht nur makellos sauber, sondern auch gesund und nachhaltig sind. Erleben Sie Sauberkeit auf höchstem Niveau mit unseren maßgeschneiderten Premium-Leistungen für Ihre individuellen Anforderungen in Colombo, Kandy, Galle, Negombo und darüber hinaus.",
    },
    es: {
      heroSubtitle: "Pearly Sky — Limpieza eco-lujo para hogares y espacios de trabajo en Sri Lanka",
      heroAvailability: "Atendemos determinadas zonas de Sri Lanka. La disponibilidad depende de su ubicación y de sus necesidades de servicio.",
      trustCoverage: "Sri Lanka / 10 Ciudades",
      coverageTitle: "Excelencia en el Servicio en Todo Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo y muchas más en todo Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning ofrece servicios de limpieza profesionales y ecológicos para hogares, oficinas y hoteles en todo Sri Lanka. Priorizamos la calidad y la satisfacción del cliente, con soluciones a medida para que su espacio quede impecable.",
      aboutBilingualLabel: "Equipos Locales Multilingües",
      aboutBilingualDesc: "Equipos amables y de habla inglesa que conocen Sri Lanka a la perfección.",
      welcomeContent:
        "Bienvenido a Pearly Sky, tu socio principal de servicios de limpieza eco-lujo en todo Sri Lanka. Nos especializamos en soluciones de limpieza meticulosas y respetuosas con el medio ambiente para hogares y oficinas, pensadas para los clientes más exigentes. Nuestros equipos locales multilingües se comprometen a que tus espacios no solo queden impecables, sino que mantengan un entorno saludable y sostenible. Descubre la máxima limpieza con nuestros servicios premium a medida, diseñados para tus necesidades en Colombo, Kandy, Galle, Negombo y más allá.",
    },
    it: {
      heroSubtitle: "Pearly Sky — Pulizia eco-luxury per case e spazi di lavoro in Sri Lanka",
      heroAvailability: "Operiamo in località selezionate in tutto lo Sri Lanka. La disponibilità dipende dalla tua posizione e dalle tue esigenze di servizio.",
      trustCoverage: "Sri Lanka / 10 Città",
      coverageTitle: "Eccellenza del Servizio in Tutto lo Sri Lanka",
      coverageSubtitle: "Colombo, Kandy, Galle, Negombo e molte altre in tutto lo Sri Lanka.",
      footerTagline:
        "Pearly Sky Cleaning offre servizi di pulizia professionali ed ecologici per case, uffici e hotel in tutto lo Sri Lanka. Puntiamo su qualità e soddisfazione del cliente, con soluzioni su misura per spazi impeccabili.",
      aboutBilingualLabel: "Team Locali Multilingue",
      aboutBilingualDesc: "Team cordiali e di lingua inglese che conoscono lo Sri Lanka come le proprie tasche.",
      welcomeContent:
        "Benvenuti in Pearly Sky, il vostro partner d'eccellenza per i servizi di pulizia eco-luxury in tutto lo Sri Lanka. Ci specializziamo in soluzioni di pulizia meticolose e rispettose dell'ambiente per case e uffici, pensate per i clienti più esigenti. I nostri team locali multilingue si impegnano a garantire che i vostri spazi siano non solo impeccabili, ma anche sani e sostenibili. Scoprite il massimo della pulizia con i nostri servizi premium su misura, pensati per le vostre esigenze a Colombo, Kandy, Galle, Negombo e oltre.",
    },
  },
};

/**
 * CURRENT_COUNTRY's home page copy in `language`, falling back to its
 * English copy if that language has no hand-written entry.
 */
export function getCountryHomeContent(language: LanguageCode): CountryHomeCopy {
  const forCountry = COUNTRY_HOME_CONTENT[CURRENT_COUNTRY];
  return forCountry[language] ?? forCountry.en!;
}
