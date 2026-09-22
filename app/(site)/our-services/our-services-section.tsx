"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sparkles,
  Clock,
  Zap,
  Home,
  Building2,
  ShieldCheck,
  Wind,
  Sofa,
  PartyPopper,
  Waves,
  SprayCan,
  Baby,
  HeartHandshake,
  Shirt,
  Truck,
  Lock,
  Anchor,
  CheckCircle2,
  ChevronRight,
  CrossIcon,
  Cross,
  X,
} from "lucide-react";

// ---------- Types ----------
interface ServiceFeature {
  title: string;
  items: string[];
}

interface Service {
  id: string;
  title: string;
  headline: string;
  body: string[];
  icon: React.ReactNode;
  highlightsTitle: string;
  features: ServiceFeature[];
}

// ---------- Data ----------
const services: Service[] = [
  {
    id: "regular-home-cleaning",
    title: "Regular Home Cleaning",
    headline: "The Weekly Refresh: Consistent Clean, Sustainable Peace of Mind.",
    body: [
      "Stop stressing over everyday chores. Our Standard Residential Cleaning service establishes a reliable, recurring schedule that keeps your home effortlessly immaculate. We use exclusively green, certified eco-friendly products to deliver a deep, sparkling clean that is 100% safe for children and pets. Commit to consistency and enjoy the luxury of coming home to a healthier, reliably pristine space every week.",
    ],
    icon: <Home className="w-5 h-5" />,
    highlightsTitle: "Regular Home Cleaning Highlights",
    features: [
      {
        title: "General Home Care",
        items: [
          "Dusting",
          "Surface cleaning (including glass)",
          "Light tidying",
          "Trash removal and floor care (vacuuming/mopping)",
        ],
      },
      {
        title: "Essential Touch-Points",
        items: [
          "Bed making, linen management & targeted disinfection of high-touch surfaces for health & maintenance",
        ],
      },
      {
        title: "Kitchen & Dining",
        items: [
          "Appliance exterior care",
          "Countertop & sink sanitation",
          "Dish organization & complete floor cleaning",
        ],
      },
      {
        title: "Bathroom Cleaning",
        items: [
          "Full disinfection & hygiene focus",
          "Cleaning of toilet, sink, shower & tub",
          "Mirror cleaning & fresh towel placement",
        ],
      },
    ],
  },
  {
    id: "quick-touch-up-cleaning",
    title: "Quick Touch-Up Cleaning",
    headline: "Fast-Track Freshness for High-Traffic Spaces",
    body: [
      "Short on time but need your home looking its best? Our Essential Touch-Up Cleaning is a high-speed, targeted service designed to restore polish to your primary living areas. Ideal before hosting guests, after an event, or between routine visits, we focus on high-traffic zones—like key surfaces, kitchens, and bathrooms—using 100% certified eco-friendly products.",
    ],
    icon: <Zap className="w-5 h-5" />,
    highlightsTitle: "Essential Touch-Up Cleaning Highlights",
    features: [
      {
        title: "Kitchen",
        items: [
          "Wipe down exterior of all major appliances (fridge, oven, dishwasher)",
          "Clean and sanitize countertops and backsplash",
          "Scrub and polish the sink and faucet",
          "Wipe down the stovetop (surface only)",
          "Exterior wipe of microwave",
        ],
      },
      {
        title: "Bathrooms",
        items: [
          "Sanitize toilet, seat, and base",
          "Clean mirrors and glass",
          "Wipe down vanity and sink",
          "Quick rinse and wipe of the shower/tub (no heavy grout scrubbing)",
        ],
      },
      {
        title: "Living & Bedrooms",
        items: [
          "Surface dusting of flat surfaces (tables, nightstands, desks)",
          "Tidy up cushions and pillows",
          "Quick wipe of mirrors and picture frames",
        ],
      },
      {
        title: "Floors & Trash",
        items: [
          "Vacuum all carpets and rugs",
          "Mop all hard floors (standard damp mop)",
          "Empty all trash bins and replace liners",
        ],
      },
    ],
  },
  {
    id: "same-day-priority-cleaning",
    title: "Same-Day Priority Cleaning",
    headline: "Urgent Response, Uncompromised Cleanliness",
    body: [
      "Need immediate cleaning help on short notice? Our Same-Day Priority Cleaning offers rapid-dispatch service for unexpected visitors, last-minute events, or sudden emergencies. We prioritize your booking to send a professional cleaner to your home as fast as possible, using 100% certified eco-friendly, non-toxic products safe for your family and pets.",
    ],
    icon: <Clock className="w-5 h-5" />,
    highlightsTitle: "Same-Day Priority Cleaning Highlights",
    features: [
      {
        title: "Flooring & Entry",
        items: [
          "High-power vacuuming and sweeping main living spaces",
          "Spot mopping high-traffic and spill-prone areas",
        ],
      },
      {
        title: "Common Area Recovery",
        items: [
          "Collecting stray items, glasses and trash",
          "Emptying and sanitizing waste bins",
          "Dusting and spot-cleaning visible surfaces",
          "Arranging furniture (sofas, chairs, pillows)",
        ],
      },
      {
        title: "Kitchen & Bar Area",
        items: [
          "Disposing empty bottles, cans, serviceware",
          "Disinfecting all counters and sticky surfaces",
          "Running dishwasher; washing basic dishes",
          "Cleaning beverage spills on hard floors",
        ],
      },
      {
        title: "Kitchen Quick-Clean",
        items: [
          "Wiping down countertops",
          "Spot-cleaning cabinet fronts",
          "Cleaning microwave & stovetop exterior",
          "Washing or loading small set",
          "Sanitizing sink & polishing fixtures",
        ],
      },
      {
        title: "Bathroom Refresh",
        items: [
          "Disinfecting sink and vanity",
          "Cleaning toilet inside and out",
          "Quick mirror wipe",
          "Changing hand towel",
          "Emptying waste bin & deodorizing",
        ],
      },
    ],
  },
  {
    id: "deep-cleaning",
    title: "Deep Cleaning",
    headline: "Beyond Surface Level: Experience the Deep Clean Difference for a Truly Reset Home.",
    body: [
      "If your home needs more than just a quick spruce, our Total Home Reset is the perfect solution. This is our most thorough and detailed cleaning package, designed to tackle the grime, dust, and build-up that standard cleaning overlooks. We dedicate the necessary time to deep-clean every corner, establishing a pristine foundation for your home.",
    ],
    icon: <Sparkles className="w-5 h-5" />,
    highlightsTitle: "Deep Cleaning Highlights",
    features: [
      {
        title: "Kitchen Detail",
        items: [
          "Intensive scrubbing of backsplashes",
          "Deep cleaning of appliance exteriors",
          "Degreasing range hoods & stovetops",
        ],
      },
      {
        title: "Bathroom Sanctuary",
        items: [
          "Thorough scrubbing of shower grout & tile walls",
          "Disinfecting toilets, tubs & sinks",
          "Descaling fixtures & glass shower doors",
        ],
      },
      {
        title: "Flooring",
        items: [
          "High-power vacuuming & edge cleaning of carpets",
          "Deep mopping & sanitizing of hard floors",
          "Detailed cleaning of baseboards & floor corners",
        ],
      },
      {
        title: "All Areas Focus",
        items: [
          "Wiping down & dusting all baseboards",
          "Detailed cleaning of window sills & ledges",
          "Sanitizing door frames, doors & handles",
        ],
      },
    ],
  },
  {
    id: "end-of-tenancy-cleaning",
    title: "End of Tenancy Cleaning",
    headline: "Empty House, Full Clean: Guaranteeing Your Deposit Back or a Sparkling New Start.",
    body: [
      "Our Transition Tidy / Spotless Turnover service is a highly focused, comprehensive clean designed specifically for empty properties. This service goes beyond standard deep cleaning, focusing intensely on forgotten areas like inside cabinets, drawers, and utility spaces to meet the strict standards required for turnover.",
    ],
    icon: <Home className="w-5 h-5" />,
    highlightsTitle: "End of Tenancy Cleaning Highlights",
    features: [
      {
        title: "Kitchen & Utility Detail",
        items: [
          "Inside & outside of all cabinets and drawers wiped clean",
          "Inside & outside of all major appliances (oven, fridge, dishwasher) thoroughly cleaned",
          "Deep scrubbing of range hood and stovetop",
        ],
      },
      {
        title: "Bathroom Intensive",
        items: [
          "Heavy scrubbing and descaling of shower grout, tile, tubs & shower doors",
          "Inside vanity drawers and cabinets cleaned",
        ],
      },
      {
        title: "General Areas & Walls",
        items: [
          "Wiping down all interior windows",
          "Window tracks, sills, light switches & door frames",
          "Spot-cleaning visible marks on walls",
        ],
      },
      {
        title: "Flooring",
        items: [
          "High-power vacuuming of all carpeted areas",
          "Washing / mopping and shining all hard floors",
        ],
      },
    ],
  },
  {
    id: "post-construction-renovation-cleaning",
    title: "Post-Construction & Renovation Cleaning",
    headline: "The Final Transformation: Eliminating Construction Dust and Revealing the Shine of Your New Space.",
    body: [
      "Our Construction Dust-Buster service is essential for safely and thoroughly removing construction residue, fine drywall dust, paint splatter, and adhesive marks. This two-phase process (rough clean and final clean) focuses on microscopic dust removal from every surface using specialized equipment to achieve move-in readiness.",
    ],
    icon: <Building2 className="w-5 h-5" />,
    highlightsTitle: "Post-Construction & Renovation Cleaning Highlights",
    features: [
      {
        title: "Dust & Air Quality",
        items: [
          "Multiple wiping of all surfaces with microfiber cloths",
          "HEPA vacuuming",
          "Cleaning of air vents and returns",
        ],
      },
      {
        title: "Window Detailing",
        items: [
          "Washing glass, frames, and tracks",
          "Safe removal of paint, stickers, or residue",
        ],
      },
      {
        title: "Kitchen & Bathroom",
        items: [
          "Wiping out all newly installed cabinets/drawers",
          "Removing grout haze from tile",
          "Cleaning fixtures of caulk/putty/dust",
        ],
      },
      {
        title: "Flooring",
        items: [
          "Heavy-duty HEPA-filter vacuuming",
          "Detailed edge cleaning, washing, and polishing of hard floors",
        ],
      },
    ],
  },
  {
    id: "premium-rental-concierge-cleaning",
    title: "Premium Rental Concierge Cleaning",
    headline: "Seamless Stays, Five-Star Reviews: Perfect Turnover, Every Time.",
    body: [
      "Our Rental Ready Turnover service is custom-built for the unique demands of short-term rental properties. The goal is to maximize efficiency while ensuring every detail meets the highest hospitality standards for immediate guest check-in. This service is time-critical and includes essential re-stocking and presentation tasks that standard cleaning services do not cover.",
    ],
    icon: <Sparkles className="w-5 h-5" />,
    highlightsTitle: "Premium Rental Concierge Cleaning Highlights",
    features: [
      {
        title: "Guest Sanctuary (Bathrooms)",
        items: [
          "Luxury hand soap — dispenser full or new bar presented",
          "Hair care — new travel-size shampoo & conditioner set",
          "Paper products — toilet roll mounted & sealed, spares stocked",
          "Guest linens — freshly laundered & folded towels",
          "Floor bath mat — clean & placed",
        ],
      },
      {
        title: "Kitchen & Guest Refreshments",
        items: [
          "Beverages and sweeteners displayed neatly",
          "Cleaning essentials ready for guest use",
          "New waste bag liner and full paper towel roll",
          "Welcome amenity in sealed presentation",
        ],
      },
      {
        title: "Linen Management (Bedrooms)",
        items: [
          "Mattress visually inspected — no stains or damage",
          "Fresh, tightly made bottom and top sheets",
          "Pillowcases and duvet cover freshly applied and staged",
          "Detailed, dust-free wipe of lighting fixtures",
        ],
      },
      {
        title: "Maintenance & Final Notes",
        items: [
          "Spot check walls, remove marks & fingerprints",
          "Ensure all surfaces are dust-free",
          "Safety check to remove any hazards",
          "Complete final walkthrough & staging inspection",
        ],
      },
    ],
  },
  {
    id: "commercial-office-cleaning",
    title: "Commercial Office Cleaning",
    headline: "Enhancing Productivity Through Impeccable Premises and Workplace Wellness.",
    body: [
      "Our Professional Premises Polish service is tailored to businesses seeking reliable, high-quality cleaning for their commercial spaces, offices, and corporate environments. Our teams operate with discretion and efficiency, typically scheduling outside of standard business hours to minimize disruption.",
    ],
    icon: <Building2 className="w-5 h-5" />,
    highlightsTitle: "Workplace Wellness Checklist",
    features: [
      {
        title: "Common Areas & Reception",
        items: [
          "Dusting all visible horizontal surfaces, desks, and filing cabinets",
          "Polishing reception area furniture and glass/metal fixtures",
          "Detailed cleaning of all internal glass (doors, partitions)",
        ],
      },
      {
        title: "Kitchenette & Break Rooms",
        items: [
          "Cleaning and sanitizing counters, sinks, and appliance exteriors",
          "Damp wiping tables and chairs",
        ],
      },
      {
        title: "Restrooms",
        items: [
          "Thorough cleaning and disinfection of all toilets, urinals, sinks, and fixtures",
          "Refilling paper products and hand soap/sanitizer dispensers",
        ],
      },
      {
        title: "Flooring",
        items: [
          "Daily vacuuming of all carpeted areas",
          "Sweeping and mopping all hard floor surfaces",
        ],
      },
      {
        title: "Waste Management",
        items: [
          "Emptying all waste bins and replacing liners",
          "Centralizing recyclables for collection",
        ],
      },
    ],
  },
  {
    id: "healthguard-sanitization",
    title: "HealthGuard Sanitization",
    headline: "Beyond Clean: Implementing Hospital-Grade Disinfection for a Truly HealthGuard Environment.",
    body: [
      "Our HealthGuard Sanitization service focuses exclusively on eliminating pathogens, bacteria, and viruses from high-touch and high-traffic surfaces. This service utilizes EPA/ECHA-registered, hospital-grade disinfectants and specialized application methods to achieve maximum coverage and microbial kill rates.",
    ],
    icon: <ShieldCheck className="w-5 h-5" />,
    highlightsTitle: "Pure Space Disinfection Checklist",
    features: [
      {
        title: "High-Touch Surfaces",
        items: [
          "Initial surface cleaning followed by hospital-grade disinfectant application",
          "Door handles, switches, remotes, thermostats, railings, phones",
          "Restrooms: fixtures, sinks, counters, toilets, handles, shower/tub areas",
        ],
      },
      {
        title: "Kitchen & Food Prep Areas",
        items: [
          "Counters, sinks, faucet handles",
          "Exterior handles of fridge, cabinets, microwave",
          "Microwave interiors, keypads, coffee machine buttons",
        ],
      },
      {
        title: "Residential Detail Focus",
        items: [
          "Nightstands, drawer pulls, children's hard toys",
          "Gaming controllers and appliance buttons/dials",
        ],
      },
      {
        title: "Application Method",
        items: [
          "Liquid spray / microfiber cloths + electrostatic spray where required",
          "Fogging or electrostatic spraying where required",
        ],
      },
    ],
  },
  {
    id: "carpet-upholstery-cleaning",
    title: "Carpet & Upholstery Cleaning",
    headline: "Deep Fiber Renewal: Restoring Softness, Color, and Freshness to Every Surface You Sit On.",
    body: [
      "Our Fiber Renewal service uses professional hot-water extraction and fabric-safe treatments to lift embedded dirt, allergens, and odors from carpets, rugs, upholstery, mattresses, and curtains — going far deeper than a standard vacuum ever could.",
    ],
    icon: <Sofa className="w-5 h-5" />,
    highlightsTitle: "Carpet & Upholstery Cleaning Highlights",
    features: [
      {
        title: "Carpet Cleaning",
        items: [
          "Health & air quality boost — removes allergens",
          "Restoration & value retention",
          "Professional deep hot-water extraction",
          "Safe & effective eco-friendly solutions",
        ],
      },
      {
        title: "Rug Cleaning",
        items: [
          "Gentle care for all rug types",
          "Color & texture protection",
          "Hand-finished detailing",
        ],
      },
      {
        title: "Upholstery Cleaning",
        items: [
          "Clean, fresh comfort that extends furniture lifespan",
          "Stain & odor removal",
          "Professional fabric-safe care",
        ],
      },
      {
        title: "Mattress Cleaning",
        items: [
          "Removes dust mites & allergens",
          "Improves sleep hygiene",
          "Deep sanitation process",
        ],
      },
      {
        title: "Curtain Cleaning",
        items: [
          "No removal needed",
          "Fabric-safe steam cleaning",
          "Freshens indoor air",
        ],
      },
    ],
  },
  {
    id: "steam-cleaning",
    title: "Steam Cleaning",
    headline: "Harnessing the Pure Power of Steam for Chemical-Free Deep Cleaning and Sanitization.",
    body: [
      "Our Vapor Virtue Cleaning service utilizes high-temperature, low-moisture steam to sanitize surfaces, dissolve grease, eliminate mold and mildew, and kill up to 99.9% of bacteria, germs, and dust mites.",
    ],
    icon: <Wind className="w-5 h-5" />,
    highlightsTitle: "Steam Cleaning Highlights",
    features: [
      {
        title: "Kitchen Detail",
        items: [
          "Steaming and sanitizing range hoods and stovetop grates",
          "Deep steam cleaning oven interiors and refrigerator seals",
          "Sanitizing cutting boards using high-temperature steam",
        ],
      },
      {
        title: "Restroom Deep Clean",
        items: [
          "Steam cleaning grout lines and dissolving soap scum",
          "Cleaning toilet bases, hinges, and hard-to-reach areas",
        ],
      },
      {
        title: "Surface Disinfection",
        items: [
          "Steam sanitizing high-touch points: handles, switches",
          "Chemical-free disinfection of appliance keypads",
        ],
      },
      {
        title: "Crevice & Spot Treatment",
        items: [
          "Precision nozzle steam cleaning for corners and baseboards",
          "Cleaning window tracks and tile grout effectively",
          "Light fabric and upholstery spot treatment",
        ],
      },
    ],
  },
  {
    id: "post-event-cleaning",
    title: "Post-Event Cleaning",
    headline: "The Only Thing We Leave Behind Is a Spotless Venue.",
    body: [
      "Our special event cleaning service is designed to ensure your event space is spotless and ready, allowing you to focus on enjoying the occasion. From preparation to post-event, our professionals handle every detail to create a clean and welcoming environment for guests.",
    ],
    icon: <PartyPopper className="w-5 h-5" />,
    highlightsTitle: "Post-Event Cleaning Highlights",
    features: [
      {
        title: "Before the Event",
        items: [
          "Define the scope of cleaning needed based on the event type and size",
          "Declutter, dust, and organize the space",
          "Vacuum carpets, sweep and mop hard floors",
          "Clean windows, glass surfaces, seating and tables",
          "Sanitize high-touch surfaces",
        ],
      },
      {
        title: "Just Before Guests Arrive",
        items: [
          "Final walkthrough and touch-up of smudges or marks",
          "Re-check restrooms for supplies",
          "Confirm decorations and signage are clean and in place",
          "Store cleaning equipment out of sight",
        ],
      },
      {
        title: "During the Event",
        items: [
          "Monitor and empty trash cans as needed",
          "Clean spills and messes immediately",
          "Restock restroom supplies",
          "Keep spot-cleaning supplies handy but hidden",
        ],
      },
      {
        title: "After the Event",
        items: [
          "Full post-event cleaning (vacuum, mop, wipe surfaces)",
          "Clean and store rental equipment",
          "Dispose of trash and recycling properly",
          "Check for damage or excessive wear",
        ],
      },
    ],
  },
  {
    id: "pool-cleaning",
    title: "Pool Cleaning",
    headline: "Maintain Pristine Water Quality and Extend the Life of Your Pool Equipment.",
    body: [
      "Our Aquatic Clarity service offers specialized, recurring maintenance for residential and commercial swimming pools. This service ensures optimal water chemistry, equipment longevity, and a clean, safe swimming environment.",
    ],
    icon: <Waves className="w-5 h-5" />,
    highlightsTitle: "Pool Cleaning Highlights",
    features: [
      {
        title: "Debris Removal",
        items: ["Skimming the water surface and vacuuming the pool floor and walls"],
      },
      {
        title: "Filter Maintenance",
        items: ["Backwashing/cleaning the filter; emptying the skimmer and pump baskets"],
      },
      {
        title: "Wall & Tile Scrubbing",
        items: ["Brushing the pool walls and tile lines to prevent algae and scale buildup"],
      },
      {
        title: "Chemical Balance",
        items: ["Testing and adjusting chlorine/sanitizer, pH, alkalinity, and calcium hardness"],
      },
      {
        title: "Equipment Check",
        items: ["Inspecting the pump, heater, filter, and timer for proper functioning"],
      },
    ],
  },
  {
    id: "precision-pressure-washing",
    title: "Precision Pressure Washing",
    headline: "Restoring Brilliance: The Deepest Clean for Exteriors, Driveways, and Commercial Surfaces.",
    body: [
      "Our Exterior Blast & Brighten service uses professional-grade, high-pressure equipment, often including hot water capabilities, specialized nozzles, and biodegradable detergents to safely and effectively clean tough exterior surfaces.",
    ],
    icon: <SprayCan className="w-5 h-5" />,
    highlightsTitle: "Precision Pressure Washing Highlights",
    features: [
      {
        title: "Soft Washing",
        items: [
          "A gentle, eco-friendly cleaning solution ideal for delicate surfaces — removes dirt, mold, and organic buildup while preserving paint, siding, and exterior finishes",
        ],
      },
      {
        title: "Driveways & Patios",
        items: [
          "High-performance pressure washing to eliminate oil stains, algae, and embedded grime from concrete and paved surfaces",
        ],
      },
      {
        title: "Windows & Gutters",
        items: [
          "Professional cleaning to remove debris, dust, and residue, ensuring clear views, proper drainage, and long-term protection",
        ],
      },
    ],
  },
  {
    id: "child-care-service",
    title: "Child Care Service",
    headline: "Little Stars Nurturing / Family First Childcare",
    body: [
      "This service provides highly personalized, premium childcare, often in the home, specializing in educational engagement, flexible scheduling, and comprehensive support — including meals, hygiene, transportation, and light housekeeping.",
    ],
    icon: <Baby className="w-5 h-5" />,
    highlightsTitle: "Child Care Service Highlights",
    features: [
      {
        title: "Infant Care (3–18 months)",
        items: ["Specialized attention and sensory development activities designed for babies"],
      },
      {
        title: "Toddler Learning (1.5–3 years)",
        items: ["Play-based learning and social skills development for curious toddlers"],
      },
      {
        title: "Daily Care",
        items: ["Full-day care for children, providing a safe and nurturing environment"],
      },
      {
        title: "After-School Care",
        items: ["Homework help and creative activities for school-aged children"],
      },
      {
        title: "One-Time Sitting",
        items: ["Flexible, on-demand care for busy evenings or weekends"],
      },
      {
        title: "Last-Minute Care",
        items: ["We understand that life can be unpredictable — get last-minute care when you need it most"],
      },
    ],
  },
  {
    id: "elder-care-service",
    title: "Elder Care Service",
    headline: "Compassionate Senior Companionship / Golden Age Assistance",
    body: [
      "This service provides highly personalized, non-medical supportive care for seniors, focusing on enhancing quality of life, safety, and independence through dedicated companionship, mobility assistance, meal preparation, and essential errands.",
    ],
    icon: <HeartHandshake className="w-5 h-5" />,
    highlightsTitle: "Elder Care Service Highlights",
    features: [
      {
        title: "Companion Care",
        items: [
          "Social interaction and companionship",
          "Assistance with daily activities",
        ],
      },
      {
        title: "Personal Care",
        items: [
          "Bathing and grooming",
          "Medication management",
          "Incontinence care",
        ],
      },
      {
        title: "Daily Care",
        items: [
          "Routine care and support with daily living tasks",
          "Assistance with mobility and transfers",
        ],
      },
    ],
  },
  {
    id: "laundry-service",
    title: "Laundry Service",
    headline: "Effortless Laundry, Delivered Clean",
    body: [
      "Your time is precious — let us handle the laundry, from pickup to fresh, folded delivery.",
    ],
    icon: <Shirt className="w-5 h-5" />,
    highlightsTitle: "Laundry Service Highlights",
    features: [
      {
        title: "Wash & Fold",
        items: ["Everyday laundry expertly cleaned, dried, and crisply folded for your convenience"],
      },
      {
        title: "Premium Dry Cleaning",
        items: ["Specialized chemical cleaning for delicate fabrics, suits, and high-end evening wear"],
      },
      {
        title: "Professional Steam Pressing",
        items: ["Precision ironing and steam pressing for a wrinkle-free, professional finish"],
      },
      {
        title: "Eco-Luxury Fabric Care",
        items: ["Gentle cleaning using eco-friendly detergents that preserve the longevity of luxury textiles"],
      },
      {
        title: "Bedding & Linens",
        items: ["Intensive cleaning for bulky items including comforters, curtains, and bed linens"],
      },
      {
        title: "Express Pickup & Delivery",
        items: ["Scheduled door-to-door service that integrates seamlessly into your busy lifestyle"],
      },
    ],
  },
  {
    id: "move-in-out-transport-service",
    title: "Move-In / Move-Out Transport",
    headline: "Seamless Moving Logistics / Home Transition Transport",
    body: [
      "This service provides bespoke transport and transition management for discerning residential and commercial clients. The fee is determined via a comprehensive quotation based on logistical complexity, inventory volume, and distance of transit.",
    ],
    icon: <Truck className="w-5 h-5" />,
    highlightsTitle: "Move-In / Move-Out Transport Highlights",
    features: [
      {
        title: "Packing Goods",
        items: [
          "Fragile items wrapped and packed securely in appropriate containers, with clear labeling for contents and destination",
        ],
      },
      {
        title: "Moving Goods",
        items: [
          "Goods carefully loaded and fastened on transport vehicles to prevent shifting, and unloaded efficiently at the destination",
        ],
      },
      {
        title: "Transporting Goods",
        items: [
          "Goods securely loaded with proper weight distribution, following all safety protocols and traffic regulations during transit",
        ],
      },
      {
        title: "Commercial / Office",
        items: [
          "Office equipment packed securely, labeled clearly, and efficiently transported to minimize disruption",
        ],
      },
    ],
  },
  {
    id: "high-security-property-care",
    title: "High-Security Property Care",
    headline: "Vetted Personnel | Complete Discretion | Uncompromised Quality",
    body: [
      "Specialist cleaning designed for VVIP and VIP clients, government facilities, private residences, and highly sensitive properties. Handled exclusively by security-vetted staff working under strict non-disclosure agreements, we provide complete discretion in restricted-access areas.",
    ],
    icon: <Lock className="w-5 h-5" />,
    highlightsTitle: "High-Security Property Care Highlights",
    features: [
      {
        title: "Vetted Staff & Privacy",
        items: [
          "100% background-checked, cleared, and NDA-bound technicians",
          "Strict non-disclosure protocols to protect physical and digital data",
        ],
      },
      {
        title: "High-Security Facilities",
        items: [
          "Specialized cleaning for SCIFs, server rooms, and confidential offices",
          "Sub-micron dust extraction for sensitive hardware and electronics",
        ],
      },
      {
        title: "Emergency & Hazmat Response",
        items: [
          "24/7 rapid dispatch for break-ins, biohazard spills, and crime scenes",
          "Immediate site securing, board-up, and insurance photo documentation",
        ],
      },
      {
        title: "Digital Device Sanitization",
        items: [
          "On-site or remote virus, adware, and malware purges",
          "Complete data wipes and privacy restoration for infected devices",
        ],
      },
    ],
  },
  {
    id: "luxury-yacht-cleaning",
    title: "Luxury Yacht Cleaning",
    headline: "Salty Hull or VIP Charter Coming? Get Yacht-Standard Perfection & Instant Shine!",
    body: [
      "Maintaining a world-class luxury vessel requires relentless care and uncompromising detail. Whether you are preparing your yacht for an exclusive charter, recovering from a multi-day sea voyage, or needing discreet interior housekeeping for high-profile guests, our Marine Cleaning Specialists are ready to step in.",
      "We specialize in high-end yacht detailing, marine-grade hull restoration, teak treatment, and ultra-discreet interior sanitation.",
    ],
    icon: <Anchor className="w-5 h-5" />,
    highlightsTitle: "Luxury Yacht Care Checklist",
    features: [
      {
        title: "Exterior & Superstructure",
        items: [
          "Marine-grade wash-down, salt deposit neutralization, and streak-free drying",
          "Stainless steel polishing, glass clarity treatment, and teak deck scrubbing",
        ],
      },
      {
        title: "Interior VIP Staterooms",
        items: [
          "White-glove housekeeping for VIP cabins, master suites, and galley areas",
          "Deep cleaning of delicate upholstery, fine leather, marble, and custom woodwork",
        ],
      },
      {
        title: "Engine Room & Technical Zones",
        items: [
          "Degreasing engine room bilges, wiping down machinery, and mechanical space prep",
          "Eco-friendly hazardous residue containment complying with maritime environmental standards",
        ],
      },
      {
        title: "Rapid Post-Charter Turnaround",
        items: [
          "Emergency 24/7 fast-response cleaning between charter bookings",
          "Complete linen turnover, sanitation, and provision prep for upcoming guests",
        ],
      },
    ],
  },
];

