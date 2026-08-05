export type QuoteFieldSpec =
  | { kind: "size"; key: string; label: string; units: string[] }
  | { kind: "dimensions"; key: string; label: string; parts: Array<"width" | "height" | "length">; unit: string }
  | { kind: "radio"; key: string; label: string; options: string[] }
  | { kind: "text"; key: string; label: string; placeholder?: string };

export interface QuoteItemOption {
  value: string;
  label: string;
  group?: string;
  image?: string;
  fields: QuoteFieldSpec[];
}

export interface QuoteItem {
  id: string;
  optionValue: string;
  quantity: number;
  values: Record<string, string>;
}

const POOL_SIZE_FIELD: QuoteFieldSpec = {
  kind: "size",
  key: "size",
  label: "Pool Size",
  units: ["m²", "cm²", "gal"],
};

const POOL_FREQUENCY_FIELD: QuoteFieldSpec = {
  kind: "radio",
  key: "frequency",
  label: "Service Frequency",
  options: ["Weekly", "Bi-Weekly", "One-Time"],
};

const POOL_CONDITION_FIELD: QuoteFieldSpec = {
  kind: "radio",
  key: "condition",
  label: "Water Condition",
  options: ["Heavy Algae / Debris", "Heavy Oil / Deep Grime"],
};

const POOL_TYPES = [
  "Kiddie Pools",
  "Above-Ground Swimming Pools",
  "Lap Pools",
  "In-Ground Pools",
  "Family Swimming Pools",
  "Indoor Pools",
  "Olympic-Size Pools",
  "Architectural Pools",
  "Infinity Pools",
  "Natural Pools",
  "Spool (Small Pool)",
  "Saltwater Pools",
  "Plunge Pools",
];

const POOL_ADD_ONS = ["Jacuzzi Cleaning", "Steam Room Cleaning", "Sauna Room Cleaning"];

export const POOL_ITEM_OPTIONS: QuoteItemOption[] = [
  ...POOL_TYPES.map((label) => ({
    value: label,
    label,
    group: "Pool Type",
    fields: [POOL_SIZE_FIELD, POOL_FREQUENCY_FIELD, POOL_CONDITION_FIELD],
  })),
  ...POOL_ADD_ONS.map((label) => ({
    value: label,
    label,
    group: "Additional Services",
    fields: [],
  })),
];

const PRESSURE_WASHING_SIZE_FIELD: QuoteFieldSpec = {
  kind: "size",
  key: "size",
  label: "Size",
  units: ["m²", "cm²", "ft²", "linear ft", "per unit"],
};

const PRESSURE_WASHING_CONDITION_FIELD: QuoteFieldSpec = {
  kind: "radio",
  key: "condition",
  label: "Surface Condition",
  options: ["Heavy (Oil / Deep Grime)", "Normal"],
};

const PRESSURE_WASHING_GROUPS: Record<string, string[]> = {
  "Residential Care": [
    "Home Exterior Cleaning",
    "Fencing Cleaning",
    "Building Exterior Cleaning",
    "Gutter/Drains Cleaning",
  ],
  "Concrete & Surfaces": ["Driveway Cleaning", "Sidewalk Cleaning", "Walkway Cleaning", "Pavers Cleaning"],
  "Outdoor Living": ["Deck/Patio Cleaning", "Outdoor Furniture Cleaning", "Outdoor Equipment Cleaning"],
  "Specialized Jobs": [
    "Parking Garage Cleaning",
    "Surface Preparation",
    "Playground Cleaning",
    "Other Specialized Cleaning Services",
  ],
};

export const PRESSURE_WASHING_ITEM_OPTIONS: QuoteItemOption[] = Object.entries(PRESSURE_WASHING_GROUPS).flatMap(
  ([group, labels]) =>
    labels.map((label) => ({
      value: label,
      label,
      group,
      fields: [PRESSURE_WASHING_SIZE_FIELD, PRESSURE_WASHING_CONDITION_FIELD],
    })),
);

const sizeField = (label: string, units: string[] = ["m²"]): QuoteFieldSpec => ({
  kind: "size",
  key: "size",
  label,
  units,
});

