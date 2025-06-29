"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

interface ProgressChartProps {
  weeklyData?: number[];
  daysOfWeek?: string[];
}

const ProgressChart = ({
  weeklyData = [3, 5, 2, 6, 4, 3, 1],
  daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
}: ProgressChartProps) => {
  const maxValue = Math.max(...weeklyData, 8); // Set minimum max value to 8 for consistent scale

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
          <span className="text-white text-sm font-bold">📈</span>
        </div>
        <h3 className="text-lg font-bold text-slate-700">Weekly Progress</h3>
      </div>

      <div className="h-[140px] w-full">
        <div className="flex h-full items-end justify-between gap-3">
          {weeklyData.map((value, index) => {
            const heightPercentage = Math.max((value / maxValue) * 100, 12); // Minimum height for visibility
            const isToday =
              index === new Date().getDay() - 1 ||
              (index === 6 && new Date().getDay() === 0);

            return (
              <div
                key={index}
                className="flex flex-col items-center justify-end flex-1 group"
              >
                <div className="text-xs text-slate-500 mb-2 font-bold bg-white/80 rounded-lg px-2 py-1 shadow-sm border border-white/50">
                  {value}
                </div>
                <div
                  className={`w-full rounded-t-2xl transition-all duration-300 hover:scale-105 cursor-pointer shadow-lg ${
                    isToday
                      ? "primary-gradient glow-effect"
                      : "secondary-gradient hover:shadow-xl"
                  }`}
                  style={{ height: `${heightPercentage}%` }}
                />
                <span
                  className={`mt-3 text-xs font-semibold transition-colors ${
                    isToday
                      ? "text-pink-600"
                      : "text-slate-500 group-hover:text-slate-700"
                  }`}
                >
                  {daysOfWeek[index]}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
