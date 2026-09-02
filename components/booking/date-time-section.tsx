"use client";

import { useMemo, useState } from "react";

const TIME_START = "05:30";
const TIME_END = "17:30";
const TIME_STEP_MINUTES = 30;
const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
const MONTH_LABELS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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
    <section className="overflow-hidden rounded-[12px] border border-[#A98B4B] bg-[rgb(248,249,250)]">
      <div className="px-5 py-4 text-center">
        <h2 className="text-[1.4rem] font-bold text-[rgb(18, 30, 45)] sm:text-[1.3rem]">
          Select Date & Time to Book Your Appointment
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 bg-[#F8F9FA] p-4 sm:p-5 md:grid-cols-2 md:gap-5">
        {/* Date */}
        <div className="overflow-hidden rounded-xl border border-[#A98B4B] bg-[#FFFDF4] shadow-sm">
          <div className="bg-[#121E2D] py-3.5 text-center text-sm font-semibold text-white">Select Your Date</div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                disabled={!canGoPrevMonth}
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1))}
                className="rounded px-2 py-1 text-lg font-semibold text-[#002F6D] transition hover:text-[#A98B4B] disabled:opacity-30"
              >
                ‹
              </button>
              <span className="text-sm font-semibold text-[#002F6D]">
                {MONTH_LABELS[viewMonth.getMonth()]} {viewMonth.getFullYear()}
              </span>
              <button
                type="button"
                onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1))}
                className="rounded px-2 py-1 text-lg font-semibold text-[#002F6D] transition hover:text-[#A98B4B]"
              >
                ›
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
              {WEEKDAY_LABELS.map((w) => (
                <span key={w} className="text-xs font-semibold text-[#002F6D]">
                  {w}
                </span>
              ))}

              {cells.map((cellDate, i) => {
                if (!cellDate) return <span key={`blank-${i}`} />;
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
                    className={`mx-auto flex size-8 items-center justify-center rounded-full text-sm font-medium transition ${isSelected
                      ? "bg-[#A98B4B] font-bold text-[#FFFDF4]"
                      : isPast
                        ? "cursor-not-allowed text-[#999] opacity-35"
                        : isToday
                          ? "border-2 border-dashed border-[#A98B4B] text-[#002F6D]"
                          : "text-[#002F6D] hover:bg-[#D9D9D9] hover:text-[#121E2D]"
                      }`}
                  >
                    {cellDate.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Time */}
        <div className="overflow-hidden rounded-xl border border-[#A98B4B] bg-[#FFFDF4] shadow-sm">
          <div className="bg-[#121E2D] py-3.5 text-center text-sm font-semibold text-white">
            Select Your Time Period
          </div>
          <div className="grid max-h-64 grid-cols-2 gap-2 overflow-y-auto p-3">
            {TIME_SLOTS.map((slot) => {
              const isSelected = slot === time;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onTimeChange(slot)}
                  className={`rounded-xl border-2 px-1.5 py-2.5 text-left pl-4 text-[13px] font-semibold whitespace-nowrap transition ${isSelected
                    ? "border-[#121E2D] bg-[#A98B4B] text-[#FFFDF4]"
                    : "border-[#121E2D] bg-[#FFFDF4] text-[#002F6D] hover:border-[#A98B4B] hover:bg-[#D9D9D9] hover:text-[#121E2D]"
                    }`}
                >
                  {formatAmPm(slot)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
