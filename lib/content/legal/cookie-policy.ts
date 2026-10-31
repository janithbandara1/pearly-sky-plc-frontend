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



};
