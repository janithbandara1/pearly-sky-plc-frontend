"use client";

interface ScaleCategory {
  id: string;
  label: string;
  sublabel?: string;
  icon: string;
  min: number;
  max: number;
  step: number;
  locked: boolean;
}

export const SCALE_CATEGORIES: ScaleCategory[] = [
  { id: "studio", label: "Studio", sublabel: "Apt", icon: "🏢", min: 20, max: 80, step: 1, locked: false },
  { id: "home", label: "Home", icon: "🏡", min: 81, max: 400, step: 5, locked: false },
  { id: "villa", label: "Villa", icon: "🏰", min: 401, max: 1000, step: 20, locked: false },
  { id: "estate", label: "Estate", icon: "🏛️", min: 1001, max: 5000, step: 50, locked: true },
  { id: "vip", label: "VIP", sublabel: "Diamond", icon: "💎", min: 5001, max: 9999, step: 100, locked: true },
];

export function getScaleCategory(value: number): ScaleCategory {
  return SCALE_CATEGORIES.find((c) => value >= c.min && value <= c.max) ?? SCALE_CATEGORIES[0];
}

function buildTicks(cat: ScaleCategory): number[] {
  const range = cat.max - cat.min;
  let interval = range <= 60 ? 20 : range <= 320 ? 100 : 200;
  interval = Math.ceil(interval / cat.step) * cat.step;
  const ticks: number[] = [];
  for (let t = cat.min; t <= cat.max; t += interval) ticks.push(t);
  if (ticks[ticks.length - 1] !== cat.max) ticks.push(cat.max);
  return ticks;
}

export interface PropertyScaleSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export function PropertyScaleSlider({ value, onChange }: PropertyScaleSliderProps) {
  const cat = getScaleCategory(value);
  const catPct = ((value - cat.min) / (cat.max - cat.min)) * 100;
  const ticks = buildTicks(cat);

  const increment = () => {
    const next = value + cat.step;
    if (next <= cat.max) return onChange(next);
    const idx = SCALE_CATEGORIES.findIndex((c) => c.id === cat.id);
    const nextCat = SCALE_CATEGORIES[idx + 1];
    if (nextCat && !nextCat.locked) onChange(nextCat.min);
  };

  const decrement = () => {
    const prev = value - cat.step;
    if (prev >= cat.min) return onChange(prev);
    const idx = SCALE_CATEGORIES.findIndex((c) => c.id === cat.id);
    const prevCat = SCALE_CATEGORIES[idx - 1];
    if (prevCat) onChange(prevCat.max);
  };

  return (
    <div className="overflow-hidden rounded-[14px] border-2 border-[#A98B4B]">
      <div className="flex items-center justify-between gap-2 border-b border-[#A98B4B]/35 bg-[#0B1B34] px-5 py-[18px]">
        <span className="text-[16px] font-bold text-[#FFFDF4]">
          {cat.icon} {cat.label}
          {cat.sublabel ? `/${cat.sublabel}` : ""}
        </span>
        <div className="h-full w-px self-stretch bg-[#A98B4B]/50" />
        <span className="text-[16px] font-bold text-[#FFFDF4]">{value} m²</span>
      </div>

      <div className="bg-[#060E1A] px-4 py-7">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={decrement}
            aria-label="Decrease property size"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#A98B4B] bg-[#A98B4B]/10 text-xl leading-none font-bold text-[#A98B4B] transition hover:bg-[#A98B4B]/20"
          >
            −
          </button>

          <div className="relative h-6 flex-1">
            <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2 rounded-full bg-[#A98B4B]/18" />
            <div
              className="absolute top-1/2 left-0 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#7A6335] to-[#D4A843] shadow-[0_0_10px_rgba(212,168,67,0.55)]"
              style={{ width: `${catPct}%` }}
            />
            <input
              type="range"
              min={cat.min}
              max={cat.max}
              step={cat.step}
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
            <div
              className="pointer-events-none absolute top-1/2 h-[13px] w-[22px] -translate-y-1/2 -translate-x-1/2 rounded-full bg-[#A98B4B]"
              style={{ left: `${catPct}%` }}
            />
          </div>

          <button
            type="button"
            onClick={increment}
            aria-label="Increase property size"
            className="flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-[#A98B4B] bg-[#A98B4B]/10 text-xl leading-none font-bold text-[#A98B4B] transition hover:bg-[#A98B4B]/20"
          >
            +
          </button>
        </div>

        <div className="relative mx-11 mt-1.5 flex justify-between">
          {ticks.map((t) => (
            <span key={t} className="text-[10px] font-semibold text-[#A98B4B]/75">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex border-t border-[#A98B4B]/30 bg-[#060E1A]">
        {SCALE_CATEGORIES.map((c, i) => {
          const active = c.id === cat.id;
          return (
            <button
              key={c.id}
              type="button"
              disabled={c.locked}
              onClick={() => !c.locked && onChange(c.min)}
              className={`flex flex-1 flex-col items-center gap-0.5 py-3.5 transition ${
                i < SCALE_CATEGORIES.length - 1 ? "border-r border-[#A98B4B]/20" : ""
              } ${active ? "bg-[#A98B4B]/22" : ""} ${
                c.locked ? "cursor-default opacity-[0.36]" : "cursor-pointer"
              }`}
            >
              <span className="text-base leading-none">{c.icon}</span>
              <span
                className={`text-[9px] font-medium tracking-wide ${
                  active ? "font-extrabold tracking-[0.04em] text-[#D4A843]" : "text-[#FFFDF4]/65"
                }`}
              >
                {c.label}
              </span>
              {c.locked && <span className="text-[7px] text-[#A98B4B]/45">🔒</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
