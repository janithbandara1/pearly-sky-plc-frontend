export interface MovingService {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  basePrice: number;
  image: string;
}

export interface MovingAddon {
  id: string;
  name: string;
  price: number;
  checked: boolean;
  note?: string;
}

export interface StepName {
  number: number;
  label: string;
}

export interface BookingState {
  currentStep: number;
  totalSteps: number;
  selectedServiceId: string;
  movingType: string;
  propertyType: string;
  pickupFloor: string;
  pickupElevator: string;
  dropFloor: string;
  dropElevator: string;
  moveDate: string;
  moveTime: string;
  moveVolume: string;
  pickupAddress: string;
  dropAddress: string;
  selectedAddons: string[];
  custName: string;
  custEmail: string;
  custPhone: string;
  custNotes: string;
  bookingReference?: string;
}

export const MOVING_SERVICES: MovingService[] = [
  {
    id: "home-moving",
    title: "Home Moving",
    subtitle: "(Moving In/Out)",
    icon: "home",
    basePrice: 350,
    image: "/images/services/transport/transport-1.webp",
  }, 
  {
    id: "apartment-moving",
    title: "Apartment Moving",
    subtitle: "(Studio / T2 / T3 / T4+)",
    icon: "building",
    basePrice: 280,
    image: "/images/services/transport/transport-2.webp",
  },
  {
    id: "office-relocation",
    title: "Office Relocation",
    subtitle: "(Business & Commercial)",
    icon: "briefcase",
    basePrice: 500,
    image: "/images/services/transport/transport-3.webp",
  },
  {
    id: "packing-unpacking",
    title: "Packing & Unpacking",
    subtitle: "(Full White Glove Service)",
    icon: "box",
    basePrice: 180,
    image: "/images/services/transport/transport-4.webp",
  },
  {
    id: "furniture-handling",
    title: "Furniture Handling",
    subtitle: "(Heavy / Delicate Items)",
    icon: "armchair",
    basePrice: 200,
    image: "/images/services/transport/transport-5.webp",
  },
  {
    id: "transport-only",
    title: "Transport Only",
    subtitle: "(Vehicle & Driver)",
    icon: "truck",
    basePrice: 220,
    image: "/images/services/transport/transport-6.webp",
  },
];

export const MOVING_ADDONS: MovingAddon[] = [
  { id: "packing", name: "Packing Service", price: 80, checked: true },
  { id: "unpacking", name: "Unpacking Service", price: 80, checked: false },
  { id: "disassembly", name: "Furniture Disassembly", price: 60, checked: true },
  { id: "assembly", name: "Furniture Assembly", price: 60, checked: false },
  { id: "special", name: "Special Item Handling", price: 100, checked: false, note: "Piano, Safe, etc." },
  { id: "cleaning", name: "Cleaning After Move", price: 90, checked: false },
];

export const STEP_NAMES: StepName[] = [
  { number: 1, label: "Service" },
  { number: 2, label: "Details" },
  { number: 3, label: "Address" },
  { number: 4, label: "Review" },
  { number: 5, label: "Payment" },
];

export function calculateTotals(
  selectedServiceId: string,
  moveVolume: string,
  pickupFloor: string,
  pickupElevator: string,
  dropFloor: string,
  dropElevator: string,
  selectedAddons: string[],
): { base: number; addons: number; total: number } {
  const selectedService = MOVING_SERVICES.find((s) => s.id === selectedServiceId);
  let base = selectedService ? selectedService.basePrice : 350;

  // Volume Surcharge
  if (moveVolume.includes("Large")) base += 80;
  if (moveVolume.includes("Extra Large")) base += 150;

  // Floor Surcharge without elevator
  if (pickupElevator === "No" && !pickupFloor.includes("Ground")) base += 40;
  if (dropElevator === "No" && !dropFloor.includes("Ground")) base += 40;

  // Addons total
  let addonsTotal = 0;
  selectedAddons.forEach((addonId) => {
    const item = MOVING_ADDONS.find((a) => a.id === addonId);
    if (item) addonsTotal += item.price;
  });

  return {
    base,
    addons: addonsTotal,
    total: base + addonsTotal,
  };
}
