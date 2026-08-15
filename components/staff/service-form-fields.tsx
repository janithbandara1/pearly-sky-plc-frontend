"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import type { CreateServicePayload } from "@/lib/admin-catalog-api";

interface ServiceFormFieldsProps {
  form: CreateServicePayload;
  onChange: (form: CreateServicePayload) => void;
}

export function ServiceFormFields({ form, onChange }: ServiceFormFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor="label">Label</Label>
        <Input
          id="label"
          value={form.label}
          onChange={(e) => onChange({ ...form, label: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="name">Slug</Label>
        <Input
          id="name"
          value={form.name}
          onChange={(e) => onChange({ ...form, name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="category">Category</Label>
        <Select
          value={form.category}
          onValueChange={(value) =>
            onChange({ ...form, category: value as CreateServicePayload["category"] })
          }
        >
          <SelectTrigger id="category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="property_care">Property care</SelectItem>
            <SelectItem value="bespoke_lifestyle">Bespoke lifestyle</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <Label htmlFor="status">Status</Label>
        <Select
          value={form.status}
          onValueChange={(value) =>
            onChange({ ...form, status: value as CreateServicePayload["status"] })
          }
        >
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          value={form.imageUrl}
          onChange={(e) => onChange({ ...form, imageUrl: e.target.value })}
        />
      </div>
      <div className="col-span-2 flex flex-col gap-1">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          value={form.description}
          onChange={(e) => onChange({ ...form, description: e.target.value })}
        />
        <p className="text-xs text-muted-foreground">
          Visible page copy — shown on the homepage card and as the booking/quotation page subtitle.
        </p>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        <Label>Booking & Quotation</Label>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-between gap-2 rounded-md border p-3">
            <Label htmlFor="isBookable" className="font-normal">Is Bookable</Label>
            <Switch
              id="isBookable"
              checked={!!form.isBookable}
              onCheckedChange={(checked) => onChange({ ...form, isBookable: checked })}
            />
          </div>
          <div className="flex items-center justify-between gap-2 rounded-md border p-3">
            <Label htmlFor="isQuotable" className="font-normal">Is Quotable</Label>
            <Switch
              id="isQuotable"
              checked={!!form.isQuotable}
              onCheckedChange={(checked) => onChange({ ...form, isQuotable: checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
