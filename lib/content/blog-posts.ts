import type { LanguageCode } from "@/lib/i18n/config";

interface BlogPostCopy {
  title: string;
  description: string;
  body: string[];
}

export interface BlogPost extends BlogPostCopy {
  slug: string;
  image: string;
  /** English long-form date ("9 December 2025") — parsed for structured data; display it through formatBlogDate(). */
  date: string;
  /** Topic the global gateway's blog page filters by — not translated, since that site is English-only. */
  category: BlogCategory;
}

export const BLOG_CATEGORIES = [
  "Home Cleaning",
  "Eco-Friendly Living",
  "Deep Cleaning",
  "Office Cleaning",
  "Property Care",
  "Health & Wellness",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

interface BlogPostSource extends BlogPost {
  /** Non-English copies of title/description/body; English lives on the post itself. */
  translations: Partial<Record<LanguageCode, BlogPostCopy>>;
}

const posts: BlogPostSource[] = [
  {
    slug: "importance-of-regular-cleaning",
    title: "The Importance Of Regular Cleaning For A Healthy Home",
    description:
      "Why a consistent cleaning routine does more for your home than just appearances — and how to keep it up without the effort.",
    image: "/images/blog/article-1.jpeg",
    date: "9 December 2025",
    category: "Home Cleaning",
    body: [
      "A clean home is more than a nice-to-have — it's a foundation for wellbeing. Dust, allergens, and bacteria build up quickly in high-traffic areas like kitchens, bathrooms, and living rooms, and left unchecked they can affect air quality and everyday comfort.",
      "Regular cleaning breaks that cycle before it starts. Instead of a periodic deep clean fighting against months of buildup, a consistent routine keeps surfaces, floors, and fabrics in a state that's easy to maintain — and far more pleasant to live in day to day.",
      "That's the philosophy behind Pearly Sky's residential cleaning services: eco-luxury care on a schedule that fits your life, using products that are safe for your family and effective against what actually matters.",
    ],
    translations: {
      fr: {
        title: "L’importance d’un ménage régulier pour un intérieur sain",
        description:
          "Pourquoi une routine de ménage régulière apporte bien plus à votre intérieur qu’une simple belle apparence — et comment la maintenir sans effort.",
        body: [
          "Un intérieur propre est bien plus qu’un simple plus — c’est une base essentielle du bien-être. La poussière, les allergènes et les bactéries s’accumulent rapidement dans les zones de passage comme la cuisine, la salle de bain et le salon, et sans entretien ils peuvent nuire à la qualité de l’air et au confort quotidien.",
          "Un ménage régulier brise ce cycle avant qu’il ne s’installe. Plutôt qu’un grand nettoyage ponctuel qui lutte contre des mois d’accumulation, une routine constante maintient surfaces, sols et textiles dans un état facile à entretenir — et bien plus agréable à vivre au quotidien.",
          "C’est la philosophie des services de nettoyage résidentiel de Pearly Sky : un soin éco-luxe selon un planning adapté à votre vie, avec des produits sans danger pour votre famille et efficaces contre ce qui compte vraiment.",
        ],
      },
      de: {
        title: "Warum regelmäßige Reinigung für ein gesundes Zuhause wichtig ist",
        description:
          "Warum eine feste Reinigungsroutine Ihrem Zuhause mehr bringt als nur ein schönes Erscheinungsbild — und wie Sie sie mühelos beibehalten.",
        body: [
          "Ein sauberes Zuhause ist mehr als ein angenehmer Bonus — es ist eine Grundlage für Wohlbefinden. Staub, Allergene und Bakterien sammeln sich in viel genutzten Bereichen wie Küche, Bad und Wohnzimmer schnell an und können unbehandelt die Luftqualität und den Alltagskomfort beeinträchtigen.",
          "Regelmäßige Reinigung durchbricht diesen Kreislauf, bevor er beginnt. Statt einer gelegentlichen Grundreinigung gegen monatelange Ablagerungen hält eine feste Routine Oberflächen, Böden und Textilien in einem Zustand, der leicht zu pflegen ist — und in dem es sich jeden Tag viel angenehmer lebt.",
          "Genau das ist die Philosophie hinter den Wohnungsreinigungen von Pearly Sky: Öko-Luxus-Pflege nach einem Zeitplan, der zu Ihrem Leben passt, mit Produkten, die für Ihre Familie sicher und gegen das Wesentliche wirksam sind.",
        ],
      },
      es: {
        title: "La importancia de una limpieza regular para un hogar saludable",
        description:
          "Por qué una rutina de limpieza constante aporta a tu hogar mucho más que buena apariencia — y cómo mantenerla sin esfuerzo.",
        body: [
          "Un hogar limpio es mucho más que un detalle agradable: es la base del bienestar. El polvo, los alérgenos y las bacterias se acumulan rápidamente en zonas de mucho uso como la cocina, el baño y el salón y, si no se controlan, pueden afectar a la calidad del aire y al confort diario.",
          "La limpieza regular rompe ese ciclo antes de que empiece. En lugar de una limpieza profunda ocasional que lucha contra meses de suciedad acumulada, una rutina constante mantiene superficies, suelos y tejidos en un estado fácil de conservar — y mucho más agradable para vivir día a día.",
          "Esa es la filosofía de los servicios de limpieza residencial de Pearly Sky: un cuidado eco-lujo con un calendario que se adapta a tu vida, utilizando productos seguros para tu familia y eficaces contra lo que realmente importa.",
        ],
      },
      it: {
        title: "L’importanza delle pulizie regolari per una casa sana",
        description:
          "Perché una routine di pulizia costante fa per la tua casa molto più che migliorarne l’aspetto — e come mantenerla senza fatica.",
        body: [
          "Una casa pulita è molto più di un piacere: è una base per il benessere. Polvere, allergeni e batteri si accumulano rapidamente nelle zone più frequentate come cucina, bagno e soggiorno e, se trascurati, possono compromettere la qualità dell’aria e il comfort quotidiano.",
          "Le pulizie regolari interrompono questo ciclo prima che inizi. Invece di una pulizia profonda occasionale che combatte mesi di sporco accumulato, una routine costante mantiene superfici, pavimenti e tessuti in uno stato facile da curare — e molto più piacevole da vivere ogni giorno.",
          "È questa la filosofia dei servizi di pulizia residenziale di Pearly Sky: una cura eco-luxury con un programma su misura per la tua vita, utilizzando prodotti sicuri per la tua famiglia ed efficaci contro ciò che conta davvero.",
        ],
      },
    },
  },
  {
    slug: "top-5-cleaning-tips",
    title: "Top 5 Cleaning Tips For Busy Professionals",
    description:
      "Get expert advice on how to keep your space clean and organized, even on the busiest of days.",
    image: "/images/blog/article-2.jpeg",
    date: "9 December 2025",
    category: "Home Cleaning",
    body: [
      "1. Clean in short, focused bursts. Ten minutes tidying a single room beats an occasional multi-hour marathon — it's easier to fit into a packed schedule and prevents mess from accumulating.",
      "2. Tackle high-touch surfaces first. Door handles, countertops, and remote controls collect the most daily grime and deserve priority over less-used areas.",
      "3. Keep a 'reset' basket by the door for items that don't belong in the room they end up in — clear it once a day instead of letting clutter migrate.",
      "4. Let the right products do the work. Multi-surface eco-friendly cleaners cut down on the number of products (and decisions) you need mid-week.",
      "5. Outsource what doesn't need to be yours. A scheduled professional clean — like Pearly Sky's Regular Home Cleaning — frees up the hours that matter more to you.",
    ],
    translations: {
      fr: {
        title: "5 conseils de ménage pour les professionnels pressés",
        description:
          "Des conseils d’experts pour garder votre espace propre et organisé, même lors des journées les plus chargées.",
        body: [
          "1. Nettoyez par sessions courtes et ciblées. Dix minutes pour ranger une seule pièce valent mieux qu’un marathon de plusieurs heures de temps en temps — c’est plus facile à caser dans un emploi du temps chargé et cela évite l’accumulation du désordre.",
          "2. Commencez par les surfaces les plus touchées. Poignées de porte, plans de travail et télécommandes accumulent le plus de saleté au quotidien et méritent la priorité sur les zones moins utilisées.",
          "3. Gardez un panier « remise en ordre » près de la porte pour les objets qui ne sont pas à leur place — videz-le une fois par jour au lieu de laisser le désordre se déplacer.",
          "4. Laissez les bons produits faire le travail. Les nettoyants écologiques multi-surfaces réduisent le nombre de produits (et de décisions) dont vous avez besoin en semaine.",
          "5. Déléguez ce qui n’a pas besoin d’être fait par vous. Un ménage professionnel programmé — comme le Nettoyage régulier de Pearly Sky — vous libère les heures qui comptent le plus pour vous.",
        ],
      },
      de: {
        title: "Die 5 besten Reinigungstipps für Berufstätige",
        description:
          "Expertentipps, wie Sie Ihre Räume auch an den vollsten Tagen sauber und ordentlich halten.",
        body: [
          "1. Reinigen Sie in kurzen, gezielten Einheiten. Zehn Minuten in einem einzigen Raum sind besser als ein gelegentlicher stundenlanger Putzmarathon — das passt leichter in einen vollen Terminkalender und verhindert, dass sich Unordnung ansammelt.",
          "2. Kümmern Sie sich zuerst um häufig berührte Flächen. Türgriffe, Arbeitsplatten und Fernbedienungen sammeln täglich den meisten Schmutz und haben Vorrang vor weniger genutzten Bereichen.",
          "3. Stellen Sie einen „Aufräumkorb“ an die Tür für Dinge, die nicht in den Raum gehören, in dem sie gelandet sind — leeren Sie ihn einmal täglich, statt die Unordnung wandern zu lassen.",
          "4. Lassen Sie die richtigen Produkte die Arbeit machen. Umweltfreundliche Allzweckreiniger reduzieren die Anzahl der Produkte (und Entscheidungen), die Sie unter der Woche brauchen.",
          "5. Geben Sie ab, was Sie nicht selbst erledigen müssen. Eine regelmäßige professionelle Reinigung — wie die Regelmäßige Wohnungsreinigung von Pearly Sky — schenkt Ihnen die Stunden, die Ihnen wichtiger sind.",
        ],
      },
      es: {
        title: "5 consejos de limpieza para profesionales ocupados",
        description:
          "Consejos de expertos para mantener tu espacio limpio y ordenado, incluso en los días más ajetreados.",
        body: [
          "1. Limpia en sesiones cortas y concentradas. Diez minutos ordenando una sola habitación son mejor que una maratón ocasional de varias horas: es más fácil de encajar en una agenda apretada y evita que el desorden se acumule.",
          "2. Empieza por las superficies que más se tocan. Pomos, encimeras y mandos a distancia acumulan la mayor parte de la suciedad diaria y merecen prioridad frente a las zonas menos usadas.",
          "3. Ten una cesta de «orden» junto a la puerta para los objetos que no están en su sitio: vacíala una vez al día en lugar de dejar que el desorden se extienda.",
          "4. Deja que los productos adecuados hagan el trabajo. Los limpiadores ecológicos multisuperficie reducen la cantidad de productos (y de decisiones) que necesitas entre semana.",
          "5. Delega lo que no tienes por qué hacer tú. Una limpieza profesional programada — como la Limpieza regular del hogar de Pearly Sky — te libera las horas que más te importan.",
        ],
      },
      it: {
        title: "I 5 migliori consigli di pulizia per professionisti impegnati",
        description:
          "Consigli degli esperti per mantenere i tuoi spazi puliti e ordinati, anche nelle giornate più intense.",
        body: [
          "1. Pulisci in sessioni brevi e mirate. Dieci minuti dedicati a una sola stanza valgono più di una maratona occasionale di diverse ore: è più facile inserirli in un’agenda piena ed evita che il disordine si accumuli.",
          "2. Inizia dalle superfici più toccate. Maniglie, piani di lavoro e telecomandi raccolgono la maggior parte dello sporco quotidiano e meritano la precedenza rispetto alle zone meno usate.",
          "3. Tieni un cesto «riordino» vicino alla porta per gli oggetti fuori posto: svuotalo una volta al giorno invece di lasciare che il disordine si sposti da una stanza all’altra.",
          "4. Lascia lavorare i prodotti giusti. I detergenti ecologici multisuperficie riducono il numero di prodotti (e di decisioni) di cui hai bisogno durante la settimana.",
          "5. Affida ad altri ciò che non devi fare tu. Una pulizia professionale programmata — come la Pulizia regolare della casa di Pearly Sky — ti restituisce le ore che contano di più per te.",
        ],
      },
    },
  },
  {
    slug: "eco-friendly-cleaning",
    title: "The Benefits Of Eco-Friendly Cleaning Services",
    description:
      "Learn about the advantages of choosing eco-friendly cleaning services for your home or business.",
    image: "/images/blog/article-3.jpeg",
    date: "9 December 2025",
    category: "Eco-Friendly Living",
    body: [
      "Conventional cleaning products often trade effectiveness for harsh chemicals — leaving residues that affect indoor air quality and aren't always safe around children or pets.",
      "Eco-friendly cleaning flips that trade-off. Modern sustainable formulas clean just as thoroughly while being gentler on surfaces, safer for the people and animals who live in the space, and kinder to the environment once they're rinsed away.",
      "It's a standard we hold across every Pearly Sky service — luxury-grade results without the compromise, for homes and offices wherever we serve them.",
    ],
    translations: {
      fr: {
        title: "Les avantages des services de nettoyage écologiques",
        description:
          "Découvrez les avantages de choisir des services de nettoyage écologiques pour votre domicile ou votre entreprise.",
        body: [
          "Les produits de nettoyage conventionnels misent souvent sur des produits chimiques agressifs pour être efficaces — laissant des résidus qui altèrent la qualité de l’air intérieur et ne sont pas toujours sans danger pour les enfants ou les animaux.",
          "Le nettoyage écologique inverse ce compromis. Les formules durables modernes nettoient tout aussi efficacement tout en étant plus douces pour les surfaces, plus sûres pour les personnes et les animaux qui vivent dans l’espace, et plus respectueuses de l’environnement une fois rincées.",
          "C’est une exigence que nous appliquons à chaque service Pearly Sky — des résultats dignes du luxe sans compromis, pour les logements et les bureaux partout où nous intervenons.",
        ],
      },
      de: {
        title: "Die Vorteile umweltfreundlicher Reinigungsdienste",
        description:
          "Erfahren Sie, welche Vorteile umweltfreundliche Reinigungsdienste für Ihr Zuhause oder Ihr Unternehmen bieten.",
        body: [
          "Herkömmliche Reinigungsmittel erkaufen ihre Wirkung oft mit aggressiven Chemikalien — und hinterlassen Rückstände, die die Raumluft beeinträchtigen und nicht immer unbedenklich für Kinder oder Haustiere sind.",
          "Umweltfreundliche Reinigung kehrt diesen Kompromiss um. Moderne nachhaltige Formeln reinigen genauso gründlich, sind dabei aber schonender zu Oberflächen, sicherer für die Menschen und Tiere im Haushalt und umweltverträglicher, sobald sie abgespült sind.",
          "Diesen Standard halten wir bei jeder Leistung von Pearly Sky ein — Ergebnisse auf Luxusniveau ohne Kompromisse, für Wohnungen und Büros überall dort, wo wir tätig sind.",
        ],
      },
      es: {
        title: "Las ventajas de los servicios de limpieza ecológicos",
        description:
          "Descubre las ventajas de elegir servicios de limpieza ecológicos para tu hogar o tu empresa.",
        body: [
          "Los productos de limpieza convencionales suelen recurrir a químicos agresivos para ser eficaces, dejando residuos que afectan a la calidad del aire interior y no siempre son seguros para niños o mascotas.",
          "La limpieza ecológica invierte esa ecuación. Las fórmulas sostenibles modernas limpian con la misma eficacia y, a la vez, son más suaves con las superficies, más seguras para las personas y los animales que viven en el espacio y más respetuosas con el medio ambiente una vez aclaradas.",
          "Es un estándar que mantenemos en todos los servicios de Pearly Sky: resultados de nivel lujo sin concesiones, para hogares y oficinas allí donde trabajamos.",
        ],
      },
      it: {
        title: "I vantaggi dei servizi di pulizia ecologici",
        description:
          "Scopri i vantaggi di scegliere servizi di pulizia ecologici per la tua casa o la tua attività.",
        body: [
          "I prodotti per la pulizia tradizionali spesso ottengono efficacia a costo di sostanze chimiche aggressive, lasciando residui che peggiorano la qualità dell’aria interna e non sono sempre sicuri per bambini o animali domestici.",
          "La pulizia ecologica ribalta questo compromesso. Le moderne formule sostenibili puliscono con la stessa accuratezza, ma sono più delicate sulle superfici, più sicure per le persone e gli animali che vivono negli ambienti e più rispettose dell’ambiente una volta risciacquate.",
          "È uno standard che manteniamo in ogni servizio Pearly Sky: risultati di livello luxury senza compromessi, per case e uffici ovunque operiamo.",
        ],
      },
    },
  },
  {
    slug: "choose-right-cleaning-service",
    title: "How To Choose The Right Cleaning Service For Your Needs",
    description:
      "Find out what to look for when selecting a cleaning service that meets your specific requirements.",
    image: "/images/blog/choose-right-cleaning-service.jpg",
    date: "9 December 2025",
    category: "Property Care",
    body: [
      "Not every cleaning need is the same — a weekly residential tidy, a post-construction deep clean, and a same-day Airbnb turnaround all call for different expertise, equipment, and turnaround time.",
      "Start by matching the service to the job: look for providers who specialize (not just generalize) in the type of clean you need, and who are transparent about pricing and what's included.",
      "Then look at trust signals — vetted staff, consistent ratings, and clear communication. Pearly Sky's full service catalog is built around exactly this: pick the service that matches your situation, and book it in under a minute.",
    ],
    translations: {
      fr: {
        title: "Comment choisir le service de nettoyage adapté à vos besoins",
        description:
          "Découvrez les critères à prendre en compte pour choisir un service de nettoyage qui répond à vos exigences.",
        body: [
          "Tous les besoins de nettoyage ne se ressemblent pas — un entretien hebdomadaire à domicile, un nettoyage en profondeur après travaux et une remise en état Airbnb le jour même demandent chacun une expertise, un équipement et des délais différents.",
          "Commencez par adapter le service à la tâche : recherchez des prestataires spécialisés (et pas seulement généralistes) dans le type de nettoyage dont vous avez besoin, et transparents sur leurs tarifs et sur ce qui est inclus.",
          "Regardez ensuite les signes de confiance — personnel vérifié, avis constants et communication claire. Le catalogue complet de Pearly Sky est conçu exactement pour cela : choisissez le service adapté à votre situation et réservez-le en moins d’une minute.",
        ],
      },
      de: {
        title: "So wählen Sie den passenden Reinigungsdienst für Ihre Bedürfnisse",
        description:
          "Erfahren Sie, worauf Sie bei der Auswahl eines Reinigungsdienstes achten sollten, der Ihre Anforderungen erfüllt.",
        body: [
          "Nicht jeder Reinigungsbedarf ist gleich — eine wöchentliche Wohnungsreinigung, eine Grundreinigung nach Bauarbeiten und ein Airbnb-Wechsel am selben Tag erfordern jeweils unterschiedliches Fachwissen, andere Ausrüstung und andere Zeitfenster.",
          "Ordnen Sie zuerst die Leistung der Aufgabe zu: Suchen Sie Anbieter, die sich auf die benötigte Reinigungsart spezialisiert haben (statt alles ein bisschen anzubieten) und die transparent über Preise und Leistungsumfang informieren.",
          "Achten Sie dann auf Vertrauenssignale — überprüftes Personal, beständig gute Bewertungen und klare Kommunikation. Genau darauf ist der gesamte Leistungskatalog von Pearly Sky ausgelegt: Wählen Sie die Leistung, die zu Ihrer Situation passt, und buchen Sie sie in weniger als einer Minute.",
        ],
      },
      es: {
        title: "Cómo elegir el servicio de limpieza adecuado a tus necesidades",
        description:
          "Descubre qué tener en cuenta al elegir un servicio de limpieza que se ajuste a tus necesidades concretas.",
        body: [
          "No todas las necesidades de limpieza son iguales: una limpieza semanal del hogar, una limpieza profunda tras una obra y una puesta a punto de un Airbnb en el mismo día requieren experiencia, equipos y plazos distintos.",
          "Empieza por adaptar el servicio al trabajo: busca proveedores especializados (no solo generalistas) en el tipo de limpieza que necesitas y que sean transparentes con los precios y con lo que incluye el servicio.",
          "Después fíjate en las señales de confianza: personal verificado, valoraciones constantes y una comunicación clara. Todo el catálogo de servicios de Pearly Sky está pensado exactamente para esto: elige el servicio que se ajusta a tu situación y resérvalo en menos de un minuto.",
        ],
      },
      it: {
        title: "Come scegliere il servizio di pulizia giusto per le tue esigenze",
        description:
          "Scopri a cosa prestare attenzione quando scegli un servizio di pulizia adatto alle tue esigenze specifiche.",
        body: [
          "Non tutte le esigenze di pulizia sono uguali: una pulizia settimanale della casa, una pulizia profonda dopo i lavori e il riassetto in giornata di un Airbnb richiedono competenze, attrezzature e tempi diversi.",
          "Inizia abbinando il servizio al lavoro: cerca fornitori specializzati (non solo generalisti) nel tipo di pulizia di cui hai bisogno e trasparenti su prezzi e servizi inclusi.",
          "Poi valuta i segnali di affidabilità: personale verificato, valutazioni costanti e comunicazione chiara. L’intero catalogo di servizi di Pearly Sky è pensato proprio per questo: scegli il servizio adatto alla tua situazione e prenotalo in meno di un minuto.",
        ],
      },
    },
  },
];

function stripTranslations({ slug, title, description, image, date, category, body }: BlogPostSource): BlogPost {
  return { slug, title, description, image, date, category, body };
}

/** All posts in English — use getBlogPosts(language) for anything rendered to a visitor. */
export const blogPosts: BlogPost[] = posts.map(stripTranslations);

/** The post's title/description/body in `language`, falling back to English when no translation exists. */
function localize(post: BlogPostSource, language: LanguageCode | null): BlogPost {
  const copy = language ? post.translations[language] : undefined;
  return { ...stripTranslations(post), ...copy };
}

export function getBlogPosts(language: LanguageCode | null): BlogPost[] {
  return posts.map((post) => localize(post, language));
}

export function getBlogPost(slug: string, language: LanguageCode | null = null): BlogPost | undefined {
  const post = posts.find((p) => p.slug === slug);
  return post && localize(post, language);
}

/** "9 December 2025" → "9 décembre 2025" etc.; returns the stored string unchanged if it can't be parsed. */
export function formatBlogDate(date: string, language: LanguageCode | null): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;
  // en-GB keeps English as "9 December 2025", matching how dates are written in the content.
  return new Intl.DateTimeFormat(!language || language === "en" ? "en-GB" : language, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(parsed.getFullYear(), parsed.getMonth(), parsed.getDate())),
  );
}
