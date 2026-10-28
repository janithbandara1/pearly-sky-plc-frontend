"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { Calendar, Clock, ChevronLeft, ChevronRight, CalendarDays, Check, Calendar1Icon, Star, ShieldCheck } from "lucide-react";
import { usePoolTheme } from "@/lib/pool-theme-context";

const TIME_START = "05:30";
const TIME_END = "17:30";
const TIME_STEP_MINUTES = 30;

const WEEKDAY_KEYS: TranslationKey[] = [
  "weekdayMo",
  "weekdayTu",
  "weekdayWe",
  "weekdayTh",
  "weekdayFr",
  "weekdaySa",
  "weekdaySu",
];

const MONTH_KEYS: TranslationKey[] = [
  "monthJan",
  "monthFeb",
  "monthMar",
  "monthApr",
  "monthMay",
  "monthJun",
  "monthJul",
  "monthAug",
  "monthSep",
  "monthOct",
  "monthNov",
  "monthDec",
];

function toDateKey(d: Date): string {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function buildTimeSlots(): string[] {
  const slots: string[] = [];
  for (let m = toMinutes(TIME_START); m <= toMinutes(TIME_END); m += TIME_STEP_MINUTES) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
  }
  return slots;
}

function formatAmPm(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

const TIME_SLOTS = buildTimeSlots();

export interface DateTimeSectionProps {
  date: string;
  onDateChange: (date: string) => void;
  time: string;
  onTimeChange: (time: string) => void;
  theme?: string;
  isQuote?: boolean;
}

export function DateTimeSection(
  { date, onDateChange, time, onTimeChange, theme: themeProp, isQuote=false }: DateTimeSectionProps) {
  const { theme: contextTheme } = usePoolTheme();
  const activeTheme = themeProp ?? contextTheme ?? "dark";
  const isLight = activeTheme === "light";

  const { translate } = useLanguage();
  const today = useMemo(() => startOfDay(new Date()), []);
  const minSelectable = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 1);
    return d;
  }, [today]);
  
  const [viewMonth, setViewMonth] = useState(() => new Date(minSelectable.getFullYear(), minSelectable.getMonth(), 1));

  const canGoPrevMonth =
    viewMonth.getFullYear() > minSelectable.getFullYear() ||
    (viewMonth.getFullYear() === minSelectable.getFullYear() && viewMonth.getMonth() > minSelectable.getMonth());

  const cells = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const list: (Date | null)[] = Array.from({ length: firstWeekday }, () => null);
    for (let day = 1; day <= daysInMonth; day++) list.push(new Date(year, month, day));
    return list;
  }, [viewMonth]); 

  return (
    <section className={`overflow-hidden rounded-2xl border shadow-xl transition-colors duration-300 ${
      isLight ? "border-[#C5A059] bg-white text-[#1A2238]" : "bg-[#1B2A40] border-[#C5A059] text-white"
    }`}>
      {/* Top Header Bar */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b px-5 py-4 sm:px-7 ${
        isLight ? "border-[#D9DDE5] bg-[#F7F5F0]" : "border-[#718096]/40 bg-[#152238]"
      }`}>
        <div className="flex items-center gap-3">
          
          <div>
            {!isQuote && (<span
              className={`text-[10px] sm:text-xs font-sans font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase ${
                isLight ? "text-[#D8B63F]" : "text-[#FFD766]"
              }`}
            >
              Step 2 of 6
            </span>)}

            {isQuote ? (
            <div className="flex items-center space-x-3.5 ">
              <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${
                isLight ? "bg-[#D8B63F]/10 border-[#D8B63F]/30 text-[#D8B63F]" : "bg-[#FFD766]/10 border-[#FFD766]/30 text-[#FFD766]"
              }`}>
                <Calendar className="w-5 h-5" />
              </div>
            <div>
              <h2
                 className={`font-serif text-2xl font-bold tracking-tight ${
                   isLight ? "text-[#1A2238]" : "text-white"
                 }`}
                >
                5. Service Schedule
              </h2>
              <p className={`text-xs ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                  Choose your preferred date and convenient arrival window
              </p>
            </div>
            </div> ):(
            <h2 className={`text-xl md:text-2xl font-serif mt-1 font-normal tracking-wide leading-tight ${
              isLight ? "text-[#1A2238]" : "text-white"
            }`}>
                {translate("dateTimeSelectTitle")}
            </h2>
            )}   
            
            
          </div>
        </div>

        {/* Selected Slot Badge */}
        {(date || time) && (
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1 text-xs font-semibold shadow-inner ${
              isLight ? "border-[#D8B63F]/50 bg-amber-50/70 text-[#D8B63F]" : "border-[#FFD766]/50 bg-[#1B2A40] text-[#FFD766]"
            }`}>
              <Calendar1Icon className={`h-3.5 w-3.5 ${isLight ? "text-[#D8B63F]" : "text-[#FFD766]"}`} />
              {date ? date : "Date TBD"} {time ? `• ${formatAmPm(time)}` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Date & Time Pickers Grid */}
      <div className={`grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 ${
        isLight ? "bg-[#F7F5F0]" : "bg-[#111C2E]"
      }`}>
        
        {/* Date Picker Card */}
        <div className={`overflow-hidden rounded-xl border shadow-sm flex flex-col ${
          isLight ? "border-[#D9DDE5] bg-white" : "border-[#718096]/60 bg-[#1B2A40]"
        }`}>
          {/* Card Header */}
          <div className={`flex items-center justify-between border-b px-4 py-3 ${
            isLight ? "border-[#D9DDE5] bg-[#F7F5F0]" : "border-[#718096]/40 bg-[#152238]"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                isLight ? "border-[#D9DDE5] bg-white text-[#D8B63F]" : "border-[#718096]/50 bg-[#1B2A40] text-[#FFD766]"
              }`}>
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                {translate("dateTimeSelectDate")}
              </span>
            </div>

            {date && (
              <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                isLight ? "border-[#D8B63F]/40 bg-amber-50/60 text-[#D8B63F]" : "border-[#FFD766]/40 bg-[#152238] text-[#FFD766]"
              }`}>
                {date}
              </span>
            )}
          </div>

          <div className={`p-4 flex-1 flex flex-col justify-between ${isLight ? "bg-white" : "bg-[#1B2A40]"}`}>
            {/* Month & Year Navigator */}
            <div className="mb-3 flex items-center justify-between px-1">
              <button
                type="button"
                disabled={!canGoPrevMonth}
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                  isLight 
                    ? "border-[#D9DDE5] bg-[#F7F5F0] text-[#1A2238] hover:bg-[#D9DDE5]" 
                    : "border-[#718096]/50 bg-[#152238] text-[#C3CDDC] hover:bg-[#1f3050] hover:text-white"
                }`}
                aria-label="Previous Month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className={`text-sm font-bold tracking-wider uppercase ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                {translate(MONTH_KEYS[viewMonth.getMonth()])} {viewMonth.getFullYear()}
              </span>

              <button
                type="button"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors ${
                  isLight 
                    ? "border-[#D9DDE5] bg-[#F7F5F0] text-[#1A2238] hover:bg-[#D9DDE5]" 
                    : "border-[#718096]/50 bg-[#152238] text-[#C3CDDC] hover:bg-[#1f3050] hover:text-white"
                }`}
                aria-label="Next Month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className={`grid grid-cols-7 gap-1 text-center py-2 px-1 rounded-lg border mb-2 ${
              isLight ? "bg-[#F7F5F0] border-[#D9DDE5]" : "bg-[#152238] border-[#718096]/40"
            }`}>
              {WEEKDAY_KEYS.map((w) => (
                <span key={w} className={`text-[11px] font-bold uppercase tracking-wider ${isLight ? "text-[#687386]" : "text-[#C3CDDC]"}`}>
                  {translate(w)}
                </span>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {cells.map((cellDate, i) => {
                if (!cellDate) return <span key={`blank-${i}`} className="size-8 sm:size-9" />;
                const key = toDateKey(cellDate);
                const isPast = startOfDay(cellDate).getTime() < minSelectable.getTime();
                const isToday = startOfDay(cellDate).getTime() === today.getTime();
                const isSelected = key === date;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={isPast}
                    onClick={() => onDateChange(key)}
                    className={`mx-auto flex size-8 sm:size-9 items-center justify-center rounded-lg text-xs sm:text-sm transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? "bg-[#D8B63F] text-white font-bold border-2 border-[#D9DDE5] shadow-md scale-105"
                          : "bg-[#D8B63F] text-[#002F6D] font-bold border-2 border-[#D9DDE5] shadow-[0_0_12px_rgba(255,215,102,0.4)] scale-105"
                        : isPast
                          ? "cursor-not-allowed opacity-30 text-gray-400"
                          : isToday
                            ? `border border-dashed font-bold ${isLight ? "border-[#D8B63F] text-[#D8B63F] bg-amber-50/40" : "border-[#FFD766] text-[#FFD766] bg-[#152238]"}`
                            : isLight
                              ? "text-[#1A2238] hover:bg-[#F7F5F0] font-medium border border-transparent"
                              : "text-white/90 hover:bg-[#152238] hover:text-white border border-transparent font-medium"
                    }`}
                  >
                    {cellDate.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time Slot Picker Card */}
        <div className={`overflow-hidden rounded-xl border shadow-sm flex flex-col ${
          isLight ? "border-[#D9DDE5] bg-white" : "border-[#718096]/60 bg-[#1B2A40]"
        }`}>
          {/* Card Header */}
          <div className={`flex items-center justify-between border-b px-4 py-3 ${
            isLight ? "border-[#D9DDE5] bg-[#F7F5F0]" : "border-[#718096]/40 bg-[#152238]"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                isLight ? "border-[#D9DDE5] bg-white text-[#D8B63F]" : "border-[#718096]/50 bg-[#1B2A40] text-[#FFD766]"
              }`}>
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isLight ? "text-[#1A2238]" : "text-white"}`}>
                {translate("dateTimeSelectTime")}
              </span>
            </div>

            {time && (
              <span className={`rounded-md border px-2 py-0.5 text-[11px] font-semibold ${
                isLight ? "border-[#D8B63F]/40 bg-amber-50/60 text-[#D8B63F]" : "border-[#FFD766]/40 bg-[#152238] text-[#FFD766]"
              }`}>
                {formatAmPm(time)}
              </span>
            )}
          </div>

          {/* Main Container for Time Slots & Notice */}
          <div className={`p-4 flex-1 flex flex-col justify-between ${isLight ? "bg-white" : "bg-[#1B2A40]"}`}>
            
            {/* Scrollable Time Slots List */}
            <div className={`grid max-h-[220px] grid-cols-2 gap-2.5 overflow-y-auto pr-1 ${
              isLight 
                ? "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-200 hover:[&::-webkit-scrollbar-thumb]:bg-slate-300"
                : "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#718096]/50 hover:[&::-webkit-scrollbar-thumb]:bg-[#718096]"
            }`}>
              {TIME_SLOTS.map((slot) => {
                const isSelected = slot === time;
                return (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => onTimeChange(slot)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? isLight
                          ? "border-2 border-[#D9DDE5] bg-[#D8B63F] text-white shadow-md"
                          : "border-2 border-[#FFD766] bg-[#FFD766] text-[#002F6D] font-bold shadow-[0_0_10px_rgba(255,215,102,0.35)]"
                        : isLight
                          ? "border border-[#D9DDE5] bg-white text-[#1A2238] hover:border-[#D8B63F] hover:bg-[#F7F5F0]"
                          : "border border-[#718096]/60 bg-[#152238] text-white/90 hover:border-[#FFD766] hover:bg-[#1B2A40]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className={`h-3.5 w-3.5 ${isSelected ? (isLight ? "text-white" : "text-[#002F6D]") : isLight ? "text-[#D8B63F]" : "text-[#FFD766]"}`} />
                      <span>{formatAmPm(slot)}</span>
                    </span>
                    {isSelected && <Check className="h-4 w-4 stroke-[2.5]" />}
                  </button>
                );
              })}
            </div>

            {/* Arrival Note (Nicely stacked at the bottom without absolute overlapping) */}
            <div
              className={`flex items-center gap-3 rounded-xl border p-3.5 sm:p-4 shadow-sm backdrop-blur-sm mt-4 ${
                isLight
                  ? "border-[#167A57]/30 bg-[#167A57]/10 text-[#167A57]"
                  : "border-[#36D6A0]/40 bg-[#36D6A0]/10 text-[#36D6A0]"
              }`}
            > 
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                isLight ? "text-[#167A57]" : "text-[#36D6A0]"
              }`}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-[13px] font-medium leading-relaxed">
                Staff arrives within a strict 15-minute window with electronic keycode verification.
              </p>
            </div> 

          </div> 
        </div>
      </div>
      
    </section>
  );
}