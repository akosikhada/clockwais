"use client";

import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isSameMonth,
} from "date-fns";

interface CalendarViewProps {
  className?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ className }) => {
  const today = new Date();
  const currentMonth = format(today, "MMMM yyyy");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const firstDay = startOfMonth(today);
  const lastDay = endOfMonth(today);
  const daysInMonth = eachDayOfInterval({ start: firstDay, end: lastDay });

  // Get the day of the week of the first day (0 = Sunday, 1 = Monday, etc.)
  let firstDayOfWeek = firstDay.getDay();
  // Convert Sunday (0) to be the last day (6) for our display
  if (firstDayOfWeek === 0) firstDayOfWeek = 7;
  firstDayOfWeek = firstDayOfWeek - 1; // Adjust to 0-based for array index

  // Create array with empty cells for days before the first day of month
  const calendarDays = Array(firstDayOfWeek).fill(null);
  // Add the actual days of the month
  calendarDays.push(...daysInMonth);

  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
            <span className="text-white text-sm font-bold">📅</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">Calendar</h3>
        </div>
        <div className="text-sm font-medium text-pink-600 bg-gradient-to-r from-pink-50 to-blue-50 px-3 py-1 rounded-lg border border-pink-100">
          {currentMonth}
        </div>
      </div>

      {/* Days header */}
      <div className="grid grid-cols-7 mb-2">
        {days.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`aspect-square flex items-center justify-center text-sm rounded-full
              ${
                day && isToday(day)
                  ? "primary-gradient text-white font-medium shadow-sm"
                  : day
                    ? "text-slate-700 hover:bg-slate-100"
                    : ""
              }
            `}
          >
            {day ? format(day, "d") : ""}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
