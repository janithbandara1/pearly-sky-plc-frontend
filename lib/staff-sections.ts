import { IS_GLOBAL_SITE } from "@/lib/countries/config";

/**
 * The global gateway only takes quotation requests (no bookings, payments or
 * pricing), so its staff dashboard is limited to these sections, and only
 * admins can use it — a cleaner's whole dashboard is bookings.
 */
export const GLOBAL_STAFF_PREFIXES = ["/staff/quotations", "/staff/customers", "/staff/users"];

/** Where an admin lands after logging in, and the sidebar logo's link. */
export const STAFF_ADMIN_HOME = IS_GLOBAL_SITE ? "/staff/quotations" : "/staff/dashboard";

export const STAFF_CLEANER_HOME = "/staff/bookings";

/** Whether this staff member may view `pathname` on this deployment. */
export function canViewStaffPath(pathname: string, isAdmin: boolean): boolean {
  if (IS_GLOBAL_SITE) {
    return isAdmin && GLOBAL_STAFF_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  }
  return isAdmin || pathname.startsWith(STAFF_CLEANER_HOME);
}
