export type CountryCode = 'fr' | 'uk' | 'lk';

export interface Author {
  name: string;
  role: string;
  avatar: string;
}

export interface Article {
  id: string | number;
  title: string;
  category: string;
  region: string;
  date: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: Author;
  fullContent: string;
}

export interface CountryBlogProfile {
  code: CountryCode;
  flag: string;
  name: string;
  currencySymbol: string;
  currencyCode: string;
  phone: string;
  email: string;
  address: string;
  tagline: string;
  heroTitle: string;
  heroHighlight: string;
  heroDescription: string;
  categories: string[];
  marqueeLocations: string[];
  spotlightArticle: Article;
  articles: Article[];
}

export const countryBlogData: Record<CountryCode, CountryBlogProfile> = {
  fr: {
    code: 'fr',
    flag: '🇫🇷',
    name: 'France',
    currencySymbol: '€',
    currencyCode: 'EUR',
    phone: '+33 7 43 70 87 80',
    email: 'info@pearlysky.fr',
    address: '12 Place Vendôme, 75001 Paris, France',
    tagline: 'France Eco-Luxury Edition',
    heroTitle: 'Insights & Eco-Luxury Living in',
    heroHighlight: 'France',
    heroDescription: 'Expert tips, eco-conscious cleaning guides, and luxury lifestyle trends for homes, estates, yachts, and commercial spaces across Paris and the French Riviera.',
    categories: ['All', 'Home & Villa', 'Yacht Cleaning', 'Commercial', 'Sustainability', 'Paris & Riviera'],
    marqueeLocations: [
      'Paris', 'Nice', 'Saint-Tropez', 'Antibes', 'Cannes', 'Monaco', 'Normandy', 
      'Deauville', 'Dieppe', 'La Rochelle', 'Nantes', 'Bordeaux', 'Toulouse', 
      'Toulon', 'Montpellier', 'Strasbourg', 'Arcachon', 'Annecy', 'Biarritz', 
      'Courchevel', 'Megève', 'Aix-en-Provence', 'Mougins'
    ],
    spotlightArticle: {
      id: 0,
      title: 'The Art of Sustainable Yacht Maintenance: Navigating Eco-Luxury Care in Cannes & Monaco',
      category: 'Yacht Cleaning',
      region: 'French Riviera',
      date: 'Oct 18, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Protecting maritime ecosystems without compromising superyacht opulence. Discover our proprietary biodegradable formulas safe for Mediterranean waters, teak decks, and bespoke interior fabrics.',
      author: {
        name: 'Marc Laurent',
        role: 'Head of Riviera Marine Operations',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      fullContent: `
        <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Yacht Cleaning • French Riviera</span>
        <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">The Art of Sustainable Yacht Maintenance: Navigating Eco-Luxury Care in Cannes & Monaco</h2>
        <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
          <span>By Marc Laurent</span> • <span>October 18, 2026</span> • <span>7 min read</span>
        </div>
        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
        <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>Navigating the azure waters between Cannes, Antibes, and Monaco demands a level of care that respects fragile marine ecosystems while upholding the stringent aesthetic expectations of superyacht owners.</p>
          <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">1. Marine-Safe pH Neutral Chemistry</h4>
          <p>Traditional vessel cleaning products contain harsh phosphates and nitrates that disrupt Mediterranean sea life. Pearly Sky employs 100% plant-derived surfactants that break down rapidly without causing toxic residue or teak degradation.</p>
          <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">2. Teak Deck Micro-Restoration</h4>
          <p>Salt water and harsh sunlight erode precious teak wood over time. Our gentle restoration method lifts embedded salt crystals and oxidation without sanding, preserving timber grain integrity for years.</p>
        </div>
      `
    },
    articles: [
      {
        id: 1,
        title: 'Preserving Haussmannian Architecture: Marble, Herringbone Parquet & Gilded Detail Care',
        category: 'Home & Villa',
        region: 'Paris',
        date: 'Oct 14, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
        excerpt: '19th-century Parisian apartments require gentle, non-acidic restoration techniques to protect historic oak floors, delicate moldings, and Carrera marble hearths.',
        author: { name: 'Élodie Dupont', role: 'Heritage Interior Specialist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Home & Villa • Paris Lifestyle</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Preserving Haussmannian Architecture: Marble, Herringbone Parquet & Gilded Detail Care</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Élodie Dupont</span> • <span>October 14, 2026</span> • <span>5 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Parisian Haussmannian apartments are masterpieces of light, height, and craftsmanship. However, centuries-old Point de Hongrie (herringbone) parquet and delicate plaster moldings require specialized non-corrosive protocols.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Protecting Antique Marble Fireplaces</h4>
            <p>Acidic cleaners or citrus solvents can permanently etch marble hearths. We utilize enzyme-rich, zero-solvent balms that nourish natural stone while drawing out deep micro-dust.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Gilded Mirror & Ceiling Rose Maintenance</h4>
            <p>Gold leaf ornamentation demands microfiber air-dusting and humidity-balanced botanical sprays that eliminate dust static without dampening plasterwork.</p>
          </div>
        `
      },
      {
        id: 2,
        title: 'Eco-Friendly Yacht Cleaning: Safe Marine Chemistry in Antibes & Saint-Tropez',
        category: 'Yacht Cleaning',
        region: 'French Riviera',
        date: 'Oct 10, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=800&q=80',
        excerpt: 'How coastal regulations in Port Vauban and Saint-Tropez harbor are driving superyacht captains toward certified non-toxic deck cleaning systems.',
        author: { name: 'Antoine Mercier', role: 'Marine Eco-Consultant', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Yacht Cleaning • French Riviera</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Eco-Friendly Yacht Cleaning: Safe Marine Chemistry in Antibes & Saint-Tropez</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Antoine Mercier</span> • <span>October 10, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Port Vauban in Antibes and Saint-Tropez harbor have introduced stricter water runoff guidelines to safeguard local sea life. Superyacht operators are adopting plant-based surfactants that eliminate greasy residues without harming marine ecosystems.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Hull Shielding and Zero-Discharge Protocols</h4>
            <p>Our closed-loop extraction systems capture wash water runoff during hull detailing, ensuring zero chemical discharge into pristine Mediterranean waters.</p>
          </div>
        `
      },
      {
        id: 3,
        title: 'Seasonal Deep Clean Checklist for Courchevel & Megève Alpine Chalets',
        category: 'Sustainability',
        region: 'Alps',
        date: 'Oct 05, 2026',
        readTime: '8 min read',
        image: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Prepare high-altitude wooden chalets for snow season. Air purification, timber rehydration, and organic linen sanitization for premier ski retreats.',
        author: { name: 'Sophie Martin', role: 'Alpine Estate Manager', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Sustainability • Alps Chalets</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Seasonal Deep Clean Checklist for Courchevel & Megève Alpine Chalets</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Sophie Martin</span> • <span>October 5, 2026</span> • <span>8 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>High mountain elevation presents unique climate demands for chalets in Courchevel 1850 and Megève. Sub-zero temperatures outside combined with central heating dry out bespoke pine and larch interiors.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Timber Nourishment and Humidity Balance</h4>
            <p>We treat exposed structural beams with natural beeswax balms to prevent cracking and lock in natural moisture ahead of winter occupancy.</p>
          </div>
        `
      },
      {
        id: 4,
        title: 'Hospitality Standards: Elevating Guest Satisfaction in Bordeaux & Luxury Vineyards',
        category: 'Commercial',
        region: 'Bordeaux',
        date: 'Sep 28, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Boutique château hotels and private wine estates leverage eco-certified sanitization to guarantee 5-star ratings and pristine eco-conscious luxury.',
        author: { name: 'Jean-Pierre Blanc', role: 'Hospitality Operations Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Commercial • Bordeaux Vineyards</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Hospitality Standards: Elevating Guest Satisfaction in Bordeaux & Luxury Vineyards</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Jean-Pierre Blanc</span> • <span>September 28, 2026</span> • <span>5 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Wine tasting suites and luxury vineyard guest rooms demand meticulous allergen-free hygiene that respects wine aroma purity. Synthetic air fresheners and chlorine residues interfere with delicate wine tastings.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Odorless Botanical Sanitation</h4>
            <p>Our hotel sanitation teams deploy food-safe, fragrance-free microbial cleaners that sanitize tasting rooms completely without lingering synthetic smells.</p>
          </div>
        `
      },
      {
        id: 5,
        title: 'Green Compass Certification: Why Non-Toxic Products Matter for Children & Pets',
        category: 'Sustainability',
        region: 'Global & France',
        date: 'Sep 22, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Understanding VOCs, allergen elimination, and zero-residue botanical cleaning agents that safeguard family health in modern high-end homes.',
        author: { name: 'Dr. Clara Roche', role: 'Environmental Biochemist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Sustainability • Health & Family</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Green Compass Certification: Why Non-Toxic Products Matter for Children & Pets</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Dr. Clara Roche</span> • <span>September 22, 2026</span> • <span>4 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Indoor air quality in luxury residences can contain up to 5 times more synthetic volatile organic compounds (VOCs) than outdoor air due to traditional cleaning chemicals off-gassing from floors and upholstery.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Eliminating Residual Toxins</h4>
            <p>Switching to certified organic bio-surfactants prevents dermal absorption and respiratory irritation for young children and domestic pets.</p>
          </div>
        `
      },
      {
        id: 6,
        title: 'The Concierge Guide to Post-Event Restorations in Monaco & Cannes',
        category: 'Commercial',
        region: 'Monaco & Cannes',
        date: 'Sep 15, 2026',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Rapid 24-hour turnaround cleaning following galas, fashion shows, and private yacht parties along the Croisette and Port Hercules.',
        author: { name: 'Lucie Moreau', role: 'VIP Event Director', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Commercial • Monaco & Cannes</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">The Concierge Guide to Post-Event Restorations in Monaco & Cannes</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Lucie Moreau</span> • <span>September 15, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>From the Cannes Film Festival celebrations to exclusive Grand Prix galas in Monaco, our rapid restoration teams mobilize overnight to return private villas and yacht charters to absolute pristine condition.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Speed and Discretion</h4>
            <p>Operating under strict non-disclosure agreements, our specialists handle high-traffic silk rugs, crystal chandeliers, and caterer kitchens with flawless efficiency.</p>
          </div>
        `
      }
    ]
  },
  uk: {
    code: 'uk',
    flag: '🇬🇧',
    name: 'United Kingdom',
    currencySymbol: '£',
    currencyCode: 'GBP',
    phone: '+44 20 7946 0912',
    email: 'info@pearlysky.co.uk',
    address: '25 Mayfair, London, W1J 8AJ, United Kingdom',
    tagline: 'The British Heritage Care Journal',
    heroTitle: 'Pearly Sky Journal — Eco-Luxury Living & Care Insights in the',
    heroHighlight: 'United Kingdom',
    heroDescription: 'Expert guidance, eco-conscious preservation tips, and insider knowledge tailored for luxury UK residences, Mayfair townhouses, Cotswolds country retreats, and premier commercial spaces.',
    categories: ['All', 'Mayfair & Townhouses', 'Country Estates', 'Eco-Chemistry', 'Commercial', 'UK Hospitality'],
    marqueeLocations: [
      'Mayfair & Belgravia', 'Cotswolds', 'Kensington & Chelsea', 'Oxford & Cambridge', 
      'Edinburgh & Glasgow', 'Manchester & Liverpool', 'Birmingham', 'Bristol & Bath', 
      'Leeds & Sheffield', 'Brighton & Southampton'
    ],
    spotlightArticle: {
      id: 0,
      title: 'Preserving Historic Heritage: Eco-Restoration of Mayfair Townhouses & Bath Estates',
      category: 'Mayfair & Townhouses',
      region: 'London & Heritage',
      date: '20 October 2026',
      readTime: '8 Min Read',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      excerpt: 'Maintaining Grade I and Grade II listed properties in London and Somerset requires delicate balancing between strict architectural conservation and non-toxic, eco-pure chemistry.',
      author: {
        name: 'Lady Victoria Sterling',
        role: 'Head of Heritage Preservation',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
      },
      fullContent: `
        <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Mayfair & Townhouses • Heritage Care</span>
        <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Preserving Historic Heritage: Eco-Restoration of Mayfair Townhouses & Bath Estates</h2>
        <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
          <span>By Lady Victoria Sterling</span> • <span>October 20, 2026</span> • <span>8 min read</span>
        </div>
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
        <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>Grade I and Grade II listed townhouses across Mayfair, Belgravia, and the Georgian crescents of Bath are irreplaceable architectural treasures. Standard chemical cleaners often pit historic Portland stone or strip beeswax finishes.</p>
          <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">1. Non-Ionic pH-Neutral Surfactants for Antique Woods</h4>
          <p>At Pearly Sky, our chemical engineers formulate botanical extracts infused with organic linseed and neutral soaps to restore century-old oak and mahogany floors safely.</p>
        </div>
      `
    },
    articles: [
      {
        id: 1,
        title: 'The Art of Restoring Mayfair Townhouse Marble & Heritage Hardwoods',
        category: 'Mayfair & Townhouses',
        region: 'London Heritage',
        date: '18 October 2026',
        readTime: '6 Min Read',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
        excerpt: 'A deep dive into diamond micro-crystallization and eco-friendly wax sealants tailored specifically for London\'s iconic Victorian and Georgian properties.',
        author: { name: 'Julian Vance-Moreau', role: 'Senior Architectural Conservator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Mayfair & Townhouses • London Heritage</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">The Art of Restoring Mayfair Townhouse Marble & Heritage Hardwoods</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Julian Vance-Moreau</span> • <span>October 18, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>London's grandest townhouses boast irreplaceable hardwood floors and intricate marble foyers polished to mirror perfection.</p>
            <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Diamond Micro-Crystallization</h4>
            <p>Our restoration process removes micro-scratches from Carrara and Statuario marble without harsh acidic etching agents.</p>
          </div>
        `
      },
      {
        id: 2,
        title: 'Cotswolds Country Estates: Preparing Historic Homes for Season Transitions',
        category: 'Country Estates',
        region: 'Cotswolds',
        date: '14 October 2026',
        readTime: '7 Min Read',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
        excerpt: 'How Oxfordshire and Gloucestershire manor homes manage autumn humidity, chimney soot, and limestone protection with plant-based formulas.',
        author: { name: 'Clara Kensington', role: 'Director of Private Estates', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Country Estates • Cotswolds</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Cotswolds Country Estates: Preparing Historic Homes for Season Transitions</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Clara Kensington</span> • <span>October 14, 2026</span> • <span>7 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Transitioning a sprawling Cotswold country house into autumn and winter requires specialized environmental controls to counteract damp stone walls and fireplace soot.</p>
          </div>
        `
      },
      {
        id: 3,
        title: 'Eco-Friendly Deep Cleans for High-End London Commercial Workspaces',
        category: 'Commercial',
        region: 'City of London',
        date: '10 October 2026',
        readTime: '5 Min Read',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Promoting ESG compliance and employee health across City of London financial institutions and West End luxury headquarters.',
        author: { name: 'Alistair Finch', role: 'Commercial Operations Lead', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Commercial • City of London</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Eco-Friendly Deep Cleans for High-End London Commercial Workspaces</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Alistair Finch</span> • <span>October 10, 2026</span> • <span>5 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Modern corporate headquarters in The Square Mile and Canary Wharf require flawless hygiene standards aligned with strict ESG sustainability goals.</p>
          </div>
        `
      },
      {
        id: 4,
        title: 'Post-Renovation Cleanliness in Kensington & Chelsea Luxury Developments',
        category: 'Mayfair & Townhouses',
        region: 'London West',
        date: '05 October 2026',
        readTime: '9 Min Read',
        image: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Eradicating micro-silica dust and toxic plaster residues without compromising bespoke brassware, velvet textiles, or imported marble.',
        author: { name: 'Julian Vance-Moreau', role: 'Senior Architectural Conservator', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Mayfair & Townhouses • Kensington</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Post-Renovation Cleanliness in Kensington & Chelsea Luxury Developments</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Julian Vance-Moreau</span> • <span>October 5, 2026</span> • <span>9 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>High-end developments in Knightsbridge and Chelsea generate abrasive micro-dust that settles inside intricate HVAC ducts and delicate finishes.</p>
          </div>
        `
      },
      {
        id: 5,
        title: 'Hypoallergenic Eco-Cleaning for Families and Pets in Oxford & Cambridge',
        category: 'Eco-Chemistry',
        region: 'University Towns',
        date: '01 October 2026',
        readTime: '4 Min Read',
        image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Eliminating indoor allergens and synthetic residue for health-conscious families and cherished pets in historic university towns.',
        author: { name: 'Dr. Eleanor Vance', role: 'Chief Eco-Chemist', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Eco-Chemistry • University Towns</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Hypoallergenic Eco-Cleaning for Families and Pets in Oxford & Cambridge</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Dr. Eleanor Vance</span> • <span>October 1, 2026</span> • <span>4 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Traditional carpet shampoos leave chemical surfactant residues that off-gas for months, posing health risks to small children and household pets.</p>
          </div>
        `
      },
      {
        id: 6,
        title: 'Hospitality Standards in Edinburgh & Glasgow Boutique Hotels',
        category: 'UK Hospitality',
        region: 'Scotland',
        date: '25 September 2026',
        readTime: '6 Min Read',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
        excerpt: 'Elevating luxury guest satisfaction scores with bespoke botanical turn-down cleans and eco-certified sanitation in Scotland.',
        author: { name: 'Clara Kensington', role: 'Director of Private Estates', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">UK Hospitality • Scotland</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Hospitality Standards in Edinburgh & Glasgow Boutique Hotels</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Clara Kensington</span> • <span>September 25, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Scotland's boutique hotel market requires five-star white-glove precision combined with guest-conscious sustainability and heritage fabric care.</p>
          </div>
        `
      }
    ]
  },
  lk: {
    code: 'lk',
    flag: '🇱🇰',
    name: 'Sri Lanka',
    currencySymbol: 'Rs.',
    currencyCode: 'LKR',
    phone: '+94 11 234 5678',
    email: 'info@pearlysky.lk',
    address: 'Level 28, One Galle Face Tower, Galle Road, Colombo 03, Sri Lanka',
    tagline: 'Botanical Science & Island Preservation',
    heroTitle: 'Pearly Sky Journal — Sri Lanka',
    heroHighlight: 'Edition',
    heroDescription: 'Insights on Eco-Luxury Living, Tropical Estate Maintenance, and Botanical Cleaning Science across Sri Lanka\'s finest coastal villas, tea bungalows, and luxury residences.',
    categories: ['All', 'Tropical Villa Care', 'Heritage Estates', 'Marine & Yacht', 'Eco-Sustainability', 'Luxury Hospitality'],
    marqueeLocations: [
      'Colombo', 'Sigiriya', 'Arugam Bay', 'Kandy', 'Ella', 'Jaffna', 'Galle', 
      'Bentota', 'Trincomalee', 'Negombo', 'Hikkaduwa', 'Polonnaruwa', 'Anuradhapura', 
      'Mirissa', 'Matara', 'Badulla', 'Unawatuna'
    ],
    spotlightArticle: {
      id: 0,
      title: "Preserving Eco-Luxury in Tropical Climates: The Science of Humidity & Saltwater Protection for Galle & Mirissa Coastal Estates",
      category: "Tropical Villa Care",
      region: "Galle & Mirissa Coast",
      date: "October 18, 2026",
      readTime: "8 Min Read",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop",
      excerpt: "Coastal humidity along Southern Sri Lanka accelerates oxidation and mildew on raw timber, polished brass, and imported marble. Explore Pearly Sky's pH-neutral botanical nano-coatings.",
      author: {
        name: "Dr. Ruwan Ranasinghe",
        role: "Chief Botanical Scientist, Asia-Pacific",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
      },
      fullContent: `
        <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Tropical Villa Care • Galle & Mirissa</span>
        <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Preserving Eco-Luxury in Tropical Climates: The Science of Humidity & Saltwater Protection</h2>
        <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
          <span>By Dr. Ruwan Ranasinghe</span> • <span>October 18, 2026</span> • <span>8 min read</span>
        </div>
        <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
        <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
          <p>Southern Sri Lanka's coastline presents one of the most demanding microclimates in Asia for luxury estate preservation. High ambient humidity exceeding 85% and sea-salt aerosol rapidly accelerate material oxidation.</p>
          <h4 class="font-serif text-lg text-[#d4af37] font-semibold pt-2">Pearly Sky’s Botanical Solution</h4>
          <p>Our proprietary solution utilizes organic bio-surfactants derived from Ceylon lemongrass, citronella, and coconut lipids that naturally chelate salt ions without synthetic harshness.</p>
        </div>
      `
    },
    articles: [
      {
        id: 1,
        title: "The Art of Tea Estate Villa Care: Maintaining Historic Timber & Stone in Nuwara Eliya & Kandy",
        category: "Heritage Estates",
        region: "Central Highlands",
        date: "Oct 14, 2026",
        readTime: "6 Min Read",
        image: "https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=800&auto=format&fit=crop",
        excerpt: "Centuries-old Ceylon teak, floorboards, and granite masonry in high-altitude dampness require specialized natural oils and microbial remediation.",
        author: { name: "Ananya De Silva", role: "Heritage Specialist", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Heritage Estates • Central Highlands</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">The Art of Tea Estate Villa Care: Maintaining Historic Timber & Stone</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Ananya De Silva</span> • <span>October 14, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1586500036706-41963de24d8b?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Highland bungalows in Nuwara Eliya and Kandy carry deep historical significance and face unique challenges from persistent highland mist and timber moisture.</p>
          </div>
        `
      },
      {
        id: 2,
        title: "Eco-Friendly Deep Cleaning for Colombo Luxury Apartments & Penthouse Residences",
        category: "Tropical Villa Care",
        region: "Colombo CBD",
        date: "Oct 10, 2026",
        readTime: "5 Min Read",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
        excerpt: "High-rise luxury living at One Galle Face and Altair demands silent, particulate-free HEPA sanitization protocols.",
        author: { name: "Tariq Mansoor", role: "Urban Luxury Director", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Tropical Villa Care • Colombo CBD</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Eco-Friendly Deep Cleaning for Colombo Luxury Apartments</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Tariq Mansoor</span> • <span>October 10, 2026</span> • <span>5 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Colombo's luxury vertical residences demand ultra-quiet, non-disruptive cleaning operations for double-glazing glass facades and Italian marble floors.</p>
          </div>
        `
      },
      {
        id: 3,
        title: "Post-Monsoon Refresh: Restoring Beachfront Villas in Arugam Bay & Trincomalee",
        category: "Tropical Villa Care",
        region: "East Coast",
        date: "Oct 05, 2026",
        readTime: "7 Min Read",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
        excerpt: "When the North-East monsoon retreats, salt crusting and sand infiltration threaten coastal timber and fabrics across Eastern Sri Lanka.",
        author: { name: "Dr. Ruwan Ranasinghe", role: "Chief Botanical Scientist", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Tropical Villa Care • East Coast</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Post-Monsoon Refresh: Restoring Beachfront Villas in Arugam Bay & Trincomalee</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Dr. Ruwan Ranasinghe</span> • <span>October 5, 2026</span> • <span>7 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>We utilize dry-vapor sanitization that extracts deeply embedded sea sand and eliminates damp odor without synthetic fragrances.</p>
          </div>
        `
      },
      {
        id: 4,
        title: "Eco-Sanitization for Sri Lanka's High-End Eco-Resorts & Luxury Hospitality",
        category: "Luxury Hospitality",
        region: "Yala & Sigiriya",
        date: "Sep 28, 2026",
        readTime: "6 Min Read",
        image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        excerpt: "Elevating eco-tourism standards around Yala National Park with 100% biodegradable enzyme cleaners protecting wildlife habitats.",
        author: { name: "Chamindra Perera", role: "Hospitality Eco-Auditor", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Luxury Hospitality • Yala & Sigiriya</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Eco-Sanitization for Sri Lanka's High-End Eco-Resorts & Luxury Hospitality</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Chamindra Perera</span> • <span>September 28, 2026</span> • <span>6 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>High-end eco-lodges adjacent to national parks must maintain absolute cleanliness without risking toxic chemical leach into surrounding wildlife zones.</p>
          </div>
        `
      },
      {
        id: 5,
        title: "Caring for Teak, Rattan & Local Artisan Crafts with Non-Toxic Botanical Chemistry",
        category: "Eco-Sustainability",
        region: "Islandwide",
        date: "Sep 21, 2026",
        readTime: "4 Min Read",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop",
        excerpt: "Handcrafted Ceylonese furniture, rattan weave, and brass antiques require bespoke organic nourishment containing native cinnamon extracts.",
        author: { name: "Ananya De Silva", role: "Artisan Preservation Specialist", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Eco-Sustainability • Islandwide</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Caring for Teak, Rattan & Local Artisan Crafts with Non-Toxic Botanical Chemistry</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Ananya De Silva</span> • <span>September 21, 2026</span> • <span>4 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>We condition local woods and rattan using cold-pressed Sri Lankan virgin coconut oil enriched with pure cinnamon leaf oil for natural antibacterial defense.</p>
          </div>
        `
      },
      {
        id: 6,
        title: "Sanitizing Private Yacht Interiors & Charters in Galle & Bentota Waters",
        category: "Marine & Yacht",
        region: "South Coast Marina",
        date: "Sep 15, 2026",
        readTime: "8 Min Read",
        image: "https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=800&auto=format&fit=crop",
        excerpt: "Salt mist and enclosed humidity degrade luxury teak decks and leather cabin trim rapidly. Our ocean-safe marine protocols ensure pristine aesthetics.",
        author: { name: "Capt. Jerome Fernando", role: "Marine Operations Lead", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
        fullContent: `
          <span class="text-[#d4af37] text-xs font-semibold uppercase tracking-wider">Marine & Yacht • South Coast</span>
          <h2 class="font-serif text-2xl sm:text-3xl font-bold text-slate-100 my-3">Sanitizing Private Yacht Interiors & Charters in Galle & Bentota Waters</h2>
          <div class="flex items-center gap-3 text-xs text-slate-400 mb-6 pb-4 border-b border-[#d4af37]/20">
            <span>By Capt. Jerome Fernando</span> • <span><Calendar className="w-3.5 h-3.5 text-[#d4af37] inline mr-1" />September 15, 2026</span> • <span><Clock className="w-3.5 h-3.5 text-[#d4af37] inline mr-1" />8 min read</span>
          </div>
          <img src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?q=80&w=1000&auto=format&fit=crop" class="w-full h-64 sm:h-80 object-cover rounded-2xl mb-6 border border-[#d4af37]/20">
          <div class="space-y-4 text-slate-300 text-sm leading-relaxed">
            <p>Superyachts and private catamarans operating out of Galle Harbour require meticulous interior detailing that stands up to maritime humidity.</p>
          </div>
        `
      }
    ]
  }
};