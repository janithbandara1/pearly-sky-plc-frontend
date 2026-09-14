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
 * Titles append the bare country name directly (matching the existing
 * en/fr convention — proper-noun labels don't need grammatical agreement in
 * any of these languages). Descriptions tag the country on with an em dash
 * instead of a language-specific preposition ("in", "en", "in den", ...):
 * many of these 28 country names need a *different* preposition/article
 * per language depending on gender/number (e.g. French "au Portugal" vs
 * "en Allemagne" vs "aux Pays-Bas") and one, Finnish, inflects the country
 * noun itself rather than using a preposition at all. A single template
 * can't get that grammar right for all 28 countries at once, so the dash
 * sidesteps it — safe and consistent, at the cost of reading a little more
 * like a label than a fully native sentence. FR_PAGE_META_FR in
 * meta-data.ts (the one country/language combo with hand-tuned grammar)
 * shows what the fully-idiomatic version looks like.
 */
export const TRANSLATED_LANGUAGES = ["fr", "da", "de", "es", "fi", "it", "lb", "nl", "no", "pl", "pt", "ro", "sv"] as const;
type TranslatedLanguage = (typeof TRANSLATED_LANGUAGES)[number];

function isTranslatedLanguage(language: LanguageCode): language is TranslatedLanguage {
  return (TRANSLATED_LANGUAGES as readonly string[]).includes(language);
}

