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
}

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
    },
  },
  {
    slug: "top-5-cleaning-tips",
    title: "Top 5 Cleaning Tips For Busy Professionals",
    description:
      "Get expert advice on how to keep your space clean and organized, even on the busiest of days.",
    image: "/images/blog/article-2.jpeg",
    date: "9 December 2025",
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
    },
  },
  {
    slug: "eco-friendly-cleaning",
    title: "The Benefits Of Eco-Friendly Cleaning Services",
    description:
      "Learn about the advantages of choosing eco-friendly cleaning services for your home or business.",
    image: "/images/blog/article-3.jpeg",
    date: "9 December 2025",
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
    },
  },
  {
    slug: "choose-right-cleaning-service",
    title: "How To Choose The Right Cleaning Service For Your Needs",
    description:
      "Find out what to look for when selecting a cleaning service that meets your specific requirements.",
    image: "/images/blog/choose-right-cleaning-service.jpg",
    date: "9 December 2025",
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
    },
  },
];

function stripTranslations({ slug, title, description, image, date, body }: BlogPostSource): BlogPost {
  return { slug, title, description, image, date, body };
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
