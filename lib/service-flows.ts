/**
 * Services whose /services/{slug} page runs its own dedicated flow (care
 * profiles, carpet/pool/pressure-washing item pickers, yacht) instead of the
 * standard Book Now form — so that page is valid even when the service's
 * catalog `isBookable` is false. Keyed by the base English slug
 * (`Service.name`), never a locale-specific slug.
 */
const DEDICATED_FLOW_SERVICES = new Set([
  "child-care-service",
  "elder-care-service",
  "carpet-upholstery-cleaning",
  "pool-cleaning",
  "precision-pressure-washing",
]);

//common property type for this set
const commonFlowOfPropertyTypes = new Set([
  "steam-cleaning" ,
  "healthguard-sanitization", 
  "post-construction-renovation-cleaning",

  //access to new property types for the services which has the room 
  // components to be selected
  "regular-home-cleaning",
  "essential-touch-up-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "same-day-priority-cleaning",
  "premium-rental-concierge-cleaning",

  
  "luxury-yacht-cleaning",
  "post-event-cleaning",
  "commercial-office-cleaning",
  "high-security-property-care",
])


//common properties which has the room components to be selected for the service
const commonPropertyTypesWithRoomComponents = new Set([
  "regular-home-cleaning",
  "essential-touch-up-cleaning",
  "deep-cleaning",
  "end-of-tenancy-cleaning",
  "same-day-priority-cleaning",
  
  
]);

const DedicatedRooms = new Set([
  "yatch-cleaning",
  "post-event-cleaning",
  "high-security-property-care",
  "post-construction-renovation-cleaning",
  "commercial-office-cleaning",
  "steam-cleaning"
])


export function isCommonPropertyTypeWithRoomComponents(baseSlug: string): boolean {
  return commonPropertyTypesWithRoomComponents.has(baseSlug) && isCommonPropertyTypeFlow(baseSlug);
}

export function isDedicatedProperyRooms(baseSlug:string):boolean{
  return DedicatedRooms.has(baseSlug)
}

//Rest services which has the common flow of booking new view
const commonFlowOfNewBookingSectionView = new Set([
  "high-security-property-care", 
  "commercial-office-cleaning",
  "luxury-yacht-cleaning",
  "post-event-cleaning",
])

const listOfCommonBookingViewServices=[...commonFlowOfPropertyTypes,...commonFlowOfNewBookingSectionView];
export function isCommonFlowOfNewBookingSectionView(baseSlug:string):boolean{
  return listOfCommonBookingViewServices.includes(baseSlug);
}


export function isDedicatedFlowService(baseSlug: string): boolean {
  return DEDICATED_FLOW_SERVICES.has(baseSlug);
}

export function isCommonPropertyTypeFlow(baseSlug:string):boolean{
  return commonFlowOfPropertyTypes.has(baseSlug);
}



/**
 * Dedicated-flow services whose quotation is taken on /services/{slug}
 * itself (care profiles, carpet/pool/pressure-washing item pickers), so
 * /services/{slug}/request-quotation just 308s there. Yacht is the one
 * dedicated-flow service that still has a separate quotation page.
 */
const QUOTE_ON_SERVICE_PAGE = new Set([
  "child-care-service",
  "elder-care-service",
  "carpet-upholstery-cleaning",
  "precision-pressure-washing",
]);

export function quotesOnServicePage(baseSlug: string): boolean {
  return QUOTE_ON_SERVICE_PAGE.has(baseSlug);
}

/** Whether /services/{slug} has a real page for this service (vs. the "Book now isn't available" dead end). */
export function hasServicePage(service: { name: string; isBookable: boolean }): boolean {
  return service.isBookable || isDedicatedFlowService(service.name);
}

/** Whether /services/{slug}/request-quotation is a real page (vs. a redirect to the service page or a 404). */
export function hasQuotationPage(service: { name: string; isQuotable: boolean }): boolean {
  return service.isQuotable && !quotesOnServicePage(service.name);
}
