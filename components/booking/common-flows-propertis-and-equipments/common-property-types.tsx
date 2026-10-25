"use client";

import { useEffect, useState, useRef, JSXElementConstructor } from "react";
import {
  Check,
  ChevronDown,
  Sparkles,
  Home,
  Minus,
  Plus,
  ArrowUp,
  ArrowDown,
  Square,
  Building,
  Building2,
  House,
  Castle,
  Crown,
  Briefcase,
  Warehouse,
  Factory,
  Hospital,
  Hotel,
  Utensils,
  School,
  Store,
  Bus,
  Construction,
  Package,
  Ship,
  Anchor,
  Sailboat,
  Compass,
  Waves,
  Navigation,
  LifeBuoy,
  Globe,
  Boxes,
  PartyPopper,
  Heart,
  GlassWater,
  Users,
  GraduationCap,
  Gift,
  Wine,
  Star,
  Award,
  Ticket,
  Rocket,
  Trophy,
  Handshake,
  ShieldCheck,
  AlertTriangle,
  Brush,
  FolderArchive,
  BellRing,
  Sparkle,
  Droplets,
  Moon,
  BarChart3,
  UserCheck,
  Lock,
  Gem,
  Trees,

  Hammer,
  Cross,

  Cog,
  KeyRound,
  FileLock2,
  Biohazard,
  Toolbox,
  Zap,
  SquareTerminal,
  LayoutGrid,

  HousePlus,
  Sunset,
  Landmark,
  Palmtree,
  KeySquare,
  CalendarCheck2,
  BedDouble,
  CalendarRange,

  HomeIcon,
  Globe2,
  HardHat,
  Baby,
  Layers,
  Timer,
  Maximize,
  Users2,

  Medal,
  DraftingCompass,
  Sunrise,
  Sprout,
  Droplet,
  TestTube2,
  Snowflake,
  CloudFog,
  Wind,
  Flame,
  Maximize2,
  Clock,
  Calendar,

} from "lucide-react";

import { YACHT_PROPERTY_TYPES } from "@/components/booking/Yatchpropertytypes";
import { useLanguage } from "@/lib/i18n/language-context";
import { useCurrency } from "@/lib/currency-context";
import { en, type TranslationKey } from "@/lib/i18n/dictionaries/en";
import type { SizeQuote } from "@/lib/catalog-api";
import RoomSelector, { type RoomCounts } from "../room-components-counter";
import { isCommonPropertyTypeWithRoomComponents } from "@/lib/service-flows";
import { getPropertyCategoriesForService } from "../property-type-size-selector";
import ServiceFrequencySelector from "./service-frequency";
import { ServicePropertyCategoriesEnums } from "@/lib/booking-draft";
import { set } from "zod";

export const CATEGORY_LABEL_KEYS: Record<string, TranslationKey> = {
  "Studio": "propStudio",
  "Home": "propHome",
  "Villa": "propVilla",
  "Estate": "propEstate",
  "VIP": "propVip",
  "Apartment / Flat": "propApartment",
  "Townhouse": "propTownhouse",
  "Home / House": "propHouse",
  "Penthouse": "propPenthouse",
  "Rough Clean": "propRoughClean",
  "Touch-Up Clean": "propTouchUpClean",
  "Final Post-Build Clean": "propFinalPostBuildClean",
  "Heavy-Duty Deep Clean": "propHeavyDutyDeepClean",
  "Other": "propOther",
  "Private Parties & Celebrations": "propPrivateParties",
  "Weddings & Large Receptions": "propWeddings",
  "Corporate Events & Galas": "propCorporateEvents",
  "Concerts, Festivals & Live Venues": "propConcertsFestivals",
  "Pop-Up Shops & Retail Exhibitions": "propPopUpShops",
  "Art Galleries & Cultural Exhibitions": "propArtGalleries",
  "Fashion Shows & Runway Events": "propFashionShows",
  "Film, TV & Commercial Shoots": "propFilmTvShoots",
  "Charity Auctions & Fundraisers": "propCharityAuctions",
  "Micro": "propMicro",
  "Compact": "propCompact",
  "Small": "propSmall",
  "Medium": "propMedium",
  "Large": "propLarge",
  "Luxury / Enterprise": "propEnterprise",
  "Corporate & Legal Office": "propCorporateLegal",
  "Government / SCIF / Data...": "propGovernmentScif",
  "Healthcare & Medical...": "propHealthcareMedical",
  "Industrial & Construction": "propIndustrialConstruction",
  "VIP Estate / Executive...": "propVipEstate",
  "Event Venue &...": "propEventVenue",
  "Emergency / Biohazard...": "propEmergencyBiohazard",
  "Retail & Commercial...": "propRetailCommercial",
  "Personal / Work Device...": "propPersonalWorkDevice",
  "Corporate Network /...": "propCorporateNetwork",
  "Motorboat / Day Cruiser": "yachtMotorboat",
  "Luxury Express...": "yachtLuxuryExpress",
  "Flybridge Motor Yacht": "yachtFlybridge",
  "Superyacht": "yachtSuperyacht",
  "Megayacht": "yachtMegayacht",
  "Sailing Yacht / Catamaran": "yachtSailingCatamaran",

  //
  "Luxury Villa": "propLuxuryVilla",
  "Airbnb": "propAirbnb",

  //industrail property types
  "Micro Office": "propMicroOffice",
  "Office": "propOffice",
  "Corporate Office": "propCorporateOffice",
  "Co-working Space": "propCoWorkingSpace",
  "Hotel": "propHotel",
  "Restaurant": "propRestaurant",
  "Cafe": "propCafe",
  "Bar": "propBar",
  "Clinic": "propClinic",
  "Hospital": "propHospital",
  "Dental Clinic": "propDentalClinic",
  "Pharmacy": "propPharmacy",
  "Laboratory": "propLaboratory",
  "Beauty Salon": "propBeautySalon",
  "Spa": "propSpa",
  "Bakery": "propBakery",
  "Fast Food": "propFastFood",
  "Boutique Shop": "propBoutiqueShop",
  "Supermarket": "propSupermarket",
  "Mall": "propMall",
  "Showroom": "propShowroom",
  "Gym": "propGym",
  "Yoga Studio": "propYogaStudio",
  "School": "propSchool",
  "Nursery": "propNursery",
  "Airport": "propAirport",
  "Guest-Ready": "propGuestReady",
  "Booking.com": "propBookingCom",
  "Hotels": "propHotels",
  "Serviced Apartments": "propServicedApartments",
  "Guesthouses": "propGuesthouses",
  "Holiday Rentals": "propHolidayRentals",
  "Property Managers": "propPropertyManagers",
  "Holiday Home": "propHolidayHome",
  "Second Home": "propSecondHome",
  "Offices": "propOffices",
  "Warehouses": "propWarehouses",
  "Factories": "propFactories",
  "Healthcare": "propHealthcare",
  "Restaurants": "propRestaurants",
  "Schools": "propSchools",
  "Retail": "propRetail",
  "Transport": "propTransport",
  "Construction Sites": "propConstructionSites",
  "Small Yacht": "propSmallYacht",
  "Motor Yacht": "propMotorYacht",
  "Sailing Yacht": "propSailingYacht",
  "Luxury Superyacht": "propLuxurySuperyacht",
  "Mega Yacht": "propMegaYacht",
  "Cruise Ships": "propCruiseShips",
  "Passenger Ferries": "propPassengerFerries",
  "River Cruise Ships": "propRiverCruiseShips",
  "Expedition Ships": "propExpeditionShips",
  "Commercial Cargo Ships": "propCommercialCargoShips"
};

/**
 * Some categories store a translation key (e.g. "propMicroOffice",
 * "cabin_cleaning") as their label. The backend renders property type as-is
 * in emails/PDFs/admin, so send it the English name instead.
 */
export function propertyTypeEnglishName(propertyType: string): string {
  const match = Object.entries(CATEGORY_LABEL_KEYS).find(([, key]) => key === propertyType);
  if (match) return match[0];
  const english = (en as Record<string, unknown>)[propertyType];
  return typeof english === "string" ? english : propertyType;
}

export interface PropertyCategory {
  id: string;
  label: string;
  sublabel?: string;
  icon: string | React.ReactNode;
  min: number;
  max: number;
  step: number;
  locked: boolean;
  sizes?: number[];
  dropdownLabel?: string;
}
/**
 * Residential property categories and industrial property categories for the common services
 * of 
 * steam cleaning
 * Post construction
 * sanitization
 * 
 * as the property types of the above services
 * 
 */
//service=>healthguard-sanitization,display two categoies as "residential","industrial"

const GOLD_COLOR = "#D4AF37";

export const SANITIZE_OTHER_PROPERTY_CATEGORY: PropertyCategory = {
  id: "other",
  label: "propOther",
  icon: <Square size={20} color={GOLD_COLOR} />,
  min: 20,
  max: 500,
  step: 1,
  locked: false,
};


//no tabs just these categories,this categories on;y must display without tabs name residential ,industrial or commmercial 
//slug is "high-security-property-care"
export const HIGHT_SECURITY_CATEGORYIES: PropertyCategory[] = [
  {
    id: "studio",
    label: "propStudio",
    icon: <Building size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 40,
    step: 1,
    locked: false,
  },
  {
    id: "apartment",
    label: "propApartment",
    icon: <Building2 size={20} color={GOLD_COLOR} />,
    min: 45,
    max: 120,
    step: 1,
    locked: false,
  },
  {
    id: "townhouse",
    label: "propTownhouse",
    icon: <Home size={20} color={GOLD_COLOR} />,
    min: 90,
    max: 220,
    step: 1,
    locked: false,
  },
  {
    id: "home",
    label: "propHome",
    icon: <House size={20} color={GOLD_COLOR} />,
    min: 100,
    max: 350,
    step: 1,
    locked: false,
  },
  {
    id: "penthouse",
    label: "propPenthouse",
    icon: <Castle size={20} color={GOLD_COLOR} />,
    min: 120,
    max: 400,
    step: 1,
    locked: false,
  },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: <Crown size={20} color={GOLD_COLOR} />,
    min: 200,
    max: 500,
    step: 1,
    locked: false,
  },
  {
    id: "offices",
    label: "propOffices",
    icon: <Briefcase size={20} color={GOLD_COLOR} />,
    min: 50,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "vip-building",
    label: "propVipBuilding",
    icon: <Castle size={20} color={GOLD_COLOR} />,
    min: 120,
    max: 400,
    step: 1,
    locked: false
  },
]




/**categories for service of Yatch
 * Types are yatch claening and Passenger Ship Cleaning
 * 
 */
