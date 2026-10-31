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



};
