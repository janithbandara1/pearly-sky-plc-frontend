import { WORLD_MAP } from "@/lib/content/world-map";
import { getRequestLanguage } from "@/lib/i18n/server";
import { getGlobalTranslator } from "@/lib/i18n/global/server";

const { width, top, height, land, points } = WORLD_MAP;

/**
 * Dot + label per office. Labels sit on opposite sides of Paris and London
 * (only ~10 map units apart) so the two never overlap.
 */
const OFFICES = [
  { id: "gb", labelKey: "map.london", labelClass: "bottom-2 right-2" },
  { id: "fr", labelKey: "map.paris", labelClass: "left-2 top-2" },
  { id: "lk", labelKey: "map.colombo", labelClass: "left-2 top-1" },
] as const;

/** World map with a pulsing dot on each office country. A server component, so the map data never reaches the browser. */
export async function WorldMap() {
  const t = getGlobalTranslator(await getRequestLanguage());

  return (
    <div
      role="img"
      aria-label={t("map.aria")}
      className="flex aspect-video w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-navy-800/50 p-6"
    >
      {/* The dots are positioned against this wrapper, which is exactly the map's size. */}
      <div className="relative w-full">
        <svg viewBox={`0 ${top} ${width} ${height}`} className="block h-auto w-full" aria-hidden="true">
          <path d={land} fill="rgba(212,175,55,0.14)" stroke="rgba(212,175,55,0.4)" strokeWidth={0.5} strokeLinejoin="round" />
        </svg>

        {OFFICES.map(({ id, labelKey, labelClass }) => (
          <div
            key={id}
            aria-hidden="true"
            className="absolute size-0"
            style={{ left: `${(points[id].x / width) * 100}%`, top: `${((points[id].y - top) / height) * 100}%` }}
          >
            <span className="absolute -left-1.5 -top-1.5 size-3 animate-ping rounded-full bg-gold-400/70 motion-reduce:animate-none" />
            <span className="absolute -left-[5px] -top-[5px] size-2.5 rounded-full bg-gold-400 shadow-[0_0_12px_2px_rgba(212,175,55,0.8)] ring-1 ring-navy-900" />
            <span
              className={`absolute whitespace-nowrap rounded border border-gold-500/30 bg-navy-900/90 px-2 py-0.5 text-[10px] font-medium text-gold-400 ${labelClass}`}
            >
              {t(labelKey)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
