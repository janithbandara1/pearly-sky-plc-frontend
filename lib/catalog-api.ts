import { apiFetch } from "./api";

export type ServiceCategory = "property_care" | "bespoke_lifestyle";

export interface CatalogService {
  id: number;
  name: string;
  label: string;
  price: string | null;
  status: "active" | "inactive";
  category: ServiceCategory;
  description: string | null;
  imageUrl: string | null;
}

export function getServices() {
  return apiFetch<CatalogService[]>("/catalog/services");
}
