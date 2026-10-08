# United Kingdom site — URLs & metadata

**Domain:** https://pearlyskyglobalclean.co.uk  
**Deployment setting:** `NEXT_PUBLIC_COUNTRY=gb`, `NEXT_PUBLIC_SITE_URL=https://pearlyskyglobalclean.co.uk`  
**Languages:** English (`/en`), French (`/fr`), German (`/de`), Spanish (`/es`), Italian (`/it`)  
**Generated:** 2026-10-07, from the source code in this repository (frontend + backend seed data) — not from the live site.

> This reflects the code as it is now, including changes not yet deployed. Service pages assume the database holds what
> `backend/src/database/seed-gb.ts` seeds (all services active, no extra per-country SEO overrides added from the staff dashboard).
> Anything edited in the database after seeding would change the service titles, descriptions or slugs listed here.

## Summary

| | Count |
|---|---|
| Public page URLs | 255 |
| …listed in `sitemap.xml` | 240 |
| …not in `sitemap.xml` | 15 |
| Redirecting URLs (308) — **not** in `sitemap.xml` | 25 |
| Private / utility routes (blocked in robots.txt) | 13 patterns |

### Sitemap changes not yet deployed

The live `sitemap.xml` (checked 2026-10-07) has 245 URLs. The current code produces 240:

