"use client";

import React from "react";
import { format } from "date-fns";

interface AppHeaderProps {
  className?: string;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ className }) => {
  const currentDate = format(new Date(), "EEEE, MMMM d");
  const currentTime = format(new Date(), "h:mm a");

  return (
    <div
      className={`relative flex items-center justify-between mb-10 ${className}`}
    >
      {/* Left side: Logo and Title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl primary-gradient flex items-center justify-center shadow-lg glow-effect">
          <div className="w-6 h-6 rounded-xl bg-white flex items-center justify-center">
            <div className="w-3 h-3 rounded-lg primary-gradient"></div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-blue-600 bg-clip-text text-transparent">
            ClockWais
          </h1>
          <p className="text-xs text-slate-500 font-medium">
            Making work enjoyable, one timer at a time
          </p>
        </div>
      </div>

      {/* Center: Date and Time (Absolutely Centered) */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center">
        <div className="text-slate-600 text-sm font-semibold">
          {currentDate}
        </div>
        <div className="text-slate-500 text-xs">{currentTime}</div>
      </div>

      {/* Right side: Profile Icon */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 button-hover border border-white/50 shadow-md">
          <div className="w-6 h-6 rounded-xl accent-gradient flex items-center justify-center">
            <div className="w-3 h-3 rounded-lg bg-slate-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
