

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface PartnerItem {
  id: string;
  category: 'cloud' | 'banking' | 'collaboration';
  icon: 'server' | 'shield' | 'card' | 'landmark' | 'building' | 'mail' | 'message';
  name: string;
  subtitle: string;
  badge: string;
  description: string;
  tags: string[];
  rating: string;
  ratingType: string;
}


export interface PartnersContent {
  badgeText: string;
  heroTitleRegular: string;
  heroTitleHighlight: string;
  heroDescription: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
  stat4Value: string; stat4Label: string;
  testimonialsHeader: string;
  testimonialsTitle: string;
  shareReviewText: string;
  directoryCategoryHeader: string;
  directoryTitle: string;
  directorySubtitle: string;
  filterAll: string;
  filterCloud: string;
  filterBanking: string;
  filterCollab: string;
  standardsBadge: string;
  standardsTitle: string;
  standardsDescription: string;
  charter1Title: string; charter1Desc: string;
  charter2Title: string; charter2Desc: string;
  charter3Title: string; charter3Desc: string;
  supportBadge: string;
  supportTitle: string;
  supportDescription: string;
  phoneLineText: string;
  emailText: string;
  locationsText: string;
  reviews: Review[];
  partners: PartnerItem[];
}

export const partnersData: Record<'fr' | 'uk' | 'lk', PartnersContent> = {
  fr: {
    badgeText: "CustBadgeText",
    heroTitleRegular: "CustHeroTitleRegular",
    heroTitleHighlight: "CustHeroTitleHighlight",
    heroDescription: "CustHeroDescription",
    stat1Value: "CustStat1Value",
    stat1Label: "CustStat1Label",
    stat2Value: "CustStat2Value",
    stat2Label: "CustStat2Label",
    stat3Value: "CustStat3Value",
    stat3Label: "CustStat3Label",
    stat4Value: "CustStat4Value",
    stat4Label: "CustStat4Label",
    
    testimonialsHeader: "CustTestimonialsHeader",
    testimonialsTitle: "CustTestimonialsTitle",
    shareReviewText: "CustShareReviewText",
    directoryCategoryHeader: "CustDirectoryCategoryHeader",
    directoryTitle: "CustDirectoryTitle",
    directorySubtitle: "CustDirectorySubtitle",
    filterAll: "CustFilterAll",
    filterCloud: "CustFilterCloud",
    filterBanking: "CustFilterBanking",
    filterCollab: "CustFilterCollab",
    standardsBadge: "CustStandardsBadge",
    standardsTitle: "CustStandardsTitle",
    standardsDescription: "CustStandardsDescription",
    
    charter1Title: "CustCharter1Title",
    charter1Desc: "CustCharter1Desc",
    charter2Title: "CustCharter2Title",
    charter2Desc: "CustCharter2Desc",
    charter3Title: "CustCharter3Title",
    charter3Desc: "CustCharter3Desc",
    supportBadge: "CustSupportBadge",
    supportTitle: "CustSupportTitle",
    supportDescription: "CustSupportDescription",
    phoneLineText: "CustPhoneLineText",
    emailText: "CustEmailText",
    locationsText: "CustLocationsText",
    reviews: [
      {
        id: '1',
        name: 'Countess Hélène de B.',
        location: "CustReview1Location",
        rating: 5,
        comment: "CustReview1Comment",
        date: "CustReview1Date",
      },
      {
        id: '2',
        name: 'Marc Antoine L.',
        location: "CustReview2Location",
        rating: 5,
        comment: "CustReview2Comment",
        date: "CustReview2Date",
      },
      {
        id: '3',
        name: 'Dr. Sophie Duchamp',
        location: "CustReview3Location",
        rating: 4.5,
        comment: "CustReview3Comment",
        date: "CustReview3Date",
      },
    ],
    partners: [
      {
        id: 'hostinger',
        category: 'cloud',
        icon: 'server',
        name: 'Hostinger',
        subtitle: "CustPartnerHostingerSubtitle",
        badge: "CustPartnerHostingerBadge",
        description: "CustPartnerHostingerDescription",
        tags: ["CustPartnerHostingerTag1", "CustPartnerHostingerTag2"],
        rating: '4.96',
        ratingType: "CustPartnerHostingerRatingType"
      },
      {
        id: 'cloudflare',
        category: 'cloud',
        icon: 'shield',
        name: 'Cloudflare',
        subtitle: "CustPartnerCloudflareSubtitle",
        badge: "CustPartnerCloudflareBadge",
        description: "CustPartnerCloudflareDescription",
        tags: ["CustPartnerCloudflareTag1", "CustPartnerCloudflareTag2"],
        rating: '4.99',
        ratingType: "CustPartnerCloudflareRatingType"
      },
      {
        id: 'stripe',
        category: 'banking',
        icon: 'card',
        name: 'Stripe',
        subtitle: "CustPartnerStripeSubtitle",
        badge: "CustPartnerStripeBadge",
        description: "CustPartnerStripeDescription",
        tags: ["CustPartnerStripeTag1", "CustPartnerStripeTag2"],
        rating: '4.98',
        ratingType: "CustPartnerStripeRatingType"
      },
      {
        id: 'tide',
        category: 'banking',
        icon: 'landmark',
        name: 'Tide Bank',
        subtitle: "CustPartnerTideSubtitle",
        badge: "CustPartnerTideBadge",
        description: "CustPartnerTideDescription",
        tags: ["CustPartnerTideTag1", "CustPartnerTideTag2"],
        rating: '4.94',
        ratingType: "CustPartnerTideRatingType"
      },
      {
        id: 'hnb',
        category: 'banking',
        icon: 'building',
        name: 'HNB Bank',
        subtitle: "CustPartnerHnbSubtitle",
        badge: "CustPartnerHnbBadge",
        description: "CustPartnerHnbDescription",
        tags: ["CustPartnerHnbTag1", "CustPartnerHnbTag2"],
        rating: '4.95',
        ratingType: "CustPartnerHnbRatingType"
      },
      {
        id: 'brevo',
        category: 'collaboration',
        icon: 'mail',
        name: 'Brevo',
        subtitle: "CustPartnerBrevoSubtitle",
        badge: "CustPartnerBrevoBadge",
        description: "CustPartnerBrevoDescription",
        tags: ["CustPartnerBrevoTag1", "CustPartnerBrevoTag2"],
        rating: '4.93',
        ratingType: "CustPartnerBrevoRatingType"
      },
      {
        id: 'slack',
        category: 'collaboration',
        icon: 'message',
        name: 'Slack',
        subtitle: "CustPartnerSlackSubtitle",
        badge: "CustPartnerSlackBadge",
        description: "CustPartnerSlackDescription",
        tags: ["CustPartnerSlackTag1", "CustPartnerSlackTag2"],
        rating: '4.97',
        ratingType: "CustPartnerSlackRatingType"
      }
    ]
  },
  uk: {
    badgeText: "UK Enterprise Ecosystem & Secure Infrastructure",
    heroTitleRegular: "Empowered by Global ",
    heroTitleHighlight: "Technology",
    heroDescription: "Discover feedback from our distinguished private clients and explore the robust technology cloud, secure payment gateways, and banking networks that power Pearly Sky UK.",
    stat1Value: "99.9%", stat1Label: "Cloud Uptime",
    stat2Value: "7 Elite", stat2Label: "Global Partners",
    stat3Value: "PCI-DSS", stat3Label: "Secure Checkout",
    stat4Value: "24/7", stat4Label: "Operation Support",
    testimonialsHeader: "Testimonials & Verified Reviews",
    testimonialsTitle: "What Our UK Distinguished Clients Say",
    shareReviewText: "Share Your Review",
    directoryCategoryHeader: "Technology & Financial Infrastructure",
    directoryTitle: "Our Technology & Banking Partners",
    directorySubtitle: "We partner with world-leading technology innovators, cloud providers, payment networks, and international banks to guarantee flawless reliability across the UK.",
    filterAll: "All Partners",
    filterCloud: "Cloud & Hosting",
    filterBanking: "Banking & Payments",
    filterCollab: "Communication & CRM",
    standardsBadge: "Our Digital Charter",
    standardsTitle: "Uncompromising Data Security & Financial Reliability",
    standardsDescription: "Pearly Sky UK combines luxury eco-cleaning excellence with institutional-grade digital infrastructure. Every transaction and communication is protected by world-class technology standards.",
    charter1Title: "End-to-End Encryption",
    charter1Desc: "Secured via Cloudflare SSL protocols and PCI-DSS Level 1 compliant Stripe transactions.",
    charter2Title: "Instant Operational Dispatch",
    charter2Desc: "Integrated Slack alerts ensure rapid response times for all elite British residential requests.",
    charter3Title: "Multi-Bank Financial Stability",
    charter3Desc: "Backed by Tide Bank and major institutions for bulletproof treasury and international transfers.",
    supportBadge: "Dedicated Concierge Service",
    supportTitle: "Need technical integration support?",
    supportDescription: "Our technical support team and personal concierge advisors are at your service 7 days a week for corporate bookings and bespoke estate agreements.",
    phoneLineText: "+44 (0)20 7946 0921 (Private Line)",
    emailText: "uk.partners@pearlysky.eco",
    locationsText: "Mayfair, London • Cotswolds, Gloucestershire",
    reviews: [
      {
        id: '1',
        name: 'Lord Alistair Sterling',
        location: 'Mayfair, London • Private Estate',
        rating: 5,
        comment: 'Exquisite coordination across London. The Stripe payment gateway is fast and reliable, and digital scheduling updates via Slack provide complete reassurance.',
        date: '3 days ago',
      },
      {
        id: '2',
        name: 'Lady Beatrice Vance',
        location: 'Cotswolds • Country Manor',
        rating: 5,
        comment: 'Unrivaled digital booking experience. High-speed performance backed by secure cloud infrastructure makes managing multiple country residences effortless.',
        date: '1 week ago',
      }
    ],
    partners: [
      {
        id: 'hostinger',
        category: 'cloud',
        icon: 'server',
        name: 'Hostinger',
        subtitle: 'High-Performance Cloud Web Hosting',
        badge: 'Verified',
        description: 'Powering Pearly Sky UK web infrastructure with ultra-fast NVMe cloud hosting, guaranteed 99.9% uptime, and lightning-fast asset delivery.',
        tags: ['Cloud Server', 'NVMe Speed'],
        rating: '4.96',
        ratingType: '(Hosting Partner)'
      },
      {
        id: 'cloudflare',
        category: 'cloud',
        icon: 'shield',
        name: 'Cloudflare',
        subtitle: 'Enterprise Web Security & CDN',
        badge: 'Verified',
        description: 'Safeguarding our client data with advanced DDoS mitigation, global edge caching, SSL/TLS encryption, and zero-trust web application firewalls.',
        tags: ['DDoS Protection', 'Global Edge CDN'],
        rating: '4.99',
        ratingType: '(Security Partner)'
      },
      {
        id: 'stripe',
        category: 'banking',
        icon: 'card',
        name: 'Stripe',
        subtitle: 'Global Secure Payment Gateway',
        badge: 'Verified',
        description: 'Enabling PCI-DSS Level 1 certified credit card processing, Apple Pay, and multi-currency billing for international luxury clients.',
        tags: ['PCI-DSS Level 1', 'Cards & Apple Pay'],
        rating: '4.98',
        ratingType: '(Payment Partner)'
      },
      {
        id: 'tide',
        category: 'banking',
        icon: 'landmark',
        name: 'Tide Bank',
        subtitle: 'Digital Business Banking & Accounts',
        badge: 'Verified',
        description: 'Streamlining corporate financial management, expense tracking, and business banking operations with seamless digital accounting integrations.',
        tags: ['Business Banking', 'Expense Sync'],
        rating: '4.94',
        ratingType: '(Banking Partner)'
      },
      {
        id: 'brevo',
        category: 'collaboration',
        icon: 'mail',
        name: 'Brevo',
        subtitle: 'CRM & Automated Client Communications',
        badge: 'Verified',
        description: 'Managing transactional concierge notifications, privileged newsletter dispatches, and secure customer relationship workflows with GDPR compliance.',
        tags: ['GDPR Compliant', 'Automated CRM'],
        rating: '4.93',
        ratingType: '(CRM Partner)'
      },
      {
        id: 'slack',
        category: 'collaboration',
        icon: 'message',
        name: 'Slack',
        subtitle: 'Real-Time Team & Concierge Operations',
        badge: 'Verified',
        description: 'Connecting our concierge directors, estate managers, and technical dispatchers through secure real-time messaging and operational channels.',
        tags: ['Operations Hub', 'Instant Dispatch'],
        rating: '4.97',
        ratingType: '(Operations Partner)'
      }
    ]
  },
  lk: {
    badgeText: "Sri Lanka Enterprise Ecosystem & Secure Infrastructure",
    heroTitleRegular: "Empowered by Global ",
    heroTitleHighlight: "Technology",
    heroDescription: "Discover feedback from our distinguished private clients and explore the robust technology cloud, secure payment gateways, and banking networks that power Pearly Sky Sri Lanka.",
    stat1Value: "99.9%", stat1Label: "Cloud Uptime",
    stat2Value: "6 Elite", stat2Label: "Global Partners",
    stat3Value: "PCI-DSS", stat3Label: "Secure Checkout",
    stat4Value: "24/7", stat4Label: "Operation Support",
    testimonialsHeader: "Testimonials & Verified Reviews",
    testimonialsTitle: "What Our Sri Lankan Distinguished Clients Say",
    shareReviewText: "Share Your Review",
    directoryCategoryHeader: "Technology & Financial Infrastructure",
    directoryTitle: "Our Technology & Banking Partners",
    directorySubtitle: "We partner with world-leading technology innovators, cloud providers, payment networks, and international banks to guarantee flawless reliability in Sri Lanka.",
    filterAll: "All Partners",
    filterCloud: "Cloud & Hosting",
    filterBanking: "Banking & Payments",
    filterCollab: "Communication & CRM",
    standardsBadge: "Our Digital Charter",
    standardsTitle: "Uncompromising Data Security & Financial Reliability",
    standardsDescription: "Pearly Sky Sri Lanka combines luxury eco-cleaning excellence with institutional-grade digital infrastructure. Every transaction and communication is protected by world-class technology standards.",
    charter1Title: "End-to-End Encryption",
    charter1Desc: "Secured via Cloudflare SSL protocols and PCI-DSS Level 1 compliant online gateway transactions.",
    charter2Title: "Instant Operational Dispatch",
    charter2Desc: "Integrated Slack alerts ensure rapid response times for all elite residential and villa requests in Colombo and Galle.",
    charter3Title: "Multi-Bank Financial Stability",
    charter3Desc: "Backed by HNB Bank and regional partners for bulletproof treasury and corporate settlements.",
    supportBadge: "Dedicated Concierge Service",
    supportTitle: "Need technical integration support?",
    supportDescription: "Our technical support team and personal concierge advisors are at your service 7 days a week for corporate bookings and luxury villa agreements.",
    phoneLineText: "+94 11 234 5678 (Private Line)",
    emailText: "lk.partners@pearlysky.eco",
    locationsText: "Colombo 07 • Galle Fort, Southern Province",
    reviews: [
      {
        id: '1',
        name: 'Dr. Rohan Wickramasinghe',
        location: 'Colombo 07 • Private Residence',
        rating: 5,
        comment: 'Exceptional digital reliability in Colombo. Secure payments through HNB and instant coordination via Slack make scheduling villa maintenance effortless.',
        date: '4 days ago',
      },
      {
        id: '2',
        name: 'Mrs. Sharmila De Silva',
        location: 'Galle Fort • Coastal Villa',
        rating: 5,
        comment: 'Superb cloud platform speed and responsive support. Managing our heritage property requirements has never been smoother.',
        date: '1 week ago',
      }
    ],
    partners: [
      {
        id: 'hostinger',
        category: 'cloud',
        icon: 'server',
        name: 'Hostinger',
        subtitle: 'High-Performance Cloud Web Hosting',
        badge: 'Verified',
        description: 'Powering Pearly Sky Sri Lanka web infrastructure with ultra-fast NVMe cloud hosting, guaranteed 99.9% uptime, and lightning-fast asset delivery.',
        tags: ['Cloud Server', 'NVMe Speed'],
        rating: '4.96',
        ratingType: '(Hosting Partner)'
      },
      {
        id: 'cloudflare',
        category: 'cloud',
        icon: 'shield',
        name: 'Cloudflare',
        subtitle: 'Enterprise Web Security & CDN',
        badge: 'Verified',
        description: 'Safeguarding our client data with advanced DDoS mitigation, global edge caching, SSL/TLS encryption, and zero-trust web application firewalls.',
        tags: ['DDoS Protection', 'Global Edge CDN'],
        rating: '4.99',
        ratingType: '(Security Partner)'
      },
      {
        id: 'hnb',
        category: 'banking',
        icon: 'building',
        name: 'HNB Bank',
        subtitle: 'International Trade & Correspondent Banking',
        badge: 'Verified',
        description: 'Facilitating secure cross-border treasury operations, international wire settlements, and institutional banking synergy across local and global corridors.',
        tags: ['Institutional Wires', 'Global Treasury'],
        rating: '4.95',
        ratingType: '(Banking Partner)'
      },
      {
        id: 'stripe',
        category: 'banking',
        icon: 'card',
        name: 'Stripe',
        subtitle: 'Global Secure Payment Gateway',
        badge: 'Verified',
        description: 'Enabling PCI-DSS Level 1 certified international credit card processing for overseas villa owners and expatriate clients.',
        tags: ['PCI-DSS Level 1', 'Global Cards'],
        rating: '4.98',
        ratingType: '(Payment Partner)'
      },
      {
        id: 'brevo',
        category: 'collaboration',
        icon: 'mail',
        name: 'Brevo',
        subtitle: 'CRM & Automated Client Communications',
        badge: 'Verified',
        description: 'Managing transactional concierge notifications, privileged newsletter dispatches, and secure customer relationship workflows with privacy compliance.',
        tags: ['Data Privacy', 'Automated CRM'],
        rating: '4.93',
        ratingType: '(CRM Partner)'
      },
      {
        id: 'slack',
        category: 'collaboration',
        icon: 'message',
        name: 'Slack',
        subtitle: 'Real-Time Team & Concierge Operations',
        badge: 'Verified',
        description: 'Connecting our concierge directors, estate managers, and technical dispatchers through secure real-time messaging and operational channels.',
        tags: ['Operations Hub', 'Instant Dispatch'],
        rating: '4.97',
        ratingType: '(Operations Partner)'
      }
    ]
  }
};