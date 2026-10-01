"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, Loader2, Paperclip, RotateCw, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import {
  attachmentContentType,
  CHECKOUT_ATTACHMENT_ACCEPT,
  CHECKOUT_ATTACHMENT_MAX_BYTES,
  CHECKOUT_ATTACHMENT_MAX_COUNT,
  CHECKOUT_ATTACHMENT_TYPES,
  uploadCheckoutAttachment,
  type AttachmentRef,
} from "@/lib/upload-api";

/** Types browsers can render as an <img> preview (HEIC mostly can't). */
const PREVIEWABLE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export interface CheckoutAttachment {
  id: string;
  file: File;
  /** blob: URL for an image thumbnail; null for documents and non-previewable images. */
  previewUrl: string | null;
  status: "uploading" | "done" | "error";
  /** R2 object key, set once the upload succeeds. */
  key?: string;
}

/** Successfully uploaded attachments, for the booking/quotation payload. */
export function uploadedAttachments(attachments: CheckoutAttachment[]): AttachmentRef[] | undefined {
  const refs = attachments.flatMap((a) =>
    a.status === "done" && a.key ? [{ key: a.key, name: a.file.name.slice(0, 200) }] : [],
  );
  return refs.length ? refs : undefined;
}

export function hasPendingAttachmentUploads(attachments: CheckoutAttachment[]): boolean {
  return attachments.some((a) => a.status === "uploading");
}

interface CheckoutAttachmentUploadProps {
  attachments: CheckoutAttachment[];
  onAttachmentsChange: (update: (prev: CheckoutAttachment[]) => CheckoutAttachment[]) => void;
  /** "dark" for the navy checkout cards (default), "light" for cream forms like request-quotation. */
  tone?: "dark" | "light";
  /** Prefix for the heading, e.g. a form step number like "9.". */
  labelPrefix?: string;
}

const TONES = {
  dark: {
    label: "mb-1 text-sm font-semibold text-brand-cream/90",
    hint: "mb-3 text-xs text-brand-cream/60",
    tile: "border-brand-gold/40 bg-brand-cream/10 text-brand-cream",
    add: "border-brand-gold/60 text-brand-cream/80 hover:border-brand-gold hover:text-brand-cream",
    error: "text-red-300",
  },
  light: {
    label: "mb-1 text-xs font-semibold text-brand-navy",
    hint: "mb-3 text-xs text-muted-foreground",
    tile: "border-[#A98B4B]/40 bg-[#FFFDF4] text-brand-navy",
    add: "border-[#A98B4B]/60 bg-[#FFFDF4] text-brand-navy/80 hover:border-[#A98B4B] hover:text-brand-navy",
    error: "text-destructive",
  },
};

/**
 * File picker for the checkout Preferences card and the request-quotation
 * form — photos, PDFs and Office/text documents. Each file starts uploading
 * to R2 as soon as it's picked, so submitting only has to send the keys.
 */
export function CheckoutAttachmentUpload({
  attachments,
  onAttachmentsChange,
  tone = "dark",
  labelPrefix,
}: CheckoutAttachmentUploadProps) {
  const { translate } = useLanguage();
  const styles = TONES[tone];
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  // Revoke preview object URLs when the component unmounts.
  const attachmentsRef = useRef(attachments);
  useEffect(() => {
    attachmentsRef.current = attachments;
  }, [attachments]);
  useEffect(
    () => () =>
      attachmentsRef.current.forEach((a) => {
        if (a.previewUrl) URL.revokeObjectURL(a.previewUrl);
      }),
    [],
  );

  function setStatus(id: string, patch: Partial<CheckoutAttachment>) {
    onAttachmentsChange((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }

  function startUpload(attachment: CheckoutAttachment) {
    uploadCheckoutAttachment(attachment.file)
      .then((key) => setStatus(attachment.id, { status: "done", key }))
      .catch(() => setStatus(attachment.id, { status: "error" }));
  }

  function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setError(null);

    const room = CHECKOUT_ATTACHMENT_MAX_COUNT - attachments.length;
    const files = Array.from(fileList);
    if (files.length > room) setError(translate("preferencesAttachmentsLimit"));

    const accepted: CheckoutAttachment[] = [];
    for (const file of files.slice(0, Math.max(room, 0))) {
      const type = attachmentContentType(file);
      if (!CHECKOUT_ATTACHMENT_TYPES.includes(type)) {
        setError(translate("preferencesAttachmentsBadType"));
        continue;
      }
      if (file.size > CHECKOUT_ATTACHMENT_MAX_BYTES) {
        setError(translate("preferencesAttachmentsTooLarge"));
        continue;
      }
      accepted.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: PREVIEWABLE_TYPES.has(type) ? URL.createObjectURL(file) : null,
        status: "uploading",
      });
    }

    if (accepted.length) {
      onAttachmentsChange((prev) => [...prev, ...accepted]);
      accepted.forEach(startUpload);
    }
  }

  function retry(attachment: CheckoutAttachment) {
    setStatus(attachment.id, { status: "uploading" });
    startUpload(attachment);
  }

  function remove(attachment: CheckoutAttachment) {
    if (attachment.previewUrl) URL.revokeObjectURL(attachment.previewUrl);
    onAttachmentsChange((prev) => prev.filter((a) => a.id !== attachment.id));
  }

  return (
    <div>
      <p className={styles.label}>
        {labelPrefix ? `${labelPrefix} ` : ""}
        {translate("preferencesAttachments")}
      </p>
      <p className={styles.hint}>{translate("preferencesAttachmentsHint")}</p>

      <div className="flex flex-wrap gap-3">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            title={attachment.file.name}
            className={`relative size-20 overflow-hidden rounded-lg border ${styles.tile}`}
          >
            {attachment.previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element -- local blob: preview, not an optimizable asset
              <img src={attachment.previewUrl} alt="" className="size-full object-cover" />
            ) : (
              <div className="flex size-full flex-col items-center justify-center gap-1 p-1.5">
                <FileText className="size-6 shrink-0 opacity-80" />
                <span className="w-full truncate text-center text-[10px] leading-tight">{attachment.file.name}</span>
              </div>
            )}

            {attachment.status === "uploading" && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/60">
                <Loader2
                  className="size-5 animate-spin text-brand-cream"
                  aria-label={translate("preferencesAttachmentsUploading")}
                />
              </div>
            )}
            {attachment.status === "error" && (
              <button
                type="button"
                onClick={() => retry(attachment)}
                title={translate("preferencesAttachmentsFailed")}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-red-900/70 text-[10px] font-semibold text-white"
              >
                <RotateCw className="size-4" />
                {translate("preferencesAttachmentsFailed")}
              </button>
            )}

            <button
              type="button"
              onClick={() => remove(attachment)}
              aria-label={translate("preferencesAttachmentsRemove")}
              className="absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-brand-navy/80 text-brand-cream transition hover:bg-brand-navy"
            >
              <X className="size-3" />
            </button>
          </div>
        ))}

        {attachments.length < CHECKOUT_ATTACHMENT_MAX_COUNT && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className={`flex size-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-[11px] font-semibold transition ${styles.add}`}
          >
            <Paperclip className="size-5 text-brand-gold" />
            {translate("preferencesAttachmentsAdd")}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={CHECKOUT_ATTACHMENT_ACCEPT}
        multiple
        className="hidden"
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {error && <p className={`mt-2 text-xs ${styles.error}`}>{error}</p>}
    </div>
  );
}
