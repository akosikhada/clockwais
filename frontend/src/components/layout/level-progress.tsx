"use client";

import React from "react";

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
      className={`bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/30 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl secondary-gradient flex items-center justify-center">
            <span className="text-white text-sm font-bold">🏆</span>
          </div>
          <h3 className="text-lg font-bold text-slate-700">Current Level</h3>
        </div>
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 px-4 py-2 rounded-xl border border-pink-200">
          <span className="text-sm font-bold text-pink-600">Level {level}</span>
        </div>
      </div>
      <div className="w-full bg-slate-200 rounded-2xl h-4 mb-3 shadow-inner">
        <div
          className="primary-gradient h-4 rounded-2xl shadow-lg glow-effect transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-slate-500 px-1">
        <span>{progress}% complete</span>
        <span>
          {100 - progress}% to Level {level + 1}
        </span>
      </div>
    </div>
  );
};

export default LevelProgress;
