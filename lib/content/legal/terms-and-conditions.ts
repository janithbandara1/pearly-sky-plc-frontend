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



};
