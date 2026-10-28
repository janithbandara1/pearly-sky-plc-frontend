"use client";

import { DateTimeSection } from "@/components/booking/date-time-section";

export interface Step2ScheduleProps {
  date: string;
  onDateChange: (d: string) => void;
  time: string;
  onTimeChange: (t: string) => void;
}

export function Step2Schedule({ date, onDateChange, time, onTimeChange }: Step2ScheduleProps) {
  return (
    <DateTimeSection
      date={date}
      onDateChange={onDateChange}
      time={time}
      onTimeChange={onTimeChange}
    />
  );
}
