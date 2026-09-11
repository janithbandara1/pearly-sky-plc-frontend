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
 * Cleaning Solvents & Equipment pricing. Bio-Solvent and the Material Kit
 * are flat, size-scaled formulas that ignore the catalog/admin-set unit
 * price entirely; Mop and Vacuum keep that unit price but scale quantity
 * with property size (one unit per 500m² block); anything else just falls
 * back to its catalog price × 1.
 *
 * Requires a real property size — flows that never collect one (a
 * quotation with no property-size step, e.g. a custom-quote or
 * pickup/delivery service) should pass `undefined` so every item falls
 * back to its flat catalog price instead of pricing off a meaningless default.
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
      return 12 + 0.05 * propertySizeSqm;
    case EQUIPMENT_ITEM_SKU.MATERIAL_KIT: {
      const unitPrice = 6 + 0.03 * propertySizeSqm;
      const qty = 1 + Math.floor(propertySizeSqm / 100);
      return unitPrice * qty;
    }
    case EQUIPMENT_ITEM_SKU.MOP:
    case EQUIPMENT_ITEM_SKU.VACUUM: {
      const qty = Math.ceil(propertySizeSqm / 500);
      return catalogUnitPrice * qty;
    }
    default:
      return catalogUnitPrice;
  }
}
