# France site — URLs & metadata

**Domain:** https://pearlyskyglobalclean.fr  
**Deployment setting:** `NEXT_PUBLIC_COUNTRY=fr`, `NEXT_PUBLIC_SITE_URL=https://pearlyskyglobalclean.fr`  
**Languages:** English (`/en`), French (`/fr`), German (`/de`), Spanish (`/es`), Italian (`/it`)  
**Generated:** 2026-10-07, from the source code in this repository (frontend + backend seed data) — not from the live site.

> This reflects the code as it is now, including changes not yet deployed. Service pages assume the database holds what
> `backend/src/database/seed-fr.ts` seeds (all services active, no extra per-country SEO overrides added from the staff dashboard).
> Anything edited in the database after seeding would change the service titles, descriptions or slugs listed here.

## Summary

| | Count |
|---|---|
| Public page URLs | 255 |
| …listed in `sitemap.xml` | 255 |
| Redirecting URLs (308) — **not** in `sitemap.xml` | 25 |
| Private / utility routes (blocked in robots.txt) | 13 patterns |

### Sitemap changes not yet deployed

The live `sitemap.xml` (checked 2026-10-07) has 260 URLs. The current code produces 255:

- **Removed 25:** the `/request-quotation` URLs listed under [Redirects](#redirects). They 308-redirect, so the sitemap no longer lists them (`hasQuotationPage()` in `lib/service-flows.ts`).
- **Added 20:** pages that return 200 but were missing from the sitemap:
  - https://pearlyskyglobalclean.fr/en/cookie-policy
  - https://pearlyskyglobalclean.fr/fr/cookie-policy
  - https://pearlyskyglobalclean.fr/de/cookie-policy
  - https://pearlyskyglobalclean.fr/es/cookie-policy
  - https://pearlyskyglobalclean.fr/it/cookie-policy
  - https://pearlyskyglobalclean.fr/en/services/carpet-upholstery-cleaning
  - https://pearlyskyglobalclean.fr/fr/services/nettoyage-tapis-canapes
  - https://pearlyskyglobalclean.fr/de/services/teppich-polsterreinigung
  - https://pearlyskyglobalclean.fr/es/services/limpieza-alfombras-tapiceria
  - https://pearlyskyglobalclean.fr/it/services/pulizia-tappeti-divani
  - https://pearlyskyglobalclean.fr/en/services/pool-cleaning
  - https://pearlyskyglobalclean.fr/fr/services/entretien-piscine
  - https://pearlyskyglobalclean.fr/de/services/poolreinigung
  - https://pearlyskyglobalclean.fr/es/services/limpieza-piscinas
  - https://pearlyskyglobalclean.fr/it/services/pulizia-piscine
  - https://pearlyskyglobalclean.fr/en/services/precision-pressure-washing
  - https://pearlyskyglobalclean.fr/fr/services/nettoyage-haute-pression
  - https://pearlyskyglobalclean.fr/de/services/hochdruckreinigung
  - https://pearlyskyglobalclean.fr/es/services/lavado-presion-precision
  - https://pearlyskyglobalclean.fr/it/services/idropulizia-precisione

**Contents:** [Main pages](#main-pages) · [Legal pages](#legal-pages) · [Blog posts](#blog-posts) · [Job postings](#job-postings) · [Service pages](#service-pages) · [Request-a-quote pages](#request-a-quote-pages) · [Redirects](#redirects) · [Private & utility routes](#private--utility-routes) · [robots.txt](#robotstxt)

## Site-wide metadata

Set in `app/layout.tsx` and `lib/countries/seo.ts` (`buildSocialMeta`), applied to every page unless the page overrides it:

| Field | Value |
|---|---|
| `metadataBase` | `https://pearlyskyglobalclean.fr` (relative canonicals and image paths resolve against it) |
| `<html lang>` | `{language}-FR` — e.g. `en-FR`, `fr-FR` |
| `og:site_name` | Pearly Sky |
| `og:type` | website |
| `twitter:card` | summary_large_image |
| Default `og:image` / `twitter:image` | `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp` (pages with their own image: blog posts, services) |
| `og:title` / `og:description` | Same as the page's title / description unless noted |
| Fallback title (pages with no metadata of their own) | Pearly Sky |
| Fallback description | Cleaning services, booking, and account management. |

### Canonical & hreflang

- **Canonical:** every page's canonical is its own URL (verified for all URLs in this file).
- **hreflang:** every page lists 16 alternates — `x-default`, plus each of the 5 languages on each of the 3 country domains:
  `en-FR … it-FR` → pearlyskyglobalclean.fr, `en-GB … it-GB` → pearlyskyglobalclean.co.uk, `en-LK … it-LK` → pearlyskyglobalclean.lk.
  The path for each language is the same on all three domains (the URLs in each page's table below), and
  `x-default` points to this site's English URL. Verified for every URL in this file.

## Main pages

*Metadata source:* `lib/countries/meta-data.ts` (`getCountryPageMeta`), translated via `lib/countries/meta-templates.ts`; `/our-services` is hard-coded in `app/(site)/our-services/page.tsx`.

### Home

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en | Premium Eco-Luxury Cleaning Services France \| Pearly Sky | Experience elite, eco-luxury residential & commercial cleaning in France. Five-star premium property care using sustainable, high-performance practices. |
| `fr` | https://pearlyskyglobalclean.fr/fr | Services de Nettoyage Éco-Luxe Premium France \| Pearly Sky | Découvrez un service de nettoyage résidentiel et commercial éco-luxe d'élite en France. Entretien immobilier cinq étoiles avec des pratiques durables et hautement performantes. |
| `de` | https://pearlyskyglobalclean.fr/de | Premium Eco-Luxus-Reinigungsdienste Frankreich \| Pearly Sky | Erleben Sie elitäre Eco-Luxus-Reinigung für Wohn- und Gewerbeimmobilien in Frankreich. Fünf-Sterne-Immobilienpflege mit nachhaltigen, leistungsstarken Methoden. |
| `es` | https://pearlyskyglobalclean.fr/es | Servicios Premium de Limpieza Eco-Lujo Francia \| Pearly Sky | Descubra un servicio de limpieza residencial y comercial eco-lujo de primer nivel en Francia. Cuidado de propiedades cinco estrellas con prácticas sostenibles y de alto rendimiento. |
| `it` | https://pearlyskyglobalclean.fr/it | Servizi Premium di Pulizia Eco-Luxury Francia \| Pearly Sky | Scopri un servizio di pulizia residenziale e commerciale eco-luxury d'élite in Francia. Cura della proprietà a cinque stelle con pratiche sostenibili e ad alte prestazioni. |

### About Us

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/about-us | About Us: Eco-Luxury Property Care France \| Pearly Sky | Discover the story, strict standards, and values driving Pearly Sky Global in France. Dedicated to elite property care and lifestyle support. |
| `fr` | https://pearlyskyglobalclean.fr/fr/about-us | À Propos : Entretien de Propriétés Éco-Luxe France \| Pearly Sky | Découvrez l'histoire, les normes strictes et les valeurs qui animent Pearly Sky Global en France. Dédiés à l'entretien immobilier d'élite et au soutien lifestyle. |
| `de` | https://pearlyskyglobalclean.fr/de/about-us | Über Uns: Eco-Luxus-Immobilienpflege Frankreich \| Pearly Sky | Entdecken Sie die Geschichte, die strengen Standards und die Werte von Pearly Sky Global in Frankreich. Wir engagieren uns für erstklassige Immobilienpflege und Lifestyle-Unterstützung. |
| `es` | https://pearlyskyglobalclean.fr/es/about-us | Sobre Nosotros: Cuidado de Propiedades Eco-Lujo Francia \| Pearly Sky | Descubra la historia, los estrictos estándares y los valores que impulsan a Pearly Sky Global en Francia. Dedicados al cuidado de propiedades de élite y al soporte de estilo de vida. |
| `it` | https://pearlyskyglobalclean.fr/it/about-us | Chi Siamo: Cura di Proprietà Eco-Luxury Francia \| Pearly Sky | Scopri la storia, gli standard rigorosi e i valori che guidano Pearly Sky Global in Francia. Dedicati alla cura delle proprietà d'élite e al supporto lifestyle. |

### Our Customers

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/our-customers | Verified Client Reviews & Testimonials France \| Pearly Sky | See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/our-customers | Avis et Témoignages Clients Vérifiés France \| Pearly Sky | Découvrez ce que nos clients disent de nous. Avis vérifiés de propriétaires premium, de bureaux d'entreprise et de propriétés de luxe en France. |
| `de` | https://pearlyskyglobalclean.fr/de/our-customers | Verifizierte Kundenbewertungen & Erfahrungsberichte Frankreich \| Pearly Sky | Erfahren Sie, was unsere Kunden über uns sagen. Verifizierte Bewertungen von Premium-Hausbesitzern, Unternehmen und Luxusimmobilien in Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/our-customers | Opiniones y Testimonios Verificados de Clientes Francia \| Pearly Sky | Descubra lo que dicen nuestros clientes. Opiniones verificadas de propietarios premium, oficinas corporativas y propiedades de lujo en Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/our-customers | Recensioni e Testimonianze Verificate dei Clienti Francia \| Pearly Sky | Scopri cosa dicono di noi i nostri clienti. Recensioni verificate di proprietari premium, uffici aziendali e proprietà di lusso in Francia. |

### Our Locations

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/our-locations | Our Service Locations in France \| Pearly Sky Global | Operating premium service clusters across France. Find your local Pearly Sky Global service portal and book elite eco-luxury care. |
| `fr` | https://pearlyskyglobalclean.fr/fr/our-locations | Nos Zones de Service France \| Pearly Sky Global | Des clusters de service premium en France. Trouvez votre portail de service Pearly Sky Global local et réservez un entretien éco-luxe d'élite. |
| `de` | https://pearlyskyglobalclean.fr/de/our-locations | Unsere Servicestandorte Frankreich \| Pearly Sky Global | Premium-Servicecluster in Frankreich. Finden Sie Ihr lokales Pearly Sky Global Serviceportal und buchen Sie erstklassige Eco-Luxus-Pflege. |
| `es` | https://pearlyskyglobalclean.fr/es/our-locations | Nuestras Ubicaciones de Servicio Francia \| Pearly Sky Global | Clústeres de servicio premium en Francia. Encuentre su portal de servicio local de Pearly Sky Global y reserve un cuidado eco-lujo de primer nivel. |
| `it` | https://pearlyskyglobalclean.fr/it/our-locations | Le Nostre Sedi di Servizio Francia \| Pearly Sky Global | Cluster di servizio premium in Francia. Trova il tuo portale di servizio Pearly Sky Global locale e prenota una cura eco-luxury d'élite. |

### Blog

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/blog | Eco-Luxury Cleaning Blog & Insights France \| Pearly Sky | Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/blog | Blog & Actualités Nettoyage Éco-Luxe France \| Pearly Sky | Conseils professionnels, guides d'entretien durable et insights sur l'entretien immobilier d'élite pour les espaces premium en France. |
| `de` | https://pearlyskyglobalclean.fr/de/blog | Eco-Luxus-Reinigungsblog & Einblicke Frankreich \| Pearly Sky | Professionelle Pflegeratschläge, nachhaltige Haushaltsführungs-Guides und Einblicke in die erstklassige Immobilienpflege für Premium-Räume in Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/blog | Blog e Ideas de Limpieza Eco-Lujo Francia \| Pearly Sky | Consejos profesionales de cuidado, guías de limpieza sostenible e ideas sobre el mantenimiento de propiedades de élite para espacios premium en Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/blog | Blog e Approfondimenti sulla Pulizia Eco-Luxury Francia \| Pearly Sky | Consigli professionali, guide alla pulizia sostenibile e approfondimenti sulla manutenzione di proprietà d'élite per spazi premium in Francia. |

### Careers

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/careers | Careers in Luxury Property Care France \| Pearly Sky | Build a rewarding career in luxury property care in France. Explore open positions for professional cleaners and premium specialists. |
| `fr` | https://pearlyskyglobalclean.fr/fr/careers | Carrières dans l'Entretien de Propriétés de Luxe France \| Pearly Sky | Construisez une carrière valorisante dans l'entretien de propriétés de luxe en France. Découvrez nos postes ouverts pour nettoyeurs professionnels et spécialistes premium. |
| `de` | https://pearlyskyglobalclean.fr/de/careers | Karriere in der Luxus-Immobilienpflege Frankreich \| Pearly Sky | Starten Sie eine lohnende Karriere in der Luxus-Immobilienpflege in Frankreich. Entdecken Sie offene Stellen für professionelle Reinigungskräfte und Premium-Spezialisten. |
| `es` | https://pearlyskyglobalclean.fr/es/careers | Carreras en el Cuidado de Propiedades de Lujo Francia \| Pearly Sky | Construya una carrera gratificante en el cuidado de propiedades de lujo en Francia. Explore vacantes para limpiadores profesionales y especialistas premium. |
| `it` | https://pearlyskyglobalclean.fr/it/careers | Carriere nella Cura di Proprietà di Lusso Francia \| Pearly Sky | Costruisci una carriera gratificante nella cura delle proprietà di lusso in Francia. Scopri le posizioni aperte per addetti alle pulizie professionali e specialisti premium. |

### Contact Us

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/contact-us | Contact Our Eco-Luxury Cleaning Team France \| Pearly Sky | Get in touch with Pearly Sky Global France for booking inquiries or custom service quotes. Reliable, immediate assistance. |
| `fr` | https://pearlyskyglobalclean.fr/fr/contact-us | Contactez Notre Équipe de Nettoyage Éco-Luxe France \| Pearly Sky | Contactez Pearly Sky Global en France pour toute demande de réservation ou devis personnalisé. Une assistance fiable et immédiate. |
| `de` | https://pearlyskyglobalclean.fr/de/contact-us | Kontaktieren Sie Unser Eco-Luxus-Reinigungsteam Frankreich \| Pearly Sky | Kontaktieren Sie Pearly Sky Global in Frankreich für Buchungsanfragen oder individuelle Angebote. Zuverlässige, sofortige Unterstützung. |
| `es` | https://pearlyskyglobalclean.fr/es/contact-us | Contacte a Nuestro Equipo de Limpieza Eco-Lujo Francia \| Pearly Sky | Póngase en contacto con Pearly Sky Global en Francia para consultas de reserva o cotizaciones personalizadas. Asistencia confiable e inmediata. |
| `it` | https://pearlyskyglobalclean.fr/it/contact-us | Contatta il Nostro Team di Pulizia Eco-Luxury Francia \| Pearly Sky | Contatta Pearly Sky Global in Francia per richieste di prenotazione o preventivi personalizzati. Assistenza affidabile e immediata. |

### Our Services

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `fr` | https://pearlyskyglobalclean.fr/fr/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `de` | https://pearlyskyglobalclean.fr/de/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `es` | https://pearlyskyglobalclean.fr/es/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |
| `it` | https://pearlyskyglobalclean.fr/it/our-services | Our Services \| Pearly Sky Eco-Luxury Cleaning | Explore our comprehensive suite of residential, commercial, and specialty eco-luxury cleaning services. |

## Legal pages

*Metadata source:* `STATIC_PAGE_META` in `lib/countries/meta-data.ts`.

### Privacy Policy

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/privacy-policy | Privacy Policy \| Pearly Sky | How Pearly Sky collects, uses, shares and protects your personal data when you book our cleaning services, and how to exercise your GDPR rights. | Privacy Policy |
| `fr` | https://pearlyskyglobalclean.fr/fr/privacy-policy | Politique de confidentialité \| Pearly Sky | Comment Pearly Sky collecte, utilise, partage et protège vos données personnelles lorsque vous réservez nos services de nettoyage, et vos droits RGPD. | Politique de confidentialité |
| `de` | https://pearlyskyglobalclean.fr/de/privacy-policy | Datenschutzerklärung \| Pearly Sky | Wie Pearly Sky Ihre personenbezogenen Daten bei der Buchung unserer Reinigungsdienste erhebt, nutzt, weitergibt und schützt – und Ihre DSGVO-Rechte. | Datenschutzerklärung |
| `es` | https://pearlyskyglobalclean.fr/es/privacy-policy | Política de privacidad \| Pearly Sky | Cómo Pearly Sky recopila, utiliza, comparte y protege sus datos personales al reservar nuestros servicios de limpieza, y sus derechos según el RGPD. | Política de privacidad |
| `it` | https://pearlyskyglobalclean.fr/it/privacy-policy | Informativa sulla privacy \| Pearly Sky | Come Pearly Sky raccoglie, utilizza, condivide e protegge i tuoi dati personali quando prenoti i nostri servizi di pulizia, e i tuoi diritti GDPR. | Informativa sulla privacy |

### Cookie Policy

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/cookie-policy | Cookie Policy \| Pearly Sky | Which cookies the Pearly Sky website uses and why, which third parties set cookies, and how you can manage or disable them in your browser. | Cookie Policy |
| `fr` | https://pearlyskyglobalclean.fr/fr/cookie-policy | Politique relative aux cookies \| Pearly Sky | Les cookies utilisés par le site Pearly Sky et leur finalité, les cookies tiers, et comment les gérer ou les désactiver dans votre navigateur. | Politique relative aux cookies |
| `de` | https://pearlyskyglobalclean.fr/de/cookie-policy | Cookie-Richtlinie \| Pearly Sky | Welche Cookies die Pearly-Sky-Website verwendet und wozu, welche Drittanbieter Cookies setzen und wie Sie diese im Browser verwalten oder deaktivieren. | Cookie-Richtlinie |
| `es` | https://pearlyskyglobalclean.fr/es/cookie-policy | Política de cookies \| Pearly Sky | Qué cookies utiliza el sitio web de Pearly Sky y para qué, qué terceros instalan cookies y cómo puede gestionarlas o desactivarlas en su navegador. | Política de cookies |
| `it` | https://pearlyskyglobalclean.fr/it/cookie-policy | Informativa sui cookie \| Pearly Sky | Quali cookie utilizza il sito Pearly Sky e a cosa servono, quali terze parti li installano e come gestirli o disattivarli nel tuo browser. | Informativa sui cookie |

### Terms and Conditions

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description | On-page heading |
|---|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/terms-and-conditions | Terms and Conditions \| Pearly Sky | The terms for using the Pearly Sky website and cleaning services: user responsibilities, intellectual property, liability and governing law. | Terms and Conditions |
| `fr` | https://pearlyskyglobalclean.fr/fr/terms-and-conditions | Conditions générales \| Pearly Sky | Conditions d’utilisation du site et des services Pearly Sky : obligations de l’utilisateur, propriété intellectuelle, responsabilité et droit applicable. | Conditions générales |
| `de` | https://pearlyskyglobalclean.fr/de/terms-and-conditions | Allgemeine Geschäftsbedingungen \| Pearly Sky | Bedingungen für die Nutzung der Website und Reinigungsdienste von Pearly Sky: Pflichten der Nutzer, geistiges Eigentum, Haftung und anwendbares Recht. | Allgemeine Geschäftsbedingungen |
| `es` | https://pearlyskyglobalclean.fr/es/terms-and-conditions | Términos y condiciones \| Pearly Sky | Condiciones de uso del sitio web y los servicios de Pearly Sky: obligaciones del usuario, propiedad intelectual, responsabilidad y ley aplicable. | Términos y condiciones |
| `it` | https://pearlyskyglobalclean.fr/it/terms-and-conditions | Termini e condizioni \| Pearly Sky | Condizioni d’uso del sito e dei servizi Pearly Sky: obblighi dell’utente, proprietà intellettuale, limitazione di responsabilità e legge applicabile. | Termini e condizioni |

## Blog posts

*Metadata source:* `lib/content/blog-posts.ts` — title is `{post title} | Pearly Sky Blog`.

### Blog — The Importance Of Regular Cleaning For A Healthy Home

**og:image:** `https://pearlyskyglobalclean.fr/images/blog/article-1.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/blog/importance-of-regular-cleaning | The Importance Of Regular Cleaning For A Healthy Home \| Pearly Sky Blog | Why a consistent cleaning routine does more for your home than just appearances — and how to keep it up without the effort. |
| `fr` | https://pearlyskyglobalclean.fr/fr/blog/importance-of-regular-cleaning | L’importance d’un ménage régulier pour un intérieur sain \| Pearly Sky Blog | Pourquoi une routine de ménage régulière apporte bien plus à votre intérieur qu’une simple belle apparence — et comment la maintenir sans effort. |
| `de` | https://pearlyskyglobalclean.fr/de/blog/importance-of-regular-cleaning | Warum regelmäßige Reinigung für ein gesundes Zuhause wichtig ist \| Pearly Sky Blog | Warum eine feste Reinigungsroutine Ihrem Zuhause mehr bringt als nur ein schönes Erscheinungsbild — und wie Sie sie mühelos beibehalten. |
| `es` | https://pearlyskyglobalclean.fr/es/blog/importance-of-regular-cleaning | La importancia de una limpieza regular para un hogar saludable \| Pearly Sky Blog | Por qué una rutina de limpieza constante aporta a tu hogar mucho más que buena apariencia — y cómo mantenerla sin esfuerzo. |
| `it` | https://pearlyskyglobalclean.fr/it/blog/importance-of-regular-cleaning | L’importanza delle pulizie regolari per una casa sana \| Pearly Sky Blog | Perché una routine di pulizia costante fa per la tua casa molto più che migliorarne l’aspetto — e come mantenerla senza fatica. |

### Blog — Top 5 Cleaning Tips For Busy Professionals

**og:image:** `https://pearlyskyglobalclean.fr/images/blog/article-2.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/blog/top-5-cleaning-tips | Top 5 Cleaning Tips For Busy Professionals \| Pearly Sky Blog | Get expert advice on how to keep your space clean and organized, even on the busiest of days. |
| `fr` | https://pearlyskyglobalclean.fr/fr/blog/top-5-cleaning-tips | 5 conseils de ménage pour les professionnels pressés \| Pearly Sky Blog | Des conseils d’experts pour garder votre espace propre et organisé, même lors des journées les plus chargées. |
| `de` | https://pearlyskyglobalclean.fr/de/blog/top-5-cleaning-tips | Die 5 besten Reinigungstipps für Berufstätige \| Pearly Sky Blog | Expertentipps, wie Sie Ihre Räume auch an den vollsten Tagen sauber und ordentlich halten. |
| `es` | https://pearlyskyglobalclean.fr/es/blog/top-5-cleaning-tips | 5 consejos de limpieza para profesionales ocupados \| Pearly Sky Blog | Consejos de expertos para mantener tu espacio limpio y ordenado, incluso en los días más ajetreados. |
| `it` | https://pearlyskyglobalclean.fr/it/blog/top-5-cleaning-tips | I 5 migliori consigli di pulizia per professionisti impegnati \| Pearly Sky Blog | Consigli degli esperti per mantenere i tuoi spazi puliti e ordinati, anche nelle giornate più intense. |

### Blog — The Benefits Of Eco-Friendly Cleaning Services

**og:image:** `https://pearlyskyglobalclean.fr/images/blog/article-3.jpeg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/blog/eco-friendly-cleaning | The Benefits Of Eco-Friendly Cleaning Services \| Pearly Sky Blog | Learn about the advantages of choosing eco-friendly cleaning services for your home or business. |
| `fr` | https://pearlyskyglobalclean.fr/fr/blog/eco-friendly-cleaning | Les avantages des services de nettoyage écologiques \| Pearly Sky Blog | Découvrez les avantages de choisir des services de nettoyage écologiques pour votre domicile ou votre entreprise. |
| `de` | https://pearlyskyglobalclean.fr/de/blog/eco-friendly-cleaning | Die Vorteile umweltfreundlicher Reinigungsdienste \| Pearly Sky Blog | Erfahren Sie, welche Vorteile umweltfreundliche Reinigungsdienste für Ihr Zuhause oder Ihr Unternehmen bieten. |
| `es` | https://pearlyskyglobalclean.fr/es/blog/eco-friendly-cleaning | Las ventajas de los servicios de limpieza ecológicos \| Pearly Sky Blog | Descubre las ventajas de elegir servicios de limpieza ecológicos para tu hogar o tu empresa. |
| `it` | https://pearlyskyglobalclean.fr/it/blog/eco-friendly-cleaning | I vantaggi dei servizi di pulizia ecologici \| Pearly Sky Blog | Scopri i vantaggi di scegliere servizi di pulizia ecologici per la tua casa o la tua attività. |

### Blog — How To Choose The Right Cleaning Service For Your Needs

**og:image:** `https://pearlyskyglobalclean.fr/images/blog/choose-right-cleaning-service.jpg`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/blog/choose-right-cleaning-service | How To Choose The Right Cleaning Service For Your Needs \| Pearly Sky Blog | Find out what to look for when selecting a cleaning service that meets your specific requirements. |
| `fr` | https://pearlyskyglobalclean.fr/fr/blog/choose-right-cleaning-service | Comment choisir le service de nettoyage adapté à vos besoins \| Pearly Sky Blog | Découvrez les critères à prendre en compte pour choisir un service de nettoyage qui répond à vos exigences. |
| `de` | https://pearlyskyglobalclean.fr/de/blog/choose-right-cleaning-service | So wählen Sie den passenden Reinigungsdienst für Ihre Bedürfnisse \| Pearly Sky Blog | Erfahren Sie, worauf Sie bei der Auswahl eines Reinigungsdienstes achten sollten, der Ihre Anforderungen erfüllt. |
| `es` | https://pearlyskyglobalclean.fr/es/blog/choose-right-cleaning-service | Cómo elegir el servicio de limpieza adecuado a tus necesidades \| Pearly Sky Blog | Descubre qué tener en cuenta al elegir un servicio de limpieza que se ajuste a tus necesidades concretas. |
| `it` | https://pearlyskyglobalclean.fr/it/blog/choose-right-cleaning-service | Come scegliere il servizio di pulizia giusto per le tue esigenze \| Pearly Sky Blog | Scopri a cosa prestare attenzione quando scegli un servizio di pulizia adatto alle tue esigenze specifiche. |

## Job postings

*Metadata source:* `lib/content/jobs.ts` + the i18n dictionaries; title/description built in `app/(site)/careers/[jobId]/page.tsx`.

### Job — Cleaner (Male / Female) — Residential and Commercial Properties

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/careers/residential-cleaner | Cleaner (Male / Female) — Residential and Commercial Properties \| Careers at Pearly Sky | Cleaner (Male / Female) — Residential and Commercial Properties — Full-Time / Part-Time / Flexible Shifts role at Pearly Sky, France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/careers/residential-cleaner | Agent de nettoyage (H/F) — Propriétés résidentielles et commerciales \| Carrières chez Pearly Sky | Agent de nettoyage (H/F) — Propriétés résidentielles et commerciales — poste Temps plein / Temps partiel / Horaires flexibles chez Pearly Sky, France. |
| `de` | https://pearlyskyglobalclean.fr/de/careers/residential-cleaner | Reinigungskraft (m/w/d) — Wohn- und Gewerbeimmobilien \| Karriere bei Pearly Sky | Reinigungskraft (m/w/d) — Wohn- und Gewerbeimmobilien — Vollzeit / Teilzeit / Flexible Schichten-Stelle bei Pearly Sky, Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/careers/residential-cleaner | Personal de Limpieza (H/M) — Propiedades Residenciales y Comerciales \| Empleo en Pearly Sky | Personal de Limpieza (H/M) — Propiedades Residenciales y Comerciales — puesto Tiempo completo / Tiempo parcial / Turnos flexibles en Pearly Sky, Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/careers/residential-cleaner | Addetto/a alle Pulizie — Proprietà Residenziali e Commerciali \| Lavora con noi da Pearly Sky | Addetto/a alle Pulizie — Proprietà Residenziali e Commerciali — posizione Tempo pieno / Part-time / Turni flessibili presso Pearly Sky, Francia. |

### Job — Children Care Worker (Male / Female)

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/careers/childcare-assistant | Children Care Worker (Male / Female) \| Careers at Pearly Sky | Children Care Worker (Male / Female) — Part-Time / Full-Time role at Pearly Sky, France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/careers/childcare-assistant | Auxiliaire de petite enfance / Baby-sitter (H/F) \| Carrières chez Pearly Sky | Auxiliaire de petite enfance / Baby-sitter (H/F) — poste Temps partiel / Temps plein chez Pearly Sky, France. |
| `de` | https://pearlyskyglobalclean.fr/de/careers/childcare-assistant | Kinderbetreuer / Babysitter (m/w/d) \| Karriere bei Pearly Sky | Kinderbetreuer / Babysitter (m/w/d) — Teilzeit / Vollzeit-Stelle bei Pearly Sky, Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/careers/childcare-assistant | Cuidador/a de Niños (H/M) \| Empleo en Pearly Sky | Cuidador/a de Niños (H/M) — puesto Tiempo parcial / Tiempo completo en Pearly Sky, Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/careers/childcare-assistant | Educatore / Babysitter all'Infanzia (M/F) \| Lavora con noi da Pearly Sky | Educatore / Babysitter all'Infanzia (M/F) — posizione Part-time / Tempo pieno presso Pearly Sky, Francia. |

### Job — Elder Care Worker (Male / Female)

**og:image:** `https://pearlyskyglobalclean.fr/images/hero/hero-1.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/careers/elder-care-assistant | Elder Care Worker (Male / Female) \| Careers at Pearly Sky | Elder Care Worker (Male / Female) — Full-Time / Part-Time / Flexible Shifts role at Pearly Sky, France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/careers/elder-care-assistant | Auxiliaire de vie / Aide aux seniors (H/F) \| Carrières chez Pearly Sky | Auxiliaire de vie / Aide aux seniors (H/F) — poste Temps plein / Temps partiel / Horaires flexibles chez Pearly Sky, France. |
| `de` | https://pearlyskyglobalclean.fr/de/careers/elder-care-assistant | Seniorenbetreuer / Pflegehelfer (m/w/d) \| Karriere bei Pearly Sky | Seniorenbetreuer / Pflegehelfer (m/w/d) — Vollzeit / Teilzeit / Flexible Schichten-Stelle bei Pearly Sky, Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/careers/elder-care-assistant | Cuidador/a de Personas Mayores (H/M) \| Empleo en Pearly Sky | Cuidador/a de Personas Mayores (H/M) — puesto Tiempo completo / Tiempo parcial / Turnos flexibles en Pearly Sky, Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/careers/elder-care-assistant | Operatore / Assistente agli Anziani (M/F) \| Lavora con noi da Pearly Sky | Operatore / Assistente agli Anziani (M/F) — posizione Tempo pieno / Part-time / Turni flessibili presso Pearly Sky, Francia. |

## Service pages

*Metadata source:* Backend seed (`backend/src/database/seed-{country}.ts`: slugs, names, translated SEO titles) → `lib/countries/service-meta.ts` (English) → plain fallback; see `app/(site)/services/[serviceSlug]/page.tsx`.

### Service — Regular Home Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/regular-home-cleaning | Regular Home Cleaning \| Pearly Sky Eco-Luxury Care – France | Recurring, detail-driven upkeep that keeps every room fresh, tidy, and welcoming between visits. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-regulier | Nettoyage Régulier \| Pearly Sky Éco-Luxe – France | Un entretien régulier pour un intérieur toujours frais et impeccable. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-regelmaessig | Regelmäßige Hausreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Regelmäßige Pflege für ein stets frisches und gepflegtes Zuhause. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-regular-hogar | Limpieza Regular del Hogar \| Pearly Sky Eco-Lujo – Francia | Un mantenimiento regular para un hogar siempre fresco y ordenado. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-regolare-casa | Pulizia Regolare della Casa \| Pearly Sky Eco-Luxury – Francia | Una manutenzione regolare per una casa sempre fresca e in ordine. Al servizio dei clienti in tutta la Francia. |

### Service — Quick Touch-Up Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/quick-touch-up-cleaning | Essential Touch-Up Cleaning \| Fast Refresh Service – France | A focused, efficient refresh for high-traffic areas — ideal for a quick reset before guests or the next appointment. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-express | Nettoyage Express \| Pearly Sky Éco-Luxe – France | Un nettoyage rapide pour retrouver un intérieur impeccable en un instant. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/schnellreinigung | Schnellreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Eine schnelle Reinigung für ein gepflegtes Erscheinungsbild. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-rapida | Limpieza Rápida \| Pearly Sky Eco-Lujo – Francia | Una limpieza rápida para recuperar un aspecto impecable. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-rapida | Pulizia Rapida \| Pearly Sky Eco-Luxury – Francia | Una pulizia veloce per un aspetto impeccabile. Al servizio dei clienti in tutta la Francia. |

### Service — Same-Day Priority Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-3-last-minute-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/same-day-priority-cleaning | Same-Day Priority Cleaning \| Rapid-Dispatch Service – France | Urgent, fully-staffed cleaning dispatched the same day for last-minute arrivals, inspections, or unexpected guests. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-prioritaire-jour-meme | Nettoyage Prioritaire le Jour Même \| Pearly Sky Éco-Luxe – France | Un nettoyage rapide et fiable, disponible sur demande urgente. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-noch-heute | Prioritäre Reinigung am Selben Tag \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Schnelle, zuverlässige Reinigung kurzfristig verfügbar. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-prioritaria-mismo-dia | Limpieza Prioritaria el Mismo Día \| Pearly Sky Eco-Lujo – Francia | Limpieza rápida y fiable disponible con poca antelación. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-prioritaria-in-giornata | Pulizia Prioritaria in Giornata \| Pearly Sky Eco-Luxury – Francia | Pulizia rapida e affidabile disponibile con breve preavviso. Al servizio dei clienti in tutta la Francia. |

### Service — Deep Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-4-deep-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/deep-cleaning | Elite Luxury Deep Cleaning Services \| Pearly Sky Specialized – France | An exhaustive, detail-driven interior sterilization targeting structural buildup, scaling, and precision rejuvenation. Experience ultimate freshness. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-en-profondeur | Nettoyage en Profondeur \| Pearly Sky Éco-Luxe – France | Un nettoyage minutieux, du sol au plafond, pour un résultat impeccable. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/grundreinigung | Grundreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Eine gründliche Reinigung von oben bis unten für ein makelloses Ergebnis. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-profunda | Limpieza Profunda \| Pearly Sky Eco-Lujo – Francia | Una limpieza minuciosa de arriba a abajo para un resultado impecable. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-approfondita | Pulizia Approfondita \| Pearly Sky Eco-Luxury – Francia | Una pulizia minuziosa dall'alto verso il basso per un risultato impeccabile. Al servizio dei clienti in tutta la Francia. |

### Service — End of Tenancy Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-5-move-in-out-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/end-of-tenancy-cleaning | Premium End of Tenancy Cleaning \| Deposit Guarantee Service – France | Comprehensive, high-standard checkout sanitation designed for premium real estate handovers. Secured asset return metrics with pristine outcomes. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-fin-de-bail | Nettoyage de Fin de Bail \| Pearly Sky Éco-Luxe – France | Idéal pour les emménagements, déménagements et états des lieux. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/endreinigung-auszug | Endreinigung bei Auszug \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Ideal für Ein- und Auszüge sowie Wohnungsübergaben. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-fin-contrato | Limpieza de Fin de Contrato \| Pearly Sky Eco-Lujo – Francia | Ideal para mudanzas e inspecciones finales. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-fine-locazione | Pulizia di Fine Locazione \| Pearly Sky Eco-Luxury – Francia | Ideale per traslochi e ispezioni finali. Al servizio dei clienti in tutta la Francia. |

### Service — Post-Construction & Renovation Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-6-post-construction-renovation-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/post-construction-renovation-cleaning | Post-Construction Detail Cleaning \| Luxury Site Handover – France | Advanced elimination of airborne fine dust, tracking residues, paint splatters, and structural masonry polishing. Turn builds into move-in spaces. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-post-travaux | Nettoyage Post-Travaux & Rénovation \| Pearly Sky Éco-Luxe – France | Élimine la poussière et les débris après des travaux de rénovation. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-nach-bauarbeiten | Reinigung nach Bauarbeiten & Renovierung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Entfernt Staub und Schutt nach Bauarbeiten. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-post-obra | Limpieza Post-Obra y Reforma \| Pearly Sky Eco-Lujo – Francia | Elimina el polvo y los escombros tras las obras. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-post-costruzione | Pulizia Post-Costruzione e Ristrutturazione \| Pearly Sky Eco-Luxury – Francia | Rimuove polvere e detriti dopo i lavori. Al servizio dei clienti in tutta la Francia. |

### Service — Premium Rental Concierge Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-7-airbnb-short-term-rental-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/premium-rental-concierge-cleaning | Premium Rental Concierge Cleaning \| Airbnb Turnover Experts – France | Hotel-grade premium turnovers including fresh linen configurations, property damage auditing, and luxurious welcoming touchpoints. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/conciergerie-menage-locations-premium | Conciergerie Ménage pour Locations Premium \| Pearly Sky Éco-Luxe – France | Un nettoyage haut de gamme pour les locations de prestige. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/concierge-reinigung-vermietung | Premium-Concierge-Reinigung für Vermietungen \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Hochwertige Reinigung für exklusive Mietobjekte. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-concierge-alquileres | Limpieza Concierge Premium para Alquileres \| Pearly Sky Eco-Lujo – Francia | Limpieza de alta gama para alquileres de lujo. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-concierge-affitti | Pulizia Concierge Premium per Affitti \| Pearly Sky Eco-Luxury – Francia | Pulizia di alta gamma per affitti di lusso. Al servizio dei clienti in tutta la Francia. |

### Service — Commercial & Office Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-8-commercial-office-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/commercial-office-cleaning | Elite Commercial & Corporate Office Cleaning Pearly Sky – France | Impeccable executive office sanitation and corporate building presentation tailored to maintain workspace health metrics and premium aesthetics. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-bureaux-commercial | Nettoyage de Bureaux & Locaux Commerciaux \| Pearly Sky Éco-Luxe – France | Un nettoyage professionnel pour les espaces de travail. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/gewerbe-bueroreinigung | Gewerbe- & Büroreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Professionelle Reinigung für Geschäftsräume. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-comercial-oficinas | Limpieza Comercial y de Oficinas \| Pearly Sky Eco-Lujo – Francia | Limpieza profesional para espacios de trabajo. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-commerciale-uffici | Pulizia Commerciale e di Uffici \| Pearly Sky Eco-Luxury – Francia | Pulizia professionale per spazi di lavoro. Al servizio dei clienti in tutta la Francia. |

### Service — HealthGuard-Sanitization

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/healthguard-sanitization | HealthGuard Disinfection & Medical-Grade Sanitization – France | Advanced electrostatic anti-viral misting and certified pathogen elimination matrices. Secure your living and working perimeter seamlessly. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/desinfection-healthguard | Désinfection HealthGuard \| Pearly Sky Éco-Luxe – France | Une désinfection ciblée des surfaces les plus exposées. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/healthguard-desinfektion | HealthGuard-Desinfektion \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Gezielte Desinfektion vielberührter Oberflächen. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/desinfeccion-healthguard | Desinfección HealthGuard \| Pearly Sky Eco-Lujo – Francia | Desinfección específica de las superficies más expuestas. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/sanificazione-healthguard | Sanificazione HealthGuard \| Pearly Sky Eco-Luxury – Francia | Sanificazione mirata delle superfici più esposte. Al servizio dei clienti in tutta la Francia. |

### Service — Carpet & Upholstery Cleaning

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-10-carpet-upholstery-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/carpet-upholstery-cleaning | Premium Carpet & Upholstery Cleaning \| Fiber Restoration – France | Professional deep injection-extraction methods targeting localized spots, allergen matrices, and deep fabric structural protection. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-tapis-canapes | Nettoyage de Tapis & Canapés \| Pearly Sky Éco-Luxe – France | Un nettoyage en profondeur des tapis et tissus d'ameublement. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/teppich-polsterreinigung | Teppich- & Polsterreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Tiefenreinigung für Teppiche und Stoffe. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-alfombras-tapiceria | Limpieza de Alfombras y Tapicerías \| Pearly Sky Eco-Lujo – Francia | Limpieza profunda de alfombras y tejidos. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-tappeti-divani | Pulizia di Tappeti e Divani \| Pearly Sky Eco-Luxury – Francia | Pulizia profonda di tappeti e tessuti. Al servizio dei clienti in tutta la Francia. |

### Service — Steam Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-11-steam-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/steam-cleaning | Eco Steam Cleaning Services \| High-Temperature Sterilization – France | Chemical-free sanitation utilizing advanced high-pressure thermal vapor. Eradicates deeply embedded grime across tiles and hard floors. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-vapeur | Nettoyage à la Vapeur \| Pearly Sky Éco-Luxe – France | Un nettoyage hygiénique en profondeur à base de vapeur. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/dampfreinigung | Dampfreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Eine hygienische Tiefenreinigung mit Dampf. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-vapor | Limpieza a Vapor \| Pearly Sky Eco-Lujo – Francia | Una limpieza higiénica y profunda a base de vapor. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-vapore | Pulizia a Vapore \| Pearly Sky Eco-Luxury – Francia | Una pulizia igienica e profonda a base di vapore. Al servizio dei clienti in tutta la Francia. |

### Service — Post-Event Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-12-post-event-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/post-event-cleaning | Elite Post-Event Cleaning Services \| Rapid Venue Breakdown – France | Complete overnight or immediate event space breakdown, waste tracking management, and rigorous space polish loops for prestige galas. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-post-evenement | Nettoyage Après Événement \| Pearly Sky Éco-Luxe – France | Un nettoyage complet après vos événements et célébrations. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-nach-veranstaltung | Reinigung nach Veranstaltungen \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Aufräumen nach Veranstaltungen und Feiern. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-post-evento | Limpieza Post-Evento \| Pearly Sky Eco-Lujo – Francia | Limpieza tras eventos y celebraciones. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-post-evento | Pulizia Post-Evento \| Pearly Sky Eco-Luxury – Francia | Pulizia dopo eventi e celebrazioni. Al servizio dei clienti in tutta la Francia. |

### Service — Pool Cleaning

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-13-pool-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/pool-cleaning | Luxury Swimming Pool Maintenance & Structural Cleaning – France | Comprehensive chemical titration, wall algae scrubbing, tile polish matrices, and filter configuration audits for private luxury swimming pools. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/entretien-piscine | Entretien de Piscine \| Pearly Sky Éco-Luxe – France | Un nettoyage et entretien soigné pour votre piscine. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/poolreinigung | Poolreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Sorgfältige Reinigung und Pflege für Ihren Pool. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-piscinas | Limpieza de Piscinas \| Pearly Sky Eco-Lujo – Francia | Limpieza y mantenimiento cuidadoso para su piscina. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-piscine | Pulizia Piscine \| Pearly Sky Eco-Luxury – Francia | Pulizia e manutenzione accurata per la vostra piscina. Al servizio dei clienti in tutta la Francia. |

### Service — Precision Pressure Washing

**Flow:** Quotation only  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-14-precision-pressure-washing.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/precision-pressure-washing | Precision Pressure Washing \| High-PSI Facade Rejuvenation – France | Heavy-duty specialized surface restoration for structural stone driveways, concrete claddings, and exterior premium architectural structures. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-haute-pression | Nettoyage Haute Pression de Précision \| Pearly Sky Éco-Luxe – France | Un nettoyage extérieur adapté à toutes les surfaces. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/hochdruckreinigung | Präzisions-Hochdruckreinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Außenreinigung für Terrassen und Fassaden. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/lavado-presion-precision | Lavado a Presión de Precisión \| Pearly Sky Eco-Lujo – Francia | Limpieza exterior para superficies al aire libre. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/idropulizia-precisione | Idropulizia di Precisione \| Pearly Sky Eco-Luxury – Francia | Pulizia esterna per superfici all'aperto. Al servizio dei clienti in tutta la Francia. |

### Service — High-Security Property Care

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-15-security-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/high-security-property-care | High-Security Property Care \| Vetted Discreet Teams – France | Background-checked, NDA-bound cleaning crews for high-profile residences and secure facilities, with strict access and confidentiality protocols. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/entretien-proprietes-haute-securite | Entretien de Propriétés Haute Sécurité \| Pearly Sky Éco-Luxe – France | Un nettoyage discret pour les résidences à accès sécurisé. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/objektpflege-hochsicherheit | Hochsicherheits-Objektpflege \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Diskrete Reinigung für sicherheitsrelevante Objekte. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/mantenimiento-alta-seguridad | Mantenimiento de Propiedades de Alta Seguridad \| Pearly Sky Eco-Lujo – Francia | Limpieza discreta para propiedades de acceso seguro. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/manutenzione-alta-sicurezza | Manutenzione di Proprietà ad Alta Sicurezza \| Pearly Sky Eco-Luxury – Francia | Pulizia discreta per proprietà ad accesso sicuro. Al servizio dei clienti in tutta la Francia. |

### Service — Luxury Yacht Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/luxury-yacht-cleaning | Luxury Yacht Detailing & Marine Care Pearly Sky Marine – France | Ultra-premium marine-safe eco-solvent detailing. Interior luxury fabric care, teak restoration, and meticulous metallic polishing for luxury vessels. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-yachts-luxe | Nettoyage de Yachts de Luxe \| Pearly Sky Éco-Luxe – France | Un nettoyage haut de gamme pour yachts et intérieurs marins. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/yachtreinigung-luxus | Luxusyacht-Reinigung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Hochwertige Reinigung für Yachten und maritime Innenräume. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-yates-lujo | Limpieza de Yates de Lujo \| Pearly Sky Eco-Lujo – Francia | Limpieza de alta gama para yates e interiores marinos. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-yacht-lusso | Pulizia di Yacht di Lusso \| Pearly Sky Eco-Luxury – Francia | Pulizia di alta gamma per yacht e interni nautici. Al servizio dei clienti in tutta la Francia. |

### Service — Child Care Service

**Flow:** Booking + quotation  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-care-support-services-1-child-care-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/child-care-service | Elite Child Care Assistance & Playroom Sanitization – France | Certified nanny placement frameworks paired with non-toxic medical-grade allergen extraction across active nurseries and children's play zones. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/service-garde-enfants | Service de Garde d'Enfants \| Pearly Sky Éco-Luxe – France | Un accompagnement de confiance pour les familles. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/kinderbetreuung | Kinderbetreuung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Vertrauensvolle Unterstützung für Familien. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/cuidado-infantil | Servicio de Cuidado Infantil \| Pearly Sky Eco-Lujo – Francia | Apoyo de confianza para las familias. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/assistenza-infanzia | Servizio di Assistenza all'Infanzia \| Pearly Sky Eco-Luxury – Francia | Supporto affidabile per le famiglie. Al servizio dei clienti in tutta la Francia. |

### Service — Elder Care Service

**Flow:** Booking + quotation  
Quotation form is on this page (its /request-quotation URL 308-redirects here).  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-care-support-services-2-elder-care-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/elder-care-service | Premium Elder Care Companion & Safe Home Maintenance – France | Compassionate senior support schedules coupled with specialized domestic mobility safety setups and organic clean home upkeep routines. Serving clients across France. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/service-aide-personnes-agees | Service d’Aide aux Personnes Âgées \| Pearly Sky Éco-Luxe – France | Un accompagnement respectueux pour nos clients seniors. Au service de nos clients en France. |
| `de` | https://pearlyskyglobalclean.fr/de/services/seniorenbetreuung | Seniorenbetreuung \| Pearly Sky Eco-Luxus-Pflege – Frankreich | Respektvolle Unterstützung für ältere Kunden. Wir betreuen Kunden in ganz Frankreich. |
| `es` | https://pearlyskyglobalclean.fr/es/services/cuidado-personas-mayores | Servicio de Cuidado de Mayores \| Pearly Sky Eco-Lujo – Francia | Apoyo respetuoso para nuestros clientes mayores. Atendemos a clientes en toda Francia. |
| `it` | https://pearlyskyglobalclean.fr/it/services/assistenza-anziani | Servizio di Assistenza agli Anziani \| Pearly Sky Eco-Luxury – Francia | Supporto rispettoso per i nostri clienti anziani. Al servizio dei clienti in tutta la Francia. |

## Request-a-quote pages

*Metadata source:* Built in `app/(site)/services/[serviceSlug]/request-quotation/page.tsx` from the service's localized name.

### Request a Quote — Regular Home Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-1-standard-residential-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/regular-home-cleaning/request-quotation | Request a Quote — Regular Home Cleaning \| Pearly Sky | Request a free, no-obligation quote for regular home cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-regulier/request-quotation | Request a Quote — Nettoyage Régulier \| Pearly Sky | Request a free, no-obligation quote for nettoyage régulier with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-regelmaessig/request-quotation | Request a Quote — Regelmäßige Hausreinigung \| Pearly Sky | Request a free, no-obligation quote for regelmäßige hausreinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-regular-hogar/request-quotation | Request a Quote — Limpieza Regular del Hogar \| Pearly Sky | Request a free, no-obligation quote for limpieza regular del hogar with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-regolare-casa/request-quotation | Request a Quote — Pulizia Regolare della Casa \| Pearly Sky | Request a free, no-obligation quote for pulizia regolare della casa with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Quick Touch-Up Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-2-express-refresh-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/quick-touch-up-cleaning/request-quotation | Request a Quote — Quick Touch-Up Cleaning \| Pearly Sky | Request a free, no-obligation quote for quick touch-up cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-express/request-quotation | Request a Quote — Nettoyage Express \| Pearly Sky | Request a free, no-obligation quote for nettoyage express with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/schnellreinigung/request-quotation | Request a Quote — Schnellreinigung \| Pearly Sky | Request a free, no-obligation quote for schnellreinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-rapida/request-quotation | Request a Quote — Limpieza Rápida \| Pearly Sky | Request a free, no-obligation quote for limpieza rápida with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-rapida/request-quotation | Request a Quote — Pulizia Rapida \| Pearly Sky | Request a free, no-obligation quote for pulizia rapida with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Same-Day Priority Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-3-last-minute-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/same-day-priority-cleaning/request-quotation | Request a Quote — Same-Day Priority Cleaning \| Pearly Sky | Request a free, no-obligation quote for same-day priority cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-prioritaire-jour-meme/request-quotation | Request a Quote — Nettoyage Prioritaire le Jour Même \| Pearly Sky | Request a free, no-obligation quote for nettoyage prioritaire le jour même with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-noch-heute/request-quotation | Request a Quote — Prioritäre Reinigung am Selben Tag \| Pearly Sky | Request a free, no-obligation quote for prioritäre reinigung am selben tag with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-prioritaria-mismo-dia/request-quotation | Request a Quote — Limpieza Prioritaria el Mismo Día \| Pearly Sky | Request a free, no-obligation quote for limpieza prioritaria el mismo día with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-prioritaria-in-giornata/request-quotation | Request a Quote — Pulizia Prioritaria in Giornata \| Pearly Sky | Request a free, no-obligation quote for pulizia prioritaria in giornata with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Deep Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-4-deep-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/deep-cleaning/request-quotation | Request a Quote — Deep Cleaning \| Pearly Sky | Request a free, no-obligation quote for deep cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-en-profondeur/request-quotation | Request a Quote — Nettoyage en Profondeur \| Pearly Sky | Request a free, no-obligation quote for nettoyage en profondeur with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/grundreinigung/request-quotation | Request a Quote — Grundreinigung \| Pearly Sky | Request a free, no-obligation quote for grundreinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-profunda/request-quotation | Request a Quote — Limpieza Profunda \| Pearly Sky | Request a free, no-obligation quote for limpieza profunda with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-approfondita/request-quotation | Request a Quote — Pulizia Approfondita \| Pearly Sky | Request a free, no-obligation quote for pulizia approfondita with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — End of Tenancy Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-5-move-in-out-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/end-of-tenancy-cleaning/request-quotation | Request a Quote — End of Tenancy Cleaning \| Pearly Sky | Request a free, no-obligation quote for end of tenancy cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-fin-de-bail/request-quotation | Request a Quote — Nettoyage de Fin de Bail \| Pearly Sky | Request a free, no-obligation quote for nettoyage de fin de bail with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/endreinigung-auszug/request-quotation | Request a Quote — Endreinigung bei Auszug \| Pearly Sky | Request a free, no-obligation quote for endreinigung bei auszug with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-fin-contrato/request-quotation | Request a Quote — Limpieza de Fin de Contrato \| Pearly Sky | Request a free, no-obligation quote for limpieza de fin de contrato with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-fine-locazione/request-quotation | Request a Quote — Pulizia di Fine Locazione \| Pearly Sky | Request a free, no-obligation quote for pulizia di fine locazione with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Post-Construction & Renovation Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-6-post-construction-renovation-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/post-construction-renovation-cleaning/request-quotation | Request a Quote — Post-Construction & Renovation Cleaning \| Pearly Sky | Request a free, no-obligation quote for post-construction & renovation cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-post-travaux/request-quotation | Request a Quote — Nettoyage Post-Travaux & Rénovation \| Pearly Sky | Request a free, no-obligation quote for nettoyage post-travaux & rénovation with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-nach-bauarbeiten/request-quotation | Request a Quote — Reinigung nach Bauarbeiten & Renovierung \| Pearly Sky | Request a free, no-obligation quote for reinigung nach bauarbeiten & renovierung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-post-obra/request-quotation | Request a Quote — Limpieza Post-Obra y Reforma \| Pearly Sky | Request a free, no-obligation quote for limpieza post-obra y reforma with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-post-costruzione/request-quotation | Request a Quote — Pulizia Post-Costruzione e Ristrutturazione \| Pearly Sky | Request a free, no-obligation quote for pulizia post-costruzione e ristrutturazione with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Premium Rental Concierge Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-7-airbnb-short-term-rental-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/premium-rental-concierge-cleaning/request-quotation | Request a Quote — Premium Rental Concierge Cleaning \| Pearly Sky | Request a free, no-obligation quote for premium rental concierge cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/conciergerie-menage-locations-premium/request-quotation | Request a Quote — Conciergerie Ménage pour Locations Premium \| Pearly Sky | Request a free, no-obligation quote for conciergerie ménage pour locations premium with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/concierge-reinigung-vermietung/request-quotation | Request a Quote — Premium-Concierge-Reinigung für Vermietungen \| Pearly Sky | Request a free, no-obligation quote for premium-concierge-reinigung für vermietungen with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-concierge-alquileres/request-quotation | Request a Quote — Limpieza Concierge Premium para Alquileres \| Pearly Sky | Request a free, no-obligation quote for limpieza concierge premium para alquileres with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-concierge-affitti/request-quotation | Request a Quote — Pulizia Concierge Premium per Affitti \| Pearly Sky | Request a free, no-obligation quote for pulizia concierge premium per affitti with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Commercial & Office Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-8-commercial-office-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/commercial-office-cleaning/request-quotation | Request a Quote — Commercial & Office Cleaning \| Pearly Sky | Request a free, no-obligation quote for commercial & office cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-bureaux-commercial/request-quotation | Request a Quote — Nettoyage de Bureaux & Locaux Commerciaux \| Pearly Sky | Request a free, no-obligation quote for nettoyage de bureaux & locaux commerciaux with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/gewerbe-bueroreinigung/request-quotation | Request a Quote — Gewerbe- & Büroreinigung \| Pearly Sky | Request a free, no-obligation quote for gewerbe- & büroreinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-comercial-oficinas/request-quotation | Request a Quote — Limpieza Comercial y de Oficinas \| Pearly Sky | Request a free, no-obligation quote for limpieza comercial y de oficinas with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-commerciale-uffici/request-quotation | Request a Quote — Pulizia Commerciale e di Uffici \| Pearly Sky | Request a free, no-obligation quote for pulizia commerciale e di uffici with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — HealthGuard-Sanitization

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-9-healthguard-sanitization-medical-grade-eco-disinfection.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/healthguard-sanitization/request-quotation | Request a Quote — HealthGuard-Sanitization \| Pearly Sky | Request a free, no-obligation quote for healthguard-sanitization with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/desinfection-healthguard/request-quotation | Request a Quote — Désinfection HealthGuard \| Pearly Sky | Request a free, no-obligation quote for désinfection healthguard with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/healthguard-desinfektion/request-quotation | Request a Quote — HealthGuard-Desinfektion \| Pearly Sky | Request a free, no-obligation quote for healthguard-desinfektion with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/desinfeccion-healthguard/request-quotation | Request a Quote — Desinfección HealthGuard \| Pearly Sky | Request a free, no-obligation quote for desinfección healthguard with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/sanificazione-healthguard/request-quotation | Request a Quote — Sanificazione HealthGuard \| Pearly Sky | Request a free, no-obligation quote for sanificazione healthguard with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Steam Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-11-steam-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/steam-cleaning/request-quotation | Request a Quote — Steam Cleaning \| Pearly Sky | Request a free, no-obligation quote for steam cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-vapeur/request-quotation | Request a Quote — Nettoyage à la Vapeur \| Pearly Sky | Request a free, no-obligation quote for nettoyage à la vapeur with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/dampfreinigung/request-quotation | Request a Quote — Dampfreinigung \| Pearly Sky | Request a free, no-obligation quote for dampfreinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-vapor/request-quotation | Request a Quote — Limpieza a Vapor \| Pearly Sky | Request a free, no-obligation quote for limpieza a vapor with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-vapore/request-quotation | Request a Quote — Pulizia a Vapore \| Pearly Sky | Request a free, no-obligation quote for pulizia a vapore with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Post-Event Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-12-post-event-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/post-event-cleaning/request-quotation | Request a Quote — Post-Event Cleaning \| Pearly Sky | Request a free, no-obligation quote for post-event cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-post-evenement/request-quotation | Request a Quote — Nettoyage Après Événement \| Pearly Sky | Request a free, no-obligation quote for nettoyage après événement with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/reinigung-nach-veranstaltung/request-quotation | Request a Quote — Reinigung nach Veranstaltungen \| Pearly Sky | Request a free, no-obligation quote for reinigung nach veranstaltungen with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-post-evento/request-quotation | Request a Quote — Limpieza Post-Evento \| Pearly Sky | Request a free, no-obligation quote for limpieza post-evento with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-post-evento/request-quotation | Request a Quote — Pulizia Post-Evento \| Pearly Sky | Request a free, no-obligation quote for pulizia post-evento with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — High-Security Property Care

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-15-security-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/high-security-property-care/request-quotation | Request a Quote — High-Security Property Care \| Pearly Sky | Request a free, no-obligation quote for high-security property care with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/entretien-proprietes-haute-securite/request-quotation | Request a Quote — Entretien de Propriétés Haute Sécurité \| Pearly Sky | Request a free, no-obligation quote for entretien de propriétés haute sécurité with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/objektpflege-hochsicherheit/request-quotation | Request a Quote — Hochsicherheits-Objektpflege \| Pearly Sky | Request a free, no-obligation quote for hochsicherheits-objektpflege with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/mantenimiento-alta-seguridad/request-quotation | Request a Quote — Mantenimiento de Propiedades de Alta Seguridad \| Pearly Sky | Request a free, no-obligation quote for mantenimiento de propiedades de alta seguridad with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/manutenzione-alta-sicurezza/request-quotation | Request a Quote — Manutenzione di Proprietà ad Alta Sicurezza \| Pearly Sky | Request a free, no-obligation quote for manutenzione di proprietà ad alta sicurezza with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Luxury Yacht Cleaning

**Flow:** Booking + quotation  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-home-property-cleaning-services-16-luxury-yacht-cleaning.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/luxury-yacht-cleaning/request-quotation | Request a Quote — Luxury Yacht Cleaning \| Pearly Sky | Request a free, no-obligation quote for luxury yacht cleaning with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/nettoyage-yachts-luxe/request-quotation | Request a Quote — Nettoyage de Yachts de Luxe \| Pearly Sky | Request a free, no-obligation quote for nettoyage de yachts de luxe with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/yachtreinigung-luxus/request-quotation | Request a Quote — Luxusyacht-Reinigung \| Pearly Sky | Request a free, no-obligation quote for luxusyacht-reinigung with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/limpieza-yates-lujo/request-quotation | Request a Quote — Limpieza de Yates de Lujo \| Pearly Sky | Request a free, no-obligation quote for limpieza de yates de lujo with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/pulizia-yacht-lusso/request-quotation | Request a Quote — Pulizia di Yacht di Lusso \| Pearly Sky | Request a free, no-obligation quote for pulizia di yacht di lusso with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Laundry Service

**Flow:** Quotation only  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-care-support-services-3-laundry-services.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/laundry-service/request-quotation | Request a Quote — Laundry Service \| Pearly Sky | Request a free, no-obligation quote for laundry service with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/service-blanchisserie/request-quotation | Request a Quote — Service de Blanchisserie \| Pearly Sky | Request a free, no-obligation quote for service de blanchisserie with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/waeschedienst/request-quotation | Request a Quote — Wäscheservice \| Pearly Sky | Request a free, no-obligation quote for wäscheservice with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/servicio-lavanderia/request-quotation | Request a Quote — Servicio de Lavandería \| Pearly Sky | Request a free, no-obligation quote for servicio de lavandería with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/servizio-lavanderia/request-quotation | Request a Quote — Servizio di Lavanderia \| Pearly Sky | Request a free, no-obligation quote for servizio di lavanderia with Pearly Sky's eco-luxury cleaning team. |

### Request a Quote — Move-In / Move-Out Transport Service

**Flow:** Quotation only  
**og:image:** `https://pearlyskyglobalclean.fr/images/services/updated-care-support-services-4-move-in-out-transport-service.webp`

| Lang | URL | Title | Meta description |
|---|---|---|---|
| `en` | https://pearlyskyglobalclean.fr/en/services/move-in-out-transport-service/request-quotation | Request a Quote — Move-In / Move-Out Transport Service \| Pearly Sky | Request a free, no-obligation quote for move-in / move-out transport service with Pearly Sky's eco-luxury cleaning team. |
| `fr` | https://pearlyskyglobalclean.fr/fr/services/service-transport-demenagement/request-quotation | Request a Quote — Service de Transport Déménagement \| Pearly Sky | Request a free, no-obligation quote for service de transport déménagement with Pearly Sky's eco-luxury cleaning team. |
| `de` | https://pearlyskyglobalclean.fr/de/services/umzugstransport/request-quotation | Request a Quote — Umzugstransport-Service \| Pearly Sky | Request a free, no-obligation quote for umzugstransport-service with Pearly Sky's eco-luxury cleaning team. |
| `es` | https://pearlyskyglobalclean.fr/es/services/transporte-mudanza/request-quotation | Request a Quote — Servicio de Transporte de Mudanza \| Pearly Sky | Request a free, no-obligation quote for servicio de transporte de mudanza with Pearly Sky's eco-luxury cleaning team. |
| `it` | https://pearlyskyglobalclean.fr/it/services/trasporto-trasloco/request-quotation | Request a Quote — Servizio di Trasporto Trasloco \| Pearly Sky | Request a free, no-obligation quote for servizio di trasporto trasloco with Pearly Sky's eco-luxury cleaning team. |

## Redirects

These URLs exist but answer with a **308 permanent redirect**: the quotation form for these services lives on the service page itself
(`QUOTE_ON_SERVICE_PAGE` in `lib/service-flows.ts`). **They are excluded from `sitemap.xml`**; the page each one redirects to is listed instead
(see [Service pages](#service-pages)). The live sitemap still lists them until the current code is deployed.

| From | To |
|---|---|
| https://pearlyskyglobalclean.fr/en/services/carpet-upholstery-cleaning/request-quotation | https://pearlyskyglobalclean.fr/en/services/carpet-upholstery-cleaning |
| https://pearlyskyglobalclean.fr/fr/services/nettoyage-tapis-canapes/request-quotation | https://pearlyskyglobalclean.fr/fr/services/nettoyage-tapis-canapes |
| https://pearlyskyglobalclean.fr/de/services/teppich-polsterreinigung/request-quotation | https://pearlyskyglobalclean.fr/de/services/teppich-polsterreinigung |
| https://pearlyskyglobalclean.fr/es/services/limpieza-alfombras-tapiceria/request-quotation | https://pearlyskyglobalclean.fr/es/services/limpieza-alfombras-tapiceria |
| https://pearlyskyglobalclean.fr/it/services/pulizia-tappeti-divani/request-quotation | https://pearlyskyglobalclean.fr/it/services/pulizia-tappeti-divani |
| https://pearlyskyglobalclean.fr/en/services/pool-cleaning/request-quotation | https://pearlyskyglobalclean.fr/en/services/pool-cleaning |
| https://pearlyskyglobalclean.fr/fr/services/entretien-piscine/request-quotation | https://pearlyskyglobalclean.fr/fr/services/entretien-piscine |
| https://pearlyskyglobalclean.fr/de/services/poolreinigung/request-quotation | https://pearlyskyglobalclean.fr/de/services/poolreinigung |
| https://pearlyskyglobalclean.fr/es/services/limpieza-piscinas/request-quotation | https://pearlyskyglobalclean.fr/es/services/limpieza-piscinas |
| https://pearlyskyglobalclean.fr/it/services/pulizia-piscine/request-quotation | https://pearlyskyglobalclean.fr/it/services/pulizia-piscine |
| https://pearlyskyglobalclean.fr/en/services/precision-pressure-washing/request-quotation | https://pearlyskyglobalclean.fr/en/services/precision-pressure-washing |
| https://pearlyskyglobalclean.fr/fr/services/nettoyage-haute-pression/request-quotation | https://pearlyskyglobalclean.fr/fr/services/nettoyage-haute-pression |
| https://pearlyskyglobalclean.fr/de/services/hochdruckreinigung/request-quotation | https://pearlyskyglobalclean.fr/de/services/hochdruckreinigung |
| https://pearlyskyglobalclean.fr/es/services/lavado-presion-precision/request-quotation | https://pearlyskyglobalclean.fr/es/services/lavado-presion-precision |
| https://pearlyskyglobalclean.fr/it/services/idropulizia-precisione/request-quotation | https://pearlyskyglobalclean.fr/it/services/idropulizia-precisione |
| https://pearlyskyglobalclean.fr/en/services/child-care-service/request-quotation | https://pearlyskyglobalclean.fr/en/services/child-care-service |
| https://pearlyskyglobalclean.fr/fr/services/service-garde-enfants/request-quotation | https://pearlyskyglobalclean.fr/fr/services/service-garde-enfants |
| https://pearlyskyglobalclean.fr/de/services/kinderbetreuung/request-quotation | https://pearlyskyglobalclean.fr/de/services/kinderbetreuung |
| https://pearlyskyglobalclean.fr/es/services/cuidado-infantil/request-quotation | https://pearlyskyglobalclean.fr/es/services/cuidado-infantil |
| https://pearlyskyglobalclean.fr/it/services/assistenza-infanzia/request-quotation | https://pearlyskyglobalclean.fr/it/services/assistenza-infanzia |
| https://pearlyskyglobalclean.fr/en/services/elder-care-service/request-quotation | https://pearlyskyglobalclean.fr/en/services/elder-care-service |
| https://pearlyskyglobalclean.fr/fr/services/service-aide-personnes-agees/request-quotation | https://pearlyskyglobalclean.fr/fr/services/service-aide-personnes-agees |
| https://pearlyskyglobalclean.fr/de/services/seniorenbetreuung/request-quotation | https://pearlyskyglobalclean.fr/de/services/seniorenbetreuung |
| https://pearlyskyglobalclean.fr/es/services/cuidado-personas-mayores/request-quotation | https://pearlyskyglobalclean.fr/es/services/cuidado-personas-mayores |
| https://pearlyskyglobalclean.fr/it/services/assistenza-anziani/request-quotation | https://pearlyskyglobalclean.fr/it/services/assistenza-anziani |

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

Sitemap: https://pearlyskyglobalclean.fr/sitemap.xml
```
