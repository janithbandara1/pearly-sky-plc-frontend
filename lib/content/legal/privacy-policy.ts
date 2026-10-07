import { EMAIL_LINK, LAST_UPDATED, OFFICE_ADDRESSES, p, ul, type LocalizedLegalDocument } from "./types";

export const PRIVACY_POLICY: LocalizedLegalDocument = {
  en: {
    title: "Privacy Policy",
    lastUpdated: LAST_UPDATED.en,
    intro: [
      "Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”, “we”, “us”, or “our”) respects your privacy. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit our website, book a service, or otherwise interact with us.",
    ],
    sections: [
      {
        heading: "1. Information We Collect",
        blocks: [
          p("We collect information you provide directly to us, including:"),
          ul(
            "Contact details — name, email address, and phone number",
            "Service address — the address(es) where a booking or quotation is to take place",
            "Account credentials — email and password, if you create an account",
            "Booking details — service selected, date/time, property details, and any preferences or special requirements you provide",
            "Payment information — processed securely by our payment provider, Stripe; we do not store your full card details ourselves",
          ),
        ],
      },
      {
        heading: "2. How We Use Your Information",
        blocks: [
          p("We use the information we collect to:"),
          ul(
            "Create and manage your account",
            "Process bookings and quotation requests, and schedule and deliver services",
            "Process payments through Stripe",
            "Send booking confirmations, price updates, and other service-related emails",
            "Respond to your enquiries and provide customer support",
            "Maintain the security of our website and prevent fraud",
            "Comply with our legal obligations",
          ),
        ],
      },
      {
        heading: "3. Cookies",
        blocks: [
          p("Our website uses a small number of cookies to make the site work properly, including cookies that:"),
          ul(
            "Remember your selected country and language so we can show you the right pricing and content",
            "Keep you securely signed in to your account",
          ),
          p("We do not use these cookies for advertising. You can control or delete cookies through your browser settings, though disabling them may affect parts of the site’s functionality."),
        ],
      },
      {
        heading: "4. How We Share Your Information",
        blocks: [
          p("We do not sell your personal information. We share it only where necessary to provide our services:"),
          ul(
            "With our cleaning and care professionals, so they can carry out the service you’ve booked",
            "With Stripe, to process payments",
            "With our email delivery provider, to send booking and account-related emails",
            "Where required by law, regulation, or a valid legal process",
          ),
        ],
      },
      {
        heading: "5. Data Security",
        blocks: [
          p("We use reasonable technical and organizational measures to protect your personal information, including encrypting passwords and using secure connections. No method of transmission or storage is completely secure, and we cannot guarantee absolute security."),
        ],
      },
      {
        heading: "6. Data Retention",
        blocks: [
          p("We retain your personal information for as long as your account is active or as needed to provide you services, comply with our legal obligations, resolve disputes, and enforce our agreements."),
        ],
      },
      {
        heading: "7. Your Rights",
        blocks: [
          p("Depending on where you live, you may have rights under data protection laws such as the EU/UK General Data Protection Regulation (GDPR), including the right to:"),
          ul(
            "Access the personal information we hold about you",
            "Request correction of inaccurate information",
            "Request deletion of your information",
            "Object to or restrict certain processing",
            "Request a copy of your data in a portable format",
          ),
          p("To exercise any of these rights, contact us using the details in Section 9 below."),
        ],
      },
      {
        heading: "8. Children’s Privacy",
        blocks: [
          p("Our services are not directed to children, and we do not knowingly collect personal information from children under 18."),
        ],
      },
      {
        heading: "9. Contact Us",
        blocks: [
          p("If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.en,
        ],
      },
      {
        heading: "10. Changes to This Policy",
        blocks: [
          p(
            "We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. See also our ",
            { text: "Terms and Conditions", href: "/terms-and-conditions" },
            ".",
          ),
        ],
      },
    ],
  },

  fr: {
    title: "Politique de confidentialité",
    lastUpdated: LAST_UPDATED.fr,
    intro: [
      "Pearly Sky Cleaning Services Pvt. Ltd. (« Pearly Sky », « nous » ou « notre ») respecte votre vie privée. La présente Politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons vos données personnelles lorsque vous visitez notre site, réservez un service ou interagissez avec nous de toute autre manière.",
    ],
    sections: [
      {
        heading: "1. Informations que nous collectons",
        blocks: [
          p("Nous collectons les informations que vous nous fournissez directement, notamment :"),
          ul(
            "Coordonnées — nom, adresse e-mail et numéro de téléphone",
            "Adresse d’intervention — la ou les adresses où doit avoir lieu une réservation ou un devis",
            "Identifiants de compte — e-mail et mot de passe, si vous créez un compte",
            "Détails de réservation — service choisi, date/heure, caractéristiques du logement et toute préférence ou exigence particulière que vous indiquez",
            "Informations de paiement — traitées de manière sécurisée par notre prestataire de paiement, Stripe ; nous ne conservons pas nous-mêmes vos données de carte complètes",
          ),
        ],
      },
      {
        heading: "2. Comment nous utilisons vos informations",
        blocks: [
          p("Nous utilisons les informations collectées pour :"),
          ul(
            "Créer et gérer votre compte",
            "Traiter les réservations et demandes de devis, et planifier et réaliser les services",
            "Traiter les paiements via Stripe",
            "Envoyer des confirmations de réservation, des mises à jour de prix et d’autres e-mails liés aux services",
            "Répondre à vos demandes et assurer le service client",
            "Maintenir la sécurité de notre site et prévenir la fraude",
            "Respecter nos obligations légales",
          ),
        ],
      },
      {
        heading: "3. Cookies",
        blocks: [
          p("Notre site utilise un petit nombre de cookies pour fonctionner correctement, notamment des cookies qui :"),
          ul(
            "Mémorisent le pays et la langue choisis afin de vous afficher les tarifs et contenus adaptés",
            "Vous maintiennent connecté à votre compte en toute sécurité",
          ),
          p("Nous n’utilisons pas ces cookies à des fins publicitaires. Vous pouvez contrôler ou supprimer les cookies dans les paramètres de votre navigateur, mais leur désactivation peut affecter certaines fonctionnalités du site."),
        ],
      },
      {
        heading: "4. Comment nous partageons vos informations",
        blocks: [
          p("Nous ne vendons pas vos données personnelles. Nous ne les partageons que lorsque cela est nécessaire à la fourniture de nos services :"),
          ul(
            "Avec nos professionnels du nettoyage et de l’aide à la personne, afin qu’ils puissent réaliser le service réservé",
            "Avec Stripe, pour traiter les paiements",
            "Avec notre prestataire d’envoi d’e-mails, pour envoyer les e-mails liés aux réservations et à votre compte",
            "Lorsque la loi, la réglementation ou une procédure judiciaire valable l’exige",
          ),
        ],
      },
      {
        heading: "5. Sécurité des données",
        blocks: [
          p("Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données personnelles, notamment le chiffrement des mots de passe et l’utilisation de connexions sécurisées. Aucune méthode de transmission ou de stockage n’est totalement sûre, et nous ne pouvons garantir une sécurité absolue."),
        ],
      },
      {
        heading: "6. Conservation des données",
        blocks: [
          p("Nous conservons vos données personnelles aussi longtemps que votre compte est actif ou que cela est nécessaire pour vous fournir nos services, respecter nos obligations légales, résoudre les litiges et faire appliquer nos accords."),
        ],
      },
      {
        heading: "7. Vos droits",
        blocks: [
          p("Selon votre lieu de résidence, vous pouvez disposer de droits en vertu de lois sur la protection des données telles que le Règlement général sur la protection des données (RGPD) de l’UE et du Royaume-Uni, notamment le droit de :"),
          ul(
            "Accéder aux données personnelles que nous détenons à votre sujet",
            "Demander la rectification d’informations inexactes",
            "Demander la suppression de vos informations",
            "Vous opposer à certains traitements ou en demander la limitation",
            "Demander une copie de vos données dans un format portable",
          ),
          p("Pour exercer l’un de ces droits, contactez-nous en utilisant les coordonnées figurant à la section 9 ci-dessous."),
        ],
      },
      {
        heading: "8. Protection des mineurs",
        blocks: [
          p("Nos services ne s’adressent pas aux enfants, et nous ne collectons pas sciemment de données personnelles concernant des enfants de moins de 18 ans."),
        ],
      },
      {
        heading: "9. Nous contacter",
        blocks: [
          p("Pour toute question concernant la présente Politique de confidentialité ou la manière dont nous traitons vos données personnelles, contactez-nous à l’adresse ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.fr,
        ],
      },
      {
        heading: "10. Modifications de la présente politique",
        blocks: [
          p(
            "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre. Toute modification sera publiée sur cette page avec une date de révision actualisée. Consultez également nos ",
            { text: "Conditions générales", href: "/terms-and-conditions" },
            ".",
          ),
        ],
      },
    ],
  },

  de: {
    title: "Datenschutzerklärung",
    lastUpdated: LAST_UPDATED.de,
    intro: [
      "Pearly Sky Cleaning Services Pvt. Ltd. („Pearly Sky“, „wir“, „uns“ oder „unser“) respektiert Ihre Privatsphäre. Diese Datenschutzerklärung erläutert, wie wir Ihre personenbezogenen Daten erheben, verwenden, weitergeben und schützen, wenn Sie unsere Website besuchen, eine Leistung buchen oder auf andere Weise mit uns in Kontakt treten.",
    ],
    sections: [
      {
        heading: "1. Welche Daten wir erheben",
        blocks: [
          p("Wir erheben Daten, die Sie uns direkt mitteilen, darunter:"),
          ul(
            "Kontaktdaten — Name, E-Mail-Adresse und Telefonnummer",
            "Einsatzadresse — die Adresse(n), an der/denen eine Buchung oder ein Angebot ausgeführt werden soll",
            "Kontozugangsdaten — E-Mail und Passwort, wenn Sie ein Konto erstellen",
            "Buchungsdetails — gewählte Leistung, Datum/Uhrzeit, Angaben zur Immobilie sowie von Ihnen angegebene Präferenzen oder besondere Anforderungen",
            "Zahlungsinformationen — sicher verarbeitet durch unseren Zahlungsdienstleister Stripe; Ihre vollständigen Kartendaten speichern wir nicht selbst",
          ),
        ],
      },
      {
        heading: "2. Wie wir Ihre Daten verwenden",
        blocks: [
          p("Wir verwenden die erhobenen Daten, um:"),
          ul(
            "Ihr Konto zu erstellen und zu verwalten",
            "Buchungen und Angebotsanfragen zu bearbeiten sowie Leistungen zu planen und zu erbringen",
            "Zahlungen über Stripe abzuwickeln",
            "Buchungsbestätigungen, Preisaktualisierungen und andere leistungsbezogene E-Mails zu versenden",
            "Ihre Anfragen zu beantworten und Kundensupport zu leisten",
            "die Sicherheit unserer Website zu gewährleisten und Betrug zu verhindern",
            "unseren gesetzlichen Pflichten nachzukommen",
          ),
        ],
      },
      {
        heading: "3. Cookies",
        blocks: [
          p("Unsere Website verwendet eine kleine Anzahl von Cookies, damit sie ordnungsgemäß funktioniert, darunter Cookies, die:"),
          ul(
            "Ihr gewähltes Land und Ihre Sprache speichern, damit wir Ihnen die passenden Preise und Inhalte anzeigen können",
            "Sie sicher in Ihrem Konto angemeldet halten",
          ),
          p("Wir verwenden diese Cookies nicht für Werbung. Sie können Cookies in Ihren Browsereinstellungen steuern oder löschen; deren Deaktivierung kann jedoch Teile der Website-Funktionalität beeinträchtigen."),
        ],
      },
      {
        heading: "4. Wie wir Ihre Daten weitergeben",
        blocks: [
          p("Wir verkaufen Ihre personenbezogenen Daten nicht. Wir geben sie nur weiter, soweit dies zur Erbringung unserer Leistungen erforderlich ist:"),
          ul(
            "an unsere Reinigungs- und Betreuungsfachkräfte, damit sie die gebuchte Leistung ausführen können",
            "an Stripe zur Zahlungsabwicklung",
            "an unseren E-Mail-Versanddienstleister, um buchungs- und kontobezogene E-Mails zu versenden",
            "wenn dies gesetzlich, behördlich oder durch ein gültiges rechtliches Verfahren vorgeschrieben ist",
          ),
        ],
      },
      {
        heading: "5. Datensicherheit",
        blocks: [
          p("Wir setzen angemessene technische und organisatorische Maßnahmen ein, um Ihre personenbezogenen Daten zu schützen, darunter die Verschlüsselung von Passwörtern und die Nutzung sicherer Verbindungen. Keine Übertragungs- oder Speichermethode ist vollkommen sicher, und wir können keine absolute Sicherheit garantieren."),
        ],
      },
      {
        heading: "6. Speicherdauer",
        blocks: [
          p("Wir speichern Ihre personenbezogenen Daten, solange Ihr Konto aktiv ist oder dies erforderlich ist, um Ihnen Leistungen zu erbringen, unseren gesetzlichen Pflichten nachzukommen, Streitigkeiten beizulegen und unsere Vereinbarungen durchzusetzen."),
        ],
      },
      {
        heading: "7. Ihre Rechte",
        blocks: [
          p("Je nach Wohnort haben Sie möglicherweise Rechte nach Datenschutzgesetzen wie der Datenschutz-Grundverordnung (DSGVO) der EU bzw. des Vereinigten Königreichs, darunter das Recht:"),
          ul(
            "auf Auskunft über die personenbezogenen Daten, die wir über Sie speichern",
            "auf Berichtigung unrichtiger Daten",
            "auf Löschung Ihrer Daten",
            "bestimmten Verarbeitungen zu widersprechen oder deren Einschränkung zu verlangen",
            "eine Kopie Ihrer Daten in einem übertragbaren Format zu erhalten",
          ),
          p("Um eines dieser Rechte auszuüben, kontaktieren Sie uns über die in Abschnitt 9 unten angegebenen Kontaktdaten."),
        ],
      },
      {
        heading: "8. Datenschutz von Kindern",
        blocks: [
          p("Unsere Leistungen richten sich nicht an Kinder, und wir erheben wissentlich keine personenbezogenen Daten von Kindern unter 18 Jahren."),
        ],
      },
      {
        heading: "9. Kontakt",
        blocks: [
          p("Wenn Sie Fragen zu dieser Datenschutzerklärung oder zum Umgang mit Ihren personenbezogenen Daten haben, kontaktieren Sie uns bitte unter ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.de,
        ],
      },
      {
        heading: "10. Änderungen dieser Erklärung",
        blocks: [
          p(
            "Wir können diese Datenschutzerklärung von Zeit zu Zeit aktualisieren. Änderungen werden auf dieser Seite mit einem aktualisierten Revisionsdatum veröffentlicht. Siehe auch unsere ",
            { text: "Allgemeinen Geschäftsbedingungen", href: "/terms-and-conditions" },
            ".",
          ),
        ],
      },
    ],
  },

  es: {
    title: "Política de privacidad",
    lastUpdated: LAST_UPDATED.es,
    intro: [
      "Pearly Sky Cleaning Services Pvt. Ltd. («Pearly Sky», «nosotros» o «nuestro») respeta su privacidad. Esta Política de privacidad explica cómo recopilamos, utilizamos, compartimos y protegemos su información personal cuando visita nuestro sitio web, reserva un servicio o interactúa con nosotros de cualquier otra forma.",
    ],
    sections: [
      {
        heading: "1. Información que recopilamos",
        blocks: [
          p("Recopilamos la información que usted nos proporciona directamente, incluida:"),
          ul(
            "Datos de contacto — nombre, dirección de correo electrónico y número de teléfono",
            "Dirección del servicio — la(s) dirección(es) donde se realizará una reserva o presupuesto",
            "Credenciales de la cuenta — correo electrónico y contraseña, si crea una cuenta",
            "Detalles de la reserva — servicio seleccionado, fecha/hora, características del inmueble y cualquier preferencia o requisito especial que indique",
            "Información de pago — procesada de forma segura por nuestro proveedor de pagos, Stripe; nosotros no almacenamos los datos completos de su tarjeta",
          ),
        ],
      },
      {
        heading: "2. Cómo utilizamos su información",
        blocks: [
          p("Utilizamos la información que recopilamos para:"),
          ul(
            "Crear y gestionar su cuenta",
            "Tramitar reservas y solicitudes de presupuesto, y programar y prestar los servicios",
            "Procesar pagos a través de Stripe",
            "Enviar confirmaciones de reserva, actualizaciones de precios y otros correos relacionados con el servicio",
            "Responder a sus consultas y prestar atención al cliente",
            "Mantener la seguridad de nuestro sitio web y prevenir el fraude",
            "Cumplir nuestras obligaciones legales",
          ),
        ],
      },
      {
        heading: "3. Cookies",
        blocks: [
          p("Nuestro sitio web utiliza un pequeño número de cookies para funcionar correctamente, incluidas cookies que:"),
          ul(
            "Recuerdan el país y el idioma seleccionados para mostrarle los precios y contenidos adecuados",
            "Mantienen su sesión iniciada de forma segura en su cuenta",
          ),
          p("No utilizamos estas cookies con fines publicitarios. Puede controlar o eliminar las cookies desde la configuración de su navegador, aunque desactivarlas puede afectar a algunas funciones del sitio."),
        ],
      },
      {
        heading: "4. Cómo compartimos su información",
        blocks: [
          p("No vendemos su información personal. Solo la compartimos cuando es necesario para prestar nuestros servicios:"),
          ul(
            "Con nuestros profesionales de limpieza y cuidado, para que puedan realizar el servicio que ha reservado",
            "Con Stripe, para procesar los pagos",
            "Con nuestro proveedor de envío de correos, para enviar correos relacionados con reservas y con su cuenta",
            "Cuando lo exija la ley, la normativa o un procedimiento legal válido",
          ),
        ],
      },
      {
        heading: "5. Seguridad de los datos",
        blocks: [
          p("Aplicamos medidas técnicas y organizativas razonables para proteger su información personal, como el cifrado de contraseñas y el uso de conexiones seguras. Ningún método de transmisión o almacenamiento es completamente seguro y no podemos garantizar una seguridad absoluta."),
        ],
      },
      {
        heading: "6. Conservación de los datos",
        blocks: [
          p("Conservamos su información personal mientras su cuenta esté activa o durante el tiempo necesario para prestarle servicios, cumplir nuestras obligaciones legales, resolver controversias y hacer cumplir nuestros acuerdos."),
        ],
      },
      {
        heading: "7. Sus derechos",
        blocks: [
          p("Según su lugar de residencia, puede tener derechos en virtud de leyes de protección de datos como el Reglamento General de Protección de Datos (RGPD) de la UE y del Reino Unido, entre ellos el derecho a:"),
          ul(
            "Acceder a la información personal que tenemos sobre usted",
            "Solicitar la rectificación de información inexacta",
            "Solicitar la supresión de su información",
            "Oponerse a determinados tratamientos o solicitar su limitación",
            "Solicitar una copia de sus datos en un formato portátil",
          ),
          p("Para ejercer cualquiera de estos derechos, contáctenos a través de los datos indicados en la sección 9."),
        ],
      },
      {
        heading: "8. Privacidad de los menores",
        blocks: [
          p("Nuestros servicios no están dirigidos a menores y no recopilamos conscientemente información personal de menores de 18 años."),
        ],
      },
      {
        heading: "9. Contacto",
        blocks: [
          p("Si tiene alguna pregunta sobre esta Política de privacidad o sobre cómo tratamos su información personal, contáctenos en ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.es,
        ],
      },
      {
        heading: "10. Cambios en esta política",
        blocks: [
          p(
            "Podemos actualizar esta Política de privacidad periódicamente. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada. Consulte también nuestros ",
            { text: "Términos y condiciones", href: "/terms-and-conditions" },
            ".",
          ),
        ],
      },
    ],
  },

  it: {
    title: "Informativa sulla privacy",
    lastUpdated: LAST_UPDATED.it,
    intro: [
      "Pearly Sky Cleaning Services Pvt. Ltd. (“Pearly Sky”, “noi” o “nostro”) rispetta la tua privacy. La presente Informativa sulla privacy spiega come raccogliamo, utilizziamo, condividiamo e proteggiamo i tuoi dati personali quando visiti il nostro sito, prenoti un servizio o interagisci con noi in altro modo.",
    ],
    sections: [
      {
        heading: "1. Dati che raccogliamo",
        blocks: [
          p("Raccogliamo i dati che ci fornisci direttamente, tra cui:"),
          ul(
            "Dati di contatto — nome, indirizzo e-mail e numero di telefono",
            "Indirizzo del servizio — l’indirizzo o gli indirizzi in cui deve svolgersi una prenotazione o un preventivo",
            "Credenziali dell’account — e-mail e password, se crei un account",
            "Dettagli della prenotazione — servizio scelto, data/ora, caratteristiche dell’immobile ed eventuali preferenze o esigenze particolari che indichi",
            "Dati di pagamento — elaborati in modo sicuro dal nostro fornitore di pagamenti, Stripe; non conserviamo direttamente i dati completi della tua carta",
          ),
        ],
      },
      {
        heading: "2. Come utilizziamo i tuoi dati",
        blocks: [
          p("Utilizziamo i dati raccolti per:"),
          ul(
            "Creare e gestire il tuo account",
            "Gestire prenotazioni e richieste di preventivo, e pianificare ed erogare i servizi",
            "Elaborare i pagamenti tramite Stripe",
            "Inviare conferme di prenotazione, aggiornamenti dei prezzi e altre e-mail relative ai servizi",
            "Rispondere alle tue richieste e fornire assistenza clienti",
            "Mantenere la sicurezza del nostro sito e prevenire le frodi",
            "Adempiere ai nostri obblighi di legge",
          ),
        ],
      },
      {
        heading: "3. Cookie",
        blocks: [
          p("Il nostro sito utilizza un numero ridotto di cookie per funzionare correttamente, tra cui cookie che:"),
          ul(
            "Ricordano il paese e la lingua selezionati per mostrarti prezzi e contenuti corretti",
            "Ti mantengono connesso al tuo account in modo sicuro",
          ),
          p("Non utilizziamo questi cookie per scopi pubblicitari. Puoi controllare o eliminare i cookie dalle impostazioni del browser, ma disattivarli può compromettere alcune funzionalità del sito."),
        ],
      },
      {
        heading: "4. Come condividiamo i tuoi dati",
        blocks: [
          p("Non vendiamo i tuoi dati personali. Li condividiamo solo quando necessario per fornire i nostri servizi:"),
          ul(
            "Con i nostri professionisti delle pulizie e dell’assistenza, affinché possano svolgere il servizio prenotato",
            "Con Stripe, per elaborare i pagamenti",
            "Con il nostro fornitore di invio e-mail, per inviare e-mail relative alle prenotazioni e all’account",
            "Quando richiesto dalla legge, da un regolamento o da un procedimento legale valido",
          ),
        ],
      },
      {
        heading: "5. Sicurezza dei dati",
        blocks: [
          p("Adottiamo misure tecniche e organizzative ragionevoli per proteggere i tuoi dati personali, tra cui la crittografia delle password e l’uso di connessioni sicure. Nessun metodo di trasmissione o archiviazione è completamente sicuro e non possiamo garantire una sicurezza assoluta."),
        ],
      },
      {
        heading: "6. Conservazione dei dati",
        blocks: [
          p("Conserviamo i tuoi dati personali finché il tuo account è attivo o per il tempo necessario a fornirti i servizi, adempiere ai nostri obblighi di legge, risolvere controversie e far valere i nostri accordi."),
        ],
      },
      {
        heading: "7. I tuoi diritti",
        blocks: [
          p("A seconda di dove risiedi, potresti godere di diritti ai sensi di leggi sulla protezione dei dati come il Regolamento generale sulla protezione dei dati (GDPR) dell’UE e del Regno Unito, tra cui il diritto di:"),
          ul(
            "Accedere ai dati personali che conserviamo su di te",
            "Chiedere la rettifica di dati inesatti",
            "Chiedere la cancellazione dei tuoi dati",
            "Opporti a determinati trattamenti o chiederne la limitazione",
            "Richiedere una copia dei tuoi dati in un formato portabile",
          ),
          p("Per esercitare uno di questi diritti, contattaci utilizzando i recapiti indicati nella sezione 9."),
        ],
      },
      {
        heading: "8. Privacy dei minori",
        blocks: [
          p("I nostri servizi non sono rivolti ai minori e non raccogliamo consapevolmente dati personali di minori di 18 anni."),
        ],
      },
      {
        heading: "9. Contattaci",
        blocks: [
          p("Per qualsiasi domanda sulla presente Informativa sulla privacy o su come trattiamo i tuoi dati personali, contattaci all’indirizzo ", EMAIL_LINK, "."),
          OFFICE_ADDRESSES.it,
        ],
      },
      {
        heading: "10. Modifiche alla presente informativa",
        blocks: [
          p(
            "Potremmo aggiornare periodicamente la presente Informativa sulla privacy. Eventuali modifiche saranno pubblicate su questa pagina con una data di revisione aggiornata. Consulta anche i nostri ",
            { text: "Termini e condizioni", href: "/terms-and-conditions" },
            ".",
          ),
        ],
      },
    ],
  },
};
