import { ServiceConfig } from "@/lib/booking";



export const scrollToSection=()=>{
    const serviceSection = document.getElementById("section-pressure-schedule");

    
    serviceSection?.scrollTop
    /* ({ 
      behavior: 'smooth', // Animates the scroll instead of a sudden jump
      
    }); */
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  pool: {
    type: "pool",
    categories: [
      { id: "all", label: "All" },
      { id: "Residential Pools", label: "Residential Pools" },
      { id: "Specialty & Luxury Pools", label: "Specialty & Luxury Pools" },
      { id: "Spa & Wellness Facilities", label: "Spa & Wellness Facilities" },
    ],
    serviceStepDetails: {
      step1Header: "Select Your Pool Type",
      step1Description: "Choose the type of pool you have for a tailored cleaning experience.",
      step2Header: "Select Water Condition & Add-ons",
      step2Description: "Choose the current condition of your pool water and any additional services you may need.",
      step3Header: "Schedule Your Service",
      step3Description: "Pick a date and time that works best for you.",
      step4Header: "Provide Client & Location Details",
      step4Description: "Enter your contact information and the location of the pool.",
      step5Header: "Review & Confirm Your Booking",
      step5Description: "Double-check your selections and confirm your booking.",
      confirmedServiceBookin:"Pool Cleaning Confirmed",
    },
    catalog: [
      { id: "p1", category: "Residential Pools", title: "Kiddie Pools", description: "Sanitization, non-toxic algae prevention, and surface scrub for inflatable & shallow child play pools.", price: 35, unit: "pool" },
      { id: "p2", category: "Residential Pools", badge: "POPULAR", title: "Above-Ground Swimming Pools", description: "Deep vinyl liner scrubbing, pump basket clearout, wall brushing, and surface skimming.", price: 85, unit: "pool" },
      { id: "p3", category: "Residential Pools", title: "Lap Pools", description: "High-velocity flow lane cleaning, continuous vacuuming, and water line tile degreasing for training pools.", price: 110, unit: "10m length" },
      { id: "p4", category: "Residential Pools", badge: "POPULAR", title: "In-Ground Pools", description: "Full-spectrum vacuuming, leaf netting, chemical balancing, and plaster wall brushing.", price: 125, unit: "pool" },
      { id: "p5", category: "Residential Pools", badge: "POPULAR", title: "Family Swimming Pools", description: "Comprehensive multi-depth cleaning, stair/slide sanitization, and heavy debris extraction.", price: 140, unit: "pool" },
      { id: "p6", category: "Specialty & Luxury Pools", title: "Indoor Pools", description: "Specialized indoor air quality moisture control, condensation tile scrub, and mold spore elimination.", price: 155, unit: "pool" },
      { id: "p7", category: "Specialty & Luxury Pools", title: "Olympic-Size Pools", description: "Commercial-grade heavy robotic vacuuming, multi-pump filtration inspection, and precision water testing.", price: 350, unit: "lane module" },
      { id: "p8", category: "Specialty & Luxury Pools", title: "Architectural Pools", description: "Delicate stone surround restoration, custom lighting cover polish, and non-scratch glass tile cleaning.", price: 175, unit: "pool" },
      { id: "p9", category: "Specialty & Luxury Pools", badge: "POPULAR", title: "Infinity Pools", description: "Vanishing edge trough cleanout, catch-basin algae removal, and glass wall mineral descaling.", price: 195, unit: "pool" },
      { id: "p10", category: "Specialty & Luxury Pools", title: "Natural Pools", description: "Eco-safe biological filter check, organic bio-film maintenance, and aquatic plant root trimming.", price: 180, unit: "pool" },
      { id: "p11", category: "Specialty & Luxury Pools", title: "Spool (Small Pool)", description: "Compact plunge/spa combination deep steam flush, jet nozzle clear, and high-intensity filter wash.", price: 95, unit: "spool" },
      { id: "p12", category: "Specialty & Luxury Pools", badge: "POPULAR", title: "Saltwater Pools", description: "Salinity level optimization, electrolytic cell performance audit, and corrosion-prevention wash.", price: 145, unit: "pool" },
      { id: "p13", category: "Specialty & Luxury Pools", title: "Plunge Pools", description: "Rapid temperature retention check, deep bottom sediment extraction, and compact wall brush.", price: 80, unit: "pool" },
      { id: "p14", category: "Spa & Wellness Facilities", badge: "POPULAR", title: "Jacuzzi Cleaning", description: "Hydrotherapy jet lines pipe-purge, acrylic shell polish, headrest sanitization, and cover seal treat.", price: 90, unit: "spa" },
      { id: "p15", category: "Spa & Wellness Facilities", title: "Steam Room Cleaning", description: "Steam generator descaling, bench tile antimicrobial sanitization, and high-temperature mist wash.", price: 115, unit: "room" },
      { id: "p16", category: "Spa & Wellness Facilities", title: "Sauna Room Cleaning", description: "Cedar/pine wood non-toxic oil restoration, heater stone cleaning, and non-chemical sweat spot extraction.", price: 105, unit: "room" },
    ],
    conditions: [
      { id: "clear", title: "Clear / Slight Dust", price: 0, desc: "Standard maintenance cleaning required" },
      { id: "cloudy", title: "Cloudy / Hazy Water", price: 0, desc: "Mild filtration wash and clarity enhancer" },
      { id: "light-algae", title: "Light Green Algae", price: 45, desc: "Minor algae bloom on floor/walls" },
      { id: "heavy-algae", title: "Heavy Dark Green / Black Algae", price: 90, desc: "Severe bloom requiring shock & flocking" },
    ],
    addons: [
      { id: "shock", title: "Shock & Deep Green Algae Eradication", price: 65, desc: "Heavy chlorine shock infusion, flocculant agent, and triple dead-algae vacuuming." },
      { id: "saltwater", title: "Saltwater Cell Acid Wash", price: 45, desc: "Precision muriatic soak dissolving hard calcium scale build-up inside the generator cell." },
      { id: "filter", title: "Filter Sand / Cartridge Deep Replacement", price: 85, desc: "Full media exchange or high-pressure degreasing wash of DE/Cartridge elements." },
      { id: "balancer", title: "Master Chemistry Balancer Pack", price: 35, desc: "Includes pH, Total Alkalinity, Calcium Hardness, and Cyanuric Acid adjustment chemicals." },
      { id: "descaling", title: "Glass & Ceramic Tile Descaling", price: 75, desc: "Pumice and non-abrasive bead blast removing white calcium waterline crusting." },
      { id: "winterization", title: "Winterization / Seasonal Opening Service", price: 120, desc: "Cover placement/removal, blow out plumbing lines, freeze-plug install, and season kick-start." },
    ],
    promoCodeDefault: "POOLGOLD15",
    taxRate: 0.10,
  },
  pressure: {
  type: "pressure",
  categories: [
      { id: "all", label: "All" },
      { id: "residential", label: "Residential" },
      { id: "commercial", label: "Commercial & Facilities" },
      { id: "hardscapes", label: "Hardscapes & Concrete" },
      { id: "specialty", label: "Outdoor & Specialty" },
    ],
  catalog: [
    { 
      id: "pr1", 
      category: "residential", 
      badge: "POPULAR", 
      title: "Home Exterior Cleaning", 
      description: "Low-pressure soft wash siding treatment for vinyl, wood, stucco, and brick homes removing mildew, soot, and grime.", 
      price: 0.18, 
      unit: "sq. ft." 
    },
    { 
      id: "pr2", 
      category: "residential", 
      title: "Fencing Cleaning", 
      description: "Restorative pressure clean for wood, vinyl, aluminum, or composite fencing restoring natural color and tone.", 
      price: 1.25, 
      unit: "linear ft." 
    },
    { 
      id: "pr3", 
      category: "residential", 
      badge: "POPULAR", 
      title: "Gutter / Drains Cleaning", 
      description: "Interior gutter debris flush, downspout high-pressure clearout, and exterior gutter face tiger-stripe brightening.", 
      price: 1.5, 
      unit: "linear ft." 
    },
    { 
      id: "pr4", 
      category: "residential", 
      badge: "POPULAR", 
      title: "Deck / Patio Cleaning", 
      description: "Deep surface rejuvenation for pressure-treated timber, teak, cedar, composite, or flagstone patios.", 
      price: 0.28, 
      unit: "sq. ft." 
    },
    { 
      id: "pr5", 
      category: "commercial", 
      badge: "POPULAR", 
      title: "Building Exterior Cleaning", 
      description: "Multi-story commercial façade cleaning, glass perimeter wash, and masonry stain removal using elevated pressure booms.", 
      price: 0.22, 
      unit: "sq. ft." 
    },
    { 
      id: "pr6", 
      category: "commercial", 
      title: "Parking Garage Cleaning", 
      description: "Industrial hot-water degreasing, tire-mark removal, carbon soot wash, and oil stain extraction for concrete decks.", 
      price: 0.12, 
      unit: "sq. ft." 
    },
    { 
      id: "pr7", 
      category: "commercial", 
      title: "Playground Cleaning", 
      description: "Non-toxic, high-temperature sanitizing soft-wash for rubber flooring, plastic slides, swing sets, and climbing walls.", 
      price: 135, 
      unit: "play area" 
    },
    { 
      id: "pr8", 
      category: "hardscapes", 
      badge: "POPULAR", 
      title: "Driveway Cleaning", 
      description: "High-PSI surface rotary cleaning for concrete, aggregate, asphalt, and cobblestones removing oil drips and organic mold.", 
      price: 0.2, 
      unit: "sq. ft." 
    },
    { 
      id: "pr9", 
      category: "hardscapes", 
      title: "Sidewalk Cleaning", 
      description: "Public and private perimeter walkway pressure wash removing chewing gum, tree sap, mud, and weather staining.", 
      price: 0.22, 
      unit: "sq. ft." 
    },
    { 
      id: "pr10", 
      category: "hardscapes", 
      title: "Walkway Cleaning", 
      description: "Garden and entry pathway power cleaning designed to eliminate slippery moss, lichen, and dangerous bio-film.", 
      price: 0.22, 
      unit: "sq. ft." 
    },
    { 
      id: "pr11", 
      category: "hardscapes", 
      badge: "POPULAR", 
      title: "Pavers Cleaning", 
      description: "Interlocking brick and stone paver wash, joint weed clearing, and prep for polymeric re-sanding.", 
      price: 0.35, 
      unit: "sq. ft." 
    },
    { 
      id: "pr12", 
      category: "specialty", 
      title: "Outdoor Furniture Cleaning", 
      description: "Delicate pressure wash for teak, wrought iron, rattan, resin, and mesh patio dining or lounger furniture.", 
      price: 35, 
      unit: "set item" 
    },
    { 
      id: "pr13", 
      category: "specialty", 
      title: "Outdoor Equipment Cleaning", 
      description: "Degreasing pressure clean for solar panels, heavy machinery, lawn tractors, trailers, and outdoor kitchens.", 
      price: 85, 
      unit: "unit" 
    },
    { 
      id: "pr14", 
      category: "specialty", 
      title: "Other Specialized Cleaning Services", 
      description: "Tailored pressure washing for tennis courts, retaining walls, statues, boat docks, or unique architectural stone.", 
      price: 150, 
      unit: "custom job" 
    },
  ],
  conditionsLabel: "Intensity & Treatments",
  
  addonsLabel: "Specialty Add-ons & Surcharges",
  
  conditions: [
    {
      id: "soft-wash",
      title: "Eco Soft Wash (Low PSI)",
      price: 0,
      desc: "Ideal for vinyl siding, painted wood & roof shingle preservation",
      badge: "STANDARD"
    },
    {
      id: "balanced-wash",
      title: "Balanced Power Wash",
      price: 0,
      desc: "Standard medium pressure for decks, brick & walkways",
      badge: "STANDARD"
    },
    {
      id: "turbo-blast",
      title: "High-PSI Turbo Blast",
      price: 40,
      desc: "Maximum pressure for tough concrete grease & commercial stone",
      badge: "+$40 SURCHARGE"
    },
  ],
  
  addons: [
    {
      id: "steam-boost",
      title: "200°F Industrial Hot Water Steam Boost",
      price: 65,
      desc: "High-temperature thermal wash designed to melt embedded oil, vehicle grease, and stubborn wax coatings."
    },
    {
      id: "bio-shield",
      title: "Bio-Shield Mold & Algae Inhibitor (12-Mo Protection)",
      price: 85,
      desc: "Anti-fungal topical application preventing green and black mold growth for up to 12 months."
    },
    {
      id: "oil-extraction",
      title: "Deep Oil & Heavy Chemical Stain Extraction",
      price: 55,
      desc: "Poultice enzyme treatment designed to pull deeply saturated motor oil and hydraulic fluid out of porous concrete."
    },
    {
      id: "efflorescence",
      title: "Efflorescence & Mineral Crust Removal",
      price: 75,
      desc: "Acidic chemical bath dissolving white powdery salt deposits and hard water mineral stains from brick and stone."
    },
    {
      id: "hydrophobic-sealer",
      title: "Hydrophobic Surface Sealer Application",
      price: 120,
      desc: "Penetrating silicone/siloxane sealant shield defending hard surfaces against water intrusion, salt damage, and frost cracking."
    },
    {
      id: "botanical-wash",
      title: "Eco-Friendly Botanical Wash Neutralizer",
      price: 30,
      desc: "Post-cleaning plant-safe solution neutralizing any residual cleaning agents to protect surrounding gardens and pets."
    },
  ],
  serviceStepDetails: {
    step1Header: "Select Cleaning Services & Dimensions",
    step1Description: "Select from our 14 specialist pressure washing services and enter your estimated dimensions or quantities.",
    step2Header: "Wash Intensity Profile & Surface Add-ons",
    step2Description: "Choose pressure intensity and optional sealing or chemical bio-shield treatments.",
    step3Header: "Appointment Date & Crew Window",
    step3Description: "Pick your preferred service date and technician crew arrival window.",
    step4Header: "Property & Water Source Access",
    step4Description: "Enter address and site setup conditions for pressure rigging equipment.",
    step5Header: "Review Order & Secure Payment Option",
    step5Description: "Finalize your surface washing job details and select payment method.",
    confirmedServiceBookin:"Pressure Wash Service Scheduled"
  },
  promoCodeDefault: "WASHGOLD15",
  taxRate: 0.08, 
  }, 

  carpet: {
  type: "carpet",
  categories: [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential & Commercial" },
    { id: "fine-textiles", label: "Fine Textiles" },
    { id: "furniture", label: "Furniture Care" },
    { id: "sanitization", label: "Sanitization" },
    { id: "window-treatments", label: "Window Treatments" },
    { id: "hard-surfaces", label: "Hard Surfaces" },
    { id: "specialist-care", label: "Specialist Care" },
    { id: "commercial", label: "Commercial" },
    { id: "emergency", label: "Emergency Response" }
  ],
  catalog: [
    { 
      id: "c1", 
      category: "residential", 
      badge: "POPULAR", 
      title: "Carpet Cleaning", 
      description: "Deep steam extraction for wall-to-wall carpets removing dirt, allergens, and revitalizing fibers.", 
      price: 45, 
      unit: "room" 
    },
    { 
      id: "c2", 
      category: "fine-textiles", 
      title: "Rug Cleaning", 
      description: "Specialized care for Persian, Oriental, wool, and synthetic area rugs with delicate fiber protection.", 
      price: 35, 
      unit: "rug" 
    },
    { 
      id: "c3", 
      category: "furniture", 
      badge: "POPULAR", 
      title: "Sofa & Upholstery Cleaning", 
      description: "Deep stain removal, fabric refresh, and deep foam extraction for armchairs, sofas, and sectionals.", 
      price: 60, 
      unit: "seat" 
    },
    { 
      id: "c4", 
      category: "sanitization", 
      title: "Mattress Cleaning", 
      description: "Hygienic deep cleaning eliminating dust mites, allergens, dead skin cells, and stubborn stains.", 
      price: 50, 
      unit: "mattress" 
    },
    { 
      id: "c5", 
      category: "window-treatments", 
      title: "Curtains & Drapes Cleaning", 
      description: "In-situ steam revitalization or off-site dry restoration for delicate drapes and heavy curtains.", 
      price: 40, 
      unit: "pair" 
    },
    { 
      id: "c6", 
      category: "hard-surfaces", 
      title: "Tile & Grout Cleaning", 
      description: "High-pressure rotary extraction restoring discolored grout lines and mineral-built tile surfaces.", 
      price: 3.5, 
      unit: "sq. meter" 
    },
    { 
      id: "c7", 
      category: "specialist-care", 
      badge: "POPULAR", 
      title: "Pet Stain & Odour Removal", 
      description: "Enzymatic treatment neutralizing deep pet urine deposits, organic scents, and dark stains.", 
      price: 55, 
      unit: "treated area" 
    },
    { 
      id: "c8", 
      category: "furniture", 
      title: "Leather Cleaning & Conditioning", 
      description: "Gentle pH-balanced leather wash followed by rich essential oil conditioning to prevent cracking.", 
      price: 75, 
      unit: "seat" 
    },
    { 
      id: "c9", 
      category: "commercial", 
      title: "Commercial Floor Maintenance", 
      description: "Scheduled scrubbing, buffing, and protective sealants for high-traffic office and retail spaces.", 
      price: 2.8, 
      unit: "sq. meter" 
    },
    { 
      id: "c10", 
      category: "hard-surfaces", 
      title: "Hard Floor Cleaning & Polishing", 
      description: "Diamond pad grinding, wax polishing, and sealing for marble, granite, wood, and terrazzo floors.", 
      price: 4.5, 
      unit: "sq. meter" 
    },
    { 
      id: "c11", 
      category: "specialist-care", 
      title: "Specialist Stain Removal", 
      description: "Targeted chemical spot treatment for red wine, coffee, ink, cosmetics, paint, and chemical burns.", 
      price: 65, 
      unit: "spot area" 
    },
    { 
      id: "c12", 
      category: "emergency", 
      badge: "POPULAR", 
      title: "Flooded Floor Cleaning", 
      description: "Rapid water extraction, industrial dehumidification, structural drying, and antimicrobial wash.", 
      price: 120, 
      unit: "emergency response" 
    }
  ],
  
  addons: [
    { 
      id: "eco", 
      title: "100% Eco-Friendly Organic Solution", 
      price: 25, 
      desc: "Zero chemical residue, hypoallergenic, 100% safe for babies, pets, and sensitive skin." 
    },
    { 
      id: "turbo-drying", 
      title: "Express Turbo-Drying Service", 
      price: 35, 
      desc: "Industrial axial air-movers dry your carpets & upholstery within 1-2 hours instead of 6-8 hrs." 
    },
    { 
      id: "nano-shield", 
      title: "Nano-Shield Fabric Guard Protection", 
      price: 45, 
      desc: "Invisible repellent barrier preventing spills, oil, and liquid from penetrating deep fibers." 
    },
    { 
      id: "antimicrobial", 
      title: "Medical-Grade UV & Antimicrobial Sanitization", 
      price: 30, 
      desc: "Eliminates 99.9% of bacteria, viruses, and mold spores embedded deep within padding." 
    }
  ],
  propertyOptions: {
    propertyType: [
      { id: "residential", label: "Residential Home / Flat" },
      { id: "commercial", label: "Commercial / Office Space" }
    ],
    parkingAccess: [
      { id: "free-driveway", label: "Free Driveway / Dedicated Bay" },
      { id: "pay-display", label: "Pay & Display / Meter Parking" },
      { id: "restricted", label: "Restricted / Permit Required" }
    ],
    floorAccess: [
      { id: "elevator", label: "Elevator Available" },
      { id: "ground-floor", label: "Ground Floor / Level Access" },
      { id: "stairs-only", label: "Stairs Only (No Lift)" }
    ]
  },
  promoCodeDefault: "GOLD20",
  taxRate: 0.10,
  serviceStepDetails: {
    step1Header: "Select Premium Services",
    step1Description: "Choose from our 12 specialized master cleaning & restoration treatments.",
    step2Header: "Schedule Preferred Appointment",
    step2Description: "Choose your convenient date and dedicated time slot for our master technicians.",
    step2title1: "Recommended Treatments & Enhancements",
    step2title2: "Special Instructions or Specific Stain Details",
    /* step2title3: "",
    step2title1desc1: "",
    step2title1desc2: "",
    step2title1desc3: "", */
    step3Header: "Property & Luxury Add-ons",
    step3Description: "Customize property specifics and enhance your deep-clean treatment.",
    step4Header: "Contact Details",
    step4Description: "Enter your contact and booking verification information.",
    step5Header: "Review & Checkout",
    step5Description: "Finalize your master cleaning appointment details and securely complete your order.",
    confirmedServiceBookin: "Aureus Luxury Clean Scheduled"
  }
}
};

// Aliases for slug-based lookups
SERVICE_CONFIGS["precision-pressure-washing"] = SERVICE_CONFIGS.pressure;
SERVICE_CONFIGS["pool-cleaning"] = SERVICE_CONFIGS.pool;
SERVICE_CONFIGS["carpet-upholstery-cleaning"] = SERVICE_CONFIGS.carpet;
