"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "@/lib/i18n/language-context";
import type { TranslationKey } from "@/lib/i18n/dictionaries/en";
import { Calendar, Clock, ChevronLeft, ChevronRight, CalendarDays, Check, Sparkles, Calendar1Icon } from "lucide-react";

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
}

export function DateTimeSection({ date, onDateChange, time, onTimeChange }: DateTimeSectionProps) {
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
    <section className="overflow-hidden rounded-2xl border border-brand-gold bg-[#0B1528] shadow-xl">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-brand-gold/60 bg-[#05122b] px-5 py-4 sm:px-7">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#C6A868]/60 bg-[#152243] text-[#C5A253] shadow-sm">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold uppercase tracking-wider text-white">
              {translate("dateTimeSelectTitle")}
            </h2>
            <p className="text-xs text-gray-400">
              {translate("dateTimeSelectHelp")}
            </p>
          </div>
        </div>

        {/* Selected Slot Badge */}
        {(date || time) && (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/60 bg-[#152243] px-3.5 py-1 text-xs font-semibold text-[#C5A253] shadow-inner">
              <Calendar1Icon className="h-3.5 w-3.5 text-[#C5A253]" />
              {date ? date : "Date TBD"} {time ? `• ${formatAmPm(time)}` : ""}
            </span>
          </div>
        )}
      </div>

      {/* Date & Time Pickers Grid */}
      <div className="grid grid-cols-1 gap-5 p-4 sm:p-6 md:grid-cols-2 md:gap-6 bg-[#0B1528]">
        {/* Date Picker Card */}
        <div className="overflow-hidden rounded-xl border border-gray-500 bg-[#0c1628] shadow-md flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-blue-900/40 bg-[#121E2D] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-blue-900/40 bg-[#1f305e] text-blue-400">
                <Calendar className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                {translate("dateTimeSelectDate")}
              </span>
            </div>

            {date && (
              <span className="rounded-md border border-blue-900/40 bg-[#152243] px-2 py-0.5 text-[11px] font-semibold text-blue-300">
                {date}
              </span>
            )}
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            {/* Month & Year Navigator */}
            <div className="mb-3 flex items-center justify-between px-1">
              <button
                type="button"
                disabled={!canGoPrevMonth}
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-900/40 bg-[#152243] text-blue-400 transition-colors hover:bg-[#1f305e] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                aria-label="Previous Month"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="text-sm font-bold tracking-wider text-slate-100 uppercase">
                {translate(MONTH_KEYS[viewMonth.getMonth()])} {viewMonth.getFullYear()}
              </span>

              <button
                type="button"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-blue-900/40 bg-[#152243] text-blue-400 transition-colors hover:bg-[#1f305e] hover:text-white"
                aria-label="Next Month"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            {/* Weekday Labels */}
            <div className="grid grid-cols-7 gap-1 text-center py-2 px-1 rounded-lg bg-[#0e1a2e]/60 border border-blue-900/30 mb-2">
              {WEEKDAY_KEYS.map((w) => (
                <span key={w} className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
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
                        ? "bg-blue-600 text-white font-bold border-2 border-[#B89642] shadow-[0_0_12px_rgba(59,130,246,0.45)] scale-105"
                        : isPast
                          ? "cursor-not-allowed text-gray-600 opacity-30"
                          : isToday
                            ? "border border-dashed border-[#C6A868] text-[#C5A253] font-bold bg-[#152243]/70 hover:bg-[#1f305e]"
                            : "text-slate-200 hover:bg-[#152243] hover:text-white hover:border border-blue-900/40 font-medium"
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
        <div className="overflow-hidden rounded-xl border border-gray-500 bg-[#0c1628] shadow-md flex flex-col">
          {/* Card Header */}
          <div className="flex items-center justify-between border-b border-blue-900/40 bg-[#121E2D] px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-md border border-blue-900/40 bg-[#1f305e] text-blue-400">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                {translate("dateTimeSelectTime")}
              </span>
            </div>

            {time && (
              <span className="rounded-md border border-blue-900/40 bg-[#152243] px-2 py-0.5 text-[11px] font-semibold text-[#C5A253]">
                {formatAmPm(time)}
              </span>
            )}
          </div>

          {/* Time Slots List */}
          <div className="grid max-h-[310px] grid-cols-2 gap-2.5 overflow-y-auto p-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-900/60 hover:[&::-webkit-scrollbar-thumb]:bg-blue-700/80">
            {TIME_SLOTS.map((slot) => {
              const isSelected = slot === time;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all cursor-pointer ${
                    isSelected
                      ? "border-2 border-[#B89642] bg-blue-600 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                      : "border border-blue-900/40 bg-[#152243] text-slate-200 hover:border-[#C6A868]/70 hover:bg-[#1f305e] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Clock className={`h-3.5 w-3.5 ${isSelected ? "text-white" : "text-blue-400"}`} />
                    <span>{formatAmPm(slot)}</span>
                  </span>
                  {isSelected && <Check className="h-4 w-4 text-white stroke-[2.5]" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