export const CARPET_ITEM_OPTIONS: QuoteItemOption[] = [
  {
    value: "Carpet Cleaning",
    label: "Carpet Cleaning",
    image: "/images/services/carpet-items/carpet-cleaning.jpeg",
    fields: [sizeField("Estimated Size")],
  },
  {
    value: "Rug Cleaning",
    label: "Rug Cleaning",
    image: "/images/services/carpet-items/rug-cleaning.jpeg",
    fields: [sizeField("Estimated Size")],
  },
  {
    value: "Upholstery & Sofa Cleaning",
    label: "Upholstery & Sofa Cleaning",
    image: "/images/services/carpet-items/upholstery-sofa-cleaning.webp",
    fields: [{ kind: "dimensions", key: "dims", label: "Dimensions (Per Seat)", parts: ["width", "height"], unit: "cm" }],
  },
  {
    value: "Mattress Cleaning",
    label: "Mattress Cleaning",
    image: "/images/services/carpet-items/mattress-cleaning.jpeg",
    fields: [{ kind: "radio", key: "size", label: "Size", options: ["Single", "Double", "King"] }],
  },
  {
    value: "Curtain & Drape Cleaning",
    label: "Curtain & Drape Cleaning",
    image: "/images/services/carpet-items/curtain-drape-cleaning.jpg",
    fields: [
      { kind: "dimensions", key: "dims", label: "Dimensions (Per m)", parts: ["width", "height", "length"], unit: "m" },
    ],
  },
  {
    value: "Tile & Grout Cleaning",
    label: "Tile & Grout Cleaning",
    image: "/images/services/carpet-items/tile-grout-cleaning.jpeg",
    fields: [sizeField("Estimated Size")],
  },
  {
    value: "Pet Stain & Odor Removal",
    label: "Pet Stain & Odor Removal",
    image: "/images/services/carpet-items/pet-stain-odor-removal.jpeg",
    fields: [{ kind: "text", key: "notes", label: "Spot Treatment Details" }],
  },
  {
    value: "Leather Cleaning & Conditioning",
    label: "Leather Cleaning & Conditioning",
    image: "/images/services/carpet-items/leather-cleaning-conditioning.jpeg",
    fields: [sizeField("Size (Per Item)", ["cm"])],
  },
  {
    value: "Commercial Floor Maintenance",
    label: "Commercial Floor Maintenance",
    image: "/images/services/carpet-items/commercial-floor-maintenance.jpeg",
    fields: [sizeField("Size (Large Scale)")],
  },
  {
    value: "Hard Floor Sealing",
    label: "Hard Floor Sealing",
    image: "/images/services/carpet-items/hard-floor-sealing.jpeg",
    fields: [sizeField("Estimated Size")],
  },
  {
    value: "Stain Removal",
    label: "Stain Removal",
    image: "/images/services/carpet-items/stain-removal.jpeg",
    fields: [sizeField("Affected Area")],
  },
  {
    value: "Flood Restoration",
    label: "Flood Restoration",
    image: "/images/services/carpet-items/flood-restoration.jpeg",
    fields: [sizeField("Affected Area")],
  },
];

export function formatQuoteItem(item: QuoteItem, options: QuoteItemOption[]): string {
  const option = options.find((o) => o.value === item.optionValue);
  if (!option) return "";

  const parts = [option.label];

  for (const field of option.fields) {
    if (field.kind === "size") {
      const size = item.values[field.key];
      if (!size) continue;
      const unit = item.values[`${field.key}Unit`] ?? field.units[0];
      parts.push(`${field.label}: ${size} ${unit}`);
    } else if (field.kind === "dimensions") {
      const dims = field.parts
        .map((part) => (item.values[`${field.key}_${part}`] ? `${part} ${item.values[`${field.key}_${part}`]}${field.unit}` : null))
        .filter((v): v is string => Boolean(v));
      if (dims.length) parts.push(`${field.label}: ${dims.join(" × ")}`);
    } else if (field.kind === "radio") {
      if (item.values[field.key]) parts.push(`${field.label}: ${item.values[field.key]}`);
    } else if (field.kind === "text") {
      if (item.values[field.key]) parts.push(`${field.label}: ${item.values[field.key]}`);
    }
  }

  parts.push(`Qty: ${item.quantity}`);
  return parts.join(", ");
}