/** Bare country display name per language, used to fill a template's {country} slot. */
export const COUNTRY_DISPLAY_NAMES: Record<TranslatedLanguage, Record<CountryCode, string>> = {
  fr: {
    fr: "France & Monaco", de: "Allemagne", lu: "Luxembourg", nl: "Pays-Bas", fi: "Finlande", se: "Suède",
    it: "Italie", pl: "Pologne", be: "Belgique", at: "Autriche", dk: "Danemark", es: "Espagne", pt: "Portugal",
    ro: "Roumanie", ie: "Irlande", mc: "Monaco", ch: "Suisse", gb: "Royaume-Uni", us: "États-Unis", ca: "Canada",
    au: "Australie", nz: "Nouvelle-Zélande", qa: "Qatar", sa: "Arabie Saoudite", ae: "Émirats Arabes Unis",
    om: "Oman", bh: "Bahreïn", lk: "Sri Lanka",
  },
  de: {
    fr: "Frankreich & Monaco", de: "Deutschland", lu: "Luxemburg", nl: "Niederlande", fi: "Finnland", se: "Schweden",
    it: "Italien", pl: "Polen", be: "Belgien", at: "Österreich", dk: "Dänemark", es: "Spanien", pt: "Portugal",
    ro: "Rumänien", ie: "Irland", mc: "Monaco", ch: "Schweiz", gb: "Vereinigtes Königreich", us: "Vereinigte Staaten",
    ca: "Kanada", au: "Australien", nz: "Neuseeland", qa: "Katar", sa: "Saudi-Arabien",
    ae: "Vereinigte Arabische Emirate", om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  es: {
    fr: "Francia y Mónaco", de: "Alemania", lu: "Luxemburgo", nl: "Países Bajos", fi: "Finlandia", se: "Suecia",
    it: "Italia", pl: "Polonia", be: "Bélgica", at: "Austria", dk: "Dinamarca", es: "España", pt: "Portugal",
    ro: "Rumanía", ie: "Irlanda", mc: "Mónaco", ch: "Suiza", gb: "Reino Unido", us: "Estados Unidos", ca: "Canadá",
    au: "Australia", nz: "Nueva Zelanda", qa: "Catar", sa: "Arabia Saudita", ae: "Emiratos Árabes Unidos",
    om: "Omán", bh: "Baréin", lk: "Sri Lanka",
  },
  fi: {
    fr: "Ranska ja Monaco", de: "Saksa", lu: "Luxemburg", nl: "Alankomaat", fi: "Suomi", se: "Ruotsi",
    it: "Italia", pl: "Puola", be: "Belgia", at: "Itävalta", dk: "Tanska", es: "Espanja", pt: "Portugali",
    ro: "Romania", ie: "Irlanti", mc: "Monaco", ch: "Sveitsi", gb: "Yhdistynyt kuningaskunta", us: "Yhdysvallat",
    ca: "Kanada", au: "Australia", nz: "Uusi-Seelanti", qa: "Qatar", sa: "Saudi-Arabia",
    ae: "Arabiemiirikunnat", om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  it: {
    fr: "Francia e Monaco", de: "Germania", lu: "Lussemburgo", nl: "Paesi Bassi", fi: "Finlandia", se: "Svezia",
    it: "Italia", pl: "Polonia", be: "Belgio", at: "Austria", dk: "Danimarca", es: "Spagna", pt: "Portogallo",
    ro: "Romania", ie: "Irlanda", mc: "Monaco", ch: "Svizzera", gb: "Regno Unito", us: "Stati Uniti", ca: "Canada",
    au: "Australia", nz: "Nuova Zelanda", qa: "Qatar", sa: "Arabia Saudita", ae: "Emirati Arabi Uniti",
    om: "Oman", bh: "Bahrein", lk: "Sri Lanka",
  },
  lb: {
    fr: "Frankräich & Monaco", de: "Däitschland", lu: "Lëtzebuerg", nl: "Nidderlanden", fi: "Finnland", se: "Schweden",
    it: "Italien", pl: "Polen", be: "Belsch", at: "Éisträich", dk: "Dänemark", es: "Spuenien", pt: "Portugal",
    ro: "Rumänien", ie: "Irland", mc: "Monaco", ch: "Schwäiz", gb: "Vereenegt Kinnekräich", us: "Vereenegt Staaten",
    ca: "Kanada", au: "Australien", nz: "Neiséiland", qa: "Katar", sa: "Saudi-Arabien",
    ae: "Vereenegte Arabesch Emirater", om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  nl: {
    fr: "Frankrijk & Monaco", de: "Duitsland", lu: "Luxemburg", nl: "Nederland", fi: "Finland", se: "Zweden",
    it: "Italië", pl: "Polen", be: "België", at: "Oostenrijk", dk: "Denemarken", es: "Spanje", pt: "Portugal",
    ro: "Roemenië", ie: "Ierland", mc: "Monaco", ch: "Zwitserland", gb: "Verenigd Koninkrijk", us: "Verenigde Staten",
    ca: "Canada", au: "Australië", nz: "Nieuw-Zeeland", qa: "Qatar", sa: "Saudi-Arabië",
    ae: "Verenigde Arabische Emiraten", om: "Oman", bh: "Bahrein", lk: "Sri Lanka",
  },
  no: {
    fr: "Frankrike & Monaco", de: "Tyskland", lu: "Luxembourg", nl: "Nederland", fi: "Finland", se: "Sverige",
    it: "Italia", pl: "Polen", be: "Belgia", at: "Østerrike", dk: "Danmark", es: "Spania", pt: "Portugal",
    ro: "Romania", ie: "Irland", mc: "Monaco", ch: "Sveits", gb: "Storbritannia", us: "USA", ca: "Canada",
    au: "Australia", nz: "Ny-Zealand", qa: "Qatar", sa: "Saudi-Arabia", ae: "De forente arabiske emirater",
    om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  pl: {
    fr: "Francja i Monako", de: "Niemcy", lu: "Luksemburg", nl: "Holandia", fi: "Finlandia", se: "Szwecja",
    it: "Włochy", pl: "Polska", be: "Belgia", at: "Austria", dk: "Dania", es: "Hiszpania", pt: "Portugalia",
    ro: "Rumunia", ie: "Irlandia", mc: "Monako", ch: "Szwajcaria", gb: "Wielka Brytania", us: "Stany Zjednoczone",
    ca: "Kanada", au: "Australia", nz: "Nowa Zelandia", qa: "Katar", sa: "Arabia Saudyjska",
    ae: "Zjednoczone Emiraty Arabskie", om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  pt: {
    fr: "França e Mónaco", de: "Alemanha", lu: "Luxemburgo", nl: "Países Baixos", fi: "Finlândia", se: "Suécia",
    it: "Itália", pl: "Polónia", be: "Bélgica", at: "Áustria", dk: "Dinamarca", es: "Espanha", pt: "Portugal",
    ro: "Roménia", ie: "Irlanda", mc: "Mónaco", ch: "Suíça", gb: "Reino Unido", us: "Estados Unidos", ca: "Canadá",
    au: "Austrália", nz: "Nova Zelândia", qa: "Catar", sa: "Arábia Saudita", ae: "Emirados Árabes Unidos",
    om: "Omã", bh: "Barém", lk: "Sri Lanka",
  },
  ro: {
    fr: "Franța și Monaco", de: "Germania", lu: "Luxemburg", nl: "Țările de Jos", fi: "Finlanda", se: "Suedia",
    it: "Italia", pl: "Polonia", be: "Belgia", at: "Austria", dk: "Danemarca", es: "Spania", pt: "Portugalia",
    ro: "România", ie: "Irlanda", mc: "Monaco", ch: "Elveția", gb: "Regatul Unit", us: "Statele Unite", ca: "Canada",
    au: "Australia", nz: "Noua Zeelandă", qa: "Qatar", sa: "Arabia Saudită", ae: "Emiratele Arabe Unite",
    om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  sv: {
    fr: "Frankrike & Monaco", de: "Tyskland", lu: "Luxemburg", nl: "Nederländerna", fi: "Finland", se: "Sverige",
    it: "Italien", pl: "Polen", be: "Belgien", at: "Österrike", dk: "Danmark", es: "Spanien", pt: "Portugal",
    ro: "Rumänien", ie: "Irland", mc: "Monaco", ch: "Schweiz", gb: "Storbritannien", us: "USA", ca: "Kanada",
    au: "Australien", nz: "Nya Zeeland", qa: "Qatar", sa: "Saudiarabien", ae: "Förenade Arabemiraten",
    om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
  da: {
    fr: "Frankrig & Monaco", de: "Tyskland", lu: "Luxembourg", nl: "Nederlandene", fi: "Finland", se: "Sverige",
    it: "Italien", pl: "Polen", be: "Belgien", at: "Østrig", dk: "Danmark", es: "Spanien", pt: "Portugal",
    ro: "Rumænien", ie: "Irland", mc: "Monaco", ch: "Schweiz", gb: "Storbritannien", us: "USA", ca: "Canada",
    au: "Australien", nz: "Ny Zealand", qa: "Qatar", sa: "Saudi-Arabien", ae: "De Forenede Arabiske Emirater",
    om: "Oman", bh: "Bahrain", lk: "Sri Lanka",
  },
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
  fi: {
    home: {
      title: "Premium Eco-Luxury-Siivouspalvelut {country} | Pearly Sky",
      description:
        "Koe eliittitason eco-luxury-siivous kotitalouksille ja yrityksille — {country}. Viiden tähden kiinteistönhoito kestävillä, huipputehokkailla menetelmillä.",
    },
    about: {
      title: "Tietoa Meistä: Eco-Luxury-Kiinteistönhoito {country} | Pearly Sky",
      description:
        "Tutustu tarinaan, tiukkoihin standardeihin ja arvoihin, jotka ohjaavat Pearly Sky Globalia — {country}. Sitoutuneet eliittitason kiinteistönhoitoon ja elämäntapatukeen.",
    },
    customers: {
      title: "Vahvistetut Asiakasarvostelut & Kokemukset {country} | Pearly Sky",
      description:
        "Katso, mitä asiakkaamme sanovat meistä. Vahvistetut arvostelut premium-kodinomistajilta, yritystoimistoilta ja luksuskiinteistöiltä — {country}.",
    },
    contact: {
      title: "Ota Yhteyttä Eco-Luxury-Siivoustiimiimme {country} | Pearly Sky",
      description:
        "Ota yhteyttä Pearly Sky Globaliin — {country} varauskyselyjä tai räätälöityjä tarjouksia varten. Luotettavaa, välitöntä apua.",
    },
    careers: {
      title: "Uramahdollisuudet Luksuskiinteistöjen Hoidossa {country} | Pearly Sky",
      description:
        "Rakenna palkitseva ura luksuskiinteistöjen hoidossa — {country}. Tutustu avoimiin paikkoihin ammattisiivoojille ja premium-asiantuntijoille.",
    },
    ourLocations: {
      title: "Palvelualueemme {country} | Pearly Sky Global",
      description:
        "Premium-palveluklustereita — {country}. Löydä paikallinen Pearly Sky Global -palveluportaalisi ja varaa eliittitason eco-luxury-hoito.",
    },
    blog: {
      title: "Eco-Luxury-Siivousblogi & Oivalluksia {country} | Pearly Sky",
      description:
        "Ammattimaisia hoito-ohjeita, kestäviä kodinhoito-oppaita ja oivalluksia eliittitason kiinteistönhoidosta premium-tiloille — {country}.",
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
  lb: {
    home: {
      title: "Premium Eco-Luxus Botzdéngschtleeschtungen {country} | Pearly Sky",
      description:
        "Erlieft elitär, eco-luxuriéis Botzen fir Wunneng a Betriber — {country}. Fënnef-Stäre Immobiliëpfleeg mat nohaltege, héichleeschtungsfäheg Methoden.",
    },
    about: {
      title: "Iwwer Ons: Eco-Luxus Immobiliëpfleeg {country} | Pearly Sky",
      description:
        "Entdeckt d'Geschicht, déi strikt Standarden an d'Wäerter vu Pearly Sky Global — {country}. Engagéiert fir top Immobiliëpfleeg a Lifestyle-Ënnerstëtzung.",
    },
    customers: {
      title: "Verifizéiert Clientsbewäertungen & Ausso {country} | Pearly Sky",
      description:
        "Gesitt wat eis Clienten iwwer eis soen. Verifizéiert Bewäertungen vu Premium-Hausbesëtzer, Firmenbüroen a Luxusimmobilien — {country}.",
    },
    contact: {
      title: "Kontaktéiert Eise Eco-Luxus Botzteam {country} | Pearly Sky",
      description:
        "Kontaktéiert Pearly Sky Global — {country} fir Buchungsufroen oder personaliséiert Offerten. Zouverlässeg, direkt Ënnerstëtzung.",
    },
    careers: {
      title: "Carrière an der Luxus-Immobiliëpfleeg {country} | Pearly Sky",
      description:
        "Baut eng lounend Carrière an der Luxus-Immobiliëpfleeg — {country}. Entdeckt oppe Positiounen fir professionell Botzpersonal a Premium-Spezialisten.",
    },
    ourLocations: {
      title: "Eis Servicestandpunkten {country} | Pearly Sky Global",
      description:
        "Premium Servicecluster — {country}. Fannt Äre lokale Pearly Sky Global Servicespportal a buchen top eco-luxuriéis Pfleeg.",
    },
    blog: {
      title: "Eco-Luxus Botzblog & Aussiichten {country} | Pearly Sky",
      description:
        "Professionell Pflegberodung, nohalteg Haushaltsguiden an Aussiichten an top Immobiliëwaardung fir Premiumraim — {country}.",
    },
  },
  nl: {
    home: {
      title: "Premium Eco-Luxe Schoonmaakdiensten {country} | Pearly Sky",
      description:
        "Ervaar elite eco-luxe residentiële en commerciële schoonmaak — {country}. Vijfsterren vastgoedverzorging met duurzame, hoogwaardige praktijken.",
    },
    about: {
      title: "Over Ons: Eco-Luxe Vastgoedverzorging {country} | Pearly Sky",
      description:
        "Ontdek het verhaal, de strikte normen en de waarden die Pearly Sky Global drijven — {country}. Toegewijd aan elite vastgoedverzorging en lifestyle-ondersteuning.",
    },
    customers: {
      title: "Geverifieerde Klantbeoordelingen & Getuigenissen {country} | Pearly Sky",
      description:
        "Ontdek wat onze klanten over ons zeggen. Geverifieerde beoordelingen van premium huiseigenaren, kantoren en luxe panden — {country}.",
    },
    contact: {
      title: "Neem Contact Op met Ons Eco-Luxe Schoonmaakteam {country} | Pearly Sky",
      description:
        "Neem contact op met Pearly Sky Global — {country} voor boekingsvragen of aangepaste offertes. Betrouwbare, directe assistentie.",
    },
    careers: {
      title: "Carrières in Luxe Vastgoedverzorging {country} | Pearly Sky",
      description:
        "Bouw een lonende carrière in luxe vastgoedverzorging — {country}. Bekijk openstaande functies voor professionele schoonmakers en premium specialisten.",
    },
    ourLocations: {
      title: "Onze Servicelocaties {country} | Pearly Sky Global",
      description:
        "Premium serviceclusters — {country}. Vind uw lokale Pearly Sky Global serviceportaal en boek elite eco-luxe verzorging.",
    },
    blog: {
      title: "Eco-Luxe Schoonmaakblog & Inzichten {country} | Pearly Sky",
      description:
        "Professioneel verzorgingsadvies, duurzame huishoudgidsen en inzichten in elite vastgoedonderhoud voor premium ruimtes — {country}.",
    },
  },
  no: {
    home: {
      title: "Premium Eco-Luksus Rengjøringstjenester {country} | Pearly Sky",
      description:
        "Opplev elite, eco-luksus rengjøring for boliger og bedrifter — {country}. Fem-stjerners eiendomspleie med bærekraftige, høytytende metoder.",
    },
    about: {
      title: "Om Oss: Eco-Luksus Eiendomspleie {country} | Pearly Sky",
      description:
        "Utforsk historien, de strenge standardene og verdiene som driver Pearly Sky Global — {country}. Dedikert til førsteklasses eiendomspleie og livsstilsstøtte.",
    },
    customers: {
      title: "Verifiserte Kundevurderinger & Attester {country} | Pearly Sky",
      description:
        "Se hva våre kunder sier om oss. Verifiserte vurderinger fra premium huseiere, bedriftskontorer og luksuseiendommer — {country}.",
    },
    contact: {
      title: "Kontakt Vårt Eco-Luksus Rengjøringsteam {country} | Pearly Sky",
      description:
        "Kontakt Pearly Sky Global — {country} for bookingforespørsler eller skreddersydde tilbud. Pålitelig, umiddelbar assistanse.",
    },
    careers: {
      title: "Karriere innen Luksus Eiendomspleie {country} | Pearly Sky",
      description:
        "Bygg en givende karriere innen luksus eiendomspleie — {country}. Utforsk ledige stillinger for profesjonelle renholdere og premiumspesialister.",
    },
    ourLocations: {
      title: "Våre Servicesteder {country} | Pearly Sky Global",
      description:
        "Premium serviceklynger — {country}. Finn din lokale Pearly Sky Global-serviceportal og book førsteklasses eco-luksus pleie.",
    },
    blog: {
      title: "Eco-Luksus Rengjøringsblogg & Innsikt {country} | Pearly Sky",
      description:
        "Profesjonelle pleieråd, bærekraftige husholdningsguider og innsikt i førsteklasses eiendomsvedlikehold for premiumrom — {country}.",
    },
  },
  pl: {
    home: {
      title: "Usługi Premium Eco-Luxury Cleaning {country} | Pearly Sky",
      description:
        "Poznaj elitarne, eco-luksusowe usługi czyszczenia mieszkań i firm — {country}. Pięciogwiazdkowa pielęgnacja nieruchomości z wykorzystaniem zrównoważonych, wysokowydajnych praktyk.",
    },
    about: {
      title: "O Nas: Pielęgnacja Nieruchomości Eco-Luxury {country} | Pearly Sky",
      description:
        "Odkryj historię, rygorystyczne standardy i wartości, które kierują Pearly Sky Global — {country}. Zaangażowani w elitarną pielęgnację nieruchomości i wsparcie stylu życia.",
    },
    customers: {
      title: "Zweryfikowane Opinie i Referencje Klientów {country} | Pearly Sky",
      description:
        "Zobacz, co mówią o nas nasi klienci. Zweryfikowane opinie od właścicieli domów, biur korporacyjnych i luksusowych nieruchomości — {country}.",
    },
    contact: {
      title: "Skontaktuj się z Naszym Zespołem Eco-Luxury Cleaning {country} | Pearly Sky",
      description:
        "Skontaktuj się z Pearly Sky Global — {country} w celu rezerwacji lub indywidualnej wyceny. Rzetelna, natychmiastowa pomoc.",
    },
    careers: {
      title: "Kariera w Pielęgnacji Nieruchomości Luksusowych {country} | Pearly Sky",
      description:
        "Zbuduj satysfakcjonującą karierę w pielęgnacji nieruchomości luksusowych — {country}. Sprawdź otwarte stanowiska dla profesjonalnych sprzątaczy i specjalistów premium.",
    },
    ourLocations: {
      title: "Nasze Lokalizacje Usługowe {country} | Pearly Sky Global",
      description:
        "Premium klastry usługowe — {country}. Znajdź swój lokalny portal usługowy Pearly Sky Global i zarezerwuj elitarną eco-luksusową pielęgnację.",
    },
    blog: {
      title: "Blog i Wiedza o Eco-Luxury Cleaning {country} | Pearly Sky",
      description:
        "Profesjonalne porady dotyczące pielęgnacji, zrównoważone przewodniki po prowadzeniu domu i wiedza o elitarnej pielęgnacji nieruchomości dla przestrzeni premium — {country}.",
    },
  },
  pt: {
    home: {
      title: "Serviços Premium de Limpeza Eco-Luxo {country} | Pearly Sky",
      description:
        "Descubra um serviço de limpeza residencial e comercial eco-luxo de elite — {country}. Cuidado de propriedades cinco estrelas com práticas sustentáveis e de alto desempenho.",
    },
    about: {
      title: "Sobre Nós: Cuidado de Propriedades Eco-Luxo {country} | Pearly Sky",
      description:
        "Descubra a história, os padrões rigorosos e os valores que impulsionam a Pearly Sky Global — {country}. Dedicados ao cuidado de propriedades de elite e apoio ao estilo de vida.",
    },
    customers: {
      title: "Avaliações e Depoimentos Verificados de Clientes {country} | Pearly Sky",
      description:
        "Veja o que os nossos clientes dizem sobre nós. Avaliações verificadas de proprietários premium, escritórios corporativos e propriedades de luxo — {country}.",
    },
    contact: {
      title: "Contacte a Nossa Equipa de Limpeza Eco-Luxo {country} | Pearly Sky",
      description:
        "Contacte a Pearly Sky Global — {country} para pedidos de reserva ou orçamentos personalizados. Assistência fiável e imediata.",
    },
    careers: {
      title: "Carreiras no Cuidado de Propriedades de Luxo {country} | Pearly Sky",
      description:
        "Construa uma carreira gratificante no cuidado de propriedades de luxo — {country}. Explore vagas para profissionais de limpeza e especialistas premium.",
    },
    ourLocations: {
      title: "As Nossas Localizações de Serviço {country} | Pearly Sky Global",
      description:
        "Clusters de serviço premium — {country}. Encontre o seu portal de serviço Pearly Sky Global local e reserve um cuidado eco-luxo de elite.",
    },
    blog: {
      title: "Blog e Perspetivas de Limpeza Eco-Luxo {country} | Pearly Sky",
      description:
        "Conselhos profissionais de cuidado, guias de manutenção sustentável e perspetivas sobre a manutenção de propriedades de elite para espaços premium — {country}.",
    },
  },
  ro: {
    home: {
      title: "Servicii Premium de Curățenie Eco-Lux {country} | Pearly Sky",
      description:
        "Descoperiți un serviciu de curățenie rezidențială și comercială eco-lux de elită — {country}. Îngrijire imobiliară de cinci stele, cu practici durabile și de înaltă performanță.",
    },
    about: {
      title: "Despre Noi: Îngrijirea Proprietăților Eco-Lux {country} | Pearly Sky",
      description:
        "Descoperiți povestea, standardele stricte și valorile care ghidează Pearly Sky Global — {country}. Dedicați îngrijirii imobiliare de elită și susținerii stilului de viață.",
    },
    customers: {
      title: "Recenzii și Testimoniale Verificate ale Clienților {country} | Pearly Sky",
      description:
        "Vedeți ce spun clienții noștri despre noi. Recenzii verificate de la proprietari premium, birouri corporative și proprietăți de lux — {country}.",
    },
    contact: {
      title: "Contactați Echipa Noastră de Curățenie Eco-Lux {country} | Pearly Sky",
      description:
        "Contactați Pearly Sky Global — {country} pentru solicitări de rezervare sau oferte personalizate. Asistență fiabilă și imediată.",
    },
    careers: {
      title: "Cariere în Îngrijirea Proprietăților de Lux {country} | Pearly Sky",
      description:
        "Construiți o carieră plină de satisfacții în îngrijirea proprietăților de lux — {country}. Explorați posturile disponibile pentru curățenie profesională și specialiști premium.",
    },
    ourLocations: {
      title: "Locațiile Noastre de Servicii {country} | Pearly Sky Global",
      description:
        "Clustere de servicii premium — {country}. Găsiți portalul local de servicii Pearly Sky Global și rezervați o îngrijire eco-lux de elită.",
    },
    blog: {
      title: "Blog și Perspective despre Curățenia Eco-Lux {country} | Pearly Sky",
      description:
        "Sfaturi profesionale de îngrijire, ghiduri de menaj durabil și perspective despre întreținerea imobiliară de elită pentru spații premium — {country}.",
    },
  },
  sv: {
    home: {
      title: "Premium Eco-Lyxiga Städtjänster {country} | Pearly Sky",
      description:
        "Upplev elit, eco-lyxig städning för bostäder och företag — {country}. Femstjärnig fastighetsvård med hållbara, högpresterande metoder.",
    },
    about: {
      title: "Om Oss: Eco-Lyxig Fastighetsvård {country} | Pearly Sky",
      description:
        "Upptäck historien, de strikta standarderna och värderingarna som driver Pearly Sky Global — {country}. Dedikerade till förstklassig fastighetsvård och livsstilsstöd.",
    },
    customers: {
      title: "Verifierade Kundrecensioner & Omdömen {country} | Pearly Sky",
      description:
        "Se vad våra kunder säger om oss. Verifierade recensioner från premiumhusägare, företagskontor och lyxfastigheter — {country}.",
    },
    contact: {
      title: "Kontakta Vårt Eco-Lyxiga Städteam {country} | Pearly Sky",
      description:
        "Kontakta Pearly Sky Global — {country} för bokningsförfrågningar eller anpassade offerter. Pålitlig, omedelbar hjälp.",
    },
    careers: {
      title: "Karriär inom Lyxig Fastighetsvård {country} | Pearly Sky",
      description:
        "Bygg en givande karriär inom lyxig fastighetsvård — {country}. Utforska öppna tjänster för professionella städare och premiumspecialister.",
    },
    ourLocations: {
      title: "Våra Serviceplatser {country} | Pearly Sky Global",
      description:
        "Premium servicekluster — {country}. Hitta din lokala Pearly Sky Global-serviceportal och boka förstklassig eco-lyxig vård.",
    },
    blog: {
      title: "Eco-Lyxig Städblogg & Insikter {country} | Pearly Sky",
      description:
        "Professionella vårdråd, hållbara hushållsguider och insikter om förstklassigt fastighetsunderhåll för premiumutrymmen — {country}.",
    },
  },
  da: {
    home: {
      title: "Premium Eco-Luksus Rengøringsservice {country} | Pearly Sky",
      description:
        "Oplev elite, eco-luksus rengøring til boliger og virksomheder — {country}. Fem-stjernet ejendomspleje med bæredygtige, højtydende metoder.",
    },
    about: {
      title: "Om Os: Eco-Luksus Ejendomspleje {country} | Pearly Sky",
      description:
        "Udforsk historien, de strenge standarder og værdierne, der driver Pearly Sky Global — {country}. Dedikerede til førsteklasses ejendomspleje og livsstilssupport.",
    },
    customers: {
      title: "Verificerede Kundeanmeldelser & Udtalelser {country} | Pearly Sky",
      description:
        "Se, hvad vores kunder siger om os. Verificerede anmeldelser fra premium boligejere, virksomhedskontorer og luksusejendomme — {country}.",
    },
    contact: {
      title: "Kontakt Vores Eco-Luksus Rengøringsteam {country} | Pearly Sky",
      description:
        "Kontakt Pearly Sky Global — {country} for bookingforespørgsler eller skræddersyede tilbud. Pålidelig, øjeblikkelig assistance.",
    },
    careers: {
      title: "Karriere inden for Luksus Ejendomspleje {country} | Pearly Sky",
      description:
        "Byg en givende karriere inden for luksus ejendomspleje — {country}. Udforsk ledige stillinger for professionelle rengøringsassistenter og premium specialister.",
    },
    ourLocations: {
      title: "Vores Servicelokationer {country} | Pearly Sky Global",
      description:
        "Premium serviceklynger — {country}. Find din lokale Pearly Sky Global serviceportal og book førsteklasses eco-luksus pleje.",
    },
    blog: {
      title: "Eco-Luksus Rengøringsblog & Indsigter {country} | Pearly Sky",
      description:
        "Professionelle plejeråd, bæredygtige husholdningsguider og indsigter i førsteklasses ejendomsvedligeholdelse til premium rum — {country}.",
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
