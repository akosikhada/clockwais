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
    <div className={`card-stylized ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl text-primary">
          <span>📊</span>
        </div>
        <h3 className="text-lg font-bold text-slate-800">Daily Stats</h3>
      </div>

      <div className="flex flex-col gap-2">
        <StatCard
          icon={<span>⏱️</span>}
          title="Focus Time"
          value={focusTime}
          iconColorClass="text-primary"
        />

        <hr className="border-slate-200/80 my-1" />

        <StatCard
          icon={<span>🎯</span>}
          title="Completed Sessions"
          value={completedSessions}
          iconColorClass="text-blue-500"
        />

        <hr className="border-slate-200/80 my-1" />

        <StatCard
          icon={<span>🔥</span>}
          title="Daily Streak"
          value={dailyStreak}
          iconColorClass="text-amber-500"
        />
      </div>
    </div>
  );
};

export default DailyStats;
