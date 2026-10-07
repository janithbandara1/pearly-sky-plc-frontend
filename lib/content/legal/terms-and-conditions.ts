import { EMAIL_LINK, LAST_UPDATED, OFFICE_ADDRESSES, SITE_LINK, p, ul, type LocalizedLegalDocument } from "./types";

export const TERMS_AND_CONDITIONS: LocalizedLegalDocument = {
  en: {
    title: "Terms and Conditions",
    lastUpdated: LAST_UPDATED.en,
    intro: [
      "Welcome to Pearly Sky Cleaning Services Pvt. Ltd. These Terms and Conditions govern your use of our website at ",
      SITE_LINK,
      " and the services we provide. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please refrain from using our website.",
    ],
    sections: [
      {
        heading: "1. Acceptance of Terms",
        blocks: [
          p("By using our website, you confirm that you are at least 18 years old or have the legal capacity to enter into a binding agreement. You also agree to comply with all applicable laws and regulations."),
        ],
      },
      {
        heading: "2. Services Offered",
        blocks: [
          p("Pearly Sky Cleaning Services Pvt. Ltd. provides cleaning and care services, including but not limited to:"),
          ul("Residential and commercial cleaning", "Elder care and child care services", "Specialized cleaning solutions"),
          p("Our services are currently available in:"),
          ul("France", "United Kingdom", "Sri Lanka"),
        ],
      },
      {
        heading: "3. User Responsibilities",
        blocks: [
          p("You agree to:"),
          ul(
            "Provide accurate and complete information when using our website or booking services",
            "Use our website and services only for lawful purposes",
            "Not engage in any activity that disrupts or interferes with the functionality of our website",
          ),
        ],
      },
      {
        heading: "4. Intellectual Property",
        blocks: [
          p("All content on our website, including text, graphics, logos, and images, is the property of Pearly Sky Cleaning Services Pvt. Ltd. and is protected by intellectual property laws. You may not reproduce, distribute, or use any content without our prior written consent."),
        ],
      },
      {
        heading: "5. Privacy",
        blocks: [
          p(
            "Your use of our website is also governed by our ",
            { text: "Privacy Policy", href: "/privacy-policy" },
            ", which explains how we collect, use, and protect your personal information.",
          ),
        ],
      },
      {
        heading: "6. Limitation of Liability",
        blocks: [
          p("To the fullest extent permitted by law, Pearly Sky Cleaning Services Pvt. Ltd. shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or services."),
        ],
      },
      {
        heading: "7. Governing Law",
        blocks: [
          p("These Terms and Conditions are governed by the laws of France, where our headquarters is located. Any disputes arising from these terms shall be resolved in the courts of France."),
        ],
      },
      {
        heading: "8. Changes to These Terms",
        blocks: [
          p("We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be posted on this page with an updated revision date. Your continued use of our website constitutes acceptance of the revised terms."),
        ],
      },
      {
        heading: "9. Contact Us",
        blocks: [
          p("If you have any questions about these Terms and Conditions, please contact us at ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.en,
        ],
      },
    ],
  },

  fr: {
    title: "Conditions générales",
    lastUpdated: LAST_UPDATED.fr,
    intro: [
      "Bienvenue chez Pearly Sky Cleaning Services Pvt. Ltd. Les présentes Conditions générales régissent votre utilisation de notre site web ",
      SITE_LINK,
      " et des services que nous fournissons. En accédant à notre site ou en l’utilisant, vous acceptez de respecter les présentes Conditions générales et d’être lié par celles-ci. Si vous ne les acceptez pas, veuillez ne pas utiliser notre site.",
    ],
    sections: [
      {
        heading: "1. Acceptation des conditions",
        blocks: [
          p("En utilisant notre site, vous confirmez avoir au moins 18 ans ou disposer de la capacité juridique de conclure un contrat contraignant. Vous acceptez également de respecter toutes les lois et réglementations applicables."),
        ],
      },
      {
        heading: "2. Services proposés",
        blocks: [
          p("Pearly Sky Cleaning Services Pvt. Ltd. fournit des services de nettoyage et d’aide à la personne, notamment, sans s’y limiter :"),
          ul("Nettoyage résidentiel et commercial", "Services d’aide aux personnes âgées et de garde d’enfants", "Solutions de nettoyage spécialisées"),
          p("Nos services sont actuellement disponibles dans les pays suivants :"),
          ul("France", "Royaume-Uni", "Sri Lanka"),
        ],
      },
      {
        heading: "3. Responsabilités de l’utilisateur",
        blocks: [
          p("Vous vous engagez à :"),
          ul(
            "Fournir des informations exactes et complètes lorsque vous utilisez notre site ou réservez nos services",
            "Utiliser notre site et nos services uniquement à des fins licites",
            "Ne vous livrer à aucune activité perturbant ou entravant le fonctionnement de notre site",
          ),
        ],
      },
      {
        heading: "4. Propriété intellectuelle",
        blocks: [
          p("L’ensemble du contenu de notre site, y compris les textes, graphismes, logos et images, est la propriété de Pearly Sky Cleaning Services Pvt. Ltd. et est protégé par les lois sur la propriété intellectuelle. Vous ne pouvez reproduire, distribuer ou utiliser aucun contenu sans notre accord écrit préalable."),
        ],
      },
      {
        heading: "5. Confidentialité",
        blocks: [
          p(
            "Votre utilisation de notre site est également régie par notre ",
            { text: "Politique de confidentialité", href: "/privacy-policy" },
            ", qui explique comment nous collectons, utilisons et protégeons vos données personnelles.",
          ),
        ],
      },
      {
        heading: "6. Limitation de responsabilité",
        blocks: [
          p("Dans toute la mesure permise par la loi, Pearly Sky Cleaning Services Pvt. Ltd. ne saurait être tenue responsable des dommages indirects, accessoires ou consécutifs résultant de votre utilisation de notre site ou de nos services."),
        ],
      },
      {
        heading: "7. Droit applicable",
        blocks: [
          p("Les présentes Conditions générales sont régies par le droit français, pays où se trouve notre siège social. Tout litige découlant des présentes conditions sera soumis aux tribunaux français."),
        ],
      },
      {
        heading: "8. Modifications des présentes conditions",
        blocks: [
          p("Nous nous réservons le droit de mettre à jour ou de modifier les présentes Conditions générales à tout moment. Toute modification sera publiée sur cette page avec une date de révision actualisée. La poursuite de votre utilisation de notre site vaut acceptation des conditions révisées."),
        ],
      },
      {
        heading: "9. Nous contacter",
        blocks: [
          p("Pour toute question concernant les présentes Conditions générales, contactez-nous à l’adresse ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.fr,
        ],
      },
    ],
  },

  de: {
    title: "Allgemeine Geschäftsbedingungen",
    lastUpdated: LAST_UPDATED.de,
    intro: [
      "Willkommen bei Pearly Sky Cleaning Services Pvt. Ltd. Diese Allgemeinen Geschäftsbedingungen regeln Ihre Nutzung unserer Website unter ",
      SITE_LINK,
      " sowie der von uns erbrachten Leistungen. Durch den Zugriff auf unsere Website oder deren Nutzung erklären Sie sich damit einverstanden, diese Allgemeinen Geschäftsbedingungen einzuhalten und an sie gebunden zu sein. Wenn Sie nicht einverstanden sind, nutzen Sie unsere Website bitte nicht.",
    ],
    sections: [
      {
        heading: "1. Annahme der Bedingungen",
        blocks: [
          p("Mit der Nutzung unserer Website bestätigen Sie, dass Sie mindestens 18 Jahre alt sind oder die Geschäftsfähigkeit besitzen, eine verbindliche Vereinbarung einzugehen. Außerdem verpflichten Sie sich, alle geltenden Gesetze und Vorschriften einzuhalten."),
        ],
      },
      {
        heading: "2. Angebotene Leistungen",
        blocks: [
          p("Pearly Sky Cleaning Services Pvt. Ltd. erbringt Reinigungs- und Betreuungsleistungen, insbesondere, aber nicht ausschließlich:"),
          ul("Reinigung von Wohn- und Gewerbeimmobilien", "Senioren- und Kinderbetreuung", "Spezialisierte Reinigungslösungen"),
          p("Unsere Leistungen sind derzeit verfügbar in:"),
          ul("Frankreich", "Vereinigtes Königreich", "Sri Lanka"),
        ],
      },
      {
        heading: "3. Pflichten der Nutzer",
        blocks: [
          p("Sie verpflichten sich:"),
          ul(
            "bei der Nutzung unserer Website oder der Buchung von Leistungen korrekte und vollständige Angaben zu machen",
            "unsere Website und Leistungen nur für rechtmäßige Zwecke zu nutzen",
            "keine Handlungen vorzunehmen, die die Funktionsfähigkeit unserer Website stören oder beeinträchtigen",
          ),
        ],
      },
      {
        heading: "4. Geistiges Eigentum",
        blocks: [
          p("Alle Inhalte unserer Website, einschließlich Texte, Grafiken, Logos und Bilder, sind Eigentum von Pearly Sky Cleaning Services Pvt. Ltd. und durch Gesetze zum Schutz des geistigen Eigentums geschützt. Ohne unsere vorherige schriftliche Zustimmung dürfen Sie keine Inhalte vervielfältigen, verbreiten oder verwenden."),
        ],
      },
      {
        heading: "5. Datenschutz",
        blocks: [
          p(
            "Ihre Nutzung unserer Website unterliegt außerdem unserer ",
            { text: "Datenschutzerklärung", href: "/privacy-policy" },
            ", die erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden und schützen.",
          ),
        ],
      },
      {
        heading: "6. Haftungsbeschränkung",
        blocks: [
          p("Soweit gesetzlich zulässig, haftet Pearly Sky Cleaning Services Pvt. Ltd. nicht für indirekte, beiläufige oder Folgeschäden, die aus Ihrer Nutzung unserer Website oder Leistungen entstehen."),
        ],
      },
      {
        heading: "7. Anwendbares Recht",
        blocks: [
          p("Diese Allgemeinen Geschäftsbedingungen unterliegen dem Recht Frankreichs, wo sich unser Hauptsitz befindet. Streitigkeiten aus diesen Bedingungen werden vor den Gerichten Frankreichs beigelegt."),
        ],
      },
      {
        heading: "8. Änderungen dieser Bedingungen",
        blocks: [
          p("Wir behalten uns das Recht vor, diese Allgemeinen Geschäftsbedingungen jederzeit zu aktualisieren oder zu ändern. Änderungen werden auf dieser Seite mit einem aktualisierten Revisionsdatum veröffentlicht. Mit der weiteren Nutzung unserer Website akzeptieren Sie die geänderten Bedingungen."),
        ],
      },
      {
        heading: "9. Kontakt",
        blocks: [
          p("Wenn Sie Fragen zu diesen Allgemeinen Geschäftsbedingungen haben, kontaktieren Sie uns bitte unter ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.de,
        ],
      },
    ],
  },

  es: {
    title: "Términos y condiciones",
    lastUpdated: LAST_UPDATED.es,
    intro: [
      "Bienvenido a Pearly Sky Cleaning Services Pvt. Ltd. Estos Términos y condiciones regulan el uso de nuestro sitio web ",
      SITE_LINK,
      " y de los servicios que prestamos. Al acceder a nuestro sitio web o utilizarlo, usted acepta cumplir y quedar vinculado por estos Términos y condiciones. Si no está de acuerdo, le rogamos que no utilice nuestro sitio web.",
    ],
    sections: [
      {
        heading: "1. Aceptación de los términos",
        blocks: [
          p("Al utilizar nuestro sitio web, usted confirma que tiene al menos 18 años o la capacidad legal para celebrar un acuerdo vinculante. También se compromete a cumplir todas las leyes y normativas aplicables."),
        ],
      },
      {
        heading: "2. Servicios ofrecidos",
        blocks: [
          p("Pearly Sky Cleaning Services Pvt. Ltd. presta servicios de limpieza y cuidado, entre otros:"),
          ul("Limpieza residencial y comercial", "Servicios de cuidado de mayores y cuidado infantil", "Soluciones de limpieza especializadas"),
          p("Nuestros servicios están disponibles actualmente en:"),
          ul("Francia", "Reino Unido", "Sri Lanka"),
        ],
      },
      {
        heading: "3. Responsabilidades del usuario",
        blocks: [
          p("Usted se compromete a:"),
          ul(
            "Proporcionar información veraz y completa al utilizar nuestro sitio web o reservar servicios",
            "Utilizar nuestro sitio web y nuestros servicios únicamente con fines lícitos",
            "No realizar ninguna actividad que perturbe o interfiera en el funcionamiento de nuestro sitio web",
          ),
        ],
      },
      {
        heading: "4. Propiedad intelectual",
        blocks: [
          p("Todo el contenido de nuestro sitio web, incluidos textos, gráficos, logotipos e imágenes, es propiedad de Pearly Sky Cleaning Services Pvt. Ltd. y está protegido por las leyes de propiedad intelectual. No puede reproducir, distribuir ni utilizar ningún contenido sin nuestro consentimiento previo por escrito."),
        ],
      },
      {
        heading: "5. Privacidad",
        blocks: [
          p(
            "El uso de nuestro sitio web se rige también por nuestra ",
            { text: "Política de privacidad", href: "/privacy-policy" },
            ", que explica cómo recopilamos, utilizamos y protegemos su información personal.",
          ),
        ],
      },
      {
        heading: "6. Limitación de responsabilidad",
        blocks: [
          p("En la máxima medida permitida por la ley, Pearly Sky Cleaning Services Pvt. Ltd. no será responsable de ningún daño indirecto, incidental o consecuente derivado del uso de nuestro sitio web o de nuestros servicios."),
        ],
      },
      {
        heading: "7. Legislación aplicable",
        blocks: [
          p("Estos Términos y condiciones se rigen por las leyes de Francia, donde se encuentra nuestra sede central. Cualquier controversia derivada de estos términos se resolverá ante los tribunales de Francia."),
        ],
      },
      {
        heading: "8. Cambios en estos términos",
        blocks: [
          p("Nos reservamos el derecho de actualizar o modificar estos Términos y condiciones en cualquier momento. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada. El uso continuado de nuestro sitio web implica la aceptación de los términos revisados."),
        ],
      },
      {
        heading: "9. Contacto",
        blocks: [
          p("Si tiene alguna pregunta sobre estos Términos y condiciones, contáctenos en ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.es,
        ],
      },
    ],
  },

  it: {
    title: "Termini e condizioni",
    lastUpdated: LAST_UPDATED.it,
    intro: [
      "Benvenuto in Pearly Sky Cleaning Services Pvt. Ltd. I presenti Termini e condizioni regolano l’utilizzo del nostro sito web ",
      SITE_LINK,
      " e dei servizi che forniamo. Accedendo al nostro sito o utilizzandolo, accetti di rispettare e di essere vincolato dai presenti Termini e condizioni. Se non li accetti, ti preghiamo di non utilizzare il nostro sito.",
    ],
    sections: [
      {
        heading: "1. Accettazione dei termini",
        blocks: [
          p("Utilizzando il nostro sito, confermi di avere almeno 18 anni o la capacità giuridica di stipulare un accordo vincolante. Accetti inoltre di rispettare tutte le leggi e le normative applicabili."),
        ],
      },
      {
        heading: "2. Servizi offerti",
        blocks: [
          p("Pearly Sky Cleaning Services Pvt. Ltd. fornisce servizi di pulizia e assistenza, tra cui, a titolo esemplificativo:"),
          ul("Pulizie residenziali e commerciali", "Servizi di assistenza agli anziani e all’infanzia", "Soluzioni di pulizia specializzate"),
          p("I nostri servizi sono attualmente disponibili in:"),
          ul("Francia", "Regno Unito", "Sri Lanka"),
        ],
      },
      {
        heading: "3. Responsabilità dell’utente",
        blocks: [
          p("Ti impegni a:"),
          ul(
            "Fornire informazioni accurate e complete quando utilizzi il nostro sito o prenoti i nostri servizi",
            "Utilizzare il nostro sito e i nostri servizi solo per scopi leciti",
            "Non svolgere alcuna attività che disturbi o interferisca con il funzionamento del nostro sito",
          ),
        ],
      },
      {
        heading: "4. Proprietà intellettuale",
        blocks: [
          p("Tutti i contenuti del nostro sito, inclusi testi, grafiche, loghi e immagini, sono di proprietà di Pearly Sky Cleaning Services Pvt. Ltd. e sono protetti dalle leggi sulla proprietà intellettuale. Non è consentito riprodurre, distribuire o utilizzare alcun contenuto senza il nostro previo consenso scritto."),
        ],
      },
      {
        heading: "5. Privacy",
        blocks: [
          p(
            "L’utilizzo del nostro sito è inoltre regolato dalla nostra ",
            { text: "Informativa sulla privacy", href: "/privacy-policy" },
            ", che spiega come raccogliamo, utilizziamo e proteggiamo i tuoi dati personali.",
          ),
        ],
      },
      {
        heading: "6. Limitazione di responsabilità",
        blocks: [
          p("Nella misura massima consentita dalla legge, Pearly Sky Cleaning Services Pvt. Ltd. non sarà responsabile di eventuali danni indiretti, incidentali o consequenziali derivanti dall’utilizzo del nostro sito o dei nostri servizi."),
        ],
      },
      {
        heading: "7. Legge applicabile",
        blocks: [
          p("I presenti Termini e condizioni sono regolati dalla legge francese, paese in cui ha sede la nostra sede centrale. Eventuali controversie derivanti dai presenti termini saranno risolte dai tribunali francesi."),
        ],
      },
      {
        heading: "8. Modifiche ai presenti termini",
        blocks: [
          p("Ci riserviamo il diritto di aggiornare o modificare i presenti Termini e condizioni in qualsiasi momento. Eventuali modifiche saranno pubblicate su questa pagina con una data di revisione aggiornata. L’uso continuato del nostro sito costituisce accettazione dei termini modificati."),
        ],
      },
      {
        heading: "9. Contattaci",
        blocks: [
          p("Per qualsiasi domanda sui presenti Termini e condizioni, contattaci all’indirizzo ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.it,
        ],
      },
    ],
  },
};
