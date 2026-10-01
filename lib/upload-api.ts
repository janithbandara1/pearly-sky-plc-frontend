import { apiFetch } from "./api";

/** Mirrors CHECKOUT_ATTACHMENT_TYPES / _MAX_BYTES / _MAX_COUNT in backend/src/modules/uploads/r2-storage.service.ts. */
export const CHECKOUT_ATTACHMENT_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
];
/** For the file picker's `accept` — extensions too, since some OSes report HEIC/Office files without a MIME type. */
export const CHECKOUT_ATTACHMENT_ACCEPT = [
  ...CHECKOUT_ATTACHMENT_TYPES,
  ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,.doc,.docx,.xls,.xlsx,.txt",
].join(",");
export const CHECKOUT_ATTACHMENT_MAX_BYTES = 5 * 1024 * 1024;
export const CHECKOUT_ATTACHMENT_MAX_COUNT = 5;

/** A file attached to a booking/quotation, as sent in the create payload. */
export interface AttachmentRef {
  key: string;
  name: string;
}

/** An attachment on a booking/quotation detail response — `url` is a short-lived presigned R2 link. */
export interface AttachmentLink {
  name: string;
  url: string;
  isImage: boolean;
}

/** Browsers report HEIC and some Office files with an empty type — fall back to the extension. */
const EXTENSION_TYPES: Record<string, string> = {
  heic: "image/heic",
  heif: "image/heif",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xls: "application/vnd.ms-excel",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
};

export function attachmentContentType(file: File): string {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_TYPES[ext] ?? "";
}

/**
 * Uploads one checkout attachment straight to Cloudflare R2: asks the API for
 * a presigned PUT URL (signed for this exact type and size), then PUTs the
 * file there. Returns the object key to send with the booking/quotation.
 */
export async function uploadCheckoutAttachment(file: File): Promise<string> {
  const contentType = attachmentContentType(file);
  const { key, uploadUrl } = await apiFetch<{ key: string; uploadUrl: string }>("/uploads/attachments", {
    method: "POST",
    body: { contentType, size: file.size },
  });

  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { "Content-Type": contentType },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
  return key;
}