- **Removed 25:** the `/request-quotation` URLs listed under [Redirects](#redirects). They 308-redirect, so the sitemap no longer lists them (`hasQuotationPage()` in `lib/service-flows.ts`).
- **Added 20:** pages that return 200 but were missing from the sitemap:
  - https://pearlyskyglobalclean.co.uk/en/cookie-policy
  - https://pearlyskyglobalclean.co.uk/fr/cookie-policy
  - https://pearlyskyglobalclean.co.uk/de/cookie-policy
  - https://pearlyskyglobalclean.co.uk/es/cookie-policy
  - https://pearlyskyglobalclean.co.uk/it/cookie-policy
  - https://pearlyskyglobalclean.co.uk/en/services/carpet-upholstery-cleaning
  - https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-tapis-canapes
  - https://pearlyskyglobalclean.co.uk/de/services/teppich-polsterreinigung
  - https://pearlyskyglobalclean.co.uk/es/services/limpieza-alfombras-tapiceria
  - https://pearlyskyglobalclean.co.uk/it/services/pulizia-tappeti-divani
  - https://pearlyskyglobalclean.co.uk/en/services/pool-cleaning
  - https://pearlyskyglobalclean.co.uk/fr/services/entretien-piscine
  - https://pearlyskyglobalclean.co.uk/de/services/poolreinigung
  - https://pearlyskyglobalclean.co.uk/es/services/limpieza-piscinas
  - https://pearlyskyglobalclean.co.uk/it/services/pulizia-piscine
  - https://pearlyskyglobalclean.co.uk/en/services/precision-pressure-washing
  - https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-haute-pression
  - https://pearlyskyglobalclean.co.uk/de/services/hochdruckreinigung
  - https://pearlyskyglobalclean.co.uk/es/services/lavado-presion-precision
  - https://pearlyskyglobalclean.co.uk/it/services/idropulizia-precisione

**Contents:** [Main pages](#main-pages) · [Legal pages](#legal-pages) · [Blog posts](#blog-posts) · [Job postings](#job-postings) · [Service pages](#service-pages) · [Request-a-quote pages](#request-a-quote-pages) · [Redirects](#redirects) · [Private & utility routes](#private--utility-routes) · [robots.txt](#robotstxt)

## Site-wide metadata

Set in `app/layout.tsx` and `lib/countries/seo.ts` (`buildSocialMeta`), applied to every page unless the page overrides it:

| Field | Value |
|---|---|
| `metadataBase` | `https://pearlyskyglobalclean.co.uk` (relative canonicals and image paths resolve against it) |
| `<html lang>` | `{language}-GB` — e.g. `en-GB`, `fr-GB` |
| `og:site_name` | Pearly Sky |
| `og:type` | website |
| `twitter:card` | summary_large_image |
| Default `og:image` / `twitter:image` | `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp` (pages with their own image: blog posts, services) |
| `og:title` / `og:description` | Same as the page's title / description unless noted |
| Fallback title (pages with no metadata of their own) | Pearly Sky |
| Fallback description | Cleaning services, booking, and account management. |

### Canonical & hreflang

- **Canonical:** every page's canonical is its own URL — except the URLs listed below.
- **hreflang:** every page lists 16 alternates — `x-default`, plus each of the 5 languages on each of the 3 country domains:
  `en-FR … it-FR` → pearlyskyglobalclean.fr, `en-GB … it-GB` → pearlyskyglobalclean.co.uk, `en-LK … it-LK` → pearlyskyglobalclean.lk.
  The path for each language is the same on all three domains (the URLs in each page's table below), and
  `x-default` points to this site's English URL. Verified for every URL in this file.

**Canonical exceptions:**

| URL | Canonical |
|---|---|
| https://pearlyskyglobalclean.co.uk/en/careers/residential-cleaner | *(none)* |
| https://pearlyskyglobalclean.co.uk/fr/careers/residential-cleaner | *(none)* |
| https://pearlyskyglobalclean.co.uk/de/careers/residential-cleaner | *(none)* |
| https://pearlyskyglobalclean.co.uk/es/careers/residential-cleaner | *(none)* |
| https://pearlyskyglobalclean.co.uk/it/careers/residential-cleaner | *(none)* |
| https://pearlyskyglobalclean.co.uk/en/careers/childcare-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/fr/careers/childcare-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/de/careers/childcare-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/es/careers/childcare-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/it/careers/childcare-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/en/careers/elder-care-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/fr/careers/elder-care-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/de/careers/elder-care-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/es/careers/elder-care-assistant | *(none)* |
| https://pearlyskyglobalclean.co.uk/it/careers/elder-care-assistant | *(none)* |

## Main pages

*Metadata source:* `lib/countries/meta-data.ts` (`getCountryPageMeta`), translated via `lib/countries/meta-templates.ts`; `/our-services` is hard-coded in `app/(site)/our-services/page.tsx`.

### Home

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en | Premium Eco-Luxury Cleaning Services UK \| Pearly Sky | Experience elite, eco-luxury residential & commercial cleaning in the United Kingdom. Five-star premium property care using sustainable, high-performance practices. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr | Services de Nettoyage Éco-Luxe Premium Royaume-Uni \| Pearly Sky | Découvrez un service de nettoyage résidentiel et commercial éco-luxe d'élite au Royaume-Uni. Entretien immobilier cinq étoiles avec des pratiques durables et hautement performantes. |
| `de` | https://pearlyskyglobalclean.co.uk/de | Premium Eco-Luxus-Reinigungsdienste UK \| Pearly Sky | Erleben Sie elitäre Eco-Luxus-Reinigung für Wohn- und Gewerbeimmobilien im Vereinigten Königreich. Fünf-Sterne-Immobilienpflege mit nachhaltigen, leistungsstarken Methoden. |
| `es` | https://pearlyskyglobalclean.co.uk/es | Servicios Premium de Limpieza Eco-Lujo Reino Unido \| Pearly Sky | Descubra un servicio de limpieza residencial y comercial eco-lujo de primer nivel en el Reino Unido. Cuidado de propiedades cinco estrellas con prácticas sostenibles y de alto rendimiento. |
| `it` | https://pearlyskyglobalclean.co.uk/it | Servizi Premium di Pulizia Eco-Luxury Regno Unito \| Pearly Sky | Scopri un servizio di pulizia residenziale e commerciale eco-luxury d'élite nel Regno Unito. Cura della proprietà a cinque stelle con pratiche sostenibili e ad alte prestazioni. |

### About Us

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/about-us | About Us: Eco-Luxury Property Care UK \| Pearly Sky | Discover the story, strict standards, and values driving Pearly Sky Global in the United Kingdom. Dedicated to elite property care and lifestyle support. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/about-us | À Propos : Entretien de Propriétés Éco-Luxe Royaume-Uni \| Pearly Sky | Découvrez l'histoire, les normes strictes et les valeurs qui animent Pearly Sky Global au Royaume-Uni. Dédiés à l'entretien immobilier d'élite et au soutien lifestyle. |
| `de` | https://pearlyskyglobalclean.co.uk/de/about-us | Über Uns: Eco-Luxus-Immobilienpflege UK \| Pearly Sky | Entdecken Sie die Geschichte, die strengen Standards und die Werte von Pearly Sky Global im Vereinigten Königreich. Wir engagieren uns für erstklassige Immobilienpflege und Lifestyle-Unterstützung. |
| `es` | https://pearlyskyglobalclean.co.uk/es/about-us | Sobre Nosotros: Cuidado de Propiedades Eco-Lujo Reino Unido \| Pearly Sky | Descubra la historia, los estrictos estándares y los valores que impulsan a Pearly Sky Global en el Reino Unido. Dedicados al cuidado de propiedades de élite y al soporte de estilo de vida. |
| `it` | https://pearlyskyglobalclean.co.uk/it/about-us | Chi Siamo: Cura di Proprietà Eco-Luxury Regno Unito \| Pearly Sky | Scopri la storia, gli standard rigorosi e i valori che guidano Pearly Sky Global nel Regno Unito. Dedicati alla cura delle proprietà d'élite e al supporto lifestyle. |

### Our Customers

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/our-customers | Verified Client Reviews & Testimonials UK \| Pearly Sky | See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in the United Kingdom. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/our-customers | Avis et Témoignages Clients Vérifiés Royaume-Uni \| Pearly Sky | Découvrez ce que nos clients disent de nous. Avis vérifiés de propriétaires premium, de bureaux d'entreprise et de propriétés de luxe au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/our-customers | Verifizierte Kundenbewertungen & Erfahrungsberichte UK \| Pearly Sky | Erfahren Sie, was unsere Kunden über uns sagen. Verifizierte Bewertungen von Premium-Hausbesitzern, Unternehmen und Luxusimmobilien im Vereinigten Königreich. |
| `es` | https://pearlyskyglobalclean.co.uk/es/our-customers | Opiniones y Testimonios Verificados de Clientes Reino Unido \| Pearly Sky | Descubra lo que dicen nuestros clientes. Opiniones verificadas de propietarios premium, oficinas corporativas y propiedades de lujo en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/our-customers | Recensioni e Testimonianze Verificate dei Clienti Regno Unito \| Pearly Sky | Scopri cosa dicono di noi i nostri clienti. Recensioni verificate di proprietari premium, uffici aziendali e proprietà di lusso nel Regno Unito. |

### Our Locations

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/our-locations | Our Service Locations in the UK \| Pearly Sky Global | Operating premium service clusters across the United Kingdom. Find your local Pearly Sky Global service portal and book elite eco-luxury care. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/our-locations | Nos Zones de Service Royaume-Uni \| Pearly Sky Global | Des clusters de service premium au Royaume-Uni. Trouvez votre portail de service Pearly Sky Global local et réservez un entretien éco-luxe d'élite. |
| `de` | https://pearlyskyglobalclean.co.uk/de/our-locations | Unsere Servicestandorte UK \| Pearly Sky Global | Premium-Servicecluster im Vereinigten Königreich. Finden Sie Ihr lokales Pearly Sky Global Serviceportal und buchen Sie erstklassige Eco-Luxus-Pflege. |
| `es` | https://pearlyskyglobalclean.co.uk/es/our-locations | Nuestras Ubicaciones de Servicio Reino Unido \| Pearly Sky Global | Clústeres de servicio premium en el Reino Unido. Encuentre su portal de servicio local de Pearly Sky Global y reserve un cuidado eco-lujo de primer nivel. |
| `it` | https://pearlyskyglobalclean.co.uk/it/our-locations | Le Nostre Sedi di Servizio Regno Unito \| Pearly Sky Global | Cluster di servizio premium nel Regno Unito. Trova il tuo portale di servizio Pearly Sky Global locale e prenota una cura eco-luxury d'élite. |

### Blog

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/blog | Eco-Luxury Cleaning Blog & Insights UK \| Pearly Sky | Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in the United Kingdom. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/blog | Blog & Actualités Nettoyage Éco-Luxe Royaume-Uni \| Pearly Sky | Conseils professionnels, guides d'entretien durable et insights sur l'entretien immobilier d'élite pour les espaces premium au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/blog | Eco-Luxus-Reinigungsblog & Einblicke UK \| Pearly Sky | Professionelle Pflegeratschläge, nachhaltige Haushaltsführungs-Guides und Einblicke in die erstklassige Immobilienpflege für Premium-Räume im Vereinigten Königreich. |
| `es` | https://pearlyskyglobalclean.co.uk/es/blog | Blog e Ideas de Limpieza Eco-Lujo Reino Unido \| Pearly Sky | Consejos profesionales de cuidado, guías de limpieza sostenible e ideas sobre el mantenimiento de propiedades de élite para espacios premium en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/blog | Blog e Approfondimenti sulla Pulizia Eco-Luxury Regno Unito \| Pearly Sky | Consigli professionali, guide alla pulizia sostenibile e approfondimenti sulla manutenzione di proprietà d'élite per spazi premium nel Regno Unito. |

### Careers

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/careers | Careers in Luxury Property Care UK \| Pearly Sky | Build a rewarding career in luxury property care in the United Kingdom. Explore open positions for professional cleaners and premium specialists. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/careers | Carrières dans l'Entretien de Propriétés de Luxe Royaume-Uni \| Pearly Sky | Construisez une carrière valorisante dans l'entretien de propriétés de luxe au Royaume-Uni. Découvrez nos postes ouverts pour nettoyeurs professionnels et spécialistes premium. |
| `de` | https://pearlyskyglobalclean.co.uk/de/careers | Karriere in der Luxus-Immobilienpflege UK \| Pearly Sky | Starten Sie eine lohnende Karriere in der Luxus-Immobilienpflege im Vereinigten Königreich. Entdecken Sie offene Stellen für professionelle Reinigungskräfte und Premium-Spezialisten. |
| `es` | https://pearlyskyglobalclean.co.uk/es/careers | Carreras en el Cuidado de Propiedades de Lujo Reino Unido \| Pearly Sky | Construya una carrera gratificante en el cuidado de propiedades de lujo en el Reino Unido. Explore vacantes para limpiadores profesionales y especialistas premium. |
| `it` | https://pearlyskyglobalclean.co.uk/it/careers | Carriere nella Cura di Proprietà di Lusso Regno Unito \| Pearly Sky | Costruisci una carriera gratificante nella cura delle proprietà di lusso nel Regno Unito. Scopri le posizioni aperte per addetti alle pulizie professionali e specialisti premium. |

### Contact Us

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/contact-us | Contact Our Eco-Luxury Cleaning Team UK \| Pearly Sky | Get in touch with Pearly Sky Global United Kingdom for booking inquiries or custom service quotes. Reliable, immediate assistance. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/contact-us | Contactez Notre Équipe de Nettoyage Éco-Luxe Royaume-Uni \| Pearly Sky | Contactez Pearly Sky Global au Royaume-Uni pour toute demande de réservation ou devis personnalisé. Une assistance fiable et immédiate. |
| `de` | https://pearlyskyglobalclean.co.uk/de/contact-us | Kontaktieren Sie Unser Eco-Luxus-Reinigungsteam UK \| Pearly Sky | Kontaktieren Sie Pearly Sky Global im Vereinigten Königreich für Buchungsanfragen oder individuelle Angebote. Zuverlässige, sofortige Unterstützung. |
| `es` | https://pearlyskyglobalclean.co.uk/es/contact-us | Contacte a Nuestro Equipo de Limpieza Eco-Lujo Reino Unido \| Pearly Sky | Póngase en contacto con Pearly Sky Global en el Reino Unido para consultas de reserva o cotizaciones personalizadas. Asistencia confiable e inmediata. |
| `it` | https://pearlyskyglobalclean.co.uk/it/contact-us | Contatta il Nostro Team di Pulizia Eco-Luxury Regno Unito \| Pearly Sky | Contatta Pearly Sky Global nel Regno Unito per richieste di prenotazione o preventivi personalizzati. Assistenza affidabile e immediata. |

### Our Services

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `de` | https://pearlyskyglobalclean.co.uk/de/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `es` | https://pearlyskyglobalclean.co.uk/es/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `it` | https://pearlyskyglobalclean.co.uk/it/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |

## Legal pages

*Metadata source:* `STATIC_PAGE_META` in `lib/countries/meta-data.ts`.

### Privacy Policy

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/privacy-policy | Privacy Policy \| Pearly Sky | How Pearly Sky collects, uses, shares and protects your personal data when you book our cleaning services, and how to exercise your GDPR rights. | Privacy Policy |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/privacy-policy | Politique de confidentialité \| Pearly Sky | Comment Pearly Sky collecte, utilise, partage et protège vos données personnelles lorsque vous réservez nos services de nettoyage, et vos droits RGPD. | Politique de confidentialité |
| `de` | https://pearlyskyglobalclean.co.uk/de/privacy-policy | Datenschutzerklärung \| Pearly Sky | Wie Pearly Sky Ihre personenbezogenen Daten bei der Buchung unserer Reinigungsdienste erhebt, nutzt, weitergibt und schützt – und Ihre DSGVO-Rechte. | Datenschutzerklärung |
| `es` | https://pearlyskyglobalclean.co.uk/es/privacy-policy | Política de privacidad \| Pearly Sky | Cómo Pearly Sky recopila, utiliza, comparte y protege sus datos personales al reservar nuestros servicios de limpieza, y sus derechos según el RGPD. | Política de privacidad |
| `it` | https://pearlyskyglobalclean.co.uk/it/privacy-policy | Informativa sulla privacy \| Pearly Sky | Come Pearly Sky raccoglie, utilizza, condivide e protegge i tuoi dati personali quando prenoti i nostri servizi di pulizia, e i tuoi diritti GDPR. | Informativa sulla privacy |

### Cookie Policy

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/cookie-policy | Cookie Policy \| Pearly Sky | Which cookies the Pearly Sky website uses and why, which third parties set cookies, and how you can manage or disable them in your browser. | Cookie Policy |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/cookie-policy | Politique relative aux cookies \| Pearly Sky | Les cookies utilisés par le site Pearly Sky et leur finalité, les cookies tiers, et comment les gérer ou les désactiver dans votre navigateur. | Politique relative aux cookies |
| `de` | https://pearlyskyglobalclean.co.uk/de/cookie-policy | Cookie-Richtlinie \| Pearly Sky | Welche Cookies die Pearly-Sky-Website verwendet und wozu, welche Drittanbieter Cookies setzen und wie Sie diese im Browser verwalten oder deaktivieren. | Cookie-Richtlinie |
| `es` | https://pearlyskyglobalclean.co.uk/es/cookie-policy | Política de cookies \| Pearly Sky | Qué cookies utiliza el sitio web de Pearly Sky y para qué, qué terceros instalan cookies y cómo puede gestionarlas o desactivarlas en su navegador. | Política de cookies |
| `it` | https://pearlyskyglobalclean.co.uk/it/cookie-policy | Informativa sui cookie \| Pearly Sky | Quali cookie utilizza il sito Pearly Sky e a cosa servono, quali terze parti li installano e come gestirli o disattivarli nel tuo browser. | Informativa sui cookie |

### Terms and Conditions

**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/terms-and-conditions | Terms and Conditions \| Pearly Sky | The terms for using the Pearly Sky website and cleaning services: user responsibilities, intellectual property, liability and governing law. | Terms and Conditions |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/terms-and-conditions | Conditions générales \| Pearly Sky | Conditions d’utilisation du site et des services Pearly Sky : obligations de l’utilisateur, propriété intellectuelle, responsabilité et droit applicable. | Conditions générales |
| `de` | https://pearlyskyglobalclean.co.uk/de/terms-and-conditions | Allgemeine Geschäftsbedingungen \| Pearly Sky | Bedingungen für die Nutzung der Website und Reinigungsdienste von Pearly Sky: Pflichten der Nutzer, geistiges Eigentum, Haftung und anwendbares Recht. | Allgemeine Geschäftsbedingungen |
| `es` | https://pearlyskyglobalclean.co.uk/es/terms-and-conditions | Términos y condiciones \| Pearly Sky | Condiciones de uso del sitio web y los servicios de Pearly Sky: obligaciones del usuario, propiedad intelectual, responsabilidad y ley aplicable. | Términos y condiciones |
| `it` | https://pearlyskyglobalclean.co.uk/it/terms-and-conditions | Termini e condizioni \| Pearly Sky | Condizioni d’uso del sito e dei servizi Pearly Sky: obblighi dell’utente, proprietà intellettuale, limitazione di responsabilità e legge applicabile. | Termini e condizioni |

## Blog posts

*Metadata source:* `lib/content/blog-posts.ts` — title is `{post title} | Pearly Sky Blog`.

### Blog — The Importance Of Regular Cleaning For A Healthy Home

**og:image:** `https://pearlyskyglobalclean.co.uk/images/blog/article-1.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/blog/importance-of-regular-cleaning | The Importance Of Regular Cleaning For A Healthy Home \| Pearly Sky Blog | Why a consistent cleaning routine does more for your home than just appearances — and how to keep it up without the effort. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/blog/importance-of-regular-cleaning | L’importance d’un ménage régulier pour un intérieur sain \| Pearly Sky Blog | Pourquoi une routine de ménage régulière apporte bien plus à votre intérieur qu’une simple belle apparence — et comment la maintenir sans effort. |
| `de` | https://pearlyskyglobalclean.co.uk/de/blog/importance-of-regular-cleaning | Warum regelmäßige Reinigung für ein gesundes Zuhause wichtig ist \| Pearly Sky Blog | Warum eine feste Reinigungsroutine Ihrem Zuhause mehr bringt als nur ein schönes Erscheinungsbild — und wie Sie sie mühelos beibehalten. |
| `es` | https://pearlyskyglobalclean.co.uk/es/blog/importance-of-regular-cleaning | La importancia de una limpieza regular para un hogar saludable \| Pearly Sky Blog | Por qué una rutina de limpieza constante aporta a tu hogar mucho más que buena apariencia — y cómo mantenerla sin esfuerzo. |
| `it` | https://pearlyskyglobalclean.co.uk/it/blog/importance-of-regular-cleaning | L’importanza delle pulizie regolari per una casa sana \| Pearly Sky Blog | Perché una routine di pulizia costante fa per la tua casa molto più che migliorarne l’aspetto — e come mantenerla senza fatica. |

### Blog — Top 5 Cleaning Tips For Busy Professionals

**og:image:** `https://pearlyskyglobalclean.co.uk/images/blog/article-2.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/blog/top-5-cleaning-tips | Top 5 Cleaning Tips For Busy Professionals \| Pearly Sky Blog | Get expert advice on how to keep your space clean and organized, even on the busiest of days. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/blog/top-5-cleaning-tips | 5 conseils de ménage pour les professionnels pressés \| Pearly Sky Blog | Des conseils d’experts pour garder votre espace propre et organisé, même lors des journées les plus chargées. |
| `de` | https://pearlyskyglobalclean.co.uk/de/blog/top-5-cleaning-tips | Die 5 besten Reinigungstipps für Berufstätige \| Pearly Sky Blog | Expertentipps, wie Sie Ihre Räume auch an den vollsten Tagen sauber und ordentlich halten. |
| `es` | https://pearlyskyglobalclean.co.uk/es/blog/top-5-cleaning-tips | 5 consejos de limpieza para profesionales ocupados \| Pearly Sky Blog | Consejos de expertos para mantener tu espacio limpio y ordenado, incluso en los días más ajetreados. |
| `it` | https://pearlyskyglobalclean.co.uk/it/blog/top-5-cleaning-tips | I 5 migliori consigli di pulizia per professionisti impegnati \| Pearly Sky Blog | Consigli degli esperti per mantenere i tuoi spazi puliti e ordinati, anche nelle giornate più intense. |

### Blog — The Benefits Of Eco-Friendly Cleaning Services

**og:image:** `https://pearlyskyglobalclean.co.uk/images/blog/article-3.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/blog/eco-friendly-cleaning | The Benefits Of Eco-Friendly Cleaning Services \| Pearly Sky Blog | Learn about the advantages of choosing eco-friendly cleaning services for your home or business. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/blog/eco-friendly-cleaning | Les avantages des services de nettoyage écologiques \| Pearly Sky Blog | Découvrez les avantages de choisir des services de nettoyage écologiques pour votre domicile ou votre entreprise. |
| `de` | https://pearlyskyglobalclean.co.uk/de/blog/eco-friendly-cleaning | Die Vorteile umweltfreundlicher Reinigungsdienste \| Pearly Sky Blog | Erfahren Sie, welche Vorteile umweltfreundliche Reinigungsdienste für Ihr Zuhause oder Ihr Unternehmen bieten. |
| `es` | https://pearlyskyglobalclean.co.uk/es/blog/eco-friendly-cleaning | Las ventajas de los servicios de limpieza ecológicos \| Pearly Sky Blog | Descubre las ventajas de elegir servicios de limpieza ecológicos para tu hogar o tu empresa. |
| `it` | https://pearlyskyglobalclean.co.uk/it/blog/eco-friendly-cleaning | I vantaggi dei servizi di pulizia ecologici \| Pearly Sky Blog | Scopri i vantaggi di scegliere servizi di pulizia ecologici per la tua casa o la tua attività. |

### Blog — How To Choose The Right Cleaning Service For Your Needs

**og:image:** `https://pearlyskyglobalclean.co.uk/images/blog/choose-right-cleaning-service.jpg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/blog/choose-right-cleaning-service | How To Choose The Right Cleaning Service For Your Needs \| Pearly Sky Blog | Find out what to look for when selecting a cleaning service that meets your specific requirements. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/blog/choose-right-cleaning-service | Comment choisir le service de nettoyage adapté à vos besoins \| Pearly Sky Blog | Découvrez les critères à prendre en compte pour choisir un service de nettoyage qui répond à vos exigences. |
| `de` | https://pearlyskyglobalclean.co.uk/de/blog/choose-right-cleaning-service | So wählen Sie den passenden Reinigungsdienst für Ihre Bedürfnisse \| Pearly Sky Blog | Erfahren Sie, worauf Sie bei der Auswahl eines Reinigungsdienstes achten sollten, der Ihre Anforderungen erfüllt. |
| `es` | https://pearlyskyglobalclean.co.uk/es/blog/choose-right-cleaning-service | Cómo elegir el servicio de limpieza adecuado a tus necesidades \| Pearly Sky Blog | Descubre qué tener en cuenta al elegir un servicio de limpieza que se ajuste a tus necesidades concretas. |
| `it` | https://pearlyskyglobalclean.co.uk/it/blog/choose-right-cleaning-service | Come scegliere il servizio di pulizia giusto per le tue esigenze \| Pearly Sky Blog | Scopri a cosa prestare attenzione quando scegli un servizio di pulizia adatto alle tue esigenze specifiche. |

## Job postings

*Metadata source:* `lib/content/jobs.ts` + the i18n dictionaries; title/description built in `app/(site)/careers/[jobId]/page.tsx`.

### Job — Cleaner (Male / Female) — Residential and Commercial Properties

**Not in sitemap.xml**  
Careers are France-only: this URL renders a “no openings” notice, has no canonical/hreflang, and is left out of the sitemap.  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/careers/residential-cleaner | Careers \| Pearly Sky | — |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/careers/residential-cleaner | Careers \| Pearly Sky | — |
| `de` | https://pearlyskyglobalclean.co.uk/de/careers/residential-cleaner | Careers \| Pearly Sky | — |
| `es` | https://pearlyskyglobalclean.co.uk/es/careers/residential-cleaner | Careers \| Pearly Sky | — |
| `it` | https://pearlyskyglobalclean.co.uk/it/careers/residential-cleaner | Careers \| Pearly Sky | — |

### Job — Children Care Worker (Male / Female)

**Not in sitemap.xml**  
Careers are France-only: this URL renders a “no openings” notice, has no canonical/hreflang, and is left out of the sitemap.  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/careers/childcare-assistant | Careers \| Pearly Sky | — |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/careers/childcare-assistant | Careers \| Pearly Sky | — |
| `de` | https://pearlyskyglobalclean.co.uk/de/careers/childcare-assistant | Careers \| Pearly Sky | — |
| `es` | https://pearlyskyglobalclean.co.uk/es/careers/childcare-assistant | Careers \| Pearly Sky | — |
| `it` | https://pearlyskyglobalclean.co.uk/it/careers/childcare-assistant | Careers \| Pearly Sky | — |

### Job — Elder Care Worker (Male / Female)

**Not in sitemap.xml**  
Careers are France-only: this URL renders a “no openings” notice, has no canonical/hreflang, and is left out of the sitemap.  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/careers/elder-care-assistant | Careers \| Pearly Sky | — |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/careers/elder-care-assistant | Careers \| Pearly Sky | — |
| `de` | https://pearlyskyglobalclean.co.uk/de/careers/elder-care-assistant | Careers \| Pearly Sky | — |
| `es` | https://pearlyskyglobalclean.co.uk/es/careers/elder-care-assistant | Careers \| Pearly Sky | — |
| `it` | https://pearlyskyglobalclean.co.uk/it/careers/elder-care-assistant | Careers \| Pearly Sky | — |

## Service pages

*Metadata source:* Backend seed (`backend/src/database/seed-{country}.ts`: slugs, names, translated SEO titles) → `lib/countries/service-meta.ts` (English) → plain fallback; see `app/(site)/services/[serviceSlug]/page.tsx`.

### Service — Regular Home Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/regular-home-cleaning | Regular Home Cleaning \| Pearly Sky Eco-Luxury Care – UK | Recurring, detail-driven upkeep that keeps every room fresh, tidy, and welcoming between visits. Serving clients across the United Kingdom. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-regulier | Nettoyage Régulier \| Pearly Sky Éco-Luxe – Royaume-Uni | Un entretien régulier pour un intérieur toujours frais et impeccable. Au service de nos clients au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-regelmaessig | Regelmäßige Hausreinigung \| Pearly Sky Eco-Luxus-Pflege – UK | Regelmäßige Pflege für ein stets frisches und gepflegtes Zuhause. Wir betreuen Kunden im gesamten Vereinigten Königreich. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-regular-hogar | Limpieza Regular del Hogar \| Pearly Sky Eco-Lujo – Reino Unido | Un mantenimiento regular para un hogar siempre fresco y ordenado. Atendemos a clientes en todo el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-regolare-casa | Pulizia Regolare della Casa \| Pearly Sky Eco-Luxury – Regno Unito | Una manutenzione regolare per una casa sempre fresca e in ordine. Al servizio dei clienti in tutto il Regno Unito. |

### Service — Quick Touch-Up Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/quick-touch-up-cleaning | Essential Touch-Up Cleaning \| Fast Refresh Service – UK | A focused, efficient refresh for high-traffic areas — ideal for a quick reset before guests or the next appointment. Serving clients across the United Kingdom. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-express | Nettoyage Express \| Pearly Sky Éco-Luxe – Royaume-Uni | Un nettoyage rapide pour retrouver un intérieur impeccable en un instant. Au service de nos clients au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/schnellreinigung | Schnellreinigung \| Pearly Sky Eco-Luxus-Pflege – UK | Eine schnelle Reinigung für ein gepflegtes Erscheinungsbild. Wir betreuen Kunden im gesamten Vereinigten Königreich. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-rapida | Limpieza Rápida \| Pearly Sky Eco-Lujo – Reino Unido | Una limpieza rápida para recuperar un aspecto impecable. Atendemos a clientes en todo el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-rapida | Pulizia Rapida \| Pearly Sky Eco-Luxury – Regno Unito | Una pulizia veloce per un aspetto impeccabile. Al servizio dei clienti in tutto il Regno Unito. |

### Service — Same-Day Priority Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-3-last-minute-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/same-day-priority-cleaning | Same-Day Priority Cleaning \| Rapid-Dispatch Service – UK | Urgent, fully-staffed cleaning dispatched the same day for last-minute arrivals, inspections, or unexpected guests. Serving clients across the United Kingdom. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-prioritaire-jour-meme | Nettoyage Prioritaire le Jour Même \| Pearly Sky Éco-Luxe – Royaume-Uni | Un nettoyage rapide et fiable, disponible sur demande urgente. Au service de nos clients au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-noch-heute | Prioritäre Reinigung am Selben Tag \| Pearly Sky Eco-Luxus-Pflege – UK | Schnelle, zuverlässige Reinigung kurzfristig verfügbar. Wir betreuen Kunden im gesamten Vereinigten Königreich. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-prioritaria-mismo-dia | Limpieza Prioritaria el Mismo Día \| Pearly Sky Eco-Lujo – Reino Unido | Limpieza rápida y fiable disponible con poca antelación. Atendemos a clientes en todo el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-prioritaria-in-giornata | Pulizia Prioritaria in Giornata \| Pearly Sky Eco-Luxury – Regno Unito | Pulizia rapida e affidabile disponibile con breve preavviso. Al servizio dei clienti in tutto il Regno Unito. |

### Service — Deep Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-4-deep-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/deep-cleaning | Deep Cleaning Services in the UK \| Pearly Sky | Detailed deep cleaning for homes, apartments and premium properties in the UK, including kitchens, bathrooms, living areas and high-touch surfaces. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-en-profondeur | Services de nettoyage en profondeur au Royaume-Uni \| Pearly Sky | Nettoyage en profondeur minutieux pour maisons, appartements et propriétés haut de gamme au Royaume-Uni, y compris cuisines, salles de bain, pièces de vie et surfaces fréquemment touchées. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/grundreinigung | Grundreinigung im Vereinigten Königreich \| Pearly Sky | Gründliche Grundreinigung für Häuser, Wohnungen und hochwertige Immobilien im Vereinigten Königreich, einschließlich Küchen, Bädern, Wohnbereichen und häufig berührter Oberflächen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-profunda | Servicios de limpieza profunda en el Reino Unido \| Pearly Sky | Limpieza profunda y detallada para viviendas, apartamentos y propiedades premium en el Reino Unido, incluidas cocinas, baños, zonas de estar y superficies de contacto frecuente. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-approfondita | Servizi di pulizia profonda nel Regno Unito \| Pearly Sky | Pulizia profonda e accurata per case, appartamenti e proprietà di pregio nel Regno Unito, incluse cucine, bagni, zone giorno e superfici toccate di frequente. |

### Service — End of Tenancy Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-5-move-in-out-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/end-of-tenancy-cleaning | End-of-Tenancy Cleaning in the UK \| Pearly Sky | Thorough end-of-tenancy cleaning for move-ins, move-outs and property handovers in the UK. Designed to help leave your property clean and ready for inspection. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-fin-de-bail | Nettoyage de fin de bail au Royaume-Uni \| Pearly Sky | Nettoyage complet de fin de bail pour emménagements, déménagements et remises de clés au Royaume-Uni. Conçu pour vous aider à rendre un logement propre et prêt pour l'état des lieux. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/endreinigung-auszug | Endreinigung bei Mietende im Vereinigten Königreich \| Pearly Sky | Gründliche Endreinigung für Ein- und Auszüge sowie Objektübergaben im Vereinigten Königreich. Damit Ihre Immobilie sauber und bereit für die Abnahme ist. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-fin-contrato | Limpieza de fin de alquiler en el Reino Unido \| Pearly Sky | Limpieza a fondo de fin de alquiler para entradas, salidas y entregas de inmuebles en el Reino Unido. Pensada para ayudarle a dejar la propiedad limpia y lista para la inspección. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-fine-locazione | Pulizia di fine locazione nel Regno Unito \| Pearly Sky | Pulizia accurata di fine locazione per ingressi, traslochi e consegne di immobili nel Regno Unito. Pensata per aiutarvi a lasciare l'immobile pulito e pronto per l'ispezione. |

### Service — Post-Construction & Renovation Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-6-post-construction-renovation-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/post-construction-renovation-cleaning | Post-Construction & Renovation Cleaning \| Pearly Sky UK | Professional post-construction and renovation cleaning to remove dust, debris and marks before move-in, handover or reopening. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-post-travaux | Nettoyage post-travaux & rénovation \| Pearly Sky UK | Nettoyage professionnel après travaux et rénovation pour éliminer poussière, débris et traces avant un emménagement, une remise de clés ou une réouverture. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-nach-bauarbeiten | Reinigung nach Bau & Renovierung \| Pearly Sky UK | Professionelle Reinigung nach Bau- und Renovierungsarbeiten, die Staub, Schutt und Spuren vor Einzug, Übergabe oder Wiedereröffnung entfernt. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-post-obra | Limpieza post-obra y reforma \| Pearly Sky UK | Limpieza profesional tras obras y reformas para eliminar polvo, escombros y marcas antes de la mudanza, la entrega o la reapertura. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-post-costruzione | Pulizia post-cantiere e ristrutturazione \| Pearly Sky UK | Pulizia professionale dopo lavori edili e ristrutturazioni per rimuovere polvere, detriti e segni prima del trasloco, della consegna o della riapertura. |

### Service — Premium Rental Concierge Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-7-airbnb-short-term-rental-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/premium-rental-concierge-cleaning | Premium Rental Turnover Cleaning in the UK \| Pearly Sky | Premium cleaning and turnover support for short-term and luxury rental properties, with optional linen and guest-ready preparation services. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/conciergerie-menage-locations-premium | Ménage de rotation pour locations premium au Royaume-Uni \| Pearly Sky | Ménage haut de gamme et gestion des rotations pour locations courte durée et de luxe, avec services optionnels de linge et de préparation pour l'accueil des voyageurs. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/concierge-reinigung-vermietung | Wechselreinigung für Premium-Mietobjekte im Vereinigten Königreich \| Pearly Sky | Hochwertige Reinigung und Wechselservice für Kurzzeit- und Luxusvermietungen, mit optionalem Wäscheservice und Vorbereitung für die Ankunft der Gäste. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-concierge-alquileres | Limpieza de rotación para alquileres premium en el Reino Unido \| Pearly Sky | Limpieza premium y gestión de rotaciones para alquileres de corta estancia y de lujo, con servicios opcionales de ropa de cama y preparación para huéspedes. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-concierge-affitti | Pulizia di cambio ospiti per affitti premium nel Regno Unito \| Pearly Sky | Pulizia premium e gestione del cambio ospiti per affitti brevi e di lusso, con servizi opzionali di biancheria e preparazione per l'arrivo degli ospiti. |

### Service — Commercial & Office Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-8-commercial-office-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/commercial-office-cleaning | Commercial & Office Cleaning in the UK \| Pearly Sky | Professional commercial and office cleaning for workplaces, shared spaces and business premises in the UK, tailored to your schedule and requirements. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-bureaux-commercial | Nettoyage de bureaux et locaux commerciaux au Royaume-Uni \| Pearly Sky | Nettoyage professionnel de bureaux et locaux commerciaux pour lieux de travail, espaces partagés et locaux professionnels au Royaume-Uni, adapté à vos horaires et à vos besoins. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/gewerbe-bueroreinigung | Gewerbe- & Büroreinigung im Vereinigten Königreich \| Pearly Sky | Professionelle Gewerbe- und Büroreinigung für Arbeitsplätze, Gemeinschaftsflächen und Geschäftsräume im Vereinigten Königreich, abgestimmt auf Ihren Zeitplan und Ihre Anforderungen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-comercial-oficinas | Limpieza comercial y de oficinas en el Reino Unido \| Pearly Sky | Limpieza profesional comercial y de oficinas para lugares de trabajo, espacios compartidos y locales de empresa en el Reino Unido, adaptada a sus horarios y necesidades. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-commerciale-uffici | Pulizia commerciale e di uffici nel Regno Unito \| Pearly Sky | Pulizia professionale commerciale e di uffici per luoghi di lavoro, spazi condivisi e locali aziendali nel Regno Unito, su misura per i vostri orari e le vostre esigenze. |

### Service — HealthGuard-Sanitization

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/healthguard-sanitization | HealthGuard Surface Disinfection Service \| Pearly Sky UK | Targeted cleaning and surface disinfection for frequently touched areas in homes, offices and shared spaces. Service availability depends on location and requirements. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/desinfection-healthguard | Service de désinfection des surfaces HealthGuard \| Pearly Sky UK | Nettoyage ciblé et désinfection des surfaces fréquemment touchées dans les logements, bureaux et espaces partagés. Disponibilité selon le lieu et les besoins. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/healthguard-desinfektion | HealthGuard Oberflächendesinfektion \| Pearly Sky UK | Gezielte Reinigung und Desinfektion häufig berührter Oberflächen in Wohnungen, Büros und Gemeinschaftsräumen. Verfügbarkeit abhängig von Standort und Anforderungen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/desinfeccion-healthguard | Servicio de desinfección de superficies HealthGuard \| Pearly Sky UK | Limpieza específica y desinfección de superficies de contacto frecuente en viviendas, oficinas y espacios compartidos. Disponibilidad según la ubicación y las necesidades. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/sanificazione-healthguard | Servizio di disinfezione delle superfici HealthGuard \| Pearly Sky UK | Pulizia mirata e disinfezione delle superfici toccate di frequente in case, uffici e spazi condivisi. Disponibilità in base alla località e alle esigenze. |

### Service — Carpet & Upholstery Cleaning

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-10-carpet-upholstery-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/carpet-upholstery-cleaning | Carpet & Upholstery Cleaning in the UK \| Pearly Sky | Professional deep cleaning for carpets, rugs, sofas and upholstery to refresh fabrics and help remove everyday marks and embedded dirt. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-tapis-canapes | Nettoyage de tapis et canapés au Royaume-Uni \| Pearly Sky | Nettoyage professionnel en profondeur des moquettes, tapis, canapés et tissus d'ameublement pour raviver les textiles et aider à éliminer les taches du quotidien et la saleté incrustée. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/teppich-polsterreinigung | Teppich- & Polsterreinigung im Vereinigten Königreich \| Pearly Sky | Professionelle Tiefenreinigung für Teppiche, Läufer, Sofas und Polster, die Stoffe auffrischt und hilft, alltägliche Flecken und tief sitzenden Schmutz zu entfernen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-alfombras-tapiceria | Limpieza de alfombras y tapicerías en el Reino Unido \| Pearly Sky | Limpieza profunda profesional de moquetas, alfombras, sofás y tapicerías para renovar los tejidos y ayudar a eliminar manchas cotidianas y suciedad incrustada. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-tappeti-divani | Pulizia di tappeti e imbottiti nel Regno Unito \| Pearly Sky | Pulizia profonda professionale di moquette, tappeti, divani e imbottiti per rinfrescare i tessuti e aiutare a rimuovere macchie quotidiane e sporco incrostato. |

### Service — Steam Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-11-steam-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/steam-cleaning | Steam Cleaning Services in the UK \| Pearly Sky | High-temperature steam cleaning for tiles, hard floors and suitable surfaces. A practical option for deep cleaning with reduced use of cleaning products. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-vapeur | Services de nettoyage à la vapeur au Royaume-Uni \| Pearly Sky | Nettoyage vapeur haute température pour carrelages, sols durs et surfaces adaptées. Une solution pratique pour un nettoyage en profondeur avec moins de produits d'entretien. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/dampfreinigung | Dampfreinigung im Vereinigten Königreich \| Pearly Sky | Heißdampfreinigung für Fliesen, Hartböden und geeignete Oberflächen. Eine praktische Lösung für die Tiefenreinigung mit weniger Reinigungsmitteln. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-vapor | Servicios de limpieza a vapor en el Reino Unido \| Pearly Sky | Limpieza a vapor de alta temperatura para azulejos, suelos duros y superficies adecuadas. Una opción práctica para una limpieza profunda con menos productos de limpieza. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-vapore | Servizi di pulizia a vapore nel Regno Unito \| Pearly Sky | Pulizia a vapore ad alta temperatura per piastrelle, pavimenti duri e superfici idonee. Una soluzione pratica per una pulizia profonda con un uso ridotto di detergenti. |

### Service — Post-Event Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-12-post-event-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/post-event-cleaning | Post-Event Cleaning Services in the UK \| Pearly Sky | Flexible post-event cleaning for private events, celebrations and business occasions, including waste removal and venue reset support. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-post-evenement | Nettoyage après événement au Royaume-Uni \| Pearly Sky | Nettoyage flexible après vos événements privés, célébrations et rendez-vous professionnels, incluant l'évacuation des déchets et la remise en état des lieux. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-nach-veranstaltung | Reinigung nach Veranstaltungen im Vereinigten Königreich \| Pearly Sky | Flexible Reinigung nach privaten Veranstaltungen, Feiern und Geschäftsanlässen, inklusive Abfallentsorgung und Unterstützung bei der Wiederherrichtung des Veranstaltungsorts. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-post-evento | Servicios de limpieza post-evento en el Reino Unido \| Pearly Sky | Limpieza flexible tras eventos privados, celebraciones y actos de empresa, incluida la retirada de residuos y la puesta a punto del espacio. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-post-evento | Servizi di pulizia post-evento nel Regno Unito \| Pearly Sky | Pulizia flessibile dopo eventi privati, celebrazioni e occasioni aziendali, incluso lo smaltimento dei rifiuti e il ripristino della location. |

### Service — Pool Cleaning

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-13-pool-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/pool-cleaning | Swimming Pool Cleaning & Maintenance \| Pearly Sky UK | Cleaning and maintenance support for private swimming pools, including surface cleaning, debris removal and routine care based on your requirements. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/entretien-piscine | Nettoyage et entretien de piscine \| Pearly Sky UK | Nettoyage et entretien des piscines privées, incluant le nettoyage des surfaces, le retrait des débris et l'entretien régulier selon vos besoins. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/poolreinigung | Poolreinigung & -wartung \| Pearly Sky UK | Reinigung und Pflege privater Schwimmbecken, einschließlich Oberflächenreinigung, Entfernung von Schmutz und regelmäßiger Wartung nach Ihren Anforderungen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-piscinas | Limpieza y mantenimiento de piscinas \| Pearly Sky UK | Limpieza y mantenimiento de piscinas privadas, incluida la limpieza de superficies, la retirada de residuos y el cuidado periódico según sus necesidades. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-piscine | Pulizia e manutenzione piscine \| Pearly Sky UK | Pulizia e manutenzione di piscine private, inclusa la pulizia delle superfici, la rimozione dei detriti e la cura periodica in base alle vostre esigenze. |

### Service — Precision Pressure Washing

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-14-precision-pressure-washing.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/precision-pressure-washing | Pressure Washing Services in the UK \| Pearly Sky | Professional exterior pressure washing for suitable terraces, driveways, façades and outdoor surfaces, assessed according to material and condition. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-haute-pression | Nettoyage haute pression au Royaume-Uni \| Pearly Sky | Nettoyage extérieur professionnel haute pression pour terrasses, allées, façades et surfaces extérieures adaptées, évalué selon le matériau et son état. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/hochdruckreinigung | Hochdruckreinigung im Vereinigten Königreich \| Pearly Sky | Professionelle Hochdruckreinigung im Außenbereich für geeignete Terrassen, Einfahrten, Fassaden und Außenflächen, abgestimmt auf Material und Zustand. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/lavado-presion-precision | Servicios de limpieza a presión en el Reino Unido \| Pearly Sky | Limpieza exterior profesional a presión para terrazas, entradas, fachadas y superficies exteriores adecuadas, evaluada según el material y su estado. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/idropulizia-precisione | Servizi di idropulizia nel Regno Unito \| Pearly Sky | Idropulizia professionale per esterni su terrazze, vialetti, facciate e superfici esterne idonee, valutata in base al materiale e alle condizioni. |

### Service — High-Security Property Care

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-15-security-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/high-security-property-care | Discreet Property Care Services in the UK \| Pearly Sky | Discreet cleaning and property-care support for private residences and controlled-access locations, with service arrangements tailored to client requirements. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/entretien-proprietes-haute-securite | Entretien discret de propriétés au Royaume-Uni \| Pearly Sky | Nettoyage discret et entretien de propriétés pour résidences privées et sites à accès contrôlé, avec des modalités adaptées aux exigences de chaque client. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/objektpflege-hochsicherheit | Diskrete Objektpflege im Vereinigten Königreich \| Pearly Sky | Diskrete Reinigung und Objektpflege für Privatresidenzen und zugangsbeschränkte Standorte, mit individuell auf Kundenanforderungen abgestimmten Leistungen. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/mantenimiento-alta-seguridad | Servicios discretos de cuidado de propiedades en el Reino Unido \| Pearly Sky | Limpieza discreta y cuidado de propiedades para residencias privadas y lugares de acceso controlado, con condiciones de servicio adaptadas a cada cliente. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/manutenzione-alta-sicurezza | Servizi discreti di cura della proprietà nel Regno Unito \| Pearly Sky | Pulizia discreta e cura della proprietà per residenze private e luoghi ad accesso controllato, con modalità di servizio su misura per le esigenze del cliente. |

### Service — Luxury Yacht Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/luxury-yacht-cleaning | Luxury Yacht Cleaning & Marine Care \| Pearly Sky UK | Premium cleaning and detailing support for yachts and marine interiors, including suitable interior surfaces, fabrics and exterior areas by arrangement. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-yachts-luxe | Nettoyage de yachts de luxe & entretien nautique \| Pearly Sky UK | Nettoyage et detailing haut de gamme pour yachts et intérieurs nautiques, incluant surfaces intérieures adaptées, textiles et zones extérieures sur demande. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/yachtreinigung-luxus | Luxusyacht-Reinigung & Bootspflege \| Pearly Sky UK | Hochwertige Reinigung und Detailing für Yachten und maritime Innenräume, einschließlich geeigneter Innenflächen, Textilien und Außenbereiche nach Vereinbarung. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-yates-lujo | Limpieza de yates de lujo y cuidado náutico \| Pearly Sky UK | Limpieza y detailing premium para yates e interiores náuticos, incluidas superficies interiores adecuadas, tejidos y zonas exteriores bajo acuerdo. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-yacht-lusso | Pulizia di yacht di lusso e cura nautica \| Pearly Sky UK | Pulizia e detailing premium per yacht e interni nautici, incluse superfici interne idonee, tessuti e aree esterne su accordo. |

### Service — Child Care Service

**Flow:** Booking + quotation  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-care-support-services-1-child-care-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/child-care-service | Childcare Support Services in the UK \| Pearly Sky | Trusted childcare support for families in the UK, with service arrangements tailored to each household’s needs and local availability. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/service-garde-enfants | Services de garde d'enfants au Royaume-Uni \| Pearly Sky | Une aide à la garde d'enfants de confiance pour les familles au Royaume-Uni, avec des modalités adaptées aux besoins de chaque foyer et aux disponibilités locales. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/kinderbetreuung | Kinderbetreuung im Vereinigten Königreich \| Pearly Sky | Vertrauensvolle Kinderbetreuung für Familien im Vereinigten Königreich, mit Leistungen, die auf die Bedürfnisse jedes Haushalts und die Verfügbarkeit vor Ort abgestimmt sind. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/cuidado-infantil | Servicios de apoyo al cuidado infantil en el Reino Unido \| Pearly Sky | Apoyo de confianza en el cuidado infantil para familias en el Reino Unido, con condiciones de servicio adaptadas a las necesidades de cada hogar y a la disponibilidad local. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/assistenza-infanzia | Servizi di assistenza all'infanzia nel Regno Unito \| Pearly Sky | Assistenza all'infanzia affidabile per le famiglie nel Regno Unito, con modalità di servizio su misura per le esigenze di ogni nucleo familiare e la disponibilità locale. |

### Service — Elder Care Service

**Flow:** Booking + quotation  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-care-support-services-2-elder-care-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/elder-care-service | Senior Support & Home Assistance in the UK \| Pearly Sky | Respectful home-support and companionship services for seniors, tailored to daily routines, household needs and local availability. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/service-aide-personnes-agees | Aide et accompagnement à domicile des seniors au Royaume-Uni \| Pearly Sky | Services respectueux d'aide à domicile et de compagnie pour les seniors, adaptés aux habitudes quotidiennes, aux besoins du foyer et aux disponibilités locales. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/seniorenbetreuung | Seniorenbetreuung & Haushaltshilfe im Vereinigten Königreich \| Pearly Sky | Respektvolle Unterstützung im Haushalt und Gesellschaft für Senioren, abgestimmt auf den Tagesablauf, die Bedürfnisse des Haushalts und die Verfügbarkeit vor Ort. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/cuidado-personas-mayores | Apoyo a mayores y asistencia en el hogar en el Reino Unido \| Pearly Sky | Servicios respetuosos de ayuda en el hogar y compañía para personas mayores, adaptados a sus rutinas diarias, a las necesidades del hogar y a la disponibilidad local. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/assistenza-anziani | Assistenza agli anziani e supporto domestico nel Regno Unito \| Pearly Sky | Servizi rispettosi di supporto domestico e compagnia per anziani, su misura per le abitudini quotidiane, le esigenze della casa e la disponibilità locale. |

## Request-a-quote pages

*Metadata source:* Built in `app/(site)/services/[serviceSlug]/request-quotation/page.tsx` from the service's localized name.

### Request a Quote — Regular Home Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/regular-home-cleaning/request-quotation | Request a Quote — Regular Home Cleaning \| Pearly Sky | Request a free, no-obligation quote for regular home cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-regulier/request-quotation | Demander un Devis — Nettoyage Régulier \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage régulier avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-regelmaessig/request-quotation | Angebot Anfordern — Regelmäßige Hausreinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Regelmäßige Hausreinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-regular-hogar/request-quotation | Solicitar un Presupuesto — Limpieza Regular del Hogar \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza regular del hogar con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-regolare-casa/request-quotation | Richiedi un Preventivo — Pulizia Regolare della Casa \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia regolare della casa con Pearly Sky nel Regno Unito. |

### Request a Quote — Quick Touch-Up Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/quick-touch-up-cleaning/request-quotation | Request a Quote — Quick Touch-Up Cleaning \| Pearly Sky | Request a free, no-obligation quote for quick touch-up cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-express/request-quotation | Demander un Devis — Nettoyage Express \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage express avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/schnellreinigung/request-quotation | Angebot Anfordern — Schnellreinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Schnellreinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-rapida/request-quotation | Solicitar un Presupuesto — Limpieza Rápida \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza rápida con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-rapida/request-quotation | Richiedi un Preventivo — Pulizia Rapida \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia rapida con Pearly Sky nel Regno Unito. |

### Request a Quote — Same-Day Priority Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-3-last-minute-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/same-day-priority-cleaning/request-quotation | Request a Quote — Same-Day Priority Cleaning \| Pearly Sky | Request a free, no-obligation quote for same-day priority cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-prioritaire-jour-meme/request-quotation | Demander un Devis — Nettoyage Prioritaire le Jour Même \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage prioritaire le jour même avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-noch-heute/request-quotation | Angebot Anfordern — Prioritäre Reinigung am Selben Tag \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Prioritäre Reinigung am Selben Tag bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-prioritaria-mismo-dia/request-quotation | Solicitar un Presupuesto — Limpieza Prioritaria el Mismo Día \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza prioritaria el mismo día con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-prioritaria-in-giornata/request-quotation | Richiedi un Preventivo — Pulizia Prioritaria in Giornata \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia prioritaria in giornata con Pearly Sky nel Regno Unito. |

### Request a Quote — Deep Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-4-deep-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/deep-cleaning/request-quotation | Request a Quote — Deep Cleaning \| Pearly Sky | Request a free, no-obligation quote for deep cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-en-profondeur/request-quotation | Demander un Devis — Nettoyage en Profondeur \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage en profondeur avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/grundreinigung/request-quotation | Angebot Anfordern — Grundreinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Grundreinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-profunda/request-quotation | Solicitar un Presupuesto — Limpieza Profunda \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza profunda con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-approfondita/request-quotation | Richiedi un Preventivo — Pulizia Approfondita \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia approfondita con Pearly Sky nel Regno Unito. |

### Request a Quote — End of Tenancy Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-5-move-in-out-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/end-of-tenancy-cleaning/request-quotation | Request a Quote — End of Tenancy Cleaning \| Pearly Sky | Request a free, no-obligation quote for end of tenancy cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-fin-de-bail/request-quotation | Demander un Devis — Nettoyage de Fin de Bail \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage de fin de bail avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/endreinigung-auszug/request-quotation | Angebot Anfordern — Endreinigung bei Auszug \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Endreinigung bei Auszug bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-fin-contrato/request-quotation | Solicitar un Presupuesto — Limpieza de Fin de Contrato \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza de fin de contrato con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-fine-locazione/request-quotation | Richiedi un Preventivo — Pulizia di Fine Locazione \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia di fine locazione con Pearly Sky nel Regno Unito. |

### Request a Quote — Post-Construction & Renovation Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-6-post-construction-renovation-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/post-construction-renovation-cleaning/request-quotation | Request a Quote — Post-Construction & Renovation Cleaning \| Pearly Sky | Request a free, no-obligation quote for post-construction & renovation cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-post-travaux/request-quotation | Demander un Devis — Nettoyage Post-Travaux & Rénovation \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage post-travaux & rénovation avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-nach-bauarbeiten/request-quotation | Angebot Anfordern — Reinigung nach Bauarbeiten & Renovierung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Reinigung nach Bauarbeiten & Renovierung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-post-obra/request-quotation | Solicitar un Presupuesto — Limpieza Post-Obra y Reforma \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza post-obra y reforma con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-post-costruzione/request-quotation | Richiedi un Preventivo — Pulizia Post-Costruzione e Ristrutturazione \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia post-costruzione e ristrutturazione con Pearly Sky nel Regno Unito. |

### Request a Quote — Premium Rental Concierge Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-7-airbnb-short-term-rental-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/premium-rental-concierge-cleaning/request-quotation | Request a Quote — Premium Rental Concierge Cleaning \| Pearly Sky | Request a free, no-obligation quote for premium rental concierge cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/conciergerie-menage-locations-premium/request-quotation | Demander un Devis — Conciergerie Ménage pour Locations Premium \| Pearly Sky | Demandez un devis gratuit et sans engagement pour conciergerie ménage pour locations premium avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/concierge-reinigung-vermietung/request-quotation | Angebot Anfordern — Premium-Concierge-Reinigung für Vermietungen \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Premium-Concierge-Reinigung für Vermietungen bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-concierge-alquileres/request-quotation | Solicitar un Presupuesto — Limpieza Concierge Premium para Alquileres \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza concierge premium para alquileres con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-concierge-affitti/request-quotation | Richiedi un Preventivo — Pulizia Concierge Premium per Affitti \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia concierge premium per affitti con Pearly Sky nel Regno Unito. |

### Request a Quote — Commercial & Office Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-8-commercial-office-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/commercial-office-cleaning/request-quotation | Request a Quote — Commercial & Office Cleaning \| Pearly Sky | Request a free, no-obligation quote for commercial & office cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-bureaux-commercial/request-quotation | Demander un Devis — Nettoyage de Bureaux & Locaux Commerciaux \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage de bureaux & locaux commerciaux avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/gewerbe-bueroreinigung/request-quotation | Angebot Anfordern — Gewerbe- & Büroreinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Gewerbe- & Büroreinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-comercial-oficinas/request-quotation | Solicitar un Presupuesto — Limpieza Comercial y de Oficinas \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza comercial y de oficinas con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-commerciale-uffici/request-quotation | Richiedi un Preventivo — Pulizia Commerciale e di Uffici \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia commerciale e di uffici con Pearly Sky nel Regno Unito. |

### Request a Quote — HealthGuard-Sanitization

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/healthguard-sanitization/request-quotation | Request a Quote — HealthGuard-Sanitization \| Pearly Sky | Request a free, no-obligation quote for healthguard-sanitization with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/desinfection-healthguard/request-quotation | Demander un Devis — Désinfection HealthGuard \| Pearly Sky | Demandez un devis gratuit et sans engagement pour désinfection healthguard avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/healthguard-desinfektion/request-quotation | Angebot Anfordern — HealthGuard-Desinfektion \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für HealthGuard-Desinfektion bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/desinfeccion-healthguard/request-quotation | Solicitar un Presupuesto — Desinfección HealthGuard \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para desinfección healthguard con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/sanificazione-healthguard/request-quotation | Richiedi un Preventivo — Sanificazione HealthGuard \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per sanificazione healthguard con Pearly Sky nel Regno Unito. |

### Request a Quote — Steam Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-11-steam-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/steam-cleaning/request-quotation | Request a Quote — Steam Cleaning \| Pearly Sky | Request a free, no-obligation quote for steam cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-vapeur/request-quotation | Demander un Devis — Nettoyage à la Vapeur \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage à la vapeur avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/dampfreinigung/request-quotation | Angebot Anfordern — Dampfreinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Dampfreinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-vapor/request-quotation | Solicitar un Presupuesto — Limpieza a Vapor \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza a vapor con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-vapore/request-quotation | Richiedi un Preventivo — Pulizia a Vapore \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia a vapore con Pearly Sky nel Regno Unito. |

### Request a Quote — Post-Event Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-12-post-event-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/post-event-cleaning/request-quotation | Request a Quote — Post-Event Cleaning \| Pearly Sky | Request a free, no-obligation quote for post-event cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-post-evenement/request-quotation | Demander un Devis — Nettoyage Après Événement \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage après événement avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/reinigung-nach-veranstaltung/request-quotation | Angebot Anfordern — Reinigung nach Veranstaltungen \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Reinigung nach Veranstaltungen bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-post-evento/request-quotation | Solicitar un Presupuesto — Limpieza Post-Evento \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza post-evento con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-post-evento/request-quotation | Richiedi un Preventivo — Pulizia Post-Evento \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia post-evento con Pearly Sky nel Regno Unito. |

### Request a Quote — High-Security Property Care

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-15-security-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/high-security-property-care/request-quotation | Request a Quote — High-Security Property Care \| Pearly Sky | Request a free, no-obligation quote for high-security property care with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/entretien-proprietes-haute-securite/request-quotation | Demander un Devis — Entretien de Propriétés Haute Sécurité \| Pearly Sky | Demandez un devis gratuit et sans engagement pour entretien de propriétés haute sécurité avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/objektpflege-hochsicherheit/request-quotation | Angebot Anfordern — Hochsicherheits-Objektpflege \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Hochsicherheits-Objektpflege bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/mantenimiento-alta-seguridad/request-quotation | Solicitar un Presupuesto — Mantenimiento de Propiedades de Alta Seguridad \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para mantenimiento de propiedades de alta seguridad con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/manutenzione-alta-sicurezza/request-quotation | Richiedi un Preventivo — Manutenzione di Proprietà ad Alta Sicurezza \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per manutenzione di proprietà ad alta sicurezza con Pearly Sky nel Regno Unito. |

### Request a Quote — Luxury Yacht Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/luxury-yacht-cleaning/request-quotation | Request a Quote — Luxury Yacht Cleaning \| Pearly Sky | Request a free, no-obligation quote for luxury yacht cleaning with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-yachts-luxe/request-quotation | Demander un Devis — Nettoyage de Yachts de Luxe \| Pearly Sky | Demandez un devis gratuit et sans engagement pour nettoyage de yachts de luxe avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/yachtreinigung-luxus/request-quotation | Angebot Anfordern — Luxusyacht-Reinigung \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Luxusyacht-Reinigung bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/limpieza-yates-lujo/request-quotation | Solicitar un Presupuesto — Limpieza de Yates de Lujo \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para limpieza de yates de lujo con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/pulizia-yacht-lusso/request-quotation | Richiedi un Preventivo — Pulizia di Yacht di Lusso \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per pulizia di yacht di lusso con Pearly Sky nel Regno Unito. |

### Request a Quote — Laundry Service

**Flow:** Quotation only  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-care-support-services-3-laundry-services.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/laundry-service/request-quotation | Request a Quote — Laundry Service \| Pearly Sky | Request a free, no-obligation quote for laundry service with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/service-blanchisserie/request-quotation | Demander un Devis — Service de Blanchisserie \| Pearly Sky | Demandez un devis gratuit et sans engagement pour service de blanchisserie avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/waeschedienst/request-quotation | Angebot Anfordern — Wäscheservice \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Wäscheservice bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/servicio-lavanderia/request-quotation | Solicitar un Presupuesto — Servicio de Lavandería \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para servicio de lavandería con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/servizio-lavanderia/request-quotation | Richiedi un Preventivo — Servizio di Lavanderia \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per servizio di lavanderia con Pearly Sky nel Regno Unito. |

### Request a Quote — Move-In / Move-Out Transport Service

**Flow:** Quotation only  
**og:image:** `https://pearlyskyglobalclean.co.uk/images/services/updated-care-support-services-4-move-in-out-transport-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.co.uk/en/services/move-in-out-transport-service/request-quotation | Request a Quote — Move-In / Move-Out Transport Service \| Pearly Sky | Request a free, no-obligation quote for move-in / move-out transport service with Pearly Sky in the UK. |
| `fr` | https://pearlyskyglobalclean.co.uk/fr/services/service-transport-demenagement/request-quotation | Demander un Devis — Service de Transport Déménagement \| Pearly Sky | Demandez un devis gratuit et sans engagement pour service de transport déménagement avec Pearly Sky au Royaume-Uni. |
| `de` | https://pearlyskyglobalclean.co.uk/de/services/umzugstransport/request-quotation | Angebot Anfordern — Umzugstransport-Service \| Pearly Sky | Fordern Sie ein kostenloses und unverbindliches Angebot für Umzugstransport-Service bei Pearly Sky im Vereinigten Königreich an. |
| `es` | https://pearlyskyglobalclean.co.uk/es/services/transporte-mudanza/request-quotation | Solicitar un Presupuesto — Servicio de Transporte de Mudanza \| Pearly Sky | Solicite un presupuesto gratuito y sin compromiso para servicio de transporte de mudanza con Pearly Sky en el Reino Unido. |
| `it` | https://pearlyskyglobalclean.co.uk/it/services/trasporto-trasloco/request-quotation | Richiedi un Preventivo — Servizio di Trasporto Trasloco \| Pearly Sky | Richiedi un preventivo gratuito e senza impegno per servizio di trasporto trasloco con Pearly Sky nel Regno Unito. |

## Redirects

These URLs exist but answer with a **308 permanent redirect**: the quotation form for these services lives on the service page itself
(`QUOTE_ON_SERVICE_PAGE` in `lib/service-flows.ts`). **They are excluded from `sitemap.xml`**; the page each one redirects to is listed instead
(see [Service pages](#service-pages)). The live sitemap still lists them until the current code is deployed.

| From | To |
|---|---|
| https://pearlyskyglobalclean.co.uk/en/services/carpet-upholstery-cleaning/request-quotation | https://pearlyskyglobalclean.co.uk/en/services/carpet-upholstery-cleaning |
| https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-tapis-canapes/request-quotation | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-tapis-canapes |
| https://pearlyskyglobalclean.co.uk/de/services/teppich-polsterreinigung/request-quotation | https://pearlyskyglobalclean.co.uk/de/services/teppich-polsterreinigung |
| https://pearlyskyglobalclean.co.uk/es/services/limpieza-alfombras-tapiceria/request-quotation | https://pearlyskyglobalclean.co.uk/es/services/limpieza-alfombras-tapiceria |
| https://pearlyskyglobalclean.co.uk/it/services/pulizia-tappeti-divani/request-quotation | https://pearlyskyglobalclean.co.uk/it/services/pulizia-tappeti-divani |
| https://pearlyskyglobalclean.co.uk/en/services/pool-cleaning/request-quotation | https://pearlyskyglobalclean.co.uk/en/services/pool-cleaning |
| https://pearlyskyglobalclean.co.uk/fr/services/entretien-piscine/request-quotation | https://pearlyskyglobalclean.co.uk/fr/services/entretien-piscine |
| https://pearlyskyglobalclean.co.uk/de/services/poolreinigung/request-quotation | https://pearlyskyglobalclean.co.uk/de/services/poolreinigung |
| https://pearlyskyglobalclean.co.uk/es/services/limpieza-piscinas/request-quotation | https://pearlyskyglobalclean.co.uk/es/services/limpieza-piscinas |
| https://pearlyskyglobalclean.co.uk/it/services/pulizia-piscine/request-quotation | https://pearlyskyglobalclean.co.uk/it/services/pulizia-piscine |
| https://pearlyskyglobalclean.co.uk/en/services/precision-pressure-washing/request-quotation | https://pearlyskyglobalclean.co.uk/en/services/precision-pressure-washing |
| https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-haute-pression/request-quotation | https://pearlyskyglobalclean.co.uk/fr/services/nettoyage-haute-pression |
| https://pearlyskyglobalclean.co.uk/de/services/hochdruckreinigung/request-quotation | https://pearlyskyglobalclean.co.uk/de/services/hochdruckreinigung |
| https://pearlyskyglobalclean.co.uk/es/services/lavado-presion-precision/request-quotation | https://pearlyskyglobalclean.co.uk/es/services/lavado-presion-precision |
| https://pearlyskyglobalclean.co.uk/it/services/idropulizia-precisione/request-quotation | https://pearlyskyglobalclean.co.uk/it/services/idropulizia-precisione |
| https://pearlyskyglobalclean.co.uk/en/services/child-care-service/request-quotation | https://pearlyskyglobalclean.co.uk/en/services/child-care-service |
| https://pearlyskyglobalclean.co.uk/fr/services/service-garde-enfants/request-quotation | https://pearlyskyglobalclean.co.uk/fr/services/service-garde-enfants |
| https://pearlyskyglobalclean.co.uk/de/services/kinderbetreuung/request-quotation | https://pearlyskyglobalclean.co.uk/de/services/kinderbetreuung |
| https://pearlyskyglobalclean.co.uk/es/services/cuidado-infantil/request-quotation | https://pearlyskyglobalclean.co.uk/es/services/cuidado-infantil |
| https://pearlyskyglobalclean.co.uk/it/services/assistenza-infanzia/request-quotation | https://pearlyskyglobalclean.co.uk/it/services/assistenza-infanzia |
| https://pearlyskyglobalclean.co.uk/en/services/elder-care-service/request-quotation | https://pearlyskyglobalclean.co.uk/en/services/elder-care-service |
| https://pearlyskyglobalclean.co.uk/fr/services/service-aide-personnes-agees/request-quotation | https://pearlyskyglobalclean.co.uk/fr/services/service-aide-personnes-agees |
| https://pearlyskyglobalclean.co.uk/de/services/seniorenbetreuung/request-quotation | https://pearlyskyglobalclean.co.uk/de/services/seniorenbetreuung |
| https://pearlyskyglobalclean.co.uk/es/services/cuidado-personas-mayores/request-quotation | https://pearlyskyglobalclean.co.uk/es/services/cuidado-personas-mayores |
| https://pearlyskyglobalclean.co.uk/it/services/assistenza-anziani/request-quotation | https://pearlyskyglobalclean.co.uk/it/services/assistenza-anziani |

Other redirects handled in code: an unprefixed URL (e.g. `/about-us`) 308-redirects to the visitor's language (`/en/about-us`);
a service URL using another language's slug 308-redirects to the current language's slug (e.g. `/fr/services/regular-home-cleaning` → `/fr/services/nettoyage-regulier`).

## Private & utility routes

These pages exist but are not meant for search engines: they have no metadata of their own (they use the fallback title
“Pearly Sky” and description “Cleaning services, booking, and account management.”), no canonical, and are disallowed in robots.txt.

| Route | Purpose |
|---|---|
| `/login` | Customer login |
| `/signup` | Customer sign-up |
| `/{language}/forgot-password` | Password reset |
| `/{language}/checkout` | Checkout |
| `/{language}/payment-confirmation` | Payment confirmation |
| `/{language}/booking-confirmation/{bookingId}` | Booking confirmation |
| `/{language}/quotation-confirmation/{quotationId}` | Quotation confirmation |
| `/{language}/services/{slug}/checkout` | Service checkout |
| `/{language}/services/{slug}/form-submit` | Form submitted |
| `/{language}/careers/{jobId}/apply` | Job application |
| `/{language}/request-a-detailed-quotation` | Redirects to a service's /request-quotation page |
| `/profile, /addresses, /bookings, /quotations` | Customer account area (login required) |
| `/staff/*` | Staff dashboard (login required) |

## robots.txt

Generated by `app/robots.ts`:

```text
User-Agent: *
Allow: /
Disallow: /login
Disallow: /signup
Disallow: /staff/*
Disallow: /profile
Disallow: /addresses
Disallow: /bookings*
Disallow: /quotations*
Disallow: /dashboard*
Disallow: /forgot-password
Disallow: /*/forgot-password
Disallow: /booking-confirmation/*
Disallow: /quotation-confirmation/*
Disallow: /services/*/checkout
Disallow: /services/*/form-submit
Disallow: /careers/*/apply
Disallow: /checkout
Disallow: /payment-confirmation
Disallow: /*/booking-confirmation/*
Disallow: /*/quotation-confirmation/*
Disallow: /*/services/*/checkout
Disallow: /*/services/*/form-submit
Disallow: /*/careers/*/apply
Disallow: /*/checkout
Disallow: /*/payment-confirmation
Disallow: /api/*

User-Agent: Googlebot
Allow: /
Allow: /api/catalog/
Allow: /api/countries
Disallow: /login
Disallow: /signup
Disallow: /staff/*
Disallow: /profile
Disallow: /addresses
Disallow: /bookings*
Disallow: /quotations*
Disallow: /dashboard*
Disallow: /forgot-password
Disallow: /*/forgot-password
Disallow: /booking-confirmation/*
Disallow: /quotation-confirmation/*
Disallow: /services/*/checkout
Disallow: /services/*/form-submit
Disallow: /careers/*/apply
Disallow: /checkout
Disallow: /payment-confirmation
Disallow: /*/booking-confirmation/*
Disallow: /*/quotation-confirmation/*
Disallow: /*/services/*/checkout
Disallow: /*/services/*/form-submit
Disallow: /*/careers/*/apply
Disallow: /*/checkout
Disallow: /*/payment-confirmation
Disallow: /api/*
Disallow: /api/auth/

Sitemap: https://pearlyskyglobalclean.co.uk/sitemap.xml
```
