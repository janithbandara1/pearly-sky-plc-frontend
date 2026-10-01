import { FileText } from "lucide-react";
import type { AttachmentLink } from "@/lib/upload-api";

/**
 * Files a customer attached at checkout: images as thumbnails, everything
 * else as a named file row. URLs are short-lived presigned R2 links from the
 * API (the bucket is private), so images are plain <img>s rather than
 * next/image, which would try to cache them.
 */
export function SummaryAttachments({ attachments }: { attachments: AttachmentLink[] }) {
  const images = attachments.filter((a) => a.isImage);
  const files = attachments.filter((a) => !a.isImage);

  return (
    <div className="flex flex-col gap-3">
      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {images.map((a) => (
            <a
              key={a.url}
              href={a.url}
              target="_blank"
              rel="noopener noreferrer"
              title={a.name}
              className="block aspect-square overflow-hidden rounded-md border transition hover:opacity-90"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- presigned, expiring URL */}
              <img src={a.url} alt={a.name} loading="lazy" className="size-full object-cover" />
            </a>
          ))}
        </div>
      )}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2 text-sm">
          {files.map((a) => (
            <li key={a.url}>
              <a
                href={a.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-md border px-3 py-2 transition hover:bg-muted"
              >
                <FileText className="size-4 shrink-0 text-muted-foreground" />
                <span className="truncate">{a.name}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
