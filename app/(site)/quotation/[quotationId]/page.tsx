"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useEffect, useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import { getMyQuotation, getQuotationPdfUrl, Quotation } from "@/lib/quotation-api";

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function QuotationStatus({ quotationId }: { quotationId: number }) {
  const searchParams = useSearchParams();
  const refFromQuery = searchParams.get("ref");

  const { status: authStatus, accessToken } = useAuth();

  const [quotation, setQuotation] = useState<Quotation | null>(null);

  useEffect(() => {
    if (!accessToken) return;
    getMyQuotation(accessToken, quotationId)
      .then(setQuotation)
      .catch(() => undefined);
  }, [accessToken, quotationId]);

  const reference = quotation?.referenceNumber ?? refFromQuery;

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-col items-center gap-2 text-center">
        <CheckCircle2 className="mb-1 h-10 w-10 text-emerald-600" />
        <CardTitle className="text-xl">Quotation request received</CardTitle>
        <CardDescription className="max-w-xs">
          Thanks for requesting a quotation! Our team will review your details and get back to you shortly.
        </CardDescription>
      </CardHeader>

      {(reference || quotation) && (
        <CardContent className="flex flex-col gap-4">
          <div>
            {reference && <DetailRow label="Reference" value={reference} />}
            <DetailRow label="Status" value={<Badge className="bg-muted text-muted-foreground">Received</Badge>} />
            {quotation && (
              <>
                <DetailRow label="Service" value={quotation.service.label} />
                {quotation.date && (
                  <DetailRow
                    label="Preferred date & time"
                    value={quotation.time ? `${quotation.date} at ${quotation.time}` : quotation.date}
                  />
                )}
              </>
            )}
          </div>
        </CardContent>
      )}

      <CardFooter className="flex flex-col gap-2">
        {reference && (
          <Button asChild variant="outline" className="w-full">
            <a href={getQuotationPdfUrl(quotationId, reference)} download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        )}
        {authStatus === "authenticated" ? (
          <Button asChild className="w-full">
            <Link href="/quotations">Go to my quotations</Link>
          </Button>
        ) : (
          <Button asChild className="w-full">
            <Link href="/signup">Create an account</Link>
          </Button>
        )}
        <Button asChild variant="outline" className="w-full">
          <Link href="/">Back to home</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function QuotationStatusPage({
  params,
}: {
  params: Promise<{ quotationId: string }>;
}) {
  const { quotationId } = use(params);

  return (
    <div className="mx-auto w-full max-w-lg flex-1 p-6">
      <Suspense fallback={null}>
        <QuotationStatus quotationId={Number(quotationId)} />
      </Suspense>
    </div>
  );
}
