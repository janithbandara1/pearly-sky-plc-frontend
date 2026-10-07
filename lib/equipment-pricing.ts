/**
 * Catalog `Item.sku`s seeded in backend/src/database/seed.ts's ITEMS list —
 * fixed business identifiers, unlike the auto-increment `Item.id` (which
 * varies per environment/seed run — e.g. these items happen to be ids
 * 6-9 in some databases, 1-4 in others).
 */
export const EQUIPMENT_ITEM_SKU = {
  BIO_SOLVENT: 'EQUIP-01',
  MOP: 'EQUIP-02',
  MATERIAL_KIT: 'EQUIP-03',
  VACUUM: 'EQUIP-04',
} as const;

/**
 * Cleaning Solvents & Equipment pricing. Each item's base unit price is
 * item.price — the catalog price already resolved for the request's country
 * (see backend/src/database/seed.ts's ITEM_PRICES) — not a hardcoded number.
 * Bio-Solvent and the Material Kit scale their whole price with property
 * size on top of that base; Mop and Vacuum keep the base unit price fixed
 * but scale quantity with property size (one unit per 500m² block); anything
 * else (a future catalog item with no rule of its own) falls back to its
 * catalog price × 1.
 *
 * Requires a real property size — flows that never collect one (a
 * quotation with no property-size step, e.g. a custom-quote or
 * pickup/delivery service) should pass `undefined` so every item falls back
 * to its flat catalog price instead of pricing off a meaningless default.
 */
export function calculateEquipmentItemPrice(
  item: { sku: string; price: string | number | null },
  propertySizeSqm: number | null | undefined,
): number {
  const catalogUnitPrice = item.price != null ? Number(item.price) : 0;
  if (propertySizeSqm == null || !Number.isFinite(propertySizeSqm)) {
    return catalogUnitPrice;
  }

  switch (item.sku) {
    case EQUIPMENT_ITEM_SKU.BIO_SOLVENT:
      return catalogUnitPrice + 0.05 * propertySizeSqm;
    case EQUIPMENT_ITEM_SKU.MATERIAL_KIT: {
      const unitPrice = catalogUnitPrice + 0.03 * propertySizeSqm;
      const qty = 1 + Math.floor(propertySizeSqm / 100);
      return unitPrice * qty;
    }
    case EQUIPMENT_ITEM_SKU.MOP: {
      const qty = Math.ceil(propertySizeSqm / 500);
      return catalogUnitPrice * qty;
    }
    case EQUIPMENT_ITEM_SKU.VACUUM: {
      const qty = Math.ceil(propertySizeSqm / 500);
      return catalogUnitPrice * qty;
    }
    default:
      return catalogUnitPrice;
  }
}

/** Most units of one equipment item a customer can add (steam/sanitization/post-construction flow). */
export const EQUIPMENT_MAX_QTY = 10;

/**
 * Smallest bookable property size. The flat flow's unit price is each item's
 * price at this size (e.g. in EUR: Bio-Solvent €14.00, Mop €8.00, Material
 * Kit €7.20, Vacuum €10.00), so it still follows each country's catalog price.
 */
const FLAT_EQUIPMENT_PRICE_SIZE_SQM = 20;

/** Steam-cleaning / healthguard-sanitization / post-construction flow: one unit's fixed price, whatever the property size. */
export function flatEquipmentUnitPrice(item: { sku: string; price: string | number | null }): number {
  return calculateEquipmentItemPrice(item, FLAT_EQUIPMENT_PRICE_SIZE_SQM);
}

/**
 * Steam-cleaning / healthguard-sanitization / post-construction flow: the
 * fixed unit price × the quantity the customer picked — not scaled by the
 * selected property size like calculateEquipmentItemPrice.
 */
export function calculateFlatEquipmentPrice(
  item: { sku: string; price: string | number | null },
  qty: number,
): number {
  return flatEquipmentUnitPrice(item) * qty;
}