// ---------- Component ----------
export default function ServicesDetailsPage() {
  const [activeId, setActiveId] = useState(services[0].id);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = services.map((s) => document.getElementById(s.id));
      const scrollPos = window.scrollY + 160;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPos) {
          setActiveId(services[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Automatically scroll the active pill into view in the swipable mobile bar
  useEffect(() => {
    if (!mobileNavRef.current) return;
    const activeButton = mobileNavRef.current.querySelector<HTMLButtonElement>(
      `[data-nav-id="${activeId}"]`
    );
    if (activeButton) {
      activeButton.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeId]);

  const scrollToService = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // Drag-to-swipe handling for desktop & touch devices
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mobileNavRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - mobileNavRef.current.offsetLeft);
    setScrollLeftState(mobileNavRef.current.scrollLeft);
  };

  const handleMouseLeaveOrUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !mobileNavRef.current) return;
    e.preventDefault();
    const x = e.pageX - mobileNavRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    mobileNavRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
  <div className="min-h-screen bg-[#F8F6F0] text-[#332e27] font-sans antialiased">
    <div className="lg:flex">
        {/* ========== SIDEBAR ========== */}
        <aside className="lg:w-64 xl:w-72 shrink-0 max-h-screen">
          {/* Mobile: horizontal swipable sticky bar */}
          <div className="lg:hidden fixed top-15 left-0 right-0 z-30 px-3 sm:px-6 py-2.5 bg-[#F8F6F0]/95 backdrop-blur-md border-b border-stone-200/60 shadow-xs">
            {/* Left fade indicator */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-[#F8F6F0] to-transparent z-10" />
            {/* Right fade indicator */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-[#F8F6F0] to-transparent z-10" />

            <div
              ref={mobileNavRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeaveOrUp}
              onMouseUp={handleMouseLeaveOrUp}
              onMouseMove={handleMouseMove}
              className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-hide select-none touch-pan-x active:cursor-grabbing cursor-grab overscroll-x-contain"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {services.map((service) => (
                <button
                  key={service.id}
                  data-nav-id={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                    activeId === service.id
                      ? "bg-gradient-to-r from-[#EBDCB9] to-[#DFCB9F] text-[#2C2114] shadow-xs border border-[#BFA46F]/50 scale-[1.02]"
                      : "bg-white/80 text-stone-600 border border-stone-200/80 hover:bg-white active:scale-95"
                  }`}
                >
                  <span className={activeId === service.id ? "text-amber-800" : "text-stone-400"}>
                    {service.icon}
                  </span>
                  <span>{service.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop: sticky left sidebar - brought higher */}
          <div className="hidden lg:block z-5 lg:w-[20%] mb-5 fixed bottom-0 top-20 px-4 max-h-screen overflow-y-auto pr-2">
            <h2 className="text-xs font-medium text-stone-500 uppercase tracking-wider mb-3 px-1">
              Browse Services
            </h2>
            <nav className="flex flex-col gap-1">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => scrollToService(service.id)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left text-sm transition-all ${
                    activeId === service.id
                      ? "bg-gradient-to-r from-[#EBDCB9] to-[#DFCB9F] text-[#2C2114] font-medium shadow-sm border border-[#BFA46F]/60"
                      : "text-stone-600 hover:bg-white/80 hover:text-stone-900 border border-transparent"
                  }`}
                >
                  <span
                    className={`shrink-0 ${
                      activeId === service.id ? "text-amber-800" : "text-stone-400"
                    }`}
                  >
                    {service.icon}
                  </span>
                  <span className="leading-snug">{service.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      {/* Page Header - made more compact */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/70 text-stone-700 text-xs tracking-wider uppercase font-medium mb-3 border border-stone-300/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" />
          Our Services
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-stone-900 font-normal">
          Premium Cleaning & Lifestyle Services
        </h1>
        <p className="mt-3 text-base sm:text-lg text-stone-600 font-light leading-relaxed">
          From everyday home care to high-security and marine services — discover the perfect solution tailored to your needs.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        

        {/* Main Content */}
        <main className="flex-1 min-w-0 space-y-14 sm:space-y-16">
          {services.map((service) => (
            <section
              key={service.id}
              id={service.id}
              className="scroll-mt-24"
            >
              {/* Service Header */}
              <div className="mb-7">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#EBDCB9] to-[#DFCB9F] flex items-center justify-center text-amber-900 shadow-sm">
                    {service.icon}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-serif text-stone-900 font-medium tracking-tight">
                    {service.title}
                  </h2>
                </div>

                <h3 className="text-lg sm:text-xl text-[#5C4B33] font-medium leading-snug mb-3">
                  {service.headline}
                </h3>

                <div className="space-y-3 text-stone-600 leading-relaxed text-[15px] max-w-5xl">
                  {service.body.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Highlights Section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <h4 className="text-sm font-medium text-stone-500 uppercase tracking-wider">
                    {service.highlightsTitle}
                  </h4>
                  <div className="h-px bg-stone-300/60 flex-1" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="bg-white/80 border border-stone-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-700/20 transition-all"
                    >
                      <h5 className="text-sm font-medium text-stone-800 mb-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0" />
                        {feature.title}
                      </h5>
                      <ul className="space-y-2">
                        {feature.items.map((item, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm text-stone-600 leading-snug"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-amber-600/70 mt-0.5 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
    </div>
    
  </div>
);
}