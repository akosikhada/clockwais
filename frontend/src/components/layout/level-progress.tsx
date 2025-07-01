"use client";

import React from "react";
import { Trophy } from "lucide-react";

interface LevelProgressProps {
  level: number;
  progress: number;
  className?: string;
}

export const LevelProgress: React.FC<LevelProgressProps> = ({
  level,
  progress,
  className,
}) => {
  return (
    <div
      className={`bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 dark:border-slate-700/30 ${className}`}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
            <Trophy className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
            Current Level
          </h3>
        </div>
        <div className="bg-pink-600 dark:bg-pink-900/30 px-5 py-2.5 rounded-xl shadow-sm">
          <span className="text-lg font-bold text-white">{level}</span>
        </div>
      </div>

      <div className="w-full bg-slate-200 dark:bg-slate-700/60 rounded-full h-3 mb-4 shadow-inner overflow-hidden">
        <div
          className="bg-pink-500 h-3 rounded-full shadow-lg transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="flex justify-between text-xs font-medium px-1">
        <span className="text-slate-600 dark:text-slate-400">
          {progress}% complete
        </span>
        <span className="text-slate-600 dark:text-slate-400">
          {100 - progress}% to Level {level + 1}
        </span>
      </div>
    </div>
  );
};

export default LevelProgress;
