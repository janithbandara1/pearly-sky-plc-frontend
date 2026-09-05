"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { QuotationSummaryCard } from "@/components/booking/quotation-summary-card";
import { ApiError } from "@/lib/auth-context";
import { getQuotationAdmin, Quotation, updateQuotationAdmin } from "@/lib/quotation-api";
import { useStaffAuth } from "@/lib/staff-auth-context";

const STATUS_OPTIONS: Quotation["status"][] = ["new", "contacted", "closed"];

export default function StaffQuotationDetailsPage() {
  const params = useParams<{ id: string }>();
  const quotationId = Number(params.id);
  const router = useRouter();
  const { accessToken } = useStaffAuth();

  const [quotation, setQuotation] = useState<Quotation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<Quotation["status"]>("new");
  const [saving, setSaving] = useState(false);

  const loadData = useCallback(async () => {
    if (!accessToken) return;
    const data = await getQuotationAdmin(accessToken, quotationId);
    setQuotation(data);
  }, [accessToken, quotationId]);

  useEffect(() => {
    setLoading(true);
    loadData()
      .catch((err) => setError(err instanceof ApiError ? err.message : "Failed to load quotation."))
      .finally(() => setLoading(false));
  }, [loadData]);

  function openEdit() {
    if (!quotation) return;
    setEditStatus(quotation.status);
    setEditing(true);
  }

  async function handleSave() {
    if (!accessToken || !quotation) return;
    setSaving(true);
    try {
      const updated = await updateQuotationAdmin(accessToken, quotation.id, { status: editStatus });
      setQuotation((prev) => (prev ? { ...prev, ...updated } : updated));
      toast.success(`Quotation ${updated.referenceNumber} updated.`);
      setEditing(false);
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "Failed to save quotation.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Go back"
        onClick={() => router.back()}
      >
        <ArrowLeft className="size-4" />
      </Button>

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Quotation details</h1>
        {quotation && <Button onClick={openEdit}>Edit</Button>}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {loading && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-6 lg:col-start-3">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2 lg:col-start-1 lg:row-start-1">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      )}

      {!loading && quotation && (
        <QuotationSummaryCard
          referenceNumber={quotation.referenceNumber}
          status={quotation.status}
          serviceLabel={quotation.service.label}
          date={quotation.date}
          time={quotation.time}
          propertyType={quotation.propertyType}
          propertySizeSqm={quotation.propertySizeSqm}
          quoteItemsTitle={quotation.quoteItemsTitle}
          quoteItems={quotation.quoteItems}
          numCleaners={quotation.numCleaners}
          durationHours={quotation.durationHours}
          genderPreference={quotation.genderPreference}
          languagePreference={quotation.languagePreference}
          specialRequirements={quotation.specialRequirements}
          howGetIn={quotation.howGetIn}
          howHeard={quotation.howHeard}
          supplySource={quotation.supplySource}
          equipmentItems={quotation.equipmentItems}
          customerName={
            quotation.customer ? `${quotation.customer.firstName} ${quotation.customer.lastName ?? ""}`.trim() : undefined
          }
          customerEmail={quotation.customer?.email}
          customerPhone={quotation.customer?.contact ?? undefined}
          address={{
            streetAddress: quotation.streetAddress,
            unit: quotation.unit,
            city: quotation.city,
            state: quotation.state,
            country: quotation.country,
            postalCode: quotation.postalCode,
          }}
        />
      )}

      <Dialog open={editing} onOpenChange={setEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit quotation</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            <Label htmlFor="status">Status</Label>
            <Select value={editStatus} onValueChange={(value) => setEditStatus(value as Quotation["status"])}>
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => (
                  <SelectItem key={s} value={s} className="capitalize">
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(false)} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving…" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