//service=>luxury-yacht-cleaning,display two categoies as "yatch-cleaning","passenger-ship-cleaning"
const YACHT_CLEANING_CATEGORIES: PropertyCategory[] = [
  {
    id: "small-yacht",
    label: "propSmallYacht",
    icon: <Ship size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "motor-yacht",
    label: "propMotorYacht",
    icon: <Anchor size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "sailing-yacht",
    label: "propSailingYacht",
    icon: <Sailboat size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "luxury-superyacht",
    label: "propLuxurySuperyacht",
    icon: <Crown size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "mega-yacht",
    label: "propMegaYacht",
    icon: <Compass size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
];

const PASSENGER_SHIP_CLEANING_CATEGORIES: PropertyCategory[] = [
  {
    id: "cruise-ships",
    label: "propCruiseShips",
    icon: <Waves size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "passenger-ferries",
    label: "propPassengerFerries",
    icon: <Navigation size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "river-cruise-ships",
    label: "propRiverCruiseShips",
    icon: <LifeBuoy size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "expedition-ships",
    label: "propExpeditionShips",
    icon: <Globe size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "commercial-cargo-ships",
    label: "propCommercialCargoShips",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
];





//no category switching 
//just only these categories must diplay
//slug is "commercial-office-cleaning"
const COMMERCIAL_AND_OFFICE_CLEANING_PROPERTIES: PropertyCategory[] = [
  {
    id: "Micro-Office",
    label: "propMicroOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "Office",
    label: "propOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Coworking-Space",
    label: "propCoWorkingSpace",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Retail-Shop",
    label: "propRetailShop",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Shopping Centre",
    label: "propShoppingCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Supermarket / Grocery Store",
    label: "propSupermarketGroceryStore",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Restaurant",
    label: "propRestaurant",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Café",
    label: "propCafe",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hotel",
    label: "propHotel",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Gym / Fitness Centre",
    label: "propGymFitnessCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Medical Clinic",
    label: "propMedicalClinic",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Beauty Salon / Spa",
    label: "propBeautySalonSpa",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Showroom",
    label: "propShowroom",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Airport",
    label: "propAirport",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Bank / Financial Office",
    label: "propBankFinancialOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "School / Nursery",
    label: "propSchoolNursery",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Warehouse",
    label: "propWarehouse",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Distribution Centre",
    label: "propDistributionCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Factory",
    label: "propFactory",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hospital",
    label: "propHospital",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Other Commercial Property",
    label: "propOtherCommercialProperty",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
]


//steam cleaning must also has no tabs just only these categories must diplay
//service slug is "steam-cleaning
const STEAM_CLEANING_PROPERTIES: PropertyCategory[] = [
  {
    id: "Micro-Office",
    label: "propMicroOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "Office",
    label: "propOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Coworking-Space",
    label: "propCoWorkingSpace",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Retail-Shop",
    label: "propRetailShop",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Shopping Centre",
    label: "propShoppingCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Supermarket / Grocery Store",
    label: "propSupermarketGroceryStore",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Restaurant",
    label: "propRestaurant",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Café",
    label: "propCafe",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hotel",
    label: "propHotel",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Gym / Fitness Centre",
    label: "propGymFitnessCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Medical Clinic",
    label: "propMedicalClinic",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Beauty Salon / Spa",
    label: "propBeautySalonSpa",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Showroom",
    label: "propShowroom",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Airport",
    label: "propAirport",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Bank / Financial Office",
    label: "propBankFinancialOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "School / Nursery",
    label: "propSchoolNursery",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Warehouse",
    label: "propWarehouse",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Distribution Centre",
    label: "propDistributionCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Factory",
    label: "propFactory",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hospital",
    label: "propHospital",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Other Commercial Property",
    label: "propOtherCommercialProperty",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
]

export const SANITIZE_RESIDENTIAL_CATEGORYIES: PropertyCategory[] = [
  {
    id: "studio",
    label: "propStudio",
    icon: <Building size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 40,
    step: 1,
    locked: false,
  },
  {
    id: "apartment",
    label: "propApartment",
    icon: <Building2 size={20} color={GOLD_COLOR} />,
    min: 45,
    max: 120,
    step: 1,
    locked: false,
  },
  {
    id: "townhouse",
    label: "propTownhouse",
    icon: <Home size={20} color={GOLD_COLOR} />,
    min: 90,
    max: 220,
    step: 1,
    locked: false,
  },
  {
    id: "home",
    label: "propHome",
    icon: <House size={20} color={GOLD_COLOR} />,
    min: 100,
    max: 350,
    step: 1,
    locked: false,
  },
  {
    id: "penthouse",
    label: "propPenthouse",
    icon: <Castle size={20} color={GOLD_COLOR} />,
    min: 120,
    max: 400,
    step: 1,
    locked: false,
  },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: <Crown size={20} color={GOLD_COLOR} />,
    min: 200,
    max: 500,
    step: 1,
    locked: false,
  },
  { ...SANITIZE_OTHER_PROPERTY_CATEGORY },
];

export const SANITIZE_INDUSTRIAL_CATEGORYIES: PropertyCategory[] = [
  ...STEAM_CLEANING_PROPERTIES
];


//slug is post-event-cleaning
//no tabs,just these categories onbly
const POST_EVENT_CLEANING_PROPERTIES: PropertyCategory[] = [
  { id: "studio", label: "propStudio", icon: <SquareTerminal size={20} color={GOLD_COLOR} />, min: 20, max: 40, step: 1, locked: false },
  { id: "apartment", label: "propApartment", icon: <LayoutGrid size={20} color={GOLD_COLOR} />, min: 45, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: <Home size={20} color={GOLD_COLOR} />, min: 90, max: 220, step: 1, locked: false },
  { id: "home", label: "propHome", icon: <HousePlus size={20} color={GOLD_COLOR} />, min: 100, max: 350, step: 1, locked: false },
  { id: "penthouse", label: "propPenthouse", icon: <Sunset size={20} color={GOLD_COLOR} />, min: 120, max: 400, step: 1, locked: false },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: <Crown size={20} color={GOLD_COLOR} />,
    min: 200,
    max: 500,
    step: 1,
    locked: false,
  },
  { id: "holiday-home", label: "propHolidayHome", icon: <Palmtree size={20} color={GOLD_COLOR} />, min: 60, max: 400, step: 1, locked: false },
  { id: "holiday_rentals", label: "propHolidayRentals", icon: <Globe2 size={20} color={GOLD_COLOR} />, min: 200, max: 500, step: 1, locked: false },

  {
    id: "Office",
    label: "propOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hotel",
    label: "propHotel",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Restaurant / Café",
    label: "propRestaurantCafe",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "Banquet Hall",
    label: "propBanquetHall",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "Conference Centre",
    label: "propConferenceCentre",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },

  {
    id: "eventvenue",
    label: "propEventVenue",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "private-estate-cleaning",
    label: "private_estate_cleaning",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "otherii",
    label: "propOther",
    icon: <Package size={20} color={GOLD_COLOR} className="bg-gray-800" />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
]




//only property must appears without category tabs
//slug is "premium-rental-concierge-cleaning" 
const PREMIUM_RENTAL_PROPERTIES: PropertyCategory[] = [
  { id: "studio", label: "propStudio", icon: <SquareTerminal size={20} color={GOLD_COLOR} />, min: 20, max: 40, step: 1, locked: false },
  { id: "apartment", label: "propApartment", icon: <LayoutGrid size={20} color={GOLD_COLOR} />, min: 45, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: <Home size={20} color={GOLD_COLOR} />, min: 90, max: 220, step: 1, locked: false },
  { id: "home", label: "propHome", icon: <HousePlus size={20} color={GOLD_COLOR} />, min: 100, max: 350, step: 1, locked: false },
  { id: "penthouse", label: "propPenthouse", icon: <Sunset size={20} color={GOLD_COLOR} />, min: 120, max: 400, step: 1, locked: false },
  {
    id: "luxury-villa",
    label: "propLuxuryVilla",
    icon: <Crown size={20} color={GOLD_COLOR} />,
    min: 200,
    max: 500,
    step: 1,
    locked: false,
  },
  { id: "holiday-home", label: "propHolidayHome", icon: <Palmtree size={20} color={GOLD_COLOR} />, min: 60, max: 400, step: 1, locked: false },
  { id: "holiday_rentals", label: "propHolidayRentals", icon: <Globe2 size={20} color={GOLD_COLOR} />, min: 200, max: 500, step: 1, locked: false },
  {
    id: "private-estate-cleaning",
    label: "private_estate_cleaning",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "Chalet",
    label: "propChalet",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "Duplex / Triplex",
    label: "propDuplexTriplex",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "Luxury Residence",
    label: "propLuxuryResidence",
    icon: <Trees size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  { id: "hotels", label: "propHotels", icon: <Building size={20} color={GOLD_COLOR} />, min: 200, max: 500, step: 1, locked: false },

];


const POOL_DEFAULT_TYPES: PropertyCategory[] = [
  { id: "pool_kiddies", label: "poolTypeKiddies", icon: <Baby size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "above_ground_pools", label: "poolTypeAboveGroundSwimmingPools", icon: <Layers size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "lap_pools", label: "poolTypeLapPools", icon: <Timer size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "in_ground_pools", label: "poolTypeInGroundPools", icon: <Maximize size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "family_swimming_pools", label: "poolTypeFamilySwimmingPools", icon: <Users2 size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "indoor_pools", label: "poolTypeIndoorPools", icon: <Warehouse size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "olympic_size_pools", label: "poolTypeOlympicSizePools", icon: <Medal size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "architectural_pools", label: "poolTypeArchitecturalPools", icon: <DraftingCompass size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "infinity_pools", label: "poolTypeInfinityPools", icon: <Sunrise size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "natural_pools", label: "poolTypeNaturalPools", icon: <Sprout size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "spool_small_pool", label: "poolTypeSpoolSmallPool", icon: <Droplet size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "saltwater_pools", label: "poolTypeSaltwaterPools", icon: <TestTube2 size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "plunge_pools", label: "poolTypePlungePools", icon: <Snowflake size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "jacuzzi_cleaning", label: "poolAddonJacuzziCleaning", icon: <CloudFog size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "steam_room_cleaning", label: "poolAddonSteamRoomCleaning", icon: <Wind size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false },
  { id: "sauna_room_cleaning", label: "poolAddonSaunaRoomCleaning", icon: <Flame size={20} color={GOLD_COLOR} />, min: 20, max: 500, step: 1, locked: false }
];

const POST_CONSTRUCTION_COMMERCIALTYPES: PropertyCategory[] = [
  {
    id: "Micro-Office",
    label: "propMicroOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false
  },
  {
    id: "Office",
    label: "propOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Coworking-Space",
    label: "propCoWorkingSpace",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Retail-Shop",
    label: "propRetailShop",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Shopping Centre",
    label: "propShoppingCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Supermarket / Grocery Store",
    label: "propSupermarketGroceryStore",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Restaurant",
    label: "propRestaurant",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Café",
    label: "propCafe",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hotel",
    label: "propHotel",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Gym / Fitness Centre",
    label: "propGymFitnessCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Medical Clinic",
    label: "propMedicalClinic",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Beauty Salon / Spa",
    label: "propBeautySalonSpa",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Showroom",
    label: "propShowroom",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Airport",
    label: "propAirport",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Bank / Financial Office",
    label: "propBankFinancialOffice",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "School / Nursery",
    label: "propSchoolNursery",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Warehouse",
    label: "propWarehouse",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Distribution Centre",
    label: "propDistributionCentre",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Factory",
    label: "propFactory",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Hospital",
    label: "propHospital",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
  {
    id: "Other Commercial Property",
    label: "propOtherCommercialProperty",
    icon: <Boxes size={20} color={GOLD_COLOR} />,
    min: 20,
    max: 500,
    step: 5,
    locked: false,
  },
]

export interface ServiceCategoryTab {
  id: string;
  label: string;
  translationKey?: TranslationKey;
  icon: string | React.ReactNode;
  categories: PropertyCategory[];
}

export const DEFAULT_CATEGORY_TABS: [ServiceCategoryTab, ServiceCategoryTab] = [
  {
    id: "residential",
    label: "Residential",
    translationKey: "propCatResidential",
    icon: <Compass size={20} color={GOLD_COLOR} />,
    categories: SANITIZE_RESIDENTIAL_CATEGORYIES,
  },
  {
    id: "industrial",//actually the id must be literary "commercial",but kept without affecting types and functional processes
    label: "Commercial",
    translationKey: "classCommercial",
    icon: <Cog size={20} color={GOLD_COLOR} />,
    categories: SANITIZE_INDUSTRIAL_CATEGORYIES,
  },
];

/*yachtCleaning
passengerShipCleaning
privateSocialEvents
vipCorporateEvents
commercialCleaning
officeCleaning
securityResidential
securityOffice
*/

export const SERVICE_CATEGORY_TABS_MAP: Record<string, [ServiceCategoryTab, ServiceCategoryTab]> = {
  "healthguard-sanitization": DEFAULT_CATEGORY_TABS,
  "luxury-yacht-cleaning": [
    {
      id: "yatch-cleaning",
      label: "yachtCleaning",
      icon: "🛥️",
      categories: YACHT_CLEANING_CATEGORIES,
    },
    {
      id: "passenger-ship-cleaning",
      label: "passengerShipCleaning",
      icon: "🛳️",
      categories: PASSENGER_SHIP_CLEANING_CATEGORIES,
    },
  ],
  
  
  "pool-cleaning": [
    {
      id: "residential",
      label: "Residential",
      translationKey: "propCatResidential",
      icon: <Compass size={20} color={GOLD_COLOR} />,
      categories: POOL_DEFAULT_TYPES,
    },
    {
      id: "industrial",
      label: "Industrial",
      translationKey: "propCatIndustrial",
      icon: <Cog size={20} color={GOLD_COLOR} />,
      categories: POOL_DEFAULT_TYPES,
    },

  ],
  //new post contruction renovation cleaning service,display two categoies as "residential","commercial"
  "post-construction-renovation-cleaning": [
    DEFAULT_CATEGORY_TABS[0],
    {
      id: "industrial",//actually the id must be literary "commercial",but kept without affecting types and functional processes
      label: "Commercial",
      translationKey: "classCommercial",
      icon: <Cog size={20} color={GOLD_COLOR} />,
      categories: POST_CONSTRUCTION_COMMERCIALTYPES,
    },
  ],
  "steam-cleaning": [
    {
      id: "residential",
      label: "Residential",
      translationKey: "propCatResidential",
      icon: <Compass size={20} color={GOLD_COLOR} />,
      categories: SANITIZE_RESIDENTIAL_CATEGORYIES,
    },
    {
      id: "industrial",//actually the id must be literary "commercial",but kept without affecting types and functional processes
      label: "Commercial",
      translationKey: "classCommercial",
      icon: <Cog size={20} color={GOLD_COLOR} />,
      categories: STEAM_CLEANING_PROPERTIES,
    },
  ]

};

/** Translation key for a Service Category tab id (e.g. "yatch-cleaning" -> "yachtCleaning"), for summaries. */
export function serviceCategoryLabelKey(tabId: string): TranslationKey | undefined {
  for (const tabs of [DEFAULT_CATEGORY_TABS, ...Object.values(SERVICE_CATEGORY_TABS_MAP)]) {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) return tab.translationKey ?? (tab.label as TranslationKey);
  }
  return undefined;
}

const NO_CATEGORY_TABS = new Set([
  "high-security-property-care",
  "premium-rental-concierge-cleaning",
  "commercial-office-cleaning",
  "post-event-cleaning",
])

export function getCategoryTabsForService(serviceSlug?: string): [ServiceCategoryTab, ServiceCategoryTab] {
  if (serviceSlug && SERVICE_CATEGORY_TABS_MAP[serviceSlug]) {
    return SERVICE_CATEGORY_TABS_MAP[serviceSlug];
  }
  return DEFAULT_CATEGORY_TABS;
}

export const NO_VISUALIZATION_SERVICES = new Set([
  "high-security-property-care",
  "commercial-office-cleaning",
  "post-event-cleaning",
  "luxury-yacht-cleaning",
]);

//all categories of sanitization and common flow services
export function getPropertyCategoriesForServiceOfSanitize(serviceSlug?: string): PropertyCategory[] {

  if (serviceSlug === "high-security-property-care") {
    return HIGHT_SECURITY_CATEGORYIES
  }
  if (serviceSlug === "premium-rental-concierge-cleaning") {
    return PREMIUM_RENTAL_PROPERTIES
  }
  if (serviceSlug === "commercial-office-cleaning") {
    return COMMERCIAL_AND_OFFICE_CLEANING_PROPERTIES
  }
  if (serviceSlug === "steam-cleaning") {
    return STEAM_CLEANING_PROPERTIES
  }
  if (serviceSlug === "post-event-cleaning") {
    return POST_EVENT_CLEANING_PROPERTIES
  }
  if (serviceSlug && isCommonPropertyTypeWithRoomComponents(serviceSlug)) {

    return SANITIZE_RESIDENTIAL_CATEGORYIES;
  }
  const tabs = getCategoryTabsForService(serviceSlug) || serviceSlug !== "high-security-property-care";
  return [...tabs[0].categories, ...tabs[1].categories];
}

const RESIDENTIAL_PRIMARY_LADDER_IDS = [
  "studio",
  "apartment",
  "townhouse",
  "home",
  "penthouse",
  "luxury-villa",
];

const INDUSTRIAL_PRIMARY_LADDER_IDS = [
  "micro-office",
  "boutique-shop",
  "cafe",
  "bar",
  "office",
  "restaurant",
  "spa",
  "co-working-space",
  "corporate-office",
  "hotel",
  "school",
  "hospital",
  "mall",
  "airport",
];

function findAppropriateCategory(
  val: number,
  currentCatId: string | null,
  categories: PropertyCategory[],
  direction?: "up" | "down"
): PropertyCategory | null {
  if (!categories || categories.length === 0) return null;

  const currentCat = currentCatId ? categories.find((c) => c.id === currentCatId) ?? null : null;
  const isIndustrial = categories.some((c) => c.id === "micro-office");
  const isResidential = categories.some((c) => c.id === "studio");

  if (isResidential && !isIndustrial && val > 40 && val < 45) {
    return null;
  }

  const hasLadder = isIndustrial || isResidential;
  if (hasLadder) {
    const ladderIds = isIndustrial
      ? INDUSTRIAL_PRIMARY_LADDER_IDS
      : RESIDENTIAL_PRIMARY_LADDER_IDS;

    const ladderCats = ladderIds
      .map((id) => categories.find((c) => c.id === id))
      .filter((c): c is PropertyCategory => !!c);

    const isCurrentInLadder = currentCat ? ladderCats.some((c) => c.id === currentCat.id) : false;

    if (currentCat && !isCurrentInLadder) {
      if (val >= currentCat.min && val <= currentCat.max) {
        return currentCat;
      }
    }

    if (direction === "up") {
      if (currentCat && isCurrentInLadder) {
        let candidate: PropertyCategory | null = null;
        for (const cat of ladderCats) {
          if (cat.min > currentCat.min && val >= cat.min && val <= cat.max) {
            if (!candidate || cat.min > candidate.min) {
              candidate = cat;
            }
          }
        }
        if (candidate) {
          return candidate;
        }
        if (val >= currentCat.min && val <= currentCat.max) {
          return currentCat;
        }
      }

      for (let i = ladderCats.length - 1; i >= 0; i--) {
        const cat = ladderCats[i];
        if (val >= cat.min && val <= cat.max) {
          return cat;
        }
      }
      return null;
    }

    if (direction === "down") {
      if (currentCat && isCurrentInLadder) {
        if (val < currentCat.min) {
          for (let i = ladderCats.length - 1; i >= 0; i--) {
            const cat = ladderCats[i];
            if (cat.min < currentCat.min && val >= cat.min && val <= cat.max) {
              return cat;
            }
          }
          return null;
        }
        if (val >= currentCat.min && val <= currentCat.max) {
          return currentCat;
        }
      }

      for (let i = ladderCats.length - 1; i >= 0; i--) {
        const cat = ladderCats[i];
        if (val >= cat.min && val <= cat.max) {
          return cat;
        }
      }
      return null;
    }

    for (let i = ladderCats.length - 1; i >= 0; i--) {
      const cat = ladderCats[i];
      if (val >= cat.min && val <= cat.max) {
        return cat;
      }
    }
    return null;
  }

  if (currentCat && val >= currentCat.min && val <= currentCat.max) {
    return currentCat;
  }

  const matched = categories.find((c) => val >= c.min && val <= c.max);
  return matched ?? currentCat ?? categories[0] ?? null;
}

function buildSizeOptions(cat: PropertyCategory): number[] {
  if (cat.sizes) return cat.sizes;
  const step = cat.step > 0 ? cat.step : 1;
  const sizes: number[] = [];
  for (let s = cat.min; s <= cat.max; s += step) sizes.push(s);
  if (sizes[sizes.length - 1] !== cat.max) sizes.push(cat.max);
  return sizes;
}

function formatFt2(m2: number): string {
  return Math.round(m2 * 10.76391041671).toLocaleString();
}

function DisinfectionSprayIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10 2v3" />
      <path d="M7 5h6" />
      <path d="M7 8h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
      <path d="M13 5l2 3" />
      <circle cx="18" cy="4" r="0.75" fill="currentColor" />
      <circle cx="20" cy="7" r="0.75" fill="currentColor" />
    </svg>
  );
}

const DROPDOWN_SIZE_STEP = 10;
const BLUEPRINT_VIEWBOX = "-50 -50 1000 800";
const WALL = { left: 50, right: 900, top: 50, bottom: 680 };
const DIM_OFFSET = 75;
const DIM_TICK = 10;
const DIM_STROKE = "rgba(6, 182, 212, 0.7)";
const DIM_TEXT = "#fff";
const DIM_BG = "#091122";

function BlueprintDimensions({ span, depth }: { span: number; depth: number }) {
  const y = WALL.top - DIM_OFFSET;
  const x = WALL.left - DIM_OFFSET;
  const midX = (WALL.left + WALL.right) / 2;
  const midY = (WALL.top + WALL.bottom) / 2;
  const labelProps = {
    fill: DIM_TEXT,
    fontSize: 24,
    fontWeight: 600,
    fontFamily: "monospace",
    textAnchor: "middle" as const,
    dominantBaseline: "central" as const,
    stroke: DIM_BG,
    strokeWidth: 14,
    paintOrder: "stroke",
  };

  return (
    <g>
      <g stroke={DIM_STROKE} strokeWidth="2.5">
        <line x1={WALL.left} y1={y} x2={WALL.right} y2={y} />
        <line x1={WALL.left} y1={y - DIM_TICK} x2={WALL.left} y2={y + DIM_TICK} />
        <line x1={WALL.right} y1={y - DIM_TICK} x2={WALL.right} y2={y + DIM_TICK} />
        <line x1={x} y1={WALL.top} x2={x} y2={WALL.bottom} />
        <line x1={x - DIM_TICK} y1={WALL.top} x2={x + DIM_TICK} y2={WALL.top} />
        <line x1={x - DIM_TICK} y1={WALL.bottom} x2={x + DIM_TICK} y2={WALL.bottom} />
      </g>
      <text x={midX} y={y} {...labelProps}>
        {span} m SPAN WIDTH
      </text>
      <text x={x} y={midY} transform={`rotate(-90 ${x} ${midY})`} {...labelProps}>
        {depth} m DEPTH
      </text>
    </g>
  );
}

interface visualizationProps {
  value: number;
  activeCategory?: PropertyCategory | null;
  isDisinfection?: boolean;
  isDeepClean?: boolean;
  quote?: SizeQuote | null;
  serviceCategory?: "residential" | "industrial" | "yatch-cleaning" | "passenger-ship-cleaning";
  isQuote?: boolean;
  theme?: string;
}

interface SurfaceBottomMatrix {
  costOFEstimation: string;
  serviceTargetArea: string;
}

export let surfaceMatrixes: SurfaceBottomMatrix = {
  costOFEstimation: "",
  serviceTargetArea: "",
};

let labourData: string;

export function SanitizeSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
  serviceCategory = "residential",
  isQuote,
  theme,
}: visualizationProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();

  const isLight = theme === "light";

  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  const masterBedArea = (value * 0.20).toFixed(1);
  const northBedArea = (value * 0.12).toFixed(1);
  const eastBedArea = (value * 0.13).toFixed(1);
  const livingArea = (value * 0.25).toFixed(1);
  const diningArea = (value * 0.12).toFixed(1);
  const kitchenArea = (value * 0.13).toFixed(1);
  const bathArea = (value * 0.05).toFixed(1);

  const showroomArea = (value * 0.30).toFixed(1);
  const displayArea = (value * 0.22).toFixed(1);
  const storageArea = (value * 0.18).toFixed(1);
  const checkoutArea = (value * 0.12).toFixed(1);
  const loungeArea = (value * 0.10).toFixed(1);
  const backOfficeArea = (value * 0.08).toFixed(1);

  const range = (min: string, max: string) => (min === max ? min : `${min} – ${max}`);
  const hasPrice = !!quote?.bookable && quote.priceMin != null && quote.priceMax != null;
  const hasHours = !!quote?.bookable && quote.minHours != null && quote.maxHours != null;
  const estimatedCost = hasPrice
    ? range(`${symbol}${quote!.priceMin!.toFixed(2)}`, `${symbol}${quote!.priceMax!.toFixed(2)}`)
    : "—";

  const serviceRate = hasPrice && quote!.minHours
    ? `${symbol}${(quote!.priceMin! / quote!.minHours).toFixed(2)} ${translate("servicesRatePerCleanerHour")}`
    : "—";
  const labor = hasHours
    ? `${range(String(quote!.minHours), String(quote!.maxHours))}h (${quote!.cleanerCount ?? 1} ${translate("CrewWord")})`
    : "—";

  labourData = labor;
  surfaceMatrixes.costOFEstimation = estimatedCost;
  surfaceMatrixes.serviceTargetArea = value + " m² • " + formatFt2(value) + " ft²";

  const surfaceTitle = isDeepClean && isDisinfection
    ? "deepCleanDisinfection"
    : isDeepClean
      ? "intensiveDeepClean"
      : isDisinfection
        ? "hospitalGradeDisinfection"
        : "standardSurfaceClean";

  const isResidential = serviceCategory === "residential";

  return (
    <div

      className={`w-full rounded-2xl border-2 border-[#C5A059] md:p-3 p-5 transition-colors duration-300 relative overflow-hidden select-none ${isLight
        ? "bg-[#FAF8F5] text-slate-900 shadow-[0_10px_35px_rgba(197,160,89,0.22)] ring-1 ring-[#C5A059]/30"
        : "bg-[#030303] text-white shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25"
        }`}
      style={{
        backgroundImage: isLight
          ? `
            linear-gradient(to right, rgba(197, 160, 89, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.12) 1px, transparent 1px)
          `
          : `
            linear-gradient(to right, rgba(197, 160, 89, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.07) 1px, transparent 1px)
          `,
        backgroundSize: "24px 24px",
      }}
    >
      <div className={`w-full flex items-center justify-between border-b pb-2.5 mb-3 gap-2 flex-wrap ${isLight ? "border-[#C5A059]/30" : "border-[#C5A059]/40"
        }`}>
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-2.5 h-2.5 bg-[#C5A059] rounded-full shadow-[0_0_10px_#C5A059] shrink-0" />
          <div className="min-w-0">
            <h4 className={`text-[11px] sm:text-xs font-bold tracking-widest uppercase truncate ${isLight ? "text-[#8C6D2D]" : "text-[#E6D5B8]"
              }`}>
              {activeCategory ? (CATEGORY_LABEL_KEYS[activeCategory.label] ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey) : translate(activeCategory.label as TranslationKey)) : (isResidential ? "RESIDENTIAL" : "INDUSTRIAL")} BLUEPRINT
            </h4>
            <p className={`text-[9px] sm:text-[10px] tracking-wider truncate ${isLight ? "text-[#A37F38]" : "text-[#C5A059]/80"
              }`}>
              {value} m² • {formatFt2(value)} ft² | GRID: {span}m × {depth}m
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-[9px] sm:text-[10px] px-2.5 py-1 bg-[#C5A059]/30 border-2 border-[#C5A059] rounded-md font-bold tracking-wide shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25 ${isLight ? "text-[#7A5C20]" : "text-[#E6D5B8]"
            }`}>
            {translate(surfaceTitle as TranslationKey)}
          </span>
          <span className={`hidden sm:inline-block text-[9px] px-2 py-0.5 border rounded-md font-mono ${isLight ? "bg-[#C5A059]/10 border-[#C5A059]/30 text-[#8C6D2D]" : "bg-[#C5A059]/20 border-[#C5A059]/40 text-[#E6D5B8]"
            }`}>
            CAD SCALE 1:50
          </span>
        </div>
      </div>

      <div className={`relative w-full border-2 border-[#C5A059] rounded-xl p-2 sm:p-4 overflow-hidden transition-all duration-300 ${isLight
        ? "bg-white/90 backdrop-blur-md shadow-[inset_0_0_20px_rgba(197,160,89,0.2),0_10px_35px_rgba(197,160,89,0.35)] ring-2 ring-[#C5A059]/30"
        : "bg-[#050505]/95 backdrop-blur-sm shadow-[inset_0_0_25px_rgba(197,160,89,0.25),0_8px_25px_rgba(197,160,89,0.3)]"
        }`}>
        <div className="flex items-center w-full">
          <div className="flex-1 min-w-0 max-h-[250px] sm:max-h-[270px] md:max-h-[420px] flex items-center justify-center">
            {isResidential ? (
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[220px] sm:max-h-[260px] md:max-h-[420px] drop-shadow-[0_0_18px_rgba(197,160,89,0.4)] object-contain"
              >
                <defs>
                  <pattern id="dotGridRes" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.6" fill="#C5A059" opacity={isLight ? "0.75" : "0.65"} />
                  </pattern>
                </defs>

                {/* Full background coverage for the dot matrix */}
                <rect x="-50" y="-50" width="1100" height="800" fill="url(#dotGridRes)" />

                <BlueprintDimensions span={span} depth={depth} />
                <rect x="50" y="50" width="850" height="630" rx="12" fill={isLight ? "rgba(255, 255, 255, 0.4)" : "rgba(5, 5, 5, 0.6)"} stroke="#C5A059" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.85" />

                <g stroke="#C5A059" strokeWidth="2.8" fill="none" strokeDasharray="5 3">
                  <line x1="50" y1="310" x2="360" y2="310" />
                  <line x1="360" y1="50" x2="360" y2="310" />
                  <line x1="360" y1="310" x2="620" y2="310" />
                  <line x1="620" y1="50" x2="620" y2="310" />
                  <line x1="730" y1="310" x2="900" y2="310" />
                  <line x1="730" y1="310" x2="730" y2="460" />
                  <line x1="620" y1="460" x2="900" y2="460" />
                  <line x1="620" y1="590" x2="900" y2="590" />
                  <line x1="620" y1="460" x2="620" y2="590" />
                  <line x1="360" y1="410" x2="520" y2="410" />
                  <line x1="360" y1="410" x2="360" y2="680" />
                  <line x1="520" y1="480" x2="520" y2="680" />
                  <path d="M 420 680 L 420 730 L 530 730 L 530 680" />
                </g>

                <g fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.05)"}>
                  <rect x="54" y="54" width="304" height="254" />
                  <rect x="364" y="54" width="254" height="254" />
                  <rect x="624" y="54" width="274" height="254" />
                  <rect x="54" y="314" width="304" height="362" />
                  <rect x="364" y="414" width="154" height="262" />
                  <rect x="624" y="464" width="274" height="212" />
                  <rect x="734" y="314" width="164" height="144" />
                </g>

                <g stroke="#C5A059" strokeWidth="1.8" fill="none" opacity="0.95" strokeDasharray="4 3">
                  <rect x="80" y="80" width="110" height="130" rx="6" strokeDasharray="4 2" />
                  <rect x="75" y="240" width="180" height="35" rx="4" />
                  <circle cx="310" cy="80" r="12" strokeWidth="1.5" />
                  <rect x="390" y="85" width="100" height="120" rx="6" />
                  <rect x="520" y="70" width="35" height="40" rx="4" />
                  <rect x="660" y="85" width="110" height="120" rx="6" />
                  <rect x="800" y="220" width="80" height="45" rx="4" />
                  <path d="M 80 500 L 80 620 L 280 620 L 280 560 L 130 560 L 130 500 Z" />
                  <rect x="150" y="580" width="50" height="30" rx="4" />
                  <rect x="150" y="350" width="120" height="20" rx="3" />
                  <rect x="400" y="500" width="80" height="120" rx="6" />
                  <rect x="380" y="515" width="15" height="25" rx="2" />
                  <rect x="380" y="575" width="15" height="25" rx="2" />
                  <rect x="485" y="515" width="15" height="25" rx="2" />
                  <rect x="485" y="575" width="15" height="25" rx="2" />
                  <path d="M 640 480 L 870 480 L 870 650 L 640 650" strokeDasharray="6 3" />
                  <rect x="700" y="530" width="90" height="60" rx="4" />
                  <ellipse cx="780" cy="365" rx="15" ry="10" strokeWidth="1.5" />
                  <rect x="830" y="355" width="25" height="35" rx="4" strokeWidth="1.5" />
                </g>

                <g stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.85" strokeDasharray="3 3">
                  <path d="M 360 260 A 40 40 0 0 1 320 220" />
                  <line x1="360" y1="260" x2="360" y2="220" />
                  <path d="M 520 310 A 40 40 0 0 1 480 270" />
                  <path d="M 680 310 A 40 40 0 0 0 720 270" />
                  <path d="M 730 380 A 35 35 0 0 1 765 345" />
                  <path d="M 450 680 A 30 30 0 0 1 480 650" />
                </g>

                <g fontFamily="monospace">
                  <text x="200" y="170" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="16" fontWeight="bold" textAnchor="middle">MASTER BEDROOM</text>
                  <text x="200" y="195" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{masterBedArea} m²</text>
                  <text x="490" y="170" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold" textAnchor="middle">NORTH BEDROOM</text>
                  <text x="490" y="195" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{northBedArea} m²</text>
                  <text x="760" y="170" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold" textAnchor="middle">EAST BEDROOM</text>
                  <text x="760" y="195" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{eastBedArea} m²</text>
                  <text x="200" y="430" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="17" fontWeight="bold" textAnchor="middle">LIVING & LOUNGE</text>
                  <text x="200" y="455" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="14" fontWeight="600" textAnchor="middle">{livingArea} m²</text>
                  <text x="440" y="465" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold" textAnchor="middle">DINING SPACE</text>
                  <text x="440" y="488" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{diningArea} m²</text>
                  <text x="760" y="515" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="16" fontWeight="bold" textAnchor="middle">KITCHEN & ISLAND</text>
                  <text x="760" y="540" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{kitchenArea} m²</text>
                  <text x="815" y="410" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold" textAnchor="middle">BATH & WC</text>
                  <text x="815" y="432" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="12" fontWeight="600" textAnchor="middle">{bathArea} m²</text>
                </g>

                <g transform="translate(100, 630)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#C5A059" />
                  <text x="0" y="30" fill="#C5A059" fontSize="10" textAnchor="middle" fontFamily="monospace">N // CAD-04</text>
                </g>
              </svg>
            ) : (
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[250px] sm:max-h-[270px] md:max-h-[420px] drop-shadow-[0_0_18px_rgba(197,160,89,0.4)] object-contain"
              >
                <defs>
                  {/* Increase width, height, and circle spacing to fit the main square better */}
                  <pattern id="dotGridCom" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1.8" fill="#C5A059" opacity={isLight ? "0.75" : "0.65"} />
                  </pattern>
                </defs>

                <rect x="0" y="0" width="1000" height="700" fill="url(#dotGridCom)" />
                <BlueprintDimensions span={span} depth={depth} />
                <rect x="50" y="50" width="850" height="630" rx="12" fill="none" stroke="#C5A059" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.85" />
                <g stroke="#C5A059" strokeWidth="2.8" fill="none" strokeDasharray="5 3">
                  <line x1="50" y1="530" x2="350" y2="530" />
                  <line x1="350" y1="50" x2="350" y2="530" />
                  <line x1="570" y1="530" x2="900" y2="530" />
                  <line x1="570" y1="530" x2="570" y2="680" />
                  <rect x="420" y="230" width="210" height="270" rx="4" strokeWidth="2.5" />
                </g>
                <g fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.05)"}>
                  <rect x="54" y="54" width="292" height="472" />
                  <rect x="354" y="54" width="222" height="172" />
                  <rect x="578" y="54" width="318" height="472" />
                  <rect x="54" y="534" width="292" height="142" />
                  <rect x="574" y="534" width="322" height="142" />
                  <rect x="424" y="234" width="202" height="262" fill={isLight ? "rgba(197, 160, 89, 0.18)" : "rgba(197, 160, 89, 0.1)"} />
                </g>
                <g stroke="#C5A059" strokeWidth="1.8" fill="none" opacity="0.95" strokeDasharray="4 3">
                  <line x1="80" y1="120" x2="260" y2="120" strokeWidth="3" />
                  <line x1="80" y1="180" x2="260" y2="180" strokeWidth="3" />
                  <line x1="80" y1="240" x2="260" y2="240" strokeWidth="3" />
                  <line x1="80" y1="300" x2="260" y2="300" strokeWidth="3" />
                  <rect x="90" y="360" width="180" height="70" rx="4" />
                  <rect x="120" y="380" width="40" height="30" rx="2" />
                  <line x1="450" y1="260" x2="590" y2="260" strokeWidth="2.5" />
                  <line x1="450" y1="300" x2="590" y2="300" strokeWidth="2" />
                  <rect x="470" y="330" width="60" height="40" rx="2" />
                  <rect x="540" y="330" width="50" height="40" rx="2" />
                  <line x1="450" y1="420" x2="590" y2="420" strokeWidth="2.5" />
                  <rect x="500" y="90" width="260" height="40" rx="4" />
                  <rect x="370" y="90" width="40" height="30" rx="2" />
                  <line x1="720" y1="260" x2="720" y2="420" strokeWidth="3" />
                  <rect x="780" y="260" width="50" height="140" rx="4" />
                  <rect x="90" y="580" width="140" height="60" rx="6" />
                  <path d="M 610 570 L 860 570 L 860 650 L 610 650" strokeWidth="2.5" strokeDasharray="6 3" />
                  <rect x="650" y="590" width="80" height="40" rx="4" />
                </g>
                <g stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.85" strokeDasharray="3 3">
                  <path d="M 350 630 A 30 30 0 0 1 380 600" />
                  <path d="M 570 630 A 30 30 0 0 0 540 600" />
                  <path d="M 200 530 A 30 30 0 0 1 230 500" />
                </g>
                <g fontFamily="monospace">
                  <text x="200" y="225" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold" textAnchor="middle">STORAGE & INVENTORY</text>
                  <text x="200" y="248" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{storageArea} m²</text>
                  <text x="465" y="145" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold" textAnchor="middle">BACK OFFICE</text>
                  <text x="465" y="165" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="11" fontWeight="600" textAnchor="middle">{backOfficeArea} m²</text>
                  <text x="730" y="225" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold" textAnchor="middle">DISPLAY & MERCHANDISE</text>
                  <text x="730" y="248" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13" fontWeight="600" textAnchor="middle">{displayArea} m²</text>
                  <text x="525" y="210" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="11" fontWeight="bold" textAnchor="middle">CENTRAL SHOWROOM FLOOR</text>
                  <text x="525" y="380" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="16" fontWeight="bold" textAnchor="middle">MAIN FLOOR</text>
                  <text x="525" y="405" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="14" fontWeight="600" textAnchor="middle">{showroomArea} m²</text>
                  <text x="160" y="565" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold" textAnchor="middle">CONSULTATION LOUNGE</text>
                  <text x="160" y="588" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="12" fontWeight="600" textAnchor="middle">{loungeArea} m²</text>
                  <text x="735" y="555" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold" textAnchor="middle">CHECKOUT & SERVICE</text>
                  <text x="735" y="578" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="12" fontWeight="600" textAnchor="middle">{checkoutArea} m²</text>
                </g>
                <g transform="translate(100, 600)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#C5A059" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#C5A059" />
                  <text x="0" y="30" fill="#C5A059" fontSize="10" textAnchor="middle" fontFamily="monospace">N // RETAIL-01</text>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>

      {!isQuote && (
        <div className={`w-full rounded-2xl border border-[#C5A059]/40 p-4 md:p-6 shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25 relative overflow-hidden select-none font-mono transition-colors duration-300 ${isLight ? "bg-white text-slate-900" : "bg-[#030303] text-white"
          }`}>
          {/* Header Section */}
          <div className="mb-4 pb-3 border-b border-[#C5A059]/30">
            <h3 className={`text-base md:text-xl font-bold tracking-tight font-serif ${isLight ? "text-slate-900" : "text-white"}`}>
              Service Estimate
            </h3>
            <p className={`text-[11px] md:text-xs mt-0.5 font-sans ${isLight ? "text-slate-600" : "text-gray-400"}`}>
              Based on the selected property type and size
            </p>
          </div>

          {/* Grid Cards Container: 2 columns on mobile, 4 columns on desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

            {/* Card 1: Property Scale / Target Area */}
            <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border 
        border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors
         duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
              }`}>
              <Maximize2 className="w-4 h-4 text-[#C5A059] mb-2" />
              <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
                PROPERTY SCALE
              </p>
              <p className={`text-xs md:text-base font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
                {surfaceMatrixes.serviceTargetArea}
              </p>
              {activeCategory && (
                <p className="text-[10px] text-[#D4AF37] mt-0.5 truncate max-w-full">
                  {CATEGORY_LABEL_KEYS[activeCategory.label]
                    ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey)
                    : translate(activeCategory.label as TranslationKey)}
                </p>
              )}
            </div>

            {/* Card 2: Total Duration / Est Labor */}
            <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
              }`}>
              <Clock className="w-4 h-4 text-[#C5A059] mb-2" />
              <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
                {translate("EstLabor")}
              </p>
              <p className={`text-xs md:text-base font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
                {labourData}
              </p>
              <p className={`text-[10px] mt-0.5 ${isLight ? "text-slate-600" : "text-gray-400"}`}>Estimated</p>
            </div>

            {/* Card 3: Allocated Staff */}
            <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
              }`}>
              <Users className="w-4 h-4 text-[#C5A059] mb-2" />
              <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
                ALLOCATED STAFF
              </p>
              <p className={`text-sm md:text-lg font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
                1
              </p>
              <p className="text-[9px] md:text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase mt-0.5">
                SENIOR CLEANER
              </p>
            </div>

            {/* Card 4: On-Site Window / Estimated Cost */}
            <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
              }`}>
              <Calendar className="w-4 h-4 text-[#C5A059] mb-2" />
              <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
                {translate("EstimatedCost")}
              </p>
              <p className="text-xs md:text-base font-bold text-[#D4AF37] tracking-wide">
                {surfaceMatrixes.costOFEstimation}
              </p>
              <p className={`text-[10px] mt-0.5 ${isLight ? "text-slate-600" : "text-gray-400"}`}>Price range</p>
            </div>

          </div>

          {/* Optional Service Badges */}

        </div>
      )}
    </div>
  );
}

