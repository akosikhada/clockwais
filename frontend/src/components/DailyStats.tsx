"use client";

import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface DailyStatsProps {
  focusTime?: string;
  completedSessions?: number;
  dailyStreak?: number;
}

const DailyStats = ({
  focusTime = "3h 25m",
  completedSessions = 4,
  dailyStreak = 5,
}: DailyStatsProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Get current month and year
  const month = currentMonth.toLocaleString("default", { month: "long" });
  const year = currentMonth.getFullYear();

  // Generate calendar days
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  // Days of the week
  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  // Generate calendar grid
  const calendarDays = [];

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(<div key={`empty-${i}`} className="w-6 h-6"></div>);
  }

  // Add days of the month
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentMonth.getMonth() &&
    today.getFullYear() === currentMonth.getFullYear();
  const currentDate = today.getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = isCurrentMonth && day === currentDate;
    calendarDays.push(
      <div
        key={`day-${day}`}
        className={cn(
          "w-6 h-6 flex items-center justify-center text-xs rounded-full",
          isToday
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted cursor-pointer",
        )}
      >
        {day}
      </div>,
    );
  }

  return (
    <div className="space-y-6">
      {/* Daily Stats Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          <h2 className="text-lg font-bold text-slate-700">Daily Stats</h2>
        </div>

        <div className="space-y-5">
          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-pink-50 to-blue-50 border border-pink-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-pink-400 to-pink-500 flex items-center justify-center">
                <span className="text-white text-xs">⏰</span>
              </div>
              <span className="text-sm font-medium text-slate-600">
                Focus Time
              </span>
            </div>
            <span className="font-bold text-slate-800 text-lg">
              {focusTime}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-blue-50 to-pink-50 border border-blue-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center">
                <span className="text-white text-xs">✅</span>
              </div>
              <span className="text-sm font-medium text-slate-600">
                Completed Sessions
              </span>
            </div>
            <span className="font-bold text-slate-800 text-lg">
              {completedSessions}
            </span>
          </div>

          <div className="flex justify-between items-center p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center">
                <span className="text-white text-xs">🔥</span>
              </div>
              <span className="text-sm font-medium text-slate-600">
                Daily Streak
              </span>
            </div>
            <span className="font-bold text-slate-800 text-lg">
              {dailyStreak} days
            </span>
          </div>
        </div>
      </div>

      {/* Calendar Card */}
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl accent-gradient flex items-center justify-center">
              <span className="text-slate-700 text-sm font-bold">📅</span>
            </div>
            <h3 className="text-lg font-bold text-slate-700">{`${month} ${year}`}</h3>
          </div>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-pink-100 to-blue-100 flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 button-hover border border-pink-200">
            <span className="text-sm text-pink-600">⚙️</span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 font-medium"
            >
              {day}
            </div>
          ))}
          {calendarDays.map((day, index) => {
            if (React.isValidElement(day) && day.props.children) {
              const dayNumber = day.props.children;
              const isToday = isCurrentMonth && dayNumber === currentDate;
              const isHighlighted = dayNumber === 28; // Highlight the 28th as in the design

              return (
                <div
                  key={index}
                  className={cn(
                    "w-8 h-8 flex items-center justify-center text-xs rounded-xl cursor-pointer transition-all duration-300 button-hover font-medium",
                    isToday
                      ? "primary-gradient text-white font-bold shadow-lg glow-effect"
                      : isHighlighted
                        ? "secondary-gradient text-white font-bold shadow-md"
                        : "hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50 text-slate-600 hover:text-slate-800 hover:shadow-sm",
                  )}
                >
                  {dayNumber}
                </div>
              );
            }
            return day;
          })}
        </div>
      </div>
    </div>
  );
};

export default DailyStats;
