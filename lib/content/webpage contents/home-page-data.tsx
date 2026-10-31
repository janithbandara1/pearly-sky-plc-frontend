import { TranslationKey } from "@/lib/i18n/dictionaries/en";

interface HeroData {
  tagline: string | TranslationKey;
  titlePrefix: string | TranslationKey;
  titleHighlight: string | TranslationKey;
  titleSuffix: string | TranslationKey;
  countryName: string | TranslationKey;
  description: string | TranslationKey;
  categories: Array<{
    label: string;
    icon: 'home' | 'commercial' | 'specialist';
    gridId?:string,
  }>;
  ctaPrimary: string |TranslationKey;
  ctaSecondary: string | TranslationKey;
  trustBadges: [string , string , string ] | TranslationKey;
}


export const countryHeroContent: Record<string, HeroData> = {
  "uk": {
    tagline: 'PURE SPACES. ELEVATED UK LIVING.',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'Eco-Luxury Cleaning ',
    titleSuffix: 'for Homes and Workspaces in ',
    countryName: 'United Kingdom',
    description:
      'Thoughtful, professional cleaning for homes and workspaces across the UK. Enjoy meticulous care, clear communication, and a service tailored to your space.',
    categories: [
      { label: 'Residential', icon: 'home' },
      { label: 'Commercial', icon: 'commercial' },
      { label: 'Specialist Care', icon: 'specialist' },
    ],
    ctaPrimary: 'BOOK YOUR CLEANING SERVICE',
    ctaSecondary: 'GET A FREE QUOTE',
    trustBadges: [
      '100% Satisfaction Guarantee',
      'DBS Checked & Vetted Specialists',
      '24/7 Dedicated UK Client Care',
    ],
  },
  "fr": {
    tagline: 'tagline',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'titleHighlight',
    titleSuffix: 'titleSuffix',
    countryName: 'countryName',
    description:
      'description',
    categories: [
      { label: 'Residential', icon: 'home',gridId:"ResidentialCleaning" },
      { label: 'Commercial', icon: 'commercial',gridId:"CommercialSpecialised" },
      { label: 'SpecialistCare', icon: 'specialist',gridId:"CommercialSpecialised" },
    ],
    ctaPrimary: 'ctaPrimary',
    ctaSecondary: 'ctaSecondary',
    trustBadges: 'trustBadges',
  },
  "lk": {
    tagline: 'PURE SPACES. ELEVATED SRI LANKAN LIVING.',
    titlePrefix: 'Pearly Sky — ',
    titleHighlight: 'Eco-Luxury Cleaning ',
    titleSuffix: 'for Homes and Workspaces in ',
    countryName: 'Sri Lanka',
    description:
      'Thoughtful, professional cleaning for homes and workspaces across Colombo & Sri Lanka. Enjoy meticulous care, clear communication, and a service tailored to your space.',
    categories: [
      { label: 'Residential', icon: 'home' },
      { label: 'Commercial', icon: 'commercial' },
      { label: 'Specialist Care', icon: 'specialist' },
    ],
    ctaPrimary: 'BOOK YOUR CLEANING SERVICE',
    ctaSecondary: 'GET A FREE QUOTE',
    trustBadges: [
      '100% Satisfaction Guarantee',
      'Verified & Trained Specialists',
      '24/7 Dedicated Client Care',
    ],
  },
};


export interface AboutContent {
  regionTitle: string;
  headlineHighlight: string;
  descriptionMain: string;
  descriptionEco: string;
  bannerTitle: string;
  bannerSubtitle: string;
  imageSrc: string;
}

export const aboutData: Record<'fr' | 'uk' | 'lk', AboutContent> = {
  fr: {
    regionTitle: 'regionTitle',
    headlineHighlight: 'headlineHighlight',
    descriptionMain:
      'descriptionMain',
    descriptionEco:
      'descriptionEco',
    bannerTitle: 'bannerTitle',
    bannerSubtitle: 'bannerSubtitle',
    imageSrc: '/images/hero/about-fr.webp',
  },
  uk: {
    regionTitle: 'Service Excellence Across United Kingdom',
    headlineHighlight: 'Service Excellence Across London & UK',
    descriptionMain:
      'At Pearly Sky, we understand that maintaining a pristine environment is essential for productivity and well-being. Whether you require routine home cleaning, comprehensive office deep-cleaning, or specialized estate care services, our team delivers unmatched quality across the UK.',
    descriptionEco:
      'We utilize eco-friendly, luxury-grade cleaning products that are safe for your family, pets, and workplace, ensuring a thorough clean without harsh chemicals.',
    bannerTitle: 'Professional Vetted British Teams',
    bannerSubtitle: 'Seamless communication & elite standards across the UK',
    imageSrc: '/images/hero/about-uk.webp',
  },
  lk: {
    regionTitle: 'Service Excellence Across Sri Lanka',
    headlineHighlight: 'Service Excellence Across Colombo & Sri Lanka',
    descriptionMain:
      'At Pearly Sky, we understand that maintaining a pristine environment is essential for productivity and well-being. Whether you require routine home cleaning, comprehensive office deep-cleaning, or specialized commercial property care, our team delivers unmatched quality across Sri Lanka.',
    descriptionEco:
      'We utilize eco-friendly, luxury-grade cleaning products that are safe for your family, pets, and workplace, ensuring a thorough clean without harsh chemicals.',
    bannerTitle: 'Expert Certified Local Teams',
    bannerSubtitle: 'Dedicated support across Colombo & regional provinces',
    imageSrc: '/images/hero/about-lk.webp', 
  },
};

export const getTranslatedWord=(CURRENT_COUNTRY: string , key: any, translate: any )=>{
    if(CURRENT_COUNTRY === "fr"){
      return translate(key as TranslationKey);
    }
    return key;
  }