export interface PropertyTypeSizeSelectorProps {
  value: number;
  onChange: (value: number) => void;
  serviceSlug: string;
  categories?: PropertyCategory[];
  onCategoryChange?: (category: PropertyCategory) => void;
  disinfection?: boolean;
  onDisinfectionChange?: (selected: boolean) => void;
  deepClean?: boolean;
  onDeepCleanChange?: (selected: boolean) => void;
  onServiceCategoryChange?: (category: ServicePropertyCategoriesEnums[keyof ServicePropertyCategoriesEnums] | string) => void;
  quote?: SizeQuote | null;
  /** Room-component services only (regular/touch-up/deep/end-of-tenancy/same-day/premium-rental). */
  rooms?: RoomCounts;
  onRoomsChange?: (rooms: RoomCounts) => void;
  selectServiceFrequency?: string | null;
  setSelectServiceFrequency?: (frequency: string | null) => void;
  isQuote?: boolean;
  theme?: string;
}

export function PropertyTypeSizeSelectorCommonFlowOfServices({
  value,
  onChange,
  serviceSlug,
  categories = isCommonPropertyTypeWithRoomComponents(serviceSlug)
    ? SANITIZE_RESIDENTIAL_CATEGORYIES
    : getPropertyCategoriesForServiceOfSanitize(serviceSlug),
  onCategoryChange,
  disinfection: controlledDisinfection,
  onDisinfectionChange,
  deepClean: controlledDeepClean,
  onDeepCleanChange,
  onServiceCategoryChange,
  quote,
  rooms = {},
  onRoomsChange,
  selectServiceFrequency,
  setSelectServiceFrequency,
  isQuote,
  theme: themeProp = "dark"
}: PropertyTypeSizeSelectorProps) {
  const isLight = themeProp === "light";
  const [internalDisinfection, setInternalDisinfection] = useState(false);
  const [internalDeepClean, setInternalDeepClean] = useState(false);

  const [quoteStatus, setQuoteStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isQuote) {
      setQuoteStatus(true);
    } else {
      setQuoteStatus(false);
    }
  }, [quoteStatus])

  const isDisinfection = controlledDisinfection !== undefined ? controlledDisinfection : internalDisinfection;
  const isDeepClean = controlledDeepClean !== undefined ? controlledDeepClean : internalDeepClean;

  const setDisinfection = (val: boolean) => {
    if (controlledDisinfection === undefined) {
      setInternalDisinfection(val);
    }
    onDisinfectionChange?.(val);
  };

  const ROOM_COMPONENTS_SERVICES = isCommonPropertyTypeWithRoomComponents(serviceSlug)


  const isSanitizeService = serviceSlug === "healthguard-sanitization";

  const setDeepClean = (val: boolean) => {
    if (controlledDeepClean === undefined) {
      setInternalDeepClean(val);
    }
    onDeepCleanChange?.(val);
  };

  const handleToggleDisinfection = () => setDisinfection(!isDisinfection);
  const handleToggleDeepClean = () => setDeepClean(!isDeepClean);

  const categoryTabs = getCategoryTabsForService(serviceSlug);
  const [isActiveCategorySwitch, setIsActiveCategorySwitch] = useState<string>(() =>
    ROOM_COMPONENTS_SERVICES ? "residential" : categoryTabs[0].id
  );

  // Sync category tabs when serviceSlug changes
  useEffect(() => {
    if (ROOM_COMPONENTS_SERVICES) {
      setIsActiveCategorySwitch("residential");
      onServiceCategoryChange?.("residential");
      return;
    }
    const tabs = getCategoryTabsForService(serviceSlug);
    setIsActiveCategorySwitch(tabs[0].id);
    onServiceCategoryChange?.(tabs[0].id);
  }, [serviceSlug, ROOM_COMPONENTS_SERVICES]);

  // services which have service frequency options
  const frequencyServiceSlugsSet = new Set([
    "regular-home-cleaning",
    "essential-touch-up-cleaning",
    "deep-cleaning",
    "end-of-tenancy-cleaning",
    "post-construction-renovation-cleaning",
    "same-day-priority-cleaning",
    "high-security-property-care",
    "premium-rental-concierge-cleaning",
    "commercial-office-cleaning",
    "steam-cleaning",
    "post-event-cleaning",
    "luxury-yacht-cleaning",
    "healthguard-sanitization",
    "pool-cleaning",
  ]);
  const isFrequencyService = frequencyServiceSlugsSet.has(serviceSlug);

  const { translate } = useLanguage();

  const activeTab = categoryTabs.find((t) => t.id === isActiveCategorySwitch) ?? categoryTabs[0];

  // Dynamically determine the selectable categories based on the service type and active category switch

  /**
   * Adjust the maximum size of categories when a quote is active.
   * @param isQuote - Whether the current context is a quote.
   * 
   * @returns The adjusted list of categories.
   */
  const isNoCategoryTabService = NO_CATEGORY_TABS.has(serviceSlug);

  const MaxSizeChangeWhenQuote = (checkIsQuote: boolean): PropertyCategory[] => {

    const baseCategories = ROOM_COMPONENTS_SERVICES
      ? SANITIZE_RESIDENTIAL_CATEGORYIES
      : isNoCategoryTabService
        ? getPropertyCategoriesForServiceOfSanitize(serviceSlug)
        : activeTab.categories;

    if (checkIsQuote || quoteStatus) {
      return baseCategories.map(cat => ({ ...cat, max: 5000 }));
    }
    return baseCategories;
  }


  const selectableCategories: PropertyCategory[] = MaxSizeChangeWhenQuote(quoteStatus);


  // Tracked explicitly (not re-derived from `value` every render)
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(() => selectableCategories[0]?.id ?? null);

  // Sync active category if current activeCategoryId is not in the selectableCategories list
  useEffect(() => {
    if (!selectableCategories.some((c) => c.id === activeCategoryId)) {
      const firstCat = selectableCategories[0];
      setActiveCategoryId(firstCat?.id ?? null);
    }
  }, [selectableCategories, activeCategoryId]);

  const activeCategory = selectableCategories.find((c) => c.id === activeCategoryId) ?? null;
  const sizeOptions = activeCategory ? buildSizeOptions(activeCategory) : [value];

  const dropdownOptions = Array.from(
    new Set([
      ...sizeOptions.filter(
        (s, i) => s % DROPDOWN_SIZE_STEP === 0 || i === 0 || i === sizeOptions.length - 1,
      ),
      value,
    ]),
  ).sort((a, b) => a - b);

  useEffect(() => {
    if (activeCategory) {
      onCategoryChange?.(activeCategory);
    }
  }, [activeCategory, onCategoryChange]);


  console.log("quoteStatus", quoteStatus);

  // Sync active category when value changes externally or crosses category boundaries
  useEffect(() => {
    if (quoteStatus) {
      return
    }
    const nextCat = findAppropriateCategory(value, activeCategoryId, selectableCategories);
    const nextId = nextCat ? nextCat.id : null;
    if (nextId && nextId !== activeCategoryId) {
      setActiveCategoryId(nextId);
    }

  }, [value, selectableCategories, activeCategoryId, quoteStatus]);

  function handleCardClick(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      const initialSize = nextCat?.sizes ? nextCat.sizes[0] : nextCat.min;
      onChange(initialSize);
    }
  }



  const handleCategorySwitch = (tabId: string): void => {
    setIsActiveCategorySwitch(tabId);
    onServiceCategoryChange?.(tabId);
    const targetTab = categoryTabs.find((t) => t.id === tabId) ?? categoryTabs[0];
    const nextCategories = targetTab.categories;
    const firstCat = nextCategories[0];
    if (firstCat) {
      setActiveCategoryId(firstCat.id);
      const initialSize = firstCat.sizes ? firstCat.sizes[0] : firstCat.min;
      onChange(initialSize);
    }
  };

  const abortVisualization = serviceSlug !== "luxury-yacht-cleaning";
  const isYachtSlug = serviceSlug === "luxury-yacht-cleaning";

  const getCategoryDisplayLabel = (cat: PropertyCategory): string => {
    if (CATEGORY_LABEL_KEYS[cat.label]) {
      return translate(CATEGORY_LABEL_KEYS[cat.label] as TranslationKey);
    }
    if (cat.label.startsWith("prop") || cat.label.startsWith("yacht") || cat.label.startsWith("sec")) {
      return translate(cat.label as TranslationKey);
    }
    return cat.label;
  };

  const isPool = serviceSlug === "pool-cleaning";

  return (
    <section id="pricing-engine"
      className="w-full flex flex-col justify-center items-center">
      {/* Dynamic Size & Area Floorplan Visualization Component */}
      {isPool ?
        (
          <PoolBlueprintDiagram />
        ) :
        isYachtSlug ? (
          <YatchSizeVisualization
            value={value}
            activeCategory={activeCategory ?? undefined}
            isDisinfection={isDisinfection}
            isDeepClean={isDeepClean}
            quote={quote}
            serviceCategory={isActiveCategorySwitch as "yatch-cleaning" | "passenger-ship-cleaning"}
            isQuote={isQuote}
            theme={isLight ? "light" : "dark"}
          />
        ) : (
          <SanitizeSizeVisualization
            value={value}
            activeCategory={activeCategory ?? undefined}
            isDisinfection={isDisinfection}
            isDeepClean={isDeepClean}
            quote={quote}
            serviceCategory={ROOM_COMPONENTS_SERVICES ? "residential" : (isActiveCategorySwitch as "residential" | "industrial")}
            isQuote={isQuote}
            theme={isLight ? "light" : "dark"}
          />
        )}

      <div

        className={`rounded-2xl py-4 mt-5 border pb-5 sm:pb-6 px-5 sm:px-6  transition-all duration-300 ${isLight
          ? "bg-white border-[#C5A059]/40 text-[#1B2E4B]"
          : "bg-[rgba(13,20,36,0.7)] border-[rgba(212,175,55,0.18)] text-slate-100"
          }`}
      >
        {!ROOM_COMPONENTS_SERVICES && !NO_CATEGORY_TABS.has(serviceSlug) && (
          <div className="w-full">
            <h2 className={`text-base sm:text-lg font-bold mb-3 ${isLight ? "text-[#1B2E4B]" : "text-gray-300"}`}>
              {translate("propServiceCatagory")}
            </h2>
            <div
              className={`w-full p-1 flex justify-between items-center mb-6 rounded-[17px] border transition-colors ${isLight ? "bg-[#F5F1E6] border-[#C5A059]/30" : "bg-white/5 border-[#C5A059] backdrop-blur-md"
                }`}
            >
              {categoryTabs.map((tab) => {
                const isActive = isActiveCategorySwitch === tab.id;
                const tabLabel = tab.translationKey ? translate(tab.translationKey) : translate(tab.label as TranslationKey);

                // Cast as a React component 
                const iconColor = isActive
                  ? isLight
                    ? "#000000" // Active Light: Dark text on Gold button
                    : "#000000" // Active Dark: Dark text on Gold button
                  : isLight
                    ? "#4B5563" // Inactive Light: Gray-600
                    : "#D1D5DB"; // Inactive Dark: Gray-300 / Silver

                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`md:w-[49.5%] w-[48%] py-3 md:py-2 px-3 rounded-[14px] transition-all cursor-pointer text-[13px] md:text-[15px] font-bold flex items-center justify-center gap-1.5 ${isActive
                      ? isLight
                        ? "bg-[#C5A059] text-white shadow-md border border-[#C5A059]"
                        : "  hover:bg-[#d4a732]   border-[#C6A868]/60   bg-[#d4af37] text-black shadow-lg shadow-[#d4af37]/20"
                      : isLight
                        ? "bg-transparent text-[#1B2E4B]/70 hover:text-[#1B2E4B] hover:bg-black/5"
                        : "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    onClick={() => handleCategorySwitch(tab.id)}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl transition-colors ${isActive
                        ? "bg-transparent" // Active tab inherits button gold background
                        : isLight
                          ? "bg-gray-100/50"
                          : "bg-white/5"
                        }`}
                    >
                      {tab.id === "residential" ? (
                        <Compass size={20} color={iconColor} />
                      ) : tab.id === "industrial" ? (
                        <Cog size={20} color={iconColor} />
                      ) : tab.id === "yatch-cleaning" ? (
                        <Anchor size={20} color={iconColor} />
                      ) : (
                        <Navigation size={20} color={iconColor} />
                      )}
                    </div>
                    <span>{tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 items-start h-full">
          {/* Left Column: Property Type */}
          <div className="flex flex-col min-w-0">
            <span
              className={`text-[10px] sm:text-xs py-1 font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${isLight ? "text-[#A88238]" : "text-[#D9B75B]"
                }`}
            >
              Step 1 of 6
            </span>
            <div className={`flex justify-between mt-3 border-b pb-3 ${isLight ? "border-gray-200" : "border-[#3d3d3d]"}`}>
              <h3 className={`text-xl sm:text-2xl md:text-3xl font-serif mb-0 ${isLight ? "text-[#1B2E4B]" : "text-gray-300"}`}>
                {translate("propTypeTitle")}
              </h3>
              <p
                className={`text-[11px] text-center mt-1.5 font-medium tracking-wide select-none ${isLight ? "text-gray-500" : "text-[#94A3B8]"
                  }`}
              >
                {translate("propTypeSwipe")}
              </p>
            </div>

            <div
              className="flex flex-nowrap gap-3 pt-3 overflow-x-auto overflow-y-hidden -mx-1 px-1 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", scrollSnapType: "x proximity" }}
            >
              {/* Display categories */}
              {selectableCategories.map((cat) => {
                const isSelected = activeCategory ? cat.id === activeCategory.id : false;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleCardClick(cat.id)}
                    style={{ scrollSnapAlign: "start" }}
                    className={`shrink-0 w-[110px] h-[110px] sm:w-[118px] shadow-lg sm:h-[118px] rounded-xl border-2 flex flex-col items-center justify-center p-2.5 cursor-pointer transition-all select-none ${isSelected
                      ? isLight
                        ? "bg-[#C5A059]/30 border-2 border-[#C5A059] shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25"
                        : "bg-[#131713] border-2 border-[#E5C365] shadow-[0_0_20px_rgba(229,195,101,0.18)]"
                      : isLight
                        ? "bg-[#FBF9F4] border border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#F5F0E4]"
                        : "bg-[#0B101C] border border-[#172238] hover:border-slate-700 hover:bg-[#0f1626]"
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl mb-1.5 transition-colors ${isSelected
                        ? isLight
                          ? "bg-[#C5A059]/15 border-[#C5A059]/40 text-[#A88238]"
                          : "bg-[#C5A059]/15 text-white"
                        : isLight
                          ? "bg-[#F6EEDC] border-[#C5A059]/40 text-[#1B2E4B]"
                          : "bg-[#C5A059]/15 text-slate-800"
                        }`}
                    >
                      <span>{cat.icon}</span>
                    </div>
                    <span
                      className={`text-xs text-center leading-tight line-clamp-2 px-1 ${isSelected
                        ? isLight
                          ? "font-bold text-[#1B2E4B]"
                          : "font-bold text-white"
                        : isLight
                          ? "font-semibold text-[#1B2E4B]/80"
                          : "font-semibold text-white"
                        }`}
                    >
                      {translate(getCategoryDisplayLabel(cat) as TranslationKey)}
                    </span>
                  </button>
                );
              })}

            </div>


            {/* Property Size Selector */}
            {/* Property Size Selector */}
            <PropertySizeSelector
              value={value}
              onChange={onChange}
              isQuote={isQuote || quoteStatus}
              theme={themeProp}
              activeCategory={activeCategory}
              selectableCategories={selectableCategories}
              onCategoryChange={(cat) => {
                setActiveCategoryId(cat.id);
                onCategoryChange?.(cat);
              }}
            />


          </div>

          <EstimatioMatrixBottom
            activeCategory={activeCategory || null}
            isSanitizeService={isSanitizeService}
            isYatch={isYachtSlug}
            theme={isLight ? "light" : "dark"}
          />

          {/* Disinfection & Deep Clean Selectable Cards */}
          {isSanitizeService && (
            <div className="grid grid-cols-2 gap-3 items-center mt-4 h-full w-full">
              {/* Disinfection Card */}
              <button
                type="button"
                onClick={handleToggleDisinfection}
                className={`flex items-center justify-between p-4.5 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${isDisinfection
                  ? isLight
                    ? "bg-[#FFFDF7] border-2 border-[#C5A059] shadow-[0_4px_16px_rgba(197,160,89,0.25)]"
                    : "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                  : isLight
                    ? "bg-[#FBF9F4] border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#F5F0E4]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <DisinfectionSprayIcon
                    className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${isLight ? "text-[#A88238]" : "text-gray-300"}`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm sm:text-[15px] font-bold leading-tight ${isLight ? "text-[#1B2E4B]" : "text-white"
                        }`}
                    >
                      {translate("DisinfectionName")}
                    </span>
                    <span
                      className={`text-xs font-medium leading-tight mt-0.5 ${isLight ? "text-gray-500" : "text-[#94A3B8]"
                        }`}
                    >
                      {translate("HospitalGradeName")} (+0%)
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDisinfection
                    ? isLight
                      ? "border-[#C5A059] bg-[#C5A059] text-white"
                      : "border-blue-500 bg-blue-500 text-white"
                    : isLight
                      ? "border-[#C5A059]/30 bg-white"
                      : "border-white/20 bg-white/5"
                    }`}
                >
                  {isDisinfection && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>

              {/* Deep Clean Card */}
              <button
                type="button"
                onClick={handleToggleDeepClean}
                className={`flex items-center justify-between p-4.5 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${isDeepClean
                  ? isLight
                    ? "bg-[#FFFDF7] border-2 border-[#C5A059] shadow-[0_4px_16px_rgba(197,160,89,0.25)]"
                    : "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                  : isLight
                    ? "bg-[#FBF9F4] border-[#C5A059]/30 hover:border-[#C5A059]/70 hover:bg-[#F5F0E4]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Sparkles
                    className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 ${isLight ? "text-[#A88238]" : "text-blue-400"}`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-sm sm:text-[15px] font-bold leading-tight ${isLight ? "text-[#1B2E4B]" : "text-white"
                        }`}
                    >
                      {translate("deepCleanName")}
                    </span>
                    <span
                      className={`text-xs font-medium leading-tight mt-0.5 ${isLight ? "text-gray-500" : "text-[#94A3B8]"
                        }`}
                    >
                      {translate("deepCleanNameIntensive")} (+40%)
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDeepClean
                    ? isLight
                      ? "border-[#C5A059] bg-[#C5A059] text-white"
                      : "border-blue-500 bg-blue-500 text-white"
                    : isLight
                      ? "border-[#C5A059]/30 bg-white"
                      : "border-white/20 bg-white/5"
                    }`}
                >
                  {isDeepClean && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Room selector for services types */}
        {!isPool && (
          <RoomSelector
            value={rooms}
            onChange={(next) => onRoomsChange?.(next)}
            serviceSlug={serviceSlug}
            theme={isLight ? "light" : "dark"}
          />)}





        {/* Services frequencies */}
        {/* <div className="flex flex-col w-full mt-8">
          
          { isFrequencyService && (
            <ServiceFrequencySelector
              selectedServiceSlug={serviceSlug}
              value={selectServiceFrequency}
              onSelectionChange={setSelectServiceFrequency}
            />
          )}

          {!isQuote && !abortVisualization &&  (
            <EstimatioMatrixBottom
            activeCategory={activeCategory || null} 
            isSanitizeService={isSanitizeService}
            isYatch={isYachtSlug}
          />)}
        </div> */}
      </div>
    </section>
  );
}


export interface PropertySizeSelectorProps {
  value?: number;
  onChange?: (val: number) => void;
  isQuote?: boolean;
  theme?: "dark" | "light" | string;
  className?: string;
  activeCategory?: PropertyCategory | null;
  selectableCategories?: PropertyCategory[];
  onCategoryChange?: (category: PropertyCategory) => void;
}

export function PropertySizeSelector({
  value: controlledValue,
  onChange,
  isQuote = false,
  theme: themeProp = "dark",
  className = "",
  activeCategory = null,
  selectableCategories = [],
  onCategoryChange,
}: PropertySizeSelectorProps) {
  const isLight = themeProp === "light";
  const [internalValue, setInternalValue] = useState<number>(isQuote ? 20 : 225);
  const value = controlledValue !== undefined ? controlledValue : internalValue;

  const setValue = (newVal: number) => {
    if (controlledValue === undefined) {
      setInternalValue(newVal);
    }
    onChange?.(newVal);
  };

  const MIN_SIZE = 20;
  const MAX_SIZE = isQuote ? 500000 : 500;
  const SIZE_MILESTONES = isQuote
    ? [20, 1000, 25000, 100000, 250000, 500000]
    : [20, 50, 100, 200, 300, 500];

  function valueToSliderPercent(val: number, milestones: number[]): number {
    if (val <= milestones[0]) return 0;
    const n = milestones.length;
    if (val >= milestones[n - 1]) return 100;

    for (let i = 0; i < n - 1; i++) {
      const low = milestones[i];
      const high = milestones[i + 1];
      if (val >= low && val <= high) {
        const segmentFraction = (val - low) / (high - low);
        return ((i + segmentFraction) / (n - 1)) * 100;
      }
    }
    return 100;
  }

  function sliderPercentToValue(percent: number, milestones: number[], quoteMode: boolean): number {
    const p = Math.max(0, Math.min(100, percent));
    const n = milestones.length;
    if (p <= 0) return milestones[0];
    if (p >= 100) return milestones[n - 1];

    const totalSegments = n - 1;
    const pos = (p / 100) * totalSegments;
    const i = Math.min(Math.floor(pos), totalSegments - 1);
    const fraction = pos - i;
    const raw = milestones[i] + fraction * (milestones[i + 1] - milestones[i]);

    if (quoteMode) {
      if (raw < 100) {
        return Math.round(raw / 5) * 5;
      } else if (raw < 1000) {
        return Math.round(raw / 25) * 25;
      } else if (raw < 10000) {
        return Math.round(raw / 100) * 100;
      } else if (raw < 100000) {
        return Math.round(raw / 500) * 500;
      } else if (raw < 250000) {
        return Math.round(raw / 1000) * 1000;
      } else {
        return Math.round(raw / 2500) * 2500;
      }
    } else {
      if (raw < 100) {
        return Math.round(raw / 5) * 5;
      } else if (raw < 200) {
        return Math.round(raw / 10) * 10;
      } else {
        return Math.round(raw / 25) * 25;
      }
    }
  }

  const [sizeUnit, setSizeUnit] = useState<"m2" | "ft2">("m2");

  const sizeOptions = isQuote
    ? [20, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000, 500000]
    : activeCategory
      ? buildSizeOptions(activeCategory)
      : [value];

  const dropdownOptions = Array.from(
    new Set([
      ...sizeOptions.filter(
        (s, i) => isQuote || s % DROPDOWN_SIZE_STEP === 0 || i === 0 || i === sizeOptions.length - 1,
      ),
      value,
    ]),
  ).sort((a, b) => a - b);

  function getStepAmount(curr: number, isIncrease: boolean): number {
    if (!isQuote) {
      if (isIncrease) {
        if (curr < 100) return 5;
        if (curr < 200) return 10;
        return 25;
      } else {
        if (curr <= 100) return -5;
        if (curr <= 200) return -10;
        return -25;
      }
    }
    if (isIncrease) {
      if (curr < 100) return 5;
      if (curr < 1000) return 50;
      if (curr < 25000) return 500;
      if (curr < 100000) return 2500;
      return 10000;
    } else {
      if (curr <= 100) return -5;
      if (curr <= 1000) return -50;
      if (curr <= 25000) return -500;
      if (curr <= 100000) return -2500;
      return -10000;
    }
  }

  function handleStepChange(stepDelta?: number) {
    const delta = stepDelta !== undefined ? stepDelta : getStepAmount(value, true);
    const nextVal = Math.min(MAX_SIZE, Math.max(MIN_SIZE, value + delta));
    if (nextVal === value) return;

    if (!isQuote && selectableCategories.length > 0) {
      const direction = delta > 0 ? "up" : "down";
      const nextCat = findAppropriateCategory(nextVal, activeCategory?.id ?? null, selectableCategories, direction);
      if (nextCat && nextCat.id !== activeCategory?.id) {
        onCategoryChange?.(nextCat);
      }
    }
    setValue(nextVal);
  }

  function handleDirectSizeChange(newVal: number) {
    const clamped = Math.min(MAX_SIZE, Math.max(MIN_SIZE, newVal));
    if (clamped === value) return;

    if (!isQuote && selectableCategories.length > 0) {
      const direction = clamped > value ? "up" : "down";
      const nextCat = findAppropriateCategory(clamped, activeCategory?.id ?? null, selectableCategories, direction);
      if (nextCat && nextCat.id !== activeCategory?.id) {
        onCategoryChange?.(nextCat);
      }
    }
    setValue(clamped);
  }

  const wheelContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.deltaY > 0) handleStepChange(getStepAmount(value, true));
      else handleStepChange(getStepAmount(value, false));
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

  const { translate } = useLanguage();

  const bottomStep = isQuote
    ? value >= 10000 ? 5000 : value >= 1000 ? 500 : 50
    : 5;

  return (
    <div
      ref={wheelContainerRef}
      className={`flex flex-col w-full mt-8 rounded-[28px] p-6 sm:p-8 gap-6 shadow-2xl select-none border transition-all duration-300 ${isLight
        ? "bg-[#FBF9F4] border-[#C5A059]/30 text-[#1B2E4B]"
        : "bg-[#0c121e] border-white/5 text-slate-100"
        } ${className}`}
    >
      {/* Header: Title + Subtitle on Left, Unit Switcher Pill on Right */}
      <div className="flex items-start justify-between w-full gap-4">
        <div className="flex flex-col">
          <h3
            className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? "text-[#1B2E4B]" : "text-white"
              }`}
          >
            {translate("propSizeTitle") || "Property Size"}
          </h3>
          <p className={`text-xs sm:text-sm mt-1 ${isLight ? "text-gray-500" : "text-gray-400"}`}>
            Select the total size of your property
          </p>
        </div>

        {/* Unit Switcher Pill (m² / ft²) */}
        <div
          className={`p-1 rounded-full border flex items-center shrink-0 transition-colors ${isLight ? "bg-[#EDE7DA] border-[#C5A059]/20" : "bg-[#141b2a] border-white/5"
            }`}
        >
          <button
            type="button"
            onClick={() => setSizeUnit("m2")}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${sizeUnit === "m2"
              ? "bg-[#e5b842] text-black shadow-md"
              : isLight
                ? "text-gray-600 hover:text-black"
                : "text-gray-400 hover:text-white"
              }`}
          >
            m²
          </button>
          <button
            type="button"
            disabled
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all cursor-not-allowed ${sizeUnit === "ft2"
              ? "bg-[#e5b842] text-black shadow-md"
              : isLight
                ? "text-gray-600 hover:text-black"
                : "text-gray-400 hover:text-white"
              }`}
          >
            ft²
          </button>
        </div>
      </div>

      {/* Display & Quick-Control Card */}
      <div
        className={`w-full rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 border transition-colors ${isLight ? "bg-white border-[#C5A059]/25 shadow-sm" : "bg-[#111726] border-white/5"
          }`}
      >
        {/* Left: House Icon & Size Values */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
          <div
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(229,184,66,0.15)] border ${isLight ? "bg-[#F6EEDC] border-[#C5A059]/40" : "bg-[#182033] border-[#e5b842]/30"
              }`}
          >
            <Home className="w-6 h-6 sm:w-7 sm:h-7 text-[#e5b842]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span
              className={`text-2xl sm:text-3xl font-bold tracking-tight leading-none truncate ${isLight ? "text-[#1B2E4B]" : "text-white"
                }`}
            >
              {sizeUnit === "m2" ? `${value.toLocaleString()} m²` : `${formatFt2(value)} ft²`}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-[#e5b842] mt-1 truncate">
              {sizeUnit === "m2" ? `${formatFt2(value)} ft²` : `${value.toLocaleString()} m²`}
            </span>
          </div>
        </div>

        {/* Right: Minus Button, Size Dropdown Pill, Plus Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Minus button */}
          <button
            type="button"
            onClick={() => handleStepChange(getStepAmount(value, false))}
            disabled={value <= MIN_SIZE}
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-lg cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-md active:scale-95 ${isLight
              ? "bg-[#EDE7DA] hover:bg-[#dfd7c5] text-[#1B2E4B]"
              : "bg-[#1c2438] hover:bg-[#25304a] text-white"
              }`}
            aria-label="Decrease size"
          >
            <Minus className={`w-4 h-4 sm:w-5 sm:h-5 ${isLight ? "text-[#1B2E4B]" : "text-white"}`} />
          </button>

          {/* Size Pill with integrated select */}
          <div
            className={`relative rounded-xl border transition-colors ${isLight
              ? "border-[#C5A059]/30 bg-[#F4EFE6] hover:border-[#C5A059]/60"
              : "border-white/10 bg-[#161e31] hover:border-white/20"
              }`}
          >
            <select
              value={value}
              onChange={(e) => {
                const selectedVal = Number(e.target.value);
                handleDirectSizeChange(selectedVal);
              }}
              className={`appearance-none px-3.5 py-2 sm:py-2.5 font-semibold text-xs sm:text-sm bg-transparent cursor-pointer focus:outline-none pr-8 ${isLight ? "text-[#1B2E4B]" : "text-white"
                }`}
            >
              {dropdownOptions.map((val) => (
                <option
                  key={val}
                  value={val}
                  className={isLight ? "bg-[#FBF9F4] text-[#1B2E4B]" : "bg-[#111726] text-white"}
                >
                  {sizeUnit === "m2" ? `${val.toLocaleString()} m²` : `${formatFt2(val)} ft²`}
                </option>
              ))}
            </select>
            <ChevronDown
              className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 ${isLight ? "text-gray-500" : "text-gray-400"
                }`}
            />
          </div>

          {/* Plus button */}
          <button
            type="button"
            onClick={() => handleStepChange(getStepAmount(value, true))}
            disabled={value >= MAX_SIZE}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#e5b842] hover:bg-[#d4a732] text-black flex items-center justify-center font-bold text-lg cursor-pointer transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-[0_0_12px_rgba(229,184,66,0.35)] active:scale-95"
            aria-label="Increase size"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-black stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Slider Track and Milestones */}
      <div className="flex flex-col w-full px-1">
        {/* Interactive Slider Bar */}
        {(() => {
          const sliderPercent = valueToSliderPercent(value, SIZE_MILESTONES);
          return (
            <div
              className={`relative w-full h-1.5 rounded-full my-3 flex items-center ${isLight ? "bg-[#E5DFD3]" : "bg-[#1b2438]"
                }`}
            >
              {/* Active Gradient Track */}
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#e5b842] to-[#f5d061] rounded-full"
                style={{ width: `${sliderPercent}%` }}
              />

              {/* Glowing Thumb Handle */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-b from-[#fff8cb] via-[#e5b842] to-[#ab7c18] shadow-[0_0_20px_rgba(234,179,8,0.95),0_0_8px_rgba(255,255,255,0.8)] border border-white pointer-events-none transition-all duration-75"
                style={{ left: `${sliderPercent}%` }}
              />

              {/* Invisible Range Input for Full Touch/Mouse Interactivity */}
              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={sliderPercent}
                onChange={(e) => {
                  const nextVal = sliderPercentToValue(Number(e.target.value), SIZE_MILESTONES, isQuote);
                  handleDirectSizeChange(nextVal);
                }}
                className="absolute inset-0 w-full h-8 -top-3 opacity-0 cursor-pointer z-10"
                aria-label="Property size slider"
              />
            </div>
          );
        })()}

        {/* Milestone Indicators below Slider */}
        <div className="flex justify-between items-center w-full mt-3 select-none">
          {SIZE_MILESTONES.map((m, idx) => {
            const isFirst = idx === 0;
            const isLast = idx === SIZE_MILESTONES.length - 1;
            const isCurrent = value === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => handleDirectSizeChange(m)}
                className={`flex flex-col cursor-pointer transition-colors group ${isFirst
                  ? "items-start text-left"
                  : isLast
                    ? "items-end text-right"
                    : "items-center text-center"
                  }`}
              >
                <span
                  className={`text-xs sm:text-sm font-bold transition-colors ${isCurrent
                    ? isLight
                      ? "text-[#1B2E4B]"
                      : "text-white"
                    : isLight
                      ? "text-gray-500 group-hover:text-[#1B2E4B]"
                      : "text-gray-300 group-hover:text-white"
                    }`}
                >
                  {m.toLocaleString()} m²
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-semibold transition-colors mt-0.5 ${isCurrent
                    ? "text-[#e5b842]"
                    : isLight
                      ? "text-gray-400 group-hover:text-gray-600"
                      : "text-gray-500 group-hover:text-gray-400"
                    }`}
                >
                  {formatFt2(m)} ft²
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Buttons: Increase Size & Decrease Size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mt-1">
        {/* Increase Size Card */}
        <button
          type="button"
          onClick={() => handleStepChange(bottomStep)}
          disabled={value >= MAX_SIZE}
          className={`rounded-2xl border p-4 sm:p-5 flex items-center gap-3.5 transition-all text-left cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.98] ${isLight
            ? "bg-white border-[#C5A059]/25 hover:border-[#e5b842] shadow-sm"
            : "bg-[#111726] border-white/5 hover:border-[#e5b842]/40"
            }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#e5b842] group-hover:bg-[#e5b842] group-hover:text-black transition-colors shrink-0 ${isLight ? "bg-[#F6EEDC]" : "bg-[#1b2337]"
              }`}
          >
            <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm sm:text-base font-bold leading-tight ${isLight ? "text-[#1B2E4B]" : "text-white"
                }`}
            >
              {translate("propSizeUp" as TranslationKey) || "Increase Size"}
            </span>
            <span className={`text-xs mt-1 font-medium ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              + {bottomStep.toLocaleString()} m²
            </span>
          </div>
        </button>

        {/* Decrease Size Card */}
        <button
          type="button"
          onClick={() => handleStepChange(-bottomStep)}
          disabled={value <= MIN_SIZE}
          className={`rounded-2xl border p-4 sm:p-5 flex items-center gap-3.5 transition-all text-left cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed group active:scale-[0.98] ${isLight
            ? "bg-white border-[#C5A059]/25 hover:border-[#e5b842] shadow-sm"
            : "bg-[#111726] border-white/5 hover:border-[#e5b842]/40"
            }`}
        >
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[#e5b842] group-hover:bg-[#e5b842] group-hover:text-black transition-colors shrink-0 ${isLight ? "bg-[#F6EEDC]" : "bg-[#1b2337]"
              }`}
          >
            <ArrowDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span
              className={`text-sm sm:text-base font-bold leading-tight ${isLight ? "text-[#1B2E4B]" : "text-white"
                }`}
            >
              {translate("propSizeDown" as TranslationKey) || "Decrease Size"}
            </span>
            <span className={`text-xs mt-1 font-medium ${isLight ? "text-gray-500" : "text-gray-400"}`}>
              - {bottomStep.toLocaleString()} m²
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export function EstimatioMatrixBottom({
  activeCategory,
  isSanitizeService,
  isYatch,
  theme
}: {
  activeCategory: PropertyCategory | null,
  isSanitizeService?: boolean,
  isYatch?: boolean,
  theme?: string
}) {
  const { translate } = useLanguage();
  const isLight = theme === "light";

  return (
    <div className={`w-full rounded-2xl border border-[#C5A059]/40 p-4 md:p-6 shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25 relative overflow-hidden select-none font-mono transition-colors duration-300 ${isLight ? "bg-white text-slate-900" : "bg-[#030303] text-white"
      }`}>
      {/* Header Section */}
      <div className="mb-4 pb-3 border-b border-[#C5A059]/30">
        <h3 className={`text-base md:text-xl font-bold tracking-tight font-serif ${isLight ? "text-slate-900" : "text-white"}`}>
          Service Estimate
        </h3>
        <p className={`text-[11px] md:text-xs mt-0.5 font-sans ${isLight ? "text-slate-600" : "text-gray-400"}`}>
          Based on the selected property type and size
        </p>
      </div>

      {/* Grid Cards Container: 2 columns on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

        {/* Card 1: Property Scale / Target Area */}
        <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border 
        border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors
         duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
          }`}>
          <Maximize2 className="w-4 h-4 text-[#C5A059] mb-2" />
          <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
            PROPERTY SCALE
          </p>
          <p className={`text-xs md:text-base font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
            {surfaceMatrixes.serviceTargetArea}
          </p>
          {activeCategory && (
            <p className="text-[10px] text-[#D4AF37] mt-0.5 truncate max-w-full">
              {CATEGORY_LABEL_KEYS[activeCategory.label]
                ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey)
                : translate(activeCategory.label as TranslationKey)}
            </p>
          )}
        </div>

        {/* Card 2: Total Duration / Est Labor */}
        <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
          }`}>
          <Clock className="w-4 h-4 text-[#C5A059] mb-2" />
          <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
            {translate("EstLabor")}
          </p>
          <p className={`text-xs md:text-base font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
            {labourData}
          </p>
          <p className={`text-[10px] mt-0.5 ${isLight ? "text-slate-600" : "text-gray-400"}`}>Estimated</p>
        </div>

        {/* Card 3: Allocated Staff */}
        <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
          }`}>
          <Users className="w-4 h-4 text-[#C5A059] mb-2" />
          <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
            ALLOCATED STAFF
          </p>
          <p className={`text-sm md:text-lg font-bold tracking-wide ${isLight ? "text-slate-900" : "text-white"}`}>
            1
          </p>
          <p className="text-[9px] md:text-[10px] font-bold tracking-wider text-[#D4AF37] uppercase mt-0.5">
            SENIOR CLEANER
          </p>
        </div>

        {/* Card 4: On-Site Window / Estimated Cost */}
        <div className={`flex flex-col items-center justify-center p-3.5 md:p-4 rounded-xl border border-[#C5A059]/40 shadow-[inset_0_0_12px_rgba(197,160,89,0.1)] text-center transition-colors duration-300 ${isLight ? "bg-amber-100" : "bg-[#050505]"
          }`}>
          <Calendar className="w-4 h-4 text-[#C5A059] mb-2" />
          <p className="text-[10px] md:text-[11px] font-bold tracking-widest text-[#C5A059] uppercase mb-1">
            {translate("EstimatedCost")}
          </p>
          <p className="text-xs md:text-base font-bold text-[#D4AF37] tracking-wide">
            {surfaceMatrixes.costOFEstimation}
          </p>
          <p className={`text-[10px] mt-0.5 ${isLight ? "text-slate-600" : "text-gray-400"}`}>Price range</p>
        </div>

      </div>

      {/* Optional Service Badges */}
      {(isSanitizeService || isYatch) && (
        <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-[#C5A059]/20 text-[11px] font-medium text-emerald-400">
          {isSanitizeService && <span>✓ Included Full Sanitization</span>}
          {isYatch && <span>✓ Specialized Yacht Protocol</span>}
        </div>
      )}
    </div>
  );
}

//visualization of Yatches


export function YatchSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
  serviceCategory = "yatch-cleaning",
  isQuote,
  theme,
}: visualizationProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();

  const isLight = theme === "light";

  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  const formatFt2 = (m2: number) => Math.round(m2 * 10.7639).toLocaleString();
  const range = (min: string, max: string) => (min === max ? min : `${min} – ${max}`);
  const hasPrice = !!quote?.bookable && quote.priceMin != null && quote.priceMax != null;
  const estimatedCost = hasPrice ? range(`${symbol}${quote!.priceMin!.toFixed(2)}`, `${symbol}${quote!.priceMax!.toFixed(2)}`) : "—";

  const serviceRate = hasPrice && quote!.minHours
    ? `${symbol}${(quote!.priceMin! / quote!.minHours).toFixed(2)} ${translate("servicesRatePerCleanerHour")}`
    : "—";

  const hasHours = !!quote?.bookable && quote.minHours != null && quote.maxHours != null;

  const labor = hasHours
    ? `${range(String(quote!.minHours), String(quote!.maxHours))}h (${quote!.cleanerCount ?? 1} ${translate("CrewWord")})`
    : "—";

  labourData = labor;
  surfaceMatrixes.costOFEstimation = estimatedCost;

  return (
    <div
      className={`w-full rounded-t-2xl border-2 border-[#C5A059] p-4 sm:p-6 transition-colors duration-300 relative overflow-hidden select-none font-mono ${isLight
        ? "bg-[#FAF8F5] text-slate-900 shadow-[0_10px_35px_rgba(197,160,89,0.22)] ring-1 ring-[#C5A059]/30"
        : "bg-[#030303] text-white shadow-[0_6px_22px_rgba(197,160,89,0.25)] ring-1 ring-[#C5A059]/25"
        }`}
      style={{
        backgroundImage: isLight
          ? `
            linear-gradient(to right, rgba(197, 160, 89, 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.12) 1px, transparent 1px)
          `
          : `
            linear-gradient(to right, rgba(197, 160, 89, 0.07) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(197, 160, 89, 0.07) 1px, transparent 1px)
          `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Top Header & Blueprint Toggle */}
      <div className={`w-full flex flex-col sm:flex-row items-center justify-between pb-3 mb-4 gap-3 border-b ${isLight ? "border-[#C5A059]/30" : "border-[#C5A059]/40"
        }`}>
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-[#C5A059] rounded-full shadow-[0_0_12px_#C5A059]" />
          <div>
            <h3 className={`text-xs sm:text-sm font-bold tracking-widest uppercase ${isLight ? "text-[#8C6D2D]" : "text-[#E6D5B8]"
              }`}>
              VESSEL DECK PLAN TEMPLATES
            </h3>
            <p className={`text-[10px] tracking-wider ${isLight ? "text-[#A37F38]" : "text-[#C5A059]/80"
              }`}>
              {value} m² • {formatFt2(value)} ft² | GRID DIMENSIONS: {span}m × {depth}m
            </p>
          </div>
        </div>
      </div>

      {/* Main Architectural SVG Blueprint Stage with Enhanced Golden Dotted Matrix */}
      <div className={`relative w-full border-2 border-[#C5A059] rounded-xl p-2 sm:p-4 overflow-hidden flex items-center justify-center transition-all duration-300 ${isLight
        ? "bg-white/90 backdrop-blur-md shadow-[inset_0_0_20px_rgba(197,160,89,0.2),0_10px_35px_rgba(197,160,89,0.35)] ring-2 ring-[#C5A059]/30"
        : "bg-[#050505]/95 backdrop-blur-sm shadow-[inset_0_0_25px_rgba(197,160,89,0.25),0_8px_25px_rgba(197,160,89,0.3)]"
        }`}>
        {serviceCategory === "yatch-cleaning" ? (
          /* ================= LUXURY YACHT ARCHITECTURE ================= */
          <svg viewBox="-20 -20 1040 680" className="w-full h-auto max-h-[460px] drop-shadow-[0_0_18px_rgba(197,160,89,0.4)]">
            <defs>
              <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.6" fill="#C5A059" opacity={isLight ? "0.75" : "0.65"} />
              </pattern>
            </defs>

            {/* Background Dotted Matrix Fill with Richer Presence */}
            <rect x="0" y="0" width="1000" height="640" rx="12" fill="url(#dotGrid)" />

            {/* Blueprint Outer Frame & Title Label */}
            <rect x="0" y="0" width="1000" height="640" rx="12" fill="none" stroke="#C5A059" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.85" />
            <text x="500" y="28" fill={isLight ? "#7A5C20" : "#FFF3D6"} fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              LUXURY YACHT - UPPER DECK
            </text>

            {/* Hull Outer Contour */}
            <path
              d="M 100 60 L 880 60 C 950 60, 990 120, 990 190 C 990 260, 950 320, 880 320 L 100 320 C 50 320, 30 260, 30 190 C 30 120, 50 60, 100 60 Z"
              fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.08)"}
              stroke="#C5A059"
              strokeWidth="4"
              strokeDasharray="5 3"
            />

            {/* Internal Compartment Walls & Bulkheads */}
            <g stroke="#C5A059" strokeWidth="2.8" fill="none" strokeDasharray="4 2">
              <line x1="320" y1="60" x2="320" y2="320" />
              <line x1="680" y1="60" x2="680" y2="320" />
              <line x1="320" y1="190" x2="680" y2="190" />
              <rect x="360" y="80" width="140" height="100" rx="4" strokeDasharray="3 2" />
              <rect x="520" y="80" width="130" height="100" rx="4" />
              <rect x="730" y="90" width="190" height="90" rx="8" />
            </g>

            {/* Aft Deck Lower Extension */}
            <path
              d="M 160 320 L 840 320 L 860 520 L 140 520 Z"
              fill={isLight ? "rgba(197, 160, 89, 0.15)" : "rgba(197, 160, 89, 0.1)"}
              stroke="#C5A059"
              strokeWidth="4"
              strokeDasharray="5 3"
            />
            <g stroke="#C5A059" strokeWidth="2.8" fill="none" strokeDasharray="4 2">
              <line x1="360" y1="320" x2="360" y2="520" />
              <line x1="640" y1="320" x2="640" y2="520" />
              <rect x="180" y="360" width="140" height="120" rx="6" />
              <rect x="680" y="360" width="140" height="120" rx="6" />
              <rect x="390" y="400" width="220" height="90" rx="6" />
            </g>

            {/* Detailed Furniture & Fixture Symbols */}
            <g stroke="#C5A059" strokeWidth="1.8" fill="none" opacity="0.95" strokeDasharray="3 2">
              <rect x="120" y="80" width="90" height="70" rx="4" />
              <circle cx="150" cy="115" r="12" />
              <line x1="240" y1="80" x2="290" y2="180" strokeDasharray="2 2" />
              <path d="M 380 220 L 520 220 L 520 290 L 380 290 Z" />
              <rect x="425" y="240" width="50" height="30" rx="3" />
              <rect x="750" y="110" width="110" height="50" rx="4" />
              <rect x="770" y="85" width="20" height="15" />
              <rect x="810" y="85" width="20" height="15" />
              <rect x="450" y="430" width="100" height="40" rx="4" />
            </g>

            {/* Compartment Labels */}
            <g fontFamily="monospace" textAnchor="middle">
              <text x="170" y="220" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">MASTER SUITE</text>
              <text x="170" y="240" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="11">{(value * 0.28).toFixed(1)} m²</text>

              <text x="500" y="140" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">WALK-IN CLOSET</text>

              <text x="825" y="140" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">PRIVATE LOUNGE</text>

              <text x="500" y="215" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold">MAIN SALOON</text>
              <text x="500" y="235" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="12">{(value * 0.32).toFixed(1)} m²</text>

              <text x="735" y="235" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">GALLEY</text>

              <text x="250" y="420" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">GUEST SUITE</text>
              <text x="750" y="420" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="14" fontWeight="bold">GUEST SUITE</text>

              <text x="500" y="375" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="16" fontWeight="bold">AFT DECK</text>
              <text x="500" y="395" fill={isLight ? "#9E7A32" : "#C5A059"} fontSize="13">{(value * 0.22).toFixed(1)} m²</text>
            </g>
          </svg>
        ) : (
          /* ================= PASSENGER SHIP ARCHITECTURE ================= */
          <svg viewBox="-20 -20 1040 680" className="w-full h-auto max-h-[460px] drop-shadow-[0_0_18px_rgba(197,160,89,0.4)]">
            <defs>
              <pattern id="dotGrid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="3" cy="3" r="1.6" fill="#C5A059" opacity={isLight ? "0.75" : "0.65"} />
              </pattern>
            </defs>

            {/* Background Dotted Matrix Fill with Richer Presence */}
            <rect x="0" y="0" width="1000" height="640" rx="12" fill="url(#dotGrid)" />

            <rect x="0" y="0" width="1000" height="640" rx="12" fill="none" stroke="#C5A059" strokeWidth="3.5" strokeDasharray="6 4" opacity="0.85" />
            <text x="500" y="28" fill={isLight ? "#7A5C20" : "#FFF3D6"} fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              PASSENGER SHIP - PROMENADE DECK
            </text>

            <rect x="60" y="50" width="880" height="160" rx="80" fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.08)"} stroke="#C5A059" strokeWidth="4" strokeDasharray="5 3" />
            <rect x="60" y="240" width="880" height="160" rx="80" fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.08)"} stroke="#C5A059" strokeWidth="4" strokeDasharray="5 3" />
            <rect x="60" y="430" width="880" height="160" rx="80" fill={isLight ? "rgba(197, 160, 89, 0.12)" : "rgba(197, 160, 89, 0.08)"} stroke="#C5A059" strokeWidth="4" strokeDasharray="5 3" />

            <g stroke="#C5A059" strokeWidth="2.5" fill="none" strokeDasharray="4 2">
              <line x1="350" y1="50" x2="350" y2="210" />
              <line x1="680" y1="50" x2="680" y2="210" />
              <line x1="350" y1="240" x2="350" y2="400" />
              <line x1="680" y1="240" x2="680" y2="400" />
              <line x1="350" y1="430" x2="350" y2="590" />
              <line x1="680" y1="430" x2="680" y2="590" />
            </g>

            <g stroke="#C5A059" strokeWidth="1.5" fill="none" opacity="0.95" strokeDasharray="3 2">
              <circle cx="120" cy="90" r="12" />
              <circle cx="160" cy="90" r="12" />
              <circle cx="120" cy="130" r="12" />
              <circle cx="160" cy="130" r="12" />

              <circle cx="820" cy="90" r="12" />
              <circle cx="860" cy="90" r="12" />
              <circle cx="820" cy="130" r="12" />
              <circle cx="860" cy="130" r="12" />

              <line x1="100" y1="270" x2="280" y2="270" />
              <line x1="100" y1="290" x2="280" y2="290" />
              <line x1="100" y1="310" x2="280" y2="310" />
              <line x1="100" y1="330" x2="280" y2="330" />
              <line x1="100" y1="350" x2="280" y2="350" />
              <line x1="100" y1="370" x2="280" y2="370" />

              <rect x="480" y="270" width="40" height="100" rx="4" />
              <line x1="480" y1="300" x2="520" y2="300" />
              <line x1="480" y1="340" x2="520" y2="340" />

              <circle cx="150" cy="490" r="18" />
              <circle cx="210" cy="490" r="18" />
              <rect x="750" y="470" width="120" height="80" rx="6" />
            </g>

            <g fontFamily="monospace" textAnchor="middle">
              <text x="200" y="130" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">RESTAURANT</text>
              <text x="515" y="120" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">PASSAGES & CORRIDORS</text>
              <text x="800" y="130" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">RESTAURANT</text>

              <text x="190" y="325" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold">THEATER</text>
              <text x="500" y="325" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold">ATRIUM</text>
              <text x="800" y="325" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="15" fontWeight="bold">LUXURY SUITES</text>

              <text x="200" y="520" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">CASINO LOUNGE</text>
              <text x="515" y="520" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">CASINO & GAMING</text>
              <text x="810" y="520" fill={isLight ? "#594211" : "#FFF3D6"} fontSize="13" fontWeight="bold">PASSENGER LOUNGE</text>
            </g>
          </svg>
        )}
      </div>

      {/* Bottom Estimation Summary Bar */}
      {!isQuote && (
        <div className={`grid grid-cols-3 gap-2 sm:gap-4 pt-3 mt-4 border-t text-center ${isLight ? "border-[#C5A059]/30" : "border-[#C5A059]/40"
          }`}>
          <div>
            <p className={`text-[11px] font-medium mb-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              {translate("EstimatedCost")}
            </p>
            <p className={`text-xs sm:text-base font-bold ${isLight ? "text-[#8C6D2D]" : "text-[#C5A059]"}`}>
              {estimatedCost}
            </p>
          </div>
          <div>
            <p className={`text-[11px] font-medium mb-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
              {translate("ServiceRate")}
            </p>
            <p className={`text-xs sm:text-base font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
              {serviceRate}
            </p>
          </div>
          <div>
            <div>
              <p className={`text-[11px] sm:text-xs font-medium mb-0.5 ${isLight ? "text-slate-500" : "text-gray-400"}`}>
                {translate("EstLabor")}
              </p>
              <p className={`text-[10px] sm:text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>
                {labor}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
//Quotation matrix flow with 


export const PoolBlueprintDiagram = () => {
  return (
    <div
      className="w-full rounded-2xl bg-[#070D1B] border border-cyan-500/40 p-4 sm:p-8 shadow-2xl relative overflow-hidden select-none font-mono flex justify-center"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 180, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 180, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Main Architectural SVG Blueprint Stage */}
      <div className="relative w-full max-w-5xl bg-[#050914] border border-cyan-500/40 rounded-xl p-2 sm:p-4 shadow-inner flex items-center justify-center overflow-x-auto">

        <svg
          viewBox="-80 -60 1160 760"
          className="w-full h-auto max-h-[600px] drop-shadow-[0_0_16px_rgba(0,210,255,0.25)]"
        >
          {/* ================= DIMENSION LINES & LABELS ================= */}
          <g stroke="#00e1ff" strokeWidth="1.5" fill="none" opacity="0.85">
            {/* Top Span Width Dimension */}
            <path d="M 20 -25 L 20 -40 L 490 -40 L 510 -40 L 980 -40 L 980 -25" />
            <path d="M 20 -40 L 30 -35 M 20 -40 L 30 -45" fill="#00e1ff" />
            <path d="M 980 -40 L 970 -35 M 980 -40 L 970 -45" fill="#00e1ff" />

            {/* Left Depth Dimension */}
            <path d="M -25 20 L -40 20 L -40 310 L -40 600 L -25 600" />
            <path d="M -40 20 L -35 30 M -40 20 L -45 30" fill="#00e1ff" />
            <path d="M -40 600 L -35 590 M -40 600 L -45 590" fill="#00e1ff" />
          </g>

          {/* Dimension Text Labels */}
          <g fontFamily="monospace" fontSize="13" fill="#67e8f9" letterSpacing="2" textAnchor="middle">
            <text x="500" y="-30" dominantBaseline="central">15.0 m SPAN WIDTH</text>
            <text x="-50" y="320" transform="rotate(-90, -40, 310)" dominantBaseline="central">10.0 m DEPTH</text>
          </g>

          {/* Blueprint Outer Frame */}
          <rect
            x="20"
            y="20"
            width="960"
            height="580"
            rx="8"
            fill="rgba(0, 160, 255, 0.03)"
            stroke="#00e1ff"
            strokeWidth="3.5"
            opacity="0.9"
          />

          {/* Grid lines inside blueprint */}
          <g stroke="rgba(0, 225, 255, 0.1)" strokeWidth="1">
            {Array.from({ length: 19 }).map((_, i) => (
              <line key={`v-${i}`} x1={(i + 1) * 50} y1="20" x2={(i + 1) * 50} y2="600" />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line key={`h-${i}`} x1="20" y1={(i + 1) * 50} x2="980" y2={(i + 1) * 50} />
            ))}
          </g>

          {/* ================= MAIN ZONES & WALLS ================= */}
          <g stroke="#00b4ff" strokeWidth="3" fill="none">
            {/* Horizontal dividing line under Pool */}
            <line x1="20" y1="280" x2="620" y2="280" />

            {/* Vertical dividing line between main area & Right Service Block */}
            <line x1="620" y1="20" x2="620" y2="600" />

            {/* Cedar Sauna boundaries (Top Right) */}
            <line x1="740" y1="20" x2="740" y2="200" />
            <line x1="740" y1="200" x2="980" y2="200" />

            {/* Steam Room boundaries (Middle Right) */}
            <line x1="800" y1="200" x2="800" y2="420" />
            <line x1="800" y1="420" x2="980" y2="420" />

            {/* Change & Showers lower boundary */}
            <line x1="620" y1="480" x2="980" y2="480" />
          </g>

          {/* ================= INFINITE POOL ================= */}
          <g>
            <rect
              x="40"
              y="40"
              width="540"
              height="220"
              fill="rgba(0, 180, 255, 0.08)"
              stroke="#00f0ff"
              strokeWidth="2.5"
            />
            {/* Pool steps graphic */}
            <line x1="510" y1="40" x2="510" y2="260" stroke="#00e1ff" strokeWidth="1.5" />
            <line x1="530" y1="40" x2="530" y2="260" stroke="#00e1ff" strokeWidth="1.5" strokeDasharray="4 2" />
            <line x1="550" y1="40" x2="550" y2="260" stroke="#00e1ff" strokeWidth="1.5" strokeDasharray="4 2" />

            {/* Integrated Pool Jet Circle */}
            <circle cx="560" cy="150" r="50" fill="#041e3a" stroke="#00f0ff" strokeWidth="2.5" />
            <circle cx="560" cy="150" r="38" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="560" cy="150" r="26" fill="none" stroke="#00f0ff" strokeWidth="1" />
          </g>

          {/* ================= JACUZZI (Bottom Left) ================= */}
          <g>
            <path
              d="M 40 400 L 260 400 L 260 600 L 40 600 Z"
              fill="rgba(0, 180, 255, 0.05)"
              stroke="#00b4ff"
              strokeWidth="2"
            />
            <circle cx="150" cy="500" r="75" fill="#041a30" stroke="#00f0ff" strokeWidth="3" />
            <rect
              x="100"
              y="450"
              width="100"
              height="100"
              rx="25"
              fill="rgba(0, 240, 255, 0.12)"
              stroke="#38bdf8"
              strokeWidth="2"
            />
            <circle cx="115" cy="465" r="3" fill="#67e8f9" />
            <circle cx="185" cy="465" r="3" fill="#67e8f9" />
            <circle cx="115" cy="535" r="3" fill="#67e8f9" />
            <circle cx="185" cy="535" r="3" fill="#67e8f9" />
          </g>

          {/* ================= LOUNGE AREA SOFA ================= */}
          <g stroke="#38bdf8" strokeWidth="2" fill="rgba(0, 180, 255, 0.1)">
            <rect x="390" y="525" width="150" height="45" rx="6" />
            <line x1="440" y1="525" x2="440" y2="570" stroke="#00b4ff" strokeWidth="1.5" />
            <line x1="490" y1="525" x2="490" y2="570" stroke="#00b4ff" strokeWidth="1.5" />
            <rect x="420" y="490" width="90" height="20" rx="4" fill="none" stroke="#67e8f9" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>

          {/* ================= CEDAR SAUNA BENCHES ================= */}
          <g stroke="#38bdf8" strokeWidth="1.5" fill="none">
            <rect x="870" y="35" width="85" height="150" rx="2" />
            <line x1="900" y1="35" x2="900" y2="185" />
            <line x1="930" y1="35" x2="930" y2="185" />
          </g>

          {/* ================= DOORS & ARCS ================= */}
          <g stroke="#67e8f9" strokeWidth="1.5" fill="none">
            <path d="M 740 200 A 35 35 0 0 1 775 165" strokeDasharray="3 2" />
            <line x1="740" y1="200" x2="740" y2="165" />

            <path d="M 800 300 A 35 35 0 0 1 765 335" strokeDasharray="3 2" />
            <line x1="800" y1="300" x2="765" y2="300" />

            <path d="M 620 330 A 35 35 0 0 1 655 365" strokeDasharray="3 2" />
            <line x1="620" y1="330" x2="655" y2="330" />

            <path d="M 800 480 A 35 35 0 0 1 835 515" strokeDasharray="3 2" />
            <line x1="800" y1="480" x2="835" y2="480" />
          </g>

          {/* ================= FIXTURES ================= */}
          <g stroke="#38bdf8" strokeWidth="1.5" fill="none">
            <circle cx="715" cy="545" r="7" fill="rgba(56, 189, 248, 0.2)" />
            <line x1="715" y1="545" x2="700" y2="560" strokeDasharray="2 2" />
            <line x1="715" y1="545" x2="695" y2="545" strokeDasharray="2 2" />
            <line x1="715" y1="545" x2="700" y2="530" strokeDasharray="2 2" />

            <rect x="710" y="435" width="30" height="22" rx="4" />
            <circle cx="725" cy="446" r="3" />

            <rect x="635" y="535" width="28" height="18" rx="3" />
            <path d="M 640 553 C 640 570, 658 570, 658 553 Z" />
          </g>

          {/* ================= LABELS ================= */}
          <g fontFamily="monospace" textAnchor="middle">
            <text x="300" y="135" fill="#e0f2fe" fontSize="17" fontWeight="bold" letterSpacing="3">INFINITE POOL</text>
            <text x="860" y="105" fill="#e0f2fe" fontSize="13" fontWeight="bold" letterSpacing="1">CEDAR SAUNA</text>
            <text x="150" y="375" fill="#e0f2fe" fontSize="14" fontWeight="bold" letterSpacing="2">JACUZZI</text>
            <text x="465" y="455" fill="#e0f2fe" fontSize="16" fontWeight="bold" letterSpacing="2">LOUNGE AREA</text>
            <text x="890" y="305" fill="#e0f2fe" fontSize="13" fontWeight="bold" letterSpacing="1">STEAM ROOM</text>
            <text x="710" y="360" fill="#e0f2fe" fontSize="12" fontWeight="bold" letterSpacing="1">CHANGE & SHOWERS</text>
            <text x="870" y="535" fill="#e0f2fe" fontSize="12" fontWeight="bold" letterSpacing="1">OUTDOOR SHOWER</text>
          </g>
        </svg>

      </div>
    </div>
  );
};

