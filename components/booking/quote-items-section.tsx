"use client";

import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  formatQuoteItem,
  type QuoteFieldSpec,
  type QuoteItem,
  type QuoteItemOption,
} from "@/lib/content/quote-items";

export function FieldInput({
  field,
  values,
  onChange,
}: {
  field: QuoteFieldSpec;
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  if (field.kind === "size") {
    return (
      <div className="space-y-1.5">
        <Label>{field.label}</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            value={values[field.key] ?? ""}
            onChange={(e) => onChange(field.key, e.target.value)}
            className="bg-white"
          />
          <Select
            value={values[`${field.key}Unit`] ?? field.units[0]}
            onValueChange={(value) => onChange(`${field.key}Unit`, value)}
          >
            <SelectTrigger className="w-28 bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {field.units.map((unit) => (
                <SelectItem key={unit} value={unit}>
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    );
  }

  if (field.kind === "dimensions") {
    return (
      <div className="space-y-1.5">
        <Label>{field.label}</Label>
        <div className="flex items-center gap-2">
          {field.parts.map((part) => (
            <Input
              key={part}
              type="number"
              min="0"
              placeholder={part[0].toUpperCase() + part.slice(1)}
              value={values[`${field.key}_${part}`] ?? ""}
              onChange={(e) => onChange(`${field.key}_${part}`, e.target.value)}
              className="bg-white"
            />
          ))}
          <span className="shrink-0 text-sm text-[#555]">{field.unit}</span>
        </div>
      </div>
    );
  }

  if (field.kind === "radio") {
    return (
      <div className="space-y-1.5">
        <Label>{field.label}</Label>
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${field.options.length}, minmax(0, 1fr))` }}>
          {field.options.map((option) => {
            const checked = values[field.key] === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => onChange(field.key, option)}
                className={`w-full rounded-[10px] bg-white px-3 py-2 text-xs font-medium text-[#121E2D] transition ${
                  checked ? "border-2 border-[#A98B4B] shadow-[0_0_8px_rgba(169,139,75,0.3)]" : "border-[1.5px] border-[#A98B4B]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1.5">
      <Label>{field.label}</Label>
      <Input
        value={values[field.key] ?? ""}
        onChange={(e) => onChange(field.key, e.target.value)}
        placeholder={field.placeholder}
        className="bg-white"
      />
    </div>
  );
}

export interface QuoteItemsSectionProps {
  title: string;
  itemOptions: QuoteItemOption[];
  items: QuoteItem[];
  onItemsChange: (items: QuoteItem[]) => void;
}

export function QuoteItemsSection({ title, itemOptions, items, onItemsChange }: QuoteItemsSectionProps) {
  const [selectedValue, setSelectedValue] = useState(itemOptions[0]?.value ?? "");
  const [quantity, setQuantity] = useState(1);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});

  const selectedOption = itemOptions.find((opt) => opt.value === selectedValue);
  const groups = Array.from(new Set(itemOptions.map((opt) => opt.group).filter(Boolean))) as string[];
  const fields = selectedOption?.fields ?? [];
  const leadingFields = fields.slice(0, -1);
  const lastField = fields[fields.length - 1];

  function handleSelectChange(value: string) {
    setSelectedValue(value);
    setFieldValues({});
  }

  function handleAdd() {
    if (!selectedOption) return;
    onItemsChange([
      ...items,
      { id: crypto.randomUUID(), optionValue: selectedOption.value, quantity, values: fieldValues },
    ]);
    setQuantity(1);
    setFieldValues({});
  }

  function handleRemove(id: string) {
    onItemsChange(items.filter((item) => item.id !== id));
  }

  return (
    <section className="overflow-hidden rounded-[12px] border border-brand-gold-dark">
      <div className="bg-brand-navy px-5 py-4 text-center">
        <h2 className="text-[1.1rem] font-bold text-brand-cream sm:text-[1.3rem]">{title}</h2>
      </div>

      <div className="flex flex-col gap-4 bg-[#F8F9FA] p-4 sm:p-5">
        <div className="space-y-1.5">
          <Label>Service Type</Label>
          <Select value={selectedValue} onValueChange={handleSelectChange}>
            <SelectTrigger className="w-full bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {groups.length > 0
                ? groups.map((group) => (
                    <SelectGroup key={group}>
                      <SelectLabel>{group}</SelectLabel>
                      {itemOptions
                        .filter((opt) => opt.group === group)
                        .map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  ))
                : itemOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </div>

        {leadingFields.map((field) => (
          <FieldInput
            key={field.key}
            field={field}
            values={fieldValues}
            onChange={(key, value) => setFieldValues((prev) => ({ ...prev, [key]: value }))}
          />
        ))}

        <div className={lastField ? "grid grid-cols-2 gap-4" : ""}>
          {lastField && (
            <FieldInput
              field={lastField}
              values={fieldValues}
              onChange={(key, value) => setFieldValues((prev) => ({ ...prev, [key]: value }))}
            />
          )}

          <div className="space-y-1.5">
            <Label>Quantity</Label>
            <div className="flex h-9 w-full items-center justify-between rounded-lg border border-brand-gold-dark bg-white px-1.5">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-6 items-center justify-center rounded-full bg-brand-gold/40 text-brand-navy transition hover:brightness-95"
              >
                <Minus className="size-3" />
              </button>
              <span className="text-sm font-semibold text-brand-navy">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-6 items-center justify-center rounded-full bg-brand-gold-dark text-white transition hover:brightness-95"
              >
                <Plus className="size-3" />
              </button>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="w-full rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:bg-brand-gold/90"
        >
          Add
        </button>

        {items.length > 0 && (
          <ul className="flex flex-col gap-2 border-t border-brand-gold-dark/30 pt-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-3 rounded-[10px] border-[1.5px] border-brand-gold-dark bg-white px-3 py-2.5 text-sm text-[#121E2D]"
              >
                <span>{formatQuoteItem(item, itemOptions)}</span>
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  aria-label="Remove item"
                  className="shrink-0 text-[#555] hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
