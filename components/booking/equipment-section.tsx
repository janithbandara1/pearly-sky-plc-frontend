"use client";

import { Field, FieldContent, FieldLabel, FieldTitle } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export type SupplySource = "" | "customer" | "company";

/** Also reused inline by `BookingDetailsCard` on the main booking page. */
export const SUPPLY_SOURCE_OPTIONS = [
  { value: "customer" as const, label: "Provided by the Customer" },
  { value: "company" as const, label: "Request the Company" },
];

export interface EquipmentSectionProps {
  supplySource: SupplySource;
  onSupplySourceChange: (value: SupplySource) => void;
}

export function EquipmentSection({ supplySource, onSupplySourceChange }: EquipmentSectionProps) {
  return (
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B]">
      <div className="bg-[#121E2D] px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-[#FFFDF4] sm:text-[1.3rem]">Cleaning Solvents &amp; Equipments</h2>
      </div>

      <div className="bg-[#F8F9FA] p-4 sm:p-5">
        <RadioGroup
          value={supplySource}
          onValueChange={(value) => onSupplySourceChange(value as SupplySource)}
          className="gap-2.5"
        >
          {SUPPLY_SOURCE_OPTIONS.map((opt) => (
            <FieldLabel
              key={opt.value}
              htmlFor={`supply-source-${opt.value}`}
              className="rounded-[10px] border-[1.5px] border-[#A98B4B] bg-white p-3 has-data-[state=checked]:border-2 has-data-[state=checked]:border-[#A98B4B] has-data-[state=checked]:bg-white has-data-[state=checked]:shadow-[0_0_8px_rgba(169,139,75,0.3)]"
            >
              <Field orientation="horizontal" className="!p-0">
                <FieldContent>
                  <FieldTitle className="text-sm font-medium text-[#121E2D]">{opt.label}</FieldTitle>
                </FieldContent>
                <RadioGroupItem
                  value={opt.value}
                  id={`supply-source-${opt.value}`}
                  className="border-[#A98B4B] data-checked:border-[#A98B4B] data-checked:bg-[#A98B4B]"
                />
              </Field>
            </FieldLabel>
          ))}
        </RadioGroup>
      </div>
    </section>
  );
}
