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
  "luxury-yacht-cleaning",
]);

//common property type for this set
const commonFlowOfPropertyTypes = new Set([
  "steam-cleaning" ,
  "healthguard-sanitization", 
  "post-construction-renovation-cleaning"
])

export function isDedicatedFlowService(baseSlug: string): boolean {
  return DEDICATED_FLOW_SERVICES.has(baseSlug);
}

export function isCommonPropertyTypeFlow(baseSlug:string):boolean{
  return commonFlowOfPropertyTypes.has(baseSlug);
}

/** Whether /services/{slug} has a real page for this service (vs. the "Book now isn't available" dead end). */
export function hasServicePage(service: { name: string; isBookable: boolean }): boolean {
  return service.isBookable || isDedicatedFlowService(service.name);
}
