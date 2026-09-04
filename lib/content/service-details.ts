export interface ServiceHighlightCard {
  title: string;
  features: string[];
}

export interface ServiceHighlightGroup {
  /** Falls back to a neutral label in the UI when the source page had no section heading. */
  title?: string;
  cards: ServiceHighlightCard[];
}

export interface ServiceContentEntry {
  introduction?: {
    headline: string;
    body: string[];
  };
  highlights?: ServiceHighlightGroup[];
}

export const SERVICE_CONTENT: Partial<Record<string, ServiceContentEntry>> = {
  "regular-home-cleaning": {
    introduction: {
      headline: "The Weekly Refresh: Consistent Clean, Sustainable Peace of Mind.",
      body: [
        "Stop stressing over everyday chores. Our Standard Residential Cleaning service establishes a reliable, recurring schedule that keeps your home effortlessly immaculate. We use exclusively green, certified eco-friendly products to deliver a deep, sparkling clean that is 100% safe for children and pets. Commit to consistency and enjoy the luxury of coming home to a healthier, reliably pristine space every week. See our transparent rates and book your clean today.​Set Your Recurring Schedule"
      ],
    },
    highlights: [
      {
        title: "Regular Home Cleaning Highlights",
        cards: [
          {
            title: "General & Living Spaces",
            features: [
              "Dusting.",
              "Surface cleaning (including glass).",
              "Light tidying.",
              "Trash removal and floor care (vacuuming/mopping).",
            ],
          },
          {
            title: "Essential Touch-Points",
            features: [
              "Bed making, linen management & targeted disinfection of high-touch surfaces for health & maintenance.",
            ],
          },
          {
            title: "Kitchen & Dining",
            features: [
              "Appliance exterior care.",
              "Countertop & sink sanitation.",
              "Dish organization & complete floor cleaning.",
            ],
          },
          {
            title: "Bathroom Cleaning",
            features: [
              "Full disinfection & hygiene focus.",
              "Cleaning of toilet, sink, shower & tub.",
              "Mirror cleaning & fresh towel placement.",
            ],
          },
        ],
      },
    ],
  },

  "essential-touch-up-cleaning": {
    introduction: {
      headline: "Fast-Track Freshness for High-Traffic Spaces",
      body: [
        "​Short on time but need your home looking its best? Our Essential Touch-Up Cleaning is a high-speed, targeted service designed to restore polish to your primary living areas. Ideal before hosting guests, after an event, or between routine visits, we focus on high-traffic zones—like key surfaces, kitchens, and bathrooms—using 100% certified eco-friendly products. Enjoy a spotless, welcoming environment without committing to a full-home clean. View our transparent pricing and book your express refresh today.",
      ],
    },
    highlights: [
      {
        title: "Essenstial Touch-Up Cleaning Highlights",
        cards: [
          {
            title: "Kitchen",
            features: [
              "Wipe down exterior of all major appliances (fridge, oven, dishwasher).",
              "Clean and sanitize countertops and backsplash.",
              "Scrub and polish the sink and faucet.",
              "Wipe down the stovetop (surface only).",
              "Exterior wipe of microwave.",
            ],
          },
          {
            title: "Bathrooms",
            features: [
              "Sanitize toilet, seat, and base.",
              "Clean mirrors and glass.",
              "Wipe down vanity and sink.",
              "Quick rinse and wipe of the shower/tub (no heavy grout scrubbing).",
            ],
          },
          {
            title: "Living & Bedrooms",
            features: [
              "Surface dusting of flat surfaces (tables, nightstands, desks).",
              "Tidy up cushions and pillows.",
              "Quick wipe of mirrors and picture frames.",
            ],
          },
          {
            title: "Floors & Trash",
            features: [
              "Vacuum all carpets and rugs.",
              "Mop all hard floors (standard damp mop).",
              "Empty all trash bins and replace liners.",
            ],
          },
        ],
      },
    ],
  },

  "same-day-priority-cleaning": {
    introduction: {
      headline: "Urgent Response, Uncompromised Cleanliness",
      body: [
        "Need immediate cleaning help on short notice? Our Same-Day Priority Cleaning offers rapid-dispatch service for unexpected visitors, last-minute events, or sudden emergencies. We prioritize your booking to send a professional cleaner to your home as fast as possible, using 100% certified eco-friendly, non-toxic products safe for your family and pets. Get instant relief and guaranteed priority scheduling when time is of the essence. See our transparent rates and book immediate priority support now.",
      ],
    },
    highlights: [
      {
        title: "After Party Checklist (Maximum Mess, Maximum Impact)",
        cards: [
          {
            title: "Flooring & Entry",
            features: [
              "High-power vacuuming and sweeping main living spaces.",
              "Spot mopping high-traffic and spill-prone areas.",
            ],
          },
          {
            title: "Common Area Recovery",
            features: [
              "Collecting stray items, glasses and trash.",
              "Emptying and sanitizing waste bins.",
              "Dusting and spot-cleaning visible surfaces.",
              "Arranging furniture (sofas, chairs, pillows).",
            ],
          },
          {
            title: "Kitchen & Bar Area",
            features: [
              "Disposing empty bottles, cans, serviceware.",
              "Disinfecting all counters and sticky surfaces.",
              "Running dishwasher; washing basic dishes.",
              "Cleaning beverage spills on hard floors.",
            ],
          },
        ],
      },
      {
        title: "Instant Clean Checklist (Standard Service - What We Focus On)",
        cards: [
          {
            title: "Kitchen Quick-Clean",
            features: [
              "Wiping down countertops.",
              "Spot-cleaning cabinet fronts.",
              "Cleaning microwave & stovetop exterior.",
              "Washing or loading small set",
              "Sanitizing sink & polishing fixtures",
              
            ],
          },
          {
            title: "Bathroom Refresh",
            features: [
              "Disinfecting sink and vanity.",
              "Cleaning toilet inside and out.",
              "Quick mirror wipe.",
              "Changing hand towel.",
              "Replacing used hand towels",
              "Emptying waste bin & deodorizing"
            ],
          }
        ],
      },
    ]
  },

  "deep-cleaning": {
    introduction: {
      headline: "Beyond Surface Level: Experience the Deep Clean Difference for a Truly Reset Home.",
      body: [
        "If your home needs more than just a quick spruce, our Total Home Reset is the perfect solution. This is our most thorough and detailed cleaning package, designed to tackle the grime, dust, and build-up that standard cleaning overlooks. We dedicate the necessary time to deep-clean every corner, establishing a pristine foundation for your home.",
        "When time is critical, choose the crew that guarantees a noticeable difference fast.",

      ],
    },
    highlights: [
      {
        title: "Deep Cleaning Highlights",
        cards: [
  {
    title: "Kitchen Detail",
    features: [
      "Intensive scrubbing of backsplashes.",
      "Deep cleaning of appliance exteriors.",
      "Degreasing range hoods & stovetops.",
      
    ],
  },
  {
    title: "Bathroom Sanctuary",
    features: [
      "Thorough scrubbing of shower grout & tile walls.",
      "Disinfecting toilets, tubs & sinks.",
      "Descaling fixtures & glass shower doors.",
      
      
    ],
  },
  {
    title: "Flooring",
    features: [
      "High-power vacuuming & edge cleaning of carpets.",
      "Deep mopping & sanitizing of hard floors.",
      "Detailed cleaning of baseboards & floor corners.",
      
    ],
  },
  {
    title: "All Areas Focus",
    features: [
      "Wiping down & dusting all baseboards.",
      "Detailed cleaning of window sills & ledges.",
      "Sanitizing door frames, doors & handles.",
      
    ],
  },
]
      },
    ],
  },

  "end-of-tenancy-cleaning": {
    introduction: {
      headline: "Empty House, Full Clean: Guaranteeing Your Deposit Back or a Sparkling New Start.",
      body: [
        "Our Transition Tidy / Spotless Turnover service is a highly focused, comprehensive clean designed specifically for empty properties. This service goes beyond standard deep cleaning, focusing intensely on forgotten areas like inside cabinets, drawers, and utility spaces to meet the strict standards required for turnover.",
        "For a seamless transition, trust the experts in total property turnover.",
      ],
    },
    highlights: [
      {
        title: "End of Tenancy Cleaning Highlights",
        cards: [
          {
            title: "Kitchen & Utility Detail",
            features: [
              "Inside & outside of all cabinets and drawers wiped clean.",
              "Inside & outside of all major appliances (oven, fridge, dishwasher) thoroughly cleaned.",
              "Deep scrubbing of range hood and stovetop.",
            ],
          },
          {
            title: "Bathroom Intensive",
            features: [
              "Heavy scrubbing and descaling of shower grout, tile, tubs & shower doors.",
              "Inside vanity drawers and cabinets cleaned.",
            ],
          },
          {
            title: "General Areas & Walls",
            features: [
              "Wiping down all interior windows.",
              "Window tracks, sills, light switches & door frames.",
              "Spot-cleaning visible marks on walls.",
            ],
          },
          {
            title: "Flooring",
            features: [
              "High-power vacuuming of all carpeted areas.",
              "Washing / mopping and shining all hard floors.",
            ],
          },
        ],
      },
    ],
  },

  "post-construction-cleaning": {
    introduction: {
      headline:
        "The Final Transformation: Eliminating Construction Dust and Revealing the Shine of Your New Space.",
      body: [
        "Our Construction Dust-Buster service is essential for safely and thoroughly removing construction residue, fine drywall dust, paint splatter, and adhesive marks. This two-phase process (rough clean and final clean) focuses on microscopic dust removal from every surface using specialized equipment to achieve move-in readiness.",
        "Do not let construction dust linger. Trust our specialized crew to deliver a polish that truly completes your project.",
      ],
    },
    highlights: [
      {
        title: "Post-Construction & Renovation Cleaning Highlights",
        cards: [
          {
            title: "Dust & Air Quality",
            features: [
              "Multiple wiping of all surfaces with microfiber cloths.",
              "HEPA vacuuming.",
              "Cleaning of air vents and returns.",
            ],
          },
          {
            title: "Window Detailing",
            features: ["Washing glass, frames, and tracks.", "Safe removal of paint, stickers, or residue."],
          },
          {
            title: "Kitchen & Bathroom",
            features: [
              "Wiping out all newly installed cabinets/drawers.",
              "Removing grout haze from tile.",
              "Cleaning fixtures of caulk/putty/dust.",
            ],
          },
          {
            title: "Flooring",
            features: [
              "Heavy-duty HEPA-filter vacuuming.",
              "Detailed edge cleaning, washing, and polishing of hard floors.",
            ],
          },
        ],
      },
    ],
  },

  "premium-rental-concierge-cleaning": {
    introduction: {
      headline: "Seamless Stays, Five-Star Reviews: Perfect Turnover, Every Time.",
      body: [
        "Our Rental Ready Turnover service is custom-built for the unique demands of short-term rental properties. The goal is to maximize efficiency while ensuring every detail meets the highest hospitality standards for immediate guest check-in. This service is time-critical and includes essential re-stocking and presentation tasks that standard cleaning services do not cover.",
        "We are the key to consistent 5-star cleanliness and stress-free hosting.",
      ],
    },
    highlights: [
      {
        title: "Premium Rental Concierge Cleaning Highlights",
        cards: [
          {
            title: "Guest Sanctuary (Bathrooms)",
            features: [
              "Luxury hand soap — dispenser full or new bar presented.",
              "Hair care — new travel-size shampoo & conditioner set.",
              "Paper products — toilet roll mounted & sealed, spares stocked.",
              "Guest linens — freshly laundered & folded towels.",
              "Floor bath mat — clean & placed.",
            ],
          },
          {
            title: "Kitchen & Guest Refreshments",
            features: [
              "Beverages and sweeteners displayed neatly.",
              "Cleaning essentials ready for guest use.",
              "New waste bag liner and full paper towel roll.",
              "Welcome amenity in sealed presentation.",
            ],
          },
          {
            title: "Linen Management (Bedrooms)",
            features: [
              "Mattress visually inspected — no stains or damage.",
              "Fresh, tightly made bottom and top sheets.",
              "Pillowcases and duvet cover freshly applied and staged.",
              "Detailed, dust-free wipe of lighting fixtures.",
            ],
          },
          {
            title: "Maintenance & Final Notes",
            features: [
              "Spot check walls, remove marks & fingerprints.",
              "Ensure all surfaces are dust-free.",
              "Safety check to remove any hazards.",
              "Complete final walkthrough & staging inspection.",
            ],
          },
        ],
      },
    ],
  },

  "commercial-office-cleaning": {
    introduction: {
      headline: "Enhancing Productivity Through Impeccable Premises and Workplace Wellness.",
      body: [
        "Our Professional Premises Polish service is tailored to businesses seeking reliable, high-quality cleaning for their commercial spaces, offices, and corporate environments. Our teams operate with discretion and efficiency, typically scheduling outside of standard business hours to minimize disruption. The focus is on maintaining a professional image, improving employee wellness through hygiene, and ensuring compliance with sanitation standards across high-traffic zones.",
        "A clean environment is a productive environment. Partner with us for consistent excellence.",
      ],

    },
    highlights: [
      {
        title: "Workplace Wellness Checklist (Commercial Focus)",
        cards: [
          {
            title: "Common Areas & Reception",
            features: [
              "Dusting all visible horizontal surfaces, desks, and filing cabinets.",
              "Polishing reception area furniture and glass/metal fixtures.",
              "Detailed cleaning of all internal glass (doors, partitions).",
            ],
          },
          {
            title: "Kitchenette & Break Rooms",
            features: [
              "Cleaning and sanitizing counters, sinks, and appliance exteriors (microwaves, refrigerators).",
              "Damp wiping tables and chairs.",
            ],
          },
          {
            title: "Restrooms",
            features: [
              "Thorough cleaning and disinfection of all toilets, urinals, sinks, and fixtures.",
              "Refilling paper products and hand soap/sanitizer dispensers.",
            ],
          },
          {
            title: "Flooring",
            features: [
              "Daily vacuuming of all carpeted areas.",
              "Sweeping and mopping all hard floor surfaces (tile, vinyl, wood).",
            ],
          },
          {
            title: "Waste Management",
            features: [
              "Emptying all waste bins and replacing liners.",
              "Centralizing recyclables for collection.",
            ],
          },
        ],
      },
      {
        title: "Contractual Service Frequency Options",
        cards: [
          {
            title: "Daily Clean",
            features: [
              "For high-traffic corporate offices and medical facilities.",
            ],
          },
          {
            title: "Three Times Weekly",
            features: [
              "The standard for mid-sized offices.",
            ],
          },
          {
            title: "Weekly Clean",
            features: [
              "Suitable for smaller offices or those with minimal foot traffic.",
            ],
          },
          {
            title: "Bi-Weekly Clean",
            features: [
              "Focus on restrooms, break rooms, and floor polishing only.",
            ],
          },
        ],
      },
    ],
  },

  "guard-sanitization-services": {
    introduction: {
      headline: "Beyond Clean: Implementing Hospital-Grade Disinfection for a Truly HealthGuard Environment.",
      body: [
        "Our HealthGuard Sanitization service focuses exclusively on eliminating pathogens, bacteria, and viruses from high-touch and high-traffic surfaces. This service utilizes EPA/ECHA-registered, hospital-grade disinfectants and specialized application methods (such as fogging or electrostatic spraying, where applicable) to achieve maximum coverage and microbial kill rates.",
        "This service is ideal for clients requiring advanced hygiene standards, including doctors' offices, gyms, schools, and homes with high vulnerability. We do not just clean — we clinically purify your space for health and peace of mind.",
      ],

    },
    highlights: [
      {
        title: "Pure Space Disinfection Checklist (Targeted Focus – Including Residential)",
        cards: [
          {
            title: "Pure Space Disinfection Checklist",
            features: [
              "Initial surface cleaning followed by hospital-grade disinfectant application.",
              "High-touch surfaces: door handles, switches, remotes, thermostats, railings, phones.",
              "Restrooms: disinfecting fixtures, sinks, counters, toilets, handles, shower/tub areas.",
            ],
          },
          {
            title: "Kitchen & Food Prep Areas",
            features: [
              "Counters, sinks, faucet handles.",
              "Exterior handles of fridge, cabinets, microwave.",
              "Microwave interiors, keypads, coffee machine buttons.",
            ],
          },
          {
            title: "Residential Detail Focus",
            features: [
              "Nightstands, drawer pulls, children's hard toys.",
              "Gaming controllers and appliance buttons/dials.",
            ],
          },
          {
            title: "Office Detail Focus",
            features: [
              "Keyboards, mice, desk surfaces.",
              "Communal water fountain buttons.",
            ],
          },
          {
            title: "Application Method",
            features: [
              "Liquid spray / microfiber cloths + electrostatic spray where required.",
              "Fogging or electrostatic spraying where required.",
            ],
          },
        ],
      },
    ],
  },

  "carpet-upholstery-cleaning": {
    introduction: {
      headline: "Deep Fiber Renewal: Restoring Softness, Color, and Freshness to Every Surface You Sit On.",
      body: [
        "Our Fiber Renewal service uses professional hot-water extraction and fabric-safe treatments to lift embedded dirt, allergens, and odors from carpets, rugs, upholstery, mattresses, and curtains — going far deeper than a standard vacuum ever could. Every fabric type is assessed before treatment, so delicate rugs and fine upholstery get the gentle care they need while heavy-traffic carpets get the deep clean they demand.",
        "The result is softer, brighter, and healthier fabric throughout your home — with faster dry times and no harsh chemical residue left behind.",
      ],
    },
    highlights: [
      {
        title: "Carpet & Upholstery Cleaning Highlights",
        cards: [
          {
            title: "Carpet Cleaning",
            features: [
              "Health & air quality boost — removes allergens.",
              "Restoration & value retention.",
              "Professional deep hot-water extraction.",
              "Safe & effective eco-friendly solutions.",
            ],
          },
          {
            title: "Rug Cleaning",
            features: [
              "Gentle care for all rug types.",
              "Color & texture protection.",
              "Hand-finished detailing.",
            ],
          },
          {
            title: "Upholstery Cleaning",
            features: [
              "Clean, fresh comfort that extends furniture lifespan.",
              "Stain & odor removal.",
              "Professional fabric-safe care.",
            ],
          },
          {
            title: "Mattress Cleaning",
            features: ["Removes dust mites & allergens.", "Improves sleep hygiene.", "Deep sanitation process."],
          },
          {
            title: "Curtain Cleaning",
            features: ["No removal needed.", "Fabric-safe steam cleaning.", "Freshens indoor air."],
          },
        ],
      },
    ],
  },

  "steam-cleaning": {
    introduction: {
      headline: "Harnessing the Pure Power of Steam for Chemical-Free Deep Cleaning and Sanitization.",
      body: [
        "Our Vapor Virtue Cleaning service utilizes high-temperature, low-moisture steam to sanitize surfaces, dissolve grease, eliminate mold and mildew, and kill up to 99.9% of bacteria, germs, and dust mites. This service is ideal for clients seeking an environmentally friendly, hypoallergenic, and highly effective method for deep cleaning kitchens, restrooms, tile and grout, and hard-to-reach crevices.",
        "Pure, pressurized steam penetrates deeper than conventional cleaning methods.",
      ],
    },
    highlights: [
      {
        title: "Steam Cleaning Highlights",
        cards: [
          {
            title: "Kitchen Detail",
            features: [
              "Steaming and sanitizing range hoods and stovetop grates.",
              "Deep steam cleaning oven interiors and refrigerator seals.",
              "Sanitizing cutting boards using high-temperature steam.",
            ],
          },
          {
            title: "Restroom Deep Clean",
            features: [
              "Steam cleaning grout lines and dissolving soap scum.",
              "Cleaning toilet bases, hinges, and hard-to-reach areas.",
            ],
          },
          {
            title: "Surface Disinfection",
            features: [
              "Steam sanitizing high-touch points: handles, switches.",
              "Chemical-free disinfection of appliance keypads.",
            ],
          },
          {
            title: "Crevice & Spot Treatment",
            features: [
              "Precision nozzle steam cleaning for corners and baseboards.",
              "Cleaning window tracks and tile grout effectively.",
              "Light fabric and upholstery spot treatment.",
            ],
          },
        ],
      },
    ],
  },

  "post-event-cleaning": {
    introduction: {
      headline: "The Only Thing We Leave Behind Is a Spotless Venue.",
      body: [
        "Our special event cleaning service is designed to ensure your event space is spotless and ready, allowing you to focus on enjoying the occasion. From preparation to post-event, our professionals handle every detail to create a clean and welcoming environment for guests.",
        "This comprehensive service guarantees a well-maintained, hygienic space, enhancing the atmosphere and leaving a lasting positive impression on guests — saving you time and effort.",
      ],
    },
    highlights: [
      {
        title: "Post-Event Cleaning Highlights",
        cards: [
          {
            title: "Before the Event",
            features: [
              "Define the scope of cleaning needed based on the event type and size.",
              "Declutter, dust, and organize the space.",
              "Vacuum carpets, sweep and mop hard floors.",
              "Clean windows, glass surfaces, seating and tables.",
              "Sanitize high-touch surfaces (doorknobs, switches, handrails).",
            ],
          },
          {
            title: "Just Before Guests Arrive",
            features: [
              "Final walkthrough and touch-up of smudges or marks.",
              "Re-check restrooms for supplies.",
              "Confirm decorations and signage are clean and in place.",
              "Store cleaning equipment out of sight.",
            ],
          },
          {
            title: "During the Event",
            features: [
              "Monitor and empty trash cans as needed.",
              "Clean spills and messes immediately.",
              "Restock restroom supplies.",
              "Keep spot-cleaning supplies handy but hidden.",
            ],
          },
          {
            title: "After the Event",
            features: [
              "Full post-event cleaning (vacuum, mop, wipe surfaces).",
              "Clean and store rental equipment.",
              "Dispose of trash and recycling properly.",
              "Check for damage or excessive wear.",
            ],
          },
        ],
      },
    ],
  },

  "pool-cleaning-maintenance": {
    introduction: {
      headline: "Maintain Pristine Water Quality and Extend the Life of Your Pool Equipment.",
      body: [
        "Our Aquatic Clarity service offers specialized, recurring maintenance for residential and commercial swimming pools. This service ensures optimal water chemistry, equipment longevity, and a clean, safe swimming environment. Our patrols are comprehensive, covering both physical cleaning and chemical balance management.",
        "Pricing Note: Prices are quoted per-service (weekly/bi-weekly) based on the pool size (surface area or volume) and the required chemical expertise.",
      ],
    },
    highlights: [
      {
        title: "Pool Cleaning Highlights",
        cards: [
          {
            title: "Debris Removal",
            features: ["Skimming the water surface and vacuuming the pool floor and walls."],
          },
          {
            title: "Filter Maintenance",
            features: ["Backwashing/cleaning the filter; emptying the skimmer and pump baskets."],
          },
          {
            title: "Wall & Tile Scrubbing",
            features: ["Brushing the pool walls and tile lines to prevent algae and scale buildup."],
          },
          {
            title: "Chemical Balance",
            features: ["Testing and adjusting chlorine/sanitizer, pH, alkalinity, and calcium hardness."],
          },
          {
            title: "Equipment Check",
            features: ["Inspecting the pump, heater, filter, and timer for proper functioning."],
          },
        ],
      },
    ],
  },

  "precision-pressure-washing": {
    introduction: {
      headline: "Restoring Brilliance: The Deepest Clean for Exteriors, Driveways, and Commercial Surfaces.",
      body: [
        "Our Exterior Blast & Brighten service uses professional-grade, high-pressure equipment, often including hot water (power washing) capabilities, specialized nozzles, and biodegradable detergents to safely and effectively clean tough, large, or high-access exterior surfaces.",
      ],
    },
    highlights: [
      {
        title: "Precision Pressure Washing Highlights",
        cards: [
          {
            title: "Soft Washing",
            features: [
              "A gentle, eco-friendly cleaning solution ideal for delicate surfaces — removes dirt, mold, and organic buildup while preserving paint, siding, and exterior finishes.",
            ],
          },
          {
            title: "Driveways & Patios",
            features: [
              "High-performance pressure washing to eliminate oil stains, algae, and embedded grime from concrete and paved surfaces.",
            ],
          },
          {
            title: "Windows & Gutters",
            features: [
              "Professional cleaning to remove debris, dust, and residue, ensuring clear views, proper drainage, and long-term protection.",
            ],
          },
        ],
      },
    ],
  },

  "childcare-services": {
    introduction: {
      headline: "Little Stars Nurturing / Family First Childcare",
      body: [
        "This service provides highly personalized, premium childcare, often in the home, specializing in educational engagement, flexible scheduling, and comprehensive support — including meals, hygiene, transportation, and light housekeeping.",
      ],
    },
    highlights: [
      {
        title: "Child Care Service Highlights",
        cards: [
          {
            title: "Infant Care (3–18 months)",
            features: ["Specialized attention and sensory development activities designed for babies."],
          },
          {
            title: "Toddler Learning (1.5–3 years)",
            features: ["Play-based learning and social skills development for curious toddlers."],
          },
          {
            title: "Daily Care",
            features: ["Full-day care for children, providing a safe and nurturing environment."],
          },
          {
            title: "After-School Care",
            features: ["Homework help and creative activities for school-aged children."],
          },
          {
            title: "One-Time Sitting",
            features: ["Flexible, on-demand care for busy evenings or weekends."],
          },
          {
            title: "Last-Minute Care",
            features: ["We understand that life can be unpredictable — get last-minute care when you need it most."],
          },
        ],
      },
    ],
  },

  "elder-care-services": {
    introduction: {
      headline: "Compassionate Senior Companionship / Golden Age Assistance",
      body: [
        "This service provides highly personalized, non-medical supportive care for seniors, focusing on enhancing quality of life, safety, and independence through dedicated companionship, mobility assistance, meal preparation, and essential errands.",
      ],
    },
    highlights: [
      {
        title: "Elder Care Service Highlights",
        cards: [
          {
            title: "Companion Care",
            features: ["Social interaction and companionship.", "Assistance with daily activities."],
          },
          {
            title: "Personal Care",
            features: ["Bathing and grooming.", "Medication management.", "Incontinence care."],
          },
          {
            title: "Daily Care",
            features: [
              "Routine care and support with daily living tasks.",
              "Assistance with mobility and transfers.",
            ],
          },
        ],
      },
    ],
  },

  "laundry-linen-care": {
    introduction: {
      headline: "Effortless Laundry, Delivered Clean",
      body: ["Your time is precious — let us handle the laundry, from pickup to fresh, folded delivery."],
    },
    highlights: [
      {
        title: "Laundry Services Highlights",
        cards: [
          {
            title: "Wash & Fold",
            features: ["Everyday laundry expertly cleaned, dried, and crisply folded for your convenience."],
          },
          {
            title: "Premium Dry Cleaning",
            features: ["Specialized chemical cleaning for delicate fabrics, suits, and high-end evening wear."],
          },
          {
            title: "Professional Steam Pressing",
            features: ["Precision ironing and steam pressing for a wrinkle-free, professional finish."],
          },
          {
            title: "Eco-Luxury Fabric Care",
            features: ["Gentle cleaning using eco-friendly detergents that preserve the longevity of luxury textiles."],
          },
          {
            title: "Bedding & Linens",
            features: ["Intensive cleaning for bulky items including comforters, curtains, and bed linens."],
          },
          {
            title: "Express Pickup & Delivery",
            features: ["Scheduled door-to-door service that integrates seamlessly into your busy lifestyle."],
          },
        ],
      },
    ],
  },

  "move-in-out-transport-health": {
    introduction: {
      headline: "Seamless Moving Logistics / Home Transition Transport",
      body: [
        "This service provides bespoke transport and transition management for discerning residential and commercial clients. The fee is determined via a comprehensive quotation based on logistical complexity, inventory volume, and distance of transit.",
      ],
    },
    highlights: [
      {
        title: "Move-In / Move-Out Transport Service Highlights",
        cards: [
          {
            title: "Packing Goods",
            features: [
              "Fragile items wrapped and packed securely in appropriate containers, with clear labeling for contents and destination.",
            ],
          },
          {
            title: "Moving Goods",
            features: [
              "Goods carefully loaded and fastened on transport vehicles to prevent shifting, and unloaded efficiently at the destination.",
            ],
          },
          {
            title: "Transporting Goods",
            features: [
              "Goods securely loaded with proper weight distribution, following all safety protocols and traffic regulations during transit.",
            ],
          },
          {
            title: "Commercial / Office",
            features: [
              "Office equipment packed securely, labeled clearly, and efficiently transported to minimize disruption.",
            ],
          },
        ],
      },
    ],
  },

  "high-security-property-care": {
    introduction: {
      headline: "Vetted Personnel | Complete Discretion | Uncompromised Quality",
      body: [
        "​Specialist cleaning designed for VVIP and VIP clients, government facilities, private residences, and highly sensitive properties. Handled exclusively by security-vetted staff working under strict non-disclosure agreements, we provide complete discretion in restricted-access areas. Using premium, certified eco-friendly products safe for luxury interiors and family spaces, we deliver immaculate results with maximum trust. Contact us for a confidential consultation and quote.",
      ],
    },
    highlights: [
      {
        title: "High-Security Property Care Highlights",
        cards: [
          {
            title: "Vetted Staff & Privacy",
            features: [
              "100% background-checked, cleared, and NDA-bound technicians.",
              "Strict non-disclosure protocols to protect physical and digital data.",
            ],
          },
          {
            title: "High-Security Facilities",
            features: [
              "Specialized cleaning for SCIFs, server rooms, and confidential offices.",
              "Sub-micron dust extraction for sensitive hardware and electronics.",
            ],
          },
          {
            title: "Emergency & Hazmat Response",
            features: [
              "24/7 rapid dispatch for break-ins, biohazard spills, and crime scenes.",
              "Immediate site securing, board-up, and insurance photo documentation.",
            ],
          },
          {
            title: "Digital Device Sanitization",
            features: [
              "On-site or remote virus, adware, and malware purges.",
              "Complete data wipes and privacy restoration for infected devices.",
            ],
          },
        ],
      },
    ],
  },

  "luxury-yacht-cleaning": {
    introduction: {
      headline: "Salty Hull or VIP Charter Coming? Get Yacht-Standard Perfection & Instant Shine!",
      body: [
        "Maintaining a world-class luxury vessel requires relentless care and uncompromising detail. Whether you are preparing your yacht for an exclusive charter, recovering from a multi-day sea voyage, or needing discreet interior housekeeping for high-profile guests, our Marine Cleaning Specialists are ready to step in.",
        "We specialize in high-end yacht detailing, marine-grade hull restoration, teak treatment, and ultra-discreet interior sanitation. Our crew is background-checked, trained in luxury surface care, and fully versed in maritime safety protocols—delivering white-glove treatment while protecting your vessel's delicate finishes and total privacy.",
        "When luxury and marine precision matter most, choose the crew trusted on the water.",
      ],
    },
    highlights: [
      {
        title: "Luxury Yacht Care Checklist (Maximum Precision, Flawless Finish)",
        cards: [
          {
            title: "Exterior & Superstructure",
            features: [
              "Marine-grade wash-down, salt deposit neutralization, and streak-free drying.",
              "Stainless steel polishing, glass clarity treatment, and teak deck scrubbing.",
            ],
          },
          {
            title: "Interior VIP Staterooms",
            features: [
              "White-glove housekeeping for VIP cabins, master suites, and galley areas.",
              "Deep cleaning of delicate upholstery, fine leather, marble, and custom woodwork.",
            ],
          },
          {
            title: "Engine Room & Technical Zones",
            features: [
              "Degreasing engine room bilges, wiping down machinery, and mechanical space prep.",
              "Eco-friendly hazardous residue containment complying with maritime environmental standards.",
            ],
          },
          {
            title: "Rapid Post-Charter Turnaround",
            features: [
              "Emergency 24/7 fast-response cleaning between charter bookings.",
              "Complete linen turnover, sanitation, and provision prep for upcoming guests.",
            ],
          },
        ],
      },
    ],
  },
};

// Aliases for slug variations between backend catalog and frontend routes
if (SERVICE_CONTENT["regular-home-cleaning"]) {
  SERVICE_CONTENT["regular-maintenance-cleaning"] = SERVICE_CONTENT["regular-home-cleaning"];
}
if (SERVICE_CONTENT["essential-touch-up-cleaning"]) {
  SERVICE_CONTENT["quick-touch-up-cleaning"] = SERVICE_CONTENT["essential-touch-up-cleaning"];
}
if (SERVICE_CONTENT["post-construction-renovation-cleaning"]) {
  SERVICE_CONTENT["post-construction-cleaning"] = SERVICE_CONTENT["post-construction-renovation-cleaning"];
}
