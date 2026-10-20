export type ServiceCategory = "all" | string;

export interface CatalogItem {
  id: string;
  category: string;
  badge?: string;
  title: string;
  description: string;
  price: number;
  unit: string;
}

export interface ConditionOption {
  id: string;
  title: string;
  price: number;
  desc: string;
  badge?:string;
}

export interface AddonOption {
  id: string;
  title: string;
  price: number;
  desc: string;
}

export interface CartItem {
  id: string;
  name: string;
  detail: string;
  quantity: number;
  unitPrice: number;
}

export interface ServiceStepsHeaders{
  step1Header:string,
  step1Description:string,
  step2Header:string,
  step2Description:string,
  step3Header:string,
  step3Description:string,
  step4Header:string,
  step4Description:string,
  step5Header:string,
  step5Description:string,
  confirmedServiceBookin:string,
}

export interface ServiceConfig {
  type?: string;
  categories?: { id: string; label: string }[];
  catalog?: CatalogItem[];
  conditions?: ConditionOption[];
  serviceStepDetails:ServiceStepsHeaders;
  addons?: AddonOption[];
  promoCodeDefault?: string;
  taxRate: number;
  conditionsLabel?: string;
  addonsLabel?: string;
}

export interface BookingSchedule {
  date: string;
  timeWindow: string;
}