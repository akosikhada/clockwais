"use client";

import React, { useState } from "react";
import { format, addMonths, subMonths, isToday } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarViewProps {
  className?: string;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ className }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const prevMonth = () => {
    setCurrentDate((prevDate) => subMonths(prevDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate((prevDate) => addMonths(prevDate, 1));
  };

  // Calculate current month's grid
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // Get first day of month (0-6, where 0 is Sunday)
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  // Create array for the calendar grid
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Days of week header - starting with Sunday
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 dark:border-slate-700/30 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-bold">📅</span>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              Calendar
            </h3>
            <div className="text-sm font-medium text-pink-600 dark:text-pink-300">
              {format(currentDate, "MMMM yyyy")}
            </div>
          </div>
        </div>

        <div className="flex">
          <button
            onClick={prevMonth}
            className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 w-8 h-8 rounded-l-xl flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 w-8 h-8 rounded-r-xl flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div>
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-2 text-center">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-xs font-semibold text-slate-500 dark:text-slate-400"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {/* Empty cells for days before the 1st of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="h-8 text-sm"></div>
          ))}

          {/* Actual days */}
          {days.map((day) => {
            const date = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            );
            const isCurrentDay = isToday(date);

            return (
              <div
                key={day}
                className={`h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                  isCurrentDay
                    ? "bg-pink-500 text-white shadow-lg"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer"
                }`}
              >
                {day}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
