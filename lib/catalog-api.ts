import { apiFetch } from "./api";

export interface CatalogService {
  id: number;
  name: string;
  label: string;
  price: string | null;
  status: "active" | "inactive";
}

export function getServices() {
  return apiFetch<CatalogService[]>("/catalog/services");
}
