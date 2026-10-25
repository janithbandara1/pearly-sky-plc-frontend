import type { LanguageCode } from "@/lib/i18n/config";
import type { PageMeta } from "./meta-data";

/** The pages whose GLOBAL_META copy (lib/countries/meta-data.ts) is translated here, keyed as getCountryPageMeta asks for them. */
export type GlobalMetaPage = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations" | "blog";

/**
 * <title>/description of the global gateway's pages in French, German, Spanish
 * and Italian. English lives in GLOBAL_META; a page missing here falls back to it.
 */
export const GLOBAL_META_TRANSLATIONS: Partial<Record<LanguageCode, Record<GlobalMetaPage, PageMeta>>> = {
  fr: {
    home: {
      title: "Services de nettoyage éco-luxe dans le monde | Pearly Sky Worldwide",
      description:
        "Découvrez un nettoyage éco-luxe durable, résidentiel et commercial, de classe mondiale. Des soins premium sur mesure, adaptés à votre style de vie d'exception, partout dans le monde.",
    },
    about: {
      title: "L'équipe mondiale d'élite du nettoyage éco-luxe | Pearly Sky",
      description:
        "Découvrez notre engagement mondial pour l'excellence d'un nettoyage ultra-premium et durable. La confiance de clients fortunés et de domaines de luxe dans le monde entier.",
    },
    customers: {
      title: "Avis clients et témoignages 5 étoiles dans le monde | Pearly Sky",
      description:
        "Lisez les témoignages vérifiés de résidents de renom, de domaines de luxe et de clients professionnels haut de gamme qui font confiance à Pearly Sky dans le monde entier.",
    },
    contact: {
      title: "Réservez votre nettoyage de luxe | Contactez Pearly Sky",
      description:
        "Contactez Pearly Sky Eco-Luxury Cleaning Services. Demandez un devis sur mesure pour un nettoyage premium résidentiel ou professionnel partout dans le monde.",
    },
    careers: {
      title: "Rejoignez notre équipe mondiale d'élite | Carrières Pearly Sky",
      description:
        "Postulez pour des carrières dans le nettoyage et l'entretien de biens premium chez Pearly Sky Worldwide. Rejoignez une marque mondiale haut de gamme, avec une formation de qualité.",
    },
    ourLocations: {
      title: "Implantations et activités dans le monde | Pearly Sky Worldwide",
      description:
        "Découvrez les implantations internationales de Pearly Sky. Des services de nettoyage éco-luxe et de gestion de domaines d'exception dans des destinations du monde entier.",
    },
    blog: {
      title: "Blog sur l'art de vivre éco-luxe et l'entretien de domaines | Pearly Sky",
      description:
        "Des analyses d'experts sur l'art de vivre durable et luxueux, l'entretien de biens d'exception et les meilleures pratiques de nettoyage écologique.",
    },
  },
  de: {
    home: {
      title: "Globale Öko-Luxus-Reinigung | Pearly Sky Worldwide",
      description:
        "Erleben Sie erstklassige, nachhaltige Öko-Luxus-Reinigung für Privat- und Gewerbeobjekte. Maßgeschneiderte Premium-Pflege für Ihren exklusiven Lebensstil weltweit.",
    },
    about: {
      title: "Das globale Elite-Team für Öko-Luxus-Reinigung | Pearly Sky",
      description:
        "Entdecken Sie unser globales Engagement für nachhaltige Reinigungsexzellenz auf Premium-Niveau. Vertrauenswürdig für anspruchsvolle Kunden und Luxusanwesen weltweit.",
    },
    customers: {
      title: "Kundenbewertungen und 5-Sterne-Referenzen weltweit | Pearly Sky",
      description:
        "Lesen Sie geprüfte Erfahrungsberichte von prominenten Bewohnern, Luxusanwesen und gehobenen Firmenkunden, die Pearly Sky weltweit vertrauen.",
    },
    contact: {
      title: "Buchen Sie Ihre Luxusreinigung | Kontakt zu Pearly Sky",
      description:
        "Nehmen Sie Kontakt mit Pearly Sky Eco-Luxury Cleaning Services auf. Fordern Sie ein maßgeschneidertes Angebot für Premium-Reinigung von Privat- oder Firmenobjekten weltweit an.",
    },
    careers: {
      title: "Werden Sie Teil unseres globalen Elite-Teams | Karriere bei Pearly Sky",
      description:
        "Bewerben Sie sich für Karrieren in Premium-Reinigung und Immobilienpflege bei Pearly Sky Worldwide. Werden Sie Teil einer hochwertigen globalen Marke mit erstklassiger Ausbildung.",
    },
    ourLocations: {
      title: "Weltweite Standorte und Aktivitäten | Pearly Sky Worldwide",
      description:
        "Entdecken Sie die internationalen Standorte von Pearly Sky. Erstklassige Öko-Luxus-Reinigung und Anwesenverwaltung an Zielen auf der ganzen Welt.",
    },
    blog: {
      title: "Blog zu Öko-Luxus-Wohnen und Anwesenpflege | Pearly Sky",
      description:
        "Internationale Experteneinblicke zu nachhaltigem Luxuswohnen, hochwertiger Immobilienpflege und erstklassigen umweltfreundlichen Reinigungsmethoden.",
    },
  },
  es: {
    home: {
      title: "Servicios de limpieza eco-lujo en todo el mundo | Pearly Sky Worldwide",
      description:
        "Descubra una limpieza eco-lujo sostenible, residencial y comercial, de categoría mundial. Cuidado premium a medida para su estilo de vida exclusivo en cualquier lugar.",
    },
    about: {
      title: "El equipo global de élite en limpieza eco-lujo | Pearly Sky",
      description:
        "Conozca nuestro compromiso global con la excelencia en limpieza sostenible de nivel ultra-premium. La confianza de clientes exigentes y fincas de lujo en todo el mundo.",
    },
    customers: {
      title: "Opiniones de clientes y testimonios de 5 estrellas | Pearly Sky",
      description:
        "Lea testimonios verificados de residentes destacados, fincas de lujo y clientes corporativos premium que confían en Pearly Sky en todo el mundo.",
    },
    contact: {
      title: "Reserve su limpieza de lujo | Contacte con Pearly Sky",
      description:
        "Póngase en contacto con Pearly Sky Eco-Luxury Cleaning Services. Solicite un presupuesto a medida para limpieza premium residencial o corporativa en todo el mundo.",
    },
    careers: {
      title: "Únase a nuestro equipo global de élite | Empleo en Pearly Sky",
      description:
        "Solicite empleo en limpieza premium y cuidado de propiedades en Pearly Sky Worldwide. Únase a una marca global de alta gama con una formación superior.",
    },
    ourLocations: {
      title: "Operaciones y ubicaciones globales | Pearly Sky Worldwide",
      description:
        "Explore las ubicaciones internacionales de Pearly Sky. Servicios de limpieza eco-lujo y gestión de fincas de primer nivel en destinos de todo el mundo.",
    },
    blog: {
      title: "Blog de vida eco-lujo y mantenimiento de fincas | Pearly Sky",
      description:
        "Conocimientos internacionales de expertos sobre vida de lujo sostenible, mantenimiento de propiedades de élite y prácticas de limpieza ecológica de categoría mundial.",
    },
  },
  it: {
    home: {
      title: "Servizi di pulizia eco-lusso in tutto il mondo | Pearly Sky Worldwide",
      description:
        "Scopri una pulizia eco-lusso sostenibile, residenziale e commerciale, di livello mondiale. Cura premium su misura per il tuo stile di vita esclusivo, ovunque tu sia.",
    },
    about: {
      title: "Il team globale d'élite della pulizia eco-lusso | Pearly Sky",
      description:
        "Scopri il nostro impegno globale per l'eccellenza nella pulizia sostenibile di livello ultra-premium. La fiducia di clienti esigenti e tenute di lusso in tutto il mondo.",
    },
    customers: {
      title: "Recensioni dei clienti e testimonianze a 5 stelle | Pearly Sky",
      description:
        "Leggi testimonianze verificate di residenti di prestigio, tenute di lusso e clienti aziendali premium che si affidano a Pearly Sky in tutto il mondo.",
    },
    contact: {
      title: "Prenota la tua pulizia di lusso | Contatta Pearly Sky",
      description:
        "Mettiti in contatto con Pearly Sky Eco-Luxury Cleaning Services. Richiedi un preventivo su misura per pulizie premium residenziali o aziendali in tutto il mondo.",
    },
    careers: {
      title: "Unisciti al nostro team globale d'élite | Carriere in Pearly Sky",
      description:
        "Candidati per carriere nella pulizia premium e nella cura degli immobili in Pearly Sky Worldwide. Entra a far parte di un marchio globale di alto livello con una formazione superiore.",
    },
    ourLocations: {
      title: "Attività e sedi nel mondo | Pearly Sky Worldwide",
      description:
        "Esplora le sedi internazionali di Pearly Sky. Servizi di pulizia eco-lusso e gestione di tenute di alto livello in destinazioni di tutto il mondo.",
    },
    blog: {
      title: "Blog su vita eco-lusso e manutenzione di tenute | Pearly Sky",
      description:
        "Approfondimenti internazionali di esperti su vita di lusso sostenibile, manutenzione di immobili d'élite e pratiche di pulizia ecologica di livello mondiale.",
    },
  },
};
