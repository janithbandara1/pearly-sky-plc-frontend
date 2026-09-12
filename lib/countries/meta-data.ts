import type { CountryCode } from "./config";

export interface PageMeta {
  title: string;
  description?: string;
}

/** Fallback <title>/description, used by app/layout.tsx's root `metadata` export whenever a page has no `generateMetadata()` of its own. */
export const GLOBAL_META: PageMeta = {
  title: "Pearly Sky",
  description: "Cleaning services, booking, and account management.",
};

type CountryPageKey = "home" | "about" | "customers" | "contact" | "careers" | "ourLocations" | "blog";

/**
 * <title>/description for pages whose copy names the visitor's country —
 * same [page][country] matrix pattern used by home-content.ts/page-content.ts
 * for the rest of these pages' body content. Text is transcribed verbatim
 * from the master blueprint (frontend/docs/pearly-sky-global-master-blueprint.md,
 * section 3) for every country it covers, so hreflang-alternate URLs don't
 * read as duplicate content.
 */
const COUNTRY_PAGE_META: Record<CountryPageKey, Record<CountryCode, PageMeta>> = {
  home: {
    fr: {
      title: "Premium Eco-Luxury Cleaning Services France & Monaco | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in France & Monaco. Five-star premium property care using sustainable, high-performance practices.",
    },
    de: {
      title: "Premium Eco-Luxury Cleaning Services Germany | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Germany. Five-star premium property care using sustainable, high-performance practices.",
    },
    lu: {
      title: "Premium Eco-Luxury Cleaning Services Luxembourg | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Luxembourg. Five-star premium property care using sustainable, high-performance practices.",
    },
    nl: {
      title: "Premium Eco-Luxury Cleaning Services Netherlands | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in The Netherlands. Five-star premium property care using sustainable, high-performance practices.",
    },
    fi: {
      title: "Premium Eco-Luxury Cleaning Services Finland | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Finland. Five-star premium property care using sustainable, high-performance practices.",
    },
    se: {
      title: "Premium Eco-Luxury Cleaning Services Sweden | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Sweden. Five-star premium property care using sustainable, high-performance practices.",
    },
    it: {
      title: "Premium Eco-Luxury Cleaning Services Italy | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Italy. Five-star premium property care using sustainable, high-performance practices.",
    },
    pl: {
      title: "Premium Eco-Luxury Cleaning Services Poland | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Poland. Five-star premium property care using sustainable, high-performance practices.",
    },
    be: {
      title: "Premium Eco-Luxury Cleaning Services Belgium | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Belgium. Five-star premium property care using sustainable, high-performance practices.",
    },
    at: {
      title: "Premium Eco-Luxury Cleaning Services Austria | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Austria. Five-star premium property care using sustainable, high-performance practices.",
    },
    dk: {
      title: "Premium Eco-Luxury Cleaning Services Denmark | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Denmark. Five-star premium property care using sustainable, high-performance practices.",
    },
    es: {
      title: "Premium Eco-Luxury Cleaning Services Spain | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Spain. Five-star premium property care using sustainable, high-performance practices.",
    },
    pt: {
      title: "Premium Eco-Luxury Cleaning Services Portugal | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Portugal. Five-star premium property care using sustainable, high-performance practices.",
    },
    ro: {
      title: "Premium Eco-Luxury Cleaning Services Romania | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Romania. Five-star premium property care using sustainable, high-performance practices.",
    },
    ie: {
      title: "Premium Eco-Luxury Cleaning Services Ireland | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Ireland. Five-star premium property care using sustainable, high-performance practices.",
    },
    mc: {
      title: "Premium Eco-Luxury Cleaning Services Monaco | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Monaco. Five-star premium property care using sustainable, high-performance practices.",
    },
    ch: {
      title: "Premium Eco-Luxury Cleaning Services Switzerland | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Switzerland. Five-star premium property care using sustainable, high-performance practices.",
    },
    gb: {
      title: "Premium Eco-Luxury Cleaning Services United Kingdom | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in The United Kingdom. Five-star premium property care using sustainable, high-performance practices.",
    },
    us: {
      title: "Premium Eco-Luxury Cleaning Services United States | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in The United States. Five-star premium property care using sustainable, high-performance practices.",
    },
    ca: {
      title: "Premium Eco-Luxury Cleaning Services Canada | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Canada. Five-star premium property care using sustainable, high-performance practices.",
    },
    au: {
      title: "Premium Eco-Luxury Cleaning Services Australia | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Australia. Five-star premium property care using sustainable, high-performance practices.",
    },
    nz: {
      title: "Premium Eco-Luxury Cleaning Services New Zealand | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in New Zealand. Five-star premium property care using sustainable, high-performance practices.",
    },
    qa: {
      title: "Premium Eco-Luxury Cleaning Services Qatar | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Qatar. Five-star premium property care using sustainable, high-performance practices.",
    },
    sa: {
      title: "Premium Eco-Luxury Cleaning Services Saudi Arabia | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Saudi Arabia. Five-star premium property care using sustainable, high-performance practices.",
    },
    ae: {
      title: "Premium Eco-Luxury Cleaning Services United Arab Emirates | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in The United Arab Emirates. Five-star premium property care using sustainable, high-performance practices.",
    },
    om: {
      title: "Premium Eco-Luxury Cleaning Services Oman | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Oman. Five-star premium property care using sustainable, high-performance practices.",
    },
    bh: {
      title: "Premium Eco-Luxury Cleaning Services Bahrain | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Bahrain. Five-star premium property care using sustainable, high-performance practices.",
    },
    lk: {
      title: "Premium Eco-Luxury Cleaning Services Sri Lanka | Pearly Sky",
      description:
        "Experience elite, eco-luxury residential & commercial cleaning in Sri Lanka. Five-star premium property care using sustainable, high-performance practices.",
    },
  },
  about: {
    fr: {
      title: "About Us: Eco-Luxury Property Care France & Monaco | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in France & Monaco. Dedicated to elite property care and lifestyle support.",
    },
    de: {
      title: "About Us: Eco-Luxury Property Care Germany | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Germany. Dedicated to elite property care and lifestyle support.",
    },
    lu: {
      title: "About Us: Eco-Luxury Property Care Luxembourg | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Luxembourg. Dedicated to elite property care and lifestyle support.",
    },
    nl: {
      title: "About Us: Eco-Luxury Property Care Netherlands | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in The Netherlands. Dedicated to elite property care and lifestyle support.",
    },
    fi: {
      title: "About Us: Eco-Luxury Property Care Finland | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Finland. Dedicated to elite property care and lifestyle support.",
    },
    se: {
      title: "About Us: Eco-Luxury Property Care Sweden | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Sweden. Dedicated to elite property care and lifestyle support.",
    },
    it: {
      title: "About Us: Eco-Luxury Property Care Italy | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Italy. Dedicated to elite property care and lifestyle support.",
    },
    pl: {
      title: "About Us: Eco-Luxury Property Care Poland | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Poland. Dedicated to elite property care and lifestyle support.",
    },
    be: {
      title: "About Us: Eco-Luxury Property Care Belgium | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Belgium. Dedicated to elite property care and lifestyle support.",
    },
    at: {
      title: "About Us: Eco-Luxury Property Care Austria | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Austria. Dedicated to elite property care and lifestyle support.",
    },
    dk: {
      title: "About Us: Eco-Luxury Property Care Denmark | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Denmark. Dedicated to elite property care and lifestyle support.",
    },
    es: {
      title: "About Us: Eco-Luxury Property Care Spain | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Spain. Dedicated to elite property care and lifestyle support.",
    },
    pt: {
      title: "About Us: Eco-Luxury Property Care Portugal | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Portugal. Dedicated to elite property care and lifestyle support.",
    },
    ro: {
      title: "About Us: Eco-Luxury Property Care Romania | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Romania. Dedicated to elite property care and lifestyle support.",
    },
    ie: {
      title: "About Us: Eco-Luxury Property Care Ireland | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Ireland. Dedicated to elite property care and lifestyle support.",
    },
    mc: {
      title: "About Us: Eco-Luxury Property Care Monaco | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Monaco. Dedicated to elite property care and lifestyle support.",
    },
    ch: {
      title: "About Us: Eco-Luxury Property Care Switzerland | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Switzerland. Dedicated to elite property care and lifestyle support.",
    },
    gb: {
      title: "About Us: Eco-Luxury Property Care United Kingdom | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in The United Kingdom. Dedicated to elite property care and lifestyle support.",
    },
    us: {
      title: "About Us: Eco-Luxury Property Care United States | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in The United States. Dedicated to elite property care and lifestyle support.",
    },
    ca: {
      title: "About Us: Eco-Luxury Property Care Canada | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Canada. Dedicated to elite property care and lifestyle support.",
    },
    au: {
      title: "About Us: Eco-Luxury Property Care Australia | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Australia. Dedicated to elite property care and lifestyle support.",
    },
    nz: {
      title: "About Us: Eco-Luxury Property Care New Zealand | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in New Zealand. Dedicated to elite property care and lifestyle support.",
    },
    qa: {
      title: "About Us: Eco-Luxury Property Care Qatar | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Qatar. Dedicated to elite property care and lifestyle support.",
    },
    sa: {
      title: "About Us: Eco-Luxury Property Care Saudi Arabia | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Saudi Arabia. Dedicated to elite property care and lifestyle support.",
    },
    ae: {
      title: "About Us: Eco-Luxury Property Care United Arab Emirates | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in The United Arab Emirates. Dedicated to elite property care and lifestyle support.",
    },
    om: {
      title: "About Us: Eco-Luxury Property Care Oman | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Oman. Dedicated to elite property care and lifestyle support.",
    },
    bh: {
      title: "About Us: Eco-Luxury Property Care Bahrain | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Bahrain. Dedicated to elite property care and lifestyle support.",
    },
    lk: {
      title: "About Us: Eco-Luxury Property Care Sri Lanka | Pearly Sky",
      description:
        "Discover the story, strict standards, and values driving Pearly Sky Global in Sri Lanka. Dedicated to elite property care and lifestyle support.",
    },
  },
  customers: {
    fr: {
      title: "Verified Client Reviews & Testimonials France & Monaco | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in France & Monaco.",
    },
    de: {
      title: "Verified Client Reviews & Testimonials Germany | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Germany.",
    },
    lu: {
      title: "Verified Client Reviews & Testimonials Luxembourg | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Luxembourg.",
    },
    nl: {
      title: "Verified Client Reviews & Testimonials Netherlands | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The Netherlands.",
    },
    fi: {
      title: "Verified Client Reviews & Testimonials Finland | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Finland.",
    },
    se: {
      title: "Verified Client Reviews & Testimonials Sweden | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Sweden.",
    },
    it: {
      title: "Verified Client Reviews & Testimonials Italy | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Italy.",
    },
    pl: {
      title: "Verified Client Reviews & Testimonials Poland | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Poland.",
    },
    be: {
      title: "Verified Client Reviews & Testimonials Belgium | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Belgium.",
    },
    at: {
      title: "Verified Client Reviews & Testimonials Austria | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Austria.",
    },
    dk: {
      title: "Verified Client Reviews & Testimonials Denmark | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Denmark.",
    },
    es: {
      title: "Verified Client Reviews & Testimonials Spain | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Spain.",
    },
    pt: {
      title: "Verified Client Reviews & Testimonials Portugal | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Portugal.",
    },
    ro: {
      title: "Verified Client Reviews & Testimonials Romania | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Romania.",
    },
    ie: {
      title: "Verified Client Reviews & Testimonials Ireland | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Ireland.",
    },
    mc: {
      title: "Verified Client Reviews & Testimonials Monaco | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Monaco.",
    },
    ch: {
      title: "Verified Client Reviews & Testimonials Switzerland | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Switzerland.",
    },
    gb: {
      title: "Verified Client Reviews & Testimonials United Kingdom | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The United Kingdom.",
    },
    us: {
      title: "Verified Client Reviews & Testimonials United States | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The United States.",
    },
    ca: {
      title: "Verified Client Reviews & Testimonials Canada | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Canada.",
    },
    au: {
      title: "Verified Client Reviews & Testimonials Australia | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Australia.",
    },
    nz: {
      title: "Verified Client Reviews & Testimonials New Zealand | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in New Zealand.",
    },
    qa: {
      title: "Verified Client Reviews & Testimonials Qatar | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Qatar.",
    },
    sa: {
      title: "Verified Client Reviews & Testimonials Saudi Arabia | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Saudi Arabia.",
    },
    ae: {
      title: "Verified Client Reviews & Testimonials United Arab Emirates | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in The United Arab Emirates.",
    },
    om: {
      title: "Verified Client Reviews & Testimonials Oman | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Oman.",
    },
    bh: {
      title: "Verified Client Reviews & Testimonials Bahrain | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Bahrain.",
    },
    lk: {
      title: "Verified Client Reviews & Testimonials Sri Lanka | Pearly Sky",
      description:
        "See what our clients say about us. Read verified reviews from premium homeowners, corporate offices, and luxury estates in Sri Lanka.",
    },
  },
  contact: {
    fr: {
      title: "Contact Our Eco-Luxury Cleaning Team France & Monaco | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global France & Monaco for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    de: {
      title: "Contact Our Eco-Luxury Cleaning Team Germany | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Germany for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    lu: {
      title: "Contact Our Eco-Luxury Cleaning Team Luxembourg | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Luxembourg for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    nl: {
      title: "Contact Our Eco-Luxury Cleaning Team Netherlands | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Netherlands for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    fi: {
      title: "Contact Our Eco-Luxury Cleaning Team Finland | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Finland for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    se: {
      title: "Contact Our Eco-Luxury Cleaning Team Sweden | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Sweden for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    it: {
      title: "Contact Our Eco-Luxury Cleaning Team Italy | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Italy for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    pl: {
      title: "Contact Our Eco-Luxury Cleaning Team Poland | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Poland for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    be: {
      title: "Contact Our Eco-Luxury Cleaning Team Belgium | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Belgium for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    at: {
      title: "Contact Our Eco-Luxury Cleaning Team Austria | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Austria for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    dk: {
      title: "Contact Our Eco-Luxury Cleaning Team Denmark | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Denmark for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    es: {
      title: "Contact Our Eco-Luxury Cleaning Team Spain | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Spain for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    pt: {
      title: "Contact Our Eco-Luxury Cleaning Team Portugal | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Portugal for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    ro: {
      title: "Contact Our Eco-Luxury Cleaning Team Romania | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Romania for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    ie: {
      title: "Contact Our Eco-Luxury Cleaning Team Ireland | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Ireland for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    mc: {
      title: "Contact Our Eco-Luxury Cleaning Team Monaco | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Monaco for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    ch: {
      title: "Contact Our Eco-Luxury Cleaning Team Switzerland | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Switzerland for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    gb: {
      title: "Contact Our Eco-Luxury Cleaning Team United Kingdom | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global United Kingdom for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    us: {
      title: "Contact Our Eco-Luxury Cleaning Team United States | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global United States for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    ca: {
      title: "Contact Our Eco-Luxury Cleaning Team Canada | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Canada for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    au: {
      title: "Contact Our Eco-Luxury Cleaning Team Australia | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Australia for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    nz: {
      title: "Contact Our Eco-Luxury Cleaning Team New Zealand | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global New Zealand for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    qa: {
      title: "Contact Our Eco-Luxury Cleaning Team Qatar | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Qatar for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    sa: {
      title: "Contact Our Eco-Luxury Cleaning Team Saudi Arabia | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Saudi Arabia for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    ae: {
      title: "Contact Our Eco-Luxury Cleaning Team United Arab Emirates | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global United Arab Emirates for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    om: {
      title: "Contact Our Eco-Luxury Cleaning Team Oman | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Oman for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    bh: {
      title: "Contact Our Eco-Luxury Cleaning Team Bahrain | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Bahrain for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
    lk: {
      title: "Contact Our Eco-Luxury Cleaning Team Sri Lanka | Pearly Sky",
      description:
        "Get in touch with Pearly Sky Global Sri Lanka for booking inquiries or custom service quotes. Reliable, immediate assistance.",
    },
  },
  careers: {
    fr: {
      title: "Careers in Luxury Property Care France & Monaco | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in France & Monaco. Explore open positions for professional cleaners and premium specialists.",
    },
    de: {
      title: "Careers in Luxury Property Care Germany | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Germany. Explore open positions for professional cleaners and premium specialists.",
    },
    lu: {
      title: "Careers in Luxury Property Care Luxembourg | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Luxembourg. Explore open positions for professional cleaners and premium specialists.",
    },
    nl: {
      title: "Careers in Luxury Property Care Netherlands | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in The Netherlands. Explore open positions for professional cleaners and premium specialists.",
    },
    fi: {
      title: "Careers in Luxury Property Care Finland | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Finland. Explore open positions for professional cleaners and premium specialists.",
    },
    se: {
      title: "Careers in Luxury Property Care Sweden | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Sweden. Explore open positions for professional cleaners and premium specialists.",
    },
    it: {
      title: "Careers in Luxury Property Care Italy | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Italy. Explore open positions for professional cleaners and premium specialists.",
    },
    pl: {
      title: "Careers in Luxury Property Care Poland | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Poland. Explore open positions for professional cleaners and premium specialists.",
    },
    be: {
      title: "Careers in Luxury Property Care Belgium | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Belgium. Explore open positions for professional cleaners and premium specialists.",
    },
    at: {
      title: "Careers in Luxury Property Care Austria | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Austria. Explore open positions for professional cleaners and premium specialists.",
    },
    dk: {
      title: "Careers in Luxury Property Care Denmark | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Denmark. Explore open positions for professional cleaners and premium specialists.",
    },
    es: {
      title: "Careers in Luxury Property Care Spain | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Spain. Explore open positions for professional cleaners and premium specialists.",
    },
    pt: {
      title: "Careers in Luxury Property Care Portugal | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Portugal. Explore open positions for professional cleaners and premium specialists.",
    },
    ro: {
      title: "Careers in Luxury Property Care Romania | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Romania. Explore open positions for professional cleaners and premium specialists.",
    },
    ie: {
      title: "Careers in Luxury Property Care Ireland | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Ireland. Explore open positions for professional cleaners and premium specialists.",
    },
    mc: {
      title: "Careers in Luxury Property Care Monaco | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Monaco. Explore open positions for professional cleaners and premium specialists.",
    },
    ch: {
      title: "Careers in Luxury Property Care Switzerland | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Switzerland. Explore open positions for professional cleaners and premium specialists.",
    },
    gb: {
      title: "Careers in Luxury Property Care United Kingdom | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in The United Kingdom. Explore open positions for professional cleaners and premium specialists.",
    },
    us: {
      title: "Careers in Luxury Property Care United States | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in The United States. Explore open positions for professional cleaners and premium specialists.",
    },
    ca: {
      title: "Careers in Luxury Property Care Canada | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Canada. Explore open positions for professional cleaners and premium specialists.",
    },
    au: {
      title: "Careers in Luxury Property Care Australia | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Australia. Explore open positions for professional cleaners and premium specialists.",
    },
    nz: {
      title: "Careers in Luxury Property Care New Zealand | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in New Zealand. Explore open positions for professional cleaners and premium specialists.",
    },
    qa: {
      title: "Careers in Luxury Property Care Qatar | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Qatar. Explore open positions for professional cleaners and premium specialists.",
    },
    sa: {
      title: "Careers in Luxury Property Care Saudi Arabia | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Saudi Arabia. Explore open positions for professional cleaners and premium specialists.",
    },
    ae: {
      title: "Careers in Luxury Property Care United Arab Emirates | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in The United Arab Emirates. Explore open positions for professional cleaners and premium specialists.",
    },
    om: {
      title: "Careers in Luxury Property Care Oman | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Oman. Explore open positions for professional cleaners and premium specialists.",
    },
    bh: {
      title: "Careers in Luxury Property Care Bahrain | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Bahrain. Explore open positions for professional cleaners and premium specialists.",
    },
    lk: {
      title: "Careers in Luxury Property Care Sri Lanka | Pearly Sky",
      description:
        "Build a rewarding career in luxury property care in Sri Lanka. Explore open positions for professional cleaners and premium specialists.",
    },
  },
  ourLocations: {
    fr: {
      title: "Our Service Locations in France & Monaco | Pearly Sky Global",
      description:
        "Operating premium service clusters across France & Monaco. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    de: {
      title: "Our Service Locations in Germany | Pearly Sky Global",
      description:
        "Operating premium service clusters across Germany. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    lu: {
      title: "Our Service Locations in Luxembourg | Pearly Sky Global",
      description:
        "Operating premium service clusters across Luxembourg. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    nl: {
      title: "Our Service Locations in Netherlands | Pearly Sky Global",
      description:
        "Operating premium service clusters across The Netherlands. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    fi: {
      title: "Our Service Locations in Finland | Pearly Sky Global",
      description:
        "Operating premium service clusters across Finland. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    se: {
      title: "Our Service Locations in Sweden | Pearly Sky Global",
      description:
        "Operating premium service clusters across Sweden. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    it: {
      title: "Our Service Locations in Italy | Pearly Sky Global",
      description:
        "Operating premium service clusters across Italy. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    pl: {
      title: "Our Service Locations in Poland | Pearly Sky Global",
      description:
        "Operating premium service clusters across Poland. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    be: {
      title: "Our Service Locations in Belgium | Pearly Sky Global",
      description:
        "Operating premium service clusters across Belgium. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    at: {
      title: "Our Service Locations in Austria | Pearly Sky Global",
      description:
        "Operating premium service clusters across Austria. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    dk: {
      title: "Our Service Locations in Denmark | Pearly Sky Global",
      description:
        "Operating premium service clusters across Denmark. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    es: {
      title: "Our Service Locations in Spain | Pearly Sky Global",
      description:
        "Operating premium service clusters across Spain. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    pt: {
      title: "Our Service Locations in Portugal | Pearly Sky Global",
      description:
        "Operating premium service clusters across Portugal. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    ro: {
      title: "Our Service Locations in Romania | Pearly Sky Global",
      description:
        "Operating premium service clusters across Romania. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    ie: {
      title: "Our Service Locations in Ireland | Pearly Sky Global",
      description:
        "Operating premium service clusters across Ireland. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    mc: {
      title: "Our Service Locations in Monaco | Pearly Sky Global",
      description:
        "Operating premium service clusters across Monaco. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    ch: {
      title: "Our Service Locations in Switzerland | Pearly Sky Global",
      description:
        "Operating premium service clusters across Switzerland. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    gb: {
      title: "Our Service Locations in United Kingdom | Pearly Sky Global",
      description:
        "Operating premium service clusters across The United Kingdom. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    us: {
      title: "Our Service Locations in United States | Pearly Sky Global",
      description:
        "Operating premium service clusters across The United States. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    ca: {
      title: "Our Service Locations in Canada | Pearly Sky Global",
      description:
        "Operating premium service clusters across Canada. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    au: {
      title: "Our Service Locations in Australia | Pearly Sky Global",
      description:
        "Operating premium service clusters across Australia. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    nz: {
      title: "Our Service Locations in New Zealand | Pearly Sky Global",
      description:
        "Operating premium service clusters across New Zealand. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    qa: {
      title: "Our Service Locations in Qatar | Pearly Sky Global",
      description:
        "Operating premium service clusters across Qatar. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    sa: {
      title: "Our Service Locations in Saudi Arabia | Pearly Sky Global",
      description:
        "Operating premium service clusters across Saudi Arabia. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    ae: {
      title: "Our Service Locations in United Arab Emirates | Pearly Sky Global",
      description:
        "Operating premium service clusters across The United Arab Emirates. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    om: {
      title: "Our Service Locations in Oman | Pearly Sky Global",
      description:
        "Operating premium service clusters across Oman. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    bh: {
      title: "Our Service Locations in Bahrain | Pearly Sky Global",
      description:
        "Operating premium service clusters across Bahrain. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
    lk: {
      title: "Our Service Locations in Sri Lanka | Pearly Sky Global",
      description:
        "Operating premium service clusters across Sri Lanka. Find your local Pearly Sky Global service portal and book elite eco-luxury care.",
    },
  },
  blog: {
    fr: {
      title: "Eco-Luxury Cleaning Blog & Insights France & Monaco | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in France & Monaco.",
    },
    de: {
      title: "Eco-Luxury Cleaning Blog & Insights Germany | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Germany.",
    },
    lu: {
      title: "Eco-Luxury Cleaning Blog & Insights Luxembourg | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Luxembourg.",
    },
    nl: {
      title: "Eco-Luxury Cleaning Blog & Insights Netherlands | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The Netherlands.",
    },
    fi: {
      title: "Eco-Luxury Cleaning Blog & Insights Finland | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Finland.",
    },
    se: {
      title: "Eco-Luxury Cleaning Blog & Insights Sweden | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Sweden.",
    },
    it: {
      title: "Eco-Luxury Cleaning Blog & Insights Italy | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Italy.",
    },
    pl: {
      title: "Eco-Luxury Cleaning Blog & Insights Poland | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Poland.",
    },
    be: {
      title: "Eco-Luxury Cleaning Blog & Insights Belgium | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Belgium.",
    },
    at: {
      title: "Eco-Luxury Cleaning Blog & Insights Austria | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Austria.",
    },
    dk: {
      title: "Eco-Luxury Cleaning Blog & Insights Denmark | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Denmark.",
    },
    es: {
      title: "Eco-Luxury Cleaning Blog & Insights Spain | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Spain.",
    },
    pt: {
      title: "Eco-Luxury Cleaning Blog & Insights Portugal | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Portugal.",
    },
    ro: {
      title: "Eco-Luxury Cleaning Blog & Insights Romania | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Romania.",
    },
    ie: {
      title: "Eco-Luxury Cleaning Blog & Insights Ireland | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Ireland.",
    },
    mc: {
      title: "Eco-Luxury Cleaning Blog & Insights Monaco | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Monaco.",
    },
    ch: {
      title: "Eco-Luxury Cleaning Blog & Insights Switzerland | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Switzerland.",
    },
    gb: {
      title: "Eco-Luxury Cleaning Blog & Insights United Kingdom | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The United Kingdom.",
    },
    us: {
      title: "Eco-Luxury Cleaning Blog & Insights United States | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The United States.",
    },
    ca: {
      title: "Eco-Luxury Cleaning Blog & Insights Canada | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Canada.",
    },
    au: {
      title: "Eco-Luxury Cleaning Blog & Insights Australia | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Australia.",
    },
    nz: {
      title: "Eco-Luxury Cleaning Blog & Insights New Zealand | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in New Zealand.",
    },
    qa: {
      title: "Eco-Luxury Cleaning Blog & Insights Qatar | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Qatar.",
    },
    sa: {
      title: "Eco-Luxury Cleaning Blog & Insights Saudi Arabia | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Saudi Arabia.",
    },
    ae: {
      title: "Eco-Luxury Cleaning Blog & Insights United Arab Emirates | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in The United Arab Emirates.",
    },
    om: {
      title: "Eco-Luxury Cleaning Blog & Insights Oman | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Oman.",
    },
    bh: {
      title: "Eco-Luxury Cleaning Blog & Insights Bahrain | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Bahrain.",
    },
    lk: {
      title: "Eco-Luxury Cleaning Blog & Insights Sri Lanka | Pearly Sky",
      description:
        "Read professional care advice, sustainable housekeeping guides, and elite property maintenance insights for premium spaces in Sri Lanka.",
    },
  },
};

/** Falls back to France when country is null (unprefixed/global site). */
export function getCountryPageMeta(page: CountryPageKey, country: CountryCode | null): PageMeta {
  return COUNTRY_PAGE_META[page][country ?? "fr"];
}

type StaticPageKey = "termsAndConditions" | "privacyPolicy";

/** <title>/description for pages whose copy is identical for every country. */
export const STATIC_PAGE_META: Record<StaticPageKey, PageMeta> = {
  termsAndConditions: {
    title: "Terms and Conditions | Pearly Sky",
  },
  privacyPolicy: {
    title: "Privacy Policy | Pearly Sky",
  },
};
