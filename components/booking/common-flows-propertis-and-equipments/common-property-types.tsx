"use client";

import { useEffect, useState, useRef } from "react";
import { Check, ChevronDown, Sparkles } from "lucide-react";
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
  "Guest-Ready":"propGuestReady",
  "Booking.com":"propBookingCom",
  "Hotels":"propHotels",
  "Serviced Apartments":"propServicedApartments",
  "Guesthouses":"propGuesthouses",
  "Holiday Rentals":"propHolidayRentals",
  "Property Managers":"propPropertyManagers",
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
  icon: string;
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

const SANITIZE_OTHER_PROPERTY_CATEGORY: PropertyCategory = {
  id: "other",
  label: "propOther",
  icon: "📐",
  min: 20,
  max: 500,
  step: 1,
  locked: false,
};

const SANITIZE_RESIDENTIAL_CATEGORYIES: PropertyCategory[] = [
  { id: "studio", label: "propStudio", icon: "🏢", min: 20, max: 40, step: 1, locked: false },
  { id: "apartment", label: "propApartment", icon: "🏬", min: 45, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: "🏘️", min: 90, max: 220, step: 1, locked: false },
  { id: "home", label: "propHome", icon: "🏡", min: 100, max: 350, step: 1, locked: false },
  { id: "penthouse", label: "propPenthouse", icon: "🏙️", min: 120, max: 400, step: 1, locked: false },
  { id: "luxury-villa", label: "propLuxuryVilla", icon: "🏰", min: 200, max: 500, step: 1, locked: false },
  { ...SANITIZE_OTHER_PROPERTY_CATEGORY }
];

const SANITIZE_INDUSTRIAL_CATEGORYIES: PropertyCategory[] = [
  { id: "offices", label: "propOffices", icon: "💼", min: 50, max: 500, step: 1, locked: false },
  { id: "warehouses", label: "propWarehouses", icon: "🏭", min: 200, max: 500, step: 1, locked: false },
  { id: "factories", label: "propFactories", icon: "🏗️", min: 250, max: 500, step: 1, locked: false },
  { id: "healthcare", label: "propHealthcare", icon: "🏥", min: 50, max: 500, step: 1, locked: false },
  { id: "hotels", label: "propHotels", icon: "🏨", min: 250, max: 500, step: 1, locked: false },
  { id: "restaurants", label: "propRestaurants", icon: "🍽️", min: 60, max: 300, step: 1, locked: false },
  { id: "schools", label: "propSchools", icon: "🏫", min: 300, max: 500, step: 1, locked: false },
  { id: "retail", label: "propRetail", icon: "🛍️", min: 25, max: 500, step: 1, locked: false },
  { id: "transport", label: "propTransport", icon: "🚌", min: 100, max: 500, step: 1, locked: false },
  { id: "construction-sites", label: "propConstructionSites", icon: "🚧", min: 100, max: 500, step: 1, locked: false },
  { id: "otheri", label: "propOther", icon: "📦", min: 20, max: 500, step: 1, locked: false }
];


/**categories for service of Yatch
 * Types are yatch claening and Passenger Ship Cleaning
 * 
 */
//service=>luxury-yacht-cleaning,display two categoies as "yatch-cleaning","passenger-ship-cleaning"
const YACHT_CLEANING_CATEGORIES: PropertyCategory[] = [
  { id: "small-yacht", label: "propSmallYacht", icon: "🚤", min: 20, max: 500, step: 5, locked: false },
  { id: "motor-yacht", label: "propMotorYacht", icon: "🛥️", min: 20, max: 500, step: 5, locked: false },
  { id: "sailing-yacht", label: "propSailingYacht", icon: "⛵", min: 20, max: 500, step: 5, locked: false },
  { id: "luxury-superyacht", label: "propLuxurySuperyacht", icon: "🛥️", min: 20, max: 500, step: 5, locked: false },
  { id: "mega-yacht", label: "propMegaYacht", icon: "🛳️", min: 20, max: 500, step: 5, locked: false },
];
const PASSENGER_SHIP_CLEANING_CATEGORIES: PropertyCategory[] = [
  { id: "cruise-ships", label: "propCruiseShips", icon: "🛳️", min: 20, max: 500, step: 5, locked: false },
  { id: "passenger-ferries", label: "propPassengerFerries", icon: "🚢", min: 20, max: 500, step: 5, locked: false },
  { id: "river-cruise-ships", label: "propRiverCruiseShips", icon: "🛳️", min: 20, max: 500, step: 5, locked: false },
  { id: "expedition-ships", label: "propExpeditionShips", icon: "🚢", min: 20, max: 500, step: 5, locked: false },
  { id: "commercial-cargo-ships", label: "propCommercialCargoShips", icon: "🚢", min: 20, max: 500, step: 5, locked: false },
];


/**Post event cleaning categories
 * PRIVATE_SOCIAL_EVENTS and VIP & Corporate Events
 */
