import { EMAIL_LINK, LAST_UPDATED, OFFICE_ADDRESSES, SITE_LINK, ol, p, type LocalizedLegalDocument } from "./types";

const ALL_ABOUT_COOKIES = "https://www.allaboutcookies.org/";

export const COOKIE_POLICY: LocalizedLegalDocument = {
  en: {
    title: "Cookie Policy",
    lastUpdated: LAST_UPDATED.en,
    intro: [
      "This Cookie Policy explains how Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”, “we”, “us”, or “our”) uses cookies and similar technologies on ",
      SITE_LINK,
      ". By continuing to use our website, you consent to our use of cookies as described in this policy.",
    ],
    sections: [
      {
        heading: "1. What Are Cookies",
        blocks: [
          p("Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, work more efficiently, and provide information to the site owner."),
        ],
      },
      {
        heading: "2. How We Use Cookies",
        blocks: [
          p("We use the following categories of cookies:"),
          ol(
            "Essential cookies — required for the website and booking flow to function",
            "Performance cookies — help us understand how visitors use the site so we can improve it",
            "Functional cookies — remember your preferences, such as country and language",
            "Advertising cookies — used to measure the effectiveness of our marketing campaigns",
          ),
        ],
      },
      {
        heading: "3. Third-Party Cookies",
        blocks: [
          p("Some cookies are placed by third-party services that appear on our pages, such as our live chat provider and analytics tools. We do not control these cookies — please refer to the relevant third party’s own privacy policy for more information."),
        ],
      },
      {
        heading: "4. Managing Cookies",
        blocks: [
          p(
            "You can accept or reject non-essential cookies at any time using the cookie banner on our site, or manage cookies directly through your browser settings. For general information about cookies, see ",
            { text: "All About Cookies", href: ALL_ABOUT_COOKIES },
            ".",
          ),
        ],
      },
      {
        heading: "5. Your Privacy Rights",
        blocks: [
          p(
            "Depending on where you live, you may have rights under data protection laws such as the EU/UK General Data Protection Regulation (GDPR) or the California Consumer Privacy Act (CCPA), as well as other applicable regional regulations. See our ",
            { text: "Privacy Policy", href: "/privacy-policy" },
            " for details on how to exercise these rights.",
          ),
        ],
      },
      {
        heading: "6. Changes to This Policy",
        blocks: [
          p("We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date."),
        ],
      },
      {
        heading: "7. Contact Us",
        blocks: [
          p("If you have any questions about this Cookie Policy, please contact us at ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.en,
        ],
      },
    ],
  },

  fr: {
    title: "Politique relative aux cookies",
    lastUpdated: LAST_UPDATED.fr,
    intro: [
      "La présente Politique relative aux cookies explique comment Pearly Sky Cleaning Services Pvt. Ltd. (« Pearly Sky », « nous » ou « notre ») utilise les cookies et technologies similaires sur ",
      SITE_LINK,
      ". En continuant à utiliser notre site, vous acceptez notre utilisation des cookies telle que décrite dans la présente politique.",
    ],
    sections: [
      {
        heading: "1. Qu’est-ce qu’un cookie ?",
        blocks: [
          p("Les cookies sont de petits fichiers texte déposés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites, les rendre plus efficaces et fournir des informations à leur propriétaire."),
        ],
      },
      {
        heading: "2. Comment nous utilisons les cookies",
        blocks: [
          p("Nous utilisons les catégories de cookies suivantes :"),
          ol(
            "Cookies essentiels — nécessaires au fonctionnement du site et du processus de réservation",
            "Cookies de performance — nous aident à comprendre comment les visiteurs utilisent le site afin de l’améliorer",
            "Cookies fonctionnels — mémorisent vos préférences, telles que le pays et la langue",
            "Cookies publicitaires — servent à mesurer l’efficacité de nos campagnes marketing",
          ),
        ],
      },
      {
        heading: "3. Cookies tiers",
        blocks: [
          p("Certains cookies sont déposés par des services tiers présents sur nos pages, comme notre prestataire de chat en direct et nos outils d’analyse. Nous ne contrôlons pas ces cookies — veuillez consulter la politique de confidentialité du tiers concerné pour plus d’informations."),
        ],
      },
      {
        heading: "4. Gestion des cookies",
        blocks: [
          p(
            "Vous pouvez à tout moment accepter ou refuser les cookies non essentiels à l’aide du bandeau cookies de notre site, ou gérer les cookies directement dans les paramètres de votre navigateur. Pour des informations générales sur les cookies, consultez ",
            { text: "All About Cookies", href: ALL_ABOUT_COOKIES },
            ".",
          ),
        ],
      },
      {
        heading: "5. Vos droits en matière de vie privée",
        blocks: [
          p(
            "Selon votre lieu de résidence, vous pouvez disposer de droits en vertu de lois sur la protection des données telles que le Règlement général sur la protection des données (RGPD) de l’UE et du Royaume-Uni ou le California Consumer Privacy Act (CCPA), ainsi que d’autres réglementations régionales applicables. Consultez notre ",
            { text: "Politique de confidentialité", href: "/privacy-policy" },
            " pour savoir comment exercer ces droits.",
          ),
        ],
      },
      {
        heading: "6. Modifications de la présente politique",
        blocks: [
          p("Nous pouvons mettre à jour la présente Politique relative aux cookies de temps à autre. Toute modification sera publiée sur cette page avec une date de révision actualisée."),
        ],
      },
      {
        heading: "7. Nous contacter",
        blocks: [
          p("Pour toute question concernant la présente Politique relative aux cookies, contactez-nous à l’adresse ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.fr,
        ],
      },
    ],
  },

  de: {
    title: "Cookie-Richtlinie",
    lastUpdated: LAST_UPDATED.de,
    intro: [
      "Diese Cookie-Richtlinie erläutert, wie Pearly Sky Cleaning Services Pvt. Ltd. („Pearly Sky“, „wir“, „uns“ oder „unser“) Cookies und ähnliche Technologien auf ",
      SITE_LINK,
      " verwendet. Wenn Sie unsere Website weiterhin nutzen, stimmen Sie der Verwendung von Cookies wie in dieser Richtlinie beschrieben zu.",
    ],
    sections: [
      {
        heading: "1. Was sind Cookies?",
        blocks: [
          p("Cookies sind kleine Textdateien, die beim Besuch einer Website auf Ihrem Gerät gespeichert werden. Sie werden häufig eingesetzt, damit Websites funktionieren, effizienter arbeiten und dem Betreiber Informationen liefern."),
        ],
      },
      {
        heading: "2. Wie wir Cookies verwenden",
        blocks: [
          p("Wir verwenden die folgenden Kategorien von Cookies:"),
          ol(
            "Notwendige Cookies — erforderlich, damit die Website und der Buchungsablauf funktionieren",
            "Leistungs-Cookies — helfen uns zu verstehen, wie Besucher die Website nutzen, damit wir sie verbessern können",
            "Funktionale Cookies — speichern Ihre Einstellungen, etwa Land und Sprache",
            "Werbe-Cookies — dienen dazu, die Wirksamkeit unserer Marketingkampagnen zu messen",
          ),
        ],
      },
      {
        heading: "3. Cookies von Drittanbietern",
        blocks: [
          p("Einige Cookies werden von Drittanbieterdiensten gesetzt, die auf unseren Seiten eingebunden sind, etwa unserem Live-Chat-Anbieter und Analysetools. Wir haben keinen Einfluss auf diese Cookies — weitere Informationen finden Sie in der Datenschutzerklärung des jeweiligen Drittanbieters."),
        ],
      },
      {
        heading: "4. Cookies verwalten",
        blocks: [
          p(
            "Sie können nicht notwendige Cookies jederzeit über das Cookie-Banner auf unserer Website akzeptieren oder ablehnen oder Cookies direkt in Ihren Browsereinstellungen verwalten. Allgemeine Informationen zu Cookies finden Sie unter ",
            { text: "All About Cookies", href: ALL_ABOUT_COOKIES },
            ".",
          ),
        ],
      },
      {
        heading: "5. Ihre Datenschutzrechte",
        blocks: [
          p(
            "Je nach Wohnort haben Sie möglicherweise Rechte nach Datenschutzgesetzen wie der Datenschutz-Grundverordnung (DSGVO) der EU bzw. des Vereinigten Königreichs oder dem California Consumer Privacy Act (CCPA) sowie nach weiteren geltenden regionalen Vorschriften. Wie Sie diese Rechte ausüben, erfahren Sie in unserer ",
            { text: "Datenschutzerklärung", href: "/privacy-policy" },
            ".",
          ),
        ],
      },
      {
        heading: "6. Änderungen dieser Richtlinie",
        blocks: [
          p("Wir können diese Cookie-Richtlinie von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Revisionsdatum veröffentlicht."),
        ],
      },
      {
        heading: "7. Kontakt",
        blocks: [
          p("Wenn Sie Fragen zu dieser Cookie-Richtlinie haben, kontaktieren Sie uns bitte unter ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.de,
        ],
      },
    ],
  },

  es: {
    title: "Política de cookies",
    lastUpdated: LAST_UPDATED.es,
    intro: [
      "Esta Política de cookies explica cómo Pearly Sky Cleaning Services Pvt. Ltd. («Pearly Sky», «nosotros» o «nuestro») utiliza cookies y tecnologías similares en ",
      SITE_LINK,
      ". Al seguir utilizando nuestro sitio web, usted acepta el uso de cookies tal y como se describe en esta política.",
    ],
    sections: [
      {
        heading: "1. ¿Qué son las cookies?",
        blocks: [
          p("Las cookies son pequeños archivos de texto que se guardan en su dispositivo cuando visita un sitio web. Se utilizan ampliamente para que los sitios web funcionen, lo hagan de forma más eficiente y proporcionen información a su propietario."),
        ],
      },
      {
        heading: "2. Cómo utilizamos las cookies",
        blocks: [
          p("Utilizamos las siguientes categorías de cookies:"),
          ol(
            "Cookies esenciales — necesarias para que el sitio web y el proceso de reserva funcionen",
            "Cookies de rendimiento — nos ayudan a entender cómo usan los visitantes el sitio para poder mejorarlo",
            "Cookies funcionales — recuerdan sus preferencias, como el país y el idioma",
            "Cookies publicitarias — se utilizan para medir la eficacia de nuestras campañas de marketing",
          ),
        ],
      },
      {
        heading: "3. Cookies de terceros",
        blocks: [
          p("Algunas cookies las instalan servicios de terceros presentes en nuestras páginas, como nuestro proveedor de chat en directo y nuestras herramientas de análisis. No controlamos estas cookies; consulte la política de privacidad del tercero correspondiente para obtener más información."),
        ],
      },
      {
        heading: "4. Gestión de cookies",
        blocks: [
          p(
            "Puede aceptar o rechazar las cookies no esenciales en cualquier momento mediante el banner de cookies de nuestro sitio, o gestionarlas directamente desde la configuración de su navegador. Para obtener información general sobre las cookies, consulte ",
            { text: "All About Cookies", href: ALL_ABOUT_COOKIES },
            ".",
          ),
        ],
      },
      {
        heading: "5. Sus derechos de privacidad",
        blocks: [
          p(
            "Según su lugar de residencia, puede tener derechos en virtud de leyes de protección de datos como el Reglamento General de Protección de Datos (RGPD) de la UE y del Reino Unido o la California Consumer Privacy Act (CCPA), así como de otras normativas regionales aplicables. Consulte nuestra ",
            { text: "Política de privacidad", href: "/privacy-policy" },
            " para saber cómo ejercer estos derechos.",
          ),
        ],
      },
      {
        heading: "6. Cambios en esta política",
        blocks: [
          p("Podemos actualizar esta Política de cookies periódicamente. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada."),
        ],
      },
      {
        heading: "7. Contacto",
        blocks: [
          p("Si tiene alguna pregunta sobre esta Política de cookies, contáctenos en ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.es,
        ],
      },
    ],
  },

  it: {
    title: "Informativa sui cookie",
    lastUpdated: LAST_UPDATED.it,
    intro: [
      "La presente Informativa sui cookie spiega come Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”, “noi” o “nostro”) utilizza i cookie e tecnologie simili su ",
      SITE_LINK,
      ". Continuando a utilizzare il nostro sito, acconsenti all’uso dei cookie come descritto nella presente informativa.",
    ],
    sections: [
      {
        heading: "1. Cosa sono i cookie",
        blocks: [
          p("I cookie sono piccoli file di testo salvati sul tuo dispositivo quando visiti un sito web. Sono ampiamente utilizzati per far funzionare i siti, renderli più efficienti e fornire informazioni al proprietario del sito."),
        ],
      },
      {
        heading: "2. Come utilizziamo i cookie",
        blocks: [
          p("Utilizziamo le seguenti categorie di cookie:"),
          ol(
            "Cookie essenziali — necessari per il funzionamento del sito e della procedura di prenotazione",
            "Cookie di prestazione — ci aiutano a capire come i visitatori utilizzano il sito per poterlo migliorare",
            "Cookie funzionali — ricordano le tue preferenze, come paese e lingua",
            "Cookie pubblicitari — servono a misurare l’efficacia delle nostre campagne di marketing",
          ),
        ],
      },
      {
        heading: "3. Cookie di terze parti",
        blocks: [
          p("Alcuni cookie sono installati da servizi di terze parti presenti nelle nostre pagine, come il nostro fornitore di chat dal vivo e gli strumenti di analisi. Non controlliamo questi cookie: per maggiori informazioni consulta l’informativa sulla privacy della terza parte interessata."),
        ],
      },
      {
        heading: "4. Gestione dei cookie",
        blocks: [
          p(
            "Puoi accettare o rifiutare i cookie non essenziali in qualsiasi momento tramite il banner dei cookie del nostro sito, oppure gestirli direttamente dalle impostazioni del browser. Per informazioni generali sui cookie, consulta ",
            { text: "All About Cookies", href: ALL_ABOUT_COOKIES },
            ".",
          ),
        ],
      },
      {
        heading: "5. I tuoi diritti sulla privacy",
        blocks: [
          p(
            "A seconda di dove risiedi, potresti godere di diritti ai sensi di leggi sulla protezione dei dati come il Regolamento generale sulla protezione dei dati (GDPR) dell’UE e del Regno Unito o il California Consumer Privacy Act (CCPA), oltre ad altre normative regionali applicabili. Consulta la nostra ",
            { text: "Informativa sulla privacy", href: "/privacy-policy" },
            " per sapere come esercitare questi diritti.",
          ),
        ],
      },
      {
        heading: "6. Modifiche alla presente informativa",
        blocks: [
          p("Potremmo aggiornare periodicamente la presente Informativa sui cookie. Eventuali modifiche saranno pubblicate su questa pagina con una data di revisione aggiornata."),
        ],
      },
      {
        heading: "7. Contattaci",
        blocks: [
          p("Per qualsiasi domanda sulla presente Informativa sui cookie, contattaci all’indirizzo ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.it,
        ],
      },
    ],
  },
};
