"use client";

import React from "react";
import StatCard from "./stat-card";

interface DailyStatsProps {
  focusTime: string;
  completedSessions: number;
  dailyStreak: number;
  className?: string;
}

export const DailyStats: React.FC<DailyStatsProps> = ({
  focusTime,
  completedSessions,
  dailyStreak,
  className,
}) => {
  return (
    <div
      className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 card-hover ${className}`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl primary-gradient flex items-center justify-center">
          <span className="text-white text-sm font-bold">📊</span>
        </div>
        <h3 className="text-lg font-bold text-slate-700">Daily Stats</h3>
      </div>

      <div className="space-y-2">
        <StatCard
          icon={<span>⏱️</span>}
          title="Focus Time"
          value={focusTime}
          bgColor="bg-gradient-to-r from-pink-400 to-blue-400"
        />

        <StatCard
          icon={<span>🎯</span>}
          title="Completed Sessions"
          value={completedSessions}
          bgColor="bg-gradient-to-r from-blue-400 to-purple-400"
        />

        <StatCard
          icon={<span>🔥</span>}
          title="Daily Streak"
          value={dailyStreak}
          bgColor="bg-gradient-to-r from-orange-400 to-red-400"
        />
      </div>
    </div>
  );
};

export default DailyStats;
