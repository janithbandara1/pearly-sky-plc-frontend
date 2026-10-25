"use client";

import { useRef, useState } from "react";
import { Clapperboard, Play, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";

/**
 * The hero's "Watch Video" film. Paste a YouTube link (watch, youtu.be or
 * embed form) here; until it's set, the popup says the video is coming soon.
 * It plays from youtube-nocookie.com, which next.config.ts's frame-src allows.
 */
export const HERO_VIDEO_URL = "";

function toEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([\w-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&rel=0` : null;
}

export function WatchVideoButton() {
  const { translateGlobal: t } = useLanguage();
  const dialogRef = useRef<HTMLDialogElement>(null);
  // The iframe only mounts while the popup is open, so closing it stops playback.
  const [open, setOpen] = useState(false);
  const embedUrl = toEmbedUrl(HERO_VIDEO_URL);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="group flex items-center gap-3 px-2 py-1 text-slate-200 transition-colors hover:text-gold-400"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-400 bg-gold-500/20 text-gold-400 transition-transform group-hover:scale-110">
          <Play className="ml-0.5 h-3.5 w-3.5 fill-current" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider">{t("video.watch")}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={t("video.title")}
        onClose={() => setOpen(false)}
        onClick={(event) => event.target === dialogRef.current && dialogRef.current?.close()}
        className="m-auto w-[calc(100%-2rem)] max-w-3xl overflow-visible bg-transparent p-0 backdrop:bg-navy-900/90 backdrop:backdrop-blur-md"
      >
        <div className="glass-panel relative rounded-2xl border-gold-500/30! p-4">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-gold-400"
          >
            <X className="h-5 w-5" />
            {t("common.close")}
          </button>
          <div className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-xl bg-black">
            {open && embedUrl ? (
              <iframe
                src={embedUrl}
                title={t("video.title")}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="space-y-2 text-center text-slate-300">
                <Clapperboard className="mx-auto h-10 w-10 text-gold-400" />
                <p className="font-display text-lg font-bold text-white">{t("video.soonTitle")}</p>
                <p className="text-xs">{t("video.soonText")}</p>
              </div>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
