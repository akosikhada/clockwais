"use client";

import React from "react";

interface ProgressChartProps {
  weeklyData: number[];
  className?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  weeklyData,
  className,
}) => {
  const sundayFirstData = [weeklyData[6], ...weeklyData.slice(0, 6)];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const maxValue = Math.max(...sundayFirstData, 4); // Ensure scale is at least 4

  return (
    <div
      className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 dark:border-slate-700/30 ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold">📈</span>
        </div>
        <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
          Weekly Progress
        </h3>
      </div>

      <div className="mt-6 relative flex h-32">
        {sundayFirstData.map((value, index) => {
          const height = value === 0 ? 10 : (value / maxValue) * 100;

          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 justify-end"
            >
              <div
                style={{ height: `${height}%` }}
                className={`w-5 rounded-t-lg ${
                  value >= 4
                    ? "bg-pink-500"
                    : value >= 2
                      ? "bg-blue-500"
                      : "bg-slate-300 dark:bg-slate-600"
                } shadow-md transition-all duration-500`}
              ></div>
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">
                {days[index]}
              </div>
            </div>
          );
        })}

        {/* Horizontal grid lines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div>
          <div className="h-px w-full bg-slate-200 dark:bg-slate-700"></div>
        </div>
      </div>

      <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-4 font-medium">
        <span>Last Week</span>
        <span className="text-pink-500 dark:text-pink-400 font-semibold">
          {sundayFirstData.reduce((sum, val) => sum + val, 0)} sessions
        </span>
      </div>
    </div>
  );
};

export default ProgressChart;