//service=>post-event-cleaning,display two categoies as "private-social-events","vip-coporate-events"
const PRIVATE_SOCIAL_EVENTS: PropertyCategory[] = [
  {
    id: "birthday-parties",
    label: "birthday_parties",
    icon: "🎈",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "wedding-events",
    label: "wedding_events",
    icon: "💒",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "anniversary-events",
    label: "anniversary_events",
    icon: "🥂",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "engagement-parties",
    label: "engagement_parties",
    icon: "💍",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "family-celebrations",
    label: "family_celebrations",
    icon: "👨‍👩‍👧‍👦",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "graduation-parties",
    label: "graduation_parties",
    icon: "🎓",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "dinner-parties",
    label: "dinner_parties",
    icon: "🍽️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "holiday-parties",
    label: "holiday_parties",
    icon: "🎄",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "private-gatherings",
    label: "private_gatherings",
    icon: "🍸",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "luxury-parties",
    label: "luxury_parties",
    icon: "✨",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];

const VIP_AND_COPORATE_EVENTS: PropertyCategory[] = [
  {
    id: "vip-events",
    label: "vip_events",
    icon: "🌟",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "executive-events",
    label: "executive_events",
    icon: "👔",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "corporate-events",
    label: "corporate_events",
    icon: "💼",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "gala-events",
    label: "gala_events",
    icon: "🎭",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "red-carpet-events",
    label: "red_carpet_events",
    icon: "🎟️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "product-launches",
    label: "product_launches",
    icon: "🚀",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "award-ceremonies",
    label: "award_ceremonies",
    icon: "🏆",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "conference-events",
    label: "conference_events",
    icon: "📊",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "charity-events",
    label: "charity_events",
    icon: "🤝",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "high-profile-events",
    label: "high_profile_events",
    icon: "👑",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];

/**Commercial & Office Cleaning Services,
 * Commercial Cleaning
    Office Cleaning
 */

//service= commercial-office-cleaning,display two categoies as "commercial-cleaning","office-cleaning"
const COMMERCIAL_AND_OFFICE_CLEANING_CATEGORIES: PropertyCategory[] = [
  {
    id: "commercial-cleaning",
    label: "commercial_cleaning",
    icon: "🏢",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "high-security-cleaning",
    label: "high_security_cleaning",
    icon: "🔐",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "industrial-cleaning",
    label: "industrial_cleaning",
    icon: "🏭",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "medical-cleaning",
    label: "medical_cleaning",
    icon: "🏥",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "post-construction-cleaning",
    label: "post_construction_cleaning",
    icon: "🏗️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "deep-cleaning",
    label: "deep_cleaning",
    icon: "✨",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "emergency-cleaning",
    label: "emergency_cleaning",
    icon: "🚨",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "event-cleaning",
    label: "event_cleaning",
    icon: "🧹",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];

const OFFICE_CLEANING_CATEGORIES: PropertyCategory[] = [
  {
    id: "office-cleaning",
    label: "office_cleaning",
    icon: "🗄️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "corporate-cleaning",
    label: "corporate_cleaning",
    icon: "🏢",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "executive-office-cleaning",
    label: "executive_office_cleaning",
    icon: "👔",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "reception-cleaning",
    label: "reception_cleaning",
    icon: "🛎️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "meeting-room-cleaning",
    label: "meeting_room_cleaning",
    icon: "📊",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "floor-cleaning",
    label: "floor_cleaning",
    icon: "🧹",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "washroom-cleaning",
    label: "washroom_cleaning",
    icon: "🧻",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "after-hours-cleaning",
    label: "after_hours_cleaning",
    icon: "🌙",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];


/**
 * High-Security Property Care
 *  Residential
    Commercial & Office
 */

// service=>high-security-property-care,display two categoies as "security-residential","security-office-cleaning"
const HIGH_SECURITY_RESIDENTIAL_CATEGORIES: PropertyCategory[] = [
  {
    id: "vip-home-cleaning",
    label: "vip_home_cleaning",
    icon: "🏡",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "secure-home-cleaning",
    label: "secure_home_cleaning",
    icon: "🛡️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "luxury-property-care",
    label: "luxury_property_care",
    icon: "🏰",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "private-estate-cleaning",
    label: "private_estate_cleaning",
    icon: "🌳",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "emergency-home-cleaning",
    label: "emergency_home_cleaning",
    icon: "⚡",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "residential-restoration",
    label: "residential_restoration",
    icon: "🔨",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];

const HIGH_SECURITY_COMMERCIAL_CATEGORIES: PropertyCategory[] = [
  {
    id: "security-cleaning",
    label: "security_cleaning",
    icon: "🔒",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "high-security-cleaning",
    label: "high_security_cleaning", 
    icon: "🛡️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "scif-cleaning",
    label: "scif_cleaning",
    icon: "🏢",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "medical-sanitation",
    label: "medical_sanitation",
    icon: "🏥",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "post-construction-cleaning",
    label: "post_construction_cleaning",
    icon: "🏗️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "hazmat-biohazard",
    label: "hazmat_biohazard",
    icon: "⚠️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "incident-restoration",
    label: "incident_restoration",
    icon: "🛠️",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "event-rapid-cleaning",
    label: "event_rapid_cleaning",
    icon: "⚡",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "industrial-cleaning",
    label: "industrial_cleaning",
    icon: "🏭",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  },
  {
    id: "executive-facility-care",
    label: "executive_facility_care",
    icon: "🏢",
    min: 20,
    max: 500,
    step: 1,
    locked: false
  }
];


const PREMIUM_RENTAL_PRIVATE_PROPERTY:PropertyCategory[]=[
  { id: "studio", label: "propStudio", icon: "🏢", min: 20, max: 40, step: 1, locked: false },
  { id: "apartment", label: "propApartment", icon: "🏠", min: 45, max: 120, step: 1, locked: false },
  { id: "townhouse", label: "propTownhouse", icon: "🏘️", min: 90, max: 220, step: 1, locked: false },
  { id: "home", label: "propHome", icon: "🏡", min: 100, max: 350, step: 1, locked: false },
  { id: "penthouse", label: "propPenthouse", icon: "🌇", min: 120, max: 400, step: 1, locked: false },
  { id: "villa", label: "propVilla", icon: "🏰", min: 200, max: 500, step: 1, locked: false },
  { id: "holiday-home", label: "propHolidayHome", icon: "🌴", min: 60, max: 400, step: 1, locked: false },
  { id: "second-home", label: "propSecondHome", icon: "🔑", min: 45, max: 400, step: 1, locked: false },
]

const PREMIUM_RENTAL_MANAGEMENT_PROPERTY:PropertyCategory[]=[
  { id: "airbnb", label: "propAirbnb", icon: "🛎️", min: 200, max: 500, step: 1, locked: false },
  { id: "guest_ready", label: "propGuestReady", icon: "🛏️", min: 200, max: 500, step: 1, locked: false },
  { id: "booking_com", label: "propBookingCom", icon: "📅", min: 200, max: 500, step: 1, locked: false },
  { id: "hotels", label: "propHotels", icon: "🏨", min: 200, max: 500, step: 1, locked: false },
  { id: "serviced_apartments", label: "propServicedApartments", icon: "🏢", min: 200, max: 500, step: 1, locked: false },
  { id: "guesthouses", label: "propGuesthouses", icon: "🏡", min: 200, max: 500, step: 1, locked: false },
  { id: "holiday_rentals", label: "propHolidayRentals", icon: "🌍", min: 200, max: 500, step: 1, locked: false },
  { id: "property_managers", label: "propPropertyManagers", icon: "🏗️", min: 200, max: 500, step: 1, locked: false },
]

export interface ServiceCategoryTab {
  id: string;
  label: string;
  translationKey?: TranslationKey;
  icon: string;
  categories: PropertyCategory[];
}

export const DEFAULT_CATEGORY_TABS: [ServiceCategoryTab, ServiceCategoryTab] = [
  {
    id: "residential",
    label: "Residential",
    translationKey: "propCatResidential",
    icon: "🏠",
    categories: SANITIZE_RESIDENTIAL_CATEGORYIES,
  },
  {
    id: "industrial",
    label: "Industrial",
    translationKey: "propCatIndustrial",
    icon: "🏭",
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
  "premium-rental-concierge-cleaning":[
    {
      id: "residential",
      label: "premiumRentalPrivateProperty",
      icon: "🏠",
      categories: PREMIUM_RENTAL_PRIVATE_PROPERTY,
    },
    {
      id: "industrial",
      label: "premiumRentalManagementProperty",
      icon: "🏢",
      categories: PREMIUM_RENTAL_MANAGEMENT_PROPERTY,
    }
  ],
  "post-event-cleaning": [
    {
      id: "residential",
      label: "Residential",
      translationKey: "propCatResidential",
      icon: "🏠",
      categories: PRIVATE_SOCIAL_EVENTS,
    },
    {
      id: "industrial",
      label: "Industrial",
      translationKey: "propCatIndustrial",
      icon: "🏭",
      categories: VIP_AND_COPORATE_EVENTS,
    },
  ],
  "commercial-office-cleaning": [
    {
      id: "residential",
      label: "Residential",
      translationKey: "propCatResidential",
      icon: "🏠",
      categories: COMMERCIAL_AND_OFFICE_CLEANING_CATEGORIES,
    },
    {
      id: "industrial",
      label: "Industrial",
      translationKey: "propCatIndustrial",
      icon: "🏭",
      categories: OFFICE_CLEANING_CATEGORIES,
    },
  ],
  "high-security-property-care": [
    {
      id: "residential",
      label: "Residential",
      translationKey: "propCatResidential",
      icon: "🏠",
      categories: HIGH_SECURITY_RESIDENTIAL_CATEGORIES,
    },
    {
      id: "industrial",
      label: "Industrial",
      translationKey: "propCatIndustrial",
      icon: "🏭",
      categories: HIGH_SECURITY_COMMERCIAL_CATEGORIES,
    },
  ],
};

/** Translation key for a Service Category tab id (e.g. "yatch-cleaning" -> "yachtCleaning"), for summaries. */
export function serviceCategoryLabelKey(tabId: string): TranslationKey | undefined {
  for (const tabs of [DEFAULT_CATEGORY_TABS, ...Object.values(SERVICE_CATEGORY_TABS_MAP)]) {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) return tab.translationKey ?? (tab.label as TranslationKey);
  }
  return undefined;
}

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
  if (serviceSlug && isCommonPropertyTypeWithRoomComponents(serviceSlug)) {
    return SANITIZE_RESIDENTIAL_CATEGORYIES;
  }
  const tabs = getCategoryTabsForService(serviceSlug);
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
  return Math.round(m2 * 10.7639).toLocaleString();
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
const DIM_TEXT = "#67e8f9";
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
}

interface SurfaceBottomMatrix {
  costOFEstimation: string;
  serviceTargetArea: string;
}

export let surfaceMatrixes: SurfaceBottomMatrix = {
  costOFEstimation: "",
  serviceTargetArea: "",
};

let labourData:string;

export function SanitizeSizeVisualization({
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
  serviceCategory = "residential",
  isQuote,
}: visualizationProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();

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
  // Price is hours × the hourly rate per cleaner (Deep Clean already applied), so this recovers that rate.
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
      className="w-full rounded-t-2xl rounded-r-2xl rounded-b-none rounded-l-2xl bg-[#070D1B] border border-cyan-500/40 md:p-3 p-5 shadow-2xl relative overflow-hidden select-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 180, 255, 0.06) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 180, 255, 0.06) 1px, transparent 1px)
        `,
        backgroundSize: "24px 24px",
      }}
    >
      <div className="w-full flex items-center justify-between border-b border-cyan-900/50 pb-2.5 mb-3 gap-2 flex-wrap">
        <div className="flex items-center space-x-2.5 min-w-0">
          <div className="w-2.5 h-2.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#00ffff] shrink-0" />
          <div className="min-w-0">
            <h4 className="text-[11px] sm:text-xs font-bold tracking-widest text-cyan-200 uppercase truncate">
              {activeCategory ? (CATEGORY_LABEL_KEYS[activeCategory.label] ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey) : translate(activeCategory.label as TranslationKey)) : (isResidential ? "RESIDENTIAL" : "INDUSTRIAL")} BLUEPRINT
            </h4>
            <p className="text-[9px] sm:text-[10px] text-cyan-400/80 tracking-wider truncate">
              {value} m² • {formatFt2(value)} ft² | GRID: {span}m × {depth}m
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[9px] sm:text-[10px] px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/40 rounded-md text-cyan-300 font-semibold tracking-wide">
            {translate(surfaceTitle as TranslationKey)}
          </span>
          <span className="hidden sm:inline-block text-[9px] px-2 py-0.5 bg-blue-900/40 border border-blue-500/30 rounded-md text-blue-200 font-mono">
            CAD SCALE 1:50
          </span>
        </div>
      </div>

      <div className="relative w-full bg-[#091122]/90 border border-cyan-500/50 rounded-xl shadow-[0_0_25px_rgba(0,180,255,0.15)] p-2 sm:p-4 overflow-hidden">
        <div className="flex items-center w-full">
          <div className="flex-1 min-w-0 max-h-[250px] sm:max-h-[270px] md:max-h-[420px] flex items-center justify-center">
            {isResidential ? (
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[220px] sm:max-h-[260px] md:max-h-[420px] drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] object-contain"
              >
                <BlueprintDimensions span={span} depth={depth} />
                <rect x="50" y="50" width="850" height="630" rx="12" fill="none" stroke="#00e1ff" strokeWidth="5" />
                <g stroke="#00b4ff" strokeWidth="3.5" fill="none">
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
                <g fill="rgba(0, 180, 255, 0.08)">
                  <rect x="54" y="54" width="304" height="254" />
                  <rect x="364" y="54" width="254" height="254" />
                  <rect x="624" y="54" width="274" height="254" />
                  <rect x="54" y="314" width="304" height="362" />
                  <rect x="364" y="414" width="154" height="262" />
                  <rect x="624" y="464" width="274" height="212" />
                  <rect x="734" y="314" width="164" height="144" />
                </g>
                <g stroke="#00d2ff" strokeWidth="1.8" fill="none">
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
                <g stroke="#00e1ff" strokeWidth="1.8" fill="none" opacity="0.85">
                  <path d="M 360 260 A 40 40 0 0 1 320 220" />
                  <line x1="360" y1="260" x2="360" y2="220" />
                  <path d="M 520 310 A 40 40 0 0 1 480 270" />
                  <path d="M 680 310 A 40 40 0 0 0 720 270" />
                  <path d="M 730 380 A 35 35 0 0 1 765 345" />
                  <path d="M 450 680 A 30 30 0 0 1 480 650" />
                </g>
                <g fontFamily="monospace">
                  <text x="200" y="170" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">MASTER BEDROOM</text>
                  <text x="200" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{masterBedArea} m²</text>
                  <text x="490" y="170" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">NORTH BEDROOM</text>
                  <text x="490" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{northBedArea} m²</text>
                  <text x="760" y="170" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">EAST BEDROOM</text>
                  <text x="760" y="195" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{eastBedArea} m²</text>
                  <text x="200" y="430" fill="#e0f2fe" fontSize="17" fontWeight="bold" textAnchor="middle">LIVING & LOUNGE</text>
                  <text x="200" y="455" fill="#38bdf8" fontSize="14" fontWeight="600" textAnchor="middle">{livingArea} m²</text>
                  <text x="440" y="465" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">DINING SPACE</text>
                  <text x="440" y="488" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{diningArea} m²</text>
                  <text x="760" y="515" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">KITCHEN & ISLAND</text>
                  <text x="760" y="540" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{kitchenArea} m²</text>
                  <text x="815" y="410" fill="#e0f2fe" fontSize="14" fontWeight="bold" textAnchor="middle">BATH & WC</text>
                  <text x="815" y="432" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">{bathArea} m²</text>
                </g>
                <g transform="translate(100, 630)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#00d2ff" />
                  <text x="0" y="30" fill="#00d2ff" fontSize="10" textAnchor="middle" fontFamily="monospace">N // CAD-04</text>
                </g>
              </svg>
            ) : (
              <svg
                viewBox={BLUEPRINT_VIEWBOX}
                className="w-full h-full max-h-[250px] sm:max-h-[270px] md:max-h-[420px] drop-shadow-[0_0_12px_rgba(0,210,255,0.3)] object-contain"
              >
                <BlueprintDimensions span={span} depth={depth} />
                <rect x="50" y="50" width="850" height="630" rx="12" fill="none" stroke="#00e1ff" strokeWidth="5" />
                <g stroke="#00b4ff" strokeWidth="3.5" fill="none">
                  <line x1="50" y1="530" x2="350" y2="530" />
                  <line x1="350" y1="50" x2="350" y2="530" />
                  <line x1="570" y1="530" x2="900" y2="530" />
                  <line x1="570" y1="530" x2="570" y2="680" />
                  <rect x="420" y="230" width="210" height="270" rx="4" strokeWidth="2.5" />
                </g>
                <g fill="rgba(0, 180, 255, 0.08)">
                  <rect x="54" y="54" width="292" height="472" />
                  <rect x="354" y="54" width="222" height="172" />
                  <rect x="578" y="54" width="318" height="472" />
                  <rect x="54" y="534" width="292" height="142" />
                  <rect x="574" y="534" width="322" height="142" />
                  <rect x="424" y="234" width="202" height="262" fill="rgba(0, 220, 255, 0.12)" />
                </g>
                <g stroke="#00d2ff" strokeWidth="1.8" fill="none">
                  <line x1="80" y1="120" x2="260" y2="120" strokeWidth="3.5" />
                  <line x1="80" y1="180" x2="260" y2="180" strokeWidth="3.5" />
                  <line x1="80" y1="240" x2="260" y2="240" strokeWidth="3.5" />
                  <line x1="80" y1="300" x2="260" y2="300" strokeWidth="3.5" />
                  <rect x="90" y="360" width="180" height="70" rx="4" />
                  <rect x="120" y="380" width="40" height="30" rx="2" />
                  <line x1="450" y1="260" x2="590" y2="260" strokeWidth="2.5" />
                  <line x1="450" y1="300" x2="590" y2="300" strokeWidth="2" />
                  <rect x="470" y="330" width="60" height="40" rx="2" />
                  <rect x="540" y="330" width="50" height="40" rx="2" />
                  <line x1="450" y1="420" x2="590" y2="420" strokeWidth="2.5" />
                  <rect x="500" y="90" width="260" height="40" rx="4" />
                  <rect x="370" y="90" width="40" height="30" rx="2" />
                  <line x1="720" y1="260" x2="720" y2="420" strokeWidth="3.5" />
                  <rect x="780" y="260" width="50" height="140" rx="4" />
                  <rect x="90" y="580" width="140" height="60" rx="6" />
                  <path d="M 610 570 L 860 570 L 860 650 L 610 650" strokeWidth="2.5" strokeDasharray="6 3" />
                  <rect x="650" y="590" width="80" height="40" rx="4" />
                </g>
                <g stroke="#00e1ff" strokeWidth="1.8" fill="none" opacity="0.85">
                  <path d="M 350 630 A 30 30 0 0 1 380 600" />
                  <path d="M 570 630 A 30 30 0 0 0 540 600" />
                  <path d="M 200 530 A 30 30 0 0 1 230 500" />
                </g>
                <g fontFamily="monospace">
                  <text x="200" y="225" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">STORAGE & INVENTORY</text>
                  <text x="200" y="248" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{storageArea} m²</text>
                  <text x="465" y="145" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">BACK OFFICE</text>
                  <text x="465" y="165" fill="#38bdf8" fontSize="11" fontWeight="600" textAnchor="middle">{backOfficeArea} m²</text>
                  <text x="730" y="225" fill="#e0f2fe" fontSize="15" fontWeight="bold" textAnchor="middle">DISPLAY & MERCHANDISE</text>
                  <text x="730" y="248" fill="#38bdf8" fontSize="13" fontWeight="600" textAnchor="middle">{displayArea} m²</text>
                  <text x="525" y="210" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">CENTRAL SHOWROOM FLOOR</text>
                  <text x="525" y="380" fill="#e0f2fe" fontSize="16" fontWeight="bold" textAnchor="middle">MAIN FLOOR</text>
                  <text x="525" y="405" fill="#38bdf8" fontSize="14" fontWeight="600" textAnchor="middle">{showroomArea} m²</text>
                  <text x="160" y="565" fill="#e0f2fe" fontSize="13" fontWeight="bold" textAnchor="middle">CONSULTATION LOUNGE</text>
                  <text x="160" y="588" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">{loungeArea} m²</text>
                  <text x="735" y="555" fill="#e0f2fe" fontSize="14" fontWeight="bold" textAnchor="middle">CHECKOUT & SERVICE</text>
                  <text x="735" y="578" fill="#38bdf8" fontSize="12" fontWeight="600" textAnchor="middle">{checkoutArea} m²</text>
                </g>
                <g transform="translate(100, 600)">
                  <circle cx="0" cy="0" r="20" fill="none" stroke="#00d2ff" strokeWidth="1.5" strokeDasharray="3 2" />
                  <polygon points="0,-16 4,-4 0,0 -4,-4" fill="#00d2ff" />
                  <text x="0" y="30" fill="#00d2ff" fontSize="10" textAnchor="middle" fontFamily="monospace">N // RETAIL-01</text>
                </g>
              </svg>
            )}
          </div>
        </div>
      </div>

      {!isQuote && (<div className="grid grid-cols-3 gap-2 sm:gap-6 pt-3.5 mt-3 border-t border-cyan-900/40 w-full text-center">
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("EstimatedCost")}</p>
          <p className="text-[10px] sm:text-lg font-bold text-[#38BDF8]">{estimatedCost}</p>
        </div>
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("ServiceRate")}</p>
          <p className="text-[10px] sm:text-lg font-bold text-white">{serviceRate}</p>
        </div>
        <div>
          <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("EstLabor")}</p>
          <p className="text-[10px] sm:text-lg font-bold text-white">{labor}</p>
        </div>
      </div>)}
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
  isQuote?: boolean ; 
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
}: PropertyTypeSizeSelectorProps) {
  const [internalDisinfection, setInternalDisinfection] = useState(false);
  const [internalDeepClean, setInternalDeepClean] = useState(false);

  const[quoteStatus,setQuoteStatus]=useState<boolean>(false);

  useEffect(()=>{
    if(isQuote){
      setQuoteStatus(true);
    }else{
      setQuoteStatus(false);
    }
  },[quoteStatus])

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
  const MaxSizeChangeWhenQuote=(checkIsQuote:boolean):PropertyCategory[]=>{

    const baseCategories = ROOM_COMPONENTS_SERVICES
      ? SANITIZE_RESIDENTIAL_CATEGORYIES
      : activeTab.categories;

    if (checkIsQuote || quoteStatus) {
      return baseCategories.map(cat => ({ ...cat, max: 5000 }));
    }
    return baseCategories;
  }

  
  const selectableCategories:PropertyCategory[] = MaxSizeChangeWhenQuote(quoteStatus);
    

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


  console.log("quoteStatus",quoteStatus);

  // Sync active category when value changes externally or crosses category boundaries
  useEffect(() => {
    if(quoteStatus){
      return
    }
      const nextCat = findAppropriateCategory(value, activeCategoryId, selectableCategories);
      const nextId = nextCat ? nextCat.id : null;
      if (nextId && nextId !== activeCategoryId) {
        setActiveCategoryId(nextId);
      } 
    
  }, [value, selectableCategories, activeCategoryId,quoteStatus]);

  function handleCardClick(id: string) {
    const nextCat = selectableCategories.find((c) => c.id === id);
    if (nextCat) {
      setActiveCategoryId(nextCat.id);
      const initialSize = nextCat?.sizes ? nextCat.sizes[0] : nextCat.min;
      onChange(initialSize);
    }
  }

  const MIN_SIZE = 20;
  const MAX_SIZE = 500;

  const prevSize = value > MIN_SIZE ? value - 1 : null;
  const nextSize = value < MAX_SIZE ? value + 1 : null;

  function handleNext() {
    if (value < MAX_SIZE) {
      const nextVal = value + 1;

      if(!quoteStatus){

        const nextCat = findAppropriateCategory(nextVal, activeCategoryId, selectableCategories, "up");
        const nextId = nextCat ? nextCat.id : null;
        if (nextId && nextId !== activeCategoryId) {
          setActiveCategoryId(nextId);
        }
        
      }
      onChange(nextVal);
    }
  }

  function handlePrev() {
    if (value > MIN_SIZE) {
      const prevVal = value - 1;
      if(!quoteStatus){
        const prevCat = findAppropriateCategory(prevVal, activeCategoryId, selectableCategories, "down");
        const prevId = prevCat ? prevCat.id : null;
        if (prevId && prevId !== activeCategoryId) {
          setActiveCategoryId(prevId);
        }
      }
      onChange(prevVal);
    }
  }

  const wheelContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    }
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  });

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

  const abortVisualization =  serviceSlug !== "luxury-yacht-cleaning";
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

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {/* Dynamic Size & Area Floorplan Visualization Component */}
      {isYachtSlug ? (
        <YatchSizeVisualization
          value={value}
          activeCategory={activeCategory ?? undefined}
          isDisinfection={isDisinfection}
          isDeepClean={isDeepClean}
          quote={quote}
          serviceCategory={isActiveCategorySwitch as "yatch-cleaning" | "passenger-ship-cleaning"}
          isQuote={isQuote}
        />
      ) :  (
        <SanitizeSizeVisualization
          value={value}
          activeCategory={activeCategory ?? undefined}
          isDisinfection={isDisinfection}
          isDeepClean={isDeepClean}
          quote={quote}
          serviceCategory={ROOM_COMPONENTS_SERVICES ? "residential" : (isActiveCategorySwitch as "residential" | "industrial")}
          isQuote={isQuote}
        />
      )}

      <div className={`  rounded-b-2xl py-4 border border-[#C6A868] bg-brand-navy pb-5 sm:pb-6 px-5 sm:px-6 shadow-sm w-full`}>
        {!ROOM_COMPONENTS_SERVICES && (
          <div className="w-full">
            <h2 className="text-base sm:text-lg font-bold text-gray-300 mb-3">{translate("propServiceCatagory")}</h2>
            <div className="w-full p-1 flex justify-between items-center mb-6 bg-white/5 backdrop-blur-md rounded-[27px]">
              {categoryTabs.map((tab) => {
                const isActive = isActiveCategorySwitch === tab.id;
                const tabLabel = tab.translationKey ? translate(tab.translationKey) : translate(tab.label as TranslationKey);
                return (
                  <button
                    key={tab.id}
                    type="button"
                    className={`md:w-[49.5%]  w-[48%] py-3 sm:py-4 px-3 rounded-4xl transition-colors ${isActive ? "bg-blue-500 border-[#C6A868]/60" : "bg-transparent"
                      } cursor-pointer text-[13px] md:text-[15px] text-white font-bold flex items-center justify-center gap-1.5`}
                    onClick={() => handleCategorySwitch(tab.id)}
                  >
                    <span>{tab.icon}</span> <span>{tabLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 items-start h-full">
          {/* Left Column: Property Type */}
          <div className="flex flex-col min-w-0">
            <div className="flex justify-between">
              <h3 className="text-base sm:text-lg font-bold text-gray-300 mb-3">
                {translate("propTypeTitle")}
              </h3>
              <p className="text-[11px] text-[#94A3B8] text-center mt-1.5 font-medium tracking-wide select-none">
                {translate("propTypeSwipe")}
              </p>
            </div>
          
            <div
              className="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden -mx-1 px-1 [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto [&::-webkit-scrollbar]:hidden"
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
                    className={`shrink-0 w-[110px] h-[110px] sm:w-[118px] shadow-lg sm:h-[118px] rounded-xl border-2 flex flex-col items-center justify-center p-2.5 cursor-pointer transition-colors select-none ${isSelected
                        ? "bg-blue-600 border-[#B89642]"
                        : "bg-brand-navy/50 border-[#C6A868]/60 hover:border-[#B89642]"
                      }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center text-xl mb-1.5 transition-colors ${isSelected ? "bg-white/10" : "bg-[#F1F3F5]"
                        }`}
                    >
                      <span>{cat.icon}</span>
                    </div>
                    <span
                      className={`text-xs text-center leading-tight line-clamp-2 px-1 ${isSelected ? "font-bold text-white" : "font-semibold text-white"
                        }`}
                    >
                      {translate(getCategoryDisplayLabel(cat) as TranslationKey)}
                    </span>
                  </button>
                );
              })}
              
            </div>
            

            {/* Property Size Selector */}
            <div className="flex flex-col w-full mt-8">
              <h3 className="text-base sm:text-lg font-bold text-white mb-3">{translate("propSizeTitle")}</h3>

              <div className="flex flex-col md:flex-row items-center w-full mt-5 gap-3">
                {/* Wheel Display Container */}
                <div
                  ref={wheelContainerRef}
                  className="flex-1 h-[110px] sm:h-[118px] w-full rounded-xl border-2 border-[#C6A868]/60 bg-gray-800 overflow-hidden shadow-sm flex flex-col justify-between select-none"
                >
                  {/* Top Row: Previous size preview */}
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={prevSize === null}
                    className="flex-1 hidden md:flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-700 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
                  >
                    {prevSize !== null ? `${formatFt2(prevSize)} ft²` : "\u00A0"}
                  </button>

                  {/* Middle Row: Active selected size */}
                  <div className="relative flex-[1.6] bg-gray-700 text-white flex flex-col md:items-center px-4 items-start justify-center py-2 border-y border-[#C6A868]/40 shadow-inner">
                    <span className="text-xl sm:text-2xl font-bold leading-tight">
                      {value} m²
                    </span>
                    <span className="text-xs font-semibold text-[#B89642] leading-none mt-0.5">
                      {formatFt2(value)} ft²
                    </span>
                    <div className="absolute right-4">
                      <select
                        value={value}
                        onChange={(e) => {
                          const selectedVal = Number(e.target.value);
                          onChange(selectedVal);
                        }}
                        className="appearance-none py-2 pl-2 pr-9 block border border-gray-600 focus:border-gray-500 rounded-[10px] bg-gray-800 text-white cursor-pointer"
                      >
                        {dropdownOptions.map((Val) => (
                          <option key={Val} value={Val} className="bg-gray-700 text-white">
                            {Val} m²
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                    </div>
                  </div>

                  {/* Bottom Row: Next size preview */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={nextSize === null}
                    className="flex-1 hidden md:flex items-center justify-center text-xs text-[#94A3B8] font-medium cursor-pointer hover:bg-slate-500 transition-colors disabled:opacity-30 disabled:cursor-default w-full"
                  >
                    {nextSize !== null ? `${nextSize} m²` : "\u00A0"}
                  </button>
                </div>

                {/* Right Buttons Stack */}
                {/* Desktop view */}
                <div className="md:flex hidden w-[30%] h-[110px] sm:h-[118px] flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={nextSize === null}
                    className="flex-1 w-[100%] rounded-xl border-2 hover:bg-blue-600 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Increase Property Size"
                  >
                    <span className="text-sm leading-none font-bold">↑</span>
                    <span className="text-[9px] font-bold tracking-wider mt-1">{translate("propSizeUp")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={prevSize === null}
                    className="flex-1 rounded-xl w-[100%] hover:bg-blue-600 border-2 border-[#C6A868]/60 bg-gray-800 text-white active:bg-gray-700 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Decrease Property Size"
                  >
                    <span className="text-sm leading-none font-bold">↓</span>
                    <span className="text-[9px] font-bold tracking-wider mt-1">{translate("propSizeDown")}</span>
                  </button>
                </div>

                {/* Mobile view */}
                <div className="flex md:hidden w-full h-[110px] sm:h-[118px] flex-col gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={nextSize === null}
                    className="flex-1 rounded-xl bg-gray-800 text-white border-2 border-[#C6A868]/60 hover:bg-blue-600 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center text-[#1E293B] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Increase Property Size"
                  >
                    <span className="text-sm leading-none font-bold">↑</span>
                    <span className="text-[9px] font-bold tracking-wider mt-1">{translate("propSizeUp")}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={prevSize === null}
                    className="flex-1 rounded-xl border-2 bg-gray-800 text-white border-[#C6A868]/60 hover:bg-blue-600 active:scale-95 transition-all shadow-sm flex flex-col items-center justify-center cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    aria-label="Decrease Property Size"
                  >
                    <span className="text-sm leading-none font-bold">↓</span>
                    <span className="text-[9px] font-bold tracking-wider mt-1">{translate("propSizeDown")}</span>
                  </button>
                </div>
              </div>
            </div>

            
          </div>

          {/* Disinfection & Deep Clean Selectable Cards */}
          {!isQuote &&isSanitizeService && (
            <div className="grid grid-cols-2 gap-3 items-center mt-4 h-full w-full">
              {/* Disinfection Card */}
              <button
                type="button"
                onClick={handleToggleDisinfection}
                className={`flex items-center justify-between p-4.5 sm:p-5 rounded-xl border transition-all cursor-pointer select-none text-left ${isDisinfection
                    ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <DisinfectionSprayIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-gray-300" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                      {translate("DisinfectionName")}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                      {translate("HospitalGradeName")} (+0%)
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDisinfection ? "border-blue-500 bg-blue-500 text-white" : "border-white/20 bg-white/5"
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
                    ? "bg-[#1E2E4A] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.25)]"
                    : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.08]"
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-blue-400" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-sm sm:text-[15px] font-bold text-white leading-tight">
                      {translate("deepCleanName")}
                    </span>
                    <span className="text-xs text-[#94A3B8] font-medium leading-tight mt-0.5">
                      {translate("deepCleanNameIntensive")} (+40%)
                    </span>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-[6px] border flex items-center justify-center transition-colors shrink-0 ml-2 ${isDeepClean ? "border-blue-500 bg-blue-500 text-white" : "border-white/20 bg-white/5"
                    }`}
                >
                  {isDeepClean && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            </div>
          )}
        </div>

        {/* Room selector for services types */}
        <RoomSelector 
            value={rooms} 
            onChange={(next) => onRoomsChange?.(next)} 
            serviceSlug={serviceSlug}
        />

        {/* Right Column: Property Size */}
        <div className="flex flex-col w-full mt-8">
          {/* Services frequencies */}
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
        </div>
      </div>
    </section>
  );
}


export function EstimatioMatrixBottom({
  activeCategory,
  isSanitizeService,
  isYatch
}: {
  activeCategory: PropertyCategory | null,
  isSanitizeService?: boolean
  isYatch?:boolean
}) {
  const { translate } = useLanguage();

  return (
    <div className="grid grid-cols-3 items-center py-4  align-items-center px-[3px] bg-[#132238]/90 border
     border-blue-500/20 
    rounded-xl gap-2 sm:gap-6 pt-2 mt-4 border-t w-full text-center">
      <div className="">
        <p className="text-xs text-gray-400 font-medium mb-1">{translate("EstimatedCost")}</p>
        <p className=" text-[10px] md:text-2xl font-bold text-[#38BDF8]">
          {surfaceMatrixes.costOFEstimation}
        </p>
      </div>

      <div>
        <p className="text-[11px] text-gray-400 font-medium mb-1">{translate("serviceTargetArea")}</p>
        {activeCategory && (
          <p className="text-[11px]  md:text-base text-gray-200 font-medium mb-1">
            {CATEGORY_LABEL_KEYS[activeCategory.label]
              ? translate(CATEGORY_LABEL_KEYS[activeCategory.label] as TranslationKey)
              : activeCategory.label.startsWith("prop") || activeCategory.label.startsWith("yacht") || activeCategory.label.startsWith("sec")
                ? translate(activeCategory.label as TranslationKey)
                : translate(activeCategory.label as TranslationKey)}
          </p>
        )}
        <p className="text-[10px] md:text-[16px]  font-bold text-white">
          {surfaceMatrixes.serviceTargetArea}
        </p>
        {isSanitizeService && (
          <p className="text-[10px] md:text-[14px] font-medium text-green-400">
            Included Full santization
          </p>
        )}
        {isYatch && (
          <p className="text-[10px] md:text-[14px] font-medium text-green-400">
            Yatch Service
          </p>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-medium mb-1">{translate("EstLabor")}</p>
        <p className="text-[10px] md:text-xl font-bold text-white">{labourData}</p>
      </div>
    </div>
  );
}

//visualization of Yatches


function YatchSizeVisualization({ 
  value,
  activeCategory,
  isDisinfection,
  isDeepClean,
  quote,
  serviceCategory = "yatch-cleaning",
  isQuote,
}: visualizationProps) {
  const { symbol } = useCurrency();
  const { translate } = useLanguage();


  const span = Number(Math.sqrt(value * 1.33).toFixed(1));
  const depth = Number((value / span).toFixed(1));

  const formatFt2 = (m2: number) => Math.round(m2 * 10.7639).toLocaleString();
  const range = (min: string, max: string) => (min === max ? min : `${min} – ${max}`);
  const hasPrice = !!quote?.bookable && quote.priceMin != null && quote.priceMax != null;
  const estimatedCost = hasPrice ? range(`${symbol}${quote!.priceMin!.toFixed(2)}`, `${symbol}${quote!.priceMax!.toFixed(2)}`) : "—";
  // Price is hours × the hourly rate per cleaner (Deep Clean already applied), so this recovers that rate.
  const serviceRate = hasPrice && quote!.minHours
    ? `${symbol}${(quote!.priceMin! / quote!.minHours).toFixed(2)} ${translate("servicesRatePerCleanerHour")}`
    : "—";

  const hasHours = !!quote?.bookable && quote.minHours != null && quote.maxHours != null;
  
  
  const labor = hasHours
    ? `${range(String(quote!.minHours), String(quote!.maxHours))}h (${quote!.cleanerCount ?? 1} ${translate("CrewWord")})`
    : "—";

  labourData = labor

  surfaceMatrixes.costOFEstimation = estimatedCost

  return (
    <div
      className="w-full rounded-t-2xl bg-[#070D1B] border border-cyan-500/40 p-4 sm:p-6 shadow-2xl relative overflow-hidden select-none font-mono"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 180, 255, 0.05) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 180, 255, 0.05) 1px, transparent 1px)
        `,
        backgroundSize: "32px 32px",
      }}
    >
      {/* Top Header & Blueprint Toggle */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between border-b border-cyan-900/60 pb-3 mb-4 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-cyan-400 rounded-full shadow-[0_0_12px_#00ffff]" />
          <div>
            <h3 className="text-xs sm:text-sm font-bold tracking-widest text-cyan-200 uppercase">
              VESSEL DECK PLAN TEMPLATES
            </h3>
            <p className="text-[10px] text-cyan-400/80 tracking-wider">
              {value} m² • {formatFt2(value)} ft² | GRID DIMENSIONS: {span}m × {depth}m
            </p>
          </div>
        </div>

  
        
      </div>

      {/* Main Architectural SVG Blueprint Stage */}
      <div className="relative w-full bg-[#060B18] border border-cyan-500/40 rounded-xl p-2 sm:p-4 shadow-inner overflow-hidden flex items-center justify-center">
        {serviceCategory === "yatch-cleaning" ? (
          /* ================= LUXURY YACHT ARCHITECTURE ================= */
          <svg viewBox="-20 -20 1040 680" className="w-full h-auto max-h-[460px] drop-shadow-[0_0_16px_rgba(0,210,255,0.25)]">
            {/* Blueprint Outer Frame & Title Label */}
            <rect x="0" y="0" width="1000" height="640" rx="12" fill="none" stroke="#00e1ff" strokeWidth="3" opacity="0.4" />
            <text x="500" y="28" fill="#67e8f9" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              LUXURY YACHT - UPPER DECK
            </text>

            {/* Hull Outer Contour */}
            <path
              d="M 100 60 L 880 60 C 950 60, 990 120, 990 190 C 990 260, 950 320, 880 320 L 100 320 C 50 320, 30 260, 30 190 C 30 120, 50 60, 100 60 Z"
              fill="rgba(0, 160, 255, 0.03)"
              stroke="#00f0ff"
              strokeWidth="4"
            />

            {/* Internal Compartment Walls & Bulkheads */}
            <g stroke="#00b4ff" strokeWidth="2.5" fill="none">
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
              fill="rgba(0, 160, 255, 0.04)"
              stroke="#00f0ff"
              strokeWidth="3.5"
            />
            <g stroke="#00b4ff" strokeWidth="2.5" fill="none">
              <line x1="360" y1="320" x2="360" y2="520" />
              <line x1="640" y1="320" x2="640" y2="520" />
              <rect x="180" y="360" width="140" height="120" rx="6" />
              <rect x="680" y="360" width="140" height="120" rx="6" />
              <rect x="390" y="400" width="220" height="90" rx="6" />
            </g>

            {/* Detailed Furniture & Fixture Symbols */}
            <g stroke="#38bdf8" strokeWidth="1.5" fill="none" opacity="0.8">
              {/* Master Bed & Closet */}
              <rect x="120" y="80" width="90" height="70" rx="4" />
              <circle cx="150" cy="115" r="12" />
              <line x1="240" y1="80" x2="290" y2="180" strokeDasharray="2 2" />
              {/* Main Saloon Couch & Table */}
              <path d="M 380 220 L 520 220 L 520 290 L 380 290 Z" />
              <rect x="425" y="240" width="50" height="30" rx="3" />
              {/* Galley Dining Table */}
              <rect x="750" y="110" width="110" height="50" rx="4" />
              <rect x="770" y="85" width="20" height="15" />
              <rect x="810" y="85" width="20" height="15" />
              {/* Aft Deck Table */}
              <rect x="450" y="430" width="100" height="40" rx="4" />
            </g>

            {/* Compartment Labels */}
            <g fontFamily="monospace" textAnchor="middle">
              <text x="170" y="220" fill="#e0f2fe" fontSize="14" fontWeight="bold">MASTER SUITE</text>
              <text x="170" y="240" fill="#38bdf8" fontSize="11">{(value * 0.28).toFixed(1)} m²</text>

              <text x="500" y="140" fill="#e0f2fe" fontSize="14" fontWeight="bold">WALK-IN CLOSET</text>

              <text x="825" y="140" fill="#e0f2fe" fontSize="14" fontWeight="bold">PRIVATE LOUNGE</text>

              <text x="500" y="215" fill="#e0f2fe" fontSize="15" fontWeight="bold">MAIN SALOON</text>
              <text x="500" y="235" fill="#38bdf8" fontSize="12">{(value * 0.32).toFixed(1)} m²</text>

              <text x="735" y="235" fill="#e0f2fe" fontSize="14" fontWeight="bold">GALLEY</text>

              <text x="250" y="420" fill="#e0f2fe" fontSize="14" fontWeight="bold">GUEST SUITE</text>
              <text x="750" y="420" fill="#e0f2fe" fontSize="14" fontWeight="bold">GUEST SUITE</text>

              <text x="500" y="375" fill="#e0f2fe" fontSize="16" fontWeight="bold">AFT DECK</text>
              <text x="500" y="395" fill="#38bdf8" fontSize="13">{(value * 0.22).toFixed(1)} m²</text>
            </g>
          </svg>
        ) : (
          /* ================= PASSENGER SHIP ARCHITECTURE ================= */
          <svg viewBox="-20 -20 1040 680" className="w-full h-auto max-h-[460px] drop-shadow-[0_0_16px_rgba(0,210,255,0.25)]">
            <rect x="0" y="0" width="1000" height="640" rx="12" fill="none" stroke="#00e1ff" strokeWidth="3" opacity="0.4" />
            <text x="500" y="28" fill="#67e8f9" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="2">
              PASSENGER SHIP - PROMENADE DECK
            </text>

            {/* Three Parallel Hull Decks */}
            <rect x="60" y="50" width="880" height="160" rx="80" fill="rgba(0, 160, 255, 0.03)" stroke="#00f0ff" strokeWidth="3.5" />
            <rect x="60" y="240" width="880" height="160" rx="80" fill="rgba(0, 160, 255, 0.03)" stroke="#00f0ff" strokeWidth="3.5" />
            <rect x="60" y="430" width="880" height="160" rx="80" fill="rgba(0, 160, 255, 0.03)" stroke="#00f0ff" strokeWidth="3.5" />

            {/* Deck Internal Dividers & Corridors */}
            <g stroke="#00b4ff" strokeWidth="2" fill="none">
              <line x1="350" y1="50" x2="350" y2="210" />
              <line x1="680" y1="50" x2="680" y2="210" />
              <line x1="350" y1="240" x2="350" y2="400" />
              <line x1="680" y1="240" x2="680" y2="400" />
              <line x1="350" y1="430" x2="350" y2="590" />
              <line x1="680" y1="430" x2="680" y2="590" />
            </g>

            {/* Detailed Seating, Tables & Retail Arcade Fixtures */}
            <g stroke="#38bdf8" strokeWidth="1.2" fill="none" opacity="0.75">
              {/* Restaurant Tables */}
              <circle cx="120" cy="90" r="12" />
              <circle cx="160" cy="90" r="12" />
              <circle cx="120" cy="130" r="12" />
              <circle cx="160" cy="130" r="12" />

              <circle cx="820" cy="90" r="12" />
              <circle cx="860" cy="90" r="12" />
              <circle cx="820" cy="130" r="12" />
              <circle cx="860" cy="130" r="12" />

              {/* Theater Seating Rows */}
              <line x1="100" y1="270" x2="280" y2="270" />
              <line x1="100" y1="290" x2="280" y2="290" />
              <line x1="100" y1="310" x2="280" y2="310" />
              <line x1="100" y1="330" x2="280" y2="330" />
              <line x1="100" y1="350" x2="280" y2="350" />
              <line x1="100" y1="370" x2="280" y2="370" />

              {/* Atrium Grand Staircases */}
              <rect x="480" y="270" width="40" height="100" rx="4" />
              <line x1="480" y1="300" x2="520" y2="300" />
              <line x1="480" y1="340" x2="520" y2="340" />

              {/* Casino & Lounge Tables */}
              <circle cx="150" cy="490" r="18" />
              <circle cx="210" cy="490" r="18" />
              <rect x="750" y="470" width="120" height="80" rx="6" />
            </g>

            {/* Deck Compartment Labels */}
            <g fontFamily="monospace" textAnchor="middle">
              <text x="200" y="130" fill="#e0f2fe" fontSize="13" fontWeight="bold">RESTAURANT</text>
              <text x="515" y="120" fill="#e0f2fe" fontSize="13" fontWeight="bold">PASSAGES & CORRIDORS</text>
              <text x="800" y="130" fill="#e0f2fe" fontSize="13" fontWeight="bold">RESTAURANT</text>

              <text x="190" y="325" fill="#e0f2fe" fontSize="15" fontWeight="bold">THEATER</text>
              <text x="500" y="325" fill="#e0f2fe" fontSize="15" fontWeight="bold">ATRIUM</text>
              <text x="800" y="325" fill="#e0f2fe" fontSize="15" fontWeight="bold">LUXURY SUITES</text>

              <text x="200" y="520" fill="#e0f2fe" fontSize="13" fontWeight="bold">CASINO LOUNGE</text>
              <text x="515" y="520" fill="#e0f2fe" fontSize="13" fontWeight="bold">CASINO & GAMING</text>
              <text x="810" y="520" fill="#e0f2fe" fontSize="13" fontWeight="bold">PASSENGER LOUNGE</text>
            </g>
          </svg>
        )}
      </div>
 
      {/* Bottom Estimation Summary Bar */}
      {!isQuote && (<div className="grid grid-cols-3 gap-2 sm:gap-4 pt-3 mt-4 border-t border-cyan-900/50 text-center">
        <div>
          <p className="text-[11px] text-gray-400 font-medium mb-0.5">{translate("EstimatedCost")}</p>
          <p className="text-xs sm:text-base font-bold text-[#38BDF8]">{estimatedCost}</p>
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium mb-0.5">{translate("ServiceRate")}</p>
          <p className="text-xs sm:text-base font-bold text-white">{serviceRate}</p>
        </div>
        <div>
          <div>
            <p className="text-[11px] sm:text-xs text-gray-400 font-medium mb-0.5">{translate("EstLabor")}</p>
            <p className="text-[10px] sm:text-lg font-bold text-white">{labor}</p>
          </div>
        </div>
      </div>)}
    </div>
  );
}


//Quotation matrix flow with 